# Primary School (Cấp 1): Grades 3, 4, 5
# Each unit has 20-22 words: 12 core + 8-10 advanced

PRIMARY_VOCAB = {}

# Helper to register unit
def reg(unit_id, grade, topic, words):
    # words: list of (word, ipa, pos, vi, en_ex, vi_ex, is_core, coloc, note)
    res = []
    for i, w in enumerate(words, 1):
        res.append({
            "id": f"{unit_id}-w{i}",
            "word": w[0],
            "ipa": w[1],
            "partOfSpeech": w[2],
            "meaningVi": w[3],
            "exampleEn": w[4],
            "exampleVi": w[5],
            "isCore": w[6],
            "unitId": unit_id,
            "grade": grade,
            "topic": topic,
            "collocation": w[7],
            "examNote": w[8]
        })
    PRIMARY_VOCAB[unit_id] = res

# ----------------- GRADE 3 -----------------
reg('unit-g3-u1', 3, 'Chào hỏi & Làm quen', [
    ('Hello', '/həˈləʊ/', 'interjection', 'Xin chào', 'Hello, my name is Mai.', 'Xin chào, tên mình là Mai.', True, 'Say hello', 'Chào hỏi lịch sự.'),
    ('Hi', '/haɪ/', 'interjection', 'Chào (thân mật)', 'Hi Nam, how are you?', 'Chào Nam, bạn khỏe không?', True, 'Hi there', 'Chào bạn bè.'),
    ('Friend', '/frend/', 'noun', 'Người bạn', 'This is my friend Mai.', 'Đây là bạn Mai của mình.', True, 'Best friend', 'Số nhiều là friends.'),
    ('Teacher', '/ˈtiːtʃər/', 'noun', 'Thầy / Cô giáo', 'Good morning, teacher!', 'Em chào cô buổi sáng ạ!', True, 'English teacher', 'Danh từ chỉ nghề.'),
    ('Goodbye', '/ˌɡʊdˈbaɪ/', 'interjection', 'Tạm biệt', 'Goodbye, see you again!', 'Tạm biệt, hẹn gặp lại!', True, 'Say goodbye', 'Chào tạm biệt.'),
    ('Bye', '/baɪ/', 'interjection', 'Tạm biệt', 'Bye, Tony! See you later.', 'Tạm biệt Tony, hẹn gặp lại nhé.', True, 'Bye for now', 'Chào thân mật.'),
    ('Name', '/neɪm/', 'noun', 'Tên gọi', 'What is your name?', 'Tên của bạn là gì?', True, 'First name', 'Cấu trúc My name is.'),
    ('Fine', '/faɪn/', 'adjective', 'Khỏe, tốt', 'I am fine, thank you.', 'Mình khỏe, cảm ơn bạn.', True, 'Feel fine', 'Dùng trả lời How are you.'),
    ('Thank you', '/ˈθæŋk juː/', 'phrase', 'Cảm ơn bạn', 'Thank you very much!', 'Cảm ơn bạn rất nhiều!', True, 'Thank you so much', 'Lời cảm ơn lịch sự.'),
    ('Thanks', '/θæŋks/', 'interjection', 'Cảm ơn', 'Thanks a lot!', 'Cảm ơn nhiều nhé!', True, 'Many thanks', 'Dùng thân mật.'),
    ('Meet', '/miːt/', 'verb', 'Gặp gỡ', 'Nice to meet you.', 'Rất vui được gặp bạn.', True, 'Meet friends', 'Nice to meet you.'),
    ('How', '/haʊ/', 'adverb', 'Như thế nào', 'How are you today?', 'Hôm nay bạn thế nào?', True, 'How do you do', 'Từ để hỏi.'),
    # Adv
    ('Classmate', '/ˈklɑːsmeɪt/', 'noun', 'Bạn cùng lớp', 'She is my new classmate.', 'Bạn ấy là bạn cùng lớp mới của mình.', False, 'Help classmate', 'Bạn cùng lớp.'),
    ('Pleasure', '/ˈpleʒər/', 'noun', 'Niềm vinh hạnh', 'It is a pleasure to meet you.', 'Rất hân hạnh được gặp bạn.', False, 'My pleasure', 'Lời đáp lịch sự.'),
    ('Pleased', '/pliːzd/', 'adjective', 'Vui mừng', 'Pleased to meet you, teacher.', 'Rất vui mừng được gặp cô ạ.', False, 'Pleased to meet you', 'Trang trọng hơn.'),
    ('Morning', '/ˈmɔːnɪŋ/', 'noun', 'Buổi sáng', 'Good morning, class!', 'Chào buổi sáng cả lớp!', False, 'In the morning', 'Trước 12h trưa.'),
    ('Afternoon', '/ˌɑːftəˈnuːn/', 'noun', 'Buổi chiều', 'Good afternoon everyone!', 'Chào buổi chiều mọi người!', False, 'In the afternoon', '12h đến 18h.'),
    ('Evening', '/ˈiːvnɪŋ/', 'noun', 'Buổi tối', 'Good evening, Sir.', 'Chào buổi tối thưa ngài.', False, 'In the evening', 'Chào buổi tối.'),
    ('Welcome', '/ˈwelkəm/', 'verb', 'Chào đón', 'Welcome to our class!', 'Chào đón bạn đến lớp của chúng mình!', False, 'Warm welcome', 'You are welcome.'),
    ('Introduce', '/ˌɪntrəˈdjuːs/', 'verb', 'Giới thiệu', 'Let me introduce myself.', 'Để mình tự giới thiệu bản thân nhé.', False, 'Introduce oneself', 'Giới thiệu tên tuổi.'),
    ('Spell', '/spel/', 'verb', 'Đánh vần', 'How do you spell your name?', 'Bạn đánh vần tên như thế nào?', False, 'Spell your name', 'Đánh vần chữ cái.')
])

