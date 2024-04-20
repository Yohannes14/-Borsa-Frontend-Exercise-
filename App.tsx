
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import MainNavigator from './app/navigation/MainNavigator';
import AuthNavigator from './app/navigation/AuthNavigator';
import { Provider } from 'react-redux';
import store from 'app/redux/store';
import { getAuthToken } from 'app/utils/tokenStorage';
import { useEffect, useState } from 'react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const user = await getAuthToken();
      setIsAuthenticated(!!user); // Convert user to boolean
    };
    checkAuthentication();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="auto" />
        {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}

      </NavigationContainer>
    </Provider>
  );
}
