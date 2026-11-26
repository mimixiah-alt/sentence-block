let cachedVoices: SpeechSynthesisVoice[] = [];
let voicesListenerRegistered = false;

function refreshVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return [];
  }
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    cachedVoices = voices;
  }
  return cachedVoices;
}

function ensureVoicesListener(): void {
  if (
    voicesListenerRegistered ||
    typeof window === 'undefined' ||
    !('speechSynthesis' in window)
  ) {
    return;
  }

  voicesListenerRegistered = true;
  refreshVoices();

  const synth = window.speechSynthesis;
  const handleVoicesChanged = () => {
    refreshVoices();
  };

  if (typeof synth.addEventListener === 'function') {
    synth.addEventListener('voiceschanged', handleVoicesChanged);
  } else {
    synth.onvoiceschanged = handleVoicesChanged;
  }
}

function pickKoreanVoice(
  voices: readonly SpeechSynthesisVoice[],
): SpeechSynthesisVoice | undefined {
  const yunaVoice = voices.find((voice) => {
    const lowerName = voice.name.toLowerCase();
    return (
      (lowerName.includes('yuna') || voice.name.includes('유나')) &&
      voice.lang.toLowerCase().startsWith('ko')
    );
  });
  if (yunaVoice) return yunaVoice;

  const yunaByNameOnly = voices.find((voice) => {
    const lowerName = voice.name.toLowerCase();
    return lowerName.includes('yuna') || voice.name.includes('유나');
  });
  if (yunaByNameOnly) return yunaByNameOnly;

  return voices.find((voice) => voice.lang.toLowerCase().startsWith('ko'));
}

function speakWithVoices(
  synth: SpeechSynthesis,
  text: string,
  voices: readonly SpeechSynthesisVoice[],
): void {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = 0.85;
  utterance.pitch = 1;

  const koreanVoice = pickKoreanVoice(voices);
  if (koreanVoice) {
    utterance.voice = koreanVoice;
  }

  synth.speak(utterance);
}

/**
 * Speaks Korean text using the browser's built-in Web Speech API.
 */
export function speakKorean(text: string): void {
  const trimmed = text.trim();
  if (!trimmed) return;
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  ensureVoicesListener();

  const synth = window.speechSynthesis;
  synth.cancel();

  const voices = refreshVoices();
  if (voices.length > 0) {
    speakWithVoices(synth, trimmed, voices);
    return;
  }

  // Some browsers populate getVoices() asynchronously via voiceschanged
  let spoken = false;
  const speakOnce = () => {
    if (spoken) return;
    spoken = true;
    if (typeof synth.removeEventListener === 'function') {
      synth.removeEventListener('voiceschanged', onVoicesReady);
    }
    speakWithVoices(synth, trimmed, refreshVoices());
  };

  const onVoicesReady = () => {
    speakOnce();
  };

  if (typeof synth.addEventListener === 'function') {
    synth.addEventListener('voiceschanged', onVoicesReady);
  }
  window.setTimeout(speakOnce, 120);
}

/**
 * Stops any ongoing speech synthesis playback.
 */
export function stopSpeaking(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }
  window.speechSynthesis.cancel();
}
