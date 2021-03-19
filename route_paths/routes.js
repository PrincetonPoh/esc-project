module.exports = (app) => {
	app.use(`/users`, require(`../routes/users`));
	app.use(`/comments`, require(`../routes/users`));
	app.use(`/posts`, require(`../routes/users`));
};
