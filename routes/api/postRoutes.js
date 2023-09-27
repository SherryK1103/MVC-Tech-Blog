const express = require('express');
const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {

    // IMPORTANT//!! Get all posts and JOIN with user data
    User.findAll({
        attributes: ['name', 'email'],

    }).then((data) => {
        res.json(data)
    }).catch((err) => {
        console.log('Error: ', err);
    })


    // IMPORTANT//!! Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    //!! Pass serialized data and session flag into template

    res.render('homepage', {
        projects,
        logged_in: req.session.logged_in
    });

});