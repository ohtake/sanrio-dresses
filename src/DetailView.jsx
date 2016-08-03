import React from 'react';
import { routerShape } from 'react-router/lib/PropTypes';

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import { List, ListItem } from 'material-ui/List';

import ActionFeedback from 'material-ui/svg-icons/action/feedback';
import ActionOpenInBrowser from 'material-ui/svg-icons/action/open-in-browser';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import NavigationFullscreen from 'material-ui/svg-icons/navigation/fullscreen';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';

import AutoLockScrolling from 'material-ui/internal/AutoLockScrolling';
import Swipeable from 'react-swipeable';

import { fade } from 'material-ui/utils/colorManipulator';
import assign from 'lodash/assign';
import clone from 'lodash/clone';
import throttle from 'lodash/throttle';
import verge from 'verge';

import Colors from './colors.js';

import * as utils from './utils.js';

const swipingRatioThreshold = 0.3;

export default class DetailView extends React.Component {
  constructor() {
    super();

    this.state = { showInfo: true, swipingRatio: 0 };

    this.handleResize = this.updateMenuWidth.bind(this);
    this.handleSwiping = throttle(this.handleSwiping.bind(this), 50);
    this.handleSwiped = this.handleSwiped.bind(this);
    this.closeDetailView = this.closeDetailView.bind(this);
    this.openImageSource = this.openImageSource.bind(this);
    this.openFeedback = this.openFeedback.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.moveNext = this.moveNext.bind(this);
    this.movePrev = this.movePrev.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentDidMount() {
    this.updateMenuWidth();
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false);
    window.removeEventListener('keydown', this.handleKeyDown, false);
  }
  updateMenuWidth() {
    const newWidth = verge.viewportW();
    if (newWidth !== this.state.menuWidth) {
      this.setState({ menuWidth: newWidth });
    }
  }

