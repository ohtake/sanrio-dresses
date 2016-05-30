import React from 'react';
import ReactDOM from 'react-dom';
import LazyLoad from 'react-lazy-load';
import Lightbox from 'react-image-lightbox';
import JustifiedLayout from 'react-justified-layout';
import Promise from 'es6-promise'; // For older browsers http://caniuse.com/#feat=promises
import fetch from 'whatwg-fetch';
import yaml from 'js-yaml';
import icons from './icons'

class Photo {
    constructor(data) {
        this.data = data;
    }
    getAspectRatio() {
        return 1.0 * this.data.size.width_o / this.data.size.height_o
    }
    inferLargeImage() {
        let url = this.data.image;
        if (url.indexOf(".staticflickr.com/") >= 0) {
            return url.replace(".jpg", "_b.jpg"); // b => 1024
        } else if (url.indexOf(".googleusercontent.com/") >= 0) {
            return url.replace("/s500/", "/s1024/");
        } else {
            return url;
        }
    }
}

class CharacterItem {
    constructor(filename, name) {
        this.filename = filename;
        this.name = name;
    }
}
class CharacterSelector extends React.Component {
    constructor(props) {
        super()
        this.status = {charas: props.charas};
    }
    handleChange(e) {
        this.props.onChanged(e.target.value);
    }
    selected() {
        return this.refs.select.value;
    }
    render() {
        return <div>Character
            <select ref="select" defaultValue={this.props.defaultChara} onChange={this.handleChange.bind(this)}>
              {this.status.charas.map(c => {return <option value={c.filename}>{c.name}</option>;})}
            </select>
        </div>
    }
}
CharacterSelector.propTypes = {
    charas: React.PropTypes.arrayOf(React.PropTypes.instanceOf(CharacterItem)),
    defaultChara: React.PropTypes.string,
    onChanged: React.PropTypes.func,
}
CharacterSelector.defaultProps = {
    charas: [
        new CharacterItem("kt-kitty", "KT キティ"),
        new CharacterItem("kt-mimmy", "KT ミミィ"),
    ],
    defaultChara: "kt-kitty",
    onChanged: function(sender){},
}

class ColorItem {
    constructor(id, name, strong, weak) {
        this.id = id
        this.name = name;
        this.strong = strong;
        this.weak = weak;
        this.active = false;
    }
    toggle() {
        this.active = !this.active;
    }
}

class ColorSelector extends React.Component {
    constructor(props) {
        super()
        this.state = {colors: props.colors};
        this.onChanged = props.onChanged;
    }
    styleBase() {
        return {
            display: "inline-block",
            margin: "0.2em 0",
            padding: "0.2em 0.5em",
            textDecoration: "none",
            color: "black",
            borderWidth: "0 0 0.25em",
        }
    }
    styleColor(c) {
        let style = this.styleBase();
        style.borderStyle = "solid";
        style.borderColor = c.active ? c.strong : c.weak;
        style.backgroundColor = c.active ? c.weak : "transparent";
        return style;
    }
    toggle(c, e){
        e.preventDefault();
        c.toggle();
        this.onChanged(this);
        this.setState({colors: this.state.colors})
    }
    clear(e) {
        if (e) e.preventDefault();
        for (let c of this.state.colors) {
            c.active = false;
        }
        this.onChanged(this);
        this.setState({colors: this.state.colors});
    }
    listActiveIds() {
        return this.state.colors.filter(c => {return c.active; }).map(c => {return c.id; });
    }
    render() {
        return <div>
          <span style={this.styleBase()}>Color filter</span>
          { this.state.colors.map((c,i) => {
              return <a href="#" style={this.styleColor(c)} onClick={this.toggle.bind(this,c)}>
                  {c.name}
              </a>
          }) }
          <a href="#" onClick={this.clear.bind(this)} style={this.styleBase()}>CLEAR</a>
        </div>;
    }
}
ColorSelector.propTypes = {
    colors: React.PropTypes.arrayOf(React.PropTypes.instanceOf(ColorItem)),
    onChanged: React.PropTypes.func,
}
ColorSelector.defaultProps = {
    colors: [
        // Color values are taken from http://www.google.com/design/spec/style/color.html#color-color-palette
        // strong=500, weak=200
        new ColorItem("red", "Red", "#f44336", "#ef9a9a"),
        new ColorItem("pink", "Pink", "#e91e63", "#f48fb1"),
        new ColorItem("orange", "Orange", "#ff9800", "#ffcc80"),
        new ColorItem("yellow", "Yellow", "#ffeb3b", "#fff59d"),
        new ColorItem("green", "Green", "#4caf50", "#a5d6a7"),
        new ColorItem("blue", "Blue", "#2196f3", "#90caf9"),
        new ColorItem("purple", "Purple", "#9c27b0", "#ce93d8"),
        new ColorItem("brown", "Brown", "#795548", "#bcaaa4"),
        new ColorItem("black", "Black", "#9e9e9e", "#eeeeee"),
        new ColorItem("grey", "Grey", "#9e9e9e", "#eeeeee"),
        new ColorItem("silver", "Silver", "#9e9e9e", "#eeeeee"),
        new ColorItem("white", "White", "#9e9e9e", "#eeeeee"),
        new ColorItem("gold", "Gold", "#ffc107", "#ffe082"),
    ],
    onChanged: function(sender){},
}

