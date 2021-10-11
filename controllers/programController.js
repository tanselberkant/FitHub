const Program = require('../models/Program');
const Category = require('../models/Category');
const User = require('../models/User');

exports.createProgram = async (req, res) => {
  try {
    const program = await Program.create({
      name: req.body.name,
      recommendedWeek: req.body.recommendedWeek,
      contents: req.body.contents,
      category: req.body.category,
      user: req.session.userID,
    });
    req.flash('success', `${program.name} has been created successfully`);
    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.deleteProgram = async (req, res) => {
  try {
    await Program.findOneAndRemove({ slug: req.params.slug });

    req.flash('error', `Program has been removed successfully`);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getAllPrograms = async (req,res) => {
  try {
    const programs = await Program.find();
    const categories = await Category.find();
    res.status(200).render('programs', {
      page_name : 'programs',
      programs,
      categories
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
  }
}

exports.getProgram = async (req,res) => {
  try {
    const program = await Program.findOne({slug : req.params.slug}).populate('user');
    const categories = await Category.find();    
    res.status(200).render('program', {
      page_name : 'programs',
      program,
      categories
    })
  } catch (error) {
    
  }
}

exports.enrollProgram = async (req,res) => {
  try {
    const user = await User.findById(req.session.userID)
    await user.enrolledPrograms.push({_id: req.body.program_id})
    await user.save();

    req.flash('success', 'You have enrolled program successfully');    
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
  }
}