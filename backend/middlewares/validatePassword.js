const yup = require('yup');

// Validate Password and ask for Confirmation
const validatePassword = async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  const passwordSchema = yup.string()
    .required('Please fill in with your Password.')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must include at least one lowercase letter, one uppercase letter, one number, and one symbol'
    );

  try {
    await passwordSchema.validate(password);
    if (password !== confirmPassword) {
      throw new Error('Passwords must match');
    }
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Module Export
module.exports = { validatePassword };
