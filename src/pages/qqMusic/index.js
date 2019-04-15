import Taro, {Component} from '@tarojs/taro'
import {View, Image, ScrollView, Progress, Input, Button, Icon, Picker} from '@tarojs/components'
import {ajax, bgJpg,} from "./util";
import playPng from '../../images/qplay.png'
import pausePng from '../../images/qpause.png'
import heartFillPng from '../../images/heart-fill.png'
import heartPng from '../../images/heart.png'
import closePng from '../../images/close-circle.png'
import indentPng from '../../images/indent.png'

let innerAudioContext = Taro.createInnerAudioContext();
const windowHeight = Taro.getSystemInfoSync().windowHeight - 30;
let timer;
let keyflag = '';
export default class Index extends Component {

  config = {
    navigationBarTitleText: 'QQ音乐',
  };

  constructor(props) {
    super(props);
    this.state = {
      result: null,
      resultRandom: null,
      resultSearch: null,
      top: 0,
      count: 0,
      height: windowHeight,
      playState: true,
      duration: innerAudioContext.duration,
      currentTime: innerAudioContext.currentTime,
      current: 2,
      searchWord: '',
      mySongs: [],
      myPlaySongs: [],
      myPlayIndex: 0
    }
  }

  componentWillMount() {
    Taro.getStorage({key: 'mySongs'})
      .then(res => {
        let mySongs = JSON.parse(res.data);
        if (mySongs.length) {
          this.setState({
            mySongs: mySongs
          })
        }
      })
      .catch((e) => {
        Taro.setStorageSync('mySongs', JSON.stringify([]))
      });
  }

  componentDidMount() {
    Taro.getStorage({key: 'myPlaySongs'})
      .then(res => {
        let myPlaySongs = JSON.parse(res.data);
        if (myPlaySongs.length) {
          this.setState({
            height: windowHeight - 40,
            myPlaySongs: myPlaySongs
          }, () => {
            Taro.getStorage({key: 'myPlayIndex'})
              .then(res2 => {
                let myPlayIndex = res2.data;
                this.setState({
                  myPlayIndex: myPlayIndex
                }, () => {
                  this.changUrl(this.state.myPlaySongs[this.state.myPlayIndex], 'search')
                })
              })
              .catch((e) => {
                Taro.setStorageSync('myPlayIndex', 0)
              })
          })
        }
      })
      .catch((e) => {
        Taro.setStorageSync('myPlaySongs', JSON.stringify([]))
      })
    this._newSongs();
  }

  componentWillUnmount() {
    innerAudioContext.destroy();
  }

  componentDidShow() {
    innerAudioContext = Taro.createInnerAudioContext();
  }

  componentDidHide() {

  }

  // https://www.jianshu.com/p/67e4bd47d981 知乎地址
  _newSongs = () => {
    Taro.showLoading(
      {title: 'loading'}
    )
    ajax(`https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923`, '', false,
      (data) => {
        Taro.hideLoading();
        this.setState({
          result: data,
          // top: prevState.top === 0 ? 0.1 : 0,
          // count: prevState.count + 1,
          // date: data['date']
        })
      },
      () => {
      })
  }

  _randomSongs = () => {
    Taro.showLoading(
      {title: 'loading'}
    )
    ajax(`https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=36&_=1520777874472`, '', false,
      (data) => {
        Taro.hideLoading();
        this.setState({
          resultRandom: data,
          // top: prevState.top === 0 ? 0.1 : 0,
          // count: prevState.count + 1,
          // date: data['date']
        })
      },
      () => {
      })
  }

  navTo(url) {
    Taro.navigateTo({
      url: url
    })
  }

