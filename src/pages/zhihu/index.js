import Taro, {Component} from '@tarojs/taro'
import {View, Image, ScrollView, Swiper, SwiperItem,} from '@tarojs/components'
import {ajax, bgJpg,} from "./util";

var weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

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
      date: ''
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

  _formatDate(date) {
    // 格式化 YYYY-MM-DD
    return `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`;
  }

  _formatDate2(dateString) {
    // 格式化 YYYYMMDD
    let date = this._formatDate(`${dateString}`);
    let t = new Date(date);//你已知的时间
    let y = t.getFullYear() === (new Date()).getFullYear() ? '' : t.getFullYear();
    let m = t.getMonth() + 1 > 9 ? t.getMonth() + 1 : `0${t.getMonth() + 1}`;
    let d = t.getDate() > 9 ? t.getDate() : `0${t.getDate()}`;
    return `${y}${m}月${d}日 ${weekday[t.getDay()]}`;
  }

  _getNews = () => {
    Taro.showLoading(
      {title: 'loading'}
    )
    ajax('https://news-at.zhihu.com/api/4/news/latest', '', false,
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
        }), () => {
          this._getBeforeNews();
        })
      },
      () => {
      })
  }

  _getBeforeNews = () => {
    Taro.showLoading(
      {title: 'loading'}
    )
    ajax(`https://news-at.zhihu.com/api/4/news/before/${this.state.date}`, '', false,
      (data) => {
        Taro.hideLoading();
        let obj = {date: data['date'], stories: data['stories']};
        let stories = this.state.stories;
        stories.push(obj);
        this.setState({
          stories: stories,
          date: data['date']
        })
      },
      () => {
      })
  }


  _ScrollToLower = () => {
    this._getBeforeNews();
  }

  navTo(url) {
    Taro.navigateTo({
      url: url
    })
  }

  render() {
    const {result, top, stories} = this.state;
    let height = Taro.getSystemInfoSync().windowHeight - 40;
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
          // backgroundImage: `url(${bgJpg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: `${Taro.getSystemInfoSync().windowHeight}px`,
          fontSize: '14px'
        }}
        >
          <ScrollView
            style={{
              height: `${height}px`,
              boxSizing: "border-box"
            }}
            scrollY
            scrollTop={top}
            onScrollToLower={this._ScrollToLower}
          >
            {Array.isArray(result['top_stories']) ?
              <Swiper
                className='test-h'
                indicatorColor='#999'
                indicatorActiveColor='#333'
                circular
                indicatorDots
                autoplay
                style={{height: `${width}px`}}
              >
                {result['top_stories'].map((item) => {
                  return (
                    <SwiperItem key={`${item['id']}`}>
                      <View style={{position: "relative"}}
                        onClick={this.navTo.bind(this, `/pages/zhihu/content?id=${item['id']}`)}
                      >
                        <Image src={item['image']} style={{width: '100%', height: `${width}px`}} mode='aspectFill' />
                        <View style={{
                          position: "absolute",
                          bottom: '24px',
                          left: '0',
                          color: '#fff',
                          textAlign: "justify"
                        }}
                        >{item['title']}</View>
                      </View>
                    </SwiperItem>
                  )
                })}
              </Swiper>
              : null}
            <View style={{padding: '0 5px'}}>
              {stories.map((storie) => {
                return (
                  <View style={{marginBottom: '10px',}} key={`${storie['date']}`}>
                    <View style={{color: '#aaa', lineHeight: '34px', paddingLeft: '10px'}}>{storie['date'] === '今日新闻'
                      ? storie['date'] : this._formatDate2(storie['date'])}</View>
                    {storie['stories'].map((item) => {
                      return (
                        <View style={{
                          display: "flex", border: '1px solid #eee',
                          marginBottom: '10px', borderRadius: '4px'
                        }} key={`${item['id']}`}
                          onClick={this.navTo.bind(this, `/pages/zhihu/content?id=${item['id']}`)}
                        >
                          <View style={{
                            textAlign: "justify",
                            width: 'calc(100% - 70px)',
                            padding: '10px 10px 0 10px',
                          }}
                          >{item['title']}</View>
                          <View style={{width: '70px', height: '80px', padding: '10px 10px 10px 0'}}>
                            {
                              Array.isArray(item['images']) ?
                                <Image src={item['images'][0]} style={{width: '100%', height: `100%`}} mode='aspectFill' />
                                : null
                            }

                          </View>
                        </View>
                      )
                    })}
                  </View>
                )
              })
              }
            </View>
          </ScrollView>
          <View style={{display: "flex", height: '40px', borderTop: '1px solid #ddd', boxShadow: '0 -1px 2px #ddd'}}>
            <View style={{
              width: '50%', lineHeight: '40px', textAlign: "center",
              borderRight: '1px solid #ddd'
            }} onClick={this.navTo.bind(this, '/pages/zhihu/hot')}
            >热门</View>
            <View style={{width: '50%', lineHeight: '40px', textAlign: "center"}}
              onClick={this.navTo.bind(this, '/pages/zhihu/sections')}
            >栏目</View>
          </View>
        </View>
    )
  }
}
