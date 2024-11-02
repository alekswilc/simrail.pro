import { ChangeEvent, useEffect, useState } from "react";
import { StationTable } from "../../components/pages/logs/StationTable.tsx";
import { useDebounce } from "use-debounce";
import { TStationRecord } from "../../types/station.ts";
import { Search } from "../../components/mini/util/Search.tsx";

export const StationLogs = () =>
{
    const [ data, setData ] = useState<TStationRecord[]>([]);
    useEffect(() =>
    {
        fetch(`${ import.meta.env.VITE_API_URL }/stations/`).then(x => x.json()).then(x =>
        {
            setData(x.data.records);
        });
    }, []);
    const [ error, setError ] = useState<0 | 1 | 2>(0);
    const [ searchItem, setSearchItem ] = useState("");
    const [ searchValue ] = useDebounce(searchItem, 500);

    useEffect(() =>
    {
        setData([]);
        setError(0);
        fetch(`${ import.meta.env.VITE_API_URL }/stations/?q=${ searchValue }`).then(x => x.json()).then(x =>
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
