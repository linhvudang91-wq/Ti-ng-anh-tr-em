import { UnitData } from '../../types';

export const GRADE_5_UNITS: UnitData[] = [
  // Unit 1
  {
    id: 'unit-g5-u1',
    unitNumber: 1,
    title: 'All About Me & Daily Routines',
    themeVi: 'Thói quen & Lối sống hàng ngày',
    themeIcon: '🌅',
    grade: 5,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Trạng từ chỉ tần suất (always, usually, often, sometimes, never), hỏi "What do you do in the morning / afternoon / evening?" và "How often do you...?"',
    vocabularies: [
      { id: 'g5-u1-w1', word: 'Always', ipa: '/ˈɔːlweɪz/', partOfSpeech: 'adverb', meaningVi: 'Luôn luôn (100% tần suất)', exampleEn: 'I always brush my teeth twice a day.', exampleVi: 'Tớ luôn luôn đánh răng 2 lần mỗi ngày.', isCore: true, unitId: 'unit-g5-u1', grade: 5 },
      { id: 'g5-u1-w2', word: 'Usually', ipa: '/ˈjuːʒuəli/', partOfSpeech: 'adverb', meaningVi: 'Thường thường (khoảng 80%)', exampleEn: 'He usually walks to school with his brother.', exampleVi: 'Cậu ấy thường đi bộ đến trường cùng em trai.', isCore: true, unitId: 'unit-g5-u1', grade: 5 },
      { id: 'g5-u1-w3', word: 'Morning exercise', ipa: '/ˈmɔːnɪŋ ˈeksəsaɪz/', partOfSpeech: 'phrase', meaningVi: 'Tập thể dục buổi sáng', exampleEn: 'Doing morning exercise keeps me fit.', exampleVi: 'Tập thể dục buổi sáng giúp tớ luôn khỏe khoắn.', isCore: true, unitId: 'unit-g5-u1', grade: 5 },
      { id: 'g5-u1-w4', word: 'Partner', ipa: '/ˈpɑːtnər/', partOfSpeech: 'noun', meaningVi: 'Bạn đồng hành, bạn cùng nhóm', exampleEn: 'Talk to your partner about your routines.', exampleVi: 'Hãy trò chuyện cùng bạn cặp về thói quen của em.', isCore: true, unitId: 'unit-g5-u1', grade: 5 },
    ],
    grammar: {
      id: 'g5-u1-gram',
      title: 'Trạng từ chỉ tần suất (Adverbs of Frequency) & Thì Hiện tại đơn',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Linda: "What do you do in the morning, Nam?" - Nam: "I always get up early and do morning exercise."',
        highlights: ['What do you do in the morning', 'I always get up early'],
        explanationFriendly: 'Trạng từ chỉ tần suất đứng TRƯỚC động từ thường (I always go, she often reads) và đứng SAU động từ to be (He is always on time).',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'S + Adverb of frequency + Verb. Always (100%) > Usually (80%) > Often (60%) > Sometimes (30%) > Never (0%).',
        formulaItems: [
          { label: 'Hỏi thói quen buổi sáng', structure: 'What do you do in the morning?', example: 'What do you do in the morning?' },
          { label: 'Trả lời với trạng từ', structure: 'I + [always/usually/often] + V.', example: 'I always have breakfast.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g5-u1-ex1',
          level: 'nhan-biet',
          question: 'Từ nào chỉ tần suất "luôn luôn làm"?',
          options: ['Always', 'Never', 'Sometimes'],
          correctIndex: 0,
          explanationVi: '"Always" nghĩa là luôn luôn (100%).',
        },
      ],
    },
    sentencePattern: {
      id: 'g5-u1-sp',
      frame: 'What do you do in the [partOfDay]? - I [frequency] [action].',
      slots: [
        { slotName: 'partOfDay', options: ['morning', 'afternoon', 'evening'] },
        { slotName: 'frequency', options: ['always', 'usually', 'often', 'sometimes'] },
        { slotName: 'action', options: ['do morning exercise', 'ride my bike', 'watch TV', 'read books'] },
      ],
      contextVi: 'Chia sẻ lối sống lành mạnh cùng bạn học.',
      sampleDialogue: {
        speakerA: 'Tom',
        lineA: 'What do you do in the afternoon, Mai?',
        speakerB: 'Mai',
        lineB: 'I usually play badminton with my sister. Then I do my homework.',
      },
      substitutionDrills: [
        { prompt: 'Nói em luôn luôn đánh răng sau bữa ăn:', expectedPattern: 'I always brush my teeth after meals.', cueWords: ['always brush', 'after meals'] },
      ],
    },
    realLife: [
      {
        id: 'g5-u1-rl',
        title: 'Thiết lập thời gian biểu khoa học cho năm học mới',
        roleA: 'Học sinh',
        roleB: 'Phụ huynh tư vấn',
        exchanges: [
          { speaker: 'Bé', lineEn: 'I want to always get up at six and read for fifteen minutes.', lineVi: 'Con muốn luôn dậy lúc 6 giờ và đọc sách 15 phút mỗi sáng.' },
          { speaker: 'Bố', lineEn: 'That is a wonderful healthy habit, my child!', lineVi: 'Đó là một thói quen rất lành mạnh và tuyệt vời con yêu ạ!' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g5-u1-q1',
        type: 'multiple-choice',
        question: 'Vị trí đúng của trạng từ tần suất "often":',
        options: ['She often plays the piano.', 'She plays often the piano.', 'Often she plays the piano.'],
        correctIndex: 0,
        explanation: 'Trạng từ tần suất đứng trước động từ thường: She often plays.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 2
  {
    id: 'unit-g5-u2',
    unitNumber: 2,
    title: 'Address & Hometown',
    themeVi: 'Địa chỉ & Quê hương thân yêu',
    themeIcon: '🏡',
    grade: 5,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Hỏi và trả lời địa chỉ "What is your address? - It is...", miêu tả nơi ở "What is the village/town like? - It is quiet and pretty."',
    vocabularies: [
      { id: 'g5-u2-w1', word: 'Address', ipa: '/əˈdres/', partOfSpeech: 'noun', meaningVi: 'Địa chỉ nhà ở', exampleEn: 'What is your home address?', exampleVi: 'Địa chỉ nhà của bạn là gì?', isCore: true, unitId: 'unit-g5-u2', grade: 5 },
      { id: 'g5-u2-w2', word: 'Tower', ipa: '/ˈtaʊər/', partOfSpeech: 'noun', meaningVi: 'Tòa tháp, tòa chung cư cao tầng', exampleEn: 'I live in a modern apartment tower.', exampleVi: 'Tớ sống trong một tòa tháp căn hộ hiện đại.', isCore: true, unitId: 'unit-g5-u2', grade: 5 },
      { id: 'g5-u2-w3', word: 'Quiet', ipa: '/ˈkwaɪət/', partOfSpeech: 'adjective', meaningVi: 'Yên tĩnh, thanh bình', exampleEn: 'My hometown is peaceful and quiet.', exampleVi: 'Quê hương tớ thật thanh bình và yên ả.', isCore: true, unitId: 'unit-g5-u2', grade: 5 },
      { id: 'g5-u2-w4', word: 'Busy', ipa: '/ˈbɪzi/', partOfSpeech: 'adjective', meaningVi: 'Nhộn nhịp, đông đúc, tấp nập', exampleEn: 'The city streets are always busy.', exampleVi: 'Đường phố thủ đô lúc nào cũng tấp nập.', isCore: true, unitId: 'unit-g5-u2', grade: 5 },
    ],
    grammar: {
      id: 'g5-u2-gram',
      title: 'Hỏi địa chỉ What is your address? & Miêu tả đặc điểm nơi ở What is it like?',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Tony: "What is your address, Trung?" - Trung: "It is 81 Tran Hung Dao Street. What about you?"',
        highlights: ['What is your address', 'What is it like', 'quiet and beautiful'],
        explanationFriendly: 'Hỏi địa chỉ: "What is your address? - It is [Số nhà, Tên đường...]". Hỏi nơi đó như thế nào: "What is it like? - It is quiet/busy/big".',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'What is your address? -> It is + [House Number] + [Street / Lane / Road].',
        formulaItems: [
          { label: 'Hỏi địa chỉ', structure: 'What is your address?', example: 'What is your address?' },
          { label: 'Hỏi cảm nhận', structure: 'What is the [place] like?', example: 'What is the city like?' },
          { label: 'Trả lời tính từ', structure: 'It is + [adj 1] and [adj 2].', example: 'It is large and crowded.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g5-u2-ex1',
          level: 'nhan-biet',
          question: 'What is the city like? - It is large and _______.',
          options: ['crowded', 'crowd', 'crowds'],
          correctIndex: 0,
          explanationVi: 'Cần một tính từ miêu tả: "crowded" (đông đúc).',
        },
      ],
    },
    sentencePattern: {
      id: 'g5-u2-sp',
      frame: 'What is your address? - It is [address]. It is [adj] and [adj].',
      slots: [
        { slotName: 'address', options: ['Flat 12, Tower B, Hanoi', '105 Hoa Binh Lane', '75 Hai Ba Trung Street'] },
        { slotName: 'adj', options: ['quiet', 'peaceful', 'busy', 'modern', 'pretty'] },
      ],
      contextVi: 'Ghi địa chỉ để gửi bưu thiếp cho bạn thân.',
      sampleDialogue: {
        speakerA: 'Where do you live, Mai?',
        lineA: 'Is it far from our school?',
        speakerB: 'I live in Flat 8 on the third floor of Ha Noi Tower.',
        lineB: 'It is very close, just a 5-minute walk!',
      },
      substitutionDrills: [
        { prompt: 'Hỏi quê hương của bạn trông như thế nào:', expectedPattern: 'What is your hometown like?', cueWords: ['What is', 'hometown like'] },
      ],
    },
    realLife: [
      {
        id: 'g5-u2-rl',
        title: 'Ghi địa chỉ bưu điện gửi quà tặng',
        roleA: 'Người gửi thư',
        roleB: 'Nhân viên bưu điện',
        exchanges: [
          { speaker: 'Bé', lineEn: 'Please send this postcard to 45 Nguyen Du Street, Da Nang.', lineVi: 'Nhờ cô gửi bưu thiếp này đến số 45 đường Nguyễn Du, Đà Nẵng ạ.' },
          { speaker: 'Nhân viên', lineEn: 'Sure! Your friend will receive it in two days.', lineVi: 'Được chứ cháu! Bạn của cháu sẽ nhận được trong hai ngày tới nhé.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g5-u2-q1',
        type: 'multiple-choice',
        question: 'Chọn từ trái nghĩa với "noisy" (ồn ào):',
        options: ['Quiet', 'Busy', 'Crowded'],
        correctIndex: 0,
        explanation: '"Quiet" (yên tĩnh) trái nghĩa với "noisy" (ồn ào).',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 3
  {
    id: 'unit-g5-u3',
    unitNumber: 3,
    title: 'Where Did You Go on Holiday?',
    themeVi: 'Kỳ nghỉ đã qua & Quá khứ đơn',
    themeIcon: '🚂',
    grade: 5,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Hỏi về chuyến đi du lịch trong kỳ nghỉ "Where did you go on holiday? - I went to...", phương tiện di chuyển "How did you get there? - By train/plane/coach."',
    vocabularies: [
      { id: 'g5-u3-w1', word: 'Holiday', ipa: '/ˈhɒlədeɪ/', partOfSpeech: 'noun', meaningVi: 'Kỳ nghỉ mát, ngày nghỉ lễ', exampleEn: 'We had a wonderful summer holiday.', exampleVi: 'Chúng tớ đã có một kỳ nghỉ hè thật tuyệt vời.', isCore: true, unitId: 'unit-g5-u3', grade: 5 },
      { id: 'g5-u3-w2', word: 'Ha Long Bay', ipa: '/hɑː ˈlɒŋ beɪ/', partOfSpeech: 'noun', meaningVi: 'Vịnh Hạ Long (Kỳ quan thiên nhiên)', exampleEn: 'I went to Ha Long Bay last month.', exampleVi: 'Tớ đã đến Vịnh Hạ Long vào tháng trước.', isCore: true, unitId: 'unit-g5-u3', grade: 5 },
      { id: 'g5-u3-w3', word: 'Island', ipa: '/ˈaɪlənd/', partOfSpeech: 'noun', meaningVi: 'Hòn đảo (Lưu ý: âm s câm)', exampleEn: 'Phu Quoc is a famous tropical island.', exampleVi: 'Phú Quốc là một hòn đảo nhiệt đới nổi tiếng.', isCore: true, unitId: 'unit-g5-u3', grade: 5 },
      { id: 'g5-u3-w4', word: 'By plane', ipa: '/baɪ pleɪn/', partOfSpeech: 'phrase', meaningVi: 'Bằng máy bay', exampleEn: 'We traveled to Da Nang by plane.', exampleVi: 'Chúng tớ đã bay đến Đà Nẵng bằng máy bay.', isCore: true, unitId: 'unit-g5-u3', grade: 5 },
    ],
    grammar: {
      id: 'g5-u3-gram',
      title: 'Thì Quá khứ đơn với Động từ có quy tắc và Bất quy tắc (Go -> Went)',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Peter: "Where did you go on holiday, Mai?" - Mai: "I went to Ancient Town of Hoi An by coach."',
        highlights: ['Where did you go', 'I went to', 'by coach'],
        explanationFriendly: 'Quá khứ của GO là WENT (bất quy tắc). Hỏi phương tiện: "How did you get there? - By train / plane / bus / car" (nhưng đi bộ là: on foot).',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Where did you go? -> I went to [Place]. How did you get there? -> By [vehicle].',
        formulaItems: [
          { label: 'Hỏi địa điểm', structure: 'Where did you go on holiday?', example: 'Where did you go on holiday?' },
          { label: 'Trả lời địa điểm', structure: 'I went to + [địa danh].', example: 'I went to Hue Imperial City.' },
          { label: 'Hỏi phương tiện', structure: 'How did you get there?', example: 'I went by train.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g5-u3-ex1',
          level: 'nhan-biet',
          question: 'Quá khứ của động từ "go" là:',
          options: ['went', 'goed', 'goes'],
          correctIndex: 0,
          explanationVi: 'Động từ "go" biến đổi bất quy tắc thành "went".',
        },
      ],
    },
    sentencePattern: {
      id: 'g5-u3-sp',
      frame: 'Where did you go on holiday? - I went to [place] by [vehicle].',
      slots: [
        { slotName: 'place', options: ['Ha Long Bay', 'Phu Quoc Island', 'Nha Trang Beach', 'Da Lat'] },
        { slotName: 'vehicle', options: ['train', 'plane', 'coach', 'underground'] },
      ],
      contextVi: 'Kể cho bạn bè nghe về chuyến du lịch hè kỳ thú.',
      sampleDialogue: {
        speakerA: 'How was your trip to Phu Quoc Island, Nam?',
        lineA: 'Did you like it?',
        speakerB: 'It was wonderful! The sea was blue and warm.',
        lineB: 'I went there by plane with my family.',
      },
      substitutionDrills: [
        { prompt: 'Nói em đã đến Vịnh Hạ Long bằng xe khách:', expectedPattern: 'I went to Ha Long Bay by coach.', cueWords: ['went to Ha Long Bay', 'by coach'] },
      ],
    },
    realLife: [
      {
        id: 'g5-u3-rl',
        title: 'Chia sẻ ảnh du lịch đầu năm học mới',
        roleA: 'Học sinh khoe ảnh',
        roleB: 'Bạn cùng bàn hào hứng',
        exchanges: [
          { speaker: 'Linh', lineEn: 'Look at this photo! I took a boat trip on the river in Hue.', lineVi: 'Xem bức ảnh này đi! Tớ đã đi thuyền rồng trên sông Hương ở Huế đấy.' },
          { speaker: 'Phong', lineEn: 'The scenery looks poetic and stunning!', lineVi: 'Phong cảnh trông thật thơ mộng và tuyệt đẹp!' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g5-u3-q1',
        type: 'multiple-choice',
        question: '"How did you get there?" - Chọn câu trả lời đúng:',
        options: ['By train', 'At the weekend', 'It was delicious'],
        correctIndex: 0,
        explanation: 'Hỏi bằng "How did you get there" là hỏi phương tiện di chuyển: By train.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 4
  {
    id: 'unit-g5-u4',
    unitNumber: 4,
    title: 'Did You Go to the Party?',
    themeVi: 'Dự tiệc sinh nhật & Hoạt động quá khứ',
    themeIcon: '🎉',
    grade: 5,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Câu hỏi Yes/No ở thì Quá khứ đơn với trợ động từ DID: "Did you go to the party? - Yes, I did / No, I didn\'t." và các hoạt động tiệc (ate delicious food, sang songs, played hide and seek).',
    vocabularies: [
      { id: 'g5-u4-w1', word: 'Party', ipa: '/ˈpɑːti/', partOfSpeech: 'noun', meaningVi: 'Bữa tiệc, buổi liên hoan', exampleEn: 'We were invited to a birthday party.', exampleVi: 'Chúng tớ được mời đến một bữa tiệc sinh nhật.', isCore: true, unitId: 'unit-g5-u4', grade: 5 },
      { id: 'g5-u4-w2', word: 'Eat', ipa: '/iːt/', partOfSpeech: 'verb', meaningVi: 'Ăn (Quá khứ: ate /et/)', exampleEn: 'We ate lots of fruit and cakes.', exampleVi: 'Chúng tớ đã ăn rất nhiều trái cây và bánh ngọt.', isCore: true, unitId: 'unit-g5-u4', grade: 5 },
      { id: 'g5-u4-w3', word: 'Enjoy', ipa: '/ɪnˈdʒɔɪ/', partOfSpeech: 'verb', meaningVi: 'Thích thú, tận hưởng (enjoyed)', exampleEn: 'We enjoyed the party very much.', exampleVi: 'Chúng tớ đã tận hưởng bữa tiệc vô cùng vui vẻ.', isCore: true, unitId: 'unit-g5-u4', grade: 5 },
      { id: 'g5-u4-w4', word: 'Present', ipa: '/ˈpreznt/', partOfSpeech: 'noun', meaningVi: 'Món quà tặng', exampleEn: 'I gave Mai a lovely comic book as a present.', exampleVi: 'Tớ đã tặng Mai một cuốn truyện tranh làm quà.', isCore: true, unitId: 'unit-g5-u4', grade: 5 },
    ],
    grammar: {
      id: 'g5-u4-gram',
      title: 'Câu hỏi nghi vấn Quá khứ đơn: Did + S + V-nguyên mẫu...?',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Tony: "Did you go to Phong\'s birthday party yesterday?" - Mai: "Yes, I did. We had so much fun!"',
        highlights: ['Did you go', 'Yes, I did', 'We had fun'],
        explanationFriendly: 'Khi đã dùng trợ động từ DID ở đầu câu hỏi, động từ chính theo sau PHẢI TRỞ VỀ NGUYÊN MẪU (Did you go, chứ KHÔNG nói Did you went).',
      },
      step2VisualDiagram: {
        diagramType: 'cards',
        notesVi: 'Did + S + V(nguyên mẫu)? -> Yes, S + did. / No, S + didn\'t.',
        formulaItems: [
          { label: 'Câu hỏi Yes/No', structure: 'Did you + V-infinitive?', example: 'Did you join the fun?' },
          { label: 'Trả lời có', structure: 'Yes, I did.', example: 'Yes, I did.' },
          { label: 'Trả lời không', structure: 'No, I didn\'t.', example: 'No, I didn\'t.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g5-u4-ex1',
          level: 'nhan-biet',
          question: 'Chọn động từ đúng: "Did you _______ (watch) cartoons yesterday?"',
          options: ['watch', 'watched', 'watching'],
          correctIndex: 0,
          explanationVi: 'Sau trợ động từ "Did" động từ giữ nguyên mẫu: watch.',
        },
      ],
    },
    sentencePattern: {
      id: 'g5-u4-sp',
      frame: 'Did you [pastAction]? - Yes, I did. I [pastResult].',
      slots: [
        { slotName: 'pastAction', options: ['go to the party', 'join the sports festival', 'visit the zoo', 'watch the cartoon'] },
        { slotName: 'pastResult', options: ['had great fun', 'ate delicious cakes', 'sang songs with friends', 'saw wild animals'] },
      ],
      contextVi: 'Hỏi thăm bạn về một sự kiện đã diễn ra cuối tuần trước.',
      sampleDialogue: {
        speakerA: 'Did you go to Nam\'s birthday party yesterday?',
        lineA: 'I didn\'t see you there.',
        speakerB: 'No, I didn\'t. I was visiting my grandparents in the countryside.',
        lineB: 'Did you have a good time?',
      },
      substitutionDrills: [
        { prompt: 'Hỏi bạn có tham gia buổi hòa nhạc không:', expectedPattern: 'Did you go to the music concert?', cueWords: ['Did you go', 'music concert'] },
      ],
    },
    realLife: [
      {
        id: 'g5-u4-rl',
        title: 'Viết thiệp cảm ơn sau bữa tiệc sinh nhật',
        roleA: 'Chủ nhân bữa tiệc',
        roleB: 'Bạn nhận thiệp',
        exchanges: [
          { speaker: 'Mai', lineEn: 'Thank you for coming to my party and giving me the book!', lineVi: 'Cảm ơn bạn đã đến dự sinh nhật và tặng mình cuốn sách nhé!' },
          { speaker: 'Linh', lineEn: 'You are welcome! I enjoyed chatting with everyone.', lineVi: 'Không có gì đâu bạn! Mình rất vui khi được trò chuyện cùng mọi người.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g5-u4-q1',
        type: 'multiple-choice',
        question: 'Dạng quá khứ của động từ "have" là:',
        options: ['had', 'haved', 'has'],
        correctIndex: 0,
        explanation: 'Quá khứ của have là "had".',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 5
  {
    id: 'unit-g5-u5',
    unitNumber: 5,
    title: 'Where Will You Be This Weekend?',
    themeVi: 'Kế hoạch tương lai với Will',
    themeIcon: '🚀',
    grade: 5,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Thì Tương lai đơn với WILL / WON\'T diễn tả dự đoán và kế hoạch: "Where will you be this weekend? - I think I will be at the seaside / in the mountains."',
    vocabularies: [
      { id: 'g5-u5-w1', word: 'Weekend', ipa: '/ˌwiːkˈend/', partOfSpeech: 'noun', meaningVi: 'Dịp cuối tuần tới', exampleEn: 'What will you do this weekend?', exampleVi: 'Cuối tuần này bạn sẽ làm gì?', isCore: true, unitId: 'unit-g5-u5', grade: 5 },
      { id: 'g5-u5-w2', word: 'Seaside', ipa: '/ˈsiːsaɪd/', partOfSpeech: 'noun', meaningVi: 'Bờ biển, vùng ven biển', exampleEn: 'I think I will be at the seaside.', exampleVi: 'Tớ nghĩ tớ sẽ ở bờ biển.', isCore: true, unitId: 'unit-g5-u5', grade: 5 },
      { id: 'g5-u5-w3', word: 'Caves', ipa: '/keɪvz/', partOfSpeech: 'noun', meaningVi: 'Những hang động kỳ vĩ', exampleEn: 'We will explore the mysterious caves.', exampleVi: 'Chúng tớ sẽ khám phá những hang động kỳ bí.', isCore: true, unitId: 'unit-g5-u5', grade: 5 },
      { id: 'g5-u5-w4', word: 'Explore', ipa: '/ɪkˈsplɔːr/', partOfSpeech: 'verb', meaningVi: 'Khám phá, thám hiểm', exampleEn: 'Children love to explore nature.', exampleVi: 'Trẻ em rất thích thám hiểm thiên nhiên.', isCore: true, unitId: 'unit-g5-u5', grade: 5 },
    ],
    grammar: {
      id: 'g5-u5-gram',
      title: 'Thì Tương lai đơn với WILL + V-nguyên mẫu & Cụm I think...',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Mai: "Where will you be this weekend, Tony?" - Tony: "I think I will be in the countryside with my grandparents."',
        highlights: ['Where will you be', 'I think I will be'],
        explanationFriendly: 'Dùng WILL (viết tắt là \'ll) để nói về sự việc sẽ diễn ra trong tương lai: S + will + V-nguyên mẫu. "I think I will..." thể hiện dự đoán.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Where will you be? -> I think I will be + at/in [Place]. What will you do? -> I will [V].',
        formulaItems: [
          { label: 'Hỏi tương lai', structure: 'Where will you be + [thời gian]?', example: 'Where will you be tomorrow?' },
          { label: 'Dự đoán tương lai', structure: 'I think I will be + [location].', example: 'I think I will be at school.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g5-u5-ex1',
          level: 'nhan-biet',
          question: 'Where will you be tomorrow? - I think I _______ be on the beach.',
          options: ['will', 'am', 'was'],
          correctIndex: 0,
          explanationVi: 'Ngày mai (tomorrow) chỉ tương lai nên dùng "will".',
        },
      ],
    },
    sentencePattern: {
      id: 'g5-u5-sp',
      frame: 'Where will you be [futureTime]? - I think I will be [futurePlace].',
      slots: [
        { slotName: 'futureTime', options: ['this weekend', 'next Sunday', 'tomorrow', 'next summer'] },
        { slotName: 'futurePlace', options: ['at the seaside', 'in the mountains', 'by the sea', 'at home'] },
      ],
      contextVi: 'Lên kế hoạch dã ngoại vui nhộn cùng gia đình.',
      sampleDialogue: {
        speakerA: 'Where will you be this Sunday, Peter?',
        lineA: 'Will you join our cycling club?',
        speakerB: 'I think I will be at my uncle\'s farm.',
        lineB: 'I will pick fresh oranges there!',
      },
      substitutionDrills: [
        { prompt: 'Nói em nghĩ em sẽ ở vùng núi vào cuối tuần tới:', expectedPattern: 'I think I will be in the mountains next weekend.', cueWords: ['think I will be', 'in the mountains'] },
      ],
    },
    realLife: [
      {
        id: 'g5-u5-rl',
        title: 'Lên lịch chuẩn bị cho kỳ nghỉ hè',
        roleA: 'Bạn bè bàn kế hoạch',
        roleB: 'Bạn đồng hành',
        exchanges: [
          { speaker: 'Nam', lineEn: 'What will you do during the summer holiday?', lineVi: 'Cậu sẽ làm gì trong kỳ nghỉ hè tới?' },
          { speaker: 'Phong', lineEn: 'I will learn to swim and practice speaking English every day.', lineVi: 'Tớ sẽ học bơi và luyện nói tiếng Anh mỗi ngày.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g5-u5-q1',
        type: 'multiple-choice',
        question: 'Dạng viết tắt của "I will" là:',
        options: ['I\'ll', 'I\'d', 'I\'m'],
        correctIndex: 0,
        explanation: 'I will viết tắt là I\'ll.',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 6 (Semester 2)
  {
    id: 'unit-g5-u6',
    unitNumber: 6,
    title: 'How Many Lessons Do You Have Today?',
    themeVi: 'Môn học & Tần suất tiết học',
    themeIcon: '📊',
    grade: 5,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Hỏi số lượng tiết học "How many lessons do you have today? - I have four...", tần suất "How often do you have English? - Four times a week."',
    vocabularies: [
      { id: 'g5-u6-w1', word: 'Lesson', ipa: '/ˈlesn/', partOfSpeech: 'noun', meaningVi: 'Tiết học, bài học', exampleEn: 'We have four lessons this morning.', exampleVi: 'Chúng tớ có 4 tiết học sáng nay.', isCore: true, unitId: 'unit-g5-u6', grade: 5 },
      { id: 'g5-u6-w2', word: 'Once a week', ipa: '/wʌns ə wiːk/', partOfSpeech: 'phrase', meaningVi: 'Mỗi tuần một lần (1 lần/tuần)', exampleEn: 'I have Science once a week.', exampleVi: 'Tớ học môn Khoa học mỗi tuần một lần.', isCore: true, unitId: 'unit-g5-u6', grade: 5 },
      { id: 'g5-u6-w3', word: 'Twice a week', ipa: '/twaɪs ə wiːk/', partOfSpeech: 'phrase', meaningVi: 'Hai lần một tuần', exampleEn: 'We have Art twice a week.', exampleVi: 'Chúng tớ có giờ Mỹ thuật 2 lần mỗi tuần.', isCore: true, unitId: 'unit-g5-u6', grade: 5 },
      { id: 'g5-u6-w4', word: 'Four times a week', ipa: '/fɔːr taɪmz ə wiːk/', partOfSpeech: 'phrase', meaningVi: 'Bốn lần một tuần', exampleEn: 'I study English four times a week.', exampleVi: 'Tớ học Tiếng Anh 4 lần một tuần.', isCore: true, unitId: 'unit-g5-u6', grade: 5 },
    ],
    grammar: {
      id: 'g5-u6-gram',
      title: 'Hỏi số lượng How many + Danh từ đếm được số nhiều & Tần suất How often',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Mai: "How many lessons do you have today, Tony?" - Tony: "I have four: Maths, Vietnamese, English and PE."',
        highlights: ['How many lessons', 'How often do you have English', 'Four times a week'],
        explanationFriendly: 'Sau "How many" luôn luôn là danh từ số nhiều thêm -s (lessons, books). Trả lời tần suất: once (1 lần), twice (2 lần), three times (3 lần), every school day (mọi ngày đi học).',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'How many lessons do you have? -> I have [Number]. How often do you have [Subject]? -> [Frequency].',
        formulaItems: [
          { label: 'Hỏi số tiết', structure: 'How many lessons do you have today?', example: 'How many lessons do you have today?' },
          { label: 'Hỏi tần suất', structure: 'How often do you have [Subject]?', example: 'How often do you have Maths?' },
          { label: 'Tần suất', structure: 'Once / Twice / Three times a week.', example: 'Every school day.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g5-u6-ex1',
          level: 'nhan-biet',
          question: '"Hai lần một tuần" viết bằng tiếng Anh là:',
          options: ['Twice a week', 'Once a week', 'Two times week'],
          correctIndex: 0,
          explanationVi: '2 lần một tuần dùng từ chuẩn: Twice a week.',
        },
      ],
    },
    sentencePattern: {
      id: 'g5-u6-sp',
      frame: 'How often do you have [subject]? - I have it [frequency].',
      slots: [
        { slotName: 'subject', options: ['English', 'Maths', 'Music', 'Science', 'IT'] },
        { slotName: 'frequency', options: ['every school day', 'four times a week', 'twice a week', 'once a week'] },
      ],
      contextVi: 'So sánh thời khóa biểu giữa các lớp học.',
      sampleDialogue: {
        speakerA: 'How many lessons do you have on Monday, Linda?',
        lineA: 'Do you have many?',
        speakerB: 'I have five lessons: Maths, Vietnamese, English, Science and IT.',
        lineB: 'Monday is quite busy!',
      },
      substitutionDrills: [
        { prompt: 'Hỏi bạn học Tiếng Anh mấy lần một tuần và trả lời 4 lần một tuần:', expectedPattern: 'How often do you have English? - Four times a week.', cueWords: ['How often', 'Four times a week'] },
      ],
    },
    realLife: [
      {
        id: 'g5-u6-rl',
        title: 'Xem lịch thi học kỳ môn Tiếng Anh',
        roleA: 'Lớp trưởng',
        roleB: 'Các bạn học sinh',
        exchanges: [
          { speaker: 'Lớp trưởng', lineEn: 'We have our English speaking test next Friday. Let\'s practice together!', lineVi: 'Chúng mình có bài kiểm tra nói Tiếng Anh vào Thứ Sáu tuần sau. Cùng luyện tập nhé!' },
          { speaker: 'Học sinh', lineEn: 'Yes! We practice thirty minutes every day.', lineVi: 'Được đấy! Mỗi ngày chúng mình cùng luyện 30 phút nhé.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g5-u6-q1',
        type: 'multiple-choice',
        question: 'Chọn câu đúng: "How _______ lessons do you have today?"',
        options: ['many', 'much', 'often'],
        correctIndex: 0,
        explanation: 'Danh từ đếm được số nhiều (lessons) dùng "How many".',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 7
  {
    id: 'unit-g5-u7',
    unitNumber: 7,
    title: 'How Do You Learn English?',
    themeVi: 'Phương pháp học tiếng Anh hiệu quả',
    themeIcon: '💡',
    grade: 5,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Cách luyện 4 kỹ năng Nghe - Nói - Đọc - Viết: "How do you practice speaking? - I speak English every day. How do you learn vocabulary? - I write new words in my notebook."',
    vocabularies: [
      { id: 'g5-u7-w1', word: 'Practice', ipa: '/ˈpræktɪs/', partOfSpeech: 'verb', meaningVi: 'Luyện tập, rèn luyện', exampleEn: 'Practice makes perfect.', exampleVi: 'Chăm chỉ luyện tập sẽ đạt kết quả hoàn hảo.', isCore: true, unitId: 'unit-g5-u7', grade: 5 },
      { id: 'g5-u7-w2', word: 'Notebook', ipa: '/ˈnəʊtbʊk/', partOfSpeech: 'noun', meaningVi: 'Vở ghi chép, sổ tay từ vựng', exampleEn: 'I write new words in my notebook.', exampleVi: 'Tớ viết các từ mới vào cuốn sổ tay.', isCore: true, unitId: 'unit-g5-u7', grade: 5 },
      { id: 'g5-u7-w3', word: 'Subtitles', ipa: '/ˈsʌbtaɪtlz/', partOfSpeech: 'noun', meaningVi: 'Phụ đề phim/video', exampleEn: 'I watch cartoons with English subtitles.', exampleVi: 'Tớ xem phim hoạt hình có phụ đề tiếng Anh.', isCore: true, unitId: 'unit-g5-u7', grade: 5 },
      { id: 'g5-u7-w4', word: 'Communicate', ipa: '/kəˈmjuːnɪkeɪt/', partOfSpeech: 'verb', meaningVi: 'Giao tiếp, trò chuyện', exampleEn: 'English helps me communicate with international friends.', exampleVi: 'Tiếng Anh giúp tớ giao tiếp tự tin với bạn bè năm châu.', isCore: true, unitId: 'unit-g5-u7', grade: 5 },
    ],
    grammar: {
      id: 'g5-u7-gram',
      title: 'Mẫu câu hỏi phương pháp học: How do you practice / learn...?',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Tony: "How do you practice speaking English, Mai?" - Mai: "I speak English with foreign tourists and my classmates every day."',
        highlights: ['How do you practice', 'I speak English', 'By reading books'],
        explanationFriendly: 'Dùng từ để hỏi HOW (bằng cách nào). Trả lời bằng mệnh đề hành động (I read comics, I listen to English songs) hoặc dùng BY + V-ing (By watching cartoons).',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'How do you practice [listening / speaking / reading / writing]? -> I [action].',
        formulaItems: [
          { label: 'Hỏi cách luyện nghe', structure: 'How do you practice listening?', example: 'I watch English cartoons on TV.' },
          { label: 'Hỏi cách học từ mới', structure: 'How do you learn vocabulary?', example: 'I write new words and read them aloud.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g5-u7-ex1',
          level: 'nhan-biet',
          question: 'How do you learn vocabulary? - I write new words in my _______ and stick them on the wall.',
          options: ['notebook', 'bottle', 'chair'],
          correctIndex: 0,
          explanationVi: 'Viết từ mới vào sổ tay: notebook.',
        },
      ],
    },
    sentencePattern: {
      id: 'g5-u7-sp',
      frame: 'How do you practice [skill]? - I [practiceMethod].',
      slots: [
        { slotName: 'skill', options: ['speaking', 'listening', 'reading', 'writing'] },
        { slotName: 'practiceMethod', options: ['speak English with friends', 'watch cartoons on TV', 'read English comic books', 'write emails to pen friends'] },
      ],
      contextVi: 'Thảo luận bí quyết đạt điểm cao trong kỳ thi tiếng Anh.',
      sampleDialogue: {
        speakerA: 'Your English pronunciation is so natural, Nam!',
        lineA: 'How do you practice speaking?',
        speakerB: 'Thank you! I sing along with English songs and talk to our AI tutor every day.',
        lineB: 'It really builds my confidence.',
      },
      substitutionDrills: [
        { prompt: 'Nói em luyện đọc bằng cách đọc truyện tranh tiếng Anh:', expectedPattern: 'I practice reading by reading English comic books.', cueWords: ['practice reading', 'reading English comic books'] },
      ],
    },
    realLife: [
      {
        id: 'g5-u7-rl',
        title: 'Thành lập đôi bạn cùng tiến môn Tiếng Anh',
        roleA: 'Bạn học sinh tiến bộ',
        roleB: 'Bạn đồng hành',
        exchanges: [
          { speaker: 'Linh', lineEn: 'Let\'s make a rule: speak only English during break time on Tuesday!', lineVi: 'Chúng mình cùng đặt quy ước nhé: chỉ nói tiếng Anh vào giờ ra chơi Thứ Ba!' },
          { speaker: 'Minh', lineEn: 'Deal! It will help us think in English faster.', lineVi: 'Nhất trí luôn! Cách này sẽ giúp chúng mình tư duy bằng tiếng Anh nhanh hơn nhiều.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g5-u7-q1',
        type: 'multiple-choice',
        question: '"Why do you learn English?" - Chọn lý do truyền cảm hứng nhất:',
        options: ['Because I want to communicate with friends all over the world', 'Because it is red', 'Because I sleep early'],
        correctIndex: 0,
        explanation: 'Học tiếng Anh để giao tiếp với bạn bè khắp năm châu.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 8
  {
    id: 'unit-g5-u8',
    unitNumber: 8,
    title: 'What Are You Reading?',
    themeVi: 'Sách truyện & Nhân vật yêu thích',
    themeIcon: '📖',
    grade: 5,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Các câu chuyện dân gian và cổ tích (The Story of Mai An Tiem, Aladdin and the Magic Lamp, Snow White), tính từ miêu tả tính cách nhân vật (hardworking, kind, clever, brave, greedy).',
    vocabularies: [
      { id: 'g5-u8-w1', word: 'Character', ipa: '/ˈkærəktər/', partOfSpeech: 'noun', meaningVi: 'Nhân vật trong truyện', exampleEn: 'Who is the main character in this tale?', exampleVi: 'Ai là nhân vật chính trong câu chuyện này?', isCore: true, unitId: 'unit-g5-u8', grade: 5 },
      { id: 'g5-u8-w2', word: 'Hardworking', ipa: '/ˌhɑːdˈwɜːkɪŋ/', partOfSpeech: 'adjective', meaningVi: 'Chăm chỉ, cần cù, siêng năng', exampleEn: 'Mai An Tiem was very hardworking.', exampleVi: 'Mai An Tiêm là một người rất chăm chỉ.', isCore: true, unitId: 'unit-g5-u8', grade: 5 },
      { id: 'g5-u8-w3', word: 'Clever', ipa: '/ˈklevər/', partOfSpeech: 'adjective', meaningVi: 'Thông minh, khôn ngoan', exampleEn: 'The little mouse is very clever.', exampleVi: 'Chú chuột nhỏ rất thông minh lanh lợi.', isCore: true, unitId: 'unit-g5-u8', grade: 5 },
      { id: 'g5-u8-w4', word: 'Kind', ipa: '/kaɪnd/', partOfSpeech: 'adjective', meaningVi: 'Hiền lành, nhân hậu, tốt bụng', exampleEn: 'Snow White is kind and gentle.', exampleVi: 'Nàng Bạch Tuyết rất hiền lành và nhân hậu.', isCore: true, unitId: 'unit-g5-u8', grade: 5 },
    ],
    grammar: {
      id: 'g5-u8-gram',
      title: 'Hỏi tên truyện đang đọc & Miêu tả tính cách What is he/she like?',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Linda: "What are you reading, Peter?" - Peter: "I am reading The Legend of Watermelons. Mai An Tiem is so hardworking!"',
        highlights: ['What are you reading', 'What is the main character like', 'He is hardworking'],
        explanationFriendly: 'Hỏi đang đọc gì: "What are you reading? - I am reading...". Hỏi tính cách nhân vật: "What is he / she like? - He / She is brave and kind."',
      },
      step2VisualDiagram: {
        diagramType: 'cards',
        notesVi: 'What are you reading? -> I am reading [Book]. What is [Character] like? -> He/She is [Adjective].',
        formulaItems: [
          { label: 'Hỏi sách đang đọc', structure: 'What are you reading?', example: 'What are you reading?' },
          { label: 'Hỏi tính cách', structure: 'What is [he/she] like?', example: 'What is Tam like?' },
          { label: 'Nhận xét', structure: 'He/She is + [kind/clever/generous].', example: 'She is gentle and kind.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g5-u8-ex1',
          level: 'nhan-biet',
          question: 'What is Mai An Tiem like? - He is _______.',
          options: ['hardworking', 'lazy', 'greedy'],
          correctIndex: 0,
          explanationVi: 'Mai An Tiêm là tấm gương chăm chỉ: hardworking.',
        },
      ],
    },
    sentencePattern: {
      id: 'g5-u8-sp',
      frame: 'What are you reading? - I am reading [story]. The main character is [adj].',
      slots: [
        { slotName: 'story', options: ['The Story of Mai An Tiem', 'Aladdin and the Magic Lamp', 'Snow White and the Seven Dwarfs', 'The Fox and the Crow'] },
        { slotName: 'adj', options: ['hardworking', 'clever', 'brave', 'kind and gentle'] },
      ],
      contextVi: 'Giới thiệu cuốn truyện hay trong buổi sinh hoạt đọc sách.',
      sampleDialogue: {
        speakerA: 'What are you reading in the library, Phong?',
        lineA: 'Is it a fairy tale?',
        speakerB: 'Yes, it is The Golden Starfruit Tree.',
        lineB: 'The younger brother is very honest and kind.',
      },
      substitutionDrills: [
        { prompt: 'Nói em đang đọc truyện Aladdin và Cây đèn thần:', expectedPattern: 'I am reading Aladdin and the Magic Lamp.', cueWords: ['am reading', 'Aladdin and the Magic Lamp'] },
      ],
    },
    realLife: [
      {
        id: 'g5-u8-rl',
        title: 'Kể lại bài học đạo đức từ câu chuyện cổ tích',
        roleA: 'Học sinh kể chuyện',
        roleB: 'Cả lớp lắng nghe',
        exchanges: [
          { speaker: 'Bé', lineEn: 'The story teaches us to be honest and not greedy.', lineVi: 'Câu chuyện dạy chúng ta phải luôn thật thà và không được tham lam.' },
          { speaker: 'Cô giáo', lineEn: 'Excellent moral lesson! Good deeds are always rewarded.', lineVi: 'Bài học đạo đức thật sâu sắc! Làm việc thiện sẽ luôn được đền đáp xứng đáng.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g5-u8-q1',
        type: 'multiple-choice',
        question: 'Từ nào mang nghĩa "dũng cảm, gan dạ"?',
        options: ['Brave', 'Greedy', 'Lazy'],
        correctIndex: 0,
        explanation: '"Brave" là dũng cảm.',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 9
  {
    id: 'unit-g5-u9',
    unitNumber: 9,
    title: 'What Did You See at the Zoo?',
    themeVi: 'Động vật hoang dã & Vườn bách thú',
    themeIcon: '🦁',
    grade: 5,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Các con vật sở thú (monkeys, elephants, tigers, peacocks, pandas), trạng từ miêu tả hành động (roared loudly, moved quietly, jumped quickly).',
    vocabularies: [
      { id: 'g5-u9-w1', word: 'Peacock', ipa: '/ˈpiːkɒk/', partOfSpeech: 'noun', meaningVi: 'Con công (xòe đuôi đẹp)', exampleEn: 'The peacock moved beautifully.', exampleVi: 'Chú công múa đuôi thật lộng lẫy.', isCore: true, unitId: 'unit-g5-u9', grade: 5 },
      { id: 'g5-u9-w2', word: 'Roar', ipa: '/rɔːr/', partOfSpeech: 'verb', meaningVi: 'Gầm rống (Quá khứ: roared)', exampleEn: 'The tiger roared loudly in the cage.', exampleVi: 'Chú hổ gầm vang dũng mãnh trong chuồng.', isCore: true, unitId: 'unit-g5-u9', grade: 5 },
      { id: 'g5-u9-w3', word: 'Loudly', ipa: '/ˈlaʊdli/', partOfSpeech: 'adverb', meaningVi: 'Một cách ầm ĩ, to tiếng', exampleEn: 'The monkeys were chattering loudly.', exampleVi: 'Lũ khỉ chí chát kêu to trên cành cây.', isCore: true, unitId: 'unit-g5-u9', grade: 5 },
      { id: 'g5-u9-w4', word: 'Quietly', ipa: '/ˈkwaɪətli/', partOfSpeech: 'adverb', meaningVi: 'Một cách lặng lẽ, êm ái', exampleEn: 'The python moved quietly through the grass.', exampleVi: 'Con trăn trườn êm ru qua bãi cỏ.', isCore: true, unitId: 'unit-g5-u9', grade: 5 },
    ],
    grammar: {
      id: 'g5-u9-gram',
      title: 'Trạng từ chỉ cách thức (Adverbs of Manner thêm đuôi -ly) & Quá khứ đơn',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Tony: "What did you see at the zoo?" - Mai: "I saw baby pandas. They moved very slowly and cutely."',
        highlights: ['What did you see at the zoo', 'I saw', 'slowly and quietly'],
        explanationFriendly: 'Trạng từ chỉ cách thức thường được tạo thành bằng cách thêm đuôi -LY vào sau tính từ (loud -> loudly, slow -> slowly, quick -> quickly). Trạng từ đứng sau động từ để miêu tả hành động đó diễn ra như thế nào.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Tính từ + LY = Trạng từ chỉ cách thức (quick -> quickly, loud -> loudly, quiet -> quietly).',
        formulaItems: [
          { label: 'Hỏi động vật sở thú', structure: 'What did you see at the zoo?', example: 'What did you see at the zoo?' },
          { label: 'Hỏi hành động', structure: 'What did the [animals] do when you were there?', example: 'They roared loudly.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g5-u9-ex1',
          level: 'nhan-biet',
          question: 'The lion roared _______ (loud). Điền trạng từ thích hợp:',
          options: ['loudly', 'loudness', 'louder'],
          correctIndex: 0,
          explanationVi: 'Trạng từ bổ nghĩa cho động từ "roared" là "loudly".',
        },
      ],
    },
    sentencePattern: {
      id: 'g5-u9-sp',
      frame: 'What did the [animals] do? - They [verbEd] [adverbLy].',
      slots: [
        { slotName: 'animals', options: ['tigers', 'peacocks', 'monkeys', 'elephants'] },
        { slotName: 'verbEd', options: ['roared', 'danced', 'jumped', 'walked'] },
        { slotName: 'adverbLy', options: ['loudly', 'beautifully', 'quickly', 'slowly'] },
      ],
      contextVi: 'Kể lại chuyến tham quan vườn thú thú vị.',
      sampleDialogue: {
        speakerA: 'Did you see the elephants at the zoo?',
        lineA: 'What were they doing?',
        speakerB: 'Yes, I did! They were spraying water with their trunks.',
        lineB: 'They walked very slowly and peacefully.',
      },
      substitutionDrills: [
        { prompt: 'Nói những chú công đã múa đuôi rất đẹp mắt:', expectedPattern: 'The peacocks danced beautifully.', cueWords: ['peacocks', 'danced beautifully'] },
      ],
    },
    realLife: [
      {
        id: 'g5-u9-rl',
        title: 'Ý thức bảo vệ động vật hoang dã khi đi sở thú',
        roleA: 'Hướng dẫn viên sở thú',
        roleB: 'Học sinh tham quan',
        exchanges: [
          { speaker: 'HDV', lineEn: 'Please do not feed or tease the wild animals.', lineVi: 'Các em vui lòng không cho thú ăn thức ăn lạ và không trêu chọc động vật nhé.' },
          { speaker: 'Học sinh', lineEn: 'We understand! We love and protect wild nature.', lineVi: 'Chúng em hiểu rồi ạ! Chúng em yêu quý và bảo vệ thiên nhiên hoang dã.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g5-u9-q1',
        type: 'multiple-choice',
        question: 'Dạng quá khứ của động từ "see" là:',
        options: ['saw', 'seed', 'seen'],
        correctIndex: 0,
        explanation: 'Quá khứ của see là "saw".',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 10
  {
    id: 'unit-g5-u10',
    unitNumber: 10,
    title: 'When Will Sports Day Be?',
    themeVi: 'Ngày hội thể thao & Sự kiện tương lai',
    themeIcon: '🏆',
    grade: 5,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Các ngày hội lớn của trường (Sports Day, Teachers\' Day, Children\'s Day, Independence Day), cấu trúc Be going to diễn tả kế hoạch chuẩn bị: "What are you going to do on Sports Day? - I am going to play table tennis."',
    vocabularies: [
      { id: 'g5-u10-w1', word: 'Sports Day', ipa: '/ˈspɔːts deɪ/', partOfSpeech: 'noun', meaningVi: 'Ngày hội thể thao trường học', exampleEn: 'Sports Day will be next Saturday.', exampleVi: 'Ngày hội thể thao sẽ diễn ra vào Thứ Bảy tuần tới.', isCore: true, unitId: 'unit-g5-u10', grade: 5 },
      { id: 'g5-u10-w2', word: 'Teachers\' Day', ipa: '/ˈtiːtʃəz deɪ/', partOfSpeech: 'noun', meaningVi: 'Ngày Nhà giáo Việt Nam (20/11)', exampleEn: 'We give flowers to teachers on Teachers\' Day.', exampleVi: 'Chúng em dâng tặng những đóa hoa tươi thắm tri ân thầy cô.', isCore: true, unitId: 'unit-g5-u10', grade: 5 },
      { id: 'g5-u10-w3', word: 'Competition', ipa: '/ˌkɒmpəˈtɪʃn/', partOfSpeech: 'noun', meaningVi: 'Cuộc thi đấu, hội thi', exampleEn: 'I will take part in the running competition.', exampleVi: 'Tớ sẽ tham gia cuộc thi chạy cự ly ngắn.', isCore: true, unitId: 'unit-g5-u10', grade: 5 },
      { id: 'g5-u10-w4', word: 'Take part in', ipa: '/teɪk pɑːt ɪn/', partOfSpeech: 'phrase', meaningVi: 'Tham gia vào (sự kiện, giải đấu)', exampleEn: 'Are you going to take part in the singing contest?', exampleVi: 'Bạn có định tham gia hội thi văn nghệ không?', isCore: true, unitId: 'unit-g5-u10', grade: 5 },
    ],
    grammar: {
      id: 'g5-u10-gram',
      title: 'Cấu trúc Be Going To + V-infinitive (Kế hoạch tương lai gần)',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Mai: "When will Sports Day be, Nam?" - Nam: "It will be on next Friday. I am going to play basketball!"',
        highlights: ['When will Sports Day be', 'It will be on', 'I am going to play'],
        explanationFriendly: 'Phân biệt: Dùng "will be on + [ngày]" để nói khi nào sự kiện diễn ra. Dùng "be going to + V" (I am going to, She is going to) khi đã có kế hoạch hoặc chuẩn bị từ trước.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'S + am/is/are + going to + V-infinitive (Kế hoạch chắc chắn trong tương lai).',
        formulaItems: [
          { label: 'Hỏi ngày sự kiện', structure: 'When will [Event] be?', example: 'When will Children\'s Day be?' },
          { label: 'Hỏi kế hoạch', structure: 'What are you going to do on [Event]?', example: 'What are you going to do?' },
          { label: 'Trả lời kế hoạch', structure: 'I am going to + [action].', example: 'I am going to play badminton.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g5-u10-ex1',
          level: 'nhan-biet',
          question: 'What are you going to do on Sports Day? - I am going to _______ (play) table tennis.',
          options: ['play', 'playing', 'played'],
          correctIndex: 0,
          explanationVi: 'Sau "be going to" luôn là động từ nguyên mẫu: play.',
        },
      ],
    },
    sentencePattern: {
      id: 'g5-u10-sp',
      frame: 'When will [event] be? - It will be on [day]. I am going to [action].',
      slots: [
        { slotName: 'event', options: ['Sports Day', 'Teachers\' Day', 'Children\'s Day', 'Independence Day'] },
        { slotName: 'day', options: ['next Friday', 'Saturday', 'the twentieth of November', 'the first of June'] },
        { slotName: 'action', options: ['sing an English song', 'play football', 'join the tug of war', 'present a gift'] },
      ],
      contextVi: 'Chuẩn bị tiết mục cho ngày hội lớn của trường.',
      sampleDialogue: {
        speakerA: 'When will our school Sports Day be?',
        lineA: 'I want to register early.',
        speakerB: 'It will be next Friday morning.',
        lineB: 'I am going to practice running every afternoon this week!',
      },
      substitutionDrills: [
        { prompt: 'Hỏi Ngày hội thể thao khi nào diễn ra và trả lời vào Thứ Sáu tới:', expectedPattern: 'When will Sports Day be? - It will be next Friday.', cueWords: ['When will Sports Day be', 'next Friday'] },
      ],
    },
    realLife: [
      {
        id: 'g5-u10-rl',
        title: 'Cổ vũ tinh thần thể thao cao thượng và đoàn kết',
        roleA: 'Vận động viên nhí',
        roleB: 'Khán giả cổ vũ',
        exchanges: [
          { speaker: 'Bé', lineEn: 'I won the silver medal in the 100-meter race!', lineVi: 'Tớ đã giành được huy chương bạc cuộc thi chạy 100 mét rồi!' },
          { speaker: 'Bạn bè', lineEn: 'Congratulations! You ran with all your heart.', lineVi: 'Chúc mừng bạn! Bạn đã nỗ lực chạy hết mình bằng cả trái tim.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g5-u10-q1',
        type: 'multiple-choice',
        question: 'Chọn câu đúng diễn tả kế hoạch chắc chắn:',
        options: ['We are going to play football tomorrow.', 'We going to play football tomorrow.', 'We are go to play football tomorrow.'],
        correctIndex: 0,
        explanation: 'Cấu trúc chuẩn: S + are + going to + V nguyên mẫu.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },
];
