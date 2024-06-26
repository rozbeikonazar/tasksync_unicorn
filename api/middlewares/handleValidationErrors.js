const {validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    // Handles validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next(); 
};


module.exports = handleValidationErrors