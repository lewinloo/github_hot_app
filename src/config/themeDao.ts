import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeFlags} from '@/assets/theme';

const THEME_KEY = 'theme_color';
export default class ThemeDao {
  /**
   * 获取当前主题
   * @returns {Promise<any> | Promise}
   */
  getTheme(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await AsyncStorage.getItem(THEME_KEY);
        if (!result) {
          this.save(ThemeFlags.Default);
          result = ThemeFlags.Default;
        }
        resolve(result);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  /**
   * 保存主题标识
   * @param themeFlag
   */
  async save(themeFlag: string) {
    try {
      await AsyncStorage.setItem(THEME_KEY, themeFlag);
    } catch (error) {
      console.log(error);
    }
  }
}
