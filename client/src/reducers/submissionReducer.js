import _ from 'lodash';
import {
    POST_SUBMISSION,
    FETCH_SUBMISSION,
    FETCH_SUBMISSIONS,
    EDIT_SUBMISSION,
    DELETE_SUBMISSION
    } from '../actions/types';

export default function(state = {}, action){
    switch (action.type){
        case POST_SUBMISSION:
            return {...state, [action.payload.id]: action.payload };
        case FETCH_SUBMISSIONS:
            return {...state, ..._.mapKeys(action.payload, '_id')}
        case FETCH_SUBMISSION:
            return {...state, [action.payload.id]: action.payload };
        case EDIT_SUBMISSION:
            return {...state, [action.payload.id]: action.payload };
        case DELETE_SUBMISSION:
            return _.filter(state, function(o){ return o._id !== action.payload.data._id})
        default:
            return state;
    }
}