import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  StatusBarProps,
  StatusBar,
  Platform,
} from 'react-native';
import React, {FC} from 'react';
import {getStatusBarHeight, isIphoneX} from 'react-native-iphone-x-helper';

enum NAVBAR_HEIGHT {
  IOS = 44,
  ANDROID = 50,
}

interface IProps {
  style?: StyleProp<ViewStyle>;
  title?: string;
  titleView?: React.ReactNode;
  titleLayoutStyle?: StyleProp<ViewStyle>;
  hide?: boolean;
  statusBar?: StatusBarProps;
  rightButton?: React.ReactNode;
  leftButton?: React.ReactNode;
}

const NavigationBar: FC<IProps> = props => {
  const statusBar = !props.statusBar?.hidden ? (
    <View style={styles.statusBar}>
      <StatusBar barStyle={'light-content'} {...props.statusBar} />
    </View>
  ) : null;

  const titleView = props.titleView ? (
    props.titleView
  ) : (
    <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>
      {props.title}
    </Text>
  );

  const getButtonElement = (button: React.ReactNode) => {
    return <View style={styles.navBarButton}>{button ?? null}</View>;
  };

  const content = props.hide ? null : (
    <View style={styles.navBar}>
      {getButtonElement(props.leftButton)}
      <View style={[styles.navBarTitleContainer, props.titleLayoutStyle]}>
        {titleView}
      </View>
      {getButtonElement(props.rightButton)}
    </View>
  );

  return (
    <View style={[styles.container, props.style]}>
      {statusBar}
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0099FF',
  },
  statusBar: {
    height: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: isIphoneX() ? 15 : 0,
    height: Platform.OS === 'ios' ? NAVBAR_HEIGHT.IOS : NAVBAR_HEIGHT.ANDROID,
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0,
  },
  navBarButton: {
    alignItems: 'center',
  },
});

export default NavigationBar;
