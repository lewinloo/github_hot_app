import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationBar} from '@/components';
import {useAppSelector} from '@/utils/hooks';
import {StyleSheet, Text, View} from 'react-native';
import FavoriteScreen from '@/pages/FavoriteScreen';

const Tab = createMaterialTopTabNavigator();

function FavoriteTopTabs() {
  const theme = useAppSelector(s => s.theme);
  const [tabs] = useState(['popular', 'trending']);

  const navigationBar = (
    <NavigationBar
      title="收藏"
      statusBar={{backgroundColor: theme.themeColor, barStyle: 'light-content'}}
      style={{backgroundColor: theme.themeColor}}
    />
  );

  const renderText = (text: string) => {
    switch (text) {
      case 'popular':
        return '最热';
      case 'trending':
        return '趋势';
    }
  };

  const renderTabs = () => {
    return tabs.map(item => {
      return (
        <Tab.Screen
          key={item}
          name={item}
          children={props => <FavoriteScreen {...props} />}
          options={{
            tabBarLabel: ({color}) => (
              <Text style={{color}}>{renderText(item)}</Text>
            ),
            tabBarStyle: {
              backgroundColor: theme.themeColor,
            },
            tabBarIndicatorStyle: {
              height: 2,
              borderRadius: 2,
              backgroundColor: '#fff',
            },
          }}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      {navigationBar}
      <Tab.Navigator
        // tabBar={this.renderTabBar}
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#e5e6e7',
        }}>
        {renderTabs()}
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FavoriteTopTabs;
