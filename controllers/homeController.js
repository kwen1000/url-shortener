exports.index = (req, res, next) => {
  res.render("index", {
    title: "QuickShort URL Shortener"
  })
}

exports.info = (req, res, next) => {
}