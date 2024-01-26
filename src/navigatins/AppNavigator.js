import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import Chat from './screens/Chat';
import GroupChatScreen from './screens/GroupChatScreen';
import Users from './screens/Users';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ChatList" component={Users} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="GroupChat" component={GroupChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
