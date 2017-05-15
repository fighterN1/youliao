// contents of main.js:
require.config({
    baseUrl:'/',
    urlArgs: "bust=" +  (new Date()).getTime(),
    waitSeconds:100000,
    paths: {    
        'jquery':'./static/lib/jquery.min',
        'vue':'./static/lib/vue',   
        'vueModule':'components',  
        'global':'./static/js/global',
        'request':'./static/js/request',
        'nav':'./components/com-nav'
    }, 
    shim:{
        'vue':{
            exports:'vue'
        }
    }
});
//
require(['vue','nav','global','request'],function(vue,nav,g,req){
    //
    nav('');
        //请求
        req.ajaxGet("http://wwww.baidu.com",{a:1},function(){
        	console.log("success");
        },function(){
        	console.log("fail");
        });
});