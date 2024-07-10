import { useSelector } from 'react-redux';
import {RootState} from "@reduxjs/toolkit/query";

export const useUserAuth = () => {
        // @ts-ignore
        const {email, token, id} = useSelector((state : RootState<string, string, string>) => state.user);

        return {
            isAuthenticated: !!email,
            email,
            token,
            id,
        };
};
