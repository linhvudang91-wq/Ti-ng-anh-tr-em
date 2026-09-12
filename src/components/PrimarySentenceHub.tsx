import React, { useState } from 'react';
import { PrimaryPatternItem, PRIMARY_SENTENCE_PATTERNS } from '../data/primaryPatterns';
import { audioManager } from '../utils/audioUtils';
import { Volume2, Sparkles, CheckCircle2, MessageCircle, RefreshCw } from 'lucide-react';

interface PrimarySentenceHubProps {
  grade: number;
  onAddXP: (xp: number) => void;
}

export const PrimarySentenceHub: React.FC<PrimarySentenceHubProps> = ({ grade, onAddXP }) => {
  // Filter patterns matching current primary grade (clamp between 3 and 5)
  const currentGrade = Math.max(3, Math.min(5, grade)) as 3 | 4 | 5;
  const gradePatterns = PRIMARY_SENTENCE_PATTERNS.filter(p => p.grade === currentGrade);

  const [activePatternId, setActivePatternId] = useState<string>(
    gradePatterns[0]?.id || PRIMARY_SENTENCE_PATTERNS[0].id
  );

  const currentPattern =
    gradePatterns.find(p => p.id === activePatternId) ||
    gradePatterns[0] ||
    PRIMARY_SENTENCE_PATTERNS[0];

  // Selected slot options for interactive preview
  const [selectedSlots, setSelectedSlots] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    currentPattern.slots.forEach(slot => {
      init[slot.slotName] = slot.options[0]?.en || '';
    });
    return init;
  });

  // Track if current pattern changed to update slot values
  React.useEffect(() => {
    const init: Record<string, string> = {};
    currentPattern.slots.forEach(slot => {
      init[slot.slotName] = slot.options[0]?.en || '';
    });
    setSelectedSlots(init);
    setPracticed(false);
  }, [currentPattern.id]);

  const [practiced, setPracticed] = useState(false);
  const [activeDialogueLine, setActiveDialogueLine] = useState<'A' | 'B' | null>(null);

  // Compute rendered English sentence based on selected slot options
  const getRenderedSentence = () => {
    let text = currentPattern.patternEn;
    currentPattern.slots.forEach(slot => {
      text = text.replace(`[${slot.slotName}]`, selectedSlots[slot.slotName] || `[${slot.slotName}]`);
    });
    return text;
  };

  const currentEnglishSentence = getRenderedSentence();

  const handleSpeak = (text: string, accent: 'US' | 'UK' = 'US') => {
    audioManager.speak(text, accent, 0.85);
  };

  const handleCompletePractice = () => {
    if (!practiced) {
      setPracticed(true);
      onAddXP(10);
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-yellow-50/60 rounded-2xl border-2 border-amber-300 p-5 sm:p-6 space-y-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-xs">
            🌟
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-amber-950">
                Kho Mẫu Câu Giao Tiếp Tiểu Học (Lớp {currentGrade})
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[11px] font-bold">
                GDPT 2018
              </span>
            </div>
            <p className="text-xs text-amber-800 font-medium mt-0.5">
              Tập trung học từ vựng, ráp câu nhanh và phản xạ giao tiếp tự nhiên
            </p>
          </div>
        </div>

        {practiced && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>+10 XP Bé đã học xong!</span>
          </span>
        )}
      </div>

      {/* Pattern Selector Pills */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
          Chọn mẫu câu em muốn luyện:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {gradePatterns.map(p => {
            const isSelected = p.id === currentPattern.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePatternId(p.id)}
                className={`p-2.5 rounded-xl text-left border transition-all text-xs font-bold flex items-start gap-2 ${
                  isSelected
                    ? 'bg-amber-500 text-white border-amber-600 shadow-xs ring-2 ring-amber-300'
                    : 'bg-white hover:bg-amber-100/70 text-slate-800 border-amber-200'
                }`}
              >
                <span className="text-base shrink-0">{p.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate">{p.titleVi}</div>
                  <div className={`text-[10px] font-normal truncate mt-0.5 ${isSelected ? 'text-amber-100' : 'text-slate-500'}`}>
                    {p.category}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Pattern Card */}
      <div className="bg-white rounded-2xl border border-amber-200 p-4 sm:p-5 space-y-4 shadow-2xs">
        {/* Formula & Vietnamese Translation */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-100 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900">
                {currentPattern.emoji} {currentPattern.titleVi}
              </span>
              <span className="text-xs text-slate-500 italic">
                (Dạng câu: <strong className="text-slate-800 font-mono">{currentPattern.formula}</strong>)
              </span>
            </div>
            <p className="text-xs text-amber-900 font-medium">
              Dịch nghĩa: <em>{currentPattern.patternVi}</em>
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleSpeak(currentEnglishSentence)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-2xs transition-all cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe mẫu câu chuẩn</span>
          </button>
        </div>

        {/* Live Sentence Display */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-center space-y-1.5">
          <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
            Câu hoàn chỉnh khi ghép từ:
          </span>
          <p className="text-base sm:text-xl font-black text-amber-950 leading-relaxed font-sans">
            "{currentEnglishSentence}"
          </p>
        </div>

        {/* Interactive Slots (Thay thế từ ngữ) */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
            Bấm chọn từ vựng để ghép vào câu:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentPattern.slots.map(slot => (
              <div key={slot.slotName} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    Vị trí [{slot.labelVi}]:
                  </span>
                  <span className="text-[10px] text-amber-700 font-semibold">
                    Đang chọn: {selectedSlots[slot.slotName]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {slot.options.map(opt => {
                    const isSelected = selectedSlots[slot.slotName] === opt.en;
                    return (
                      <button
                        key={opt.en}
                        type="button"
                        onClick={() => setSelectedSlots({ ...selectedSlots, [slot.slotName]: opt.en })}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50 hover:border-amber-300'
                        }`}
                        title={`${opt.en} - ${opt.vi}`}
                      >
                        <span>{opt.en}</span>
                        <span className={`text-[10px] ml-1 ${isSelected ? 'text-amber-100' : 'text-slate-400'}`}>
                          ({opt.vi})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-life dialogue exchange */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
              Đoạn hội thoại thực tế có chứa mẫu câu:
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {/* Speaker A */}
            <div
              className={`p-2.5 rounded-lg border transition-all ${
                activeDialogueLine === 'A' ? 'bg-blue-100 border-blue-400' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between font-bold text-slate-800 mb-1">
                <span>{currentPattern.dialogue.speakerA}:</span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveDialogueLine('A');
                    handleSpeak(currentPattern.dialogue.lineAEn, 'US');
                  }}
                  className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                >
                  <Volume2 className="w-3 h-3" />
                  <span>Nghe</span>
                </button>
              </div>
              <p className="font-semibold text-slate-900">"{currentPattern.dialogue.lineAEn}"</p>
              <p className="text-slate-500 text-[11px] mt-0.5">Dịch: {currentPattern.dialogue.lineAVi}</p>
            </div>

            {/* Speaker B */}
            <div
              className={`p-2.5 rounded-lg border transition-all ${
                activeDialogueLine === 'B' ? 'bg-indigo-100 border-indigo-400' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between font-bold text-slate-800 mb-1">
                <span>{currentPattern.dialogue.speakerB}:</span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveDialogueLine('B');
                    handleSpeak(currentPattern.dialogue.lineBEn, 'UK');
                  }}
                  className="text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                >
                  <Volume2 className="w-3 h-3" />
                  <span>Nghe</span>
                </button>
              </div>
              <p className="font-semibold text-slate-900">"{currentPattern.dialogue.lineBEn}"</p>
              <p className="text-slate-500 text-[11px] mt-0.5">Dịch: {currentPattern.dialogue.lineBVi}</p>
            </div>
          </div>
        </div>

        {/* Tip for kids */}
        <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <strong>Mẹo nhớ của Gia Sư: </strong>
            <span>{currentPattern.tipsVi}</span>
          </div>
          <button
            type="button"
            onClick={handleCompletePractice}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 cursor-pointer transition-colors shadow-2xs"
          >
            Đã thuộc mẫu câu này ✨
          </button>
        </div>
      </div>
    </div>
  );
};
