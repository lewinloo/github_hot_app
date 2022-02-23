import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
// import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeScreen from '@/pages/WelcomeScreen';
import DetailScreen from '@/pages/DetailScreen';
import WebviewScreen from '@/pages/WebviewScreen';

// 这个类型别名在路由跳转的时候会有给到提示我们
export type RootStackParamList = {
  Home: undefined;
  Welcome: undefined;
  Details: {
    projectModel: any;
  };
  Webview: {
    title: string;
    url: string;
  };
  // Category: undefined;
};

export type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;

// 页面级的导航器
const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerTitleAlign: 'center',
          gestureEnabled: true,
          headerShown: false,
        }}>
        {/* 底部 tab 页导航 */}
        <Stack.Screen name="Home" component={BottomTabs} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
        <Stack.Screen name="Webview" component={WebviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
