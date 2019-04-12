import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, ScrollView, Swiper, SwiperItem, Input, Button} from '@tarojs/components'
import {ajax, bgJpg,} from "./util";
import WxParse from '../../wxParse/wxParse'
import '../../wxParse/wxParse.wxss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '知乎日报',
  };

  constructor(props) {
    super(props);
    this.state = {
      result: {},
      top: 0,
      stories: [],
      count: 0,
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    this._getNews();
  }

  componentWillUnmount() {
  }

  componentDidShow() {

  }

  componentDidHide() {
  }

  _getNews = () => {
    Taro.showLoading(
      {title: 'loading'}
    )
    ajax(`https://news-at.zhihu.com/api/4/news/${this.$router.params.id}`, '', false,
      (data) => {
        Taro.hideLoading();
        let obj = {date: '今日新闻', stories: data['stories']};
        let stories = this.state.stories;
        stories.push(obj);
        this.setState(prevState => ({
          result: data,
          stories: stories,
          top: prevState.top === 0 ? 0.1 : 0,
          count: prevState.count + 1,
          date: data['date']
        }),()=>{
          WxParse.wxParse('article', 'html', this.state.result['body'], this.$scope, 5)
        })
      },
      () => {
      })
  }

  navTo(url) {
    Taro.navigateTo({
      url: url
    })
  }

  render() {
    const {result, top, stories} = this.state;
    let width = Taro.getSystemInfoSync().windowWidth * 0.6;

    return (result == null
        ? <View style={{
          // backgroundImage: `url(${bgJpg})`,
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          height: `${Taro.getSystemInfoSync().windowHeight}px`
        }}
        />
        : <View className='index' style={{
          fontSize: '14px'
        }}
        >
          <View style={{position: "relative"}}>
            <Image src={result['image']} style={{width: '100%', height: `${width}px`}} mode='aspectFill' />
            <View style={{
              position: "absolute",
              bottom: '24px',
              left: '0',
              color: '#fff',
              textAlign: "justify",
              padding: '0 10px'
            }}
            >{result['title']}</View>
          </View>
          {process.env.TARO_ENV === "weapp" ? (
            <View style={{padding: '0 10px 10px', textAlign: "justify"}}>
              {result != null ? <View>
                <import src='../../wxParse/wxParse.wxml' />
                <template is='wxParse' data='{{wxParseData:article.nodes}}' />
              </View> : null}
            </View>
          ) : (
            <View>只在小程序里支持</View>
          )}
        </View>
    )
  }
}
