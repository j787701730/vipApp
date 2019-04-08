import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, Input, Button} from '@tarojs/components'
import {ajax, bgJpg, clearNoInt} from "./util";

export default class Index extends Component {

  config = {
    navigationBarTitleText: '菜谱目录',
  };

  constructor(props) {
    super(props);
    this.state = {
      result: null,
      page: 1,
      pageTemp: 1
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
    this.setState({
      result : null
    });
    Taro.showLoading({
      title: 'loading'
    });
    ajax(`https://apicloud.mob.com/v1/cook/menu/search?cid=${this.$router.params.ctgId}&page=${this.state.page}&size=20`, '', false, (data) => {

      Taro.hideLoading();
      if (data.retCode == 200) {
        this.setState(prevState => ({
          result: data.result,
          pageTemp: prevState.page
        }));
      }
    });
  };

  _page = (flag) => {
    let {page, result} = this.state;
    if (flag === 1) {
      if (result && page == result.total) {
        return
      }
      this.setState(prevState => ({page: prevState.page + 1}), () => {
        this._getData();
      })
    } else {
      if (page === 1) {
        return
      }
      this.setState(prevState => ({page: prevState.page - 1}), () => {
        this._getData();
      })
    }
  };

  _jumpPage() {
    this.setState(prevState => ({page: prevState.pageTemp}), () => {
      this._getData();
    })
  }

  _changePage = (e) => {
    let {result} = this.state;
    let val = clearNoInt(e.target.value);
    if (val == '') {
      val = 1
    } else if (val > result.total) {
      val = result.total
    }
    this.setState({
      pageTemp: e.target.value
    });
    setTimeout(() => this.setState({pageTemp: val}))
  }

  navTo(url) {
    Taro.navigateTo({
      url: url
    })
  }

  render() {
    const {result, page, pageTemp} = this.state;
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
          fontSize:'14px'
        }}
        >
          <View style={{
            height: `${height}px`, overflow: "auto", '-webkit-overflow-scrolling': 'touch', padding: '10px'
          }}
          >
            <View style={{textAlign: "center"}}>
              <Text>{`${page}/${result.total}`}</Text>
            </View>
            {result && result.list.map((el)=>{
              return (
                <View key={el.menuId} style={{display:"flex",marginBottom: '6px'}} onClick={this.navTo.bind(this,'/pages/cook/cookDetail?id='+
                el.menuId)}
                >
                  <View style={{width:'100px'}}>
                    <Image src={el.thumbnail} style={{width:'100px',height:'100px'}} mode='widthFix' />
                  </View>
                  <View style={{paddingLeft:'10px',width:'calc(100% - 100px)'}}>
                    <View style={{paddingBottom:'6px'}}>{el['name']}</View>
                    <View style={{paddingBottom:'6px',color:'#666'}}>{el['ctgTitles']}</View>
                    <View style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{el['recipe']['sumary']}</View>
                  </View>

                </View>
              )
            })}

            <View style={{display: "flex"}}>
              <Text style={{lineHeight: '30px'}}>跳转</Text>
              <Input style={{
                border: '1px solid #ddd', height: '28px', marginLeft: '10px',
                paddingLeft: '10px', paddingRight: '10px', width: '50%'
              }} type='number' ref={this._refInput}
                value={pageTemp} onInput={this._changePage.bind(this)}
              />
              <Button onClick={this._jumpPage} style={{height: '30px', lineHeight: '28px',fontSize:'14px'}}>跳转</Button>
            </View>
          </View>

          <View style={{display: "flex", height: '40px', borderTop: '1px solid #ddd', boxShadow: '0 -1px 2px #ddd'}}>
            <View style={{
              width: '50%', lineHeight: '40px', textAlign: "center",
              borderRight: '1px solid #ddd'
            }} onClick={this._page.bind(this, 0)}
            >上一题</View>
            <View style={{width: '50%', lineHeight: '40px', textAlign: "center"}} onClick={this._page.bind(this, 1)}>下一题</View>
          </View>
        </View>
    )
  }
}
