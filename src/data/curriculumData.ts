import { UnitData, GradeLevel, TextbookSeries } from '../types';
import { GRADE_3_UNITS } from './curriculum/grade3';
import { GRADE_4_UNITS } from './curriculum/grade4';
import { GRADE_5_UNITS } from './curriculum/grade5';
import { GRADE_6_UNITS } from './curriculum/grade6';
import { GRADE_7_UNITS } from './curriculum/grade7';
import { GRADE_8_UNITS } from './curriculum/grade8';
import { GRADE_9_UNITS } from './curriculum/grade9';
import { UNIT_VOCABULARY_DATABASE } from './curriculum/unitVocabularyDatabase';

export const TEXTBOOK_NAMES: Record<TextbookSeries, { name: string; publisher: string; badge: string }> = {
  'global-success': {
    name: 'Global Success',
    publisher: 'NXB Giáo Dục Việt Nam (Kết Nối Tri Thức)',
    badge: 'Phổ biến nhất GDPT 2018',
  },
  'smart-world': {
    name: 'i-Learn Smart World',
    publisher: 'Đại Trường Phát & Macmillan',
    badge: 'Tương tác & chuẩn quốc tế',
  },
  'friends-plus': {
    name: 'Friends Plus',
    publisher: 'NXB Giáo Dục VN & Oxford University Press',
    badge: 'Chân Trời Sáng Tạo',
  },
};

const RAW_UNITS: UnitData[] = [
  ...GRADE_3_UNITS,
  ...GRADE_4_UNITS,
  ...GRADE_5_UNITS,
  ...GRADE_6_UNITS,
  ...GRADE_7_UNITS,
  ...GRADE_8_UNITS,
  ...GRADE_9_UNITS,
];

// Tự động tích hợp kho từ vựng chuẩn hóa 20-22 từ/unit (cơ bản + nâng cao) vào từng Unit
export const CURRICULUM_UNITS: UnitData[] = RAW_UNITS.map((unit) => {
  const dbVocab = UNIT_VOCABULARY_DATABASE[unit.id];
  if (dbVocab && dbVocab.length > 0) {
    return {
      ...unit,
      vocabularies: dbVocab,
    };
  }
  return unit;
});

/**
 * Lấy danh sách Unit theo lớp (Grade 3 - 9)
 */
export function getUnitsByGrade(grade: GradeLevel): UnitData[] {
  return CURRICULUM_UNITS.filter((u) => u.grade === grade);
}

/**
 * Lấy danh sách Unit theo cấp học: Cấp 1 (Lớp 3, 4, 5) hoặc Cấp 2 (Lớp 6, 7, 8, 9)
 */
export function getUnitsByEducationLevel(level: 'cap-1' | 'cap-2'): UnitData[] {
  if (level === 'cap-1') {
    return CURRICULUM_UNITS.filter((u) => u.grade >= 3 && u.grade <= 5);
  }
  return CURRICULUM_UNITS.filter((u) => u.grade >= 6 && u.grade <= 9);
}

/**
 * Tìm Unit theo ID
 */
export function getUnitById(unitId: string): UnitData | undefined {
  return CURRICULUM_UNITS.find((u) => u.id === unitId);
}
