# -*- coding: utf-8 -*-
# Grade 6 Vocabulary: 10 units, 20-22 words each
G6_UNITS = {}

def add(uid, topic, core, adv):
    res = []
    for i, t in enumerate(core, 1):
        res.append({
            "id": f"{uid}-w{i}", "word": t[0], "ipa": t[1], "partOfSpeech": t[2],
            "meaningVi": t[3], "exampleEn": t[4], "exampleVi": t[5],
            "isCore": True, "unitId": uid, "grade": 6, "topic": topic,
            "collocation": t[6], "examNote": t[7]
        })
    start = len(core) + 1
    for i, t in enumerate(adv, start):
        res.append({
            "id": f"{uid}-w{i}", "word": t[0], "ipa": t[1], "partOfSpeech": t[2],
            "meaningVi": t[3], "exampleEn": t[4], "exampleVi": t[5],
            "isCore": False, "unitId": uid, "grade": 6, "topic": topic,
            "collocation": t[6], "examNote": t[7]
        })
    G6_UNITS[uid] = res

# Unit 1: My New School
add('unit-g6-u1', 'Ngôi trường mới & Đời sống THCS', [
    ('Secondary school', '/ˈsekəndri skuːl/', 'noun', 'Trường THCS (cấp 2)', 'Welcome to secondary school.', 'Chào mừng các em bước vào mái trường THCS.', 'At secondary school', 'Từ lớp 6 đến 9.'),
    ('Boarding school', '/ˈbɔːdɪŋ skuːl/', 'noun', 'Trường nội trú', 'Study at a boarding school.', 'Học tập và sinh hoạt tại trường nội trú.', 'Go to boarding school', 'Trường ăn ở tại chỗ.'),
    ('Uniform', '/ˈjuːnɪfɔːm/', 'noun', 'Bộ đồng phục học sinh', 'Wear clean white uniform.', 'Mặc bộ đồng phục học sinh trắng tinh tươm.', 'School uniform', 'Trang phục trường.'),
    ('Compass', '/ˈkʌmpəs/', 'noun', 'Chiếc com-pa vẽ hình', 'Draw accurate circles with compass.', 'Vẽ những đường tròn chuẩn xác bằng chiếc com-pa.', 'Use a compass', 'Dụng cụ toán hình.'),
    ('Calculator', '/ˈkælkjuleɪtər/', 'noun', 'Máy tính cầm tay', 'Pocket scientific calculator.', 'Chiếc máy tính khoa học cầm tay tiện dụng.', 'Scientific calculator', 'Máy tính bỏ túi.'),
    ('Subject', '/ˈsʌbdʒɪkt/', 'noun', 'Môn học trong chương trình', 'New academic subjects.', 'Những môn học mới mẻ trong chương trình giáo dục.', 'School subjects', 'Môn học.'),
    ('Science', '/ˈsaɪəns/', 'noun', 'Khoa học tự nhiên', 'Physics and chemistry in Science.', 'Vật lý và hóa học được tích hợp trong môn Khoa học.', 'Natural science', 'Khoa học tự nhiên.'),
    ('History', '/ˈhɪstri/', 'noun', 'Môn Lịch sử', 'Proud history of the nation.', 'Lịch sử hào hùng chói lọi của dân tộc ta.', 'Study history', 'Lịch sử.'),
    ('Geography', '/dʒiˈɒɡrəfi/', 'noun', 'Môn Địa lý', 'World topography in Geography.', 'Địa hình thế giới phong phú trong môn Địa lý.', 'Study geography', 'Địa lý thế giới.'),
    ('Classmate', '/ˈklɑːsmeɪt/', 'noun', 'Bạn học cùng lớp', 'Make friends with new classmates.', 'Kết thân với những người bạn học mới cùng lớp.', 'Help classmates', 'Bạn cùng lớp.'),
    ('Activity', '/ækˈtɪvəti/', 'noun', 'Hoạt động trải nghiệm', 'Extracurricular school activities.', 'Các hoạt động ngoại khóa trải nghiệm thực tế.', 'Outdoor activity', 'Hoạt động.'),
    ('Excited', '/ɪkˈsaɪtɪd/', 'adjective', 'Hào hứng, phấn khởi', 'Excited about the new school year.', 'Vô cùng háo hức đón chào năm học mới tinh khôi.', 'Be excited about', 'Tâm trạng phấn khích.')
], [
    ('International school', '/ˌɪntəˈnæʃnəl skuːl/', 'noun', 'Trường quốc tế', 'Study in an international school.', 'Học tập trong môi trường trường quốc tế năng động.', 'International environment', 'Môi trường đa ngữ.'),
    ('Equipment', '/ɪˈkwɪpmənt/', 'noun', 'Trang thiết bị hiện đại', 'State-of-the-art lab equipment.', 'Trang thiết bị phòng thí nghiệm tối tân hiện đại.', 'Modern equipment', 'Danh từ không đếm được.'),
    ('Library', '/ˈlaɪbrəri/', 'noun', 'Thư viện trường học', 'Borrow reference books in library.', 'Mượn sách tham khảo phong phú trong thư viện.', 'School library', 'Kho tri thức.'),
    ('Creativity', '/ˌkriːeɪˈtɪvəti/', 'noun', 'Tính sáng tạo đổi mới', 'Encourage students creativity.', 'Khuyến khích tối đa óc sáng tạo của học sinh.', 'Boost creativity', 'Tư duy sáng tạo.'),
    ('Confidence', '/ˈkɒnfɪdəns/', 'noun', 'Sự tự tin bản lĩnh', 'Build confidence in public speech.', 'Xây dựng sự tự tin bản lĩnh khi thuyết trình trước đám đông.', 'Gain confidence', 'Sự tự tin.'),
    ('Surround', '/səˈraʊnd/', 'verb', 'Bao quanh, vây quanh', 'Green hills surround the school.', 'Những ngọn đồi xanh mướt bao quanh lấy ngôi trường.', 'Surrounded by', 'Bao bọc.'),
    ('Share', '/ʃeər/', 'verb', 'Sẻ chia, thấu hiểu', 'Share feelings with teachers.', 'Sẻ chia những tâm tư tình cảm với thầy cô.', 'Share with', 'Đồng cảm.'),
    ('Interview', '/ˈɪntəvjuː/', 'verb / noun', 'Phỏng vấn, cuộc phỏng vấn', 'Interview teachers for school magazine.', 'Phỏng vấn thầy cô để viết bài cho tập san trường.', 'Conduct interview', 'Phỏng vấn.')
])

