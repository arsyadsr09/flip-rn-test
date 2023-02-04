import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import Transactions from './screens/Transactions';
import TransactionDetail from './screens/TransactionDetail';

export type RootStackParamList = {
  TransactionDetail: {
    title: string;
  };
  Transactions: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Transactions"
        screenOptions={{headerBackTitle: ''}}>
        <Stack.Screen name="Transactions" component={Transactions} />
        <Stack.Screen
          name="TransactionDetail"
          component={TransactionDetail}
          options={({route}) => ({title: route.params.title})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
