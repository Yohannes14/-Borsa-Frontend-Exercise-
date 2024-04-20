import AsyncStorage from "@react-native-async-storage/async-storage";

const users = 'usersInfo';

// Function to save the authentication token to AsyncStorage
export const saveAuthToken = async (user: any): Promise<void> => {
    try {
        const usersInfo = JSON.stringify(user); // Stringify the token
        await AsyncStorage.setItem(users, usersInfo);
    } catch (error) {
        return
    }
};

// Function to retrieve the authentication token from AsyncStorage
export const getAuthToken = async (): Promise<string | null> => {
    try {
        const usersInfo = await AsyncStorage.getItem(users);
        if (usersInfo) {
            const user = JSON.parse(usersInfo); // Parse the token from JSON
            return user;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

// Function to remove the authentication token from AsyncStorage
export const removeAuthToken = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(users);
    } catch (error) {
        return
    }
};
