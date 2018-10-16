import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';


export default FBLoginButton = ({loginState, onLogIn, onLogOut}) => {

  const onPress = () => {
    if (loginState === 'With Facebook') {
      onLogOut();
    } else {
      onLogIn()
    }
  };

  return (
    <Icon.Button
      name="facebook"
      backgroundColor="#3b5998"
      onPress={onPress}
      {...iconStyles}
    >
      {loginState === 'With Facebook' ? 'LogOff' : 'Login with FaceBook'}
    </Icon.Button>

  )
};
const iconStyles = {
  borderRadius: 10,
  iconStyle: {paddingVertical: 5},
  width:170,
  height:50,
  justifyContent:'center'
};