reg('unit-g3-u2', 3, 'Bạn bè & Lớp học', [
    ('Classroom', '/ˈklɑːsruːm/', 'noun', 'Lớp học', 'Our classroom is clean.', 'Lớp học của chúng mình rất sạch.', True, 'In the classroom', 'Phòng học.'),
    ('Desk', '/desk/', 'noun', 'Bàn học', 'Sit down at your desk.', 'Ngồi vào bàn học đi nào.', True, 'Study desk', 'Bàn có ngăn.'),
    ('Chair', '/tʃeər/', 'noun', 'Cái ghế', 'There is a chair here.', 'Có một cái ghế ở đây.', True, 'Wooden chair', 'Ghế tựa.'),
    ('Door', '/dɔːr/', 'noun', 'Cửa ra vào', 'Open the door, please.', 'Làm ơn mở cửa ra.', True, 'Open door', 'Cửa chính.'),
    ('Window', '/ˈwɪndəʊ/', 'noun', 'Cửa sổ', 'Close the window.', 'Đóng cửa sổ lại.', True, 'Open window', 'Cửa sổ phòng.'),
    ('Board', '/bɔːd/', 'noun', 'Cái bảng', 'Look at the board.', 'Nhìn lên bảng nào.', True, 'Whiteboard', 'Bảng viết.'),
    ('Pupil', '/ˈpjuːpl/', 'noun', 'Học sinh tiểu học', 'She is a good pupil.', 'Em ấy là học sinh chăm.', True, 'Primary pupil', 'Học sinh tiểu học.'),
    ('Stand up', '/stænd ʌp/', 'phrase', 'Đứng lên', 'Stand up, please.', 'Mời các em đứng lên.', True, 'Stand up straight', 'Khẩu lệnh.'),
    ('Sit down', '/sɪt daʊn/', 'phrase', 'Ngồi xuống', 'Sit down, please.', 'Mời các em ngồi xuống.', True, 'Sit down quietly', 'Khẩu lệnh.'),
    ('Open', '/ˈəʊpən/', 'verb', 'Mở ra', 'Open your book.', 'Mở sách của em ra.', True, 'Open book', 'Trái với close.'),
    ('Close', '/kləʊz/', 'verb', 'Gấp lại, đóng lại', 'Close your notebooks.', 'Gấp vở lại nhé.', True, 'Close book', 'Trái với open.'),
    ('Look', '/lʊk/', 'verb', 'Nhìn, xem', 'Look at the picture.', 'Nhìn vào bức tranh này.', True, 'Look at', 'Đi với giới từ at.'),
    # Adv
    ('Library', '/ˈlaɪbrəri/', 'noun', 'Thư viện', 'We read books in the library.', 'Chúng mình đọc sách ở thư viện.', False, 'School library', 'Nơi mượn sách.'),
    ('Playground', '/ˈpleɪɡraʊnd/', 'noun', 'Sân chơi', 'Play in the playground.', 'Chơi ở sân chơi trường.', False, 'School playground', 'Sân trường.'),
    ('Computer room', '/kəmˈpjuːtər ruːm/', 'noun', 'Phòng tin học', 'Study in the computer room.', 'Học trong phòng máy tính.', False, 'IT room', 'Phòng chức năng.'),
    ('Clean', '/kliːn/', 'adjective', 'Sạch sẽ', 'Our classroom is clean.', 'Lớp học rất sạch sẽ.', False, 'Keep clean', 'Trái với dirty.'),
    ('Bright', '/braɪt/', 'adjective', 'Sáng sủa', 'A bright classroom.', 'Lớp học đầy ánh sáng.', False, 'Bright light', 'Ánh sáng tốt.'),
    ('Listen', '/ˈlɪsn/', 'verb', 'Lắng nghe', 'Listen to teacher.', 'Lắng nghe cô giáo.', False, 'Listen carefully', 'Đi với to.'),
    ('Quiet', '/ˈkwaɪət/', 'adjective', 'Yên lặng', 'Keep quiet, please.', 'Xin hãy giữ yên lặng.', False, 'Be quiet', 'Không làm ồn.'),
    ('Floor', '/flɔːr/', 'noun', 'Sàn nhà', 'Clean the floor.', 'Lau sạch sàn nhà.', False, 'On the floor', 'Sàn phòng học.'),
    ('Wall', '/wɔːl/', 'noun', 'Bức tường', 'Pictures on the wall.', 'Những bức tranh trên tường.', False, 'On the wall', 'Tường lớp học.')
])

