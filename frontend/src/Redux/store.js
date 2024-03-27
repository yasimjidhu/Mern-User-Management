import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'react-redux'
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
    auth:authReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
