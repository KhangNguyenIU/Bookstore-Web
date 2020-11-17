const Book = require('../models/Book')
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const _ = require('lodash');

exports.showAllUser = async (req, res) => {
	await User.find({}).exec().then(user => res.json(user));
};


exports.deleteUser = async (req, res) => {
	await User.deleteMany({ username: req.body.username, role: 0 }).then(res.status(201).json({ deleted: true }));
};


exports.register = async (req, res) => {
	const { email, password } = req.body;
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!email || !password )
		return res.status(422).json({ error: "Please enter all the  fields" });
	if (re.test(String(email).toLowerCase()) == false)
		return res.status(422).json({ error: "Invalid email" });
	let user = {};
	user.email = email;
	user.password = bcrypt.hashSync(password, 10);
	user.username = email.split('@')[0];
	//.catch(err=>console.log(err));
	let userModel = new User(user);
	await userModel.save(function (err, data) {
		if (err)
			return res.status(422).json({ error: "Error occurs while processing, please try again." });
		else
			return res.status(201).json({ msg: "Register account successly" });
	});
};


exports.login = async (req, res) => {
	let user = {};
	user.email = req.body.email;
	let hash = bcrypt.hashSync(req.body.password, 10);
	let userModel = new User(user);
	const result = await User.findOne({
		email: user.email
	});
	if (result && bcrypt.compareSync(req.body.password, result.password)) {
		const token = jwt.sign({ _id: result._id }, "kiet2606070",{expiresIn:'1d'});
		res.cookie('token', token,{expiresIn:'10d'})
		const { _id, email, username, role,likes,photo } = result
		return res.json({
			token: token,
			user: { _id, email, username, role, likes ,photo}
		});

	}
	else
		res.status(404).send({ error: "Email address or password is incorrect!" })
};

exports.getLikedBook =(req, res)=>{

	User.findById(req.user._id)
	.populate("likes","_id title slug photo price amount description discount writtenby")
	.exec((err, result)=>{
		if(err){
			return res.status(400).json({
				error: err
			})
		}
		res.json(result)
	})
}

exports.makeComment =(req, res)=>{
	const commentContain ={
		comment : req.body.comment,
		postedby :  req.user._id
	}

	Book.findOneAndUpdate(req.params.slug,{
		$push:{comments: commentContain}
	},{new: true}).exec((err, book)=>{
		if(err){
			return res.status(400).json({
				error: err
			})
		}

		User.findByIdAndUpdate(req.user._id,{
			$push :{comments:{
				comment: req.body.comment,
				commentedBook: book._id
			}}
		},{new: true}).exec((err, user)=>{
			if(err){
				return res.status(400).json({
					error: err
				})
			}
			res.json({
				book, user
			})
		})
	})
}
exports.userUpdate = async (req, res) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    User.findById(req.user._id).exec((err, oldUser) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        let user = {};
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            //let bookSlugBeforeMerge = oldBook.slug
		  //  oldUser = _.merge(oldUser, fields)
		  //oldUser = _.merge(oldUser, fields)

			var {email,username,oldpassword,newpassword,reenterpassword} = fields
		   /* if(re.test(String(email).toLocaleLowerCase())==false||String(username).trim().length==0||String(newpassword).trim()!=String(reenterpassword).trim()||(String(oldpassword).trim().length>0&&String(newpassword).trim().length==0)||(String(oldpassword).trim().length==0&&String(newpassword).trim().length>0))
			 return res.status(400).json({ error: "Something wrong while updating data, Please try again later" })*/
			if(oldpassword!=null&&String(oldpassword).trim().length>0)
			 {
				let hash = bcrypt.hashSync((oldpassword), 10);
				if (bcrypt.compareSync(oldpassword, oldUser.password)==false)
				 return res.status(400).json({ error: "Password wrong" })
				else
				{
					if(newpassword==null||String(newpassword).trim().length==0)
					 return res.status(400).json({ error: "You should decleare new password" })
					else if(reenterpassword==null||String(newpassword).trim()!=String(reenterpassword).trim())
					 return res.status(400).json({ error: "Reenter password not correct" })
					oldUser.password = bcrypt.hashSync(String(newpassword).trim(), 10);
				}
			 }
			if(email!=null)
			{
				if(re.test(String(email).trim().toLowerCase())==false)
				 return res.status(400).json({ error: "Email format failed" })
			 oldUser.email =String(email).trim();
			}
			if(username!=null)
			{
				if(String(username).trim().length==0)
				 return res.status(400).json({ error: "Please enter new username" })
			 oldUser.username =String(username).trim();
			}
            oldUser.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    })
                }
                res.json({ msg: 'Update user information sucessfully',data:oldUser })
            })

        })
    })

};