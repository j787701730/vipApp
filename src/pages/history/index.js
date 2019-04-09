import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, Picker, ScrollView} from '@tarojs/components'
import {ajax, bgJpg,} from "./util";

const date = new Date();
const today = `${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' +
  (date.getMonth() + 1)}${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}`;
export default class Index extends Component {

  config = {
    navigationBarTitleText: '历史上的今天',
  };

  constructor(props) {
    super(props);
    this.state = {
      result: null,
      date: today,
      top: 0
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    this._getData();
  }

  componentWillUnmount() {
  }

  componentDidShow() {

  }

  componentDidHide() {
  }

  _getData = () => {
    // this.setState({
    //   result : null
    // });
    Taro.showLoading({
      title: 'loading'
    });
    ajax(`https://apicloud.mob.com/appstore/history/query?day=${this.state.date}`, '', false, (data) => {

      Taro.hideLoading();
      if (data.retCode == 200) {
        this.setState(prevState => ({
          result: data.result,
          top: prevState.top === 0 ? 0.1 : 0
        }));
      }
    });
  };


  navTo(url) {
    Taro.navigateTo({
      url: url
    })
  }

  onDateChange = (e) => {
    let val = e.detail.value.split('-');
    this.setState({
      date: `${val[1]}${val[2]}`
    }, () => {
      this._getData();
    })
  }

  onToday = () => {
    this.setState({
      date: today
    }, () => {
      this._getData()
    })
  }


  render() {
    const {result, top} = this.state;
    let height = Taro.getSystemInfoSync().windowHeight - 40;
    return (result == null
        ? <View style={{
          // backgroundImage: `url(${bgJpg})`,
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          height: `${Taro.getSystemInfoSync().windowHeight}px`
        }}
        />
        : <View className='index' style={{
          // backgroundImage: `url(${bgJpg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: `${Taro.getSystemInfoSync().windowHeight}px`,
          fontSize: '14px',
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
            {result && result.map((el) => {
              return (
                <View key={`${el['id']}`} style={{padding: '0 10px 10px'}}>
                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>{el['title']}</View>
                  <View style={{lineHeight: '18px', textAlign: "right",}}>
                    {`${el['date'].length < 8 ? el['date'].substring(0, 3) : el['date'].substring(0, 4)}年${el['month']}月${el['day']}日`}
                  </View>
                  <View style={{textAlign: "justify"}}><Text>{el.event}</Text></View>
                </View>
              )
            })}
          </ScrollView>
          <View style={{display: "flex", height: '40px', borderTop: '1px solid #ddd', boxShadow: '0 -1px 2px #ddd'}}>
            <View style={{
              width: '50%', lineHeight: '40px', textAlign: "center",
              borderRight: '1px solid #ddd'
            }} onClick={this.onToday}
            >今天</View>
            <View style={{width: '50%', lineHeight: '40px', textAlign: "center"}}>
              <Picker mode='date' onChange={this.onDateChange}>
                <View className='picker'>
                  日期
                </View>
              </Picker>
            </View>
          </View>
        </View>
    )
  }
}