  closeDetailView() {
    if (window.history.length > 1) {
      this.context.router.goBack();
    } else {
      // User opened lightbox url directly
      this.context.router.replace(`/chara/${this.props.chara}`);
    }
    this.state.showInfo = true;
  }
  toggleInfo() {
    this.setState({ showInfo: !this.state.showInfo });
  }
  moveToIndex(index) {
    const photo = this.state.photos[index];
    this.context.router.replace(`/chara/${this.props.chara}/${window.encodeURIComponent(photo.data.title)}`);
    utils.sendGoogleAnalyticsEvent('lightbox', 'navigate', `${this.props.chara} ${photo.data.title}`);
  }
  moveNext(e) {
    e.preventDefault();
    this.moveToIndex((this.state.index + 1) % this.state.photos.length);
  }
  movePrev(e) {
    e.preventDefault();
    this.moveToIndex(((this.state.index + this.state.photos.length) - 1) % this.state.photos.length);
  }
  openImageSource() {
    const photo = this.state.photos[this.state.index];
    window.open(photo.data.source.url);
  }
  openFeedback() {
    const formUrl = `https://docs.google.com/forms/d/13YG0Yw-qcVFyk1mvz9WsBK0lIowT_sGvi4vDmzDKjuU/viewform?entry.2146921250=${encodeURIComponent(window.location.href)}&entry.111224920`;
    window.open(formUrl);
  }
  handleSwiping(e, deltaX/* , deltaY, absX, absY, velocity*/) {
    const swipingRatio = deltaX / this.state.menuWidth;
    this.setState({ swipingRatio });
  }
  handleSwiped(e/* , deltaX, deltaY, isFlick*/) {
    this.handleSwiping.flush();
    if (this.state.swipingRatio > swipingRatioThreshold) {
      this.moveNext(e);
    } else if (this.state.swipingRatio < -swipingRatioThreshold) {
      this.movePrev(e);
    }
    this.setState({ swipingRatio: 0 });
  }
  handleKeyDown(e) {
    if (this.state.photos == null) return; // Don't handle any unless opened
    if (e.altKey || e.ctrlKey || e.shiftKey) return; // Don't handle keyboard shortcuts
    switch (e.keyCode) {
      case 37: // left
        this.movePrev(e);
        break;
      case 39: // right
        this.moveNext(e);
        break;
      default:
        break;
    }
  }
  createColorSampleStyle(colorValue) {
    const theme = this.context.muiTheme;
    return {
      display: 'inline-block',
      width: '0.8em',
      height: '0.8em',
      margin: '0 0.2em 0',
      border: `${theme.palette.borderColor} 1px solid`,
      backgroundColor: colorValue,
    };
  }
  createColorSample(photo) {
    if (photo.data.colors.length === 0) return null;
    return (
      <li>{photo.data.colors.map(c => {
        const color = Colors.findById(c);
        return <span style={this.createColorSampleStyle(color.value)} title={color.name} />;
      })}</li>
    );
  }
  createNotesElement(photo) {
    return [
      this.createColorSample(photo),
      ...photo.data.notes.map(n => <li>{n}</li>),
    ];
  }
  createCreditElement(photo) {
    const texts = [];
    if (photo.data.source.author) texts.push(`by ${photo.data.source.author}`);
    if (photo.data.source.license) texts.push(`under ${photo.data.source.license}`);
    const theme = this.context.muiTheme;
    return (
      <a href={photo.data.source.url} target="_blank" rel="noopener noreferrer" style={{ color: theme.appBar.textColor }}>
        {texts.join(' ') || 'no credit info'}
      </a>
    );
  }
  render() {
    if (this.state.photos == null) {
      return <Drawer open={false} openSecondary docked />;
    }
    const index = this.state.index;
    const len = this.state.photos.length;
    const main = this.state.photos[index];
    const next = this.state.photos[(index + 1) % len];
    const prev = this.state.photos[((index + len) - 1) % len];
    const theme = this.context.muiTheme;
    const navSize = 24;
    const navPadding = 12;
    const navIconStyle = { width: navSize, height: navSize, fill: theme.palette.textColor };
    const navButtonStyle = { width: navSize + (2 * navPadding), height: navSize + (2 * navPadding), padding: navPadding };
    const imgBaseStyle = { position: 'absolute', width: '100%', height: '100%' };
    const imgMainStyle = assign(clone(imgBaseStyle), { opacity: (Math.abs(this.state.swipingRatio) <= swipingRatioThreshold) ? 1 : 0.5 });
    const imgPosition = this.state.menuWidth + theme.spacing.desktopGutterMini;
    // objectPosion should be declared in stylesheet so that object-fit-images polyfill works. Since IE and Edge do not handle swipe, no need to do it.
    const imgPrevStyle = assign(clone(imgBaseStyle), { left: -imgPosition, objectPosition: '100% 50%', opacity: (this.state.swipingRatio < -swipingRatioThreshold) ? 1 : 0.5 });
    const imgNextStyle = assign(clone(imgBaseStyle), { left: +imgPosition, objectPosition: '  0% 50%', opacity: (this.state.swipingRatio > +swipingRatioThreshold) ? 1 : 0.5 });

    function floatingIcon(iconElement, isTop, isLeft, handler) {
      const containerStyle = { position: 'absolute' };
      if (isTop) { containerStyle.top = 0; } else { containerStyle.bottom = 0; }
      if (isLeft) { containerStyle.left = 0; } else { containerStyle.right = 0; }
      return <div style={containerStyle}><IconButton onTouchTap={handler} iconStyle={navIconStyle} style={navButtonStyle}>{iconElement}</IconButton></div>;
    }

    return (
      <Drawer
        open openSecondary docked
        onRequestChange={this.closeDetailView}
        width={this.state.menuWidth}
        containerStyle={{ backgroundColor: fade(theme.palette.canvasColor, 0.8) }}
      >
        <AutoLockScrolling lock />
        <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
          {this.state.showInfo ?
            <AppBar
              style={{ height: '72px' }}
              titleStyle={{ height: '100px' }}
              iconElementLeft={<IconButton onTouchTap={this.closeDetailView}><NavigationArrowBack /></IconButton>}
              title={
                <div>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{main.data.title}</div>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', margin: '-40px 0 0', fontSize: '60%' }}>{this.createCreditElement(main)}</div>
                </div>}
              iconElementRight={
                <IconMenu iconButtonElement={<IconButton><NavigationMoreVert /></IconButton>} targetOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                  <List>
                    <ListItem primaryText="Open image source" leftIcon={<ActionOpenInBrowser />} secondaryText="Tap the credit" onTouchTap={this.openImageSource} />
                    <ListItem primaryText="Fullscreen" leftIcon={<NavigationFullscreen />} secondaryText="Tap the image" onTouchTap={this.toggleInfo} />
                    <ListItem primaryText="Move Previous" leftIcon={<NavigationChevronLeft />} secondaryText="Swipe right / Left key" onTouchTap={this.movePrev} />
                    <ListItem primaryText="Move Next" leftIcon={<NavigationChevronRight />} secondaryText="Swipe left / Right key" onTouchTap={this.moveNext} />
                    <Divider />
                    <ListItem primaryText="Feedback" leftIcon={<ActionFeedback />} onTouchTap={this.openFeedback} />
                  </List>
                </IconMenu>
              }
            />
            : null}
          <Swipeable
            style={{ position: 'absolute', top: (this.state.showInfo ? '72px' : 0), bottom: 0, left: (-this.state.swipingRatio * this.state.menuWidth), width: '100%' }}
            onTouchTap={this.toggleInfo} onSwiping={this.handleSwiping} onSwiped={this.handleSwiped}
          >
            <img key={main.data.title} style={imgMainStyle} className="image-fit" src={main.getLargestImageAtMost(1024, 1024).url} alt="*" />
            <img key={next.data.title} style={imgNextStyle} className="image-fit" src={next.getLargestImageAtMost(1024, 1024).url} alt="*" />
            <img key={prev.data.title} style={imgPrevStyle} className="image-fit" src={prev.getLargestImageAtMost(1024, 1024).url} alt="*" />
          </Swipeable>
          {this.state.showInfo ?
            <div style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: fade(theme.palette.canvasColor, 0.4) }}>
              <ul style={{ margin: `${theme.spacing.desktopGutterMini}px ${navButtonStyle.width}px`, padding: '0 0 0 1.5em' }}>
                {this.createNotesElement(main)}
              </ul>
            </div>
            : null}
          {floatingIcon(<NavigationChevronLeft />, false, true, this.movePrev)}
          {floatingIcon(<NavigationChevronRight />, false, false, this.moveNext)}
          {this.state.showInfo ? null : floatingIcon(<NavigationArrowBack />, true, true, this.closeDetailView)}
        </div>
      </Drawer>
    );
  }
}
DetailView.propTypes = {
  chara: React.PropTypes.string.isRequired,
};
DetailView.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
  router: routerShape,
};
