import axios from 'axios';

import {
  GET_TESTS,
  TEST_LOADING,
  ADD_TEST, 
  DELETE_TEST,
  GET_TEST,
  CLEAR_ERRORS,
  GET_ERRORS,
  MARK_TEST,
  GET_RESULTS
} from './types';

//Add test
export const addTest = (testData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post('/api/tests', testData)
    .then((res) =>
      dispatch({
        type: ADD_TEST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Mark test
export const markTest = (testData) => (dispatch) => {
  dispatch(clearErrors());
  console.log("action")
  axios
    .patch('/api/tests', testData)
    .then((res) =>
      dispatch({
        type: MARK_TEST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Get passed tests
export const getResults = () => (dispatch) => {
  dispatch(clearErrors());
  axios
    .get('/api/tests/results')
    .then((res) =>
      dispatch({
        type: GET_RESULTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: null,
      })
    );
};

// Get Tests
export const getTests = () => (dispatch) => {
  dispatch(setTestLoading());
  axios
    .get('/api/tests')
    .then((res) =>
      dispatch({
        type: GET_TESTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_TESTS,
        payload: null,
      })
    );
};

// Get Test
export const getTest = (id) => (dispatch) => {
  dispatch(setTestLoading());
  axios
    .get(`/api/tests/${id}`)
    .then((res) =>
      dispatch({
        type: GET_TEST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_TEST,
        payload: null,
      })
    );
};

// Delete Test
export const deleteTest = (id) => (dispatch) => {
  if (window.confirm('Ви точно хочете видалити тест?')) {
    console.log(id);
    axios
      .delete(`/api/tests/${id}`)
      .then((res) =>
        dispatch({
          type: DELETE_TEST,
          payload: id,
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};


// Set loading state
export const setTestLoading = () => {
  return {
    type: TEST_LOADING,
  };
};


// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