# Unit 2: My House & Furniture
add('unit-g6-u2', 'Ngôi nhà ấm cúng & Nội thất', [
    ('Living room', '/ˈlɪvɪŋ ruːm/', 'noun', 'Phòng khách gia đình', 'Gather in cozy living room.', 'Quây quần ấm cúng trong phòng khách gia đình.', 'In the living room', 'Gian tiếp khách.'),
    ('Bedroom', '/ˈbedruːm/', 'noun', 'Phòng ngủ yên tĩnh', 'Rest in quiet bedroom.', 'Nghỉ ngơi thư giãn trong căn phòng ngủ yên tĩnh.', 'My own bedroom', 'Nơi nghỉ ngơi.'),
    ('Kitchen', '/ˈkɪtʃɪn/', 'noun', 'Căn bếp ấm cúng', 'Cook delicious meals in kitchen.', 'Nấu những bữa cơm ngon lành trong gian bếp ấm cúng.', 'In the kitchen', 'Bếp núc.'),
    ('Bathroom', '/ˈbɑːθruːm/', 'noun', 'Phòng tắm tiện nghi', 'Take a warm bath in bathroom.', 'Tắm nước nóng thư giãn trong phòng tắm tiện nghi.', 'Clean bathroom', 'Nhà tắm.'),
    ('Hall', '/hɔːl/', 'noun', 'Đại sảnh, lối vào', 'Welcome guests in entrance hall.', 'Đón chào khách quý tại lối đại sảnh vào nhà.', 'Entrance hall', 'Tiền sảnh.'),
    ('Balcony', '/ˈbælkəni/', 'noun', 'Ban công lộng gió', 'Plants on sunny balcony.', 'Những chậu cây cảnh tươi tốt trên ban công đầy nắng.', 'On the balcony', 'Hiên ngoài trời.'),
    ('Furniture', '/ˈfɜːnɪtʃər/', 'noun', 'Đồ đạc nội thất', 'Modern wooden home furniture.', 'Đồ nội thất bằng gỗ tự nhiên thanh lịch hiện đại.', 'Wooden furniture', 'Không đếm được.'),
    ('Sofa', '/ˈsəʊfə/', 'noun', 'Ghế đi-văng, ghế sô-pha', 'Comfortable leather sofa.', 'Chiếc ghế sô-pha bọc da êm ái nơi phòng khách.', 'Sit on sofa', 'Ghế bành dài.'),
    ('Wardrobe', '/ˈwɔːdrəʊb/', 'noun', 'Tủ quần áo lớn', 'Hang coats in big wardrobe.', 'Treo áo khoác gọn gàng trong tủ quần áo lớn.', 'Wooden wardrobe', 'Tủ áo.'),
    ('Cupboard', '/ˈkʌbəd/', 'noun', 'Tủ bát đĩa, chạn bát', 'Plates in the kitchen cupboard.', 'Những chiếc đĩa sứ xếp ngăn nắp trong tủ chạn bếp.', 'Kitchen cupboard', 'Tủ đựng đồ.'),
    ('Fridge', '/frɪdʒ/', 'noun', 'Tủ lạnh bảo quản', 'Fresh fruit kept in fridge.', 'Hoa quả tươi ngon được bảo quản mát trong tủ lạnh.', 'In the fridge', 'Tủ lạnh gia đình.'),
    ('Microwave', '/ˈmaɪkrəweɪv/', 'noun', 'Lò vi sóng hâm nóng', 'Heat soup with microwave.', 'Hâm nóng bát súp thơm lừng bằng lò vi sóng.', 'Microwave oven', 'Đồ gia dụng.')
], [
    ('Dishwasher', '/ˈdɪʃwɒʃər/', 'noun', 'Máy rửa bát tự động', 'Wash plates with dishwasher.', 'Rửa sạch bát đĩa tự động bằng máy rửa bát.', 'Automatic dishwasher', 'Thiết bị tự động.'),
    ('Air conditioner', '/ˈeə kəndɪʃənər/', 'noun', 'Máy điều hòa nhiệt độ', 'Cool room with air conditioner.', 'Làm mát căn phòng bằng máy điều hòa nhiệt độ.', 'Turn on conditioner', 'Điều hòa không khí.'),
    ('Country house', '/ˈkʌntri haʊs/', 'noun', 'Nhà vườn thôn quê', 'A peaceful country house with garden.', 'Một ngôi nhà vườn thôn quê thanh bình rợp bóng cây.', 'Stay in country house', 'Nhà ngoại ô.'),
    ('Town house', '/ˈtaʊn haʊs/', 'noun', 'Nhà phố san sát', 'A modern three-story town house.', 'Một ngôi nhà phố ba tầng tiện nghi giữa phố thị.', 'Urban town house', 'Nhà liền kề.'),
    ('Stilt house', '/stɪlt haʊs/', 'noun', 'Nhà sàn truyền thống', 'Wooden stilt house in Tay village.', 'Ngôi nhà sàn bằng gỗ truyền thống của đồng bào Tày.', 'Traditional stilt house', 'Kiến trúc vùng cao.'),
    ('Apartment', '/əˈpɑːtmənt/', 'noun', 'Căn hộ chung cư cao cấp', 'High-rise luxury apartment.', 'Căn hộ chung cư cao cấp trên tòa tháp chọc trời.', 'Luxury apartment', 'Căn hộ.'),
    ('Attic', '/ˈætɪk/', 'noun', 'Tầng gác xép mái', 'Store old books in attic.', 'Lưu giữ những cuốn sách cũ trên tầng gác xép.', 'In the attic', 'Gác xép áp mái.'),
    ('Basement', '/ˈbeɪsmənt/', 'noun', 'Tầng hầm để xe', 'Park cars in underground basement.', 'Đỗ xe an toàn dưới tầng hầm tòa nhà.', 'Underground basement', 'Tầng hầm.')
])

