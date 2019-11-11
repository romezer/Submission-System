import _ from 'lodash';
import {
     POST_PRODUCT,
     FETCH_PRODUCTS,
     FETCH_PRODUCT,
     EDIT_PRODUCT,
     DELETE_PRODUCT
    } from '../actions/types';

export default function(state = {}, action){
    switch (action.type){
        case POST_PRODUCT:
            return {...state, [action.payload.id]: action.payload };
        case FETCH_PRODUCTS:
            return {...state, ..._.mapKeys(action.payload, '_id')}
        case FETCH_PRODUCT:
            return {...state, [action.payload.id]: action.payload };
        case EDIT_PRODUCT:
            return {...state, [action.payload.id]: action.payload };
        case DELETE_PRODUCT:
            return _.filter(state, function(o){ return o._id !== action.payload._id})
        default:
            return state;
    }
}