  changUrl = (list, flag) => {
    let songmid, songname, singer;
    if (flag === 'search') {
      songmid = list['songmid'];
      songname = list['songname'];
      singer = list['singer'][0]['name'];
    } else {
      songmid = list['data']['songmid'];
      songname = list['data']['songname'];
      singer = list['data']['singer'][0]['name'];
    }

    if (timer) {
      clearInterval(timer);
    }
    let url = `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=${songmid}&filename=C400${songmid}.m4a&guid=126548448`
    ajax(url, '', false, (data) => {
      let vkey = data['data']['items'][0]['vkey'];
      let {myPlaySongs, myPlayIndex} = this.state;
      if (myPlaySongs.length) {
        for (let i = 0, len = myPlaySongs.length; i < len; i++) {
          if (myPlaySongs[i].songmid === songmid) {
            myPlayIndex = i;
            break;
          }
          if (i === len - 1) {
            myPlaySongs.push({
              songmid: songmid, songname: songname, singer: singer
            });
            myPlayIndex = len;
          }
        }
      } else {
        myPlaySongs.push({
          songmid: songmid, songname: songname, singer: singer
        });
        myPlayIndex = 0;
      }
      Taro.setStorageSync('myPlaySongs', JSON.stringify(myPlaySongs));
      Taro.setStorageSync('myPlayIndex', myPlayIndex);
      this.setState({
        duration: '00',
        currentTime: '00',
        height: windowHeight - 40,
        myPlaySongs: myPlaySongs,
        myPlayIndex: myPlayIndex
      });
      this._initPlay(`http://ws.stream.qqmusic.qq.com/C400${songmid}.m4a?fromtag=0&guid=126548448&vkey=${vkey}`)
    });
  }

  _timer = () => {
    this.setState({
      duration: innerAudioContext.duration,
      currentTime: innerAudioContext.currentTime,
    })
    timer = setInterval(() => {
      this.setState({
        duration: innerAudioContext.duration,
        currentTime: innerAudioContext.currentTime,
      })
    }, 1000)
  }

