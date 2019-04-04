import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import {ajax, bgJpg} from "./util";

export default class Index extends Component {

  config = {
    navigationBarTitleText: '驾考题库'
  };

  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
    }
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  componentDidShow() {
    // this._getData();
  }

  componentDidHide() {
  }

  _getData = () => {
    let location = Taro.getStorageSync('location');
    if (!location) {
      Taro.setStorageSync('location', 'CN101230101');
      location = 'CN101230101';
    }
    this.setState({
      weatherData: null
    });
    Taro.showLoading();
    ajax('https://free-api.heweather.net/s6/weather?location=' + location, '', false, (data) => {
      Taro.hideLoading();
      this.setState({
        weatherData: data['HeWeather6'][0]
      });
    });
  };

  _navToCitys = () => {
    Taro.navigateTo({
      url: '/pages/weather/citys'
    })
  };

  _navToHistory = () => {
    Taro.navigateTo({
      url: '/pages/weather/history'
    })
  };

  render() {
    const {weatherData} = this.state;
    // let height = Taro.getSystemInfoSync().windowHeight - 40;
    return (weatherData == null ? <View style={{
          // backgroundImage: `url(${bgJpg})`,
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          height: `${Taro.getSystemInfoSync().windowHeight}px`
        }}
        /> :
        <View className='index' style={{
          backgroundImage: `url(${bgJpg})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        >

        </View>
    )
  }
}
