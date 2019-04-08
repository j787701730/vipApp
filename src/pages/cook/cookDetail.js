import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import {ajax, bgJpg,} from "./util";

export default class Index extends Component {

  config = {
    navigationBarTitleText: '菜谱详情',
  };

  constructor(props) {
    super(props);
    this.state = {
      result: null,
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
    // this.setState({
    //   result : null
    // });
    Taro.showLoading({
      title: 'loading'
    });
    ajax(`https://apicloud.mob.com/v1/cook/menu/query?id=${this.$router.params.id}`, '', false, (data) => {
      Taro.hideLoading();
      if (data.retCode == 200) {
        this.setState({
          result: data.result,
        });
      }
    });
  };

  render() {
    const {result} = this.state;
    // let height = Taro.getSystemInfoSync().windowHeight - 40;
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
          // height: `${Taro.getSystemInfoSync().windowHeight}px`,
          fontSize: '14px', padding: '10px'
        }}
        >
          <View style={{display: "flex",}}>
            <View style={{width: '100px'}}>
              <Image src={result.thumbnail} style={{width: '100px', height: '100px'}} mode='widthFix' />
            </View>
            <View style={{paddingLeft: '10px', width: 'calc(100% - 100px)'}}>
              <View style={{paddingBottom: '6px'}}>{result['name']}</View>
              <View style={{paddingBottom: '6px', color: '#666'}}>{result['ctgTitles']}</View>
              <View style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{result['recipe']['sumary']}</View>
            </View>

          </View>
          {result && result['recipe']['img'] ? <View style={{textAlign: "center"}}>
            <Image src={result['recipe']['img']} style={{width: '100%'}} mode='widthFix' />
          </View> : null}


          {result && result['recipe'] && result['recipe']['ingredients']
            ? <View>
              <View>
                <Text style={{fontWeight: "bold", lineHeight: '30px'}}>原料：</Text>
              </View>
              <View>
                {JSON.parse(result['recipe']['ingredients']).join('，')}
              </View>
            </View>
            : null}

          {result && result['recipe'] && result['recipe']['method']
            ? <View>
              <View>
                <Text style={{fontWeight: "bold", lineHeight: '30px'}}>步骤：</Text>
              </View>
              {JSON.parse(result['recipe']['method']).map((item) => {
                return (<View key={`item['img']`}>
                  <View><Text>{item['step']}</Text></View>
                  {item['img'] ?
                    <View style={{textAlign: "center"}}><Image src={item['img']} style={{width: '100%'}} mode='widthFix' /></View> : null}
                </View>)
              })}
            </View> : null}

          <View>
            <Text style={{fontWeight: "bold", lineHeight: '30px'}}>总结：</Text>
          </View>
          <View style={{textAlign: "justify"}}>{result && result['recipe']['sumary']}</View>
        </View>
    )
  }
}
