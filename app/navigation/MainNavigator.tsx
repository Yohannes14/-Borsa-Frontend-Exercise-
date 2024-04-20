import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import EditProfile from '../screens/EditProfile';
import { COLORS } from 'app/utils/color';
import { getAuthToken } from 'app/utils/tokenStorage';

const Stack = createNativeStackNavigator();


const MainNavigator: React.FC = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const usrData = await getAuthToken();
                setUser(usrData);

            } catch (error) {
                return
            }
        };
        fetchUser();
    }, []);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation }) => ({
                    title: 'User List',
                    headerTitleStyle: {
                        color: COLORS.primary,
                    },
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Profile')}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginRight: 12,
                            }}
                        >
                            {user ? (
                                <>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            marginRight: 5,
                                            color: COLORS.primary,
                                        }}
                                    >
                                        {user.userName}
                                    </Text>
                                    <Ionicons name="person" size={28} color={COLORS.primary} />
                                </>
                            ) : (
                                <Ionicons name="person" size={28} color={COLORS.primary} />
                            )}
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen name="Profile" component={EditProfile} />
        </Stack.Navigator>
    );
};

export default MainNavigator;