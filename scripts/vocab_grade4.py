# -*- coding: utf-8 -*-
# Grade 4 Vocabulary: 10 units, 20-22 words each
G4_UNITS = {}

def add(uid, topic, core, adv):
    res = []
    for i, t in enumerate(core, 1):
        res.append({
            "id": f"{uid}-w{i}", "word": t[0], "ipa": t[1], "partOfSpeech": t[2],
            "meaningVi": t[3], "exampleEn": t[4], "exampleVi": t[5],
            "isCore": True, "unitId": uid, "grade": 4, "topic": topic,
            "collocation": t[6], "examNote": t[7]
        })
    start = len(core) + 1
    for i, t in enumerate(adv, start):
        res.append({
            "id": f"{uid}-w{i}", "word": t[0], "ipa": t[1], "partOfSpeech": t[2],
            "meaningVi": t[3], "exampleEn": t[4], "exampleVi": t[5],
            "isCore": False, "unitId": uid, "grade": 4, "topic": topic,
            "collocation": t[6], "examNote": t[7]
        })
    G4_UNITS[uid] = res

# Unit 1: My Friends & Countries
add('unit-g4-u1', 'Bạn bè & Quốc tịch các nước', [
    ('Vietnam', '/ˌvjetˈnæm/', 'noun', 'Việt Nam', 'I am from Vietnam.', 'Mình đến từ Việt Nam.', 'From Vietnam', 'Tên quốc gia.'),
    ('Vietnamese', '/ˌvjetnəˈmiːz/', 'adjective', 'Người Việt, tiếng Việt', 'I am Vietnamese.', 'Mình là người Việt Nam.', 'Speak Vietnamese', 'Quốc tịch/ngôn ngữ.'),
    ('England', '/ˈɪŋɡlənd/', 'noun', 'Nước Anh', 'He is from England.', 'Bạn ấy đến từ nước Anh.', 'From England', 'Quốc gia châu Âu.'),
    ('English', '/ˈɪŋɡlɪʃ/', 'adjective', 'Tiếng Anh, người Anh', 'We study English.', 'Chúng mình học tiếng Anh.', 'Learn English', 'Môn học/ngôn ngữ.'),
    ('America', '/əˈmerɪkə/', 'noun', 'Nước Mỹ', 'She is from America.', 'Cô ấy đến từ nước Mỹ.', 'USA / America', 'Hoa Kỳ.'),
    ('American', '/əˈmerɪkən/', 'adjective', 'Người Mỹ', 'An American student.', 'Một học sinh người Mỹ.', 'American citizen', 'Quốc tịch.'),
    ('Japan', '/dʒəˈpæn/', 'noun', 'Nước Nhật Bản', 'Akiko is from Japan.', 'Akiko đến từ Nhật Bản.', 'From Japan', 'Nhật Bản.'),
    ('Japanese', '/ˌdʒæpəˈniːz/', 'adjective', 'Người Nhật, tiếng Nhật', 'She is Japanese.', 'Bạn ấy là người Nhật.', 'Speak Japanese', 'Quốc tịch.'),
    ('Australia', '/ɒˈstreɪliə/', 'noun', 'Nước Úc', 'Tony is from Australia.', 'Tony đến từ nước Úc.', 'From Australia', 'Nước Úc.'),
    ('Australian', '/ɒˈstreɪliən/', 'adjective', 'Người Úc', 'An Australian friend.', 'Một người bạn người Úc.', 'Australian flag', 'Quốc tịch.'),
    ('Country', '/ˈkʌntri/', 'noun', 'Đất nước', 'Where is your country?', 'Đất nước bạn ở đâu?', 'Native country', 'Quốc gia.'),
    ('Nationality', '/ˌnæʃəˈnæləti/', 'noun', 'Quốc tịch', 'What nationality are you?', 'Bạn mang quốc tịch gì?', 'Have nationality', 'Quốc tịch.')
], [
    ('Flag', '/flæɡ/', 'noun', 'Lá cờ', 'Red flag with yellow star.', 'Lá cờ đỏ sao vàng.', 'National flag', 'Biểu tượng.'),
    ('Capital', '/ˈkæpɪtl/', 'noun', 'Thủ đô', 'Hanoi is the capital of Vietnam.', 'Hà Nội là thủ đô của Việt Nam.', 'Capital city', 'Trung tâm.'),
    ('World', '/wɜːld/', 'noun', 'Thế giới', 'Travel around the world.', 'Đi du lịch vòng quanh thế giới.', 'Around world', 'Địa cầu.'),
    ('City', '/ˈsɪti/', 'noun', 'Thành phố lớn', 'A modern city.', 'Một thành phố hiện đại.', 'Big city', 'Đô thị.'),
    ('Foreigner', '/ˈfɒrənər/', 'noun', 'Người nước ngoài', 'Talk with a foreigner.', 'Trò chuyện cùng người nước ngoài.', 'Friendly foreigner', 'Du khách.'),
    ('Travel', '/ˈtrævl/', 'verb', 'Du lịch', 'Travel to many countries.', 'Đi du lịch tới nhiều nước.', 'Travel abroad', 'Khám phá.'),
    ('Globe', '/ɡləʊb/', 'noun', 'Quả địa cầu', 'Look at the globe.', 'Nhìn vào quả địa cầu.', 'World globe', 'Mô hình trái đất.'),
    ('Culture', '/ˈkʌltʃər/', 'noun', 'Văn hóa', 'Learn about cultures.', 'Tìm hiểu về các nền văn hóa.', 'Rich culture', 'Bản sắc.')
])

