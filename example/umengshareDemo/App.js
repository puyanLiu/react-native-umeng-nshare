/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import UmengShare from '@cbridge/react-native-umeng-nshare';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  _longClickCodeImage() {
    console.log('_longClickCodeImage');

    let title = 'title';
    let content = 'content';
    let url = 'https://www.baidu.com';
    let thumbUrl = 'http://img.1ppt.com/uploads/allimg/1605/4_160504095943_1.jpg';

    if (Platform.OS === 'ios') {
      UmengShare.supportPlatform((platError, flag) => {
        console.log(platError);
        console.log(flag);
        if (flag) {
          UmengShare.umengShare(title, content, thumbUrl, url, (error, isSuccess) => {
            console.log(error);
            console.log(isSuccess);
            if (isSuccess) {
              console.log('分享成功');
            } else {
              console.log('分享失败');
            }
          });
        } else {
          popup({
            title: '温馨提示',
            content: '没有安装分享客户端',
            okBtn: {
              title: '确定',
              onPress: () => { },
            },
          });
        }
      });
    } else {
      UmengShare.supportPlatform((platError, flag) => {
        console.log(platError);
        console.log(flag);
        if (flag) {
          UmengShare.umengShare(title, content, thumbUrl, url, (error, isSuccess) => {
            console.log(error);
            console.log(isSuccess);
            if (isSuccess) {
              console.log('分享成功');
            } else {
              console.log('分享失败');
            }
          });
        } else {
          popup({
            title: '温馨提示',
            content: '没有安装分享客户端',
            okBtn: {
              title: '确定',
              onPress: () => { },
            },
          });
        }
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <TouchableOpacity onPress={() => {
          this._longClickCodeImage();
        }}>
          <Text>点击</Text>
        </TouchableOpacity>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
