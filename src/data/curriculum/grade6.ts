import { UnitData } from '../../types';

export const GRADE_6_UNITS: UnitData[] = [
  // Unit 1
  {
    id: 'unit-g6-u1',
    unitNumber: 1,
    title: 'My New School',
    themeVi: 'Ngôi trường cấp hai mới & Thì Hiện tại đơn',
    themeIcon: '🏫',
    grade: 6,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Bước vào lớp 6 với môi trường mới, bạn bè mới. Thì Hiện tại đơn (Present Simple) với động từ to be và động từ thường, trạng từ chỉ tần suất.',
    vocabularies: [
      { id: 'g6-u1-w1', word: 'Secondary school', ipa: '/ˈsekəndri skuːl/', partOfSpeech: 'noun', meaningVi: 'Trường trung học cơ sở (Cấp 2)', exampleEn: 'I am a grade 6 student at Quang Trung Secondary School.', exampleVi: 'Tớ là học sinh lớp 6 trường THCS Quang Trung.', isCore: true, unitId: 'unit-g6-u1', grade: 6 },
      { id: 'g6-u1-w2', word: 'Compass', ipa: '/ˈkʌmpəs/', partOfSpeech: 'noun', meaningVi: 'Com-pa (dụng cụ vẽ đường tròn)', exampleEn: 'Do you have a compass for geometry class?', exampleVi: 'Cậu có com-pa cho tiết học hình học không?', isCore: true, unitId: 'unit-g6-u1', grade: 6 },
      { id: 'g6-u1-w3', word: 'Calculator', ipa: '/ˈkælkjuleɪtər/', partOfSpeech: 'noun', meaningVi: 'Máy tính cầm tay', exampleEn: 'We use a calculator in Maths.', exampleVi: 'Chúng tớ dùng máy tính cầm tay trong môn Toán.', isCore: true, unitId: 'unit-g6-u1', grade: 6 },
      { id: 'g6-u1-w4', word: 'Uniform', ipa: '/ˈjuːnɪfɔːm/', partOfSpeech: 'noun', meaningVi: 'Đồng phục học sinh', exampleEn: 'Students wear smart uniforms on Mondays.', exampleVi: 'Học sinh mặc đồng phục chỉnh tề vào sáng Thứ Hai.', isCore: true, unitId: 'unit-g6-u1', grade: 6 },
    ],
    grammar: {
      id: 'g6-u1-gram',
      title: 'Thì Hiện tại đơn (The Present Simple Tense) toàn diện',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Vy: "Do you wear uniforms every day, Duy?" - Duy: "Yes, I do. Our school starts at 7:15 and finishes at 11:30."',
        highlights: ['Do you wear', 'starts at', 'finishes at'],
        explanationFriendly: 'Diễn tả chân lý, sự thật hiển nhiên hoặc thói quen lặp đi lặp lại. Chú ý: Với He/She/It danh từ số ít, động từ thêm -s hoặc -es (o, s, x, ch, sh).',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Khẳng định: S + V(s/es) | Phủ định: S + do/does not + V-inf | Nghi vấn: Do/Does + S + V-inf?',
        formulaItems: [
          { label: 'Ngôi I/You/We/They', structure: 'S + V-inf', example: 'They walk to school.' },
          { label: 'Ngôi He/She/It', structure: 'S + V-(s/es)', example: 'She studies hard.' },
          { label: 'Phủ định số ít', structure: 'He/She + does not (doesn\'t) + V-inf', example: 'He doesn\'t like coffee.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g6-u1-ex1',
          level: 'nhan-biet',
          question: 'My brother _______ (watch) TV after doing his homework.',
          options: ['watches', 'watch', 'watchs'],
          correctIndex: 0,
          explanationVi: 'Động từ tận cùng là "ch" đi với ngôi "My brother" (he) thêm -es: watches.',
        },
      ],
    },
    sentencePattern: {
      id: 'g6-u1-sp',
      frame: 'I [frequency] [action] at my new school because [reason].',
      slots: [
        { slotName: 'frequency', options: ['always', 'usually', 'often'] },
        { slotName: 'action', options: ['join the English club', 'study in the science lab', 'borrow books from the library'] },
        { slotName: 'reason', options: ['it is very helpful', 'the teachers are friendly', 'I love learning new things'] },
      ],
      contextVi: 'Giới thiệu về trường THCS và phương pháp tự học cấp 2.',
      sampleDialogue: {
        speakerA: 'How do you feel about your first week at secondary school?',
        lineA: 'Are there many new subjects?',
        speakerB: 'Yes, we have Physics and History now.',
        lineB: 'It is challenging, but I find it fascinating!',
      },
      substitutionDrills: [
        { prompt: 'Nói trường học của chúng tôi có một phòng thí nghiệm lớn:', expectedPattern: 'Our school has a large modern laboratory.', cueWords: ['school has', 'large modern laboratory'] },
      ],
    },
    realLife: [
      {
        id: 'g6-u1-rl',
        title: 'Làm quen với các bạn mới trong ngày đầu nhập học THCS',
        roleA: 'Học sinh mới',
        roleB: 'Lớp trưởng khối 6',
        exchanges: [
          { speaker: 'Học sinh', lineEn: 'Hello! I am Minh from Class 6A. Nice to meet you!', lineVi: 'Chào bạn! Mình là Minh học lớp 6A. Rất vui được làm quen với bạn!' },
          { speaker: 'Lớp trưởng', lineEn: 'Welcome to our school, Minh! Let me show you around the campus.', lineVi: 'Chào mừng bạn đến với trường nhé Minh! Để mình dẫn bạn đi tham quan khuôn viên trường.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g6-u1-q1',
        type: 'multiple-choice',
        question: 'Chọn câu phủ định đúng trong thì Hiện tại đơn:',
        options: ['She doesn\'t like fast food.', 'She don\'t like fast food.', 'She not likes fast food.'],
        correctIndex: 0,
        explanation: 'Ngôi "She" dùng trợ động từ "does not" (doesn\'t) + V nguyên thể.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 2
  {
    id: 'unit-g6-u2',
    unitNumber: 2,
    title: 'My House & Furniture',
    themeVi: 'Ngôi nhà & Giới từ chỉ vị trí',
    themeIcon: '🛋️',
    grade: 6,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Các phòng và đồ dùng nội thất (hall, attic, wardrobe, chest of drawers). Giới từ chỉ vị trí (in, on, behind, in front of, between, next to) và cấu trúc There is / There are.',
    vocabularies: [
      { id: 'g6-u2-w1', word: 'Attic', ipa: '/ˈætɪk/', partOfSpeech: 'noun', meaningVi: 'Gác xép, tầng áp mái', exampleEn: 'We store old books in the attic.', exampleVi: 'Chúng tớ cất những cuốn sách cũ trên gác xép.', isCore: true, unitId: 'unit-g6-u2', grade: 6 },
      { id: 'g6-u2-w2', word: 'Wardrobe', ipa: '/ˈwɔːdrəʊb/', partOfSpeech: 'noun', meaningVi: 'Tủ đựng quần áo', exampleEn: 'Hang your coat in the wardrobe, please.', exampleVi: 'Xin vui lòng treo áo khoác của bạn vào tủ quần áo.', isCore: true, unitId: 'unit-g6-u2', grade: 6 },
      { id: 'g6-u2-w3', word: 'Microwave', ipa: '/ˈmaɪkrəweɪv/', partOfSpeech: 'noun', meaningVi: 'Lò vi sóng', exampleEn: 'The microwave is next to the fridge.', exampleVi: 'Lò vi sóng đặt ở bên cạnh tủ lạnh.', isCore: true, unitId: 'unit-g6-u2', grade: 6 },
      { id: 'g6-u2-w4', word: 'Behind', ipa: '/bɪˈhaɪnd/', partOfSpeech: 'preposition', meaningVi: 'Ở phía sau', exampleEn: 'There is a small green garden behind my house.', exampleVi: 'Có một khu vườn xanh mát ở phía sau nhà tớ.', isCore: true, unitId: 'unit-g6-u2', grade: 6 },
    ],
    grammar: {
      id: 'g6-u2-gram',
      title: 'Cấu trúc There is / There are & Giới từ chỉ vị trí (Prepositions of Place)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Mi: "There is a sofa between the bookshelf and the window. There are three paintings on the wall."',
        highlights: ['There is a sofa', 'There are three paintings', 'between', 'next to'],
        explanationFriendly: '"There is" đi với danh từ số ít hoặc không đếm được. "There are" đi với danh từ số nhiều. Giới từ: in front of (phía trước), behind (phía sau), between... and... (ở giữa).',
      },
      step2VisualDiagram: {
        diagramType: 'cards',
        notesVi: 'There is + a/an + singular noun | There are + plural nouns.',
        formulaItems: [
          { label: 'Số ít', structure: 'There is a/an + N(sing) + Prep + Place.', example: 'There is a lamp on the desk.' },
          { label: 'Số nhiều', structure: 'There are + N(plur) + Prep + Place.', example: 'There are four chairs in the kitchen.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g6-u2-ex1',
          level: 'nhan-biet',
          question: 'There _______ a clock and two posters on the bedroom wall.',
          options: ['is', 'are', 'be'],
          correctIndex: 0,
          explanationVi: 'Quy tắc gần nhất: danh từ ngay sau "there" là số ít (a clock) nên dùng "is".',
        },
      ],
    },
    sentencePattern: {
      id: 'g6-u2-sp',
      frame: 'In my room, there is [singularItem] [preposition] [location].',
      slots: [
        { slotName: 'singularItem', options: ['a study desk', 'a comfortable bed', 'a soft rug'] },
        { slotName: 'preposition', options: ['next to', 'opposite', 'under', 'near'] },
        { slotName: 'location', options: ['the large window', 'the bookshelf', 'the door'] },
      ],
      contextVi: 'Miêu tả phòng ngủ mơ ước của bản thân.',
      sampleDialogue: {
        speakerA: 'What is your bedroom like?',
        lineA: 'Is it cozy?',
        speakerB: 'Yes, it is very bright. There is a wide study table next to the window.',
        lineB: 'I love reading books there every weekend.',
      },
      substitutionDrills: [
        { prompt: 'Nói có một chiếc ghế bành ở giữa bàn và tủ sách:', expectedPattern: 'There is an armchair between the desk and the bookshelf.', cueWords: ['armchair', 'between'] },
      ],
    },
    realLife: [
      {
        id: 'g6-u2-rl',
        title: 'Sắp xếp bàn học ngăn nắp và khoa học',
        roleA: 'Con',
        roleB: 'Mẹ kiểm tra',
        exchanges: [
          { speaker: 'Con', lineEn: 'Look, Mom! My books are on the shelf and pens are in the cup.', lineVi: 'Mẹ nhìn này! Sách của con đã ngay ngắn trên giá và bút ở trong ống đựng rồi ạ.' },
          { speaker: 'Mẹ', lineEn: 'Great job, darling! A tidy desk helps you study much better.', lineVi: 'Giỏi lắm con yêu! Bàn học gọn gàng sẽ giúp con học tập hiệu quả hơn nhiều.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g6-u2-q1',
        type: 'multiple-choice',
        question: 'Chọn giới từ đúng: "The cat is sleeping _______ the table."',
        options: ['under', 'between', 'during'],
        correctIndex: 0,
        explanation: 'Chú mèo đang ngủ dưới gầm bàn: under the table.',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 3
  {
    id: 'unit-g6-u3',
    unitNumber: 3,
    title: 'My Friends & Personalities',
    themeVi: 'Bạn bè & Tính cách con người',
    themeIcon: '🤝',
    grade: 6,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Tính từ miêu tả ngoại hình và tính cách (confident, creative, caring, active, hardworking, funny, curious). Thì Hiện tại tiếp diễn chỉ kế hoạch tương lai gần.',
    vocabularies: [
      { id: 'g6-u3-w1', word: 'Confident', ipa: '/ˈkɒnfɪdənt/', partOfSpeech: 'adjective', meaningVi: 'Tự tin, quyết đoán', exampleEn: 'She is confident when speaking in front of the crowd.', exampleVi: 'Bạn ấy rất tự tin khi phát biểu trước đám đông.', isCore: true, unitId: 'unit-g6-u3', grade: 6 },
      { id: 'g6-u3-w2', word: 'Creative', ipa: '/kriˈeɪtɪv/', partOfSpeech: 'adjective', meaningVi: 'Sáng tạo, nhiều ý tưởng mới lạ', exampleEn: 'Minh is a creative boy with lots of novel ideas.', exampleVi: 'Minh là một bạn trai giàu tính sáng tạo với nhiều ý tưởng mới.', isCore: true, unitId: 'unit-g6-u3', grade: 6 },
      { id: 'g6-u3-w3', word: 'Curious', ipa: '/ˈkjʊəriəs/', partOfSpeech: 'adjective', meaningVi: 'Ham học hỏi, tò mò khám phá', exampleEn: 'Children are curious about how machines work.', exampleVi: 'Trẻ em luôn tò mò muốn biết máy móc vận hành thế nào.', isCore: true, unitId: 'unit-g6-u3', grade: 6 },
      { id: 'g6-u3-w4', word: 'Reliable', ipa: '/rɪˈlaɪəbl/', partOfSpeech: 'adjective', meaningVi: 'Đáng tin cậy, có thể nương tựa', exampleEn: 'A true friend is always honest and reliable.', exampleVi: 'Một người bạn chân chính luôn chân thật và đáng tin cậy.', isCore: true, unitId: 'unit-g6-u3', grade: 6 },
    ],
    grammar: {
      id: 'g6-u3-gram',
      title: 'Tính từ miêu tả tính cách & Thì Hiện tại tiếp diễn cho tương lai gần',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Chau: "What is your best friend like?" - Mai: "She is kind and caring. We are having a picnic together this Saturday!"',
        highlights: ['What is your best friend like', 'caring', 'are having a picnic this Saturday'],
        explanationFriendly: 'Phân biệt: "What does he look like?" (ngoại hình) vs "What is he like?" (tính cách). Dùng thì Hiện tại tiếp diễn (be + V-ing) với mốc thời gian cụ thể (this Saturday, tonight) để chỉ một kế hoạch chắc chắn.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'What is S like? -> S + is/are + Adjective (confident, active, friendly).',
        formulaItems: [
          { label: 'Hỏi tính cách', structure: 'What is [name] like?', example: 'What is An like?' },
          { label: 'Hỏi ngoại hình', structure: 'What does [name] look like?', example: 'She has long black hair.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g6-u3-ex1',
          level: 'nhan-biet',
          question: 'A person who always comes up with new ideas is _______.',
          options: ['creative', 'shy', 'lazy'],
          correctIndex: 0,
          explanationVi: 'Người luôn có nhiều sáng kiến mới mẻ là người sáng tạo (creative).',
        },
      ],
    },
    sentencePattern: {
      id: 'g6-u3-sp',
      frame: 'My friend is very [trait] because [evidence].',
      slots: [
        { slotName: 'trait', options: ['caring', 'active', 'clever', 'patient'] },
        { slotName: 'evidence', options: ['she always helps others with problems', 'he plays three sports well', 'she never gets angry'] },
      ],
      contextVi: 'Viết đoạn văn ngắn giới thiệu bạn thân tri kỷ.',
      sampleDialogue: {
        speakerA: 'Who is your closest companion in class?',
        lineA: 'Tell me about their character.',
        speakerB: 'It\'s Linh. She is extremely hardworking and reliable.',
        lineB: 'She always encourages me when I face difficult exams.',
      },
      substitutionDrills: [
        { prompt: 'Nói bạn thân của em rất tốt bụng và luôn sẵn lòng giúp đỡ mọi người:', expectedPattern: 'My best friend is kind and always ready to help others.', cueWords: ['kind', 'ready to help others'] },
      ],
    },
    realLife: [
      {
        id: 'g6-u3-rl',
        title: 'Bầu chọn lớp trưởng mẫu mực và năng nổ',
        roleA: 'Giáo viên chủ nhiệm',
        roleB: 'Tập thể lớp',
        exchanges: [
          { speaker: 'Cô giáo', lineEn: 'Who would you like to nominate as our class monitor?', lineVi: 'Các em muốn đề cử bạn nào làm lớp trưởng của lớp chúng ta?' },
          { speaker: 'Học sinh', lineEn: 'We choose Hoang, teacher. He is fair, responsible and very active!', lineVi: 'Chúng em chọn Hoàng ạ cô. Bạn ấy công bằng, trách nhiệm và rất năng nổ!' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g6-u3-q1',
        type: 'multiple-choice',
        question: 'Từ nào mang nghĩa "thích thể thao, năng động"?',
        options: ['Active', 'Shy', 'Passive'],
        correctIndex: 0,
        explanation: '"Active" là năng động, tích cực.',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 4
  {
    id: 'unit-g6-u4',
    unitNumber: 4,
    title: 'My Neighbourhood & Comparatives',
    themeVi: 'Khu phố em sống & So sánh hơn của tính từ',
    themeIcon: '🏘️',
    grade: 6,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Khu phố (square, memorial, cathedral, railway station, pharmacy). So sánh hơn của tính từ ngắn (adj-er + than) và tính từ dài (more + adj + than).',
    vocabularies: [
      { id: 'g6-u4-w1', word: 'Neighbourhood', ipa: '/ˈneɪbəhʊd/', partOfSpeech: 'noun', meaningVi: 'Khu dân cư, xóm giềng', exampleEn: 'People in my neighbourhood are hospitable.', exampleVi: 'Bà con trong khu phố của tớ rất mến khách.', isCore: true, unitId: 'unit-g6-u4', grade: 6 },
      { id: 'g6-u4-w2', word: 'Narrow', ipa: '/ˈnærəʊ/', partOfSpeech: 'adjective', meaningVi: 'Chật hẹp, eo hẹp (con ngõ)', exampleEn: 'The old street is narrow and winding.', exampleVi: 'Con phố cổ chật hẹp và quanh co.', isCore: true, unitId: 'unit-g6-u4', grade: 6 },
      { id: 'g6-u4-w3', word: 'Peaceful', ipa: '/ˈpiːsfl/', partOfSpeech: 'adjective', meaningVi: 'Thanh bình, êm đềm', exampleEn: 'Living in the village is more peaceful than in the city.', exampleVi: 'Sống ở làng quê thanh bình hơn ở thành phố.', isCore: true, unitId: 'unit-g6-u4', grade: 6 },
      { id: 'g6-u4-w4', word: 'Convenient', ipa: '/kənˈviːniənt/', partOfSpeech: 'adjective', meaningVi: 'Tiện lợi, thuận tiện', exampleEn: 'Supermarkets make daily shopping more convenient.', exampleVi: 'Siêu thị giúp việc mua sắm hàng ngày thuận tiện hơn.', isCore: true, unitId: 'unit-g6-u4', grade: 6 },
    ],
    grammar: {
      id: 'g6-u4-gram',
      title: 'So sánh hơn của tính từ (Comparative Adjectives)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Vy: "Is your new house better than the old one?" - Duy: "Yes, it is bigger and quieter, but it is farther from school."',
        highlights: ['better than', 'bigger', 'quieter', 'farther from'],
        explanationFriendly: 'Tính từ ngắn (1 âm tiết): S + be + Adj-er + THAN + O (taller than, bigger than). Tính từ dài (2 âm tiết trở lên): S + be + MORE + Adj + THAN + O (more modern than). Bất quy tắc: good -> better, bad -> worse, far -> farther/further.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Short Adj: Adj + -er + than. Long Adj: more + Adj + than.',
        formulaItems: [
          { label: 'Tính từ ngắn', structure: 'S1 + be + Adj-er + than + S2', example: 'Hanoi is older than HCM City.' },
          { label: 'Tính từ dài', structure: 'S1 + be + more + Adj + than + S2', example: 'This laptop is more expensive than that one.' },
          { label: 'Bất quy tắc', structure: 'good -> better | bad -> worse', example: 'Health is better than wealth.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g6-u4-ex1',
          level: 'nhan-biet',
          question: 'The city center is _______ (noisy) than the countryside.',
          options: ['noisier', 'more noisy', 'noisiest'],
          correctIndex: 0,
          explanationVi: 'Tính từ 2 âm tiết tận cùng là "y" (noisy) đổi y thành i rồi thêm -er: noisier than.',
        },
      ],
    },
    sentencePattern: {
      id: 'g6-u4-sp',
      frame: '[Location A] is [comparative] than [Location B].',
      slots: [
        { slotName: 'comparative', options: ['quieter', 'more modern', 'cleaner', 'more peaceful', 'busier'] },
      ],
      contextVi: 'So sánh cuộc sống giữa thành thị và nông thôn.',
      sampleDialogue: {
        speakerA: 'Do you prefer living in an apartment or a house with a garden?',
        lineA: 'Which one is better?',
        speakerB: 'I prefer a house with a garden because it is much more peaceful than a flat.',
        lineB: 'And children have more space to play outdoors.',
      },
      substitutionDrills: [
        { prompt: 'Nói cuộc sống ở làng quê thanh bình hơn cuộc sống ở thành phố lớn:', expectedPattern: 'Life in the countryside is more peaceful than life in the big city.', cueWords: ['more peaceful than', 'big city'] },
      ],
    },
    realLife: [
      {
        id: 'g6-u4-rl',
        title: 'Chỉ đường cho du khách tìm đến di tích lịch sử',
        roleA: 'Người dân địa phương',
        roleB: 'Khách du lịch',
        exchanges: [
          { speaker: 'Du khách', lineEn: 'Excuse me, is the central cathedral far from here?', lineVi: 'Xin lỗi bạn, nhà thờ trung tâm có xa đây không?' },
          { speaker: 'Người dân', lineEn: 'No, it\'s just two blocks away. Go straight and turn left at the traffic light.', lineVi: 'Dạ không đâu, chỉ cách hai dãy nhà thôi. Bạn đi thẳng rồi rẽ trái ở cột đèn giao thông nhé.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g6-u4-q1',
        type: 'multiple-choice',
        question: 'Dạng so sánh hơn của tính từ "good" là:',
        options: ['better', 'gooder', 'more good'],
        correctIndex: 0,
        explanation: 'Good là tính từ bất quy tắc, chuyển thành "better than".',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 5
  {
    id: 'unit-g6-u5',
    unitNumber: 5,
    title: 'Natural Wonders & Superlatives',
    themeVi: 'Kỳ quan thiên nhiên & So sánh nhất',
    themeIcon: '🏔️',
    grade: 6,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Kỳ quan thiên nhiên (waterfall, rainforest, desert, mountain, cave). So sánh nhất (the + adj-est / the most + adj) và động từ khuyết thiếu MUST / MUSTN\'T (quy định bắt buộc).',
    vocabularies: [
      { id: 'g6-u5-w1', word: 'Wonder', ipa: '/ˈwʌndər/', partOfSpeech: 'noun', meaningVi: 'Kỳ quan, điều kỳ diệu', exampleEn: 'Son Doong is the largest natural cave wonder in the world.', exampleVi: 'Sơn Đoòng là kỳ quan hang động tự nhiên lớn nhất thế giới.', isCore: true, unitId: 'unit-g6-u5', grade: 6 },
      { id: 'g6-u5-w2', word: 'Waterfall', ipa: '/ˈwɔːtəfɔːl/', partOfSpeech: 'noun', meaningVi: 'Thác nước hùng vĩ', exampleEn: 'Ban Gioc is a breathtaking waterfall.', exampleVi: 'Bản Giốc là một thác nước đẹp đến ngỡ ngàng.', isCore: true, unitId: 'unit-g6-u5', grade: 6 },
      { id: 'g6-u5-w3', word: 'Desert', ipa: '/ˈdezət/', partOfSpeech: 'noun', meaningVi: 'Sa mạc cát khô cằn', exampleEn: 'The Sahara is the hottest desert on Earth.', exampleVi: 'Sahara là sa mạc nóng nhất trên Trái Đất.', isCore: true, unitId: 'unit-g6-u5', grade: 6 },
      { id: 'g6-u5-w4', word: 'Mustn\'t', ipa: '/ˈmʌsnt/', partOfSpeech: 'modal verb', meaningVi: 'Không được phép (cấm chỉ)', exampleEn: 'Visitors mustn\'t litter in the national park.', exampleVi: 'Du khách tuyệt đối không được xả rác trong vườn quốc gia.', isCore: true, unitId: 'unit-g6-u5', grade: 6 },
    ],
    grammar: {
      id: 'g6-u5-gram',
      title: 'So sánh nhất (Superlatives) & Động từ chỉ nghĩa vụ MUST / MUSTN\'T',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Tour guide: "Mount Fansipan is the highest mountain in Indochina. You must follow the guide and you mustn\'t pick rare flowers."',
        highlights: ['the highest mountain', 'must follow', 'mustn\'t pick'],
        explanationFriendly: 'So sánh nhất: the + tính từ ngắn-est (the highest) hoặc the most + tính từ dài (the most beautiful). MUST: bắt buộc phải làm. MUSTN\'T: cấm không được làm.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Short Adj: THE + Adj-est. Long Adj: THE MOST + Adj. Must = obligation, Mustn\'t = prohibition.',
        formulaItems: [
          { label: 'Tính từ ngắn', structure: 'The + Adj-est + in/of...', example: 'Mount Everest is the highest peak.' },
          { label: 'Tính từ dài', structure: 'The most + Adj + in/of...', example: 'Ha Long Bay is the most famous bay.' },
          { label: 'Cấm chỉ', structure: 'S + mustn\'t + V-inf', example: 'You mustn\'t touch the exhibits.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g6-u5-ex1',
          level: 'nhan-biet',
          question: 'Nile is the _______ (long) river in the world.',
          options: ['longest', 'longer', 'most long'],
          correctIndex: 0,
          explanationVi: 'So sánh nhất của tính từ ngắn "long" là "the longest".',
        },
      ],
    },
    sentencePattern: {
      id: 'g6-u5-sp',
      frame: '[Wonder] is the [superlative] [placeType] in [region]. You must [rule].',
      slots: [
        { slotName: 'superlative', options: ['highest', 'deepest', 'most famous', 'most spectacular'] },
        { slotName: 'rule', options: ['wear warm clothes', 'bring enough water', 'listen to the ranger'] },
      ],
      contextVi: 'Thuyết minh viên giới thiệu danh lam thắng cảnh Việt Nam.',
      sampleDialogue: {
        speakerA: 'Have you ever visited Son Doong Cave?',
        lineA: 'What makes it so famous?',
        speakerB: 'It is the largest natural cave on our planet!',
        lineB: 'It has its own river, jungle and climate inside.',
      },
      substitutionDrills: [
        { prompt: 'Nói Vịnh Hạ Long là vịnh biển đẹp nhất Việt Nam:', expectedPattern: 'Ha Long Bay is the most beautiful bay in Vietnam.', cueWords: ['the most beautiful', 'in Vietnam'] },
      ],
    },
    realLife: [
      {
        id: 'g6-u5-rl',
        title: 'Nội quy tham quan bảo vệ di sản thiên nhiên',
        roleA: 'Kiểm lâm viên',
        roleB: 'Đoàn học sinh dã ngoại',
        exchanges: [
          { speaker: 'Kiểm lâm', lineEn: 'Remember, you mustn\'t light campfires or leave plastic bottles behind.', lineVi: 'Các em nhớ nhé, tuyệt đối không được đốt lửa trại hay bỏ lại chai nhựa trong rừng.' },
          { speaker: 'Học sinh', lineEn: 'We promise to protect the green environment and wildlife!', lineVi: 'Chúng em xin hứa sẽ bảo vệ môi trường xanh và động vật hoang dã ạ!' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g6-u5-q1',
        type: 'multiple-choice',
        question: 'Chọn từ cấm chỉ: "You _______ run in the school corridors."',
        options: ['mustn\'t', 'should', 'can'],
        correctIndex: 0,
        explanation: 'Mustn\'t diễn tả lệnh cấm (không được chạy trong hành lang).',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 6 (Semester 2)
  {
    id: 'unit-g6-u6',
    unitNumber: 6,
    title: 'Our Tet Holiday & Traditions',
    themeVi: 'Tết cổ truyền & Lời khuyên Should/Shouldn\'t',
    themeIcon: '🧧',
    grade: 6,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Phong tục ngày Tết (peach blossoms, kumquat tree, lucky money, banh chung, family gathering). Lời khuyên Should / Shouldn\'t và lời chúc Tết.',
    vocabularies: [
      { id: 'g6-u6-w1', word: 'Lucky money', ipa: '/ˈlʌki ˈmʌni/', partOfSpeech: 'noun', meaningVi: 'Tiền lì xì mừng tuổi may mắn', exampleEn: 'Children receive lucky money in red envelopes.', exampleVi: 'Trẻ em được nhận tiền lì xì trong những phong bao đỏ.', isCore: true, unitId: 'unit-g6-u6', grade: 6 },
      { id: 'g6-u6-w2', word: 'Tradition', ipa: '/trəˈdɪʃn/', partOfSpeech: 'noun', meaningVi: 'Truyền thống, phong tục tập quán', exampleEn: 'Making banh chung is a sacred Tet tradition.', exampleVi: 'Gói bánh chưng là một nét truyền thống thiêng liêng ngày Tết.', isCore: true, unitId: 'unit-g6-u6', grade: 6 },
      { id: 'g6-u6-w3', word: 'Gathering', ipa: '/ˈɡæðərɪŋ/', partOfSpeech: 'noun', meaningVi: 'Buổi sum họp gia đình', exampleEn: 'Tet is a warm time for family gathering.', exampleVi: 'Tết là dịp ấm cúng để cả gia đình quây quần sum họp.', isCore: true, unitId: 'unit-g6-u6', grade: 6 },
      { id: 'g6-u6-w4', word: 'Should', ipa: '/ʃʊd/', partOfSpeech: 'modal verb', meaningVi: 'Nên (đưa ra lời khuyên tốt)', exampleEn: 'We should wish our grandparents good health.', exampleVi: 'Chúng ta nên chúc ông bà sống lâu dồi dào sức khỏe.', isCore: true, unitId: 'unit-g6-u6', grade: 6 },
    ],
    grammar: {
      id: 'g6-u6-gram',
      title: 'Động từ khuyết thiếu SHOULD / SHOULDN\'T (Lời khuyên & Lời khuyên không nên)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Grandmother: "Children should help decorate the house, and you shouldn\'t quarrel or shout during Tet."',
        highlights: ['should help', 'shouldn\'t quarrel'],
        explanationFriendly: 'SHOULD + V-inf: Bạn nên làm điều gì đó (lời khuyên hữu ích). SHOULDN\'T + V-inf: Bạn không nên làm điều đó. Khác với Must, Should mang tính khuyên bảo nhẹ nhàng.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'S + should + V-infinitive (Nên). S + should not (shouldn\'t) + V-infinitive (Không nên).',
        formulaItems: [
          { label: 'Khuyên nên', structure: 'You should + V-infinitive', example: 'You should eat lots of green vegetables.' },
          { label: 'Khuyên không nên', structure: 'You shouldn\'t + V-infinitive', example: 'You shouldn\'t stay up too late.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g6-u6-ex1',
          level: 'nhan-biet',
          question: 'We _______ keep our promises to friends.',
          options: ['should', 'shouldn\'t', 'doesn\'t'],
          correctIndex: 0,
          explanationVi: 'Chúng ta nên giữ lời hứa với bạn bè: should.',
        },
      ],
    },
    sentencePattern: {
      id: 'g6-u6-sp',
      frame: 'During Tet, we should [goodDeed] and we shouldn\'t [badHabit].',
      slots: [
        { slotName: 'goodDeed', options: ['clean our rooms', 'wear cheerful clothes', 'say polite words', 'visit relatives'] },
        { slotName: 'badHabit', options: ['break things', 'ask for lucky money', 'quarrel with siblings'] },
      ],
      contextVi: 'Chuẩn bị đón chào năm mới an khang thịnh vượng.',
      sampleDialogue: {
        speakerA: 'What customs do Vietnamese people follow during Tet?',
        lineA: 'Can you tell me?',
        speakerB: 'We clean our houses before Tet to sweep away bad luck.',
        lineB: 'On New Year\'s Eve, we gather together and eat warm banh chung.',
      },
      substitutionDrills: [
        { prompt: 'Nói bạn nên chúc người lớn tuổi sức khỏe và may mắn:', expectedPattern: 'You should wish the elderly health and good fortune.', cueWords: ['should wish', 'health and good fortune'] },
      ],
    },
    realLife: [
      {
        id: 'g6-u6-rl',
        title: 'Chúc Tết ông bà đầu xuân năm mới',
        roleA: 'Cháu ngoan',
        roleB: 'Ông bà',
        exchanges: [
          { speaker: 'Cháu', lineEn: 'We wish you longevity, joy and great health in the new year, grandpa and grandma!', lineVi: 'Chúng cháu kính chúc ông bà năm mới bách niên giai lão, an vui và dồi dào sức khỏe ạ!' },
          { speaker: 'Ông bà', lineEn: 'Thank you, our dear grandchildren! May you grow taller and study brilliantly.', lineVi: 'Cảm ơn các cháu ngoan! Chúc các cháu hay ăn chóng lớn và học hành giỏi giang nhé.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g6-u6-q1',
        type: 'multiple-choice',
        question: 'Chọn câu khuyên đúng ngữ pháp:',
        options: ['You shouldn\'t stay up late.', 'You shouldn\'t to stay up late.', 'You shouldn\'t staying up late.'],
        correctIndex: 0,
        explanation: 'Sau shouldn\'t là động từ nguyên mẫu không "to": stay up late.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 7
  {
    id: 'unit-g6-u7',
    unitNumber: 7,
    title: 'Television & Conjunctions',
    themeVi: 'Truyền hình & Liên từ nối câu',
    themeIcon: '📺',
    grade: 6,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Các chương trình truyền hình (game show, documentary, sitcom, animated film, news). Liên từ nối câu (and, but, although, because, so).',
    vocabularies: [
      { id: 'g6-u7-w1', word: 'Documentary', ipa: '/ˌdɒkjuˈmentri/', partOfSpeech: 'noun', meaningVi: 'Phim tài liệu khoa học/lịch sử', exampleEn: 'Discovery channel has interesting documentaries about wildlife.', exampleVi: 'Kênh Discovery có nhiều phim tài liệu thú vị về thiên nhiên hoang dã.', isCore: true, unitId: 'unit-g6-u7', grade: 6 },
      { id: 'g6-u7-w2', word: 'Educational', ipa: '/ˌedʒuˈkeɪʃənl/', partOfSpeech: 'adjective', meaningVi: 'Mang tính giáo dục bổ ích', exampleEn: 'Road to Mount Olympia is an educational game show.', exampleVi: 'Đường lên đỉnh Olympia là một gameshow mang tính giáo dục cao.', isCore: true, unitId: 'unit-g6-u7', grade: 6 },
      { id: 'g6-u7-w3', word: 'Channel', ipa: '/ˈtʃænl/', partOfSpeech: 'noun', meaningVi: 'Kênh truyền hình (VTV1, VTV7)', exampleEn: 'VTV7 is an excellent educational channel for students.', exampleVi: 'VTV7 là kênh truyền hình giáo dục tuyệt vời cho học sinh.', isCore: true, unitId: 'unit-g6-u7', grade: 6 },
      { id: 'g6-u7-w4', word: 'Although', ipa: '/ɔːlˈðəʊ/', partOfSpeech: 'conjunction', meaningVi: 'Mặc dù, dẫu cho (chỉ sự đối lập)', exampleEn: 'Although it rained heavily, we still went to the studio.', exampleVi: 'Mặc dù trời mưa to, chúng tớ vẫn đến trường quay đúng giờ.', isCore: true, unitId: 'unit-g6-u7', grade: 6 },
    ],
    grammar: {
      id: 'g6-u7-gram',
      title: 'Các liên từ nối thông dụng (AND, BUT, SO, BECAUSE, ALTHOUGH)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Phong: "I like watching sports shows because they are exciting, but my sister prefers cartoon films."',
        highlights: ['because', 'but', 'although'],
        explanationFriendly: 'AND (và - bổ sung), BUT (nhưng - tương phản), SO (vì thế - kết quả), BECAUSE (bởi vì - nguyên nhân), ALTHOUGH (mặc dù - nhượng bộ đối lập).',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Because + Nguyên nhân | So + Kết quả | Although + Mệnh đề tương phản | But + Mệnh đề đối lập.',
        formulaItems: [
          { label: 'Nguyên nhân', structure: 'Clause 1 + because + Clause 2', example: 'I stayed home because I felt ill.' },
          { label: 'Kết quả', structure: 'Clause 1, so + Clause 2', example: 'It was raining, so I took an umbrella.' },
          { label: 'Đối lập', structure: 'Although + Clause 1, Clause 2', example: 'Although he is young, he is very mature.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g6-u7-ex1',
          level: 'nhan-biet',
          question: 'He loves football, _______ he never misses any Premier League matches.',
          options: ['so', 'but', 'although'],
          correctIndex: 0,
          explanationVi: 'Chỉ kết quả: anh ấy mê bóng đá, "vì vậy" không bỏ lỡ trận nào (so).',
        },
      ],
    },
    sentencePattern: {
      id: 'g6-u7-sp',
      frame: 'I enjoy watching [program] because it is [adj], but [counterClause].',
      slots: [
        { slotName: 'program', options: ['documentaries', 'game shows', 'science programs', 'comedy series'] },
        { slotName: 'adj', options: ['educational', 'entertaining', 'informative', 'humorous'] },
        { slotName: 'counterClause', options: ['I only watch it on weekends', 'I don\'t watch more than an hour a day', 'my brother dislikes it'] },
      ],
      contextVi: 'Thảo luận thói quen xem ti vi lành mạnh và chọn lọc.',
      sampleDialogue: {
        speakerA: 'What kind of TV programmes do you watch regularly?',
        lineA: 'Do you like movies?',
        speakerB: 'I love wildlife documentaries because they widen my knowledge about nature.',
        lineB: 'Although they are long, they are always fascinating.',
      },
      substitutionDrills: [
        { prompt: 'Nói mặc dù bộ phim dài, nó rất thú vị:', expectedPattern: 'Although the film is long, it is very interesting.', cueWords: ['Although the film', 'very interesting'] },
      ],
    },
    realLife: [
      {
        id: 'g6-u7-rl',
        title: 'Giới hạn thời gian dùng màn hình bảo vệ mắt',
        roleA: 'Học sinh',
        roleB: 'Ý thức cá nhân',
        exchanges: [
          { speaker: 'Bé', lineEn: 'I have watched for 45 minutes. I should turn off the TV and exercise my eyes.', lineVi: 'Mình đã xem 45 phút rồi. Mình nên tắt tivi và tập thể dục cho mắt thư giãn.' },
          { speaker: 'Bạn', lineEn: 'Good habit! Looking into the distance helps prevent myopia.', lineVi: 'Thói quen tốt đấy! Nhìn ra xa sẽ giúp phòng ngừa cận thị hiệu quả.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g6-u7-q1',
        type: 'multiple-choice',
        question: 'Chọn liên từ thích hợp: "_______ it was cold, she went out without a jacket."',
        options: ['Although', 'Because', 'So'],
        correctIndex: 0,
        explanation: 'Mặc dù trời lạnh: Although it was cold.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 8
  {
    id: 'unit-g6-u8',
    unitNumber: 8,
    title: 'Sports and Games',
    themeVi: 'Thể dục thể thao & Thì Quá khứ đơn',
    themeIcon: '⚽',
    grade: 6,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Các môn thể thao và dụng cụ (racket, goggles, skateboard, karate, marathon). Thì Quá khứ đơn (Past Simple) với động từ có quy tắc (-ed) và bất quy tắc, câu mệnh lệnh (Imperatives).',
    vocabularies: [
      { id: 'g6-u8-w1', word: 'Goggles', ipa: '/ˈɡɒɡlz/', partOfSpeech: 'noun', meaningVi: 'Kính bơi bảo hộ mắt', exampleEn: 'Put on your swimming goggles before jumping into the pool.', exampleVi: 'Hãy đeo kính bơi trước khi nhảy xuống hồ bơi.', isCore: true, unitId: 'unit-g6-u8', grade: 6 },
      { id: 'g6-u8-w2', word: 'Champion', ipa: '/ˈtʃæmpiən/', partOfSpeech: 'noun', meaningVi: 'Nhà vô địch, quán quân', exampleEn: 'Our school football team became the regional champions.', exampleVi: 'Đội bóng đá trường mình đã trở thành nhà vô địch khu vực.', isCore: true, unitId: 'unit-g6-u8', grade: 6 },
      { id: 'g6-u8-w3', word: 'Marathon', ipa: '/ˈmærəθən/', partOfSpeech: 'noun', meaningVi: 'Cuộc thi chạy marathon đường dài', exampleEn: 'Thousands of runners joined the Hanoi Marathon.', exampleVi: 'Hàng ngàn vận động viên đã tham gia giải chạy marathon Hà Nội.', isCore: true, unitId: 'unit-g6-u8', grade: 6 },
      { id: 'g6-u8-w4', word: 'Compete', ipa: '/kəmˈpiːt/', partOfSpeech: 'verb', meaningVi: 'Cạnh tranh, thi đấu lành mạnh', exampleEn: 'They competed with high sportsmanship.', exampleVi: 'Họ đã thi đấu với tinh thần thể thao cao thượng.', isCore: true, unitId: 'unit-g6-u8', grade: 6 },
    ],
    grammar: {
      id: 'g6-u8-gram',
      title: 'Thì Quá khứ đơn (The Past Simple) toàn diện & Câu mệnh lệnh (Imperatives)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Duy: "Did you play basketball yesterday?" - Hai: "No, we won the table tennis tournament last Sunday. Pass the ball to me!"',
        highlights: ['Did you play', 'won the tournament', 'Pass the ball'],
        explanationFriendly: 'Quá khứ đơn: V-ed (played, scored) hoặc bất quy tắc (win -> won, run -> ran, swim -> swam). Câu mệnh lệnh: Động từ nguyên mẫu đứng đầu câu để yêu cầu/hướng dẫn (Pass the ball! Don\'t run!).',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Khẳng định: S + V2/ed. Phủ định: S + did not + V-inf. Mệnh lệnh: V-inf! / Don\'t + V-inf!',
        formulaItems: [
          { label: 'Khẳng định', structure: 'S + V-ed / V2', example: 'We played badminton yesterday.' },
          { label: 'Phủ định', structure: 'S + didn\'t + V-inf', example: 'They didn\'t score any goals.' },
          { label: 'Câu mệnh lệnh', structure: 'Verb-inf! / Don\'t + Verb-inf!', example: 'Wear your helmet!' },
        ],
      },
      step3Exercises: [
        {
          id: 'g6-u8-ex1',
          level: 'nhan-biet',
          question: 'Yesterday, our class _______ (win) the soccer match 2-1.',
          options: ['won', 'winned', 'wins'],
          correctIndex: 0,
          explanationVi: 'Động từ "win" biến đổi bất quy tắc trong quá khứ thành "won".',
        },
      ],
    },
    sentencePattern: {
      id: 'g6-u8-sp',
      frame: 'Last [pastTime], I played [sport] and [pastAchievement].',
      slots: [
        { slotName: 'sport', options: ['table tennis', 'basketball', 'chess', 'badminton'] },
        { slotName: 'pastAchievement', options: ['scored two goals', 'won the first prize', 'learned a great skill'] },
      ],
      contextVi: 'Chia sẻ chiến thắng tại đại hội thể dục thể thao trường.',
      sampleDialogue: {
        speakerA: 'Did you join the high jump contest yesterday, Nam?',
        lineA: 'How did you do?',
        speakerB: 'Yes, I did! I jumped 1.3 meters and won a silver medal.',
        lineB: 'It was my personal best record.',
      },
      substitutionDrills: [
        { prompt: 'Dùng câu mệnh lệnh: Hãy lắng nghe chỉ dẫn của trọng tài!', expectedPattern: 'Listen to the referee\'s instructions!', cueWords: ['Listen to', 'referee\'s instructions'] },
      ],
    },
    realLife: [
      {
        id: 'g6-u8-rl',
        title: 'Bắt tay hữu nghị sau trận đấu thể thao',
        roleA: 'Đội trưởng đội bạn',
        roleB: 'Đội trưởng đội nhà',
        exchanges: [
          { speaker: 'Đội bạn', lineEn: 'Good game! Your defense was really solid.', lineVi: 'Trận đấu tuyệt vời! Hàng phòng ngự của các bạn thật sự rất vững chắc.' },
          { speaker: 'Đội nhà', lineEn: 'Thank you! You played with great courage. Let\'s play together again soon.', lineVi: 'Cảm ơn bạn! Đội bạn đã thi đấu vô cùng quả cảm. Hẹn sớm gặp lại nhau nhé.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g6-u8-q1',
        type: 'multiple-choice',
        question: 'Dạng quá khứ của động từ "swim" là:',
        options: ['swam', 'swimmed', 'swum'],
        correctIndex: 0,
        explanation: 'Swim chuyển sang quá khứ đơn là "swam".',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 9
  {
    id: 'unit-g6-u9',
    unitNumber: 9,
    title: 'Cities of the World',
    themeVi: 'Các thành phố trên thế giới & Đại từ sở hữu',
    themeIcon: '🗼',
    grade: 6,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Các thành phố nổi tiếng (London, Paris, Tokyo, Sydney, New York). Tính từ sở hữu (my, your, his, her, their) và Đại từ sở hữu (mine, yours, his, hers, theirs) để tránh lặp từ.',
    vocabularies: [
      { id: 'g6-u9-w1', word: 'Landmark', ipa: '/ˈlændmɑːk/', partOfSpeech: 'noun', meaningVi: 'Công trình biểu tượng, thắng cảnh nổi bật', exampleEn: 'The Eiffel Tower is the famous landmark of Paris.', exampleVi: 'Tháp Eiffel là công trình biểu tượng trứ danh của Paris.', isCore: true, unitId: 'unit-g6-u9', grade: 6 },
      { id: 'g6-u9-w2', word: 'Capital', ipa: '/ˈkæpɪtl/', partOfSpeech: 'noun', meaningVi: 'Thủ đô của một quốc gia', exampleEn: 'Hanoi is the historic capital of Vietnam.', exampleVi: 'Hà Nội là thủ đô lịch sử ngàn năm văn hiến của Việt Nam.', isCore: true, unitId: 'unit-g6-u9', grade: 6 },
      { id: 'g6-u9-w3', word: 'Metropolis', ipa: '/məˈtrɒpəlɪs/', partOfSpeech: 'noun', meaningVi: 'Đại đô thị sầm uất', exampleEn: 'Tokyo is a vibrant and bustling modern metropolis.', exampleVi: 'Tokyo là một đại đô thị hiện đại đầy sôi động.', isCore: true, unitId: 'unit-g6-u9', grade: 6 },
      { id: 'g6-u9-w4', word: 'Yours', ipa: '/jɔːz/', partOfSpeech: 'pronoun', meaningVi: 'Của bạn (Đại từ sở hữu thay thế your + N)', exampleEn: 'This guide book is mine, and that one is yours.', exampleVi: 'Cuốn cẩm nang này là của tớ, còn cuốn kia là của cậu.', isCore: true, unitId: 'unit-g6-u9', grade: 6 },
    ],
    grammar: {
      id: 'g6-u9-gram',
      title: 'Đại từ sở hữu (Possessive Pronouns: mine, yours, his, hers, ours, theirs)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Tom: "Is this travel guide yours?" - Linh: "No, it is hers. Mine is in my backpack."',
        highlights: ['is this yours', 'it is hers', 'Mine is in my backpack'],
        explanationFriendly: 'Đại từ sở hữu đứng ĐỘC LẬP thay cho cả cụm (Tính từ sở hữu + Danh từ) để câu văn gọn gàng không bị lặp từ: my book = mine, your book = yours, her book = hers, our school = ours, their city = theirs.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'my -> mine | your -> yours | his -> his | her -> hers | our -> ours | their -> theirs.',
        formulaItems: [
          { label: 'Của tôi', structure: 'my + N = mine', example: 'This bag is mine.' },
          { label: 'Của bạn', structure: 'your + N = yours', example: 'Is this camera yours?' },
          { label: 'Của họ', structure: 'their + N = theirs', example: 'That house is theirs.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g6-u9-ex1',
          level: 'nhan-biet',
          question: 'This is not my passport. _______ (My passport) is blue.',
          options: ['Mine', 'My', 'Me'],
          correctIndex: 0,
          explanationVi: 'Đứng làm chủ ngữ thay cho "My passport" dùng đại từ sở hữu "Mine".',
        },
      ],
    },
    sentencePattern: {
      id: 'g6-u9-sp',
      frame: '[City] is famous for its [landmark]. Have you ever been to [City]?',
      slots: [
        { slotName: 'landmark', options: ['ancient temples and street food', 'Big Ben clock tower', 'Opera House by the harbour', 'high-speed bullet trains'] },
      ],
      contextVi: 'Giới thiệu các điểm đến du lịch mơ ước khắp 5 châu.',
      sampleDialogue: {
        speakerA: 'Which city in the world would you most love to visit?',
        lineA: 'Why do you choose it?',
        speakerB: 'I would love to visit London. I want to see Big Ben and ride on the red double-decker bus.',
        lineB: 'It looks so iconic in English books.',
      },
      substitutionDrills: [
        { prompt: 'Nói chiếc vali màu đỏ là của cô ấy, còn màu xanh là của tôi:', expectedPattern: 'The red suitcase is hers, and the blue one is mine.', cueWords: ['is hers', 'is mine'] },
      ],
    },
    realLife: [
      {
        id: 'g6-u9-rl',
        title: 'Trao đổi bưu thiếp từ các thành phố kết nghĩa',
        roleA: 'Học sinh Việt Nam',
        roleB: 'Bạn học sinh quốc tế',
        exchanges: [
          { speaker: 'Nam', lineEn: 'Here is a postcard of Sword Lake in Hanoi. Our city has thousand years of culture!', lineVi: 'Đây là bưu thiếp Hồ Gươm ở Hà Nội. Thành phố của chúng tớ có ngàn năm văn hiến!' },
          { speaker: 'Sophie', lineEn: 'It is so charming and tranquil. I will treasure your postcard!', lineVi: 'Trông thật quyến rũ và thanh bình. Tớ sẽ trân trọng bức thiếp này của bạn!' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g6-u9-q1',
        type: 'multiple-choice',
        question: 'Chọn đại từ sở hữu điền vào chỗ trống: "The bike belongs to him. It is _______."',
        options: ['his', 'him', 'he'],
        correctIndex: 0,
        explanation: 'Đại từ sở hữu của he/him là "his".',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 10
  {
    id: 'unit-g6-u10',
    unitNumber: 10,
    title: 'Our Houses in the Future',
    themeVi: 'Ngôi nhà tương lai & Năng lượng xanh',
    themeIcon: '🛸',
    grade: 6,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Nhà ở thông minh trong tương lai (solar-powered, smart appliances, robot helpers, ocean house, space station). Thì Tương lai đơn với WILL / WON\'T và câu điều kiện loại 1 sơ khởi.',
    vocabularies: [
      { id: 'g6-u10-w1', word: 'Solar energy', ipa: '/ˈsəʊlər ˈenədʒi/', partOfSpeech: 'noun', meaningVi: 'Năng lượng mặt trời (sạch & tái tạo)', exampleEn: 'Future houses will run on clean solar energy.', exampleVi: 'Các ngôi nhà tương lai sẽ chạy bằng năng lượng mặt trời sạch.', isCore: true, unitId: 'unit-g6-u10', grade: 6 },
      { id: 'g6-u10-w2', word: 'Smart appliance', ipa: '/smɑːt əˈplaɪəns/', partOfSpeech: 'noun', meaningVi: 'Thiết bị gia dụng thông minh', exampleEn: 'Smart appliances will automatically cook meals.', exampleVi: 'Các thiết bị gia dụng thông minh sẽ tự động chuẩn bị bữa ăn.', isCore: true, unitId: 'unit-g6-u10', grade: 6 },
      { id: 'g6-u10-w3', word: 'Eco-friendly', ipa: '/ˌiːkəʊ ˈfrendli/', partOfSpeech: 'adjective', meaningVi: 'Thân thiện với môi trường sinh thái', exampleEn: 'We will build eco-friendly homes from recycled materials.', exampleVi: 'Chúng ta sẽ xây dựng những ngôi nhà thân thiện sinh thái từ vật liệu tái chế.', isCore: true, unitId: 'unit-g6-u10', grade: 6 },
      { id: 'g6-u10-w4', word: 'Won\'t', ipa: '/wəʊnt/', partOfSpeech: 'modal verb', meaningVi: 'Sẽ không (will not viết tắt)', exampleEn: 'Houses in the future won\'t pollute the atmosphere.', exampleVi: 'Những ngôi nhà tương lai sẽ không làm ô nhiễm bầu khí quyển.', isCore: true, unitId: 'unit-g6-u10', grade: 6 },
    ],
    grammar: {
      id: 'g6-u10-gram',
      title: 'Thì Tương lai đơn (WILL / WON\'T) & Động từ chỉ năng lực MIGHT (Có thể xảy ra)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Architect: "In 2050, people will live in underwater cities. We might have robot guards and automatic flying cars."',
        highlights: ['will live', 'won\'t pollute', 'might have'],
        explanationFriendly: 'Dùng WILL (chắc chắn sẽ diễn ra theo dự đoán) hoặc WON\'T (chắc chắn không xảy ra). Dùng MIGHT khi một điều gì đó CÓ THỂ xảy ra nhưng chưa hoàn toàn chắc chắn (khoảng 50%).',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'S + will / won\'t + V-infinitive (Dự đoán tương lai). S + might + V-infinitive (Khả năng không chắc chắn).',
        formulaItems: [
          { label: 'Dự đoán tương lai', structure: 'S + will + V-inf', example: 'Robots will do all the heavy housework.' },
          { label: 'Phủ định', structure: 'S + will not (won\'t) + V-inf', example: 'We won\'t use fossil fuels.' },
          { label: 'Khả năng có thể', structure: 'S + might + V-inf', example: 'It might rain tomorrow.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g6-u10-ex1',
          level: 'nhan-biet',
          question: 'Future homes _______ generate their own electricity from wind and sun.',
          options: ['will', 'are', 'did'],
          correctIndex: 0,
          explanationVi: 'Nói về ngôi nhà tương lai (future homes) dùng "will".',
        },
      ],
    },
    sentencePattern: {
      id: 'g6-u10-sp',
      frame: 'In the future, my dream house will be [location] and it will have [smartFeature].',
      slots: [
        { slotName: 'smartFeature', options: ['a friendly robot helper', 'solar roof panels', 'a self-cleaning system', 'a virtual reality room'] },
      ],
      contextVi: 'Vẽ và thuyết trình mô hình kiến trúc xanh tương lai.',
      sampleDialogue: {
        speakerA: 'What will your future house look like?',
        lineA: 'Will it float on the sea?',
        speakerB: 'Yes, it will float peacefully on the ocean. It will generate electricity from sea waves!',
        lineB: 'Robots will do all cooking and gardening.',
      },
      substitutionDrills: [
        { prompt: 'Nói chúng ta sẽ không lãng phí điện năng trong tương lai:', expectedPattern: 'We won\'t waste electricity in the future.', cueWords: ['won\'t waste', 'in the future'] },
      ],
    },
    realLife: [
      {
        id: 'g6-u10-rl',
        title: 'Thuyết trình dự án "Ngôi nhà thông minh vì hành tinh xanh"',
        roleA: 'Thuyết trình viên nhí',
        roleB: 'Hội đồng giám khảo',
        exchanges: [
          { speaker: 'Bé', lineEn: 'Our house will collect rainwater and recycle 100% of organic waste.', lineVi: 'Ngôi nhà của chúng em sẽ thu gom nước mưa và tái chế 100% rác hữu cơ.' },
          { speaker: 'Giám khảo', lineEn: 'A brilliant green innovation! You are true young environmental champions.', lineVi: 'Một sáng kiến xanh tuyệt vời! Các em đúng là những dũng sĩ môi trường nhỏ tuổi.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g6-u10-q1',
        type: 'multiple-choice',
        question: 'Dùng từ nào để diễn tả việc có thể xảy ra nhưng không hoàn toàn chắc chắn?',
        options: ['Might', 'Will', 'Must'],
        correctIndex: 0,
        explanation: '"Might" diễn tả khả năng có thể xảy ra nhưng chưa chắc chắn (50%).',
        competencyLevel: 'thong-hieu',
      },
    ],
  },
];