# Unit 2: Time & Daily Routines
add('unit-g4-u2', 'Thời gian & Thói quen hàng ngày', [
    ('Time', '/taɪm/', 'noun', 'Thời gian', 'What time is it?', 'Mấy giờ rồi?', 'What time', 'Hỏi giờ.'),
    ('Clock', '/klɒk/', 'noun', 'Đồng hồ treo tường', 'A clock on the wall.', 'Chiếc đồng hồ trên tường.', 'Wall clock', 'Đồng hồ kim.'),
    ('Watch', '/wɒtʃ/', 'noun', 'Đồng hồ đeo tay', 'My wrist watch.', 'Chiếc đồng hồ đeo tay của mình.', 'Wrist watch', 'Đồng hồ tay.'),
    ('Oclock', '/əˈklɒk/', 'adverb', 'Đúng ... giờ', 'It is seven oclock.', 'Bây giờ là đúng bảy giờ.', 'Seven oclock', 'Giờ đúng.'),
    ('Morning', '/ˈmɔːnɪŋ/', 'noun', 'Buổi sáng', 'In the morning.', 'Vào buổi sáng.', 'In the morning', 'Sáng sớm.'),
    ('Afternoon', '/ˌɑːftəˈnuːn/', 'noun', 'Buổi chiều', 'In the afternoon.', 'Vào buổi chiều.', 'In the afternoon', 'Buổi chiều.'),
    ('Evening', '/ˈiːvnɪŋ/', 'noun', 'Buổi tối', 'In the evening.', 'Vào buổi tối.', 'In the evening', 'Buổi tối.'),
    ('Wake up', '/weɪk ʌp/', 'phrase', 'Thức giấc', 'I wake up at six.', 'Mình thức giấc lúc 6 giờ.', 'Wake up early', 'Thức dậy.'),
    ('Get up', '/ɡet ʌp/', 'phrase', 'Rời khỏi giường', 'Get up early.', 'Rời giường từ sáng sớm.', 'Get up early', 'Bước ra khỏi giường.'),
    ('Brush teeth', '/brʌʃ tiːθ/', 'phrase', 'Đánh răng', 'Brush teeth twice a day.', 'Đánh răng hai lần mỗi ngày.', 'Brush teeth', 'Vệ sinh.'),
    ('Wash face', '/wɒʃ feɪs/', 'phrase', 'Rửa mặt', 'Wash face with cool water.', 'Rửa mặt bằng nước mát.', 'Wash face', 'Vệ sinh sáng.'),
    ('Have breakfast', '/hæv ˈbrekfəst/', 'phrase', 'Ăn sáng', 'Have breakfast with milk.', 'Ăn sáng cùng sữa tươi.', 'Eat breakfast', 'Bữa sáng.')
], [
    ('Go to school', '/ɡəʊ tuː skuːl/', 'phrase', 'Đi học', 'Go to school on time.', 'Đi học đúng giờ.', 'Walk to school', 'Đến trường.'),
    ('Do homework', '/duː ˈhəʊmwɜːk/', 'phrase', 'Làm bài tập về nhà', 'Finish homework.', 'Hoàn thành bài tập về nhà.', 'Finish homework', 'Tự học.'),
    ('Go to bed', '/ɡəʊ tuː bed/', 'phrase', 'Đi ngủ', 'Go to bed before ten.', 'Đi ngủ trước mười giờ tối.', 'Sleep early', 'Nghỉ ngơi.'),
    ('Half past', '/hɑːf pɑːst/', 'phrase', '... giờ rưỡi', 'It is half past six.', 'Bây giờ là sáu giờ rưỡi.', 'Half past', '30 phút qua.'),
    ('Routine', '/ruːˈtiːn/', 'noun', 'Thói quen nền nếp', 'My daily routine.', 'Nền nếp sinh hoạt hàng ngày.', 'Daily routine', 'Lịch trình.'),
    ('Schedule', '/ˈʃedjuːl/', 'noun', 'Lịch trình', 'Follow a schedule.', 'Tuân thủ một lịch trình.', 'Daily schedule', 'Kế hoạch.'),
    ('Midnight', '/ˈmɪdnaɪt/', 'noun', 'Nửa đêm', 'At midnight.', 'Lúc nửa đêm tĩnh lặng.', 'At midnight', 'Khắc 0 giờ.'),
    ('Early', '/ˈɜːli/', 'adjective', 'Sớm', 'Wake up early.', 'Thức dậy sớm.', 'Early bird', 'Trái với late.')
])

