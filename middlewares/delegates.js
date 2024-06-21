import { body, validationResult } from "express-validator";

export const passwordResetValidator = (req, res, next) => {
  //   body("newPassword", "Password is required").notEmpty();
  //   body("newPassword")
  //     .isLength({ min: 6 })
  //     .withMessage("Password must be at least 6 chars long")
  //     .matches(/\d/)
  //     .withMessage("must contain a number")
  //     .withMessage("Password must contain a number");

  //   // check for errors
  //   const errors = validationResult(req);
  //   // if error show the first one as they happen
  //   if (errors) {
  //     const firstError = errors.map((error) => error.msg)[0];
  //     return res.status(400).json({ error: firstError });
  //   }
  //   // proceed to next middleware or ...
  //   next();
  const { newPassword } = req.body;

  if (newPassword.length < 6)
    return res.status(400).send("Password should be longer than 6 characters!");

  next();
};
