var conf = {
    clazz: {
        type: 'method',
        'method': 'baidu.lang.instance'
    },
    
    demoType: [{key: 'default', val: 'baidu.lang.instance'}],
    'default': {
        pageConf: {
            html: '<div id="resultArea"></div>'
        },
        btn1: {
            type: 'button',
            defaultValue: '点击执行代码',
            isMain: true,
            event: {
            	eventName: 'onclick',
            	handler: function(){
					  function myClass(){
						  this.name="myclass";
						  T.lang.Class.call(this);
					  }
					  T.lang.inherits(myClass,T.lang.Class);
					  var obj = new myClass();
					  obj.name="obj";
					  T.g('resultArea').innerHTML = "返回:" + T.lang.instance(obj.guid).name + "<br>";
            	}
            }
        }
    },
    groups: {
        'default': [['btn1']]
    }
};  