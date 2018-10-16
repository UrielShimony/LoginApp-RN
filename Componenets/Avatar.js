import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default Avatar = ({imageUrl}) => {

  console.log(imageUrl);
  return (
    <View style={styles.avatar}>
      {imageUrl ?
        <Image source={{uri: imageUrl + '?width=240&height=240'}} style={styles.avatarImage}/>
        :
        <View>
          <Icon name="user-circle" size={100} color="rgba(0,0,0,.09)"/>
          <Text style={styles.text}>
            Please log in !
          </Text>
        </View>
      }
    </View>
  )
};
const styles = {
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 75,
    height: 150,
    width: 150,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
};
