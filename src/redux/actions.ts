import axios from 'axios';
import {API_URL} from '@env';
import {
  FETCH_TRANSACTIONS_FAILED,
  FETCH_TRANSACTIONS_SUCCESS,
  SET_SELECTED_TRANSACTION,
  SET_SORTING_TRANSACTION,
} from './constants';
import {SortingByState} from '../components/ModalSort';
import {TransactionState} from '../types/types';

export const fetchTransactions = async (sort: SortingByState) => {
  try {
    const response = await axios.get(`${API_URL}/frontend-test`);

    const {data} = response;

    const result: Array<TransactionState> = Object.values(data);
    let sortedResult: Array<TransactionState> | undefined;

    if (sort && sort.value !== '') {
      switch (sort.value) {
        case 'name_asc':
          sortedResult = result.sort((a, b) =>
            b.beneficiary_name > a.beneficiary_name ? -1 : 1,
          );
          break;
        case 'name_desc':
          sortedResult = result.sort((a, b) =>
            b.beneficiary_name > a.beneficiary_name ? 1 : -1,
          );
          break;
        case 'created_at_asc':
          sortedResult = result.sort((a, b) =>
            b.created_at > a.created_at ? 1 : -1,
          );
          break;
        case 'created_at_desc':
          sortedResult = result.sort((a, b) =>
            b.created_at > a.created_at ? -1 : 1,
          );
          break;
      }
    }

    return {
      type: FETCH_TRANSACTIONS_SUCCESS,
      payload: sortedResult || result,
    };
  } catch (e) {
    return {
      type: FETCH_TRANSACTIONS_FAILED,
      payload: {
        errorMessage: e,
      },
    };
  }
};

export const setSortTransaction = (value: Object) => {
  return {
    type: SET_SORTING_TRANSACTION,
    payload: value,
  };
};

export const setSelectedTransaction = (value: Object) => {
  return {
    type: SET_SELECTED_TRANSACTION,
    payload: value,
  };
};
