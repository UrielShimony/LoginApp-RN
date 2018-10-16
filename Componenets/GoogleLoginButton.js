import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';


export default GoogleLoginButton = ({loginState, onLogIn, onLogOut}) => {

  const onPress = () => {
    if (loginState === 'With Google') {
      onLogOut();
    } else {
      onLogIn()
    }
  };

  return (
    <Icon.Button
      name="google"
      backgroundColor="#DD4B39"
      onPress={onPress}
      {...iconStyles}
    >
      {loginState === 'With Google' ? 'LogOff' : 'Or with Google'}
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
