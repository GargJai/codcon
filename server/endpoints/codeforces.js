const url = "https://codeforces.com/api/contest.list";

const getCodeforces = async () => {
  const response = await fetch(url);
  const data = await response.json();
  const result = data.result;

  const upcoming = result.filter((el) => {
    return el.phase === "BEFORE";
  });

  return upcoming;
};

getCodeforces().then((data) => {
  console.log(data);
});

export default getCodeforces;
