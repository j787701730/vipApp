import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, Picker, ScrollView, Input, Button} from '@tarojs/components'
import {ajax, bgJpg,} from "./util";
import Stras from './stars'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '电影详情',
  };

  constructor(props) {
    super(props);
    this.state = {
      result: null,
      city: '福州',
      top: 0,
      directors: [],
      casts: []
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
    const {city} = this.state;
    Taro.showLoading({
      title: 'loading'
    });
    ajax(`https://api.douban.com/v2/movie/subject/${this.$router.params.id || 27202819}?city=${city}&client=&udid=`,
      '', false, (data) => {
        Taro.hideLoading();
        let directorsTemp = [];
        let castsTemp = [];
        if (Array.isArray(data.directors)) {
          for (const director of data.directors) {
            directorsTemp.push(`${director.name}(导演)`);
          }
        }
        if (Array.isArray(data.casts)) {
          for (const cast of data.casts) {
            castsTemp.push(cast.name);
          }
        }


        this.setState(prevState => ({
          result: data,
          top: prevState.top === 0 ? 0.1 : 0,
          casts: castsTemp,
          directors: directorsTemp,
        }));
      });
  };


  navTo(url) {
    Taro.navigateTo({
      url: url
    })
  }


  render() {
    const {result, directors, casts} = this.state;
    // let height = Taro.getSystemInfoSync().windowHeight - 40;
    return (<View className='index' style={{
        // backgroundImage: `url(${bgJpg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `${Taro.getSystemInfoSync().windowHeight}px`,
        fontSize: '14px',
        padding: '0 10px'
      }}
    >
        {result
          ? <View>
            <View style={{display: "flex"}}>
              <View style={{width: 'calc(100% - 100px)', paddingRight: '10px'}}>
                <View style={{fontWeight: "bold"}}>{`${result['title']} (${result['original_title']})`}</View>
                {result && result.rating.stars == 0 ?
                  <View style={{fontSize: "12px", color: '#999'}}> 暂无评分 </View> :
                  <View><Stras stars={Number((result && result.rating.stars)) / 10} />
                    <Text style={{marginLeft: '6px', fontSize: "12px", color: '#999'}}>{result.rating.average}</Text>
                    <Text style={{marginLeft: '6px', fontSize: "12px", color: '#999'}}>{result.ratings_count}人评价</Text>
                  </View>}
                <View>
                  {`${result.durations.join('/')}/${result.genres.join('/')}/${directors.join('/')}/${casts.join('/')}/${result.pubdates.join('/')}上映`}
                </View>
              </View>
              <View style={{width: '100px'}}>
                <Image src={result['images']['small']} mode='aspectFit' style={{width: '100%', height: '142px'}} />
              </View>
            </View>

            <View>所属频道</View>
            <View style={{display: "flex", flexWrap: "wrap"}}>
              {result && result.tags.map((item) => {
                return (
                  <View style={{
                    display: "inline-block", padding: '4px 10px',
                    margin: '0 8px 8px 0',
                    backgroundColor: '#effaf0',
                    border: '1px solid #42bd56',
                    borderRadius: '20px',
                    color: '#42bd56'
                  }} key={`${item}`}
                  >{item}</View>
                )
              })}
            </View>

            <View>{`${result['title']}剧情简介`}</View>
            <View>{`${result['summary']}`}</View>

            <View>影人</View>
            <ScrollView
              scrollX
            >
              <View style={{display: "flex"}}>
                {result && result['directors'].map((item) => {
                  return (
                    <View style={{display: "inline-block", width: '80px', marginRight: '10px'}} key={`${item['id']}`}>
                      <View style={{textAlign: "center"}}>
                        <Image src={item['avatars']['small']} style={{width: '80px', height: '113px'}} mode='aspectFit' />
                      </View>
                      <View style={{textAlign: "center", color: '#494949'}}>{item['name']}</View>
                      <View style={{textAlign: "center", color: '#aaa'}}>导演</View>
                    </View>
                  )
                })}
                {result && result['casts'].map((item) => {
                  return (
                    <View style={{display: "inline-block", width: '80px', marginRight: '10px'}} key={`${item['id']}`}>
                      <View style={{textAlign: "center"}}>
                        <Image src={item['avatars']['small']} style={{width: '80px', height: '113px'}} mode='aspectFit' />
                      </View>
                      <View style={{textAlign: "center", color: '#494949'}}>{item['name']}</View>
                      <View style={{textAlign: "center", color: '#aaa'}}>演员</View>
                    </View>
                  )
                })}
              </View>
            </ScrollView>

            <View>{`${result['title']}预告片`}</View>
            <ScrollView
              scrollX
            >
              <View style={{display: "flex"}}>
                {result && result['trailers'].map((item) => {
                  return (
                    <View style={{display: "inline-block", marginRight: '10px'}} key={`${item['id']}`}>
                      <View style={{textAlign: "center"}}>
                        <Image src={item['small']} style={{width: '213px', height: '120px'}} mode='aspectFit' />
                      </View>
                    </View>
                  )
                })}
                {/*{result && result['casts'].map((item) => {*/}
                {/*  return (*/}
                {/*    <View style={{display: "inline-block", width: '80px', marginRight: '10px'}} key={`${item['id']}`}>*/}
                {/*      <View style={{textAlign: "center"}}>*/}
                {/*        <Image src={item['avatars']['small']} style={{width: '80px', height: '113px'}} mode='aspectFit' />*/}
                {/*      </View>*/}
                {/*      <View style={{textAlign: "center", color: '#494949'}}>{item['name']}</View>*/}
                {/*      <View style={{textAlign: "center", color: '#aaa'}}>演员</View>*/}
                {/*    </View>*/}
                {/*  )*/}
                {/*})}*/}
              </View>
            </ScrollView>

            <View>{`${result['title']}花絮`}</View>
            <ScrollView
              scrollX
            >
              <View style={{display: "flex"}}>
                {result && result['bloopers'].map((item) => {
                  return (
                    <View style={{display: "inline-block", marginRight: '10px'}} key={`${item['id']}`}>
                      <View style={{textAlign: "center"}}>
                        <Image src={item['small']} style={{width: '213px', height: '120px'}} mode='aspectFit' />
                      </View>
                    </View>
                  )
                })}
                {/*{result && result['casts'].map((item) => {*/}
                {/*  return (*/}
                {/*    <View style={{display: "inline-block", width: '80px', marginRight: '10px'}} key={`${item['id']}`}>*/}
                {/*      <View style={{textAlign: "center"}}>*/}
                {/*        <Image src={item['avatars']['small']} style={{width: '80px', height: '113px'}} mode='aspectFit' />*/}
                {/*      </View>*/}
                {/*      <View style={{textAlign: "center", color: '#494949'}}>{item['name']}</View>*/}
                {/*      <View style={{textAlign: "center", color: '#aaa'}}>演员</View>*/}
                {/*    </View>*/}
                {/*  )*/}
                {/*})}*/}
              </View>
            </ScrollView>

            <View>{`${result['title']}图片`}</View>
            <ScrollView
              scrollX
            >
              <View style={{display: "flex"}}>
                {result && result['photos'].map((item) => {
                  return (
                    <View style={{display: "inline-block", marginRight: '10px'}} key={`${item['id']}`}>
                      <View style={{textAlign: "center"}}>
                        <Image src={item['thumb']} style={{width: '213px', height: '120px'}} mode='aspectFill' />
                      </View>
                    </View>
                  )
                })}
                {/*{result && result['casts'].map((item) => {*/}
                {/*  return (*/}
                {/*    <View style={{display: "inline-block", width: '80px', marginRight: '10px'}} key={`${item['id']}`}>*/}
                {/*      <View style={{textAlign: "center"}}>*/}
                {/*        <Image src={item['avatars']['small']} style={{width: '80px', height: '113px'}} mode='aspectFit' />*/}
                {/*      </View>*/}
                {/*      <View style={{textAlign: "center", color: '#494949'}}>{item['name']}</View>*/}
                {/*      <View style={{textAlign: "center", color: '#aaa'}}>演员</View>*/}
                {/*    </View>*/}
                {/*  )*/}
                {/*})}*/}
              </View>
            </ScrollView>

            <View>{`${result['title']}短评(${result['comments_count']})`}</View>
            <View>{result && result['popular_comments'].map((item) => {
              return (
                <View key={`${item['id']}`} style={{marginBottom: '10px'}}>
                  <View style={{display: "flex"}}>
                    <View style={{width: '40px', height: '40px'}}>
                      <Image src={item['author']['avatar']} style={{width: '100%', height: '100%', borderRadius: '40px'}}
                        mode='aspectFill'
                      />
                    </View>
                    <View style={{paddingLeft: '10px', width: 'calc(100% - 40px)'}}>
                      <View>{item['author']['name']}</View>
                      <View>{item['created_at']}</View>
                      <View>
                        {item['content']}
                      </View>
                      <View>
                        赞{item['useful_count']}
                      </View>
                    </View>
                  </View>

                </View>
              )
            })}</View>
          </View>
          : null}
      </View>
    )
  }
}
