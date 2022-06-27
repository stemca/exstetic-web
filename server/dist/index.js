"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = require("mongoose");
const Item_routes_1 = require("./routes/Item.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// prettier-ignore
(0, mongoose_1.connect)(process.env.MONGO_URI, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Connected to database');
}).catch((error) => {
    console.log('Connection error: ', error);
    process.exit();
});
// routes
app.use(Item_routes_1.itemRouter);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
