
import authRoutes from './routes/auth/auth.routes.js';
import cors from 'cors';

export const routes = (app) => {

    // app.use(cors());

    app.use((req, res, next) => {
        console.log("Request received:", req.method, req.url);

        res.header("Access-Control-Allow-Origin", "*"); // Change "*" to your frontend URL if needed
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

        if (req.method === "OPTIONS") {
            return res.sendStatus(204); // No Content
        }

        next();
    });

    /* all valid routes should start here */
    app.use("/auth", authRoutes);

    /* all valid routes should end here */


    app.use("*", (req, res) => {
        res.status(404).json(
            {
                message: "Route not found",
                status: 404,
                data: null
            }
        )
    })
}