# Unit 3: My Friends & Personality
add('unit-g6-u3', 'Bạn bè & Phẩm chất tính cách', [
    ('Active', '/ˈæktɪv/', 'adjective', 'Năng động, nhanh nhẹn', 'An active sports leader.', 'Một thủ lĩnh thể thao vô cùng năng động xông xáo.', 'Very active', 'Thích vận động.'),
    ('Clever', '/ˈklevər/', 'adjective', 'Thông minh, khéo trí', 'Find clever solutions to problems.', 'Tìm ra những giải pháp thông minh cho các vấn đề.', 'Clever student', 'Sáng dạ.'),
    ('Confident', '/ˈkɒnfɪdənt/', 'adjective', 'Tự tin đĩnh đạc', 'Speak with confident voice.', 'Phát biểu với một giọng nói tự tin đĩnh đạc.', 'Feel confident', 'Không nhút nhát.'),
    ('Creative', '/kriˈeɪtɪv/', 'adjective', 'Giàu óc sáng tạo', 'Creative drawing and ideas.', 'Những nét vẽ và ý tưởng vô cùng sáng tạo độc đáo.', 'Creative thinking', 'Giàu sáng kiến.'),
    ('Friendly', '/ˈfrendli/', 'adjective', 'Thân thiện, cởi mở', 'A warm and friendly smile.', 'Một nụ cười ấm áp và vô cùng thân thiện với mọi người.', 'Friendly smile', 'Dễ mến.'),
    ('Funny', '/ˈfʌni/', 'adjective', 'Hài hước, vui tính', 'Tell funny jokes that make us laugh.', 'Kể những mẩu chuyện cười dí dỏm làm cả lớp bật cười.', 'Funny story', 'Mang lại tiếng cười.'),
    ('Hardworking', '/ˌhɑːdˈwɜːkɪŋ/', 'adjective', 'Chăm chỉ, cần cù', 'Hardworking students get high grades.', 'Những bạn học sinh chăm chỉ luôn đạt điểm số cao.', 'Hardworking pupil', 'Cần mẫn.'),
    ('Kind', '/kaɪnd/', 'adjective', 'Tốt bụng, nhân ái', 'Kind and helpful to old people.', 'Vô cùng tốt bụng và luôn sẵn lòng giúp đỡ người cao tuổi.', 'Kind heart', 'Lương thiện.'),
    ('Loving', '/ˈlʌvɪŋ/', 'adjective', 'Giàu lòng yêu thương', 'A loving and caring friend.', 'Một người bạn giàu lòng yêu thương và luôn quan tâm.', 'Loving nature', 'Ấm áp.'),
    ('Patient', '/ˈpeɪʃnt/', 'adjective', 'Kiên nhẫn, nhẫn nại', 'A patient teacher explains again.', 'Người thầy kiên nhẫn giảng lại bài thật tỉ mỉ.', 'Be patient with', 'Không nóng vội.'),
    ('Polite', '/pəˈlaɪt/', 'adjective', 'Lịch sự, lễ phép', 'Always be polite to elders.', 'Luôn luôn cư xử lễ phép, lịch sự với người lớn tuổi.', 'Polite manners', 'Có giáo dục.'),
    ('Quiet', '/ˈkwaɪət/', 'adjective', 'Điềm đạm, trầm tĩnh', 'A quiet thoughtful boy.', 'Một cậu bạn trầm tính, điềm đạm và sâu sắc.', 'Quiet personality', 'Ít nói ồn ào.')
], [
    ('Generous', '/ˈdʒenərəs/', 'adjective', 'Hào phóng, rộng lượng', 'Generous with gifts and time.', 'Vô cùng hào phóng sẻ chia đồ dùng và thời gian cho bạn.', 'Generous person', 'Bao dung rộng rãi.'),
    ('Reliable', '/rɪˈlaɪəbl/', 'adjective', 'Đáng tin cậy vững vàng', 'A reliable friend in need.', 'Một người bạn đáng tin cậy luôn kề vai lúc khó khăn.', 'Reliable partner', 'Có thể tin tưởng.'),
    ('Curious', '/ˈkjʊəriəs/', 'adjective', 'Tò mò, ham khám phá', 'Curious about how things work.', 'Luôn tò mò tìm hiểu xem vạn vật vận hành ra sao.', 'Curious mind', 'Thích tìm hiểu.'),
    ('Honest', '/ˈɒnɪst/', 'adjective', 'Trung thực, thật thà', 'Always give an honest answer.', 'Luôn luôn đưa ra câu trả lời trung thực ngay thẳng.', 'Honest person', 'Chữ h câm.'),
    ('Personality', '/ˌpɜːsəˈnæləti/', 'noun', 'Tính cách, nhân cách', 'Admire his noble personality.', 'Khâm phục nhân cách cao đẹp và chân thành của bạn ấy.', 'Strong personality', 'Đặc điểm tính cách.'),
    ('Appearance', '/əˈpɪərəns/', 'noun', 'Ngoại hình, diện mạo', 'Describe outward appearance.', 'Miêu tả diện mạo bề ngoài của nhân vật trong tranh.', 'Physical appearance', 'Vẻ bề ngoài.'),
    ('Cheek', '/tʃiːk/', 'noun', 'Đôi gò má bầu bĩnh', 'Rosy cheeks of the little girl.', 'Đôi gò má hồng hào phúng phính của cô bé nhỏ.', 'Rosy cheeks', 'Gương mặt.'),
    ('Forehead', '/ˈfɔːhed/', 'noun', 'Vầng trán thông minh', 'A high intelligent forehead.', 'Một vầng trán cao toát lên vẻ thông minh đĩnh ngộ.', 'High forehead', 'Trán.')
])

# Unit 4: My Neighbourhood
add('unit-g6-u4', 'Khu phố nơi tôi sống & Tiện ích', [
    ('Neighbourhood', '/ˈneɪbəhʊd/', 'noun', 'Khu dân cư lân cận', 'Live in a friendly neighbourhood.', 'Sinh sống trong một khu dân cư hòa đồng thân thiện.', 'In my neighbourhood', 'Khu xóm.'),
    ('Square', '/skweər/', 'noun', 'Quảng trường thành phố', 'Gather at Ba Dinh Square.', 'Tập trung đông vui tại Quảng trường Ba Đình lịch sử.', 'City square', 'Quảng trường lớn.'),
    ('Art gallery', '/ˈɑːt ɡæləri/', 'noun', 'Phòng triển lãm nghệ thuật', 'Admire paintings in art gallery.', 'Chiêm ngưỡng những tuyệt tác hội họa trong phòng tranh.', 'Visit art gallery', 'Nơi trưng bày tranh.'),
    ('Cathedral', '/kəˈθiːdrəl/', 'noun', 'Nhà thờ lớn cổ kính', 'St. Joseph Cathedral in Hanoi.', 'Nhà thờ Lớn Hà Nội với kiến trúc Gothic cổ kính.', 'Ancient cathedral', 'Nhà thờ chính tòa.'),
    ('Railway station', '/ˈreɪlweɪ ˈsteɪʃn/', 'noun', 'Ga tàu hỏa nhộn nhịp', 'Catch express at railway station.', 'Đón chuyến tàu tốc hành tại nhà ga tàu hỏa.', 'At railway station', 'Ga đường sắt.'),
    ('Post office', '/ˈpəʊst ɒfɪs/', 'noun', 'Bưu điện trung tâm', 'Send a parcel at post office.', 'Gửi bưu kiện hàng hóa tại bưu điện thành phố.', 'Central post office', 'Bưu chính.'),
    ('Supermarket', '/ˈsuːpəmɑːkɪt/', 'noun', 'Siêu thị hiện đại', 'Buy fresh groceries in supermarket.', 'Mua sắm thực phẩm tươi ngon trong siêu thị lớn.', 'Go to supermarket', 'Khu mua sắm.'),
    ('Temple', '/ˈtempl/', 'noun', 'Ngôi đền thiêng liêng', 'Visit Literature Temple.', 'Đến dâng hương tại Văn Miếu - Quốc Tử Giám.', 'Ancient temple', 'Đền thờ.'),
    ('Convenient', '/kənˈviːniənt/', 'adjective', 'Thuận tiện, tiện nghi', 'Supermarket is near and convenient.', 'Siêu thị ở ngay gần nhà nên vô cùng thuận tiện.', 'Very convenient', 'Tiện lợi sinh hoạt.'),
    ('Crowded', '/ˈkraʊdɪd/', 'adjective', 'Đông đúc người xe', 'Crowded streets in evening rush.', 'Những con phố đông đúc người xe vào giờ tan tầm.', 'Crowded streets', 'Nhiều người.'),
    ('Narrow', '/ˈnærəʊ/', 'adjective', 'Chật hẹp, eo hẹp', 'Ancient narrow streets in old town.', 'Những con ngõ nhỏ chật hẹp cổ kính nơi phố cổ.', 'Narrow lane', 'Trái nghĩa với wide.'),
    ('Peaceful', '/ˈpiːsfl/', 'adjective', 'Thanh bình, yên ả', 'A peaceful lakeside walkway.', 'Một lối đi bộ ven hồ nước thanh bình tĩnh lặng.', 'Peaceful place', 'Êm đềm.')
], [
    ('Modern', '/ˈmɒdn/', 'adjective', 'Hiện đại, tân tiến', 'Modern urban infrastructure.', 'Cơ sở hạ tầng đô thị hiện đại và văn minh.', 'Modern city', 'Thời thượng.'),
    ('Historic', '/hɪˈstɒrɪk/', 'adjective', 'Mang tính lịch sử', 'Historic monuments and relics.', 'Những di tích và tượng đài mang tính lịch sử dân tộc.', 'Historic monument', 'Có giá trị lịch sử.'),
    ('Noisy', '/ˈnɔɪzi/', 'adjective', 'Ồn ào, huyên náo', 'Noisy traffic horn sounds.', 'Tiếng còi xe giao thông ồn ào inh ỏi trên đường.', 'Noisy traffic', 'Gây tiếng ồn.'),
    ('Polluted', '/pəˈluːtɪd/', 'adjective', 'Bị ô nhiễm khói bụi', 'Dusty and polluted air.', 'Bầu không khí bị ô nhiễm khói bụi cần khắc phục.', 'Polluted environment', 'Mất trong sạch.'),
    ('Crossroads', '/ˈkrɒsrəʊdz/', 'noun', 'Ngã tư đường giao nhau', 'Turn right at the crossroads.', 'Rẽ phải ngay tại điểm giao ngã tư đường phố.', 'At the crossroads', 'Giao lộ.'),
    ('Traffic lights', '/ˈtræfɪk laɪts/', 'noun', 'Đèn tín hiệu giao thông', 'Stop when traffic lights turn red.', 'Nghiêm chỉnh dừng lại khi đèn giao thông chuyển đỏ.', 'Red traffic light', 'Đèn tín hiệu.'),
    ('Pedestrian', '/pəˈdestriən/', 'noun', 'Người đi bộ trên vỉa hè', 'Safe zebra crossing for pedestrians.', 'Lối vạch qua đường an toàn dành cho người đi bộ.', 'Pedestrian crossing', 'Người bộ hành.'),
    ('Direction', '/dəˈrekʃn/', 'noun', 'Lời chỉ đường, phương hướng', 'Ask a local for directions.', 'Hỏi người dân bản địa để xin lời chỉ đường.', 'Ask directions', 'Phương hướng đi.')
])

