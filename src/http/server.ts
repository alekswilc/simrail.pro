import express from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { StationsRoute } from './routes/stations.js';
import { TrainsRoute } from './routes/trains.js';
import { ProfilesRoute } from './routes/profile.js';
import { LeaderboardRoute } from './routes/leaderboard.js';
import { MProfile } from '../mongo/profile.js';

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
        app.use('/trains/', TrainsRoute.load());
        app.use('/profiles/', ProfilesRoute.load());
        app.use('/leaderboard/', LeaderboardRoute.load())


        app.get('/migrate', async () => {
            const _ = await MProfile.find({});

            _.forEach(async(x) => {
                x.trainPoints = Object.values(x.trainStats).length === 1 ?
                Object.values(x.trainStats)[0].score : 
                Object.values(x.trainStats).reduce((acc, curr) => acc + curr.score, 0)

                x.trainDistance = Object.values(x.trainStats).length === 1 ?
                Object.values(x.trainStats)[0].distance : 
                Object.values(x.trainStats).reduce((acc, curr) => acc + curr.distance, 0)

                await MProfile.updateOne({ id: x.id }, { trainPoints: x.trainPoints, trainDistance: x.trainDistance })
            })

            
        })

        app.listen(2005);
    }
}