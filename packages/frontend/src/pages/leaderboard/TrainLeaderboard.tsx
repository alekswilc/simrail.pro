import { TLeaderboardRecord } from "../../types/leaderboard.ts";
import { ChangeEvent, useEffect, useState } from "react";
import { TrainTable } from "../../components/pages/leaderboard/TrainTable.tsx";
import { useDebounce } from "use-debounce";
import { Search } from "../../components/mini/util/Search.tsx";

export const TrainLeaderboard = () =>
{
    const [ data, setData ] = useState<TLeaderboardRecord[]>([]);
    useEffect(() =>
    {
        fetch(`${ import.meta.env.VITE_API_URL }/leaderboard/train/`).then(x => x.json()).then(x =>
        {
            setData(x.data.records);
        });
    }, []);

    const [ searchItem, setSearchItem ] = useState("");
    const [ searchValue ] = useDebounce(searchItem, 500);
    const [ error, setError ] = useState<0 | 1 | 2>(0);

    useEffect(() =>
    {
        setData([]);
        setError(0);
        fetch(`${ import.meta.env.VITE_API_URL }/leaderboard/train/?q=${ searchValue }`).then(x => x.json()).then(x =>
        {
            setData(x.data.records);
            setError(x.data.records.length > 0 ? 1 : 2);
        });
    }, [ searchValue ]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    {
        setSearchItem(e.target.value);
    };

    return (
        <>
            <div className="flex flex-col gap-10">
                <Search handleInputChange={ handleInputChange } searchItem={ searchItem }/>
                <TrainTable trains={ data } error={ error }/>

            </div>
        </>
    );
};
