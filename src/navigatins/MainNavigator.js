import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import Chat from '../screens/Chat';
import GroupChatScreen from '../screens/GroupChatScreen';
import Users from '../screens/Users';
import { useContext } from 'react';
import { useLogin } from '../context/LoginProvider';
import HomeNavigator from './HomeNavigator';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  )
}
const MainNavigator = () => {
  const { isLoggedIn } = useLogin()
  return isLoggedIn ? <HomeNavigator /> : <AuthNavigator />
};

export default MainNavigator;
