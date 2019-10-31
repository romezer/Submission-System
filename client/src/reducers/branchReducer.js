import _ from 'lodash';
import {
     FETCH_BRANCHES,
     POST_BRANCH,
     FETCH_BRANCH,
     EDIT_BRANCH
    } from '../actions/types';

export default function(state = {}, action){
    switch (action.type){
        case POST_BRANCH:
            return {...state, [action.payload.id]: action.payload };
        case FETCH_BRANCHES:
            return {...state, ..._.mapKeys(action.payload, '_id')}
        case FETCH_BRANCH:
            return {...state, [action.payload.id]: action.payload }
        case EDIT_BRANCH:
            return {...state, [action.payload.id]: action.payload}
        default:
            return state;
    }
}