const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `Now: ${now} ${req.method} ${req.url}`; 
	fs.appendFile('server.log', log + '\n' ,(err) => {
		if(err){
			console.log('Error occured');
		}
		console.log(log);
			
	});
	next();
});

app.use((req, res, next) => {
	res.render('maintainence.hbs');
});


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) =>{
	return text.toUpperCase();
});

app.get('/',(req, res) => {
	//res.send('Hello express');
	res.render('home.hbs', {
		pageTitle:'Home Page',
		welcomeMessage: 'Sup hommie. How we doin????'
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs' , {
		pageTitle:'About Page'
	});
});


app.get('/bad', (req, res) => {
	res.send({
		errorMessage:'Couldn\'t load website'
	})
});
app.listen(3000, () => {
	console.log('Starting server');
});
