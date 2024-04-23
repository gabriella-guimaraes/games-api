const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

export default {
    port: 3000,
    dbUrl: `mongodb+srv://${dbUser}:${dbPassword}@cluster0.afndo91.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
};