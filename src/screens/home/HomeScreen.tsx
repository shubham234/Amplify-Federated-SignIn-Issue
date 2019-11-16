import { Auth } from 'aws-amplify';
import React, {Component} from 'react';
import { Text, SafeAreaView, Button } from 'react-native';
import { styles } from "./styles";

interface IProps {}
export default class HomeScreen extends Component<IProps> {

  constructor(props) {
    super(props);
    this.state = {
      username: null
    }
  }

  signOut() {
    Auth.signOut({ global: true })
      .then(() => {
        this.props.navigation.navigate("Auth");
      }).catch(err => console.log("SignOut failure " + err));
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        this.setState({username: user.attributes.preferred_username});
      }).catch((err) => {
        console.log("HomeScreen unAuthenticated User:" + JSON.stringify(err));
      })
  }

  render () {
    return (
      <SafeAreaView style = {styles.container}>
        <Text>Hi {this.state.username}</Text>
        <Button title="Sign Out" onPress={() => this.signOut()}/>
      </SafeAreaView>
    );
  }
};
