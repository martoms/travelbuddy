const yup = require('yup');

const ChangedPasswordSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup
    .string()
    .min(8, 'New password must be at least 8 characters long')
    .required('New password is required')
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must include at least one lowercase letter, one uppercase letter, one number, and one symbol'
      ),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm new password is required'),
});

const validateChangedPassword = async (req, res, next) => {
  try {
    await ChangedPasswordSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

// Module Export
module.exports = { validateChangedPassword };
