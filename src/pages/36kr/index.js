import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, ScrollView, Swiper, SwiperItem} from '@tarojs/components'
import {ajax, bgJpg,} from "./util";
import {getDateDiff} from '../../utils/common'

const category = [
  {
    cid: 0,
    name: '快讯'
  }, {
    cid: 23,
    name: '大公司'
  }, {
    cid: 67,
    name: '早期项目'
  }, {
    cid: 68,
    name: 'B轮后'
  }, {
    cid: 69,
    name: '资本'
  }, {
    cid: 72,
    name: '其他'
  }, {
    cid: 101,
    name: '政策'
  }, {
    cid: 111,
    name: '产品'
  }, {
    cid: 112,
    name: '产业'
  },
];

export default class Index extends Component {

  config = {
    navigationBarTitleText: '36氪快讯',
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      navScrollLeft: 0,
      articles: {},
      pages: {0: 20}
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    this._getArticle();
  }

  componentWillUnmount() {
  }

  componentDidShow() {

  }

  componentDidHide() {
  }


  _getArticle = () => {
    const {current, articles, pages} = this.state;
    let url = `https://36kr.com/api/newsflash?column_ids=${category[current]['cid']}&per_page=${pages[category[current]['cid']]}`;
    if (current == 0) {
      url = `https://36kr.com/api/newsflash?per_page=${pages[category[current]['cid']]}`;
    }
    ajax(url,
      '', false,
      (data) => {
        if (data.code == 0) {
          let art = articles;
          if (pages[category[current]['cid']] == 20) {
            art[category[current]['cid']] = data.data.items;
          } else {
            for (const list of data.data.items) {
              art[category[current]['cid']].push(list);
            }
          }
          this.setState({
            articles: art,
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
    const {current, pages} = this.state;
    if (current == cur) {
      return false;
    } else {
      let p = pages;
      if (p[category[cur]['cid']]) {
        this.setState({
          current: cur,
        })
      } else {
        p[category[cur]['cid']] = 1;
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
    if (pages[category[cur]['cid']]) {
      this.setState({
        current: cur,
        navScrollLeft: (cur - 2) * 84
      });
    } else {
      pages[category[cur]['cid']] = 20;
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
    const {current, pages} = this.state;
    let p = pages;
    p[category[current]['cid']] = pages[category[current]['cid']] + 20;
    this.setState({
      pages: p
    }, () => {
      this._getArticle()
    })
  }


  render() {
    const { navScrollLeft, current, articles} = this.state;
    let height = Taro.getSystemInfoSync().windowHeight - 40;
    return (<View className='index' style={{
        // backgroundImage: `url(${bgJpg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `${Taro.getSystemInfoSync().windowHeight}px`,
        fontSize: '14px',
      }}
    >
        <ScrollView
          scrollX
          scrollWithAnimation
          scrollLeft={navScrollLeft}
          style='height: 40px;'

        >
          <View style={{whiteSpace: 'nowrap'}}>
            {category.map((el, i) => {
              return (
                <View key={`${el['cid']}`} style={{display: "inline-block", width: '84px', textAlign: "center", lineHeight: '34px'}}
                  onClick={this.switchNav.bind(this, i)}
                >
                  <View style={{
                    lineHeight: '34px',
                    textAlign: "center",
                    fontWeight: "bold",
                    color: i == current ? '#c40000' : '',
                    borderBottom: i == current ? '2px solid #c40000' : '2px solid #fff'
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
          {category.map((el) => {
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
                    return (<View style={{padding: '0 10px 15px',borderBottom:'1px solid #ddd', marginBottom: '6px'}} key={`${list['id']}`}
                      onClick={this.navTo.bind(this, '/pages/36kr/content?url=' + list['news_url'])}
                    >
                      <View style={{textAlign:"justify"}}>{list['title']}</View>
                      <View style={{fontSize:'12px',color:'#aaa',textAlign:"justify"}}>{list['description']}</View>
                      <View style={{fontSize:'12px',color:'#aaa',}}>{getDateDiff(list['created_at'])}</View>
                    </View>)
                  })}</ScrollView>
                  : null
                }
              </SwiperItem>
            )
          })}
        </Swiper>
      </View>
    )
  }
}
