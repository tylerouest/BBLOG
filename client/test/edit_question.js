Template.edit_question.events({
    'mousewheel'(event) {

    },
    'click #add_question'(event) {
        if (control_data(event.target)){
            let elems = event.target.parentNode.children;
            let question = elems[1].value;
            let reponsea = elems[2].childNodes[3].value;
            let reponseb = elems[3].childNodes[3].value;
            let vala = elems[2].childNodes[11].value;
            let valb = elems[3].childNodes[9].value;
            let typea = elems[2].childNodes[7].value;
            let typeb = elems[3].childNodes[5].value;
            let index = Counts.get('countQuestions');
            index++;
            Meteor.call('add_question',{question,reponsea,reponseb,vala,valb,typea,typeb,index}, function(error, result) {
                if (error){
                    sAlert.error(error);
                }else{
                    sAlert.success('La question a bien été ajoutée !');
                }
            });
        }
    },
    'click #save_question'(event) {
        if (control_data(event.target)){
            let elems = event.target.parentNode.children;
            let question = elems[1].value;
            let reponsea = elems[2].childNodes[3].value;
            let reponseb = elems[3].childNodes[3].value;
            let vala = elems[2].childNodes[11].value;
            let valb = elems[3].childNodes[9].value;
            let typea = elems[2].childNodes[7].value;
            let typeb = elems[3].childNodes[5].value;
            let id = event.target.parentNode.id;
            let index = event.target.parentNode.attributes['index'].value;
            Meteor.call('edit_question',{question,reponsea,reponseb,vala,valb,typea,typeb,index,id}, function(error, result) {
                if (error){
                    sAlert.error(error);
                }else{
                    sAlert.success('La question a bien été modifiée !');
                }
            });
        }
    },
    'click #del_question'(event) {
        let id = event.target.parentNode.id;
        Meteor.call('del_question',{id}, function(error, result) {
            if (error){
                sAlert.error(error);
            }else{
                sAlert.success('La question a bien été supprimée !');
            }
        });
    }

});
Template.edit_question.rendered = function () {
    let select_a = this.data.typeA;
    Template.instance().$('#sel_rep_a option[value='+select_a+']').attr('selected','selected');
    let select_b = this.data.typeB;
    Template.instance().$('#sel_rep_b option[value='+select_b+']').attr('selected','selected');
};
Template.edit_question.helpers({
    'selA': function () {

    },
    'selB': function () {

    },
    'profile': function () {

    }
});

control_data = function(target){
    let elems = target.parentNode.children;
    let question = elems[1].value;
    let reponsea = elems[2].childNodes[3].value;
    let reponseb = elems[3].childNodes[3].value;
    let vala = elems[2].childNodes[11].value;
    let valb = elems[3].childNodes[9].value;
    let typea = elems[2].childNodes[7].value;
    let typeb = elems[3].childNodes[5].value;
    let result = true;

    if (question == '' || typeof question == 'undefined'){
        $(elems[1]).addClass('error');
        result = false;
    }else{
        $(elems[1]).removeClass('error').addClass('success');
    }
    if (reponsea == '' || typeof reponsea == 'undefined'){
        $(elems[2].childNodes[3]).addClass('error');
        result = false;
    }else{
        $(elems[2].childNodes[3]).removeClass('error').addClass('success');
    }
    if (reponseb == '' || typeof reponseb == 'undefined'){
        $(elems[3].childNodes[3]).addClass('error');
        result = false;
    }else{
        $(elems[3].childNodes[3]).removeClass('error').addClass('success');
    }

    if (vala == '' || typeof vala == 'undefined'){
        $(elems[2].childNodes[11]).addClass('error');
        result = false;
    }else{
        $(elems[2].childNodes[11]).removeClass('error').addClass('success');
    }
    if (valb == '' || typeof valb == 'undefined'){
        $(elems[3].childNodes[9]).addClass('error');
        result = false;
    }else{
        $(elems[3].childNodes[9]).removeClass('error').addClass('success');
    }
    if (typea == '' || typeof typea == 'undefined'){
        $(elems[2].childNodes[7]).addClass('error');
        result = false;
    }else{
        $(elems[2].childNodes[7]).removeClass('error').addClass('success');
    }
    if (typeb == '' || typeof typeb == 'undefined'){
        $(elems[3].childNodes[5]).addClass('error');
        result = false;
    }else{
        $(elems[3].childNodes[5]).removeClass('error').addClass('success');
    }
    return result;
}