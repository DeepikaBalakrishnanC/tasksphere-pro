"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs_1 = require("./graphql/typeDefs");
const resolvers_1 = require("./graphql/resolvers");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const health_1 = require("./serverless/health");
const projectDigest_1 = require("./serverless/projectDigest");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", authRoutes_1.default);
app.get("/api/health", health_1.healthCheck);
app.get("/api/serverless/project-digest", projectDigest_1.projectDigest);
mongoose_1.default.connect(process.env.MONGO_URI
    || "").then(() => {
    console.log("MongoDB Connected");
});
async function startServer() {
    const apolloServer = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.typeDefs,
        resolvers: resolvers_1.resolvers
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app: app,
        path: "/graphql"
    });
    app.listen(5001, () => {
        console.log("Server running at http://localhost:5001/graphql");
    });
}
startServer();
