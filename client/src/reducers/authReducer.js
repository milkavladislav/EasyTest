import isEmpty from '../validation/is-empty';
import { GET_RESULTS, SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  passedTests: []
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case GET_RESULTS:
      return  {
        ...state,
        passedTests: action.payload
      }
    default:
      return state;
  }
}
