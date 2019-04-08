import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, Input, Button} from '@tarojs/components'
import {ajax, bgJpg, clearNoInt} from "./util";


export default class Index extends Component {

  config = {
    navigationBarTitleText: '菜谱',
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
    ajax(`https://apicloud.mob.com/v1/cook/category/query?`, '', false, (data) => {

      Taro.hideLoading();
      if (data.retCode == 200) {
        this.setState({
          result: data.result,
        });
      }
    });
  };


  navTo(url) {
    Taro.navigateTo({
      url: url
    })
  }


  render() {
    const {result} = this.state;
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
          fontSize: '14px',padding: '10px'
        }}
        >
        {/*<View style={{*/}
        {/*  height: `${height}px`, overflow: "auto", '-webkit-overflow-scrolling': 'touch', padding: '10px'*/}
        {/*}}*/}
        {/*>*/}
          <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>{result && result['categoryInfo']['name']}</View>
          {result && result['childs'].map((el)=>{
            return (
              <View key={`${el['categoryInfo']['ctgId']}`}>
                <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>{el['categoryInfo']['name']}</View>
                <View style={{display:"flex",flexWrap:"wrap"}}>
                  {el.childs.map((item)=>{
                    return (
                      <View style={{display:"inline-block",padding:'4px 10px',marginBottom:'6px',marginRight:'6px',
                        border:'1px solid #eee'}}  key={`${item['categoryInfo']['ctgId']}`}
                        onClick={this.navTo.bind(this,`/pages/cook/cookMenu?ctgId=${item['categoryInfo']['ctgId']}`)}
                      >{item['categoryInfo']['name']}</View>
                    )
                  })}
                </View>
              </View>
            )
          })}
        {/*</View>*/}
        {/*  <View style={{display: "flex", height: '40px', borderTop: '1px solid #ddd', boxShadow: '0 -1px 2px #ddd'}}>*/}
        {/*    <View style={{*/}
        {/*      width: '50%', lineHeight: '40px', textAlign: "center",*/}
        {/*      borderRight: '1px solid #ddd'*/}
        {/*    }}*/}
        {/*    >上一题</View>*/}
        {/*    <View style={{width: '50%', lineHeight: '40px', textAlign: "center"}} >下一题</View>*/}
        {/*  </View>*/}
        </View>
    )
  }
}
