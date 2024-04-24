import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import CustomTextInput from 'app/components/form/CustomTextInput';
import { COLORS } from 'app/utils/color';
import CustomButton from 'app/components/button/CustomButton';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'app/redux/store';
import { signupRequest } from 'app/redux/actions/authAction';
import { User, UserInputProps } from 'app/types/types';



const SignUpScreen = () => {
  const navigation = useNavigation();
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [signupPress, setSignupPress] = useState(false);
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
      fullName: "",
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
      isBuyer: false,
      address: "",
      profilePic: ""
    },
  });

  // /FUNCTION TO HANDLE LOGIN 
  const handleSignup = async (values: UserInputProps) => {
    if (values.password !== values.confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    setSignupPress(true);
    // Split the fullName into first and last names
    const fullName = values.fullName.split(' ');


    const data: User = {
      firstName: fullName[0],
      lastName: fullName?.slice(1)?.join(' '), // Join the remaining parts if any
      email: values.email,
      password: values.password,
      userName: values.userName,
      isBuyer: values.isBuyer,
      address: values.address,
      profilePic: values.profilePic,
    }
    dispatch(signupRequest(data));
  }



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 24 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.primary }}>Create an account</Text>
        </View>

        {
          error && signupPress && (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 3 }}>
              <Text style={{ color: COLORS.secondary }}>{error}</Text>
            </View>
          )
        }
        {/* FOMR CONTAINER */}
        <View style={styles.formContainer}>
          <Text style={[styles.text, { color: COLORS['grey-700'] }]}>Full Name</Text>
          <Controller
            control={control}
            name="fullName"
            rules={{
              required: {
                value: true,
                message: "FUll name is required",
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Full name must be a string",
              },
              minLength: {
                value: 3,
                message: "Full name must be at least 4 characters",
              },

            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ marginBottom: 12 }}>

                <CustomTextInput
                  placeholder='Enter your full name'
                  placeholderTextColor={COLORS['grey-700']}
                  secureTextEntry={false}
                  textAlign="start"
                  textAlignVertical="center"
                  autoCapitalize="none"
                  countryCode="+251" // 
                  onBlur={onBlur}
                  onChangeText={(value: any) => {
                    setValue("fullName", value);
                    onChange(value);
                  }}
                  value={value}
                />
                {errors.fullName && (
                  <View style={styles.formError}>
                    <MaterialIcons name="error-outline" color="#E12300" />
                    <Text style={styles.formErrorText}>
                      {errors.fullName.message}
                    </Text>
                  </View>
                )}
              </View>
            )
            }
          />
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
                  onChangeText={(value: any) => {
                    setValue("email", value.replace(/\s/g, ""));
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
          <Text style={[styles.text, { color: COLORS['grey-700'] }]}>User Name</Text>
          <Controller
            control={control}
            name="userName"
            rules={{
              required: {
                value: true,
                message: "User name is required",
              }

            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ marginBottom: 12 }}>

                <CustomTextInput
                  placeholder='Enter your userName'
                  placeholderTextColor={COLORS['grey-700']}
                  secureTextEntry={false}
                  textAlign="start"
                  textAlignVertical="center"
                  autoCapitalize="none"
                  countryCode="+251" // 
                  onBlur={onBlur}
                  onChangeText={(value: any) => {
                    setValue("userName", value.replace(/\s/g, ""));
                    onChange(value.replace(/\s/g, ""));
                  }}
                  value={value}
                />
                {errors.userName && (
                  <View style={styles.formError}>
                    <MaterialIcons name="error-outline" color="#E12300" />
                    <Text style={styles.formErrorText}>
                      {errors.userName.message}
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
                  onChangeText={(value: any) => {
                    setValue("password", value.replace(/\s/g, ""));
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
          <Text style={[styles.text, { color: COLORS['grey-700'] }]}>Confirm password</Text>
          < Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: {
                value: true,
                message: "confirm password is required",
              },
              pattern: {
                value: /^.{6,}$/,
                message: "confirm password should be change.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ marginBottom: 12 }}>

                <CustomTextInput
                  placeholder='Enter confirm password'
                  placeholderTextColor={COLORS['grey-700']}
                  secureTextEntry={true}
                  textAlign="start"
                  textAlignVertical="center"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={(value: any) => {
                    setValue("confirmPassword", value.replace(/\s/g, ""));
                    onChange(value.replace(/\s/g, ""));
                  }}
                  value={value}
                />
                {errors.confirmPassword && (
                  <View style={styles.formError}>
                    <MaterialIcons name="error-outline" color="#E12300" />
                    <Text style={styles.formErrorText}>
                      {errors.confirmPassword.message}
                    </Text>
                  </View>
                )}
                {!passwordMatch && (
                  <Text style={styles.formErrorText}>Confirm passwords do not match.</Text>
                )}
              </View>
            )}
          />
          <Text style={[styles.text, { color: COLORS['grey-700'] }]}>Address (City, Country)</Text>
          <Controller
            control={control}
            name="address"
            rules={{
              required: {
                value: true,
                message: "Address is required",
              },
              pattern: {
                value: /^[a-zA-Z\s,]+$/,
                message: "Address must be formatted as 'City, Country'",
              },
            }}
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
                {errors.address && (
                  <View style={styles.formError}>
                    <MaterialIcons name="error-outline" color="#E12300" />
                    <Text style={styles.formErrorText}>
                      {errors.address.message}
                    </Text>
                  </View>
                )}
              </View>
            )}
          />

          <Text style={[styles.text, { color: COLORS['grey-700'] }]}>profilePic (Optional)c</Text>
          <Controller
            control={control}
            name="profilePic"
            rules={{
              required: {
                value: true,
                message: "profilePic is required",
              },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "profilePic must be a string",
              },

            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ marginBottom: 12 }}>

                <CustomTextInput
                  placeholder='Enter your profilePic'
                  placeholderTextColor={COLORS['grey-700']}
                  secureTextEntry={false}
                  textAlign="start"
                  textAlignVertical="center"
                  autoCapitalize="none"
                  countryCode="+251" // 
                  onBlur={onBlur}
                  onChangeText={(value: any) => {
                    setValue("profilePic", value.replace(/\s/g, ""));
                    onChange(value.replace(/\s/g, ""));
                  }}
                  value={value}
                />
                {errors.profilePic && (
                  <View style={styles.formError}>
                    <MaterialIcons name="error-outline" color="#E12300" />
                    <Text style={styles.formErrorText}>
                      {errors.profilePic.message}
                    </Text>
                  </View>
                )}
              </View>
            )
            }
          />
          < CustomButton
            onPress={handleSubmit(handleSignup)}
            title="Sign In"
            isLoading={loading}
          />
        </View>
        {/* REGISTRATION LINK */}
        <View style={styles.loginLink}>
          <Text style={{ fontSize: 16 }}> Already have an account ??
            <Text style={[styles.text, { color: COLORS.primary }]} onPress={() => navigation.navigate("Login")}> Login</Text>
          </Text>

        </View>
      </View>
    </ScrollView >
  )
}

export default SignUpScreen

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

  loginLink: {
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