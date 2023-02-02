import axios from 'axios';
import {API_URL} from '@env';
import {
  FETCH_TRANSACTIONS_FAILED,
  FETCH_TRANSACTIONS_REQUEST,
  FETCH_TRANSACTIONS_SUCCESS,
  SET_SELECTED_TRANSACTION,
} from './constants';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

export const fetchTransactions =
  () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({
      type: FETCH_TRANSACTIONS_REQUEST,
    });
    try {
      const response = await axios.get(`${API_URL}/frontend-test`);

      const {data} = response;

      dispatch({
        type: FETCH_TRANSACTIONS_SUCCESS,
        payload: {
          data: data,
        },
      });
    } catch (e) {
      dispatch({
        type: FETCH_TRANSACTIONS_FAILED,
        payload: {
          errorMessage: e,
        },
      });
    }
  };

export const setSelectedTransaction =
  (data: Object) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({
      type: SET_SELECTED_TRANSACTION,
      payload: data,
    });
  };
