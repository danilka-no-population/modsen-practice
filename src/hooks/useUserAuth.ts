import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useUserAuth = () => {
    const user = useSelector((state: RootState) => state.user);
    const isAuthenticated = !!user.email;

    return {
        isAuthenticated,
        ...user,
    };
};
