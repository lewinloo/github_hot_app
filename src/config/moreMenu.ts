import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

export const GROUP_MENU = [
  {
    groupName: '趋势管理',
    items: {
      Custom_Language: {
        name: '自定义语言',
        Icons: MaterialIcons,
        icon: 'check-circle-outline',
      },
      Sort_Language: {
        name: '语言排序',
        Icons: MaterialIcons,
        icon: 'sort',
      },
    },
  },
  {
    groupName: '最热管理',
    items: {
      Custom_Key: {
        name: '自定义标签',
        Icons: MaterialIcons,
        icon: 'check-circle-outline',
      },
      Sort_Key: {name: '标签排序', Icons: MaterialIcons, icon: 'sort'},
      Remove_Key: {
        name: '标签移除',
        Icons: MaterialIcons,
        icon: 'remove-circle-outline',
      },
    },
  },
  {
    groupName: '设置',
    items: {
      Custom_Theme: {
        name: '自定义主题',
        Icons: MaterialIcons,
        icon: 'color-lens',
      },
      About_Author: {
        name: '关于作者',
        Icons: MaterialIcons,
        icon: 'sentiment-satisfied-alt',
      },
      Feedback: {name: '反馈', Icons: MaterialIcons, icon: 'feedback'},
    },
  },
];

export const MORE_MENU = {
  Custom_Language: {
    name: '自定义语言',
    Icons: MaterialIcons,
    icon: 'check-circle-outline',
  },
  Sort_Language: {
    name: '语言排序',
    Icons: MaterialIcons,
    icon: 'sort',
  },
  Custom_Key: {
    name: '自定义标签',
    Icons: MaterialIcons,
    icon: 'check-circle-outline',
  },
  Sort_Key: {name: '标签排序', Icons: MaterialIcons, icon: 'sort'},
  Remove_Key: {
    name: '标签移除',
    Icons: MaterialIcons,
    icon: 'remove-circle-outline',
  },
  Custom_Theme: {
    name: '自定义主题',
    Icons: MaterialIcons,
    icon: 'color-lens',
  },
  About_Author: {
    name: '关于作者',
    Icons: MaterialIcons,
    icon: 'sentiment-satisfied-alt',
  },
  Feedback: {name: '反馈', Icons: MaterialIcons, icon: 'feedback'},
  About: {name: '关于', Icons: Entypo, icon: 'github'},
  Tutorial: {name: '教程', Icons: MaterialIcons, icon: 'bookmarks'},
  Share: {name: '分享', Icons: MaterialIcons, icon: 'share'},
  CodePush: {name: 'CodePush', Icons: MaterialIcons, icon: 'refresh'},
};
