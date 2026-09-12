import { UnitData } from '../../types';

export const GRADE_8_UNITS: UnitData[] = [
  // Unit 1
  {
    id: 'unit-g8-u1',
    unitNumber: 1,
    title: 'Leisure Time & Hobbies',
    themeVi: 'Thời gian rảnh rỗi & Động từ chỉ cảm xúc',
    themeIcon: '🛹',
    grade: 8,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Các hoạt động giải trí (making DIY crafts, hanging out with friends, surfing the net, playing sports). Động từ chỉ yêu thích theo sau bởi to-V hoặc V-ing (like, love, hate, prefer).',
    vocabularies: [
      { id: 'g8-u1-w1', word: 'Leisure', ipa: '/ˈleʒər/', partOfSpeech: 'noun', meaningVi: 'Thời gian nhàn rỗi, giải trí', exampleEn: 'How do you spend your leisure time on weekends?', exampleVi: 'Bạn dành thời gian rảnh rỗi cuối tuần như thế nào?', isCore: true, unitId: 'unit-g8-u1', grade: 8 },
      { id: 'g8-u1-w2', word: 'DIY', ipa: '/ˌdiː aɪ ˈwaɪ/', partOfSpeech: 'noun', meaningVi: 'Đồ tự làm (Do It Yourself - tự tay chế tác)', exampleEn: 'She loves doing DIY projects with recycled wood.', exampleVi: 'Cô ấy thích làm các dự án tự chế bằng gỗ tái chế.', isCore: true, unitId: 'unit-g8-u1', grade: 8 },
      { id: 'g8-u1-w3', word: 'Hang out', ipa: '/hæŋ aʊt/', partOfSpeech: 'phrase', meaningVi: 'Đi chơi, tụ tập bạn bè thư giãn', exampleEn: 'Teens often hang out at the local coffee shop.', exampleVi: 'Các bạn thanh thiếu niên thường tụ tập ở quán cà phê.', isCore: true, unitId: 'unit-g8-u1', grade: 8 },
      { id: 'g8-u1-w4', word: 'Addicted', ipa: '/əˈdɪktɪd/', partOfSpeech: 'adjective', meaningVi: 'Bị nghiện, ham mê quá mức (addicted to)', exampleEn: 'Avoid being addicted to social media scrolling.', exampleVi: 'Tránh việc nghiện lướt mạng xã hội quá nhiều.', isCore: true, unitId: 'unit-g8-u1', grade: 8 },
    ],
    grammar: {
      id: 'g8-u1-gram',
      title: 'Verbs of Liking: Phân biệt V-ing và To-Infinitive',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Trang: "I like making DIY paper flowers, but today I prefer to finish my painting."',
        highlights: ['like making', 'prefer to finish'],
        explanationFriendly: 'Các động từ like, love, hate, prefer có thể đi với cả V-ing (nhấn mạnh sở thích lâu dài theo thói quen) hoặc To-V (nhấn mạnh sự lựa chọn trong một tình huống cụ thể). Nhưng enjoy, fancy, adore, detest CHỈ ĐI VỚI V-ING.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Like/love/hate/prefer + V-ing OR to-V. Enjoy/fancy/adore/detest/mind + ONLY V-ing.',
        formulaItems: [
          { label: 'Cả 2 dạng', structure: 'S + like/love/hate/prefer + V-ing / to-V', example: 'I like reading / to read novels.' },
          { label: 'Chỉ V-ing', structure: 'S + enjoy/fancy/detest + V-ing', example: 'She fancies skateboarding.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g8-u1-ex1',
          level: 'nhan-biet',
          question: 'Do you fancy _______ (go) to the cinema with us tonight?',
          options: ['going', 'to go', 'go'],
          correctIndex: 0,
          explanationVi: 'Sau "fancy" bắt buộc dùng V-ing: going.',
        },
      ],
    },
    sentencePattern: {
      id: 'g8-u1-sp',
      frame: 'In my spare time, I am fond of [leisureActivity] because [personalGrowth].',
      slots: [
        { slotName: 'leisureActivity', options: ['making DIY handicrafts', 'skateboarding with friends', 'learning graphic design', 'cooking traditional pastries'] },
        { slotName: 'personalGrowth', options: ['it stimulates my creativity', 'it keeps me physically active', 'it offers a sense of accomplishment'] },
      ],
      contextVi: 'Phỏng vấn kỹ năng cân bằng giữa việc học và giải trí của thanh thiếu niên.',
      sampleDialogue: {
        speakerA: 'How do you keep a healthy balance between study and relaxation?',
        lineA: 'Do you have time for hobbies?',
        speakerB: 'I set aside an hour every evening for DIY origami and acoustic guitar.',
        lineB: 'It resets my mind completely for the next school day.',
      },
      substitutionDrills: [
        { prompt: 'Nói em thích chế tác đồ thủ công hơn là lướt mạng xã hội:', expectedPattern: 'I prefer making handicrafts to scrolling social media.', cueWords: ['prefer making handicrafts to', 'scrolling social media'] },
      ],
    },
    realLife: [
      {
        id: 'g8-u1-rl',
        title: 'Hội thảo thanh thiếu niên về việc quản lý thời gian rảnh',
        roleA: 'Diễn giả tâm lý',
        roleB: 'Học sinh lớp 8',
        exchanges: [
          { speaker: 'Diễn giả', lineEn: 'Active leisure fuels genuine joy, while passive screen addiction drains your energy.', lineVi: 'Thời gian rảnh chủ động nuôi dưỡng niềm vui đích thực, trong khi nghiện màn hình thụ động sẽ vắt kiệt năng lượng của các em.' },
          { speaker: 'Học sinh', lineEn: 'Thank you! I will replace two hours of mindless scrolling with badminton and reading.', lineVi: 'Cảm ơn thầy! Em sẽ thay thế hai tiếng lướt mạng vô bổ bằng việc đánh cầu lông và đọc sách.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g8-u1-q1',
        type: 'multiple-choice',
        question: 'Chọn câu dùng sai ngữ pháp:',
        options: ['She enjoys to cook Italian food.', 'She enjoys cooking Italian food.', 'She likes to cook Italian food.'],
        correctIndex: 0,
        explanation: '"Enjoy" không bao giờ đi với "to-V", chỉ đi với V-ing.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 2
  {
    id: 'unit-g8-u2',
    unitNumber: 2,
    title: 'Life in the Countryside',
    themeVi: 'Cuộc sống miền quê & So sánh hơn của trạng từ',
    themeIcon: '🌾',
    grade: 8,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Vẻ đẹp và nhịp sống thanh bình nơi thôn dã (vast paddy fields, harvest time, hospitable villagers, cattle grazing). So sánh hơn của trạng từ (Comparative Adverbs: more + adv + than / short adv-er + than).',
    vocabularies: [
      { id: 'g8-u2-w1', word: 'Paddy field', ipa: '/ˈpædi fiːld/', partOfSpeech: 'noun', meaningVi: 'Cánh đồng lúa chín vàng', exampleEn: 'Golden paddy fields stretch as far as the eye can see.', exampleVi: 'Những cánh đồng lúa chín vàng trải dài tít tắp đến tận chân trời.', isCore: true, unitId: 'unit-g8-u2', grade: 8 },
      { id: 'g8-u2-w2', word: 'Harvest time', ipa: '/ˈhɑːvɪst taɪm/', partOfSpeech: 'noun', meaningVi: 'Mùa gặt, mùa thu hoạch nông sản', exampleEn: 'Villagers work diligently during harvest time.', exampleVi: 'Bà con nông dân làm việc cần mẫn trong những ngày mùa gặt.', isCore: true, unitId: 'unit-g8-u2', grade: 8 },
      { id: 'g8-u2-w3', word: 'Hospitable', ipa: '/hɒˈspɪtəbl/', partOfSpeech: 'adjective', meaningVi: 'Hiếu khách, nồng hậu đón tiếp', exampleEn: 'Rural folks are exceedingly warm and hospitable.', exampleVi: 'Người dân quê vô cùng ấm áp và hiếu khách.', isCore: true, unitId: 'unit-g8-u2', grade: 8 },
      { id: 'g8-u2-w4', word: 'Vast', ipa: '/vɑːst/', partOfSpeech: 'adjective', meaningVi: 'Bao la, rộng lớn bát ngát', exampleEn: 'The vast blue sky above the plains looks breathtaking.', exampleVi: 'Bầu trời xanh bao la phía trên đồng bằng trông thật choáng ngợp.', isCore: true, unitId: 'unit-g8-u2', grade: 8 },
    ],
    grammar: {
      id: 'g8-u2-gram',
      title: 'So sánh hơn của Trạng từ (Comparative Forms of Adverbs)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Khang: "Farmers in our village work harder and get up earlier than city office workers during harvest."',
        highlights: ['work harder', 'get up earlier'],
        explanationFriendly: 'Trạng từ ngắn (1 âm tiết): Adv + -er + THAN (fast -> faster, hard -> harder, early -> earlier). Trạng từ dài (2 âm tiết tận cùng -ly): MORE + Adv + THAN (more quietly, more peacefully, more skillfully). Bất quy tắc: well -> better, badly -> worse.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Short Adv: Adv + -er + than. Long Adv (-ly): more + Adv + than.',
        formulaItems: [
          { label: 'Trạng từ ngắn', structure: 'S1 + V + Adv-er + than + S2', example: 'A horse runs faster than a buffalo.' },
          { label: 'Trạng từ dài (-ly)', structure: 'S1 + V + more + Adv + than + S2', example: 'Life moves more slowly in villages.' },
          { label: 'Bất quy tắc', structure: 'well -> better | badly -> worse', example: 'He speaks English better than before.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g8-u2-ex1',
          level: 'nhan-biet',
          question: 'In the countryside, people live _______ (peacefully) than in crowded industrial cities.',
          options: ['more peacefully', 'peacefulier', 'most peacefully'],
          correctIndex: 0,
          explanationVi: 'Trạng từ có đuôi -ly "peacefully" chuyển so sánh hơn thành "more peacefully than".',
        },
      ],
    },
    sentencePattern: {
      id: 'g8-u2-sp',
      frame: 'In the countryside, people [verb] [comparativeAdverb] than in bustling urban cities.',
      slots: [
        { slotName: 'verb', options: ['greet each other', 'breathe fresh air', 'work together', 'sleep'] },
        { slotName: 'comparativeAdverb', options: ['more warmly', 'more deeply', 'more cooperatively', 'more soundly'] },
      ],
      contextVi: 'Hồi ức về những kỳ nghỉ hè ý nghĩa ở quê nhà.',
      sampleDialogue: {
        speakerA: 'What makes countryside life appealing to you?',
        lineA: 'Isn\'t it too quiet?',
        speakerB: 'Not at all. Life moves more gently there. People treat each other more genuinely than in fast-paced cities.',
        lineB: 'The fresh air clears your lungs instantly.',
      },
      substitutionDrills: [
        { prompt: 'Nói những người nông dân làm việc chăm chỉ hơn trong mùa gặt lúa:', expectedPattern: 'The farmers work harder during the rice harvest season.', cueWords: ['work harder', 'rice harvest season'] },
      ],
    },
    realLife: [
      {
        id: 'g8-u2-rl',
        title: 'Trải nghiệm một ngày làm nông dân nhí gặt lúa',
        roleA: 'Học sinh trải nghiệm',
        roleB: 'Bác nông dân',
        exchanges: [
          { speaker: 'Học sinh', lineEn: 'I now understand how tirelessly you work to produce each grain of rice!', lineVi: 'Giờ thì cháu đã hiểu các bác đã làm việc không mệt mỏi thế nào để làm ra từng hạt gạo thơm!' },
          { speaker: 'Bác nông dân', lineEn: 'Sweat on the soil turns into sweet bread and fragrant rice, dear child.', lineVi: 'Mồ hôi đổ trên luống cày sẽ hóa thành những hạt ngọc trời thơm lành con ạ.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g8-u2-q1',
        type: 'multiple-choice',
        question: 'Dạng so sánh hơn của trạng từ "early" là:',
        options: ['earlier', 'more early', 'earlyer'],
        correctIndex: 0,
        explanation: 'Early đổi y thành i rồi thêm -er: earlier.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 3
  {
    id: 'unit-g8-u3',
    unitNumber: 3,
    title: 'Teenagers & Overcoming Challenges',
    themeVi: 'Tuổi thanh thiếu niên & Câu ghép',
    themeIcon: '📱',
    grade: 8,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Áp lực học tập và đời sống tuổi dậy thì (peer pressure, exam stress, cyberbullying, school clubs, teamwork). Câu ghép (Compound Sentences) với liên từ FANBOYS (For, And, Nor, But, Or, Yet, So) và trạng từ liên kết (however, therefore, moreover).',
    vocabularies: [
      { id: 'g8-u3-w1', word: 'Peer pressure', ipa: '/ˈpɪə preʃər/', partOfSpeech: 'noun', meaningVi: 'Áp lực đồng trang lứa', exampleEn: 'Learn to say no to negative peer pressure.', exampleVi: 'Hãy học cách nói không trước áp lực tiêu cực từ bạn bè cùng lứa.', isCore: true, unitId: 'unit-g8-u3', grade: 8 },
      { id: 'g8-u3-w2', word: 'Counselor', ipa: '/ˈkaʊnsələr/', partOfSpeech: 'noun', meaningVi: 'Chuyên viên tư vấn tâm lý học đường', exampleEn: 'Talk to the school counselor if you feel overwhelmed.', exampleVi: 'Hãy trò chuyện với chuyên viên tư vấn học đường nếu em cảm thấy quá tải.', isCore: true, unitId: 'unit-g8-u3', grade: 8 },
      { id: 'g8-u3-w3', word: 'Therefore', ipa: '/ˈðeəfɔːr/', partOfSpeech: 'adverb', meaningVi: 'Vì vậy, do đó (trạng từ liên kết)', exampleEn: 'He prepared diligently; therefore, he aced the exam.', exampleVi: 'Bạn ấy đã chuẩn bị rất chu đáo; do đó, bạn ấy đạt điểm tuyệt đối.', isCore: true, unitId: 'unit-g8-u3', grade: 8 },
      { id: 'g8-u3-w4', word: 'Confident', ipa: '/ˈkɒnfɪdənt/', partOfSpeech: 'adjective', meaningVi: 'Tự tin, kiên định với giá trị bản thân', exampleEn: 'Stay confident in your unique strengths.', exampleVi: 'Hãy luôn tự tin vào những điểm mạnh riêng biệt của chính mình.', isCore: true, unitId: 'unit-g8-u3', grade: 8 },
    ],
    grammar: {
      id: 'g8-u3-gram',
      title: 'Câu ghép (Compound Sentences) & Trạng từ liên kết (Conjunctive Adverbs)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Linh: "Teenagers face high study pressure, yet they rarely open up. Therefore, schools should organize more mental health workshops."',
        highlights: ['yet', 'Therefore, schools should'],
        explanationFriendly: 'Câu ghép gồm 2 hoặc nhiều mệnh đề độc lập nối với nhau bằng: (1) Liên từ tọa độ FANBOYS (For, And, Nor, But, Or, Yet, So) có dấu phẩy đi trước; hoặc (2) Dấu chấm phẩy kèm trạng từ liên kết: ; however, / ; therefore, / ; moreover,.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Clause 1, [FANBOYS] Clause 2. HOẶC Clause 1; [therefore / however / moreover], Clause 2.',
        formulaItems: [
          { label: 'Liên từ Yet / But', structure: 'Clause 1, yet + Clause 2 (tương phản)', example: 'She felt anxious, yet she delivered a great speech.' },
          { label: 'Trạng từ Therefore', structure: 'Clause 1; therefore, Clause 2 (kết quả)', example: 'It rained heavily; therefore, the sports match was postponed.' },
          { label: 'Trạng từ Moreover', structure: 'Clause 1; moreover, Clause 2 (bổ sung)', example: 'He is smart; moreover, he is very modest.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g8-u3-ex1',
          level: 'nhan-biet',
          question: 'Minh studied hard for the test; _______, he achieved the highest mark in class.',
          options: ['therefore', 'however', 'but'],
          correctIndex: 0,
          explanationVi: 'Đứng sau dấu chấm phẩy và trước dấu phẩy chỉ kết quả nhân quả: therefore.',
        },
      ],
    },
    sentencePattern: {
      id: 'g8-u3-sp',
      frame: 'Teens often experience [challenge]; however, [solutionMethod].',
      slots: [
        { slotName: 'challenge', options: ['exam anxiety before midterms', 'peer pressure about trends', 'difficulty managing study schedules'] },
        { slotName: 'solutionMethod', options: ['talking to trusted mentors brings great relief', 'practicing daily mindfulness restores focus', 'joining sports clubs builds genuine friendships'] },
      ],
      contextVi: 'Diễn đàn tâm lý học đường: Lắng nghe và thấu hiểu tuổi mới lớn.',
      sampleDialogue: {
        speakerA: 'What should teens do when facing heavy study stress?',
        lineA: 'Keeping it inside is dangerous.',
        speakerB: 'They should confide in parents or teachers; moreover, regular sports help release dopamine and reduce tension.',
        lineB: 'Never be afraid to seek counseling.',
      },
      substitutionDrills: [
        { prompt: 'Dùng câu ghép với "yet": Bạn ấy cảm thấy lo lắng, nhưng bạn ấy vẫn dũng cảm hoàn thành bài thuyết trình:', expectedPattern: 'She felt anxious, yet she bravely completed her presentation.', cueWords: ['felt anxious, yet', 'bravely completed'] },
      ],
    },
    realLife: [
      {
        id: 'g8-u3-rl',
        title: 'Hộp thư "Điều em muốn nói" tại phòng tư vấn học đường',
        roleA: 'Học sinh gửi tâm sự',
        roleB: 'Chuyên viên tâm lý phản hồi',
        exchanges: [
          { speaker: 'Học sinh', lineEn: 'I feel pressured because my classmates seem better at everything than me.', lineVi: 'Em cảm thấy áp lực vì dường như các bạn trong lớp đều giỏi giang hơn em về mọi mặt.' },
          { speaker: 'Chuyên viên', lineEn: 'Every flower blooms in its own season. Compare yourself only to who you were yesterday.', lineVi: 'Mỗi bông hoa đều có mùa nở rộ của riêng mình. Hãy chỉ so sánh bản thân với chính em ngày hôm qua thôi nhé.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g8-u3-q1',
        type: 'multiple-choice',
        question: 'Từ nào mang nghĩa "hơn nữa, thêm vào đó" đứng sau dấu chấm phẩy?',
        options: ['Moreover', 'However', 'Therefore'],
        correctIndex: 0,
        explanation: '"Moreover" mang nghĩa bổ sung thông tin (hơn nữa).',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 4
  {
    id: 'unit-g8-u4',
    unitNumber: 4,
    title: 'Ethnic Groups of Vietnam',
    themeVi: 'Các dân tộc Việt Nam & Hệ thống câu hỏi',
    themeIcon: '👘',
    grade: 8,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Bản sắc 54 dân tộc anh em (stilt houses, communal house Rong, terraced fields, brocade weaving, musical instruments like gong and T\'rung). Đại từ nghi vấn và mạo từ (a, an, the).',
    vocabularies: [
      { id: 'g8-u4-w1', word: 'Stilt house', ipa: '/stɪlt haʊs/', partOfSpeech: 'noun', meaningVi: 'Nhà sàn truyền thống (tránh thú dữ và ngập)', exampleEn: 'The Tay and Thai people reside in well-crafted stilt houses.', exampleVi: 'Đồng bào Tày và Thái sinh sống trong những nếp nhà sàn vững chãi.', isCore: true, unitId: 'unit-g8-u4', grade: 8 },
      { id: 'g8-u4-w2', word: 'Terraced field', ipa: '/ˈterəst fiːld/', partOfSpeech: 'noun', meaningVi: 'Ruộng bậc thang uốn lượn kỳ vĩ', exampleEn: 'Mu Cang Chai terraced fields are national scenic monuments.', exampleVi: 'Ruộng bậc thang Mù Cang Chải là danh thắng quốc gia tuyệt mỹ.', isCore: true, unitId: 'unit-g8-u4', grade: 8 },
      { id: 'g8-u4-w3', word: 'Heritage', ipa: '/ˈherɪtɪdʒ/', partOfSpeech: 'noun', meaningVi: 'Di sản văn hóa dân tộc', exampleEn: 'Central Highlands Gong culture is a UNESCO intangible heritage.', exampleVi: 'Không gian văn hóa Cồng chiêng Tây Nguyên là di sản phi vật thể UNESCO.', isCore: true, unitId: 'unit-g8-u4', grade: 8 },
      { id: 'g8-u4-w4', word: 'Communal house', ipa: '/kəˈmjuːnl haʊs/', partOfSpeech: 'noun', meaningVi: 'Nhà rông, nhà sinh hoạt cộng đồng', exampleEn: 'Villagers gather in the towering Rong house for community meetings.', exampleVi: 'Dân làng tập trung tại nhà Rông cao vút để họp thôn bản.', isCore: true, unitId: 'unit-g8-u4', grade: 8 },
    ],
    grammar: {
      id: 'g8-u4-gram',
      title: 'Mạo từ (A, AN, THE & Zero Article) & Câu hỏi với Wh-words',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Guide: "There are 54 ethnic groups in Vietnam. The Kinh make up the largest percentage, while the Tay live in stilt houses."',
        highlights: ['54 ethnic groups', 'The Kinh', 'the largest percentage', 'stilt houses'],
        explanationFriendly: 'THE dùng trước tên nhóm dân tộc ở dạng số nhiều (the Kinh, the H\'mong, the Dao). THE cũng dùng trước so sánh nhất (the largest) và danh từ duy nhất. Danh từ số nhiều chỉ chung chung không dùng mạo từ (zero article).',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'THE + Ethnic group plural (The Thai, The Ede) | A/An: Danh từ số ít nhắc lần đầu | Zero article: Danh từ số nhiều nói chung.',
        formulaItems: [
          { label: 'Tên dân tộc', structure: 'The + [Tên dân tộc]', example: 'The Tay are the second largest group.' },
          { label: 'Nhắc lần đầu', structure: 'a/an + singular countable noun', example: 'They built a communal house.' },
          { label: 'Duy nhất / Xác định', structure: 'the + unique / specified noun', example: 'The moon shone over the mountain.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g8-u4-ex1',
          level: 'nhan-biet',
          question: '_______ Kinh account for about 85% of Vietnam\'s total population.',
          options: ['The', 'A', 'An'],
          correctIndex: 0,
          explanationVi: 'Trước tên gọi toàn thể một dân tộc dùng mạo từ xác định "The": The Kinh.',
        },
      ],
    },
    sentencePattern: {
      id: 'g8-u4-sp',
      frame: 'The [ethnicGroup] are famous for their [culturalFeature] and [traditionalCraft].',
      slots: [
        { slotName: 'ethnicGroup', options: ['Thai people', 'H\'mong people', 'Ede community', 'Cham people'] },
        { slotName: 'culturalFeature', options: ['Xoe dance', 'Pan-pipe festival', 'epic oral singing', 'Kate festival'] },
        { slotName: 'traditionalCraft', options: ['delicate brocade weaving', 'silver jewelry making', 'handicraft pottery'] },
      ],
      contextVi: 'Thuyết minh tại Bảo tàng Dân tộc học Việt Nam.',
      sampleDialogue: {
        speakerA: 'What is unique about the architecture of stilt houses in northwestern Vietnam?',
        lineA: 'Why are they elevated on tall posts?',
        speakerB: 'The raised floors protect people from wild predators and damp mountain ground.',
        lineB: 'The space underneath is used for weaving looms and storing farming tools.',
      },
      substitutionDrills: [
        { prompt: 'Nói cồng chiêng Tây Nguyên là di sản văn hóa thế giới được UNESCO công nhận:', expectedPattern: 'Central Highlands gongs are a UNESCO-recognized world cultural heritage.', cueWords: ['Central Highlands gongs', 'UNESCO-recognized'] },
      ],
    },
    realLife: [
      {
        id: 'g8-u4-rl',
        title: 'Giao lưu điệu múa Xòe hoa thắt chặt tình đoàn kết',
        roleA: 'Người con Tây Bắc',
        roleB: 'Du khách muôn phương',
        exchanges: [
          { speaker: 'Thiếu nữ Thái', lineEn: 'Join hands in the Xoe circle! The bigger the circle, the stronger our friendship.', lineVi: 'Hãy nắm tay nhau cùng bước vào vòng xòe! Vòng xòe càng rộng lớn, tình bạn của chúng ta càng thêm bền chặt.' },
          { speaker: 'Du khách', lineEn: 'The rhythm of the drums and welcoming smiles make me feel right at home.', lineVi: 'Nhịp trống rộn rã cùng những nụ cười nồng hậu khiến tôi cảm thấy ấm áp như đang ở chính nhà mình.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g8-u4-q1',
        type: 'multiple-choice',
        question: 'Việt Nam có bao nhiêu dân tộc anh em cùng chung sống hòa thuận?',
        options: ['54 ethnic groups', '52 ethnic groups', '50 ethnic groups'],
        correctIndex: 0,
        explanation: 'Việt Nam có 54 dân tộc anh em.',
        competencyLevel: 'nhan-biet',
      },
    ],
  },

  // Unit 5
  {
    id: 'unit-g8-u5',
    unitNumber: 5,
    title: 'Our Customs and Traditions',
    themeVi: 'Phong tục tập quán & Động từ chỉ bổn phận',
    themeIcon: '🍵',
    grade: 8,
    semester: 1,
    textbook: 'global-success',
    summaryVi: 'Phong tục tập quán Việt Nam (inviting elders before meals, respecting teachers, worshiping ancestors, table manners). Động từ khuyết thiếu: SHOULD / SHOULDN\'T (khuyên), HAVE TO / DON\'T HAVE TO (bắt buộc theo quy tắc/không cần thiết).',
    vocabularies: [
      { id: 'g8-u5-w1', word: 'Custom', ipa: '/ˈkʌstəm/', partOfSpeech: 'noun', meaningVi: 'Phong tục, thói quen văn hóa lâu đời', exampleEn: 'There is a custom of inviting elders before eating.', exampleVi: 'Có một phong tục đẹp là mời người lớn tuổi trước khi dùng bữa.', isCore: true, unitId: 'unit-g8-u5', grade: 8 },
      { id: 'g8-u5-w2', word: 'Respect', ipa: '/rɪˈspekt/', partOfSpeech: 'verb', meaningVi: 'Tôn kính, kính trọng bậc trưởng bối', exampleEn: 'We should always respect elderly people.', exampleVi: 'Chúng ta phải luôn luôn kính trọng người cao tuổi.', isCore: true, unitId: 'unit-g8-u5', grade: 8 },
      { id: 'g8-u5-w3', word: 'Have to', ipa: '/hæv tuː/', partOfSpeech: 'modal verb', meaningVi: 'Phải làm (bắt buộc do hoàn cảnh/quy định)', exampleEn: 'You have to take off your shoes before entering the pagoda.', exampleVi: 'Bạn phải cởi giày trước khi bước vào gian chùa.', isCore: true, unitId: 'unit-g8-u5', grade: 8 },
      { id: 'g8-u5-w4', word: 'Table manners', ipa: '/ˈteɪbl ˈmænəz/', partOfSpeech: 'noun', meaningVi: 'Phép lịch sự trong bữa ăn gia đình', exampleEn: 'Good table manners show filial piety and gratitude.', exampleVi: 'Phép lịch sự trong bữa ăn thể hiện lòng hiếu thảo và biết ơn.', isCore: true, unitId: 'unit-g8-u5', grade: 8 },
    ],
    grammar: {
      id: 'g8-u5-gram',
      title: 'Phân biệt SHOULD / SHOULDN\'T vs HAVE TO / DON\'T HAVE TO',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Mother: "You have to wash your hands before eating, and you should invite your grandparents politely."',
        highlights: ['have to wash', 'should invite'],
        explanationFriendly: 'HAVE TO: Bắt buộc từ quy định bên ngoài. DON\'T HAVE TO: Không bắt buộc (làm hay không tùy bạn). SHOULD: Lời khuyên nên làm (mang tính đạo đức, phép lịch sự).',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Have to: Bắt buộc | Don\'t have to: Không cần thiết | Should: Lời khuyên tốt | Shouldn\'t: Lời khuyên không nên.',
        formulaItems: [
          { label: 'Bắt buộc', structure: 'S + have to / has to + V-inf', example: 'Students have to wear uniforms on Mondays.' },
          { label: 'Không bắt buộc', structure: 'S + don\'t / doesn\'t have to + V-inf', example: 'You don\'t have to wake up early on Sundays.' },
          { label: 'Lời khuyên lịch sự', structure: 'S + should + V-inf', example: 'We should bow politely when greeting elders.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g8-u5-ex1',
          level: 'nhan-biet',
          question: 'In Vietnam, you _______ take off your hats when entering sacred temples.',
          options: ['have to', 'don\'t have to', 'shouldn\'t'],
          correctIndex: 0,
          explanationVi: 'Quy định tôn nghiêm tại đền chùa bắt buộc phải bỏ mũ: have to.',
        },
      ],
    },
    sentencePattern: {
      id: 'g8-u5-sp',
      frame: 'According to tradition, we [customAction] to show [virtue].',
      slots: [
        { slotName: 'customAction', options: ['invite older family members before eating', 'offer incense on death anniversaries', 'give flowers to our teachers on November 20th'] },
        { slotName: 'virtue', options: ['gratitude and filial devotion', 'deep respect for heritage', 'appreciation for education'] },
      ],
      contextVi: 'Giáo dục truyền thống hiếu đạo cho thế hệ trẻ.',
      sampleDialogue: {
        speakerA: 'What is the customary etiquette at a traditional Vietnamese dinner table?',
        lineA: 'Is there any special rule?',
        speakerB: 'The youngest members must invite all seniors before picking up their chopsticks.',
        lineB: 'It expresses gratitude to the elders who prepared the meal.',
      },
      substitutionDrills: [
        { prompt: 'Nói bạn không cần phải mang theo quà đắt tiền khi đến thăm nhà bạn thân:', expectedPattern: 'You don\'t have to bring expensive gifts when visiting a close friend.', cueWords: ['don\'t have to bring', 'expensive gifts'] },
      ],
    },
    realLife: [
      {
        id: 'g8-u5-rl',
        title: 'Bữa cơm sum họp gia đình ngày cuối tuần',
        roleA: 'Cháu nhỏ mời cơm',
        roleB: 'Ông bà mỉm cười',
        exchanges: [
          { speaker: 'Cháu', lineEn: 'We politely invite grandpa, grandma, mom and dad to enjoy dinner!', lineVi: 'Cháu kính mời ông bà, con mời bố mẹ cùng xơi cơm ạ!' },
          { speaker: 'Ông bà', lineEn: 'Good child! Polite words make the simple meal warmer than any feast.', lineVi: 'Cháu ngoan lắm! Lời mời lễ phép làm cho bữa cơm đạm bạc thêm ấm cúng hơn muôn phần đại tiệc.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g8-u5-q1',
        type: 'multiple-choice',
        question: 'Chọn câu diễn tả sự không bắt buộc (không cần làm nếu không muốn):',
        options: ['You don\'t have to finish all the soup if you are full.', 'You mustn\'t waste food.', 'You have to finish everything.'],
        correctIndex: 0,
        explanation: '"Don\'t have to" chỉ sự không bắt buộc.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 6 (Semester 2)
  {
    id: 'unit-g8-u6',
    unitNumber: 6,
    title: 'Lifestyles & First Conditionals',
    themeVi: 'Phong cách sống & Câu điều kiện loại 1',
    themeIcon: '⛺',
    grade: 8,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Các lối sống đa dạng trên thế giới (nomadic lifestyle, tribal culture, modern urban digital nomad). Câu điều kiện loại 1 (First Conditional: IF / UNLESS) diễn tả khả năng có thể xảy ra trong tương lai.',
    vocabularies: [
      { id: 'g8-u6-w1', word: 'Nomadic', ipa: '/nəʊˈmædɪk/', partOfSpeech: 'adjective', meaningVi: 'Du mục, nay đây mai đó theo đồng cỏ', exampleEn: 'Mongolian nomads lead a harmonious nomadic life.', exampleVi: 'Người du mục Mông Cổ có lối sống du mục hòa hợp với đất trời.', isCore: true, unitId: 'unit-g8-u6', grade: 8 },
      { id: 'g8-u6-w2', word: 'Unless', ipa: '/ənˈles/', partOfSpeech: 'conjunction', meaningVi: 'Trừ phi, nếu không (Unless = If... not)', exampleEn: 'Unless we protect grasslands, nomadic herding will disappear.', exampleVi: 'Trừ phi chúng ta bảo vệ thảo nguyên, nếu không nghề chăn thả du mục sẽ biến mất.', isCore: true, unitId: 'unit-g8-u6', grade: 8 },
      { id: 'g8-u6-w3', word: 'Circular yurt', ipa: '/ˈsɜːkjələr jɜːt/', partOfSpeech: 'noun', meaningVi: 'Lều bạt hình tròn của người du mục', exampleEn: 'A yurt can be assembled and dismantled in hours.', exampleVi: 'Một chiếc lều yurt có thể dựng lên hoặc tháo dỡ chỉ trong vài tiếng.', isCore: true, unitId: 'unit-g8-u6', grade: 8 },
      { id: 'g8-u6-w4', word: 'Sustainable', ipa: '/səˈsteɪnəbl/', partOfSpeech: 'adjective', meaningVi: 'Bền vững, không làm tổn hại tương lai', exampleEn: 'Zero-waste living promotes a sustainable future.', exampleVi: 'Lối sống không rác thải thúc đẩy một tương lai phát triển bền vững.', isCore: true, unitId: 'unit-g8-u6', grade: 8 },
    ],
    grammar: {
      id: 'g8-u6-gram',
      title: 'Câu điều kiện loại 1 (First Conditional with IF & UNLESS)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Elder: "If pasture lands dry up, herdsmen will move to higher valleys. Unless it rains soon, life will become tough."',
        highlights: ['If pasture lands dry up, herdsmen will move', 'Unless it rains soon, life will become tough'],
        explanationFriendly: 'Cấu trúc: IF + S + V(hiện tại đơn), S + will/won\'t + V-nguyên mẫu. Diễn tả điều kiện có thật ở hiện tại hoặc tương lai. UNLESS = IF NOT: Unless you study hard = If you don\'t study hard.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'IF-clause: Present Simple | MAIN-clause: Future Simple (S + will + V-inf). Unless = If... not.',
        formulaItems: [
          { label: 'Cấu trúc IF', structure: 'If + S + V(s/es), S + will + V-inf', example: 'If you work hard, you will succeed.' },
          { label: 'Cấu trúc UNLESS', structure: 'Unless + S + V(khẳng định), S + will/won\'t + V-inf', example: 'Unless we leave now, we will miss the train.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g8-u6-ex1',
          level: 'nhan-biet',
          question: 'If you _______ (exercise) daily, you will build robust stamina.',
          options: ['exercise', 'exercised', 'will exercise'],
          correctIndex: 0,
          explanationVi: 'Mệnh đề IF ở câu điều kiện loại 1 chia thì Hiện tại đơn: exercise.',
        },
      ],
    },
    sentencePattern: {
      id: 'g8-u6-sp',
      frame: 'If we embrace [sustainableHabit], we will [positiveImpact].',
      slots: [
        { slotName: 'sustainableHabit', options: ['a minimalist lifestyle', 'renewable solar power at home', 'organic vegetable gardening'] },
        { slotName: 'positiveImpact', options: ['reduce carbon footprint significantly', 'live healthier and happier', 'protect precious ecological balance'] },
      ],
      contextVi: 'Thảo luận về lối sống xanh bền vững của công dân toàn cầu.',
      sampleDialogue: {
        speakerA: 'What will happen if we continue to overuse single-use plastics?',
        lineA: 'Can our oceans survive?',
        speakerB: 'If we don\'t ban plastic bags now, marine ecosystems will collapse by 2050.',
        lineB: 'Unless everyone takes action today, tomorrow will be too late.',
      },
      substitutionDrills: [
        { prompt: 'Nói trừ khi chúng ta bảo vệ nguồn nước, chúng ta sẽ đối mặt với sự khan hiếm nghiêm trọng:', expectedPattern: 'Unless we protect water resources, we will face severe scarcity.', cueWords: ['Unless we protect', 'will face severe scarcity'] },
      ],
    },
    realLife: [
      {
        id: 'g8-u6-rl',
        title: 'Chiến dịch "Trường học không rác thải nhựa"',
        roleA: 'Học sinh tiên phong',
        roleB: 'Canteen trường',
        exchanges: [
          { speaker: 'Học sinh', lineEn: 'If everyone brings personal thermos bottles, our school will eliminate 1,000 plastic cups every single week!', lineVi: 'Nếu mỗi bạn đều tự mang bình giữ nhiệt cá nhân, trường mình sẽ loại bỏ được 1.000 cốc nhựa mỗi tuần!' },
          { speaker: 'Canteen', lineEn: 'We wholeheartedly support this! We will offer a discount for students bringing their own cups.', lineVi: 'Nhà trường ủng hộ hết mình! Canteen sẽ giảm giá cho tất cả các bạn tự mang cốc đựng.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g8-u6-q1',
        type: 'multiple-choice',
        question: 'Chọn câu tương đương với "If it doesn\'t rain, we will go camping":',
        options: ['Unless it rains, we will go camping.', 'Unless it doesn\'t rain, we will go camping.', 'If it rains, we will go camping.'],
        correctIndex: 0,
        explanation: 'Unless = If... not nên: Unless it rains = If it doesn\'t rain.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 7
  {
    id: 'unit-g8-u7',
    unitNumber: 7,
    title: 'Environmental Protection & Complex Sentences',
    themeVi: 'Bảo vệ môi trường & Câu phức',
    themeIcon: '🌱',
    grade: 8,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Ô nhiễm và bảo tồn hệ sinh thái (deforestation, marine pollution, wildlife poaching, global warming, carbon offset). Mệnh đề trạng ngữ chỉ nguyên nhân, kết quả, thời gian (because, since, as, so that, although, when, while).',
    vocabularies: [
      { id: 'g8-u7-w1', word: 'Deforestation', ipa: '/diːˌfɒrɪˈsteɪʃn/', partOfSpeech: 'noun', meaningVi: 'Nạn phá rừng, chặt phá rừng bừa bãi', exampleEn: 'Deforestation leads to catastrophic soil erosion.', exampleVi: 'Nạn phá rừng dẫn đến sạt lở đất đai thảm khốc.', isCore: true, unitId: 'unit-g8-u7', grade: 8 },
      { id: 'g8-u7-w2', word: 'Ecosystem', ipa: '/ˈiːkəʊsɪstəm/', partOfSpeech: 'noun', meaningVi: 'Hệ sinh thái tự nhiên', exampleEn: 'Coral reefs are among the most biodiverse ecosystems on Earth.', exampleVi: 'Rạn san hô là một trong những hệ sinh thái đa dạng sinh học nhất trên Trái Đất.', isCore: true, unitId: 'unit-g8-u7', grade: 8 },
      { id: 'g8-u7-w3', word: 'Endangered', ipa: '/ɪnˈdeɪndʒəd/', partOfSpeech: 'adjective', meaningVi: 'Đang bị đe dọa tuyệt chủng', exampleEn: 'The red-shanked douc langur is critically endangered.', exampleVi: 'Loài voọc chà vá chân đỏ đang trong tình trạng cực kỳ nguy cấp.', isCore: true, unitId: 'unit-g8-u7', grade: 8 },
      { id: 'g8-u7-w4', word: 'Biodegradable', ipa: '/ˌbaɪəʊdɪˈɡreɪdəbl/', partOfSpeech: 'adjective', meaningVi: 'Có thể phân hủy sinh học an toàn', exampleEn: 'Use biodegradable bags made from cassava starch.', exampleVi: 'Hãy sử dụng túi tự hủy sinh học làm từ tinh bột sắn.', isCore: true, unitId: 'unit-g8-u7', grade: 8 },
    ],
    grammar: {
      id: 'g8-u7-gram',
      title: 'Câu phức với Mệnh đề trạng ngữ chỉ nguyên nhân (Because / Since / As)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Ecologist: "Since many wild habitats were destroyed, hundreds of rare bird species became endangered."',
        highlights: ['Since many wild habitats were destroyed', 'became endangered'],
        explanationFriendly: 'Câu phức (Complex sentence) gồm một mệnh đề độc lập và ít nhất một mệnh đề phụ thuộc. Mệnh đề phụ bắt đầu bằng liên từ: Because, Since, As (nguyên nhân), So that (mục đích), Although (nhượng bộ), When/While (thời gian).',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Because / Since / As + Clause (Mệnh đề chỉ nguyên nhân), Main Clause (Mệnh đề chính).',
        formulaItems: [
          { label: 'Nguyên nhân', structure: 'Since / As + S + V, Main Clause', example: 'As global temperatures rise, glaciers melt rapidly.' },
          { label: 'Mục đích', structure: 'Main Clause + so that + S + can + V', example: 'We plant mangroves so that coastal storms cause less damage.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g8-u7-ex1',
          level: 'nhan-biet',
          question: '_______ plastic bags take hundreds of years to decompose, we must restrict their use.',
          options: ['Since', 'Although', 'So that'],
          correctIndex: 0,
          explanationVi: 'Chỉ nguyên nhân: "Bởi vì" túi ni lông mất hàng trăm năm mới phân hủy (Since = Because).',
        },
      ],
    },
    sentencePattern: {
      id: 'g8-u7-sp',
      frame: 'Because [environmentalThreat], we must [urgentAction] so that [futureProtection].',
      slots: [
        { slotName: 'environmentalThreat', options: ['plastic pollution chokes marine creatures', 'air quality index reaches hazardous levels', 'forest fires destroy biodiversity'] },
        { slotName: 'urgentAction', options: ['shift to electric transport', 'plant one million native trees', 'strictly ban wildlife trafficking'] },
        { slotName: 'futureProtection', options: ['our descendants breathe clean air', 'nature can heal itself', 'future generations inherit a living Earth'] },
      ],
      contextVi: 'Phát động tuần lễ hành động vì môi trường xanh tại trường THCS.',
      sampleDialogue: {
        speakerA: 'What is the root cause of urban air pollution in big cities?',
        lineA: 'Is it traffic or factories?',
        speakerB: 'Both. Since millions of fossil-fuel motorbikes emit smoke daily, fine dust levels soar dangerously.',
        lineB: 'Promoting metro lines and electric buses is urgent.',
      },
      substitutionDrills: [
        { prompt: 'Dùng câu phức với "Because": Vì rừng đầu nguồn bị tàn phá, lũ lụt diễn ra thường xuyên hơn:', expectedPattern: 'Because watershed forests were destroyed, floods happen more frequently.', cueWords: ['Because watershed forests', 'floods happen more frequently'] },
      ],
    },
    realLife: [
      {
        id: 'g8-u7-rl',
        title: 'Tổ chức ngày hội "Đổi rác thải tái chế lấy cây sen đá"',
        roleA: 'Tình nguyện viên xanh',
        roleB: 'Học sinh tham gia',
        exchanges: [
          { speaker: 'Tình nguyện viên', lineEn: 'Bring 5kg of sorted paper or 20 clean plastic bottles to receive a succulent plant!', lineVi: 'Mang 5kg giấy phân loại hoặc 20 vỏ chai nhựa sạch để nhận một chậu sen đá xinh xắn nhé!' },
          { speaker: 'Học sinh', lineEn: 'Here is my collection! I love turning domestic waste into green life.', lineVi: 'Đây là số chai tớ thu gom được! Tớ rất vui khi biến rác thải sinh hoạt thành mầm sống xanh tươi.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g8-u7-q1',
        type: 'multiple-choice',
        question: 'Từ nối nào sau đây đồng nghĩa với "Because" khi đứng đầu mệnh đề chỉ nguyên nhân?',
        options: ['Since', 'Although', 'Unless'],
        correctIndex: 0,
        explanation: '"Since" và "As" mang nghĩa bởi vì (đồng nghĩa Because).',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 8
  {
    id: 'unit-g8-u8',
    unitNumber: 8,
    title: 'Shopping & Consumer Culture',
    themeVi: 'Mua sắm thông minh & Thì Hiện tại',
    themeIcon: '🛍️',
    grade: 8,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Các hình thức mua sắm (open-air market, convenience store, supermarket, e-commerce, discount code, bargain, receipt). Thì Hiện tại đơn diễn tả lịch trình cố định và Hiện tại tiếp diễn chỉ xu hướng đang gia tăng.',
    vocabularies: [
      { id: 'g8-u8-w1', word: 'Bargain', ipa: '/ˈbɑːɡən/', partOfSpeech: 'verb', meaningVi: 'Mặc cả, trả giá ở chợ truyền thống', exampleEn: 'Tourists often bargain for handcrafts in flea markets.', exampleVi: 'Du khách thường mặc cả khi mua đồ thủ công ở chợ phiên.', isCore: true, unitId: 'unit-g8-u8', grade: 8 },
      { id: 'g8-u8-w2', word: 'E-commerce', ipa: '/ˈiː kɒmɜːs/', partOfSpeech: 'noun', meaningVi: 'Thương mại điện tử (mua bán online)', exampleEn: 'E-commerce platforms offer convenient home delivery.', exampleVi: 'Các sàn thương mại điện tử giao hàng tận nhà rất thuận tiện.', isCore: true, unitId: 'unit-g8-u8', grade: 8 },
      { id: 'g8-u8-w3', word: 'Discount', ipa: '/ˈdɪskaʊnt/', partOfSpeech: 'noun', meaningVi: 'Mức giảm giá, chiết khấu', exampleEn: 'Bookstores offer a 20% discount on Teacher\'s Day.', exampleVi: 'Các hiệu sách giảm giá 20% nhân ngày Nhà giáo.', isCore: true, unitId: 'unit-g8-u8', grade: 8 },
      { id: 'g8-u8-w4', word: 'Receipt', ipa: '/rɪˈsiːt/', partOfSpeech: 'noun', meaningVi: 'Hóa đơn thanh toán (chữ p câm)', exampleEn: 'Keep the receipt in case you want an exchange.', exampleVi: 'Hãy giữ lại hóa đơn phòng trường hợp bạn muốn đổi hàng.', isCore: true, unitId: 'unit-g8-u8', grade: 8 },
    ],
    grammar: {
      id: 'g8-u8-gram',
      title: 'Hiện tại đơn chỉ Lịch trình cố định & Hiện tại tiếp diễn chỉ Xu hướng mới',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Manager: "The mall opens at 9 a.m. every morning. More and more consumers are shopping online via mobile apps nowadays."',
        highlights: ['opens at 9 a.m.', 'are shopping online nowadays'],
        explanationFriendly: 'Hiện tại đơn dùng cho giờ mở cửa, thời khóa biểu, lịch trình tàu xe (The store closes at 10 p.m.). Hiện tại tiếp diễn dùng với "more and more / nowadays" để chỉ các xu hướng đang thay đổi trong xã hội.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Timetable: S + V(s/es) | Trend: S + is/are + V-ing (more and more...).',
        formulaItems: [
          { label: 'Lịch trình tàu xe / giờ mở cửa', structure: 'The [event/shop] + V(s/es) + at [time]', example: 'The morning train departs at 6:30.' },
          { label: 'Xu hướng xã hội thay đổi', structure: 'More and more people + are + V-ing', example: 'People are using cashless payments.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g8-u8-ex1',
          level: 'nhan-biet',
          question: 'The big department store _______ (open) at 8:30 a.m. tomorrow.',
          options: ['opens', 'is opening', 'will open'],
          correctIndex: 0,
          explanationVi: 'Lịch trình mở cửa cố định dù ngày mai vẫn dùng thì Hiện tại đơn: opens.',
        },
      ],
    },
    sentencePattern: {
      id: 'g8-u8-sp',
      frame: 'Instead of [shoppingMethodA], more and more consumers are [shoppingMethodB] because [reason].',
      slots: [
        { slotName: 'shoppingMethodA', options: ['waiting in supermarket queues', 'paying with paper cash', 'buying impulsive cheap goods'] },
        { slotName: 'shoppingMethodB', options: ['ordering through mobile apps', 'scanning QR codes with phones', 'choosing durable eco-friendly items'] },
        { slotName: 'reason', options: ['it saves significant time', 'it provides better transparency', 'it helps avoid domestic clutter'] },
      ],
      contextVi: 'Khảo sát thói quen tiêu dùng thông minh của người trẻ.',
      sampleDialogue: {
        speakerA: 'Do you prefer shopping at traditional street markets or modern supermarkets?',
        lineA: 'Why do you choose that?',
        speakerB: 'I prefer traditional markets for fresh greens and friendly conversations with sellers.',
        lineB: 'However, for electronics, supermarkets with clear receipts are safer.',
      },
      substitutionDrills: [
        { prompt: 'Nói ngày càng có nhiều người sử dụng ví điện tử để thanh toán:', expectedPattern: 'More and more people are using e-wallets for payment.', cueWords: ['More and more people', 'using e-wallets'] },
      ],
    },
    realLife: [
      {
        id: 'g8-u8-rl',
        title: 'Lập danh sách mua sắm hợp lý tránh lãng phí tiền bạc',
        roleA: 'Người tiêu dùng thông thái',
        roleB: 'Bạn đi cùng',
        exchanges: [
          { speaker: 'Bé', lineEn: 'I stick strictly to my grocery list so I won\'t buy unnecessary candy on impulse.', lineVi: 'Tớ bám sát danh sách đã ghi sẵn để không mua bánh kẹo linh tinh theo cảm hứng nhất thời.' },
          { speaker: 'Bạn', lineEn: 'Smart financial habit! Mindful shopping saves both money and storage space.', lineVi: 'Thói quen tài chính rất khôn ngoan! Mua sắm có kế hoạch vừa tiết kiệm tiền vừa gọn gàng nhà cửa.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g8-u8-q1',
        type: 'multiple-choice',
        question: 'Phát âm của từ "receipt" (hóa đơn) có đọc âm /p/ không?',
        options: ['Không, âm /p/ là âm câm (/rɪˈsiːt/)', 'Có, đọc là /rɪˈsiːpt/', 'Đọc thành âm /f/'],
        correctIndex: 0,
        explanation: 'Từ receipt có chữ "p" câm, phát âm chuẩn là /rɪˈsiːt/.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 9
  {
    id: 'unit-g8-u9',
    unitNumber: 9,
    title: 'Natural Disasters & Past Continuous',
    themeVi: 'Thiên tai & Quá khứ tiếp diễn',
    themeIcon: '🌪️',
    grade: 8,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Các loại thiên tai (typhoon, earthquake, flood, drought, volcanic eruption, landslide). Thì Quá khứ tiếp diễn (Past Continuous: was/were + V-ing) kết hợp với WHEN và WHILE để diễn tả hành động đang xảy ra thì có hành động khác xen vào.',
    vocabularies: [
      { id: 'g8-u9-w1', word: 'Typhoon', ipa: '/taɪˈfuːn/', partOfSpeech: 'noun', meaningVi: 'Cơn bão nhiệt đới dữ dội', exampleEn: 'The typhoon caused severe flooding in the coastal delta.', exampleVi: 'Cơn bão nhiệt đới gây ngập lụt nghiêm trọng vùng đồng bằng ven biển.', isCore: true, unitId: 'unit-g8-u9', grade: 8 },
      { id: 'g8-u9-w2', word: 'Earthquake', ipa: '/ˈɜːθkweɪk/', partOfSpeech: 'noun', meaningVi: 'Trận động đất làm rung chuyển mặt đất', exampleEn: 'Buildings shook violently during the 7.2 magnitude earthquake.', exampleVi: 'Các tòa nhà rung lắc dữ dội trong trận động đất mạnh 7.2 độ.', isCore: true, unitId: 'unit-g8-u9', grade: 8 },
      { id: 'g8-u9-w3', word: 'Evacuate', ipa: '/ɪˈvækjueɪt/', partOfSpeech: 'verb', meaningVi: 'Sơ tán khẩn cấp người dân đến nơi an toàn', exampleEn: 'Rescue teams evacuated thousands of residents before the dam burst.', exampleVi: 'Lực lượng cứu hộ đã sơ tán hàng ngàn người dân trước khi vỡ đập.', isCore: true, unitId: 'unit-g8-u9', grade: 8 },
      { id: 'g8-u9-w4', word: 'Emergency kit', ipa: '/ɪˈmɜːdʒənsi kɪt/', partOfSpeech: 'noun', meaningVi: 'Bộ túi cứu hộ khẩn cấp gia đình', exampleEn: 'Every household must prepare an emergency kit with flashlight and water.', exampleVi: 'Mỗi gia đình cần chuẩn bị sẵn một túi cứu hộ có đèn pin và nước sạch.', isCore: true, unitId: 'unit-g8-u9', grade: 8 },
    ],
    grammar: {
      id: 'g8-u9-gram',
      title: 'Thì Quá khứ tiếp diễn (The Past Continuous) với WHEN & WHILE',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Reporter: "At 8 p.m. last night, people were sleeping when the massive earthquake struck the city."',
        highlights: ['were sleeping', 'when the massive earthquake struck'],
        explanationFriendly: 'Hành động kéo dài đang diễn ra dùng Quá khứ tiếp diễn (was/were + V-ing). Hành động ngắn chen ngang vào dùng Quá khứ đơn (V2/ed). Cấu trúc: S + was/were + V-ing + WHEN + S + V2/ed. HOẶC WHILE + S + was/were + V-ing, S + V2/ed.',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'Long action: was/were + V-ing | Short interrupting action: Past Simple (V2/ed).',
        formulaItems: [
          { label: 'Hành động đang diễn ra tại giờ cụ thể', structure: 'At [specific time] + past, S + was/were + V-ing', example: 'At 7 p.m. yesterday, we were reinforcing our roof.' },
          { label: 'Hành động xen vào (When)', structure: 'S + was/were + V-ing + when + S + V-ed', example: 'I was cooking when the lights went out.' },
          { label: 'Hai hành động song song (While)', structure: 'While + S1 + was/were + V-ing, S2 + was/were + V-ing', example: 'While it was raining outside, we were packing supplies.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g8-u9-ex1',
          level: 'nhan-biet',
          question: 'The rescue workers _______ (search) for survivors when the second tremor occurred.',
          options: ['were searching', 'are searching', 'searched'],
          correctIndex: 0,
          explanationVi: 'Hành động cứu hộ đang diễn ra trong quá khứ thì có dư chấn thứ hai chen ngang: were searching.',
        },
      ],
    },
    sentencePattern: {
      id: 'g8-u9-sp',
      frame: 'When [disasterStruck], residents were [ongoingAction]. Luckily, [positiveRescue].',
      slots: [
        { slotName: 'disasterStruck', options: ['the flash flood hit the valley', 'the siren sounded the storm alert', 'the ground began to tremble'] },
        { slotName: 'ongoingAction', options: ['evacuating to higher concrete shelters', 'securing windows and livestock', 'monitoring emergency radio broadcasts'] },
        { slotName: 'positiveRescue', options: ['relief teams arrived with hot meals', 'everyone was relocated safely', 'no casualties were reported'] },
      ],
      contextVi: 'Bản tin trực tiếp từ hiện trường công tác phòng chống thiên tai.',
      sampleDialogue: {
        speakerA: 'What were you doing when the torrential storm hit your hometown?',
        lineA: 'Were you scared?',
        speakerB: 'My family was moving furniture upstairs when the water flooded our ground floor.',
        lineB: 'Thanks to the rescue boats, we were transported safely to the community center.',
      },
      substitutionDrills: [
        { prompt: 'Nói tôi đang học bài lúc 8 giờ tối hôm qua thì mất điện:', expectedPattern: 'I was studying at 8 p.m. yesterday when the power went out.', cueWords: ['was studying', 'when the power went out'] },
      ],
    },
    realLife: [
      {
        id: 'g8-u9-rl',
        title: 'Tập huấn kỹ năng sinh tồn khi xảy ra động đất hoặc bão lớn',
        roleA: 'Chuyên viên cứu hộ',
        roleB: 'Học sinh diễn tập',
        exchanges: [
          { speaker: 'Cứu hộ', lineEn: 'Remember the Drop, Cover, and Hold On technique during an earthquake!', lineVi: 'Các em hãy nhớ kỹ thao tác Nằm sát xuống, Che chắn đầu và Bám chặt lấy vật đỡ khi xảy ra động đất!' },
          { speaker: 'Học sinh', lineEn: 'Drop under a sturdy desk and protect our head with hands. We have mastered it!', lineVi: 'Chui xuống gầm bàn kiên cố và dùng hai tay ôm bảo vệ phần đầu. Chúng em đã thuần thục rồi ạ!' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g8-u9-q1',
        type: 'multiple-choice',
        question: 'Chọn câu đúng: "While my mother _______ dinner, the telephone rang."',
        options: ['was cooking', 'cooked', 'is cooking'],
        correctIndex: 0,
        explanation: 'Sau "While" diễn tả hành động đang kéo dài: was cooking.',
        competencyLevel: 'thong-hieu',
      },
    ],
  },

  // Unit 10
  {
    id: 'unit-g8-u10',
    unitNumber: 10,
    title: 'Communication in the Future',
    themeVi: 'Giao tiếp tương lai & Giới từ thời gian',
    themeIcon: '🌐',
    grade: 8,
    semester: 2,
    textbook: 'global-success',
    summaryVi: 'Phương thức giao tiếp công nghệ tương lai (holography, telepathy, brain-computer interface, instant translation earbuds, video conferencing). Giới từ chỉ thời gian và nơi chốn nâng cao, đại từ sở hữu ôn tập.',
    vocabularies: [
      { id: 'g8-u10-w1', word: 'Holography', ipa: '/hɒˈlɒɡrəfi/', partOfSpeech: 'noun', meaningVi: 'Kỹ thuật hình chiếu không gian 3 chiều (hologram)', exampleEn: 'Holography will enable life-sized 3D meetings across continents.', exampleVi: 'Hình chiếu 3D sẽ cho phép họp trực tuyến người thật qua các châu lục.', isCore: true, unitId: 'unit-g8-u10', grade: 8 },
      { id: 'g8-u10-w2', word: 'Telepathy', ipa: '/təˈlepəθi/', partOfSpeech: 'noun', meaningVi: 'Thần giao cách cảm (truyền suy nghĩ trực tiếp)', exampleEn: 'Scientists are researching digital telepathy via brain chips.', exampleVi: 'Các nhà khoa học đang nghiên cứu thần giao cách cảm số qua chip não.', isCore: true, unitId: 'unit-g8-u10', grade: 8 },
      { id: 'g8-u10-w3', word: 'Earbud', ipa: '/ˈɪəbʌd/', partOfSpeech: 'noun', meaningVi: 'Tai nghe thông minh (phiên dịch trực tiếp)', exampleEn: 'Smart earbuds will translate foreign languages in real time.', exampleVi: 'Tai nghe thông minh sẽ dịch ngôn ngữ nước ngoài theo thời gian thực.', isCore: true, unitId: 'unit-g8-u10', grade: 8 },
      { id: 'g8-u10-w4', word: 'Interact', ipa: '/ˌɪntərˈækt/', partOfSpeech: 'verb', meaningVi: 'Tương tác, giao lưu qua lại', exampleEn: 'Students will interact with virtual teachers in cyberspace.', exampleVi: 'Học sinh sẽ tương tác với giáo viên ảo trong không gian mạng.', isCore: true, unitId: 'unit-g8-u10', grade: 8 },
    ],
    grammar: {
      id: 'g8-u10-gram',
      title: 'Giới từ chỉ Thời gian & Nơi chốn trong văn cảnh tương lai (IN, ON, AT, BY)',
      gradeTier: 'secondary',
      step1Recognition: {
        storyOrDialogue: 'Futurist: "In 2050, by the end of this century, humans will communicate via thoughts on virtual reality networks."',
        highlights: ['In 2050', 'by the end of this century', 'on virtual reality networks'],
        explanationFriendly: 'IN: năm (in 2050), thế kỷ (in the 22nd century), khoảng thời gian (in two years). BY: trước một mốc thời gian (by 2040 = trước năm 2040). ON: trên nền tảng mạng/kênh (on the Internet, on holographic screens).',
      },
      step2VisualDiagram: {
        diagramType: 'table',
        notesVi: 'In + Year/Decade | By + Future deadline | On + Network/Platform.',
        formulaItems: [
          { label: 'Năm tương lai', structure: 'In + [Year]', example: 'In 2040, self-driving cars will be common.' },
          { label: 'Trước mốc thời gian', structure: 'By + [Deadline]', example: 'By the next decade, AI will translate all languages.' },
          { label: 'Trên nền tảng', structure: 'On + platform', example: 'We attend lectures on the metaverse.' },
        ],
      },
      step3Exercises: [
        {
          id: 'g8-u10-ex1',
          level: 'nhan-biet',
          question: '_______ 2050, real-time voice translation will break all language barriers.',
          options: ['By', 'At', 'On'],
          correctIndex: 0,
          explanationVi: 'Trước hoặc tính đến năm 2050 dùng giới từ "By".',
        },
      ],
    },
    sentencePattern: {
      id: 'g8-u10-sp',
      frame: 'In the future, people will communicate via [advancedTech] instead of [traditionalMethod].',
      slots: [
        { slotName: 'advancedTech', options: ['3D holographic projections', 'brainwave interfaces', 'real-time AI translation earbuds'] },
        { slotName: 'traditionalMethod', options: ['typing on physical keyboards', 'long-distance paper mail', 'flat two-dimensional video calls'] },
      ],
      contextVi: 'Triển lãm công nghệ truyền thông và viễn thông thế hệ mới.',
      sampleDialogue: {
        speakerA: 'How will international classrooms look like thirty years from now?',
        lineA: 'Will students still sit in physical desks?',
        speakerB: 'Students from Hanoi, Tokyo and London will meet in a shared 3D holographic auditorium.',
        lineB: 'Language barriers will vanish thanks to instant translation neural buds.',
      },
      substitutionDrills: [
        { prompt: 'Nói hình chiếu 3D sẽ giúp chúng ta trò chuyện như thể đang ở cùng một căn phòng:', expectedPattern: 'Holographic projection will allow us to talk as if we are in the same room.', cueWords: ['Holographic projection', 'same room'] },
      ],
    },
    realLife: [
      {
        id: 'g8-u10-rl',
        title: 'Giữ gìn sự ấm áp của tương tác con người giữa thời đại số',
        roleA: 'Học sinh',
        roleB: 'Người dẫn chương trình',
        exchanges: [
          { speaker: 'Học sinh', lineEn: 'No matter how advanced holographic tech becomes, a real hug or handclasp remains irreplaceable.', lineVi: 'Dù công nghệ hình chiếu 3D có tân tiến đến đâu, một cái ôm hay một cái bắt tay ngoài đời thực vẫn là vô giá và không thể thay thế.' },
          { speaker: 'MC', lineEn: 'A profound realization! Technology should serve human empathy, not replace our hearts.', lineVi: 'Một nhận thức thật sâu sắc! Công nghệ sinh ra là để phục vụ sự thấu cảm của con người, chứ không thể thay thế trái tim yêu thương.' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'g8-u10-q1',
        type: 'multiple-choice',
        question: 'Công nghệ nào chiếu hình ảnh 3 chiều của một người vào không gian thực?',
        options: ['Holography', 'Radio', 'Fax'],
        correctIndex: 0,
        explanation: 'Holography là công nghệ hình chiếu 3 chiều.',
        competencyLevel: 'nhan-biet',
      },
    ],
  },
];
