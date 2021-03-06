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

    const categorySlug = req.query.categories;
    const query = req.query.search;

    const category = await Category.findOne({slug: categorySlug});

    let filter = {};

    if(categorySlug) {
      filter = {category: category._id};
    } 

    if(!query && !categorySlug) {
      filter.name = "",
      filter.category = null;
    }

    const programs = await Program.find({
      $or:[
        {name: { $regex: '.*' + filter.name + '.*', $options: 'i'}},
        {category: filter.category}
        ]       
    }).sort('-createdAt');

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
    const user = await User.findById(req.session.userID);
    const program = await Program.findOne({slug : req.params.slug}).populate('user');
    const categories = await Category.find();    
    res.status(200).render('program', {
      page_name : 'programs',
      program,
      categories,
      user
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
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

exports.releaseProgram = async (req,res) => {
  try {
    
    const user = await User.findById(req.session.userID)
    await user.enrolledPrograms.pull({_id : req.body.program_id})
    await user.save();
    req.flash('error', 'You dropped a program successfully');
    res.status(200).redirect('/users/dashboard')
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
  }
}