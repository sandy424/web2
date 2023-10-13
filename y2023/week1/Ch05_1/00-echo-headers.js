const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/headers', (req, res) => {
    console.log(req.headers)
    console.log(Object.entries(req.headers))
    const headers = Object.entries(req.headers).map(([key, value]) => `${key} => ${value}`)
    console.log(headers)
    res.type('text/plain')
    res.send(headers.join('\n'))
})

app.listen(port, () => console.log(`Server started at port: ${port}.\nNavigate http://localhost:${port}/headers`))