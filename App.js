import React, { Component } from 'react';
import { StyleSheet, Text, Slider, View, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      image: null,
      cameraType: RNCamera.Constants.Type.back,
      changeFlash: RNCamera.Constants.FlashMode.off,
      flashText: 'flash off',
      cameraZoom: 0,
      barCodeType: '',
      barCodeData: ''

    }
  }

  handleCapturePhoto = () => {
    if (this.camera) {
      this.camera.takePictureAsync({
        quality: 1,
        width: 500,
        base64: true,
      })
        .then((data) => {
          this.setState({ image: data });
        });
    }
  }

  changeFlash = () => {
    if (this.camera) {
      if (this.state.changeFlash == RNCamera.Constants.FlashMode.off) {
        this.setState({ flashText: 'flash ON', changeFlash: RNCamera.Constants.FlashMode.on });
      } else if (this.state.changeFlash == RNCamera.Constants.FlashMode.on) {
        this.setState({ flashText: 'flash auto', changeFlash: RNCamera.Constants.FlashMode.auto });
      } else if (this.state.changeFlash == RNCamera.Constants.FlashMode.auto) {
        this.setState({ flashText: 'flash torch', changeFlash: RNCamera.Constants.FlashMode.torch });
      } else if (this.state.changeFlash == RNCamera.Constants.FlashMode.torch) {
        this.setState({ flashText: 'flash off', changeFlash: RNCamera.Constants.FlashMode.off });
      }
    }
  }

  changeCamera = () => {
    if (this.camera) {
      if (this.state.cameraType == RNCamera.Constants.Type.back) {
        this.setState({ cameraType: RNCamera.Constants.Type.front });
      } else {
        this.setState({ cameraType: RNCamera.Constants.Type.back });
      }
    }
  }

  changeZoom = (value) => {
    this.setState({ cameraZoom: value });
  }


  readBarCode = (response) => {
    alert("entrei")
    if (response.type != null) {
      this.setState({ barCodeType: response.type, barCodeData: response.data });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.camera}
          flashMode={this.state.changeFlash}
          ref={(camera) => this.camera = camera}
          type={this.state.cameraType}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr, RNCamera.Constants.BarCodeType.ean13]}
          zoom={this.state.cameraZoom}
          onBarCodeRead={(response) => {
            if (response.type != null) {
              this.setState({ barCodeType: response.type, barCodeData: response.data });
            }
          }}
          permissionDialogMessage={"Deixa eu usar tua camera"}
          permissionDialogMessage={"A gente precisa"}
        />
        <View style={styles.controlArea}>
          <View style={styles.controlAreaItem}>
            <Button title={this.state.flashText} onPress={this.changeFlash} />
          </View>
          <View style={styles.controlAreaItem}>
            <Button title="Trocar foto" onPress={this.changeCamera} />
          </View>
          <View style={styles.controlAreaItem}>
            <Button title="Tirar foto" onPress={this.handleCapturePhoto} />
          </View>
        </View>

        <View style={styles.responseArea}>
          <Text>{this.state.barCodeType}</Text>
          <Text>{this.state.barCodeData}</Text>
        </View>

        <Slider
          minimumValue={0}
          maximumValue={1}
          onValueChange={this.changeZoom}
          style={styles.slider}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  camera: {
    flex: 1,
  },
  controlArea: {
    height: 150,
    flexDirection: 'row'
  },
  controlAreaItem: {
    flex: 1,
    padding: 5
  },
  photoArea: {
    width: 200,
    height: 200
  },
  slider: {
    width: '100%',
    height: 50
  },
  responseArea: {
    height: 100
  }
});