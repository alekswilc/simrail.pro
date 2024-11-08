import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import duration from "dayjs/plugin/duration.js";
import pl from "dayjs/locale/pl.js";


dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale(pl);


export const msToTime = (duration: number, long = false) =>
{
    const time = dayjs.duration(duration, "milliseconds");

    if (long)
    {
        return `${ time.humanize() } (${ time.format("Y[y] M[mth] D[d] H[h] m[m] s[s]").split(" ").map(x => x.split("")[ 0 ] === "0" ? null : x).filter(x => x).join(" ") })`;
    }

    return time.humanize();
};