import React , { Component } from 'react';
import allReducers from './src/reducers/index.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import SimpleForm from './src/components/SimpleForm.js';
import { Alert } from 'react-native';

const store = createStore(allReducers);

export default class App extends Component{
  render(){
    return(
      <Provider store= {store}>
        <SimpleForm
          onSubmit={(values) =>
            Alert.alert('Submitted!', JSON.stringify(values))} />
      </Provider>
    )
  }
}
