import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, Picker, ScrollView, Input, Button} from '@tarojs/components'
import {ajax, bgJpg,} from "./util";

export default class Index extends Component {

  config = {
    navigationBarTitleText: '新华字典',
  };

  constructor(props) {
    super(props);
    this.state = {
      result: null,
      name: '',
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
    ajax(`https://apicloud.mob.com/appstore/dictionary/query?name=${this.state.name}`, '', false, (data) => {
      Taro.hideLoading();
      if (data.retCode == 200) {
        this.setState(prevState => ({
          result: data.result,
          top: prevState.top === 0 ? 0.1 : 0
        }));
      } else {
        Taro.showToast(
          {title: data['msg'],icon:'none'}
        )
      }
    });
  };


  navTo(url) {
    Taro.navigateTo({
      url: url
    })
  }

  _input = (e) => {
    console.log(e);
    this.setState({
      name: e.target.value
    })
  }
  _jumpPage = () => {
    this._getData();
  }

  render() {
    const {result, top, neme} = this.state;
    let height = Taro.getSystemInfoSync().windowHeight - 40 - 40;
    return (<View className='index' style={{
        // backgroundImage: `url(${bgJpg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `${Taro.getSystemInfoSync().windowHeight}px`,
        fontSize: '14px',
      }}
      >
        <View style={{
          height: '40px',
          display: "flex"
        }}
        >
          <View style={{display: "flex"}}>
            <Input style={{
              border: '1px solid #ddd', height: '28px', marginLeft: '10px',
              paddingLeft: '10px', paddingRight: '10px', width: '50%'
            }}
                   value={neme} onInput={this._input.bind(this)}
            />
            <Button onClick={this._jumpPage} style={{height: '30px', lineHeight: '28px', fontSize: '14px'}}>跳转</Button>
          </View>
        </View>
        <ScrollView
          style={{
            height: `${height}px`,
            boxSizing: "border-box"
          }}
          scrollY
          scrollTop={top}
        >
          {result ? <View style={{padding: '0 10px 10px'}}>
              <View style={{lineHeight: '34px', fontSize: '30px', textAlign: "center", fontWeight: "bold"}}>{result['name']}</View>
              <View style={{lineHeight: '18px',}}>
                {`${result['pinyin']}`}
              </View>
              <View style={{textAlign: "justify"}}>{result.brief}</View>
              <View style={{textAlign: "justify"}}>{result.detail}</View>
              <View style={{textAlign: "justify"}}>部首：{result.bushou}</View>
              <View style={{textAlign: "justify"}}>五笔：{result.wubi}</View>
              <View style={{textAlign: "justify"}}>笔画数：{result.bihua}</View>
              <View style={{textAlign: "justify"}}>去部首后笔画数：{result.bihuaWithBushou}</View>
            </View>
            : null}
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
