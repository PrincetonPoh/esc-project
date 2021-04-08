module.exports = (app) => {
	app.use(`/users`, require(`../routes/users`));
	app.use(`/comments`, require(`../routes/comments`));
	app.use(`/posts`, require(`../routes/posts`));
	app.use(`/auth`, require(`../routes/auth`));
	app.use(`/locations`, require(`../routes/locations`));
};
