import React, { useState, useEffect } from 'react';
import { SentencePattern } from '../types';
import { audioManager, startSpeechRecognition, calculateTextSimilarity } from '../utils/audioUtils';
import { Volume2, Mic, MicOff, CheckCircle2, RotateCcw, Sparkles, MessageSquare, Languages } from 'lucide-react';
import { PrimarySentenceHub } from './PrimarySentenceHub';

interface SentenceModuleProps {
  sentencePattern: SentencePattern;
  onAddXP: (xp: number) => void;
  grade: number;
}

export const SentenceModule: React.FC<SentenceModuleProps> = ({
  sentencePattern,
  onAddXP,
  grade,
}) => {
  // Slot values state
  const [slotValues, setSlotValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    sentencePattern.slots.forEach(slot => {
      initial[slot.slotName] = slot.options[0] || '';
    });
    return initial;
  });

  // Re-sync slot values whenever sentencePattern changes (e.g. switching units)
  useEffect(() => {
    const next: Record<string, string> = {};
    sentencePattern.slots.forEach(slot => {
      next[slot.slotName] = slot.options[0] || '';
    });
    setSlotValues(next);
    setSpokenText('');
    setPronunciationScore(null);
    setRecError(null);
  }, [sentencePattern.id]);

  // Speech recognition states
  const [isRecording, setIsRecording] = useState(false);
  const [activeSpeechController, setActiveSpeechController] = useState<{ stop: () => void } | null>(null);
  const [spokenText, setSpokenText] = useState<string>('');
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const [recError, setRecError] = useState<string | null>(null);

  // Active dialogue speaker audio
  const [activeSpeaker, setActiveSpeaker] = useState<'A' | 'B' | null>(null);
  const [isPlayingFullDialogue, setIsPlayingFullDialogue] = useState(false);
  const [showDialogueTranslation, setShowDialogueTranslation] = useState(false);

  const handlePlayFullDialogue = () => {
    if (isPlayingFullDialogue) return;
    setIsPlayingFullDialogue(true);
    setActiveSpeaker('A');
    audioManager.speak(sentencePattern.sampleDialogue.lineA, 'US', grade <= 5 ? 0.85 : 0.95);

    // Approximate duration or delay based on line A length
    const wordsCountA = sentencePattern.sampleDialogue.lineA.split(' ').length;
    const delayMs = Math.max(2200, wordsCountA * 550);

    setTimeout(() => {
      setActiveSpeaker('B');
      audioManager.speak(sentencePattern.sampleDialogue.lineB, 'UK', grade <= 5 ? 0.85 : 0.95);

      const wordsCountB = sentencePattern.sampleDialogue.lineB.split(' ').length;
      const delayMsB = Math.max(2200, wordsCountB * 550);

      setTimeout(() => {
        setIsPlayingFullDialogue(false);
        setActiveSpeaker(null);
      }, delayMsB);
    }, delayMs);
  };

  // Generate the formatted sentence with currently chosen slots
  const getRenderedSentence = () => {
    let text = sentencePattern.frame;
    sentencePattern.slots.forEach(slot => {
      text = text.replace(`[${slot.slotName}]`, slotValues[slot.slotName] || `[${slot.slotName}]`);
    });
    return text;
  };

  const currentFormattedSentence = getRenderedSentence();

  const handleSpeakSentence = (text: string) => {
    audioManager.speak(text, 'US', grade <= 5 ? 0.85 : 0.95);
  };

  const handleStartRecording = () => {
    setRecError(null);
    setPronunciationScore(null);
    setSpokenText('');

    const controller = startSpeechRecognition(
      (res) => {
        setSpokenText(res.transcript);
        const score = calculateTextSimilarity(res.transcript, currentFormattedSentence);
        setPronunciationScore(score);
        setIsRecording(false);
        if (score >= 70) {
          onAddXP(15);
        }
      },
      (err) => {
        setRecError(err);
        setIsRecording(false);
      },
      () => {
        setIsRecording(false);
      }
    );

    if (controller) {
      setActiveSpeechController(controller);
      setIsRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (activeSpeechController) {
      activeSpeechController.stop();
      setActiveSpeechController(null);
    }
    setIsRecording(false);
  };

  return (
    <div className="space-y-6">
      {/* Kho mẫu câu tương tác riêng biệt dành cho học sinh Tiểu học (Lớp 3 - 4 - 5) */}
      {grade <= 5 && (
        <PrimarySentenceHub grade={grade} onAddXP={onAddXP} />
      )}

      {/* Introduction Card */}
      <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-4 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-indigo-600 text-white shrink-0 mt-0.5">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">
            {grade <= 5 ? 'Mẫu câu trọng tâm của bài học' : 'Mẫu câu giao tiếp & Cấu trúc diễn đạt'}
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            {sentencePattern.contextVi}
          </p>
        </div>
      </div>

      {/* 1. INTERACTIVE SENTENCE FRAME (Cấu trúc khung & Thay thế từ) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
            1. Cấu trúc khung tương tác (Sentence Frame)
          </span>
          <button
            onClick={() => handleSpeakSentence(currentFormattedSentence)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe mẫu</span>
          </button>
        </div>

        {/* Dynamic Display */}
        <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-base sm:text-lg leading-relaxed shadow-inner text-center">
          {currentFormattedSentence}
        </div>

        {/* Slot replacement selectors */}
        <div className="space-y-3 pt-2">
          <p className="text-xs font-semibold text-slate-700">
            Thử thay thế các thành phần trong câu (Substitution Drill):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sentencePattern.slots.map(slot => (
              <div key={slot.slotName} className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
                <label className="text-xs font-bold text-slate-700 capitalize">
                  Vị trí [{slot.slotName}]:
                </label>
                <select
                  value={slotValues[slot.slotName]}
                  onChange={(e) => setSlotValues({ ...slotValues, [slot.slotName]: e.target.value })}
                  className="w-full text-xs font-medium bg-white border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
                >
                  {slot.options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Voice recording & AI pronunciation feedback */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">
              🎙️ Luyện nói & Chấm điểm phát âm chuẩn:
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            {!isRecording ? (
              <button
                id="btn-start-record-sentence"
                onClick={handleStartRecording}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
              >
                <Mic className="w-4 h-4" />
                <span>Bắt đầu nói câu này</span>
              </button>
            ) : (
              <button
                id="btn-stop-record-sentence"
                onClick={handleStopRecording}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg animate-pulse"
              >
                <MicOff className="w-4 h-4" />
                <span>Dừng & Đánh giá</span>
              </button>
            )}

            {isRecording && (
              <span className="text-xs font-semibold text-rose-600 animate-pulse">
                Đang lắng nghe giọng em... Hãy phát âm to và rõ ràng nhé!
              </span>
            )}

            {pronunciationScore !== null && (
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  pronunciationScore >= 80
                    ? 'bg-emerald-100 text-emerald-800'
                    : pronunciationScore >= 60
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  Độ chính xác: {pronunciationScore}%
                </span>
                {spokenText && (
                  <span className="text-xs text-slate-600 italic">
                    (Máy nghe được: "{spokenText}")
                  </span>
                )}
              </div>
            )}
          </div>

          {recError && (
            <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
              {recError}
            </p>
          )}
        </div>
      </div>

      {/* 2. SAMPLE DIALOGUE (Đối thoại mẫu chuẩn bản ngữ) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
            2. Đoạn hội thoại mẫu thực tế
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDialogueTranslation(!showDialogueTranslation)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-all"
            >
              <Languages className="w-3.5 h-3.5 text-slate-500" />
              <span>{showDialogueTranslation ? 'Ẩn lời dịch' : 'Hiện lời dịch'}</span>
            </button>
            <button
              onClick={handlePlayFullDialogue}
              disabled={isPlayingFullDialogue}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs ${
                isPlayingFullDialogue
                  ? 'bg-amber-500 text-white animate-pulse'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isPlayingFullDialogue ? 'Đang phát hội thoại...' : 'Phát toàn bộ đoạn thoại (A & B)'}</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {/* Speaker A */}
          <div className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
            activeSpeaker === 'A' ? 'bg-blue-100/70 border-blue-400 ring-2 ring-blue-200' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0">
              A
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">{sentencePattern.sampleDialogue.speakerA}</span>
                <button
                  onClick={() => {
                    setActiveSpeaker('A');
                    audioManager.speak(sentencePattern.sampleDialogue.lineA, 'US');
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu A</span>
                </button>
              </div>
              <p className="text-sm text-slate-900 font-medium mt-1">
                "{sentencePattern.sampleDialogue.lineA}"
              </p>
            </div>
          </div>

          {/* Speaker B */}
          <div className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
            activeSpeaker === 'B' ? 'bg-indigo-100/70 border-indigo-400 ring-2 ring-indigo-200' : 'bg-indigo-50/50 border-indigo-200'
          }`}>
            <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs shrink-0">
              B
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">{sentencePattern.sampleDialogue.speakerB}</span>
                <button
                  onClick={() => {
                    setActiveSpeaker('B');
                    audioManager.speak(sentencePattern.sampleDialogue.lineB, 'UK');
                  }}
                  className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-semibold"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu B</span>
                </button>
              </div>
              <p className="text-sm text-slate-900 font-medium mt-1">
                "{sentencePattern.sampleDialogue.lineB}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Notes for Grades 7-9 */}
      {sentencePattern.academicNotes && (
        <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Mẹo viết đoạn văn học thuật (Ôn thi vào 10):</span>
          </div>
          <p>{sentencePattern.academicNotes}</p>
        </div>
      )}
    </div>
  );
};
