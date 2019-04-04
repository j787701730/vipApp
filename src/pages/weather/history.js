import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'

import './index.scss'


export default class History extends Component {

  config = {
    navigationBarTitleText: '历史'
  };

  constructor(props) {
    let history = JSON.parse(Taro.getStorageSync('history'));
    super(props);
    this.state = {
      citys: history
    }
  }

  componentWillMount() {
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  componentDidShow() {
    console.log(this.state.citys);
  }

  componentDidHide() {
  }

  _navToHome(location) {
    Taro.setStorageSync('location', location);
    Taro.navigateBack({delta: 1})
  }


  render() {
    const {citys} = this.state;
    return (
      <View className='index'>
        <View>
          {citys.length && citys.map((el) => {
            return (<View key={el.cid} style={{padding: '4px 15px', borderBottom: '1px solid #eee'}}
              onClick={this._navToHome.bind(this, el.location)}
            >
              <Text>{`${el.admin_area} ${el.location}`}</Text></View>)
          })}
        </View>
      </View>
    )
  }
}
