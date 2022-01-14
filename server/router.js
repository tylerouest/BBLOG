Router.route('/getPDF/:_id', function() {
    var doc = new PDFDocument({size: 'A4', margin: 50});
    doc.fontSize(10);
    doc.text(Posts.find({_id:this.params._id}).fetch()[0].body);
    this.response.writeHead(200, {
        'Content-type': 'application/pdf',
        'Content-Disposition': "attachment; filename=test.pdf"
    });
    this.response.end( doc.outputSync() );
}, {where: 'server'});