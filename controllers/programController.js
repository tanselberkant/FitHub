const Program = require('../models/Program');

exports.createProgram = async (req,res) => {
    try {        
        const program = await Program.create({
            name : req.body.name,
            recommendedWeek : req.body.recommendedWeek,
            contents : req.body.contents,
            category : req.body.category,
            user : req.session.userID
        })
        req.flash('success',`${program.name} has been created successfully`);
        res.status(201).redirect('/users/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
}

