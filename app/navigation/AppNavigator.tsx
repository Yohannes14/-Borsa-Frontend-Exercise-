
import { useAppSelector } from 'app/redux/store';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';



const AppNavigator: React.FC = () => {
    const { isAuthenticated } = useAppSelector(state => state?.auth);
    console.log(isAuthenticated)

    return (
        <>
            {
                isAuthenticated ? <MainNavigator /> : <AuthNavigator />
            }
        </>
    );
};

export default AppNavigator;