import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC, memo, useCallback} from 'react';
import {PopularItemProps, BaseItemProps} from '@/config/interfaces';
import {Button} from '@/components';
import {useFavoriteButton} from '@/utils/hooks';
import {wp} from '@/utils';

const PopularItem: FC<BaseItemProps<PopularItemProps>> = props => {
  const {owner, full_name, description, stargazers_count} = props.item!.item!;
  const {FavoriteButton} = useFavoriteButton(props.item, props.onFavorite!);

  const handlePress = useCallback(() => {
    const {onSelect, item} = props;
    onSelect?.(item);
  }, [props]);

  if (!owner) {
    return null;
  }

  return (
    <Button onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.title}>{full_name}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
        <View style={styles.bottom}>
          <View style={styles.author}>
            <Text>Author: </Text>
            <Image style={styles.image} source={{uri: owner.avatar_url}} />
          </View>
          <View>
            <Text>Star: {stargazers_count}</Text>
          </View>
          {FavoriteButton}
        </View>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    minWidth: wp(97),
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 3,
    borderColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121',
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575',
  },
  bottom: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 22,
    height: 22,
    borderRadius: 8,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default memo(PopularItem);
