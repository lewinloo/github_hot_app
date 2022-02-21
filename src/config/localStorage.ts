import AsyncStorage from '@react-native-async-storage/async-storage';
import Trending from 'GitHubTrending';

interface WrapData {
  data: any;
  timestamp: number;
}

export type FlagStorage = 'popular' | 'trending';

// GitHubTrending Token
const AUTH_TOKEN = 'fd82d1e882462e23b8e88aa82198f166';

/**
 * 离线缓存设计
 */
export default class DataStore {
  /**
   * 获取数据，有限获取本地的数据，如果没有本地数据或本地数据过期则获取网络数据
   */
  fetchData(url: string, flag?: FlagStorage): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url)
        .then(wrapData => {
          if (
            wrapData &&
            DataStore.checkTimestampValid(
              (wrapData as unknown as WrapData).timestamp,
            )
          ) {
            resolve(wrapData);
          } else {
            this.fetchNetData(url, flag!)
              .then(data => {
                resolve(this._wrapData(data));
              })
              .catch(error => {
                reject(error);
              });
          }
        })
        .catch(_ => {
          this.fetchNetData(url, flag!)
            .then(data => {
              resolve(this._wrapData(data));
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  /**
   * 保存数据到本地存储
   * @param url
   * @param data
   * @param callback
   * @returns
   */
  saveData(
    url: string,
    data: any,
    callback?: (error: Error | null | undefined) => void,
  ) {
    if (!data || !url) {
      return;
    }
    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
  }

  private _wrapData(data: any): WrapData {
    return {data, timestamp: Date.now()};
  }

  /**
   * 获取本地数据
   */
  async fetchLocalData(url: string) {
    try {
      const result = await AsyncStorage.getItem(url);
      return JSON.parse(result!);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 获取网络数据
   */
  fetchNetData(url: string, flag: FlagStorage) {
    return new Promise((resolve, reject) => {
      if (flag !== 'trending') {
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok');
          })
          .then(json => {
            this.saveData(url, json);
            resolve(json);
          })
          .catch(err => {
            reject(err);
          });
      } else {
        new Trending(AUTH_TOKEN)
          .fetchTrending(url)
          .then((items: any) => {
            if (!items) {
              throw new Error('response is null');
            }
            this.saveData(url, items);
            resolve(items);
          })
          .catch((e: any) => reject(e));
      }
    });
  }

  /**
   * 检查timestamp是否过期
   * @param timestamp
   * @returns
   */
  static checkTimestampValid(timestamp: number) {
    const currentDate = new Date();
    const tagetDate = new Date(timestamp);
    if (currentDate.getMonth() !== tagetDate.getMonth()) {
      return false;
    }
    if (currentDate.getDate() !== tagetDate.getDate()) {
      return false;
    }
    if (currentDate.getHours() - tagetDate.getHours() > 4) {
      return false;
    }
    return true;
  }
}
