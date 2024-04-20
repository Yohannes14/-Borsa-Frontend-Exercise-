
import React from 'react'
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" options={{
                headerShown: false,
                headerShadowVisible: false,
            }}
                component={LoginScreen} />
            <Stack.Screen name="Signup"
                options={{
                    title: "Sign up",
                    headerStyle: {
                        backgroundColor: '#F3F3F3',

                    },
                    //headerShown: false,
                    headerShadowVisible: false,
                }}
                component={SignUpScreen} />
        </Stack.Navigator>
    )
}