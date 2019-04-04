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

  navTo() {
    Taro.navigateTo({
      url: '/pages/weather/index'
    })
  }

  render() {
    return (
      <View className='index' style={{display: "flex"}}>
        <View style={{width: '25%', textAlign: "center", height: '40px', lineHeight: '40px'}}>
          <Text onClick={this.navTo}>天气</Text>
        </View>
      </View>
    )
  }
}
