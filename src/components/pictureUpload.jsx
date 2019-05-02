import React from 'react'
import ReactCrop from 'react-image-crop'
import Dropzone from 'react-dropzone'
import {
  Button,
  Grid,
  Icon,
  Segment,
} from 'semantic-ui-react'

import 'react-image-crop/dist/ReactCrop.css'

/*
WORKFLOW :
- Si image -> afficher
- Si clicker -> on passe en edit et pouvoir drag & drop une image
- Sinon mettre le mode edit et pouvoir drag & drop une image


- On affiche le cropper avec button valider
*/

class PictureUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      src: null,
      crop: {
        aspect: 1,
        width: 50,
        x: 0,
        y: 0
      }
    };
  }

  onSelectFile = acceptedFiles => {
    if (acceptedFiles) {
      const reader = new FileReader();
      reader.addEventListener('load', () => this.setState({ src: reader.result, edit: true }) );
      reader.readAsDataURL(acceptedFiles[0]);
    }
  };

  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image;
  };

  onImageClicked = () => {
    this.setState({ edit: true });
  };

  onCropComplete = (crop, pixelCrop) => {
    this.makeClientCrop(crop, pixelCrop);
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  async makeClientCrop(crop, pixelCrop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg( this.imageRef, pixelCrop, 'newFile.jpeg');
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, pixelCrop, fileName) {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage( image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  render() {
    const { edit, crop, croppedImageUrl, src } = this.state;

    return (
      <div>
        { !edit && (
          <img src={src} />
        ) }
        { (edit || !src) && (
          <Dropzone multiple={false} onDrop={this.onSelectFile} className="container">
            {({ getRootProps, getInputProps }) => (
              <section>
                <div { ...getRootProps({className: 'dropzone'}) }>
                  <input { ...getInputProps() } />
                  <p>Drag&Drop ou click</p>
                </div>
              </section>
            )}
          </Dropzone>
        ) }
        { (edit && src) && (
          <div>
            <Segment attached>
              <ReactCrop src={src} crop={crop} onImageLoaded={this.onImageLoaded} onComplete={this.onCropComplete} onChange={this.onCropChange} />
            </Segment>
            <Button positive attached='bottom'>Valider !</Button>
          </div>
        ) }
      </div>
    );
  }
}

export default PictureUpload
