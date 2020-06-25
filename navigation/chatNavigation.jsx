import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ChatScreen from '../screens/ChatScreen';

const chatStack = createStackNavigator({
    welcome: WelcomeScreen,
    login: LoginScreen,
    signup: SignupScreen,
    chat: ChatScreen
},{headerMode: 'none'})

export default createAppContainer(chatStack);