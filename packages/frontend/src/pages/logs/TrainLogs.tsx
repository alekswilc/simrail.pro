import { ChangeEvent, useEffect, useState } from "react";
import { TTrainRecord } from "../../types/train.ts";
import { TrainTable } from "../../components/pages/logs/TrainTable.tsx";
import { useDebounce } from "use-debounce";
import { Search } from "../../components/mini/util/Search.tsx";
import { useSearchParams } from "react-router-dom";

export const TrainLogs = () =>
{
    const [ data, setData ] = useState<TTrainRecord[]>([]);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ searchItem, setSearchItem ] = useState(searchParams.get("q") ?? "");

    useEffect(() =>
    {
        fetch(`${ import.meta.env.VITE_API_URL }/trains/`).then(x => x.json()).then(x =>
        {
            setData(x.data.records);
        });
    }, []);

    const [ error, setError ] = useState<0 | 1 | 2>(0);
    const [ searchValue ] = useDebounce(searchItem, 500);

    useEffect(() =>
    {
        searchValue === "" ? searchParams.delete("q") : searchParams.set("q", searchValue);
        setSearchParams(searchParams);

        setData([]);
        setError(0);
        fetch(`${ import.meta.env.VITE_API_URL }/trains/?q=${ searchValue }`).then(x => x.json()).then(x =>
        {
            setData(x.data.records);
            setError(x.data.records.length > 0 ? 1 : 2);
        });
    }, [ searchValue ]);

    useEffect(() =>
    {
        setSearchItem(searchParams.get("q") ?? "");
    }, [ searchParams ]);

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
