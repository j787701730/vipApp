import Taro, {Component} from '@tarojs/taro'
import {View, Text, Input, Button, Icon} from '@tarojs/components'

import './index.scss'
import {ajax, bgJpg} from "./util";

const hotCitys = [
  {
    "cid": "CN101010100",
    "location": "北京",
    "parent_city": "北京",
    "admin_area": "北京",
    "cnty": "中国",
    "lat": "39.90498734",
    "lon": "116.4052887",
    "tz": "+8.00",
    "type": "city"
  },
  {
    "cid": "CN101020100",
    "location": "上海",
    "parent_city": "上海",
    "admin_area": "上海",
    "cnty": "中国",
    "lat": "31.23170662",
    "lon": "121.47264099",
    "tz": "+8.00",
    "type": "city"
  },
  {
    "cid": "CN101210701",
    "location": "温州",
    "parent_city": "温州",
    "admin_area": "浙江",
    "cnty": "中国",
    "lat": "28.00057411",
    "lon": "120.67211151",
    "tz": "+8.00",
    "type": "city"
  },
  {
    "cid": "CN101280101",
    "location": "广州",
    "parent_city": "广州",
    "admin_area": "广东",
    "cnty": "中国",
    "lat": "23.12517738",
    "lon": "113.28063965",
    "tz": "+8.00",
    "type": "city"
  },
  {
    "cid": "CN101280601",
    "location": "深圳",
    "parent_city": "深圳",
    "admin_area": "广东",
    "cnty": "中国",
    "lat": "22.54700089",
    "lon": "114.08594513",
    "tz": "+8.00",
    "type": "city"
  },
  {
    "cid": "CN101020900",
    "location": "松江",
    "parent_city": "上海",
    "admin_area": "上海",
    "cnty": "中国",
    "lat": "31.03046989",
    "lon": "121.22354126",
    "tz": "+8.00",
    "type": "city"
  },
  {
    "cid": "CN101210101",
    "location": "杭州",
    "parent_city": "杭州",
    "admin_area": "浙江",
    "cnty": "中国",
    "lat": "30.28745842",
    "lon": "120.15357971",
    "tz": "+8.00",
    "type": "city"
  },
  {
    "cid": "CN101190101",
    "location": "南京",
    "parent_city": "南京",
    "admin_area": "江苏",
    "cnty": "中国",
    "lat": "32.04154587",
    "lon": "118.76741028",
    "tz": "+8.00",
    "type": "city"
  },
  {
    "cid": "CN101200101",
    "location": "武汉",
    "parent_city": "武汉",
    "admin_area": "湖北",
    "cnty": "中国",
    "lat": "30.5843544",
    "lon": "114.29856873",
    "tz": "+8.00",
    "type": "city"
  },
  {
    "cid": "CN101270101",
    "location": "成都",
    "parent_city": "成都",
    "admin_area": "四川",
    "cnty": "中国",
    "lat": "30.65946198",
    "lon": "104.06573486",
    "tz": "+8.00",
    "type": "city"
  },
  {
    "cid": "CN101230101",
    "location": "福州",
    "parent_city": "福州",
    "admin_area": "福建",
    "cnty": "中国",
    "lat": "26.07530212",
    "lon": "119.30623627",
    "tz": "+8.00",
    "type": "city"
  },
  {
    "cid": "CN101230201",
    "location": "厦门",
    "parent_city": "厦门",
    "admin_area": "福建",
    "cnty": "中国",
    "lat": "24.4904747",
    "lon": "118.11022186",
    "tz": "+8.00",
    "type": "city"
  }
];
let keyflag = '';
export default class Index extends Component {

  config = {
    navigationBarTitleText: '城市搜索'
  };

  constructor(props) {
    super(props);
    this.state = {
      location: '',
      citys: null
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

  _navToHome(el) {
    // Taro.redirectTo({
    //   url: '/pages/weather/index?location=' + location
    // })
    Taro.setStorageSync('location', el.cid);
    let history = JSON.parse(Taro.getStorageSync('history'));
    if (history.length === 0) {
      history.push(el);
      Taro.setStorageSync('history', JSON.stringify(history));
    } else {
      let arr = [el];
      for (const o of history) {
        if (el.cid !== o.cid) {
          arr.push(o)
        }
      }
      Taro.setStorageSync('history', JSON.stringify(arr));
    }
    Taro.navigateBack({delta: 1})
  }


  _searchCity = () => {
    ajax(`https://search.heweather.net/find?group=cn&location=${this.state.location}`, '', false,
      (data) => {
        if (data['HeWeather6'][0]['status'] === 'ok') {
          this.setState({
            citys: data['HeWeather6'][0]['basic']
          })
        }
      })
  }

  _input = (el) => {
    keyflag = el.timeStamp;
    let ths = this;
    setTimeout(function () {
      if (keyflag - el.timeStamp == 0) {
        if (!!el.target.value) {
          ths.setState({
            location: el.target.value
          }, function () {
            ths._searchCity();
          })
        }
      }
    }, 500);
  }

  render() {
    const {citys} = this.state;
    return (
      <View className='index' style={{
        backgroundImage: `url(${bgJpg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontSize: '14px',
        height: `${Taro.getSystemInfoSync().windowHeight}px`
      }}
      >
        <View style={{padding: '10px', display: "flex", alignItems: "center"}}>
          <Input type='text' placeholder='将会获取焦点' style={{
            border: '1px solid #ddd', width: 'calc(100% - 36px)',
            height: '28px', paddingLeft: '10px', paddingRight: '10px'
          }}
            onInput={this._input}
          />
          <Button size='mini' style={{padding: '5px', height: '30px', width: '30px'}}
            onClick={this._searchCity}
          >
            <Icon size='20' type='search' /></Button>
        </View>
        <View style={{display: "flex", flexWrap: "wrap"}}>
          {hotCitys.map((el) => {
            return (<View key={el.cid} style={{width: '25%', textAlign: "center",}} onClick={
              this._navToHome.bind(this, el)
            }
            ><Text>{el.location}</Text></View>)
          })}
        </View>
        <View>
          {citys != null && citys.map((el) => {
            return (<View key={el.cid} style={{padding: '4px 15px', borderBottom: '1px solid rgba(238,238,238,0.5)'}}><Text onClick={
              this._navToHome.bind(this, el)
            }
            >{`${el.admin_area} ${el.location}`}</Text></View>)
          })}
        </View>
      </View>
    )
  }
}
