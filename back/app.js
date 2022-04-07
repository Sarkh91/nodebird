const express = require('express');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const passport = require('passport');
const db = require('./models');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const passportConfig = require('./passport');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');

if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'))
    app.use(hpp());
    app.use(helmet());
} else {
    app.use(morgan('dev'));
}


dotenv.config();
db.sequelize.sync()
    .then(() => {
        console.log('DB 연결 성공')
    })
    .catch(console.error);

let origin;
if (process.env.NODE_ENV === 'production'){
    origin = ['nodebird.com', 'http://13.125.199.145'];
} else {
    origin = true
}

app.use(cors({
    origin,
    credentials: true
}));

app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());

passportConfig();

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);


app.listen(80, () => {
    console.log('서버 실행 중')
});