import { useTranslation } from 'react-i18next';
import { TLeaderboardRecord } from '../../types/leaderboard.ts';
import { Link } from 'react-router-dom';

const trains: TLeaderboardRecord[] = { "success": true, "data": { "records": [{ "id": "055d3e33-2623-4654-80dd-4d3516cfeccc", "steam": "76561198159312038", "steamName": "_JeNTeK_", "trainTime": 4416784286, "trainPoints": 978915, "trainDistance": 2467309, "dispatcherTime": 0, "trainStats": { "Pendolino (ED250)": { "distance": 2467309, "score": 978915, "time": 4416784286 } } }, { "id": "16b54f4a-0826-4005-b67d-2ab57d74ffeb", "steam": "76561199101984415", "steamName": "tomsobczak35", "trainTime": 4841000336, "trainPoints": 572048, "trainDistance": 8066546, "dispatcherTime": 0, "trainStats": { "Pendolino (ED250)": { "distance": 8066546, "score": 572048, "time": 4841000336 } } }, { "id": "a9050fd0-f3cd-45c9-8087-44948da79b00", "steam": "76561198258359953", "steamName": "Kashameister.", "trainTime": 4838762785, "trainPoints": 353232, "trainDistance": 10274248, "dispatcherTime": 0, "trainStats": { "EU07": { "distance": 10274248, "score": 353232, "time": 4838762785 } } }, { "id": "2a08cadb-bacb-494a-8d09-0ef1870f1057", "steam": "76561198200906855", "steamName": "Nesto Ash Leo", "trainTime": 4411743671, "trainPoints": 110438, "trainDistance": 4412798, "dispatcherTime": 0, "trainStats": { "EP08": { "distance": 4412798, "score": 110438, "time": 4411743671 } } }, { "id": "23de2c57-84da-4845-b901-a40b6b5e1261", "steam": "76561199065951587", "steamName": "Pablo", "trainTime": 3021172809, "trainPoints": 55277, "trainDistance": 429106, "dispatcherTime": 250586, "trainStats": { "EN96": { "distance": 429106, "score": 55277, "time": 3021172809 } }, "dispatcherStats": { "Korytów": { "time": 22064 }, "Olszamowice": { "time": 221137 }, "Dąbrowa Górnicza": { "time": 7385 } } }, { "id": "b44b2b4b-476a-4e52-b612-573d5c5eea78", "steam": "76561198356160006", "steamName": "Marcion", "trainTime": 9571588, "dispatcherTime": 0, "trainStats": { "Pendolino (ED250)": { "distance": 303450, "score": 9856, "time": 9571588 } }, "trainDistance": 303450, "trainPoints": 9856 }, { "id": "3ee1f655-8329-4c83-96ae-bcf162d31f78", "steam": "76561199465955782", "steamName": "Bolek", "trainTime": 14441779, "dispatcherTime": 0, "trainStats": { "Pendolino (ED250)": { "distance": 402970, "score": 9740, "time": 14441779 } }, "trainDistance": 402970, "trainPoints": 9740 }, { "id": "c3731119-72b0-47c4-a047-70315e595d01", "steam": "76561198048854814", "steamName": "Night King_UA", "trainTime": 9537157, "dispatcherTime": 0, "trainStats": { "Pendolino (ED250)": { "distance": 302954, "score": 9686, "time": 9537157 } }, "trainDistance": 302954, "trainPoints": 9686 }, { "id": "a88f7594-844b-47e1-b657-d6c0be2d021a", "steam": "76561198886710784", "steamName": "LIPTON2315", "trainTime": 10820008, "dispatcherTime": 0, "trainStats": { "EP08": { "distance": 240000, "score": 0, "time": 9860788 }, "Pendolino (ED250)": { "distance": 22693, "score": 9320, "time": 959220 } }, "trainDistance": 262693, "trainPoints": 9320 }, { "id": "42b5c7f0-3af4-4305-aca7-6462e5bf134b", "steam": "76561198067997310", "steamName": "Gladicek", "trainTime": 8042564, "dispatcherTime": 0, "trainStats": { "EU07": { "distance": 97165, "score": 0, "time": 4419762 }, "Traxx (E186)": { "distance": 5704, "score": 4483, "time": 873122 }, "EN57": { "distance": 27186, "score": 4696, "time": 2262371 }, "EN96": { "distance": 3506, "score": 0, "time": 487309 } }, "trainDistance": 133561, "trainPoints": 9179 }] }, "code": 200 }.data.records;


const TrainTable = ({ trains }: { trains: TLeaderboardRecord[] }) => {
  const { t } = useTranslation();


  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {/* <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top
      </h4> */}

      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              {t("leaderboard.user")}
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              {t("leaderboard.points")}
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              {t("leaderboard.distance")}
            </h5>
          </div>
          <div className="p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              {t("leaderboard.time")}
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              {t("leaderboard.actions")}
            </h5>
          </div>
        </div>

        {trains.map((train,key) => (
          <div
            className={`grid grid-cols-4 sm:grid-cols-5 ${trains.length ===  (key+1)
              ? ''
              : 'border-b border-stroke dark:border-strokedark'
              }`}
            key={train.id}
          >
            <div className="flex items-center gap-3 p-5 lg:p-5">
              <p className="text-black dark:text-white sm:block break-all">
                <Link to={"/profile/" + train.steam}
                  className='color-orchid'>{train.steamName}</Link>
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 lg:p-5">
              <p className="text-meta-6">{train.trainPoints}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 lg:p-5">
              <p className="text-meta-5">{(train.trainDistance / 1000).toFixed(2)}km</p>
            </div>

            <div className="flex items-center justify-center p-2.5 lg:p-5">
              <p className="text-meta-3">{Math.floor(train.trainTime / 3600000)}h</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <Link
                to={"/profile/" + train.steam}
                className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                {t("leaderboard.profile")}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const TrainLeaderboard = () => {
  return (
    <>
      <div className="flex flex-col gap-10">
        {/* TODO: get data from API */}
        <TrainTable trains={trains} />
      </div>
    </>
  );
};
