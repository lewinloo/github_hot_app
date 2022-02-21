import React from 'react';
import Navigator from './navigator';
import {Provider} from 'react-redux';
import {store} from '@/config/store';
import {ToastProvider} from 'react-native-toast-notifications';
import {hp} from '@/utils';

function App() {
  return (
    <Provider store={store}>
      <ToastProvider placement="top" offsetTop={hp(20)} duration={2000}>
        <Navigator />
      </ToastProvider>
    </Provider>
  );
}

export default App;
