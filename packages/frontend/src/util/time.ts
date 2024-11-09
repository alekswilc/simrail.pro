export const formatTime = (time: number) =>
{
    if (Math.floor(time / 3600000) > 0)
    {
        return `${ Math.floor(time / 3600000) }h`;
    }

    if (Math.floor(time / 60000) > 0)
    {
        return `${ Math.floor(time / 60000) }m`
    }

    return '0h';
}