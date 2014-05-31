var mongoose = require('mongoose');

var testSchema = mongoose.Schema({	
	name: String
});

var testSchema = mongoose.model('testSchema', testSchema)

module.exports = testSchema;