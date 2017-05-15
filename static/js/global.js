/*栏目管理 - 栏目审核*/　
　define(['jquery',
	    'request'
　　　　],
　　　　function($,req){ 
			var g={
				global:{}
			};
			g.baseDomain="http://tacker.test.cloud.cnfol.com/index.php";
			g.siteBaseUrl="http://tacker.test.cloud.cnfol.com";			
			//
			g.queryParam=function(name) { 
		        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		        var r = window.location.search.substr(1).match(reg); 
		        if (r != null) return unescape(r[2]); 
		        return null; 
		    };	
			//缓存历史
			g.history={
			     que:[],
			     add:function(key,options){
			        g.global.history.que[key]=options;
			     },
			     get:function(key){
			     	return g.global.history.que[key];
			     },
			     remove:function(){
			        g.global.history.que.remove(key); 
			     },
			     clear:function(){
					g.global.history.que=[];
					g.global.history.que.length=0;
			     }
			};
			/*页面参数存储*/
			g.page={
				toEdit:function(key,t,fullData){		
					//编辑
					var _this=t,scrollTop=document.body.scrollTop;
					g.global.history.add(key,{vueData:_this,fullData:fullData,scrollTop:scrollTop});
					$("#edit").css("display","block");
					$("#table").css("display","none");
					document.body.scrollTop=0;
				},
				toList:function(key){
					//回到列表
					$("#edit").css("display","none");
					$("#table").css("display","block");
					var args=g.global.history.get(key);
					args.fullData.call(args.vueData,args.vueData.pagination.cur,'',function(){
					  document.body.scrollTop=args.scrollTop;
					  args=null;
					});
				}
			};


			g.ajaxManage={
				que:[],
				add:function(o){ 
					return;
					var que=g.global.ajaxManage.que;
					for(var i=0;i<que.length;i++){
						var xhr=g.global.ajaxManage.que[i];
						if(xhr){
							console.log('ajax请求',xhr);
							xhr.abort();
							que.splice(i,1);
							i--;
						}
						//console.log("abort");
					}	
					que.push(o);	
				}
			};
			g.UrlHistory={
				history:[],
				add:function(url){
					g.global.UrlHistory.history.push(url);
					return g.global.UrlHistory.history;
				},
				remove:function(url){
					var _history=g.global.UrlHistory.history;
					for (var i =0;i<=_history.length; i++) {
						if(_history[i]==url){
							_history.splice(i,1);
							i--;
						}
					};
					return _history;		
				},
				getTop:function(){
					var len=g.global.UrlHistory.history.length;
					return g.global.UrlHistory.history[len-1];
				}
			};
			//弹框  关闭
			g.dialog={
				open:function(id){
					setTimeout(function(){Dialog(id);},100);
			        g.tools.dialog.setCloseIcon(id);
				},
				close:function(id){
				  if(Dialog.Close)Dialog.Close();
				},
				setCloseIcon:function(id){
					var _filter='#'+id+' .close';
					$(_filter).bind('click',function() {
						g.tools.dialog.close(id);
					})
				}
			};
			g.pagination={ 
				//设置分页
				setPagination:function(total,cur,pageSize) {
					  total=total?total:0;
					  pageSize=pageSize?pageSize:10;
					  cur=cur||1;
					  cur=cur>total?total:cur;
					 var pages=Math.ceil(total/pageSize);
					 var pageArea=g.tools.pagination.getPagArr(cur,pages);
					return {total:total,pageSize:pageSize,cur:cur,pages:pages,pageArea:pageArea}
				},
				pre:function(cur,total){
					return pagination.getPagArr(cur-1,total);
				},
				next:function(cur,total){
					return pagination.getPagArr(cur+1,total);
				},
				getPagArr:function(cur,total){
			  	 var result=[]; 
			  	 	if(cur>total||cur<0)return [];
				  	if(total<=7){
			            for(var i=1;i<=total;i++){				
							if(i==cur){					
								//cur=i;
							}
							result.push(i);
			            }
				  	}else{
			            if(cur<4){
			            	 for(var i=1;i<=7;i++){
			            	 	 if(i==cur){
										//cur=i;
									}
									result.push(i);
			            	 }
			            }else if(cur>=total-3){
			            	 for(var i=6;i>=0;i--){
			            	 	var _t=total-i;
			            	 	 if(_t==cur){
										//cur=i;
									}
									result.push(_t);
			            	 }
			            }
			            else{
							for(var i=3;i>0;i--){
			            	 	var _t=cur-i;
			            	 	if(_t>0){
			            	 		result.push(_t);
			            	 	}            	 	
			            	 }
			            	 result.push(cur);
				        	for(var i=0;i<3;i++){	        		
				        	 	var _t=cur+i+1;
				        	 	if(_t<=total){
			            	 		result.push(_t);
			            	 	}
				        	 }

			            }
				  	}
				  	console.log(result,cur);
				  	return result;	  	
			  }
			};
			return g;
		}
);

