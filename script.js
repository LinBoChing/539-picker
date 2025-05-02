function generateNumbers() {
  const numbers = new Set();
  while (numbers.size < 5) {
    const num = String(Math.floor(Math.random() * 39 + 1)).padStart(2, '0');
    numbers.add(num);
  }
  document.getElementById('result').textContent = '選號結果：' + Array.from(numbers).join(', ');
}
