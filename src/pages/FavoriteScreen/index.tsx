import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function FavoriteScreen() {
  return (
    <View style={styles.container}>
      <Text>FavoriteScreen </Text>
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

export default FavoriteScreen;
