// Pharmacy demo: in-memory stock and realtime-like updates
(function(){
  const stock = [
    { name: 'Paracetamol 500mg', qty: 42, pharmacy: 'Nabha Medicos' },
    { name: 'ORS Sachet', qty: 120, pharmacy: 'Rural Care Pharmacy' },
    { name: 'Amoxicillin 250mg', qty: 15, pharmacy: 'HealthPlus Store' },
  ];

  function render(list){
    const el = document.getElementById('medList');
    if (!el) return;
    el.innerHTML = list.map(m => `<li><strong>${m.name}</strong> — Qty: ${m.qty} — <em>${m.pharmacy}</em></li>`).join('') || '<li>No items</li>';
  }

  window.searchMeds = () => {
    const q = (document.getElementById('medQuery').value || '').toLowerCase();
    const filtered = stock.filter(s => s.name.toLowerCase().includes(q));
    render(filtered);
  };

  // Simulate realtime updates
  setInterval(() => {
    if (stock.length) {
      const i = Math.floor(Math.random()*stock.length);
      stock[i].qty = Math.max(0, stock[i].qty + (Math.random()>0.5?1:-1));
      render(stock);
    }
  }, 5000);

  document.addEventListener('DOMContentLoaded', () => render(stock));
})();