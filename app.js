require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Inventory Management API is Running"
    });
});

// Product routes
app.use("/api/products", productRoutes);

// Invalid route handler
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Centralized error handler
app.use(errorHandler);

// Connect database and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();