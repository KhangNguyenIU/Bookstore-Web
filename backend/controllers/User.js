const Book = require('../models/Book')
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library')
exports.showAllUser = async (req, res) => {
    let limit = parseInt(req.query.limit) || 8
    let page = parseInt(req.query.page) || 1
    var sortObject = {};
    const { sortType, sortDir } = req.body.sortMethod
    sortObject[sortType] = sortDir;
    User.find({role:0})
        .exec(async (err, listUser) => {
            if (err) {
                return res.status(401).json({
                    error: err
                })
            }

            await User.find({role:0})
                .limit(limit)
                .sort(sortObject)
                .skip((page - 1) * limit)
				.populate('likes', "_id title slug price discount photo")
			
                .exec((err,users) => {
                    if (err) {
                        return res.status(400).json({
                            error: err
                        })
                    }
                    res.json({ data: users, sir: sortDir, type: sortType, usersNumber: listUser.length })
                    //res.json({sort, side})
                })
        })
    

};


exports.deleteUser = async (req, res) => {
	await User.deleteMany({ username: req.body.username, role: 0 }).then(res.status(201).json({ deleted: true }));
};


exports.register = async (req, res) => {
	const { email, password } = req.body;
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!email || !password)
		return res.status(422).json({ error: "Please enter all the  fields" });
	if (re.test(String(email).toLowerCase()) == false)
		return res.status(422).json({ error: "Invalid email" });

	User.findOne({ email }, async(err, existedUser) => {
		if (existedUser) {
			return res.status(401).json({
				error: "Email is already existed"
			})
		}
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
	})


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
		const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
		res.cookie('token', token, { expiresIn: '10d' })
		const { _id, email, username, role, likes, photo } = result
		return res.json({
			token: token,
			user: { _id, email, username, role, likes, photo }
		});

	}
	else
		res.status(404).send({ error: "Email address or password is incorrect!" })
};
exports.takeUserById = async (req, res) => {
	User.findById(req.body._id)
		.populate("likes", "_id title slug photo price amount description discount writtenby")
		.exec((err, result) => {
			if (err) {
				return res.status(400).json({
					error: err
				})
			}
			res.json(result)
		})
};


exports.getLikedBook = (req, res) => {

	User.findById(req.user._id)
		.populate("likes", "_id title slug photo price amount description discount writtenby")
		.exec((err, result) => {
			if (err) {
				return res.status(400).json({
					error: err
				})
			}
			res.json(result)
		})
}
exports.getUserLikedBook = (req, res) => {

	User.findById(req.body._id)
		.populate("likes", "_id title slug photo price amount description discount writtenby")
		.exec((err, result) => {
			if (err) {
				return res.status(400).json({
					error: err
				})
			}
			res.json(result)
		})
}

exports.makeComment = (req, res) => {
	if(req.body.comment === ''){
		return res.json({error:'You cannot comment blank content'})
	}
	const commentContain = {
		comment: req.body.comment,
		postedby: req.user._id,
		date:Date.now()
	}

	Book.findOneAndUpdate({ slug: req.params.slug }, {
		$push: { comments: commentContain }
	}, { new: true }).exec((err, book) => {
		if (err || !book) {
			return res.status(400).json({
				error: "There are error while feedback. Please try again"
			})
		}

		User.findByIdAndUpdate(req.user._id, {
			$push: {
				comments: {
					comment: req.body.comment,
					commentedBook: book._id,
					date:Date.now()
				}
			}
		}, { new: true }).exec((err, user) => {
			if (err) {
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

			var {url, email, username, oldpassword, newpassword, reenterpassword } = fields
			/* if(re.test(String(email).toLocaleLowerCase())==false||String(username).trim().length==0||String(newpassword).trim()!=String(reenterpassword).trim()||(String(oldpassword).trim().length>0&&String(newpassword).trim().length==0)||(String(oldpassword).trim().length==0&&String(newpassword).trim().length>0))
			  return res.status(400).json({ error: "Something wrong while updating data, Please try again later" })*/
			if (oldpassword != null && String(oldpassword).trim().length > 0) {
				let hash = bcrypt.hashSync((oldpassword), 10);
				if (bcrypt.compareSync(oldpassword, oldUser.password) == false)
					return res.status(400).json({ error: "Password wrong" })
				else {
					if (newpassword == null || String(newpassword).trim().length == 0)
						return res.status(400).json({ error: "You should decleare new password" })
					else if (reenterpassword == null || String(newpassword).trim() != String(reenterpassword).trim())
						return res.status(400).json({ error: "Reenter password not correct" })
					oldUser.password = bcrypt.hashSync(String(newpassword).trim(), 10);
				}
			}
			if (email != null) {
				if (re.test(String(email).trim().toLowerCase()) == false)
					return res.status(400).json({ error: "Email format failed" })
				oldUser.email = String(email).trim();
			}
			if (username != null) {
				if (String(username).trim().length == 0)
					return res.status(400).json({ error: "Please enter new username" })
				oldUser.username = String(username).trim();
			}
			if(url!=null)
			{
				if(String(url).trim().length>0)
				{
					oldUser.photo=String(url);
				}
			}
			oldUser.save((err, result) => {
				if (err) {
					return res.status(400).json({
						error: err
					})
				}
				res.json({ msg: 'Update user information sucessfully', data: oldUser })
			})

		})
	})

};

const client = new OAuth2Client()
exports.googleLogin = (req, res) => {
	const idToken = req.body.tokenId;
	client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID }).then(response => {
		const { email_verified, name, email, jti } = response.payload
		if (email_verified) {
			User.findOne({ email }).exec((err, user) => {
				if (user) {
					// console.log(user)
					const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
					res.cookie('token', token, { expiresIn: '1d' });
					const { _id, email, role, username,likes, photo  } = user;
					return res.json({ token, user: { _id, email, role, username,likes, photo  }, msg:"old account" });
				} else {
					let password = jti;
					let username = email.split('@')[0]
					user = new User({ email, username, password });
					user.save((err, data) => {
						if (err) {
							return res.status(400).json({
								error: errorHandler(err)
							});
						}
						const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
						res.cookie('token', token, { expiresIn: '1d' });
						const { _id, email,  role, username } = data;
						return res.json({ token, user: { _id, email, role, username } ,msg:"new account"});
					});
				}
			});
		} else {
			return res.status(400).json({
				error: 'Google login failed. Try again.'
			});
		}
	})

}

exports.getMostByUser =(req, res)=>{
	User.find({role: 0})
	.populate('orders','_id total')
	.select('-likes -comments -password')
	
	.exec((err, data)=>{
		if(err){
			return res.json({
				error: err
			})
		}
		res.json({data})
	})
}