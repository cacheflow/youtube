var React = require('react');
var ReactDOM = require('react-dom');

var Video = React.createClass({
  displayName: 'Video',

  componentDidMount: function () {
    this.refs.iframeVideo.addEventListener('load', this.props.iFrameLoaded);
  },
  render: function () {
    return React.createElement(
      'div',
      { ref: 'youtube' },
      React.createElement('iframe', { ref: 'iframeVideo', src: this.props.vidId, frameBorder: '0', allowFullScreen: true })
    );
  }
});

module.exports = Video;
