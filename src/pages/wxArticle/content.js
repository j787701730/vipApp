import Taro, { Component } from '@tarojs/taro'
// 引入 WebView 组件
import { WebView } from '@tarojs/components'

export default class Index extends Component {
  render () {
    return (
      <WebView src={this.$router.params.url}  />
    )
  }
}
