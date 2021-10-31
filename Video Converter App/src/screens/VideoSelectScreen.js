import _ from "lodash";
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import * as actions from "../actions";
import MyDropzone from "../components/myDropZone";

class VideoSelectScreen extends Component {
  state = {
    hovering: false,
  };

  render() {
    return (
      <div
        className={
          this.props.small ? "video-select-screen-small" : "video-select-screen"
        }
      >
        <MyDropzone />
      </div>
    );
  }
}

export default connect(null, actions)(VideoSelectScreen);
