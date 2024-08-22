import { connect } from 'mongoose';
import { Model, model, Schema } from 'mongoose';




(async () => {
    await connect(process.env.MONGO_URI);
    // #region model
    const schema = new Schema({
        id: {
            type: String,
            required: true
        },
        steam: {
            type: String,
            required: true
        },
        steamName: {
            type: String,
            required: true
        },

        trainStats: {
            type: Object,
            required: false,
            default: {}
        },
        dispatcherStats: {
            type: Object,
            required: false,
            default: {}
        },
        trainTime: {
            type: Number,
            required: false,
            default: 0
        },
        trainPoints: {
            type: Number,
            required: false,
            default: 0
        },
        trainDistance: {
            type: Number,
            required: false,
            default: 0
        },
        dispatcherTime: {
            type: Number,
            required: false,
            default: 0
        },
    });

    const MProfile = model('profile', schema);
    // #endregion
    const _ = await MProfile.find({});

    for (const x of _) {
        /*
            dispatcherTime: number;
    trainTime: number
    trainPoints: number
    trainDistance: number*/
        x.trainPoints = Object.values(x.trainStats).length === 1 ?
            Object.values(x.trainStats)[0].score :
            Object.values(x.trainStats).reduce((acc, curr) => acc + curr.score, 0)

        x.trainDistance = Object.values(x.trainStats).length === 1 ?
            Object.values(x.trainStats)[0].distance :
            Object.values(x.trainStats).reduce((acc, curr) => acc + curr.distance, 0)

        x.trainTime = Object.values(x.trainStats).length === 1 ?
            Object.values(x.trainStats)[0].trainTime :
            Object.values(x.trainStats).reduce((acc, curr) => acc + curr.trainTime, 0)

        x.dispatcherTime = Object.values(x.dispatcherStats).length === 1 ?
            Object.values(x.dispatcherStats)[0].time :
            Object.values(x.dispatcherStats).reduce((acc, curr) => acc + curr.time, 0)

        console.log('updated ' + x.steamName)
        await MProfile.updateOne({ id: x.id }, { trainPoints: x.trainPoints, trainDistance: x.trainDistance })
    };


    console.log('done!')
})();