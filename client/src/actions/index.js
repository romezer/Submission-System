import axios from 'axios';
import { FETCH_USER,
         POST_PRODUCT,
         FETCH_PRODUCTS,
         FETCH_PRODUCT,
         EDIT_PRODUCT,
         POST_SUBMISSION,
         FETCH_SUBMISSIONS,
         FETCH_SUBMISSION,
         EDIT_SUBMISSION,
         POST_BRANCH,
         FETCH_BRANCHES,
         EDIT_BRANCH,
         FETCH_BRANCH,
         DELETE_PRODUCT,
         DELETE_SUBMISSION,
         DELETE_BRANCH
       } from './types';
import history from '../history';

export const fetchUser = () => async dispatch => {
     const res = await axios.get('/api/current_user');
     dispatch({ type: FETCH_USER, payload: res.data });
    };

export const loginUser = (values) => async dispatch =>{
     const res = await axios.post('/api/login', values);
     const user = await axios.get('/api/current_user');
     if(user.data.isAdmin){
          history.push('/Dashboard');
     }else{
          history.push('/SubmissionNew');
     }
     dispatch({ type: FETCH_USER, payload: res.data });
}

export const postProduct = (formValues) => async dispatch =>{
     const res = await axios.post('/api/product', formValues);
     history.push('/Products');

     dispatch({ type: POST_PRODUCT, payload: res});
}

export const fetchProducts = () => async dispatch =>{
     const res = await axios.get('/api/products');
     dispatch({ type: FETCH_PRODUCTS, payload: res.data});
}

export const fetchProduct = id => async dispatch => {
     const res = await axios.get(`/api/product?id=${id}`);

     dispatch({type: FETCH_PRODUCT, payload: res.data})
}

export const editProduct = (id, formValues) => async dispatch => {
     const res = await axios.put('/api/product', {...formValues, id});
     history.push('/Products');

     dispatch({type: EDIT_PRODUCT, payload: res.data});
}

export const deleteProduct = id => async dispatch => {
     const res = await axios.delete('/api/product', {data:{id}});
     history.push('/Products');

     dispatch({type: DELETE_PRODUCT, payload: res.data});     
}

export const deleteBranch = id => async dispatch => {
     const res = await axios.delete('/api/branch', {data:{id}});
     history.push('/Branches');

     dispatch({type: DELETE_BRANCH, payload: res.data});     
}

export const postSubmission = (formValues) => async dispatch => {
     const res = await axios.post('/api/submission', formValues);
     // history.push('/Submissions');

     dispatch({ type:POST_SUBMISSION, payload: res.data })
}


export const fetchSubmissions = () => async dispatch => {
     const res = await axios.get('/api/submissions');

     dispatch({ type:FETCH_SUBMISSIONS, payload: res.data })
}

export const fetchSubmission = (id) => async dispatch => {
     const res = await axios.get(`/api/submission?id=${id}`);

     dispatch({ type:FETCH_SUBMISSION, payload: res.data })
}

export const editSubmission = (formValues) => async dispatch => {
     const res = await axios.post('/api/submission/edit', formValues);
     history.push('/Submissions');

     dispatch({ type:EDIT_SUBMISSION, payload: res.data })
}

export const deleteSubmission = (id, submission) => async dispatch => {
     const res = await axios.delete('/api/submission/delete', {data:{id, submission}});
     history.push('/Submissions');

     dispatch({ type:DELETE_SUBMISSION, payload: res })
}

export const fetchBranches = () => async dispatch => {
     const res = await axios.get('/api/branches');
     

     dispatch({ type:FETCH_BRANCHES, payload: res.data })
}

export const postBranch = (branch) => async dispatch => {
     const res = await axios.post('/api/branch', branch);
     history.push('/Branches');

     dispatch({ type: POST_BRANCH, payload: res.data })
}

export const fetchBranch = id => async dispatch => {
     const res = await axios.get(`/api/branch?id=${id}`);

     dispatch({type: FETCH_BRANCH, payload: res.data})

}

export const editBranch = (id, formValues) => async dispatch =>{
     const res = await axios.put('/api/branch', {...formValues, id});
     history.push('/Branches');

     dispatch({ type: EDIT_BRANCH, payload: res.data})

}