class App extends React.Component{
    constructor(){
        super();
        this.state = {photos:null, message:"Initializing", thumbnailHeight: 72};
        this.handleResize = this.updateContainerWidth.bind(this)
    }
    componentDidMount() {
        this.updateContainerWidth();
        window.addEventListener('resize', this.handleResize);
        // Some browsers restore selected value after reload. Needs timeout.
        window.setTimeout(()=>{
            this.setState({thumbnailHeight: parseInt(this.refs.size.value)});
            this.loadPhotos(this.refs.chara.selected());
        }, 100);
    }
    componentDidUpdate(){
        this.updateContainerWidth();
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.handleResize, false);
    }
    updateContainerWidth(){
        let newWidth = ReactDOM.findDOMNode(this).clientWidth;
        if (newWidth !== this.state.containerWidth){
            this.setState({containerWidth: newWidth});
        }
    }
    loadPhotos(file){
        this.setState({
            photos: null,
            message: "Loading " + file,
        });
        window.fetch(file + '.yaml').then( res => {
            if (res.ok) {
                return res.text();
            } else {
                let error = new Error(res.statusText);
                error.response = res;
                throw error;
            }
        }).then(text => {
            let data = yaml.load(text);
            let photos = data.map(obj => {return new Photo(obj)});
            this.allPhotos = photos;
            this.setState({
                photos: photos.slice(0),
                message: null
            });
        }).catch(ex => {
            this.setState({
                photos: null,
                message: ex.toString()
            });
        });
    }
    thumbnailSizeChanged(e) {
        this.setState({thumbnailHeight: parseInt(e.target.value)});
    }
    characterChanged(filename) {
        this.loadPhotos(filename);
        this.refs.color.clear();
    }
    colorChanged(sender) {
        let colors = sender.listActiveIds();
        if (colors.length == 0 ){
            this.setState({photos: this.allPhotos});
        } else {
            let photos = this.allPhotos.filter(p => {
                for (let c of colors) {
                    if (p.data.tags.indexOf("color:"+c) < 0) return false;
                }
                return true;
            });
            this.setState({photos: photos});
        }
    }
    render(){
        return(
            <div className="App">
                <div>
                  Thumbnail size <input ref="size" type="range" defaultValue={this.state.thumbnailHeight} min="36" max="288" onChange={this.thumbnailSizeChanged.bind(this)}/>
                </div>
                <CharacterSelector ref="chara" onChanged={this.characterChanged.bind(this)} />
                <ColorSelector ref="color" onChanged={this.colorChanged.bind(this)} />
                {this.state.message ? <div>{this.state.message}</div> : null}
                {this.state.photos ? this.renderGallery() : null}
                {this.state.isOpen ? this.renderLightbox() : null }
            </div>
        );
    }
    renderGallery() {
        let imgStyle = { width: "100%", height: "100%"};
        let imgs = this.state.photos.map((p,i) => {
            return (
              <div aspectRatio={p.getAspectRatio()} style={{backgroundColor: "silver"}}>
                <a href="#" onClick={this.openLightbox.bind(this, i)}>
                  <LazyLoad offset={this.state.thumbnailHeight}>
                    <img src={p.data.image} style={imgStyle} />
                  </LazyLoad>
                </a>
              </div>
            );
        });
        return <JustifiedLayout targetRowHeight={this.state.thumbnailHeight} containerPadding={0} boxSpacing={6} containerWidth={this.state.containerWidth}>{imgs}</JustifiedLayout>;
    }

    renderLightbox() {
        let index = this.state.index;
        let len = this.state.photos.length;
        let main = this.state.photos[index];
        let next = this.state.photos[(index + 1)%len];
        let prev = this.state.photos[(index + len - 1) % len];
        let description = (
          <div>
            <span>{main.data.title}</span>
            {this.state.showDescription ? this.createNotesElement(main) : null }
            {this.createCreditElement(main)}
          </div>
        );
        let buttonStyle = {
            verticalAlign: 'middle',
            width: '40px',
            height: '35px',
            cursor: 'pointer',
            border: 'none',
            opacity: 0.7,
            ':hover': {
                opacity: 1,
            },
            ':active': {
                outline: 'none',
            },
        };
        return <Lightbox
            mainSrc={main.inferLargeImage()}
            nextSrc={next.inferLargeImage()}
            prevSrc={prev.inferLargeImage()}
            mainSrcThumbnail={main.data.image}
            nextSrcThumbnail={next.data.image}
            prevSrcThumbnail={prev.data.image}
            onCloseRequest={this.closeLightbox.bind(this)}
            onMovePrevRequest={this.movePrev.bind(this)}
            onMoveNextRequest={this.moveNext.bind(this)}
            toolbarButtons={[
              <button title="Toggle notes" onClick={this.toggleDescription.bind(this)} style={[buttonStyle, { background: icons.Info + " no-repeat center"}]} type="button"/>,
            ]}
            imageTitle={description}
        />;
    }
    openLightbox(i, e) {
        e.preventDefault();
        this.setState({ isOpen: true, index: i });
    }
    closeLightbox() {
        this.setState({ isOpen: false });
    }
    moveNext() {
        this.setState({ index: (this.state.index + 1) % this.state.photos.length });
    }
    movePrev() {
        this.setState({ index: (this.state.index + this.state.photos.length - 1) % this.state.photos.length });
    }
    toggleDescription(e) {
        e.preventDefault();
        let val = this.state.showDescription;
        this.setState({ showDescription: !val });
    }
    createNotesElement(photo) {
        return (
          <div style={{position: "fixed", top: "50px", left: 0, width: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
            <ul style={{whiteSpace:"normal", lineHeight:"1em", fontSize: "80%"}}>
              {photo.data.notes.map( n => { return <li>{n}</li> })}
            </ul>
          </div>);
    }
    createCreditElement(photo) {
        let texts = [];
        if (photo.data.source.author) texts.push(`by ${photo.data.source.author}`);
        if (photo.data.source.license) texts.push(`under ${photo.data.source.license}`);
        return (
          <div style={{position: "fixed", bottom: 0, right: 0 }}>
            <a href={photo.data.source.url} target="_blank" style={{backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white", padding: "0.4em", display: "inline-block", lineHeight: "1em", fontSize: "80%", textDecoration: "none"}}>
              {texts.join(" ") || "no credit info"}
            </a>
          </div>);
    }
};

ReactDOM.render(<App />, document.getElementById('app'));
