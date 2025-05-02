// 產生選號功能
function generateNumbers() {
  const numbers = new Set();
  while (numbers.size < 5) {
    const num = String(Math.floor(Math.random() * 39 + 1)).padStart(2, '0');
    numbers.add(num);
  }
  document.getElementById('result').textContent = '選號結果：' + Array.from(numbers).join(', ');
}

// 分頁切換功能
function switchTab(tab) {
  document.getElementById('picker-tab').style.display = tab === 'picker' ? 'block' : 'none';
  document.getElementById('noDraw-tab').style.display = tab === 'noDraw' ? 'block' : 'none';
}

// 不出玩法分析功能
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
