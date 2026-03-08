// Minimal WebRTC demo (local loopback placeholder). Real deployment needs signaling (WebSocket/Server)
(function(){
  let pc1, pc2, localStream;
  const startBtn = document.getElementById('startCall');
  const endBtn = document.getElementById('endCall');
  const localVideo = document.getElementById('localVideo');
  const remoteVideo = document.getElementById('remoteVideo');

  async function getStream(audioOnly=false){
    const constraints = audioOnly ? { audio: true, video: false } : { video: { width: { ideal: 640 }, height:{ ideal: 360 } }, audio: true };
    return navigator.mediaDevices.getUserMedia(constraints);
  }

  async function startCall(){
    const modeEl = document.getElementById('consultMode');
    const audioOnly = modeEl && modeEl.value === 'audio';

    pc1 = new RTCPeerConnection({
      iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }]
    });
    pc2 = new RTCPeerConnection({
      iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }]
    });

    localStream = await getStream(audioOnly);
    localStream.getTracks().forEach(t => pc1.addTrack(t, localStream));
    if (localVideo) localVideo.srcObject = localStream;

    pc2.ontrack = (e) => {
      if (remoteVideo) remoteVideo.srcObject = e.streams[0];
    };

    // Local loopback: pc1 -> pc2 using in-page signaling
    const offer = await pc1.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: !audioOnly });
    await pc1.setLocalDescription(offer);
    await pc2.setRemoteDescription(offer);

    const answer = await pc2.createAnswer();
    await pc2.setLocalDescription(answer);
    await pc1.setRemoteDescription(answer);
  }

  function endCall(){
    [pc1, pc2].forEach(pc => pc && pc.close());
    if (localStream) localStream.getTracks().forEach(t => t.stop());
  }

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('webrtc');
    if (!container) return;
    container.classList.remove('hidden');

    startBtn && startBtn.addEventListener('click', startCall);
    endBtn && endBtn.addEventListener('click', endCall);
  });
})();