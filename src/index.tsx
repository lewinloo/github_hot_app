import React from 'react';
import Navigator from './navigator';
import {Provider} from 'react-redux';
import {store} from '@/config/store';
import {ToastProvider} from 'react-native-toast-notifications';
import {hp} from '@/utils';
import {useAppDispatch, useMounted} from './utils/hooks';
import {getThemeColor} from './models/theme';

function App() {
  const dispatch = useAppDispatch();
  useMounted(() => {
    dispatch(getThemeColor());
  });

  return <Navigator />;
}

function Root() {
  return (
    <Provider store={store}>
      <ToastProvider placement="top" offsetTop={hp(20)} duration={2000}>
        <App />
      </ToastProvider>
    </Provider>
  );
}

export default Root;
