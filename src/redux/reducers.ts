import {
  FETCH_TRANSACTIONS_FAILED,
  FETCH_TRANSACTIONS_REQUEST,
  FETCH_TRANSACTIONS_SUCCESS,
  SET_SELECTED_TRANSACTION,
} from './constants';

export interface InitialReducersState {
  readonly isLoading: boolean;
  readonly isError: boolean;
  readonly transactions: Array<Object>;
  readonly selectedTransaction: Object;
}

interface ActionRedux {
  type: string;
  payload: any;
}

const initialState: InitialReducersState = {
  transactions: [],
  selectedTransaction: {},
  isLoading: false,
  isError: false,
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
    default:
      return state;
  }
}

export default reducers;
