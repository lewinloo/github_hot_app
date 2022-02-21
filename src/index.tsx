import React from 'react';
import Navigator from './navigator';
import {Provider} from 'react-redux';
import {store} from '@/config/store';

function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

export default App;
