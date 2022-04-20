const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  name: { type: "string", min: 5, max: 255 },
  phone: { type: "string", min: 10, max: 15 },
};

const check = v.compile(schema);

const validation = (req, res, next) => {
  let result = check(req.body);
  if (result.length) {
    return res.status(400).json({
      status: "failed",
      message: result,
    });
  }

  next();
};

module.exports = validation;
