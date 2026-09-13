#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Builder for src/data/curriculum/unitVocabularyDatabase.ts
Populates 20-22 vocabulary words for all 70 units across Grade 3 to 9.
"""
import json
import os

units_vocab = {}

# Template helper
def add_unit(unit_id, grade, topic, core_words, adv_words):
    words = []
    # Core words (typically 12 words)
    for idx, item in enumerate(core_words, 1):
        word, ipa, pos, meaning, ex_en, ex_vi, coloc, tip = item
        words.append({
            "id": f"{unit_id}-w{idx}",
            "word": word,
            "ipa": ipa,
            "partOfSpeech": pos,
            "meaningVi": meaning,
            "exampleEn": ex_en,
            "exampleVi": ex_vi,
            "isCore": True,
            "unitId": unit_id,
            "grade": grade,
            "topic": topic,
            "collocation": coloc,
            "examNote": tip
        })
    # Advanced words (typically 8-10 words)
    start_adv = len(core_words) + 1
    for idx, item in enumerate(adv_words, start_adv):
        word, ipa, pos, meaning, ex_en, ex_vi, coloc, tip = item
        words.append({
            "id": f"{unit_id}-w{idx}",
            "word": word,
            "ipa": ipa,
            "partOfSpeech": pos,
            "meaningVi": meaning,
            "exampleEn": ex_en,
            "exampleVi": ex_vi,
            "isCore": False,
            "unitId": unit_id,
            "grade": grade,
            "topic": topic,
            "collocation": coloc,
            "examNote": tip
        })
    units_vocab[unit_id] = words

print("Base setup ready")
