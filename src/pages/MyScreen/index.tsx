import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

function MyScreen() {
  return (
    <View style={styles.container}>
      <Text>MyScreen</Text>
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

export default MyScreen;
