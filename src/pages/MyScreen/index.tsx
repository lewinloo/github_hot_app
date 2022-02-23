import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {MenuItem, NavigationBar} from '@/components';
import {useAppDispatch, useAppSelector} from '@/utils/hooks';
import {GROUP_MENU, MORE_MENU} from '@/config/moreMenu';
import CustomThemeModal from './CustomThemeModal';
import {setModalVisible} from '@/models/theme';
import {RootStackParamList, RootStackNavigation} from '@/navigator';
import {RouteProp} from '@react-navigation/native';

interface IProps {
  route: RouteProp<RootStackParamList, any>;
  navigation: RootStackNavigation;
}

function MyScreen(props: IProps) {
  const {navigation} = props;
  const theme = useAppSelector(s => s.theme);
  const dispatch = useAppDispatch();

  // 点击菜单事件
  const handleClick = (key: string) => {
    switch (key) {
      case MORE_MENU.Custom_Theme.name:
        dispatch(setModalVisible({isShow: true}));
        break;
      case MORE_MENU.Tutorial.name:
        const url = 'https://coding.m.imooc.com/classindex.html?cid=89';
        navigation.navigate('Webview', {title: key, url});
        break;
    }
  };

  return (
    <>
      <NavigationBar
        title="我的"
        statusBar={{
          backgroundColor: theme.themeColor,
          barStyle: 'light-content',
        }}
        style={{backgroundColor: theme.themeColor}}
      />
      <ScrollView style={styles.container}>
        <MenuItem
          title={'Github Popular'}
          style={styles.headItem}
          Icon={MORE_MENU.About.Icons}
          iconName={MORE_MENU.About.icon}
          iconSize={40}
        />
        <MenuItem
          onPress={handleClick}
          title={MORE_MENU.Tutorial.name}
          Icon={MORE_MENU.Tutorial.Icons}
          iconName={MORE_MENU.Tutorial.icon}
        />
        {GROUP_MENU.map(group => {
          return (
            <View key={group.groupName}>
              <Text style={styles.groupTitle}>{group.groupName}</Text>
              {Object.entries(group.items).map(obj => {
                const item = obj[1];
                const key = obj[0];
                return (
                  <MenuItem
                    key={key}
                    onPress={handleClick}
                    title={item.name}
                    Icon={item.Icons}
                    iconName={item.icon}
                  />
                );
              })}
            </View>
          );
        })}
      </ScrollView>
      <CustomThemeModal />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f4',
  },
  headItem: {
    height: 90,
  },
  groupTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    color: 'gray',
  },
});

export default MyScreen;