  _initPlay = (url) => {
    // innerAudioContext.autoplay = true;
    innerAudioContext.src = url;
    this._play();
  }
  _play = () => {
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放');
      this.setState({
        height: windowHeight - 40,
      })
      if (timer) {
        clearInterval(timer);
      }
      this._timer();
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    })
    innerAudioContext.onEnded((res) => {
      let {myPlayIndex, myPlaySongs} = this.state;
      if (myPlayIndex === myPlaySongs.length - 1) {
        myPlayIndex = 0;
      } else {
        myPlayIndex += 1;
      }
      Taro.setStorageSync('myPlayIndex', myPlayIndex);
      this.setState({
        myPlayIndex: myPlayIndex
      }, () => {
        this.changUrl(myPlaySongs[myPlayIndex], 'search')
      })
    })
  }

  _pause = () => {
    innerAudioContext.pause();
    innerAudioContext.onPause(() => {
      console.log('暂停播放');
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    })
    clearInterval(timer)
  }

  changePlayState = () => {
    if (this.state.playState) {
      this._pause();
    } else {
      this._play();
    }
    this.setState(prevState => ({
      playState: !prevState.playState
    }))
  }


  formatTime = (time) => {
    let m = 0, s = 0;
    if (time) {
      m = Math.floor(time / 60);
      s += Math.ceil(time % 60);
    }
    return (m > 9 ? `${m}:` : `0${m}:`) + (s > 9 ? s : `0${s}`);
  }

  _changeCurrent = (cur) => {
    this.setState({
      current: cur
    })
    switch (cur) {
      case 0:
        break;
      case 1:
        this._randomSongs()
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
    }
  }
  _searchCity = () => {
    Taro.showLoading(
      {title: 'loading'}
    )
    ajax(`https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=50&w=${this.state.searchWord}&callback=aaa`, '', false,
      (data) => {
        Taro.hideLoading();
        this.setState({
          resultSearch: (JSON.parse(data.substring(9, data.length - 1)))['data']
        })
      })
  }
  _input = (el) => {
    keyflag = el.timeStamp;
    let ths = this;
    setTimeout(function () {
      if (keyflag - el.timeStamp == 0) {
        if (!!el.target.value) {
          ths.setState({
            searchWord: el.target.value
          }, function () {
            ths._searchCity();
          })
        }
      }
    }, 500);
  }

  _favoriteSong = (list, type, flag) => {
    // 1: 添加收藏, 0: 删除
    let {mySongs} = this.state;
    if (flag) {
      let obj;
      if (type === 'search') {
        obj = {
          songmid: list['songmid'],
          songname: list['songname'],
          singer: list['singer'][0]['name']
        }
      } else {
        obj = {
          songmid: list['data']['songmid'],
          songname: list['data']['songname'],
          singer: list['data']['singer'][0]['name']
        }
      }
      mySongs.push(obj);
    } else {
      for (let i = 0, len = mySongs.length; i < len; i++) {
        let songmid;
        if (type === 'search') {
          songmid = list['songmid'];
        } else {
          songmid = list['data']['songmid'];
        }
        if (mySongs[i].songmid === songmid) {
          mySongs.splice(i, 1);
          break;
        }
      }
    }
    this.setState({
      mySongs: mySongs
    })
    Taro.setStorageSync('mySongs', JSON.stringify(mySongs))
  }

  _deleteSong = (list) => {
    let {mySongs} = this.state;
    for (let i = 0, len = mySongs.length; i < len; i++) {
      if (mySongs[i].songmid === list.songmid) {
        mySongs.splice(i, 1);
        break;
      }
    }
    this.setState({
      mySongs: mySongs
    })
    Taro.setStorageSync('mySongs', JSON.stringify(mySongs));
  }

  _deletePlaySong = (list) => {
    let {myPlayIndex, myPlaySongs} = this.state;
    for (let i = 0, len = myPlaySongs.length; i < len; i++) {
      if (myPlaySongs[i].songmid === list.songmid) {
        myPlaySongs.splice(i, 1);
        if (myPlayIndex === i) {
          if (i === len - 1) {
            myPlayIndex = 0;
          } else {
            myPlayIndex = i;
          }
        }
        break;
      }
    }
    Taro.setStorageSync('myPlayIndex', myPlayIndex);
    Taro.setStorageSync('myPlaySongs', JSON.stringify(myPlaySongs));
    console.log('------');
    this.setState({
      myPlayIndex: myPlayIndex,
      myPlaySongs: myPlaySongs
    }, () => {
      if (this.state.myPlaySongs.length) {
        this.changUrl(this.state.myPlaySongs[myPlayIndex], 'search')
      }
    })

  }

  _isFavorite = (songmid) => {
    let {mySongs} = this.state;
    if (mySongs.length) {
      for (let i = 0, len = mySongs.length; i < len; i++) {
        if (mySongs[i].songmid === songmid) {
          return true
        }
        if (i === len - 1) {
          return false;
        }
      }
    } else {
      return false;
    }
  }


  render() {
    const {result, top, height, playState, currentTime, duration, myPlayIndex, current, resultRandom, resultSearch, myPlaySongs, mySongs} = this.state;

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
          fontSize: '14px'
        }}
        >
          <View style={{height: '30px', borderBottom: '1px solid #ddd', boxShadow: '0 1px 2px #ddd', display: "flex"}}>
            <View style={{width: '25%', textAlign: "center", color: `${current === 0 ? '#31C27C' : ''}`}}
                  onClick={this._changeCurrent.bind(this, 0)}
            >新歌点榜</View>
            <View style={{width: '25%', textAlign: "center", color: `${current === 1 ? '#31C27C' : ''}`}}
                  onClick={this._changeCurrent.bind(this, 1)}
            >随机推荐</View>
            <View style={{width: '25%', textAlign: "center", color: `${current === 2 ? '#31C27C' : ''}`}}
                  onClick={this._changeCurrent.bind(this, 2)}
            >歌曲搜索</View>
            <View style={{width: '25%', textAlign: "center", color: `${current === 3 ? '#31C27C' : ''}`}}
                  onClick={this._changeCurrent.bind(this, 3)}
            >我的收藏</View>
          </View>
          <ScrollView
            style={{
              height: `${height}px`,
              boxSizing: "border-box"
            }}
            scrollY
            scrollTop={top}
            // onScrollToLower={this._ScrollToLower}
          >
            {current < 2 ?
              <View>
                {
                  current === 0 ?
                    <View style={{padding: '0 5px'}}>
                      {result != null ? <View>
                        {result['songlist'].map((list, i) => {
                          let isFavorite = this._isFavorite(list['data']['songmid']);
                          return (
                            <View style={{marginBottom: '10px', display: "flex"}} key={`${list['data']['songmid']}`}>
                              <View style={{width: '30px', textAlign: "center", lineHeight: '34px'}}>
                                {i + 1}
                              </View>
                              <View style={{width: 'calc(100% - 67px)', padding: '0 10px'}}
                                    onClick={this.changUrl.bind(this, list)}
                              >
                                <View style={{
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  width: '100%'
                                }}
                                >{list['data']['songname']}</View>
                                <View style={{color: '#777', fontSize: '12px'}}>{list['data']['singer'][0]['name']}</View>
                              </View>
                              <View style={{width: '37px', paddingTop: '2px'}}>
                                <Image src={isFavorite ? heartFillPng : heartPng} style={{width: '32px', height: '32px'}}
                                       onClick={this._favoriteSong.bind(this, list, '', !isFavorite)}
                                />
                              </View>
                            </View>
                          )
                        })
                        }
                      </View> : null}

                    </View>
                    :
                    <View>
                      {resultRandom != null ? <View style={{padding: '0 5px'}}>
                        {resultRandom['songlist'].map((list, i) => {
                          let isFavorite = this._isFavorite(list['data']['songmid']);
                          return (
                            <View style={{marginBottom: '10px', display: "flex"}} key={`${list['data']['songmid']}`}>
                              <View style={{width: '30px', textAlign: "center", lineHeight: '34px'}}>
                                {i + 1}
                              </View>
                              <View style={{width: 'calc(100% - 67px)', paddingLeft: '10px'}}
                                    onClick={this.changUrl.bind(this, list)}
                              >
                                <View style={{
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  width: '100%'
                                }}
                                >{list['data']['songname']}</View>
                                <View style={{color: '#777', fontSize: '12px'}}>{list['data']['singer'][0]['name']}</View>
                              </View>
                              <View style={{width: '37px', paddingTop: '2px'}}>
                                <Image src={isFavorite ? heartFillPng : heartPng} style={{width: '32px', height: '32px'}}
                                       onClick={this._favoriteSong.bind(this, list, '', !isFavorite)}
                                />
                              </View>
                            </View>
                          )
                        })
                        }
                      </View> : null}
                    </View>
                }
              </View> :
              <View>
                {current === 2 ? <View style={{padding: '0 5px'}}>
                  <View style={{padding: '10px', display: "flex", alignItems: "center"}}>
                    <Input type='text' placeholder='歌曲名称' style={{
                      border: '1px solid #666', width: 'calc(100% - 36px)',
                      height: '28px', paddingLeft: '10px', paddingRight: '10px',
                      minHeight: '28px'
                    }}
                           onInput={this._input}
                    />
                    <Button size='mini' style={{padding: '5px', height: '30px', width: '30px'}}
                            onClick={this._searchCity}
                    >
                      <Icon size='20' type='search'/></Button>
                  </View>
                  {resultSearch ? <View>
                    {resultSearch['song']['list'].map((list, i) => {
                      let isFavorite = this._isFavorite(list['songmid']);
                      return (
                        <View style={{marginBottom: '10px', display: "flex"}} key={`${list['songmid']}`}>
                          <View style={{width: '30px', textAlign: "center", lineHeight: '34px'}}>
                            {i + 1}
                          </View>
                          <View style={{width: 'calc(100% - 67px)', paddingLeft: '10px'}}
                                onClick={this.changUrl.bind(this, list, 'search', 1)}
                          >
                            <View style={{
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              width: '100%'
                            }}
                            >{list['songname']}</View>
                            <View style={{color: '#777', fontSize: '12px'}}>{list['singer'][0]['name']}</View>
                          </View>
                          <View style={{width: '37px', paddingTop: '2px'}}>
                            <Image src={isFavorite ? heartFillPng : heartPng} style={{width: '32px', height: '32px'}}
                                   onClick={this._favoriteSong.bind(this, list, 'search', !isFavorite)}
                            />
                          </View>
                        </View>
                      )
                    })
                    }
                  </View> : null}
                </View> : <View>
                  {current === 3 ? <View style={{padding: '0 5px'}}>
                      {mySongs.map((list, i) => {
                        return (
                          <View style={{marginBottom: '10px', display: "flex"}} key={`${list['songmid']}`}>
                            <View style={{width: '30px', textAlign: "center", lineHeight: '34px'}}>
                              {i + 1}
                            </View>
                            <View style={{width: 'calc(100% - 67px)', paddingLeft: '10px'}}
                                  onClick={this.changUrl.bind(this, list, 'search')}
                            >
                              <View style={{
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                width: '100%'
                              }}
                              >{list['songname']}</View>
                              <View style={{color: '#777', fontSize: '12px'}}>{list['singer']}</View>
                            </View>
                            <View style={{width: '37px', paddingTop: '2px'}}>
                              <Image src={closePng} style={{width: '32px', height: '32px'}}
                                     onClick={this._deleteSong.bind(this, list)}
                              />
                            </View>
                          </View>
                        )
                      })}
                    </View> :
                    <View style={{padding: '0 5px'}}>
                      <View style={{textAlign: "center", fontWeight: "bold", lineHeight: '22px'}}>播放列表</View>
                      {myPlaySongs.map((list, i) => {
                        return (
                          <View style={{marginBottom: '10px', display: "flex"}} key={`${list['songmid']}`}>
                            <View style={{width: '30px', textAlign: "center", lineHeight: '34px'}}>
                              {i + 1}
                            </View>
                            <View style={{width: 'calc(100% - 67px)', paddingLeft: '10px'}}
                                  onClick={this.changUrl.bind(this, list, 'search')}
                            >
                              <View style={{
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                width: '100%'
                              }}
                              >{list['songname']}</View>
                              <View style={{color: '#777', fontSize: '12px'}}>{list['singer']}</View>
                            </View>
                            <View style={{width: '37px', paddingTop: '2px'}}>
                              <Image src={closePng} style={{width: '32px', height: '32px'}}
                                     onClick={this._deletePlaySong.bind(this, list)}
                              />
                            </View>
                          </View>
                        )
                      })}
                    </View>
                  }
                </View>}
              </View>
            }
          </ScrollView>
          {myPlaySongs.length
            ? <View style={{display: "flex", height: '40px', borderTop: '1px solid #ddd', boxShadow: '0 -1px 2px #ddd'}}>
              <View style={{width: '40px', marginTop: '4px', paddingLeft: '4px'}} onClick={this.changePlayState.bind(this)}>
                <Image src={playState ? pausePng : playPng} style={{width: '32px', height: '32px'}}/>
              </View>
              <View style={{width: 'calc(100% - 80px)'}}>
                <View style={{height: '24px', padding: '0 10px', display: "flex", lineHeight: '24px'}}>
                  <View style={{
                    fontSize: '12px',
                    width: 'calc(100% - 100px)',
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap"
                  }}
                  >{myPlaySongs[myPlayIndex].songname}</View>
                  <View style={{width: '100px', textAlign: "right", fontSize: '12px'}}>
                    {`${this.formatTime(currentTime)} / ${this.formatTime(duration)}`}
                  </View>
                </View>
                <View style={{padding: '3px 10px'}}>
                  <Progress percent={`${currentTime * 100 / duration}`} strokeWidth={2}/>
                </View>
              </View>
              <View style={{width: '40px', marginTop: '4px'}}>
                <Image src={indentPng} style={{width: '32px', height: '32px'}}
                       onClick={this._changeCurrent.bind(this, 4)}
                />
              </View>
            </View> : null}
        </View>
    )
  }
}
