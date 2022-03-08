"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.regValidator = void 0;
const functions_1 = require("../utils/functions");
const regValidator = ({ name, email, password }) => {
    if (!name || !email || !password)
        return 'Please fill all inputs';
    if (password.length < 6)
        return 'Password must be min 6 character';
    if (!(0, functions_1.validateEmail)(email))
        return 'Please write correct email';
};
exports.regValidator = regValidator;
const loginValidator = ({ email, password }) => {
    if (!email || !password)
        return 'Please fill all inputs';
    if (password.length < 6)
        return 'Password must be min 6 character';
    if (!(0, functions_1.validateEmail)(email))
        return 'Please write correct email';
};
exports.loginValidator = loginValidator;
