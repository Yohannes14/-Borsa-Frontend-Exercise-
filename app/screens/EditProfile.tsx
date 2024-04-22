import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuthToken, saveAuthToken } from 'app/utils/tokenStorage';
import UserProfile from 'app/components/UserProfile';
import CustomButton from 'app/components/button/CustomButton';
import { Controller, useForm } from 'react-hook-form';
import { COLORS } from 'app/utils/color';
import CustomTextInput from 'app/components/form/CustomTextInput';
import { User } from 'app/types/types';
import { useAppDispatch, useAppSelector } from 'app/redux/store';
import { updateProfileRequest } from 'app/redux/actions/userAction';

const EditProfile = () => {
    const [user, setUser] = useState<any>(null);
    const [editProfilePress, setEditProfilePress] = useState(false);
    const dispatch = useAppDispatch()
    const { error, loading, user: currentUser } = useAppSelector(state => state?.profile);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const usrData = await getAuthToken();
                setUser(usrData);
            } catch (error) {
                return;
            }
        };

        fetchUser();
    }, []);

    /// to save user after update profile

    useEffect(() => {
        const saveToken = async () => {
            if (currentUser) {
                await saveAuthToken(currentUser)
            }
        }
        saveToken();
    }, [currentUser])



    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            userName: user?.userName || '',
            isBuyer: user?.isBuyer || false,
            address: user?.address || '',
            profilePic: user?.profilePic || '',
        },
    });

    useEffect(() => {
        if (user) {
            Object.keys(user).forEach((key) => {
                setValue(key as any, user[key]);
            });
        }
    }, [user, setValue]);

    // /FUNCTION TO HANDLE Update profile 
    const handleUpdate = async (values: User) => {
        const data: User = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            userName: values.userName,
            isBuyer: values.isBuyer,
            address: values.address,
            profilePic: values.profilePic,
        }
        dispatch(updateProfileRequest(user?._id, data))

    }
    useEffect(() => {
        if (currentUser) {
            //setUser(currentUser);
            setEditProfilePress(false);
        }
    }, [currentUser]);

    return (
        <View style={styles.container}>
            {currentUser && (
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 4 }}>
                    <Text style={{ fontSize: 15, color: COLORS.primary }}> The user profile was successfully updated</Text>
                </View>

            )}
            <UserProfile
                name={`${!!currentUser ? currentUser?.firstName : user?.firstName} ${!!currentUser ? currentUser?.lastName : user?.lastName} `}
                userName={!!currentUser ? currentUser?.userName : user?.userName}
                onEditPress={() => setEditProfilePress(true)}
            />

            {/* FOMR CONTAINER */}
            {editProfilePress && (
                <ScrollView contentContainerStyle={styles.formContainer}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary }}>Update Profile</Text>
                    </View>
                    {error && (
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
                            <Text style={{ fontSize: 15, color: COLORS.secondary }}> {error}</Text>
                        </View>
                    )}

                    <Text style={[styles.text, { color: COLORS['grey-700'] }]}>First Name</Text>
                    <Controller
                        control={control}
                        name="firstName"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={{ marginBottom: 12 }}>
                                <CustomTextInput
                                    placeholder='Enter your first name'
                                    placeholderTextColor={COLORS['grey-700']}
                                    secureTextEntry={false}
                                    textAlign="start"
                                    textAlignVertical="center"
                                    autoCapitalize="none"
                                    onBlur={onBlur}
                                    onChangeText={(value: any) => {
                                        setValue("firstName", value);
                                        onChange(value);
                                    }}
                                    value={value}
                                />
                            </View>
                        )}
                    />
                    <Text style={[styles.text, { color: COLORS['grey-700'] }]}>Last Name</Text>
                    <Controller
                        control={control}
                        name="lastName"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={{ marginBottom: 12 }}>
                                <CustomTextInput
                                    placeholder='Enter your last name'
                                    placeholderTextColor={COLORS['grey-700']}
                                    secureTextEntry={false}
                                    textAlign="start"
                                    textAlignVertical="center"
                                    autoCapitalize="none"
                                    onBlur={onBlur}
                                    onChangeText={(value: any) => {
                                        setValue("lastName", value);
                                        onChange(value);
                                    }}
                                    value={value}
                                />
                            </View>
                        )}
                    />

                    <Text style={[styles.text, { color: COLORS['grey-700'] }]}>Email Address</Text>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={{ marginBottom: 12 }}>
                                <CustomTextInput
                                    placeholder='Enter your email'
                                    placeholderTextColor={COLORS['grey-700']}
                                    secureTextEntry={false}
                                    textAlign="start"
                                    textAlignVertical="center"
                                    autoCapitalize="none"
                                    onBlur={onBlur}
                                    onChangeText={(value: any) => {
                                        setValue("email", value);
                                        onChange(value);
                                    }}
                                    value={value}
                                />
                            </View>
                        )}
                    />

                    <Text style={[styles.text, { color: COLORS['grey-700'] }]}>User Name</Text>
                    <Controller
                        control={control}
                        name="userName"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={{ marginBottom: 12 }}>
                                <CustomTextInput
                                    placeholder='Enter your userName'
                                    placeholderTextColor={COLORS['grey-700']}
                                    secureTextEntry={false}
                                    textAlign="start"
                                    textAlignVertical="center"
                                    autoCapitalize="none"
                                    onBlur={onBlur}
                                    onChangeText={(value: any) => {
                                        setValue("userName", value);
                                        onChange(value);
                                    }}
                                    value={value}
                                />
                            </View>
                        )}
                    />

                    <Text style={[styles.text, { color: COLORS['grey-700'] }]}>Address (City, Country)</Text>
                    <Controller
                        control={control}
                        name="address"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={{ marginBottom: 12 }}>
                                <CustomTextInput
                                    placeholder="Enter your address (e.g., 'Addis Ababa, Ethiopia')"
                                    placeholderTextColor={COLORS['grey-700']}
                                    secureTextEntry={false}
                                    textAlign="start"
                                    textAlignVertical="center"
                                    autoCapitalize="words"
                                    onBlur={onBlur}
                                    onChangeText={(value: any) => {
                                        setValue("address", value);
                                        onChange(value);
                                    }}
                                    value={value}
                                />
                            </View>
                        )}
                    />

                    <Text style={[styles.text, { color: COLORS['grey-700'] }]}>Profile Picture (Optional)</Text>
                    <Controller
                        control={control}
                        name="profilePic"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={{ marginBottom: 12 }}>
                                <CustomTextInput
                                    placeholder='Enter URL for your profile picture'
                                    placeholderTextColor={COLORS['grey-700']}
                                    secureTextEntry={false}
                                    textAlign="start"
                                    textAlignVertical="center"
                                    autoCapitalize="none"
                                    onBlur={onBlur}
                                    onChangeText={(value: any) => {
                                        setValue("profilePic", value);
                                        onChange(value);
                                    }}
                                    value={value}
                                />
                            </View>
                        )}
                    />

                    <CustomButton
                        onPress={handleSubmit(handleUpdate)}
                        title="Update"
                        isLoading={loading}
                    />
                </ScrollView>
            )}
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    formContainer: {
        // width: '100%',
        marginVertical: 4,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 12,
    }
});