const {
  makeRequestAndFilterResponse,
} = require("./makeRequestAndFilterResponse");

const harvestAccessToken = "";
const harvestAccountId = "";
const harvesTimeEntriesUrl = `https://api.harvestapp.com/v2/time_entries/?access_token=${harvestAccessToken}&account_id=${harvestAccountId}`;
makeRequestAndFilterResponse(
  "GET",
  harvesTimeEntriesUrl,
  [
    "id",
    "hours",
    "is_running",
    "spent_date",
    "updated_at",
    "project.id",
    "project.name",
    "task.id",
    "task.name",
  ],
  "time_entries"
).then((res) => console.log(res));
