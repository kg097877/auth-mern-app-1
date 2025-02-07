const ensureAuthenticated = require('../Middlewares/Auth');
const router = require('express').Router();
const path = require('path'); //Import the path module


router.get('/', ensureAuthenticated, (req, res) => {
    // console.log('--- logged in user detail ---', req.user);
    const filePath = path.join(__dirname, 'frontend/public/homepage.html'); // Replace with your file path

    try {
        res.sendFile(filePath); //Send the file
    } catch (error) {
        console.error('Error sending file:', error);
        res.status(500).send('Error serving file'); //Handle errors appropriately
    }
});

module.exports = router;
