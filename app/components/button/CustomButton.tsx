import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import CustomPressable from './CustomPressable';
import { COLORS } from '../../utils/color';
import { CustomButtonProps } from 'app/types/types';

const CustomButton: FC<CustomButtonProps> = ({
    title,
    onPress,
    isLoading
}) => {
    return (
        <View style={styles.container}>
            <CustomPressable style={styles.button} onPress={onPress}>
                {isLoading ? (
                    <ActivityIndicator
                        color={COLORS.white}
                        style={{
                            marginRight: 8,
                        }}
                    />
                ) :
                    <Text style={styles.buttonText}>{title}</Text>
                }
            </CustomPressable>
        </View>
    );
}


export default CustomButton

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        width: '100%',
    },
    button: {
        backgroundColor: '#337744',
        borderRadius: 10,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: COLORS.primary,
        alignItems: 'center',

    },
    buttonText: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
    },
});