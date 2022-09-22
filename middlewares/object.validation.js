const joi = require("joi");
const { Utils } = require("./utils");
const utils = new Utils();

const fileObjectValidation = joi.object({
    objectName: joi.string().required(),
    objectUri: joi.string().required(),
    // objectSize: joi.number().required(),
    // extension: joi.string().required(),
    category: joi.string().required(),
  });

  const validateFileObject = async (req, res, next) => {
    try {
      const validated = fileObjectValidation.validate(req.files);
      // console.log(req.files);
      if (validated.error) {
        res.status(400);
        // console.log(validated.error)
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
    validateFileObject
};