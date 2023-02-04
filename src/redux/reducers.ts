import {SortingByState} from '../components/ModalSort';
import {TransactionState} from '../types/types';
import {
  FETCH_TRANSACTIONS_FAILED,
  FETCH_TRANSACTIONS_REQUEST,
  FETCH_TRANSACTIONS_SUCCESS,
  SET_SELECTED_TRANSACTION,
  SET_SORTING_TRANSACTION,
} from './constants';

export interface ReducersState {
  isLoading: boolean;
  isError: boolean;
  transactions: Array<TransactionState>;
  selectedTransaction: TransactionState | null;
  sortingBy: SortingByState;
}

interface ActionRedux {
  type: string;
  payload: any;
}

const initialState: ReducersState = {
  transactions: [],
  selectedTransaction: null,
  isLoading: false,
  isError: false,
  sortingBy: {value: '', label: 'URUTKAN'},
};

function reducers(state = initialState, action: ActionRedux) {
  switch (action.type) {
    case FETCH_TRANSACTIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        transactions: action.payload,
      };
    case FETCH_TRANSACTIONS_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case SET_SELECTED_TRANSACTION:
      return {
        ...state,
        selectedTransaction: action.payload,
      };
    case SET_SORTING_TRANSACTION:
      return {
        ...state,
        sortingBy: action.payload,
      };
    default:
      return state;
  }
}

export default reducers;
