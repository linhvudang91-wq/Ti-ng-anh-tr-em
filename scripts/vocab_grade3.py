# -*- coding: utf-8 -*-
# Grade 3 Vocabulary: 10 units, 20-22 words each
G3_UNITS = {}

def add(uid, topic, core, adv):
    res = []
    for i, t in enumerate(core, 1):
        res.append({
            "id": f"{uid}-w{i}", "word": t[0], "ipa": t[1], "partOfSpeech": t[2],
            "meaningVi": t[3], "exampleEn": t[4], "exampleVi": t[5],
            "isCore": True, "unitId": uid, "grade": 3, "topic": topic,
            "collocation": t[6], "examNote": t[7]
        })
    start = len(core) + 1
    for i, t in enumerate(adv, start):
        res.append({
            "id": f"{uid}-w{i}", "word": t[0], "ipa": t[1], "partOfSpeech": t[2],
            "meaningVi": t[3], "exampleEn": t[4], "exampleVi": t[5],
            "isCore": False, "unitId": uid, "grade": 3, "topic": topic,
            "collocation": t[6], "examNote": t[7]
        })
    G3_UNITS[uid] = res

# Unit 1: Hello & Greetings
add('unit-g3-u1', 'Chào hỏi & Làm quen', [
    ('Hello', '/həˈləʊ/', 'interjection', 'Xin chào', 'Hello, my name is Mai.', 'Xin chào, tên mình là Mai.', 'Say hello', 'Dùng chào hỏi lịch sự.'),
    ('Hi', '/haɪ/', 'interjection', 'Chào (thân mật)', 'Hi Nam, how are you?', 'Chào Nam, bạn khỏe không?', 'Hi there', 'Dùng cho bạn bè.'),
    ('Friend', '/frend/', 'noun', 'Người bạn', 'This is my friend Mai.', 'Đây là bạn Mai của mình.', 'Best friend', 'Số nhiều là friends.'),
    ('Teacher', '/ˈtiːtʃər/', 'noun', 'Thầy / Cô giáo', 'Good morning, teacher!', 'Em chào cô buổi sáng ạ!', 'English teacher', 'Danh từ chỉ nghề.'),
    ('Goodbye', '/ˌɡʊdˈbaɪ/', 'interjection', 'Tạm biệt', 'Goodbye, see you again!', 'Tạm biệt, hẹn gặp lại!', 'Say goodbye', 'Chào tạm biệt.'),
    ('Bye', '/baɪ/', 'interjection', 'Tạm biệt', 'Bye, Tony! See you later.', 'Tạm biệt Tony, hẹn gặp lại nhé.', 'Bye for now', 'Chào thân mật.'),
    ('Name', '/neɪm/', 'noun', 'Tên gọi', 'What is your name?', 'Tên của bạn là gì?', 'First name', 'Cấu trúc My name is.'),
    ('Fine', '/faɪn/', 'adjective', 'Khỏe, tốt', 'I am fine, thank you.', 'Mình khỏe, cảm ơn bạn.', 'Feel fine', 'Dùng trả lời How are you.'),
    ('Thank you', '/ˈθæŋk juː/', 'phrase', 'Cảm ơn bạn', 'Thank you very much!', 'Cảm ơn bạn rất nhiều!', 'Thank you so much', 'Lời cảm ơn lịch sự.'),
    ('Thanks', '/θæŋks/', 'interjection', 'Cảm ơn', 'Thanks a lot!', 'Cảm ơn nhiều nhé!', 'Many thanks', 'Dùng thân mật.'),
    ('Meet', '/miːt/', 'verb', 'Gặp gỡ', 'Nice to meet you.', 'Rất vui được gặp bạn.', 'Meet friends', 'Nice to meet you.'),
    ('How', '/haʊ/', 'adverb', 'Như thế nào', 'How are you today?', 'Hôm nay bạn thế nào?', 'How do you do', 'Từ để hỏi.')
], [
    ('Classmate', '/ˈklɑːsmeɪt/', 'noun', 'Bạn cùng lớp', 'She is my new classmate.', 'Bạn ấy là bạn cùng lớp mới của mình.', 'Help classmate', 'Bạn cùng lớp.'),
    ('Pleasure', '/ˈpleʒər/', 'noun', 'Niềm vinh hạnh', 'It is a pleasure to meet you.', 'Rất hân hạnh được gặp bạn.', 'My pleasure', 'Lời đáp lịch sự.'),
    ('Pleased', '/pliːzd/', 'adjective', 'Vui mừng', 'Pleased to meet you, teacher.', 'Rất vui mừng được gặp cô ạ.', 'Pleased to meet you', 'Trang trọng hơn.'),
    ('Morning', '/ˈmɔːnɪŋ/', 'noun', 'Buổi sáng', 'Good morning, class!', 'Chào buổi sáng cả lớp!', 'Good morning', 'Trước 12h trưa.'),
    ('Afternoon', '/ˌɑːftəˈnuːn/', 'noun', 'Buổi chiều', 'Good afternoon everyone!', 'Chào buổi chiều mọi người!', 'In the afternoon', '12h đến 18h.'),
    ('Evening', '/ˈiːvnɪŋ/', 'noun', 'Buổi tối', 'Good evening, Sir.', 'Chào buổi tối thưa ngài.', 'In the evening', 'Chào buổi tối.'),
    ('Welcome', '/ˈwelkəm/', 'verb', 'Chào đón', 'Welcome to our class!', 'Chào đón bạn đến lớp của chúng mình!', 'Warm welcome', 'You are welcome.'),
    ('Introduce', '/ˌɪntrəˈdjuːs/', 'verb', 'Giới thiệu', 'Let me introduce myself.', 'Để mình tự giới thiệu bản thân nhé.', 'Introduce oneself', 'Giới thiệu tên tuổi.'),
    ('Spell', '/spel/', 'verb', 'Đánh vần', 'How do you spell your name?', 'Bạn đánh vần tên như thế nào?', 'Spell your name', 'Đánh vần chữ cái.')
])

