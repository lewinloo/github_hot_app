import {StyleSheet, TouchableOpacityProps} from 'react-native';
import React, {FC} from 'react';
import Button from './Button';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IProps extends TouchableOpacityProps {
  icon: string;
}

const IconButton: FC<IProps> = props => {
  return (
    <Button style={styles.btn} {...props}>
      <Icon name={props.icon} size={26} color="white" />
    </Button>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  btn: {
    padding: 8,
    paddingLeft: 12,
  },
});
