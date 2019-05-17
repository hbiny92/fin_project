//클라이언트 요청에 따라 응답할 부분

const express = require('express');
const router = express.Router();


/* GET layout page. */
router.get('/', function(req, res, next) {
    res.render('layout',
        { title: 'layout' });

});


module.exports = router;
