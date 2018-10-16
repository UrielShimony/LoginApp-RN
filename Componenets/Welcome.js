import React, {Component} from 'react';
import {Text} from 'react-native';


export default Welcome = ({userName}) => {

  return (
    userName ?
      <Text style={styles.header}>
        Welcome {userName} :)
      </Text>
      :
      <Text style={styles.header}>
        Welcome Stranger!
      </Text>

  )
};
const styles = {
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
};
