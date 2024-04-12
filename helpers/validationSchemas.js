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
                max: 100
            },
            errorMessage: "Workspace name must have a maximum length of 100 characters",
        }
    }
};

const createTaskValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: 'Task name is required',
        },
		isString: {
            errorMessage: "Task name must be a string!"
        },
    },
    description: {
        optional: true,
		isString: {
			errorMessage: 'Task description must be a string',
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
            errorMessage: "Task name must be a string!"
        },
		optional: true,
    },
    description: {
        optional: true,
		isString: {
			errorMessage: 'Task description must be a string',
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

const commentValidationSchema = {
    content: {
        isString: {
            errorMessage: "Comment content must be a string",
        },
        notEmpty: {
            errorMessage: "Comment content cannot be empty"
        },
        isLength: {
            options: {
                max: 300
            },
            errorMessage: "Comment content must have a maximum length of 300 characters",
        }
    }
}


module.exports = {
	registerUserValidationSchema, 
	workspaceValidationSchema,
	createTaskValidationSchema,
	updateTaskValidationSchema,
    commentValidationSchema,
}
