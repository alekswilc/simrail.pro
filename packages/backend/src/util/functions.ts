// TODO: typings
export const removeProperties = <T>(data: any, names: string[]) => {

    for (const name of names)
        delete data[name];

    return data as T;
}