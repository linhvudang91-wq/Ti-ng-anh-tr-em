import { UnitData } from '../../types';

export const GRADE_7_UNITS: UnitData[] = [
  // Unit 1
  {
    id: 'unit-g7-u1',
    unitNumber: 1,
    title: 'Hobbies & Healthy Lifestyles',
    themeVi: 'Sở thích lành mạnh & Động từ chỉ cảm xúc',
    themeIcon: '🎨',
    grade: 7,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Các sở thích phát triển bản thân (gardening, horse-riding, arranging flowers, making models). Động từ chỉ yêu thích (like, love, enjoy, adore, fancy, prefer) và ghét (hate, dislike, detest) theo sau bởi Gerund (V-ing).',
    vocabularies: [
      { id: 'g7-u1-w1', word: 'Gardening', ipa: '/ˈɡɑːdnɪŋ/', partOfSpeech: 'noun', meaningVi: 'Nghệ thuật làm vườn, chăm cây cảnh', exampleEn: 'Gardening helps my mother reduce stress after work.', exampleVi: 'Làm vườn giúp mẹ tớ giải tỏa căng thẳng sau giờ làm.', isCore: true, unitId: 'unit-g7-u1', grade: 7 },
      { id: 'g7-u1-w2', word: 'Detest', ipa: '/dɪˈtest/', partOfSpeech: 'verb', meaningVi: 'Căm ghét, cực kỳ không thích', exampleEn: 'I detest washing dishes on freezing winter days.', exampleVi: 'Tớ cực kỳ ghét việc rửa bát vào những ngày đông giá rét.', isCore: true, unitId: 'unit-g7-u1', grade: 7 },
      { id: 'g7-u1-w3', word: 'Patience', ipa: '/ˈpeɪʃns/', partOfSpeech: 'noun', meaningVi: 'Lòng kiên nhẫn, sự bền chí', exampleEn: 'Making cardboard models requires great patience.', exampleVi: 'Làm mô hình bằng bìa các tông đòi hỏi sự kiên nhẫn cao.', isCore: true, unitId: 'unit-g7-u1', grade: 7 },
      { id: 'g7-u1-w4', word: 'Beneficial', ipa: '/ˌbenɪˈfɪʃl/', partOfSpeech: 'adjective', meaningVi: 'Có lợi ích, hữu ích cho sức khỏe/tinh thần', exampleEn: 'Regular swimming is beneficial for your spine.', exampleVi: 'Bơi lội đều đặn rất có lợi cho cột sống của bạn.', isCore: true, unitId: 'unit-g7-u1', grade: 7 },
    ],
    grammar: {
      id: 'g7-u1-gram',
      title: 'Động từ chỉ sở thích (Verbs of Liking & Disliking) + Danh động từ (Gerund V-ing)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Trang: "Do you fancy doing origami?" - Nam: "Yes, I adore folding paper cranes, but I detest playing video games all day."',
        highlights: ['fancy doing', 'adore folding', 'detest playing'],
        explanationFriendly: 'Các động từ: like, love, enjoy, adore, fancy (thích), prefer (chuộng hơn), hate, dislike, detest (ghét) theo sau bởi V-ing. Riêng like, love, hate có thể đi với cả to-V.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'S + like / love / enjoy / adore / fancy / prefer / hate / detest + Verb-ING.',
        formulaItems: [
          { label: 'Rất thích (Adore/Fancy)', structure: 'S + adore / fancy + V-ing', example: 'She adores cooking Italian pasta.' },
          { label: 'Cực ghét (Detest)', structure: 'S + detest + V-ing', example: 'They detest waking up early.' },
          { label: 'Thích hơn (Prefer)', structure: 'S + prefer + V-ing + TO + V-ing', example: 'I prefer cycling to walking.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g7-u1-ex1',
          level: 'nhan-biet',
          question: 'My sister adores _______ (read) mystery novels before bedtime.',
          options: ['reading', 'reads', 'read'],
          correctIndex: 0,
          explanationVi: 'Sau động từ "adore" bắt buộc dùng dạng V-ing: reading.',
        },
      ],
    },
    sentencePattern: {
      id: 'g7-u1-sp',
      frame: 'I enjoy [hobby] because it develops my [benefit].',
      slots: [
        { slotName: 'hobby', options: ['arranging flowers', 'painting landscapes', 'growing organic vegetables', 'playing the violin'] },
        { slotName: 'benefit', options: ['creativity and patience', 'physical fitness', 'calmness of mind', 'musical sense'] },
      ],
      contextVi: 'Thuyết trình về giá trị của những sở thích lành mạnh.',
      sampleDialogue: {
        speakerA: 'Why do you choose making miniature models as your hobby?',
        lineA: 'Doesn\'t it take too much time?',
        speakerB: 'I love focusing on tiny details. It trains my patience and precision immensely.',
        lineB: 'When a model is finished, the satisfaction is priceless.',
      },
      substitutionDrills: [
        { prompt: 'Nói em thích đi xe đạp hơn là ngồi xem ti vi:', expectedPattern: 'I prefer cycling to watching television.', cueWords: ['prefer cycling to', 'watching television'] },
      ],
    },
    realLife: [
      {
        id: 'g7-u1-rl',
        title: 'Thành lập câu lạc bộ sở thích xanh tại trường',
        roleA: 'Học sinh khởi xướng',
        roleB: 'Bạn bè tham gia',
        exchanges: [
          { speaker: 'Học sinh', lineEn: 'Let\'s create a school gardening club to grow sunflowers and herbs!', lineVi: 'Chúng mình cùng lập CLB làm vườn của trường để trồng hoa hướng dương và thảo mộc nhé!' },
          { speaker: 'Bạn bè', lineEn: 'Count me in! Caring for green plants is deeply rewarding.', lineVi: 'Cho tớ tham gia với! Chăm sóc cây xanh thực sự mang lại niềm vui rất lớn.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g7-u1-q1',
        type: 'multiple-choice',
        question: 'Động từ nào đồng nghĩa với "hate very much"?',
        options: ['Detest', 'Fancy', 'Adore'],
        correctIndex: 0,
        explanation: '"Detest" nghĩa là căm ghét sâu sắc (hate deeply).',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 2
  {
    id: 'unit-g7-u2',
    unitNumber: 2,
    title: 'Healthy Living & Wellness',
    themeVi: 'Lối sống lành mạnh & Cấu trúc câu đơn',
    themeIcon: '🥗',
    grade: 7,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Các vấn đề sức khỏe thường gặp (sunburn, acne, chapped lips, eye strain, allergy). Câu đơn trong tiếng Anh (Simple Sentences: S + V + O) và lời khuyên ăn uống cân bằng dinh dưỡng.',
    vocabularies: [
      { id: 'g7-u2-w1', word: 'Sunburn', ipa: '/ˈsʌnbɜːn/', partOfSpeech: 'noun', meaningVi: 'Cháy nắng, bỏng da do ánh mặt trời', exampleEn: 'Apply sun cream to prevent severe sunburn.', exampleVi: 'Hãy bôi kem chống nắng để tránh bị cháy nắng nghiêm trọng.', isCore: true, unitId: 'unit-g7-u2', grade: 7 },
      { id: 'g7-u2-w2', word: 'Acne', ipa: '/ˈækni/', partOfSpeech: 'noun', meaningVi: 'Mụn trứng cá tuổi dậy thì', exampleEn: 'Wash your face gently twice a day to reduce acne.', exampleVi: 'Rửa mặt nhẹ nhàng 2 lần mỗi ngày để giảm mụn trứng cá.', isCore: true, unitId: 'unit-g7-u2', grade: 7 },
      { id: 'g7-u2-w3', word: 'Balanced diet', ipa: '/ˌbælənst ˈdaɪət/', partOfSpeech: 'phrase', meaningVi: 'Chế độ ăn uống cân đối, đủ chất', exampleEn: 'A balanced diet provides essential vitamins.', exampleVi: 'Chế độ ăn cân đối cung cấp đầy đủ vitamin thiết yếu.', isCore: true, unitId: 'unit-g7-u2', grade: 7 },
      { id: 'g7-u2-w4', word: 'Hydrated', ipa: '/haɪˈdreɪtɪd/', partOfSpeech: 'adjective', meaningVi: 'Đủ nước (cơ thể được cấp nước đầy đủ)', exampleEn: 'Drink at least two liters of water to stay hydrated.', exampleVi: 'Hãy uống ít nhất 2 lít nước để cơ thể luôn đủ nước.', isCore: true, unitId: 'unit-g7-u2', grade: 7 },
    ],
    grammar: {
      id: 'g7-u2-gram',
      title: 'Cấu trúc câu đơn (Simple Sentences) & Các thành phần S-V-O-A',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Doctor: "You look pale. Fresh vegetables give you minerals. Exercise keeps you energetic."',
        highlights: ['Fresh vegetables give you minerals', 'Exercise keeps you energetic'],
        explanationFriendly: 'Câu đơn chỉ chứa MỘT mệnh đề độc lập với chủ ngữ và vị ngữ: S + V (I sleep), S + V + O (He eats apples), S + V + O + A (She runs fast every morning). Có thể dùng liên từ "and, or" để nối hai chủ ngữ hoặc hai động từ trong một câu đơn.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Subject (Chủ ngữ) + Verb (Động từ) + Object (Tân ngữ) + Adverbial (Trạng ngữ).',
        formulaItems: [
          { label: 'S + V', structure: 'Subject + Intransitive Verb', example: 'Birds sing.' },
          { label: 'S + V + O', structure: 'Subject + Transitive Verb + Object', example: 'We drink pure water.' },
          { label: 'S + V + Adj', structure: 'Subject + Linking Verb + Adjective', example: 'Apples taste sweet.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g7-u2-ex1',
          level: 'nhan-biet',
          question: 'Xác định thành phần vị ngữ trong câu: "Fresh fruits provide essential nutrients."',
          options: ['provide essential nutrients', 'Fresh fruits', 'nutrients'],
          correctIndex: 0,
          explanationVi: 'Vị ngữ gồm động từ và tân ngữ: provide essential nutrients.',
        },
      ],
    },
    sentencePattern: {
      id: 'g7-u2-sp',
      frame: 'To avoid [healthIssue], you should [healthyAction].',
      slots: [
        { slotName: 'healthIssue', options: ['sunburn', 'eye strain', 'weight gain', 'chapped skin'] },
        { slotName: 'healthyAction', options: ['wear a wide-brimmed hat', 'take breaks from screens every 20 minutes', 'avoid junk food', 'use lip balm'] },
      ],
      contextVi: 'Tư vấn cẩm nang chăm sóc sức khỏe học đường.',
      sampleDialogue: {
        speakerA: 'My eyes feel tired after studying online for hours.',
        lineA: 'What should I do?',
        speakerB: 'Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.',
        lineB: 'And remember to blink regularly.',
      },
      substitutionDrills: [
        { prompt: 'Nói để tránh cháy nắng, bạn nên bôi kem chống nắng khi ra biển:', expectedPattern: 'To avoid sunburn, you should wear sun cream on the beach.', cueWords: ['To avoid sunburn', 'wear sun cream'] },
      ],
    },
    realLife: [
      {
        id: 'g7-u2-rl',
        title: 'Tự chuẩn bị bữa phụ lành mạnh mang đến trường',
        roleA: 'Học sinh',
        roleB: 'Chuyên gia dinh dưỡng',
        exchanges: [
          { speaker: 'Học sinh', lineEn: 'I bring almonds and an apple instead of packaged chips.', lineVi: 'Em mang hạt hạnh nhân và một quả táo thay vì bim bim đóng gói sẵn.' },
          { speaker: 'Chuyên gia', lineEn: 'Smart choice! Nuts and fresh fruits supply sustainable energy without sugar spikes.', lineVi: 'Lựa chọn thông minh! Các loại hạt và trái cây tươi cung cấp năng lượng bền bỉ mà không làm tăng đường huyết đột ngột.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g7-u2-q1',
        type: 'multiple-choice',
        question: 'Câu nào sau đây là câu đơn (Simple Sentence)?',
        options: ['Nam reads books and listens to instrumental music.', 'Nam reads books, but his sister watches cartoons.', 'Because it rained, Nam stayed home.'],
        correctIndex: 0,
        explanation: 'Câu A là câu đơn có 1 chủ ngữ và vị ngữ kép (compound predicate).',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 3
  {
    id: 'unit-g7-u3',
    unitNumber: 3,
    title: 'Community Service & Volunteers',
    themeVi: 'Phục vụ cộng đồng & Tình nguyện viên',
    themeIcon: '🤝',
    grade: 7,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Các hoạt động vì cộng đồng (donate warm clothes, mentor street children, plant trees, clean the neighborhood, blood donation). Thì Quá khứ đơn (Past Simple) và Thì Hiện tại hoàn thành (Present Perfect sơ khởi).',
    vocabularies: [
      { id: 'g7-u3-w1', word: 'Volunteer', ipa: '/ˌvɒlənˈtɪər/', partOfSpeech: 'noun', meaningVi: 'Tình nguyện viên (hoạt động thiện nguyện)', exampleEn: 'Hundreds of young volunteers cleaned the polluted canal.', exampleVi: 'Hàng trăm tình nguyện viên trẻ đã dọn sạch dòng kênh bị ô nhiễm.', isCore: true, unitId: 'unit-g7-u3', grade: 7 },
      { id: 'g7-u3-w2', word: 'Donate', ipa: '/dəʊˈneɪt/', partOfSpeech: 'verb', meaningVi: 'Quyên góp, ủng hộ từ thiện', exampleEn: 'Students donated old textbooks to highland children.', exampleVi: 'Học sinh đã quyên góp sách giáo khoa cũ tặng các bạn vùng cao.', isCore: true, unitId: 'unit-g7-u3', grade: 7 },
      { id: 'g7-u3-w3', word: 'Nursing home', ipa: '/ˈnɜːsɪŋ həʊm/', partOfSpeech: 'noun', meaningVi: 'Viện dưỡng lão (chăm sóc người già)', exampleEn: 'We visited the elderly in the local nursing home.', exampleVi: 'Chúng tớ đã đến thăm các cụ già ở viện dưỡng lão địa phương.', isCore: true, unitId: 'unit-g7-u3', grade: 7 },
      { id: 'g7-u3-w4', word: 'Tutor', ipa: '/ˈtjuːtər/', partOfSpeech: 'verb', meaningVi: 'Kèm cặp, phụ đạo kiến thức cho người khác', exampleEn: 'Binh tutors primary school pupils in Maths twice a week.', exampleVi: 'Bình phụ đạo môn Toán cho các em tiểu học 2 lần một tuần.', isCore: true, unitId: 'unit-g7-u3', grade: 7 },
    ],
    grammar: {
      id: 'g7-u3-gram',
      title: 'Thì Quá khứ đơn (Past Simple) với các hoạt động thiện nguyện đã hoàn tất',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Mai: "Last weekend, we collected 200 warm blankets and delivered them to a remote village in Ha Giang."',
        highlights: ['collected', 'delivered', 'Last weekend'],
        explanationFriendly: 'Khi có thời gian quá khứ rõ ràng (last weekend, yesterday, in 2023), luôn dùng thì Quá khứ đơn: S + V2/ed. Regular: donate -> donated, recycle -> recycled. Irregular: give -> gave, bring -> brought.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Past Simple: Đã xảy ra và chấm dứt tại thời điểm cụ thể trong quá khứ.',
        formulaItems: [
          { label: 'Động từ có quy tắc', structure: 'Verb + -ed', example: 'We planted 100 green trees.' },
          { label: 'Động từ bất quy tắc', structure: 'V2 (Cột 2 bảng BQT)', example: 'They gave warm clothes to the homeless.' },
          { label: 'Trạng từ nhận biết', structure: 'yesterday, ago, last month, in + [năm]', example: 'In 2022, the project started.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g7-u3-ex1',
          level: 'nhan-biet',
          question: 'Last month, our club _______ (raise) 10 million VND for the flood victims.',
          options: ['raised', 'raising', 'raises'],
          correctIndex: 0,
          explanationVi: '"Last month" là dấu hiệu của thì Quá khứ đơn, động từ thêm -d: raised.',
        },
      ],
    },
    sentencePattern: {
      id: 'g7-u3-sp',
      frame: 'We [pastAction] to help [beneficiary] because [nobleReason].',
      slots: [
        { slotName: 'pastAction', options: ['donated notebooks and warm clothes', 'cleaned the public park', 'tutored disadvantaged children', 'cooked warm soup'] },
        { slotName: 'beneficiary', options: ['children in mountainous areas', 'the elderly in nursing homes', 'homeless people', 'street animals'] },
        { slotName: 'nobleReason', options: ['every small act of kindness matters', 'we want to share love and warmth', 'a clean environment protects all of us'] },
      ],
      contextVi: 'Báo cáo tổng kết dự án hoạt động tình nguyện hè.',
      sampleDialogue: {
        speakerA: 'What did your youth union do during the Green Summer campaign?',
        lineA: 'Tell us about the highlights.',
        speakerB: 'We painted murals on old walls and planted 50 flowering trees along the village road.',
        lineB: 'The villagers were so welcoming and happy.',
      },
      substitutionDrills: [
        { prompt: 'Nói chúng tôi đã quyên góp hơn 500 cuốn sách cho thư viện trường nghèo:', expectedPattern: 'We donated over 500 books to the rural school library.', cueWords: ['donated over 500 books', 'rural school library'] },
      ],
    },
    realLife: [
      {
        id: 'g7-u3-rl',
        title: 'Hội chợ gây quỹ từ thiện "Trái tim nhân ái"',
        roleA: 'Trưởng ban tổ chức',
        roleB: 'Người ủng hộ',
        exchanges: [
          { speaker: 'Học sinh', lineEn: 'All proceeds from these handmade cards will support orphanages in our town.', lineVi: 'Toàn bộ số tiền thu được từ những tấm thiệp thủ công này sẽ được chuyển đến các trại trẻ mồ côi.' },
          { speaker: 'Bác hảo tâm', lineEn: 'Wonderful spirit! I will purchase five cards to support your noble cause.', lineVi: 'Tinh thần thật tuyệt vời! Bác sẽ mua 5 tấm thiệp để ủng hộ nghĩa cử cao đẹp của các cháu.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g7-u3-q1',
        type: 'multiple-choice',
        question: 'Dạng quá khứ của động từ "give" là:',
        options: ['gave', 'gived', 'given'],
        correctIndex: 0,
        explanation: 'Give biến đổi bất quy tắc thành "gave".',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 4
  {
    id: 'unit-g7-u4',
    unitNumber: 4,
    title: 'Music and Arts',
    themeVi: 'Âm nhạc & Nghệ thuật tạo hình',
    themeIcon: '🎻',
    grade: 7,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Các loại hình nghệ thuật (water puppetry, classical music, landscape painting, portrait, sculpture). Cấu trúc so sánh: AS... AS (ngang bằng), THE SAME AS (giống như), DIFFERENT FROM (khác với).',
    vocabularies: [
      { id: 'g7-u4-w1', word: 'Puppetry', ipa: '/ˈpʌpɪtri/', partOfSpeech: 'noun', meaningVi: 'Nghệ thuật múa rối nước truyền thống', exampleEn: 'Water puppetry originated in northern Vietnam centuries ago.', exampleVi: 'Múa rối nước bắt nguồn từ vùng đồng bằng Bắc Bộ hàng thế kỷ trước.', isCore: true, unitId: 'unit-g7-u4', grade: 7 },
      { id: 'g7-u4-w2', word: 'Composer', ipa: '/kəmˈpəʊzər/', partOfSpeech: 'noun', meaningVi: 'Nhà soạn nhạc, nhạc sĩ sáng tác', exampleEn: 'Trinh Cong Son was a legendary Vietnamese composer.', exampleVi: 'Trịnh Công Sơn là một nhạc sĩ huyền thoại của Việt Nam.', isCore: true, unitId: 'unit-g7-u4', grade: 7 },
      { id: 'g7-u4-w3', word: 'Exhibition', ipa: '/ˌeksɪˈbɪʃn/', partOfSpeech: 'noun', meaningVi: 'Triển lãm tranh, hội họa', exampleEn: 'We visited an art exhibition featuring lacquer paintings.', exampleVi: 'Chúng tớ đã đi xem một buổi triển lãm tranh sơn mài.', isCore: true, unitId: 'unit-g7-u4', grade: 7 },
      { id: 'g7-u4-w4', word: 'Originate', ipa: '/əˈrɪdʒɪneɪt/', partOfSpeech: 'verb', meaningVi: 'Bắt nguồn, xuất xứ từ', exampleEn: 'Jazz music originated in the United States.', exampleVi: 'Nhạc Jazz có nguồn gốc xuất xứ từ nước Mỹ.', isCore: true, unitId: 'unit-g7-u4', grade: 7 },
    ],
    grammar: {
      id: 'g7-u4-gram',
      title: 'So sánh ngang bằng (AS... AS), THE SAME AS và DIFFERENT FROM',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Mi: "Classical music is not as loud as rock music. But is traditional art the same as modern art?"',
        highlights: ['as loud as', 'the same as', 'different from'],
        explanationFriendly: 'Ngang bằng: S1 + be + as + Adj + as + S2. Phủ định: not as/so + Adj + as. Giống nhau: S1 + be + the same as + S2. Khác biệt: S1 + be + different from + S2.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'as + Adj + as (bằng) | not as + Adj + as (không bằng) | the same as (như nhau) | different from (khác với).',
        formulaItems: [
          { label: 'Ngang bằng', structure: 'S1 + be + as + Adj + as + S2', example: 'This drawing is as lively as that photo.' },
          { label: 'Giống nhau', structure: 'S1 + be + the same as + S2', example: 'Her taste in music is the same as mine.' },
          { label: 'Khác biệt', structure: 'S1 + be + different from + S2', example: 'Oil painting is different from watercolor.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g7-u4-ex1',
          level: 'nhan-biet',
          question: 'Sculpture is quite different _______ painting.',
          options: ['from', 'with', 'as'],
          correctIndex: 0,
          explanationVi: 'Cụm từ chuẩn: "different from" (khác với).',
        },
      ],
    },
    sentencePattern: {
      id: 'g7-u4-sp',
      frame: '[Art form A] is [comparisonExpression] [Art form B].',
      slots: [
        { slotName: 'comparisonExpression', options: ['as inspiring as', 'not as noisy as', 'different from', 'the same as'] },
      ],
      contextVi: 'Bình luận và thưởng thức tác phẩm nghệ thuật.',
      sampleDialogue: {
        speakerA: 'Do you find folk music interesting?',
        lineA: 'Many young people only listen to pop.',
        speakerB: 'Traditional ca tru is totally different from modern pop songs, but its depth and poetry are priceless.',
        lineB: 'It preserves our ancient national soul.',
      },
      substitutionDrills: [
        { prompt: 'Nói bức tranh này cũng đẹp như bức tranh của danh họa:', expectedPattern: 'This painting is as beautiful as the master\'s painting.', cueWords: ['as beautiful as', 'master\'s painting'] },
      ],
    },
    realLife: [
      {
        id: 'g7-u4-rl',
        title: 'Xem buổi biểu diễn múa rối nước tại Nhà hát Thăng Long',
        roleA: 'Khán giả say mê',
        roleB: 'Nghệ nhân múa rối',
        exchanges: [
          { speaker: 'Khán giả', lineEn: 'How do you control the puppets under the water so smoothly?', lineVi: 'Làm thế nào mà các nghệ nhân điều khiển các chú rối dưới mặt nước uyển chuyển đến vậy ạ?' },
          { speaker: 'Nghệ nhân', lineEn: 'We use bamboo rods and strings hidden beneath the surface, combined with decades of practice.', lineVi: 'Chúng tôi dùng các thanh tre và dây giấu dưới mặt nước, kết hợp với hàng chục năm dày công khổ luyện.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g7-u4-q1',
        type: 'multiple-choice',
        question: 'Chọn câu đúng: "His answer is the same _______ mine."',
        options: ['as', 'from', 'with'],
        correctIndex: 0,
        explanation: 'Cấu trúc "the same as": giống như.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 5
  {
    id: 'unit-g7-u5',
    unitNumber: 5,
    title: 'Food and Drink & Quantifiers',
    themeVi: 'Ẩm thực truyền thống & Từ chỉ số lượng',
    themeIcon: '🍜',
    grade: 7,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Món ăn Việt Nam và thế giới (pho, bun cha, spring rolls, omelette, turmeric, green tea). Danh từ đếm được và không đếm được. Từ chỉ lượng: some, any, a lot of, much, many, a bottle of, a pinch of.',
    vocabularies: [
      { id: 'g7-u5-w1', word: 'Ingredient', ipa: '/ɪnˈɡriːdiənt/', partOfSpeech: 'noun', meaningVi: 'Nguyên liệu nấu ăn', exampleEn: 'Fresh beef and bone broth are key ingredients of pho.', exampleVi: 'Thịt bò tươi và nước dùng ninh xương là nguyên liệu cốt lõi của phở.', isCore: true, unitId: 'unit-g7-u5', grade: 7 },
      { id: 'g7-u5-w2', word: 'Broth', ipa: '/brɒθ/', partOfSpeech: 'noun', meaningVi: 'Nước dùng (ninh từ xương ngọt thanh)', exampleEn: 'The noodle broth has been simmering for ten hours.', exampleVi: 'Nồi nước dùng phở đã được ninh liu riu suốt 10 tiếng đồng hồ.', isCore: true, unitId: 'unit-g7-u5', grade: 7 },
      { id: 'g7-u5-w3', word: 'Turmeric', ipa: '/ˈtɜːmərɪk/', partOfSpeech: 'noun', meaningVi: 'Củ nghệ (gia vị tạo màu vàng thơm)', exampleEn: 'Add a teaspoon of turmeric powder for golden color.', exampleVi: 'Thêm một thìa cà phê bột nghệ để món ăn có màu vàng óng.', isCore: true, unitId: 'unit-g7-u5', grade: 7 },
      { id: 'g7-u5-w4', word: 'Herb', ipa: '/hɜːb/', partOfSpeech: 'noun', meaningVi: 'Rau thơm, thảo mộc tươi', exampleEn: 'Vietnamese dishes are served with aromatic green herbs.', exampleVi: 'Các món ăn Việt Nam luôn được dùng kèm các loại rau thơm ngát.', isCore: true, unitId: 'unit-g7-u5', grade: 7 },
    ],
    grammar: {
      id: 'g7-u5-gram',
      title: 'Danh từ đếm được/không đếm được & Lượng từ SOME, ANY, MUCH, MANY',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Chef: "Is there any milk left in the fridge?" - Cook: "No, there isn\'t any milk, but we have some fresh eggs and a lot of butter."',
        highlights: ['any milk', 'some fresh eggs', 'a lot of butter'],
        explanationFriendly: 'SOME dùng trong câu khẳng định và lời mời lịch sự (Would you like some tea?). ANY dùng trong câu phủ định và câu hỏi. MUCH + Danh từ không đếm được. MANY + Danh từ đếm được số nhiều.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'SOME (khẳng định/lời mời) | ANY (phủ định/nghi vấn) | MUCH (KĐĐ) | MANY (ĐĐ số nhiều).',
        formulaItems: [
          { label: 'SOME', structure: 'S + have/has + some + N', example: 'We have some apples and milk.' },
          { label: 'ANY', structure: 'S + don\'t have + any + N', example: 'We don\'t have any sugar.' },
          { label: 'How much / many', structure: 'How much + Uncountable / How many + Plural', example: 'How many eggs do we need?' },
        ],
      },
      step3Exercises: [
        {
          id: 'g7-u5-ex1',
          level: 'nhan-biet',
          question: 'There isn\'t _______ salt left in the kitchen container.',
          options: ['any', 'some', 'many'],
          correctIndex: 0,
          explanationVi: 'Câu phủ định "isn\'t" đi với danh từ không đếm được (salt) dùng "any".',
        },
      ],
    },
    sentencePattern: {
      id: 'g7-u5-sp',
      frame: 'To make [dish], we need [quantityAndIngredient]. Do we have any [checkIngredient]?',
      slots: [
        { slotName: 'dish', options: ['traditional spring rolls', 'chicken pho', 'crispy pancakes', 'beef noodles'] },
        { slotName: 'quantityAndIngredient', options: ['some minced pork and mushrooms', 'a bottle of fish sauce', 'two kilos of rice noodles'] },
        { slotName: 'checkIngredient', options: ['cooking oil', 'fresh coriander', 'black pepper'] },
      ],
      contextVi: 'Chuẩn bị nguyên liệu theo công thức nấu ăn gia đình.',
      sampleDialogue: {
        speakerA: 'What ingredients do we need to make spring rolls?',
        lineA: 'Let\'s check the kitchen pantry.',
        speakerB: 'We need some minced pork, vermicelli, carrots and eggs.',
        lineB: 'Do we have any rice paper wrappers left?',
      },
      substitutionDrills: [
        { prompt: 'Hỏi chúng ta cần bao nhiêu lít nước để nấu nước dùng:', expectedPattern: 'How much water do we need to make the broth?', cueWords: ['How much water', 'need to make'] },
      ],
    },
    realLife: [
      {
        id: 'g7-u5-rl',
        title: 'Giới thiệu món Phở bò truyền thống cho bạn bè quốc tế',
        roleA: 'Người giới thiệu',
        roleB: 'Vị khách du lịch',
        exchanges: [
          { speaker: 'Chủ quán', lineEn: 'Pho is our national culinary pride. Squeeze some fresh lime and add herbs for the best flavor!', lineVi: 'Phở là niềm tự hào ẩm thực quốc gia của chúng tôi. Bạn hãy vắt thêm chút chanh tươi và thả rau thơm vào nhé!' },
          { speaker: 'Du khách', lineEn: 'The aroma is divine! The broth is rich, warm and so flavorful.', lineVi: 'Hương thơm thật ngất ngây! Nước dùng đậm đà, ấm áp và tròn vị vô cùng.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g7-u5-q1',
        type: 'multiple-choice',
        question: 'Dùng câu hỏi nào để hỏi giá tiền hoặc số lượng nước/sữa?',
        options: ['How much', 'How many', 'How often'],
        correctIndex: 0,
        explanation: 'How much dùng cho danh từ không đếm được (nước, tiền...).',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 6 (Semester 2)
  {
    id: 'unit-g7-u6',
    unitNumber: 6,
    title: 'A Visit to a Historic School',
    themeVi: 'Tham quan trường xưa & Giới từ thời gian',
    themeIcon: '🏛️',
    grade: 7,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Các trường học và di tích lịch sử (Van Mieu - Quoc Tu Giam, Quoc Hoc Hue, Chu Van An High School). Giới từ chỉ thời gian và nơi chốn (at, in, on) và câu bị động thì hiện tại đơn sơ bộ.',
    vocabularies: [
      { id: 'g7-u6-w1', word: 'Temple of Literature', ipa: '/ˈtempl əv ˈlɪtrətʃə/', partOfSpeech: 'noun', meaningVi: 'Văn Miếu (Trường đại học đầu tiên của Việt Nam)', exampleEn: 'The Temple of Literature was founded in 1070.', exampleVi: 'Văn Miếu được thành lập vào năm 1070.', isCore: true, unitId: 'unit-g7-u6', grade: 7 },
      { id: 'g7-u6-w2', word: 'Scholar', ipa: '/ˈskɒlər/', partOfSpeech: 'noun', meaningVi: 'Học giả, bậc trí thức nho học', exampleEn: 'Stone doctor tablets honor outstanding scholars.', exampleVi: 'Bia tiến sĩ vinh danh những bậc hiền tài học giả kiệt xuất.', isCore: true, unitId: 'unit-g7-u6', grade: 7 },
      { id: 'g7-u6-w3', word: 'Surround', ipa: '/səˈraʊnd/', partOfSpeech: 'verb', meaningVi: 'Bao quanh, bao bọc', exampleEn: 'Ancient banyan trees surround the courtyard.', exampleVi: 'Những cây đa cổ thụ rợp bóng bao quanh sân đình.', isCore: true, unitId: 'unit-g7-u6', grade: 7 },
      { id: 'g7-u6-w4', word: 'Pavilion', ipa: '/pəˈvɪliən/', partOfSpeech: 'noun', meaningVi: 'Gác, lầu vọng cảnh (như Khuê Văn Các)', exampleEn: 'Khue Van Pavilion is the cultural symbol of Hanoi.', exampleVi: 'Khuê Văn Các là biểu tượng văn hóa rạng ngời của Hà Nội.', isCore: true, unitId: 'unit-g7-u6', grade: 7 },
    ],
    grammar: {
      id: 'g7-u6-gram',
      title: 'Giới từ chỉ thời gian & nơi chốn (IN, ON, AT) chi tiết',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Tour guide: "Quoc Tu Giam was built in 1076. It is located at 58 Quoc Tu Giam Street in Hanoi."',
        highlights: ['in 1076', 'at 58 Quoc Tu Giam Street', 'in Hanoi'],
        explanationFriendly: 'Tam giác giới từ: IN (rộng nhất: thế kỷ, năm, mùa, tháng, thành phố, quốc gia) -> ON (vừa: ngày trong tuần, ngày cụ thể, tên đường) -> AT (chính xác nhất: giờ cụ thể, địa chỉ có số nhà).',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'IN: in 1076, in summer, in Hanoi | ON: on Monday, on 5th May, on Nguyen Trai Street | AT: at 7:00, at 12 Tran Phu Street.',
        formulaItems: [
          { label: 'Thời gian chính xác', structure: 'AT + time / exact moment', example: 'At 8 o\'clock, at dawn' },
          { label: 'Ngày và thứ', structure: 'ON + day / date', example: 'On Tuesday, on Teachers\' Day' },
          { label: 'Tháng, năm, thế kỷ', structure: 'IN + month / year / century', example: 'In 2026, in the 11th century' },
        ],
      },
      step3Exercises: [
        {
          id: 'g7-u6-ex1',
          level: 'nhan-biet',
          question: 'The university was established _______ the eleventh century.',
          options: ['in', 'on', 'at'],
          correctIndex: 0,
          explanationVi: 'Đi với thế kỷ (the eleventh century) dùng giới từ "in".',
        },
      ],
    },
    sentencePattern: {
      id: 'g7-u6-sp',
      frame: '[HistoricSchool] was founded in [year] and is located in [city]. It honors [virtue].',
      slots: [
        { slotName: 'virtue', options: ['scholars and talented people', 'national education', 'perseverance in learning'] },
      ],
      contextVi: 'Thuyết minh lịch sử hiếu học của dân tộc Việt Nam.',
      sampleDialogue: {
        speakerA: 'What is the most famous historic school in central Vietnam?',
        lineA: 'Tell me about its architecture.',
        speakerB: 'It is Quoc Hoc Hue High School, founded in 1896.',
        lineB: 'It has distinctive dark red French colonial buildings facing the Perfume River.',
      },
      substitutionDrills: [
        { prompt: 'Nói Văn Miếu được xây dựng vào thế kỷ thứ 11:', expectedPattern: 'The Temple of Literature was built in the eleventh century.', cueWords: ['was built in', 'the eleventh century'] },
      ],
    },
    realLife: [
      {
        id: 'g7-u6-rl',
        title: 'Lễ dâng hương báo công trước thềm kỳ thi tại Văn Miếu',
        roleA: 'Sĩ tử khối 7',
        roleB: 'Thầy cô dặn dò',
        exchanges: [
          { speaker: 'Học sinh', lineEn: 'We pray for wisdom and clarity to do our very best in the exams.', lineVi: 'Chúng em kính cẩn dâng hương cầu mong sự sáng suốt và bình tâm để làm bài thi thật tốt.' },
          { speaker: 'Thầy cô', lineEn: 'Belief in yourselves and diligent revision are the golden keys to success.', lineVi: 'Tự tin vào chính mình cùng sự ôn luyện chăm chỉ là chìa khóa vàng đưa các em đến thành công.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g7-u6-q1',
        type: 'multiple-choice',
        question: 'Chọn giới từ đúng: "The entrance exam takes place _______ June 15th."',
        options: ['on', 'in', 'at'],
        correctIndex: 0,
        explanation: 'Có ngày cụ thể (June 15th) dùng giới từ "on".',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 7
  {
    id: 'unit-g7-u7',
    unitNumber: 7,
    title: 'Traffic & Road Safety',
    themeVi: 'Giao thông & An toàn đường bộ',
    themeIcon: '🚦',
    grade: 7,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Luật an toàn giao thông (zebra crossing, helmet, seat belt, speed limit, traffic lights, pavement). Cấu trúc chỉ khoảng cách "It is about... km from... to..." và Should/Shouldn\'t khi tham gia giao thông.',
    vocabularies: [
      { id: 'g7-u7-w1', word: 'Zebra crossing', ipa: '/ˌzebrə ˈkrɒsɪŋ/', partOfSpeech: 'noun', meaningVi: 'Vạch kẻ sọc trắng cho người đi bộ sang đường', exampleEn: 'Always cross the busy road at the zebra crossing.', exampleVi: 'Luôn luôn sang đường ở vạch kẻ sọc dành cho người đi bộ.', isCore: true, unitId: 'unit-g7-u7', grade: 7 },
      { id: 'g7-u7-w2', word: 'Pedestrian', ipa: '/pəˈdestriən/', partOfSpeech: 'noun', meaningVi: 'Người đi bộ trên đường', exampleEn: 'Drivers must yield the right of way to pedestrians.', exampleVi: 'Người lái xe phải nhường đường cho người đi bộ.', isCore: true, unitId: 'unit-g7-u7', grade: 7 },
      { id: 'g7-u7-w3', word: 'Helmet', ipa: '/ˈhelmɪt/', partOfSpeech: 'noun', meaningVi: 'Mũ bảo hiểm đạt chuẩn', exampleEn: 'Fasten your helmet strap securely before riding.', exampleVi: 'Hãy cài chặt quai mũ bảo hiểm trước khi khởi hành.', isCore: true, unitId: 'unit-g7-u7', grade: 7 },
      { id: 'g7-u7-w4', word: 'Distance', ipa: '/ˈdɪstəns/', partOfSpeech: 'noun', meaningVi: 'Khoảng cách giữa hai địa điểm', exampleEn: 'What is the distance between Hanoi and Hai Phong?', exampleVi: 'Khoảng cách giữa Hà Nội và Hải Phòng là bao xa?', isCore: true, unitId: 'unit-g7-u7', grade: 7 },
    ],
    grammar: {
      id: 'g7-u7-gram',
      title: 'Đại từ giả IT chỉ khoảng cách: It is [distance] from [A] to [B]',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Policeman: "How far is it from your house to school?" - Minh: "It is about two kilometers from my house to school. I always cycle carefully."',
        highlights: ['How far is it', 'It is about two kilometers from... to...'],
        explanationFriendly: 'Hỏi khoảng cách: "How far is it from A to B?". Trả lời: "It is (about) + [số km/mét] + from A to B". Dùng Should / Shouldn\'t để nhắc nhở an toàn giao thông.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'How far is it from A to B? -> It is (about) [distance] from A to B.',
        formulaItems: [
          { label: 'Hỏi cự ly', structure: 'How far is it from [A] to [B]?', example: 'How far is it from here to the station?' },
          { label: 'Trả lời cự ly', structure: 'It is about + [km] from [A] to [B].', example: 'It is about 5 km from my house to school.' },
          { label: 'Lời khuyên an toàn', structure: 'You should / shouldn\'t + V-inf', example: 'You should fasten your seat belt.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g7-u7-ex1',
          level: 'nhan-biet',
          question: '_______ far is it from Hanoi to Da Nang?',
          options: ['How', 'What', 'Where'],
          correctIndex: 0,
          explanationVi: 'Hỏi khoảng cách bao xa dùng "How far".',
        },
      ],
    },
    sentencePattern: {
      id: 'g7-u7-sp',
      frame: 'It is about [distance] from [pointA] to [pointB]. When travelling, we should [safetyRule].',
      slots: [
        { slotName: 'distance', options: ['3 kilometers', '120 kilometers', '500 meters'] },
        { slotName: 'safetyRule', options: ['wear a helmet properly', 'obey the traffic lights', 'walk on the pavement', 'never use mobile phones while driving'] },
      ],
      contextVi: 'Tuyên truyền văn hóa giao thông an toàn trường học.',
      sampleDialogue: {
        speakerA: 'How do you usually travel to school every day?',
        lineA: 'Is it dangerous during rush hour?',
        speakerB: 'I cycle on the bike lane. It is about two kilometers from my house.',
        lineB: 'I always wait for the green light at intersections.',
      },
      substitutionDrills: [
        { prompt: 'Hỏi từ nhà bạn đến bệnh viện gần nhất cách bao xa:', expectedPattern: 'How far is it from your house to the nearest hospital?', cueWords: ['How far is it from', 'nearest hospital'] },
      ],
    },
    realLife: [
      {
        id: 'g7-u7-rl',
        title: 'Đội cờ đỏ hướng dẫn học sinh tan trường an toàn',
        roleA: 'Đội viên cờ đỏ',
        roleB: 'Học sinh đi bộ',
        exchanges: [
          { speaker: 'Cờ đỏ', lineEn: 'Please wait until the pedestrian green signal turns on before crossing!', lineVi: 'Các bạn vui lòng đợi tín hiệu đèn xanh cho người đi bộ bật sáng hãy qua đường nhé!' },
          { speaker: 'Học sinh', lineEn: 'Thank you! Safety comes first.', lineVi: 'Cảm ơn bạn! An toàn luôn luôn là trên hết.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g7-u7-q1',
        type: 'multiple-choice',
        question: 'Chọn câu nhắc nhở đúng: "You _______ ride your motorbike on the pavement."',
        options: ['mustn\'t', 'should', 'can'],
        correctIndex: 0,
        explanation: 'Đi xe máy trên vỉa hè là hành vi cấm: mustn\'t.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 8
  {
    id: 'unit-g7-u8',
    unitNumber: 8,
    title: 'Films and Cinema',
    themeVi: 'Điện ảnh & Liên từ chỉ sự tương phản',
    themeIcon: '🎬',
    grade: 7,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Các thể loại phim (documentary, science-fiction, thriller, animation, comedy, historical drama). Tính từ đuôi -ed và -ing (bored vs boring, excited vs exciting). Liên từ tương phản: although, though, however, nevertheless.',
    vocabularies: [
      { id: 'g7-u8-w1', word: 'Sci-fi', ipa: '/ˈsaɪ faɪ/', partOfSpeech: 'noun', meaningVi: 'Phim khoa học viễn tưởng (Science Fiction)', exampleEn: 'Avatar is a groundbreaking sci-fi masterpiece.', exampleVi: 'Avatar là một kiệt tác phim khoa học viễn tưởng đột phá.', isCore: true, unitId: 'unit-g7-u8', grade: 7 },
      { id: 'g7-u8-w2', word: 'Grip', ipa: '/ɡrɪp/', partOfSpeech: 'verb', meaningVi: 'Cuốn hút, thu hút kịch tính (gripping)', exampleEn: 'The mystery plot was gripping from beginning to end.', exampleVi: 'Cốt truyện ly kỳ cuốn hút người xem từ đầu tới cuối.', isCore: true, unitId: 'unit-g7-u8', grade: 7 },
      { id: 'g7-u8-w3', word: 'Visual effects', ipa: '/ˈvɪʒuəl ɪˈfekts/', partOfSpeech: 'phrase', meaningVi: 'Hiệu ứng hình ảnh, kỹ xảo điện ảnh', exampleEn: 'The visual effects created astonishing alien worlds.', exampleVi: 'Kỹ xảo hình ảnh đã kiến tạo nên những thế giới ngoài hành tinh kinh ngạc.', isCore: true, unitId: 'unit-g7-u8', grade: 7 },
      { id: 'g7-u8-w4', word: 'Nevertheless', ipa: '/ˌnevəðəˈles/', partOfSpeech: 'adverb', meaningVi: 'Tuy nhiên, dù sao đi nữa (đồng nghĩa However)', exampleEn: 'The cinema ticket was pricey; nevertheless, the experience was worthwhile.', exampleVi: 'Vé xem phim khá đắt; tuy nhiên, trải nghiệm mang lại thật xứng đáng.', isCore: true, unitId: 'unit-g7-u8', grade: 7 },
    ],
    grammar: {
      id: 'g7-u8-gram',
      title: 'Tính từ đuôi -ED / -ING & Liên từ ALTHOUGH / HOWEVER',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Lan: "The documentary was very interesting. I was fascinated by the wildlife footage, although the ending was sad."',
        highlights: ['interesting', 'fascinated', 'although'],
        explanationFriendly: 'Tính từ -ING chỉ tính chất của sự vật/bộ phim (The film is boring). Tính từ -ED chỉ cảm xúc của con người (I feel bored). ALTHOUGH đứng đầu mệnh đề (không có dấu phẩy tách). HOWEVER đứng đầu câu thứ 2 (theo sau có dấu phẩy).',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'V-ing adj: Bản chất sự việc (exciting) | V-ed adj: Cảm xúc người nhận (excited). Although + Clause 1, Clause 2. Clause 1. However, Clause 2.',
        formulaItems: [
          { label: 'Tính chất phim', structure: 'Subject + be + Adj-ING', example: 'The plot is thrilling.' },
          { label: 'Cảm xúc người xem', structure: 'Person + feel/be + Adj-ED', example: 'The audience was thrilled.' },
          { label: 'Mệnh đề tương phản', structure: 'Although + S + V, S + V', example: 'Although he was tired, he finished watching.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g7-u8-ex1',
          level: 'nhan-biet',
          question: 'We were deeply _______ (touch) by the heroic sacrifice in the movie.',
          options: ['touched', 'touching', 'touches'],
          correctIndex: 0,
          explanationVi: 'Chỉ cảm xúc xúc động của con người (We were) dùng tính từ đuôi -ed: touched.',
        },
      ],
    },
    sentencePattern: {
      id: 'g7-u8-sp',
      frame: 'Although the film was [adjFeature], [counterStatement].',
      slots: [
        { slotName: 'adjFeature', options: ['a bit lengthy', 'budgeted with small funds', 'scary at times', 'predictable'] },
        { slotName: 'counterStatement', options: ['the acting was emotionally touching', 'it delivered a powerful human message', 'I enjoyed every scene'] },
      ],
      contextVi: 'Viết bài phê bình điện ảnh ngắn đăng góc báo tường.',
      sampleDialogue: {
        speakerA: 'Did you enjoy the new animation film yesterday?',
        lineA: 'Was it as good as critics said?',
        speakerB: 'Although the story was simple, the animation and soundtrack were breathtaking.',
        lineB: 'I was totally captivated by the characters.',
      },
      substitutionDrills: [
        { prompt: 'Nói mặc dù trời mưa to, họ vẫn đến rạp chiếu phim xem phim đúng giờ:', expectedPattern: 'Although it rained heavily, they arrived at the cinema on time.', cueWords: ['Although it rained', 'arrived at the cinema'] },
      ],
    },
    realLife: [
      {
        id: 'g7-u8-rl',
        title: 'Thảo luận câu lạc bộ phim sau buổi chiếu rạp',
        roleA: 'Người điều phối CLB',
        roleB: 'Thành viên đóng góp ý kiến',
        exchanges: [
          { speaker: 'CLB', lineEn: 'What do you think is the deepest takeaway from this film?', lineVi: 'Theo bạn, thông điệp sâu sắc nhất rút ra từ bộ phim này là gì?' },
          { speaker: 'Thành viên', lineEn: 'It shows that genuine empathy can overcome differences between generations.', lineVi: 'Bộ phim cho thấy sự thấu hiểu chân thành có thể vượt qua mọi cách biệt giữa các thế hệ.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g7-u8-q1',
        type: 'multiple-choice',
        question: 'Chọn từ đúng: "The horror movie was so _______ that no one could sleep."',
        options: ['frightening', 'frightened', 'frighten'],
        correctIndex: 0,
        explanation: 'Miêu tả tính chất gây sợ hãi của bộ phim dùng "frightening" (-ing).',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 9
  {
    id: 'unit-g7-u9',
    unitNumber: 9,
    title: 'Festivals Around the World',
    themeVi: 'Lễ hội khắp năm châu & Câu hỏi Yes/No, Wh-',
    themeIcon: '🎭',
    grade: 7,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Các lễ hội độc đáo (Carnival in Brazil, La Tomatina in Spain, Water Festival in Thailand, Halloween, Mid-Autumn Festival). Ôn tập hệ thống câu hỏi nghi vấn (Yes/No questions và Wh-questions).',
    vocabularies: [
      { id: 'g7-u9-w1', word: 'Carnival', ipa: '/ˈkɑːnɪvl/', partOfSpeech: 'noun', meaningVi: 'Lễ hội hóa trang đường phố sôi động', exampleEn: 'Rio Carnival attracts millions of tourists every February.', exampleVi: 'Lễ hội hóa trang Rio thu hút hàng triệu du khách vào tháng 2 hàng năm.', isCore: true, unitId: 'unit-g7-u9', grade: 7 },
      { id: 'g7-u9-w2', word: 'Lantern', ipa: '/ˈlæntən/', partOfSpeech: 'noun', meaningVi: 'Đèn lồng rực rỡ đêm hội', exampleEn: 'Children carry star-shaped lanterns during Mid-Autumn.', exampleVi: 'Trẻ em rước đèn ông sao lấp lánh trong đêm Trung thu.', isCore: true, unitId: 'unit-g7-u9', grade: 7 },
      { id: 'g7-u9-w3', word: 'Parade', ipa: '/pəˈreɪd/', partOfSpeech: 'noun', meaningVi: 'Cuộc diễu hành rực rỡ sắc màu', exampleEn: 'Dancers in magnificent costumes joined the grand parade.', exampleVi: 'Các vũ công trong trang phục lộng lẫy đã tham gia đoàn diễu hành lớn.', isCore: true, unitId: 'unit-g7-u9', grade: 7 },
      { id: 'g7-u9-w4', word: 'Superstitious', ipa: '/ˌsuːpəˈstɪʃəs/', partOfSpeech: 'adjective', meaningVi: 'Mê tín, tin vào điềm may rủi', exampleEn: 'Some festival rituals originated from superstitious beliefs.', exampleVi: 'Một số nghi thức lễ hội bắt nguồn từ những niềm tin mang tính tâm linh xưa.', isCore: true, unitId: 'unit-g7-u9', grade: 7 },
    ],
    grammar: {
      id: 'g7-u9-gram',
      title: 'Hệ thống câu hỏi Wh- & Yes/No Questions trong giao tiếp lễ hội',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Akiko: "When do Thai people celebrate the Water Festival?" - Somchai: "They celebrate it in mid-April to welcome their New Year."',
        highlights: ['When do Thai people celebrate', 'Why do they throw water', 'Because it washes away bad luck'],
        explanationFriendly: 'Từ để hỏi: What (cái gì), Where (ở đâu), When (khi nào), Who (ai), Why (tại sao - trả lời bằng Because), How (như thế nào). Đảo trợ động từ (Do/Does/Did/Will/Is/Are) lên trước chủ ngữ.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Wh-word + Auxiliary (do/does/did) + Subject + Verb-inf...? Yes/No: Auxiliary + Subject + Verb-inf...?',
        formulaItems: [
          { label: 'Hỏi lý do', structure: 'Why + auxiliary + S + V...?', example: 'Why do people throw tomatoes at La Tomatina?' },
          { label: 'Hỏi thời gian', structure: 'When + auxiliary + S + V...?', example: 'When does the festival take place?' },
          { label: 'Hỏi cách thức', structure: 'How + auxiliary + S + V...?', example: 'How do they prepare for Tet?' },
        ],
      },
      step3Exercises: [
        {
          id: 'g7-u9-ex1',
          level: 'nhan-biet',
          question: '_______ do people celebrate Halloween? - On the 31st of October.',
          options: ['When', 'Where', 'Why'],
          correctIndex: 0,
          explanationVi: 'Câu trả lời chỉ ngày tháng (31st of October) nên từ để hỏi là "When".',
        },
      ],
    },
    sentencePattern: {
      id: 'g7-u9-sp',
      frame: 'During [festival], people usually [tradition] because they believe [meaning].',
      slots: [
        { slotName: 'festival', options: ['the Water Festival (Songkran)', 'La Tomatina in Spain', 'the Mid-Autumn Festival', 'Thanksgiving'] },
        { slotName: 'tradition', options: ['splash water on each other', 'gather for family mooncake feast', 'wear colorful folk costumes'] },
        { slotName: 'meaning', options: ['it washes away misfortune and cleanses the soul', 'it celebrates family reunion and good harvest', 'it brings peace and happiness'] },
      ],
      contextVi: 'Giao lưu văn hóa lễ hội quốc tế.',
      sampleDialogue: {
        speakerA: 'Have you ever heard of the Spanish tomato festival?',
        lineA: 'What happens there?',
        speakerB: 'Yes, it is La Tomatina! Thousands of people throw ripe tomatoes at each other just for fun.',
        lineB: 'The whole town square turns completely red for an hour!',
      },
      substitutionDrills: [
        { prompt: 'Hỏi lễ hội hoa Đà Lạt được tổ chức khi nào và ở đâu:', expectedPattern: 'When and where is the Da Lat Flower Festival held?', cueWords: ['When and where', 'Da Lat Flower Festival'] },
      ],
    },
    realLife: [
      {
        id: 'g7-u9-rl',
        title: 'Đêm hội Trăng rằm gắn kết tình làng nghĩa xóm',
        roleA: 'Trưởng thôn',
        roleB: 'Các cháu thiếu nhi',
        exchanges: [
          { speaker: 'Bác trưởng thôn', lineEn: 'Welcome all children to our Mid-Autumn lantern procession and lion dance feast!', lineVi: 'Nhiệt liệt chào mừng các cháu thiếu nhi đến với đêm rước đèn phá cỗ và múa lân Trung thu!' },
          { speaker: 'Các cháu', lineEn: 'We are thrilled! The lion dance drums sound so festive and joyful.', lineVi: 'Chúng cháu vui mừng khôn xiết! Tiếng trống múa lân rộn rã tưng bừng khắp cả xóm làng.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g7-u9-q1',
        type: 'multiple-choice',
        question: 'Từ để hỏi nào dùng để hỏi về mục đích hoặc nguyên nhân?',
        options: ['Why', 'Whose', 'Which'],
        correctIndex: 0,
        explanation: '"Why" (tại sao) dùng để hỏi lý do/nguyên nhân.',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 10
  {
    id: 'unit-g7-u10',
    unitNumber: 10,
    title: 'Energy Sources for the Future',
    themeVi: 'Nguồn năng lượng tương lai & Phát triển bền vững',
    themeIcon: '⚡',
    grade: 7,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Năng lượng tái tạo (solar, wind, hydro, biogas) và không tái tạo (coal, oil, natural gas). Tác động môi trường (carbon footprint, pollution). Thì Tương lai tiếp diễn (Future Continuous: will be + V-ing).',
    vocabularies: [
      { id: 'g7-u10-w1', word: 'Renewable', ipa: '/rɪˈnjuːəbl/', partOfSpeech: 'adjective', meaningVi: 'Có thể tái tạo, không cạn kiệt (mặt trời, gió)', exampleEn: 'Wind and solar are clean renewable energy sources.', exampleVi: 'Năng lượng gió và mặt trời là các nguồn năng lượng sạch có thể tái tạo.', isCore: true, unitId: 'unit-g7-u10', grade: 7 },
      { id: 'g7-u10-w2', word: 'Fossil fuel', ipa: '/ˈfɒsl fjuːəl/', partOfSpeech: 'noun', meaningVi: 'Nhiên liệu hóa thạch (than đá, dầu mỏ)', exampleEn: 'Burning fossil fuels releases harmful carbon dioxide.', exampleVi: 'Đốt nhiên liệu hóa thạch thải ra khí CO2 độc hại.', isCore: true, unitId: 'unit-g7-u10', grade: 7 },
      { id: 'g7-u10-w3', word: 'Wind turbine', ipa: '/wɪnd ˈtɜːbaɪn/', partOfSpeech: 'noun', meaningVi: 'Tua-bin gió phát điện', exampleEn: 'Giant wind turbines are installed along the windy coast.', exampleVi: 'Những tua-bin gió khổng lồ được lắp đặt dọc bờ biển lộng gió.', isCore: true, unitId: 'unit-g7-u10', grade: 7 },
      { id: 'g7-u10-w4', word: 'Conserve', ipa: '/kənˈsɜːv/', partOfSpeech: 'verb', meaningVi: 'Tiết kiệm, bảo tồn nguồn năng lượng', exampleEn: 'Turn off lights when leaving the room to conserve power.', exampleVi: 'Tắt đèn khi ra khỏi phòng để tiết kiệm điện năng.', isCore: true, unitId: 'unit-g7-u10', grade: 7 },
    ],
    grammar: {
      id: 'g7-u10-gram',
      title: 'Thì Tương lai tiếp diễn (The Future Continuous: WILL BE + V-ing)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Scientist: "By this time next decade, millions of homes will be using clean solar power panels."',
        highlights: ['will be using', 'clean solar power'],
        explanationFriendly: 'Diễn tả một hành động ĐANG DIỄN RA tại một thời điểm xác định trong tương lai: S + will be + V-ing (At 8 p.m. tomorrow, I will be studying).',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'S + will be + V-ing (Khẳng định) | S + won\'t be + V-ing (Phủ định) | Will + S + be + V-ing? (Nghi vấn).',
        formulaItems: [
          { label: 'Khẳng định', structure: 'S + will be + Verb-ING', example: 'At 10 a.m. tomorrow, we will be testing solar cars.' },
          { label: 'Phủ định', structure: 'S + will not (won\'t) be + Verb-ING', example: 'Cities won\'t be burning coal by 2050.' },
          { label: 'Nghi vấn', structure: 'Will + S + be + Verb-ING?', example: 'Will people be driving electric vehicles everywhere?' },
        ],
      },
      step3Exercises: [
        {
          id: 'g7-u10-ex1',
          level: 'nhan-biet',
          question: 'At this time next week, we _______ (install) solar panels on our school roof.',
          options: ['will be installing', 'installed', 'are installing'],
          correctIndex: 0,
          explanationVi: '"At this time next week" là thời điểm xác định trong tương lai, dùng thì Tương lai tiếp diễn: will be installing.',
        },
      ],
    },
    sentencePattern: {
      id: 'g7-u10-sp',
      frame: 'Instead of using [fossilFuel], we will be using [renewableSource] to [greenGoal].',
      slots: [
        { slotName: 'fossilFuel', options: ['coal-fired power stations', 'petrol-driven cars', 'polluting diesel generators'] },
        { slotName: 'renewableSource', options: ['solar roof tiles', 'offshore wind power', 'hydroelectric energy'] },
        { slotName: 'greenGoal', options: ['cut carbon emissions', 'protect our atmosphere', 'build sustainable smart cities'] },
      ],
      contextVi: 'Hội nghị khoa học trẻ về giải pháp giảm phát thải ròng.',
      sampleDialogue: {
        speakerA: 'What will happen if we run out of fossil fuels?',
        lineA: 'Should we be worried?',
        speakerB: 'We need to transition fast. In the future, we will be harnessing unlimited energy from the sun and sea winds.',
        lineB: 'It ensures a clean and thriving planet for our children.',
      },
      substitutionDrills: [
        { prompt: 'Nói vào năm 2030, chúng ta sẽ sử dụng năng lượng gió để tạo ra điện:', expectedPattern: 'In 2030, we will be using wind energy to generate electricity.', cueWords: ['will be using wind energy', 'generate electricity'] },
      ],
    },
    realLife: [
      {
        id: 'g7-u10-rl',
        title: 'Chiến dịch "Giờ Trái Đất - Tắt đèn thắp sáng tương lai"',
        roleA: 'Đại sứ môi trường',
        roleB: 'Cộng đồng học sinh',
        exchanges: [
          { speaker: 'Đại sứ', lineEn: 'Turn off all non-essential electric lights for one hour tonight to show commitment to Earth.', lineVi: 'Hãy tắt toàn bộ đèn điện không cần thiết trong 1 giờ tối nay để thể hiện cam kết vì Trái Đất.' },
          { speaker: 'Học sinh', lineEn: 'We will join wholeheartedly! Saving energy is our daily civic duty.', lineVi: 'Chúng em hưởng ứng nhiệt liệt! Tiết kiệm năng lượng là bổn phận công dân mỗi ngày của chúng em.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g7-u10-q1',
        type: 'multiple-choice',
        question: 'Nguồn năng lượng nào sau đây KHÔNG THỂ tái tạo (Non-renewable)?',
        options: ['Coal (Than đá)', 'Solar (Mặt trời)', 'Wind (Gió)'],
        correctIndex: 0,
        explanation: 'Than đá (Coal) là nhiên liệu hóa thạch hữu hạn, không thể tái tạo.',
        competencyLevel: 'nhan-biet',
      },
    ],
  },
];
