var conf = {
    clazz: {
        type: 'method',
        'method': 'baidu.dom.ready'
    },
    
    demoType: [{key: 'default', val: 'baidu.dom.ready'}],
    'default': {
        pageConf: {
            html: '<div id="test">下面是即将加载的页面<br><iframe width="300px" height="100px" name="fname1" id="fid1"></iframe></div>'
		},
        formatBtn: {
			isMain: true,
            type: 'button',
            defaultValue: '加载',
            depend: [],
            event: {
                eventName: 'onclick',
                handler: function(){
						baidu.dom.ready(function(){baidu.dom.setAttr(baidu.dom.g("fid1"), 'src', 'pageReadyDemo.html')});
                }
            }
        }
    },
    
    groups: {
        'default': [['formatBtn']]
    }
};