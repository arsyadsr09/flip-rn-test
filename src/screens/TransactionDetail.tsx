import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import Clipboard from '@react-native-community/clipboard';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ReducersState} from '../redux/reducers';
import {TransactionState} from '../types/types';
import {convertAmount, convertBankName, convertDate} from '../utils/Utils';

const TransactionDetail = () => {
  const selectedTrx: TransactionState | null = useSelector(
    (state: ReducersState) => state.selectedTransaction,
  );
  const [isShow, setIsShow] = useState<boolean>(true);

  const onCopyTrxID = () => {
    Clipboard.setString(`${selectedTrx?.id}`);
  };

  useEffect(() => {
    console.log(selectedTrx);
  }, [selectedTrx]);

  return (
    <View style={styles.container}>
      <View style={styles.idTrxCard}>
        <Text style={styles.idTrxText}>
          ID TRANSAKSI: {`#${selectedTrx?.id}`}
        </Text>
        <TouchableOpacity onPress={onCopyTrxID}>
          <Icon style={styles.copyIcon} name="copy" size={16} color="#fc6738" />
        </TouchableOpacity>
      </View>
      <View style={styles.titleCard}>
        <Text style={styles.idTrxText}>DETAIL TRANSAKSI</Text>
        <TouchableOpacity onPress={() => setIsShow(!isShow)}>
          <Text style={styles.closeText}>{isShow ? 'Tutup' : 'Buka'}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={isShow ? [styles.showCard, styles.detailCard] : styles.hideCard}>
        <View style={styles.row}>
          <Text style={styles.bankText}>
            {convertBankName(`${selectedTrx?.sender_bank}`)}
          </Text>
          <Icon
            style={styles.arrowIcon}
            name="arrow-right"
            size={14}
            color="#2f3542"
          />
          <Text style={styles.bankText}>
            {convertBankName(`${selectedTrx?.beneficiary_bank}`)}
          </Text>
        </View>
        <View style={[styles.rowDetailCard, styles.mt20px]}>
          <Text style={styles.detailBoldText}>
            {selectedTrx?.beneficiary_name.toUpperCase()}
          </Text>
          <Text style={styles.detailBoldText}>NOMINAL</Text>
        </View>
        <View style={[styles.rowDetailCard, styles.mt8px]}>
          <Text style={styles.detailText}>{selectedTrx?.account_number}</Text>
          <Text style={styles.detailText}>
            {convertAmount(selectedTrx?.amount!)}
          </Text>
        </View>
        <View style={[styles.rowDetailCard, styles.mt20px]}>
          <Text style={styles.detailBoldText}>BERITA TRANSFER</Text>
          <Text style={styles.detailBoldText}>KODE UNIK</Text>
        </View>
        <View style={[styles.rowDetailCard, styles.mt8px]}>
          <Text style={styles.detailText}>{selectedTrx?.remark}</Text>
          <Text style={styles.detailText}>{selectedTrx?.unique_code}</Text>
        </View>
        <View style={[styles.rowDetailCard, styles.mt20px]}>
          <Text style={styles.detailBoldText}>WAKTU DIBUAT</Text>
        </View>
        <View style={[styles.rowDetailCard, styles.mt8px]}>
          <Text style={styles.detailText}>
            {convertDate(selectedTrx?.created_at!)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flex: 1,
  },
  idTrxCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomColor: '#dfe4ea',
    borderBottomWidth: 1,
  },
  idTrxText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  copyIcon: {
    marginLeft: 10,
  },
  titleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomColor: '#dfe4ea',
    borderBottomWidth: 1,
  },
  closeText: {
    fontWeight: '500',
    fontSize: 15,
    color: '#fc6738',
  },
  detailCard: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  arrowIcon: {
    marginTop: 3,
    marginHorizontal: 10,
  },
  bankText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  mt20px: {
    marginTop: 20,
  },
  mt8px: {
    marginTop: 8,
  },
  rowDetailCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  detailBoldText: {
    fontWeight: 'bold',
  },
  detailText: {
    fontWeight: '500',
  },
  showCard: {
    height: 'auto',
  },
  hideCard: {
    height: 0,
  },
});

export default TransactionDetail;
