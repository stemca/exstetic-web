"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
require('dotenv').config();
exports.jwtConfig = {
    secret: process.env.JWT_SECRET,
    jwtExpiration: 3600,
    jwtRefreshExpiration: 86400,
};
