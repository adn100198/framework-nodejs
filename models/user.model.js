var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var validator = require('validator');

const userSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Too short']
    },
    email: {
        type: String,
        unique: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid Email address' })
            }
        }
    },
    role: {
        type: Number,
        default: 0 //0.member, 1.admin
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String,
    },
    gender: {
        type: Number
        //0. Nam, 1. Nu
    },
    birthday: {
        type: Date
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

}, { versionKey: false });

//encrypt password before save to db
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hashSync(user.password, 8);
    }
    next();
});

// compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);