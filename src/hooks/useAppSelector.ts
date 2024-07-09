import { useSelector, TypedUseSelectorHook } from 'react-redux';
// @ts-ignore
import { RootState } from './store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;