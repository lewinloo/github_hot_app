import AsyncStorage from '@react-native-async-storage/async-storage';

export enum FAVORITE_KEY {
  PREFIX = 'favorite_',
}

class FavoritDao {
  favoriteKey: string;
  constructor(flag: 'popular' | 'trending') {
    this.favoriteKey = FAVORITE_KEY.PREFIX + flag;
  }

  /**
   * 收藏项目，保存收藏的项目
   */
  saveFavoriteItem(key: string, value: any) {
    AsyncStorage.setItem(key, value, (error: any) => {
      if (!error) {
        this.updateFavoriteKeys(key, true);
      }
    });
  }

  /**
   * 更新
   * @param key
   * @param isAdd true 添加，false 删除
   */
  updateFavoriteKeys(key: string, isAdd: boolean) {
    AsyncStorage.getItem(this.favoriteKey, (err, result) => {
      if (!err) {
        // 趋势或最热模块的数据集的key
        let favoriteKeys = [];
        if (result) {
          favoriteKeys = JSON.parse(result);
        }
        let index = (favoriteKeys as Array<any>).indexOf(key);
        if (isAdd) {
          index === -1 && favoriteKeys.unshift(key);
        } else {
          index !== -1 && favoriteKeys.splice(index, 1);
        }
        AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));
      }
    });
  }

  /**
   * 获取收藏的 Repository 对应的 key
   */
  getFavoriteKeys() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.favoriteKey, (err, res) => {
        if (!err) {
          try {
            resolve(JSON.parse(res!));
          } catch (e) {
            reject(err);
          }
        } else {
          reject(err);
        }
      });
    });
  }

  /**
   * 取消收藏，移除已经收藏的项目
   */
  removeFavoriteItem(key: string) {
    AsyncStorage.removeItem(key, (err: any) => {
      if (!err) {
        this.updateFavoriteKeys(key, false);
      }
    });
  }

  /**
   * 获取所有的收藏项目
   */
  getAllItems() {
    return new Promise((resolve, reject) => {
      this.getFavoriteKeys()
        .then(async keys => {
          const stores = (await AsyncStorage.multiGet(
            keys as unknown as string[],
          )) as [];
          const items = stores.map(item => {
            return JSON.parse(item[1]);
          });
          resolve(items);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default FavoritDao;
