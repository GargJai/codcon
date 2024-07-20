const url = "https://kenkoooo.com/atcoder/resources/contests.json";

const getAtCoderContests = async () => {
    const response = await fetch(url);
    const data = await response.json();

    const upcoming = data.filter((el) => {
        const currentTime = Math.floor(Date.now() / 1000);
        return el.start_epoch_second > currentTime;
    });

    return upcoming;
}

const logUpcomingContests = async () => {
    const upcoming = await getAtCoderContests();
    console.log(upcoming);
}

logUpcomingContests();
