var youtube = require('../../api/youtube');
var React = require('react');
var ReactDOM = require('react-dom');
var update = require('react-addons-update');
var Video = require('./Video');

var VideoContainer = React.createClass({
  displayName: 'VideoContainer',

  getInitialState: function () {
    return {
      selectedVideo: "",
      videos: [],
      loading: false
    };
  },

  getVideos: function () {
    var methodContext = this;
    youtube.get(this.state.selectedVideo).then(response => {
      return response.items;
    }).then(data => {
      data.forEach(function (obj, index) {
        methodContext.setVideoState(obj.snippet.title, obj.id.videoId);
      });
    });
  },

  setVideoState: function (vidTitle, vidId) {
    var currentVideoState = this.state.videos;
    var newVideoState = update(currentVideoState, { $push: [{
        title: vidTitle,
        vidId: "https://www.youtube.com/embed/" + vidId
      }] });
    this.setState({ videos: newVideoState });
    this.setState({ loading: true });
  },

  handleChange: function () {
    this.state.selectedVideos = "";
    var selectedArtistValue = this.refs.selectedArtist.value;
    this.setState({ selectedVideo: selectedArtistValue });
    this.checkState();
  },

  checkState: function () {
    var currentVideoState = this.state.videos;
    if (currentVideoState.length == 0) {
      this.getVideos();
    } else {
      currentVideoState.splice(0, currentVideoState.length);
      this.setState({ videos: currentVideoState });
      this.getVideos();
    }
  },
  loadIframe: function () {
    this.setState({ loading: false });
  },

  showLoadingMessage: function () {
    if (this.state.loading) {
      return React.createElement(
        'h1',
        null,
        ' Loading your videos '
      );
    } else {
      return React.createElement('span', null);
    }
  },

  render: function () {
    var optionStyle = {
      display: 'none'
    };
    var videos = this.state.videos.map((data, index) => {
      return React.createElement(
        'div',
        { className: 'videoBox' },
        React.createElement(Video, {
          title: data.title,
          key: data.title + index,
          vidId: data.vidId,
          iFrameLoaded: this.loadIframe
        })
      );
    });
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement(
          'label',
          null,
          'Select Artist'
        ),
        React.createElement(
          'select',
          { className: 'form-control',
            ref: 'selectedArtist',
            onChange: this.handleChange },
          React.createElement(
            'option',
            { value: 'Stevie Wonder' },
            ' Stevie Wonder '
          ),
          React.createElement(
            'option',
            { value: 'Frank Sinatra' },
            ' Frank Sinatra '
          ),
          React.createElement(
            'option',
            { value: 'Elton John' },
            ' Elton John '
          ),
          React.createElement(
            'option',
            { value: 'Louis Armstrong' },
            ' Louis Armstrong '
          )
        )
      ),
      this.showLoadingMessage,
      React.createElement(
        'div',
        { className: 'container' },
        videos
      )
    );
  }
});

module.exports = VideoContainer;
