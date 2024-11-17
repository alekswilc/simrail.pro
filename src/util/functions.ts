// https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
export const escapeRegexString = (str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}