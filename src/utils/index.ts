import FavoritDao from '@/config/favoriteDao';

export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

// 给 最热item 和 趋势item 添加一个收藏（isFavorite）的属性
export const wrapProjectModels = async (
  showItems: any[],
  favoriteDao: FavoritDao,
) => {
  let keys = [];
  try {
    keys = (await favoriteDao.getFavoriteKeys()) as unknown[] as any[];
  } catch (error) {
    console.log(error);
  }
  let projectModels = [];
  for (let i = 0, len = showItems.length; i < len; i++) {
    const showItem = showItems[i];
    projectModels.push({
      item: showItem,
      isFavorite: checkFavorite(showItem, keys),
    });
  }
  return projectModels;
};

// 判断是否是收藏的，从本地存储中查找已收藏的key，再进行判断
export const checkFavorite = (item: any, keys: any[] = []) => {
  if (!keys?.length) {
    return false;
  }
  for (let i = 0, len = keys.length; i < len; i++) {
    let id = item.id ? item.id : item.fullName;
    if (id.toString() === keys[i]) {
      return true;
    }
  }
  return false;
};

/**
 * 收藏事件 TODO
 */
export function onFavorite(
  favoriteDao: FavoritDao,
  item: any,
  isFavorite: boolean,
  flag: 'popular' | 'trending',
) {
  const key = flag === 'trending' ? item.fullName : item.id.toString();
  if (isFavorite) {
    favoriteDao.saveFavoriteItem(key, JSON.stringify(item));
  } else {
    favoriteDao.removeFavoriteItem(key);
  }
}

/**
 * @param { Promise } 传进去的请求函数
 * @param { Object= } errorExt - 拓展错误对象
 * @return { Promise } 返回一个Promise
 */
export async function to(promise: Promise<any>, errorExt?: any): Promise<any> {
  return promise
    .then(data => [null, data])
    .catch(err => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }

      return [err, undefined];
    });
}