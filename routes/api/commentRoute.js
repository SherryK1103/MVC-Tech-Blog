const express = require('express');
const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all comments
router.get('/', (req, res) => {
    Comment.findAll()
        .then((comments) => {
            res.json(comments);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a new comment
router.post('/', (req, res) => {
    Comment.create({
        text: req.body.text,
    })
})