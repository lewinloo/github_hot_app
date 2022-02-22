import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from '@/utils/hooks';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {ThemeFlags} from '@/assets/theme';
import {onChangeTheme, setModalVisible} from '@/models/theme';

interface IProps {}

const CustomThemeModal: FC<IProps> = () => {
  const theme = useAppSelector(s => s.theme);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setModalVisible({isShow: false}));
  };

  const handleSelectTheme = (themeKey: string) => {
    dispatch(onChangeTheme({color: ThemeFlags[themeKey]}));
  };

  /**
   * 创建主题Item
   * @param themeKey
   */
  const getThemeItem = (themeKey: string) => {
    return (
      <TouchableHighlight
        style={styles.full}
        underlayColor="white"
        onPress={() => handleSelectTheme(themeKey)}>
        <View
          style={[{backgroundColor: ThemeFlags[themeKey]}, styles.themeItem]}>
          <Text style={styles.themeText}>{themeKey}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const renderThemeItems = () => {
    const views = [];
    for (
      let i = 0, keys = Object.keys(ThemeFlags), l = keys.length;
      i < l;
      i += 3
    ) {
      const key1 = keys[i],
        key2 = keys[i + 1],
        key3 = keys[i + 2];
      views.push(
        <View key={i} style={styles.row}>
          {getThemeItem(key1)}
          {getThemeItem(key2)}
          {getThemeItem(key3)}
        </View>,
      );
    }
    return views;
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={theme.modalVisible}
      onRequestClose={handleClose}>
      <View style={styles.modalContainer}>
        <ScrollView>{renderThemeItems()}</ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  row: {flexDirection: 'row'},
  themeItem: {
    flex: 1,
    height: 120,
    margin: 3,
    padding: 3,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    margin: 10,
    marginBottom: 10 + (isIphoneX() ? 24 : 0),
    marginTop: Platform.OS === 'ios' ? 20 + (isIphoneX() ? 24 : 0) : 10,
    backgroundColor: 'white',
    borderRadius: 3,
    shadowColor: 'gray',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    padding: 3,
  },
  themeText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default CustomThemeModal;
