import React, {Component} from 'react';
import { AppRegistry } from 'react-native';

import NavigatorDefinition from "./src/navigator/AppNavigator";
import Amplify, { Auth } from 'aws-amplify';
import AWSConfig from './src/aws/config/AWSConfig';
import AuthTokenStorage from './src/aws/storage/AuthTokenStorage';

//Below code is added to avoid getting invalid_request error from AWS Amplify as per
// https://github.com/aws-amplify/amplify-js/issues/3399
import { polyfillGlobal } from "react-native/Libraries/Utilities/PolyfillFunctions";
polyfillGlobal("URLSearchParams", () => undefined);
delete global.URLSearchParams;

const prefix = "example://";

class App extends React.Component {
  componentDidMount() {
    // Confiure AWS Amplify Modules
    Amplify.configure(AWSConfig);
    Amplify.configure({
      storage: AuthTokenStorage
    });
    Amplify.Logger.LOG_LEVEL = 'DEBUG';
  };

  render() {
    return (
      <NavigatorDefinition uriPrefix={prefix} />
    );
  }
}

AppRegistry.registerComponent('main', () => App );
