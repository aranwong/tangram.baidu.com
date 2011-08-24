/**
 * API及文档查询
 * TODO 三个数据来源单独查找，单独显示
 */
module.declare(function(require, exports, module){
	exports.start = start;
	/**
	 * 执行查找，返回查找结果
	 * @function
	 * @param {Object} apiData
	 * @param {String} searchKey
	 * @return {Object}
	 */
	var executeSearch = function(apiData, searchkey){
		var result = [], count = 0, keyReg = new RegExp(searchkey, "gi");
		for(key in apiData){
			var apiItem = apiData[key],
				name = apiItem.name,
				desc = apiItem.desc,
				methods = apiItem.methods,
				resultItem = null;
			if(keyReg.test(key) || keyReg.test(desc)){
				resultItem = {'name': key, 'desc': desc};
				if(apiData[key].link != undefined)
					resultItem.link = apiData[key].link;
				count++;
			}
			if(methods){
				for(var j = 0, methodsLen = methods.length; j<methodsLen; j++){
					var method = methods[j];
					if(keyReg.test(method.name) || keyReg.test(method.desc)){
						////console.log(name);
						if(!resultItem){
							resultItem = {'name': key, 'methods': []};
						}else{
							resultItem.methods = [];
						}
						resultItem.methods.push(method);
						count++;
					}
				}
			}
			if(resultItem){
				result.push(resultItem);
				//console.log(resultItem.name);
			}
		}
		//console.log(result);
		return {
			'searchKey': searchkey,
			'searchResult': result,
			'resultCount': count
		};
	};//executeSearch()

	/**
	 * 将查询结果渲染到页面
	 * @function
	 * @param {String} key
	 * @param {Array} result
	 * @param {Number} count
	 */
	var renderSearchResult = function(key, result, count){
		var index = 0, //保存搜索结果条数
			html = ['<h1>搜索结果[' + count + ']</h1>'],
			keyReplacer = function($0){
				return '<span class="key-match">' + $0 + '</span>';
			};
		for(var i=0, len=result.length; i<len; i++){
			if(!result[i].methods){
				var item = result[i];
				var link = (item.link!=undefined ? item.link : './api.html#' + item.name);
				//console.log(key);
				html.push('<h3><a href="' + link + '" target="_blank">' + item.name.replace(new RegExp(key, "gi"), keyReplacer) + '</a></h3>');
				html.push('<p>' + item.desc.replace(new RegExp(key, "gi"), keyReplacer) + '</p>');
			}else{
				name = result[i].name;
				html.push('<h2>' + name.replace(new RegExp(key, 'gi'), keyReplacer) + '</h2>');
				var methods = result[i].methods;
				for(var j = 0, methodsLen = methods.length; j<methodsLen; j++){
					//console.log(methods[j].name);
					var method = methods[j];
					var link = './api.html#' + method.name;
					html.push('<h3><a href="' + link + '" target="_blank">' + method.name.replace(new RegExp(key, "gi"), keyReplacer) + '</a></h3>');
					if(method.desc) html.push('<p>' + method.desc.replace(new RegExp(key, "gi"), keyReplacer) + '</p>');
				}
			}
		}
		baidu.dom.query(".search-result")[0].innerHTML = html.join('');
		baidu.dom.setStyle(baidu.dom.query(".search-result")[0], 'display', '');
	};

	/**
	 * 还原页面显示
	 * @function
	 */
	var masterDetective = function(){
		baidu.dom.query(".search-result")[0].innerHTML = '';
		baidu.dom.setStyle(baidu.dom.query(".search-result")[0], 'display', 'none');
	};

	var bindSearchInput = function(apiData){
		//console.log(apiData);
		var searchInput = T.e(T.g('searchinput')),
			searchTimeout;
		searchInput.on("keyup", function(){
			var key = this.value.replace(/^\s+|\s+$/g, '');
			//console.log('需要查询的关键字为：' + key);
			if(searchTimeout){
				window.clearTimeout(searchTimeout);
				//console.log('取消定时器...');
			}
			if(!key){
				masterDetective();
				return;
			}
			//console.log('设定定时器...');
			searchTimeout = window.setTimeout(function(){
				//console.log('开始查询API...');
				var result = executeSearch(apiData, key);
				renderSearchResult(result.searchKey, result.searchResult, result.resultCount);
			}, 500);
		});
	};
	function start(){
		T.dom.ready(function(){
		    var timestamp = baidu.date.format(new Date(), 'yyyyMMddHHmmss');
			var baseApiUrl = "./js/tangram_base_api.js?t=" + timestamp,//添加时间戳，否则IE读取缓存数据，不能触发加载成功的事件
				componentApiUrl = "./js/tangram_component_api.js?t=" + timestamp,
				apiData = {
					'base入门' :{'name':'', 'desc':'', 'link':'./docs/Tangram-Base.html'},
					'component入门' :{'name':'', 'desc':'', 'link':'./docs/Tangram-Component.html'},
					'UI使用指导' :{'name':'', 'desc':'', 'link':'./docs/Tangram-UI.html'},
					'UI组件体系' :{'name':'', 'desc':'', 'link':'./docs/Tangram-Component-UISys.html'},
					'UIBase' :{'name':'', 'desc':'', 'link':'./docs/Tangram-Component-UIBase.html'},
					'UI组件开发' :{'name':'', 'desc':'', 'link':'./docs/Tangram-Component-Colligate.html'},
					'Component插件' :{'name':'', 'desc':'', 'link':'./docs/Tangram-Component-Plugins.html'},
					'behavior' :{'name':'', 'desc':'', 'link':'./docs/Tangram-Component-Behavior.html'},
					'base入门' :{'name':'', 'desc':'', 'link':'docs/Tangram-Base.html'},
					'新手入门' :{'name':'', 'desc':'', 'link':'docs/tutorial.html'},
					'快捷方式' :{'name':'', 'desc':'', 'link':'docs/short.html'},
					'API参考手册' :{'name':'', 'desc':'', 'link':'api.html'},
					"“荔枝”来了！新官网有木有？":{'name':'', 'desc':'', 'link':'docs/lichee.html'}
				},
				apiLoaded = 0;

			//加载base
			T.async.get(baseApiUrl).then(function(obj){
				var key;
				eval(obj.responseText);
				apiData = baidu.object.merge(apiData, tangram_base_api.docMap);
				apiLoaded ++;
				if(apiLoaded == 2){
				    if(key = baidu.url.getQueryValue(location.href,'key')){
						key = decodeURIComponent(key);
				        var result = executeSearch(apiData, key);
                        renderSearchResult(result.searchKey, result.searchResult, result.resultCount);
				    }
					bindSearchInput(apiData);
				}
			});

			//加载component
			T.async.get(componentApiUrl).then(function(obj){
				var key;
				eval(obj.responseText.replace(/[\n\r]*/ig, ''));
				apiData = baidu.object.merge(apiData, tangram_component_api.docMap);
				apiLoaded ++;
				if(apiLoaded == 2){
				    if(key = baidu.url.getQueryValue(location.href, 'key')){
						key = decodeURIComponent(key);
                        var result = executeSearch(apiData, key);
                        renderSearchResult(result.searchKey, result.searchResult, result.resultCount);
                    }
					bindSearchInput(apiData);
				}
			});

		});
	}
});