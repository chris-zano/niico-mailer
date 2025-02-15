
import authRoutes from './routes/auth/auth.routes.js';

export const routes = (app) => {
    app.use((req, res, next) => {
        console.log(`Request received: ${req.method} ${req.url}`);

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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