reg('unit-g3-u3', 3, 'Đồ dùng học tập', [
    ('Pen', '/pen/', 'noun', 'Bút mực, bút bi', 'I have a pen.', 'Tôi có một cây bút.', True, 'Blue pen', 'Bút viết.'),
    ('Pencil', '/ˈpensl/', 'noun', 'Bút chì', 'Draw with a pencil.', 'Vẽ bằng bút chì.', True, 'Sharp pencil', 'Bút chì than.'),
    ('Ruler', '/ˈruːlər/', 'noun', 'Thước kẻ', 'A straight ruler.', 'Cái thước kẻ thẳng.', True, 'Plastic ruler', 'Dụng cụ đo.'),
    ('Eraser', '/ɪˈreɪsər/', 'noun', 'Cục tẩy', 'Use an eraser.', 'Dùng cục tẩy chì.', True, 'Rubber eraser', 'Tẩy chì.'),
    ('Book', '/bʊk/', 'noun', 'Quyển sách', 'An English book.', 'Một cuốn sách tiếng Anh.', True, 'Read book', 'Sách giáo khoa.'),
    ('Notebook', '/ˈnəʊtbʊk/', 'noun', 'Vở ghi', 'Write in notebook.', 'Viết vào vở.', True, 'Open notebook', 'Vở bài học.'),
    ('School bag', '/ˈskuːl bæɡ/', 'noun', 'Cặp sách', 'A new school bag.', 'Một chiếc cặp sách mới.', True, 'Pack school bag', 'Cặp đi học.'),
    ('Pencil case', '/ˈpensl keɪs/', 'noun', 'Hộp bút', 'Pens in the case.', 'Bút trong hộp bút.', True, 'Zip pencil case', 'Bóp đựng bút.'),
    ('Pencil sharpener', '/ˈpensl ʃɑːpnər/', 'noun', 'Gọt bút chì', 'Sharpener for pencil.', 'Gọt nhọn bút chì.', True, 'Sharpener', 'Dụng cụ gọt.'),
    ('Crayon', '/ˈkreɪən/', 'noun', 'Bút sáp màu', 'Color with crayons.', 'Tô màu bằng bút sáp.', True, 'Box of crayons', 'Bút sáp.'),
    ('Color', '/ˈkʌlər/', 'noun / verb', 'Màu sắc, tô màu', 'What color is it?', 'Nó có màu gì?', True, 'Favorite color', 'Màu sắc.'),
    ('Have', '/hæv/', 'verb', 'Có, sở hữu', 'I have two rulers.', 'Mình có hai cái thước kẻ.', True, 'Have got', 'Sở hữu đồ vật.'),
    # Adv
    ('Scissors', '/ˈsɪzəz/', 'noun', 'Cái kéo', 'Cut paper with scissors.', 'Cắt giấy bằng kéo.', False, 'Pair of scissors', 'Luôn dùng số nhiều.'),
    ('Glue', '/ɡluː/', 'noun', 'Hồ dán, keo dán', 'Stick with glue.', 'Dán bằng keo dán giấy.', False, 'Glue stick', 'Hồ khô.'),
    ('Compass', '/ˈkʌmpəs/', 'noun', 'Com-pa', 'Draw with a compass.', 'Vẽ hình tròn bằng com-pa.', False, 'Use compass', 'Dụng cụ hình học.'),
    ('Highlighter', '/ˈhaɪlaɪtər/', 'noun', 'Bút dạ quang', 'Highlight key notes.', 'Đánh dấu từ quan trọng.', False, 'Fluorescent pen', 'Bút nhớ dòng.'),
    ('Stapler', '/ˈsteɪplər/', 'noun', 'Cái dập ghim', 'Staple pages.', 'Dập ghim các trang lại.', False, 'Paper stapler', 'Dụng cụ ghim.'),
    ('Folder', '/ˈfəʊldər/', 'noun', 'Bìa tài liệu', 'Put paper in folder.', 'Để bài thi vào bìa kẹp.', False, 'Plastic folder', 'Bìa kẹp.'),
    ('Correction pen', '/kəˈrekʃn pen/', 'noun', 'Bút xóa', 'Fix error with pen.', 'Sửa lỗi bằng bút xóa.', False, 'Whiteout', 'Bút xóa nước.'),
    ('Backpack', '/ˈbækpæk/', 'noun', 'Ba lô đeo vai', 'My light backpack.', 'Ba lô nhẹ của mình.', False, 'Carry backpack', 'Ba lô chống gù.'),
    ('Paper', '/ˈpeɪpər/', 'noun', 'Giấy viết', 'A sheet of paper.', 'Một tờ giấy trắng.', False, 'Piece of paper', 'Giấy viết bài.')
])

reg('unit-g3-u4', 3, 'Màu sắc & Hình khối', [
    ('Red', '/red/', 'adjective', 'Màu đỏ', 'A red apple.', 'Quả táo đỏ.', True, 'Bright red', 'Màu đỏ tươi.'),
    ('Blue', '/bluː/', 'adjective', 'Màu xanh dương', 'A blue shirt.', 'Chiếc áo xanh dương.', True, 'Sky blue', 'Xanh da trời.'),
    ('Yellow', '/ˈjeləʊ/', 'adjective', 'Màu vàng', 'Yellow flower.', 'Bông hoa vàng.', True, 'Bright yellow', 'Màu vàng nắng.'),
    ('Green', '/ɡriːn/', 'adjective', 'Màu xanh lá cây', 'Green grass.', 'Bãi cỏ xanh.', True, 'Light green', 'Xanh lục.'),
    ('Orange', '/ˈɒrɪndʒ/', 'adjective', 'Màu cam', 'An orange hat.', 'Cái mũ màu cam.', True, 'Bright orange', 'Màu quả cam.'),
    ('Pink', '/pɪŋk/', 'adjective', 'Màu hồng', 'Pink dress.', 'Chiếc váy hồng.', True, 'Baby pink', 'Màu hồng phấn.'),
    ('Purple', '/ˈpɜːpl/', 'adjective', 'Màu tím', 'A purple balloon.', 'Quả bóng bay màu tím.', True, 'Deep purple', 'Màu hoa cà.'),
    ('Brown', '/braʊn/', 'adjective', 'Màu nâu', 'A brown dog.', 'Chú chó màu nâu.', True, 'Dark brown', 'Màu đất/gỗ.'),
    ('Black', '/blæk/', 'adjective', 'Màu đen', 'Black shoes.', 'Đôi giày đen.', True, 'Jet black', 'Màu đen tuyền.'),
    ('White', '/waɪt/', 'adjective', 'Màu trắng', 'A white cat.', 'Chú mèo trắng.', True, 'Snow white', 'Màu trắng tuyết.'),
    ('Circle', '/ˈsɜːkl/', 'noun', 'Hình tròn', 'A round circle.', 'Một hình tròn.', True, 'Draw a circle', 'Hình tròn.'),
    ('Square', '/skweər/', 'noun', 'Hình vuông', 'A wooden square.', 'Một hình vuông bằng gỗ.', True, 'Square shape', 'Bốn cạnh bằng nhau.'),
    # Adv
    ('Triangle', '/ˈtraɪæŋɡl/', 'noun', 'Hình tam giác', 'A green triangle.', 'Một hình tam giác xanh.', False, 'Three sides', 'Ba góc tam giác.'),
    ('Rectangle', '/ˈrektæŋɡl/', 'noun', 'Hình chữ nhật', 'The desk is a rectangle.', 'Mặt bàn là hình chữ nhật.', False, 'Rectangle shape', 'Hai dài hai ngắn.'),
    ('Star', '/stɑːr/', 'noun', 'Ngôi sao', 'A yellow star.', 'Ngôi sao vàng.', False, 'Five-point star', 'Hình ngôi sao.'),
    ('Diamond', '/ˈdaɪəmənd/', 'noun', 'Hình thoi', 'A diamond kite.', 'Chiếc diều hình thoi.', False, 'Diamond pattern', 'Hình quả trám.'),
    ('Oval', '/ˈəʊvl/', 'noun', 'Hình bầu dục', 'An oval mirror.', 'Chiếc gương bầu dục.', False, 'Oval shape', 'Hình quả trứng.'),
    ('Paint', '/peɪnt/', 'verb', 'Sơn, quét màu', 'Paint the picture.', 'Tô màu bức tranh.', False, 'Paint colors', 'Vẽ bằng cọ.'),
    ('Draw', '/drɔː/', 'verb', 'Vẽ nét', 'Draw a circle.', 'Vẽ một hình tròn.', False, 'Draw picture', 'Vẽ bằng chì.'),
    ('Colorful', '/ˈkʌləfl/', 'adjective', 'Nhiều màu sắc', 'A colorful bird.', 'Chú chim sặc sỡ sắc màu.', False, 'Very colorful', 'Rực rỡ sắc màu.'),
    ('Bright', '/braɪt/', 'adjective', 'Tươi sáng', 'Bright yellow paint.', 'Màu sơn vàng tươi sáng.', False, 'Bright shades', 'Màu sáng rõ.')
])

