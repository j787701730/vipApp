import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, Picker, ScrollView, Input, Button} from '@tarojs/components'
import {ajax, bgJpg,} from "./util";
import Stras from './stars'


const pageCount = 100;
export default class Index extends Component {

  config = {
    navigationBarTitleText: '上映电影',
  };

  constructor(props) {
    super(props);
    this.state = {
      result: null,
      city: '福州',
      top: 0,
      start: 0
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
    const {city, start} = this.state;
    Taro.showLoading({
      title: 'loading'
    });
    ajax(`https://api.douban.com/v2/movie/in_theaters?city=${city}&start=${start}&count=${pageCount}&client=&udid=`,
      '', false, (data) => {
        Taro.hideLoading();
        this.setState(prevState => ({
          result: data,
          top: prevState.top === 0 ? 0.1 : 0
        }));
      });
  };


  navTo(url) {
    Taro.navigateTo({
      url: url
    })
  }


  render() {
    const {result, top,} = this.state;
    let height = Taro.getSystemInfoSync().windowHeight - 40;
    return (<View className='index' style={{
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
          {result
            ? <View style={{padding: '0 10px'}}>
              <View style={{lineHeight: '34px', textAlign: "center", fontWeight: "bold"}}>{result['title']}</View>
              <View>
                {result['subjects'].map((subject) => {
                  return (
                    <View style={{display: "flex",marginBottom:'10px'}} key={`${subject['id']}`}
                      onClick={this.navTo.bind(this,`/pages/DoubanMovie/movieDetail?id=${subject['id']}`)}
                    >
                      <View style={{width: '100px'}}>
                        <Image src={subject['images']['small']} mode='aspectFit' style={{width: '100%', height: '142px'}} />
                      </View>
                      <View style={{width: 'calc(100% - 100px)', paddingLeft: '10px'}}>
                        <View>{`${subject['title']} (${subject['original_title']})`}</View>
                        {subject.rating.stars == 0 ?
                          <View style={{fontSize: "12px", color: '#999'}}> 暂无评分 </View> :
                          <View><Stras stars={Number(subject.rating.stars) / 10} />
                            <Text style={{marginLeft: '6px', fontSize: "12px", color: '#999'}}>{subject.rating.average}</Text>
                          </View>}
                          <View style={{fontSize:'12px'}}>{subject.genres.join(' ')}</View>
                          <View style={{fontSize:'12px'}}>{subject.durations.join(' ')}</View>
                          <View style={{fontSize:'12px'}}>{subject.pubdates.join(' ')}</View>

                      </View>
                    </View>
                  )
                })}
              </View>
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
