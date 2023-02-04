import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import SearchBar from '../components/Header';
import TransactionCard from '../components/TransacationCard';
import useTransactions from '../hooks/useTransactions';
import {ReducersState} from '../redux/reducers';
import {TransactionState} from '../types/types';

const Transactions = () => {
  const transactions = useTransactions();
  const selectedSort = useSelector((state: ReducersState) => state.sortingBy);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredTrx, setFilteredTrx] = useState<TransactionState[]>([]);

  const onSearch = (value: string) => {
    setSearchValue(value);

    if (value !== '') {
      let filter = transactions.data.filter(
        (trx: TransactionState) =>
          trx.beneficiary_name.toLowerCase().includes(value.toLowerCase()) ||
          trx.sender_bank.toLowerCase().includes(value.toLowerCase()) ||
          trx.beneficiary_bank.toLowerCase().includes(value.toLowerCase()) ||
          trx.amount.toString().includes(value.toLowerCase()),
      );
      switch (selectedSort.value) {
        case 'name_asc':
          filter = filter.sort((a, b) =>
            b.beneficiary_name > a.beneficiary_name ? -1 : 1,
          );
          break;
        case 'name_desc':
          filter = filter.sort((a, b) =>
            b.beneficiary_name > a.beneficiary_name ? 1 : -1,
          );
          break;
        case 'created_at_asc':
          filter = filter.sort((a, b) =>
            b.created_at > a.created_at ? -1 : 1,
          );
          break;
        case 'created_at_desc':
          filter = filter.sort((a, b) =>
            b.created_at > a.created_at ? 1 : -1,
          );
          break;
      }
      setFilteredTrx(filter);
    } else {
      setFilteredTrx([]);
    }
  };

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  const renderCard = () => {
    if (filteredTrx.length > 0) {
      return filteredTrx.map((trx: TransactionState, i: number) => (
        <TransactionCard trx={trx} key={`filtered-card-${i}`} />
      ));
    } else {
      return transactions.data.map((trx: TransactionState, i: number) => (
        <TransactionCard trx={trx} key={`transactions-card-${i}`} />
      ));
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <SearchBar onChange={onSearch} value={searchValue} />
        <ScrollView>
          {transactions.isLoading ? <Text>loading...</Text> : renderCard()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Transactions;
