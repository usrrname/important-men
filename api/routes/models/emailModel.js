var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose.connect('', { config: { autoIndex: false } });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!')
});

var conn = mongoose.createConnection('debug', true);
conn.on('error', handleError);

//our model
var emailSchema = new Schema({
	name:{
		type: String
	},
	email:{
        type: String,
        required: true
  },
	comments: {
		type: String,
    required: [true, 'Why no questions?'],
        date: Date.now
  },
  response: null,
	created_at: Date,
  updated_at: Date
});

var User = mongoose.model('Emails', emailSchema);
emailSchema.on('error', handleError);
var dog = new User({name:"dog"});

emailSchema.set("Emails", "users");

emailSchema.pre('save', function(next){
	var currentDate = new Date();
	this.updated_at = currentDate;

	if(!this.created_at){
		this.created_at = currentDate;
	}
    next();  
})
  
// callback is optional; use the returned promise if you like:
var promise = emailSchema.create([{ name: 'jelly bean' }, {email:"wchan03@saic.edu"}, {description: "im a jelly bean"}]);
promise.then(function (user) {
  // ...
})

emailSchema.save(function (err, emailSchema) {
    if (err) return console.error(err);
    emailSchema.print();
  });

//delete things
emailSchema.remove(function (err, user) {
    user.isDeleted(); // true
    user.remove(); // no-op, doesn't send anything to the db
  
    user.isDeleted(false);
    user.isDeleted(); // false
    user.remove(); // will execute a remove against the db
  })
  
  emailSchema.methods.print = function () {
    var summary = this.name + this.email + this.comments;
	return summary;
  }

//finding duplicate emails
var query = Emails.find(function(err, users){
    if (err) {return console.log(err);
    };
    return this.model('email').find({ email: this.email }, users);
    });
    
var findPromise = query.exec();

module.exports = Emails;