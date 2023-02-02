import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Transactions from './screens/Transactions';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Transactions"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Transactions" component={Transactions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
