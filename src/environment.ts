 export const env = {
	secret: process.env.SECRET || 'supersecret',
	AccessTokenExpiry: '2m',
	mongoURI: process.env.mongo_URI ||'mongodb://localhost:27017'
}