# Unit 2: My Friends & Classroom
add('unit-g3-u2', 'Bạn bè & Lớp học', [
    ('Classroom', '/ˈklɑːsruːm/', 'noun', 'Lớp học', 'Our classroom is clean.', 'Lớp học của chúng mình rất sạch.', 'In the classroom', 'Phòng học.'),
    ('Desk', '/desk/', 'noun', 'Bàn học', 'Sit down at your desk.', 'Ngồi vào bàn học đi nào.', 'Study desk', 'Bàn có ngăn.'),
    ('Chair', '/tʃeər/', 'noun', 'Cái ghế', 'There is a chair here.', 'Có một cái ghế ở đây.', 'Wooden chair', 'Ghế tựa.'),
    ('Door', '/dɔːr/', 'noun', 'Cửa ra vào', 'Open the door, please.', 'Làm ơn mở cửa ra.', 'Open door', 'Cửa chính.'),
    ('Window', '/ˈwɪndəʊ/', 'noun', 'Cửa sổ', 'Close the window.', 'Đóng cửa sổ lại.', 'Open window', 'Cửa sổ phòng.'),
    ('Board', '/bɔːd/', 'noun', 'Cái bảng', 'Look at the board.', 'Nhìn lên bảng nào.', 'Whiteboard', 'Bảng viết.'),
    ('Pupil', '/ˈpjuːpl/', 'noun', 'Học sinh tiểu học', 'She is a good pupil.', 'Em ấy là học sinh chăm.', 'Primary pupil', 'Học sinh tiểu học.'),
    ('Stand up', '/stænd ʌp/', 'phrase', 'Đứng lên', 'Stand up, please.', 'Mời các em đứng lên.', 'Stand up straight', 'Khẩu lệnh.'),
    ('Sit down', '/sɪt daʊn/', 'phrase', 'Ngồi xuống', 'Sit down, please.', 'Mời các em ngồi xuống.', 'Sit down quietly', 'Khẩu lệnh.'),
    ('Open', '/ˈəʊpən/', 'verb', 'Mở ra', 'Open your book.', 'Mở sách của em ra.', 'Open book', 'Trái với close.'),
    ('Close', '/kləʊz/', 'verb', 'Gấp lại, đóng lại', 'Close your notebooks.', 'Gấp vở lại nhé.', 'Close book', 'Trái với open.'),
    ('Look', '/lʊk/', 'verb', 'Nhìn, xem', 'Look at the picture.', 'Nhìn vào bức tranh này.', 'Look at', 'Đi với giới từ at.')
], [
    ('Library', '/ˈlaɪbrəri/', 'noun', 'Thư viện', 'We read books in the library.', 'Chúng mình đọc sách ở thư viện.', 'School library', 'Nơi mượn sách.'),
    ('Playground', '/ˈpleɪɡraʊnd/', 'noun', 'Sân chơi', 'Play in the playground.', 'Chơi ở sân chơi trường.', 'School playground', 'Sân trường.'),
    ('Computer room', '/kəmˈpjuːtər ruːm/', 'noun', 'Phòng tin học', 'Study in the computer room.', 'Học trong phòng máy tính.', 'IT room', 'Phòng chức năng.'),
    ('Clean', '/kliːn/', 'adjective', 'Sạch sẽ', 'Our classroom is clean.', 'Lớp học rất sạch sẽ.', 'Keep clean', 'Trái với dirty.'),
    ('Bright', '/braɪt/', 'adjective', 'Sáng sủa', 'A bright classroom.', 'Lớp học đầy ánh sáng.', 'Bright light', 'Ánh sáng tốt.'),
    ('Listen', '/ˈlɪsn/', 'verb', 'Lắng nghe', 'Listen to teacher.', 'Lắng nghe cô giáo.', 'Listen carefully', 'Đi với to.'),
    ('Quiet', '/ˈkwaɪət/', 'adjective', 'Yên lặng', 'Keep quiet, please.', 'Xin hãy giữ yên lặng.', 'Be quiet', 'Không làm ồn.'),
    ('Floor', '/flɔːr/', 'noun', 'Sàn nhà', 'Clean the floor.', 'Lau sạch sàn nhà.', 'On the floor', 'Sàn phòng học.'),
    ('Wall', '/wɔːl/', 'noun', 'Bức tường', 'Pictures on the wall.', 'Những bức tranh trên tường.', 'On the wall', 'Tường lớp học.')
])

