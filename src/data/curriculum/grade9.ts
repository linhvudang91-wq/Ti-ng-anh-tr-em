import { UnitData } from '../../types';

export const GRADE_9_UNITS: UnitData[] = [
  // Unit 1
  {
    id: 'unit-g9-u1',
    unitNumber: 1,
    title: 'Local Community & Traditional Crafts',
    themeVi: 'Làng nghề truyền thống & Cụm động từ (Phrasal Verbs)',
    themeIcon: '🏺',
    grade: 9,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Làng nghề truyền thống (Bat Trang pottery, Van Phuc silk, Dong Ho woodblock paintings, conical hat making in Tay Ho). Cụm động từ thông dụng (pass down, set up, close down, look forward to, live on) và mệnh đề phụ thuộc.',
    vocabularies: [
      { id: 'g9-u1-w1', word: 'Artisan', ipa: '/ˈɑːtɪzæn/', partOfSpeech: 'noun', meaningVi: 'Nghệ nhân lành nghề, thợ thủ công bậc thầy', exampleEn: 'Skillful artisans carve intricate lacquer paintings.', exampleVi: 'Những nghệ nhân tài hoa chạm khắc những bức tranh sơn mài tinh xảo.', isCore: true, unitId: 'unit-g9-u1', grade: 9 },
      { id: 'g9-u1-w2', word: 'Pass down', ipa: '/pɑːs daʊn/', partOfSpeech: 'phrase', meaningVi: 'Truyền lại qua các thế hệ nối tiếp', exampleEn: 'Ceramic crafting techniques are passed down through generations.', exampleVi: 'Kỹ nghệ gốm sứ được truyền lại qua nhiều thế hệ.', isCore: true, unitId: 'unit-g9-u1', grade: 9 },
      { id: 'g9-u1-w3', word: 'Set up', ipa: '/set ʌp/', partOfSpeech: 'phrase', meaningVi: 'Thành lập, gây dựng (xưởng nghề/doanh nghiệp)', exampleEn: 'Young potters set up a cooperative to export silk.', exampleVi: 'Những thợ gốm trẻ đã thành lập một hợp tác xã xuất khẩu tơ lụa.', isCore: true, unitId: 'unit-g9-u1', grade: 9 },
      { id: 'g9-u1-w4', word: 'Authenticity', ipa: '/ˌɔːθenˈtɪsəti/', partOfSpeech: 'noun', meaningVi: 'Tính nguyên bản, nét tinh hoa chân thực', exampleEn: 'Tourists value the authenticity of Dong Ho folk art.', exampleVi: 'Du khách đánh giá cao tính nguyên bản của nghệ thuật tranh dân gian Đông Hồ.', isCore: true, unitId: 'unit-g9-u1', grade: 9 },
    ],
    grammar: {
      id: 'g9-u1-gram',
      title: 'Cụm động từ (Phrasal Verbs) & Mệnh đề trạng ngữ phức hợp',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Artisan: "My grandfather set up this workshop in 1950. We try our best to keep up with modern demands while passing down ancient glazes."',
        highlights: ['set up this workshop', 'keep up with', 'passing down'],
        explanationFriendly: 'Phrasal verb gồm động từ + giới từ/tiểu từ (Verb + Preposition/Particle), mang ý nghĩa mới hoàn toàn: set up (thành lập), pass down (truyền lại), turn down (từ chối), look forward to (trông chờ), live on (sống dựa vào).',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Verb + Preposition = Phrasal Verb với nghĩa bóng/nghĩa mới.',
        formulaItems: [
          { label: 'Truyền lại', structure: 'pass down + from... to...', example: 'Traditions are passed down from father to son.' },
          { label: 'Thành lập', structure: 'set up + a business / workshop', example: 'They set up an embroidery studio.' },
          { label: 'Theo kịp', structure: 'keep up with + trends', example: 'We must keep up with digital designs.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g9-u1-ex1',
          level: 'nhan-biet',
          question: 'This family craft has been _______ (pass down) from generation to generation.',
          options: ['passed down', 'turned down', 'brought up'],
          correctIndex: 0,
          explanationVi: 'Truyền từ thế hệ này sang thế hệ khác dùng cụm "passed down".',
        },
      ],
    },
    sentencePattern: {
      id: 'g9-u1-sp',
      frame: 'In order to preserve [craftVillage], artisans have to [phrasalVerbAction] so that [culturalValue].',
      slots: [
        { slotName: 'craftVillage', options: ['Bat Trang ceramics', 'Van Phuc silk weaving', 'Dong Ho folk painting', 'Kim Bong carpentry'] },
        { slotName: 'phrasalVerbAction', options: ['pass down secrets to youths', 'set up modern online galleries', 'keep up with eco-friendly standards'] },
        { slotName: 'culturalValue', options: ['ancient heritage never dies out', 'younger generations inherit their roots', 'Vietnamese craftsmanship shines globally'] },
      ],
      contextVi: 'Hội thảo bảo tồn và phát triển làng nghề thủ công thời đại công nghiệp 4.0.',
      sampleDialogue: {
        speakerA: 'Are traditional pottery villages losing their youth?',
        lineA: 'Many young people leave for big cities.',
        speakerB: 'Fortunately, many educated youths are returning to set up creative studios in Bat Trang.',
        lineB: 'They blend contemporary aesthetics with traditional wood-fired glazes.',
      },
      substitutionDrills: [
        { prompt: 'Nói nghệ nhân đã từ chối lời đề nghị bán xưởng gốm cổ truyền:', expectedPattern: 'The artisan turned down the offer to sell his ancient pottery workshop.', cueWords: ['turned down the offer', 'ancient pottery workshop'] },
      ],
    },
    realLife: [
      {
        id: 'g9-u1-rl',
        title: 'Trải nghiệm vuốt gốm trên bàn xoay làng cổ Bát Tràng',
        roleA: 'Nghệ nhân hướng dẫn',
        roleB: 'Học sinh trải nghiệm',
        exchanges: [
          { speaker: 'Nghệ nhân', lineEn: 'Keep your hands moist and steady your thumbs right in the center of the spinning clay.', lineVi: 'Giữ ẩm đôi bàn tay và tì hai ngón cái thật vững ngay tâm của khối đất sét đang xoay nhé cháu.' },
          { speaker: 'Học sinh', lineEn: 'I feel the breath of the earth! Shaping a vase with my own hands is truly magical.', lineVi: 'Cháu cảm nhận được hơi thở của đất! Tự tay tạo hình một chiếc bình thật là kỳ diệu.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g9-u1-q1',
        type: 'multiple-choice',
        question: 'Cụm động từ "turn down" đồng nghĩa với từ nào?',
        options: ['Refuse (Từ chối)', 'Accept (Chấp nhận)', 'Establish (Thành lập)'],
        correctIndex: 0,
        explanation: '"Turn down" nghĩa là từ chối (refuse / reject).',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 2
  {
    id: 'unit-g9-u2',
    unitNumber: 2,
    title: 'City Life & Double Comparatives',
    themeVi: 'Đô thị hóa & So sánh kép càng... càng...',
    themeIcon: '🏙️',
    grade: 9,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Đời sống đô thị hiện đại (megacity, high cost of living, traffic congestion, cosmopolitan, public transit). So sánh kép: The more... the more... / The -er... the -er... (Càng... thì càng...).',
    vocabularies: [
      { id: 'g9-u2-w1', word: 'Cosmopolitan', ipa: '/ˌkɒzməˈpɒlɪtən/', partOfSpeech: 'adjective', meaningVi: 'Mang tính quốc tế, đa văn hóa', exampleEn: 'Ho Chi Minh City is a bustling cosmopolitan hub.', exampleVi: 'TP. Hồ Chí Minh là một trung tâm quốc tế đa văn hóa đầy sôi động.', isCore: true, unitId: 'unit-g9-u2', grade: 9 },
      { id: 'g9-u2-w2', word: 'Congestion', ipa: '/kənˈdʒestʃən/', partOfSpeech: 'noun', meaningVi: 'Tình trạng tắc nghẽn giao thông đô thị', exampleEn: 'The new elevated sky-train helps alleviate traffic congestion.', exampleVi: 'Tuyến đường sắt trên cao mới giúp giảm bớt tắc nghẽn giao thông.', isCore: true, unitId: 'unit-g9-u2', grade: 9 },
      { id: 'g9-u2-w3', word: 'Infrastructure', ipa: '/ˈɪnfrəstrʌktʃər/', partOfSpeech: 'noun', meaningVi: 'Cơ sở hạ tầng đô thị (cầu đường, điện nước)', exampleEn: 'Modern cities require resilient infrastructure.', exampleVi: 'Các thành phố hiện đại đòi hỏi cơ sở hạ tầng kiên cố và linh hoạt.', isCore: true, unitId: 'unit-g9-u2', grade: 9 },
      { id: 'g9-u2-w4', word: 'Affordable', ipa: '/əˈfɔːdəbl/', partOfSpeech: 'adjective', meaningVi: 'Vừa túi tiền, giá cả phải chăng', exampleEn: 'Affordable public housing is essential for young families.', exampleVi: 'Nhà ở xã hội giá cả phải chăng là điều thiết yếu cho các gia đình trẻ.', isCore: true, unitId: 'unit-g9-u2', grade: 9 },
    ],
    grammar: {
      id: 'g9-u2-gram',
      title: 'So sánh kép (Double Comparatives: THE MORE... THE MORE...)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Urban planner: "The bigger the city grows, the more congested the streets become. The faster we build metro lines, the better the air will be."',
        highlights: ['The bigger the city grows', 'the more congested the streets become', 'The faster... the better'],
        explanationFriendly: 'Cấu trúc so sánh đồng tiến: "The + so sánh hơn (Adj/Adv), the + so sánh hơn (Adj/Adv)". Mang nghĩa: Càng... thì càng... Ví dụ: The more you study, the smarter you become.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'THE + Comparative (short adj-er / more long adj) + S + V, THE + Comparative + S + V.',
        formulaItems: [
          { label: 'Tính từ ngắn', structure: 'The + Adj-er + S + V, the + Adj-er + S + V', example: 'The higher we go, the colder it gets.' },
          { label: 'Tính từ dài', structure: 'The more + Adj + S + V, the more + Adj + S + V', example: 'The more crowded it is, the more stressful people feel.' },
          { label: 'Hỗn hợp danh từ/động từ', structure: 'The more + S + V, the more + N + S + V', example: 'The more you practice, the more progress you make.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g9-u2-ex1',
          level: 'nhan-biet',
          question: 'The _______ (early) you start preparing, the _______ (confident) you will be on exam day.',
          options: ['earlier / more confident', 'more early / confidenest', 'early / confident'],
          correctIndex: 0,
          explanationVi: 'So sánh kép: The earlier..., the more confident... (càng sớm... càng tự tin).',
        },
      ],
    },
    sentencePattern: {
      id: 'g9-u2-sp',
      frame: 'The [comparativeCondition], the [comparativeResult] our city will be.',
      slots: [
        { slotName: 'comparativeCondition', options: ['more people use public transport', 'greener our parks become', 'more sustainably we plan buildings'] },
        { slotName: 'comparativeResult', options: ['cleaner and healthier', 'more livable and enjoyable', 'more attractive to talents'] },
      ],
      contextVi: 'Quy hoạch phát triển đô thị xanh thông minh và đáng sống.',
      sampleDialogue: {
        speakerA: 'How can Hanoi tackle rush-hour gridlock effectively?',
        lineA: 'Road expansions seem insufficient.',
        speakerB: 'The more electric buses and metro lines we integrate, the fewer private motorbikes people will drive.',
        lineB: 'Clean public transit is the ultimate solution.',
      },
      substitutionDrills: [
        { prompt: 'Nói bạn càng đọc nhiều sách, hiểu biết của bạn càng trở nên sâu rộng:', expectedPattern: 'The more books you read, the broader your knowledge becomes.', cueWords: ['The more books you read', 'broader your knowledge'] },
      ],
    },
    realLife: [
      {
        id: 'g9-u2-rl',
        title: 'Trải nghiệm tuyến tàu điện trên cao Cát Linh - Hà Đông',
        roleA: 'Học sinh đi học',
        roleB: 'Người cao tuổi đi tàu',
        exchanges: [
          { speaker: 'Học sinh', lineEn: 'Riding the sky-train saves me 30 minutes of traffic jam every morning!', lineVi: 'Đi tàu điện trên cao giúp cháu tiết kiệm được 30 phút kẹt xe mỗi buổi sáng!' },
          { speaker: 'Cụ ông', lineEn: 'It is so smooth and clean. Our capital is modernizing day by day.', lineVi: 'Tàu chạy thật êm và sạch sẽ. Thủ đô của chúng ta đang hiện đại hóa từng ngày.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g9-u2-q1',
        type: 'multiple-choice',
        question: 'Điền vào chỗ trống: "The older he gets, the _______ he forgets things."',
        options: ['more easily', 'most easily', 'easier'],
        correctIndex: 0,
        explanation: 'Trạng từ "easily" trong so sánh kép dùng "the more easily".',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 3
  {
    id: 'unit-g9-u3',
    unitNumber: 3,
    title: 'Teen Stress & Wh-Words Before To-Infinitive',
    themeVi: 'Căng thẳng tuổi mới lớn & Từ để hỏi + To-V',
    themeIcon: '🧘',
    grade: 9,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Sức khỏe tinh thần của học sinh lớp 9 trước kỳ thi tuyển sinh vào 10 (study overload, parental expectations, emotional balance, time-management). Cấu trúc rút gọn câu tường thuật: Wh-words + To-Infinitive (what to do, how to overcome, where to seek help).',
    vocabularies: [
      { id: 'g9-u3-w1', word: 'Overwhelmed', ipa: '/ˌəʊvəˈwelmd/', partOfSpeech: 'adjective', meaningVi: 'Choáng ngợp, quá tải trước áp lực', exampleEn: 'Many ninth-graders feel overwhelmed before the high school entrance exam.', exampleVi: 'Nhiều bạn lớp 9 cảm thấy quá tải trước kỳ thi tuyển sinh lớp 10.', isCore: true, unitId: 'unit-g9-u3', grade: 9 },
      { id: 'g9-u3-w2', word: 'Expectation', ipa: '/ˌekspekˈteɪʃn/', partOfSpeech: 'noun', meaningVi: 'Sự kỳ vọng, mong mỏi từ gia đình/xã hội', exampleEn: 'Unrealistic expectations can induce heavy stress.', exampleVi: 'Những kỳ vọng thiếu thực tế có thể gây ra áp lực nặng nề.', isCore: true, unitId: 'unit-g9-u3', grade: 9 },
      { id: 'g9-u3-w3', word: 'Prioritise', ipa: '/praɪˈɒrətaɪz/', partOfSpeech: 'verb', meaningVi: 'Sắp xếp theo thứ tự ưu tiên quan trọng', exampleEn: 'Prioritise key subjects and healthy sleep.', exampleVi: 'Hãy sắp xếp ưu tiên các môn học trọng tâm và giấc ngủ lành mạnh.', isCore: true, unitId: 'unit-g9-u3', grade: 9 },
      { id: 'g9-u3-w4', word: 'Resilience', ipa: '/rɪˈzɪliəns/', partOfSpeech: 'noun', meaningVi: 'Khả năng phục hồi, sự kiên cường vượt khó', exampleEn: 'Building emotional resilience is a lifelong asset.', exampleVi: 'Rèn luyện khả năng phục hồi tinh thần là tài sản vô giá cả đời.', isCore: true, unitId: 'unit-g9-u3', grade: 9 },
    ],
    grammar: {
      id: 'g9-u3-gram',
      title: 'Cấu trúc Wh-question Words + To-Infinitive (Rút gọn gián tiếp)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'An: "I don\'t know what to do about my revision schedule. Can you show me how to manage my time efficiently?"',
        highlights: ['what to do', 'how to manage'],
        explanationFriendly: 'Dùng cấu trúc: Wh-word (what, where, when, who, how) + TO-V sau các động từ như know, understand, ask, tell, decide, wonder để diễn tả sự phân vân hoặc thắc mắc (What I should do -> What to do). Chú ý: KHÔNG DÙNG WHY + TO-V.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'S + know/wonder/decide + [What / Where / When / How / Who] + TO-INFINITIVE.',
        formulaItems: [
          { label: 'Biết phải làm gì', structure: 'know + what to do', example: 'I know what to do next.' },
          { label: 'Cách làm việc gì', structure: 'show / explain + how to + V', example: 'Please tell me how to solve this math problem.' },
          { label: 'Nơi cần đến', structure: 'decide + where to go', example: 'They haven\'t decided where to spend the holiday.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g9-u3-ex1',
          level: 'nhan-biet',
          question: 'Linh was confused and did not know _______ to turn to for psychological advice.',
          options: ['who', 'why', 'whose'],
          correctIndex: 0,
          explanationVi: 'Tìm đến ai để xin lời khuyên: "who to turn to". (Không bao giờ dùng "why to").',
        },
      ],
    },
    sentencePattern: {
      id: 'g9-u3-sp',
      frame: 'When facing [stressSituation], you should learn [whQuestionToInf] to maintain peace of mind.',
      slots: [
        { slotName: 'stressSituation', options: ['heavy exam pressure', 'unrealistic grade goals', 'insomnia before important tests'] },
        { slotName: 'whQuestionToInf', options: ['how to break study loads into bite-sized chunks', 'what to focus on first', 'where to seek professional guidance'] },
      ],
      contextVi: 'Chuyên đề "Cùng sĩ tử 2k vượt vũ môn vào lớp 10".',
      sampleDialogue: {
        speakerA: 'I have so many practice tests that I literally don\'t know where to begin.',
        lineA: 'I feel paralyzed.',
        speakerB: 'Take a deep breath. Let\'s write down a checklist and decide what to tackle first.',
        lineB: 'Focusing on one small task at a time restores your confidence instantly.',
      },
      substitutionDrills: [
        { prompt: 'Nói tôi không biết làm thế nào để cân bằng giữa học tập và nghỉ ngơi:', expectedPattern: 'I don\'t know how to balance study and rest.', cueWords: ['don\'t know how to balance', 'study and rest'] },
      ],
    },
    realLife: [
      {
        id: 'g9-u3-rl',
        title: 'Lời động viên ấm áp của bố mẹ trước ngày thi vào 10',
        roleA: 'Cha mẹ thấu hiểu',
        roleB: 'Sĩ tử lớp 9',
        exchanges: [
          { speaker: 'Mẹ', lineEn: 'Do your best, darling. Your score does not define your worth or our love for you.', lineVi: 'Hãy cố gắng hết sức mình con nhé. Điểm số không định nghĩa giá trị của con và tình yêu bố mẹ dành cho con.' },
          { speaker: 'Con', lineEn: 'Thank you, Mom! Knowing that you always stand by me dissolves all my anxiety.', lineVi: 'Con cảm ơn mẹ! Biết rằng bố mẹ luôn ở bên cạnh con làm tan biến mọi âu lo trong lòng con.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g9-u3-q1',
        type: 'multiple-choice',
        question: 'Từ để hỏi nào sau đây KHÔNG THỂ đi với to-infinitive (không có dạng Wh- + to-V)?',
        options: ['Why', 'What', 'Where'],
        correctIndex: 0,
        explanation: 'Trong tiếng Anh ngữ pháp, KHÔNG CÓ dạng "why to do". Chỉ có what/where/when/how/who to do.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 4
  {
    id: 'unit-g9-u4',
    unitNumber: 4,
    title: 'Remembering the Past & Wishes for Present',
    themeVi: 'Ký ức thời bao cấp & Câu ước hiện tại (WISH)',
    themeIcon: '🕰️',
    grade: 9,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Đời sống xưa thời tem phiếu, xe đạp Phượng Hoàng, loa phường, trò chơi dân gian (ô ăn quan, trốn tìm). Cấu trúc used to / didn\'t use to (thói quen quá khứ đã chấm dứt) và câu ước WISH ở hiện tại (Past Subjunctive).',
    vocabularies: [
      { id: 'g9-u4-w1', word: 'Subsidised period', ipa: '/ˈsʌbsɪdaɪzd ˈpɪəriəd/', partOfSpeech: 'noun', meaningVi: 'Thời kỳ bao cấp (tem phiếu xếp hàng)', exampleEn: 'My grandparents queued with food stamps during the subsidised period.', exampleVi: 'Ông bà tớ từng xếp hàng bằng tem phiếu lương thực thời bao cấp.', isCore: true, unitId: 'unit-g9-u4', grade: 9 },
      { id: 'g9-u4-w2', word: 'Used to', ipa: '/ˈjuːst tuː/', partOfSpeech: 'phrase', meaningVi: 'Đã từng (thói quen xưa nay không còn nữa)', exampleEn: 'Children used to play tug of war in the communal yard.', exampleVi: 'Trẻ con xưa từng chơi kéo co ngoài sân đình.', isCore: true, unitId: 'unit-g9-u4', grade: 9 },
      { id: 'g9-u4-w3', word: 'Tug of war', ipa: '/ˌtʌɡ əv ˈwɔːr/', partOfSpeech: 'noun', meaningVi: 'Trò chơi kéo co truyền thống', exampleEn: 'Tug of war is a communal game of strength and unity.', exampleVi: 'Kéo co là trò chơi cộng đồng thể hiện sức mạnh và tinh thần đoàn kết.', isCore: true, unitId: 'unit-g9-u4', grade: 9 },
      { id: 'g9-u4-w4', word: 'Loudspeaker', ipa: '/ˌlaʊdˈspiːkər/', partOfSpeech: 'noun', meaningVi: 'Hệ thống loa phường truyền thanh', exampleEn: 'The neighborhood loudspeaker broadcast morning news at 6 a.m.', exampleVi: 'Loa phường phát bản tin thời sự sáng lúc 6 giờ.', isCore: true, unitId: 'unit-g9-u4', grade: 9 },
    ],
    grammar: {
      id: 'g9-u4-gram',
      title: 'Cấu trúc USED TO + V-inf & Câu ước WISH ở hiện tại (Past Subjunctive)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Grandfather: "We used to ride single-speed bicycles everywhere. I wish my grandchildren were less glued to smartphones today."',
        highlights: ['used to ride', 'I wish my grandchildren were less glued'],
        explanationFriendly: 'USED TO + V-inf: Đã từng làm việc gì trong quá khứ và nay không còn nữa. Phủ định: didn\'t use to. CÂU ƯỚC HIỆN TẠI: S + wish + S + V2/ed (động từ to be lùi thì thành WERE cho tất cả các ngôi).',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Used to + V-inf (Thói quen quá khứ) | S + wish + S + V2/ed (To be chia là WERE cho mọi ngôi).',
        formulaItems: [
          { label: 'Used to', structure: 'S + used to + Verb-inf', example: 'People used to write handwritten letters.' },
          { label: 'Didn\'t use to', structure: 'S + didn\'t use to + Verb-inf', example: 'People didn\'t use to have air-conditioners.' },
          { label: 'Wish hiện tại', structure: 'S + wish + S + V-ed / were', example: 'I wish I were taller. / She wishes she had a bike.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g9-u4-ex1',
          level: 'nhan-biet',
          question: 'I wish our neighborhood _______ (have) more green parks for children to play outdoor games.',
          options: ['had', 'has', 'will have'],
          correctIndex: 0,
          explanationVi: 'Câu ước WISH cho điều trái với hiện tại: lùi thì về quá khứ đơn (had).',
        },
      ],
    },
    sentencePattern: {
      id: 'g9-u4-sp',
      frame: 'Decades ago, people used to [pastHabit]. Today, I wish [meaningfulWish].',
      slots: [
        { slotName: 'pastHabit', options: ['listen to neighborhood public loudspeakers', 'gather under moonlight playing folk games', 'queue patiently with food stamp coupons'] },
        { slotName: 'meaningfulWish', options: ['modern children spent more time with nature', 'families gathered for dinner without phones', 'we preserved more of those nostalgic values'] },
      ],
      contextVi: 'Triển lãm ảnh ký ức Hà Nội thời bao cấp.',
      sampleDialogue: {
        speakerA: 'What did children do before smartphones and internet games existed?',
        lineA: 'Were they bored?',
        speakerB: 'Not at all! They used to play mandarin square capturing and fly handmade kites across open fields.',
        lineB: 'Their childhood was filled with laughter and fresh air.',
      },
      substitutionDrills: [
        { prompt: 'Dùng câu ước WISH: Tôi ước gì tôi có thể nói tiếng Anh lưu loát như người bản xứ:', expectedPattern: 'I wish I could speak English fluently like a native speaker.', cueWords: ['I wish I could speak', 'like a native speaker'] },
      ],
    },
    realLife: [
      {
        id: 'g9-u4-rl',
        title: 'Nghe ông bà kể chuyện bên tách trà hoa cúc',
        roleA: 'Cháu lắng nghe',
        roleB: 'Ông kể chuyện xưa',
        exchanges: [
          { speaker: 'Cháu', lineEn: 'Grandpa, was it tough during the subsidised ration period?', lineVi: 'Ông ơi, ngày xưa thời tem phiếu bao cấp có vất vả lắm không ạ?' },
          { speaker: 'Ông', lineEn: 'Materially scarce, my boy, but human solidarity and mutual affection were immeasurable.', lineVi: 'Vật chất thì thiếu thốn cháu à, nhưng tình làng nghĩa xóm và sự sẻ chia đùm bọc thì vô bờ bến.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g9-u4-q1',
        type: 'multiple-choice',
        question: 'Trong câu ước hiện tại "I wish I _______ rich", động từ to be chuẩn quy tắc học thuật là:',
        options: ['were', 'am', 'was rich not were'],
        correctIndex: 0,
        explanation: 'Trong câu ước trái hiện tại (Subjunctive mood), to be dùng "were" cho tất cả các ngôi.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 5
  {
    id: 'unit-g9-u5',
    unitNumber: 5,
    title: 'Wonders of Vietnam & Impersonal Passive',
    themeVi: 'Kỳ quan Việt Nam & Bị động khách quan',
    themeIcon: '⛰️',
    grade: 9,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Danh thắng và kỳ quan Việt Nam (Trang An complex, Phong Nha - Ke Bang, Hue Imperial Citadel, My Son Sanctuary, Fansipan peak). Cấu trúc câu bị động khách quan (It is reported/said/believed that... / S is said to + V).',
    vocabularies: [
      { id: 'g9-u5-w1', word: 'Complex', ipa: '/ˈkɒmpleks/', partOfSpeech: 'noun', meaningVi: 'Quần thể danh thắng (Trang An complex)', exampleEn: 'Trang An is a UNESCO mixed cultural and natural complex.', exampleVi: 'Tràng An là quần thể di sản văn hóa và thiên nhiên hỗn hợp của UNESCO.', isCore: true, unitId: 'unit-g9-u5', grade: 9 },
      { id: 'g9-u5-w2', word: 'Geological', ipa: '/ˌdʒiːəˈlɒdʒɪkl/', partOfSpeech: 'adjective', meaningVi: 'Thuộc về địa chất, cấu tạo vỏ trái đất', exampleEn: 'Phong Nha features spectacular geological karst formations.', exampleVi: 'Phong Nha sở hữu những kiến tạo địa chất karst đá vôi kỳ vĩ.', isCore: true, unitId: 'unit-g9-u5', grade: 9 },
      { id: 'g9-u5-w3', word: 'Limestone', ipa: '/ˈlaɪmstəʊn/', partOfSpeech: 'noun', meaningVi: 'Đá vôi (tạo nên các tháp karst)', exampleEn: 'Limestone karsts rise majestically from the emerald waters.', exampleVi: 'Những rặng núi đá vôi nhô lên sừng sững giữa làn nước xanh ngọc.', isCore: true, unitId: 'unit-g9-u5', grade: 9 },
      { id: 'g9-u5-w4', word: 'Preservation', ipa: '/ˌprezəˈveɪʃn/', partOfSpeech: 'noun', meaningVi: 'Công tác bảo tồn, gìn giữ di sản', exampleEn: 'Heritage preservation requires joint international efforts.', exampleVi: 'Bảo tồn di sản đòi hỏi những nỗ lực chung của toàn cầu.', isCore: true, unitId: 'unit-g9-u5', grade: 9 },
    ],
    grammar: {
      id: 'g9-u5-gram',
      title: 'Câu bị động khách quan (Impersonal Passive: IT IS SAID / REPORTED THAT...)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Geologist: "It is believed that the limestone caves of Phong Nha were formed over 400 million years ago."',
        highlights: ['It is believed that', 'were formed'],
        explanationFriendly: 'Dùng khi muốn tường thuật lại một ý kiến, tin đồn, nhận định chung mà không cần nêu rõ ai nói: It is said / believed / reported / claimed / expected THAT + Mệnh đề. Dạng 2: S + is/are said + TO + V-infinitive.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Dạng 1: It + is/was + P2 (said/believed/reported) + that + Clause. Dạng 2: S + is/are/was/were + P2 + to-V.',
        formulaItems: [
          { label: 'Dạng IT khách quan', structure: 'It is said / thought that + S + V', example: 'It is said that Ha Long Bay has nearly 2,000 islands.' },
          { label: 'Dạng chuyển đổi chủ ngữ', structure: 'S + is/are said to + V-inf', example: 'Ha Long Bay is said to have nearly 2,000 islands.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g9-u5-ex1',
          level: 'nhan-biet',
          question: '_______ is reported that Son Doong Cave can fit an entire New York skyscraper inside.',
          options: ['It', 'There', 'This'],
          correctIndex: 0,
          explanationVi: 'Cấu trúc bị động khách quan chuẩn: "It is reported that...".',
        },
      ],
    },
    sentencePattern: {
      id: 'g9-u5-sp',
      frame: 'It is widely believed that [wonderName] [geologicalFact]. Therefore, [conservationCall].',
      slots: [
        { slotName: 'wonderName', options: ['Trang An Landscape Complex', 'Ha Long Bay', 'Phong Nha - Ke Bang National Park', 'My Son Sanctuary'] },
        { slotName: 'geologicalFact', options: ['took hundreds of millions of years of karst evolution to form', 'harbors unique endemic flora and fauna', 'symbolizes our ancestors\' architectural brilliance'] },
        { slotName: 'conservationCall', options: ['we must balance tourism and strict ecological protection', 'sustainable travel must be enforced firmly', 'every visitor must leave only footprints'] },
      ],
      contextVi: 'Hội nghị quốc tế bảo tồn di sản thế giới tại Việt Nam.',
      sampleDialogue: {
        speakerA: 'Why does Son Doong Cave amaze geologists around the world?',
        lineA: 'Is it just its size?',
        speakerB: 'It is reported that it has its own subterranean river, primeval rainforest, and independent weather system inside!',
        lineB: 'Clouds even form inside the massive cavern passages.',
      },
      substitutionDrills: [
        { prompt: 'Chuyển câu: "People believe that Ha Long Bay is a wonder" sang bị động với IT:', expectedPattern: 'It is believed that Ha Long Bay is a wonder.', cueWords: ['It is believed that', 'is a wonder'] },
      ],
    },
    realLife: [
      {
        id: 'g9-u5-rl',
        title: 'Lời dặn của hướng dẫn viên khi thám hiểm hang động Phong Nha',
        roleA: 'Hướng dẫn viên thám hiểm',
        roleB: 'Du khách',
        exchanges: [
          { speaker: 'HDV', lineEn: 'Please do not touch stalactites. The oil on our fingertips halts their growth for decades.', lineVi: 'Xin quý khách không chạm tay vào thạch nhũ. Lớp dầu trên đầu ngón tay sẽ làm ngừng quá trình phát triển của nhũ đá hàng thập kỷ.' },
          { speaker: 'Du khách', lineEn: 'We will be very cautious. Preserving nature is our shared honor.', lineVi: 'Chúng tôi sẽ hết sức cẩn thận. Gìn giữ tự nhiên là niềm vinh dự chung của tất cả chúng ta.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g9-u5-q1',
        type: 'multiple-choice',
        question: 'Chuyển "People say that she is a talented singer" sang dạng S + is said to + V:',
        options: ['She is said to be a talented singer.', 'It is said she is singer.', 'She says to be talented singer.'],
        correctIndex: 0,
        explanation: 'Cấu trúc chuyển đổi chuẩn: She is said to be a talented singer.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 6 (Semester 2)
  {
    id: 'unit-g9-u6',
    unitNumber: 6,
    title: 'Viet Nam: Then and Now',
    themeVi: 'Việt Nam xưa và nay & Quá khứ hoàn thành',
    themeIcon: '🚂',
    grade: 9,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Hành trình phát triển vượt bậc của đất nước (trams in Hanoi, thatched houses vs modern skyscrapers, literacy campaigns, digital transformation). Thì Quá khứ hoàn thành (Past Perfect: had + V3/ed) diễn tả hành động xảy ra trước một hành động khác trong quá khứ.',
    vocabularies: [
      { id: 'g9-u6-w1', word: 'Transformation', ipa: '/ˌtrænsfəˈmeɪʃn/', partOfSpeech: 'noun', meaningVi: 'Sự biến đổi, chuyển mình ngoạn mục', exampleEn: 'Vietnam has experienced an extraordinary economic transformation.', exampleVi: 'Việt Nam đã trải qua một sự chuyển mình kinh tế phi thường.', isCore: true, unitId: 'unit-g9-u6', grade: 9 },
      { id: 'g9-u6-w2', word: 'Thatched', ipa: '/θætʃt/', partOfSpeech: 'adjective', meaningVi: 'Lợp bằng tranh, mái lá đơn sơ', exampleEn: 'Old thatched cottages were replaced by sturdy brick houses.', exampleVi: 'Những mái nhà tranh xưa đã được thay thế bằng nhà gạch kiên cố.', isCore: true, unitId: 'unit-g9-u6', grade: 9 },
      { id: 'g9-u6-w3', word: 'Tram', ipa: '/træm/', partOfSpeech: 'noun', meaningVi: 'Xe điện leng keng chạy trên đường ray phố cổ', exampleEn: 'The bell of the historic Hanoi tram echoes in our collective memory.', exampleVi: 'Tiếng chuông xe điện leng keng Hà Nội xưa còn vang vọng mãi trong ký ức.', isCore: true, unitId: 'unit-g9-u6', grade: 9 },
      { id: 'g9-u6-w4', word: 'Literacy', ipa: '/ˈlɪtərəsi/', partOfSpeech: 'noun', meaningVi: 'Biết đọc biết viết, trình độ phổ cập giáo dục', exampleEn: 'The Binh dan hoc vu campaign raised national literacy swiftly.', exampleVi: 'Phong trào Bình dân học vụ đã xóa nạn mù chữ một cách thần tốc.', isCore: true, unitId: 'unit-g9-u6', grade: 9 },
    ],
    grammar: {
      id: 'g9-u6-gram',
      title: 'Thì Quá khứ hoàn thành (The Past Perfect Tense: HAD + V3/ED)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Historian: "By the time the economic reforms began in 1986, people had endured decades of hardship. Before the new bridge was opened, commuters had crossed by ferry."',
        highlights: ['had endured', 'began in 1986', 'Before the bridge was opened', 'had crossed by ferry'],
        explanationFriendly: 'Diễn tả hành động xảy ra và HOÀN TẤT TRƯỚC một hành động khác trong quá khứ. Cấu trúc: S + had + V3/ed. Từ nhận biết: Before, After, By the time. Quy tắc: Before + Quá khứ đơn, Quá khứ hoàn thành. After + Quá khứ hoàn thành, Quá khứ đơn.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Action 1 (Xảy ra trước): HAD + V3/ed | Action 2 (Xảy ra sau): Past Simple (V2/ed).',
        formulaItems: [
          { label: 'Với BEFORE', structure: 'Before + S + V2/ed, S + had + V3/ed', example: 'Before I arrived, the train had left.' },
          { label: 'Với AFTER', structure: 'After + S + had + V3/ed, S + V2/ed', example: 'After he had finished his work, he went home.' },
          { label: 'Với BY THE TIME', structure: 'By the time + S + V2/ed, S + had + V3/ed', example: 'By the time we reached the cinema, the movie had started.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g9-u6-ex1',
          level: 'nhan-biet',
          question: 'By the time the metro line opened in Hanoi, commuters _______ (depend) on motorbikes for decades.',
          options: ['had depended', 'depended', 'have depended'],
          correctIndex: 0,
          explanationVi: 'Hành động phụ thuộc vào xe máy xảy ra TRƯỚC khi có tàu điện nên dùng Quá khứ hoàn thành: had depended.',
        },
      ],
    },
    sentencePattern: {
      id: 'g9-u6-sp',
      frame: 'Before [modernInfrastructure] was introduced, citizens had [pastHardship].',
      slots: [
        { slotName: 'modernInfrastructure', options: ['high-speed internet', 'clean tap water network', 'the modern suspension bridge', 'the automated flyover'] },
        { slotName: 'pastHardship', options: ['relied solely on snail mail', 'carried water buckets from deep wells', 'waited for slow wooden river ferries'] },
      ],
      contextVi: 'Phóng sự tài liệu: Nửa thế kỷ chuyển mình ngoạn mục của đất nước.',
      sampleDialogue: {
        speakerA: 'How did people travel between riverbanks before the bridge was constructed?',
        lineA: 'Was it convenient?',
        speakerB: 'Before the bridge was built, thousands had queued for hours each rainy day to take the ferry.',
        lineB: 'The new bridge revolutionized the entire local economy.',
      },
      substitutionDrills: [
        { prompt: 'Dùng quá khứ hoàn thành: Sau khi bà đã nấu cơm xong, cả gia đình mới quây quần dùng bữa:', expectedPattern: 'After grandmother had cooked dinner, the whole family sat down to eat.', cueWords: ['After grandmother had cooked', 'whole family sat down'] },
      ],
    },
    realLife: [
      {
        id: 'g9-u6-rl',
        title: 'Tri ân thế hệ đi trước đã cống hiến cho hòa bình hôm nay',
        roleA: 'Thế hệ trẻ thời đại số',
        roleB: 'Cựu chiến binh',
        exchanges: [
          { speaker: 'Học sinh', lineEn: 'Seeing photos of wartime classrooms makes us appreciate our air-conditioned schools so deeply.', lineVi: 'Nhìn những bức ảnh lớp học hầm chữ A thời chiến khiến chúng cháu càng thêm biết ơn những lớp học đủ đầy hôm nay.' },
          { speaker: 'Bác cựu binh', lineEn: 'Study hard, dear youth. You are building the prosperous Vietnam we always dreamed of.', lineVi: 'Hãy học tập chăm ngoan nhé các cháu. Các cháu đang dựng xây nên một Việt Nam đàng hoàng hơn, to đẹp hơn như Bác Hồ hằng mong ước.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g9-u6-q1',
        type: 'multiple-choice',
        question: 'Chọn câu đúng: "When we arrived at the stadium, the match _______."',
        options: ['had already begun', 'already began', 'has already begun'],
        correctIndex: 0,
        explanation: 'Trận đấu đã bắt đầu TRƯỚC khi chúng tôi đến: had already begun.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 7
  {
    id: 'unit-g9-u7',
    unitNumber: 7,
    title: 'Recipes and Eating Habits',
    themeVi: 'Ẩm thực & Động từ chỉ cách chế biến',
    themeIcon: '🍳',
    grade: 9,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Động từ nấu ăn chuyên sâu (marinate, simmer, whisk, sprinkle, drain, peel, grate, puree). Câu điều kiện loại 1 kết hợp Modal Verbs trong mệnh đề chính (If you want delicious pho, you MUST simmer the broth for hours).',
    vocabularies: [
      { id: 'g9-u7-w1', word: 'Marinate', ipa: '/ˈmærɪneɪt/', partOfSpeech: 'verb', meaningVi: 'Ướp gia vị (thịt/cá) trước khi nấu', exampleEn: 'Marinate the chicken with garlic and ginger for thirty minutes.', exampleVi: 'Ướp thịt gà với tỏi và gừng trong 30 phút.', isCore: true, unitId: 'unit-g9-u7', grade: 9 },
      { id: 'g9-u7-w2', word: 'Simmer', ipa: '/ˈsɪmər/', partOfSpeech: 'verb', meaningVi: 'Đun nhỏ lửa liu riu cho ngấm ngọt', exampleEn: 'Simmer the soup on low heat to extract natural sweetness.', exampleVi: 'Ninh nhỏ lửa liu riu nồi canh để chiết xuất vị ngọt tự nhiên.', isCore: true, unitId: 'unit-g9-u7', grade: 9 },
      { id: 'g9-u7-w3', word: 'Whisk', ipa: '/wɪsk/', partOfSpeech: 'verb', meaningVi: 'Đánh đều, đánh bông (trứng/kem)', exampleEn: 'Whisk the egg yolks until they turn pale yellow.', exampleVi: 'Đánh đều lòng đỏ trứng cho tới khi chuyển màu vàng nhạt.', isCore: true, unitId: 'unit-g9-u7', grade: 9 },
      { id: 'g9-u7-w4', word: 'Nutritious', ipa: '/njuːˈtrɪʃəs/', partOfSpeech: 'adjective', meaningVi: 'Bổ dưỡng, giàu giá trị dinh dưỡng', exampleEn: 'Steaming vegetables keeps them crisp and nutritious.', exampleVi: 'Hấp rau củ giúp rau giữ được độ giòn ngọt và giàu chất bổ.', isCore: true, unitId: 'unit-g9-u7', grade: 9 },
    ],
    grammar: {
      id: 'g9-u7-gram',
      title: 'Câu điều kiện loại 1 với Động từ khuyết thiếu (Modal Verbs in Main Clause)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Chef: "If you want the spring rolls to stay extra crispy, you should fry them twice and drain excess oil properly."',
        highlights: ['If you want', 'you should fry them twice'],
        explanationFriendly: 'Thay vì chỉ dùng "will", mệnh đề chính của câu điều kiện loại 1 có thể dùng các Modal Verbs: SHOULD / CAN / MUST / MAY để đưa ra lời khuyên, sự cho phép hoặc quy tắc bắt buộc: If + S + V(hiện tại đơn), S + must / should / can + V-infinitive.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'IF + S + V(s/es), S + [can / must / should / may] + V-infinitive.',
        formulaItems: [
          { label: 'Lời khuyên nấu nướng', structure: 'If you want X, you should + V', example: 'If you want sweet soup, you should use rock sugar.' },
          { label: 'Bắt buộc an toàn', structure: 'If you handle raw poultry, you must wash hands', example: 'You must wash cutting boards after meat.' },
          { label: 'Khả năng có thể', structure: 'If it tastes bland, you can add fish sauce', example: 'You can garnish with mint leaves.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g9-u7-ex1',
          level: 'nhan-biet',
          question: 'If you want the steak to be tender, you _______ (must) let it rest before slicing.',
          options: ['must', 'will must', 'musted'],
          correctIndex: 0,
          explanationVi: 'Trong mệnh đề chính đi kèm động từ khuyết thiếu dùng nguyên mẫu: must let.',
        },
      ],
    },
    sentencePattern: {
      id: 'g9-u7-sp',
      frame: 'If you want to prepare [dish], you should [cookingAction] before [servingMethod].',
      slots: [
        { slotName: 'dish', options: ['crispy spring rolls', 'savory beef pho', 'Vietnamese pancake (banh xeo)', 'grilled pork skewers'] },
        { slotName: 'cookingAction', options: ['marinate ingredients for 30 minutes', 'simmer the broth on gentle heat', 'drain excess oil on paper towels'] },
        { slotName: 'servingMethod', options: ['serving with fresh mint and dipping sauce', 'garnishing with sliced chili', 'plating with rice noodles'] },
      ],
      contextVi: 'Chương trình Vua đầu bếp nhí - Nâng tầm ẩm thực Việt.',
      sampleDialogue: {
        speakerA: 'What is the secret to making clear, aromatic pho broth?',
        lineA: 'Mine always turns cloudy.',
        speakerB: 'If you want the broth to remain crystal clear, you must char ginger and shallots, and simmer gently without boiling aggressively.',
        lineB: 'Skim off foam regularly.',
      },
      substitutionDrills: [
        { prompt: 'Nói nếu bạn muốn giảm lượng đường, bạn có thể thay thế bằng mật ong tự nhiên:', expectedPattern: 'If you want to reduce sugar intake, you can substitute natural honey.', cueWords: ['reduce sugar intake', 'substitute natural honey'] },
      ],
    },
    realLife: [
      {
        id: 'g9-u7-rl',
        title: 'Tự nấu món cơm gia đình ấm cúng mừng sinh nhật mẹ',
        roleA: 'Con vào bếp',
        roleB: 'Mẹ bất ngờ xúc động',
        exchanges: [
          { speaker: 'Con', lineEn: 'Happy birthday, Mom! I cooked your favorite sour soup with snakehead fish and fresh herbs.', lineVi: 'Con chúc mừng sinh nhật mẹ! Con đã tự tay nấu món canh chua cá lóc với rau thì là mẹ thích nhất ạ.' },
          { speaker: 'Mẹ', lineEn: 'The soup is cooked with all your love. It is the most delicious meal in the world!', lineVi: 'Nồi canh được nêm nếm bằng tất cả tình yêu thương của con. Đây là bữa ăn ngon nhất trần đời mẹ được ăn!' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g9-u7-q1',
        type: 'multiple-choice',
        question: 'Từ nào mang nghĩa "rắc một nhúm gia vị (muối/tiêu) lên trên món ăn"?',
        options: ['Sprinkle', 'Boil', 'Puree'],
        correctIndex: 0,
        explanation: '"Sprinkle" là rắc (muối, hạt tiêu...).',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 8
  {
    id: 'unit-g9-u8',
    unitNumber: 8,
    title: 'Tourism & Responsible Travel',
    themeVi: 'Du lịch bền vững & Mạo từ A, AN, THE',
    themeIcon: '✈️',
    grade: 9,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Các loại hình du lịch (eco-tourism, backpacking, package tour, homestay, excursion). Quy tắc sử dụng mạo từ A, AN, THE và Zero Article trong ngữ cảnh du lịch địa lý (tên đại dương, dãy núi, đất nước, danh lam).',
    vocabularies: [
      { id: 'g9-u8-w1', word: 'Ecotourism', ipa: '/ˈiːkəʊtʊərɪzəm/', partOfSpeech: 'noun', meaningVi: 'Du lịch sinh thái có trách nhiệm', exampleEn: 'Ecotourism benefits local indigenous communities and preserves nature.', exampleVi: 'Du lịch sinh thái mang lại lợi ích cho cộng đồng bản địa và bảo vệ thiên nhiên.', isCore: true, unitId: 'unit-g9-u8', grade: 9 },
      { id: 'g9-u8-w2', word: 'Homestay', ipa: '/ˈhəʊmsteɪ/', partOfSpeech: 'noun', meaningVi: 'Ở cùng nhà người dân bản địa', exampleEn: 'Staying at a homestay allows deep cultural immersion.', exampleVi: 'Nghỉ tại homestay giúp trải nghiệm văn hóa bản địa sâu sắc.', isCore: true, unitId: 'unit-g9-u8', grade: 9 },
      { id: 'g9-u8-w3', word: 'Breathtaking', ipa: '/ˈbreθteɪkɪŋ/', partOfSpeech: 'adjective', meaningVi: 'Ngoạn mục, đẹp đến nín thở', exampleEn: 'The sunset over Phu Quoc is breathtaking.', exampleVi: 'Hoàng hôn trên đảo ngọc Phú Quốc đẹp đến nao lòng.', isCore: true, unitId: 'unit-g9-u8', grade: 9 },
      { id: 'g9-u8-w4', word: 'Sustainable', ipa: '/səˈsteɪnəbl/', partOfSpeech: 'adjective', meaningVi: 'Bền vững, không phá hoại cảnh quan', exampleEn: 'Sustainable tourism preserves pristine beaches.', exampleVi: 'Du lịch bền vững giúp giữ gìn những bãi biển nguyên sơ.', isCore: true, unitId: 'unit-g9-u8', grade: 9 },
    ],
    grammar: {
      id: 'g9-u8-gram',
      title: 'Quy tắc Mạo từ (A, AN, THE, Zero Article) nâng cao trong Địa lý & Du lịch',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Guide: "We crossed the Red River, hiked through the Himalayas, but visited Vietnam and Mount Fansipan without \'the\'."',
        highlights: ['the Red River', 'the Himalayas', 'Vietnam', 'Mount Fansipan'],
        explanationFriendly: 'DÙNG THE: sông (the Red River), biển/đại dương (the Pacific Ocean), dãy núi số nhiều (the Alps, the Himalayas), sa mạc (the Sahara), nước có United/Republic (the UK, the USA). KHÔNG DÙNG THE (Zero article): ngọn núi đơn lẻ (Mount Everest, Mount Fansipan), tên quốc gia số ít (Vietnam, Japan), hồ đơn lẻ (West Lake).',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'THE: Sông, biển, dãy núi số nhiều, quốc gia liên bang. ZERO ARTICLE: Hồ đơn, đỉnh núi đơn lẻ, hầu hết quốc gia.',
        formulaItems: [
          { label: 'Dùng THE', structure: 'The + [River / Sea / Mountain range]', example: 'The Mekong River, The Truong Son Mountains' },
          { label: 'Zero article', structure: 'Ø + [Country / Single mountain / Lake]', example: 'We visited Vietnam and climbed Mount Fansipan.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g9-u8-ex1',
          level: 'nhan-biet',
          question: 'We took a boat cruise on _______ Mekong River during our trip to the South.',
          options: ['the', 'a', 'Ø (no article)'],
          correctIndex: 0,
          explanationVi: 'Trước tên các con sông luôn dùng mạo từ xác định "the": the Mekong River.',
        },
      ],
    },
    sentencePattern: {
      id: 'g9-u8-sp',
      frame: 'Instead of mass tourism, we should promote [sustainableTravel] in [destination] to protect [localValue].',
      slots: [
        { slotName: 'sustainableTravel', options: ['eco-friendly community homestays', 'low-impact trekking tours', 'cultural heritage walks'] },
        { slotName: 'destination', options: ['Cat Ba National Park', 'Sapa valleys', 'Con Dao marine reserve'] },
        { slotName: 'localValue', options: ['delicate wildlife ecosystems', 'authentic traditional customs', 'pristine coral reefs'] },
      ],
      contextVi: 'Chiến dịch "Du lịch văn minh - Để lại dấu chân xanh".',
      sampleDialogue: {
        speakerA: 'How can travelers practice responsible ecotourism?',
        lineA: 'What should we avoid?',
        speakerB: 'Never purchase souvenirs made from endangered coral or wild animal parts.',
        lineB: 'Support local artisans directly and carry reusable water bottles.',
      },
      substitutionDrills: [
        { prompt: 'Nói đỉnh Phan Xi Păng là ngọn núi cao nhất Đông Dương:', expectedPattern: 'Mount Fansipan is the highest mountain in Indochina.', cueWords: ['Mount Fansipan', 'highest mountain in Indochina'] },
      ],
    },
    realLife: [
      {
        id: 'g9-u8-rl',
        title: 'Hành trình khám phá văn hóa bản địa Sa Pa',
        roleA: 'Người du lịch trẻ',
        roleB: 'Chủ nhà homestay',
        exchanges: [
          { speaker: 'Khách', lineEn: 'Thank you for cooking with organic vegetables picked straight from your garden!', lineVi: 'Cảm ơn bác đã chiêu đãi những món rau hữu cơ tươi ngon hái ngay từ vườn nhà!' },
          { speaker: 'Chủ nhà', lineEn: 'Welcoming kind guests who respect our way of life is always a joy for our village.', lineVi: 'Được đón tiếp những vị khách quý biết trân trọng nếp sống bản địa luôn là niềm vui lớn của bản làng chúng tôi.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g9-u8-q1',
        type: 'multiple-choice',
        question: 'Trước tên ngọn núi đơn lẻ "Mount Everest", có dùng mạo từ "the" không?',
        options: ['Không, dùng Ø Mount Everest', 'Có, bắt buộc the Mount Everest', 'Dùng an Mount Everest'],
        correctIndex: 0,
        explanation: 'Trước đỉnh núi đơn lẻ (Mount...) không dùng mạo từ "the".',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 9
  {
    id: 'unit-g9-u9',
    unitNumber: 9,
    title: 'World Englishes & Relative Clauses',
    themeVi: 'Tiếng Anh toàn cầu & Mệnh đề quan hệ',
    themeIcon: '🗺️',
    grade: 9,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Sự phong phú của tiếng Anh thế giới (British English, American English, Australian English, accents, dialects, loan words). Mệnh đề quan hệ xác định và không xác định (Defining & Non-defining Relative Clauses với Who, Whom, Which, That, Whose, Where, When).',
    vocabularies: [
      { id: 'g9-u9-w1', word: 'Dialect', ipa: '/ˈdaɪəlekt/', partOfSpeech: 'noun', meaningVi: 'Phương ngữ, tiếng địa phương', exampleEn: 'English has numerous regional dialects across continents.', exampleVi: 'Tiếng Anh có rất nhiều phương ngữ theo từng vùng miền khắp các châu lục.', isCore: true, unitId: 'unit-g9-u9', grade: 9 },
      { id: 'g9-u9-w2', word: 'Bilingual', ipa: '/ˌbaɪˈlɪŋɡwəl/', partOfSpeech: 'adjective', meaningVi: 'Song ngữ (nói thành thạo 2 ngôn ngữ)', exampleEn: 'Being bilingual opens up diverse international careers.', exampleVi: 'Biết song ngữ mở ra nhiều cơ hội nghề nghiệp quốc tế đa dạng.', isCore: true, unitId: 'unit-g9-u9', grade: 9 },
      { id: 'g9-u9-w3', word: 'Intonation', ipa: '/ˌɪntəˈneɪʃn/', partOfSpeech: 'noun', meaningVi: 'Ngữ điệu lên xuống khi nói', exampleEn: 'Natural intonation conveys nuanced emotion.', exampleVi: 'Ngữ điệu tự nhiên truyền tải cảm xúc tinh tế của lời nói.', isCore: true, unitId: 'unit-g9-u9', grade: 9 },
      { id: 'g9-u9-w4', word: 'Global language', ipa: '/ˈɡləʊbl ˈlæŋɡwɪdʒ/', partOfSpeech: 'phrase', meaningVi: 'Ngôn ngữ toàn cầu (công cụ kết nối thế giới)', exampleEn: 'English functions as the primary global language of science.', exampleVi: 'Tiếng Anh đóng vai trò là ngôn ngữ toàn cầu chủ đạo của khoa học.', isCore: true, unitId: 'unit-g9-u9', grade: 9 },
    ],
    grammar: {
      id: 'g9-u9-gram',
      title: 'Mệnh đề quan hệ (Relative Clauses: WHO, WHOM, WHICH, THAT, WHOSE, WHERE)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Linguist: "The student who won the English olympiad studies two hours a day. Shakespeare, whose plays are famous worldwide, enriched the English vocabulary."',
        highlights: ['who won the English olympiad', 'whose plays are famous worldwide'],
        explanationFriendly: 'WHO (người - chủ ngữ), WHOM (người - tân ngữ), WHICH (vật), THAT (người hoặc vật trong mệnh đề xác định), WHOSE (sở hữu), WHERE (nơi chốn). Mệnh đề KHÔNG xác định (có dấu phẩy ngăn cách) KHÔNG ĐƯỢC DÙNG "THAT".',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'WHO (chỉ người) | WHICH (chỉ vật) | WHOSE (sở hữu) | THAT (thay cho who/which trong MĐ xác định, không đi sau dấu phẩy).',
        formulaItems: [
          { label: 'Chỉ người', structure: 'N(person) + WHO + Verb', example: 'The teacher who taught me English is inspiring.' },
          { label: 'Chỉ vật', structure: 'N(thing) + WHICH / THAT + S + V', example: 'This is the dictionary which I consult daily.' },
          { label: 'Chỉ sở hữu', structure: 'N + WHOSE + Noun + V', example: 'The boy whose father is an author speaks five languages.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g9-u9-ex1',
          level: 'nhan-biet',
          question: 'The professor _______ lectures on world literature is loved by all students.',
          options: ['who', 'which', 'whom'],
          correctIndex: 0,
          explanationVi: 'Đại từ quan hệ làm chủ ngữ chỉ người (The professor) dùng "who".',
        },
      ],
    },
    sentencePattern: {
      id: 'g9-u9-sp',
      frame: 'English is a global language [relativeClause], which allows learners to [internationalGoal].',
      slots: [
        { slotName: 'relativeClause', options: ['which connects over a billion people worldwide', 'whose vocabulary absorbs words from hundreds of cultures', 'that empowers young generations to innovate'] },
        { slotName: 'internationalGoal', options: ['access world-class knowledge repositories', 'collaborate across national frontiers', 'express Vietnamese cultural identity with pride'] },
      ],
      contextVi: 'Hội thảo phương pháp hội nhập ngôn ngữ quốc tế cho thanh niên thế hệ Z.',
      sampleDialogue: {
        speakerA: 'Is American English very different from British English?',
        lineA: 'Which one should we follow?',
        speakerB: 'There are minor differences in spelling (color vs colour) and vocabulary, but both are fully mutually intelligible.',
        lineB: 'The ultimate aim of English is clear, confident communication.',
      },
      substitutionDrills: [
        { prompt: 'Dùng mệnh đề quan hệ nối hai câu: Cô giáo đã dạy tôi phát âm. Cô ấy rất kiên nhẫn:', expectedPattern: 'The teacher who taught me pronunciation was very patient.', cueWords: ['teacher who taught me', 'was very patient'] },
      ],
    },
    realLife: [
      {
        id: 'g9-u9-rl',
        title: 'Tự tin thuyết trình về đất nước Việt Nam trước bạn bè năm châu',
        roleA: 'Học sinh Việt Nam',
        roleB: 'Đoàn đại biểu thanh niên quốc tế',
        exchanges: [
          { speaker: 'Học sinh', lineEn: 'Welcome to Vietnam, a peaceful land whose history and hospitality will capture your hearts!', lineVi: 'Chào mừng các bạn đến với Việt Nam, một đất nước thanh bình mà lịch sử hào hùng và lòng hiếu khách sẽ chinh phục trái tim các bạn!' },
          { speaker: 'Đại biểu', lineEn: 'Your English is articulate, vivid and inspiring. We are delighted to be here!', lineVi: 'Tiếng Anh của bạn thật lưu loát, truyền cảm và lôi cuốn. Chúng tôi vô cùng vinh hạnh được có mặt tại đây!' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g9-u9-q1',
        type: 'multiple-choice',
        question: 'Trong mệnh đề quan hệ có dấu phẩy (non-defining), có được dùng đại từ "THAT" không?',
        options: ['Tuyệt đối không được dùng THAT sau dấu phẩy', 'Được dùng bình thường', 'Chỉ dùng khi chỉ người'],
        correctIndex: 0,
        explanation: 'Quy tắc ngữ pháp: Không bao giờ dùng "that" trong mệnh đề quan hệ không xác định (sau dấu phẩy).',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 10
  {
    id: 'unit-g9-u10',
    unitNumber: 10,
    title: 'Space Exploration & Second Conditionals',
    themeVi: 'Khám phá vũ trụ & Câu điều kiện loại 2',
    themeIcon: '🪐',
    grade: 9,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Thám hiểm vũ trụ và các hành tinh (ISS space station, microgravity, astronaut, Mars rover, orbit, solar system, extraterrestrial life). Câu điều kiện loại 2 (Second Conditional: IF + S + V2/past subjunctive, S + would/could + V-inf) cho tình huống giả định không có thật ở hiện tại.',
    vocabularies: [
      { id: 'g9-u10-w1', word: 'Astronaut', ipa: '/ˈæstrənɔːt/', partOfSpeech: 'noun', meaningVi: 'Phi hành gia vũ trụ', exampleEn: 'Pham Tuan was the first Vietnamese astronaut in space.', exampleVi: 'Phạm Tuân là phi hành gia Việt Nam đầu tiên bay vào vũ trụ.', isCore: true, unitId: 'unit-g9-u10', grade: 9 },
      { id: 'g9-u10-w2', word: 'Microgravity', ipa: '/ˌmaɪkrəʊˈɡrævəti/', partOfSpeech: 'noun', meaningVi: 'Môi trường vi trọng lực (không trọng lượng)', exampleEn: 'Astronauts float effortlessly in microgravity.', exampleVi: 'Các phi hành gia bồng bềnh nhẹ nhàng trong môi trường vi trọng lực.', isCore: true, unitId: 'unit-g9-u10', grade: 9 },
      { id: 'g9-u10-w3', word: 'Space station', ipa: '/speɪs ˈsteɪʃn/', partOfSpeech: 'noun', meaningVi: 'Trạm không gian vũ trụ quốc tế (ISS)', exampleEn: 'Scientists conduct biology experiments on the International Space Station.', exampleVi: 'Các nhà khoa học tiến hành thí nghiệm sinh học trên Trạm vũ trụ quốc tế.', isCore: true, unitId: 'unit-g9-u10', grade: 9 },
      { id: 'g9-u10-w4', word: 'Extraterrestrial', ipa: '/ˌekstrətəˈrestriəl/', partOfSpeech: 'adjective', meaningVi: 'Ngoài Trái Đất, thuộc không gian ngoài', exampleEn: 'Rovers search for signs of past extraterrestrial microbial life on Mars.', exampleVi: 'Tàu thám hiểm tìm kiếm dấu vết vi sinh vật ngoài Trái Đất trên Sao Hỏa.', isCore: true, unitId: 'unit-g9-u10', grade: 9 },
    ],
    grammar: {
      id: 'g9-u10-gram',
      title: 'Câu điều kiện loại 2 (Second Conditional: Giả định trái ngược hiện tại)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Astronomer: "If I had the chance to travel to Mars, I would gladly board the rocket. If there were water on that moon, life could exist."',
        highlights: ['If I had the chance', 'I would gladly board', 'If there were water', 'life could exist'],
        explanationFriendly: 'Dùng để diễn tả một điều kiện GIẢ ĐỊNH, KHÔNG CÓ THẬT hoặc KHÔNG THỂ XẢY RA ở hiện tại. Cấu trúc: IF + S + V2/ed (To be chia là WERE cho mọi ngôi), S + WOULD / COULD + V-nguyên mẫu. Ví dụ: If I were you, I would study harder.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'IF-clause: Past Simple (To be = were) | MAIN-clause: S + would / could / might + V-infinitive.',
        formulaItems: [
          { label: 'Giả định hiện tại', structure: 'If + S + V-ed / were, S + would + V-inf', example: 'If I were an astronaut, I would fly to Saturn.' },
          { label: 'Khả năng giả định', structure: 'If + S + V-ed, S + could + V-inf', example: 'If humans lived on Mars, we could grow plants in domes.' },
          { label: 'Lời khuyên', structure: 'If I were you, I would + V-inf', example: 'If I were you, I would take that science course.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g9-u10-ex1',
          level: 'nhan-biet',
          question: 'If I _______ (be) weightless in space, I _______ (somersault) through the cabin.',
          options: ['were / would somersault', 'am / will somersault', 'was / somersaulted'],
          correctIndex: 0,
          explanationVi: 'Câu điều kiện loại 2: Mệnh đề If dùng "were", mệnh đề chính dùng "would + V-inf".',
        },
      ],
    },
    sentencePattern: {
      id: 'g9-u10-sp',
      frame: 'If I had the opportunity to [spaceMission], I would [explorationGoal].',
      slots: [
        { slotName: 'spaceMission', options: ['work on the International Space Station', 'join a manned mission to Mars', 'look at Earth from lunar orbit'] },
        { slotName: 'explorationGoal', options: ['gaze at our blue home planet with profound gratitude', 'conduct experiments on crystal growth in zero gravity', 'search for clues about the origins of the cosmos'] },
      ],
      contextVi: 'Hội nghị thiên văn học trẻ: Khát vọng chinh phục những chân trời mới.',
      sampleDialogue: {
        speakerA: 'What would you do if you were chosen for a space expedition to the Moon?',
        lineA: 'Would you be afraid?',
        speakerB: 'If I were selected, I would be nervous yet ecstatic. Looking back at Earth from space gives you a cosmic perspective.',
        lineB: 'You realize how fragile and precious our single planet is.',
      },
      substitutionDrills: [
        { prompt: 'Dùng câu điều kiện loại 2: Nếu tôi là bạn, tôi sẽ đọc thêm nhiều sách về thiên văn học:', expectedPattern: 'If I were you, I would read more books on astronomy.', cueWords: ['If I were you', 'would read more books'] },
      ],
    },
    realLife: [
      {
        id: 'g9-u10-rl',
        title: 'Ngắm nhìn Trái Đất xanh từ trạm vũ trụ và ý thức bảo vệ hành tinh',
        roleA: 'Phi hành gia trở về',
        roleB: 'Học sinh phỏng vấn',
        exchanges: [
          { speaker: 'Học sinh', lineEn: 'What is the most touching feeling when viewing Earth from the stars?', lineVi: 'Cảm xúc rung động nhất khi ngắm nhìn Trái Đất từ giữa muôn vì sao là gì ạ thưa bác?' },
          { speaker: 'Phi hành gia', lineEn: 'From above, you see no political borders, only a glowing blue marble enveloped by thin atmosphere. We must unite to protect our only oasis.', lineVi: 'Nhìn từ trên cao, không có đường biên giới phân chia, chỉ có một viên ngọc xanh lấp lánh được bao bọc bởi bầu khí quyển mỏng manh. Chúng ta phải đoàn kết một lòng để bảo vệ ốc đảo duy nhất này.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g9-u10-q1',
        type: 'multiple-choice',
        question: 'Ai là người Việt Nam đầu tiên bay vào vũ trụ (năm 1980)?',
        options: ['Trung tướng Phạm Tuân', 'Nguyễn Du', 'Trần Hưng Đạo'],
        correctIndex: 0,
        explanation: 'Anh hùng LLVTND Phạm Tuân là người Việt Nam và châu Á đầu tiên bay vào vũ trụ (chuyến bay Soyuz 37 năm 1980).',
        competencyLevel: 'nhan-biet',
      },
    ],
  },
];
