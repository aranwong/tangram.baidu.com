var conf = {
    //    定义包类型
    //    class|method|field
    clazz: {
        type: 'method',
        'class': 'baidu.fx.mask'
    },
    //    定义DEMO可选项
    demoType: [
        {key: 'default', val: 'mask示例'}
    ],
    //    默认可选项的配置
    'default': {
        //    类实例化选项
        pageConf: {
            options: '',
			html:' <div id="clown"><img src="images/fx1.jpg" id="doEl"></div><input type="button" value="运行" onclick="run()" />',
			jsCode:'function run(){ T.fx.mask(baidu.dom.g("doEl"), {  startOrigin: "50% 50%", onafterfinish: changeOk}) }function changeOk(){alert("afterfinish")}'
        },
        disable: {
            type: 'button',
            defaultValue: 'disable',
            event: {
                eventName: 'onclick',
                handler: function(){
					console.log(this)
				}
            }
        }
        
    },    
    groups: {
        'default': [
            ['disable']
        ]
    }
};