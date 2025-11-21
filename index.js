import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

// Rastgele tarih: 2017 – 2025 arası herhangi bir gün
function randomDate() {
  const start = moment("2017-01-01");
  const end = moment("2025-12-31");

  // iki tarih arasındaki toplam gün sayısı
  const days = end.diff(start, "days");

  // rastgele gün ekle
  const rand = random.int(0, days);
  const date = start.clone().add(rand, "days");

  return date;
}

const makeCommits = async (n) => {
  for (let i = 0; i < n; i++) {
    const date = randomDate();

    // Geçersiz tarih varsa atla (ama olmayacak)
    if (!date.isValid()) {
      console.log("Geçersiz tarih oluştu, atlandı.");
      continue;
    }

    const iso = date.toISOString();
    console.log("Commit tarihi:", iso);

    const data = { date: iso, rand: Math.random() };
    await jsonfile.writeFile(path, data);

    await git.add([path]);
    await git.commit(`Commit at ${iso}`, { "--date": iso });
  }

  // branch adı: main yoksa master yap
  await git.push("origin", "main").catch(async () => {
    await git.push("origin", "master");
  });
};

makeCommits(15280); // <-- Kaç commit istiyorsan burayı arttır
