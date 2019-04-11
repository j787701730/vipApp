import Taro, {Component} from '@tarojs/taro'
import {View, Video} from '@tarojs/components'

export default class Index extends Component {
  render() {
    const src = decodeURIComponent(this.$router.params.src);
    const small = decodeURIComponent(this.$router.params.small);
    const title = decodeURIComponent(this.$router.params.title);
    return <View style={{fontSize: '14px'}}>
      <Video
        src={src}
        controls
        autoplay={false}
        poster={small}
        initialTime='0'
        id='video'
        loop={false}
        muted={false}
        style={{width: '100%'}}
      />
      <View style={{padding:'8px 10px'}}>{title}</View>
    </View>
  }
}
