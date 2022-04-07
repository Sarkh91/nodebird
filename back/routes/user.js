const express = require('express');
const {User, Post, Comment, Image} = require('../models');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares')
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        if (req.user) {
            const user = await User.findOne({
                where: {
                    id: req.user.id
                }
            })

            const fullUserWithoutPassword = await User.findOne({
                where: {id: user.id},
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {
                        model: Post,
                        attributes: ['id']
                    },
                    {
                        model: User,
                        attributes: ['id'],
                        as: 'Followings'
                    },
                    {
                        model: User,
                        attributes: ['id'],
                        as: 'Followers'
                    },

                ]
            });

            res.status(200).json(fullUserWithoutPassword);
        } else {
            res.status(200).json(null);
        }

    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/followers', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {id: req.user.id}
        });

        if (!user) {
            return res.status(403).send('존재하지 않는 유저입니다.');
        }

        const followers = await user.getFollowers();
        res.status(200).json(followers);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/followings', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {id: req.user.id}
        });

        if (!user) {
            return res.status(403).send('존재하지 않는 유저입니다.');
        }

        const followings = await user.getFollowings();
        res.status(200).json(followings);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {id: parseInt(req.params.id)}
        })

        if (!user) {
            return res.status(403).send('존재하지 않는 유저입니다.');
        }

        const fullUserWithoutPassword = await User.findOne({
            where: {id: user.id},
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: Post,
                    attributes: ['id']
                },
                {
                    model: User,
                    attributes: ['id'],
                    as: 'Followings'
                },
                {
                    model: User,
                    attributes: ['id'],
                    as: 'Followers'
                },

            ]
        });

        if (fullUserWithoutPassword) {
            const data = fullUserWithoutPassword.toJSON();
            data.Posts = data.Posts.length;
            data.Followers = data.Followers.length;
            data.Followings = data.Followings.length;

            res.status(200).json(data);
        } else {
            res.status(404).send('존재하지 않는 유저입니다.');
        }

    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
    try {
        const {email, nickname, password} = req.body;
        const exUser = await User.findOne({
            where: {
                email
            }
        });


        if (exUser) {
            return res.status(403).send('이미 사용중인 아이디 입니다.');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nickname,
            password: hashedPassword
        });

        res.status(201).send('ok');
    } catch (err) {
        console.error(err);
        next(err)
    }
})

router.delete('/', (req, res) => {
    res.json({id: 1})
})

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }

        if (info) {
            return res.status(401).send(info.reason);
        }

        return req.login(user, async (loginErr) => {
            if (loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }

            const fullUserWithoutPassword = await User.findOne({
                where: {id: user.id},
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {
                        model: Post,
                        attributes: ['id']
                    },
                    {
                        model: User,
                        as: 'Followings',
                        attributes: ['id']
                    },
                    {
                        model: User,
                        as: 'Followers',
                        attributes: ['id']
                    },

                ]
            });

            return res.status(200).json(fullUserWithoutPassword);
        })
    })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
})

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try {
        await User.update({
            nickname: req.body.nickname
        }, {
            where: {id: req.user.id}
        })

        res.status(200).json({nickname: req.body.nickname});
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/follow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {id: req.body.id}
        });

        if (!user) {
            return res.status(403).send('존재하지 않는 유저입니다.');
        }

        user.addFollowers(req.user.id);

        res.status(200).json({UserId: user.id});
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/unfollow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {id: req.body.id}
        });

        if (!user) {
            return res.status(403).send('존재하지 않는 유저입니다.');
        }

        user.removeFollowers(req.user.id);

        res.status(200).json({UserId: user.id});
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {id: req.user.id}
        });

        if (!user) {
            return res.status(403).send('존재하지 않는 유저입니다.');
        }

        await user.removeFollowers(parseInt(req.params.userId));
        res.status(200).json({userId: parseInt(req.params.userId)});
    } catch (err) {
        console.error(err);
        next(err);
    }
});


module.exports = router;