exports.getHomePage = (req, res) => {
  try {
    res.status(200).render('index');
  } catch (error) {
    res.status(400).json({
      status: 'Home Page not loaded',
      error,
    });
  }
};
