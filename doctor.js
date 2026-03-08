// Doctor page logic (demo)
(function(){
  window.mockDoctorLogin = () => alert('Doctor logged in (demo)');

  window.loadHistory = () => {
    const id = document.getElementById('patientId').value || 'P-001';
    const list = document.getElementById('historyList');
    list.innerHTML = [
      `Visit 2025-01-03 – Fever – Rx: Paracetamol`,
      `Visit 2025-02-11 – Cough – Rx: Cough Syrup`
    ].map(x => `<li>${id}: ${x}</li>`).join('');
  };

  window.uploadPrescription = () => {
    const txt = document.getElementById('prescription').value.trim();
    if (!txt) return alert('Enter prescription');
    alert('Prescription uploaded (demo)');
  };
})();