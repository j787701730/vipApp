import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import {ajax, bgJpg} from "./util";

const answer = {
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'D'
};

export default class Index extends Component {

  config = {
    navigationBarTitleText: '驾考题库'
  };

  constructor(props) {
    super(props);
    this.state = {
      result: null,
      page: 1
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
    Taro.showLoading();
    ajax(`https://apicloud.mob.com/tiku/kemu1/query?page=${this.state.page}&size=1`, '', false, (data) => {
      console.log(data.result);
      Taro.hideLoading();
      if (data.retCode == 200) {
        this.setState({
          result: data.result
        });
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

  render() {
    const {result, page} = this.state;
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
            <View style={{marginBottom: '6px', marginTop: '6px'}}>
              <Text>答案</Text>
            </View>
            <View style={{display: "flex", flexWrap: "wrap", marginBottom: '6px'}}>
              <Text style={{
                padding:'2px 4px',marginRight: '6px', wordBreak: "keep-all", whiteSpace: "nowrap",
                background: `${result && result.list[0].val == 1 ? '#1A73E8' : ''}`,
                color: `${result && result.list[0].val == 1 ? '#fff' : ''}`
              }}
              >{`A：${result.list[0].a}`}</Text>
              <Text style={{
                padding:'2px 4px',marginRight: '6px', wordBreak: "keep-all", whiteSpace: "nowrap",
                background: `${result && result.list[0].val == 2 ? '#1A73E8' : ''}`,
                color: `${result && result.list[0].val == 2 ? '#fff' : ''}`
              }}
              >{`B：${result.list[0].b}`}</Text>
              {result.list[0].c == ''
                ? null
                : <Text style={{
                  padding:'2px 4px',marginRight: '6px', wordBreak: "keep-all", whiteSpace: "nowrap",
                  background: `${result && result.list[0].val == 3 ? '#1A73E8' : ''}`,
                  color: `${result && result.list[0].val == 3 ? '#fff' : ''}`
                }}
                >{`C：${result.list[0].c}`}</Text>
              }
              {result.list[0].d == ''
                ? null
                : <Text style={{padding:'2px 4px',
                  wordBreak: "keep-all", whiteSpace: "nowrap",
                  background: `${result && result.list[0].val == 4 ? '#1A73E8' : ''}`,
                  color: `${result && result.list[0].val == 4 ? '#fff' : ''}`
                }}
                >{`D：${result.list[0].d}`}</Text>}

            </View>

            <View style={{marginBottom: '6px'}}>
              <Text>{`正确答案：${answer[result.list[0].val]}`}</Text>
            </View>
            <View style={{marginBottom: '6px', textAlign: 'justify'}}>
              <Text>{`${result.list[0].explainText}`}</Text>
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
