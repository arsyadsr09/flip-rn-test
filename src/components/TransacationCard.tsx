import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {TransactionState, TransactionStatus} from '../types/types';
import {convertAmount, convertBankName, convertDate} from '../utils/Utils';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../router';
import {useDispatch} from 'react-redux';
import {setSelectedTransaction} from '../redux/actions';

interface TransactionCardProps {
  trx: TransactionState;
}

const TransactionCard = (props: TransactionCardProps) => {
  const {trx} = props;
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();

  const renderColorByStatus = () => {
    switch (trx.status) {
      case TransactionStatus.SUCCESS:
        return '#56b484';
      case TransactionStatus.PENDING:
        return '#fc6738';
      case TransactionStatus.FAILED:
        return '#ff4757';
      default:
        return '#000';
    }
  };

  const renderDate = () => {
    switch (trx.status) {
      case TransactionStatus.SUCCESS:
        return convertDate(trx.created_at);
      default:
        return convertDate(trx.completed_at);
    }
  };

  const renderBadge = () => {
    switch (trx.status) {
      case TransactionStatus.SUCCESS:
        return (
          <View style={[styles.badge, styles.badgeSuccess]}>
            <Text style={styles.badgeText}>Berhasil</Text>
          </View>
        );
      case TransactionStatus.PENDING:
        return (
          <View style={[styles.badge, styles.badgePending]}>
            <Text style={[styles.badgeText, styles.badgeTextBlack]}>
              Pengecekan
            </Text>
          </View>
        );
      case TransactionStatus.FAILED:
        return (
          <View style={[styles.badge, styles.badgeFailed]}>
            <Text style={styles.badgeText}>Gagal</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const onCardClicked = () => {
    dispatch(setSelectedTransaction(trx));
    navigation.navigate('TransactionDetail', {title: trx.id});
  };

  return (
    <TouchableOpacity onPress={onCardClicked}>
      <View
        style={[
          styles.cardCanvas,
          {
            borderLeftColor: renderColorByStatus(),
          },
        ]}>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.bankText}>
              {convertBankName(trx.sender_bank)}
            </Text>
            <Icon
              style={styles.arrowIcon}
              name="arrow-right"
              size={14}
              color="#2f3542"
            />
            <Text style={styles.bankText}>
              {convertBankName(trx.beneficiary_bank)}
            </Text>
          </View>
          <Text style={styles.beneficiaryNameText}>
            {trx.beneficiary_name.toUpperCase()}
          </Text>
          <View style={styles.row}>
            <Text style={styles.detailText}>
              {convertAmount(trx.amount || 0)}
            </Text>
            <Text style={styles.dotSeparator}>●</Text>
            <Text style={styles.detailText}>{renderDate()}</Text>
          </View>
        </View>
        <View style={styles.rowCenter}>{renderBadge()}</View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardCanvas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 12,
    borderLeftWidth: 8,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  rowCenter: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  arrowIcon: {
    marginTop: 3,
    marginHorizontal: 10,
  },
  bankText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  dotSeparator: {
    fontSize: 8,
    lineHeight: 20,
    marginHorizontal: 8,
  },
  beneficiaryNameText: {
    marginVertical: 6,
    fontWeight: '500',
    fontSize: 16,
  },
  detailText: {
    fontWeight: '500',
    fontSize: 14,
  },
  badge: {
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  badgeSuccess: {
    backgroundColor: '#56b484',
  },
  badgeFailed: {
    backgroundColor: '#ff4757',
  },
  badgePending: {
    borderColor: '#fc6738',
    borderWidth: 2,
  },
  badgeText: {
    fontWeight: '600',
    fontSize: 13,
    color: '#fff',
  },
  badgeTextBlack: {
    color: '#000',
  },
});

export default TransactionCard;
