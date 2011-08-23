var conf = {
    clazz: {
        type: 'method',
        'method': 'baidu.dom.create'
    },
    
    demoType: [{key: 'default', val: 'baidu.dom.create'}],
    'default': {
        pageConf: {
            html: '<div id="resultTextarea"><div id="result"></div></div>'
		},
        formatBtn0: {
			isMain: true,
            type: 'button',
            defaultValue: '创建',
            depend: [],
            event: {
                eventName: 'onclick',
                handler: function(){
					var ele = baidu.dom.create("input", {type: "text", value: "createdElement"});
					baidu.dom.g("result").innerHTML="创建元素：" + ele+"<br>";
					baidu.dom.insertAfter(ele, "result");
                }
            }
        }
    },
    
    groups: {
        'default': [['formatBtn0']]
    }
};