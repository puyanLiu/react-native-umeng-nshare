
# react-native-umeng-nshare

## 安装
```
npm install react-native-umeng-nshare

从项目目录安装
npm install ./cbridge/react-native-umeng-nshare --save
```

## 集成到iOS
### 链接库
+ Linked Frameworks and Libraries 链接 UMSocialCore.framewrok、UMSocialNetwork.framework、libRCTUmengShare库
+ Franework Search Paths 添加分享库的路径
```
$(SRCROOT)/../node_modules/@ttjk/react-native-umeng-share/ios/share/UMSocialSDK
```
+ Header Search Paths 添加分享库的路径
```
$(SRCROOT)/../cbridge/react-native-umeng-nshare/ios
```

注：以上路径以自己实际路径为准

### 添加API
在`Appdelegate.m`中对应的位置添加如下API

```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  ...
  
  [ShareHelp setupSocialWithUrl:@"url"
                          UmKey:@"UMengAppKey"
                      wechatKey:@"wechatAppKey"
                   wechatSecret:@"wechatAppSecret"
                          qqKey:@"qqAppKey"
                       qqSecret:@"qqAppSecret"
   ];
  
  return YES;
}
```

## 集成到Android

### 设置Application
```
public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
      @Override
      public boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
      }

      @Override
      protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new RNReactNativeUmengNsharePackage()
        );
      }

      @Override
      protected String getJSMainModuleName() {
        return "index";
      }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
    }

    @Override
    public void onCreate() {
      super.onCreate();
      SoLoader.init(this, /* native exopackage */ false);
      initShare();
    }

    private void initShare() {
      UMConfigure.init(this, "umeng_key", "umeng_channel", UMConfigure.DEVICE_TYPE_PHONE, null);
      UMConfigure.setLogEnabled(true);
      PlatformConfig.setWeixin("weixinkey", "weixinsecret");
      PlatformConfig.setQQZone("qqkey", "qqsecret");
    }
}
```

### 添加AppKey
在项目工程的`AndroidManifest.xml`中的<Application>标签下添加:

```
<meta-data
    android:name="UMENG_APPKEY"
    android:value="umeng_key" >
</meta-data>

<!--分享微信回调
    必须添加theme，不添加theme会出现
    Error:Execution failed for task ':app:processDevelopmentDebugManifest'.
    > No record for key [activity#${applicationId}.wxapi.WXEntryActivity]
-->
<activity
    android:name=".wxapi.WXEntryActivity"
    android:configChanges="keyboardHidden|orientation|screenSize"
    android:exported="true"
    android:screenOrientation="portrait"
    android:theme="@android:style/Theme.Translucent.NoTitleBar" />
<!--分享QQ-->
<activity
    android:name="com.tencent.tauth.AuthActivity"
    android:launchMode="singleTask"
    android:noHistory="true" >
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="tencent1106740921" />
    </intent-filter>
</activity>
<activity
    android:name="com.tencent.connect.common.AssistActivity"
    android:theme="@android:style/Theme.Translucent.NoTitleBar"
    android:configChanges="orientation|keyboardHidden|screenSize"/>
<activity android:name="com.share.ShareActivity" android:theme="@android:style/Theme.Translucent.NoTitleBar"  />
```

详情参考：[友盟安卓SDK集成指南](https://developer.umeng.com/docs/66632/detail/66639)

## API

| API | Note |    
|---|---|
| `supportPlatform` | 是否有平台支持分享 |
| `umengShare` | 分享 |

## Usage

```
import UmengShare from 'react-native-umeng-nshare';

let title = '标题';
let content = '内容';
let url = 'url';
let thumbUrl = '小图标url';

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

```
