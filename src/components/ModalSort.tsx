import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {setSortTransaction} from '../redux/actions';
import {ReducersState} from '../redux/reducers';
import RadioButton from './RadioButton';

export interface SortingByState {
  value: string;
  label: string;
}

const ModalSort = () => {
  const dispatch = useDispatch();
  const selectedSort = useSelector((state: ReducersState) => state.sortingBy);
  const sortingBy: Array<SortingByState> = [
    {value: '', label: 'URUTKAN'},
    {value: 'name_asc', label: 'Nama A-Z'},
    {value: 'name_desc', label: 'Nama Z-A'},
    {value: 'created_at_asc', label: 'Tanggal Terbaru'},
    {value: 'created_at_desc', label: 'Tanggal Terlama'},
  ];
  const [modalVisible, setModalVisible] = useState(false);

  const onSortChanged = (value: SortingByState) => {
    dispatch(setSortTransaction(value));
    setModalVisible(false);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {sortingBy.map((sort: SortingByState, i: number) => (
              <View key={i} style={styles.row}>
                <RadioButton
                  data={sort}
                  onTap={onSortChanged}
                  selected={selectedSort?.value === sort.value}
                />
              </View>
            ))}
          </View>
        </View>
      </Modal>
      <Pressable
        style={styles.sortButton}
        onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.sortText}>{selectedSort?.label}</Text>
        <Icon
          style={styles.sortIcon}
          name="chevron-down"
          size={16}
          color="#ee6b56"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    position: 'absolute',
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '80%',
    margin: 20,
    borderRadius: 20,
    paddingTop: 35,
    paddingBottom: 25,
    paddingHorizontal: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  sortButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 15,
  },
  sortText: {
    color: '#ee6b56',
    fontWeight: 'bold',
  },
  sortIcon: {
    marginLeft: 8,
  },
});

export default ModalSort;
