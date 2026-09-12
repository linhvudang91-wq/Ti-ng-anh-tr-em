import { GradeLevel } from '../types';

export interface PlacementQuestion {
  id: string;
  targetTier: 'grade-3' | 'grade-4' | 'grade-5';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    id: 'pt-1',
    targetTier: 'grade-3',
    question: 'How are you today? - _______',
    options: ['I am eight years old.', 'I am fine, thank you.', 'My name is Peter.'],
    correctIndex: 1,
    explanation: 'Câu hỏi "How are you today?" dùng để hỏi thăm sức khỏe ("Mình khỏe, cảm ơn bạn").',
  },
  {
    id: 'pt-2',
    targetTier: 'grade-3',
    question: 'What color is your school bag? - It is _______.',
    options: ['blue', 'ten', 'a ruler'],
    correctIndex: 0,
    explanation: 'Câu hỏi "What color...?" hỏi về màu sắc (blue = màu xanh da trời).',
  },
  {
    id: 'pt-3',
    targetTier: 'grade-4',
    question: 'What time is it? - It is seven _______ (7:00 đúng).',
    options: ["o'clock", 'hours', 'time'],
    correctIndex: 0,
    explanation: 'Nói giờ đúng trong tiếng Anh dùng "o\'clock" (e.g. seven o\'clock).',
  },
  {
    id: 'pt-4',
    targetTier: 'grade-4',
    question: 'What can you do? - I _______ swim and ride a bicycle.',
    options: ['am', 'can', 'like'],
    correctIndex: 1,
    explanation: 'Diễn tả khả năng làm được việc gì dùng trợ động từ "can".',
  },
  {
    id: 'pt-5',
    targetTier: 'grade-4',
    question: 'What day is it today? - It is _______.',
    options: ['Monday', 'November', 'seven'],
    correctIndex: 0,
    explanation: 'Câu hỏi "What day...?" hỏi về thứ trong tuần (Monday = thứ Hai).',
  },
  {
    id: 'pt-6',
    targetTier: 'grade-5',
    question: 'How _______ do you water the flowers? - Twice a week.',
    options: ['many', 'often', 'much'],
    correctIndex: 1,
    explanation: 'Hỏi về tần suất thực hiện hành động dùng "How often" (Bao lâu một lần).',
  },
  {
    id: 'pt-7',
    targetTier: 'grade-5',
    question: 'Where _______ you go last summer holiday? - I went to Ha Long Bay.',
    options: ['do', 'did', 'are'],
    correctIndex: 1,
    explanation: 'Dấu hiệu "last summer holiday" diễn tả hành động trong quá khứ, dùng trợ động từ "did".',
  },
  {
    id: 'pt-8',
    targetTier: 'grade-5',
    question: 'An elephant is _______ than a monkey.',
    options: ['bigger', 'big', 'more big'],
    correctIndex: 0,
    explanation: 'So sánh hơn của tính từ ngắn "big" là gấp đôi phụ âm g và thêm -er: "bigger".',
  },
];

export function evaluatePlacementTest(score: number): {
  recommendedGrade: GradeLevel;
  tierName: string;
  description: string;
  advice: string;
} {
  if (score <= 3) {
    return {
      recommendedGrade: 3,
      tierName: 'Tiểu học Khởi đầu • Lớp 3 (Level Pre-A1 Starters)',
      description: 'Nền tảng từ vựng qua hình ảnh, phát âm phonics và các câu chào hỏi giao tiếp cơ bản.',
      advice: 'Tập trung học từ vựng qua tranh ảnh, flashcards có âm thanh và trò chơi tương tác mỗi ngày!',
    };
  }
  if (score <= 6) {
    return {
      recommendedGrade: 4,
      tierName: 'Tiểu học Cơ bản • Lớp 4 (Level A1 Movers)',
      description: 'Mở rộng kỹ năng hỏi giờ, các ngày trong tuần, môn học yêu thích và khả năng (Can/Can\'t).',
      advice: 'Luyện tập hội thoại hỏi đáp 2-3 lượt lời và các bài tập điền từ theo chủ đề quen thuộc!',
    };
  }
  return {
    recommendedGrade: 5,
    tierName: 'Tiểu học Nâng cao & Ôn thi Lớp 6 CLC • Lớp 5 (Level A1+ Flyers)',
    description: 'Thành thạo thì Quá khứ đơn, Trạng từ tần suất, So sánh hơn và kỹ năng đọc hiểu bài văn ngắn.',
    advice: 'Tự tin thử sức với các bài đọc hiểu chuyên sâu, mở rộng vốn từ và bộ đề khảo sát vào Lớp 6 THCS CLC!',
  };
}
