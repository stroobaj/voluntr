export default () => ({
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/voluntr-db',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default_secret',
    expiresIn: '1h',
  },
});
