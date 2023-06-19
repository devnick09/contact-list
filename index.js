const express = require('express');
const path = require('path');
const port = 9000;

const db = require('./config/mongoose')
const Contact = require('./models/contact')

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'))

const contactList = [
    {
        name: 'John',
        phone: '12345678'
    },
    {
        name: 'Ronin',
        phone: '54766777'
    },
    {
        name: 'Jackson',
        phone: '86868769'
    }
]

app.get('/', async function(req, res) {
    // res.send('<h1>This is response !!!</h1>');
    const contactNew = await Contact.find();

    return res.render('home', {
        title: 'Home page',
        contact_list: contactNew
    });
});

// app.get('/practice', function(req, res) {
    
//     return res.render('practice', {
//         title: 'Practice',
//     });
// });
app.get('/delete-contact', async function(req, res) {
    
    let id = req.query.id;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if (contactIndex != -1) {
    //     contactList.splice(contactIndex, 1);
    // }
    await Contact.deleteOne({_id: id});

    return res.redirect('back');

});



app.post('/create-contact', function(req, res) {

    // contactList.push(req.body);
    console.log(req.body)

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    })
    return ;
    
});

app.listen(port, function(err){
    if(err) {
        console.log(err);
    }

    console.log('listening on port : ' + port);
});