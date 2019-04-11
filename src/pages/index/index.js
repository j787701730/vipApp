import Taro, {Component} from '@tarojs/taro'
import {View, Text,} from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() {

  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {

  }

  componentDidHide() {
  }

  navTo(url) {
    Taro.navigateTo({
      url: url
    })
  }

  render() {

    return (
      <View className='index' style={{display: "flex", fontSize: '14px',flexWrap:"wrap"}}>
        <View style={{width: '25%', textAlign: "center", height: '40px', lineHeight: '40px'}}
          onClick={this.navTo.bind(this, '/pages/weather/index')}
        >
          <Text>天气</Text>
        </View>
        <View style={{width: '25%', textAlign: "center", height: '40px', lineHeight: '40px'}}
          onClick={this.navTo.bind(this, '/pages/tiku/index')}
        >
          <Text>题库</Text>
        </View>
        <View style={{width: '25%', textAlign: "center", height: '40px', lineHeight: '40px'}}
          onClick={this.navTo.bind(this, '/pages/cook/index')}
        >
          <Text>菜谱</Text>
        </View>
        <View style={{width: '25%', textAlign: "center", height: '40px', lineHeight: '40px'}}
          onClick={this.navTo.bind(this, '/pages/wxArticle/index')}
        >
          <Text>微信精选</Text>
        </View>
        <View style={{width: '25%', textAlign: "center", height: '40px', lineHeight: '40px'}}
          onClick={this.navTo.bind(this, '/pages/history/index')}
        >
          <Text>历史今天</Text>
        </View>
        <View style={{width: '25%', textAlign: "center", height: '40px', lineHeight: '40px'}}
          onClick={this.navTo.bind(this, '/pages/car/index')}
        >
          <Text>汽车信息</Text>
        </View>
        <View style={{width: '25%', textAlign: "center", height: '40px', lineHeight: '40px'}}
          onClick={this.navTo.bind(this, '/pages/xinHuaDictionary/index')}
        >
          <Text>新华字典</Text>
        </View>
        <View style={{width: '25%', textAlign: "center", height: '40px', lineHeight: '40px'}}
          onClick={this.navTo.bind(this, '/pages/DoubanMovie/index')}
        >
          <Text>豆瓣电影</Text>
        </View>
        <View style={{width: '25%', textAlign: "center", height: '40px', lineHeight: '40px'}}
          onClick={this.navTo.bind(this, '/pages/36kr/index')}
        >
          <Text>36氪快讯</Text>
        </View>
      </View>
    )
  }
}
