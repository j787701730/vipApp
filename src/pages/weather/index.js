import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, ScrollView} from '@tarojs/components'
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
      top: 0
    }
  }

  componentWillMount() {
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
    Taro.showLoading({
      title: 'loading'
    });
    ajax('https://free-api.heweather.net/s6/weather?location=' + location, '', false, (data) => {
      Taro.hideLoading();
      this.setState(prevState => ({
        weatherData: data['HeWeather6'][0],
        top: prevState.top === 0 ? 0.1 : 0
      }));
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
    const {weatherData, top} = this.state;
    let height = Taro.getSystemInfoSync().windowHeight - 40;
    return (weatherData == null ? <View style={{
          backgroundImage: `url(${bgJpg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: `${Taro.getSystemInfoSync().windowHeight}px`
        }}
    /> :
        <View className='index' style={{
          backgroundImage: `url(${bgJpg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontSize: '14px'
        }}
        >
          <ScrollView
            style={{
              height: `${height}px`,
              boxSizing: "border-box"
            }}
            scrollY
            scrollTop={top}
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
            <ScrollView
              style={{borderBottom: '1px solid rgba(238,238,238,0.5)'}}
              scrollX
            >
              <View style={{wordBreak: "keep-all", whiteSpace: "nowrap"}}>
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
            </ScrollView>
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
            <View style={{
              padding: '5px 15px',
              borderTop: '1px solid rgba(238,238,238,0.5)',
              borderBottom: '1px solid rgba(238,238,238,0.5)',
              textAlign: "justify"
            }}
            >
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
          </ScrollView>
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
