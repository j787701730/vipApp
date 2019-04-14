import Taro, {Component} from '@tarojs/taro'
import {View, Image, ScrollView, Swiper, SwiperItem, Audio} from '@tarojs/components'
import {ajax, bgJpg,} from "./util";


export default class Index extends Component {

  config = {
    navigationBarTitleText: 'QQ音乐',
  };

  constructor(props) {
    super(props);
    this.state = {
      result: null,
      top: 0,
      stories: [],
      count: 0,
      date: '',
      url: ''
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

  // https://www.jianshu.com/p/67e4bd47d981 知乎地址
  _getNews = () => {
    Taro.showLoading(
      {title: 'loading'}
    )
    ajax(`https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923`, '', false,
      (data) => {
        Taro.hideLoading();
        this.setState(prevState => ({
          result: data,
          top: prevState.top === 0 ? 0.1 : 0,
          // count: prevState.count + 1,
          // date: data['date']
        }))

      },
      () => {
      })
  }

  navTo(url) {
    Taro.navigateTo({
      url: url
    })
  }


  initMusic = (url) => {
    const innerAudioContext = Taro.createInnerAudioContext();
    innerAudioContext.autoplay = true;
    innerAudioContext.src = url;
    innerAudioContext.onPlay(() => {
      console.log('开始播放');
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    })
  }

  changUrl = (songmid) => {
    console.log(songmid)
    let url = `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=${songmid}&filename=C400${songmid}.m4a&guid=126548448`
    ajax(url, '', false, (data) => {
      let vkey = data['data']['items'][0]['vkey'];
      this.setState({
        url: `http://ws.stream.qqmusic.qq.com/C400${songmid}.m4a?fromtag=0&guid=126548448&vkey=${vkey}`
      })
    });


  }

  render() {
    const {result, top, url} = this.state;
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
            {/*{Array.isArray(result['top_stories']) ?*/}
            {/*  <Swiper*/}
            {/*    className='test-h'*/}
            {/*    indicatorColor='#999'*/}
            {/*    indicatorActiveColor='#333'*/}
            {/*    circular*/}
            {/*    indicatorDots*/}
            {/*    autoplay*/}
            {/*    style={{height: `${width}px`}}*/}
            {/*  >*/}
            {/*    {result['top_stories'].map((item) => {*/}
            {/*      return (*/}
            {/*        <SwiperItem key={`${item['id']}`}>*/}
            {/*          <View style={{position: "relative"}}*/}
            {/*            onClick={this.navTo.bind(this, `/pages/zhihu/content?id=${item['id']}`)}*/}
            {/*          >*/}
            {/*            <Image src={item['image']} style={{width: '100%', height: `${width}px`}} mode='aspectFill' />*/}
            {/*            <View style={{*/}
            {/*              position: "absolute",*/}
            {/*              bottom: '24px',*/}
            {/*              left: '0',*/}
            {/*              color: '#fff',*/}
            {/*              textAlign: "justify"*/}
            {/*            }}*/}
            {/*            >{item['title']}</View>*/}
            {/*          </View>*/}
            {/*        </SwiperItem>*/}
            {/*      )*/}
            {/*    })}*/}
            {/*  </Swiper>*/}
            {/*  : null}*/}
            <View style={{padding: '0 5px'}}>
              {result.songlist.map((list, i) => {
                return (
                  <View style={{marginBottom: '10px', display: "flex"}} key={`${list['data']['songmid']}`}
                    onClick={this.changUrl.bind(this, list['data']['songmid'])}
                  >
                    <View style={{width: '45px', textAlign: "center"}}>
                      {i + 1}
                    </View>
                    <View style={{width: 'calc(100% -45px)', paddingLeft: '10px'}}>
                      <View>{list['data']['songname']}</View>
                      <View style={{color: '#777', fontSize: '12px'}}>{list['data']['singer'][0]['name']}</View>
                    </View>
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
              // onClick={this.navTo.bind(this, '/pages/zhihu/hot')}
            >
              {url ? <Audio
                src={url}
                controls
                autoplay={false}
                loop={false}
                muted
                initialTime='30'
                id='video'
              /> : null}
            </View>
            <View style={{width: '50%', lineHeight: '40px', textAlign: "center"}}
              onClick={this.navTo.bind(this, '/pages/zhihu/sections')}
            >栏目</View>
          </View>
        </View>
    )
  }
}
