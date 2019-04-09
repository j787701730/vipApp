import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, ScrollView, Swiper, SwiperItem} from '@tarojs/components'
import {ajax, bgJpg,} from "./util";


export default class Index extends Component {

  config = {
    navigationBarTitleText: '微信精选',
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      navScrollLeft: 0,
      articles: {},
      pages: {}
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    this._getData();
  }

  componentWillUnmount() {
  }

  componentDidShow() {

  }

  componentDidHide() {
  }

  _getData = () => {
    // this.setState({
    //   result : null
    // });
    Taro.showLoading({
      title: 'loading'
    });
    ajax(`https://apicloud.mob.com/wx/article/category/query?`, '', false, (data) => {
      Taro.hideLoading();
      if (data.retCode == 200) {
        this.setState({
          result: data.result,
        }, () => {
          let pages = this.state.pages;
          pages[this.state.result[this.state.current]['cid']] = 1;
          this.setState({
            pages: pages
          }, () => {
            this._getArticle();
          })
        });
      }
    });
  };

  _getArticle = () => {
    const {current, result, articles, pages} = this.state;
    ajax(`https://apicloud.mob.com/wx/article/search?cid=${result[current]['cid']}&page=${pages[result[current]['cid']]}&size=20`,
      '', false,
      (data) => {
        if (data.retCode == 200) {
          let art = articles;
          if (pages[result[current]['cid']] == 1) {
            art[result[current]['cid']] = data.result.list;
          } else {
            for (const list of data.result.list) {
              art[result[current]['cid']].push(list);
            }
          }
          this.setState({
            articles: art,
          }, () => {
            console.log(this.state.articles);
          });
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

  switchNav = (cur) => {
    // var cur = event.currentTarget.dataset.current;
    const {current, result, pages} = this.state;
    if (current == cur) {
      return false;
    } else {
      console.log(cur);
      let p = pages;
      if (p[result[cur]['cid']]) {
        this.setState({
          current: cur,
        })
      } else {
        p[result[cur]['cid']] = 1;
        this.setState({
          current: cur,
          pages: p
        }, () => {
          this._getArticle()
        })
      }
    }
  }

  // 滚动切换标签样式
  swiperChange = (e) => {
    let cur = e.detail.current;
    let pages = this.state.pages;
    if (pages[this.state.result[cur]['cid']]) {
      this.setState({
        current: cur,
        navScrollLeft: (cur - 2) * 84
      });
    } else {
      pages[this.state.result[cur]['cid']] = 1;
      this.setState({
        current: cur,
        navScrollLeft: (cur - 2) * 84,
        pages: pages
      }, () => {
        this._getArticle()
      });
    }
  }

  ScrollToLower = () => {
    const {current, result, pages} = this.state;
    let p = pages;
    p[result[current]['cid']] = pages[result[current]['cid']] + 1;
    this.setState({
      pages: p
    }, () => {
      this._getArticle()
    })
  }


  render() {
    const {result, navScrollLeft, current, articles} = this.state;
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
          fontSize: '14px',
        }}
        >
          {/*<View style={{*/}
          {/*  height: `${height}px`, overflow: "auto", '-webkit-overflow-scrolling': 'touch', padding: '10px'*/}
          {/*}}*/}
          {/*>*/}
          <ScrollView
            scrollX
            scrollWithAnimation
            scrollLeft={navScrollLeft}
            style='height: 40px;'

          >
            <View style={{whiteSpace: 'nowrap'}}>
              {result && result.map((el, i) => {
                return (
                  <View key={`${el['cid']}`} style={{display: "inline-block", width: '84px', textAlign: "center", lineHeight: '34px'}}
                    onClick={this.switchNav.bind(this, i)}
                  >
                    <View style={{
                      lineHeight: '34px',
                      textAlign: "center",
                      fontWeight: "bold",
                      color: i == this.state.current ? '#c40000' : '',
                      borderBottom: i == this.state.current ? '2px solid #c40000' : '2px solid #fff'
                    }}
                    >{el['name']}</View>
                  </View>
                )
              })}
            </View>
          </ScrollView>
          <Swiper
            circular
            indicatorDots={false}
            onChange={this.swiperChange.bind(this)}
            style={{height: `${height}px`}}
            current={current}
          >
            {result && result.map((el) => {
              return (
                <SwiperItem key={`${el['cid']}`} style={{display: "inline-block", boxSizing: "border-box"}}>
                  {articles[el['cid']]
                    ? <ScrollView
                      scrollY
                      style={{
                        height: `${height}px`,
                        boxSizing: "border-box"
                      }}
                      onScrollToLower={this.ScrollToLower.bind(this)}
                    >{articles[el['cid']].map((list) => {
                      return (<View style={{display: "flex", padding: '0 10px', marginBottom: '6px'}} key={`${list['id']}`}
                        onClick={this.navTo.bind(this,'/pages/wxArticle/content?url='+list['sourceUrl'])}
                      >
                        <View style={{width: '100px', height: '100px'}}>
                          <Image src={list['thumbnails']} mode='aspectFill' style={{width: '100px', height: '100px'}} />
                        </View>
                        <View style={{width: 'calc(100% - 100px)', paddingLeft: '10px', textAlign: "justify"}}>
                          <View>{list['title']}</View>
                        </View>
                      </View>)
                    })}</ScrollView>
                    : null
                  }
                </SwiperItem>
              )
            })}
          </Swiper>

          {/*</View>*/}
          {/*  <View style={{display: "flex", height: '40px', borderTop: '1px solid #ddd', boxShadow: '0 -1px 2px #ddd'}}>*/}
          {/*    <View style={{*/}
          {/*      width: '50%', lineHeight: '40px', textAlign: "center",*/}
          {/*      borderRight: '1px solid #ddd'*/}
          {/*    }}*/}
          {/*    >上一题</View>*/}
          {/*    <View style={{width: '50%', lineHeight: '40px', textAlign: "center"}} >下一题</View>*/}
          {/*  </View>*/}
        </View>
    )
  }
}
