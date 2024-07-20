const url =
  "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all";

async function getCodechef() {
  let response = await fetch(url);
  response = await response.json();
  console.log(response);
}

const data = getCodechef();
