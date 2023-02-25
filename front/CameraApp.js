import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';

export default function CameraApp() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    // let sharePic = () => {
    //   shareAsync(photo.uri).then(() => {
    //     setPhoto(undefined);
    //   });
    // };

    // let savePhoto = () => {
    //   MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
    //     setPhoto(undefined);
    //   });
    // };

    // import axios from 'axios';
    
    let sharePic = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(async asset => {
        const fileUri = asset.uri;
        const fileBase64 = await FileSystem.readAsStringAsync(fileUri, { encoding: 'base64' });
        const formData = new FormData();
        formData.append('photo', {
          uri: fileUri,
          name: 'photo.jpg',
          type: 'image/jpeg',
          data: fileBase64,
        });
        axios.post('https://59d1-2001-861-3506-320-b161-ec8e-afb6-9eb7.eu.ngrok.io/photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(() => {
          setPhoto(undefined);
        }).catch(error => {
          console.error(error);
        });
      }).catch(error => {
        console.error(error);
      });
    };
    
    


    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <Button title="Take" onPress={takePic} />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    borderRadius:'24px',
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  }
});