# Unit 3: Days of the Week & Schedules
add('unit-g4-u3', 'Các ngày trong tuần & Thời khóa biểu', [
    ('Monday', '/ˈmʌndeɪ/', 'noun', 'Thứ Hai', 'English on Monday.', 'Học tiếng Anh vào Thứ Hai.', 'On Monday', 'Đầu tuần.'),
    ('Tuesday', '/ˈtjuːzdeɪ/', 'noun', 'Thứ Ba', 'Science on Tuesday.', 'Môn khoa học vào Thứ Ba.', 'On Tuesday', 'Thứ Ba.'),
    ('Wednesday', '/ˈwenzdeɪ/', 'noun', 'Thứ Tư', 'Music on Wednesday.', 'Âm nhạc vào Thứ Tư.', 'On Wednesday', 'Giữa tuần.'),
    ('Thursday', '/ˈθɜːzdeɪ/', 'noun', 'Thứ Năm', 'Maths on Thursday.', 'Môn toán vào Thứ Năm.', 'On Thursday', 'Thứ Năm.'),
    ('Friday', '/ˈfraɪdeɪ/', 'noun', 'Thứ Sáu', 'Art class on Friday.', 'Mỹ thuật vào Thứ Sáu.', 'On Friday', 'Cuối tuần học.'),
    ('Saturday', '/ˈsætədeɪ/', 'noun', 'Thứ Bảy', 'Play sports on Saturday.', 'Chơi thể thao vào Thứ Bảy.', 'On Saturday', 'Ngày nghỉ.'),
    ('Sunday', '/ˈsʌndeɪ/', 'noun', 'Chủ Nhật', 'Stay home on Sunday.', 'Nghỉ ở nhà vào Chủ Nhật.', 'On Sunday', 'Ngày cuối tuần.'),
    ('Today', '/təˈdeɪ/', 'noun', 'Hôm nay', 'What day is it today?', 'Hôm nay là thứ mấy?', 'Today is', 'Ngày hiện tại.'),
    ('Tomorrow', '/təˈmɒrəʊ/', 'noun', 'Ngày mai', 'See you tomorrow!', 'Hẹn gặp ngày mai nhé!', 'Tomorrow', 'Ngày sau.'),
    ('Yesterday', '/ˈjestədeɪ/', 'noun', 'Hôm qua', 'Yesterday was Sunday.', 'Hôm qua là Chủ Nhật.', 'Yesterday', 'Ngày trước.'),
    ('Day', '/deɪ/', 'noun', 'Ngày', 'A lovely day.', 'Một ngày tươi đẹp.', 'Nice day', 'Ngày.'),
    ('Week', '/wiːk/', 'noun', 'Tuần lễ', 'Seven days in a week.', 'Bảy ngày trong tuần.', 'Every week', 'Tuần học.')
], [
    ('Weekday', '/ˈwiːkdeɪ/', 'noun', 'Ngày trong tuần', 'Busy on weekdays.', 'Bận rộn các ngày trong tuần.', 'On weekdays', 'Thứ 2 đến 6.'),
    ('Weekend', '/ˌwiːkˈend/', 'noun', 'Cuối tuần', 'Relax at the weekend.', 'Thư giãn vào cuối tuần.', 'At the weekend', 'Thứ 7 & CN.'),
    ('Timetable', '/ˈtaɪmteɪbl/', 'noun', 'Thời khóa biểu', 'Check timetable.', 'Kiểm tra thời khóa biểu.', 'School timetable', 'Lịch học.'),
    ('English club', '/ˈɪŋɡlɪʃ klʌb/', 'noun', 'Câu lạc bộ tiếng Anh', 'Join the club.', 'Tham gia câu lạc bộ.', 'Active club', 'Ngoại khóa.'),
    ('Guitar class', '/ɡɪˈtɑːr klɑːs/', 'noun', 'Lớp ghi-ta', 'Play guitar on Saturday.', 'Học ghi-ta sáng Thứ Bảy.', 'Learn guitar', 'Năng khiếu.'),
    ('Swimming pool', '/ˈswɪmɪŋ puːl/', 'noun', 'Hồ bơi', 'Swim in the pool.', 'Bơi trong hồ bơi trường.', 'Go to pool', 'Bơi lội.'),
    ('Busy', '/ˈbɪzi/', 'adjective', 'Bận rộn', 'A busy day.', 'Một ngày bận rộn.', 'Very busy', 'Nhiều việc.'),
    ('Free', '/friː/', 'adjective', 'Rảnh rỗi', 'I am free today.', 'Hôm nay mình rảnh.', 'Free time', 'Thời gian rảnh.')
])

# Unit 4: Months & Birthdays
add('unit-g4-u4', 'Tháng trong năm & Ngày sinh nhật', [
    ('January', '/ˈdʒænjuəri/', 'noun', 'Tháng Một', 'New Year in January.', 'Năm mới vào Tháng Một.', 'In January', 'Tháng 1.'),
    ('February', '/ˈfebruəri/', 'noun', 'Tháng Hai', 'Tet is often in February.', 'Tết thường vào Tháng Hai.', 'In February', 'Tháng 2.'),
    ('March', '/mɑːtʃ/', 'noun', 'Tháng Ba', 'Spring in March.', 'Mùa xuân trong Tháng Ba.', 'In March', 'Tháng 3.'),
    ('April', '/ˈeɪprəl/', 'noun', 'Tháng Tư', 'Warm days in April.', 'Những ngày ấm áp Tháng Tư.', 'In April', 'Tháng 4.'),
    ('May', '/meɪ/', 'noun', 'Tháng Năm', 'Summer starts in May.', 'Mùa hè bắt đầu từ Tháng Năm.', 'In May', 'Tháng 5.'),
    ('June', '/dʒuːn/', 'noun', 'Tháng Sáu', 'Summer vacation in June.', 'Kỳ nghỉ hè trong Tháng Sáu.', 'In June', 'Tháng 6.'),
    ('July', '/dʒuˈlaɪ/', 'noun', 'Tháng Bảy', 'Travel in July.', 'Đi du lịch vào Tháng Bảy.', 'In July', 'Tháng 7.'),
    ('August', '/ɔːˈɡʌst/', 'noun', 'Tháng Tám', 'Back to school in August.', 'Tựu trường vào Tháng Tám.', 'In August', 'Tháng 8.'),
    ('September', '/sepˈtembər/', 'noun', 'Tháng Chín', 'School opens in September.', 'Khai giảng vào Tháng Chín.', 'In September', 'Tháng 9.'),
    ('October', '/ɒkˈtəʊbər/', 'noun', 'Tháng Mười', 'Cool winds in October.', 'Gió heo may Tháng Mười.', 'In October', 'Tháng 10.'),
    ('November', '/nəʊˈvembər/', 'noun', 'Tháng Mười Một', 'Teachers Day in November.', 'Ngày Nhà giáo Tháng Mười Một.', 'In November', 'Tháng 11.'),
    ('December', '/dɪˈsembər/', 'noun', 'Tháng Mười Hai', 'Christmas in December.', 'Giáng sinh vào Tháng Mười Hai.', 'In December', 'Tháng 12.')
], [
    ('Month', '/mʌnθ/', 'noun', 'Tháng trong năm', 'Twelve months in a year.', 'Mười hai tháng trong một năm.', 'Every month', 'Đơn vị tháng.'),
    ('Birthday', '/ˈbɜːθdeɪ/', 'noun', 'Ngày sinh nhật', 'When is your birthday?', 'Khi nào là ngày sinh nhật bạn?', 'Birthday party', 'Ngày sinh.'),
    ('Date', '/deɪt/', 'noun', 'Ngày tháng cụ thể', 'What is the date today?', 'Hôm nay là ngày mấy tháng mấy?', 'Exact date', 'Ngày tháng.'),
    ('Calendar', '/ˈkælɪndər/', 'noun', 'Tờ lịch', 'Check on the calendar.', 'Tra cứu trên tờ lịch.', 'Wall calendar', 'Lịch treo.'),
    ('Gift', '/ɡɪft/', 'noun', 'Món quà tặng', 'A wonderful birthday gift.', 'Một món quà sinh nhật tuyệt vời.', 'Birthday gift', 'Quà mừng.'),
    ('Present', '/ˈpreznt/', 'noun', 'Quà tặng', 'Open the birthday present.', 'Mở hộp quà sinh nhật.', 'Give present', 'Quà tặng.'),
    ('Invitation card', '/ˌɪnvɪˈteɪʃn kɑːd/', 'noun', 'Thiệp mời', 'Send an invitation card.', 'Gửi một tấm thiệp mời dự tiệc.', 'Party invitation', 'Thiệp mời.'),
    ('Wish', '/wɪʃ/', 'verb / noun', 'Điều ước, chúc mừng', 'Make a birthday wish.', 'Nói lên một điều ước sinh nhật.', 'Best wishes', 'Lời chúc.')
])

