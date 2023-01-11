import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './redux/configureStore';

import Main from './components/MainComponent';

import './App.css';

function App() {
  return (
    <div>
      <Provider store={store}> 
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
