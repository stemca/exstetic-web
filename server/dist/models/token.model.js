"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const mongoose_1 = require("mongoose");
const tokenSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});
const Token = (0, mongoose_1.model)('Token', tokenSchema);
exports.Token = Token;
