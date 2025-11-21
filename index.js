import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json"; // commit sayısını kaydetmek için
const git = simpleGit();
const startYear = 2014;
const endYear = 2025;

const makeCommits = async () => {
  for(let year = startYear; year <= endYear; year++){
    for(let week = 0; week < 52; week++){
      let commitsThisWeek = random.int(1, 5); // haftada 1-5 commit
      for(let i = 0; i < commitsThisWeek; i++){
        const date = moment(`${year}-01-01`).add(week, 'weeks').add(random.int(0,6), 'days');
        // Dosyayı değiştir
        jsonfile.writeFileSync(path, { date: date.format('YYYY-MM-DD'), count: i });
        await git.add(path);
        await git.commit(`Commit for ${date.format('YYYY-MM-DD')}`, { '--date': date.toISOString() });
      }
    }
  }
}

makeCommits();
