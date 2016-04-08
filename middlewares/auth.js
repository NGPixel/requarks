module.exports = function(req, res, next) {

	if (req.baseUrl != '/login' && !req.isAuthenticated()) {
		return res.redirect('/login');
	}

	// Is user authorized

	db.User.findOne({
		where: {
			$or: [
				{
					email: req.user._json.email
				},
				{
					username: req.user._json.user_id
				}
			]
		}
	}).then((usr) => {
		if(usr) {

			//-> Update user info if needed
			//   (doesn't actually save to DB if nothing changed)

			usr.username = req.user._json.user_id;
			usr.firstName = req.user._json.given_name;
			usr.lastName = req.user._json.family_name;
			usr.email = req.user._json.email;
			usr.save();

			res.locals.usr = usr;
			res.locals.authusr = req.user._json;

			next();

		} else {
			return res.redirect('/unauthorized');
		}
		return null;
	}).catch((err) => {
		return res.redirect('/unauthorized');
	});

};