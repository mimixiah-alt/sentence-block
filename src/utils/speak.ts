/**
 * Speaks Korean text using the browser's built-in Web Speech API.
 */
export function speakKorean(text: string): void {
  const trimmed = text.trim();
  if (!trimmed) return;
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  const synth = window.speechSynthesis;
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(trimmed);
  utterance.lang = 'ko-KR';
  utterance.rate = 0.92;
  utterance.pitch = 1;

  const voices = synth.getVoices();
  const koreanVoice = voices.find((voice) =>
    voice.lang.toLowerCase().startsWith('ko'),
  );
  if (koreanVoice) {
    utterance.voice = koreanVoice;
  }

  synth.speak(utterance);
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