# Unit 3: School Things & Supplies
add('unit-g3-u3', 'Đồ dùng học tập', [
    ('Pen', '/pen/', 'noun', 'Bút mực, bút bi', 'I have a pen.', 'Tôi có một cây bút.', 'Blue pen', 'Bút viết.'),
    ('Pencil', '/ˈpensl/', 'noun', 'Bút chì', 'Draw with a pencil.', 'Vẽ bằng bút chì.', 'Sharp pencil', 'Bút chì than.'),
    ('Ruler', '/ˈruːlər/', 'noun', 'Thước kẻ', 'A straight ruler.', 'Cái thước kẻ thẳng.', 'Plastic ruler', 'Dụng cụ đo.'),
    ('Eraser', '/ɪˈreɪsər/', 'noun', 'Cục tẩy', 'Use an eraser.', 'Dùng cục tẩy chì.', 'Rubber eraser', 'Tẩy chì.'),
    ('Book', '/bʊk/', 'noun', 'Quyển sách', 'An English book.', 'Một cuốn sách tiếng Anh.', 'Read book', 'Sách giáo khoa.'),
    ('Notebook', '/ˈnəʊtbʊk/', 'noun', 'Vở ghi', 'Write in notebook.', 'Viết vào vở.', 'Open notebook', 'Vở bài học.'),
    ('School bag', '/ˈskuːl bæɡ/', 'noun', 'Cặp sách', 'A new school bag.', 'Một chiếc cặp sách mới.', 'Pack school bag', 'Cặp đi học.'),
    ('Pencil case', '/ˈpensl keɪs/', 'noun', 'Hộp bút', 'Pens in the case.', 'Bút trong hộp bút.', 'New pencil case', 'Bóp đựng bút.'),
    ('Pencil sharpener', '/ˈpensl ʃɑːpnər/', 'noun', 'Gọt bút chì', 'Sharpener for pencil.', 'Gọt nhọn bút chì.', 'Sharpener', 'Dụng cụ gọt.'),
    ('Crayon', '/ˈkreɪən/', 'noun', 'Bút sáp màu', 'Color with crayons.', 'Tô màu bằng bút sáp.', 'Box of crayons', 'Bút sáp.'),
    ('Color', '/ˈkʌlər/', 'noun / verb', 'Màu sắc, tô màu', 'What color is it?', 'Nó có màu gì?', 'Favorite color', 'Màu sắc.'),
    ('Have', '/hæv/', 'verb', 'Có, sở hữu', 'I have two rulers.', 'Mình có hai cái thước kẻ.', 'Have got', 'Sở hữu đồ vật.')
], [
    ('Scissors', '/ˈsɪzəz/', 'noun', 'Cái kéo', 'Cut paper with scissors.', 'Cắt giấy bằng kéo.', 'Pair of scissors', 'Luôn dùng số nhiều.'),
    ('Glue', '/ɡluː/', 'noun', 'Hồ dán, keo dán', 'Stick with glue.', 'Dán bằng keo dán giấy.', 'Glue stick', 'Hồ khô.'),
    ('Compass', '/ˈkʌmpəs/', 'noun', 'Com-pa', 'Draw with a compass.', 'Vẽ hình tròn bằng com-pa.', 'Use compass', 'Dụng cụ hình học.'),
    ('Highlighter', '/ˈhaɪlaɪtər/', 'noun', 'Bút dạ quang', 'Mark words with a highlighter.', 'Đánh dấu từ quan trọng.', 'Fluorescent pen', 'Bút nhớ dòng.'),
    ('Stapler', '/ˈsteɪplər/', 'noun', 'Cái dập ghim', 'Staple pages.', 'Dập ghim các trang lại.', 'Paper stapler', 'Dụng cụ ghim.'),
    ('Folder', '/ˈfəʊldər/', 'noun', 'Bìa tài liệu', 'Put paper in folder.', 'Để bài thi vào bìa kẹp.', 'Plastic folder', 'Bìa kẹp.'),
    ('Correction pen', '/kəˈrekʃn pen/', 'noun', 'Bút xóa', 'Fix error with pen.', 'Sửa lỗi bằng bút xóa.', 'Whiteout', 'Bút xóa nước.'),
    ('Backpack', '/ˈbækpæk/', 'noun', 'Ba lô đeo vai', 'My light backpack.', 'Ba lô nhẹ của mình.', 'Carry backpack', 'Ba lô chống gù.'),
    ('Paper', '/ˈpeɪpər/', 'noun', 'Giấy viết', 'A sheet of paper.', 'Một tờ giấy trắng.', 'Piece of paper', 'Giấy viết bài.')
])

