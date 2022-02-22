import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC, memo, ReactNode, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAppSelector} from '@/utils/hooks';
import {Button} from '.';

interface IProps {
  Icon?: any;
  iconName?: string;
  title: string;
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<ViewStyle>;
  onPress?: (title: string) => void;
  expandedItem?: ReactNode;
}

// 我的主页的 菜单Item 组件
const MenuItem: FC<IProps> = props => {
  const {iconName, title, expandedItem} = props;
  const [isExpanded] = useState(expandedItem !== undefined);
  const [unfold, setUnfold] = useState(false);
  const theme = useAppSelector(s => s.theme);

  const handlePress = () => {
    !expandedItem && props.onPress?.(props.title);
    expandedItem && setUnfold(!unfold);
  };
  return (
    <View>
      <Button onPress={handlePress} style={[styles.container, props.style]}>
        <View style={styles.left}>
          {props.Icon ? (
            <props.Icon
              name={iconName}
              size={props.iconSize ?? 16}
              color={theme.themeColor}
            />
          ) : (
            <View style={styles.empty} />
          )}
          <Text style={[styles.title, props.titleStyle]}>{title}</Text>
        </View>
        <Icon
          name={
            isExpanded
              ? unfold
                ? 'keyboard-arrow-up'
                : 'keyboard-arrow-down'
              : 'chevron-right'
          }
          size={26}
          color={theme.themeColor}
        />
      </Button>
      {isExpanded && unfold ? expandedItem : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'darkgray',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 12,
  },
  empty: {opacity: 1, width: 16, height: 16},
});

export default memo(MenuItem);
