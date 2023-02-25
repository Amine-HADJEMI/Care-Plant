import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { View, Button, Image } from 'react-native';
import axios from 'axios';

export default function PhotoUploader() {
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access camera was denied');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const fileUri = result.uri;
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
      }).then(response => {
        console.log('Photo saved successfully', response.data);
        setPhoto(fileUri);
      }).catch(error => {
        console.error('Failed to save photo', error);
      });
    }
  };

  return (
    <View>
      {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />}
      <Button title="Take a photo" onPress={takePhoto} />
    </View>
  );
}
