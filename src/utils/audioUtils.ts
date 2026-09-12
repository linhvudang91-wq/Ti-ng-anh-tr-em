// Speech synthesis and recognition utility

export type Accent = 'US' | 'UK';

class AudioManager {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.updateVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.updateVoices();
      };
    }
  }

  private updateVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.voices = window.speechSynthesis.getVoices();
    }
  }

  public speak(text: string, accent: Accent = 'US', rate: number = 0.9): Promise<void> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = 1.0;

      // Select voice based on accent
      const langCode = accent === 'UK' ? 'en-GB' : 'en-US';
      utterance.lang = langCode;

      const matchedVoice = this.voices.find(v => v.lang.startsWith(langCode)) ||
        this.voices.find(v => v.lang.includes('en'));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onend = () => {
        this.currentUtterance = null;
        resolve();
      };

      utterance.onerror = () => {
        this.currentUtterance = null;
        resolve();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    });
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public playEffect(effect: 'correct' | 'wrong' | 'incorrect' | 'complete' | 'level-up' | 'levelup' | 'click') {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (effect === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (effect === 'correct') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (effect === 'wrong' || effect === 'incorrect') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.setValueAtTime(174.61, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (effect === 'complete' || effect === 'level-up' || effect === 'levelup') {
        const now = ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.09);
          gain.gain.setValueAtTime(0.15, now + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.25);
          osc.start(now + idx * 0.09);
          osc.stop(now + idx * 0.09 + 0.25);
        });
      }
    } catch {
      // Audio context might be restricted before user gesture
    }
  }
}

export const audioManager = new AudioManager();

// Speech Recognition for pronunciation practice
export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

export function startSpeechRecognition(
  onResult: (res: SpeechRecognitionResult) => void,
  onError: (err: string) => void,
  onEnd: () => void
): { stop: () => void } | null {
  if (typeof window === 'undefined') return null;

  const SpeechRecognition = (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    onError('Trình duyệt chưa hỗ trợ Web Speech Recognition. Em có thể luyện tập bằng cách nghe và gõ nhé!');
    return null;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const last = event.results.length - 1;
      const transcript = event.results[last][0].transcript;
      const confidence = event.results[last][0].confidence || 0.9;
      onResult({ transcript, confidence });
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      onError(event.error === 'not-allowed' ? 'Vui lòng cấp quyền truy cập Microphone trong trình duyệt để luyện nói.' : 'Không nhận diện được giọng nói. Em hãy thử lại nhé!');
    };

    recognition.onend = () => {
      onEnd();
    };

    recognition.start();

    return {
      stop: () => {
        try {
          recognition.stop();
        } catch {
          // ignore
        }
      }
    };
  } catch (err: any) {
    onError(err.message || 'Lỗi khởi động micro.');
    return null;
  }
}

// Calculate similarity score between spoken and target text
export function calculateTextSimilarity(spoken: string, target: string): number {
  const cleanSpoken = spoken.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
  const cleanTarget = target.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

  if (!cleanSpoken || !cleanTarget) return 0;
  if (cleanSpoken === cleanTarget) return 100;

  const spokenWords = cleanSpoken.split(/\s+/);
  const targetWords = cleanTarget.split(/\s+/);

  let matchCount = 0;
  for (const word of spokenWords) {
    if (targetWords.includes(word)) {
      matchCount++;
    }
  }

  const wordOverlap = (matchCount / Math.max(targetWords.length, 1)) * 100;
  return Math.min(100, Math.round(wordOverlap));
}
