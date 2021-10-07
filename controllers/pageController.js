exports.getIndexPage = (req, res) => {
  res.status(200).render('index');
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about');
};

exports.getGalleryPage = (req, res) => {
  res.status(200).render('gallery');
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact');
};

exports.getServicesPage = (req, res) => {
  res.status(200).render('services');
};

exports.getTrainersPage = (req, res) => {
  res.status(200).render('trainer');
};
