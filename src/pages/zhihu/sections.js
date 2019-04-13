import Taro, {Component} from '@tarojs/taro'
import {View, Image,} from '@tarojs/components'
import {ajax,} from "./util";


export default class Index extends Component {

  config = {
    navigationBarTitleText: '栏目',
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
    ajax('https://news-at.zhihu.com/api/3/sections', '', false,
      (data) => {
        Taro.hideLoading();
        this.setState({
          result: data['data'],
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
    let width = (Taro.getSystemInfoSync().windowWidth - 20) / 2 - 27;
    console.log(width);
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
          padding: '10px',
          display: "flex",
          flexWrap: "wrap"
        }}
        >
          {result.map((item, i) => {
            return (
              <View style={{
                borderRadius: '4px',
                width: '50%',
                textAlign: "center",
                padding: `${i % 2 === 0 ? '0 5px 10px 0' : '0 0 10px 5px'}`
              }} key={`${item['id']}`}
                onClick={this.navTo.bind(this, `/pages/zhihu/section?id=${item['id']}&title=${item['name']}`)}
              >
                <View style={{border: '1px solid #eee', textAlign: "center",paddingTop:'10px'}}>
                  <View style={{width: 'calc(100% - 20px)', height: `${width}px`, display: "inline-block", fontSize: '0'}}>
                  <Image src={item['thumbnail']} style={{width: '100%', height: `100%`}} mode='widthFix' />
                </View>
                <View style={{
                  textAlign: "center",
                  paddingBottom:'5px',
                  textOverflow:"ellipsis",
                  overflow:"hidden",
                  whiteSpace:"nowrap"
                }}
                >{item['name']}</View>
              </View>
              </View>
            )
          })}
        </View>
    )
  }
}
