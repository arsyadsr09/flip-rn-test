import React from 'react';
import Router from './router';
import {Provider} from 'react-redux';
import {store} from './redux/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
