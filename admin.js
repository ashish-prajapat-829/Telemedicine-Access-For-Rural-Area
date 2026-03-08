// Admin dashboard demo: random metrics
(function(){
  function set(id, val){ const el = document.getElementById(id); if (el) el.textContent = val; }
  function tick(){
    set('doctorsCount', Math.floor(20 + Math.random()*30));
    set('patientsCount', Math.floor(100 + Math.random()*200));
    set('medsCount', Math.floor(500 + Math.random()*500));
  }
  setInterval(tick, 4000);
  document.addEventListener('DOMContentLoaded', tick);
})();