import Taro, {Component} from '@tarojs/taro'
import {View,Image} from '@tarojs/components'
import starFullPng from '../../images/starFull.png'

export default class StarFull extends Component {
  render() {
    return <View style={{
      display: "inline-block",
      width: '10px',
      height: '10px',
    }}
    >
      <Image src={starFullPng} style={{width:'100%',height:'100%'}} />
    </View>


  }
}
