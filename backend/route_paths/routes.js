module.exports = (app) => {
	app.use(`/users`, require(`../routes/users`));
	app.use(`/comments`, require(`../routes/comments`));
	app.use(`/posts`, require(`../routes/posts`));
};
