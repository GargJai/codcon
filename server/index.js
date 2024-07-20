const express = require("express");
const fs = require("fs");
const app = express();

const cors = require("cors");
app.use(cors({ origin: true }));

let globalContests;

async function getContests() {
  const response = await fetch("https://clist.by/get/events/", {
    headers: {
      "x-csrftoken": "MoshSmhUGSJuwGx36sIYu71uM2sjG4Y4",
      cookie:
        "csrftoken=MoshSmhUGSJuwGx36sIYu71uM2sjG4Y4; sessionid=i4al7gmey1fbsfhw3ho24yma746taeuz",
      Referer: "https://clist.by/",
    },
    method: "POST",
  });

  let contests = await response.json();
  
  const allowedContest = [
    "codeforces.com",
    "codechef.com",
    "atcoder.jp",
    "leetcode.com",
    "geeksforgeeks.org",
  ];

  contests = contests.filter((contest) => {
    return allowedContest.includes(contest.host);
  });

  contests = contests.map((contest) => {
    let iconurl = contest.icon.replace('img/resources', './images');
    
    return {
      title: contest.title,
      start: contest.start,
      end: contest.end,
      hr_duration: contest.hr_duration,
      icon: iconurl,
      url: contest.url
    };
  });

  globalContests = contests;
  contests = await JSON.stringify(contests);
  fs.writeFileSync("./data.json", contests);
}

setInterval(getContests, 1000 * 60 * 60); // Hour
getContests();

app.get("/", (req, res) => {
  res.json(globalContests);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