reg('unit-g3-u5', 3, 'Số đếm & Tuổi tác', [
    ('One', '/wʌn/', 'number', 'Số một', 'One pencil.', 'Một cây bút.', True, 'Number one', 'Số 1.'),
    ('Two', '/tuː/', 'number', 'Số hai', 'Two rulers.', 'Hai cây thước.', True, 'Two eyes', 'Số 2.'),
    ('Three', '/θriː/', 'number', 'Số ba', 'Three cats.', 'Ba con mèo.', True, 'Three birds', 'Số 3.'),
    ('Four', '/fɔːr/', 'number', 'Số bốn', 'Four chairs.', 'Bốn cái ghế.', True, 'Four legs', 'Số 4.'),
    ('Five', '/faɪv/', 'number', 'Số năm', 'Five books.', 'Năm cuốn sách.', True, 'High five', 'Số 5.'),
    ('Six', '/sɪks/', 'number', 'Số sáu', 'Six apples.', 'Sáu quả táo.', True, 'Six years old', 'Số 6.'),
    ('Seven', '/ˈsevn/', 'number', 'Số bảy', 'Seven days.', 'Bảy ngày trong tuần.', True, 'Seven colors', 'Số 7.'),
    ('Eight', '/eɪt/', 'number', 'Số tám', 'Eight crayons.', 'Tám bút màu.', True, 'Eight years old', 'Số 8.'),
    ('Nine', '/naɪn/', 'number', 'Số chín', 'Nine balloons.', 'Chín quả bóng bay.', True, 'Number nine', 'Số 9.'),
    ('Ten', '/ten/', 'number', 'Số mười', 'Ten pupils.', 'Mười bạn học sinh.', True, 'Top ten', 'Số 10.'),
    ('Age', '/eɪdʒ/', 'noun', 'Tuổi tác', 'At my age.', 'Ở độ tuổi của em.', True, 'Under age', 'Tuổi đời.'),
    ('Old', '/əʊld/', 'adjective', 'Tuổi (trong câu hỏi)', 'How old are you?', 'Bạn bao nhiêu tuổi rồi?', True, 'Years old', 'Cấu trúc hỏi tuổi.'),
    # Adv
    ('Eleven', '/ɪˈlevn/', 'number', 'Số mười một', 'Eleven players.', 'Mười một cầu thủ.', False, 'Number eleven', 'Số 11.'),
    ('Twelve', '/twelv/', 'number', 'Số mười hai', 'Twelve months.', 'Mười hai tháng trong năm.', False, 'Twelve oclock', 'Số 12.'),
    ('Fifteen', '/ˌfɪfˈtiːn/', 'number', 'Số mười lăm', 'Fifteen candles.', 'Mười lăm cây nến.', False, 'Fifteen minutes', 'Số 15.'),
    ('Twenty', '/ˈtwenti/', 'number', 'Số hai mươi', 'Twenty students.', 'Hai mươi học sinh.', False, 'Twenty days', 'Số 20.'),
    ('Birthday', '/ˈbɜːθdeɪ/', 'noun', 'Ngày sinh nhật', 'Happy birthday!', 'Chúc mừng sinh nhật!', False, 'Birthday party', 'Ngày sinh.'),
    ('Count', '/kaʊnt/', 'verb', 'Đếm', 'Count from one to ten.', 'Đếm từ 1 đến 10.', False, 'Count numbers', 'Đếm số.'),
    ('Candle', '/ˈkændl/', 'noun', 'Cây nến', 'Eight candles on the cake.', 'Tám cây nến trên bánh.', False, 'Blow out candle', 'Nến sinh nhật.'),
    ('Party', '/ˈpɑːti/', 'noun', 'Bữa tiệc', 'Join the birthday party.', 'Tham gia bữa tiệc sinh nhật.', False, 'Have a party', 'Tiệc mừng.'),
    ('Celebrate', '/ˈselɪbreɪt/', 'verb', 'Ăn mừng', 'Celebrate birthday together.', 'Cùng nhau ăn mừng sinh nhật.', False, 'Celebrate with friends', 'Kỷ niệm sinh nhật.')
])

