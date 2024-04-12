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

const workspaceValidationSchema = {
    name: {
        isString: {
            errorMessage: "Workspace name must be a string!"
        },
        notEmpty: {
            errorMessage: "Workspace name cannot be empty"
        },
        isLength: {
            options: {
                min: 1,
                max: 100
            },
            errorMessage: "Workspace name must be at least 5 charachters with a max of 100",
        }
    }
};

const createTaskValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: 'Name is required',
        },
		isString: {
            errorMessage: "Name must be a string!"
        },
    },
    description: {
        optional: true,
		isString: {
			errorMessage: 'Description must be a string',
		},
    },
    deadline: {
        optional: true,
        isISO8601: {
            errorMessage: 'Invalid deadline format',
        },
        toDate: true,
    },
    status: {
        optional: true,
        isIn: {
            options: [['Done', 'In progress', 'Not started']],
            errorMessage: 'Invalid status',
        },
    },
};

const updateTaskValidationSchema = {
    name: {
		isString: {
            errorMessage: "Name must be a string!"
        },
		optional: true,
    },
    description: {
        optional: true,
		isString: {
			errorMessage: 'Description must be a string',
		},
    },
    deadline: {
        optional: true,
        isISO8601: {
            errorMessage: 'Invalid deadline format',
        },
        toDate: true,
    },
    status: {
        optional: true,
        isIn: {
            options: [['Done', 'In progress', 'Not started']],
            errorMessage: 'Invalid status',
        },
    },
};


module.exports = {
	registerUserValidationSchema, 
	workspaceValidationSchema,
	createTaskValidationSchema,
	updateTaskValidationSchema
}
