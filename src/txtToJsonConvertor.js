const fs = require("fs");

const txtFilePath = "./catagories.txt"; // Replace with the path to your .txt file
const outputFilePath = "catagories.json"; // Replace with the path where you want to save the JSON file

fs.readFile(txtFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
  } else {
    const linesArray = data.split("\n").map((line) => line.trim()); // Trim each line

    const jsonData = { lines: linesArray };

    fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error("Error saving the JSON file:", err);
      } else {
        console.log("JSON file saved successfully.");
      }
    });
  }
});
