const emailValidator = (req, res, next) => {
    const emailRegEx = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
    if (!emailRegEx.test(req.body.email)) {
      return res.status(400).send('Bad request : email format')
    }
    next()
  }

module.exports = { emailValidator }