# Unit 4: Colors & Shapes
add('unit-g3-u4', 'Màu sắc & Hình khối', [
    ('Red', '/red/', 'adjective', 'Màu đỏ', 'A red apple.', 'Quả táo đỏ.', 'Bright red', 'Màu đỏ tươi.'),
    ('Blue', '/bluː/', 'adjective', 'Màu xanh dương', 'A blue shirt.', 'Chiếc áo xanh dương.', 'Sky blue', 'Xanh da trời.'),
    ('Yellow', '/ˈjeləʊ/', 'adjective', 'Màu vàng', 'Yellow flower.', 'Bông hoa vàng.', 'Bright yellow', 'Màu vàng nắng.'),
    ('Green', '/ɡriːn/', 'adjective', 'Màu xanh lá cây', 'Green grass.', 'Bãi cỏ xanh.', 'Light green', 'Xanh lục.'),
    ('Orange', '/ˈɒrɪndʒ/', 'adjective', 'Màu cam', 'An orange hat.', 'Cái mũ màu cam.', 'Bright orange', 'Màu quả cam.'),
    ('Pink', '/pɪŋk/', 'adjective', 'Màu hồng', 'Pink dress.', 'Chiếc váy hồng.', 'Baby pink', 'Màu hồng phấn.'),
    ('Purple', '/ˈpɜːpl/', 'adjective', 'Màu tím', 'A purple balloon.', 'Quả bóng bay màu tím.', 'Deep purple', 'Màu hoa cà.'),
    ('Brown', '/braʊn/', 'adjective', 'Màu nâu', 'A brown dog.', 'Chú chó màu nâu.', 'Dark brown', 'Màu đất/gỗ.'),
    ('Black', '/blæk/', 'adjective', 'Màu đen', 'Black shoes.', 'Đôi giày đen.', 'Jet black', 'Màu đen tuyền.'),
    ('White', '/waɪt/', 'adjective', 'Màu trắng', 'A white cat.', 'Chú mèo trắng.', 'Snow white', 'Màu trắng tuyết.'),
    ('Circle', '/ˈsɜːkl/', 'noun', 'Hình tròn', 'A round circle.', 'Một hình tròn.', 'Draw a circle', 'Hình tròn.'),
    ('Square', '/skweər/', 'noun', 'Hình vuông', 'A wooden square.', 'Một hình vuông bằng gỗ.', 'Square shape', 'Bốn cạnh bằng nhau.')
], [
    ('Triangle', '/ˈtraɪæŋɡl/', 'noun', 'Hình tam giác', 'A green triangle.', 'Một hình tam giác xanh.', 'Three sides', 'Ba góc tam giác.'),
    ('Rectangle', '/ˈrektæŋɡl/', 'noun', 'Hình chữ nhật', 'The desk is a rectangle.', 'Mặt bàn là hình chữ nhật.', 'Rectangle shape', 'Hai dài hai ngắn.'),
    ('Star', '/stɑːr/', 'noun', 'Ngôi sao', 'A yellow star.', 'Ngôi sao vàng.', 'Five-point star', 'Hình ngôi sao.'),
    ('Diamond', '/ˈdaɪəmənd/', 'noun', 'Hình thoi', 'A diamond kite.', 'Chiếc diều hình thoi.', 'Diamond pattern', 'Hình quả trám.'),
    ('Oval', '/ˈəʊvl/', 'noun', 'Hình bầu dục', 'An oval mirror.', 'Chiếc gương bầu dục.', 'Oval shape', 'Hình quả trứng.'),
    ('Paint', '/peɪnt/', 'verb', 'Sơn, vẽ màu', 'Paint the picture.', 'Tô màu bức tranh.', 'Paint colors', 'Vẽ bằng cọ.'),
    ('Draw', '/drɔː/', 'verb', 'Vẽ nét', 'Draw a circle.', 'Vẽ một hình tròn.', 'Draw picture', 'Vẽ bằng chì.'),
    ('Colorful', '/ˈkʌləfl/', 'adjective', 'Nhiều màu sắc', 'A colorful bird.', 'Chú chim sặc sỡ sắc màu.', 'Very colorful', 'Rực rỡ sắc màu.'),
    ('Bright', '/braɪt/', 'adjective', 'Tươi sáng', 'Bright yellow paint.', 'Màu sơn vàng tươi sáng.', 'Bright shades', 'Màu sáng rõ.')
])

# Unit 5: Numbers & Age
add('unit-g3-u5', 'Số đếm & Tuổi tác', [
    ('One', '/wʌn/', 'number', 'Số một', 'One pencil.', 'Một cây bút.', 'Number one', 'Số 1.'),
    ('Two', '/tuː/', 'number', 'Số hai', 'Two rulers.', 'Hai cây thước.', 'Two eyes', 'Số 2.'),
    ('Three', '/θriː/', 'number', 'Số ba', 'Three cats.', 'Ba con mèo.', 'Three birds', 'Số 3.'),
    ('Four', '/fɔːr/', 'number', 'Số bốn', 'Four chairs.', 'Bốn cái ghế.', 'Four legs', 'Số 4.'),
    ('Five', '/faɪv/', 'number', 'Số năm', 'Five books.', 'Năm cuốn sách.', 'High five', 'Số 5.'),
    ('Six', '/sɪks/', 'number', 'Số sáu', 'Six apples.', 'Sáu quả táo.', 'Six years old', 'Số 6.'),
    ('Seven', '/ˈsevn/', 'number', 'Số bảy', 'Seven days.', 'Bảy ngày trong tuần.', 'Seven colors', 'Số 7.'),
    ('Eight', '/eɪt/', 'number', 'Số tám', 'Eight crayons.', 'Tám bút màu.', 'Eight years old', 'Số 8.'),
    ('Nine', '/naɪn/', 'number', 'Số chín', 'Nine balloons.', 'Chín quả bóng bay.', 'Number nine', 'Số 9.'),
    ('Ten', '/ten/', 'number', 'Số mười', 'Ten pupils.', 'Mười bạn học sinh.', 'Top ten', 'Số 10.'),
    ('Age', '/eɪdʒ/', 'noun', 'Tuổi tác', 'At my age.', 'Ở độ tuổi của em.', 'Under age', 'Tuổi đời.'),
    ('Old', '/əʊld/', 'adjective', 'Tuổi (trong câu hỏi)', 'How old are you?', 'Bạn bao nhiêu tuổi rồi?', 'Years old', 'Cấu trúc hỏi tuổi.')
], [
    ('Eleven', '/ɪˈlevn/', 'number', 'Số mười một', 'Eleven players.', 'Mười một cầu thủ.', 'Number eleven', 'Số 11.'),
    ('Twelve', '/twelv/', 'number', 'Số mười hai', 'Twelve months.', 'Mười hai tháng trong năm.', 'Twelve oclock', 'Số 12.'),
    ('Fifteen', '/ˌfɪfˈtiːn/', 'number', 'Số mười lăm', 'Fifteen candles.', 'Mười lăm cây nến.', 'Fifteen minutes', 'Số 15.'),
    ('Twenty', '/ˈtwenti/', 'number', 'Số hai mươi', 'Twenty students.', 'Hai mươi học sinh.', 'Twenty days', 'Số 20.'),
    ('Birthday', '/ˈbɜːθdeɪ/', 'noun', 'Ngày sinh nhật', 'Happy birthday!', 'Chúc mừng sinh nhật!', 'Birthday party', 'Ngày sinh.'),
    ('Count', '/kaʊnt/', 'verb', 'Đếm', 'Count from one to ten.', 'Đếm từ 1 đến 10.', 'Count numbers', 'Đếm số.'),
    ('Candle', '/ˈkændl/', 'noun', 'Cây nến', 'Eight candles on the cake.', 'Tám cây nến trên bánh.', 'Blow out candle', 'Nến sinh nhật.'),
    ('Celebrate', '/ˈselɪbreɪt/', 'verb', 'Ăn mừng', 'Celebrate birthday together.', 'Cùng nhau ăn mừng sinh nhật.', 'Celebrate with friends', 'Kỷ niệm sinh nhật.')
])

