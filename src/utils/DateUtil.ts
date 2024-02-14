export function getDate(initialDate: string) {
    let unixtime = parseInt(initialDate);
    return (new Date(unixtime * 1000)).toDateString();
}