/**
 * file:全局变量
 * author:ToT
 * date:2014-08-17
 * date:2016-03-25, Micle, env-based config
*/

(function(window) {
	if (typeof Base === "undefined") {
		Base = {};
	}
	//正式URL端口号为21290,测试URL端口号为8008
	var urlPort = 21290;
	//蒙版效果等待时间
	var maskTimeOut = 1000;
	//跳转延迟
	var eventDelay = 100;

	//请求服务地址,开发服务器
	//var serverUrl = "http://svr.goluk.cn";
	//var shareUrl = "http://surl2.goluk.cn/videoshare/share.html";
	//var domain = "http://surl2.goluk.cn/";

	//测试服务器
	// var serverUrl = "http://server.goluk.cn";
	// var shareUrl = "http://surl3.goluk.cn/videoshare/share.html";
	// var domain = "http://surl3.goluk.cn/";
	var serverUrl = "http://svr.goluk.cn";

	//正式服务器
	// var serverUrl = "https://s.goluk.cn";
	var shareUrl = "https://surl.goluk.cn/videoshare/share.html";
	var domain = "https://surl.goluk.cn/";
	// var serverUrl = "http://q.goluk.cn";
	// var shareUrl = "http://qsurl.goluk.cn/videoshare/share.html";
	// var domain = "http://qsurl.goluk.cn/";

	//请求微信签名地址
	var weixinSignUrl = serverUrl + "/cdcWeixin/getjsinfo.htm";

	Base.domain = domain;
	Base.shareUrl = shareUrl;
	Base.urlPort = urlPort;
	Base.maskTimeOut = maskTimeOut;
	Base.serverUrl = serverUrl;
	Base.weixinSignUrl = weixinSignUrl;
}(window));
