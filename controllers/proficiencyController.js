const Proficiency = require('../models/Proficiency');

exports.createProficiency = async (req, res) => {
  try {
    const proficiency = await Proficiency.create(req.body);
    req.flash('success', 'You added new proficiency successfully');
    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.deleteProficiency = async (req, res) => {
  try {
    await Proficiency.findByIdAndRemove(req.params.id);
    req.flash('error', 'You deleted a proficiency successfully');
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
