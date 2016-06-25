"use strict";

var express = require('express'),
	 _ = require('lodash'),
	 slug = require('slug');
var router = express.Router();

// ----------------------------------------------------
// TEAMS - Check if user is part of a team
// ----------------------------------------------------

router.get('/', function(req, res, next) {

	db.Team.findOne({
		members: res.locals.usr._id
	}, 'slug').then((fteam) => {

		if(fteam) {
			res.redirect('/teams/' + fteam.slug);
		} else {
			res.render('teams/default', {
				navbar_active: 'teams',
				msg: lang.t('teams:noteam')
			});
		}

		return true;
		
	}).catch((err) => {
		throw err;
	});

});

// ----------------------------------------------------
// TEAMS - Create new team
// ----------------------------------------------------

router.get('/create', function(req, res, next) {

	db.Team.count({
		members: res.locals.usr._id
	}).then((teamCount) => {
		res.render('teams/create', {
			navbar_active: 'teams',
			page_script: 'teams',
			teamCount
		});
		return true;
	}).catch((err) => {
		throw err;
	});

});

router.post('/create', function(req, res, next) {

	//-> Validate form

	req.sanitizeBody('team_create_name').trim();
	req.checkBody('team_create_name', lang.t('form.errors.required')).notEmpty();
	req.checkBody('team_create_name', lang.t('form.errors.length', {min: 3, max: 50})).isLength({min: 3, max: 50});
	req.checkBody('team_create_name', lang.t('form.errors.unique')).isUniqueTeam();

	req.sanitizeBody('team_create_desc').trim();
	req.checkBody('team_create_desc', lang.t('form.errors.required')).notEmpty();
	req.checkBody('team_create_desc', lang.t('form.errors.length', {min: 3, max: 50})).isLength({min: 3, max: 50});

	// Create Team

	req.asyncValidationErrors().then(() => {

		let teamSlug = slug(req.body.team_create_name, {lower: true});
		
		db.Team.create({
			_id: db.ObjectId(),
			name: req.body.team_create_name,
			slug: teamSlug,
			description: req.body.team_create_desc,
			memberCount: 1,
			members: [ res.locals.usr._id ]
		}).then((team) => {
			res.redirect('/teams/' + teamSlug);
		}).catch((err) => {
			throw err;
		});

	}).catch(function(formErrors) {

		db.Team.count({
			members: res.locals.usr._id
		}).then((teamCount) => {
			res.render('teams/create', {
				navbar_active: 'teams',
				teamCount,
				formErrors
			});
		});

	});

});

// ----------------------------------------------------
// TEAMS - Display team
// ----------------------------------------------------

router.get('/:slug', function(req, res, next) {

	//-> Load all user's teams

	db.Team.find({
		members: res.locals.usr._id
	}).then((teams) => {

		//-> Make sure user has access to the requested team

		let teamSlugs = _.map(teams, 'slug');

		if(_.includes(teamSlugs, req.params.slug)) {
			let team = _.find(teams, ['slug', req.params.slug]); 
			res.render('teams/team', {
				navbar_active: 'teams',
				page_script: 'teams',
				teams,
				team
			});
		} else {
			res.render('teams/default', {
				navbar_active: 'teams',
				msg: lang.t('teams:unauthorized')
			});
		}

		return true;

	}).catch((err) => {
		throw err;
	});

});

// ----------------------------------------------------
// TEAMS - Edit team
// ----------------------------------------------------

router.get('/:slug/edit', function(req, res, next) {

	//-> Load all user's teams

	db.Team.find({
		members: res.locals.usr._id
	}).then((teams) => {

		//-> Make sure user has access to the requested team

		let teamSlugs = _.map(teams, 'slug');

		if(_.includes(teamSlugs, req.params.slug)) {
			let team = _.find(teams, ['slug', req.params.slug]); 
			res.render('teams/edit', {
				navbar_active: 'teams',
				page_script: 'teams',
				team
			});
		} else {
			res.render('teams/default', {
				navbar_active: 'teams',
				msg: lang.t('teams:unauthorized')
			});
		}

		return true;

	}).catch((err) => {
		throw err;
	});

});

router.post('/:slug/edit', function(req, res, next) {

	//-> Load all user's teams

	db.Team.findOne({
		slug: req.params.slug,
		members: res.locals.usr._id
	}).then((team) => {

		//-> Make sure user has access to the requested team

		if(team) {

			//-> Validate form

			req.sanitizeBody('team_edit_name').trim();
			let teamSlug = slug(req.body.team_edit_name, {lower: true});
			req.checkBody('team_edit_name', lang.t('form.errors.required')).notEmpty();
			req.checkBody('team_edit_name', lang.t('form.errors.length', {min: 3, max: 50})).isLength({min: 3, max: 50});
			if(team.slug !== teamSlug) {
				req.checkBody('team_edit_name', lang.t('form.errors.unique')).isUniqueTeam();
			}

			req.sanitizeBody('team_edit_desc').trim();
			req.checkBody('team_edit_desc', lang.t('form.errors.required')).notEmpty();
			req.checkBody('team_edit_desc', lang.t('form.errors.length', {min: 3, max: 50})).isLength({min: 3, max: 50});

			// Save edits

			req.asyncValidationErrors().then(() => {
				
				team.set('name', req.body.team_edit_name);
				team.set('description', req.body.team_edit_desc);
				team.set('slug', teamSlug);

				return team.save().then(() => {
					return res.redirect('/teams/' + teamSlug);
				}).catch((err) => {
					throw err;
				});

			}).catch(function(formErrors) {

				res.render('teams/edit', {
					navbar_active: 'teams',
					page_script: 'teams',
					team,
					formErrors
				});

			});

		} else {
			res.render('teams/default', {
				navbar_active: 'teams',
				msg: lang.t('teams:unauthorized')
			});
		}

		return true;

	}).catch((err) => {
		throw err;
	});

});

module.exports = router;
