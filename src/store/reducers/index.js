import { combineReducers } from 'redux';
import menu from './menu';
import plan from './plan';
import snackBarMessages from './snackBarMessages';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, plan, snackBarMessages });

export default reducers;
