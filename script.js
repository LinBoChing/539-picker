document.addEventListener("DOMContentLoaded", function () {
  const aiBtn = document.getElementById("ai-generate");
  const aiResult = document.getElementById("ai-result");
  const fetchBtn = document.getElementById("fetch-data");

  let historyData = [];

  // 1️⃣ 一鍵抓取
  fetchBtn.addEventListener("click", async function () {
    try {
      const res = await fetch("https://linboching.github.io/539-api/last100.txt");
      const text = await res.text();
      historyData = text
        .trim()
        .split("\n")
        .map(line => line.trim().split(" "));
      alert("✅ 抓取成功，共讀取 " + historyData.length + " 期！");
    } catch (err) {
      alert("❌ 抓取失敗：" + err.message);
    }
  });

  // 2️⃣ AI 選號
  aiBtn.addEventListener("click", function () {
    if (historyData.length === 0) {
      alert("請先點擊「一鍵抓資料」取得近百期開獎號碼！");
      return;
    }

    const counts = {};
    for (let i = 1; i <= 39; i++) {
      counts[i.toString().padStart(2, "0")] = 0;
    }

    historyData.forEach(period => {
      period.forEach(num => {
        if (counts[num] !== undefined) counts[num]++;
      });
    });

    const sorted = Object.entries(counts).sort((a, b) => a[1] - b[1]);
    const pickCount = 10;
    const result = sorted.slice(0, pickCount).map(([num]) => num);

    aiResult.textContent = "AI推薦不出牌號碼（" + pickCount + "支）：" + result.join(" ");
  });
});
