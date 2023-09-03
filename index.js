const axios = require("axios");
const fs = require("fs");
const { BASE_URL, START, END, BATCH_SIZE, DELAY } = require("./config");

async function fetchImageAndWrite(start, end) {
  for (let i = start; i <= end; i += BATCH_SIZE) {
    const batchStart = i;
    const batchEnd = Math.min(i + BATCH_SIZE - 1, end);

    for (let j = batchStart; j <= batchEnd; j++) {
      const imagebuffer = await axios
        .get(`${BASE_URL}${j}.png`, {
          responseType: "arraybuffer",
        })
        .then((response) => response.data);
      fs.writeFileSync(`images/${j}.png`, imagebuffer);
      console.log(`${j}.png Downloaded`);
    }

    try {
      await new Promise(resolve => setTimeout(resolve, DELAY));
    } catch (error) {
      console.error(`Error fetching data from batch ${batchStart} - ${batchEnd}:`, error);
    }
  }
}

fetchImageAndWrite(START, END);
