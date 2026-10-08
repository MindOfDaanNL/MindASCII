function validateGenerateInput(input) {
  const errors = [];

  if (!input) {
    return { valid: false, errors: ['Input is required'] };
  }

  if (input.type && typeof input.type !== 'string') {
    errors.push('type must be a string');
  }

  if (input.text !== undefined && typeof input.text !== 'string') {
    errors.push('text must be a string');
  }

  if (input.font !== undefined && typeof input.font !== 'string') {
    errors.push('font must be a string');
  }

  if (input.width !== undefined) {
    if (typeof input.width !== 'number' || input.width < 1 || input.width > 1000) {
      errors.push('width must be a number between 1 and 1000');
    }
  }

  if (input.height !== undefined && input.height !== null) {
    if (typeof input.height !== 'number' || input.height < 1 || input.height > 200) {
      errors.push('height must be a number between 1 and 200');
    }
  }

  if (input.alignment !== undefined) {
    const valid = ['left', 'center', 'right', 'justified'];
    if (!valid.includes(input.alignment)) {
      errors.push('alignment must be one of: ' + valid.join(', '));
    }
  }

  if (input.vAlign !== undefined) {
    const valid = ['top', 'center', 'bottom'];
    if (!valid.includes(input.vAlign)) {
      errors.push('vAlign must be one of: ' + valid.join(', '));
    }
  }

  if (input.border !== undefined && typeof input.border !== 'string') {
    errors.push('border must be a string');
  }

  if (input.padding !== undefined) {
    if (typeof input.padding !== 'number' || input.padding < 0 || input.padding > 50) {
      errors.push('padding must be a number between 0 and 50');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

function validationResult(req, res, next) {
  const result = validateGenerateInput(req.body);
  if (!result.valid) {
    return res.status(400).json({ success: false, errors: result.errors });
  }
  next();
}

module.exports = {
  validateGenerateInput,
  validationResult
};
