import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    Image,
    TouchableOpacity,
    BackHandler,
    Button,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useLogin } from '../context/LoginProvider';
let id = '';
const Users = () => {
    const { setIsLoggedIn } = useLogin()
    const [users, setUsers] = useState([]);
    const navigation = useNavigation();
    const [mode, setMode] = useState('LIGHT');
    const isFocued = useIsFocused();
    useEffect(() => {
        getUsers();
    }, []);
    useEffect(() => {
        getMode();
    }, [isFocued]);
    const getMode = async () => {
        setMode(await AsyncStorage.getItem('MODE'));
    };
    const getUsers = async () => {
        id = await AsyncStorage.getItem('UID');
        let tempData = [];
        const Mobile = await AsyncStorage.getItem('MOBILE');
        firestore().collection('users').where('mobile', '!=', Mobile).get().then(res => {
            if (res.docs != []) {
                res.docs.map(item => {
                    tempData.push(item.data());
                    console.log(tempData)
                });
            }
            setUsers(tempData);
        });
    };
    return (
        <View
            style={[
                styles.container,
            ]}>
            <FlatList
                data={users}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            style={[styles.userItem, { backgroundColor: 'white' }]}
                            onPress={() => {
                                navigation.navigate('Chat', { data: item, id: id });
                            }}>
                            <Text style={styles.name}>{item.name}</Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

export default Users;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    header: {
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'purple',
        fontSize: 20,
        fontWeight: '600',
    },
    userItem: {
        width: Dimensions.get('window').width - 50,
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'row',
        height: 60,
        borderWidth: 0.5,
        borderRadius: 10,
        paddingLeft: 20,
        alignItems: 'center',
    },
    userIcon: {
        width: 40,
        height: 40,
    },
    name: { color: 'black', marginLeft: 20, fontSize: 20 },
});