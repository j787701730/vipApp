import Taro, {Component} from '@tarojs/taro'
import {View,} from '@tarojs/components'
import StarFull from './starFull'
import StarEmpty from './starEmpty'

export default class Stars extends Component {
  
  render() {
    const {stars} = this.props;
    return <View style={{display:"inline-block"}}>
      {
        stars > 3 ? (
          stars >= 4 ? (
            stars === 5 ? (
              <View style={{display: "flex"}}>
                <StarFull /><StarFull /><StarFull /><StarFull /><StarFull />
              </View>
            ) : (
              <View style={{display: "flex"}}>
                <StarFull /><StarFull /><StarFull /><StarFull /><StarEmpty />
              </View>
            )
          ) : (
            <View style={{display: "flex"}}>
              <StarFull /><StarFull /><StarFull /><StarEmpty /><StarEmpty />
            </View>
          )
        ) : (
          stars >= 2 ? (
            <View style={{display: "flex"}}>
              <StarFull /><StarFull /><StarEmpty /><StarEmpty /><StarEmpty />
            </View>
          ) : (
            stars >= 1 ? (
              <View style={{display: "flex"}}>
                <StarFull /><StarEmpty /><StarEmpty /><StarEmpty /><StarEmpty />
              </View>
            ) : (
              <View style={{display: "flex"}}>
                <StarEmpty /><StarEmpty /><StarEmpty /><StarEmpty /><StarEmpty />
              </View>
            )
          )
        )
      }
    </View>


  }
}
