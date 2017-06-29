/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './src/reducers'
import rootSaga from './src/sagas'
import Counter from './src/components/Counter'
import {createSagaMonitor, DockableSagaView} from "redux-saga-devtools";

export default class TestSagaMonitor extends Component {
  render() {
      const monitor = createSagaMonitor();
      const sagaMiddleware = createSagaMiddleware({sagaMonitor: monitor});
      const store = createStore(
          reducer,
          applyMiddleware(sagaMiddleware)
      );

      sagaMiddleware.run(rootSaga);

      return (
          <View>
              <Provider store={store}>
                  <Counter />
              </Provider>
              <DockableSagaView monitor={monitor}  />
          </View>
      );
  }
}


AppRegistry.registerComponent('TestSagaMonitor', () => TestSagaMonitor);
