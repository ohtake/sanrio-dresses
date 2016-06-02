import React from 'react';
import ReactDOM from 'react-dom';

import Photo from './photo.js';

import LazyLoad from 'react-lazy-load';
import JustifiedLayout from 'react-justified-layout';
import Lightbox from './lightbox.jsx';

export default class Gallery extends React.Component {
  constructor() {
    super();
    this.state = { thumbnailHeight: 72 };
    this.handleResize = this.updateContainerWidth.bind(this);

    this.thumbnailSizeChanged = this.thumbnailSizeChanged.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
  }
  componentDidMount() {
    this.updateContainerWidth();
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false);
  }
  updateContainerWidth() {
    const newWidth = ReactDOM.findDOMNode(this).clientWidth;
    if (newWidth !== this.state.containerWidth) {
      this.setState({ containerWidth: newWidth });
    }
  }
  applyThumbnailSize() {
    this.setState({ thumbnailHeight: parseInt(this.refs.size.value, 10) });
  }
  thumbnailSizeChanged() {
    this.applyThumbnailSize();
  }

  openLightbox(e) {
    e.preventDefault();
    const index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
    this.setState({ isOpen: true, index });
  }
  closeLightbox() {
    this.setState({ isOpen: false });
  }

  renderGallery() {
    let imgStyle = { width: '100%', height: '100%' };
    let imgs = this.props.photos.map((p, i) => (
      <div aspectRatio={p.getAspectRatio()} style={{ backgroundColor: 'silver' }}>
        <a href="#" onClick={this.openLightbox} data-index={i}>
          <LazyLoad offset={this.state.thumbnailHeight}>
            <img alt={p.data.title} src={p.data.image} style={imgStyle} />
          </LazyLoad>
        </a>
      </div>
    ));
    return <JustifiedLayout targetRowHeight={this.state.thumbnailHeight} containerPadding={0} boxSpacing={6} containerWidth={this.state.containerWidth}>{imgs}</JustifiedLayout>;
  }
  render() {
    return (
      <div>
        <div>
          Thumbnail size <input ref="size" type="range" defaultValue={this.state.thumbnailHeight} min="36" max="288" onChange={this.thumbnailSizeChanged} />
        </div>
        {this.props.photos ? this.renderGallery() : null}
        {this.state.isOpen ? <Lightbox index={this.state.index} photos={this.props.photos} closeLightbox={this.closeLightbox} /> : null}
      </div>
    );
  }
}
Gallery.propTypes = {
  photos: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Photo)),
};
