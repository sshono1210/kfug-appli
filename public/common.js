var indexComponent = Vue.extend({
    template: "#index"
});
var detailComponent = Vue.extend({
    template: "#detail"
});

$(function(){
    Vue.component("index-component", indexComponent);
    Vue.component("detail-component", detailComponent);


    var app = new Vue ({
        el: "#app",
        data: {
            posts: [],
            data: "true",
            isSelected: false,
            postDetail: []
        },
        created: function(){
            var xhr = $.get("./api/event.php", {start: 0});
            xhr.success(function(data){
                app.posts = data.events;
                //console.log(data.events.waiting.rendered);
                //app.posts.fullOrEmpty = data.events.waiting;
                //for each(event in events){
                //    var waiting = event.waiting;
                //    if(waiting >= 0){
                //        isFull =
                //    }else {
                //    }
                //}
            });
            xhr.error(function(){
                alert("通信に失敗しました"); //失敗時の処理
            });
        },
        methods: {
            route: function(route){
                app.isSelected = true;
                app.postDetail = route;
                console.log(app.postDetail);
            },
            isAcceptable:function(post){
                return post.limit>post.accepted;
            },
            return: function(){
                app.isSelected = false;
            }
        }
    });
});