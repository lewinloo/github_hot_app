import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC, memo, useCallback, useState} from 'react';
import {PopularItemProps} from '@/config/interfaces';
import {Button} from '@/components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAppSelector} from '@/utils/hooks';

interface IProps {
  item: PopularItemProps;
  onSelect?: (item: PopularItemProps) => void;
  onFavorite?: (item: PopularItemProps, isFavorite?: boolean) => void;
}

const PopularItem: FC<IProps> = props => {
  const theme = useAppSelector(s => s.theme);
  const [isFavorite, setIsFavorite] = useState(props.item.isFavorite);
  const {owner, full_name, description, stargazers_count} = props.item!.item!;

  const handlePress = useCallback(() => {
    const {onSelect, item} = props;
    onSelect?.(item);
  }, [props]);

  const handleStar = useCallback(() => {
    const {onFavorite, item} = props;
    setIsFavorite(!isFavorite);
    onFavorite?.(item, !isFavorite);
  }, [isFavorite, props]);

  const renderStar = (
    <Button onPress={handleStar}>
      <Icon
        name={isFavorite ? 'star' : 'star-outline'}
        size={26}
        style={{color: theme.themeColor}}
      />
    </Button>
  );

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
          {renderStar}
        </View>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
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
    borderRadius: 8,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default memo(PopularItem);
