/**
 * file:zepto扩展
 * author:ToT
 * date:2015-05-13
*/

if(typeof(jQuery) != "undefined"){
	jQuery.fn.extend({
		eachonbind: function( type,fn, scope,date ) {
			return this.each(function(){
				$(this).bind(type,date, $.proxy(fn,scope));
			});
		},
		visible: function() {
			return this.each(function(){
				$(this).css('visibility', 'visible');
			});
		},
		hidden: function() {
			return this.each(function(){
				$(this).css('visibility', 'hidden');
			});
		},
		onbind: function( type,fn, scope,date ) {
			var browser = {"tap":"click","touchstart":"mousedown","touchmove":"mousemove","touchend":"mouseup","doubleTap":"dblclick","longTap":"dblclick"};
			var agent = navigator.userAgent.toLowerCase();
			var i = agent.indexOf("android");
			var j = agent.indexOf("iphone");
			var evt = type;
			if(i == -1 && j == -1){
				evt = browser[type];
			}
			if(evt == undefined){
				evt = type;
			}
			return  $(this).bind(evt,date, $.proxy(fn,scope));
		},
		rebind:function(type,fn, scope,date ) {
			var browser = {"tap":"click","touchstart":"mousedown","touchmove":"mousemove","touchend":"mouseup","doubleTap":"dblclick","longTap":"dblclick"};
			var agent = navigator.userAgent.toLowerCase();
			var i = agent.indexOf("android");
			var j = agent.indexOf("iphone");
			var evt = type;
			if(i == -1 && j == -1){
				evt = browser[type];
			}
			if(evt == undefined){
				evt = type;
			}
			//解除绑定
			$(this).unbind(evt);
			return  $(this).bind(evt,date, $.proxy(fn,scope));
		},
		onclick: function(fn, scope ) {
			return  $(this).click($.proxy(fn,scope));
		}
	});

	jQuery.Ajax = function(option){
		if(typeof option === "object" && option != null){
			var dataType = option.dataType || "json";
			if(dataType === "jsonp"){
				//jsonp请求
				var url = option.url || "";
				if(url !== ""){
					option.url = url + "?callback=?&timer=" + new Date().getTime();
					$.ajax(option);
				}
				else{
					return false;
				}
			}
			else{
				//调用zepto-ajax请求
				$.ajax(option);
			}
		}
		else{
			return false;
		}
	}
}

