import {createStore, combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import { partnerDetailsReducers, partnerCreateReducers, partnerUpdateReducers } from './reducers/partnerReducers';
import { loginReducers, validateSessionReducers } from './reducers/loginReducers';


const reducer = combineReducers({
    partnerCreate: partnerCreateReducers,
    partnerDetails: partnerDetailsReducers,
    partnerUpdate: partnerUpdateReducers,
    login: loginReducers,
});

const initialState = {}
const middleware = [thunk]
const store = createStore(reducer, initialState, applyMiddleware(...middleware))

export default store;