reg('unit-g3-u6', 3, 'Gia đình yêu thương', [
    ('Father', '/ˈfɑːðər/', 'noun', 'Bố, cha', 'My father is a doctor.', 'Bố mình là một bác sĩ.', True, 'Dear father', 'Từ trang trọng.'),
    ('Mother', '/ˈmʌðər/', 'noun', 'Mẹ', 'My mother is very kind.', 'Mẹ mình rất hiền từ.', True, 'Caring mother', 'Từ trang trọng.'),
    ('Brother', '/ˈbrʌðər/', 'noun', 'Anh / Em trai', 'He is my big brother.', 'Anh ấy là anh trai của mình.', True, 'Older / younger brother', 'Anh em trai.'),
    ('Sister', '/ˈsɪstər/', 'noun', 'Chị / Em gái', 'My little sister is cute.', 'Em gái nhỏ của mình rất dễ thương.', True, 'Older / younger sister', 'Chị em gái.'),
    ('Baby', '/ˈbeɪbi/', 'noun', 'Em bé sơ sinh', 'The baby is sleeping.', 'Em bé đang ngủ.', True, 'Baby brother', 'Trẻ nhỏ.'),
    ('Grandfather', '/ˈɡrænfɑːðər/', 'noun', 'Ông nội / Ông ngoại', 'My grandfather is seventy.', 'Ông mình bảy mươi tuổi rồi.', True, 'Kind grandfather', 'Ông.'),
    ('Grandmother', '/ˈɡrænmʌðər/', 'noun', 'Bà nội / Bà ngoại', 'My grandmother cooks well.', 'Bà mình nấu ăn rất ngon.', True, 'Loving grandmother', 'Bà.'),
    ('Family', '/ˈfæməli/', 'noun', 'Gia đình', 'I love my family.', 'Mình rất yêu gia đình mình.', True, 'Big family', 'Tổ ấm gia đình.'),
    ('Parents', '/ˈpeərənts/', 'noun', 'Bố mẹ, phụ huynh', 'My parents work hard.', 'Bố mẹ mình làm việc chăm chỉ.', True, 'Loving parents', 'Luôn ở số nhiều.'),
    ('He', '/hiː/', 'pronoun', 'Anh ấy, chú ấy, ông ấy', 'He is my father.', 'Ông ấy là bố của mình.', True, 'He is', 'Đại từ chỉ nam giới.'),
    ('She', '/ʃiː/', 'pronoun', 'Cô ấy, chị ấy, bà ấy', 'She is my mother.', 'Bà ấy là mẹ của mình.', True, 'She is', 'Đại từ chỉ nữ giới.'),
    ('Love', '/lʌv/', 'verb', 'Yêu thương', 'We love each other.', 'Chúng mình yêu thương lẫn nhau.', True, 'Love family', 'Tình yêu thương.'),
    # Adv
    ('Uncle', '/ˈʌŋkl/', 'noun', 'Chú, bác, cậu', 'My uncle lives in Hanoi.', 'Chú mình sống ở Hà Nội.', False, 'Kind uncle', 'Anh em trai của bố/mẹ.'),
    ('Aunt', '/ɑːnt/', 'noun', 'Cô, dì, bác gái', 'My aunt is a teacher.', 'Dì mình là một giáo viên.', False, 'Loving aunt', 'Chị em gái của bố/mẹ.'),
    ('Cousin', '/ˈkʌzn/', 'noun', 'Anh chị em họ', 'Nam is my cousin.', 'Nam là anh họ của mình.', False, 'First cousin', 'Con của cô dì chú bác.'),
    ('Handsome', '/ˈhænsəm/', 'adjective', 'Đẹp trai', 'My father is handsome.', 'Bố mình rất đẹp trai.', False, 'Very handsome', 'Dùng cho nam giới.'),
    ('Pretty', '/ˈprɪti/', 'adjective', 'Xinh đẹp', 'My sister is pretty.', 'Em gái mình rất xinh xắn.', False, 'Pretty girl', 'Dùng cho nữ/bé.'),
    ('Young', '/jʌŋ/', 'adjective', 'Trẻ tuổi', 'My parents are young.', 'Bố mẹ mình còn trẻ.', False, 'Young person', 'Trái với old.'),
    ('Home', '/həʊm/', 'noun', 'Mái ấm gia đình', 'There is no place like home.', 'Không đâu bằng nhà mình.', False, 'At home', 'Tổ ấm thân thương.'),
    ('Photo', '/ˈfəʊtəʊ/', 'noun', 'Bức ảnh', 'A family photo.', 'Bức ảnh chụp cả gia đình.', False, 'Take a photo', 'Ảnh chụp kỷ niệm.'),
    ('Care', '/keər/', 'verb / noun', 'Chăm sóc, quan tâm', 'Parents care for their children.', 'Cha mẹ luôn chăm sóc con cái.', False, 'Take care of', 'Sự quan tâm.')
])

