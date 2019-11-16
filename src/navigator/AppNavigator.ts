import HomeScreen from "../screens/home/HomeScreen";
import LoadingScreen from "../screens/loading/LoadingScreen";
import LoginScreen from "../screens/login/LoginScreen";

import { createStackNavigator, createSwitchNavigator } from  'react-navigation';

const AppNavigator = createStackNavigator({
  Home : {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: "Enagagement",
    })
  }},
  {
    initialRouteName: 'Home',
  }
);

const AuthNavigator = createStackNavigator ({
  Login: {
    screen: LoginScreen,
    path: 'signin'
  }},
  {
    initialRouteName: "Login"
  }
);

const NavigatorDefinition = createSwitchNavigator({
	Loading: {
    screen: LoadingScreen
  },
	App: AppNavigator,
	Auth: AuthNavigator,
},{
	initialRouteName: "Loading"
});

export default NavigatorDefinition;
