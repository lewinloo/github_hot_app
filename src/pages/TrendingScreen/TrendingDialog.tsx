import {Modal, Platform, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Button} from '@/components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

export type TimeSpan = {
  showText: string;
  searchText: string;
};

export const TIME_SPANS = [
  {showText: '今 天', searchText: 'since=daily'},
  {showText: '本 周', searchText: 'since=weekly'},
  {showText: '本 月', searchText: 'since=monthly'},
];

interface IProps {
  onClose?: () => void;
  onSelect?: (item: TimeSpan) => void;
  setVisible?: (flag: boolean) => void;
  visible: boolean;
}

const TrendingDialog: FC<IProps> = props => {
  const {onClose, onSelect, setVisible} = props;

  const handleClose = () => {
    setVisible?.(false);
  };

  return (
    <Modal transparent visible={props.visible} onRequestClose={onClose}>
      <Button style={styles.container} onPress={handleClose}>
        <Icon name="arrow-drop-up" size={36} style={styles.arrow} />
        <View style={styles.content}>
          {TIME_SPANS.map((item, i) => {
            return (
              <Button key={item.searchText} onPress={() => onSelect?.(item)}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{item.showText}</Text>
                </View>
                {i !== TIME_SPANS.length - 1 ? (
                  <View style={styles.line} />
                ) : null}
              </Button>
            );
          })}
        </View>
      </Button>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
  },
  arrow: {
    marginTop: 40,
    color: '#fff',
    padding: 0,
    margin: -15,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 3,
    paddingVertical: 3,
    marginRight: 3,
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    paddingVertical: 8,
    paddingHorizontal: 26,
  },
  line: {
    height: 0.3,
    backgroundColor: 'darkgray',
  },
});

export default TrendingDialog;
