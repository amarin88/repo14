import swaggerJSDoc from "swagger-jsdoc";
import __dirname from "../../dirname.js";

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.1",
        info: {
            title: "E-commerce Api Documentation",
            version: "1.0.1",
            description: "Practicing from Coderhouse Backend´s course"
        },
    },
    apis: [`${__dirname}/src/docs/**/*.yaml`]
};

export const specs = swaggerJSDoc(swaggerOptions);

