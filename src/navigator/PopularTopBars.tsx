import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PopularScreen from '@/pages/PopularScreen';
import {NavigationBar} from '@/components';
import {useAppSelector} from '@/utils/hooks';
import {StyleSheet, Text, View} from 'react-native';

const Tab = createMaterialTopTabNavigator();

function PopularTopTabs() {
  const theme = useAppSelector(s => s.theme);
  const [tabs] = useState([
    'Java',
    'IOS',
    'React',
    'Vue',
    'Flutter',
    'React Native',
    'PHP',
    'Android',
  ]);

  const navigationBar = (
    <NavigationBar
      title="最热"
      statusBar={{backgroundColor: theme.themeColor, barStyle: 'light-content'}}
      style={{backgroundColor: theme.themeColor}}
    />
  );

  const renderTabs = () => {
    return tabs.map(item => {
      return (
        <Tab.Screen
          key={item}
          name={item}
          children={props => <PopularScreen {...props} />}
          options={{
            tabBarLabel: ({color}) => <Text style={{color}}>{item}</Text>,
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
          tabBarScrollEnabled: true,
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

export default PopularTopTabs;
