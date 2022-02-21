import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC, memo, useCallback, useState} from 'react';
import {TrendingItemProps} from '@/config/interfaces';
import {Button} from '@/components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAppSelector} from '@/utils/hooks';
import {useToast} from 'react-native-toast-notifications';

interface IProps {
  item: TrendingItemProps;
  onSelect?: (item: TrendingItemProps) => void;
  onFavorite?: (item: TrendingItemProps, isFavorite: boolean) => void;
}

const TrendingItem: FC<IProps> = props => {
  const theme = useAppSelector(s => s.theme);
  const [isFavorite, setIsFavorite] = useState(props.item.isFavorite);
  const {fullName, description, meta, starCount, contributors} =
    props.item!.item!;
  const toast = useToast();

  const handlePress = useCallback(() => {
    const {onSelect, item} = props;
    onSelect?.(item);
  }, [props]);

  const handleStar = useCallback(() => {
    const {onFavorite, item} = props;
    !isFavorite && toast.show('收藏成功');
    setIsFavorite(!isFavorite);
    onFavorite?.(item, !isFavorite);
  }, [isFavorite, props, toast]);

  const renderStar = (
    <Button onPress={handleStar}>
      <Icon
        name={isFavorite ? 'star' : 'star-outline'}
        size={26}
        style={{color: theme.themeColor}}
      />
    </Button>
  );

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
          {renderStar}
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
