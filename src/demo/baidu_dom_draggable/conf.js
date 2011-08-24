var conf = {
    clazz: {
        type: 'method',
        'method': 'baidu.dom.draggable'
    },
    
    demoType: [{key: 'default', val: 'baidu.dom.draggable'}],
    'default': {
        pageConf: {
            html: '<div id="dragRegion"><div id="drag" class="roundCorner"><div id="title" class="roundCorner">我已支持拖曳，并且设置了范围</div></div></div>',
			jsCode: 'var eventOn = 0;'
		},
        formatBtn0: {
			isMain: true,
            type: 'button',
            defaultValue: '创建',
            depend: [],
            event: {
                eventName: 'onclick',
                handler: function(){
					if(eventOn != 1){
						baidu.dom.draggable("drag", {range: [2,398,398,2], handler: T.g("title")});
						eventOn = 1;
					}
                }
            }
        }
    },
    
    groups: {
        'default': [['formatBtn0']]
    }
};

document.onselectstart = function(){
	return false;
}