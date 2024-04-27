import { body } from "express-validator";

export const gameCreateValidation = () => {
    return [
        body("title")
            .isString()
            .withMessage("There must to be a title")
            .isLength({ min: 5 })
            .withMessage("The title must have at least 5 characters"),
        body("rating")
            .isNumeric()
            .withMessage("The rating must be a number")
            .custom((value: number) => {
                if(value < 0 || value > 100) {
                    throw new Error("The rating must be between 0 and 100");
                }
                return true;
            }),
        body("description")
            .isString()
            .withMessage("There must to be a description")
            .isLength({ min: 5 })
            .withMessage("The description must have at least 5 characters"),
        body("platform")
            .isString()
            .withMessage("There must to be a platform")
            .isLength({ min: 2 })
            .withMessage("The platform must have at least 2 characters"),
        body("poster")
            .isURL()
            .withMessage("There image needs to be an URL")
        
    ]
}