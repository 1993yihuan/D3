/**
 * file:工具类
 * author:ToT
 * date:2015-05-13
*/

//格式化日期
Date.prototype.format = function(format){
	var o = {
		//month
		"M+" : this.getMonth()+1,
		//day
		"d+" : this.getDate(),
		//hour
		"h+" : this.getHours(),
		//minute
		"m+" : this.getMinutes(),
		//second
		"s+" : this.getSeconds(),
		//quarter
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		//millisecond
		"S" : this.getMilliseconds()
	};
	if(/(y+)/.test(format)){
		format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	for(var k in o)if(new RegExp("(" + k + ")").test(format))
	format = format.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
	return format;
};

Array.prototype.remove = function(n){
	//n表示第几项，从0开始算起。
	//prototype为对象原型，注意这里为对象增加自定义方法的方法。
	if(n < 0){
		//如果n<0，则不进行任何操作。
		return this;
	}
	else{
		return this.slice(0,n).concat(this.slice(n+1,this.length));
	}
	/*
	concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
	这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
	组成的新数组，这中间，刚好少了第n项。
	slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
	*/
};

if(typeof console === "undefined"){
	var console = {};
	console.log = function(){};
}
else{
	//console.log = function(msg){}
}


(function(window){
	if (typeof Utils === "undefined") {
		Utils = {};
	}
	var emptyFn = function(){};

	//拼接URL参数
	function param(obj){
		var arr = [];
		for(var a in obj){
			var s = a + "=" + obj[a];
			arr.push(s);
		}
		return encodeURI(arr.join("&"));
	};

	//js 生成 guid 编码
	function getGuid(){
		var guid = "";
		for (var i = 1; i <= 32; i++){
			var n = Math.floor(Math.random()*16.0).toString(16);
			guid += n;
			if((i==8)||(i==12)||(i==16)||(i==20)){
				guid += "-";
			}
		}
		return guid;
	};

	//判断手机平台
	//手机平台
	var mobilePlatform = {
		android: /android/i.test(navigator.userAgent),
		ipad: /ipad/i.test(navigator.userAgent),
		iphone: /iphone/i.test(navigator.userAgent),
		wphone: /Windows Phone/i.test(navigator.userAgent)
	};

	function getPlatform(){
		var plat = "";
		plat = mobilePlatform.android && "android";
		if(plat === false){
			plat = mobilePlatform.ipad && "ipad";
		}
		if(plat === false){
			plat = mobilePlatform.iphone && "iphone";
		}
		if(plat === false){
			plat = mobilePlatform.wphone && "Windows Phone";
		}
		return plat;
	};

	//判断是否移动平台true/false
	function isMobile(){
		var plat = false;
		var mobilePlatform = {
			android: /android/i.test(navigator.userAgent),
			ipad: /ipad/i.test(navigator.userAgent),
			iphone: /iphone/i.test(navigator.userAgent),
			wphone: /Windows Phone/i.test(navigator.userAgent)
		};
		plat = mobilePlatform.android || mobilePlatform.ipad || mobilePlatform.iphone || mobilePlatform.wphone;
		return plat;
	}

	//判断是否为微信浏览器
	function isWeiXin(){
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){
			return true;
		}else{
			return false;
		}
	}

	//判断是否为微博浏览器
	function isWeiBo(){
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/weibo/i) == 'weibo'){
			return true;
		}else{
			return false;
		}
	}

	//判断是否为qq浏览器
	function isQq(){
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/qq/i) == 'qq'){
			return true;
		}else{
			return false;
		}
	}

	//判断是否为goluk浏览器
	function isGoluk(){
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/goluk/i) == 'goluk'){
			return true;
		}else{
			return false;
		}
	}

	//根据秒换算天/小时/分钟/秒
	function secondToDate(second){
		if(second >= 0){
			var day = Math.floor(second / 86400);
			var hs = second % 86400;
			var h = Math.floor(hs / 3600);
			var ms = hs % 3600;
			var m = Math.floor(ms / 60);
			var s = ms % 60;

			var obj = {};
			obj.day = day;
			obj.hour = h;
			obj.minute = m;
			obj.second = s;
			return obj;
		}
	}

	//根据日期换算年/月/日
	function dateStrFormat(time){
		var str = "";
		if(time != null){
			var y = time.substring(0,4);
			var m = time.substring(4,6);
			var d = time.substring(6,8);
			var h = time.substring(8,10);
			var mm = time.substring(10,12);

			var now = new Date();
			//目标日期
			var ddate = new Date(y,m - 1,d) - 0;
			//当前日期
			var ndate = new Date(now.getFullYear(),now.getMonth(),now.getDate()) - 0;
			//昨天日期
			var ydate = new Date(now.getFullYear(),now.getMonth(),now.getDate() - 1) - 0;

			if(ddate == ndate){
				str = "今天" + " " + h + ":" + mm;
			}
			else if(ddate == ydate){
				str = "昨天" + " " + h + ":" + mm;
			}
			else{
				str = y + "." + m + "." + d + " " + h + ":" + mm;
			}
		}
		return str;
	}

	/**
	* 预加载图片资源
	* @param  {Zepto} imgElem Img元素对象
	* @param  {String} imgUrl 图片资源URL
	* @param  {Object} opts 可选参数
	* opts属性：
	* success ：图片加载成功后的回调函数
	* fail ：图片加载失败后的回调函数
	* scope ：回调函数的作用域
	*/
	function imageLoaded(imgElem, imgUrl, opts) {
		if (!imgElem) {
			return;
		}
		var imgObj = new Image(),
		me = this,
		success = emptyFn,
		fail = emptyFn,
		scope = me;
		if (opts) {
			success = opts.success ? opts.success : emptyFn;
			fail = opts.fail ? opts.fail : emptyFn;
			scope = opts.scope ? opts.scope : me;
		}

		if (imgUrl) {
			imgObj.onload = function() {
				imgElem.attr("src", imgUrl);
				success.call(scope);
				imgObj.onload = null;
				imgObj.onerror = null;
				imgObj = null;
			};
			imgObj.onerror = function() {
				fail.call(scope);
				imgObj.onload = null;
				imgObj.onerror = null;
				imgObj = null;
			}
			imgObj.src = imgUrl;
		} else {
			fail.call(scope);
		}
	};

	//获取url参数
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null && typeof r != "undefined"){
			return unescape(r[2]);
		}
		else{
			return "";
		}
	}

	function getScript(url,dom,callback,scope){
		dom = dom || document.getElementsByTagName('head')[0];
		if(typeof dom.appendChild != "function"){
			dom = document.getElementsByTagName('head')[0];
		}

		//动态加载js
		var js = document.createElement('script');
		js.setAttribute('type', 'text/javascript');
		js.setAttribute('src', url);

		dom.appendChild(js);

		if (document.all) {
			//IE
			js.onreadystatechange = function() {
				if (js.readyState == 'loaded' || js.readyState == 'complete') {
					if(typeof callback === 'function'){
						//执行回调
						callback.apply(scope || this);
					}
				}
			}
		}
		else{
			js.onload = function() {
				//执行回调
				callback.apply(scope || this);
			}
		}
	};


	var db = "";
	/*
	//openDatabase方法打开已经存在的数据库，如果不存在将会创建一个数据库
	db = window.openDatabase("userinfo1", "1.0", "userinfo", 10 * 1024,function(){
		db.transaction(function (tx) {
			//创建数据表
			var sql = "CREATE TABLE userinfo_tb (info TEXT)";
			tx.executeSql(sql);
			tx.executeSql("INSERT INTO userinfo_tb (info) values(?)", [""], null, null);
		});
	});
	*/

	function setCookie(c_name,value,expiredays){
		var exdate = new Date();
		exdate.setTime(exdate.getTime() + (expiredays * 24 * 60 * 60 * 1000));
		document.cookie = c_name + "=" + escape(value) + ";expires=" + exdate.toGMTString();
		if(db != "" && db != null){
			if(c_name === "userinfo"){
				//往数据表插入数据
				db.transaction(function (tx) {
					tx.executeSql("update userinfo_tb set info = ? where rowid = 1", [value], null, null);
				});
			}
		}
	}

	//取回cookie
	function getCookie(name){
		var data = "";
		var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr = document.cookie.match(reg)){
			data = unescape(arr[2]);
		}
		else{
			data = "";
		}
		return data;
	}

	//异步获取数据库数据
	function getLocalDbData(fun,scope){
		if(db != "" && db != null){
			db.transaction(function (tx) {
				tx.executeSql("SELECT * FROM userinfo_tb where rowid = 1", [],
				function (tx, result) {
					var data = result.rows.item(0)['info'] || "";
					window.alert(data);
					fun.apply(scope,[data]);
				},
				function () {
					//Utils.alert("本地数据错误");
				});
			});
		}
	}

	//删除cookies
	function delCookie(name){
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = getCookie(name);
		if(cval != null){
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
		}

		if(db != "" && db != null && name === "userinfo"){
			//删除数据表
			db.transaction(function (tx) {
				tx.executeSql("DROP TABLE userinfo_tb");
			});
		}
	}

	//var undefinedType = void 0;
	//var isEnableStore = "localStorage" in window && localStore !== null && localStore !== undefinedType;
	//离线存储控制器
	var offlineStore = {
		/**
		* 离线存储某值
		* @param {String} key 存储的值索引
		* @param {String} value 存储的值
		* @forever{Boolean} 是否永久保存
		* @private
		*/
		set: function(key, value,forever,time) {
			var localStorage = window.localStorage || "";
			if (localStorage !== null && localStorage !== "") {
				//删除本地以前存储的JS模块信息，先removeItem后setItem防止在iphone浏览器上报错
				for (var name = key, len = localStorage.length, id; len--;) {
					id = localStorage.key(len);
					- 1 < id.indexOf(name) && localStorage.removeItem(id);
				}
				try {
					if(forever){
						//永久保存
						localStorage.setItem(key, value);
					}
					else{
						//浏览器关闭清除数据
						sessionStorage.setItem(key,value);
					}

					//保存到cookie,解决微信不保存问题
					setCookie(key,value,time);
				}
				catch (error) {
					localStorage.clear();
				}
			}
			else{
				//alert("浏览器不支持本地存储");
				setCookie(key,value,time);
			}
		},
		//清楚本地缓存
		remove: function(key,forever){
			var localStorage = window.localStorage || "";
			if (localStorage !== null && localStorage !== "") {
				if(forever){
					//删除永久保存数据
					localStorage.removeItem(key);
					delCookie(key);
				}
				else{
					//删除临时保存数据
					sessionStorage.removeItem(key);
				}
			}
			else{
				delCookie(key);
			}
		},
		/**
		* 根据关键字获取某值
		* @param {String} key 关键字
		* @return {*}
		* @private
		*/
		get: function(key,forever) {
			var localStorage = window.localStorage || "";
			if (localStorage !== null && localStorage !== "") {
				if(forever){
					var str = localStorage.getItem(key) || "";
					if(str === ""){
						//cookies在取一次
						str = getCookie(key);
					}
					return str;
					//return isEnableStore && this.isExist(key) ? localStore.getItem(key) : "";
				}
				else{
					return sessionStorage.getItem(key) || "";
				}
			}
			else{
				var str = getCookie(key);
				return str;
			}
		},
		/**
		* 根据关键字判断是否有本地存储
		* @param {String} key 关键字
		* @return {Boolean}
		* @private
		*/
		isExist: function(key) {
			var localStorage = window.localStorage || "";
			if(localStorage !== "" && localStorage !== null){
				return !!localStorage[key];
			}
		}
	};


	//小联网load提示
	function httpTip(obj){
		this.scope = obj.scope || this;
		this.bg = obj.bg || false;
		this.hasClose = obj.hasClose === false ? false : true;
		this.text = obj.text || "正在加载...";
		this.init.apply(this,arguments);
	};
	httpTip.prototype = {
		constructor:httpTip,
		id:"_httptip",
		closeid:"_closehttptip",
		moved:false,
		init:function(obj){
			var html = [];
			var bgcss = this.bg == true ? "" : "transparentbg";
			html.push('<div id="_httptip" class="prompt_mask ' + bgcss + '" style="display:none;">');
			html.push('<div class="p_load" >');
			html.push('<div class="loadimg"><span></span></div>');
			/*
			html.push('<div id="_httptext" class="loadtext">' + this.text + '</div>');
			if(this.hasClose){
				html.push('<div id="_closehttptip" class="loadqx"></div>');
			}
			*/
			html.push('</div></div>');
			var $tip = $("#" + this.id);
			if($tip.length == 1){
				$tip.html(html.join(''));
			}
			else{
				$(document.body).append(html.join(''));
			}
			this.bindEvent();
		},
		bindEvent:function(){
			//$("#" + this.id).onbind("touchmove",this.tipMove,this);
			$("#" + this.closeid).onbind("touchstart",this.btnDown,this);
			$("#" + this.closeid).onbind("touchend",this.closeBtnUp,this);
		},
		tipMove:function(evt){
			//evt.preventDefault();
			this.moved = true;
		},
		btnDown:function(evt){
			//evt.preventDefault();
			this.moved = false;
		},
		closeBtnUp:function(evt){
			if(!this.moved){
				if(this.scope != null && this.scope != undefined){
					if(typeof this.scope.closeHttpTip == "function"){
						this.scope.closeHttpTip(evt);
					}
				}
			}
		},
		show:function(txt){
			if(txt != "" && txt != null && typeof(txt) != "undefined"){
				$("#_httptext").text(txt);
			}
			$("#_httptip").show();
		},
		hide:function(){
			$("#_httptip").hide();
		},
		isHide:function(){
			var b = true;
			var dp = $("#_httptip").css("display");
			if(dp == "block"){
				b = false;
			}
			return b;
		}
	};

	/*
	 * 弹出提示框
	*/
	var tout = null;
	function alert(msg,b){
		var box = $("#message-alert");
		if(box.length == 0){
			box = $("<div id='message-alert' class='rp_tishi' ><span>"+msg+"</span></div>");
			$(document.body).append(box);
		}
		else{
			if(b){
				box.append("<span>"+msg+"</span>");
			}
			else{
				box.html("<span>"+msg+"</span>");
			}
		}
		var dp = box.css("display");
		if(dp != "block"){
			box.show();
		}
		clearTimeout(tout);
		tout = setTimeout(function(){
			box.hide();
			box.html("");
		},3000);
	};

	function formatCurrency(num) {
		num = num.toString().replace(/\$|\,/g,'');
		if(isNaN(num)){
			num = "0";
		}
		var sign = (num == (num = Math.abs(num)));
		num = Math.floor(num * 100 + 0.50000000001);
		var cents = num % 100;
		num = Math.floor(num / 100).toString();
		if(cents < 10){
			cents = "0" + cents;
		}
		for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++){
			num = num.substring(0,num.length-(4*i+3))+','+num.substring(num.length-(4*i+3));
		}
		//return (((sign)?'':'-') + num + '.' + cents);
		return (((sign)?'':'-') + num);
	}

	function changeTitle(title){
		document.title = title;
		//修复微信
		if(isWeiXin() && mobilePlatform.iphone){
			var $body = $('body');
			// hack在微信等webview中无法修改document.title的情况
			var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
				setTimeout(function() {
					$iframe.off('load').remove();
				}, 0);
			}).appendTo($body);
		}
		if(isQq() && mobilePlatform.iphone){
			var $body = $('body');
			// hack在微信等webview中无法修改document.title的情况
			var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
				setTimeout(function() {
					$iframe.off('load').remove();
				}, 0);
			}).appendTo($body);
		}

	}

	Utils.changeTitle = changeTitle;
	Utils.formatCurrency = formatCurrency;
	Utils.imageLoaded = imageLoaded;
	Utils.secondToDate = secondToDate;
	Utils.dateStrFormat = dateStrFormat;
	Utils.getScript = getScript;
	Utils.getQueryString = getQueryString;
	Utils.param = param;
	Utils.getGuid = getGuid;
	Utils.httpTip = httpTip;
	Utils.alert = alert;
	Utils.getPlatform = getPlatform;
	Utils.isMobile = isMobile;
	Utils.isWeiXin = isWeiXin;
	Utils.isWeiBo = isWeiBo;
	Utils.isQq = isQq;
	Utils.isGoluk = isGoluk;
	Utils.offlineStore = offlineStore;
}(window));
