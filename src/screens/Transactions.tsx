import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import SearchBar from '../components/Header';
import TransactionCard from '../components/TransacationCard';
import useTransactions from '../hooks/useTransactions';
import {TransactionState} from '../types/types';

const Transactions = () => {
  const transactions = useTransactions();
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
      setFilteredTrx(filter);
    } else {
      setFilteredTrx([]);
    }
  };

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
        {transactions.isLoading ? (
          <View style={styles.centerContainer}>
            <Text>Loading...</Text>
          </View>
        ) : (
          <ScrollView>{renderCard()}</ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%',
    width: '100%',
  },
  centerContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Transactions;
