Meteor.saveFile = function(blob, name, path, type, callback) {
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
dataURItoBlob = function(dataURI) {
    if(typeof dataURI !== 'string'){
        throw new Error('Invalid argument: dataURI must be a string');
    }
    dataURI = dataURI.split(',');
    var type = dataURI[0].split(':')[1].split(';')[0],
        byteString = atob(dataURI[1]),
        byteStringLength = byteString.length,
        arrayBuffer = new ArrayBuffer(byteStringLength),
        intArray = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteStringLength; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([intArray], {
        type: type
    });
};
cutImg = function(current_file,filename){
    var reader = new FileReader();
    if (current_file.type.indexOf('image') == 0) {
        reader.onload = function (event) {
            var image = new Image();
            image.src = event.target.result;

            image.onload = function() {
                var maxWidth = 650,
                    maxHeight = 1024,
                    imageWidth = image.width,
                    imageHeight = image.height;


                if (imageWidth > imageHeight) {
                    if (imageWidth > maxWidth) {
                        imageHeight *= maxWidth / imageWidth;
                        imageWidth = maxWidth;
                    }
                }
                else {
                    if (imageHeight > maxHeight) {
                        imageWidth *= maxHeight / imageHeight;
                        imageHeight = maxHeight;
                    }
                }

                var canvas = document.createElement('canvas');
                canvas.width = imageWidth;
                canvas.height = imageHeight;
                image.width = imageWidth;
                image.height = imageHeight;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0, imageWidth, imageHeight);

                $('img#imgPrev3').attr('src',canvas.toDataURL(current_file.type))
                Meteor.saveFile(dataURItoBlob(canvas.toDataURL(current_file.type)), 'mini_'+filename);
            }
        }
        reader.readAsDataURL(current_file);
    }
};
Template.wysiwyg.rendered = function () {
    EDITOR = new FroalaEditor('.editor',{
        language:'fr'
    });
};
Template.newPost.events({
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
        let html = EDITOR.html.get(true);
        let titre = document.getElementById('titre').value;
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
        Meteor.call('addArticle', {
            titre: titre,
            html: html,
            url_img: url_img,
            url_img2: url_img2,
            type:type,
            typedesc:typedesc
        }, (err, res) => {
            if (err) {
                alert(err);
                sAlert.error(err);
            } else {
                sAlert.success('Le post a bien été publié!');
                Router.go('/'+res);
            }
        });
    },
    'change #imageUpload2'(event){

        event.preventDefault();
        _.each(event.target.files, function(file) {
            Meteor.saveFile(file, file.name);
            cutImg(file,file.name);
        });
        document.querySelector("#imgPrev2").src = '../images/'+event.target.files[0].name;
    },
    'change #imageUpload'(event){
        event.preventDefault();
        _.each(event.target.files, function(file) {
            Meteor.saveFile(file, file.name);
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
    }
});
