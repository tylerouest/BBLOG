
Template.message_item.events({
    'click .message'(event) {
        //$('.viewDate').removeClass('viewDate')
        $(event.target.parentNode).toggleClass('viewDate');
    },
    'click .msg_content'(event) {
        $(event.target.parentNode.parentNode.parentNode).toggleClass('viewDate');
    }
});
Template.message_item.rendered = function () {
    let elem = $('.conversation[data-id="'+this.data.chatId+'"]')
    let elem_cont = $('.conversation[data-id="'+this.data.chatId+'"] .message_container')
    if (typeof $(elem_cont)[0] != 'undefined') $(elem_cont).scrollTop($(elem_cont)[0].scrollHeight+100);

    if($(elem).hasClass('closed')){

    }else{
        setRead(this.data.chatId,this.data._id);
    }
    this.autorun(function() {

    });
    if (this.data.flag == "notread"){
        let nb = Counts.get('nbNewMsgByCid');
        let elem = $('.conversation[data-id="'+this.data.chatId+'"] span.notification')
        //let nb = Number(elem[0].dataset.nb)+1;
        $(elem).html(nb).attr('data-nb',nb);
    }
};
Template.message_item.helpers({
    'new_message': function () {

    },
    'style': function () {
        if (this.userId == Meteor.user()._id) return 'owner';
        return;
    },
    'flagStyle': function () {
        if (this.userId != Meteor.user()._id) return;
        if (this.flag == 'notread'){
            return 'MSGnotread'
        }else{
            return 'MSGread';
        }
    },
    'flagHelp': function () {
        if (this.userId != Meteor.user()._id) return;
        if (this.flag == 'notread'){
            return 'envoyé'
        }else{
            return 'Vu ';
        }
    },
    'flagTime': function () {
        if (this.flag != 'notread'){
            let obj = {
                txt: dateDiff(Date.now(),new Date(this.flag)),
                time: moment(this.flag).format('DD/MM/YYYY, h:mm:ss')
            }
            return obj;
        }
    }
});

formatDate = function(datejs){
    return moment(datejs).locale('fr');
}
txt_date = function(date){
    let phrase = "Il y a ";
    let et = " et ";
    let txt = "";
    if (date.day == 1){
        txt += phrase+date.day+' jour';
        phrase = " et ";
    }else if(date.day > 1){
        txt += phrase+date.day+' jours';
        phrase = " et ";
    }else if(date.day < 1){

    }

    if (date.hour == 1){
        txt += phrase+date.hour+' heure';
        phrase = " et ";
    }else if(date.hour > 1){
        txt += phrase+date.hour+' heures';
        phrase = " et ";
    }else if(date.hour < 1){

    }

    if (date.min == 1){
        txt += phrase+date.min+' minute';
        phrase = " et ";
    }else if(date.min > 1){
        txt += phrase+date.min+' minutes';
        phrase = " et ";
    }else if(date.min < 1){

    }

    if (date.sec = 1){
        if (phrase == 'Il y a ') txt += "il y a quelques secondes";
    }

    return txt;
}
dateDiff = function(date1, date2){
    date2 = Date.parse(date2);
    var diff = {}
    var tmp = date1 - date2;

    tmp = Math.floor(tmp/1000);
    diff.sec = tmp % 60;

    tmp = Math.floor((tmp-diff.sec)/60);
    diff.min = tmp % 60;

    tmp = Math.floor((tmp-diff.min)/60);
    diff.hour = tmp % 24;

    tmp = Math.floor((tmp-diff.hour)/24);
    diff.day = tmp;

    return txt_date(diff);
}