reg('unit-g3-u7', 3, 'Các bộ phận cơ thể & Giác quan', [
    ('Head', '/hed/', 'noun', 'Cái đầu', 'Touch your head.', 'Chạm tay vào đầu bạn đi.', True, 'Touch your head', 'Bộ phận cơ thể.'),
    ('Face', '/feɪs/', 'noun', 'Khuôn mặt', 'Wash your face.', 'Rửa sạch mặt nhé.', True, 'Wash your face', 'Gương mặt.'),
    ('Eye', '/aɪ/', 'noun', 'Mắt', 'I have two eyes.', 'Mình có hai con mắt.', True, 'Two eyes', 'Mắt nhìn.'),
    ('Ear', '/ɪər/', 'noun', 'Tai', 'Listen with your ears.', 'Lắng nghe bằng đôi tai.', True, 'Two ears', 'Tai nghe.'),
    ('Nose', '/nəʊz/', 'noun', 'Mũi', 'Smell with your nose.', 'Ngửi bằng chiếc mũi.', True, 'Touch your nose', 'Mũi ngửi.'),
    ('Mouth', '/maʊθ/', 'noun', 'Miệng', 'Open your mouth.', 'Mở miệng ra nào.', True, 'Open your mouth', 'Miệng nói ăn.'),
    ('Hair', '/heər/', 'noun', 'Mái tóc', 'She has long black hair.', 'Bạn ấy có mái tóc đen dài.', True, 'Long / short hair', 'Tóc trên đầu.'),
    ('Hand', '/hænd/', 'noun', 'Bàn tay', 'Wash your hands.', 'Hãy rửa sạch bàn tay.', True, 'Clap your hands', 'Bàn tay cầm nắm.'),
    ('Arm', '/ɑːm/', 'noun', 'Cánh tay', 'Raise your arms.', 'Giơ hai cánh tay lên.', True, 'Two arms', 'Cánh tay.'),
    ('Leg', '/leɡ/', 'noun', 'Cái chân', 'Strong legs.', 'Đôi chân khỏe mạnh.', True, 'Long legs', 'Chân đi lại.'),
    ('Foot', '/fʊt/', 'noun', 'Bàn chân', 'Left foot and right foot.', 'Bàn chân trái và bàn chân phải.', True, 'On foot', 'Số nhiều là feet.'),
    ('Touch', '/tʌtʃ/', 'verb', 'Chạm vào', 'Touch your nose, please.', 'Hãy chạm vào mũi của bạn.', True, 'Touch your hair', 'Xúc giác.'),
    # Adv
    ('Finger', '/ˈfɪŋɡər/', 'noun', 'Ngón tay', 'Ten little fingers.', 'Mười ngón tay nhỏ nhắn.', False, 'Ten fingers', 'Ngón trên bàn tay.'),
    ('Toe', '/təʊ/', 'noun', 'Ngón chân', 'Touch your toes.', 'Cúi xuống chạm vào ngón chân.', False, 'Ten toes', 'Ngón trên bàn chân.'),
    ('Shoulder', '/ˈʃəʊldər/', 'noun', 'Bờ vai', 'Head and shoulders.', 'Đầu và đôi bờ vai.', False, 'Broad shoulders', 'Khớp vai.'),
    ('Knee', '/niː/', 'noun', 'Đầu gối', 'Knees and toes.', 'Đầu gối và ngón chân.', False, 'Bend knees', 'Khớp gối.'),
    ('See', '/siː/', 'verb', 'Nhìn thấy', 'I see with my eyes.', 'Mình nhìn bằng đôi mắt.', False, 'See clearly', 'Thị giác.'),
    ('Hear', '/hɪər/', 'verb', 'Nghe thấy', 'I hear with my ears.', 'Mình nghe bằng đôi tai.', False, 'Hear sounds', 'Thính giác.'),
    ('Smell', '/smel/', 'verb', 'Ngửi thấy mùi', 'Smell flowers.', 'Ngửi hương thơm bông hoa.', False, 'Smell sweet', 'Khứu giác.'),
    ('Taste', '/teɪst/', 'verb', 'Nếm vị', 'Taste sweet candy.', 'Nếm vị kẹo ngọt ngào.', False, 'Good taste', 'Vị giác.'),
    ('Healthy', '/ˈhelθi/', 'adjective', 'Khỏe mạnh', 'Keep your body healthy.', 'Giữ cho cơ thể luôn khỏe mạnh.', False, 'Stay healthy', 'Sức khỏe tốt.')
])

reg('unit-g3-u8', 3, 'Đồ chơi & Trò chơi trẻ thơ', [
    ('Doll', '/dɒl/', 'noun', 'Búp bê', 'She has a pretty doll.', 'Bạn ấy có một con búp bê xinh.', True, 'Baby doll', 'Đồ chơi búp bê.'),
    ('Ball', '/bɔːl/', 'noun', 'Quả bóng', 'Kick the football.', 'Sút quả bóng tròn.', True, 'Play ball', 'Quả bóng đá.'),
    ('Car', '/kɑːr/', 'noun', 'Ô tô đồ chơi', 'A red toy car.', 'Một chiếc ô tô đồ chơi màu đỏ.', True, 'Toy car', 'Xe đồ chơi.'),
    ('Robot', '/ˈrəʊbɒt/', 'noun', 'Người máy, rô-bốt', 'A smart toy robot.', 'Một chú rô-bốt đồ chơi thông minh.', True, 'Walking robot', 'Rô-bốt đồ chơi.'),
    ('Teddy bear', '/ˈtedi beər/', 'noun', 'Gấu bông', 'A soft brown teddy bear.', 'Một chú gấu bông nâu êm ái.', True, 'Cute teddy bear', 'Thú nhồi bông.'),
    ('Yo-yo', '/ˈjəʊ jəʊ/', 'noun', 'Con quay yo-yo', 'He plays with a yo-yo.', 'Cậu ấy chơi con quay yo-yo.', True, 'Spin a yo-yo', 'Trò chơi kéo dây.'),
    ('Kite', '/kaɪt/', 'noun', 'Cái diều', 'Fly a kite in the wind.', 'Thả diều trong chiều gió mát.', True, 'Fly a kite', 'Diều giấy.'),
    ('Puzzle', '/ˈpʌzl/', 'noun', 'Trò xếp hình', 'A jigsaw puzzle.', 'Một bộ tranh ghép hình.', True, 'Solve a puzzle', 'Trò chơi trí tuệ.'),
    ('Train', '/treɪn/', 'noun', 'Đoàn tàu hỏa đồ chơi', 'A toy train on tracks.', 'Đoàn tàu hỏa chạy trên đường ray.', True, 'Toy train', 'Tàu hỏa chạy pin.'),
    ('Plane', '/pleɪn/', 'noun', 'Máy bay đồ chơi', 'A model plane flies.', 'Mô hình máy bay đang bay.', True, 'Model plane', 'Máy bay mô hình.'),
    ('Game', '/ɡeɪm/', 'noun', 'Trò chơi', 'Let us play a game.', 'Chúng mình cùng chơi một trò chơi nào.', True, 'Board game', 'Trò chơi giải trí.'),
    ('Play', '/pleɪ/', 'verb', 'Chơi đùa', 'Play with friends.', 'Chơi đùa cùng các bạn bè.', True, 'Play games', 'Hoạt động vui chơi.'),
    # Adv
    ('Hide and seek', '/ˌhaɪd n ˈsiːk/', 'noun', 'Trò trốn tìm', 'Play hide and seek.', 'Chơi trò trốn tìm vui nhộn.', False, 'Play hide and seek', 'Trò chơi dân gian.'),
    ('Tag', '/tæɡ/', 'noun', 'Trò đuổi bắt', 'Run fast in tag game.', 'Chạy thật nhanh trong trò đuổi bắt.', False, 'Play tag', 'Trò đuổi bắt.'),
    ('Skip', '/skɪp/', 'verb', 'Nhảy dây', 'Girls like skipping rope.', 'Các bạn gái thích nhảy dây.', False, 'Skip rope', 'Nhảy dây thể thao.'),
    ('Share', '/ʃeər/', 'verb', 'Chia sẻ đồ chơi', 'Share toys with friends.', 'Biết chia sẻ đồ chơi với bạn bè.', False, 'Share with friends', 'Đức tính tốt.'),
    ('Favorite', '/ˈfeɪvərɪt/', 'adjective', 'Yêu thích nhất', 'My favorite toy is Lego.', 'Đồ chơi yêu thích nhất là Lego.', False, 'Favorite toy', 'Được ưa thích nhất.'),
    ('Fun', '/fʌn/', 'noun / adjective', 'Vui vẻ', 'We have lots of fun.', 'Chúng mình có rất nhiều niềm vui.', False, 'Have fun', 'Vui nhộn.'),
    ('Collect', '/kəˈlekt/', 'verb', 'Sưu tầm', 'I collect model cars.', 'Mình sưu tầm các mô hình ô tô.', False, 'Collect toys', 'Sở thích tích lũy.'),
    ('Toy box', '/tɔɪ bɒks/', 'noun', 'Hòm đựng đồ chơi', 'Put toys into the box.', 'Cất gọn đồ chơi vào hòm.', False, 'Clean toy box', 'Thùng đựng đồ.'),
    ('Win', '/wɪn/', 'verb', 'Chiến thắng', 'Who will win the game?', 'Ai sẽ chiến thắng trò chơi này?', False, 'Win a match', 'Đoạt giải nhất.')
])