# Unit 5: Can & Abilities
add('unit-g4-u5', 'Khả năng & Năng khiếu cá nhân', [
    ('Can', '/kæn/', 'modal verb', 'Có thể (làm được gì)', 'I can swim very well.', 'Mình có thể bơi rất giỏi.', 'Can do', 'Khả năng.'),
    ('Cannot', '/ˈkænɒt/', 'modal verb', 'Không thể', 'He cannot ride a bike.', 'Cậu ấy chưa thể đi xe đạp.', 'Cannot do', 'Viết tắt là cant.'),
    ('Swim', '/swɪm/', 'verb', 'Bơi lội', 'Swim in the deep pool.', 'Bơi trong hồ bơi sâu.', 'Go swimming', 'Môn bơi lội.'),
    ('Dance', '/dɑːns/', 'verb', 'Nhảy múa', 'She dances gracefully.', 'Bạn ấy múa rất duyên dáng.', 'Dance well', 'Khiêu vũ múa.'),
    ('Sing', '/sɪŋ/', 'verb', 'Ca hát', 'Sing English songs.', 'Hát những bài ca tiếng Anh.', 'Sing song', 'Ca hát.'),
    ('Draw', '/drɔː/', 'verb', 'Vẽ tranh', 'Draw beautiful pictures.', 'Vẽ những bức tranh tuyệt đẹp.', 'Draw picture', 'Hội họa.'),
    ('Cook', '/kʊk/', 'verb', 'Nấu ăn', 'My mother cooks well.', 'Mẹ mình nấu ăn rất ngon.', 'Cook meals', 'Ẩm thực.'),
    ('Ride a bike', '/raɪd ə baɪk/', 'phrase', 'Đi xe đạp', 'Ride a bike to school.', 'Đi xe đạp đến trường.', 'Ride bike', 'Đi xe đạp.'),
    ('Play piano', '/pleɪ piˈænəʊ/', 'phrase', 'Chơi đàn pi-a-no', 'Play piano softly.', 'Chơi đàn pi-a-no êm dịu.', 'Play piano', 'Năng khiếu đàn.'),
    ('Skate', '/skeɪt/', 'verb', 'Trượt pa-tin', 'Skate in the park.', 'Trượt pa-tin trong công viên.', 'Roller skate', 'Trượt pa-tin.'),
    ('Surf', '/sɜːf/', 'verb', 'Lướt ván', 'Surf on ocean waves.', 'Lướt trên những con sóng biển.', 'Surf waves', 'Lướt sóng.'),
    ('Speak', '/spiːk/', 'verb', 'Nói chuyện', 'Speak English fluently.', 'Nói tiếng Anh lưu loát.', 'Speak English', 'Giao tiếp.')
], [
    ('Ability', '/əˈbɪləti/', 'noun', 'Khả năng', 'Musical ability.', 'Khả năng âm nhạc thiên bẩm.', 'Special ability', 'Năng lực.'),
    ('Talent', '/ˈtælənt/', 'noun', 'Tài năng', 'She has a talent for art.', 'Bạn ấy có tài năng về hội họa.', 'Natural talent', 'Khiếu nghệ thuật.'),
    ('Skill', '/skɪl/', 'noun', 'Kỹ năng', 'Develop English skills.', 'Phát triển các kỹ năng tiếng Anh.', 'Practice skills', 'Kỹ năng.'),
    ('Practice', '/ˈpræktɪs/', 'verb', 'Luyện tập', 'Practice singing daily.', 'Luyện hát đều đặn mỗi ngày.', 'Practice hard', 'Rèn luyện.'),
    ('Expert', '/ˈekspɜːt/', 'noun / adjective', 'Chuyên gia, thành thạo', 'An expert swimmer.', 'Một tay bơi lội cừ khôi.', 'Expert player', 'Thành thạo.'),
    ('Difficult', '/ˈdɪfɪkəlt/', 'adjective', 'Khó khăn', 'It is not difficult.', 'Điều đó không hề khó đâu.', 'Too difficult', 'Trái với easy.'),
    ('Easy', '/ˈiːzi/', 'adjective', 'Dễ dàng', 'It is easy to learn.', 'Rất dễ dàng để học tập.', 'Easy task', 'Dễ làm.'),
    ('Perform', '/pəˈfɔːm/', 'verb', 'Biểu diễn', 'Perform on stage.', 'Biểu diễn trên sân khấu lớn.', 'Perform music', 'Trình diễn.')
])

