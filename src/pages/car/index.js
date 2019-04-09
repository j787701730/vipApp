import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, ScrollView} from '@tarojs/components'
import {ajax, bgJpg,} from "./util";


export default class Index extends Component {

  config = {
    navigationBarTitleText: '汽车信息',
  };

  constructor(props) {
    super(props);
    this.state = {
      result: null,
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
    ajax(`https://apicloud.mob.com/car/brand/query?`, '', false, (data) => {

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
                <View key={`${el['name']}`} style={{padding: '0 10px 10px'}}>
                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>{el['name']}</View>
                  <View style={{display: "flex", flexWrap: "wrap"}}>{el.son.map((item) => {
                    const url = `/pages/car/series?name=${encodeURIComponent(item['type'])}`;
                    return (<View
                      style={{display: "inline-block", padding: '4px 10px', border: '1px solid #ddd', margin: '0 8px 8px 0'}}
                      key={`${item['type']}`}
                      onClick={this.navTo.bind(this, url)}
                    >{item['type']}</View>)
                  })}</View>
                </View>
              )
            })}
          </ScrollView>
          <View style={{display: "flex", height: '40px', borderTop: '1px solid #ddd', boxShadow: '0 -1px 2px #ddd'}}>
            <View style={{
              width: '50%', lineHeight: '40px', textAlign: "center",
              borderRight: '1px solid #ddd'
            }}
            >今天</View>
            <View style={{width: '50%', lineHeight: '40px', textAlign: "center"}}>日期</View>
          </View>
        </View>
    )
  }
}
