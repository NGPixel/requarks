module.exports = function(req, res, next) {

	if (req.baseUrl != '/login' && !req.isAuthenticated()) {
		return res.redirect('/login');
	}

	// Is user authorized

	db.User.findOne({
		where: {
			email: req.user._json.email
		}
	}).then((usr) => {
		if(usr) {

			//-> First time login?

			if(usr.username === null) {
				usr.username = req.user._json.user_id;
				usr.firstName = req.user._json.given_name;
				usr.lastName = req.user._json.family_name;
				usr.save();
			}

			res.locals.usr = usr;
			res.locals.authusr = req.user._json;

			next();

		} else {
			return res.redirect('/unauthorized');
		}
	}).catch((err) => {
		return res.redirect('/unauthorized');
	});

}