const express = require('express');
const router = express.Router();
const {Post, Image, Comment, User, Hashtag} = require('../models');
const {Op} = require('sequelize');

router.get('/', async (req, res, next) => {
    try {
        const where = {};
        if (req.query?.lastId) {
            where.id = {
                [Op.lt] : parseInt(req.query.lastId)
            }
        }

        const pageCnt = req.body.pageCnt || 10;

        const posts = await Post.findAll({
            where,
            limit: pageCnt,
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC']
            ],
            include : [
                {
                    model: Image,
                },
                {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    },
                },
                {
                    model: User,
                    as: 'Likers',
                    attributes: ['id'],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: {
                                exclude: ['password']
                            },
                        }
                    ]
                },
                {
                    model: Post,
                    as: 'Retweet',
                    include: [{
                        model: User,
                        attributes: ['id', 'nickname']
                    },
                        {
                            model: Image
                        }
                    ]
                }
            ]
        })

        res.status(200).json(posts);
    } catch (err) {
        console.error(err)
        next(err)
    }
});

router.get('/user/:userId', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {id: parseInt(req.params.userId)}
        });

        if (!user) {
            return res.status(403).send('존재하지 않는 유저입니다.');
        }

        const where = {
            UserId: user.id
        };

        if (req.query?.lastId) {
            where.id = {
                [Op.lt] : parseInt(req.query.lastId)
            }
        }

        const pageCnt = parseInt(req.query.pageCnt) || 10;
        const posts = await Post.findAll({
            where,
            limit: pageCnt,
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC']
            ],
            include : [
                {
                    model: Image,
                },
                {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    },
                },
                {
                    model: User,
                    as: 'Likers',
                    attributes: ['id'],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: {
                                exclude: ['password']
                            },
                        }
                    ]
                },
                {
                    model: Post,
                    as: 'Retweet',
                    include: [{
                        model: User,
                        attributes: ['id', 'nickname']
                    },
                        {
                            model: Image
                        }
                    ]
                }
            ]
        })

        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/hashtag', async (req, res, next) => {
    try {
        const where = {};
        if (req.query.lastId) {
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
        }
        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [['createdAt', 'DESC']],
            include: [{
                model: Hashtag,
                where: { name: decodeURIComponent(req.query.tag) },
            }, {
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                    order: [['createdAt', 'DESC']],
                }],
            }, {
                model: User, // 좋아요 누른 사람
                as: 'Likers',
                attributes: ['id'],
            }, {
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }, {
                    model: Image,
                }]
            }],
        });

        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;