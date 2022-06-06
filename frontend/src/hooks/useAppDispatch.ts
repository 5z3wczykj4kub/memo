import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../rtk/store';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
