import { UnitData } from '../../types';

export const GRADE_4_UNITS: UnitData[] = [
  // Unit 1
  {
    id: 'unit-g4-u1',
    unitNumber: 1,
    title: 'My Friends & Countries',
    themeVi: 'Bạn bè & Quốc tịch các nước',
    themeIcon: '🌏',
    grade: 4,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Hỏi quê hương và quốc tịch các bạn bè quốc tế (Vietnam, England, America, Australia, Japan), cấu trúc "Where are you from? - I am from..."',
    vocabularies: [
      { id: 'g4-u1-w1', word: 'Vietnam', ipa: '/ˌvjetˈnæm/', partOfSpeech: 'noun', meaningVi: 'Việt Nam (Quốc tịch: Vietnamese)', exampleEn: 'I am from Vietnam.', exampleVi: 'Tớ đến từ Việt Nam.', isCore: true, unitId: 'unit-g4-u1', grade: 4 },
      { id: 'g4-u1-w2', word: 'England', ipa: '/ˈɪŋɡlənd/', partOfSpeech: 'noun', meaningVi: 'Nước Anh (Quốc tịch: English)', exampleEn: 'Tony is from England.', exampleVi: 'Tony đến từ nước Anh.', isCore: true, unitId: 'unit-g4-u1', grade: 4 },
      { id: 'g4-u1-w3', word: 'America', ipa: '/əˈmerɪkə/', partOfSpeech: 'noun', meaningVi: 'Nước Mỹ (American)', exampleEn: 'Linda comes from America.', exampleVi: 'Linda đến từ nước Mỹ.', isCore: true, unitId: 'unit-g4-u1', grade: 4 },
      { id: 'g4-u1-w4', word: 'Country', ipa: '/ˈkʌntri/', partOfSpeech: 'noun', meaningVi: 'Đất nước, quốc gia', exampleEn: 'Vietnam is a beautiful country.', exampleVi: 'Việt Nam là một đất nước tươi đẹp.', isCore: true, unitId: 'unit-g4-u1', grade: 4 },
    ],
    grammar: {
      id: 'g4-u1-gram',
      title: 'Mẫu câu hỏi xuất thân Where are you from? / Where is he/she from?',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Hakim: "Where are you from, Mai?" - Mai: "I am from Vietnam. I am Vietnamese."',
        highlights: ['Where are you from', 'I am from'],
        explanationFriendly: 'Phân biệt Tên nước (Vietnam, England, Japan) và Quốc tịch (Vietnamese, English, Japanese). Trả lời xuất thân: "I am from + [Tên nước]".',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Where are you from? -> I am from [Country]. Where is he/she from? -> He/She is from [Country].',
        formulaItems: [
          { label: 'Hỏi bạn', structure: 'Where are you from?', example: 'Where are you from?' },
          { label: 'Hỏi bạn ấy', structure: 'Where is he / she from?', example: 'Where is she from?' },
          { label: 'Trả lời', structure: 'I am / She is from + [Country].', example: 'She is from Japan.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g4-u1-ex1',
          level: 'nhan-biet',
          question: 'Where are you from? - I am from _______.',
          options: ['Vietnam', 'Vietnamese', 'English'],
          correctIndex: 0,
          explanationVi: 'Sau "from" cần một tên quốc gia (Vietnam).',
        },
      ],
    },
    sentencePattern: {
      id: 'g4-u1-sp',
      frame: 'Where are you from? - I am from [country].',
      slots: [{ slotName: 'country', options: ['Vietnam', 'England', 'America', 'Australia', 'Japan'] }],
      contextVi: 'Giao lưu cùng bạn bè quốc tế trong hội trại thanh thiếu niên.',
      sampleDialogue: {
        speakerA: 'Hi, I am Akiko. Where are you from?',
        lineA: 'Nice to meet you!',
        speakerB: 'Hello Akiko! I am from Vietnam.',
        lineB: 'Welcome to Hanoi!',
      },
      substitutionDrills: [
        { prompt: 'Nói bạn đến từ nước Úc:', expectedPattern: 'I am from Australia.', cueWords: ['from Australia'] },
      ],
    },
    realLife: [
      {
        id: 'g4-u1-rl',
        title: 'Chào đón bạn du học sinh quốc tế',
        roleA: 'Học sinh Việt Nam',
        roleB: 'Bạn học sinh quốc tế',
        exchanges: [
          { speaker: 'Nam', lineEn: 'Welcome to our school! Where are you from?', lineVi: 'Chào mừng bạn đến trường chúng mình! Bạn đến từ nước nào vậy?' },
          { speaker: 'Tom', lineEn: 'I am from England. I love Vietnamese food!', lineVi: 'Tớ đến từ nước Anh. Tớ rất mê đồ ăn Việt Nam!' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g4-u1-q1',
        type: 'multiple-choice',
        question: 'Chọn câu hỏi xuất thân chuẩn xác:',
        options: ['Where are you from?', 'Where do you from?', 'Where are you come?'],
        correctIndex: 0,
        explanation: 'Cấu trúc chuẩn: "Where are you from?".',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 2
  {
    id: 'unit-g4-u2',
    unitNumber: 2,
    title: 'Time & Daily Routines',
    themeVi: 'Thời gian & Thói quen hàng ngày',
    themeIcon: '⏰',
    grade: 4,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Hỏi giờ giấc "What time is it? - It is...", các hoạt động thường ngày (get up, have breakfast, go to school, go to bed).',
    vocabularies: [
      { id: 'g4-u2-w1', word: 'Time', ipa: '/taɪm/', partOfSpeech: 'noun', meaningVi: 'Thời gian, giờ giấc', exampleEn: 'What time is it now?', exampleVi: 'Bây giờ là mấy giờ rồi?', isCore: true, unitId: 'unit-g4-u2', grade: 4 },
      { id: 'g4-u2-w2', word: 'O\'clock', ipa: '/əˈklɒk/', partOfSpeech: 'adverb', meaningVi: 'Giờ đúng (chính xác)', exampleEn: 'It is seven o\'clock.', exampleVi: 'Bây giờ là 7 giờ đúng.', isCore: true, unitId: 'unit-g4-u2', grade: 4 },
      { id: 'g4-u2-w3', word: 'Breakfast', ipa: '/ˈbrekfəst/', partOfSpeech: 'noun', meaningVi: 'Bữa ăn sáng', exampleEn: 'I have breakfast at six thirty.', exampleVi: 'Tớ ăn sáng vào lúc 6 giờ 30 phút.', isCore: true, unitId: 'unit-g4-u2', grade: 4 },
      { id: 'g4-u2-w4', word: 'Go to bed', ipa: '/ɡəʊ tuː bed/', partOfSpeech: 'phrase', meaningVi: 'Đi ngủ', exampleEn: 'I go to bed at nine o\'clock.', exampleVi: 'Tớ đi ngủ lúc 9 giờ tối.', isCore: true, unitId: 'unit-g4-u2', grade: 4 },
    ],
    grammar: {
      id: 'g4-u2-gram',
      title: 'Hỏi giờ What time is it? & Giới từ chỉ thời gian At',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Mom: "What time is it, Tom?" - Tom: "It is six forty-five. Time to get ready for school!"',
        highlights: ['What time is it', 'It is six forty-five'],
        explanationFriendly: 'Hỏi giờ: "What time is it?". Trả lời: "It is + [số giờ] (+ o\'clock / số phút)". Khi nói làm việc gì vào lúc mấy giờ, dùng giới từ "at" (at 7 o\'clock).',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'What time is it? -> It is [hour] [minute]. I [action] at [time].',
        formulaItems: [
          { label: 'Hỏi giờ hiện tại', structure: 'What time is it?', example: 'What time is it?' },
          { label: 'Giờ kèm hoạt động', structure: 'I [V] at + [time].', example: 'I get up at six o\'clock.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g4-u2-ex1',
          level: 'nhan-biet',
          question: 'Điền giới từ: "I go to school _______ seven o\'clock."',
          options: ['at', 'in', 'on'],
          correctIndex: 0,
          explanationVi: 'Đi với mốc giờ chính xác luôn dùng giới từ "at".',
        },
      ],
    },
    sentencePattern: {
      id: 'g4-u2-sp',
      frame: 'What time do you [routine]? - I [routine] at [time].',
      slots: [
        { slotName: 'routine', options: ['get up', 'have breakfast', 'go to school', 'have dinner'] },
        { slotName: 'time', options: ['six o\'clock', 'six thirty', 'seven o\'clock', 'eight o\'clock'] },
      ],
      contextVi: 'Kể về thời gian biểu biểu mẫu của một ngày năng động.',
      sampleDialogue: {
        speakerA: 'What time do you go to school, Mai?',
        lineA: 'Do you go early?',
        speakerB: 'I go to school at seven o\'clock.',
        lineB: 'Class starts at seven fifteen.',
      },
      substitutionDrills: [
        { prompt: 'Nói em thức dậy lúc 6 giờ sáng:', expectedPattern: 'I get up at six o\'clock.', cueWords: ['get up', 'at six o\'clock'] },
      ],
    },
    realLife: [
      {
        id: 'g4-u2-rl',
        title: 'Giữ thói quen sinh hoạt đúng giờ',
        roleA: 'Mẹ',
        roleB: 'Con ngoan',
        exchanges: [
          { speaker: 'Mẹ', lineEn: 'It is nine thirty, Nam. Time for bed!', lineVi: 'Đã 9 giờ rưỡi rồi Nam ơi. Đến giờ đi ngủ rồi con!' },
          { speaker: 'Nam', lineEn: 'Good night, Mom! I will sleep well.', lineVi: 'Con chúc mẹ ngủ ngon ạ! Con đi ngủ ngay đây.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g4-u2-q1',
        type: 'multiple-choice',
        question: '7:30 đọc là gì trong tiếng Anh?',
        options: ['Seven thirty', 'Seven thirteen', 'Thirty seven'],
        correctIndex: 0,
        explanation: '7:30 đọc số giờ trước số phút sau: seven thirty.',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 3
  {
    id: 'unit-g4-u3',
    unitNumber: 3,
    title: 'Days of the Week & Schedules',
    themeVi: 'Các ngày trong tuần & Thời khóa biểu',
    themeIcon: '📅',
    grade: 4,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Tên 7 ngày trong tuần (Monday to Sunday), giới từ ON trước ngày, hỏi "What day is it today? - It is..." và "What do you do on...?"',
    vocabularies: [
      { id: 'g4-u3-w1', word: 'Monday', ipa: '/ˈmʌndeɪ/', partOfSpeech: 'noun', meaningVi: 'Thứ Hai', exampleEn: 'We have flag ceremony on Monday.', exampleVi: 'Chúng tớ làm lễ chào cờ vào Thứ Hai.', isCore: true, unitId: 'unit-g4-u3', grade: 4 },
      { id: 'g4-u3-w2', word: 'Friday', ipa: '/ˈfraɪdeɪ/', partOfSpeech: 'noun', meaningVi: 'Thứ Sáu', exampleEn: 'Friday is the last school day of the week.', exampleVi: 'Thứ Sáu là ngày học cuối cùng trong tuần.', isCore: true, unitId: 'unit-g4-u3', grade: 4 },
      { id: 'g4-u3-w3', word: 'Weekend', ipa: '/ˌwiːkˈend/', partOfSpeech: 'noun', meaningVi: 'Cuối tuần (Thứ Bảy & Chủ Nhật)', exampleEn: 'I visit my grandparents at the weekend.', exampleVi: 'Tớ về thăm ông bà vào dịp cuối tuần.', isCore: true, unitId: 'unit-g4-u3', grade: 4 },
      { id: 'g4-u3-w4', word: 'Sunday', ipa: '/ˈsʌndeɪ/', partOfSpeech: 'noun', meaningVi: 'Chủ Nhật', exampleEn: 'We don\'t go to school on Sunday.', exampleVi: 'Chúng tớ không phải đi học vào ngày Chủ Nhật.', isCore: true, unitId: 'unit-g4-u3', grade: 4 },
    ],
    grammar: {
      id: 'g4-u3-gram',
      title: 'Hỏi ngày What day is it today? & Giới từ ON trước thứ trong tuần',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Peter: "What day is it today?" - Linda: "It is Wednesday. We have English class today!"',
        highlights: ['What day is it today', 'It is Wednesday', 'on Wednesday'],
        explanationFriendly: 'Quy tắc vàng: Luôn dùng giới từ "ON" trước các ngày trong tuần (on Monday, on Tuesday...). Hỏi thứ mấy: "What day is it today?".',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'ON + Monday / Tuesday / Wednesday / Thursday / Friday / Saturday / Sunday.',
        formulaItems: [
          { label: 'Hỏi ngày hôm nay', structure: 'What day is it today?', example: 'What day is it today?' },
          { label: 'Trả lời ngày', structure: 'It is + [Thứ trong tuần].', example: 'It is Friday.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g4-u3-ex1',
          level: 'nhan-biet',
          question: 'Điền giới từ thích hợp: "I play football _______ Saturdays."',
          options: ['on', 'in', 'at'],
          correctIndex: 0,
          explanationVi: 'Trước thứ trong tuần bắt buộc dùng giới từ "on".',
        },
      ],
    },
    sentencePattern: {
      id: 'g4-u3-sp',
      frame: 'What do you do on [day]? - I [activity] on [day].',
      slots: [
        { slotName: 'day', options: ['Mondays', 'Wednesdays', 'Saturdays', 'Sundays'] },
        { slotName: 'activity', options: ['go to school', 'help my parents', 'swim with friends', 'learn English'] },
      ],
      contextVi: 'Trao đổi kế hoạch hoạt động các ngày trong tuần.',
      sampleDialogue: {
        speakerA: 'What day is it today, Phong?',
        lineA: 'Is it Tuesday?',
        speakerB: 'No, it is Thursday.',
        lineB: 'I have Music and Science today.',
      },
      substitutionDrills: [
        { prompt: 'Nói hôm nay là Thứ Sáu:', expectedPattern: 'It is Friday today.', cueWords: ['It is Friday'] },
      ],
    },
    realLife: [
      {
        id: 'g4-u3-rl',
        title: 'Xem thời khóa biểu chuẩn bị sách vở',
        roleA: 'Học sinh',
        roleB: 'Bạn cùng bàn',
        exchanges: [
          { speaker: 'Linh', lineEn: 'What subjects do we have on Wednesday?', lineVi: 'Thứ Tư chúng mình học những môn gì thế?' },
          { speaker: 'Mai', lineEn: 'We have English, Maths and Art.', lineVi: 'Chúng mình có Tiếng Anh, Toán và Mỹ thuật nhé.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g4-u3-q1',
        type: 'multiple-choice',
        question: 'Ngày đứng ngay sau Thứ Hai (Monday) là:',
        options: ['Tuesday', 'Wednesday', 'Thursday'],
        correctIndex: 0,
        explanation: 'Thứ Ba là Tuesday.',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 4
  {
    id: 'unit-g4-u4',
    unitNumber: 4,
    title: 'Months & Birthdays',
    themeVi: 'Tháng trong năm & Ngày sinh nhật',
    themeIcon: '🎂',
    grade: 4,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Tên 12 tháng trong năm (January to December), giới từ IN trước tháng, hỏi "When is your birthday? - It is in..."',
    vocabularies: [
      { id: 'g4-u4-w1', word: 'Birthday', ipa: '/ˈbɜːθdeɪ/', partOfSpeech: 'noun', meaningVi: 'Ngày sinh nhật', exampleEn: 'Happy birthday to you!', exampleVi: 'Chúc mừng sinh nhật bạn!', isCore: true, unitId: 'unit-g4-u4', grade: 4 },
      { id: 'g4-u4-w2', word: 'January', ipa: '/ˈdʒænjuəri/', partOfSpeech: 'noun', meaningVi: 'Tháng Một', exampleEn: 'New Year begins in January.', exampleVi: 'Năm mới bắt đầu vào tháng Một.', isCore: true, unitId: 'unit-g4-u4', grade: 4 },
      { id: 'g4-u4-w3', word: 'June', ipa: '/dʒuːn/', partOfSpeech: 'noun', meaningVi: 'Tháng Sáu (Bắt đầu mùa hè)', exampleEn: 'Summer vacation starts in June.', exampleVi: 'Kỳ nghỉ hè bắt đầu vào tháng Sáu.', isCore: true, unitId: 'unit-g4-u4', grade: 4 },
      { id: 'g4-u4-w4', word: 'November', ipa: '/nəʊˈvembər/', partOfSpeech: 'noun', meaningVi: 'Tháng Mười Một (Tháng Tri ân Thầy Cô)', exampleEn: 'Teacher\'s Day is in November.', exampleVi: 'Ngày Nhà giáo Việt Nam vào tháng Mười Một.', isCore: true, unitId: 'unit-g4-u4', grade: 4 },
    ],
    grammar: {
      id: 'g4-u4-gram',
      title: 'Hỏi sinh nhật When is your birthday? & Giới từ IN trước tháng',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Nam: "When is your birthday, Mai?" - Mai: "It is in September. What about you?"',
        highlights: ['When is your birthday', 'It is in September'],
        explanationFriendly: 'Quy tắc: Đi với tháng dùng giới từ "IN" (in May, in June). Nhưng nếu có cả ngày và tháng thì dùng "ON" (on the fifth of May).',
      },
      step2VisualDiagram: {
        diagramType: 'cards',
        notesVi: 'IN + Month (in July) | ON + Date (on the 2nd of July)',
        formulaItems: [
          { label: 'Hỏi sinh nhật', structure: 'When is your birthday?', example: 'When is your birthday?' },
          { label: 'Trả lời tháng', structure: 'It is in + [Tháng].', example: 'It is in October.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g4-u4-ex1',
          level: 'nhan-biet',
          question: 'Điền giới từ: "My birthday is _______ August."',
          options: ['in', 'on', 'at'],
          correctIndex: 0,
          explanationVi: 'Trước tên tháng dùng giới từ "in".',
        },
      ],
    },
    sentencePattern: {
      id: 'g4-u4-sp',
      frame: 'When is your birthday? - It is in [month].',
      slots: [{ slotName: 'month', options: ['January', 'March', 'May', 'August', 'December'] }],
      contextVi: 'Ghi chép ngày sinh nhật của bạn bè để gửi thiệp chúc mừng.',
      sampleDialogue: {
        speakerA: 'When is your birthday, Tony?',
        lineA: 'I want to write a card for you.',
        speakerB: 'It is in December.',
        lineB: 'On the twelfth of December!',
      },
      substitutionDrills: [
        { prompt: 'Hỏi khi nào đến sinh nhật bạn:', expectedPattern: 'When is your birthday?', cueWords: ['When is', 'your birthday'] },
      ],
    },
    realLife: [
      {
        id: 'g4-u4-rl',
        title: 'Tổ chức tiệc sinh nhật bất ngờ cho bạn',
        roleA: 'Lớp trưởng',
        roleB: 'Cả lớp',
        exchanges: [
          { speaker: 'Lớp trưởng', lineEn: 'Minh\'s birthday is in July! Let\'s prepare a song.', lineVi: 'Sinh nhật Minh vào tháng Bảy đấy! Chúng mình cùng chuẩn bị bài hát chúc mừng nhé.' },
          { speaker: 'Cả lớp', lineEn: 'Yes! We will sing Happy Birthday.', lineVi: 'Đồng ý! Chúng mình sẽ cùng hát vang bài chúc mừng sinh nhật.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g4-u4-q1',
        type: 'multiple-choice',
        question: 'Từ nào chỉ tháng cuối cùng trong năm (Tháng 12)?',
        options: ['December', 'November', 'October'],
        correctIndex: 0,
        explanation: 'Tháng 12 là December.',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 5
  {
    id: 'unit-g4-u5',
    unitNumber: 5,
    title: 'Can & Abilities',
    themeVi: 'Khả năng & Năng khiếu cá nhân',
    themeIcon: '🏊‍♂️',
    grade: 4,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Động từ khuyết thiếu CAN và CAN\'T (swim, ride a bike, play the piano, speak English), hỏi "Can you...? - Yes, I can / No, I can\'t."',
    vocabularies: [
      { id: 'g4-u5-w1', word: 'Can', ipa: '/kæn/', partOfSpeech: 'modal verb', meaningVi: 'Có thể (chỉ khả năng làm được việc gì)', exampleEn: 'I can swim very well.', exampleVi: 'Tớ có thể bơi rất giỏi.', isCore: true, unitId: 'unit-g4-u5', grade: 4 },
      { id: 'g4-u5-w2', word: 'Swim', ipa: '/swɪm/', partOfSpeech: 'verb', meaningVi: 'Bơi lội', exampleEn: 'Fish can swim in water.', exampleVi: 'Cá có thể bơi trong nước.', isCore: true, unitId: 'unit-g4-u5', grade: 4 },
      { id: 'g4-u5-w3', word: 'Ride a bike', ipa: '/raɪd ə baɪk/', partOfSpeech: 'phrase', meaningVi: 'Đi xe đạp', exampleEn: 'He can ride a bike to school.', exampleVi: 'Cậu ấy có thể tự đạp xe đến trường.', isCore: true, unitId: 'unit-g4-u5', grade: 4 },
      { id: 'g4-u5-w4', word: 'Sing', ipa: '/sɪŋ/', partOfSpeech: 'verb', meaningVi: 'Ca hát', exampleEn: 'She can sing sweet English songs.', exampleVi: 'Bạn ấy có thể hát những bài hát tiếng Anh thật ngọt ngào.', isCore: true, unitId: 'unit-g4-u5', grade: 4 },
    ],
    grammar: {
      id: 'g4-u5-gram',
      title: 'Động từ khuyết thiếu CAN / CANNOT (CAN\'T) & Động từ nguyên mẫu',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Peter: "Can you play the guitar?" - Nam: "No, I can\'t. But I can sing!"',
        highlights: ['Can you play', 'I can\'t', 'I can sing'],
        explanationFriendly: 'Sau CAN và CAN\'T luôn luôn là động từ nguyên mẫu không chia. Câu hỏi đảo Can lên đầu: "Can you + [động từ]?".',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'S + can + V(nguyên mẫu). Can you + V? -> Yes, I can / No, I can\'t.',
        formulaItems: [
          { label: 'Khẳng định', structure: 'S + can + V-infinitive.', example: 'I can swim.' },
          { label: 'Phủ định', structure: 'S + cannot (can\'t) + V-infinitive.', example: 'He can\'t draw.' },
          { label: 'Nghi vấn', structure: 'Can you + V-infinitive?', example: 'Can you dance?' },
        ],
      },
      step3Exercises: [
        {
          id: 'g4-u5-ex1',
          level: 'nhan-biet',
          question: 'Sau CAN dùng dạng động từ nào: "She can _______ (sing) beautifully."',
          options: ['sing', 'sings', 'singing'],
          correctIndex: 0,
          explanationVi: 'Sau động từ khiếm khuyết CAN giữ nguyên dạng: sing.',
        },
      ],
    },
    sentencePattern: {
      id: 'g4-u5-sp',
      frame: 'Can you [skill]? - Yes, I can. / No, I can\'t.',
      slots: [{ slotName: 'skill', options: ['swim', 'ride a bicycle', 'play badminton', 'cook', 'draw pictures'] }],
      contextVi: 'Tìm kiếm tài năng biểu diễn cho ngày hội âm nhạc của trường.',
      sampleDialogue: {
        speakerA: 'Can you play the piano, Mai?',
        lineA: 'We need a pianist for the show.',
        speakerB: 'Yes, I can!',
        lineB: 'I have practiced for two years.',
      },
      substitutionDrills: [
        { prompt: 'Hỏi bạn có biết bơi không:', expectedPattern: 'Can you swim?', cueWords: ['Can you', 'swim'] },
      ],
    },
    realLife: [
      {
        id: 'g4-u5-rl',
        title: 'Đăng ký câu lạc bộ kỹ năng hè',
        roleA: 'Thầy phụ trách',
        roleB: 'Học sinh đăng ký',
        exchanges: [
          { speaker: 'Thầy giáo', lineEn: 'Can you play chess or table tennis?', lineVi: 'Em có biết chơi cờ vua hay bóng bàn không?' },
          { speaker: 'An', lineEn: 'I can play chess very well, sir!', lineVi: 'Em chơi cờ vua rất tốt ạ thưa thầy!' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g4-u5-q1',
        type: 'multiple-choice',
        question: 'Chọn câu trả lời phủ định cho câu "Can you dance?":',
        options: ['No, I can\'t', 'No, I don\'t', 'No, I am not'],
        correctIndex: 0,
        explanation: 'Hỏi bằng "Can you" thì phủ định là "No, I can\'t".',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 6 (Semester 2)
  {
    id: 'unit-g4-u6',
    unitNumber: 6,
    title: 'My School & Places',
    themeVi: 'Trường học & Các phòng chức năng',
    themeIcon: '🏫',
    grade: 4,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Các địa điểm trong trường (computer room, library, gym, art room, music room), vị trí trường ở phố hay làng quê.',
    vocabularies: [
      { id: 'g4-u6-w1', word: 'Library', ipa: '/ˈlaɪbrəri/', partOfSpeech: 'noun', meaningVi: 'Thư viện trường học', exampleEn: 'We read storybooks in the library.', exampleVi: 'Chúng tớ đọc truyện tranh ở thư viện.', isCore: true, unitId: 'unit-g4-u6', grade: 4 },
      { id: 'g4-u6-w2', word: 'Computer room', ipa: '/kəmˈpjuːtər ruːm/', partOfSpeech: 'noun', meaningVi: 'Phòng học tin học', exampleEn: 'We practice typing in the computer room.', exampleVi: 'Chúng tớ luyện gõ bàn phím ở phòng tin học.', isCore: true, unitId: 'unit-g4-u6', grade: 4 },
      { id: 'g4-u6-w3', word: 'Playground', ipa: '/ˈpleɪɡraʊnd/', partOfSpeech: 'noun', meaningVi: 'Sân chơi trường học', exampleEn: 'The playground is full of green trees.', exampleVi: 'Sân trường rợp bóng cây xanh.', isCore: true, unitId: 'unit-g4-u6', grade: 4 },
      { id: 'g4-u6-w4', word: 'Gym', ipa: '/dʒɪm/', partOfSpeech: 'noun', meaningVi: 'Nhà thể chất, phòng tập thể dục', exampleEn: 'We exercise in the gym when it rains.', exampleVi: 'Chúng tớ tập thể dục trong nhà thể chất khi trời mưa.', isCore: true, unitId: 'unit-g4-u6', grade: 4 },
    ],
    grammar: {
      id: 'g4-u6-gram',
      title: 'Hỏi vị trí trường Where is your school? & Giới từ In / On',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Tony: "Where is your school, Phong?" - Phong: "It is in Nguyen Du Street in the city."',
        highlights: ['Where is your school', 'in Nguyen Du Street'],
        explanationFriendly: 'Dùng từ để hỏi "Where" (ở đâu). Trả lời: "It is in the village / city / town / street".',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Where is your school? -> It is in + [địa điểm/thành phố/làng quê].',
        formulaItems: [
          { label: 'Hỏi vị trí', structure: 'Where is your school?', example: 'Where is your school?' },
          { label: 'Trả lời', structure: 'It is in + [street / district / city].', example: 'It is in Hanoi.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g4-u6-ex1',
          level: 'nhan-biet',
          question: 'Where is your school? - It is _______ the mountains.',
          options: ['in', 'at', 'on'],
          correctIndex: 0,
          explanationVi: 'Ở vùng núi dùng "in the mountains".',
        },
      ],
    },
    sentencePattern: {
      id: 'g4-u6-sp',
      frame: 'Where is your school? - It is in [location].',
      slots: [{ slotName: 'location', options: ['the city', 'the village', 'the town', 'the mountains'] }],
      contextVi: 'Giới thiệu về ngôi trường thân thương của mình.',
      sampleDialogue: {
        speakerA: 'Your school is so modern! Where is it?',
        lineA: 'Tell me more about it.',
        speakerB: 'It is in Cau Giay district.',
        lineB: 'It has four big buildings and a large garden.',
      },
      substitutionDrills: [
        { prompt: 'Nói trường em ở một ngôi làng yên bình:', expectedPattern: 'It is in a quiet village.', cueWords: ['in a quiet village'] },
      ],
    },
    realLife: [
      {
        id: 'g4-u6-rl',
        title: 'Chỉ đường cho vị khách thăm trường',
        roleA: 'Học sinh lịch sự',
        roleB: 'Khách tham quan',
        exchanges: [
          { speaker: 'Khách', lineEn: 'Excuse me, where is the school library?', lineVi: 'Xin lỗi em, thư viện trường ở đâu nhỉ?' },
          { speaker: 'Mai', lineEn: 'It is on the second floor, right over there, sir.', lineVi: 'Dạ, thư viện ở tầng hai ngay phía đằng kia ạ bác.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g4-u6-q1',
        type: 'multiple-choice',
        question: 'Nơi nào trong trường có rất nhiều sách để đọc?',
        options: ['Library', 'Gym', 'Canteen'],
        correctIndex: 0,
        explanation: 'Thư viện (Library) là nơi có nhiều sách.',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 7
  {
    id: 'unit-g4-u7',
    unitNumber: 7,
    title: 'Favorite Subjects',
    themeVi: 'Môn học yêu thích & Thời khóa biểu',
    themeIcon: '📚',
    grade: 4,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Tên các môn học (English, Maths, Science, IT, Art, Music, PE), hỏi "What subjects do you have today?" và lý do thích "Why do you like...?"',
    vocabularies: [
      { id: 'g4-u7-w1', word: 'English', ipa: '/ˈɪŋɡlɪʃ/', partOfSpeech: 'noun', meaningVi: 'Môn Tiếng Anh', exampleEn: 'I love English because it is fun.', exampleVi: 'Tớ mê Tiếng Anh vì học rất vui.', isCore: true, unitId: 'unit-g4-u7', grade: 4 },
      { id: 'g4-u7-w2', word: 'Maths', ipa: '/mæθs/', partOfSpeech: 'noun', meaningVi: 'Môn Toán học', exampleEn: 'Maths helps me think quickly.', exampleVi: 'Môn Toán giúp tớ tư duy nhanh nhạy.', isCore: true, unitId: 'unit-g4-u7', grade: 4 },
      { id: 'g4-u7-w3', word: 'Science', ipa: '/ˈsaɪəns/', partOfSpeech: 'noun', meaningVi: 'Môn Khoa học', exampleEn: 'We do experiments in Science class.', exampleVi: 'Chúng tớ làm thí nghiệm trong giờ Khoa học.', isCore: true, unitId: 'unit-g4-u7', grade: 4 },
      { id: 'g4-u7-w4', word: 'Music', ipa: '/ˈmjuːzɪk/', partOfSpeech: 'noun', meaningVi: 'Môn Âm nhạc', exampleEn: 'We sing lively songs in Music.', exampleVi: 'Chúng tớ hát những bài hát sôi động trong giờ Âm nhạc.', isCore: true, unitId: 'unit-g4-u7', grade: 4 },
    ],
    grammar: {
      id: 'g4-u7-gram',
      title: 'Hỏi môn học What subjects do you have? & Từ nối Because',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Peter: "What subjects do you have today?" - Linda: "I have English, Science and PE."',
        highlights: ['What subjects do you have', 'I have'],
        explanationFriendly: 'Hỏi môn học hôm nay: "What subjects do you have today? - I have...". Trả lời lý do yêu thích dùng liên từ "because" (bởi vì).',
      },
      step2VisualDiagram: {
        diagramType: 'cards',
        notesVi: 'What subjects do you have today? -> I have [Subject 1], [Subject 2] and [Subject 3].',
        formulaItems: [
          { label: 'Hỏi môn hôm nay', structure: 'What subjects do you have today?', example: 'What subjects do you have today?' },
          { label: 'Hỏi sở thích môn', structure: 'What is your favorite subject?', example: 'My favorite subject is English.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g4-u7-ex1',
          level: 'nhan-biet',
          question: 'What is your favorite subject? - _______ favorite subject is English.',
          options: ['My', 'I', 'Me'],
          correctIndex: 0,
          explanationVi: 'Đại từ sở hữu đứng trước danh từ là "My" (của tôi).',
        },
      ],
    },
    sentencePattern: {
      id: 'g4-u7-sp',
      frame: 'I like [subject] because [reason].',
      slots: [
        { slotName: 'subject', options: ['English', 'Science', 'Art', 'Music'] },
        { slotName: 'reason', options: ['I want to talk to foreign friends', 'I like experiments', 'I love colors', 'it is relaxing'] },
      ],
      contextVi: 'Bày tỏ niềm đam mê đối với môn học mình yêu thích.',
      sampleDialogue: {
        speakerA: 'Why do you like English so much, Quan?',
        lineA: 'You study it every day!',
        speakerB: 'Because I want to travel around the world!',
        lineB: 'It opens new doors for me.',
      },
      substitutionDrills: [
        { prompt: 'Nói môn học yêu thích của em là Khoa học:', expectedPattern: 'My favorite subject is Science.', cueWords: ['favorite subject', 'Science'] },
      ],
    },
    realLife: [
      {
        id: 'g4-u7-rl',
        title: 'Giúp bạn giải bài tập Toán khó',
        roleA: 'Học sinh giỏi Toán',
        roleB: 'Bạn nhờ giúp đỡ',
        exchanges: [
          { speaker: 'Bảo', lineEn: 'Can you help me with this Maths problem?', lineVi: 'Bạn có thể giúp tớ bài Toán này được không?' },
          { speaker: 'Nam', lineEn: 'Sure! Let\'s read the steps carefully together.', lineVi: 'Chắc chắn rồi! Chúng mình cùng đọc kỹ từng bước nhé.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g4-u7-q1',
        type: 'multiple-choice',
        question: 'Môn học nào rèn luyện sức khỏe và chơi thể thao?',
        options: ['PE (Physical Education)', 'Maths', 'History'],
        correctIndex: 0,
        explanation: 'PE là môn Giáo dục thể chất / Thể dục.',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 8
  {
    id: 'unit-g4-u8',
    unitNumber: 8,
    title: 'Free Time & Hobbies',
    themeVi: 'Sở thích & Thời gian rảnh',
    themeIcon: '🎸',
    grade: 4,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Sở thích cá nhân (collecting stamps, playing the piano, reading comics, drawing), cấu trúc Like + V-ing.',
    vocabularies: [
      { id: 'g4-u8-w1', word: 'Hobby', ipa: '/ˈhɒbi/', partOfSpeech: 'noun', meaningVi: 'Sở thích cá nhân', exampleEn: 'My hobby is collecting coins.', exampleVi: 'Sở thích của tớ là sưu tầm tiền xu.', isCore: true, unitId: 'unit-g4-u8', grade: 4 },
      { id: 'g4-u8-w2', word: 'Drawing', ipa: '/ˈdrɔːɪŋ/', partOfSpeech: 'noun', meaningVi: 'Việc vẽ tranh', exampleEn: 'I like drawing colorful animals.', exampleVi: 'Tớ thích vẽ các con vật rực rỡ sắc màu.', isCore: true, unitId: 'unit-g4-u8', grade: 4 },
      { id: 'g4-u8-w3', word: 'Reading', ipa: '/ˈriːdɪŋ/', partOfSpeech: 'noun', meaningVi: 'Việc đọc sách', exampleEn: 'Reading books makes me smarter.', exampleVi: 'Đọc sách giúp tớ thông minh hơn.', isCore: true, unitId: 'unit-g4-u8', grade: 4 },
      { id: 'g4-u8-w4', word: 'Cooking', ipa: '/ˈkʊkɪŋ/', partOfSpeech: 'noun', meaningVi: 'Nấu ăn', exampleEn: 'My brother enjoys cooking delicious dishes.', exampleVi: 'Anh trai tớ thích nấu những món ăn ngon.', isCore: true, unitId: 'unit-g4-u8', grade: 4 },
    ],
    grammar: {
      id: 'g4-u8-gram',
      title: 'Cấu trúc Like / Enjoy + V-ing (Danh động từ chỉ sở thích)',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Mary: "What is your hobby, Peter?" - Peter: "I like riding a bike in the park."',
        highlights: ['What is your hobby', 'I like riding'],
        explanationFriendly: 'Sau động từ LIKE (thích), động từ chỉ hành động phải thêm đuôi -ING: like swimming, like reading, like playing.',
      },
      step2VisualDiagram: {
        diagramType: 'cards',
        notesVi: 'Subject + LIKE / LIKES + Verb-ING.',
        formulaItems: [
          { label: 'Hỏi sở thích', structure: 'What is your hobby?', example: 'What is your hobby?' },
          { label: 'Bày tỏ sở thích', structure: 'I like + V-ing.', example: 'I like collecting stamps.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g4-u8-ex1',
          level: 'nhan-biet',
          question: 'I like _______ (swim) in the summer.',
          options: ['swimming', 'swim', 'swims'],
          correctIndex: 0,
          explanationVi: 'Sau "like" động từ thêm -ing: swimming (gấp đôi m).',
        },
      ],
    },
    sentencePattern: {
      id: 'g4-u8-sp',
      frame: 'What is your hobby? - I like [actionIng].',
      slots: [{ slotName: 'actionIng', options: ['reading books', 'taking photos', 'flying kites', 'skating'] }],
      contextVi: 'Gặp gỡ những người bạn có cùng đam mê câu lạc bộ.',
      sampleDialogue: {
        speakerA: 'What is your hobby, Mai?',
        lineA: 'Do you play any sports?',
        speakerB: 'I like playing badminton with my father every afternoon.',
        lineB: 'It keeps me healthy and active.',
      },
      substitutionDrills: [
        { prompt: 'Nói sở thích của em là chụp ảnh thiên nhiên:', expectedPattern: 'I like taking photos of nature.', cueWords: ['taking photos', 'nature'] },
      ],
    },
    realLife: [
      {
        id: 'g4-u8-rl',
        title: 'Trao đổi bộ sưu tập tem cùng bạn bè',
        roleA: 'Người sưu tầm tem',
        roleB: 'Bạn cùng lớp',
        exchanges: [
          { speaker: 'Tú', lineEn: 'Look! I have a new stamp from Japan.', lineVi: 'Nhìn này! Tớ có một con tem mới từ nước Nhật.' },
          { speaker: 'Việt', lineEn: 'It looks amazing! Collecting stamps is so interesting.', lineVi: 'Trông đẹp quá! Sưu tầm tem thật là thú vị.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g4-u8-q1',
        type: 'multiple-choice',
        question: 'Chọn câu đúng ngữ pháp:',
        options: ['She likes drawing pictures.', 'She likes draw pictures.', 'She like drawing pictures.'],
        correctIndex: 0,
        explanation: '"She" là ngôi thứ 3 số ít nên likes thêm -s, sau đó là drawing (V-ing).',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 9
  {
    id: 'unit-g4-u9',
    unitNumber: 9,
    title: 'In the Classroom & Actions',
    themeVi: 'Hành động đang diễn ra trong lớp học',
    themeIcon: '✍️',
    grade: 4,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Thì Hiện tại tiếp diễn (Present Continuous) diễn tả hành động đang xảy ra: "What are you doing? - I am reading a book."',
    vocabularies: [
      { id: 'g4-u9-w1', word: 'Write', ipa: '/raɪt/', partOfSpeech: 'verb', meaningVi: 'Viết bài (đang viết: writing)', exampleEn: 'He is writing a letter.', exampleVi: 'Cậu ấy đang viết một bức thư.', isCore: true, unitId: 'unit-g4-u9', grade: 4 },
      { id: 'g4-u9-w2', word: 'Listen', ipa: '/ˈlɪsn/', partOfSpeech: 'verb', meaningVi: 'Lắng nghe (listening)', exampleEn: 'We are listening to the teacher.', exampleVi: 'Chúng em đang chăm chú lắng nghe cô giảng.', isCore: true, unitId: 'unit-g4-u9', grade: 4 },
      { id: 'g4-u9-w3', word: 'Paint', ipa: '/peɪnt/', partOfSpeech: 'verb', meaningVi: 'Tô màu, vẽ tranh sơn dầu', exampleEn: 'She is painting a big flower.', exampleVi: 'Bạn ấy đang tô một bông hoa thật lớn.', isCore: true, unitId: 'unit-g4-u9', grade: 4 },
      { id: 'g4-u9-w4', word: 'Exercise', ipa: '/ˈeksəsaɪz/', partOfSpeech: 'verb', meaningVi: 'Luyện tập, tập thể dục', exampleEn: 'They are exercising in the yard.', exampleVi: 'Các bạn ấy đang tập thể dục ngoài sân.', isCore: true, unitId: 'unit-g4-u9', grade: 4 },
    ],
    grammar: {
      id: 'g4-u9-gram',
      title: 'Thì Hiện tại tiếp diễn (Present Continuous) với Am/Is/Are + V-ing',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Teacher: "What are you doing, Tom?" - Tom: "I am reading an English comic book, teacher."',
        highlights: ['What are you doing', 'I am reading'],
        explanationFriendly: 'Diễn tả việc ĐANG làm ngay lúc này: Chủ ngữ + am/is/are + động từ thêm -ing. Ví dụ: I am eating, He is sleeping.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'I + am + V-ing | He/She/It + is + V-ing | You/We/They + are + V-ing.',
        formulaItems: [
          { label: 'Hỏi hành động', structure: 'What are you doing?', example: 'What are you doing?' },
          { label: 'Trả lời', structure: 'I am + V-ing.', example: 'I am writing a dictation.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g4-u9-ex1',
          level: 'nhan-biet',
          question: 'Right now, Linda _______ (draw) a picture.',
          options: ['is drawing', 'draws', 'draw'],
          correctIndex: 0,
          explanationVi: '"Right now" (ngay bây giờ) và chủ ngữ "Linda" số ít nên dùng "is drawing".',
        },
      ],
    },
    sentencePattern: {
      id: 'g4-u9-sp',
      frame: 'What are you doing? - I am [actionNow].',
      slots: [{ slotName: 'actionNow', options: ['doing my homework', 'listening to music', 'making a paper plane', 'reading'] }],
      contextVi: 'Hỏi thăm bạn bè đang làm gì lúc này.',
      sampleDialogue: {
        speakerA: 'What are you doing, Nam?',
        lineA: 'You look so focused.',
        speakerB: 'I am writing a short story for our school magazine.',
        lineB: 'Would you like to read it?',
      },
      substitutionDrills: [
        { prompt: 'Nói em đang làm bài tập về nhà:', expectedPattern: 'I am doing my homework.', cueWords: ['am doing', 'my homework'] },
      ],
    },
    realLife: [
      {
        id: 'g4-u9-rl',
        title: 'Giữ trật tự khi cả lớp đang làm bài',
        roleA: 'Lớp phó học tập',
        roleB: 'Cả lớp',
        exchanges: [
          { speaker: 'Lớp phó', lineEn: 'Please be quiet. Everyone is studying.', lineVi: 'Xin cả lớp giữ trật tự nhé. Mọi người đều đang tập trung học bài.' },
          { speaker: 'Các bạn', lineEn: 'Sorry! We will focus on our tasks.', lineVi: 'Xin lỗi bạn! Chúng tớ sẽ tập trung làm bài ngay.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g4-u9-q1',
        type: 'multiple-choice',
        question: '"What is he doing?" - Chọn câu trả lời đúng:',
        options: ['He is watching TV', 'He watch TV', 'He watches TV now'],
        correctIndex: 0,
        explanation: 'Hành động đang diễn ra: He is watching TV.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 10
  {
    id: 'unit-g4-u10',
    unitNumber: 10,
    title: 'Where Were You Yesterday?',
    themeVi: 'Hôm qua bạn ở đâu? (Quá khứ đơn với Was/Were)',
    themeIcon: '🏖️',
    grade: 4,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Làm quen với thì Quá khứ đơn của động từ To Be (was / were), các từ chỉ thời gian quá khứ (yesterday, last weekend), câu hỏi "Where were you yesterday?"',
    vocabularies: [
      { id: 'g4-u10-w1', word: 'Yesterday', ipa: '/ˈjestədeɪ/', partOfSpeech: 'adverb', meaningVi: 'Hôm qua (quá khứ)', exampleEn: 'Where were you yesterday?', exampleVi: 'Hôm qua bạn đã ở đâu vậy?', isCore: true, unitId: 'unit-g4-u10', grade: 4 },
      { id: 'g4-u10-w2', word: 'At home', ipa: '/æt həʊm/', partOfSpeech: 'phrase', meaningVi: 'Ở nhà', exampleEn: 'I was at home yesterday afternoon.', exampleVi: 'Hôm qua buổi chiều tớ ở nhà.', isCore: true, unitId: 'unit-g4-u10', grade: 4 },
      { id: 'g4-u10-w3', word: 'At the zoo', ipa: '/æt ðə zuː/', partOfSpeech: 'phrase', meaningVi: 'Ở vườn bách thú', exampleEn: 'We were at the zoo last Sunday.', exampleVi: 'Chủ Nhật tuần trước chúng tớ đã ở sở thú.', isCore: true, unitId: 'unit-g4-u10', grade: 4 },
      { id: 'g4-u10-w4', word: 'On the beach', ipa: '/ɒn ðə biːtʃ/', partOfSpeech: 'phrase', meaningVi: 'Ở trên bãi biển', exampleEn: 'They were on the beach in Da Nang.', exampleVi: 'Họ đã ở trên bãi biển tại Đà Nẵng.', isCore: true, unitId: 'unit-g4-u10', grade: 4 },
    ],
    grammar: {
      id: 'g4-u10-gram',
      title: 'Thì Quá khứ đơn với Động từ To Be (WAS / WERE)',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Linda: "Where were you yesterday, Mai?" - Mai: "I was at the school library with Nam."',
        highlights: ['Where were you yesterday', 'I was at'],
        explanationFriendly: 'Chủ ngữ số ít (I, he, she, it) đi với WAS. Chủ ngữ số nhiều (you, we, they) đi với WERE. Dùng khi nói về việc đã xảy ra hôm qua hoặc tuần trước.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'I / He / She / It + WAS | You / We / They + WERE.',
        formulaItems: [
          { label: 'Hỏi nơi ở hôm qua', structure: 'Where were you yesterday?', example: 'Where were you yesterday?' },
          { label: 'Trả lời', structure: 'I was at / on + [địa điểm].', example: 'I was at home.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g4-u10-ex1',
          level: 'nhan-biet',
          question: 'Yesterday, he _______ (be) at the zoo.',
          options: ['was', 'were', 'is'],
          correctIndex: 0,
          explanationVi: 'He là chủ ngữ số ít trong quá khứ nên to be là "was".',
        },
      ],
    },
    sentencePattern: {
      id: 'g4-u10-sp',
      frame: 'Where were you yesterday? - I was [locationPast].',
      slots: [{ slotName: 'locationPast', options: ['at home', 'at school', 'at the zoo', 'on the beach', 'in the countryside'] }],
      contextVi: 'Hỏi thăm hoạt động của bạn bè sau kỳ nghỉ cuối tuần.',
      sampleDialogue: {
        speakerA: 'I didn\'t see you yesterday, Tom. Where were you?',
        lineA: 'Were you sick?',
        speakerB: 'No, I was at the water park with my family!',
        lineB: 'It was fantastic!',
      },
      substitutionDrills: [
        { prompt: 'Hỏi bạn hôm qua ở đâu và trả lời ở vườn bách thú:', expectedPattern: 'Where were you yesterday? - I was at the zoo.', cueWords: ['Where were you', 'was at the zoo'] },
      ],
    },
    realLife: [
      {
        id: 'g4-u10-rl',
        title: 'Báo cáo điểm danh với thầy cô sau khi vắng mặt',
        roleA: 'Học sinh',
        roleB: 'Thầy giáo',
        exchanges: [
          { speaker: 'Học sinh', lineEn: 'I was sick at home yesterday, sir. May I submit my homework today?', lineVi: 'Hôm qua em bị ốm ở nhà thưa thầy. Hôm nay em xin nộp bài tập được không ạ?' },
          { speaker: 'Thầy giáo', lineEn: 'Of course! I\'m glad you are feeling better.', lineVi: 'Được chứ em! Thầy rất mừng vì em đã khỏe lại.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g4-u10-q1',
        type: 'multiple-choice',
        question: '"Where were you yesterday?" - Chọn câu đúng ngữ pháp:',
        options: ['I was at home', 'I were at home', 'I am at home yesterday'],
        correctIndex: 0,
        explanation: 'Chủ ngữ "I" đi với "was": I was at home.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },
];