# Unit 5: Natural Wonders of Vietnam
add('unit-g6-u5', 'Kỳ quan thiên nhiên Việt Nam', [
    ('Wonder', '/ˈwʌndər/', 'noun', 'Kỳ quan hùng vĩ', 'Natural wonder of the world.', 'Kỳ quan thiên nhiên kỳ vĩ bậc nhất thế giới.', 'Natural wonder', 'Kỳ quan.'),
    ('Waterfall', '/ˈwɔːtəfɔːl/', 'noun', 'Thác nước trắng xóa', 'Ban Gioc waterfall cascades down.', 'Thác Bản Giốc tuôn dòng nước trắng xóa kỳ vĩ.', 'Spectacular waterfall', 'Thác nước.'),
    ('Cave', '/keɪv/', 'noun', 'Hang động thạch nhũ', 'Son Doong is the largest cave.', 'Sơn Đoòng là hang động tự nhiên lớn nhất thế giới.', 'Enormous cave', 'Hang thạch nhũ.'),
    ('Desert', '/ˈdezət/', 'noun', 'Sa mạc cát mênh mông', 'Red sand dunes of Mui Ne desert.', 'Những đồi cát đỏ mênh mông như sa mạc Mũi Né.', 'Sand desert', 'Vùng cát khô cằn.'),
    ('Forest', '/ˈfɒrɪst/', 'noun', 'Rừng cây nguyên sinh', 'Cuc Phuong primeval forest.', 'Rừng nguyên sinh Cúc Phương với ngàn cây cổ thụ.', 'Primeval forest', 'Rừng rậm.'),
    ('Island', '/ˈaɪlənd/', 'noun', 'Hòn đảo ngọc giữa biển', 'Pearl island of Phu Quoc.', 'Hòn đảo ngọc Phú Quốc biển xanh cát trắng.', 'Tropical island', 'Đảo ngoài khơi.'),
    ('Mountain', '/ˈmaʊntən/', 'noun', 'Dãy núi sừng sững', 'Fansipan the highest mountain.', 'Đỉnh Fansipan nóc nhà Đông Dương hùng vĩ.', 'High mountain', 'Núi non.'),
    ('Bay', '/beɪ/', 'noun', 'Vịnh biển êm sóng', 'Ha Long Bay has limestone islands.', 'Vịnh Hạ Long với hàng ngàn đảo đá vôi kỳ thú.', 'Limestone bay', 'Vùng vịnh.'),
    ('Valley', '/ˈvæli/', 'noun', 'Thung lũng hoa mộng mơ', 'Muong Hoa valley in Sa Pa.', 'Thung lũng Mường Hoa rực rỡ sắc màu ruộng bậc thang.', 'Green valley', 'Thung lũng.'),
    ('Plaster', '/ˈplɑːstər/', 'noun', 'Băng dán vết thương cá nhân', 'Carry plasters in first-aid kit.', 'Mang theo băng dán cá nhân trong túi cứu thương.', 'Adhesive plaster', 'Băng y tế.'),
    ('Sleeping bag', '/ˈsliːpɪŋ bæɡ/', 'noun', 'Túi ngủ dã ngoại', 'Warm sleeping bag for camping.', 'Chiếc túi ngủ ấm áp dành cho chuyến cắm trại đêm.', 'Warm sleeping bag', 'Túi ngủ phượt.'),
    ('Backpack', '/ˈbækpæk/', 'noun', 'Ba lô dã ngoại leo núi', 'Pack essentials in backpack.', 'Xếp đồ dùng thiết yếu vào chiếc ba lô dã ngoại.', 'Heavy backpack', 'Ba lô du lịch.')
], [
    ('Suncream', '/ˈsʌnkriːm/', 'noun', 'Kem chống nắng bảo vệ', 'Apply suncream before swimming.', 'Thoa kem chống nắng trước khi tắm biển bảo vệ da.', 'Wear suncream', 'Chống tia UV.'),
    ('Compass', '/ˈkʌmpəs/', 'noun', 'La bàn định hướng rừng', 'Navigate forest with compass.', 'Định hướng lối đi trong rừng già bằng chiếc la bàn.', 'Magnetic compass', 'Kim chỉ nam.'),
    ('Torch', '/tɔːtʃ/', 'noun', 'Đèn pin soi đêm', 'Light dark cave with torch.', 'Soi sáng hang động tối tăm bằng ánh đèn pin.', 'Flashlight / torch', 'Đèn pin chiếu sáng.'),
    ('Scissors', '/ˈsɪzəz/', 'noun', 'Kéo cắt đa năng', 'Multi-tool scissors for hiking.', 'Chiếc kéo cắt đa năng hữu ích khi đi leo núi.', 'Pair of scissors', 'Kéo cắt.'),
    ('Spectacular', '/spekˈtækjələr/', 'adjective', 'Ngoạn mục, kỳ vĩ', 'A spectacular panoramic view.', 'Một góc nhìn toàn cảnh kỳ vĩ ngoạn mục khó quên.', 'Spectacular scenery', 'Tuyệt mỹ.'),
    ('Breathtaking', '/ˈbreθteɪkɪŋ/', 'adjective', 'Đẹp ngỡ ngàng nín thở', 'Breathtaking beauty of nature.', 'Vẻ đẹp ngỡ ngàng nín thở của thiên nhiên kỳ thú.', 'Breathtaking landscape', 'Đẹp mê hồn.'),
    ('Limestone', '/ˈlaɪmstəʊn/', 'noun', 'Đá vôi karst cổ', 'Karst limestone pillars in bay.', 'Những cột đá vôi karst sừng sững giữa lòng vịnh.', 'Limestone karst', 'Đá trầm tích.'),
    ('Preserve', '/prɪˈzɜːv/', 'verb', 'Bảo tồn, gìn giữ', 'Preserve natural landscapes.', 'Gìn giữ và bảo tồn nguyên vẹn các thắng cảnh tự nhiên.', 'Preserve heritage', 'Bảo vệ di sản.')
])

