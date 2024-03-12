import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Chat from '../screens/Chat';
import GroupChatScreen from '../screens/GroupChatScreen';
import Users from '../screens/Users';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useLogin } from '../context/LoginProvider';
import { StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const HomeNavigator = () => {
    const goToNext = async (mobile, id) => {
        await AsyncStorage.removeItem('MOBILE', mobile)
        await AsyncStorage.removeItem('UID', id)
    }
    const { setIsLoggedIn } = useLogin()
    return (
        <Stack.Navigator initialRouteName="ChatList">
            <Stack.Screen name="ChatApp" component={Users} options={{
                headerLeft: null, headerRight: () => {
                    return (<TouchableOpacity onPress={() => {
                        goToNext()
                        setIsLoggedIn(false)
                    }} style={[styles.l_o]}><Text>Log Out</Text></TouchableOpacity>)
                }
            }} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="GroupChat" component={GroupChatScreen} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    l_o: {
        width: 70,
        alignSelf: 'center',
        flexDirection: 'row',
        marginRight: 10,
        height: 30,
        borderWidth: 0.5,
        borderRadius: 10,
        paddingLeft: 10,
        alignItems: 'center',
    },
}
)

export default HomeNavigator;
