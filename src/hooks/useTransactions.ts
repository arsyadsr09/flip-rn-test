import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTransactions} from '../redux/actions';
import {FETCH_TRANSACTIONS_REQUEST} from '../redux/constants';
import {ReducersState} from '../redux/reducers';

const useTransactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(
    (state: ReducersState) => state.transactions,
  );
  const isLoading = useSelector((state: ReducersState) => state.isLoading);
  const isError = useSelector((state: ReducersState) => state.isError);
  const sortingBy = useSelector((state: ReducersState) => state.sortingBy);

  const getTransactions = useCallback(async () => {
    dispatch({
      type: FETCH_TRANSACTIONS_REQUEST,
    });
    dispatch(await fetchTransactions(sortingBy));
  }, [dispatch, sortingBy]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return {data: transactions, isLoading, isError};
};

export default useTransactions;
