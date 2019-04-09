import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, Picker, ScrollView} from '@tarojs/components'
import {ajax, bgJpg,} from "./util";


export default class Index extends Component {

  config = {
    navigationBarTitleText: '汽车系列',
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
    ajax(`https://apicloud.mob.com/car/seriesname/query?name=${decodeURIComponent(this.$router.params.name)}`,
      '', false, (data) => {
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
    let height = Taro.getSystemInfoSync().windowHeight;
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
                <View key={`${el['seriesName']}`} style={{padding: '0 10px 10px', marginBottom: '10px',border:'1px solid #ddd'}}
                  onClick={this.navTo.bind(this,`/pages/car/detail?cid=${el.carId}`)}
                >
                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>{el['seriesName']}</View>
                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>{el['guidePrice']}</View>
                </View>
              )
            })}
          </ScrollView>
        </View>
    )
  }
}
