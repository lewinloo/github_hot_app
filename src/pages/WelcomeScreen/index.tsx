import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@/navigator';

function WelcomeScreen() {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    jumpToHome();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const jumpToHome = () => {
    setTimeout(() => {
      navigate('Home');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text>欢迎页面</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});

export default WelcomeScreen;
