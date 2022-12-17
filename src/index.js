// Created by CLARET DEVIGNE

// Requires
const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
const morgan = require('morgan')

// Settings
if (process.env.PORT) {
    app.set('port', process.env.PORT)
} else {
    app.set('port', 3000)
}
const port = app.get('port')

// Middlewares
app.use(fileUpload())
app.use(morgan('dev'))
app.use(express.static('src/public'))

// Routes
app.use('/loaded', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

// API
app.post('/api/upload/', (req, res) => {
    const file = req.files.file
    const name = Date.now() + "-" + file.name
    const url = __dirname + `/public/images/${name}`
    file.mv(url, err => {
        console.log(err)
    })
    const urlForUse = req.protocol + '://' + req.hostname + `:${port}` + `/images/${name}`
    const urlForRedirect = '/loaded/?url=' + urlForUse
    res.json({status: 200, url: urlForRedirect})
})

app.post('/api/uploadForm/', (req, res) => {
    const file = req.files.file
    const name = Date.now() + "-" + file.name
    const url = __dirname + `/public/images/${name}`
    file.mv(url, err => {
        console.log(err)
    })
    const urlForUse = req.protocol + '://' + req.hostname + `:${port}` + `/images/${name}`
    res.redirect(req.protocol + '://' + req.hostname + `:${port}` + '/loaded/?url=' + urlForUse)
})


// Server listening
app.listen(port, () => {
    console.log('Server running on ' + port + " port.")
})