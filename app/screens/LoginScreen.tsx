import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import CustomTextInput from 'app/components/form/CustomTextInput';
import { COLORS } from 'app/utils/color';
import CustomButton from 'app/components/button/CustomButton';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'app/redux/store';
import { loginRequest } from 'app/redux/actions/authAction';
import { saveAuthToken } from 'app/utils/tokenStorage';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [loginPress, setLoginPress] = useState(false);

    const dispatch = useAppDispatch()
    const users = useAppSelector(state => state?.auth);
    const { error, isAuthenticated, loading, user } = users;


    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // /FUNCTION TO HANDLE LOGIN 
    const handleLogin = async (values: { email: string, password: string }) => {
        setLoginPress(true)
        dispatch(loginRequest(values))
    }

    useEffect(() => {
        const saveToken = async () => {
            if (isAuthenticated && loginPress && user) {
                await saveAuthToken(user)
            }
        }
        saveToken();
    }, [isAuthenticated, loginPress])


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.innerContainer}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 24 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.primary }}>Login to your account</Text>
                </View>
                {
                    error && loginPress && (
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 3 }}>
                            <Text style={{ color: COLORS.secondary }}>{error}</Text>
                        </View>
                    )
                }

                {/* FOMR CONTAINER */}
                <View style={styles.formContainer}>
                    <Text style={[styles.text, { color: COLORS['grey-700'] }]}>Email Address</Text>
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: {
                                value: true,
                                message: "Email Address is required",
                            },
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={{ marginBottom: 12 }}>

                                <CustomTextInput
                                    placeholder='Enter your email'
                                    placeholderTextColor={COLORS['grey-700']}
                                    secureTextEntry={false}
                                    textAlign="start"
                                    textAlignVertical="center"
                                    autoCapitalize="none"
                                    countryCode="+251" // 
                                    onBlur={onBlur}
                                    onChangeText={(value) => {
                                        setValue("email", value.replace(/\s/g, ""), true);
                                        onChange(value.replace(/\s/g, ""));
                                    }}
                                    value={value}
                                />
                                {errors.email && (
                                    <View style={styles.formError}>
                                        <MaterialIcons name="error-outline" color="#E12300" />
                                        <Text style={styles.formErrorText}>
                                            {errors.email.message}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        )
                        }
                    />
                    <Text style={[styles.text, { color: COLORS['grey-700'] }]}>Password</Text>
                    < Controller
                        control={control}
                        name="password"
                        rules={{
                            required: {
                                value: true,
                                message: "Password is required",
                            },
                            pattern: {
                                value: /^.{6,}$/,
                                message: "Password should be at least 6 characters long.",
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={{ marginBottom: 12 }}>

                                <CustomTextInput
                                    placeholder='Enter password'
                                    placeholderTextColor={COLORS['grey-700']}
                                    secureTextEntry={true}
                                    textAlign="start"
                                    textAlignVertical="center"
                                    autoCapitalize="none"
                                    onBlur={onBlur}
                                    onChangeText={(value) => {
                                        setValue("password", value.replace(/\s/g, ""), true);
                                        onChange(value.replace(/\s/g, ""));
                                    }}
                                    value={value}
                                />
                                {errors.password && (
                                    <View style={styles.formError}>
                                        <MaterialIcons name="error-outline" color="#E12300" />
                                        <Text style={styles.formErrorText}>
                                            {errors.password.message}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        )}
                    />
                    < CustomButton
                        isLoading={loading}
                        onPress={handleSubmit(handleLogin)}
                        title="Sign In"
                    />
                </View>
                {/* REGISTRATION LINK */}
                <View style={styles.registerLink}>
                    <Text style={{ fontSize: 16 }}> Don't have an Account ?
                        <Text style={[styles.text, { color: COLORS.primary }]} onPress={() => navigation.navigate("Signup")}> Sign up</Text>
                    </Text>

                </View>
            </View>
        </ScrollView >
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
    },
    innerContainer: {
        flex: 1,
        width: '85%',
        justifyContent: 'center',
        //gap: 30,
    },
    formContainer: {
        width: '100%',
        marginVertical: 4,
    },

    registerLink: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        padding: 6,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 12,
    },
    formError: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    formErrorText: {
        color: COLORS.secondary,
        fontSize: 12,
        marginLeft: 4,
    },
});