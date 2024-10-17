
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import TableTwo from '../components/Tables/TableTwo';
import { TTrainRecord } from '../types/train.ts';


const trains: TTrainRecord[] = {"success":true,"data":{"records":[{"id":"16b54f4a-0826-4005-b67d-2ab57d74ffeb","steam":"76561199101984415","steamName":"tomsobczak35","trainTime":4841000336,"trainPoints":572048,"trainDistance":8066546,"dispatcherTime":0,"trainStats":{"Pendolino (ED250)":{"distance":8066546,"score":572048,"time":4841000336}}},{"id":"a9050fd0-f3cd-45c9-8087-44948da79b00","steam":"76561198258359953","steamName":"Kashameister.","trainTime":4838762785,"trainPoints":353232,"trainDistance":10274248,"dispatcherTime":0,"trainStats":{"EU07":{"distance":10274248,"score":353232,"time":4838762785}}},{"id":"2a08cadb-bacb-494a-8d09-0ef1870f1057","steam":"76561198200906855","steamName":"Nesto Ash Leo","trainTime":4411743671,"trainPoints":110438,"trainDistance":4412798,"dispatcherTime":0,"trainStats":{"EP08":{"distance":4412798,"score":110438,"time":4411743671}}},{"id":"23de2c57-84da-4845-b901-a40b6b5e1261","steam":"76561199065951587","steamName":"Pablo","trainTime":3021172809,"trainPoints":55277,"trainDistance":429106,"dispatcherTime":250586,"trainStats":{"EN96":{"distance":429106,"score":55277,"time":3021172809}},"dispatcherStats":{"Korytów":{"time":22064},"Olszamowice":{"time":221137},"Dąbrowa Górnicza":{"time":7385}}},{"id":"b44b2b4b-476a-4e52-b612-573d5c5eea78","steam":"76561198356160006","steamName":"Marcion","trainTime":9571588,"dispatcherTime":0,"trainStats":{"Pendolino (ED250)":{"distance":303450,"score":9856,"time":9571588}},"trainDistance":303450,"trainPoints":9856},{"id":"3ee1f655-8329-4c83-96ae-bcf162d31f78","steam":"76561199465955782","steamName":"Bolek","trainTime":14441779,"dispatcherTime":0,"trainStats":{"Pendolino (ED250)":{"distance":402970,"score":9740,"time":14441779}},"trainDistance":402970,"trainPoints":9740},{"id":"c3731119-72b0-47c4-a047-70315e595d01","steam":"76561198048854814","steamName":"Night King_UA","trainTime":9537157,"dispatcherTime":0,"trainStats":{"Pendolino (ED250)":{"distance":302954,"score":9686,"time":9537157}},"trainDistance":302954,"trainPoints":9686},{"id":"a88f7594-844b-47e1-b657-d6c0be2d021a","steam":"76561198886710784","steamName":"LIPTON2315","trainTime":10820008,"dispatcherTime":0,"trainStats":{"EP08":{"distance":240000,"score":0,"time":9860788},"Pendolino (ED250)":{"distance":22693,"score":9320,"time":959220}},"trainDistance":262693,"trainPoints":9320},{"id":"42b5c7f0-3af4-4305-aca7-6462e5bf134b","steam":"76561198067997310","steamName":"Gladicek","trainTime":8042564,"dispatcherTime":0,"trainStats":{"EU07":{"distance":97165,"score":0,"time":4419762},"Traxx (E186)":{"distance":5704,"score":4483,"time":873122},"EN57":{"distance":27186,"score":4696,"time":2262371},"EN96":{"distance":3506,"score":0,"time":487309}},"trainDistance":133561,"trainPoints":9179},{"id":"31a65828-3e87-4123-b8c7-c2604375e5a4","steam":"76561198859961880","steamName":"mpapa","trainTime":15313091,"dispatcherTime":0,"trainStats":{"EP08":{"distance":110491,"score":4463,"time":13036616},"Dragon2 (E6ACTa, E6ACTadb)":{"distance":924,"score":0,"time":321162},"Pendolino (ED250)":{"distance":59999,"score":2750,"time":1955313}},"trainDistance":171414,"trainPoints":7213}]},"code":200}.data.records;


export const TrainLogs = () => {
  return (
    <>
      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </>
  );
};
