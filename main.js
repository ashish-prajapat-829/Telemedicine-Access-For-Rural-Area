// Basic i18n hookup, offline cache registration, and helpers
(function() {
  // Register service worker for offline support
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(console.warn);
    });
  }

  // Language switching
  const selectEl = document.getElementById('langSelect');
  if (selectEl) {
    const saved = localStorage.getItem('lang') || 'en';
    selectEl.value = saved;
    window.setLanguage && window.setLanguage(saved);
    selectEl.addEventListener('change', (e) => {
      const lang = e.target.value;
      localStorage.setItem('lang', lang);
      window.setLanguage && window.setLanguage(lang);
    });
  }

  // Mock auth helpers
  window.mockLogin = () => alert('Logged in (demo)');

  // Offline records demo using IndexedDB via idb-keyval style minimal wrapper
  const DB = (function() {
    let db;
    const DB_NAME = 'nhc_offline'; const STORE = 'records';
    function init() {
      return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, 1);
        req.onupgradeneeded = () => {
          const d = req.result;
          if (!d.objectStoreNames.contains(STORE)) d.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
        };
        req.onsuccess = () => { db = req.result; resolve(); };
        req.onerror = () => reject(req.error);
      });
    }
    async function add(record) {
      if (!db) await init();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).add(record);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    }
    async function all() {
      if (!db) await init();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readonly');
        const store = tx.objectStore(STORE);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
      });
    }
    return { add, all };
  })();

  window.saveRecordOffline = async () => {
    const sample = { date: new Date().toISOString(), summary: 'BP: 120/80, Temp: 99F, Rx: ORS' };
    await DB.add(sample);
    alert('Saved offline');
    window.renderRecords && window.renderRecords();
  };

  window.renderRecords = async () => {
    const list = document.getElementById('recordsList');
    if (!list) return;
    const items = await DB.all();
    list.innerHTML = items.map(r => `<li>${r.date} — ${r.summary}</li>`).join('') || '<li>No records</li>';
  };

  document.addEventListener('DOMContentLoaded', window.renderRecords);
})();