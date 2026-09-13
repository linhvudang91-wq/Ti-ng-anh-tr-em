#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generates src/data/curriculum/unitVocabularyDatabase.ts
All 70 Units across Grades 3 to 9 with 20-22 vocabulary items per unit.
Core SGK (isCore: true) + Advanced/Chuyen (isCore: false)
"""
import json
import os

DATABASE = {}

def make_unit(uid, grade, topic, core_tuples, adv_tuples):
    words = []
    # 12 core words
    for i, t in enumerate(core_tuples, 1):
        words.append({
            "id": f"{uid}-w{i}",
            "word": t[0],
            "ipa": t[1],
            "partOfSpeech": t[2],
            "meaningVi": t[3],
            "exampleEn": t[4],
            "exampleVi": t[5],
            "isCore": True,
            "unitId": uid,
            "grade": grade,
            "topic": topic,
            "collocation": t[6] if len(t) > 6 else "",
            "examNote": t[7] if len(t) > 7 else ""
        })
    # 8-10 advanced words
    start_adv = len(core_tuples) + 1
    for i, t in enumerate(adv_tuples, start_adv):
        words.append({
            "id": f"{uid}-w{i}",
            "word": t[0],
            "ipa": t[1],
            "partOfSpeech": t[2],
            "meaningVi": t[3],
            "exampleEn": t[4],
            "exampleVi": t[5],
            "isCore": False,
            "unitId": uid,
            "grade": grade,
            "topic": topic,
            "collocation": t[6] if len(t) > 6 else "",
            "examNote": t[7] if len(t) > 7 else ""
        })
    DATABASE[uid] = words

print("Base make_unit function initialized")
