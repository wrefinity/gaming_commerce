"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
// custom packages 
const connect_1 = __importDefault(require("./database/connect"));
const product_1 = __importDefault(require("./routers/product"));
const category_1 = __importDefault(require("./routers/category"));
const auth_1 = __importDefault(require("./routers/auth"));
class Server {
    app;
    server;
    constructor() {
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
        dotenv_1.default.config();
        (0, connect_1.default)();
    }
    middlewareSetUp() {
        // Setting middlewares
        this.app.use((0, cors_1.default)({
            origin: "*",
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "UPDATE"],
        }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(body_parser_1.default.json());
        // defining the routes
        this.app.use("/api/products", product_1.default);
        this.app.use("/api/categories", category_1.default);
        this.app.use("/api/auth", auth_1.default);
        return this.server;
    }
}
const server = new Server().middlewareSetUp();
const PORT = process.env.SERVER_PORT || 5050;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=index.js.map