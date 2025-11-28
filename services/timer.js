export const setTimer = (minutes) => {
    setTimeout(() => {
        console.log("Timer completed!");
    }, minutes * 60000);

    return `Timer set for ${minutes} minutes.`;
};