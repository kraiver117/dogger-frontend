import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import store from './redux/store';
import moment from 'moment';
import 'moment/locale/es-mx';
import './styles/index.scss';

moment.locale('es-mx');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);