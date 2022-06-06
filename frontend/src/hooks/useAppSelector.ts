import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '../rtk/store';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
