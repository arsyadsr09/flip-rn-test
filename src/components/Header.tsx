import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ModalSort from './ModalSort';

interface SearchBarProps {
  onChange: (value: string) => void;
  value: string;
}

const Header = (props: SearchBarProps) => {
  return (
    <View style={styles.searchSection}>
      <Icon style={styles.searchIcon} name="search" size={16} color="#a4b0be" />
      <TextInput
        value={props.value}
        style={styles.input}
        placeholder="Cari nama, bank, nominal"
        onChangeText={searchString => {
          props.onChange(searchString);
        }}
        underlineColorAndroid="transparent"
      />
      <ModalSort />
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  searchIcon: {
    height: 16,
    width: 16,
    marginRight: 15,
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    fontSize: 14,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});

export default Header;
