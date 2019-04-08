import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import './index.scss'
import {ajax, bgJpg} from "./util";

const day = {
  0: '周日',
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
};

const style = {
  comf: '舒适度指数',
  cw: '洗车指数',
  drsg: '穿衣指数',
  flu: '感冒指数',
  sport: '运动指数',
  trav: '旅游指数',
  uv: '紫外线指数',
  air: '空气污染扩散条件指数',
  ac: '空调开启指数',
  ag: '过敏指数',
  gl: '太阳镜指数',
  mu: '化妆指数',
  airc: '晾晒指数',
  ptfc: '交通指数',
  fsh: '钓鱼指数',
  spi: '防晒指数'
};

export default class Index extends Component {

  config = {
    navigationBarTitleText: '天气'
  };

  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
    }
  }

  componentWillMount() {
    Taro.getStorage({key: 'weatherData'})
      .then(res => {
        if (res.data) {
          this.setState({
            weatherData: JSON.parse(res.data)
          });
        }
      }).catch(() => {
      Taro.setStorageSync(
        'weatherData',
        JSON.stringify({
          "basic": {
            "cid": "CN101230101",
            "location": "福州",
            "parent_city": "福州",
            "admin_area": "福建",
            "cnty": "中国",
            "lat": "26.07530212",
            "lon": "119.30623627",
            "tz": "+8.00"
          },
          "update": {
            "loc": "2019-04-03 09:55",
            "utc": "2019-04-03 01:55"
          },
          "status": "ok",
          "now": {
            "cloud": "99",
            "cond_code": "104",
            "cond_txt": "阴",
            "fl": "14",
            "hum": "91",
            "pcpn": "0.0",
            "pres": "1022",
            "tmp": "14",
            "vis": "8",
            "wind_deg": "300",
            "wind_dir": "西北风",
            "wind_sc": "1",
            "wind_spd": "4"
          },
          "daily_forecast": [
            {
              "cond_code_d": "305",
              "cond_code_n": "305",
              "cond_txt_d": "小雨",
              "cond_txt_n": "小雨",
              "date": "2019-04-03",
              "hum": "92",
              "mr": "04:48",
              "ms": "16:34",
              "pcpn": "0.0",
              "pop": "25",
              "pres": "993",
              "sr": "05:51",
              "ss": "18:20",
              "tmp_max": "18",
              "tmp_min": "15",
              "uv_index": "2",
              "vis": "19",
              "wind_deg": "65",
              "wind_dir": "东北风",
              "wind_sc": "1-2",
              "wind_spd": "9"
            },
            {
              "cond_code_d": "104",
              "cond_code_n": "305",
              "cond_txt_d": "阴",
              "cond_txt_n": "小雨",
              "date": "2019-04-04",
              "hum": "90",
              "mr": "05:23",
              "ms": "17:26",
              "pcpn": "1.0",
              "pop": "55",
              "pres": "987",
              "sr": "05:49",
              "ss": "18:21",
              "tmp_max": "20",
              "tmp_min": "16",
              "uv_index": "0",
              "vis": "18",
              "wind_deg": "61",
              "wind_dir": "东北风",
              "wind_sc": "1-2",
              "wind_spd": "7"
            },
            {
              "cond_code_d": "101",
              "cond_code_n": "101",
              "cond_txt_d": "多云",
              "cond_txt_n": "多云",
              "date": "2019-04-05",
              "hum": "94",
              "mr": "05:56",
              "ms": "18:18",
              "pcpn": "0.0",
              "pop": "2",
              "pres": "987",
              "sr": "05:48",
              "ss": "18:21",
              "tmp_max": "25",
              "tmp_min": "17",
              "uv_index": "3",
              "vis": "14",
              "wind_deg": "335",
              "wind_dir": "西北风",
              "wind_sc": "3-4",
              "wind_spd": "13"
            },
            {
              "cond_code_d": "104",
              "cond_code_n": "104",
              "cond_txt_d": "阴",
              "cond_txt_n": "阴",
              "date": "2019-04-06",
              "hum": "93",
              "mr": "06:29",
              "ms": "19:12",
              "pcpn": "0.0",
              "pop": "5",
              "pres": "985",
              "sr": "05:47",
              "ss": "18:22",
              "tmp_max": "24",
              "tmp_min": "18",
              "uv_index": "2",
              "vis": "21",
              "wind_deg": "100",
              "wind_dir": "东风",
              "wind_sc": "1-2",
              "wind_spd": "3"
            },
            {
              "cond_code_d": "101",
              "cond_code_n": "101",
              "cond_txt_d": "多云",
              "cond_txt_n": "多云",
              "date": "2019-04-07",
              "hum": "87",
              "mr": "07:04",
              "ms": "20:06",
              "pcpn": "0.0",
              "pop": "0",
              "pres": "984",
              "sr": "05:46",
              "ss": "18:22",
              "tmp_max": "30",
              "tmp_min": "18",
              "uv_index": "10",
              "vis": "24",
              "wind_deg": "235",
              "wind_dir": "西南风",
              "wind_sc": "1-2",
              "wind_spd": "4"
            },
            {
              "cond_code_d": "101",
              "cond_code_n": "104",
              "cond_txt_d": "多云",
              "cond_txt_n": "阴",
              "date": "2019-04-08",
              "hum": "89",
              "mr": "07:42",
              "ms": "21:03",
              "pcpn": "1.0",
              "pop": "55",
              "pres": "986",
              "sr": "05:45",
              "ss": "18:23",
              "tmp_max": "27",
              "tmp_min": "18",
              "uv_index": "4",
              "vis": "16",
              "wind_deg": "106",
              "wind_dir": "东南风",
              "wind_sc": "1-2",
              "wind_spd": "1"
            },
            {
              "cond_code_d": "305",
              "cond_code_n": "306",
              "cond_txt_d": "小雨",
              "cond_txt_n": "中雨",
              "date": "2019-04-09",
              "hum": "93",
              "mr": "08:23",
              "ms": "22:01",
              "pcpn": "0.0",
              "pop": "25",
              "pres": "984",
              "sr": "05:44",
              "ss": "18:23",
              "tmp_max": "27",
              "tmp_min": "19",
              "uv_index": "3",
              "vis": "13",
              "wind_deg": "174",
              "wind_dir": "南风",
              "wind_sc": "3-4",
              "wind_spd": "12"
            }
          ],
          "hourly": [
            {
              "cloud": "97",
              "cond_code": "305",
              "cond_txt": "小雨",
              "dew": "12",
              "hum": "83",
              "pop": "25",
              "pres": "996",
              "time": "2019-04-03 13:00",
              "tmp": "18",
              "wind_deg": "61",
              "wind_dir": "东北风",
              "wind_sc": "1-2",
              "wind_spd": "8"
            },
            {
              "cloud": "98",
              "cond_code": "305",
              "cond_txt": "小雨",
              "dew": "12",
              "hum": "82",
              "pop": "20",
              "pres": "994",
              "time": "2019-04-03 16:00",
              "tmp": "17",
              "wind_deg": "77",
              "wind_dir": "东北风",
              "wind_sc": "1-2",
              "wind_spd": "3"
            },
            {
              "cloud": "99",
              "cond_code": "305",
              "cond_txt": "小雨",
              "dew": "10",
              "hum": "84",
              "pop": "51",
              "pres": "992",
              "time": "2019-04-03 19:00",
              "tmp": "16",
              "wind_deg": "35",
              "wind_dir": "东北风",
              "wind_sc": "1-2",
              "wind_spd": "6"
            },
            {
              "cloud": "100",
              "cond_code": "305",
              "cond_txt": "小雨",
              "dew": "9",
              "hum": "88",
              "pop": "55",
              "pres": "993",
              "time": "2019-04-03 22:00",
              "tmp": "15",
              "wind_deg": "358",
              "wind_dir": "北风",
              "wind_sc": "1-2",
              "wind_spd": "9"
            },
            {
              "cloud": "99",
              "cond_code": "305",
              "cond_txt": "小雨",
              "dew": "9",
              "hum": "90",
              "pop": "20",
              "pres": "994",
              "time": "2019-04-04 01:00",
              "tmp": "15",
              "wind_deg": "357",
              "wind_dir": "北风",
              "wind_sc": "1-2",
              "wind_spd": "3"
            },
            {
              "cloud": "99",
              "cond_code": "104",
              "cond_txt": "阴",
              "dew": "10",
              "hum": "91",
              "pop": "20",
              "pres": "995",
              "time": "2019-04-04 04:00",
              "tmp": "15",
              "wind_deg": "353",
              "wind_dir": "北风",
              "wind_sc": "1-2",
              "wind_spd": "3"
            },
            {
              "cloud": "100",
              "cond_code": "104",
              "cond_txt": "阴",
              "dew": "11",
              "hum": "89",
              "pop": "7",
              "pres": "993",
              "time": "2019-04-04 07:00",
              "tmp": "15",
              "wind_deg": "10",
              "wind_dir": "北风",
              "wind_sc": "1-2",
              "wind_spd": "5"
            },
            {
              "cloud": "100",
              "cond_code": "104",
              "cond_txt": "阴",
              "dew": "12",
              "hum": "84",
              "pop": "7",
              "pres": "990",
              "time": "2019-04-04 10:00",
              "tmp": "15",
              "wind_deg": "25",
              "wind_dir": "东北风",
              "wind_sc": "1-2",
              "wind_spd": "6"
            }
          ],
          "lifestyle": [
            {
              "type": "comf",
              "brf": "舒适",
              "txt": "白天不太热也不太冷，风力不大，相信您在这样的天气条件下，应会感到比较清爽和舒适。"
            },
            {
              "type": "drsg",
              "brf": "较冷",
              "txt": "建议着厚外套加毛衣等服装。年老体弱者宜着大衣、呢外套加羊毛衫。"
            },
            {
              "type": "flu",
              "brf": "易发",
              "txt": "天冷空气湿度大，易发生感冒，请注意适当增加衣服，加强自我防护避免感冒。"
            },
            {
              "type": "sport",
              "brf": "较不宜",
              "txt": "有降水，推荐您在室内进行健身休闲运动；若坚持户外运动，须注意携带雨具并注意避雨防滑。"
            },
            {
              "type": "trav",
              "brf": "适宜",
              "txt": "温度适宜，又有较弱降水和微风作伴，会给您的旅行带来意想不到的景象，适宜旅游，可不要错过机会呦！"
            },
            {
              "type": "uv",
              "brf": "最弱",
              "txt": "属弱紫外线辐射天气，无需特别防护。若长期在户外，建议涂擦SPF在8-12之间的防晒护肤品。"
            },
            {
              "type": "cw",
              "brf": "不宜",
              "txt": "不宜洗车，未来24小时内有雨，如果在此期间洗车，雨水和路上的泥水可能会再次弄脏您的爱车。"
            },
            {
              "type": "air",
              "brf": "良",
              "txt": "气象条件有利于空气污染物稀释、扩散和清除，可在室外正常活动。"
            }
          ]
        })
      )
    });
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  componentDidShow() {
    this._getData();
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
      weatherData:null
    });
    Taro.showLoading({
      title: 'loading'
    });
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
    let height = Taro.getSystemInfoSync().windowHeight - 40;
    return (weatherData == null ? <View  style={{
          backgroundImage:`url(${bgJpg})`,
          backgroundSize:"cover",
          backgroundPosition:"center",
          height:`${Taro.getSystemInfoSync().windowHeight}px`}}
    /> :
        <View className='index' style={{
          backgroundImage:`url(${bgJpg})`,
          backgroundSize:"cover",
          backgroundPosition:"center"}}
        >
          <View style={{height: `${height}px`, overflow: "auto", '-webkit-overflow-scrolling': 'touch',
            }}
          >
            <View style={{textAlign: 'center'}}>
              <Text style={{fontSize: '30px'}} onClick={this._navToCitys}>{weatherData['basic']['location']}</Text>
            </View>
            <View style={{textAlign: 'center'}}>
              <Text>{weatherData['now']['cond_txt']}</Text>
            </View>
            <View style={{textAlign: 'center'}}>
              <Text style={{fontSize: '50px'}}>{`${weatherData['now']['tmp']}℃`}</Text>
            </View>
            <View style={{display: 'flex', borderBottom: '1px solid rgba(238,238,238,0.5)'}}>
              <View style={{width: '50%', paddingLeft: '15px'}}>
                <Text>{weatherData ? `${day[(new Date(weatherData['daily_forecast'][0]['date']).getDay())]} 今天` : ''}</Text>

              </View>
              <View style={{width: '50%', textAlign: 'right', paddingRight: '15px'}}>
                <Text>{`${weatherData['daily_forecast'][0]['tmp_max']}    ${weatherData['daily_forecast'][0]['tmp_min']}`}</Text>
              </View>
            </View>
            <View style={{width: '100%', overflow: "hidden", borderBottom: '1px solid rgba(238,238,238,0.5)'}}>
              <View style={{wordBreak: "keep-all", whiteSpace: "nowrap", overflowX: "scroll", '-webkit-overflow-scrolling': 'touch'}}>
                {weatherData['hourly'].map((el) => {
                  return (
                    <View style={{display: "inline-block", textAlign: "center", verticalAlign: "top"}} key={el.time}>
                      <View style={{padding: '6px 15px 0 15px'}}>
                        {`${(el.time.substring(11, 13)).replace(/\b(0+)/gi, "")}时`}
                      </View>
                      <View style={{fontSize: '12px'}}>{el.pop == 0 ? '　' : el.pop + '%'}</View>
                      <View><Image style={{width: '20px', height: '20px'}}
                        src={`https://cdn.heweather.com/cond_icon/${el['cond_code']}.png`}
                      /></View>
                      <View style={{paddingBottom: '6px'}}>{`${el.tmp}℃`}</View>
                    </View>
                  );
                })}
              </View>
            </View>
            <View>
              {weatherData['daily_forecast'] && weatherData['daily_forecast'].map((el, i) => {
                return (i == 0 ? <View></View> : <View style={{display: "flex", alignItems: "center",}}>
                    <View style={{paddingLeft: '15px', width: '40%',}} key={el.date}>
                      {`${day[(new Date(el['date']).getDay())]}`}
                    </View>
                    <View style={{width: '20%', textAlign: "center"}}>
                      <Image style={{width: '30px', height: '30px'}} src={`https://cdn.heweather.com/cond_icon/${el['cond_code_d']}.png`} />
                    </View>
                    <View style={{paddingRight: '15px', width: '40%', textAlign: "right"}}>{`${el.tmp_max} ${el.tmp_min}`}</View>
                  </View>
                );
              })}
            </View>
            <View style={{padding: '5px 15px', borderTop: '1px solid rgba(238,238,238,0.5)', borderBottom: '1px solid rgba(238,238,238,0.5)', textAlign: "justify"}}>
              {`今天：今日${weatherData['now']['cond_txt']}。
          当前气温 ${weatherData['now']['tmp']}℃；
          最高气温 ${weatherData['daily_forecast'][0]['tmp_max']}℃，
          最低气温 ${weatherData['daily_forecast'][0]['tmp_min']}℃。`}
            </View>

            <View style={{borderBottom: '1px solid rgba(238,238,238,0.5)', padding: '6px 0'}}>
              <View style={{display: "flex"}}>
                <View style={{width: '50%', textAlign: "right"}}>日出</View>
                <View style={{width: '50%', paddingLeft: '10px'}}>{`${weatherData['daily_forecast'][0]['sr']}`}</View>
              </View>
              <View style={{display: "flex", marginBottom: '8px'}}>
                <View style={{width: '50%', textAlign: "right"}}>日落</View>
                <View style={{width: '50%', paddingLeft: '10px'}}>{`${weatherData['daily_forecast'][0]['ss']}`}</View>
              </View>

              <View style={{display: "flex"}}>
                <View style={{width: '50%', textAlign: "right"}}>月升</View>
                <View style={{width: '50%', paddingLeft: '10px'}}>{`${weatherData['daily_forecast'][0]['mr']}`}</View>
              </View>
              <View style={{display: "flex", marginBottom: '8px'}}>
                <View style={{width: '50%', textAlign: "right"}}>月落</View>
                <View style={{width: '50%', paddingLeft: '10px'}}>{`${weatherData['daily_forecast'][0]['ms']}`}</View>
              </View>

              <View style={{display: "flex"}}>
                <View style={{width: '50%', textAlign: "right"}}>降水概率</View>
                <View style={{width: '50%', paddingLeft: '10px'}}>{`${weatherData['daily_forecast'][0]['pop']}%`}</View>
              </View>
              <View style={{display: "flex"}}>
                <View style={{width: '50%', textAlign: "right", marginBottom: '8px'}}>相对湿度</View>
                <View style={{width: '50%', paddingLeft: '10px'}}>{`${weatherData['daily_forecast'][0]['hum']}%`}</View>
              </View>

              <View style={{display: "flex"}}>
                <View style={{width: '50%', textAlign: "right"}}>风向360角度</View>
                <View style={{width: '50%', paddingLeft: '10px'}}>{`${weatherData['daily_forecast'][0]['wind_deg']}°`}</View>
              </View>
              <View style={{display: "flex"}}>
                <View style={{width: '50%', textAlign: "right", marginBottom: '8px'}}>风向</View>
                <View style={{width: '50%', paddingLeft: '10px'}}>{`${weatherData['daily_forecast'][0]['wind_dir']}`}</View>
              </View>
              <View style={{display: "flex"}}>
                <View style={{width: '50%', textAlign: "right"}}>风力</View>
                <View style={{width: '50%', paddingLeft: '10px'}}>{`${weatherData['daily_forecast'][0]['wind_sc']}米/秒`}</View>
              </View>
              <View style={{display: "flex"}}>
                <View style={{width: '50%', textAlign: "right", marginBottom: '8px'}}>风速</View>
                <View style={{width: '50%', paddingLeft: '10px'}}>{`${weatherData['daily_forecast'][0]['wind_spd']}公里/小时`}</View>
              </View>
              <View style={{display: "flex"}}>
                <View style={{width: '50%', textAlign: "right"}}>降水量</View>
                <View style={{width: '50%', paddingLeft: '10px'}}>{`${weatherData['daily_forecast'][0]['pcpn']}毫米`}</View>
              </View>
              <View style={{display: "flex"}}>
                <View style={{width: '50%', textAlign: "right", marginBottom: '8px'}}>大气压强</View>
                <View style={{width: '50%', paddingLeft: '10px'}}>{`${weatherData['daily_forecast'][0]['pres']}百帕`}</View>
              </View>
              <View style={{display: "flex"}}>
                <View style={{width: '50%', textAlign: "right"}}>紫外线强度指数</View>
                <View style={{width: '50%', paddingLeft: '10px'}}>{`${weatherData['daily_forecast'][0]['uv_index']}`}</View>
              </View>
              <View style={{display: "flex"}}>
                <View style={{width: '50%', textAlign: "right"}}>能见度</View>
                <View style={{width: '50%', paddingLeft: '10px'}}>{`${weatherData['daily_forecast'][0]['vis']}公里`}</View>
              </View>
            </View>
            <View style={{marginBottom: '10px'}}>
              {weatherData['lifestyle'].map((el) => {
                return (<View style={{padding: '10px 15px 0'}} key={el.type}>
                  <View>{`${style[el.type]}：${el.brf}`}</View>
                  <View style={{fontSize: '14px', color: '#666', textAlign: "justify"}}>{`${el.txt}`}</View>
                </View>)
              })}
            </View>
          </View>
          <View style={{display: "flex", height: '40px', borderTop: '1px solid #ddd', boxShadow: '0 -1px 2px #ddd'}}>
            <View style={{width: '33.3333%', textAlign: "center", lineHeight: '40px'}}
              onClick={this._getData}
            >
              <Text>
                刷新
              </Text>
            </View>
            <View style={{width: '33.3333%', textAlign: "center", lineHeight: '40px'}}
              onClick={this._navToCitys}
            >
              <Text>
                城市
              </Text>
            </View>
            <View style={{width: '33.3333%', textAlign: "center", lineHeight: '40px'}}
              onClick={this._navToHistory}
            >
              <Text>
                历史
              </Text>
            </View>
          </View>
        </View>
    )
  }
}
