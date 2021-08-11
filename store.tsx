import {createStore, combineReducers} from 'redux';
import ViewHistoryReducer from './reducers/IdReducer';

const rootReducer = combineReducers({
    idReducer: ViewHistoryReducer
})

export const configureStore = () => createStore(rootReducer)