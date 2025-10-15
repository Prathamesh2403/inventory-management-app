import express from "express";
import dotenv from "dotenv";
import cron from "node-cron"; // 1. Import cron
import nodemailer from "nodemailer"; // 2. Import nodemailer
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import Product from "./models/productModel.js"; // 3. Import Product Model

dotenv.config();

connectDB();

const app = express();

// CORS middleware for production
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// 1. Middleware to accept JSON data
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// 2. USE THE ROUTES
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// 3. Add the Cron Job for Low Stock Alerts '*/10 * * * * *'(10 sec) / "* * * * *"(1 min)
cron.schedule("*/30 * * * * *", async () => {
  console.log("Running cron job: Checking for low-stock products...");
  try {
    const lowStockProducts = await Product.find({
      $expr: { $lte: ["$quantity", "$lowStockThreshold"] },
    });

    if (lowStockProducts.length > 0) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const productList = lowStockProducts
        .map(
          (p) =>
            `<li>${p.name} (SKU: ${p.sku}) - Quantity: ${p.quantity}, Threshold: ${p.lowStockThreshold}</li>`
        )
        .join("");

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: "🔴 Low Stock Alert!",
        html: `
          <h3>The following products are running low on stock:</h3>
          <ul>
            ${productList}
          </ul>
          <p>Please restock them soon.</p>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Low stock alert email sent:", info.response);
        }
      });
    } else {
      console.log("No low-stock products found.");
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
