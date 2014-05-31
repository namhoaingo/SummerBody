var mongoose = require('mongoose');

var maleBodySchema = mongoose.Schema({
	img:String,
	name: String
});

var maleBodySchema = mongoose.model('maleBodySchema', maleBodySchema)

module.exports = maleBodySchema;