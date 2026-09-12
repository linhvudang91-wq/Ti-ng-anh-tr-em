import { UnitData } from '../../types';

export const GRADE_3_UNITS: UnitData[] = [
  // Unit 1
  {
    id: 'unit-g3-u1',
    unitNumber: 1,
    title: 'Hello & Greetings',
    themeVi: 'Chào hỏi & Làm quen',
    themeIcon: '👋',
    grade: 3,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Làm quen với các cách chào hỏi thân mật và lịch sự, tự giới thiệu tên mình và hỏi thăm sức khỏe bạn bè.',
    vocabularies: [
      {
        id: 'g3-u1-w1',
        word: 'Hello',
        ipa: '/həˈləʊ/',
        partOfSpeech: 'interjection',
        meaningVi: 'Xin chào (thân thiện, lịch sự)',
        exampleEn: 'Hello, my name is Mai.',
        exampleVi: 'Xin chào, tên mình là Mai.',
        isCore: true,
        unitId: 'unit-g3-u1',
        grade: 3,
      },
      {
        id: 'g3-u1-w2',
        word: 'Friend',
        ipa: '/frend/',
        partOfSpeech: 'noun',
        meaningVi: 'Người bạn',
        exampleEn: 'This is my good friend, Nam.',
        exampleVi: 'Đây là người bạn tốt của mình, Nam.',
        isCore: true,
        unitId: 'unit-g3-u1',
        grade: 3,
      },
      {
        id: 'g3-u1-w3',
        word: 'Teacher',
        ipa: '/ˈtiːtʃər/',
        partOfSpeech: 'noun',
        meaningVi: 'Thầy / Cô giáo',
        exampleEn: 'Good morning, teacher!',
        exampleVi: 'Em chào cô buổi sáng ạ!',
        isCore: true,
        unitId: 'unit-g3-u1',
        grade: 3,
      },
      {
        id: 'g3-u1-w4',
        word: 'Goodbye',
        ipa: '/ˌɡʊdˈbaɪ/',
        partOfSpeech: 'interjection',
        meaningVi: 'Tạm biệt',
        exampleEn: 'Goodbye, see you tomorrow!',
        exampleVi: 'Tạm biệt, hẹn gặp lại bạn ngày mai nhé!',
        isCore: true,
        unitId: 'unit-g3-u1',
        grade: 3,
      },
    ],
    grammar: {
      id: 'g3-u1-gram',
      title: 'Đại từ nhân xưng I / You & Động từ To Be (am / are)',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Mai: "Hello, I am Mai." - Nam: "Hi Mai, I am Nam. Nice to meet you!"',
        highlights: ['I am', 'Nice to meet you'],
        explanationFriendly: 'Khi muốn tự giới thiệu tên mình, bé dùng mẫu câu "I am + [Tên của bé]" hoặc nói ngắn gọn là "I\'m + [Tên]".',
      },
      step2VisualDiagram: {
        diagramType: 'cards',
        notesVi: 'I đi với am (I am = I\'m). You đi với are (You are = You\'re).',
        formulaItems: [
          { label: 'Giới thiệu tên', structure: 'I am + [Tên]', example: 'I am Ben.' },
          { label: 'Hỏi thăm', structure: 'How are you? - I am fine, thank you.', example: 'How are you? - I\'m great!' },
        ],
      },
      step3Exercises: [
        {
          id: 'g3-u1-ex1',
          level: 'nhan-biet',
          question: 'Điền từ còn thiếu: "Hello, I _______ Mai."',
          options: ['am', 'is', 'are'],
          correctIndex: 0,
          explanationVi: 'Chủ ngữ "I" luôn đi với động từ to be "am".',
        },
        {
          id: 'g3-u1-ex2',
          level: 'thong-hieu',
          question: 'Bạn Peter hỏi: "How are you?" - Em trả lời thế nào?',
          options: ['I am fine, thank you.', 'I am nine years old.', 'My name is Peter.'],
          correctIndex: 0,
          explanationVi: 'Câu hỏi "How are you?" dùng để hỏi thăm sức khỏe, câu đáp là "I am fine, thank you."',
        },
      ],
    },
    sentencePattern: {
      id: 'g3-u1-sp',
      frame: 'Hello, I am [name]. Nice to meet you!',
      slots: [{ slotName: 'name', options: ['Mai', 'Nam', 'Peter', 'Mary', 'Linh'] }],
      contextVi: 'Giới thiệu bản thân trong ngày đầu tiên bước vào lớp học mới.',
      sampleDialogue: {
        speakerA: 'Hello! I am Nam.',
        lineA: 'Nice to meet you!',
        speakerB: 'Hi Nam! I am Mai.',
        lineB: 'Nice to meet you, too!',
      },
      substitutionDrills: [
        {
          prompt: 'Tự giới thiệu tên em là Linh và nói rất vui được làm quen:',
          expectedPattern: 'Hello, I am Linh. Nice to meet you!',
          cueWords: ['Hello', 'I am Linh', 'Nice to meet you'],
        },
      ],
    },
    realLife: [
      {
        id: 'g3-u1-rl',
        title: 'Làm quen bạn mới ở sân trường',
        roleA: 'Học sinh mới chuyển trường',
        roleB: 'Bạn lớp trưởng thân thiện',
        exchanges: [
          { speaker: 'Nam', lineEn: 'Hello, my name is Nam. What is your name?', lineVi: 'Xin chào, tên mình là Nam. Bạn tên là gì?' },
          { speaker: 'Mai', lineEn: 'Hi Nam, I am Mai. Welcome to our class!', lineVi: 'Chào Nam, mình là Mai. Chào mừng bạn đến lớp của chúng mình!' },
        ],
        culturalTip: 'Ở các nước nói tiếng Anh, khi làm quen người mới, mỉm cười và nói "Nice to meet you" thể hiện sự lịch sự và ấm áp.',
      },
    ],
    quizQuestions: [
      {
        id: 'g3-u1-q1',
        type: 'multiple-choice',
        question: 'Chọn câu chào buổi sáng chuẩn xác:',
        options: ['Good morning', 'Good night', 'Goodbye'],
        correctIndex: 0,
        explanation: '"Good morning" là lời chào vào buổi sáng.',
        competencyLevel: 'nhan-biet',
      },
      {
        id: 'g3-u1-q2',
        type: 'multiple-choice',
        question: 'Khi bạn nói "Nice to meet you", em đáp lại:',
        options: ['Nice to meet you, too', 'I am eight', 'Yes, it is'],
        correctIndex: 0,
        explanation: 'Thêm "too" (cũng vậy) vào cuối câu để đáp lại sự thân thiện của bạn.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 2
  {
    id: 'unit-g3-u2',
    unitNumber: 2,
    title: 'My Friends & Classroom',
    themeVi: 'Bạn bè & Lớp học',
    themeIcon: '🏫',
    grade: 3,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Giới thiệu bạn bè trong lớp học với cấu trúc This is / That is, thực hành hỏi "Is this / Is that...?"',
    vocabularies: [
      { id: 'g3-u2-w1', word: 'Classroom', ipa: '/ˈklɑːsruːm/', partOfSpeech: 'noun', meaningVi: 'Phòng học, lớp học', exampleEn: 'Our classroom is big and bright.', exampleVi: 'Lớp học của chúng mình to và sáng sủa.', isCore: true, unitId: 'unit-g3-u2', grade: 3 },
      { id: 'g3-u2-w2', word: 'Desk', ipa: '/desk/', partOfSpeech: 'noun', meaningVi: 'Bàn học sinh', exampleEn: 'Sit at your desk, please.', exampleVi: 'Xin mời các em ngồi vào bàn học.', isCore: true, unitId: 'unit-g3-u2', grade: 3 },
      { id: 'g3-u2-w3', word: 'Board', ipa: '/bɔːd/', partOfSpeech: 'noun', meaningVi: 'Bảng viết lớp học', exampleEn: 'Look at the board, class.', exampleVi: 'Cả lớp hãy nhìn lên bảng nhé.', isCore: true, unitId: 'unit-g3-u2', grade: 3 },
      { id: 'g3-u2-w4', word: 'Boy', ipa: '/bɔɪ/', partOfSpeech: 'noun', meaningVi: 'Cậu bé, bạn nam', exampleEn: 'That boy is my classmate.', exampleVi: 'Cậu bé kia là bạn cùng lớp của tớ.', isCore: true, unitId: 'unit-g3-u2', grade: 3 },
    ],
    grammar: {
      id: 'g3-u2-gram',
      title: 'Đại từ chỉ định This (đây là) & That (kia là)',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Mai: "This is Nam, my friend." - Linda: "And who is that?" - Mai: "That is Peter."',
        highlights: ['This is', 'That is'],
        explanationFriendly: 'Dùng "This is" khi bạn hoặc đồ vật ở gần em. Dùng "That is" khi bạn hoặc đồ vật ở xa em.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'This is + danh từ số ít (ở gần) | That is + danh từ số ít (ở xa)',
        formulaItems: [
          { label: 'Chỉ ở gần', structure: 'This is + [Tên / Danh từ]', example: 'This is my teacher.' },
          { label: 'Chỉ ở xa', structure: 'That is + [Tên / Danh từ]', example: 'That is my classroom.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g3-u2-ex1',
          level: 'nhan-biet',
          question: 'Chỉ bạn ở ngay cạnh mình, em nói: "_______ is my friend."',
          options: ['This', 'These', 'Those'],
          correctIndex: 0,
          explanationVi: '"This" dùng để chỉ người/vật ở gần.',
        },
      ],
    },
    sentencePattern: {
      id: 'g3-u2-sp',
      frame: 'This is [person], my friend.',
      slots: [{ slotName: 'person', options: ['Tony', 'Mary', 'Quan', 'Hoa'] }],
      contextVi: 'Giới thiệu bạn bè với thầy cô hoặc phụ huynh.',
      sampleDialogue: {
        speakerA: 'Mom, this is Quan.',
        lineA: 'He is my best friend.',
        speakerB: 'Hello Quan!',
        lineB: 'Nice to meet you, young boy.',
      },
      substitutionDrills: [
        { prompt: 'Giới thiệu bạn Hoa:', expectedPattern: 'This is Hoa, my friend.', cueWords: ['This is', 'Hoa', 'my friend'] },
      ],
    },
    realLife: [
      {
        id: 'g3-u2-rl',
        title: 'Giới thiệu bạn cùng bàn với cô giáo',
        roleA: 'Học sinh',
        roleB: 'Cô giáo chủ nhiệm',
        exchanges: [
          { speaker: 'Học sinh', lineEn: 'Teacher, this is Tony. He sits next to me.', lineVi: 'Thưa cô, đây là bạn Tony. Bạn ấy ngồi cạnh em ạ.' },
          { speaker: 'Cô giáo', lineEn: 'Welcome Tony! Please be good friends.', lineVi: 'Chào mừng Tony! Các em hãy giúp đỡ nhau học thật tốt nhé.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g3-u2-q1',
        type: 'multiple-choice',
        question: 'Để hỏi người ở đằng xa là ai, ta hỏi:',
        options: ['Who is that?', 'What is this?', 'Where is it?'],
        correctIndex: 0,
        explanation: '"Who is that?" nghĩa là "Người kia là ai?".',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 3
  {
    id: 'unit-g3-u3',
    unitNumber: 3,
    title: 'School Things & Supplies',
    themeVi: 'Đồ dùng học tập',
    themeIcon: '✏️',
    grade: 3,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Tên gọi các đồ dùng học tập quen thuộc (bút, thước kẻ, cặp sách, tẩy), cách hỏi "Is it a...?" và trả lời Yes, it is / No, it isn\'t.',
    vocabularies: [
      { id: 'g3-u3-w1', word: 'Pen', ipa: '/pen/', partOfSpeech: 'noun', meaningVi: 'Bút mực', exampleEn: 'I have a blue pen.', exampleVi: 'Tớ có một chiếc bút mực màu xanh.', isCore: true, unitId: 'unit-g3-u3', grade: 3 },
      { id: 'g3-u3-w2', word: 'Pencil', ipa: '/ˈpensəl/', partOfSpeech: 'noun', meaningVi: 'Bút chì', exampleEn: 'This pencil is sharp.', exampleVi: 'Chiếc bút chì này rất nhọn.', isCore: true, unitId: 'unit-g3-u3', grade: 3 },
      { id: 'g3-u3-w3', word: 'Ruler', ipa: '/ˈruːlər/', partOfSpeech: 'noun', meaningVi: 'Thước kẻ', exampleEn: 'Can I borrow your ruler?', exampleVi: 'Tớ có thể mượn thước kẻ của bạn được không?', isCore: true, unitId: 'unit-g3-u3', grade: 3 },
      { id: 'g3-u3-w4', word: 'School bag', ipa: '/ˈskuːl bæɡ/', partOfSpeech: 'noun', meaningVi: 'Cặp sách, ba lô đi học', exampleEn: 'My school bag is yellow.', exampleVi: 'Cặp sách của tớ màu vàng.', isCore: true, unitId: 'unit-g3-u3', grade: 3 },
    ],
    grammar: {
      id: 'g3-u3-gram',
      title: 'Mạo từ A / An & Câu hỏi nghi vấn Is this / Is that...?',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Tom: "Is this your ruler?" - Mai: "Yes, it is. Thank you!"',
        highlights: ['Is this your', 'Yes, it is'],
        explanationFriendly: 'Dùng "a" trước các từ bắt đầu bằng phụ âm (a pen, a book). Hỏi "Is it a...?" nếu đúng trả lời "Yes, it is", nếu không phải trả lời "No, it isn\'t".',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'A + phụ âm | An + nguyên âm (u, e, o, a, i)',
        formulaItems: [
          { label: 'Hỏi đồ vật', structure: 'Is this your + [đồ dùng]?', example: 'Is this your pencil?' },
          { label: 'Trả lời đúng', structure: 'Yes, it is.', example: 'Yes, it is.' },
          { label: 'Trả lời sai', structure: 'No, it isn\'t.', example: 'No, it isn\'t.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g3-u3-ex1',
          level: 'nhan-biet',
          question: 'Chọn mạo từ thích hợp: "I have _______ eraser."',
          options: ['an', 'a', 'the'],
          correctIndex: 0,
          explanationVi: '"Eraser" bắt đầu bằng nguyên âm "e" nên dùng "an".',
        },
      ],
    },
    sentencePattern: {
      id: 'g3-u3-sp',
      frame: 'Is this your [item]? - Yes, it is.',
      slots: [{ slotName: 'item', options: ['pen', 'ruler', 'book', 'notebook'] }],
      contextVi: 'Hỏi và nhận lại đồ dùng học tập để quên.',
      sampleDialogue: {
        speakerA: 'Is this your pencil, Mai?',
        lineA: 'I found it under the desk.',
        speakerB: 'Yes, it is!',
        lineB: 'Thank you very much.',
      },
      substitutionDrills: [
        { prompt: 'Hỏi thước kẻ này có phải của bạn không:', expectedPattern: 'Is this your ruler?', cueWords: ['Is this', 'your ruler'] },
      ],
    },
    realLife: [
      {
        id: 'g3-u3-rl',
        title: 'Mượn đồ dùng học tập trong giờ Mỹ thuật',
        roleA: 'Học sinh quên thước',
        roleB: 'Bạn tốt bụng',
        exchanges: [
          { speaker: 'Nam', lineEn: 'May I borrow your ruler, please?', lineVi: 'Bạn cho mình mượn thước kẻ một lát được không?' },
          { speaker: 'Hoa', lineEn: 'Here you are, Nam.', lineVi: 'Của bạn đây, Nam nhé.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g3-u3-q1',
        type: 'multiple-choice',
        question: 'Khi nhận được sự giúp đỡ của bạn, em nói:',
        options: ['Thank you', 'Goodbye', 'No, it isn\'t'],
        correctIndex: 0,
        explanation: 'Luôn nói "Thank you" (Cảm ơn bạn) khi mượn đồ hoặc được giúp đỡ.',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 4
  {
    id: 'unit-g3-u4',
    unitNumber: 4,
    title: 'Colors & Shapes',
    themeVi: 'Màu sắc & Hình khối',
    themeIcon: '🎨',
    grade: 3,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Học các màu sắc cơ bản (red, blue, green, yellow, pink, orange) và mẫu câu hỏi "What color is it? - It is..."',
    vocabularies: [
      { id: 'g3-u4-w1', word: 'Red', ipa: '/red/', partOfSpeech: 'adjective', meaningVi: 'Màu đỏ', exampleEn: 'The apple is red.', exampleVi: 'Quả táo màu đỏ.', isCore: true, unitId: 'unit-g3-u4', grade: 3 },
      { id: 'g3-u4-w2', word: 'Blue', ipa: '/bluː/', partOfSpeech: 'adjective', meaningVi: 'Màu xanh da trời', exampleEn: 'The sky is clear blue.', exampleVi: 'Bầu trời trong xanh.', isCore: true, unitId: 'unit-g3-u4', grade: 3 },
      { id: 'g3-u4-w3', word: 'Yellow', ipa: '/ˈjeləʊ/', partOfSpeech: 'adjective', meaningVi: 'Màu vàng', exampleEn: 'The sun is bright yellow.', exampleVi: 'Mặt trời tỏa ánh vàng rực rỡ.', isCore: true, unitId: 'unit-g3-u4', grade: 3 },
      { id: 'g3-u4-w4', word: 'Green', ipa: '/ɡriːn/', partOfSpeech: 'adjective', meaningVi: 'Màu xanh lá cây', exampleEn: 'The leaves are green.', exampleVi: 'Những chiếc lá màu xanh tươi.', isCore: true, unitId: 'unit-g3-u4', grade: 3 },
    ],
    grammar: {
      id: 'g3-u4-gram',
      title: 'Mẫu câu hỏi màu sắc What color is it / are they?',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Peter: "What color is your pencil case?" - Mary: "It is pink and purple."',
        highlights: ['What color is', 'It is'],
        explanationFriendly: 'Hỏi 1 đồ vật: "What color is it? - It is [color]". Hỏi nhiều đồ vật: "What color are they? - They are [color]".',
      },
      step2VisualDiagram: {
        diagramType: 'cards',
        notesVi: 'Số ít dùng Is it -> It is | Số nhiều dùng Are they -> They are',
        formulaItems: [
          { label: 'Hỏi 1 vật', structure: 'What color is + [danh từ số ít]?', example: 'What color is the pen?' },
          { label: 'Trả lời', structure: 'It is + [màu sắc].', example: 'It is red.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g3-u4-ex1',
          level: 'nhan-biet',
          question: 'What color is the sun? - It is _______.',
          options: ['yellow', 'black', 'purple'],
          correctIndex: 0,
          explanationVi: 'Mặt trời có màu vàng (yellow).',
        },
      ],
    },
    sentencePattern: {
      id: 'g3-u4-sp',
      frame: 'What color is your [item]? - It is [color].',
      slots: [
        { slotName: 'item', options: ['bag', 'hat', 'shirt', 'pencil'] },
        { slotName: 'color', options: ['blue', 'red', 'green', 'white'] },
      ],
      contextVi: 'Hỏi về màu sắc của đồ dùng cá nhân.',
      sampleDialogue: {
        speakerA: 'What color is your notebook, Mai?',
        lineA: 'Is it green?',
        speakerB: 'No, it isn\'t.',
        lineB: 'It is bright blue!',
      },
      substitutionDrills: [
        { prompt: 'Hỏi cặp sách màu gì và trả lời màu đỏ:', expectedPattern: 'What color is your bag? - It is red.', cueWords: ['What color', 'bag', 'red'] },
      ],
    },
    realLife: [
      {
        id: 'g3-u4-rl',
        title: 'Tô màu bức tranh cùng bạn',
        roleA: 'Bé vẽ tranh',
        roleB: 'Bạn chọn màu',
        exchanges: [
          { speaker: 'An', lineEn: 'What color is the tree trunk?', lineVi: 'Thân cây màu gì nhỉ bạn?' },
          { speaker: 'Bình', lineEn: 'It is brown, and the leaves are green.', lineVi: 'Thân cây màu nâu, và lá cây màu xanh lá nhé.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g3-u4-q1',
        type: 'multiple-choice',
        question: 'Từ nào chỉ màu "xanh da trời"?',
        options: ['Blue', 'Red', 'Black'],
        correctIndex: 0,
        explanation: '"Blue" là màu xanh da trời.',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 5
  {
    id: 'unit-g3-u5',
    unitNumber: 5,
    title: 'Numbers & Age',
    themeVi: 'Số đếm & Tuổi tác',
    themeIcon: '🔢',
    grade: 3,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Học số đếm từ 1 đến 10 (one to ten), cấu trúc hỏi tuổi "How old are you? - I am eight years old."',
    vocabularies: [
      { id: 'g3-u5-w1', word: 'One', ipa: '/wʌn/', partOfSpeech: 'number', meaningVi: 'Số 1', exampleEn: 'I have one sister.', exampleVi: 'Tớ có một người chị gái.', isCore: true, unitId: 'unit-g3-u5', grade: 3 },
      { id: 'g3-u5-w2', word: 'Five', ipa: '/faɪv/', partOfSpeech: 'number', meaningVi: 'Số 5', exampleEn: 'There are five books on the table.', exampleVi: 'Có năm quyển sách trên bàn.', isCore: true, unitId: 'unit-g3-u5', grade: 3 },
      { id: 'g3-u5-w3', word: 'Eight', ipa: '/eɪt/', partOfSpeech: 'number', meaningVi: 'Số 8 (Tuổi học sinh lớp 3)', exampleEn: 'I am eight years old.', exampleVi: 'Em tám tuổi.', isCore: true, unitId: 'unit-g3-u5', grade: 3 },
      { id: 'g3-u5-w4', word: 'Ten', ipa: '/ten/', partOfSpeech: 'number', meaningVi: 'Số 10', exampleEn: 'I got ten marks in English test!', exampleVi: 'Tớ được điểm 10 môn Tiếng Anh!', isCore: true, unitId: 'unit-g3-u5', grade: 3 },
    ],
    grammar: {
      id: 'g3-u5-gram',
      title: 'Mẫu câu hỏi tuổi How old are you? & Số đếm',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Teacher: "How old are you, Tony?" - Tony: "I am eight years old, teacher."',
        highlights: ['How old are you', 'years old'],
        explanationFriendly: 'Phân biệt: "How are you?" là hỏi thăm sức khỏe, còn "How OLD are you?" là hỏi bao nhiêu tuổi.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'How old are you? -> I am + [số tuổi] + years old.',
        formulaItems: [
          { label: 'Hỏi tuổi bạn', structure: 'How old are you?', example: 'How old are you?' },
          { label: 'Trả lời tuổi', structure: 'I am + [số] + years old.', example: 'I am eight years old.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g3-u5-ex1',
          level: 'nhan-biet',
          question: 'Học sinh lớp 3 thường trả lời tuổi của mình: "I am _______ years old."',
          options: ['eight', 'eighteen', 'eighty'],
          correctIndex: 0,
          explanationVi: 'Lớp 3 thường 8 tuổi: eight.',
        },
      ],
    },
    sentencePattern: {
      id: 'g3-u5-sp',
      frame: 'How old are you? - I am [number] years old.',
      slots: [{ slotName: 'number', options: ['seven', 'eight', 'nine'] }],
      contextVi: 'Ghi danh thông tin trong câu lạc bộ tiếng Anh.',
      sampleDialogue: {
        speakerA: 'What is your name and how old are you?',
        lineA: 'Please tell me.',
        speakerB: 'My name is Minh.',
        lineB: 'I am eight years old.',
      },
      substitutionDrills: [
        { prompt: 'Hỏi tuổi bạn và trả lời 8 tuổi:', expectedPattern: 'How old are you? - I am eight years old.', cueWords: ['How old', 'eight years old'] },
      ],
    },
    realLife: [
      {
        id: 'g3-u5-rl',
        title: 'Thổi nến sinh nhật tròn 8 tuổi',
        roleA: 'Bạn sinh nhật',
        roleB: 'Bạn bè chúc mừng',
        exchanges: [
          { speaker: 'Nam', lineEn: 'Happy birthday, Mai! How old are you today?', lineVi: 'Chúc mừng sinh nhật Mai! Hôm nay bạn tròn mấy tuổi rồi?' },
          { speaker: 'Mai', lineEn: 'Thank you! I am eight years old today.', lineVi: 'Cảm ơn bạn! Hôm nay mình tròn 8 tuổi rồi đấy.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g3-u5-q1',
        type: 'multiple-choice',
        question: 'Câu hỏi nào dùng để hỏi tuổi?',
        options: ['How old are you?', 'How are you?', 'Who are you?'],
        correctIndex: 0,
        explanation: '"How old are you?" là câu hỏi tuổi chuẩn xác.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 6 (Semester 2)
  {
    id: 'unit-g3-u6',
    unitNumber: 6,
    title: 'My Family Members',
    themeVi: 'Gia đình yêu thương',
    themeIcon: '👨‍👩‍👧‍👦',
    grade: 3,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Từ vựng các thành viên gia đình (father, mother, brother, sister, grandfather, grandmother) và câu hỏi "Who is that? - That is my..."',
    vocabularies: [
      { id: 'g3-u6-w1', word: 'Father', ipa: '/ˈfɑːðər/', partOfSpeech: 'noun', meaningVi: 'Bố, cha (gọi thân mật: Dad)', exampleEn: 'My father is tall and kind.', exampleVi: 'Bố của tớ cao và tốt bụng.', isCore: true, unitId: 'unit-g3-u6', grade: 3 },
      { id: 'g3-u6-w2', word: 'Mother', ipa: '/ˈmʌðər/', partOfSpeech: 'noun', meaningVi: 'Mẹ (gọi thân mật: Mom)', exampleEn: 'My mother is a doctor.', exampleVi: 'Mẹ của tớ là bác sĩ.', isCore: true, unitId: 'unit-g3-u6', grade: 3 },
      { id: 'g3-u6-w3', word: 'Brother', ipa: '/ˈbrʌðər/', partOfSpeech: 'noun', meaningVi: 'Anh trai / Em trai', exampleEn: 'I play football with my brother.', exampleVi: 'Tớ đá bóng cùng anh trai.', isCore: true, unitId: 'unit-g3-u6', grade: 3 },
      { id: 'g3-u6-w4', word: 'Sister', ipa: '/ˈsɪstər/', partOfSpeech: 'noun', meaningVi: 'Chị gái / Em gái', exampleEn: 'My sister likes drawing pictures.', exampleVi: 'Chị gái tớ thích vẽ tranh.', isCore: true, unitId: 'unit-g3-u6', grade: 3 },
    ],
    grammar: {
      id: 'g3-u6-gram',
      title: 'Đại từ sở hữu My / Your & Cấu trúc Who is that?',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Linda: "Who is that man in the photo?" - Mai: "That is my father. He is very nice."',
        highlights: ['Who is that', 'my father'],
        explanationFriendly: 'Dùng từ để hỏi "Who" để hỏi về người ("Ai đó?"). Trả lời bằng "That is my + [người trong gia đình]".',
      },
      step2VisualDiagram: {
        diagramType: 'cards',
        notesVi: 'Who is this/that? -> He is my... (nam) / She is my... (nữ)',
        formulaItems: [
          { label: 'Hỏi người kia là ai', structure: 'Who is that?', example: 'Who is that?' },
          { label: 'Giới thiệu', structure: 'That is my + [father/mother]...', example: 'That is my brother.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g3-u6-ex1',
          level: 'nhan-biet',
          question: 'Để hỏi "Người đàn ông kia là ai?", em dùng từ để hỏi:',
          options: ['Who', 'What', 'Where'],
          correctIndex: 0,
          explanationVi: 'Hỏi về người dùng "Who".',
        },
      ],
    },
    sentencePattern: {
      id: 'g3-u6-sp',
      frame: 'Who is that? - That is my [relative].',
      slots: [{ slotName: 'relative', options: ['father', 'mother', 'brother', 'sister', 'grandmother'] }],
      contextVi: 'Xem album ảnh gia đình cùng bạn thân.',
      sampleDialogue: {
        speakerA: 'Who is that little girl, Mai?',
        lineA: 'She is so cute!',
        speakerB: 'That is my sister, Linh.',
        lineB: 'She is four years old.',
      },
      substitutionDrills: [
        { prompt: 'Giới thiệu đó là mẹ của em:', expectedPattern: 'That is my mother.', cueWords: ['That is', 'my mother'] },
      ],
    },
    realLife: [
      {
        id: 'g3-u6-rl',
        title: 'Mời bạn đến chơi nhà và giới thiệu gia đình',
        roleA: 'Chủ nhà nhí',
        roleB: 'Bạn khách',
        exchanges: [
          { speaker: 'Bảo', lineEn: 'Welcome to my home, Nam! This is my mother.', lineVi: 'Chào mừng bạn đến nhà mình chơi, Nam! Đây là mẹ của mình.' },
          { speaker: 'Nam', lineEn: 'Good afternoon, ma\'am! Nice to meet you.', lineVi: 'Cháu chào bác ạ! Cháu rất vui được gặp bác.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g3-u6-q1',
        type: 'multiple-choice',
        question: 'Từ nào mang nghĩa "Chị gái hoặc Em gái"?',
        options: ['Sister', 'Brother', 'Mother'],
        correctIndex: 0,
        explanation: '"Sister" là chị gái hoặc em gái.',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 7
  {
    id: 'unit-g3-u7',
    unitNumber: 7,
    title: 'Body Parts & Senses',
    themeVi: 'Các bộ phận cơ thể',
    themeIcon: '👀',
    grade: 3,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Tên các bộ phận trên cơ thể (head, eyes, ears, nose, mouth, hands) và câu mệnh lệnh hành động Touch your...',
    vocabularies: [
      { id: 'g3-u7-w1', word: 'Eye', ipa: '/aɪ/', partOfSpeech: 'noun', meaningVi: 'Mắt (số nhiều: eyes)', exampleEn: 'I have two bright eyes.', exampleVi: 'Em có đôi mắt sáng.', isCore: true, unitId: 'unit-g3-u7', grade: 3 },
      { id: 'g3-u7-w2', word: 'Ear', ipa: '/ɪər/', partOfSpeech: 'noun', meaningVi: 'Tai (số nhiều: ears)', exampleEn: 'Listen with your ears.', exampleVi: 'Hãy lắng nghe bằng đôi tai nhé.', isCore: true, unitId: 'unit-g3-u7', grade: 3 },
      { id: 'g3-u7-w3', word: 'Nose', ipa: '/nəʊz/', partOfSpeech: 'noun', meaningVi: 'Mũi', exampleEn: 'Touch your nose, please.', exampleVi: 'Xin mời chạm tay vào mũi nào.', isCore: true, unitId: 'unit-g3-u7', grade: 3 },
      { id: 'g3-u7-w4', word: 'Hand', ipa: '/hænd/', partOfSpeech: 'noun', meaningVi: 'Bàn tay (hands)', exampleEn: 'Wash your hands before eating.', exampleVi: 'Hãy rửa tay sạch trước khi ăn.', isCore: true, unitId: 'unit-g3-u7', grade: 3 },
    ],
    grammar: {
      id: 'g3-u7-gram',
      title: 'Câu mệnh lệnh nhẹ nhàng (Imperatives) & Danh từ số nhiều thêm -s',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Teacher: "Touch your hair! Open your mouth!" - Students follow the fun actions.',
        highlights: ['Touch your', 'Open your'],
        explanationFriendly: 'Câu mệnh lệnh bắt đầu trực tiếp bằng động từ hành động (Touch, Open, Close). Thêm -s khi có từ 2 bộ phận trở lên (two eyes, two ears).',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Động từ nguyên mẫu + tân ngữ (Touch your nose / Wash your hands)',
        formulaItems: [
          { label: 'Mệnh lệnh', structure: 'Touch your + [bộ phận]!', example: 'Touch your ears!' },
          { label: 'Số nhiều', structure: 'one eye -> two eyes', example: 'two hands' },
        ],
      },
      step3Exercises: [
        {
          id: 'g3-u7-ex1',
          level: 'nhan-biet',
          question: 'Em có 2 mắt, ta viết: "I have two _______."',
          options: ['eyes', 'eye', 'eyeses'],
          correctIndex: 0,
          explanationVi: 'Số nhiều của eye là thêm -s: eyes.',
        },
      ],
    },
    sentencePattern: {
      id: 'g3-u7-sp',
      frame: 'Touch your [bodyPart], please!',
      slots: [{ slotName: 'bodyPart', options: ['nose', 'eyes', 'ears', 'mouth', 'hair'] }],
      contextVi: 'Chơi trò chơi Simon Says trong lớp học tiếng Anh.',
      sampleDialogue: {
        speakerA: 'Simon says: Touch your ears!',
        lineA: 'Be quick!',
        speakerB: 'I am touching my ears!',
        lineB: 'Look at me, teacher!',
      },
      substitutionDrills: [
        { prompt: 'Yêu cầu bạn chạm vào mũi:', expectedPattern: 'Touch your nose, please!', cueWords: ['Touch', 'your nose'] },
      ],
    },
    realLife: [
      {
        id: 'g3-u7-rl',
        title: 'Rửa tay sạch giữ gìn vệ sinh trường học',
        roleA: 'Cán bộ y tế trường',
        roleB: 'Học sinh',
        exchanges: [
          { speaker: 'Y tế', lineEn: 'Always wash your hands with soap.', lineVi: 'Các em nhớ luôn rửa sạch tay bằng xà phòng nhé.' },
          { speaker: 'Mai', lineEn: 'Yes, teacher! Clean hands keep us healthy.', lineVi: 'Vâng ạ! Bàn tay sạch giúp chúng em khỏe mạnh.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g3-u7-q1',
        type: 'multiple-choice',
        question: 'Bộ phận nào dùng để nghe âm thanh?',
        options: ['Ears', 'Eyes', 'Nose'],
        correctIndex: 0,
        explanation: 'Tai (ears) dùng để nghe.',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 8
  {
    id: 'unit-g3-u8',
    unitNumber: 8,
    title: 'Toys & Games',
    themeVi: 'Đồ chơi & Trò chơi trẻ thơ',
    themeIcon: '🧸',
    grade: 3,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Tên các món đồ chơi thân thương (ball, doll, car, robot, teddy bear) và cấu trúc sở hữu "I have a... / Do you have a...?"',
    vocabularies: [
      { id: 'g3-u8-w1', word: 'Ball', ipa: '/bɔːl/', partOfSpeech: 'noun', meaningVi: 'Quả bóng', exampleEn: 'We kick the red ball.', exampleVi: 'Chúng tớ đá quả bóng màu đỏ.', isCore: true, unitId: 'unit-g3-u8', grade: 3 },
      { id: 'g3-u8-w2', word: 'Doll', ipa: '/dɒl/', partOfSpeech: 'noun', meaningVi: 'Búp bê', exampleEn: 'My sister has a pretty doll.', exampleVi: 'Em gái tớ có một cô búp bê rất xinh.', isCore: true, unitId: 'unit-g3-u8', grade: 3 },
      { id: 'g3-u8-w3', word: 'Car', ipa: '/kɑːr/', partOfSpeech: 'noun', meaningVi: 'Xe ô tô đồ chơi', exampleEn: 'This toy car runs fast.', exampleVi: 'Chiếc xe ô tô đồ chơi này chạy rất nhanh.', isCore: true, unitId: 'unit-g3-u8', grade: 3 },
      { id: 'g3-u8-w4', word: 'Robot', ipa: '/ˈrəʊbɒt/', partOfSpeech: 'noun', meaningVi: 'Người máy, rô-bốt đồ chơi', exampleEn: 'My robot can walk and sing.', exampleVi: 'Chú người máy của tớ biết đi và hát.', isCore: true, unitId: 'unit-g3-u8', grade: 3 },
    ],
    grammar: {
      id: 'g3-u8-gram',
      title: 'Động từ chỉ sở hữu Have & Câu hỏi Do you have a...?',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Nam: "Do you have a robot?" - Peter: "Yes, I do. It is big and blue."',
        highlights: ['Do you have', 'Yes, I do'],
        explanationFriendly: 'Nói mình có đồ chơi: "I have a + [đồ chơi]". Hỏi bạn có không: "Do you have a + [đồ chơi]?" (Đúng: Yes, I do / Không: No, I don\'t).',
      },
      step2VisualDiagram: {
        diagramType: 'cards',
        notesVi: 'I have a... | Do you have a...? -> Yes, I do / No, I don\'t.',
        formulaItems: [
          { label: 'Khẳng định', structure: 'I have a + [đồ chơi].', example: 'I have a teddy bear.' },
          { label: 'Hỏi bạn', structure: 'Do you have a + [đồ chơi]?', example: 'Do you have a car?' },
        ],
      },
      step3Exercises: [
        {
          id: 'g3-u8-ex1',
          level: 'nhan-biet',
          question: 'Điền vào chỗ trống: "Do you have a ball? - Yes, I _______."',
          options: ['do', 'have', 'am'],
          correctIndex: 0,
          explanationVi: 'Câu hỏi bắt đầu bằng "Do you..." thì câu trả lời là "Yes, I do."',
        },
      ],
    },
    sentencePattern: {
      id: 'g3-u8-sp',
      frame: 'I have a [toy]. Do you have a [toy]?',
      slots: [{ slotName: 'toy', options: ['car', 'doll', 'robot', 'puzzle', 'kite'] }],
      contextVi: 'Khoe đồ chơi yêu thích và rủ bạn cùng chơi.',
      sampleDialogue: {
        speakerA: 'Nam',
        lineA: 'I have a new robot. Do you have one?',
        speakerB: 'Peter',
        lineB: 'No, I don\'t. Can we play together?',
      },
      substitutionDrills: [
        { prompt: 'Nói em có một chú gấu bông:', expectedPattern: 'I have a teddy bear.', cueWords: ['I have', 'teddy bear'] },
      ],
    },
    realLife: [
      {
        id: 'g3-u8-rl',
        title: 'Chia sẻ đồ chơi cùng bạn ở góc sáng tạo',
        roleA: 'Bé có đồ chơi mới',
        roleB: 'Bạn cùng bàn',
        exchanges: [
          { speaker: 'Duy', lineEn: 'Look at my new toy car! Let\'s race.', lineVi: 'Nhìn chiếc ô tô đồ chơi mới của tớ này! Chúng mình cùng đua xe nhé.' },
          { speaker: 'Long', lineEn: 'Awesome! I will use my red truck.', lineVi: 'Tuyệt vời quá! Tớ sẽ dùng chiếc xe tải màu đỏ của tớ.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g3-u8-q1',
        type: 'multiple-choice',
        question: '"Do you have a doll?" - Trả lời khi không có:',
        options: ['No, I don\'t', 'Yes, I do', 'No, it isn\'t'],
        correctIndex: 0,
        explanation: 'Trả lời phủ định: "No, I don\'t."',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 9
  {
    id: 'unit-g3-u9',
    unitNumber: 9,
    title: 'Pets & Domestic Animals',
    themeVi: 'Thú cưng trong nhà',
    themeIcon: '🐶',
    grade: 3,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Tên các loài thú cưng quen thuộc (dog, cat, bird, fish, rabbit), hỏi bạn "Do you have any pets?" và miêu tả kích thước nhỏ nhắn đáng yêu.',
    vocabularies: [
      { id: 'g3-u9-w1', word: 'Dog', ipa: '/dɒɡ/', partOfSpeech: 'noun', meaningVi: 'Con chó', exampleEn: 'My dog is very friendly.', exampleVi: 'Chú chó của tớ rất thân thiện.', isCore: true, unitId: 'unit-g3-u9', grade: 3 },
      { id: 'g3-u9-w2', word: 'Cat', ipa: '/kæt/', partOfSpeech: 'noun', meaningVi: 'Con mèo', exampleEn: 'The cat sleeps on the mat.', exampleVi: 'Chú mèo ngủ say trên tấm thảm.', isCore: true, unitId: 'unit-g3-u9', grade: 3 },
      { id: 'g3-u9-w3', word: 'Fish', ipa: '/fɪʃ/', partOfSpeech: 'noun', meaningVi: 'Con cá cảnh', exampleEn: 'I have three goldfish.', exampleVi: 'Tớ có ba chú cá vàng.', isCore: true, unitId: 'unit-g3-u9', grade: 3 },
      { id: 'g3-u9-w4', word: 'Rabbit', ipa: '/ˈræbɪt/', partOfSpeech: 'noun', meaningVi: 'Con thỏ', exampleEn: 'The white rabbit eats carrots.', exampleVi: 'Chú thỏ trắng đang ăn cà rốt.', isCore: true, unitId: 'unit-g3-u9', grade: 3 },
    ],
    grammar: {
      id: 'g3-u9-gram',
      title: 'Cấu trúc Do you have any...? & Số lượng thú cưng',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Mary: "Do you have any pets?" - Mai: "Yes, I do. I have two cats and a dog."',
        highlights: ['any pets', 'two cats'],
        explanationFriendly: 'Dùng "any pets" trong câu hỏi để hỏi bạn có nuôi thú cưng nào không. Khi nói số lượng từ 2 con trở lên, nhớ thêm -s sau tên con vật.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Do you have any pets? -> Yes, I do. I have [number] [pet(s)].',
        formulaItems: [
          { label: 'Hỏi có thú cưng không', structure: 'Do you have any pets?', example: 'Do you have any pets?' },
          { label: 'Trả lời số lượng', structure: 'I have + [số lượng] + [con vật].', example: 'I have two birds.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g3-u9-ex1',
          level: 'nhan-biet',
          question: 'Điền từ: "I have three _______ (cat)."',
          options: ['cats', 'cat', 'cates'],
          correctIndex: 0,
          explanationVi: 'Ba con mèo là số nhiều: thêm -s thành "cats".',
        },
      ],
    },
    sentencePattern: {
      id: 'g3-u9-sp',
      frame: 'I have [number] [pet]. They are very [adjective].',
      slots: [
        { slotName: 'number', options: ['a', 'two', 'three'] },
        { slotName: 'pet', options: ['dog', 'cats', 'rabbits', 'birds'] },
        { slotName: 'adjective', options: ['cute', 'lovely', 'playful', 'smart'] },
      ],
      contextVi: 'Chia sẻ về những người bạn thú cưng ở nhà.',
      sampleDialogue: {
        speakerA: 'Do you have any pets at home?',
        lineA: 'I love animals!',
        speakerB: 'Yes, I do.',
        lineB: 'I have a lovely white cat named Mimi.',
      },
      substitutionDrills: [
        { prompt: 'Nói em có hai chú chó đáng yêu:', expectedPattern: 'I have two dogs. They are very cute.', cueWords: ['two dogs', 'very cute'] },
      ],
    },
    realLife: [
      {
        id: 'g3-u9-rl',
        title: 'Chăm sóc thú cưng có trách nhiệm',
        roleA: 'Người nuôi thú cưng',
        roleB: 'Bạn hỏi thăm',
        exchanges: [
          { speaker: 'Linh', lineEn: 'How often do you feed your fish?', lineVi: 'Bạn cho cá ăn mấy lần một ngày?' },
          { speaker: 'Huy', lineEn: 'Every morning before going to school.', lineVi: 'Mỗi buổi sáng trước khi đến trường tớ đều cho cá ăn.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g3-u9-q1',
        type: 'multiple-choice',
        question: 'Con vật nào có tai dài và thích ăn cà rốt?',
        options: ['Rabbit', 'Dog', 'Cat'],
        correctIndex: 0,
        explanation: 'Thỏ (rabbit) có tai dài và thích ăn cà rốt.',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 10
  {
    id: 'unit-g3-u10',
    unitNumber: 10,
    title: 'Break Time & Fun Activities',
    themeVi: 'Giờ ra chơi sôi động',
    themeIcon: '⚽',
    grade: 3,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Các hoạt động giờ ra chơi (play football, play chess, skip rope, hide and seek), hỏi "What do you do at break time? - I play..."',
    vocabularies: [
      { id: 'g3-u10-w1', word: 'Play', ipa: '/pleɪ/', partOfSpeech: 'verb', meaningVi: 'Chơi (thể thao, trò chơi)', exampleEn: 'We play games together.', exampleVi: 'Chúng tớ cùng nhau chơi trò chơi.', isCore: true, unitId: 'unit-g3-u10', grade: 3 },
      { id: 'g3-u10-w2', word: 'Football', ipa: '/ˈfʊtbɔːl/', partOfSpeech: 'noun', meaningVi: 'Bóng đá', exampleEn: 'The boys play football at break time.', exampleVi: 'Các bạn nam đá bóng vào giờ ra chơi.', isCore: true, unitId: 'unit-g3-u10', grade: 3 },
      { id: 'g3-u10-w3', word: 'Chess', ipa: '/tʃes/', partOfSpeech: 'noun', meaningVi: 'Cờ vua', exampleEn: 'I like playing chess with Nam.', exampleVi: 'Tớ thích chơi cờ vua với Nam.', isCore: true, unitId: 'unit-g3-u10', grade: 3 },
      { id: 'g3-u10-w4', word: 'Chat', ipa: '/tʃæt/', partOfSpeech: 'verb', meaningVi: 'Trò chuyện, tán gẫu', exampleEn: 'The girls chat with their friends.', exampleVi: 'Các bạn nữ trò chuyện vui vẻ cùng bạn bè.', isCore: true, unitId: 'unit-g3-u10', grade: 3 },
    ],
    grammar: {
      id: 'g3-u10-gram',
      title: 'Hỏi hoạt động thường nhật: What do you do at break time?',
      gradeTier: 'primary',
      step1Recognition: {
        storyOrDialogue: 'Tony: "What do you do at break time?" - Nam: "I play football on the playground."',
        highlights: ['What do you do at break time', 'I play football'],
        explanationFriendly: 'Khi muốn hỏi bạn làm gì vào giờ ra chơi, ta hỏi "What do you do at break time?". Trả lời: "I + [hành động]".',
      },
      step2VisualDiagram: {
        diagramType: 'cards',
        notesVi: 'What do you do at break time? -> I play chess / football / badminton.',
        formulaItems: [
          { label: 'Câu hỏi', structure: 'What do you do at break time?', example: 'What do you do at break time?' },
          { label: 'Câu trả lời', structure: 'I + [động từ hoạt động].', example: 'I play badminton.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g3-u10-ex1',
          level: 'nhan-biet',
          question: 'What do you do at break time? - I _______ chess.',
          options: ['play', 'do', 'make'],
          correctIndex: 0,
          explanationVi: 'Đi với các môn thể thao/trò chơi như chess, football, dùng động từ "play".',
        },
      ],
    },
    sentencePattern: {
      id: 'g3-u10-sp',
      frame: 'What do you do at break time? - I [activity] with my friends.',
      slots: [{ slotName: 'activity', options: ['play football', 'play chess', 'read books', 'skip rope'] }],
      contextVi: 'Rủ bạn cùng tham gia hoạt động giải trí giờ ra chơi.',
      sampleDialogue: {
        speakerA: 'The bell rings! Break time is here!',
        lineA: 'What do you do now?',
        speakerB: 'I play table tennis with Phong.',
        lineB: 'Do you want to join us?',
      },
      substitutionDrills: [
        { prompt: 'Nói em đọc sách trong thư viện vào giờ ra chơi:', expectedPattern: 'I read books at break time.', cueWords: ['read books', 'at break time'] },
      ],
    },
    realLife: [
      {
        id: 'g3-u10-rl',
        title: 'Giờ ra chơi an toàn và lành mạnh tại sân trường',
        roleA: 'Bạn rủ chơi bóng',
        roleB: 'Bạn tham gia',
        exchanges: [
          { speaker: 'Minh', lineEn: 'Let\'s play catch on the school yard!', lineVi: 'Chúng mình cùng chơi ném bắt bóng ở sân trường đi!' },
          { speaker: 'Bảo', lineEn: 'Great idea! Remember to play safely.', lineVi: 'Ý hay đấy! Nhớ chơi cẩn thận an toàn nhé bạn.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g3-u10-q1',
        type: 'multiple-choice',
        question: 'Chọn câu hỏi thích hợp cho câu trả lời: "I skip rope with Mai."',
        options: ['What do you do at break time?', 'Where is your school?', 'How are you?'],
        correctIndex: 0,
        explanation: '"What do you do at break time?" hỏi về hoạt động giờ ra chơi.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },
];
