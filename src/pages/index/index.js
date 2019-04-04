import Taro, {Component} from '@tarojs/taro'
import {View, Text, Button,} from '@tarojs/components'
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
      <View className='index' style={{display: "flex"}}>
        <View style={{width: '25%', textAlign: "center", height: '40px', lineHeight: '40px'}}>
          <Text onClick={this.navTo.bind(this, '/pages/weather/index')}>天气</Text>
        </View>
        <View style={{width: '25%', textAlign: "center", height: '40px', lineHeight: '40px'}}>
          <Text onClick={this.navTo.bind(this, '/pages/tiku/index')}>题库</Text>
        </View>
      </View>
    )
  }
}
