/**/ 
define(['jquery'],
　function($){  
   function ajax(url,type,args,success,error,then){
        var _xhr=$.ajax({ 
      			url: url, 
      			type:type,
      			dataType:"json",
      			data:args,
      			success: function(data){
      		        success&&success(data);
      		      },
      	      	error:function(msg){
      	      		error&&error(msg);
                     console.log(msg);
      	      	}
      		  }).then(function(){         
      		  	 then&&then();
      		  });
         return _xhr;
	}
   return {
   	/*
   	  *@url请求地址
   	  *@options 请求参数
   	  *@success 请求成功回调函数
   	  *@error   请求失败回调函数
   	  *@then    ajax运行完调用的函数
   	 */
   	ajaxGet:function(url,options,success,error,then){   		
   		var args=url.indexOf('?')>0?"":"?1=1";
   		for(var i in options){   			
   			args+="&"+i+"="+options[i];
   		}
   		url=url+args;
         var xhr=ajax(url,"get",{},success,error,then);
   	},
   	/*
   	  *@url请求地址
   	  *@options 请求参数
   	  *@success 请求成功回调函数
   	  *@error   请求失败回调函数
   	  *@then    ajax运行完调用的函数
   	 */
   	ajaxPost:function(url,options,success,error,then){    
         // console.log(options); 		
         var xhr=ajax(url,"post",options,success,error,then);
   	}
   };
});