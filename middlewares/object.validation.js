const joi = require("joi");
const { Utils } = require("./utils");
const utils = new Utils();

const objectValidation = joi.object({
    object_name: joi.string().required(),
    object_uri: joi.string().required(),
    object_size: joi.string().required(),
  });

  const validateObject = async (req, res, next) => {
    try {
      const validated = objectValidation.validate(req.body);
      
      if (validated.error) {
        res.status(400);
        return res.json({
          error: utils.getMessage("DATA_VALIDATION_ERROR"),
        });
      }
      next();
      
    } 
    catch (error) {
      console.log(error);
    }
};


module.exports = {
    validateObject
};