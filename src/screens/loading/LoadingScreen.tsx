import { Auth } from 'aws-amplify';
import React, {Component} from 'react';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import { styles } from "./styles";

interface IProps {}
export default class LoadingScreen extends Component<IProps> {

  constructor(props) {
		super(props);
		this._bootstrap();
	}

  _bootstrap() {
    Auth.currentAuthenticatedUser().then(() => {
      this.props.navigation.navigate("App");
    }).catch(() => {
      this.props.navigation.navigate("Auth");
    });
  }

  render () {
    return (
      <SafeAreaView style = {styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }
};
