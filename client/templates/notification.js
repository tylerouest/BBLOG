Template.notification.rendered = function(){
    $(' .scrollNotif').css('max-height',(window.innerHeight - 70)+'px')
    //var audio = new Audio('/assets/new_notif.mp3');
    //audio.play();
};
Template.notification.events({
    'click .del_notif'(event) {
        delNotification(this._id);
    },
    'click .notificate a.contextA'(event) {
        /*
        let hash = this.hash;
        Router.go('/' + this.parentId);

        $(document.querySelector('.containerComment#'+hash)).addClass("hight").delay(2000).queue(function(){

            $(this).removeClass("hight").dequeue();
        });*/
        //delNotification(this._id);
    },
    'click .notificate .img_user'(event) {

        let hash = this.hash;
        Router.go('/profil/'+this.userId);
        //delNotification(this._id);
    }
});
Template.notification.helpers({
    'image': function () {

    },
    'nbReactPage': function () {
        //return React.find({notread: 'page', id_article: this._id}).count();
    }
});
