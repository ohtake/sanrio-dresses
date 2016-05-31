import React from 'react';
import RLightbox from 'react-image-lightbox';
import Styles from 'react-image-lightbox/lib/Styles.js';
import icons from './icons';
import Colors from './colors.js';
import Photo from './photo.js';

const myStyles = {
  creditContainer: {
    position: 'fixed',
    bottom: 0,
    right: 0,
  },
  creditAnchor: {
    display: 'inline-block',
    padding: '0.4em',
    backgroundColor: Styles.toolbar.backgroundColor,
    color: Styles.toolbarItem.color,
    lineHeight: '1em',
    fontSize: '80%',
    textDecoration: 'none',
  },
  notesContainer: {
    position: 'fixed',
    top: Styles.toolbar.height,
    left: 0,
    width: '100%',
    backgroundColor: Styles.toolbar.backgroundColor,
  },
  notesList: {
    whiteSpace: 'normal',
    lineHeight: '1em',
    fontSize: '80%',
  },
  buttonNotes: [
    Styles.toolbarItemChild,
    Styles.builtinButton,
    { background: `${icons.Info} no-repeat center` },
  ],
  colorSample: {
    display: 'inline-block',
    width: '0.8em',
    height: '0.8em',
    margin: '0 0.2em 0',
    border: 'grey 1px solid',
  },
};

export default class Lightbox2 extends React.Component {
  constructor(props) {
    super();

    this.state = { photos: props.photos, index: props.index };

    this.moveNext = this.moveNext.bind(this);
    this.movePrev = this.movePrev.bind(this);
    this.toggleDescription = this.toggleDescription.bind(this);
  }
  moveNext() {
    this.setState({ index: (this.state.index + 1) % this.state.photos.length });
  }
  movePrev() {
    this.setState({ index: (this.state.index + this.state.photos.length - 1) % this.state.photos.length });
  }
  toggleDescription(e) {
    e.preventDefault();
    this.setState({ showDescription: ! this.state.showDescription });
  }
  createColorSample(photo) {
    return (
      <li>{photo.data.colors.map(c => {
        const color = Colors.findById(c);
        return <span style={[myStyles.colorSample, { backgroundColor: color.value }]} title={color.name}></span>;
      })}</li>
    );
  }
  createNotesElement(photo) {
    return (
      <div style={myStyles.notesContainer}>
        <ul style={myStyles.notesList}>
          {this.createColorSample(photo)}
          {photo.data.notes.map(n => <li>{n}</li>)}
        </ul>
      </div>);
  }
  createCreditElement(photo) {
    const texts = [];
    if (photo.data.source.author) texts.push(`by ${photo.data.source.author}`);
    if (photo.data.source.license) texts.push(`under ${photo.data.source.license}`);
    return (
      <div style={myStyles.creditContainer}>
        <a href={photo.data.source.url} target="_blank" style={myStyles.creditAnchor}>
          {texts.join(' ') || 'no credit info'}
        </a>
      </div>
    );
  }
  render() {
    const index = this.state.index;
    const len = this.state.photos.length;
    const main = this.state.photos[index];
    const next = this.state.photos[(index + 1) % len];
    const prev = this.state.photos[(index + len - 1) % len];
    const description = (
      <div>
        <span>{main.data.title}</span>
        {this.state.showDescription ? this.createNotesElement(main) : null}
        {this.createCreditElement(main)}
      </div>
    );
    return (<RLightbox
      mainSrc={main.inferLargeImage()}
      nextSrc={next.inferLargeImage()}
      prevSrc={prev.inferLargeImage()}
      mainSrcThumbnail={main.data.image}
      nextSrcThumbnail={next.data.image}
      prevSrcThumbnail={prev.data.image}
      onCloseRequest={this.props.closeLightbox}
      onMovePrevRequest={this.movePrev}
      onMoveNextRequest={this.moveNext}
      toolbarButtons={[
        <button title="Toggle notes" onClick={this.toggleDescription} style={myStyles.buttonNotes} />,
      ]}
      imageTitle={description}
    />);
  }
}
Lightbox2.propTypes = {
  photos: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Photo)).isRequired,
  index: React.PropTypes.number.isRequired,
  closeLightbox: React.PropTypes.func.isRequired,
};