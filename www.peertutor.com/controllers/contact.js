const express = require('express');

module.exports = {
    registerRouter(){
        const router = express.Router();
        
        router.get('/', (req, res) => {
          res.render('contact');
        });
        
        return router;
    }
}
