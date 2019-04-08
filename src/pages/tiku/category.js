import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image,} from '@tarojs/components'
import {ajax, bgJpg} from "./util";


export default class Index extends Component {

  config = {
    navigationBarTitleText: '驾考题库',
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
    this._getCategory();
  }

  componentDidHide() {
  }

  _getCategory = () => {
    Taro.showLoading({
      title: 'loading'
    });
    ajax('https://apicloud.mob.com/tiku/shitiku/category/query?', '', false,
      (data) => {
        Taro.hideLoading();
        if (data.retCode == 200) {
          this.setState({
            result: data.result,
          });
        }

      },
      () => {
      })
  }
  _navTo = (url) => {
    Taro.navigateTo({
      url: url
    })
  };

  render() {
    const {result} = this.state;

    return (result == null
      ? <View style={{
        // backgroundImage: `url(${bgJpg})`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        height: `${Taro.getSystemInfoSync().windowHeight}px`
      }}
      />
      : <View style={{
        // backgroundImage: `url(${bgJpg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `${Taro.getSystemInfoSync().windowHeight}px`,
        padding: '10px',
        fontSize: '14px'
      }}
      >
        {result && Object.keys(result).map((key) => {
          return (
            <View key={key} style={{marginBottom: '15px'}}>
              <View style={{height: '34px', lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>{key}</View>
              <View style={{padding: '0 10px'}}>
                {result[key].map((el) => {
                  return (
                    <View style={{height: '34px', lineHeight: '34px', borderBottom: '1px solid #eee'}} key={el.cid}
                      onClick={this._navTo.bind(this,`/pages/tiku/categoryContent?cid=${el.cid}`)}
                    >{el.title}</View>
                  )
                })}
              </View>
            </View>

          )
        })}

      </View>)
  }
}
