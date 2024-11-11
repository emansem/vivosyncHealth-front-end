
const timeAgo = (pasteDate: number | string) => {

    const timeInSeconds =
    {
        SECONDS_IN_MINUTE: 60,
        SECONDS_IN_HOUR: 3600,
        SECONDS_IN_DAY: 86400,
        SECONDS_IN_MONTH: 2592000,
        SECONDS_IN_YEAR: 31536000

    }


    const dateNow = Date.now();
    const past = pasteDate as unknown as number

    //Get the df time in milliseconds
    const millisecondsDf = dateNow - past;

    //Convert the milliscondsdf into seconds 
    const seconds = millisecondsDf / 1000;

    //Check each time interval
    if (seconds < timeInSeconds.SECONDS_IN_MINUTE) {
        return 'Just now'
    } else if (seconds < timeInSeconds.SECONDS_IN_HOUR) {
        const minute = Math.floor(seconds / timeInSeconds.SECONDS_IN_MINUTE);

        return `${minute} minute${minute === 1 ? "" : "s"} ago`
    } else if (seconds < timeInSeconds.SECONDS_IN_DAY) {
        const hour = Math.floor(seconds / timeInSeconds.SECONDS_IN_HOUR);
        return `${hour} hour${hour === 1 ? "" : "s"} ago`
    }
    else if (seconds < timeInSeconds.SECONDS_IN_MONTH) {
        const day = Math.floor(seconds / timeInSeconds.SECONDS_IN_DAY);

        return `${day} day${day === 1 ? "" : "s"} ago`
    }
    else if (seconds < timeInSeconds.SECONDS_IN_YEAR) {
        const month = Math.floor(seconds / timeInSeconds.SECONDS_IN_MONTH);
        return `${month} month${month === 1 ? "" : "s"} ago`
    }
    const year = Math.floor(seconds / timeInSeconds.SECONDS_IN_YEAR);
    return `${year} year${year === 1 ? "" : "s"} ago`
}
export default timeAgo

