import {
  ADD_TEST,
  GET_TEST,
  DELETE_TEST,
  GET_TESTS,
  TEST_LOADING,
} from '../actions/types';

const initialState = {
  tests: [],
  test: {},
  loading: false,
};

export default function testReducers(state = initialState, action) {
  switch (action.type) {
    case TEST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_TESTS:
      return {
        ...state,
        tests: action.payload,
        loading: false,
      };
      case GET_TEST:
        return {
          ...state,
          test: action.payload,
          loading: false,
        };
      case ADD_TEST:
        return {
          ...state,
          test: action.payload,
        };
      case DELETE_TEST:
        return {
          ...state,
          tests: state.tests.filter((test) => test._id !== action.payload),
        };
    default:
      return state;
  }
}