# Unit 6: My Family Members
add('unit-g3-u6', 'Gia đình yêu thương', [
    ('Father', '/ˈfɑːðər/', 'noun', 'Bố, cha', 'My father is a doctor.', 'Bố mình là một bác sĩ.', 'Dear father', 'Từ trang trọng.'),
    ('Mother', '/ˈmʌðər/', 'noun', 'Mẹ', 'My mother is very kind.', 'Mẹ mình rất hiền từ.', 'Caring mother', 'Từ trang trọng.'),
    ('Brother', '/ˈbrʌðər/', 'noun', 'Anh / Em trai', 'He is my big brother.', 'Anh ấy là anh trai của mình.', 'Older brother', 'Anh em trai.'),
    ('Sister', '/ˈsɪstər/', 'noun', 'Chị / Em gái', 'My little sister is cute.', 'Em gái nhỏ của mình rất dễ thương.', 'Younger sister', 'Chị em gái.'),
    ('Baby', '/ˈbeɪbi/', 'noun', 'Em bé sơ sinh', 'The baby is sleeping.', 'Em bé đang ngủ.', 'Baby brother', 'Trẻ nhỏ.'),
    ('Grandfather', '/ˈɡrænfɑːðər/', 'noun', 'Ông nội / Ông ngoại', 'My grandfather is seventy.', 'Ông mình bảy mươi tuổi rồi.', 'Kind grandfather', 'Ông.'),
    ('Grandmother', '/ˈɡrænmʌðər/', 'noun', 'Bà nội / Bà ngoại', 'My grandmother cooks well.', 'Bà mình nấu ăn rất ngon.', 'Loving grandmother', 'Bà.'),
    ('Family', '/ˈfæməli/', 'noun', 'Gia đình', 'I love my family.', 'Mình rất yêu gia đình mình.', 'Big family', 'Tổ ấm gia đình.'),
    ('Parents', '/ˈpeərənts/', 'noun', 'Bố mẹ', 'My parents work hard.', 'Bố mẹ mình làm việc chăm chỉ.', 'Loving parents', 'Luôn ở số nhiều.'),
    ('He', '/hiː/', 'pronoun', 'Anh ấy, ông ấy', 'He is my father.', 'Ông ấy là bố của mình.', 'He is', 'Đại từ nam.'),
    ('She', '/ʃiː/', 'pronoun', 'Cô ấy, bà ấy', 'She is my mother.', 'Bà ấy là mẹ của mình.', 'She is', 'Đại từ nữ.'),
    ('Love', '/lʌv/', 'verb', 'Yêu thương', 'We love each other.', 'Chúng mình yêu thương lẫn nhau.', 'Love family', 'Tình cảm.')
], [
    ('Uncle', '/ˈʌŋkl/', 'noun', 'Chú, bác, cậu', 'My uncle lives in Hanoi.', 'Chú mình sống ở Hà Nội.', 'Kind uncle', 'Anh em trai của bố/mẹ.'),
    ('Aunt', '/ɑːnt/', 'noun', 'Cô, dì, bác gái', 'My aunt is a teacher.', 'Dì mình là một giáo viên.', 'Loving aunt', 'Chị em gái của bố/mẹ.'),
    ('Cousin', '/ˈkʌzn/', 'noun', 'Anh chị em họ', 'Nam is my cousin.', 'Nam là anh họ của mình.', 'First cousin', 'Con của cô dì chú bác.'),
    ('Handsome', '/ˈhænsəm/', 'adjective', 'Đẹp trai', 'My father is handsome.', 'Bố mình rất đẹp trai.', 'Very handsome', 'Dùng cho nam.'),
    ('Pretty', '/ˈprɪti/', 'adjective', 'Xinh đẹp', 'My sister is pretty.', 'Em gái mình rất xinh xắn.', 'Pretty girl', 'Dùng cho nữ.'),
    ('Young', '/jʌŋ/', 'adjective', 'Trẻ tuổi', 'My parents are young.', 'Bố mẹ mình còn trẻ.', 'Young person', 'Trái với old.'),
    ('Home', '/həʊm/', 'noun', 'Mái ấm', 'Home sweet home.', 'Không đâu bằng nhà mình.', 'At home', 'Tổ ấm thân thương.'),
    ('Photo', '/ˈfəʊtəʊ/', 'noun', 'Bức ảnh', 'A family photo.', 'Bức ảnh chụp gia đình.', 'Take a photo', 'Ảnh chụp kỷ niệm.')
])

