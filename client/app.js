import bootbox from 'meteor/mizzao:bootboxjs';
import '../imports/simpleParallax.min.js'
import moment from 'moment';
import UserStatus from 'meteor/mizzao:user-status';
import { TimeSync } from 'meteor/mizzao:timesync';
simpleParallax = require('simple-parallax-js');
import 'moment/locale/fr'
moment.locale('fr')
UserState = UserStatus;

Home_scroll = new ReactiveVar(0);

Reload._onMigrate(function() {
    console.error('HotCodePush: annulé');
    return [false];
});
window.onerror = function (msg, url, lineNo, columnNo, error) {
    sAlert.error('Erreur: '+msg+'/n'+url+' ligne:'+lineNo+' colonne:'+columnNo+'/n err:'+error);
    return false;
};

getHashLocation = function(){
    let hash = document.location.hash;
    //debugger
    try{
        $(hash)[0].scrollIntoView()
        $(document.querySelector('.containerComment'+hash)).addClass("hight").delay(2000).queue(function(){
            $(this).removeClass("hight").dequeue();
        });
    }catch (e) {
        if (e.message == "Cannot read property 'scrollIntoView' of undefined") sAlert.info("L'élément est introuvable !")
    }

}
$(window).bind( "hashchange" , getHashLocation);
$(window).on('hashchange', function (e) {
    debugger;
});
window.onhashchange = getHashLocation;
window.addEventListener("hashchange", getHashLocation, false);

Meteor.users.find({ "status.online": true }).observe({
    added: function(id) {
        //debugger;
    },
    removed: function(id) {
        // id just went offline
    }
});

sAlert.config({
    effect: 'bouncyflip',
    position: 'top-right',
    timeout: 5000,
    html: true,
    onRouteClose: false,
    stack: true,
    offset: 40,
    beep: false,
    onClose: _.noop
});
getLogin = function(){
    if (Meteor.user()){
        DataLog = Meteor.subscribe("pubNotifications",Meteor.user()._id);
        $('#dropDown span.drop-down__name').text(Meteor.user().username);
    }else{
        $('#dropDown span.drop-down__name').text('Connection ');
    }
};




getTemplate = function (template, data) {
    var node = document.createElement("div");
    document.body.appendChild(node);
    UI.renderWithData(template, data, node);
    return node;
};
modalTemp = function(tmpl){
    bootbox.dialog({
        message: getTemplate(Template[tmpl])
    });
};
getPageConversation = function(page,nb){
    if (typeof nb == 'undefined') nb = 20;
    getTemplate(Template.messages_list,function(){
        return Conversations.find({
                _id:'W8PZmGGpST2waGDxr'
            },{
                skip: page > 0 ? ((page) * nb) : 0,
                limit:nb,
            }
        ).fetch()[0]
    });
}

saveNotification = function(to,subject,url,idarticle,hash,img){
    Meteor.call('setNotification',{to,subject,url,idarticle,hash,img}, function(error, result) {
        if (error){
            sAlert.error(error);
        }else{
            $(".bell-icon").addClass("focus").delay(2000).queue(function(){
                $(this).removeClass("focus").dequeue();
            });
        }
    });
};

delNotification = function(id){
    Meteor.call('delNotification',{id}, function(error, result) {
        if (error){
            sAlert.error(error);
        }else{

        }
    });
};
delNotificationMsg = function(id){
    Meteor.call('delNotificationMsg',{id}, function(error, result) {
        if (error){
            sAlert.error(error);
        }else{

        }
    });
};
modalTemp = function(tmpl){
    bootbox.dialog({
        message: getTemplate(Template[tmpl])
    });
};
ResponseServer = function(resp){
    if(!resp){
        $('.btn.btn-upload').removeClass('load').addClass('valid');
        sAlert.success('fichier uploadé');
    }else{
        $('.btn.btn-upload').removeClass('load').addClass('error');
        sAlert.error('erreur fichier');
    }
};
Template.mainLayout.rendered = function(){

};
Template.mainLayout.events({
    'mouseenter #login-dropdown-list'(event) {
        $('#cssmenu').addClass('show');
    },
    'mouseenter #cssmenu'(event) {
        $('#cssmenu').addClass('show');
    },
    'mouseleave #login-dropdown-list'(event) {
        $('#cssmenu').removeClass('show');
    },
    'mouseleave #cssmenu'(event) {
        $('#cssmenu').removeClass('show');
    },
    'click .bootbox.modal'(event) {
        alert('ok')
    }

});



