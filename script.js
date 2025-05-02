// 隨機選號
function generateNumbers() {
  const numbers = new Set();
  while (numbers.size < 5) {
    const num = String(Math.floor(Math.random() * 39 + 1)).padStart(2, '0');
    numbers.add(num);
  }
  document.getElementById('result').textContent = '選號結果：' + Array.from(numbers).join(', ');
}

// 分頁切換
function switchTab(tab) {
  document.getElementById('picker-tab').style.display = tab === 'picker' ? 'block' : 'none';
  document.getElementById('noDraw-tab').style.display = tab === 'noDraw' ? 'block' : 'none';
  document.getElementById('combo-tab').style.display = tab === 'combo' ? 'block' : 'none';
  document.getElementById('ai-tab').style.display = tab === 'ai' ? 'block' : 'none';
}

// 不出玩法分析
function checkNoDraw() {
  const noDraw = document.getElementById('noDrawInput').value.trim().split(/\s+/);
  const result = document.getElementById('drawResultInput').value.trim().split(/\s+/);
  let matched = noDraw.filter(n => result.includes(n));
  let isWin = matched.length === 0;

  const oddsMap = {
    5: 1.9,
    6: 2.22,
    7: 2.58,
    8: 3.0,
    9: 3.6,
    10: 4.2,
    11: 5.05,
    12: 6.1
  };

  const odds = oddsMap[noDraw.length] || 0;
  const output = isWin
    ? `✅ 恭喜！全部沒開，獲得 ${odds} 倍獎金！`
    : `❌ 有開出號碼：${matched.join(', ')}，未過關。`;

  document.getElementById('noDrawResult').textContent = output;
}

// 連碰分析器
function analyzeCombo() {
  const numbers = document.getElementById('comboNumbers').value.trim().split(/\s+/);
  const result = document.getElementById('comboResult').value.trim().split(/\s+/);
  const type = parseInt(document.getElementById('comboType').value);
  const rate = parseFloat(document.getElementById('comboRate').value);

  if (numbers.length < type) {
    document.getElementById('comboOutput').textContent = '❗ 選號數量不足以組成該玩法組合';
    return;
  }

  const prizeMap = {
    2: 5300,
    3: 57000,
    4: 750000
  };

  const combos = getCombinations(numbers, type);
  let winCount = 0;

  combos.forEach(combo => {
    const hit = combo.filter(n => result.includes(n));
    if (hit.length === type) winCount++;
  });

  const totalBet = combos.length * rate;
  const winPrize = winCount * prizeMap[type] * rate;
  const profit = winPrize - totalBet;

  const output = `
總投注組數：${combos.length} 組 × ${rate} 倍 = ${totalBet.toFixed(2)} 元
命中組數：${winCount} 組
中獎金額：${winPrize.toFixed(2)} 元
盈虧結果：${profit >= 0 ? '賺' : '虧'} ${Math.abs(profit).toFixed(2)} 元
  `;

  document.getElementById('comboOutput').textContent = output.trim();
}

// 組合工具
function getCombinations(arr, size) {
  const result = [];
  function combine(temp, start) {
    if (temp.length === size) {
      result.push([...temp]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      temp.push(arr[i]);
      combine(temp, i + 1);
      temp.pop();
    }
  }
  combine([], 0);
  return result;
}

// AI選號推薦
function analyzeAI() {
  const raw = document.getElementById('historyInput').value.trim();
  if (!raw) {
    document.getElementById('aiOutput').textContent = '請輸入近100期開獎資料';
    return;
  }

  const lines = raw.split('\n');
  const freq = Array(40).fill(0); // 01~39

  lines.forEach(line => {
    const nums = line.trim().split(/\s+/);
    nums.forEach(n => {
      const num = parseInt(n, 10);
      if (num >= 1 && num <= 39) freq[num]++;
    });
  });

  const numbered = freq.map((count, num) => ({ num: String(num).padStart(2, '0'), count }))
                       .slice(1); // 排除 index 0

  const sorted = numbered.sort((a, b) => a.count - b.count); // 最冷門在前
  const coldest = sorted.slice(0, 12).map(x => `${x.num}(${x.count})`);

  const recommendation = sorted.slice(0, 12).map(x => x.num).join(' ');

  const output = `
最冷門號碼推薦（5~12碼）：
${coldest.join('  ')}
👉 建議不出號碼參考：${recommendation}
  `;

  document.getElementById('aiOutput').textContent = output.trim();
}