# Unit 7: Body Parts & Senses
add('unit-g3-u7', 'Các bộ phận cơ thể & Giác quan', [
    ('Head', '/hed/', 'noun', 'Cái đầu', 'Touch your head.', 'Chạm tay vào đầu bạn đi.', 'Touch your head', 'Bộ phận cơ thể.'),
    ('Face', '/feɪs/', 'noun', 'Khuôn mặt', 'Wash your face.', 'Rửa sạch mặt nhé.', 'Wash your face', 'Gương mặt.'),
    ('Eye', '/aɪ/', 'noun', 'Mắt', 'I have two eyes.', 'Mình có hai con mắt.', 'Two eyes', 'Mắt nhìn.'),
    ('Ear', '/ɪər/', 'noun', 'Tai', 'Listen with your ears.', 'Lắng nghe bằng đôi tai.', 'Two ears', 'Tai nghe.'),
    ('Nose', '/nəʊz/', 'noun', 'Mũi', 'Smell with your nose.', 'Ngửi bằng chiếc mũi.', 'Touch your nose', 'Mũi ngửi.'),
    ('Mouth', '/maʊθ/', 'noun', 'Miệng', 'Open your mouth.', 'Mở miệng ra nào.', 'Open your mouth', 'Miệng nói ăn.'),
    ('Hair', '/heər/', 'noun', 'Mái tóc', 'She has black hair.', 'Bạn ấy có mái tóc đen.', 'Long / short hair', 'Tóc trên đầu.'),
    ('Hand', '/hænd/', 'noun', 'Bàn tay', 'Wash your hands.', 'Hãy rửa sạch bàn tay.', 'Clap your hands', 'Bàn tay cầm nắm.'),
    ('Arm', '/ɑːm/', 'noun', 'Cánh tay', 'Raise your arms.', 'Giơ hai cánh tay lên.', 'Two arms', 'Cánh tay.'),
    ('Leg', '/leɡ/', 'noun', 'Cái chân', 'Strong legs.', 'Đôi chân khỏe mạnh.', 'Long legs', 'Chân đi lại.'),
    ('Foot', '/fʊt/', 'noun', 'Bàn chân', 'Left foot and right foot.', 'Bàn chân trái và phải.', 'On foot', 'Số nhiều là feet.'),
    ('Touch', '/tʌtʃ/', 'verb', 'Chạm vào', 'Touch your nose.', 'Hãy chạm vào mũi bạn.', 'Touch your hair', 'Xúc giác.')
], [
    ('Finger', '/ˈfɪŋɡər/', 'noun', 'Ngón tay', 'Ten fingers.', 'Mười ngón tay nhỏ nhắn.', 'Ten fingers', 'Ngón bàn tay.'),
    ('Toe', '/təʊ/', 'noun', 'Ngón chân', 'Touch your toes.', 'Chạm vào ngón chân.', 'Ten toes', 'Ngón bàn chân.'),
    ('Shoulder', '/ˈʃəʊldər/', 'noun', 'Bờ vai', 'Head and shoulders.', 'Đầu và đôi bờ vai.', 'Broad shoulders', 'Khớp vai.'),
    ('Knee', '/niː/', 'noun', 'Đầu gối', 'Knees and toes.', 'Đầu gối và ngón chân.', 'Bend knees', 'Khớp gối.'),
    ('See', '/siː/', 'verb', 'Nhìn thấy', 'I see with my eyes.', 'Mình nhìn bằng đôi mắt.', 'See clearly', 'Thị giác.'),
    ('Hear', '/hɪər/', 'verb', 'Nghe thấy', 'I hear with my ears.', 'Mình nghe bằng đôi tai.', 'Hear sounds', 'Thính giác.'),
    ('Smell', '/smel/', 'verb', 'Ngửi thấy', 'Smell flowers.', 'Ngửi hương thơm hoa.', 'Smell sweet', 'Khứu giác.'),
    ('Taste', '/teɪst/', 'verb', 'Nếm vị', 'Taste sweet candy.', 'Nếm vị kẹo ngọt.', 'Good taste', 'Vị giác.')
])

