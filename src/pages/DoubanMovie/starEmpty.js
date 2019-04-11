import Taro, {Component} from '@tarojs/taro'
import {Image, View,} from '@tarojs/components'
import starEmptyPng from '../../images/starEmpty.png'

export default class StarEmpty extends Component {
  render() {
    return <View style={{
      display: "inline-block",
      width: '10px',
      height: '10px',
    }}
    >
      <Image src={starEmptyPng} style={{width: '100%', height: '100%'}} />
    </View>
  }
}
