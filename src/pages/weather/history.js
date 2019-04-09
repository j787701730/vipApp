import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {bgJpg} from "./util";

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

  }

  componentDidHide() {
  }

  _navToHome(cid) {
    Taro.setStorageSync('location', cid);
    Taro.navigateBack({delta: 1})
  }


  render() {
    const {citys} = this.state;
    return (
      <View className='index' style={{
        backgroundImage:`url(${bgJpg})`,
        backgroundSize:"cover",
        backgroundPosition:"center",height:`${Taro.getSystemInfoSync().windowHeight}px`,
        fontSize:'14px'}}
      >
        <View>
          {citys.length && citys.map((el) => {
            return (<View key={el.cid} style={{padding: '4px 15px', borderBottom: '1px solid rgba(238,238,238,0.5)'}}
              onClick={this._navToHome.bind(this, el.cid)}
            >
              <Text>{`${el.admin_area} ${el.location}`}</Text></View>)
          })}
        </View>
      </View>
    )
  }
}
