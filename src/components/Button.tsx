import React, {memo} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

function Button(props: TouchableOpacityProps) {
  return <TouchableOpacity activeOpacity={0.8} {...props} />;
}

export default memo(Button);
