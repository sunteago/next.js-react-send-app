import {AUTH_USER} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case AUTH_USER:
            return {...state, user: action.payload};
        default: 
            return state;
    }
}