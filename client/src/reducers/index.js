import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import productsReducer from './productsReducer';
import submissionReducer from './submissionReducer';
import branchReducer from './branchReducer';

export default combineReducers({
    auth: authReducer,
    products: productsReducer,
    submissions: submissionReducer,
    branches: branchReducer,
    form: reduxForm
    
});