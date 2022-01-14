import SimpleSchema  from 'simpl-schema';
global.SimpleSchema = SimpleSchema;
SimpleSchema.extendOptions(['autoform']);

var postFields = {
    title: {
        type: String,
        label: 'Titre'
    },
    body: {
        type: String,
        label: 'Article',
        autoform: {
            type: 'textarea',
            rows: 5
        }
    },
    desc: {
        type: String,
        label: 'desc',
        autoform: {
            type: 'textarea',
            rows: 5
        }
    },
    url_img: {
        type: String,
        optional: true,
        autoform: {
            omit: true
        }
    },
    _id: {
        type: String,
        optional: true,
        autoform: {
            omit: true
        }
    },
    userId: {
        type: String,
        optional: true,
        autoform: {
            omit: true
        }
    },
    author: {
        type: String,
        optional: true,
        autoform: {
            omit: true
        }
    },
    createdAt: {
        type: Date,
        optional: true,
        autoform: {
            omit: true
        }
    }
};
PostSchema = new SimpleSchema(postFields);