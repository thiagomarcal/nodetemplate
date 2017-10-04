const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    gender: {
        type: String
    },
    name: {
        title: {
            type: String
        },
        first: {
            type: String
        },
        last: {
            type: String
        }
    },
    location: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        postcode: {
            type: String
        }
    },

    login: {
        username: {
            type: String
        },
        password: {
            type: String
        },
        salt: {
            type: String
        },
        md5: {
            type: String
        },
        sha1: {
            type: String
        },
        sha256: {
            type: String
        }
    },

    dob: {
        type: Date
    },

    registered: {
        type: Date
    },

    phone: {
        type: String
    },

    cell: {
        type: String
    },
    picture: {
        large: {
            type: String
        },
        medium: {
            type: String
        },
        thumbnail: {
            type: String
        }
    },

    nat: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;