reg('unit-g3-u9', 3, 'Thú cưng trong nhà', [
    ('Dog', '/dɒɡ/', 'noun', 'Con chó', 'A friendly dog.', 'Một chú chó rất thân thiện.', True, 'Pet dog', 'Vật nuôi giữ nhà.'),
    ('Cat', '/kæt/', 'noun', 'Con mèo', 'A lovely white cat.', 'Một chú mèo trắng đáng yêu.', True, 'Cute cat', 'Mèo bắt chuột.'),
    ('Bird', '/bɜːd/', 'noun', 'Con chim', 'A singing bird in cage.', 'Chú chim đang hót trong lồng.', True, 'Singing bird', 'Chim cảnh.'),
    ('Fish', '/fɪʃ/', 'noun', 'Con cá', 'Goldfish in a bowl.', 'Những chú cá vàng trong bể kính.', True, 'Goldfish', 'Số nhiều vẫn là fish.'),
    ('Rabbit', '/ˈræbɪt/', 'noun', 'Con thỏ', 'A white rabbit has long ears.', 'Chú thỏ trắng có đôi tai dài.', True, 'Pet rabbit', 'Thỏ ăn cà rốt.'),
    ('Hamster', '/ˈhæmstər/', 'noun', 'Chuột hamster', 'A small furry hamster.', 'Một chú chuột hamster lông xù.', True, 'Pet hamster', 'Chuột cảnh nhỏ.'),
    ('Parrot', '/ˈpærət/', 'noun', 'Con vẹt', 'The parrot talks.', 'Chú vẹt biết nói tiếng người.', True, 'Colorful parrot', 'Vẹt biết nhại tiếng.'),
    ('Turtle', '/ˈtɜːtl/', 'noun', 'Con rùa', 'A slow green turtle.', 'Một chú rùa xanh bơi chậm chạp.', True, 'Sea turtle', 'Rùa cảnh.'),
    ('Duck', '/dʌk/', 'noun', 'Con vịt', 'Yellow duckling swims.', 'Chú vịt con màu vàng bơi lội.', True, 'Duck pond', 'Vịt nuôi.'),
    ('Chicken', '/ˈtʃɪkɪn/', 'noun', 'Con gà', 'Rooster crows early.', 'Chú gà trống gáy vang sớm.', True, 'Little chicken', 'Gà nuôi.'),
    ('Pet', '/pet/', 'noun', 'Thú cưng', 'Do you have any pets?', 'Bạn có nuôi con thú cưng nào không?', True, 'Keep a pet', 'Thú cưng gia đình.'),
    ('Animal', '/ˈænɪml/', 'noun', 'Động vật', 'I love domestic animals.', 'Mình yêu các loài động vật nuôi.', True, 'Wild / domestic animal', 'Muông thú.'),
    # Adv
    ('Cute', '/kjuːt/', 'adjective', 'Đáng yêu', 'The puppy is so cute.', 'Chú cún con trông thật dễ thương.', False, 'Very cute', 'Xinh xắn, đáng yêu.'),
    ('Feed', '/fiːd/', 'verb', 'Cho ăn', 'Feed the fish every day.', 'Cho cá ăn hàng ngày nhé.', False, 'Feed pets', 'Chăm sóc thú cưng.'),
    ('Cage', '/keɪdʒ/', 'noun', 'Cái lồng, chuồng', 'A bird in the cage.', 'Chú chim trong chiếc lồng đẹp.', False, 'Bird cage', 'Chuồng nuôi.'),
    ('Tail', '/teɪl/', 'noun', 'Cái đuôi', 'The dog wags its tail.', 'Chú chó vẫy vẫy cái đuôi mừng rỡ.', False, 'Wag its tail', 'Đuôi động vật.'),
    ('Bark', '/bɑːk/', 'verb', 'Sủa tiếng chó', 'Dogs bark loudly.', 'Chó sủa to khi thấy người lạ.', False, 'Bark at strangers', 'Tiếng sủa.'),
    ('Friendly', '/ˈfrendli/', 'adjective', 'Thân thiện', 'A friendly pet.', 'Một con thú cưng rất thân thiện.', False, 'Very friendly', 'Hiền lành, gần gũi.'),
    ('Soft', '/sɒft/', 'adjective', 'Mềm mại', 'Soft cat fur.', 'Bộ lông mèo thật mềm mại êm ái.', False, 'Soft fur', 'Êm dịu.'),
    ('Playful', '/ˈpleɪfl/', 'adjective', 'Thích đùa nghịch', 'A playful kitten.', 'Chú mèo con rất thích đùa nghịch.', False, 'Playful pet', 'Nghịch ngợm vui vẻ.'),
    ('Veterinarian', '/ˌvetərɪˈneəriən/', 'noun', 'Bác sĩ thú y', 'Take pet to the vet.', 'Đưa thú cưng đi khám bác sĩ thú y.', False, 'Go to the vet', 'Bác sĩ chăm sóc thú.')
])

