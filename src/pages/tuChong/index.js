import Taro, {Component} from '@tarojs/taro'
import {View, Image, ScrollView,} from '@tarojs/components'
import {ajax, bgJpg,} from "./util";

export default class Index extends Component {

  config = {
    navigationBarTitleText: '图虫',
  };

  constructor(props) {
    super(props);
    this.state = {
      result: null,
      top: 0,
      page: 1
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
    let {page, result} = this.state;
    let url = `https://api.tuchong.com/feed-app?os_api=22&device_type=MI&device_platform=android&ssmix=a&manifest_version_code=232&
    dpi=400&abflag=0&uuid=651384659521356&version_code=232&app_name=tuchong&version_name=5.0.0&
    openudid=65143269dafd1f3a5&resolution=1280*1000&os_version=5.8.1&ac=wifi&aid=0`;
    if (page === 1) {
      url += '&page=1&type=refresh';
    } else {
      url += `&page=${page}&type=loadmore&post_id=${result[result.length - 1]['post_id']}`;
    }

    ajax(url, '', false,
      (data) => {
        Taro.hideLoading();
        if (data['result'] === 'SUCCESS') {
          if (page === 1) {
            result = data['feedList'];
          } else {
            for (const feedList of data['feedList']) {
              result.push(feedList);
            }
          }
          this.setState({
            result: result
          })
        } else {
          Taro.showToast({title: data['result'], icon: 'none'});
        }
      },
      () => {
      })
  }


  _ScrollToLower = () => {
    // this._getNews();
    this.setState(prevState => ({
      page: prevState.page + 1
    }), () => {
      this._getNews();
    })
  }

  navTo(url) {
    Taro.navigateTo({
      url: url
    })
  }

  previewImage = (list) => {
    let urls = [];
    for (const el of list) {
      urls.push(`https://photo.tuchong.com/${el['user_id']}/f/${el['img_id']}.jpg`)
    }
    Taro.previewImage(
      {
        current: `https://photo.tuchong.com/${list[0]['user_id']}/f/${list[0]['img_id']}.jpg`,
        urls: urls
      }
    )
  }

  render() {
    const {result, top} = this.state;
    let height = Taro.getSystemInfoSync().windowHeight - 40;
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
            <View>
              {result.map((list) => {
                return (
                  <View style={{marginBottom: '10px',}} key={`${list['post_id']}`}>
                    {Array.isArray(list['images'])
                      ? <View style={{position: "relative"}}>
                        <Image style={{width: '100%'}} mode='widthFix'
                          src={`https://photo.tuchong.com/${list['images'][0]['user_id']}/f/${list['images'][0]['img_id']}.jpg`}
                          onClick={this.previewImage.bind(this, list['images'])}
                        />
                        <View style={{position: "absolute", bottom: '10px', color: '#fff',left:'10px'}}>
                          {`1/${list['images'].length}`}
                        </View>
                      </View> : null}
                    <View style={{padding: '0 5px',}}>{list['title']}</View>
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
            }}
            >推荐</View>
            <View style={{width: '50%', lineHeight: '40px', textAlign: "center"}}
              onClick={this.navTo.bind(this, '/pages/tuChong/discover')}
            >发现</View>
          </View>
        </View>
    )
  }
}
