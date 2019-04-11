import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, Input, Button} from '@tarojs/components'
import {ajax, bgJpg, clearNoInt} from "./util";

const answer = {
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'D'
};
const judgeVal = {'1': '正确', '0': '错误'};


export default class Index extends Component {

  config = {
    navigationBarTitleText: '科目四',
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
    ajax(`https://apicloud.mob.com/tiku/kemu4/query?page=${this.state.page}&size=1`, '', false, (data) => {

      Taro.hideLoading();
      if (data.retCode == 200) {
        this.setState(prevState => ({
          result: data.result,
          pageTemp: prevState.page
        }));
      }
    });
  };

  _navToCitys = () => {
    Taro.navigateTo({
      url: '/pages/weather/citys'
    })
  };

  _page = (flag) => {
    let {page, result} = this.state;
    if (flag === 1) {
      if (result && page == result.total) {
        Taro.showToast(
          {title: '这是最后页了', icon: 'none'}
        );
        return
      }
      this.setState(prevState => ({page: prevState.page + 1}), () => {
        this._getData();
      })
    } else {
      if (page === 1) {
        Taro.showToast(
          {title: '这是首页了', icon: 'none'}
        );
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
          height: `${Taro.getSystemInfoSync().windowHeight}px`,fontSize:'14px'
        }}
        >
          <View style={{
            height: `${height}px`, overflow: "auto", '-webkit-overflow-scrolling': 'touch', padding: '10px'
          }}
          >
            <View style={{textAlign: "center"}}>
              <Text>{`${page}/${result.total}`}</Text>
            </View>
            <View style={{marginBottom: '6px'}}>
              <Text>题目</Text>
            </View>
            <View style={{textAlign: 'justify'}}>
              <Text>{result.list[0].title}</Text>
            </View>
            {result && result.list[0].file
            ? <View style={{width:'100%', height:'180px',
              background:`url(${result.list[0].file}) center no-repeat`,
              backgroundSize:"contain"
            }}
            >
            </View>
            : null}
            <View style={{marginBottom: '6px', marginTop: '6px'}}>
              <Text>答案</Text>
            </View>
            {result && result.list[0].val.length == 1
            ? <View style={{display: "flex", flexWrap: "wrap", marginBottom: '6px'}}>
                <Text style={{
                  padding: '2px 4px', marginRight: '6px', wordBreak: "keep-all", whiteSpace: "nowrap",
                  background: `${result && result.list[0].val == 1 ? '#1A73E8' : ''}`,
                  color: `${result && result.list[0].val == 1 ? '#fff' : ''}`
                }}
                >{`A：${result.list[0].a}`}</Text>
                <Text style={{
                  padding: '2px 4px', marginRight: '6px', wordBreak: "keep-all", whiteSpace: "nowrap",
                  background: `${result && result.list[0].val == 2 ? '#1A73E8' : ''}`,
                  color: `${result && result.list[0].val == 2 ? '#fff' : ''}`
                }}
                >{`B：${result.list[0].b}`}</Text>
                {result.list[0].c == ''
                  ? null
                  : <Text style={{
                    padding: '2px 4px', marginRight: '6px', wordBreak: "keep-all", whiteSpace: "nowrap",
                    background: `${result && result.list[0].val == 3 ? '#1A73E8' : ''}`,
                    color: `${result && result.list[0].val == 3 ? '#fff' : ''}`
                  }}
                  >{`C：${result.list[0].c}`}</Text>
                }
                {result.list[0].d == ''
                  ? null
                  : <Text style={{
                    padding: '2px 4px',
                    wordBreak: "keep-all", whiteSpace: "nowrap",
                    background: `${result && result.list[0].val == 4 ? '#1A73E8' : ''}`,
                    color: `${result && result.list[0].val == 4 ? '#fff' : ''}`
                  }}
                  >{`D：${result.list[0].d}`}</Text>}

              </View>
            :<View style={{display: "flex", flexWrap: "wrap", marginBottom: '6px'}}>
                <Text style={{
                  padding: '2px 4px', marginRight: '6px',marginBottom:'4px', wordBreak: "keep-all", whiteSpace: "nowrap",
                  background: `${result && result.list[0].val.indexOf('1') > -1 ? '#1A73E8' : ''}`,
                  color: `${result && result.list[0].val.indexOf('1') > -1 ? '#fff' : ''}`
                }}
                >{`A：${result.list[0].a}`}</Text>
                <Text style={{
                  padding: '2px 4px', marginRight: '6px',marginBottom:'4px', wordBreak: "keep-all", whiteSpace: "nowrap",
                  background: `${result && result.list[0].val.indexOf('2') > -1 ? '#1A73E8' : ''}`,
                  color: `${result && result.list[0].val.indexOf('2') > -1 ? '#fff' : ''}`
                }}
                >{`B：${result.list[0].b}`}</Text>
                {result.list[0].c == ''
                  ? null
                  : <Text style={{
                    padding: '2px 4px', marginRight: '6px',marginBottom:'4px', wordBreak: "keep-all", whiteSpace: "nowrap",
                    background: `${result && result.list[0].val.indexOf('3') > -1 ? '#1A73E8' : ''}`,
                    color: `${result && result.list[0].val.indexOf('3') > -1 ? '#fff' : ''}`
                  }}
                  >{`C：${result.list[0].c}`}</Text>
                }
                {result.list[0].d == ''
                  ? null
                  : <Text style={{
                    padding: '2px 4px',marginBottom:'4px',
                    wordBreak: "keep-all", whiteSpace: "nowrap",
                    background: `${result && result.list[0].val.indexOf('4') > -1 ? '#1A73E8' : ''}`,
                    color: `${result && result.list[0].val.indexOf('4') > -1 ? '#fff' : ''}`
                  }}
                  >{`D：${result.list[0].d}`}</Text>}
              </View>}
            <View style={{marginBottom: '6px'}}>
              {result.list[0].tikuType === 'select'
                ?result.list[0].val.length == 1
                  ?<Text>{`正确答案：${answer[result.list[0].val]}`}</Text>
                  :<Text>{`正确答案：${result && result.list[0].val.indexOf('1')>-1?'A':''}${result && result.list[0].val.indexOf('2')>-1
                    ?'B':''}${result && result.list[0].val.indexOf('3')>-1?'C':''}${result && result.list[0].val.indexOf('4')>-1?'D':''}`}</Text>
                :<Text>{`正确答案：${judgeVal[result.list[0].val]}`}</Text>
              }
            </View>
            <View style={{marginBottom: '6px', textAlign: 'justify'}}>
              <Text>{`${result.list[0].explainText}`}</Text>
            </View>
            <View style={{display: "flex"}}>
              <Text style={{lineHeight: '30px'}}>跳转</Text>
              <Input style={{border: '1px solid #ddd', height: '28px', marginLeft: '10px',
                paddingLeft:'10px',paddingRight:'10px',width:'50%'}} type='number' ref={this._refInput}
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
