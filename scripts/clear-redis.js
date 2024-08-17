import { createClient } from 'redis';

createClient({url: process.env.REDIS_URI}).connect().then(async (x) => {
    await x.json.del('stations_occupied');
    await x.json.del('stations');
    await x.json.del('trains');
    await x.json.del('trains_occupied');
    console.log('done')
    process.exit(1);
})