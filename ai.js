// AI Symptom Checker (placeholder for TensorFlow Lite / API)
(function(){
  // Voice input
  function setupVoice(){
    const btn = document.getElementById('startVoice');
    const target = document.getElementById('aiSymptoms');
    if (!btn || !target) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR){ btn.disabled=true; btn.textContent='Voice Unsupported'; return; }
    const rec = new SR();
    rec.lang = (localStorage.getItem('lang') === 'pa') ? 'pa-IN' : (localStorage.getItem('lang') === 'hi' ? 'hi-IN' : 'en-IN');
    rec.onresult = (e) => { target.value = e.results[0][0].transcript; };
    rec.onerror = () => { btn.disabled = true; btn.textContent = 'Mic Error'; };
    btn.addEventListener('click', () => rec.start());
  }

  window.runAISymptomCheck = async () => {
    const text = document.getElementById('aiSymptoms').value.trim().toLowerCase();
    const out = document.getElementById('aiResults');
    if (!text){ out.textContent = 'Please enter symptoms'; return; }
    // Simple rules; replace with TFLite inference (e.g., tf.tflite.loadTFLiteModel)
    const rules = [
      { re: /(fever|chills|temperature)/, cond: 'Viral fever / Malaria risk' },
      { re: /(cough|breath|sore throat|cold)/, cond: 'Respiratory infection / Flu' },
      { re: /(loose motion|diarrhea|vomit|nausea)/, cond: 'Gastroenteritis / Dehydration' },
      { re: /(headache|migraine|dizzy)/, cond: 'Migraine / Tension headache' },
    ];
    const hits = rules.filter(r => r.re.test(text)).map(r => r.cond);
    out.textContent = hits.length ? 'Possible: ' + hits.join(', ') : 'General checkup recommended';
  };

  document.addEventListener('DOMContentLoaded', setupVoice);
})();