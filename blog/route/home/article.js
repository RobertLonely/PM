module.exports = (req, res) => {
  console.log(req.url);
  res.render("home/article");
};
