import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  Pressable,
} from 'react-native';
import {SortingByState} from './ModalSort';

interface RadioButtonProps {
  style?: StyleProp<ViewStyle>;
  selected: boolean;
  data: SortingByState;
  onTap: (data: SortingByState) => void;
}

const RadioButton = (props: RadioButtonProps) => {
  const {style, selected, data, onTap} = props;
  return (
    <Pressable style={styles.baseRadio} onPress={() => onTap(data)}>
      <View style={[styles.canvasRadio, style]}>
        {selected ? <View style={styles.selected} /> : null}
      </View>

      <Text style={styles.textRadio}>{data.label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  baseRadio: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textRadio: {
    flex: 1,
    marginLeft: 10,
    fontWeight: '500',
  },
  canvasRadio: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ee6b56',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#ee6b56',
  },
});

export default RadioButton;
