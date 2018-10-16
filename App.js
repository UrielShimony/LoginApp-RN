import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import firebase from 'react-native-firebase'


import Avatar from './Componenets/Avatar'
import Welcome from './Componenets/Welcome'
import GoogleLoginButton from './Componenets/GoogleLoginButton'
import FBLoginButton from './Componenets/FBLoginButton'

// const FBLoginButton = props => <LoginButton {...props}/>;

export default class App extends Component {

  state = {
    currentUser: undefined,
    userImageUrl: undefined,
    userName: undefined,
    isLoggedIn: 'No'  // {No || With Google || With Facebook}
  };


  loginWithFacebook = async () => {
    try {
      if (this.state.isLoggedIn === 'With Google') {
        //logout from google.
        await GoogleSignin.signOut();
      }
      const result = await LoginManager.logInWithReadPermissions(["email", 'public_profile']);

      if (result.isCancelled) {
        console.log('Result is canclled');
        return
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw "Something went wrong obtaining the users access token";
      }

      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

      const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

      //login with Oauth success
      this.displayUser(currentUser);

    } catch (err) {
      LoginManager.logOut();
      alert('Something went wrong, please login again');
      console.log('eror in login- ', err);
    }
  };

  loginWithGoogle = async () => {
    try {
      if (this.state.isLoggedIn === 'With Facebook') {
        //log out from faceBook
        await LoginManager.logOut();
      }
      await GoogleSignin.configure();

      await GoogleSignin.hasPlayServices();
      const data = await GoogleSignin.signIn();

      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)

      const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

      this.displayUser(currentUser);

    } catch (error) {
      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert(' play services not available or outdated');
      } else {
        LoginManager.logOut();
        alert('Something went wrong, please login again');
        console.log('eror in login- ', error);
      }
    }
  }


  GoogleLogOut = async () => {
    try {
      await LoginManager.logOut();
      this.onLogout();
    } catch (error) {
      alert('something went wrong please make sure you are ' +
        'logedin and have internet')
    }
  };

  faceBookLogOut = async () => {
    try {
      await LoginManager.logOut();
      this.onLogout();
    } catch (error) {
      alert('something went wrong please make sure you are ' +
        'logedin and have internet')
    }
  };

  onLogout = () => {
    this.setState({
      currentUser: undefined,
      userImageUrl: undefined,
      userName: undefined,
      isLoggedIn: 'No'
    })
  };


  displayUser = (currentUser) => {

    const loggedIn = currentUser.additionalUserInfo.providerId === 'facebook.com' ? 'With Facebook' : 'With Google';

    this.setState({
      currentUser: currentUser,
      userImageUrl: currentUser.user.photoURL,
      userName: currentUser.user.displayName,
      isLoggedIn: loggedIn
    });
  };

  render() {
    console.log(this.state);
    const {currentUser} = this.state; // For other flows..

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Welcome userName={this.state.userName}/>
          <Avatar imageUrl={this.state.userImageUrl}/>
        </View>

        <View style={styles.buttons}>
          <FBLoginButton
            readPermissions={["email", "public_profile"]}
            onLogIn={this.loginWithFacebook}
            onLogOut={this.faceBookLogOut}
            loginState={this.state.isLoggedIn}
          />
          <GoogleLoginButton
            onLogIn={this.loginWithGoogle}
            onLogOut={this.GoogleLogOut}
            loginState={this.state.isLoggedIn}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
  },
});
