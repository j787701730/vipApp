import Taro, {Component} from '@tarojs/taro'
import {View,} from '@tarojs/components'


export default class CarItem extends Component {

  render() {
    const {data} = this.props;
    return <View>
      {Array.isArray(data)
        ? <View>{
          data.map((x) => {
            return (
              <View key={`x['name']`} style={{display: "flex", fontSize: '12px'}}>
                <View style={{width: '50%', textAlign: "right", paddingRight: '4px'}}>{x['name']}</View>
                <View style={{width: '50%', paddingLeft: '4px'}}>{x['value']}</View>
              </View>
            )
          })
        }</View>
        : <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>无详细数据</View>
      }
    </View>


  }
}
