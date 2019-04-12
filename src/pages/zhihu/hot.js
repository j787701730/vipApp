import Taro, {Component} from '@tarojs/taro'
import {View, Image,} from '@tarojs/components'
import {ajax,} from "./util";


export default class Index extends Component {

  config = {
    navigationBarTitleText: '热门信息',
  };

  constructor(props) {
    super(props);
    this.state = {
      result: null
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
    ajax('https://news-at.zhihu.com/api/3/news/hot', '', false,
      (data) => {
        Taro.hideLoading();
        this.setState({
          result: data['recent'],
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
    const {result,} = this.state;
    return (result == null
        ? <View style={{
          // backgroundImage: `url(${bgJpg})`,
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          height: `${Taro.getSystemInfoSync().windowHeight}px`
        }}
        />
        : <View className='index' style={{
          fontSize: '14px',
          padding:'5px'
        }}
        >
          {result.map((item) => {
            return (
              <View style={{
                display: "flex", border: '1px solid #eee',
                marginBottom: '10px', borderRadius: '4px'
              }} key={`${item['id']}`}
                onClick={this.navTo.bind(this, `/pages/zhihu/content?id=${item['news_id']}`)}
              >
                <View style={{
                  textAlign: "justify",
                  width: 'calc(100% - 70px)',
                  padding: '10px 10px 0 10px',
                }}
                >{item['title']}</View>
                <View style={{width: '70px', height: '80px', padding: '10px 10px 10px 0'}}>
                  <Image src={item['thumbnail']} style={{width: '100%', height: `100%`}} mode='aspectFill' />
                </View>
              </View>
            )
          })}
        </View>
    )
  }
}
