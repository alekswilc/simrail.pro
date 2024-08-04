import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import pl from 'dayjs/locale/pl.js';

dayjs.extend(relativeTime);
dayjs.locale(pl);


export const msToTime = (duration: number) => {
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return `${hours ? `${hours}h ` : ''}${minutes ? `${minutes}m` : ''}`;
}