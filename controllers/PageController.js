exports.getHomePage = async (req, res) => {
  try {
    res.status(200).render('index');
  } catch (error) {
    res.status(400).json({
      status: 'Home Page not loaded',
      error,
    });
  }
};

exports.getAboutPage = (req, res) => {
  try {
    res.status(200).render('about');
  } catch (error) {
    res.status(400).json({
      status: 'About Page not loaded',
      error,
    });
  }
};

exports.getContactPage = (req, res) => {
  try {
    res.status(200).render('contact');
  } catch (error) {
    res.status(400).json({
      status: 'Contact Page not loaded',
      error,
    });
  }
};

exports.getAddPage = (req, res) => {
  try {
    res.status(200).render('add');
  } catch (error) {
    res.status(400).json({
      status: 'Add Page not loaded',
      error,
    });
  }
};
