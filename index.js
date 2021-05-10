const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv')


// Body Parser
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));
app.use('/likes', require('./routes/likes'));
app.use('/comments', require('./routes/comments'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));