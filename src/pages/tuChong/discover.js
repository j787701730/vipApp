import Taro, {Component} from '@tarojs/taro'
import {View, Image, ScrollView, Swiper, SwiperItem} from '@tarojs/components'
import {ajax, bgJpg,} from "./util";

export default class Index extends Component {

  config = {
    navigationBarTitleText: '图虫',
  };

  constructor(props) {
    super(props);
    this.state = {
      result: null,
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
    );
    let url = `https://api.tuchong.com/discover-app?os_api=22&device_type=MI&device_platform=android&ssmix=a&manifest_version_code=232&
    dpi=400&abflag=0&uuid=651384659521356&version_code=232&app_name=tuchong&version_name=5.0.0&
    openudid=65143269dafd1f3a5&resolution=1280*1000&os_version=5.8.1&ac=wifi&aid=0`;
    url += '&page=1&type=refresh';

    ajax(url, '', false,
      (data) => {
        Taro.hideLoading();
        if (data['result'] === 'SUCCESS') {
          this.setState({
            result: data
          })
        } else {
          Taro.showToast({title: data['result'], icon: 'none'});
        }
      },
      () => {
      })
  }

  navTo(url) {
    Taro.navigateTo({
      url: url
    })
  }

  previewImage = (list) => {
    Taro.previewImage(
      {
        current: list[0],
        urls: list
      }
    )
  }

  render() {
    const {result, top} = this.state;
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
            // onScrollToLower={this._ScrollToLower}
          >
            {result && Array.isArray(result['banners']) ?
              <Swiper
                className='test-h'
                indicatorColor='#999'
                indicatorActiveColor='#333'
                circular
                indicatorDots
                autoplay
                style={{height: `${width}px`}}
              >
                {result['banners'].map((item) => {
                  return (
                    <SwiperItem key={`${item['id']}`}>
                      <View style={{position: "relative"}}>
                        <Image src={item['src']} style={{width: '100%', height: `${width}px`}} mode='aspectFill' />
                      </View>
                    </SwiperItem>
                  )
                })}
              </Swiper>
              : null}
            <View style={{fontWeight: "bold", textAlign: "center", lineHeight: '34px'}}>分类</View>
            {result && Array.isArray(result['categories']) ?
              <View style={{display: "flex", flexWrap: "wrap"}}>
                {result['categories'].map((item) => {
                  return (
                    <View style={{padding: '10px', width: '20%'}} key={`${item['tag_id']}`}>
                      <View
                        style={{textAlign: "center"}}
                        onClick={this.navTo.bind(this, `/pages/tuChong/category?tag_id=${item['tag_id']}`)}
                      >{item['tag_name']}</View>
                    </View>
                  )
                })}
              </View>
              : null}
            <View style={{fontWeight: "bold", textAlign: "center", lineHeight: '34px'}}>热点</View>
            {result && Array.isArray(result['hotEvents']) ?
              <View>
                {result['hotEvents'].map((item) => {
                  return (
                    <View style={{padding: '10px'}} key={`${item['tag_id']}`}
                      onClick={this.previewImage.bind(this, item['images'])}
                    >
                      <View style={{position: "relative"}}>
                        <Image src={item['images'][0]} style={{width: '100%', height: `${width}px`}} mode='aspectFill' />
                        <View style={{position: "absolute", bottom: '10px', color: '#fff', left: '10px'}}>
                          {`1/${item['images'].length}`}
                        </View>
                      </View>
                      <View
                        style={{textAlign: "center"}}
                        onClick={this.navTo.bind(this, item)}
                      >{item['tag_name']}</View>
                    </View>
                  )
                })}
              </View>
              : null}
          </ScrollView>
          <View style={{display: "flex", height: '40px', borderTop: '1px solid #ddd', boxShadow: '0 -1px 2px #ddd'}}>
            <View style={{
              width: '50%', lineHeight: '40px', textAlign: "center",
              borderRight: '1px solid #ddd'
            }}
              onClick={this.navTo.bind(this, '/pages/tuChong/index')}
            >推荐</View>
            <View style={{width: '50%', lineHeight: '40px', textAlign: "center"}}>发现</View>
          </View>
        </View>
    )
  }
}
