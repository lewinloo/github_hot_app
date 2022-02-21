import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Button, NavigationBar} from '@/components';
import {useAppSelector} from '@/utils/hooks';
import {StyleSheet, Text, View} from 'react-native';
import TrendingScreen from '@/pages/TrendingScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TrendingDialog, {
  TimeSpan,
  TIME_SPANS,
} from '@/pages/TrendingScreen/TrendingDialog';

const Tab = createMaterialTopTabNavigator();

function TrendingTopTabs() {
  const theme = useAppSelector(s => s.theme);
  const [showDialog, setShowDialog] = useState(false);
  const [tabs] = useState(['All Language', 'C', 'C#', 'JavaScript', 'PHP']);
  const [timeSpan, setTimeSpan] = useState(TIME_SPANS[0]);

  const handleShowDialog = () => {
    setShowDialog(true);
  };

  const renderTitleView = () => {
    return (
      <Button onPress={handleShowDialog}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>趋势 {timeSpan.showText}</Text>
          <Icon name="arrow-drop-down" size={22} color={'#fff'} />
        </View>
      </Button>
    );
  };

  const navigationBar = (
    <NavigationBar
      titleView={renderTitleView()}
      statusBar={{backgroundColor: theme.themeColor, barStyle: 'light-content'}}
      style={{backgroundColor: theme.themeColor}}
    />
  );

  const handleSelectTimeSpan = (tab: TimeSpan) => {
    setShowDialog(false);
    setTimeSpan(tab);
  };

  const renderTabs = () => {
    return tabs.map(item => {
      return (
        <Tab.Screen
          key={item}
          name={item}
          children={props => <TrendingScreen timeSpan={timeSpan} {...props} />}
          options={{
            tabBarLabel: ({color}) => (
              <Text style={{color}}>
                {item === 'All Language' ? 'All' : item}
              </Text>
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
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#e5e6e7',
        }}>
        {renderTabs()}
      </Tab.Navigator>
      <TrendingDialog
        visible={showDialog}
        setVisible={setShowDialog}
        onSelect={handleSelectTimeSpan}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '400',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TrendingTopTabs;
