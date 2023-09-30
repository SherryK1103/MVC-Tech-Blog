const express = require('express');
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new comment
router.post('/', async (req, res) => {
    try {
        // Create the comment
        const newComment = await Comment.create({
            comment_content: req.body.comment_content,
            user_id: req.body.user_id,
            post_id: req.body.post_id,
        });

        // Fetch associated user
        const user = await User.findByPk(req.body.user_id);

        // Response JSON object
        const response = {
            id: newComment.id,
            comment_content: newComment.comment_content,
            date_created: newComment.date_created,
            name: user ? user.name : null,
        };
        res.status(201).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create a comment' });
    }
});

module.exports = router;