reg('unit-g3-u10', 3, 'Giờ ra chơi sôi động', [
    ('Break time', '/ˈbreɪk taɪm/', 'noun', 'Giờ ra chơi', 'What do you do at break time?', 'Bạn thường làm gì vào giờ ra chơi?', True, 'At break time', 'Khoảng nghỉ giữa giờ.'),
    ('Play', '/pleɪ/', 'verb', 'Chơi', 'We play games together.', 'Chúng mình cùng chơi trò chơi.', True, 'Play sports', 'Vui chơi.'),
    ('Football', '/ˈfʊtbɔːl/', 'noun', 'Bóng đá', 'Boys play football.', 'Các bạn nam chơi đá bóng.', True, 'Football match', 'Môn thể thao vua.'),
    ('Basketball', '/ˈbɑːskɪtbɔːl/', 'noun', 'Bóng rổ', 'Shoot into the basket.', 'Ném bóng vào rổ.', True, 'Play basketball', 'Bóng rổ.'),
    ('Badminton', '/ˈbædmɪntən/', 'noun', 'Cầu lông', 'Play badminton with rackets.', 'Chơi đánh cầu lông bằng vợt.', True, 'Play badminton', 'Cầu lông.'),
    ('Chess', '/tʃes/', 'noun', 'Cờ vua', 'Play a game of chess.', 'Chơi một ván cờ vua trí tuệ.', True, 'Play chess', 'Môn cờ vua.'),
    ('Table tennis', '/ˈteɪbl tenɪs/', 'noun', 'Bóng bàn', 'Table tennis is exciting.', 'Môn bóng bàn rất hào hứng.', True, 'Ping-pong', 'Bóng bàn.'),
    ('Chat', '/tʃæt/', 'verb', 'Trò chuyện', 'Chat with best friends.', 'Tán gẫu với những người bạn thân.', True, 'Chat together', 'Trò chuyện giải lao.'),
    ('Read', '/riːd/', 'verb', 'Đọc sách', 'Read books under trees.', 'Đọc sách dưới bóng râm rợp mát.', True, 'Read comics', 'Đọc sách truyện.'),
    ('Run', '/rʌn/', 'verb', 'Chạy', 'Run fast in the yard.', 'Chạy thật nhanh trên sân trường.', True, 'Run fast', 'Vận động mạnh.'),
    ('Jump', '/dʒʌmp/', 'verb', 'Nhảy cao, nhảy xa', 'Jump over hurdles.', 'Bật nhảy qua các chướng ngại vật.', True, 'Jump high', 'Bật nhảy.'),
    ('Yard', '/jɑːd/', 'noun', 'Sân trường', 'The school yard is lively.', 'Sân trường thật rộn ràng náo nhiệt.', True, 'School yard', 'Khoảng sân rộng.'),
    # Adv
    ('Bell', '/bel/', 'noun', 'Hồi chuông báo', 'The school bell rings.', 'Hồi chuông báo giờ ra chơi vang lên.', False, 'Ring the bell', 'Chuông trường.'),
    ('Match', '/mætʃ/', 'noun', 'Trận đấu thể thao', 'An exciting match.', 'Một trận đấu vô cùng hấp dẫn.', False, 'Football match', 'Trận thi đấu.'),
    ('Team', '/tiːm/', 'noun', 'Đội tuyển, nhóm bạn', 'Join my football team.', 'Gia nhập đội bóng của mình nhé.', False, 'Team spirit', 'Đồng đội.'),
    ('Active', '/ˈæktɪv/', 'adjective', 'Năng động, hoạt bát', 'Active children.', 'Những đứa trẻ năng động hoạt bát.', False, 'Stay active', 'Thích vận động.'),
    ('Energetic', '/ˌenəˈdʒetɪk/', 'adjective', 'Tràn đầy năng lượng', 'We feel energetic.', 'Chúng mình cảm thấy tràn trề năng lượng.', False, 'Feel energetic', 'Khỏe khoắn.'),
    ('Laugh', '/lɑːf/', 'verb', 'Cười vang vui vẻ', 'Children laugh happily.', 'Các bạn nhỏ cười đùa vui vẻ.', False, 'Laugh out loud', 'Tiếng cười rộn rã.'),
    ('Relax', '/rɪˈlæks/', 'verb', 'Thư giãn', 'Relax after hard study.', 'Thư giãn tinh thần sau giờ học.', False, 'Relax the mind', 'Nghỉ ngơi xả hơi.'),
    ('Score', '/skɔːr/', 'verb / noun', 'Ghi bàn, điểm số', 'Score a winning goal.', 'Ghi một bàn thắng quyết định.', False, 'Score a goal', 'Lập công ghi điểm.'),
    ('Snack', '/snæk/', 'noun', 'Đồ ăn nhẹ', 'Eat a healthy snack.', 'Ăn một món đồ ăn nhẹ bổ dưỡng.', False, 'Healthy snack', 'Bữa phụ giờ chơi.')
])

print("Grade 3 completed (10 units)")

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