# Unit 6: Our Tet Holiday
add('unit-g6-u6', 'Tết Nguyên Đán & Phong tục cổ truyền', [
    ('Tet holiday', '/tet ˈhɒlədeɪ/', 'noun', 'Tết Nguyên Đán cổ truyền', 'Tet is our most sacred holiday.', 'Tết Nguyên Đán là dịp lễ hội thiêng liêng nhất.', 'Celebrate Tet', 'Tết âm lịch.'),
    ('Lunar New Year', '/ˈluːnər njuː jɪər/', 'noun', 'Năm mới âm lịch', 'Welcome the Lunar New Year.', 'Hân hoan chào đón mùa xuân Năm mới âm lịch.', 'Lunar calendar', 'Tết cổ truyền.'),
    ('Peach blossom', '/piːtʃ ˈblɒsəm/', 'noun', 'Hoa đào đỏ thắm miền Bắc', 'Pink peach blossoms in Hanoi.', 'Những cành hoa đào phai hồng thắm khoe sắc xuân.', 'Branch of peach', 'Hoa xuân phương Bắc.'),
    ('Apricot blossom', '/ˈeɪprɪkɒt ˈblɒsəm/', 'noun', 'Hoa mai vàng rực miền Nam', 'Golden apricot blossoms in Saigon.', 'Những nhành hoa mai vàng rực rỡ đón xuân phương Nam.', 'Yellow apricot', 'Hoa xuân phương Nam.'),
    ('Chung cake', '/tʃuŋ keɪk/', 'noun', 'Bánh chưng xanh vuông vức', 'Wrap green square Chung cakes.', 'Gói những chiếc bánh chưng xanh vuông vức đón Tết.', 'Make Chung cake', 'Món ăn ngày Tết.'),
    ('Lucky money', '/ˈlʌki ˈmʌni/', 'noun', 'Tiền mừng tuổi, lì xì', 'Elders give children lucky money.', 'Người lớn mừng tuổi tiền lì xì may mắn cho trẻ nhỏ.', 'Red envelopes', 'Tiền may mắn.'),
    ('Red envelope', '/red ˈenvələʊp/', 'noun', 'Bao lì xì đỏ tươi', 'Lucky money in red envelopes.', 'Tiền mừng tuổi được đựng trong những phong bao đỏ.', 'Give red envelopes', 'Bao mừng tuổi.'),
    ('Firework', '/ˈfaɪəwɜːk/', 'noun', 'Pháo hoa rực rỡ đêm giao thừa', 'Fireworks light up midnight sky.', 'Màn pháo hoa rực sáng bầu trời đêm giao thừa.', 'Firework display', 'Pháo hoa.'),
    ('Gathering', '/ˈɡæðərɪŋ/', 'noun', 'Sự sum họp gia đình', 'Warm family gathering on Eve.', 'Buổi sum họp gia đình ấm cúng vào đêm ba mươi.', 'Family gathering', 'Quây quần đoàn tụ.'),
    ('First footer', '/ˌfɜːst ˈfʊtər/', 'noun', 'Người xông đất đầu năm', 'Choose a virtuous first footer.', 'Chọn người xông đất đức độ mang lại may mắn cả năm.', 'First footing', 'Phong tục xông đất.'),
    ('Clean the house', '/kliːn ðə haʊs/', 'phrase', 'Dọn dẹp nhà cửa đón Tết', 'Clean house thoroughly before Tet.', 'Dọn dẹp trang hoàng nhà cửa sạch sẽ đón Tết.', 'Clean house', 'Sửa soạn đón xuân.'),
    ('Decorate', '/ˈdekəreɪt/', 'verb', 'Trang hoàng, bày trí', 'Decorate living room with kumquat.', 'Trang hoàng phòng khách bằng cây quất trĩu quả.', 'Decorate home', 'Làm đẹp nhà cửa.')
], [
    ('Kumquat tree', '/ˈkʌmkwɒt triː/', 'noun', 'Cây quất cảnh trĩu quả', 'A golden fruit kumquat tree.', 'Một chậu cây quất cảnh trĩu quả vàng mọng đón tài lộc.', 'Kumquat bonsai', 'Cây cảnh Tết.'),
    ('Wish', '/wɪʃ/', 'verb / noun', 'Lời chúc phúc đầu xuân', 'Send best wishes of prosperity.', 'Gửi trao những lời chúc phúc an khang thịnh vượng.', 'New Year wish', 'Chúc Tết.'),
    ('Relative', '/ˈrelətɪv/', 'noun', 'Bà con họ hàng thân tộc', 'Visit relatives on second day.', 'Đi chúc Tết bà con họ hàng vào ngày mùng hai Tết.', 'Visit relatives', 'Người thân thuộc.'),
    ('Temple', '/ˈtempl/', 'noun', 'Chùa chiền linh thiêng', 'Pray for peace at Buddhist temple.', 'Đi lễ chùa cầu mong quốc thái dân an đầu năm.', 'Pagoda / temple', 'Nơi tâm linh.'),
    ('Prosperity', '/prɒˈsperəti/', 'noun', 'Sự thịnh vượng, phát đạt', 'Wish health, wealth and prosperity.', 'Kính chúc dồi dào sức khỏe, tài lộc và thịnh vượng.', 'Peace and prosperity', 'Phồn vinh.'),
    ('Tradition', '/trəˈdɪʃn/', 'noun', 'Truyền thống ngàn đời', 'Keep sacred national traditions.', 'Gìn giữ những truyền thống văn hóa thiêng liêng của dân tộc.', 'Preserve tradition', 'Nét đẹp văn hóa.'),
    ('Belief', '/bɪˈliːf/', 'noun', 'Tín ngưỡng, niềm tin', 'Traditional folk spiritual beliefs.', 'Những tín ngưỡng tâm linh dân gian giàu ý nghĩa tốt lành.', 'Folk belief', 'Niềm tin phong tục.'),
    ('Spring roll', '/sprɪŋ rəʊl/', 'noun', 'Món nem rán cổ truyền', 'Crispy delicious spring rolls.', 'Món nem rán vàng ruộm giòn tan không thể thiếu mâm cỗ.', 'Fried spring rolls', 'Ẩm thực Việt.')
])

