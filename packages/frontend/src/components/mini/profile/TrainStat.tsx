/*
 * Copyright (C) 2025 Aleksander <alekswilc> Wilczyński (aleks@alekswilc.dev)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * See LICENSE for more.
 */

import { useTranslation } from 'react-i18next'
import { formatTime } from '../../../util/time.ts'

export const TrainStat = ({ trainName, time, distance, score, image }: { trainName: string, time: number, distance: number, score: number, image: string }) => {
    const { t } = useTranslation();
    trainName = trainName === 'N/A'
        ? "Untracked" : trainName

    return <div
        key={trainName}
        className="flex flex-col align-center items-center rounded border border-stroke bg-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-4">
            <img className=""
                src={image}
                alt="train icon" />
        </div>
        <div className="flex flex-col p-2 align-center items-center">
            <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">
                {trainName}
            </h4>
            <p className={'break-words'}>{t('profile.trains.time', { time: formatTime(time) })}</p>
            <p className={'break-words'}>{t('profile.trains.distance', { distance: Math.floor(distance / 1000) })}m</p>
            <p className={'break-words pb-4'}>{t('profile.trains.score', { score: score })}</p>

        </div>
    </div>
}