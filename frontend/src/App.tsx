import { Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import './App.module.scss';
import ToastContainer from './components/General/ToastContainer/ToastContainer';
import useAppDispatch from './hooks/useAppDispatch';
import useEffectOnce from './hooks/useEffectOnce';
import { authApi } from './rtk/authApi';
import { setCurrentUser } from './rtk/authSlice';
import { IResponseCatchError } from './rtk/types';
import Home from './views/Home/Home';
import Main from './views/Main/Main';

const App = () => {
  const [getCurrentUser] = authApi.endpoints.getCurrentUser.useLazyQuery();

  const dispatch = useAppDispatch();

  useEffectOnce(async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const currentUserData = await toast.promise(getCurrentUser().unwrap(), {
        pending: 'Fetching user profile...',
        success: {
          render: ({ data }) => `Welcome ${data?.username}`,
        },
        error: 'Signing in failed',
      });
      dispatch(setCurrentUser(currentUserData));
    } catch (error) {
      (error as IResponseCatchError).data.errors.forEach(({ message }) =>
        toast.error(message, { toastId: message })
      );
      localStorage.removeItem('token');
    }
  });

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game' element={<Main />} />
      </Routes>
    </>
  );
};

export default App;
