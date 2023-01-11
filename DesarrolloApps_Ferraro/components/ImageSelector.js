import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as ImagePicker from "expo-image-picker"
import {COLORS} from "../constants"
import { useState } from 'react'


const ImageSelector = (props) => {
    const [pickedUri, setPickedUri] = useState();
  
    const verifyPermissions = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
  
      if (status !== "granted") {
        Alert.alert(
          "Permisos insuficientes",
          "Necesita dar permisos de la cámara para usar la aplicación",
          [{ text: "OK" }]
        );
        return false;
      }
      return true;
    };
  
    const handlerTakeImage = async () => {
      const isCameraOk = await verifyPermissions();
      if (!isCameraOk) return;
  
      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });
      setPickedUri(image.assets[0].uri);
      props.onImage(image.assets[0].uri);
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.preview}>
          {!pickedUri ? (
            <Text>No hay imagen seleccionada...</Text>
          ) : (
            <Image style={styles.image} source={{ uri: pickedUri }} />
          )}
        </View>
        <Button
          title="Tomar Foto"
          color={COLORS.LIGTH_PINK}
          onPress={handlerTakeImage}
        />
      </View>
    );
};

export default ImageSelector

const styles = StyleSheet.create({
    container: {
      marginBottom: 10,
    },
    preview: {
      width: "100%",
      height: 200,
      marginBottom: 10,
      justifyContent: "center",
      alignItems: "center",
      borderColor: COLORS.BLUSH,
      borderWidth: 1,
    },
    image: {
      width: "100%",
      height: "100%",
    },
  });