# Unit 7: Television & Media
add('unit-g6-u7', 'Truyền hình & Phương tiện truyền thông', [
    ('Television', '/ˈtelɪvɪʒn/', 'noun', 'Vô tuyến truyền hình', 'Watch educational television.', 'Theo dõi các kênh truyền hình giáo dục bổ ích.', 'On television', 'Ti-vi.'),
    ('Channel', '/ˈtʃænl/', 'noun', 'Kênh phát sóng', 'VTV7 is an educational channel.', 'VTV7 là kênh truyền hình giáo dục quốc gia hấp dẫn.', 'TV channel', 'Kênh đài.'),
    ('Programme', '/ˈprəʊɡræm/', 'noun', 'Chương trình phát sóng', 'An exciting game show programme.', 'Một chương trình trò chơi truyền hình sôi nổi.', 'Watch programme', 'Tiết mục phát.'),
    ('News', '/njuːz/', 'noun', 'Bản tin thời sự', 'Watch evening news at 7 PM.', 'Theo dõi bản tin thời sự thời sự lúc 7 giờ tối.', 'Evening news', 'Danh từ số ít.'),
    ('Animated film', '/ˈænɪmeɪtɪd fɪlm/', 'noun', 'Phim hoạt hình đồ họa', 'Children love animated films.', 'Các bạn nhỏ say mê những bộ phim hoạt hình đầy màu sắc.', 'Watch animations', 'Phim hoạt họa.'),
    ('Comedy', '/ˈkɒmədi/', 'noun', 'Phim hài kịch hóm hỉnh', 'Laugh out loud with comedy.', 'Bật cười sảng khoái với chương trình hài kịch hóm hỉnh.', 'Sitcom comedy', 'Tiểu phẩm hài.'),
    ('Documentary', '/ˌdɒkjuˈmentri/', 'noun', 'Phim tài liệu khoa học', 'A wildlife nature documentary.', 'Một bộ phim tài liệu khoa học về thế giới muôn loài.', 'Watch documentary', 'Phim tài liệu.'),
    ('Game show', '/ˈɡeɪm ʃəʊ/', 'noun', 'Trò chơi truyền hình trí tuệ', 'Ring the Golden Bell game show.', 'Trò chơi truyền hình Rung chuông vàng đầy kịch tính.', 'Compete in game show', 'Trò chơi trí tuệ.'),
    ('MC', '/ˌem ˈsiː/', 'noun', 'Người dẫn chương trình', 'A witty and charismatic MC.', 'Một người dẫn chương trình hóm hỉnh và lôi cuốn.', 'Show MC', 'Chủ trì chương trình.'),
    ('Viewer', '/ˈvjuːər/', 'noun', 'Khán giả xem truyền hình', 'Millions of viewers across nation.', 'Hàng triệu khán giả truyền hình trên khắp mọi miền.', 'TV viewer', 'Người theo dõi.'),
    ('Remote control', '/rɪˈməʊt kənˈtrəʊl/', 'noun', 'Chiếc điều khiển từ xa', 'Change channels with remote control.', 'Chuyển kênh nhanh chóng bằng chiếc điều khiển từ xa.', 'Use remote', 'Điều khiển ti-vi.'),
    ('Schedule', '/ˈʃedjuːl/', 'noun', 'Lịch phát sóng chương trình', 'Check the daily broadcast schedule.', 'Tra cứu khung giờ phát sóng trên lịch truyền hình.', 'Broadcast schedule', 'Lịch lên sóng.')
], [
    ('Educational', '/ˌedʒuˈkeɪʃənl/', 'adjective', 'Mang tính giáo dục cao', 'Educational TV shows expand mind.', 'Những chương trình mang tính giáo dục mở mang trí tuệ.', 'Educational value', 'Bổ ích.'),
    ('Entertaining', '/ˌentəˈteɪnɪŋ/', 'adjective', 'Mang tính giải trí cao', 'An entertaining Saturday show.', 'Một chương trình giải trí thứ Bảy vô cùng cuốn hút.', 'Highly entertaining', 'Vui vẻ xả stress.'),
    ('Audience', '/ˈɔːdiəns/', 'noun', 'Thính giả, khán thính giả', 'Live studio audience applaud.', 'Khán giả trực tiếp tại trường quay vỗ tay tán thưởng.', 'Studio audience', 'Khán thính giả.'),
    ('Broadcast', '/ˈbrɔːdkɑːst/', 'verb / noun', 'Phát sóng truyền hình', 'Broadcast live football match.', 'Truyền hình trực tiếp trận cầu bóng đá đỉnh cao.', 'Live broadcast', 'Lên sóng.'),
    ('Character', '/ˈkærəktər/', 'noun', 'Nhân vật hoạt hình', 'Beloved cartoon characters.', 'Những nhân vật hoạt hình ngộ nghĩnh được triệu bạn yêu mến.', 'Cartoon character', 'Hình tượng phim.'),
    ('Talent show', '/ˈtælənt ʃəʊ/', 'noun', 'Cuộc thi tìm kiếm tài năng', 'Perform in national talent show.', 'Biểu diễn tranh tài trong cuộc thi tài năng toàn quốc.', 'School talent show', 'Hội thi tài năng.'),
    ('Intelligent', '/ɪnˈtelɪdʒənt/', 'adjective', 'Thông minh, sắc sảo', 'Intelligent robot host on TV.', 'Người dẫn chương trình rô-bốt thông minh trên sóng.', 'Very intelligent', 'Sáng suốt.'),
    ('Clumsy', '/ˈklʌmzi/', 'adjective', 'Vụng về, lóng ngóng', 'A clumsy funny cartoon bear.', 'Một chú gấu hoạt hình vụng về lóng ngóng nhưng đáng yêu.', 'Clumsy bear', 'Hậu đậu gây cười.')
])

# Unit 8: Sports & Games
add('unit-g6-u8', 'Thể dục thể thao & Luyện rèn sức khỏe', [
    ('Aerobics', '/eəˈrəʊbɪks/', 'noun', 'Thể dục nhịp điệu', 'Do morning aerobics to music.', 'Tập thể dục nhịp điệu khỏe khoắn theo nền nhạc sôi động.', 'Do aerobics', 'Đi với động từ do.'),
    ('Karate', '/kəˈrɑːti/', 'noun', 'Môn võ Ka-ra-te', 'Practice karate self-defence.', 'Luyện tập võ karate nâng cao bản lĩnh tự vệ.', 'Do karate', 'Đi với động từ do.'),
    ('Table tennis', '/ˈteɪbl tenɪs/', 'noun', 'Môn bóng bàn', 'Fast rallies in table tennis.', 'Những pha đôi công bóng bàn thần tốc qua lại.', 'Play table tennis', 'Đi với play.'),
    ('Badminton', '/ˈbædmɪntən/', 'noun', 'Môn cầu lông', 'Hit the shuttlecock in badminton.', 'Đập cầu uy lực trong trận thi đấu cầu lông rực lửa.', 'Play badminton', 'Đi với play.'),
    ('Skiing', '/ˈskiːɪŋ/', 'noun', 'Môn trượt tuyết mùa đông', 'Go skiing on snowy slopes.', 'Đi trượt tuyết trên những triền dốc phủ đầy tuyết trắng.', 'Go skiing', 'Đi với go.'),
    ('Cycling', '/ˈsaɪklɪŋ/', 'noun', 'Môn đua xe đạp', 'Cycling around West Lake.', 'Đạp xe thể thao dạo quanh cung đường Hồ Tây thơ mộng.', 'Go cycling', 'Đi với go.'),
    ('Skateboarding', '/ˈskeɪtbɔːdɪŋ/', 'noun', 'Môn trượt ván đường phố', 'Perform tricks in skateboarding.', 'Biểu diễn kỹ năng điêu luyện trên ván trượt đường phố.', 'Go skateboarding', 'Môn thể thao trẻ.'),
    ('Equipment', '/ɪˈkwɪpmənt/', 'noun', 'Dụng cụ thể thao', 'Sports protective equipment.', 'Trang bị đầy đủ dụng cụ bảo hộ an toàn khi thi đấu.', 'Sports equipment', 'Trang thiết bị.'),
    ('Racket', '/ˈrækɪt/', 'noun', 'Cây vợt thi đấu', 'A lightweight carbon tennis racket.', 'Cây vợt các-bon siêu nhẹ chuyên dụng thi đấu.', 'Tennis racket', 'Vợt cầu lông/tennis.'),
    ('Goggles', '/ˈɡɒɡlz/', 'noun', 'Kính bơi bảo vệ mắt', 'Wear swim goggles in pool.', 'Đeo kính bơi bảo vệ mắt khi bơi lội dưới nước sâu.', 'Swimming goggles', 'Kính bơi chuyên dụng.'),
    ('Sneakers', '/ˈsniːkəz/', 'noun', 'Đôi giày thể thao', 'Comfortable running sneakers.', 'Đôi giày thể thao êm ái nâng đỡ từng bước chạy nhanh.', 'Pair of sneakers', 'Giày đế mềm.'),
    ('Marathon', '/ˈmærəθən/', 'noun', 'Cuộc chạy ma-ra-tông 42km', 'Finish the international marathon.', 'Bền bỉ cán đích cuộc thi chạy ma-ra-tông quốc tế.', 'Run a marathon', 'Cự ly 42.195km.')
], [
    ('Tournament', '/ˈtʊənəmənt/', 'noun', 'Giải đấu thể thao quy mô', 'Compete in national tournament.', 'Tranh tài quyết liệt tại giải đấu quy mô toàn quốc.', 'Sports tournament', 'Đại hội thi đấu.'),
    ('Championship', '/ˈtʃæmpiənʃɪp/', 'noun', 'Chức vô địch danh giá', 'Lift the championship trophy.', 'Tự hào giơ cao chiếc cúp vô địch danh giá toàn đoàn.', 'World championship', 'Ngôi vô địch.'),
    ('Spectator', '/spekˈteɪtər/', 'noun', 'Khán giả trên khán đài', 'Roar of thousands of spectators.', 'Tiếng reo hò của hàng vạn khán giả trên khán đài.', 'Stadium spectator', 'Khán giả sân vận động.'),
    ('Referee', '/ˌrefəˈriː/', 'noun', 'Trọng tài điều khiển trận', 'Fair decisions by the referee.', 'Những phán quyết công tâm chính trực của trọng tài.', 'Match referee', 'Người cầm còi.'),
    ('Fair play', '/feə ˈpleɪ/', 'noun', 'Tinh thần thể thao cao thượng', 'Demonstrate fair play spirit.', 'Thể hiện tinh thần thể thao trung thực và cao thượng.', 'Fair play spirit', 'Chơi đẹp.'),
    ('Opponent', '/əˈpəʊnənt/', 'noun', 'Đối thủ trên sàn đấu', 'Respect your worthy opponent.', 'Tôn trọng đối thủ xứng tầm của mình sau trận đấu.', 'Tough opponent', 'Đối phương.'),
    ('Exhausted', '/ɪɡˈzɔːstɪd/', 'adjective', 'Kiệt sức sau thi đấu', 'Exhausted but proud of victory.', 'Kiệt sức sau trận đấu nhưng vô cùng tự hào chiến thắng.', 'Feel exhausted', 'Hết sạch sức lực.'),
    ('Fitness', '/ˈfɪtnəs/', 'noun', 'Thể lực, sự dẻo dai', 'Maintain prime physical fitness.', 'Duy trì thể lực sung mãn và độ dẻo dai tuyệt vời.', 'Physical fitness', 'Sức khỏe dẻo dai.')
])

