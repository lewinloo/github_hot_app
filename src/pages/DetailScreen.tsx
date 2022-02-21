import {StyleSheet, View} from 'react-native';
import React, {FC, useCallback, useRef, useState} from 'react';
import {IconButton, NavigationBar} from '@/components';
import {useAppSelector} from '@/utils/hooks';
import {RootStackParamList, RootStackNavigation} from '@/navigator';
import {RouteProp, useRoute} from '@react-navigation/native';
import {WebView, WebViewNavigation} from 'react-native-webview';

interface IProps {
  route: RouteProp<RootStackParamList, 'Details'>;
  navigation: RootStackNavigation;
}

const TRENDING_URL = 'https://github.com/';

const DetailScreen: FC<IProps> = props => {
  const theme = useAppSelector(s => s.theme);
  const route = useRoute<RouteProp<RootStackParamList>>();
  const [webviewState, setWebviewState] = useState<WebViewNavigation>();
  const webviewRef = useRef<WebView>(null);
  const projectModel = route.params?.projectModel;

  const url = projectModel.html_url ?? TRENDING_URL + projectModel.fullName;
  const title = projectModel.full_name ?? projectModel.fullName;

  const back = useCallback(() => {
    if (webviewState?.canGoBack) {
      webviewRef.current?.goBack();
    } else {
      props.navigation.goBack();
    }
  }, [props.navigation, webviewState]);

  const renderRightButtons = () => {
    return (
      <View style={styles.rightBtns}>
        <IconButton icon="star-outline" style={styles.btnr} />
        <IconButton icon="share" />
      </View>
    );
  };

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setWebviewState(navState);
  };

  const titleLayout = title.length > 24 ? {paddingRight: 50} : null;

  return (
    <View style={styles.container}>
      <NavigationBar
        title={title}
        titleLayoutStyle={titleLayout}
        leftButton={<IconButton icon="arrow-back-ios" onPress={back} />}
        rightButton={renderRightButtons()}
        statusBar={{
          backgroundColor: theme.themeColor,
          barStyle: 'light-content',
        }}
        style={{backgroundColor: theme.themeColor}}
      />
      <WebView
        ref={webviewRef}
        source={{uri: url}}
        startInLoadingState
        onNavigationStateChange={handleNavigationStateChange}
      />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rightBtns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnr: {margin: -2},
});
