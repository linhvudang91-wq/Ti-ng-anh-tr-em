export interface PrimaryPatternItem {
  id: string;
  grade: 3 | 4 | 5;
  titleVi: string;
  patternEn: string;
  patternVi: string;
  formula: string;
  category: string;
  emoji: string;
  slots: { slotName: string; labelVi: string; options: { en: string; vi: string }[] }[];
  dialogue: {
    speakerA: string;
    lineAEn: string;
    lineAVi: string;
    speakerB: string;
    lineBEn: string;
    lineBVi: string;
  };
  tipsVi: string;
}

export const PRIMARY_SENTENCE_PATTERNS: PrimaryPatternItem[] = [
  // ===================== LỚP 3 (PRE-A1 STARTERS) =====================
  {
    id: 'p3-greetings-name',
    grade: 3,
    titleVi: 'Chào hỏi & Tự giới thiệu tên',
    patternEn: 'Hello, I am [name]. Nice to meet you!',
    patternVi: 'Xin chào, tớ là [name]. Rất vui được gặp bạn!',
    formula: 'Hello, I am + [Tên]. Nice to meet you!',
    category: 'Giao tiếp & Làm quen',
    emoji: '👋',
    slots: [
      {
        slotName: 'name',
        labelVi: 'Tên bạn',
        options: [
          { en: 'Nam', vi: 'Nam' },
          { en: 'Mai', vi: 'Mai' },
          { en: 'Peter', vi: 'Peter' },
          { en: 'Linda', vi: 'Linda' },
          { en: 'Hoa', vi: 'Hoa' },
        ],
      },
    ],
    dialogue: {
      speakerA: 'Nam',
      lineAEn: 'Hello! I am Nam. Nice to meet you!',
      lineAVi: 'Xin chào! Tớ là Nam. Rất vui được làm quen với bạn!',
      speakerB: 'Mai',
      lineBEn: 'Hi Nam, I am Mai. Nice to meet you too!',
      lineBVi: 'Chào Nam, tớ là Mai. Tớ cũng rất vui được làm quen với bạn!',
    },
    tipsVi: 'Khi mới gặp bạn mới, các con hãy mỉm cười và nói "Nice to meet you" để thể hiện sự thân thiện nhé!',
  },
  {
    id: 'p3-how-are-you',
    grade: 3,
    titleVi: 'Hỏi thăm sức khỏe & Cảm ơn',
    patternEn: 'How are you? - I am [feeling], thank you.',
    patternVi: 'Bạn có khỏe không? - Tớ [feeling], cảm ơn bạn.',
    formula: 'How are you? - I am + [tính từ cảm xúc], thank you.',
    category: 'Hỏi thăm hàng ngày',
    emoji: '😊',
    slots: [
      {
        slotName: 'feeling',
        labelVi: 'Cảm xúc / Tình trạng',
        options: [
          { en: 'fine', vi: 'khỏe' },
          { en: 'great', vi: 'rất tuyệt' },
          { en: 'happy', vi: 'vui vẻ' },
          { en: 'good', vi: 'tốt' },
        ],
      },
    ],
    dialogue: {
      speakerA: 'Teacher',
      lineAEn: 'Good morning class! How are you today?',
      lineAVi: 'Chào cả lớp buổi sáng! Hôm nay các em thế nào?',
      speakerB: 'Class',
      lineBEn: 'We are fine, thank you! And you?',
      lineBVi: 'Chúng em khỏe ạ, cảm ơn cô! Còn cô thế nào ạ?',
    },
    tipsVi: 'Nhớ luôn nói "thank you" (cảm ơn bạn/cô) sau khi trả lời nhé!',
  },
  {
    id: 'p3-this-that-item',
    grade: 3,
    titleVi: 'Hỏi và giới thiệu đồ vật ở gần / ở xa',
    patternEn: 'This is my [item]. It is [color].',
    patternVi: 'Đây là [item] của tớ. Nó có màu [color].',
    formula: 'This is my + [đồ vật]. It is + [màu sắc].',
    category: 'Đồ dùng học tập',
    emoji: '✏️',
    slots: [
      {
        slotName: 'item',
        labelVi: 'Đồ dùng học tập',
        options: [
          { en: 'pencil', vi: 'bút chì' },
          { en: 'ruler', vi: 'thước kẻ' },
          { en: 'eraser', vi: 'cục tẩy' },
          { en: 'notebook', vi: 'quyển vở' },
          { en: 'school bag', vi: 'cặp sách' },
        ],
      },
      {
        slotName: 'color',
        labelVi: 'Màu sắc',
        options: [
          { en: 'yellow', vi: 'vàng' },
          { en: 'blue', vi: 'xanh dương' },
          { en: 'green', vi: 'xanh lá' },
          { en: 'red', vi: 'đỏ' },
          { en: 'pink', vi: 'hồng' },
        ],
      },
    ],
    dialogue: {
      speakerA: 'Tony',
      lineAEn: 'Is this your new pencil?',
      lineAVi: 'Đây có phải là bút chì mới của bạn không?',
      speakerB: 'Mai',
      lineBEn: 'Yes, it is. It is yellow and sharp!',
      lineBVi: 'Đúng rồi, nó màu vàng và rất sắc!',
    },
    tipsVi: '"This is" dùng khi đồ vật ở gần tay mình. Nếu đồ vật ở xa, các con đổi sang "That is" nhé!',
  },
  {
    id: 'p3-i-have-toy',
    grade: 3,
    titleVi: 'Khoe đồ chơi & Hỏi bạn',
    patternEn: 'I have a [toy]. Do you have a [toy]?',
    patternVi: 'Tớ có một chiếc [toy]. Bạn có chiếc [toy] nào không?',
    formula: 'I have a + [đồ chơi]. Do you have a + [đồ chơi]?',
    category: 'Đồ chơi & Sở thích',
    emoji: '🧸',
    slots: [
      {
        slotName: 'toy',
        labelVi: 'Món đồ chơi',
        options: [
          { en: 'robot', vi: 'người máy' },
          { en: 'teddy bear', vi: 'gấu bông' },
          { en: 'toy car', vi: 'ô tô đồ chơi' },
          { en: 'puzzle', vi: 'trò chơi ghép hình' },
          { en: 'kite', vi: 'con diều' },
        ],
      },
    ],
    dialogue: {
      speakerA: 'Phong',
      lineAEn: 'I have a new robot. It can dance!',
      lineAVi: 'Tớ có một chú rô-bốt mới. Chú ấy biết nhảy múa đấy!',
      speakerB: 'Quan',
      lineBEn: 'Wow, super cool! Can I play with you?',
      lineBVi: 'Oa, siêu ngầu luôn! Tớ có thể chơi cùng bạn không?',
    },
    tipsVi: 'Khi hỏi "Do you have a...?", nếu có con trả lời "Yes, I do", nếu không con trả lời "No, I don\'t".',
  },
  {
    id: 'p3-family-who',
    grade: 3,
    titleVi: 'Giới thiệu thành viên gia đình yêu quý',
    patternEn: 'This is my [familyMember]. [pronoun] is very [adjective].',
    patternVi: 'Đây là [familyMember] của tớ. [pronoun] rất [adjective].',
    formula: 'This is my + [người thân]. He/She is + [tính từ].',
    category: 'Gia đình thân yêu',
    emoji: '👨‍👩‍👧',
    slots: [
      {
        slotName: 'familyMember',
        labelVi: 'Người thân trong nhà',
        options: [
          { en: 'father', vi: 'bố' },
          { en: 'mother', vi: 'mẹ' },
          { en: 'brother', vi: 'anh/em trai' },
          { en: 'sister', vi: 'chị/em gái' },
          { en: 'grandma', vi: 'bà' },
        ],
      },
      {
        slotName: 'pronoun',
        labelVi: 'Đại từ nhân xưng',
        options: [
          { en: 'He', vi: 'Bác ấy / Anh ấy' },
          { en: 'She', vi: 'Cô ấy / Mẹ' },
        ],
      },
      {
        slotName: 'adjective',
        labelVi: 'Tính từ miêu tả',
        options: [
          { en: 'kind', vi: 'tốt bụng' },
          { en: 'tall', vi: 'cao ráo' },
          { en: 'young', vi: 'trẻ trung' },
          { en: 'nice', vi: 'hiền lành' },
        ],
      },
    ],
    dialogue: {
      speakerA: 'Linda',
      lineAEn: 'Who is that in the photo, Mai?',
      lineAVi: 'Ai trong bức ảnh kia thế Mai?',
      speakerB: 'Mai',
      lineBEn: 'That is my mother. She is a doctor.',
      lineBVi: 'Đó là mẹ tớ. Mẹ tớ là bác sĩ đấy.',
    },
    tipsVi: 'Con trai dùng "He" (He is...), con gái dùng "She" (She is...) nhé!',
  },

  // ===================== LỚP 4 (A1 MOVERS) =====================
  {
    id: 'p4-country-origin',
    grade: 4,
    titleVi: 'Hỏi quê hương & Quốc tịch',
    patternEn: 'Where are you from? - I am from [country]. I am [nationality].',
    patternVi: 'Bạn đến từ đâu? - Tớ đến từ [country]. Tớ là người [nationality].',
    formula: 'Where are you from? - I am from + [Tên Nước]. I am + [Quốc tịch].',
    category: 'Quốc gia & Quốc tế',
    emoji: '🌏',
    slots: [
      {
        slotName: 'country',
        labelVi: 'Tên đất nước',
        options: [
          { en: 'Vietnam', vi: 'Việt Nam' },
          { en: 'America', vi: 'Nước Mỹ' },
          { en: 'England', vi: 'Nước Anh' },
          { en: 'Australia', vi: 'Nước Úc' },
          { en: 'Japan', vi: 'Nước Nhật Bản' },
        ],
      },
      {
        slotName: 'nationality',
        labelVi: 'Quốc tịch',
        options: [
          { en: 'Vietnamese', vi: 'Người Việt Nam' },
          { en: 'American', vi: 'Người Mỹ' },
          { en: 'English', vi: 'Người Anh' },
          { en: 'Australian', vi: 'Người Úc' },
          { en: 'Japanese', vi: 'Người Nhật' },
        ],
      },
    ],
    dialogue: {
      speakerA: 'Tom',
      lineAEn: 'Hello! Where are you from?',
      lineAVi: 'Xin chào! Bạn đến từ đâu thế?',
      speakerB: 'Linh',
      lineBEn: 'I am from Vietnam. Welcome to Hanoi!',
      lineBVi: 'Tớ đến từ Việt Nam. Chào mừng bạn đến với Hà Nội!',
    },
    tipsVi: 'Nhớ phân biệt: "from Vietnam" (từ đất nước Việt Nam) và "Vietnamese" (người Việt Nam/tiếng Việt).',
  },
  {
    id: 'p4-time-routine',
    grade: 4,
    titleVi: 'Hỏi giờ giấc & Hoạt động trong ngày',
    patternEn: 'What time is it? - It is [time]. I [action] at this time.',
    patternVi: 'Mấy giờ rồi? - Bây giờ là [time]. Tớ [action] vào giờ này.',
    formula: 'What time is it? - It is + [Giờ]. I + [Hành động] at + [Giờ].',
    category: 'Thời gian & Thói quen',
    emoji: '⏰',
    slots: [
      {
        slotName: 'time',
        labelVi: 'Giờ trong ngày',
        options: [
          { en: 'six o\'clock', vi: '6 giờ đúng' },
          { en: 'six thirty', vi: '6 giờ rưỡi' },
          { en: 'seven o\'clock', vi: '7 giờ đúng' },
          { en: 'twelve o\'clock', vi: '12 giờ trưa' },
          { en: 'eight forty-five', vi: '8 giờ 45 tối' },
        ],
      },
      {
        slotName: 'action',
        labelVi: 'Hoạt động hàng ngày',
        options: [
          { en: 'get up', vi: 'thức dậy' },
          { en: 'have breakfast', vi: 'ăn sáng' },
          { en: 'go to school', vi: 'đi đến trường' },
          { en: 'have lunch', vi: 'ăn trưa' },
          { en: 'go to bed', vi: 'đi ngủ' },
        ],
      },
    ],
    dialogue: {
      speakerA: 'Mother',
      lineAEn: 'What time is it, son? It is time for school!',
      lineAVi: 'Mấy giờ rồi con trai? Đến giờ đi học rồi đấy!',
      speakerB: 'Nam',
      lineBEn: 'It is seven o\'clock. I am ready!',
      lineBVi: 'Bây giờ là bảy giờ đúng ạ. Con đã sẵn sàng rồi!',
    },
    tipsVi: 'Đứng trước mốc thời gian giờ giấc, các con luôn nhớ dùng giới từ "at" (ví dụ: at six o\'clock).',
  },
  {
    id: 'p4-present-continuous',
    grade: 4,
    titleVi: 'Hỏi hành động đang diễn ra (Hiện tại tiếp diễn)',
    patternEn: 'What are you doing? - I am [activity].',
    patternVi: 'Bạn đang làm gì thế? - Tớ đang [activity].',
    formula: 'What are you doing? - I am + V-ing.',
    category: 'Hành động đang làm',
    emoji: '🏃‍♂️',
    slots: [
      {
        slotName: 'activity',
        labelVi: 'Hành động đang làm (V-ing)',
        options: [
          { en: 'reading a comic book', vi: 'đọc truyện tranh' },
          { en: 'listening to music', vi: 'nghe nhạc vui nhộn' },
          { en: 'drawing a picture', vi: 'vẽ một bức tranh' },
          { en: 'playing football', vi: 'chơi đá bóng' },
          { en: 'doing my homework', vi: 'làm bài tập về nhà' },
        ],
      },
    ],
    dialogue: {
      speakerA: 'Peter',
      lineAEn: 'What are you doing, Mai?',
      lineAVi: 'Cậu đang làm gì đấy Mai?',
      speakerB: 'Mai',
      lineBEn: 'I am reading an English story. It is very fun!',
      lineBVi: 'Tớ đang đọc một câu chuyện tiếng Anh. Hay lắm cậu ạ!',
    },
    tipsVi: 'Hành động đang làm ngay lúc nói thì động từ luôn phải thêm đuôi -ing (read -> reading, draw -> drawing).',
  },
  {
    id: 'p4-subjects-timetable',
    grade: 4,
    titleVi: 'Môn học yêu thích & Thời khóa biểu',
    patternEn: 'What subjects do you have today? - I have [subject1] and [subject2].',
    patternVi: 'Hôm nay bạn có những môn học nào? - Tớ có môn [subject1] và [subject2].',
    formula: 'What subjects do you have today? - I have + [Môn 1] and [Môn 2].',
    category: 'Môn học & Trường lớp',
    emoji: '📚',
    slots: [
      {
        slotName: 'subject1',
        labelVi: 'Môn học thứ nhất',
        options: [
          { en: 'English', vi: 'Tiếng Anh' },
          { en: 'Maths', vi: 'Toán học' },
          { en: 'Science', vi: 'Khoa học' },
          { en: 'Music', vi: 'Âm nhạc' },
          { en: 'Art', vi: 'Mỹ thuật' },
        ],
      },
      {
        slotName: 'subject2',
        labelVi: 'Môn học thứ hai',
        options: [
          { en: 'PE (Physical Education)', vi: 'Thể dục' },
          { en: 'Vietnamese', vi: 'Tiếng Việt' },
          { en: 'IT (Informatics)', vi: 'Tin học' },
          { en: 'Science', vi: 'Khoa học' },
        ],
      },
    ],
    dialogue: {
      speakerA: 'Hoa',
      lineAEn: 'What subjects do you have on Wednesday?',
      lineAVi: 'Thứ Tư bạn có những môn học gì?',
      speakerB: 'Lan',
      lineBEn: 'I have English, Maths and Music. I love English!',
      lineBVi: 'Tớ có tiếng Anh, Toán và Âm nhạc. Tớ thích tiếng Anh nhất!',
    },
    tipsVi: 'Tên các môn học bằng tiếng Anh như English, Maths, Science luôn viết hoa chữ cái đầu tiên nhé!',
  },

  // ===================== LỚP 5 (A1+ FLYERS) =====================
  {
    id: 'p5-past-vacation',
    grade: 5,
    titleVi: 'Kể về kỳ nghỉ trong quá khứ (Quá khứ đơn)',
    patternEn: 'Where did you go on holiday? - I went to [place] by [transport].',
    patternVi: 'Kỳ nghỉ bạn đã đi đâu? - Tớ đã đến [place] bằng [transport].',
    formula: 'Where did you go? - I went to + [Địa điểm] by + [Phương tiện].',
    category: 'Du lịch & Kỳ nghỉ',
    emoji: '🏖️',
    slots: [
      {
        slotName: 'place',
        labelVi: 'Địa điểm du lịch',
        options: [
          { en: 'Ha Long Bay', vi: 'Vịnh Hạ Long' },
          { en: 'Phu Quoc Island', vi: 'Đảo Phú Quốc' },
          { en: 'Da Nang City', vi: 'Thành phố Đà Nẵng' },
          { en: 'Nha Trang seaside', vi: 'Bãi biển Nha Trang' },
          { en: 'Hue Imperial City', vi: 'Cố đô Huế' },
        ],
      },
      {
        slotName: 'transport',
        labelVi: 'Phương tiện di chuyển',
        options: [
          { en: 'plane', vi: 'máy bay' },
          { en: 'train', vi: 'tàu hỏa' },
          { en: 'coach', vi: 'xe khách' },
          { en: 'boat', vi: 'tàu thủy' },
          { en: 'car', vi: 'ô tô' },
        ],
      },
    ],
    dialogue: {
      speakerA: 'Tony',
      lineAEn: 'Where did you go last summer, Nam?',
      lineAVi: 'Mùa hè vừa rồi bạn đã đi đâu thế Nam?',
      speakerB: 'Nam',
      lineBEn: 'I went to Ha Long Bay with my family. The caves were magnificent!',
      lineBVi: 'Tớ đã đi Vịnh Hạ Long cùng gia đình. Các hang động ở đó đẹp tuyệt vời!',
    },
    tipsVi: 'Động từ "go" chuyển sang quá khứ là "went" (bất quy tắc). Phương tiện đi lại thì dùng "by + phương tiện".',
  },
  {
    id: 'p5-frequency-routine',
    grade: 5,
    titleVi: 'Hỏi thói quen và tần suất làm việc',
    patternEn: 'How often do you [activity]? - I [frequency] [activity].',
    patternVi: 'Bạn có thường [activity] không? - Tớ [frequency] [activity].',
    formula: 'How often do you + V? - I + [always / usually / often / sometimes] + V.',
    category: 'Thói quen & Tần suất',
    emoji: '🚴‍♂️',
    slots: [
      {
        slotName: 'frequency',
        labelVi: 'Trạng từ chỉ tần suất',
        options: [
          { en: 'always', vi: 'luôn luôn (100%)' },
          { en: 'usually', vi: 'thường thường (80%)' },
          { en: 'often', vi: 'hay làm (60%)' },
          { en: 'sometimes', vi: 'thỉnh thoảng (30%)' },
        ],
      },
      {
        slotName: 'activity',
        labelVi: 'Hoạt động thường làm',
        options: [
          { en: 'ride my bike to the park', vi: 'đạp xe ra công viên' },
          { en: 'do morning exercise', vi: 'tập thể dục buổi sáng' },
          { en: 'read library books', vi: 'đọc sách thư viện' },
          { en: 'help my parents with cooking', vi: 'giúp bố mẹ nấu cơm' },
        ],
      },
    ],
    dialogue: {
      speakerA: 'Linda',
      lineAEn: 'How often do you go swimming?',
      lineAVi: 'Bao lâu bạn đi bơi một lần?',
      speakerB: 'Trung',
      lineBEn: 'I usually go swimming twice a week with my brother.',
      lineBVi: 'Tớ thường đi bơi hai lần một tuần cùng anh trai.',
    },
    tipsVi: 'Vị trí trạng từ tần suất: luôn đứng TRƯỚC động từ thường (I always walk, she usually reads).',
  },
  {
    id: 'p5-future-career',
    grade: 5,
    titleVi: 'Ước mơ nghề nghiệp tương lai',
    patternEn: 'What would you like to be in the future? - I would like to be [job] because I want to [reason].',
    patternVi: 'Bạn muốn làm gì trong tương lai? - Tớ muốn trở thành [job] vì tớ muốn [reason].',
    formula: 'What would you like to be? - I would like to be a/an + [Nghề] because I want to + [Lý do].',
    category: 'Ước mơ & Nghề nghiệp',
    emoji: '🚀',
    slots: [
      {
        slotName: 'job',
        labelVi: 'Nghề nghiệp ước mơ',
        options: [
          { en: 'a doctor', vi: 'một bác sĩ' },
          { en: 'a pilot', vi: 'một phi công' },
          { en: 'a teacher', vi: 'một thầy/cô giáo' },
          { en: 'an architect', vi: 'một kiến trúc sư' },
          { en: 'a scientist', vi: 'một nhà khoa học' },
          { en: 'an astronaut', vi: 'một phi hành gia' },
        ],
      },
      {
        slotName: 'reason',
        labelVi: 'Lý do yêu thích',
        options: [
          { en: 'help sick people', vi: 'chữa bệnh giúp đỡ mọi người' },
          { en: 'fly modern airplanes across the sky', vi: 'lái những chiếc máy bay hiện đại trên bầu trời' },
          { en: 'teach young children', vi: 'dạy dỗ các em nhỏ nên người' },
          { en: 'design beautiful tall buildings', vi: 'thiết kế những tòa nhà cao tầng tuyệt đẹp' },
          { en: 'explore outer space and stars', vi: 'khám phá không gian vũ trụ và các vì sao' },
        ],
      },
    ],
    dialogue: {
      speakerA: 'Teacher',
      lineAEn: 'What would you like to be in the future, Mai?',
      lineAVi: 'Mai ơi, trong tương lai em muốn làm nghề gì?',
      speakerB: 'Mai',
      lineBEn: 'I would like to be a writer because I want to write inspiring stories for kids.',
      lineBVi: 'Em muốn trở thành một nhà văn vì em muốn viết những câu chuyện truyền cảm hứng cho các bạn nhỏ ạ.',
    },
    tipsVi: 'Dùng mạo từ "an" trước các từ bắt đầu bằng nguyên âm (u, e, o, a, i) như: an architect, an astronaut, an engineer.',
  },
  {
    id: 'p5-directions-places',
    grade: 5,
    titleVi: 'Hỏi và chỉ đường đến địa điểm',
    patternEn: 'Excuse me, how can I get to the [destination]? - [direction].',
    patternVi: 'Xin lỗi, làm sao để đến được [destination]? - Bạn hãy [direction].',
    formula: 'How can I get to the + [Địa điểm]? - [Chỉ đường].',
    category: 'Chỉ đường & Giao thông',
    emoji: '🗺️',
    slots: [
      {
        slotName: 'destination',
        labelVi: 'Địa điểm muốn đến',
        options: [
          { en: 'post office', vi: 'bưu điện' },
          { en: 'zoo', vi: 'sở thú' },
          { en: 'pharmacy', vi: 'hiệu thuốc' },
          { en: 'supermarket', vi: 'siêu thị' },
          { en: 'museum', vi: 'bảo tàng' },
        ],
      },
      {
        slotName: 'direction',
        labelVi: 'Lời chỉ dẫn đường',
        options: [
          { en: 'Go straight ahead and turn left at the corner', vi: 'Đi thẳng về phía trước rồi rẽ trái ở góc phố' },
          { en: 'Turn right at the traffic lights. It is on your left', vi: 'Rẽ phải ở đèn giao thông. Nó ở bên tay trái bạn' },
          { en: 'Take bus number twelve for three stops', vi: 'Hãy bắt xe buýt số 12 và đi 3 trạm' },
          { en: 'Walk two blocks. It is opposite the park', vi: 'Đi bộ qua hai dãy nhà. Nó đối diện công viên' },
        ],
      },
    ],
    dialogue: {
      speakerA: 'Tourist',
      lineAEn: 'Excuse me, how can I get to the city zoo?',
      lineAVi: 'Xin lỗi, làm cách nào để tôi đến được sở thú thành phố ạ?',
      speakerB: 'Policeman',
      lineBEn: 'Go straight ahead and turn left at the bookstore. It is on your right.',
      lineBVi: 'Bạn hãy đi thẳng rồi rẽ trái ở hiệu sách nhé. Sở thú nằm ở ngay bên tay phải bạn.',
    },
    tipsVi: 'Khi hỏi đường người lạ, các con luôn bắt đầu bằng lời chào lịch sự "Excuse me..." nhé!',
  },
];
