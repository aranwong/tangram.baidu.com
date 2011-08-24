var conf = {
    clazz: {
        type: 'method',
        'method': 'baidu.dom.droppable'
    },
    
    demoType: [{key: 'default', val: 'baidu.dom.droppable'}],
    'default': {
        pageConf: {
            html: '<div id="target"></div><div id="drag" class="roundCorner"><div id="title" class="roundCorner">单击此处进行拖拽</div></div>',
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
						baidu.dom.droppable("target",{
							ondrop:function(){    baidu.dom.g('target').innerHTML = '元素放下在容器上'    },
							ondropover:function(){    baidu.dom.g('target').innerHTML = '元素移动到容器上'    },
							ondropout:function(){    baidu.dom.g('target').innerHTML = '元素移出容器'    }
						});
						baidu.dom.draggable("drag", {range: [2,398,398,2], handler: baidu.dom.g("title")});
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