# Unit 9: Cities of the World
add('unit-g6-u9', 'Các thành phố trên thế giới & Danh thắng', [
    ('Landmark', '/ˈlændmɑːk/', 'noun', 'Công trình biểu tượng danh tiếng', 'Big Ben is a famous landmark.', 'Tháp đồng hồ Big Ben là biểu tượng danh tiếng của Luân Đôn.', 'Famous landmark', 'Dấu ấn kiến trúc.'),
    ('Monument', '/ˈmɒnjumənt/', 'noun', 'Tượng đài tưởng niệm', 'Historic monuments in capital.', 'Những tượng đài tưởng niệm lịch sử uy nghiêm nơi thủ đô.', 'Historic monument', 'Công trình kỷ niệm.'),
    ('Tower', '/ˈtaʊər/', 'noun', 'Ngọn tháp chọc trời', 'Eiffel Tower in romantic Paris.', 'Ngọn tháp Eiffel kiêu hãnh vút cao giữa Paris lãng mạn.', 'Eiffel Tower', 'Tháp cao.'),
    ('Palace', '/ˈpæləs/', 'noun', 'Cung điện hoàng gia lộng lẫy', 'Royal Buckingham Palace.', 'Cung điện hoàng gia Buckingham tráng lệ và uy nghi.', 'Royal palace', 'Hoàng cung.'),
    ('Statue', '/ˈstætʃuː/', 'noun', 'Bức tượng đài điêu khắc', 'Statue of Liberty in New York.', 'Bức tượng Nữ thần Tự do sừng sững tại cảng New York.', 'Statue of Liberty', 'Tượng đài.'),
    ('Crowded', '/ˈkraʊdɪd/', 'adjective', 'Đông đúc tấp nập khách', 'Crowded Times Square at night.', 'Quảng trường Thời đại đông đúc rực rỡ ánh đèn ban đêm.', 'Crowded city', 'Đông người qua.'),
    ('Modern', '/ˈmɒdn/', 'adjective', 'Hiện đại, sầm uất bậc nhất', 'Modern subway system in Tokyo.', 'Hệ thống tàu điện ngầm siêu hiện đại tại thủ đô Tokyo.', 'Ultra-modern', 'Tiên tiến.'),
    ('Ancient', '/ˈeɪnʃənt/', 'adjective', 'Cổ kính, nghìn năm tuổi', 'Ancient ruins of Rome.', 'Những tàn tích cổ kính nghìn năm lịch sử của thành Rome.', 'Ancient ruins', 'Cổ xưa.'),
    ('Polluted', '/pəˈluːtɪd/', 'adjective', 'Ô nhiễm khói bụi giao thông', 'Polluted megacity smog.', 'Lớp sương khói ô nhiễm của các siêu đô thị lớn cần giảm thiểu.', 'Heavily polluted', 'Không khí ô nhiễm.'),
    ('Clean', '/kliːn/', 'adjective', 'Xanh sạch đẹp không rác', 'Singapore is known as a clean city.', 'Singapore nổi tiếng toàn cầu là một quốc đảo sạch đẹp.', 'Clean and green', 'Trong lành.'),
    ('Delicious', '/dɪˈlɪʃəs/', 'adjective', 'Thơm ngon nức tiếng ẩm thực', 'Delicious local street food.', 'Ẩm thực đường phố thơm ngon nức tiếng chinh phục du khách.', 'Delicious cuisine', 'Hương vị tuyệt hảo.'),
    ('Expensive', '/ɪkˈspensɪv/', 'adjective', 'Đắt đỏ, chi phí cao', 'Living in London is expensive.', 'Mức sống sinh hoạt tại Luân Đôn thuộc hàng đắt đỏ.', 'Very expensive', 'Giá cả cao.')
], [
    ('Cosmopolitan', '/ˌkɒzməˈpɒlɪtən/', 'adjective', 'Đa văn hóa quốc tế', 'A cosmopolitan global city.', 'Một đô thị toàn cầu đa văn hóa quy tụ bốn phương trời.', 'Cosmopolitan city', 'Hội nhập thế giới.'),
    ('Architectural', '/ˌɑːkɪˈtektʃərəl/', 'adjective', 'Thuộc về kiến trúc xây dựng', 'Architectural masterpiece.', 'Một kiệt tác nghệ thuật kiến trúc làm say đắm lòng người.', 'Architectural wonder', 'Về mặt kiến trúc.'),
    ('Metropolis', '/məˈtrɒpəlɪs/', 'noun', 'Đại đô thị sầm uất', 'A bustling economic metropolis.', 'Một đại đô thị kinh tế sầm uất không bao giờ ngủ.', 'Vibrant metropolis', 'Siêu đô thị.'),
    ('Skyline', '/ˈskaɪlaɪn/', 'noun', 'Đường chân trời toàn nhà cao tầng', 'Admire the illuminated city skyline.', 'Chiêm ngưỡng đường chân trời rực sáng của thành phố về đêm.', 'City skyline', 'Cảnh quan cao ốc.'),
    ('Heritage', '/ˈherɪtɪdʒ/', 'noun', 'Di sản văn hóa nhân loại', 'World cultural heritage site.', 'Khu di sản văn hóa thế giới được UNESCO công nhận.', 'Cultural heritage', 'Kho báu truyền thống.'),
    ('Public transport', '/ˌpʌblɪk ˈtrænspɔːt/', 'noun', 'Giao thông công cộng tiện lợi', 'Efficient green public transport.', 'Mạng lưới giao thông công cộng xanh và cực kỳ đúng giờ.', 'Use transport', 'Xe bus, tàu điện.'),
    ('Vibrant', '/ˈvaɪbrənt/', 'adjective', 'Tràn đầy sức sống sôi động', 'Vibrant nightlife culture.', 'Nếp sống về đêm tràn đầy sức sống và màu sắc tươi vui.', 'Vibrant atmosphere', 'Sôi nổi năng động.'),
    ('Iconic', '/aɪˈkɒnɪk/', 'adjective', 'Mang tính biểu tượng kinh điển', 'The iconic Sydney Opera House.', 'Nhà hát con sò Sydney mang tính biểu tượng kinh điển của Úc.', 'Iconic symbol', 'Hình mẫu bất hủ.')
])

