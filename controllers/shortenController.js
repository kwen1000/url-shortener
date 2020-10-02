const Link = require("../models/linkModel");

function validURL(url) {
  var reg = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  var result = reg.test(url);
  return result;
}

function generateURL(url) {
  return "" + new Date().getTime();
}

exports.generateLink = (req, res, next) => {
  try {
    if (!req.body.URL)
      return res.status(400).json({ error: "URL not in JSON." });
    if (!validURL(req.body.URL))
      return res.status(400).json({ error: "Invalid URL." });
    let generated = generateURL(req.body.URL);
    const newLink = new Link({
      originalURL: req.body.URL,
      shortURL: generated
    });
    newLink
      .save()
      .then((r) => res.status(201).json({ "shortURLid": generated }))
      .catch((err) => res.status(400).json({ error: `$(err)` }));
  }
  catch (err) {
    return next(err);
  }
}

exports.redirectLink = (req, res, next) => {
  try {
    const id = req.params.id;
    Link
      .findOne({ shortURL: id })
      .then((result) => {
        return res.status(200).redirect(result.originalURL);
      })
      .catch((err) => res.status(400).json({ error: `$(err)` }));
  }
  catch (err) {
    return next(err);
  }
}

exports.getLinkInfo = (req, res, next) => {
  try {
    const id = req.params.id;
    Link
      .findOne({ shortURL: id })
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => res.status(400).json({ error: `$(err)` }));
  }
  catch (err) {
    return next(err);
  }
}
