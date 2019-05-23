# U-Share集成

## 要求 
+ iOS 7.0及以上
+ 本文档使用手动集成

## 创建应用
+ [友盟官网](http://message.umeng.com)使用包名创建应用，并获取对应的AppKey

## 工程配置
1、选择SDK功能组件并下载，解压.zip文件得到相应组件包(例如：UMCommon.framework，UMShare.framework、相关平台库等)。  
2、XcodeFile —> Add Files to "Your Project"，在弹出Panel选中所下载组件包－>Add。（注：选中“Copy items if needed”）
3、添加依赖库，在项目设置target -> 选项卡General ->Linked Frameworks and Libraries如下
```
libsqlite3.tbd
CoreGraphics.framework
```
4、添加项目配置
在Other Linker Flags加入-ObjC ，注意不要写为-Objc  
5、配置SSO白名单
info.plist添加如下配置
```
<key>LSApplicationQueriesSchemes</key>
  <array>
    <string>wechat</string>
    <string>weixin</string>
    <string>sinaweibohd</string>
    <string>sinaweibo</string>
    <string>sinaweibosso</string>
    <string>weibosdk</string>
    <string>weibosdk2.5</string>
    <string>mqqapi</string>
    <string>mqq</string>
    <string>mqqOpensdkSSoLogin</string>
    <string>mqqconnect</string>
    <string>mqqopensdkdataline</string>
    <string>mqqopensdkgrouptribeshare</string>
    <string>mqqopensdkfriend</string>
    <string>mqqopensdkapi</string>
    <string>mqqopensdkapiV2</string>
    <string>mqqopensdkapiV3</string>
    <string>mqqopensdkapiV4</string>
    <string>mqzoneopensdk</string>
    <string>wtloginmqq</string>
    <string>wtloginmqq2</string>
    <string>mqqwpa</string>
    <string>mqzone</string>
    <string>mqzonev2</string>
    <string>mqzoneshare</string>
    <string>wtloginqzone</string>
    <string>mqzonewx</string>
    <string>mqzoneopensdkapiV2</string>
    <string>mqzoneopensdkapi19</string>
    <string>mqzoneopensdkapi</string>
    <string>mqqbrowser</string>
    <string>mttbrowser</string>
    <string>tim</string>
    <string>timapi</string>
    <string>timopensdkfriend</string>
    <string>timwpa</string>
    <string>timgamebindinggroup</string>
    <string>timapiwallet</string>
    <string>timOpensdkSSoLogin</string>
    <string>wtlogintim</string>
    <string>timopensdkgrouptribeshare</string>
    <string>timopensdkapiV4</string>
    <string>timgamebindinggroup</string>
    <string>timopensdkdataline</string>
    <string>wtlogintimV1</string>
    <string>timapiV1</string>
    <string>alipay</string>
    <string>alipays</string>
    <string>alipayshare</string>
    <string>dingtalk</string>
    <string>dingtalk-open</string>
    <string>linkedin</string>
    <string>linkedin-sdk2</string>
    <string>linkedin-sdk</string>
    <string>laiwangsso</string>
    <string>yixin</string>
    <string>yixinopenapi</string>
    <string>instagram</string>
    <string>whatsapp</string>
    <string>line</string>
    <string>fbapi</string>
    <string>fb-messenger-api</string>
    <string>fbauth2</string>
    <string>fbshareextension</string>
    <string>kakaofa63a0b2356e923f3edd6512d531f546</string>
    <string>kakaokompassauth</string>
    <string>storykompassauth</string>
    <string>kakaolink</string>
    <string>kakaotalk-4.5.0</string>
    <string>kakaostory-2.9.0</string>
    <string>pinterestsdk.v1</string>
    <string>tumblr</string>
    <string>evernote</string>
    <string>en</string>
    <string>enx</string>
    <string>evernotecid</string>
    <string>evernotemsg</string>
    <string>youdaonote</string>
    <string>ynotedictfav</string>
    <string>com.youdao.note.todayViewNote</string>
    <string>ynotesharesdk</string>
    <string>gplus</string>
    <string>pocket</string>
    <string>readitlater</string>
    <string>pocket-oauth-v1</string>
    <string>fb131450656879143</string>
    <string>en-readitlater-5776</string>
    <string>com.ideashower.ReadItLaterPro3</string>
    <string>com.ideashower.ReadItLaterPro</string>
    <string>com.ideashower.ReadItLaterProAlpha</string>
    <string>com.ideashower.ReadItLaterProEnterprise</string>
    <string>vk</string>
    <string>vk-share</string>
    <string>vkauthorize</string>
  </array>
```

6、配置URL Scheme
```
<key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleTypeRole</key>
      <string>Editor</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>tencent+腾讯QQ互联应用appID</string>
      </array>
    </dict>
    <dict>
      <key>CFBundleTypeRole</key>
      <string>Editor</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>QQ+腾讯QQ互联应用的APPID转换成十六进制</string>
      </array>
    </dict>
    <dict>
      <key>CFBundleTypeRole</key>
      <string>Editor</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>微信appKey</string>
      </array>
    </dict>
  </array>
```


## 初始化
```
NSString *redictUrl = url;
/* 打开调试日志 */
[[UMSocialManager defaultManager] openLog:YES];

/* 设置友盟appkey */
[[UMSocialManager defaultManager] setUmSocialAppkey:umkey];

/*
 设置微信的appKey和appSecret
 */
[[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession appKey:wechatKey appSecret:wechatSecret redirectURL:redictUrl];
/*
 设置分享到QQ互联的appID
 */
[[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_QQ appKey:qqkey appSecret:qqSecret redirectURL:redictUrl];
```

详情参考：[友盟iOS SDK集成指南](https://developer.umeng.com/docs/66632/detail/66825)

