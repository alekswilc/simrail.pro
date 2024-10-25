import { TLeaderboardRecord } from '../../types/leaderboard.ts';
import { ChangeEvent, useEffect, useState } from 'react';
import { StationTable } from '../../components/leaderboard/StationTable.tsx';
import { useDebounce } from 'use-debounce';

export const StationLeaderboard = () => {
    const [data, setData] = useState<TLeaderboardRecord[]>([]);
    useEffect(() => {
        fetch('http://localhost:2005/leaderboard/station/').then(x => x.json()).then(x => {
            setData(x.data.records);
        });
    }, []);

    const [searchItem, setSearchItem] = useState('');
    const [searchValue] = useDebounce(searchItem, 500);
    const [empty, setEmpty] = useState(false);

    useEffect(() => {
        setData([]);
        setEmpty(false);
        fetch('http://localhost:2005/leaderboard/station/?q=' + searchValue).then(x => x.json()).then(x => {
            setData(x.data.records);
            if (x.data.records.length === 0) setEmpty(true);

        });
    }, [searchValue])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchItem(e.target.value);
    };

    return (
        <>
            <div className="flex flex-col gap-10">
                {/* TODO: get data from API */}
                <StationTable stations={data} handleInputChange={handleInputChange} searchItem={searchItem} empty={empty} />


            </div>
        </>
    );
};