# Unit 6: My School & Places
add('unit-g4-u6', 'Trường học & Các phòng chức năng', [
    ('School', '/skuːl/', 'noun', 'Trường học', 'I love my school.', 'Mình yêu ngôi trường của mình.', 'Go to school', 'Trường học.'),
    ('Primary school', '/ˈpraɪməri skuːl/', 'noun', 'Trường tiểu học', 'A green primary school.', 'Một ngôi trường tiểu học xanh sạch.', 'In primary school', 'Cấp 1.'),
    ('Science lab', '/ˈsaɪəns læb/', 'noun', 'Phòng thí nghiệm khoa học', 'Experiments in science lab.', 'Làm thí nghiệm trong phòng khoa học.', 'In science lab', 'Phòng lab.'),
    ('Music room', '/ˈmjuːzɪk ruːm/', 'noun', 'Phòng âm nhạc', 'Sing in the music room.', 'Hát ca trong phòng âm nhạc.', 'In music room', 'Phòng nhạc.'),
    ('Art room', '/ɑːt ruːm/', 'noun', 'Phòng mỹ thuật', 'Paint in the art room.', 'Vẽ tranh trong phòng mỹ thuật.', 'In art room', 'Phòng vẽ.'),
    ('Gym', '/dʒɪm/', 'noun', 'Nhà thể chất', 'Exercise in the gym.', 'Tập thể dục trong nhà thể chất.', 'School gym', 'Phòng tập.'),
    ('Canteen', '/kænˈtiːn/', 'noun', 'Nhà ăn, căng-tin', 'Eat lunch at the canteen.', 'Ăn trưa tại căng-tin trường.', 'School canteen', 'Căng-tin.'),
    ('School yard', '/skuːl jɑːd/', 'noun', 'Sân trường', 'A spacious school yard.', 'Một khoảng sân trường rộng rãi.', 'In school yard', 'Sân chơi.'),
    ('Floor', '/flɔːr/', 'noun', 'Tầng lầu', 'Class on the second floor.', 'Lớp học ở tầng hai.', 'Second floor', 'Tầng nhà.'),
    ('Building', '/ˈbɪldɪŋ/', 'noun', 'Tòa nhà', 'A new three-story building.', 'Tòa nhà ba tầng khang trang mới.', 'School building', 'Dãy nhà.'),
    ('Upstairs', '/ˌʌpˈsteəz/', 'adverb', 'Trên tầng lầu', 'Go upstairs.', 'Đi lên tầng trên.', 'Go upstairs', 'Tầng trên.'),
    ('Downstairs', '/ˌdaʊnˈsteəz/', 'adverb', 'Dưới tầng trệt', 'Wait downstairs.', 'Đợi ở dưới tầng trệt.', 'Go downstairs', 'Tầng dưới.')
], [
    ('Garden', '/ˈɡɑːdn/', 'noun', 'Vườn hoa trường học', 'Flowers in the school garden.', 'Những bông hoa trong vườn trường.', 'School garden', 'Vườn hoa.'),
    ('Facilities', '/fəˈsɪlətiz/', 'noun', 'Cơ sở vật chất', 'Modern school facilities.', 'Cơ sở vật chất trường học hiện đại.', 'Modern facilities', 'Trang thiết bị.'),
    ('Modern', '/ˈmɒdn/', 'adjective', 'Hiện đại', 'A modern primary school.', 'Một trường tiểu học hiện đại.', 'Very modern', 'Tân tiến.'),
    ('Spacious', '/ˈspeɪʃəs/', 'adjective', 'Rộng rãi', 'A spacious playground.', 'Một sân chơi rộng rãi thoáng mát.', 'Spacious yard', 'Rộng rãi.'),
    ('Corridor', '/ˈkɒrɪdɔːr/', 'noun', 'Hành lang', 'Walk along the corridor.', 'Đi dọc theo dãy hành lang lớp học.', 'School corridor', 'Hành lang.'),
    ('Hall', '/hɔːl/', 'noun', 'Hội trường', 'Gather in the school hall.', 'Tập trung ở hội trường trường học.', 'Assembly hall', 'Đại sảnh.'),
    ('Locate', '/ləʊˈkeɪt/', 'verb', 'Tọa lạc, nằm ở', 'The lab is located on floor 3.', 'Phòng lab nằm ở tầng 3.', 'Located on', 'Vị trí.'),
    ('Direction', '/dəˈrekʃn/', 'noun', 'Phương hướng', 'Follow the direction signs.', 'Đi theo các biển chỉ dẫn đường.', 'Follow directions', 'Chỉ đường.')
])