# Unit 8: Toys & Games
add('unit-g3-u8', 'Đồ chơi & Trò chơi trẻ thơ', [
    ('Doll', '/dɒl/', 'noun', 'Búp bê', 'She has a pretty doll.', 'Bạn ấy có một con búp bê xinh.', 'Baby doll', 'Đồ chơi bé gái.'),
    ('Ball', '/bɔːl/', 'noun', 'Quả bóng', 'Kick the ball.', 'Sút quả bóng tròn.', 'Play ball', 'Quả bóng.'),
    ('Car', '/kɑːr/', 'noun', 'Ô tô đồ chơi', 'A red toy car.', 'Một chiếc ô tô đồ chơi màu đỏ.', 'Toy car', 'Xe đồ chơi.'),
    ('Robot', '/ˈrəʊbɒt/', 'noun', 'Người máy', 'A smart robot.', 'Một chú rô-bốt thông minh.', 'Toy robot', 'Đồ chơi robot.'),
    ('Teddy bear', '/ˈtedi beər/', 'noun', 'Gấu bông', 'A soft teddy bear.', 'Một chú gấu bông êm ái.', 'Cute teddy bear', 'Thú nhồi bông.'),
    ('Yo-yo', '/ˈjəʊ jəʊ/', 'noun', 'Con quay yo-yo', 'He plays with a yo-yo.', 'Cậu ấy chơi con quay yo-yo.', 'Spin yo-yo', 'Trò chơi kéo dây.'),
    ('Kite', '/kaɪt/', 'noun', 'Cái diều', 'Fly a kite in the wind.', 'Thả diều trong chiều gió mát.', 'Fly a kite', 'Diều giấy.'),
    ('Puzzle', '/ˈpʌzl/', 'noun', 'Trò xếp hình', 'A jigsaw puzzle.', 'Một bộ tranh ghép hình.', 'Solve a puzzle', 'Trò chơi trí tuệ.'),
    ('Train', '/treɪn/', 'noun', 'Tàu hỏa đồ chơi', 'A toy train.', 'Đoàn tàu hỏa đồ chơi.', 'Toy train', 'Tàu hỏa chạy pin.'),
    ('Plane', '/pleɪn/', 'noun', 'Máy bay đồ chơi', 'A model plane.', 'Mô hình máy bay.', 'Model plane', 'Máy bay mô hình.'),
    ('Game', '/ɡeɪm/', 'noun', 'Trò chơi', 'Let us play a game.', 'Chúng mình cùng chơi trò chơi nào.', 'Play game', 'Giải trí.'),
    ('Play', '/pleɪ/', 'verb', 'Chơi đùa', 'Play with friends.', 'Chơi đùa cùng bạn bè.', 'Play toys', 'Hoạt động chơi.')
], [
    ('Hide and seek', '/ˌhaɪd n ˈsiːk/', 'noun', 'Trò trốn tìm', 'Play hide and seek.', 'Chơi trò trốn tìm vui nhộn.', 'Play hide and seek', 'Trò chơi dân gian.'),
    ('Tag', '/tæɡ/', 'noun', 'Trò đuổi bắt', 'Run fast in tag game.', 'Chạy thật nhanh trong trò đuổi bắt.', 'Play tag', 'Trò đuổi bắt.'),
    ('Skip', '/skɪp/', 'verb', 'Nhảy dây', 'Girls like skipping rope.', 'Các bạn gái thích nhảy dây.', 'Skip rope', 'Nhảy dây thể thao.'),
    ('Share', '/ʃeər/', 'verb', 'Chia sẻ đồ chơi', 'Share toys with friends.', 'Chia sẻ đồ chơi với bạn bè.', 'Share toys', 'Đức tính tốt.'),
    ('Favorite', '/ˈfeɪvərɪt/', 'adjective', 'Yêu thích nhất', 'My favorite toy is Lego.', 'Đồ chơi yêu thích nhất là Lego.', 'Favorite toy', 'Ưa thích.'),
    ('Fun', '/fʌn/', 'noun', 'Niềm vui', 'We have lots of fun.', 'Chúng mình có rất nhiều niềm vui.', 'Have fun', 'Vui nhộn.'),
    ('Collect', '/kəˈlekt/', 'verb', 'Sưu tầm', 'I collect model cars.', 'Mình sưu tầm các mô hình ô tô.', 'Collect toys', 'Sở thích.'),
    ('Win', '/wɪn/', 'verb', 'Chiến thắng', 'Who will win the game?', 'Ai sẽ chiến thắng trò chơi này?', 'Win game', 'Đoạt giải.')
])

# Unit 9: Pets & Domestic Animals
add('unit-g3-u9', 'Thú cưng trong nhà', [
    ('Dog', '/dɒɡ/', 'noun', 'Con chó', 'A friendly dog.', 'Một chú chó thân thiện.', 'Pet dog', 'Vật nuôi giữ nhà.'),
    ('Cat', '/kæt/', 'noun', 'Con mèo', 'A lovely white cat.', 'Một chú mèo trắng đáng yêu.', 'Cute cat', 'Mèo bắt chuột.'),
    ('Bird', '/bɜːd/', 'noun', 'Con chim', 'A singing bird.', 'Chú chim đang hót.', 'Singing bird', 'Chim cảnh.'),
    ('Fish', '/fɪʃ/', 'noun', 'Con cá', 'Goldfish in a bowl.', 'Những chú cá vàng trong bể.', 'Goldfish', 'Số nhiều vẫn là fish.'),
    ('Rabbit', '/ˈræbɪt/', 'noun', 'Con thỏ', 'A white rabbit has long ears.', 'Chú thỏ trắng có đôi tai dài.', 'Pet rabbit', 'Thỏ ăn cà rốt.'),
    ('Hamster', '/ˈhæmstər/', 'noun', 'Chuột hamster', 'A small furry hamster.', 'Một chú chuột hamster lông xù.', 'Pet hamster', 'Chuột cảnh nhỏ.'),
    ('Parrot', '/ˈpærət/', 'noun', 'Con vẹt', 'The parrot talks.', 'Chú vẹt biết nói tiếng người.', 'Colorful parrot', 'Vẹt biết nhại tiếng.'),
    ('Turtle', '/ˈtɜːtl/', 'noun', 'Con rùa', 'A slow green turtle.', 'Một chú rùa xanh bơi chậm chạp.', 'Sea turtle', 'Rùa cảnh.'),
    ('Duck', '/dʌk/', 'noun', 'Con vịt', 'Yellow duckling.', 'Chú vịt con màu vàng.', 'Duck pond', 'Vịt nuôi.'),
    ('Chicken', '/ˈtʃɪkɪn/', 'noun', 'Con gà', 'Little chicken.', 'Chú gà con đáng yêu.', 'Little chicken', 'Gà nuôi.'),
    ('Pet', '/pet/', 'noun', 'Thú cưng', 'Do you have any pets?', 'Bạn có nuôi thú cưng không?', 'Keep a pet', 'Thú cưng gia đình.'),
    ('Animal', '/ˈænɪml/', 'noun', 'Động vật', 'I love domestic animals.', 'Mình yêu các loài động vật.', 'Domestic animal', 'Muông thú.')
], [
    ('Cute', '/kjuːt/', 'adjective', 'Đáng yêu', 'The puppy is so cute.', 'Chú cún con trông thật dễ thương.', 'Very cute', 'Xinh xắn.'),
    ('Feed', '/fiːd/', 'verb', 'Cho ăn', 'Feed the fish.', 'Cho cá ăn hàng ngày nhé.', 'Feed pets', 'Chăm sóc.'),
    ('Cage', '/keɪdʒ/', 'noun', 'Cái lồng, chuồng', 'A bird in the cage.', 'Chú chim trong chiếc lồng đẹp.', 'Bird cage', 'Chuồng nuôi.'),
    ('Tail', '/teɪl/', 'noun', 'Cái đuôi', 'The dog wags its tail.', 'Chú chó vẫy vẫy cái đuôi.', 'Wag tail', 'Đuôi động vật.'),
    ('Bark', '/bɑːk/', 'verb', 'Sủa tiếng chó', 'Dogs bark loudly.', 'Chó sủa to khi thấy người lạ.', 'Bark loudly', 'Tiếng sủa.'),
    ('Friendly', '/ˈfrendli/', 'adjective', 'Thân thiện', 'A friendly pet.', 'Một con thú cưng rất thân thiện.', 'Very friendly', 'Hiền lành.'),
    ('Soft', '/sɒft/', 'adjective', 'Mềm mại', 'Soft cat fur.', 'Bộ lông mèo thật mềm mại.', 'Soft fur', 'Êm dịu.'),
    ('Veterinarian', '/ˌvetərɪˈneəriən/', 'noun', 'Bác sĩ thú y', 'Take pet to the vet.', 'Đưa thú cưng đi khám bác sĩ thú y.', 'Go to the vet', 'Bác sĩ chăm sóc thú.')
])

