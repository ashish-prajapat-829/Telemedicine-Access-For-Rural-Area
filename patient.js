// Patient page logic: voice input, AI symptom demo, booking mock
(function(){
  // Voice to text using Web Speech API (Chrome/Edge)
  function setupVoice(btnId, targetId){
    const btn = document.getElementById(btnId);
    const target = document.getElementById(targetId);
    if (!btn || !target) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR){
      btn.disabled = true; btn.textContent = 'Voice Unsupported';
      return;
    }
    const rec = new SR();
    rec.lang = (localStorage.getItem('lang') === 'pa') ? 'pa-IN' : (localStorage.getItem('lang') === 'hi' ? 'hi-IN' : 'en-IN');
    rec.continuous = false; rec.interimResults = false;
    rec.onresult = (e) => { target.value = e.results[0][0].transcript; };
    rec.onerror = () => { btn.disabled = true; btn.textContent = 'Mic Error'; };
    btn.addEventListener('click', () => rec.start());
  }

  window.submitSymptoms = () => {
    const text = document.getElementById('symptomsText').value.trim();
    const out = document.getElementById('aiSuggestion');
    if (!text) { out.textContent = 'Please enter symptoms'; return; }
    // Placeholder AI: simple heuristic; backend/TFLite to be integrated
    const lower = text.toLowerCase();
    let suggestion = 'General checkup recommended';
    if (/(fever|temperature|chills)/.test(lower)) suggestion = 'Possible viral fever / COVID-like symptoms';
    if (/(cough|breath|asthma)/.test(lower)) suggestion = 'Possible respiratory infection / bronchitis';
    if (/(loose motion|diarrhea|vomit)/.test(lower)) suggestion = 'Possible gastroenteritis / dehydration risk';
    out.textContent = 'AI Suggestion: ' + suggestion;
  };

  window.bookConsultation = () => {
    alert('Slot booked (demo). Start a call to preview WebRTC.');
  };

  document.addEventListener('DOMContentLoaded', () => {
    setupVoice('startVoice', 'symptomsText');
  });
})();