# Unit 7: Favorite Subjects
add('unit-g4-u7', 'Môn học yêu thích & Thời khóa biểu', [
    ('Maths', '/mæθs/', 'noun', 'Môn Toán', 'I like calculating in Maths.', 'Mình thích tính toán trong môn Toán.', 'Study Maths', 'Môn Toán.'),
    ('English', '/ˈɪŋɡlɪʃ/', 'noun', 'Môn Tiếng Anh', 'English is my favorite subject.', 'Tiếng Anh là môn học yêu thích nhất.', 'Learn English', 'Ngoại ngữ.'),
    ('Science', '/ˈsaɪəns/', 'noun', 'Môn Khoa học', 'Discover nature in Science.', 'Khám phá tự nhiên trong môn Khoa học.', 'Science lesson', 'Khoa học.'),
    ('Vietnamese', '/ˌvjetnəˈmiːz/', 'noun', 'Môn Tiếng Việt', 'Read stories in Vietnamese.', 'Đọc truyện hay trong giờ Tiếng Việt.', 'Vietnamese literature', 'Tiếng mẹ đẻ.'),
    ('Art', '/ɑːt/', 'noun', 'Môn Mỹ thuật', 'Draw pictures in Art class.', 'Vẽ tranh trong tiết Mỹ thuật.', 'Art class', 'Mỹ thuật.'),
    ('Music', '/ˈmjuːzɪk/', 'noun', 'Môn Âm nhạc', 'Sing sweet songs in Music.', 'Hát những bài ca ngọt ngào trong giờ Nhạc.', 'Music lesson', 'Âm nhạc.'),
    ('PE', '/ˌpiː ˈiː/', 'noun', 'Môn Thể dục', 'Play sports in PE class.', 'Chơi thể thao trong giờ Thể dục.', 'PE lesson', 'Giáo dục thể chất.'),
    ('History', '/ˈhɪstri/', 'noun', 'Môn Lịch sử', 'Learn heroic stories in History.', 'Học chuyện người anh hùng trong môn Sử.', 'Vietnamese history', 'Lịch sử.'),
    ('Geography', '/dʒiˈɒɡrəfi/', 'noun', 'Môn Địa lý', 'Study maps in Geography.', 'Xem bản đồ trong môn Địa lý.', 'Geography lesson', 'Địa lý.'),
    ('IT', '/ˌaɪ ˈtiː/', 'noun', 'Môn Tin học', 'Type on computers in IT.', 'Gõ bàn phím máy tính trong giờ Tin.', 'IT class', 'Công nghệ tin học.'),
    ('Subject', '/ˈsʌbdʒɪkt/', 'noun', 'Môn học', 'What subjects do you have?', 'Bạn có những môn học nào hôm nay?', 'Favorite subject', 'Môn học.'),
    ('Favorite', '/ˈfeɪvərɪt/', 'adjective', 'Yêu thích nhất', 'My favorite subject is English.', 'Môn học yêu thích nhất là Tiếng Anh.', 'Most favorite', 'Ưa chuộng.')
], [
    ('Lesson', '/ˈlesn/', 'noun', 'Tiết học, bài học', 'We have four lessons today.', 'Hôm nay chúng mình có bốn tiết học.', 'English lesson', 'Tiết học.'),
    ('Learn', '/lɜːn/', 'verb', 'Học hỏi', 'Learn new things every day.', 'Học hỏi những điều mới mẻ mỗi ngày.', 'Learn well', 'Tiếp thu.'),
    ('Study', '/ˈstʌdi/', 'verb', 'Học tập, nghiên cứu', 'Study hard for exams.', 'Chăm chỉ học tập cho kỳ thi.', 'Study hard', 'Ôn bài.'),
    ('Calculate', '/ˈkælkjuleɪt/', 'verb', 'Tính toán', 'Calculate difficult sums.', 'Tính toán những phép tính khó.', 'Calculate sums', 'Làm toán.'),
    ('Melody', '/ˈmelədi/', 'noun', 'Giai điệu', 'A sweet and catchy melody.', 'Một giai điệu êm ái và bắt tai.', 'Sweet melody', 'Âm điệu.'),
    ('Knowledge', '/ˈnɒlɪdʒ/', 'noun', 'Kiến thức', 'Gain useful knowledge.', 'Thu nhận thêm nhiều kiến thức bổ ích.', 'Useful knowledge', 'Hiểu biết.'),
    ('Interesting', '/ˈɪntrəstɪŋ/', 'adjective', 'Thú vị, hấp dẫn', 'An interesting science topic.', 'Một chủ đề khoa học rất thú vị.', 'Very interesting', 'Hấp dẫn.'),
    ('Useful', '/ˈjuːsfl/', 'adjective', 'Hữu ích, bổ ích', 'English is very useful.', 'Tiếng Anh là ngôn ngữ vô cùng hữu ích.', 'Very useful', 'Có ích.')
])

# Unit 8: Free Time & Hobbies
add('unit-g4-u8', 'Sở thích & Thời gian rảnh', [
    ('Hobby', '/ˈhɒbi/', 'noun', 'Sở thích', 'What is your hobby?', 'Sở thích của bạn là gì?', 'Favorite hobby', 'Niềm đam mê.'),
    ('Free time', '/friː taɪm/', 'noun', 'Thời gian rảnh', 'What do you do in free time?', 'Bạn làm gì vào thời gian rảnh rỗi?', 'In free time', 'Lúc rảnh.'),
    ('Read comics', '/riːd ˈkɒmɪks/', 'phrase', 'Đọc truyện tranh', 'Read funny comic books.', 'Đọc những cuốn truyện tranh vui nhộn.', 'Read comics', 'Truyện tranh.'),
    ('Watch cartoons', '/wɒtʃ kɑːˈtuːnz/', 'phrase', 'Xem phim hoạt hình', 'Watch cartoons on TV.', 'Xem phim hoạt hình trên màn hình ti-vi.', 'Watch cartoons', 'Hoạt hình.'),
    ('Go camping', '/ɡəʊ ˈkæmpɪŋ/', 'phrase', 'Đi cắm trại', 'Go camping in the forest.', 'Đi cắm trại trong rừng cây xanh.', 'Go camping', 'Dã ngoại.'),
    ('Go fishing', '/ɡəʊ ˈfɪʃɪŋ/', 'phrase', 'Đi câu cá', 'Go fishing at the weekend.', 'Đi câu cá vào dịp cuối tuần.', 'Go fishing', 'Câu cá.'),
    ('Play video games', '/pleɪ ˈvɪdiəʊ ɡeɪmz/', 'phrase', 'Chơi trò chơi điện tử', 'Play games moderately.', 'Chơi trò chơi điện tử điều độ.', 'Play games', 'Game.'),
    ('Garden', '/ˈɡɑːdn/', 'verb / noun', 'Làm vườn, khu vườn', 'Help grandma garden.', 'Giúp bà làm vườn chăm sóc hoa lá.', 'Do gardening', 'Trồng trọt.'),
    ('Listen to music', '/ˈlɪsn tuː ˈmjuːzɪk/', 'phrase', 'Nghe nhạc', 'Listen to lively music.', 'Nghe những bản nhạc vui tươi.', 'Listen to music', 'Giải trí.'),
    ('Draw pictures', '/drɔː ˈpɪktʃəz/', 'phrase', 'Vẽ tranh', 'Draw colorful pictures.', 'Vẽ những bức tranh rực rỡ sắc màu.', 'Draw pictures', 'Hội họa.'),
    ('Relax', '/rɪˈlæks/', 'verb', 'Thư giãn', 'Relax after school.', 'Thư giãn đầu óc sau giờ tan trường.', 'Relax mind', 'Nghỉ xả hơi.'),
    ('Enjoy', '/ɪnˈdʒɔɪ/', 'verb', 'Thưởng thức, tận hưởng', 'Enjoy my free time.', 'Tận hưởng thời gian rảnh của mình.', 'Enjoy hobby', 'Say mê.')
], [
    ('Leisure', '/ˈleʒər/', 'noun', 'Thời gian giải trí', 'Leisure activities.', 'Những hoạt động giải trí thư thái.', 'Leisure time', 'Lúc rảnh rỗi.'),
    ('Pastime', '/ˈpɑːstaɪm/', 'noun', 'Trò tiêu khiển', 'Fishing is a popular pastime.', 'Câu cá là trò tiêu khiển phổ biến.', 'Favorite pastime', 'Trò vui.'),
    ('Passion', '/ˈpæʃn/', 'noun', 'Niềm say mê', 'A passion for painting.', 'Một niềm say mê cháy bỏng với hội họa.', 'Have passion', 'Đam mê.'),
    ('Creative', '/kriˈeɪtɪv/', 'adjective', 'Sáng tạo', 'A creative hobby.', 'Một sở thích mang tính sáng tạo.', 'Very creative', 'Giàu ý tưởng.'),
    ('Outdoor', '/ˈaʊtdɔːr/', 'adjective', 'Ngoài trời', 'Enjoy outdoor activities.', 'Yêu thích các hoạt động ngoài trời.', 'Outdoor sports', 'Ngoài thiên nhiên.'),
    ('Indoor', '/ˈɪndɔːr/', 'adjective', 'Trong nhà', 'Quiet indoor games.', 'Những trò chơi tĩnh trong nhà.', 'Indoor games', 'Trong phòng.'),
    ('Collect stamps', '/kəˈlekt stæmps/', 'phrase', 'Sưu tầm tem', 'Collect colorful stamps.', 'Sưu tầm những con tem rực rỡ.', 'Collect stamps', 'Thú chơi tem.'),
    ('Hang out', '/hæŋ aʊt/', 'phrase', 'Đi chơi tụ tập', 'Hang out with best friends.', 'Đi chơi cùng những người bạn thân.', 'Hang out with', 'Tụ họp bạn bè.')
])

