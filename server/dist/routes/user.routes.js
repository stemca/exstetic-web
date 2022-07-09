"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const dotenv_1 = require("dotenv");
const user_model_1 = require("../models/user.model");
const refreshToken_model_1 = require("../models/refreshToken.model");
const jwtConfig_1 = require("../config/jwtConfig");
(0, dotenv_1.config)({ path: __dirname + '../.env' });
const router = (0, express_1.Router)();
exports.userRouter = router;
/**
 * GET
 * http://localhost:3001/api/auth/get-users
 * Gets all users
 */
router.get('/api/auth/get-users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.User.find();
        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}));
/**
 * GET
 * http://localhost:3001/api/auth/get-user/:id
 * gets one user
 */
router.get('/api/auth/get-user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findById(req.params.id);
        res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}));
/**
 * POST
 * localhost:3001/api/auth/login
 * sends a request to login a user
 */
router.post('/api/auth/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findOne({ email: req.body.email });
        if (!user) {
            console.log('no user');
            return res
                .status(404)
                .send({ message: 'No user found with this email address.' });
        }
        let passwordIsValid = (0, bcrypt_1.compareSync)(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(400).send({ message: 'Invalid password' });
        }
        let _token = (0, jsonwebtoken_1.sign)({ id: user._id }, jwtConfig_1.jwtConfig.secret, {
            expiresIn: jwtConfig_1.jwtConfig.jwtExpiration,
        });
        let userRefreshToken = yield refreshToken_model_1.RefreshToken.createToken(user);
        return res.status(200).send({
            id: user._id,
            accessToken: _token,
            refreshToken: userRefreshToken,
        });
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
}));
/**
 * POST
 * Creates a user and registers them into database
 * http://localhost:3001/api/auth/register
 */
router.post('/api/auth/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new user_model_1.User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber || null,
        });
        yield user.save();
        const token = generateToken(user._id);
        return res.status(201).send({ token: token });
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
}));
/**
 * PATCH
 * localhost:3001/api/auth/update-user/:id
 * updates a user and returns the modified document
 */
// prettier-ignore
router.patch('/api/auth/update-user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findById(req.params.id);
        if (!user) {
            return res.status(400).send({ message: 'No user' });
        }
        // checks to see if the new password is the same as the old one by de-hashing and comparing
        if (!(0, bcrypt_1.compareSync)(req.body.password, user.password)) {
            req.body.password = yield (0, bcrypt_1.hash)(req.body.password, 8);
        }
        yield user_model_1.User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send({ message: 'user updated' });
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
    ;
}));
/**
 * DELETE
 * http://localhost:3001/api/auth/delete-user/:id
 * deletes a user
 */
// prettier-ignore
router.delete('/api/auth/delete-user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.User.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).send({ message: 'User deleted' }))
            .catch((err) => res.status(400).send({ message: err.message }));
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
}));
function generateToken(id) {
    return (0, jsonwebtoken_1.sign)({ id: id }, process.env.JWT_SECRET);
}
