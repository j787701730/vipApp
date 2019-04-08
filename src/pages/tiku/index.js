import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image,} from '@tarojs/components'
import {bgJpg} from "./util";


export default class Index extends Component {

  config = {
    navigationBarTitleText: '驾考题库',
  };

  constructor(props) {
    super(props);
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

  _navTo = (url) => {
    Taro.navigateTo({
      url: url
    })
  };

  render() {
    return <View style={{
      // backgroundImage: `url(${bgJpg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: `${Taro.getSystemInfoSync().windowHeight}px`,
      padding: '10px',
      fontSize:'14px'
    }}
    >
      <View style={{height: '34px',lineHeight:'34px', borderBottom: '1px solid #eee'}}
        onClick={this._navTo.bind(this, '/pages/tiku/kemu1')}
      >科目一</View>
      <View style={{height: '34px',lineHeight:'34px', borderBottom: '1px solid #eee'}}
        onClick={this._navTo.bind(this, '/pages/tiku/kemu4')}
      >科目四</View>
      <View style={{height: '34px',lineHeight:'34px', borderBottom: '1px solid #eee'}}
        onClick={this._navTo.bind(this, '/pages/tiku/category')}
      >题库分类</View>
    </View>
  }
}