# Unit 9: In the Classroom & Actions
add('unit-g4-u9', 'Hành động đang diễn ra trong lớp học', [
    ('Read', '/riːd/', 'verb', 'Đọc', 'He is reading a book.', 'Cậu ấy đang chăm chú đọc sách.', 'Read aloud', 'Đọc chữ.'),
    ('Write', '/raɪt/', 'verb', 'Viết bài', 'She is writing an essay.', 'Bạn ấy đang nắn nót viết bài.', 'Write neatly', 'Viết chữ.'),
    ('Speak', '/spiːk/', 'verb', 'Phát biểu', 'Speak clearly.', 'Phát biểu to rõ ràng.', 'Speak up', 'Nói.'),
    ('Talk', '/tɔːk/', 'verb', 'Trò chuyện', 'Do not talk in class.', 'Không nói chuyện riêng trong lớp.', 'Talk quietly', 'Trò chuyện.'),
    ('Discuss', '/dɪˈskʌs/', 'verb', 'Thảo luận', 'Discuss the question.', 'Cùng nhau thảo luận câu hỏi này.', 'Discuss in pairs', 'Trao đổi.'),
    ('Raise hand', '/reɪz hænd/', 'phrase', 'Giơ tay phát biểu', 'Raise your hand first.', 'Hãy giơ tay trước khi nói nhé.', 'Raise your hand', 'Xin phát biểu.'),
    ('Group work', '/ɡruːp wɜːk/', 'noun', 'Làm việc nhóm', 'Cooperate in group work.', 'Hợp tác ăn ý khi làm việc nhóm.', 'In group work', 'Học nhóm.'),
    ('Pay attention', '/peɪ əˈtenʃn/', 'phrase', 'Tập trung chú ý', 'Pay attention to teacher.', 'Tập trung chú ý lắng nghe cô giáo.', 'Pay attention', 'Tập trung.'),
    ('Take notes', '/teɪk nəʊts/', 'phrase', 'Ghi chú bài học', 'Take notes in notebook.', 'Ghi chú cẩn thận vào vở.', 'Take quick notes', 'Ghi chép.'),
    ('Explain', '/ɪkˈspleɪn/', 'verb', 'Giải thích', 'Teacher explains clearly.', 'Cô giáo giải thích bài rất dễ hiểu.', 'Explain lesson', 'Giảng giải.'),
    ('Understand', '/ˌʌndəˈstænd/', 'verb', 'Hiểu bài', 'I understand the rule.', 'Em đã hiểu rõ quy tắc rồi ạ.', 'Understand well', 'Nắm vững.'),
    ('Answer', '/ˈɑːnsər/', 'verb / noun', 'Trả lời, đáp án', 'Answer the question.', 'Trả lời câu hỏi của bài học.', 'Correct answer', 'Câu trả lời.')
], [
    ('Question', '/ˈkwestʃən/', 'noun', 'Câu hỏi', 'Ask a good question.', 'Đặt một câu hỏi hay và sâu sắc.', 'Difficult question', 'Câu hỏi.'),
    ('Exercise', '/ˈeksəsaɪz/', 'noun', 'Bài tập thực hành', 'Do grammar exercises.', 'Làm các bài tập ngữ pháp thực hành.', 'Do exercises', 'Bài luyện tập.'),
    ('Task', '/tɑːsk/', 'noun', 'Nhiệm vụ học tập', 'Complete the learning task.', 'Hoàn thành nhiệm vụ học tập được giao.', 'Complete task', 'Bài tập.'),
    ('Silent', '/ˈsaɪlənt/', 'adjective', 'Yên lặng', 'Keep silent during the test.', 'Giữ yên lặng tuyệt đối trong giờ kiểm tra.', 'Keep silent', 'Trật tự.'),
    ('Cooperate', '/kəʊˈɒpəreɪt/', 'verb', 'Hợp tác', 'Cooperate with classmates.', 'Biết hợp tác nhịp nhàng với bạn bè.', 'Cooperate well', 'Làm việc chung.'),
    ('Complete', '/kəmˈpliːt/', 'verb', 'Hoàn thành', 'Complete the test on time.', 'Hoàn thành bài thi đúng thời hạn.', 'Complete task', 'Làm xong.'),
    ('Active', '/ˈæktɪv/', 'adjective', 'Tích cực', 'An active learner.', 'Một người học tích cực, chủ động.', 'Active student', 'Năng nổ.'),
    ('Neat', '/niːt/', 'adjective', 'Nắn nót, gọn gàng', 'Write in neat handwriting.', 'Viết bằng nét chữ nắn nót, gọn gàng.', 'Neat handwriting', 'Chữ đẹp.')
])

