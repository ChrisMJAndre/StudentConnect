// React Imports
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

const ImageScreen = ({ route }) => {
  const [image, setImage] = useState("");

  // Image is set to the params sendt with, and emptied upon leaving
  useEffect(() => {
    setImage(route.params.image);

    return () => {
      setImage("");
    };
  }, []);

  // All content rendered
  return (
    <View>
      <Image
        source={{ uri: image ? image : null }}
        width={Dimensions.get("window").width}
        height={Dimensions.get("window").height}
      />
    </View>
  );
};

export default ImageScreen;
