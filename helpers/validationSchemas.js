const registerUserValidationSchema = {
	username: {
		isLength: {
			options: {
				min: 5,
				max: 32,
			},
			errorMessage:
				"Username must be at least 5 characters with a max of 32 characters",
		},
		notEmpty: {
			errorMessage: "Username cannot be empty",
		},
		isString: {
			errorMessage: "Username must be a string!",
		},
	},
	display_name: {
		notEmpty: {
            errorMessage: "Display Name cannot be empty"
        },
	},
	password: {
				isLength: {
			options: {
				min: 8,
				max: 32,
			},
			errorMessage:
				"Password must be at least 8 characters with a max of 32 characters",
		},
		notEmpty: {
			errorMessage: "Password cannot be empty",
		},
		isString: {
			errorMessage: "Password must be a string!",
		},
	},
};

module.exports = registerUserValidationSchema;