# Unit 10: Where Were You Yesterday?
add('unit-g4-u10', 'Hôm qua bạn ở đâu? (Quá khứ Was/Were)', [
    ('Yesterday', '/ˈjestədeɪ/', 'adverb / noun', 'Ngày hôm qua', 'Where were you yesterday?', 'Hôm qua bạn ở đâu thế?', 'Yesterday morning', 'Quá khứ gần.'),
    ('Last week', '/lɑːst wiːk/', 'phrase', 'Tuần trước', 'I was in Hue last week.', 'Tuần trước mình ở thành phố Huế.', 'Last week', 'Thời gian quá khứ.'),
    ('Last month', '/lɑːst mʌnθ/', 'phrase', 'Tháng trước', 'We visited Ha Long last month.', 'Tháng trước chúng mình thăm Hạ Long.', 'Last month', 'Tháng vừa qua.'),
    ('Was', '/wɒz/', 'verb', 'Đã ở, là (số ít)', 'I was at home yesterday.', 'Hôm qua mình đã ở nhà.', 'Was at home', 'Quá khứ của is/am.'),
    ('Were', '/wɜːr/', 'verb', 'Đã ở, là (số nhiều)', 'They were on the beach.', 'Họ đã ở trên bãi biển vào hôm qua.', 'Were on beach', 'Quá khứ của are.'),
    ('At home', '/æt həʊm/', 'phrase', 'Ở tại nhà', 'I was at home all day.', 'Mình đã ở nhà suốt cả ngày hôm qua.', 'Stay at home', 'Tại gia đình.'),
    ('At school', '/æt skuːl/', 'phrase', 'Ở tại trường học', 'We were at school.', 'Chúng mình đã ở trường học cả ngày.', 'At school', 'Ở trường.'),
    ('On the beach', '/ɒn ðə biːtʃ/', 'phrase', 'Ở trên bãi biển', 'Children were on the beach.', 'Các bạn nhỏ đã nô đùa trên bãi biển.', 'On the beach', 'Biển xanh.'),
    ('At the zoo', '/æt ðə zuː/', 'phrase', 'Ở vườn bách thú', 'We were at the zoo.', 'Chúng mình đã đi xem sở thú hôm qua.', 'At the zoo', 'Vườn thú.'),
    ('In the countryside', '/ɪn ðə ˈkʌntrisaɪd/', 'phrase', 'Ở miền thôn quê', 'I was in the countryside.', 'Mình đã về quê thăm ông bà tuần trước.', 'In countryside', 'Vùng quê.'),
    ('Stay', '/steɪ/', 'verb', 'Ở lại, lưu lại', 'I stayed with grandparents.', 'Mình đã ở lại cùng ông bà nội.', 'Stay with', 'Lưu trú.'),
    ('Visit', '/ˈvɪzɪt/', 'verb', 'Thăm viếng, tham quan', 'Visit historic places.', 'Đến thăm những danh lam thắng cảnh.', 'Visit family', 'Đi thăm.')
], [
    ('Trip', '/trɪp/', 'noun', 'Chuyến đi tham quan', 'A memorable school trip.', 'Một chuyến đi tham quan đáng nhớ.', 'School trip', 'Chuyến dã ngoại.'),
    ('Place', '/pleɪs/', 'noun', 'Địa điểm, nơi chốn', 'A wonderful place.', 'Một địa điểm vô cùng tuyệt vời.', 'Beautiful place', 'Nơi chốn.'),
    ('Memory', '/ˈmeməri/', 'noun', 'Kỷ niệm đẹp', 'Sweet childhood memories.', 'Những kỷ niệm tuổi thơ êm đềm.', 'Sweet memory', 'Ký ức.'),
    ('Enjoyable', '/ɪnˈdʒɔɪəbl/', 'adjective', 'Thích thú, vui vẻ', 'An enjoyable holiday trip.', 'Một chuyến du lịch nghỉ ngơi thích thú.', 'Very enjoyable', 'Dễ chịu.'),
    ('Wonderful', '/ˈwʌndəfl/', 'adjective', 'Tuyệt vời', 'We had a wonderful time.', 'Chúng mình đã có khoảng thời gian tuyệt vời.', 'Wonderful time', 'Tuyệt diệu.'),
    ('Peaceful', '/ˈpiːsfl/', 'adjective', 'Yên bình', 'A peaceful village in the hills.', 'Một ngôi làng yên bình giữa đồi núi.', 'Peaceful place', 'Thanh bình.'),
    ('Returned', '/rɪˈtɜːnd/', 'verb (past)', 'Đã trở về', 'We returned home yesterday.', 'Chúng mình đã trở về nhà vào ngày hôm qua.', 'Return home', 'Quay lại.'),
    ('Travel', '/ˈtrævl/', 'verb', 'Đi lại, du hành', 'Travel by express train.', 'Du lịch bằng chuyến tàu hỏa tốc hành.', 'Travel by train', 'Đi lại.')
])

print("vocab_grade4.py loaded with 10 units")
