# Generator for Grade 4 & 5
import os

g4_code = '''
# ----------------- GRADE 4 -----------------
reg('unit-g4-u1', 4, 'Bạn bè & Quốc tịch các nước', [
    ('Vietnam', '/ˌvjetˈnæm/', 'noun', 'Việt Nam', 'I am from Vietnam.', 'Mình đến từ Việt Nam.', True, 'From Vietnam', 'Tên quốc gia.'),
    ('Vietnamese', '/ˌvjetnəˈmiːz/', 'adjective / noun', 'Người Việt Nam, tiếng Việt', 'I am Vietnamese.', 'Mình là người Việt Nam.', True, 'Speak Vietnamese', 'Quốc tịch/ngôn ngữ.'),
    ('England', '/ˈɪŋɡlənd/', 'noun', 'Nước Anh', 'He is from England.', 'Bạn ấy đến từ nước Anh.', True, 'From England', 'Quốc gia châu Âu.'),
    ('English', '/ˈɪŋɡlɪʃ/', 'adjective / noun', 'Tiếng Anh, người Anh', 'We study English.', 'Chúng mình học tiếng Anh.', True, 'Learn English', 'Môn học/ngôn ngữ.'),
    ('America', '/əˈmerɪkə/', 'noun', 'Nước Mỹ, Hoa Kỳ', 'She is from America.', 'Cô ấy đến từ nước Mỹ.', True, 'USA / America', 'Hợp chủng quốc Hoa Kỳ.'),
    ('American', '/əˈmerɪkən/', 'adjective / noun', 'Người Mỹ', 'An American student.', 'Một học sinh người Mỹ.', True, 'American citizen', 'Quốc tịch.'),
    ('Japan', '/dʒəˈpæn/', 'noun', 'Nước Nhật Bản', 'Akiko is from Japan.', 'Akiko đến từ đất nước Nhật Bản.', True, 'From Japan', 'Đất nước mặt trời mọc.'),
    ('Japanese', '/ˌdʒæpəˈniːz/', 'adjective / noun', 'Người Nhật, tiếng Nhật', 'She is Japanese.', 'Bạn ấy là người Nhật.', True, 'Speak Japanese', 'Quốc tịch/ngôn ngữ.'),
    ('Australia', '/ɒˈstreɪliə/', 'noun', 'Nước Úc', 'Tony is from Australia.', 'Tony đến từ nước Úc.', True, 'From Australia', 'Xứ sở chuột túi.'),
    ('Australian', '/ɒˈstreɪliən/', 'adjective / noun', 'Người Úc', 'An Australian friend.', 'Một người bạn người Úc.', True, 'Australian flag', 'Quốc tịch.'),
    ('Country', '/ˈkʌntri/', 'noun', 'Đất nước, quốc gia', 'Where is your country?', 'Đất nước của bạn ở đâu?', True, 'Native country', 'Quốc gia.'),
    ('Nationality', '/ˌnæʃəˈnæləti/', 'noun', 'Quốc tịch', 'What nationality are you?', 'Bạn mang quốc tịch gì?', True, 'Have nationality', 'Quốc tịch của một người.'),
    # Adv
    ('Flag', '/flæɡ/', 'noun', 'Lá cờ tổ quốc', 'Red flag with yellow star.', 'Lá cờ đỏ sao vàng thiêng liêng.', False, 'National flag', 'Biểu tượng quốc gia.'),
    ('Capital', '/ˈkæpɪtl/', 'noun', 'Thủ đô', 'Hanoi is the capital of Vietnam.', 'Hà Nội là thủ đô của Việt Nam.', False, 'Capital city', 'Trung tâm chính trị.'),
    ('World', '/wɜːld/', 'noun', 'Thế giới', 'Travel around the world.', 'Đi du lịch vòng quanh thế giới.', False, 'Around the world', 'Địa cầu.'),
    ('City', '/ˈsɪti/', 'noun', 'Thành phố lớn', 'A modern city.', 'Một thành phố văn minh hiện đại.', False, 'Big city', 'Đô thị đông đúc.'),
    ('Foreigner', '/ˈfɒrənər/', 'noun', 'Người nước ngoài', 'Talk with a foreigner.', 'Trò chuyện cùng người nước ngoài.', False, 'Friendly foreigner', 'Du khách quốc tế.'),
    ('Travel', '/ˈtrævl/', 'verb', 'Du lịch, đi lại', 'Travel to many countries.', 'Đi du lịch tới nhiều nước.', False, 'Travel abroad', 'Khám phá thế giới.'),
    ('Globe', '/ɡləʊb/', 'noun', 'Quả địa cầu', 'Look at the spinning globe.', 'Nhìn vào quả địa cầu đang xoay tròn.', False, 'World globe', 'Mô hình trái đất.'),
    ('Continent', '/ˈkɒntɪnənt/', 'noun', 'Châu lục', 'Asia is the largest continent.', 'Châu Á là châu lục rộng lớn nhất.', False, 'Seven continents', 'Lục địa thế giới.'),
    ('Culture', '/ˈkʌltʃər/', 'noun', 'Văn hóa bản địa', 'Learn about rich cultures.', 'Tìm hiểu về những nền văn hóa giàu bản sắc.', False, 'Rich culture', 'Bản sắc văn hóa.')
])

reg('unit-g4-u2', 4, 'Thời gian & Thói quen hàng ngày', [
    ('Time', '/taɪm/', 'noun', 'Thời gian', 'What time is it?', 'Bây giờ là mấy giờ rồi?', True, 'What time', 'Hỏi giờ.'),
    ('Clock', '/klɒk/', 'noun', 'Đồng hồ treo tường', 'A clock on the wall.', 'Chiếc đồng hồ trên tường.', True, 'Wall clock', 'Đồng hồ kim.'),
    ('Watch', '/wɒtʃ/', 'noun', 'Đồng hồ đeo tay', 'My new wrist watch.', 'Chiếc đồng hồ đeo tay mới.', True, 'Wrist watch', 'Đồng hồ đeo tay.'),
    ('Oclock', '/əˈklɒk/', 'adverb', 'Đúng ... giờ', 'It is seven oclock.', 'Bây giờ là đúng bảy giờ.', True, 'Seven oclock', 'Dùng cho giờ đúng.'),
    ('Morning', '/ˈmɔːnɪŋ/', 'noun', 'Buổi sáng', 'In the early morning.', 'Vào sáng sớm mai.', True, 'In the morning', 'Sáng sớm.'),
    ('Afternoon', '/ˌɑːftəˈnuːn/', 'noun', 'Buổi chiều', 'In the afternoon.', 'Vào buổi chiều.', True, 'In the afternoon', 'Buổi chiều.'),
    ('Evening', '/ˈiːvnɪŋ/', 'noun', 'Buổi tối', 'In the cozy evening.', 'Vào buổi tối ấm áp.', True, 'In the evening', 'Buổi tối.'),
    ('Wake up', '/weɪk ʌp/', 'phrase', 'Thức giấc', 'I wake up at six.', 'Mình thức giấc lúc 6 giờ.', True, 'Wake up early', 'Mở mắt thức dậy.'),
    ('Get up', '/ɡet ʌp/', 'phrase', 'Rời khỏi giường', 'Get up and do exercise.', 'Rời giường và tập thể dục.', True, 'Get up early', 'Bước ra khỏi giường.'),
    ('Brush teeth', '/brʌʃ tiːθ/', 'phrase', 'Đánh răng sạch sẽ', 'Brush teeth twice a day.', 'Đánh răng hai lần mỗi ngày.', True, 'Brush your teeth', 'Vệ sinh răng miệng.'),
    ('Wash face', '/wɒʃ feɪs/', 'phrase', 'Rửa mặt', 'Wash face with cool water.', 'Rửa mặt bằng nước mát.', True, 'Wash your face', 'Vệ sinh buổi sáng.'),
    ('Have breakfast', '/hæv ˈbrekfəst/', 'phrase', 'Ăn bữa sáng', 'Have breakfast with milk.', 'Ăn sáng cùng một ly sữa.', True, 'Eat breakfast', 'Bữa ăn quan trọng nhất.'),
    # Adv
    ('Go to school', '/ɡəʊ tuː skuːl/', 'phrase', 'Đi đến trường', 'Go to school on time.', 'Đi học đúng giờ quy định.', False, 'Walk to school', 'Đến lớp học.'),
    ('Do homework', '/duː ˈhəʊmwɜːk/', 'phrase', 'Làm bài tập về nhà', 'Finish homework early.', 'Hoàn thành bài tập về nhà sớm.', False, 'Finish homework', 'Tự học ở nhà.'),
    ('Go to bed', '/ɡəʊ tuː bed/', 'phrase', 'Đi ngủ buổi tối', 'Go to bed before ten.', 'Đi ngủ trước mười giờ tối.', False, 'Sleep early', 'Nghỉ ngơi ban đêm.'),
    ('Half past', '/hɑːf pɑːst/', 'phrase', '... giờ rưỡi (30 phút)', 'It is half past six.', 'Bây giờ là sáu giờ rưỡi.', False, 'Half past six', '30 phút qua.'),
    ('Routine', '/ruːˈtiːn/', 'noun', 'Thói quen nền nếp', 'My daily routine.', 'Nền nếp sinh hoạt hàng ngày.', False, 'Daily routine', 'Lịch trình đều đặn.'),
    ('Schedule', '/ˈʃedjuːl/', 'noun', 'Lịch trình làm việc', 'Follow a tight schedule.', 'Tuân thủ một lịch trình chặt chẽ.', False, 'Daily schedule', 'Kế hoạch thời gian.'),
    ('Midnight', '/ˈmɪdnaɪt/', 'noun', 'Nửa đêm (12h đêm)', 'At midnight.', 'Lúc nửa đêm tĩnh lặng.', False, 'At midnight', 'Khắc 0 giờ.'),
    ('Early', '/ˈɜːli/', 'adjective / adverb', 'Sớm', 'Wake up early.', 'Thức dậy từ sáng sớm.', False, 'Early bird', 'Trái với late.'),
    ('Late', '/leɪt/', 'adjective / adverb', 'Muộn, trễ giờ', 'Do not be late.', 'Đừng bao giờ đến muộn nhé.', False, 'Be late for school', 'Trái với early.')
])

reg('unit-g4-u3', 4, 'Các ngày trong tuần & Thời khóa biểu', [
    ('Monday', '/ˈmʌndeɪ/', 'noun', 'Thứ Hai', 'We have English on Monday.', 'Chúng mình học tiếng Anh vào Thứ Hai.', True, 'On Monday', 'Ngày đầu tuần.'),
    ('Tuesday', '/ˈtjuːzdeɪ/', 'noun', 'Thứ Ba', 'Science on Tuesday.', 'Môn khoa học vào Thứ Ba.', True, 'On Tuesday', 'Thứ Ba.'),
    ('Wednesday', '/ˈwenzdeɪ/', 'noun', 'Thứ Tư', 'Music on Wednesday.', 'Học âm nhạc vào Thứ Tư.', True, 'On Wednesday', 'Giữa tuần.'),
    ('Thursday', '/ˈθɜːzdeɪ/', 'noun', 'Thứ Năm', 'Maths on Thursday.', 'Môn toán vào Thứ Năm.', True, 'On Thursday', 'Thứ Năm.'),
    ('Friday', '/ˈfraɪdeɪ/', 'noun', 'Thứ Sáu', 'Art class on Friday.', 'Tiết mỹ thuật vào Thứ Sáu.', True, 'On Friday', 'Ngày học cuối tuần.'),
    ('Saturday', '/ˈsætədeɪ/', 'noun', 'Thứ Bảy', 'Play sports on Saturday.', 'Chơi thể thao vào Thứ Bảy.', True, 'On Saturday', 'Ngày nghỉ.'),
    ('Sunday', '/ˈsʌndeɪ/', 'noun', 'Chủ Nhật', 'Stay at home on Sunday.', 'Nghỉ ngơi ở nhà vào Chủ Nhật.', True, 'On Sunday', 'Ngày cuối tuần.'),
    ('Today', '/təˈdeɪ/', 'noun / adverb', 'Hôm nay', 'What day is it today?', 'Hôm nay là thứ mấy?', True, 'Today is Monday', 'Ngày hiện tại.'),
    ('Tomorrow', '/təˈmɒrəʊ/', 'noun / adverb', 'Ngày mai', 'See you tomorrow!', 'Hẹn gặp lại bạn vào ngày mai nhé!', True, 'Tomorrow morning', 'Ngày tiếp theo.'),
    ('Yesterday', '/ˈjestədeɪ/', 'noun / adverb', 'Hôm qua', 'Yesterday was Sunday.', 'Hôm qua là ngày Chủ Nhật.', True, 'Yesterday afternoon', 'Ngày đã qua.'),
    ('Day', '/deɪ/', 'noun', 'Ngày trong tuần', 'A lovely day.', 'Một ngày thật tươi đẹp.', True, 'Nice day', 'Đơn vị ngày.'),
    ('Week', '/wiːk/', 'noun', 'Tuần lễ (7 ngày)', 'Seven days in a week.', 'Có bảy ngày trong một tuần lễ.', True, 'Every week', 'Tuần học.'),
    # Adv
    ('Weekday', '/ˈwiːkdeɪ/', 'noun', 'Ngày trong tuần (T2-T6)', 'Busy on weekdays.', 'Bận rộn vào các ngày trong tuần.', False, 'On weekdays', 'Từ thứ 2 đến thứ 6.'),
    ('Weekend', '/ˌwiːkˈend/', 'noun', 'Cuối tuần (T7-CN)', 'Relax at the weekend.', 'Thư giãn vào dịp cuối tuần.', False, 'At the weekend', 'Thứ 7 và Chủ Nhật.'),
    ('Timetable', '/ˈtaɪmteɪbl/', 'noun', 'Thời khóa biểu', 'Check the class timetable.', 'Kiểm tra thời khóa biểu của lớp.', False, 'School timetable', 'Lịch học các môn.'),
    ('English club', '/ˈɪŋɡlɪʃ klʌb/', 'noun', 'Câu lạc bộ tiếng Anh', 'Join the English club.', 'Tham gia câu lạc bộ tiếng Anh.', False, 'Active club', 'Sinh hoạt ngoại khóa.'),
    ('Guitar class', '/ɡɪˈtɑːr klɑːs/', 'noun', 'Lớp học đàn ghi-ta', 'Play guitar on Saturday.', 'Học đàn ghi-ta vào sáng Thứ Bảy.', False, 'Learn guitar', 'Năng khiếu âm nhạc.'),
    ('Swimming pool', '/ˈswɪmɪŋ puːl/', 'noun', 'Hồ bơi', 'Swim in the school pool.', 'Bơi lội trong hồ bơi trường.', False, 'Go to the pool', 'Thể thao bơi lội.'),
    ('Busy', '/ˈbɪzi/', 'adjective', 'Bận rộn', 'A busy school day.', 'Một ngày học bận rộn nhiều môn.', False, 'Very busy', 'Nhiều việc phải làm.'),
    ('Free', '/friː/', 'adjective', 'Rảnh rỗi', 'I am free this afternoon.', 'Chiều nay mình rảnh rỗi không bận gì.', False, 'Free time', 'Có thời gian rảnh.'),
    ('Every day', '/ˈevri deɪ/', 'phrase', 'Mỗi ngày, hàng ngày', 'Practice English every day.', 'Luyện tập tiếng Anh đều đặn mỗi ngày.', False, 'Learn every day', 'Thường xuyên.')
])
'''

with open("scripts/data_primary.py", "a") as f:
    f.write(g4_code)

print("Grade 4 appended successfully")
