#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
import os
import json

# Ensure scripts directory in path
sys.path.insert(0, os.path.dirname(__file__))

from vocab_grade3 import G3_UNITS
from vocab_grade4 import G4_UNITS
from vocab_grade5 import G5_UNITS
from vocab_grade6 import G6_UNITS
from vocab_grade7 import G7_UNITS
from vocab_grade8 import G8_UNITS
from vocab_grade9 import G9_UNITS

ALL_UNITS = {}
ALL_UNITS.update(G3_UNITS)
ALL_UNITS.update(G4_UNITS)
ALL_UNITS.update(G5_UNITS)
ALL_UNITS.update(G6_UNITS)
ALL_UNITS.update(G7_UNITS)
ALL_UNITS.update(G8_UNITS)
ALL_UNITS.update(G9_UNITS)

print(f"Total units loaded: {len(ALL_UNITS)}")

# Verification
for uid, words in ALL_UNITS.items():
    if len(words) < 20:
        print(f"WARNING: Unit {uid} has only {len(words)} words!")
    core_count = sum(1 for w in words if w['isCore'])
    adv_count = sum(1 for w in words if not w['isCore'])
    # print(f"  {uid}: {len(words)} words ({core_count} core, {adv_count} adv)")

out_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../src/data/curriculum/unitVocabularyDatabase.ts'))

with open(out_path, 'w', encoding='utf-8') as f:
    f.write("import { WordItem } from '../../types';\n\n")
    f.write("/**\n")
    f.write(" * KHO TỪ VỰNG CHI TIẾT 70 UNITS TOÀN BỘ CHƯƠNG TRÌNH LỚP 3 - 9\n")
    f.write(" * Mỗi Unit được chuẩn hóa 20-22 từ vựng phong phú:\n")
    f.write(" * - 12 từ vựng trọng tâm SGK cơ bản (isCore: true)\n")
    f.write(" * - 8-10 từ vựng mở rộng & nâng cao chuẩn Chuyên Anh / B1+ (isCore: false)\n")
    f.write(" * Đầy đủ phiên âm IPA, từ loại, nghĩa tiếng Việt, câu ví dụ song ngữ, collocation và lưu ý phòng thi.\n")
    f.write(" */\n\n")
    f.write("export const UNIT_VOCABULARY_DATABASE: Record<string, WordItem[]> = {\n")
    for uid, words in sorted(ALL_UNITS.items()):
        f.write(f"  '{uid}': [\n")
        for w in words:
            f.write("    {\n")
            f.write(f"      id: {json.dumps(w['id'])},\n")
            f.write(f"      word: {json.dumps(w['word'])},\n")
            f.write(f"      ipa: {json.dumps(w['ipa'])},\n")
            f.write(f"      partOfSpeech: {json.dumps(w['partOfSpeech'])},\n")
            f.write(f"      meaningVi: {json.dumps(w['meaningVi'], ensure_ascii=False)},\n")
            f.write(f"      exampleEn: {json.dumps(w['exampleEn'])},\n")
            f.write(f"      exampleVi: {json.dumps(w['exampleVi'], ensure_ascii=False)},\n")
            f.write(f"      isCore: {str(w['isCore']).lower()},\n")
            f.write(f"      unitId: {json.dumps(w['unitId'])},\n")
            f.write(f"      grade: {w['grade']},\n")
            if w.get('topic'):
                f.write(f"      topic: {json.dumps(w['topic'], ensure_ascii=False)},\n")
            if w.get('collocation'):
                f.write(f"      collocation: {json.dumps(w['collocation'], ensure_ascii=False)},\n")
            if w.get('examNote'):
                f.write(f"      examNote: {json.dumps(w['examNote'], ensure_ascii=False)},\n")
            f.write("    },\n")
        f.write("  ],\n")
    f.write("};\n\n")
    f.write("export function getVocabulariesForUnit(unitId: string): WordItem[] {\n")
    f.write("  return UNIT_VOCABULARY_DATABASE[unitId] || [];\n")
    f.write("}\n")

print(f"Successfully wrote UNIT_VOCABULARY_DATABASE to {out_path}")
