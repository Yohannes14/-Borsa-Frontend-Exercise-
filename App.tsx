import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import AppNavigator from 'app/navigation/AppNavigator';

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}