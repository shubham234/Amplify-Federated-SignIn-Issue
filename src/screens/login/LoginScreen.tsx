import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, Linking, AppState } from 'react-native';
import { Auth, Hub } from 'aws-amplify';
import React, {Component} from 'react';
import { styles } from "./styles";

interface IProps {}
export default class LoginScreen extends Component<IProps> {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this._onLoginButtonPress = this._onLoginButtonPress.bind(this);
  }

  componentDidMount() {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          console.warn("Login Successful");
          this.props.navigation.navigate("App");
          break;
        case "signIn_failure":
          console.warn("Login Failure. Reason: " + JSON.stringify(data));
          break;
          // TODO: Display error message.
        default:
          console.warn("Encountered uncaught event");
      }
    });

    AppState.addEventListener("change", this.handleAppStateChange);
    Linking.addEventListener('url', this._handleOpenURL);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL = (event) => {
    console.warn("_handleOpenURL event is " + JSON.stringify(event));
  }

  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      console.warn('LoadingScreen: App has come to the foreground!');
      Linking.getInitialURL().then((url) => {
        if (url) {
          console.warn('LoadingScreen: Initial url is: ' + url);
        } else {
          console.warn('LoadingScreen: Initial url is null');
        }
      }).catch(err => console.warn('An error occurred', err));
    } else {
      console.warn("LoadingScreen: App state change to " + nextAppState);
    }
  };

  _onLoginButtonPress = () => {
    this.setState({isLoading: true});
    try {
    Auth.federatedSignIn({provider: 'FederateOIDC'});
    } catch(err) {
      console.warn("federatedSignIn error " + err);
    }
  }

  render () {
    const isLoading = this.state.isLoading;
    return (
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.loginButtonContainer}>
        {isLoading ? (<ActivityIndicator size="large" color="#0000ff" />) : (
          <TouchableOpacity style={styles.loginButton} onPress={this._onLoginButtonPress}>
            <Text style={styles.loginButtonText}> Get Started </Text>
          </TouchableOpacity>)}
        </SafeAreaView>
      </SafeAreaView>
    );
  }
};
