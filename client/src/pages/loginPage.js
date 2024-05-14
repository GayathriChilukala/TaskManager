import React from 'react';
import LoginAct from '../components/loginComp';
import { Provider } from 'react-redux';
import store from '../store/store'; 
export default function LoginPage() {
 
  return (
    <div>
      <Provider store={store}>
        <LoginAct />
        </Provider>
    </div>
  );
}
