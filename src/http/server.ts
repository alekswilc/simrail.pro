import express from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { StationsRoute } from './routes/stations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export class ApiModule {
    public static load() {
        const app = express();

        app.set('view engine', 'ejs');
        app.set('views', __dirname + '/views')

        app.get('/', (_, res) => res.render('home'));
       
        // backward compatible
        app.get('/details/:id', (req, res) => res.redirect('/stations/details/'+req.params.id));

        app.use('/stations/', StationsRoute.load());

        app.listen(2005);
    }
}