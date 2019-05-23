# U-Share集成

## 要求 
+ Android SDK4.0.0及以上
+ Android Studio集成
+ 本文档使用gradle自动导入

## 创建应用
+ [友盟官网](http://message.umeng.com)使用包名创建应用，并获取对应的AppKey

## 导入分享SDK
```
// 友盟基础组件
compile 'com.umeng.sdk:common:latest.integration'
// 友盟统计
compile 'com.umeng.sdk:analytics:latest.integration'
// 友盟分享最新版
// compile 'com.umeng.sdk:share-core:latest.integration'
// compile 'com.umeng.sdk:share-qq:latest.integration'
// compile 'com.umeng.sdk:share-wechat:latest.integration'
// 友盟分享固定版本
compile 'com.umeng.sdk:share-core:6.9.0'
compile 'com.umeng.sdk:share-qq:6.9.0'
compile 'com.umeng.sdk:share-wechat:6.9.0'
```

如果无法正常集成请在工程目录下的build.gradle添加如下配置：
```
repositories {
    mavenCentral()
}
```

## QQ 相关配置
如果使用了QQ平台，需要在主工程（app module）的build.gradle中添加如下配置（如果在Library Module中配置无效）
```
manifestPlaceholders = [qqappid: "你的qq appid"]
```

## 微信相关配置
在包名目录下创建wxapi文件夹，新建一个名为WXEntryActivity的activity继承WXCallbackActivity
```
public class WXEntryActivity extends WXCallbackActivity {

}
```

## 初始化分享SDK
```
UMConfigure.init(Context context, String appkey, String channel, int deviceType, String pushSecret);
PlatformConfig.setWeixin("wechat app key", "wechat secret");
PlatformConfig.setQQZone("qq", "qq secret");
```

在AndroidManifest.xml添加：
```
<meta-data
    android:name="UMENG_APPKEY"
    android:value="xxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
<!-- Channel ID用来标识App的推广渠道，作为推送消息时给用户分组的一个维度。-->
<meta-data
    android:name="UMENG_CHANNEL"
    android:value="Channel ID" />
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
```

## 签名配置
微信分享需要设置签名，签名必须与微信平台的签名匹配

## 分享
具体可查看官网提供API
```
/**
 * 链接（有标题，有内容）
 * @param activity
 * @param context
 * @param share_media
 * @param shareListener
 */
public static void shareUrl(Activity activity, Context context, SHARE_MEDIA share_media, String title, String desc, String url, String thumbUrl, UMShareListener shareListener){
    UMWeb web = new UMWeb(url != null ? url : ShareDefaultContent.url);
    web.setTitle(title != null ? title : ShareDefaultContent.title);
    UMImage imageurl = new UMImage(context, thumbUrl);
    web.setThumb(thumbUrl != null ? imageurl : new UMImage(context, R.mipmap.login_logo));
    web.setDescription(desc != null ? desc : ShareDefaultContent.text);
    new ShareAction(activity).withMedia(web)
            .setPlatform(share_media)
            .setCallback(shareListener).share();
}
```

详情参考：[友盟安卓SDK集成指南](https://developer.umeng.com/docs/66632/detail/66639)

