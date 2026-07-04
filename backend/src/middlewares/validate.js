// import { ApiError } from '../utils/ApiError.js';

// // Validates req[property] against a Joi schema, replacing it with the sanitized value.
// export const validate =
//   (schema, property = 'body') =>
//   (req, _res, next) => {
//     const { error, value } = schema.validate(req[property], {
//       abortEarly: false,
//       stripUnknown: true,
//       convert: true,
//     });
//     if (error) {
//       const details = error.details.map((d) => ({
//         field: d.path.join('.'),
//         message: d.message,
//       }));
//       return next(ApiError.badRequest('Validation failed', details));
//     }
//     req[property] = value;
//     next();
//   };

import { ApiError } from "../utils/ApiError.js";

export const validate =
  (schema, property = "body") =>
  async (req, _res, next) => {
    try {
      const value = await schema.validateAsync(req[property], {
        abortEarly: false,
        stripUnknown: true,
        convert: true,
      });

      req[property] = value;
      next();
    } catch (error) {
      if (error.isJoi) {
        const details = (error.details || []).map((d) => ({
          field: d.path.join("."),
          message: d.message,
        }));

        return next(ApiError.badRequest("Validation failed", details));
      }

      // Handles Joi.external() errors
      return next(ApiError.badRequest(error.message));
    }
  };