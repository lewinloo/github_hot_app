import {StyleSheet, View} from 'react-native';
import React, {FC, useCallback, useRef, useState} from 'react';
import {IconButton, NavigationBar} from '@/components';
import {useAppSelector} from '@/utils/hooks';
import {RootStackParamList, RootStackNavigation} from '@/navigator';
import {RouteProp, useRoute} from '@react-navigation/native';
import {WebView, WebViewNavigation} from 'react-native-webview';
import {onFavorite} from '@/utils';
import FavoritDao from '@/config/favoriteDao';
import {useToast} from 'react-native-toast-notifications';

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
  const isFavorite = route.params?.projectModel.isFavorite;
  const [isStar, setIsStar] = useState(isFavorite);
  const projectModel = route.params?.projectModel.item;
  const toast = useToast();

  const url = projectModel?.html_url ?? TRENDING_URL + projectModel.fullName;
  const title = projectModel?.full_name ?? projectModel.fullName;
  const storeName = projectModel?.html_url ? 'popular' : 'trending';
  const favoriteDao = new FavoritDao(storeName);

  const back = useCallback(() => {
    if (webviewState?.canGoBack) {
      webviewRef.current?.goBack();
    } else {
      props.navigation.goBack();
    }
  }, [props.navigation, webviewState]);

  const handleFavorite = () => {
    !isStar && toast.show('收藏成功');
    isStar && toast.show('取消收藏');
    setIsStar(!isStar);
    onFavorite(favoriteDao, projectModel, !isStar, storeName);
  };

  const renderRightButtons = () => {
    return (
      <View style={styles.rightBtns}>
        <IconButton
          onPress={handleFavorite}
          icon={isStar ? 'star' : 'star-outline'}
          style={styles.btnr}
        />
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