# Unit 10: Our Houses in the Future
add('unit-g6-u10', 'Ngôi nhà thông minh tương lai & Công nghệ', [
    ('Smart home', '/smɑːt həʊm/', 'noun', 'Ngôi nhà thông minh tương lai', 'Live in a voice-controlled smart home.', 'Sinh sống trong một ngôi nhà thông minh điều khiển giọng nói.', 'Futuristic smart home', 'Nhà ứng dụng AI.'),
    ('Solar energy', '/ˈsəʊlər ˈenədʒi/', 'noun', 'Năng lượng mặt trời sạch', 'Powered entirely by solar energy.', 'Được vận hành hoàn toàn bằng nguồn năng lượng mặt trời sạch.', 'Green solar energy', 'Năng lượng xanh vô tận.'),
    ('Wind energy', '/wɪnd ˈenədʒi/', 'noun', 'Năng lượng gió tự nhiên', 'Harness clean wind energy.', 'Tận dụng nguồn năng lượng gió mát lành để thắp sáng.', 'Wind turbine power', 'Phong điện.'),
    ('Appliance', '/əˈplaɪəns/', 'noun', 'Thiết bị gia dụng điện tử', 'Automated household appliances.', 'Những thiết bị gia dụng điện tử được tự động hóa hoàn toàn.', 'Smart appliance', 'Đồ gia dụng.'),
    ('Automatic', '/ˌɔːtəˈmætɪk/', 'adjective', 'Tự động hóa hoàn toàn', 'Automatic sliding sensor doors.', 'Những cánh cửa cảm ứng tự động trượt mở khi có người tới.', 'Automatic control', 'Không cần sức người.'),
    ('Robot helper', '/ˈrəʊbɒt ˈhelpər/', 'noun', 'Trợ lý người máy gia đình', 'Robot helpers do tedious housework.', 'Các trợ lý người máy đảm đương toàn bộ việc nhà tẻ nhạt.', 'Domestic robot', 'Người máy phục vụ.'),
    ('Eco-friendly', '/ˌiːkəʊ ˈfrendli/', 'adjective', 'Thân thiện với môi trường sinh thái', 'Built with eco-friendly materials.', 'Được xây dựng từ các vật liệu xanh thân thiện môi trường.', 'Eco-friendly house', 'Không gây ô nhiễm.'),
    ('Skyscraper', '/ˈskaɪskreɪpər/', 'noun', 'Tòa nhà chọc trời xanh', 'Vertical green forest skyscrapers.', 'Những tòa nhà chọc trời phủ kín rừng cây xanh thẳng đứng.', 'Futuristic skyscraper', 'Tháp cao tầng.'),
    ('Space station', '/speɪs ˈsteɪʃn/', 'noun', 'Trạm vũ trụ ngoài không gian', 'Live on an orbital space station.', 'Sinh sống làm việc trên một trạm không gian quay quanh quỹ đạo.', 'Orbital station', 'Trạm không gian.'),
    ('Underground', '/ˌʌndəˈɡraʊnd/', 'adjective / adverb', 'Dưới lòng đất ấm áp', 'Underground homes protected from storms.', 'Những ngôi nhà dưới lòng đất an toàn trước mọi bão tố.', 'Underground dwelling', 'Dưới mặt đất.'),
    ('Ocean city', '/ˈəʊʃn ˈsɪti/', 'noun', 'Thành phố nổi giữa đại dương', 'Floating ocean cities of tomorrow.', 'Những thành phố nổi tương lai lênh đênh giữa đại dương xanh.', 'Floating city', 'Đô thị trên biển.'),
    ('Futuristic', '/ˌfjuːtʃəˈrɪstɪk/', 'adjective', 'Đậm chất tương lai tân tiến', 'Futuristic architectural designs.', 'Những thiết kế kiến trúc tân tiến đậm chất khoa học viễn tưởng.', 'Futuristic concept', 'Vượt thời đại.')
], [
    ('Virtual assistant', '/ˌvɜːtʃuəl əˈsɪstənt/', 'noun', 'Trợ lý ảo trí tuệ nhân tạo', 'AI virtual assistant runs the home.', 'Trợ lý ảo trí tuệ nhân tạo điều phối toàn bộ thiết bị trong nhà.', 'Smart AI assistant', 'Trí tuệ nhân tạo.'),
    ('Renewable', '/rɪˈnjuːəbl/', 'adjective', 'Có thể tái tạo liên tục', 'Rely purely on renewable resources.', 'Dựa hoàn toàn vào các nguồn tài nguyên thiên nhiên có thể tái tạo.', 'Renewable energy', 'Năng lượng tái tạo.'),
    ('Sustainable', '/səˈsteɪnəbl/', 'adjective', 'Phát triển bền vững lâu dài', 'Sustainable zero-carbon living.', 'Lối sống bền vững không phát thải khí nhà kính bảo vệ địa cầu.', 'Sustainable living', 'Bền vững môi sinh.'),
    ('Sensors', '/ˈsensəz/', 'noun', 'Cảm biến thông minh', 'Sensors detect room temperature.', 'Hệ thống cảm biến thông minh tự động tinh chỉnh nhiệt độ phòng.', 'Smart sensors', 'Đầu dò cảm ứng.'),
    ('Convenience', '/kənˈviːniəns/', 'noun', 'Sự tiện nghi vượt bậc', 'Bring utmost convenience to life.', 'Mang lại sự tiện nghi vượt bậc cho cuộc sống con người.', 'Ultimate convenience', 'Tiện ích trọn vẹn.'),
    ('Self-sufficient', '/ˌself səˈfɪʃnt/', 'adjective', 'Tự cung tự cấp năng lượng', 'A self-sufficient solar house.', 'Một ngôi nhà tự cung tự cấp hoàn toàn điện nước và rau sạch.', 'Self-sufficient home', 'Tự lập hoàn toàn.'),
    ('Teleportation', '/ˌtelɪpɔːˈteɪʃn/', 'noun', 'Thuật dịch chuyển tức thời', 'Dream of instant teleportation.', 'Ước mơ về công nghệ dịch chuyển tức thời chỉ trong chớp mắt.', 'Instant teleportation', 'Khoa học viễn tưởng.'),
    ('Hologram', '/ˈhɒləɡræm/', 'noun', 'Hình ảnh 3D không gian ba chiều', 'Communicate via 3D holograms.', 'Giao tiếp trò chuyện qua hình chiếu không gian ba chiều sống động.', '3D hologram', 'Hình ảnh nổi 3D.')
])

print("vocab_grade6.py loaded with 10 units")
