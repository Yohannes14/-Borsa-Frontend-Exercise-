import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { COLORS } from '../../utils/color';

const CustomTextInput = ({ ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.input} {...props} secureTextEntry={props.secureTextEntry && !showPassword} key="textInput" />
            {props.secureTextEntry && (
                <TouchableOpacity style={styles.iconContainer} onPress={togglePasswordVisibility}>
                    <Entypo name={showPassword ? 'eye-with-line' : 'eye'} size={24} color="#D4D4D4" />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default CustomTextInput;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D4D4D4',
        backgroundColor: "#EEEDEB",
    },
    countryCode: {
        paddingHorizontal: 10,
        fontSize: 16,
        color: COLORS['grey-700'],
        borderRightWidth: 1,
        borderRightColor: COLORS['gray-300']
    },
    input: {
        flex: 1,
        padding: 10,
    },
    iconContainer: {
        padding: 10,
    },
});