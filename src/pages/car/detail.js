import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, ScrollView} from '@tarojs/components'
import {ajax, bgJpg,} from "./util";
import CarItem from "./carItem";


export default class Index extends Component {

  config = {
    navigationBarTitleText: '汽车详细信息',
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
    ajax(`https://apicloud.mob.com/car/series/query?cid=${this.$router.params.cid}`,
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
                <View key={`${el['seriesName']}`} style={{padding: '0 10px 10px', marginBottom: '10px',}}>
                  <View style={{textAlign: "center"}}>
                    <Image src={el['carImage']}></Image>
                  </View>
                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>{el['seriesName']}</View>
                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>基本参数</View>
                  <CarItem data={el['baseInfo']} />


                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>车身</View>
                  <CarItem data={el['carbody']} />


                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>高科技配置</View>
                  <CarItem data={el['techConfig']} />


                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>发动机</View>
                  <CarItem data={el['engine']} />


                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>变速箱</View>
                  <CarItem data={el['transmission']} />


                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>底盘转向</View>
                  <CarItem data={el['chassis']} />


                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>车轮制动</View>
                  <CarItem data={el['wheelInfo']} />


                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>主/被动安全装备</View>
                  <CarItem data={el['safetyDevice']} />


                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>辅助/操控配置</View>
                  <CarItem data={el['controlConfig']} />


                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>外部/防盗配置</View>
                  <CarItem data={el['exterConfig']} />


                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>内部配置</View>
                  <CarItem data={el['interConfig']} />


                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>座椅配置</View>
                  <CarItem data={el['seatConfig']} />


                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>多媒体配置</View>
                  <CarItem data={el['mediaConfig']} />


                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>座椅配置</View>
                  <CarItem data={el['seatConfig']} />


                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>灯光配置</View>
                  <CarItem data={el['lightConfig']} />


                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>玻璃/后视镜</View>
                  <CarItem data={el['glassConfig']} />


                  <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>空调/冰箱</View>
                  <CarItem data={el['airConfig']} />


                </View>
              )
            })}

          </ScrollView>
        </View>
    )
  }
}
