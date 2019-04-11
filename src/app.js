import Taro, {Component} from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      // 天气
      'pages/weather/index',
      'pages/weather/citys',
      'pages/weather/history',
      // 驾考
      'pages/tiku/index',
      'pages/tiku/kemu1',
      'pages/tiku/kemu4',
      'pages/tiku/category',
      'pages/tiku/categoryContent',
      // 菜谱
      'pages/cook/index',
      'pages/cook/cookMenu',
      'pages/cook/cookDetail',
      // 微信精选
      'pages/wxArticle/index',
      'pages/wxArticle/content',
      // 历史上的今天
      'pages/history/index',
      // 汽车信息
      'pages/car/index',
      'pages/car/series',
      'pages/car/detail',
      // 新华字典
      'pages/xinHuaDictionary/index',
      // 豆瓣电影
      'pages/DoubanMovie/index',
      'pages/DoubanMovie/movieDetail',
      'pages/DoubanMovie/videoPlay',
      // 豆瓣电影
      'pages/36kr/index',
      'pages/36kr/content',
      // 'pages/DoubanMovie/videoPlay',

    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount() {
    let history = Taro.getStorageSync('history');
    if (!history) {
      Taro.setStorageSync('history', JSON.stringify([]));
    }
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
