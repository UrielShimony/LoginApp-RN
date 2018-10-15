import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AccessToken, LoginButton, LoginManager} from 'react-native-fbsdk';
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class App extends Component {

  state = {
    currentUser: undefined,
  };

  componentDidMount() {
  };

  componentWillUnmount() {
  };

  onLoginWithFacebook = async (result, error) => {
    try {
      if (error.isCancelled) {
        console.log('Result is canclled');
        return
      }
      //TODO if google is logedin
      //TODO setState for loading phase.

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw "Something went wrong obtaining the users access token";
      }

      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

      const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      //login with Oauth success
      this.setState({
        currentUser: currentUser
      });


    } catch (err) {
      LoginManager.logOut();
      alert('Something went wrong, please login again');
      console.log('erorin login- ', err);
    }
  };
  onLogout = () => {
    this.setState({
      currentUser: undefined,
    })
  };


  loginWithGoogle = () => {
//Todo handle both login
  };

  render() {
    const {currentUser} = this.state;
    return (
      <View style={styles.container}>
        {currentUser
          ? // Show user info if already logged in
          <View style={styles.content}>
            <Text style={styles.header}>
              Welcome {currentUser.user.displayName}!
            </Text>
            <View style={styles.avatar}>
              <Image source={{uri: currentUser.user.photoURL + '?width=240&height=240'}} style={styles.avatarImage}/>
            </View>
          </View>
          : // Show Please log in message if not
          <View style={styles.content}>
            <Text style={styles.header}>
              Welcome Stranger!
            </Text>
            <View style={styles.avatar}>
              <Icon name="user-circle" size={100} color="rgba(0,0,0,.09)"/>
            </View>
            <Text style={styles.text}>
              Please log in !
            </Text>
          </View>
        }
        <View style={styles.buttons}>
          <LoginButton
            readPermissions={["email", "public_profile"]}
            onLoginFinished={this.onLoginWithFacebook}
            onLogoutFinished={this.onLogout}/>
          <Icon.Button
            name="google"
            backgroundColor="#DD4B39"
            onPress={this.loginWithGoogle}
            {...iconStyles}
          >
            Or with Google
          </Icon.Button>
        </View>
      </View>
    );

  }
}
const iconStyles = {
  borderRadius: 10,
  iconStyle: {paddingVertical: 5},
};

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
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 75,
    height: 150,
    width: 150,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
  },
});
