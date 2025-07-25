const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const indexRouter = require('./routes/index')

const port = process.env.PORT || 3000

const app = express()
app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// 🟢 Ruta ping para mantener vivo el servidor
app.get('/ping', (req, res) => {
  res.status(200).send('pong')
})

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})

module.exports = app
