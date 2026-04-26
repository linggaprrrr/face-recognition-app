import React, {memo} from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ProfileScene from '@scenes/ProfileScene';
import CartScene from '@scenes/CartScene';
import HistoryScene from '@scenes/HistoryScene';
import TabHome from '../TabHome';

import {SceneKey} from '@navigations';
import icons from '@icons';
import colors from '@colors';

const Tab = createBottomTabNavigator();

const iconStyle = StyleSheet.create({
  tab: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

const tabBarStyle = StyleSheet.create({
  bar: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    height: 72,
    paddingBottom: 12,
    paddingTop: 8,
    elevation: 0,
    shadowOpacity: 0,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
  },
});

const HomeContentComponent = () => {
  return (
    <Tab.Navigator
      initialRouteName={SceneKey.HOME_SCENE}
      screenOptions={{
        freezeOnBlur: true,
        headerShown: false,
        tabBarStyle: tabBarStyle.bar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textDim,
        tabBarLabelStyle: tabBarStyle.label,
      }}>
      <Tab.Screen
        name={SceneKey.HOME_SCENE}
        component={TabHome}
        options={{
          tabBarLabel: 'Beranda',
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? icons.homeActive : icons.homeInActive}
              style={[iconStyle.tab, {tintColor: focused ? colors.primary : colors.textDim}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SceneKey.CART_SCENE}
        component={CartScene}
        options={{
          tabBarLabel: 'Keranjang',
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.cart}
              style={[iconStyle.tab, {tintColor: focused ? colors.primary : colors.textDim}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SceneKey.HISTORY_SCENE}
        component={HistoryScene}
        options={{
          tabBarLabel: 'Riwayat',
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.history}
              style={[iconStyle.tab, {tintColor: focused ? colors.primary : colors.textDim}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SceneKey.PROFILE_SCENE}
        component={ProfileScene}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? icons.userActive : icons.userInActive}
              style={[iconStyle.tab, {tintColor: focused ? colors.primary : colors.textDim}]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeContent = memo(HomeContentComponent);
export default HomeContent;
