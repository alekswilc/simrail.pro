import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import duration from 'dayjs/plugin/duration.js';
import pl from 'dayjs/locale/pl.js';



dayjs.extend(duration)
dayjs.extend(relativeTime);
dayjs.locale(pl);


export const msToTime = (duration: number, long = false) => {
    const time = dayjs.duration(duration, 'milliseconds');

    if (long) {
        let t = '';
        if (time.days()) t+= `${time.days()}d `;
        if (time.hours()) t+= `${time.hours()}h `;
        if (time.minutes()) t+= `${time.minutes()}m `;
        if (time.seconds()) t+= `${time.seconds()}s`;

        return `${time.humanize()} (${t.trim() || "<1s"})`;
    }


    return time.humanize();
}