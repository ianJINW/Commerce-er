require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const helmet = require("helmet");
const passport = require("passport");
const methodOverride = require("method-override");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();

const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const cartRoutes = require("./routes/cart");
const { sequelize } = require("./models");

app.use(
	session({
		secret: process.env.SESSION_SECRET || "mylilsecret",
		store: new SequelizeStore({
			db: sequelize
		}),
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
			checkExpirationInterval: 15 * 60 * 1000,
			sameSite: "strict",
			maxAge: 30 * 60 * 1000
		}
	})
);

app.use(flash());

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'"],
			imgSrc: [
				"'self'",
				"data:",
				"https://avatars.githubusercontent.com",
				"https://picsum.photos",
				"https://fastly.picsum.photos",
				"https://via.placeholder.com"
			],
			scriptSrc: [
				"'self'",
				"'unsafe-inline'",
				"'unsafe-eval'",
				"https://cdnjs.cloudflare.com"
			]
		}
	})
);

app.use((req, res, next) => {
	res.setHeader(
		"Content-Security-Policy",
		"default-src 'self'; img-src 'self' data: https://avatars.githubusercontent.com,		https://picsum.photos,https://fastly.picsum.photos,https://via.placeholder.com"
	);
	next();
});

app.use(methodOverride("_method"));

app.use((req, res, next) => {
	console.log("Flash before setting to res.locals:", req.flash());
	res.locals.user = req.user;
	res.locals.messages = req.flash();
	res.locals.isLoggedIn = req.isAuthenticated();
	next();
});

app.use("/api/", productRoutes);
app.use("/api/", cartRoutes);
app.use("/api/", orderRoutes);
app.use("/", authRoutes);

const PORT = process.env.PORT || 8080;

sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
});

process.on("SIGINT", (req, res) => {
	console.log("Server shutting down");
	process.exit();
});
