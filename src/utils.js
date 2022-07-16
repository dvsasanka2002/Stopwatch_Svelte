function zeroPadded(number) {
    return number >= 10 ? number.toString() : `0${number}`;
}
function lastDigit(number) {
    return number.toString()[number.toString().length - 1];
}

export function formatTime(milliseconds) {
    const mm = zeroPadded(Math.floor(milliseconds / 1000 / 60));
    const ss = zeroPadded(Math.floor(milliseconds / 1000) % 60);
    const t = lastDigit(Math.floor(milliseconds / 100));
    return `${mm}:${ss}.${t}`;
}