# Unit 10: Break Time & Fun Activities
add('unit-g3-u10', 'Giờ ra chơi sôi động', [
    ('Break time', '/ˈbreɪk taɪm/', 'noun', 'Giờ ra chơi', 'What do you do at break time?', 'Bạn làm gì vào giờ ra chơi?', 'At break time', 'Khoảng nghỉ giữa giờ.'),
    ('Play', '/pleɪ/', 'verb', 'Chơi', 'We play games.', 'Chúng mình cùng chơi trò chơi.', 'Play games', 'Vui chơi.'),
    ('Football', '/ˈfʊtbɔːl/', 'noun', 'Bóng đá', 'Boys play football.', 'Các bạn nam chơi đá bóng.', 'Football match', 'Môn thể thao vua.'),
    ('Basketball', '/ˈbɑːskɪtbɔːl/', 'noun', 'Bóng rổ', 'Shoot into basket.', 'Ném bóng vào rổ.', 'Play basketball', 'Bóng rổ.'),
    ('Badminton', '/ˈbædmɪntən/', 'noun', 'Cầu lông', 'Play badminton with rackets.', 'Chơi đánh cầu lông bằng vợt.', 'Play badminton', 'Cầu lông.'),
    ('Chess', '/tʃes/', 'noun', 'Cờ vua', 'Play a game of chess.', 'Chơi một ván cờ vua trí tuệ.', 'Play chess', 'Môn cờ vua.'),
    ('Table tennis', '/ˈteɪbl tenɪs/', 'noun', 'Bóng bàn', 'Table tennis is exciting.', 'Môn bóng bàn rất hào hứng.', 'Ping-pong', 'Bóng bàn.'),
    ('Chat', '/tʃæt/', 'verb', 'Trò chuyện', 'Chat with friends.', 'Tán gẫu với bạn bè.', 'Chat together', 'Trò chuyện.'),
    ('Read', '/riːd/', 'verb', 'Đọc sách', 'Read books.', 'Đọc sách dưới bóng cây.', 'Read comics', 'Đọc sách truyện.'),
    ('Run', '/rʌn/', 'verb', 'Chạy', 'Run fast in the yard.', 'Chạy thật nhanh trên sân trường.', 'Run fast', 'Vận động.'),
    ('Jump', '/dʒʌmp/', 'verb', 'Nhảy', 'Jump high.', 'Bật nhảy thật cao.', 'Jump high', 'Bật nhảy.'),
    ('Yard', '/jɑːd/', 'noun', 'Sân trường', 'The school yard.', 'Sân trường rộn rã.', 'School yard', 'Khoảng sân.')
], [
    ('Bell', '/bel/', 'noun', 'Chuông báo', 'The bell rings.', 'Hồi chuông báo giờ vang lên.', 'Ring bell', 'Chuông trường.'),
    ('Match', '/mætʃ/', 'noun', 'Trận đấu', 'An exciting match.', 'Một trận đấu hấp dẫn.', 'Football match', 'Trận đấu.'),
    ('Team', '/tiːm/', 'noun', 'Đội tuyển', 'Join my football team.', 'Gia nhập đội bóng của mình nhé.', 'Team spirit', 'Đồng đội.'),
    ('Active', '/ˈæktɪv/', 'adjective', 'Năng động', 'Active children.', 'Những đứa trẻ năng động.', 'Stay active', 'Thích vận động.'),
    ('Energetic', '/ˌenəˈdʒetɪk/', 'adjective', 'Nhiều năng lượng', 'We feel energetic.', 'Chúng mình tràn trề năng lượng.', 'Feel energetic', 'Khỏe khoắn.'),
    ('Laugh', '/lɑːf/', 'verb', 'Cười vui', 'Children laugh.', 'Các bạn nhỏ cười đùa vui vẻ.', 'Laugh happily', 'Tiếng cười.'),
    ('Relax', '/rɪˈlæks/', 'verb', 'Thư giãn', 'Relax after study.', 'Thư giãn tinh thần sau giờ học.', 'Relax mind', 'Nghỉ ngơi.'),
    ('Score', '/skɔːr/', 'verb', 'Ghi bàn', 'Score a goal.', 'Ghi một bàn thắng đẹp.', 'Score goal', 'Ghi điểm.')
])

print("vocab_grade3.py loaded with 10 units")
