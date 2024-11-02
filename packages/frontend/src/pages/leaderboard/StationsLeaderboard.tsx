import { TLeaderboardRecord } from "../../types/leaderboard.ts";
import { ChangeEvent, useEffect, useState } from "react";
import { StationTable } from "../../components/pages/leaderboard/StationTable.tsx";
import { useDebounce } from "use-debounce";
import { Search } from "../../components/mini/util/Search.tsx";

export const StationLeaderboard = () =>
{
    const [ data, setData ] = useState<TLeaderboardRecord[]>([]);
    useEffect(() =>
    {
        fetch(`${ import.meta.env.VITE_API_URL }leaderboard/station/`).then(x => x.json()).then(x =>
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
        fetch(`${ import.meta.env.VITE_API_URL }/leaderboard/station/?q=${ searchValue }`).then(x => x.json()).then(x =>
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
                <StationTable stations={ data } error={ error }/>
            </div>
        </>
    );
};
