import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MyScreen from '@/pages/MyScreen';
import PopularTopTabs from './PopularTopBars';
import {useAppSelector} from '@/utils/hooks';
import TrendingTopTabs from './TrendingTopBars';
import FavoriteTopTabs from './FavoriteTopBars';

// import {StatusBar} from 'react-native';

type BottomTabParamList = {
  Popular: undefined;
  Trending: undefined;
  Favorite: undefined;
  My: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TABS = (
  <>
    <Tab.Screen
      name="Popular"
      component={PopularTopTabs}
      options={{
        tabBarLabel: '最热',
        // 隐藏首页的header
        tabBarIcon: ({color, size}) => {
          return <Icon name="whatshot" color={color} size={size} />;
        },
      }}
    />
    <Tab.Screen
      name="Trending"
      component={TrendingTopTabs}
      options={{
        tabBarLabel: '趋势',
        // 隐藏首页的header
        tabBarIcon: ({color, size}) => {
          return <Icon name="trending-up" color={color} size={size} />;
        },
      }}
    />
    <Tab.Screen
      name="Favorite"
      component={FavoriteTopTabs}
      options={{
        tabBarLabel: '收藏',
        // 隐藏首页的header
        tabBarIcon: ({color, size}) => {
          return <Icon name="favorite" color={color} size={size} />;
        },
      }}
    />
    <Tab.Screen
      name="My"
      component={MyScreen}
      options={{
        tabBarLabel: '我的',
        // 隐藏首页的header
        // headerShown: true,
        tabBarIcon: ({color, size}) => {
          return <Entypo name="user" color={color} size={size} />;
        },
      }}
    />
  </>
);

// 底部导航栏
function BottomTabs() {
  const themeColor = useAppSelector(s => s.theme.themeColor);
  return (
    <Tab.Navigator
      initialRouteName="Popular"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: themeColor,
        // headerStatusBarHeight: StatusBar.currentHeight,
        headerStyle: {
          // backgroundColor: 'red',
          shadowColor: '#fff',
        },
      }}>
      {TABS}
    </Tab.Navigator>
  );
}

export default BottomTabs;
