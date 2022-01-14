SuccessEdit = function(err,res) {
    if(typeof err !== 'undefined'){
        Salert.error(err)
    }else{
        Salert.success("L'article a bien été modifié")
    }

};
Meteor.saveFileEdit = function(blob, name, path, type, callback) {
    var fileReader = new FileReader(),
        method, encoding = 'binary', type = type || 'binary';
    switch (type) {
        case 'text':
            // TODO Is this needed? If we're uploading content from file, yes, but if it's from an input/textarea I think not...
            method = 'readAsText';
            encoding = 'utf8';
            break;
        case 'binary':
            method = 'readAsBinaryString';
            encoding = 'binary';
            break;
        default:
            method = 'readAsBinaryString';
            encoding = 'binary';
            break;
    }
    fileReader.onload = function(file) {
        Meteor.call('saveFile', file.target.result, name, path, encoding, ResponseServer());
    };
    fileReader[method](blob);
};
Template.editPost.rendered = function () {
    image = document.getElementsByClassName('cover');
    new simpleParallax(image, {
        delay: .4,
        transition: 'cubic-bezier(0,0,0,1)'
    });
};
Template.wysiwyg2.rendered = function () {
    EDITOR2 = new FroalaEditor('.editor2',{
        language:'fr',
        charCounterMax: 140,
        events: {
            'initialized': function () {
                this.html.set(Posts.find($('.page').attr('idpost')).fetch()[0].body);
            }
        }
    });
};
Template.editPost.events({
    'keyup input#type'(event){
        $('.type').text(event.target.value);
    },
    'keyup input#typedesc'(event){
        $('.typedesc').text(event.target.value);
    },
    'click .btn.delete'(event) {
        document.querySelector("#imageUpload").files = null;
        $('#imgPrev').attr('filename','').attr('src','');
    },
    'click .btn.delete2'(event) {
        document.querySelector("#imageUpload2").files = null;
        $('#imgPrev2').attr('filename','').attr('src','');
    },
    'click .btn-submit'(event) {
        let url_img = null;
        let url_img2 = null;
        let html = EDITOR2.html.get(true);
        let titre = document.getElementById('titre').value;
        let id = $('.page').attr('idpost');
        let err = false;
        let type = document.getElementById('type').value;
        let typedesc = document.getElementById('typedesc').value;
        $('.err').removeClass('err');
        if (typeof document.querySelector("#imageUpload").files[0] !== 'undefined'){
            url_img = document.querySelector("#imageUpload").files[0].name
        }else{
            url_img = $('#imgPrev').attr('filename');
        }
        if (typeof document.querySelector("#imageUpload2").files[0] !== 'undefined'){
            url_img2 = document.querySelector("#imageUpload2").files[0].name
        }else{
            url_img2 = $('#imgPrev2').attr('filename');
        }
        if(titre == ""){
            sAlert.error('Vous devez entrer un titre pour votre article');
            $('#titre').addClass('err');
            err = true;
        }
        if (html == ""){
            sAlert.error('Vous devez entrer le corps de votre article avant de le publier');
            $('.editor').addClass('err');
            err = true;
        }
        if (err) throw (new Meteor.Error(500, 'Failed to save file.'));
        event.preventDefault();
        Meteor.call('editArticle', {
            titre: titre,
            html: html,
            url_img: url_img,
            url_img2: url_img2,
            type:type,
            typedesc:typedesc,
            id: id
        }, (err, res) => {
            if (err) {
                alert(err);
                sAlert.error(err);
            } else {
                sAlert.success('Le post a bien été modifié!');
                Router.go('/'+id);
            }
        });
    },
    'change #imageUpload2'(event){

        event.preventDefault();
        _.each(event.target.files, function(file) {
            Meteor.saveFileEdit(file, file.name);
            cutImg(file,file.name);
        });
        document.querySelector("#imgPrev2").src = '../images/'+event.target.files[0].name;
    },
    'change #imageUpload'(event){
        event.preventDefault();
        _.each(event.target.files, function(file) {
            Meteor.saveFileEdit(file, file.name);
        });
        document.querySelector("#imgPrev").src = '../images/'+event.target.files[0].name;
    },
    'click #btn_upload'(event){
        $('#btn_upload').addClass('load');
        event.preventDefault();
        if( typeof document.querySelector("#imgPrev").attributes['idmongo'] == 'undefined' || document.querySelector("#imgPrev").attributes['idmongo'].value == ''){
            $('#imageUpload').click();
        }else {
            document.querySelector('#btn_upload').textContent = 'Choisir un fichier';
            document.querySelector("#imgPrev").src = '';
            document.querySelector("#imgPrev").setAttribute('idmongo','');
        }
    },
    'click #btn_upload2'(event){
        $('#btn_upload2').addClass('load');
        event.preventDefault();
        if( typeof document.querySelector("#imgPrev2").attributes['idmongo'] == 'undefined' || document.querySelector("#imgPrev2").attributes['idmongo'].value == ''){
            $('#imageUpload2').click();
        }else {
            document.querySelector('#btn_upload2').textContent = 'Choisir un fichier';
            document.querySelector("#imgPrev2").src = '';
            document.querySelector("#imgPrev2").setAttribute('idmongo','');
        }
    },
    'mousewheel'(event) {
    }
});
