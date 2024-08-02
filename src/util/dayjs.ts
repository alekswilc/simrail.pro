import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import pl from 'dayjs/locale/pl.js';

dayjs.extend(relativeTime);
dayjs.locale(pl)