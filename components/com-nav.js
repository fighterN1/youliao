define(['vue','global'],function(Vue,g){    
    //数据
    var data = {
        list: [{
            name: "个人中心",
            url: "./index.html",
        }, {
            name: "关注公众号",
            url: "#"
        }, {
            name: "分享",
            url: "#"
        }, {
            name: "推荐",
            url: "#"
        }, {
            name: "直播间",
            url: "#"
        }],
    };

    //定义组件 模板 数据 方法
    var header = Vue.extend({
        template:  '<div class="nav">\
                        <div class="nav-main">\
                            <ul>\
                                <li v-for="i in list">\
                                    <a v-bind:href="i.url" @click="show">\
                                        {{i.name}}\
                                    </a>\
                                </li>\
                            </ul>\
                        </div>\
                    </div>',

        data: function() {
            return data;
        },
        methods: {
            show: function() {
                    // alert();
            }
        },
    });

    // 注册组件标签 <tq-header> 绑定组件 
    Vue.component('com-nav', header);
    //实例化
    new Vue({
        el: '#com-nav'
    });
});