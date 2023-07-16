 export const env = {
	secret: process.env.SECRET || 'supersecret',
	AccessTokenExpiry: '1m',
	mongoURI: process.env.mongo_URI ||'mongodb://localhost:27017'
}