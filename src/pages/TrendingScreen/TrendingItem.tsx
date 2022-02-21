import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC, memo, useCallback} from 'react';
import {TrendingItemProps} from '@/config/interfaces';
import {Button} from '@/components';
import {useFavoriteButton} from '@/utils/hooks';

interface IProps {
  item: TrendingItemProps;
  onSelect?: (item: TrendingItemProps) => void;
  onFavorite?: (item: TrendingItemProps, isFavorite: boolean) => void;
}

const TrendingItem: FC<IProps> = props => {
  const {onFavorite, item, onSelect} = props!;
  const {fullName, description, meta, starCount, contributors} =
    props.item!.item!;
  const {FavoriteButton} = useFavoriteButton(item, onFavorite!);

  const handlePress = useCallback(() => {
    onSelect?.(item);
  }, [onSelect, item]);

  if (!props.item) {
    return null;
  }

  return (
    <Button onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.title}>{fullName}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {meta}
        </Text>
        <View style={styles.bottom}>
          <View style={styles.author}>
            <Text>Built by: </Text>
            {contributors?.map(imgUrl => {
              return (
                <Image
                  key={imgUrl}
                  style={styles.image}
                  source={{uri: imgUrl}}
                />
              );
            })}
          </View>
          <View>
            <Text>Star: {starCount}</Text>
          </View>
          {FavoriteButton}
        </View>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    margin: 2,
    borderRadius: 8,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default memo(TrendingItem);
