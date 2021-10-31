import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    // invalid file types are not added to files object
    const videos = _.map(files, ({ name, path, size, type }) => {
      return { name, path, size, type };
    });

    if (videos.length) {
      this.props.addVideos(videos);

      if (!this.props.small) {
        this.props.history.push("/convert");
      }
    }
  }, []);

  const renderChildren = ({ isDragActive, isDragReject }) => {
    if (isDragActive) {
      if (isDragReject) {
        return (
          <h4 className="drop-message">
            Uh oh, I don't know how to deal with that type of file!
          </h4>
        );
      } else {
        return (
          <h4 className="drop-message">Omnomnom, let me have those videos!</h4>
        );
      }
    } else {
      return (
        <h4 className="drop-message">
          Drag and drop some files on me, or click to select.
        </h4>
      );
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({ onDrop, accept: "video/*", multiple: true });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? "dropzone-active" : ""} ${
        isDragReject ? "dropzone-reject" : ""
      }`}
    >
      <input {...getInputProps()} />
      {renderChildren({ isDragActive, isDragReject })}
    </div>
  );
}

export default MyDropzone;
