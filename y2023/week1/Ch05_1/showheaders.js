const express = require('express')
const expresshandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const handlebars = require('./lib/handlers')
const tours = require('./lib/tours')

app.engine('handlebars', expresshandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', handlebars.home)
app.get('/about', handlebars.about)
app.get('/headers', handlebars.header)
app.get('/error', handlebars.error)
app.get('/greeting', (req, res) => {
    res.render('greeting', {
        message: '안녕하세요 여러분!',
        style: req.query.style,
    })
})

app.post('/process-contact', (req, res) => {
    console.log(`body = ${req.body}`)
    console.log(`receiving constact from ${req.body.name} <${req.body.email}>`)
    res.redirect(303, 'thanks')
})
app.get('/thanks', (req, res) => {
    console.log("Thanks called")
    res.type('text/plain')
    res.end('thanks')
})

app.use(handlebars.notFound)
app.use(handlebars.serverError)

app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; `+
    `press Ctrl-C to terminate...`
))