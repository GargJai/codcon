const atcoderUrl = "https://kenkoooo.com/atcoder/resources/contests.json";
const codeforcesUrl = "https://codeforces.com/api/contest.list";
const codechefUrl =
  "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all";




const atcoderIcon = "./images/atcoder.png";
const codeforcesIcon = "./images/codeforces.png";
const codechefIcon = "./images/codechef.png";

const formatTime = (epochSeconds) => {
  const date = new Date(epochSeconds * 1000);
  return date.toISOString().slice(0, 19).replace("T", " ");
};

const getAtCoderContests = async () => {
  try {
    const response = await fetch(atcoderUrl);
    const data = await response.json();

    const currentTime = Math.floor(Date.now() / 1000);
    const upcoming = data
      .filter((el) => el.start_epoch_second > currentTime)
      .map((el) => {
        const start = el.start_epoch_second;
        const end = start + el.duration_second;
        return {
          title: el.title,
          start: formatTime(start),
          end: formatTime(end),
          hr_duration: (el.duration_second / 3600).toFixed(2),
          icon: atcoderIcon,
          url: `https://atcoder.jp/contests/${el.id}`,
        };
      });

    console.log("AtCoder Upcoming Contests:", upcoming);
    return upcoming;
  } catch (error) {
    console.error("Error fetching AtCoder contests:", error);
    return [];
  }
};

const getCodeforcesContests = async () => {
  try {
    const response = await fetch(codeforcesUrl);
    const data = await response.json;
    const result = data.result;

    const upcoming = result
      .filter((el) => el.phase === "BEFORE")
      .map((el) => {
        const start = el.startTimeSeconds;
        const end = start + el.durationSeconds;
        return {
          title: el.name,
          start: formatTime(start),
          end: formatTime(end),
          hr_duration: (el.durationSeconds / 3600).toFixed(2),
          icon: codeforcesIcon,
          url: `https://codeforces.com/contest/${el.id}`,
        };
      });

    console.log("Codeforces Upcoming Contests:", upcoming);
    return upcoming;
  } catch (error) {
    console.error("Error fetching Codeforces contests:", error);
    return [];
  }
};

const getCodeChefContests = async () => {
  try {
    const response = await fetch(codechefUrl);
    const data = await response.json();

    const currentTime = Math.floor(Date.now() / 1000);
    const upcoming = data.future_contests
      .filter(
        (el) =>
          Math.floor(new Date(el.contest_start_date).getTime() / 1000) >
          currentTime
      )
      .map((el) => {
        const start = Math.floor(
          new Date(el.contest_start_date).getTime() / 1000
        );
        const end = Math.floor(new Date(el.contest_end_date).getTime() / 1000);
        return {
          title: el.contest_name,
          start: formatTime(start),
          end: formatTime(end),
          hr_duration: ((end - start) / 3600).toFixed(2),
          icon: codechefIcon,
          url: `https://www.codechef.com/${el.contest_code}`,
        };
      });

    console.log("CodeChef Upcoming Contests:", upcoming);
    return upcoming;
  } catch (error) {
    console.error("Error fetching CodeChef contests:", error);
    return [];
  }
};

const getAllUpcomingContests = async () => {
  const atcoderContests = await getAtCoderContests();
  const codeforcesContests = await getCodeforcesContests();
  const codechefContests = await getCodeChefContests();

  const allContests = [
    ...atcoderContests,
    ...codeforcesContests,
    ...codechefContests,
  ];
  allContests.sort((a, b) => new Date(a.start) - new Date(b.start));

  return allContests;
};

const logAllUpcomingContests = async () => {
  const upcomingContests = await getAllUpcomingContests();
  console.log(upcomingContests);
};

logAllUpcomingContests();
