import 'dotenv/config';
import App from './app';
import apiRoute from './api/routes/api.route';

if (!process.env.SESSION_SECRET) {
    console.error('Please prove a SESSION_SECRET in your .env file.');
    process.exit(1);
}

if (!process.env.TOKEN) {
    console.error('Please prove a futureon TOKEN in your .env file.');
    process.exit(1);
}

const app = new App([new apiRoute()]);

app.listen();