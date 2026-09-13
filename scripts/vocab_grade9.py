# -*- coding: utf-8 -*-
# Grade 9 Vocabulary: 10 units, 20-22 words each
G9_UNITS = {}

def add(uid, topic, core, adv):
    res = []
    for i, t in enumerate(core, 1):
        res.append({
            "id": f"{uid}-w{i}", "word": t[0], "ipa": t[1], "partOfSpeech": t[2],
            "meaningVi": t[3], "exampleEn": t[4], "exampleVi": t[5],
            "isCore": True, "unitId": uid, "grade": 9, "topic": topic,
            "collocation": t[6], "examNote": t[7]
        })
    start = len(core) + 1
    for i, t in enumerate(adv, start):
        res.append({
            "id": f"{uid}-w{i}", "word": t[0], "ipa": t[1], "partOfSpeech": t[2],
            "meaningVi": t[3], "exampleEn": t[4], "exampleVi": t[5],
            "isCore": False, "unitId": uid, "grade": 9, "topic": topic,
            "collocation": t[6], "examNote": t[7]
        })
    G9_UNITS[uid] = res

# Unit 1: Local Environment & Traditional Crafts
add('unit-g9-u1', 'Làng nghề truyền thống & Đất trăm nghề', [
    ('Artisan', '/ˌɑːtɪˈzæn/', 'noun', 'Nghệ nhân tài hoa bậc thầy', 'Master artisans shape clay on wheels.', 'Những bậc nghệ nhân tài hoa nặn nên hình khối đất sét tinh xảo trên bàn xoay gốm.', 'Skilled artisan', 'Bàn tay vàng làng nghề.'),
    ('Craftsman', '/ˈkrɑːftsmən/', 'noun', 'Thợ thủ công lành nghề', 'Generations of dedicated bronze craftsmen.', 'Các thế hệ thợ thủ công đúc đồng tận tụy giữ lửa cho làng nghề truyền thống.', 'Bronze craftsman', 'Người thợ tài hoa.'),
    ('Handicraft', '/ˈhændikrɑːft/', 'noun', 'Sản phẩm thủ công mỹ nghệ', 'Export traditional handicrafts worldwide.', 'Xuất khẩu những sản phẩm thủ công mỹ nghệ mây tre đan tinh tế ra khắp năm châu.', 'Traditional handicraft', 'Đồ thủ công.'),
    ('Pottery', '/ˈpɒtəri/', 'noun', 'Nghề làm gốm Bát Tràng trứ danh', 'Bat Trang is famous for glazed pottery.', 'Làng Bát Tràng nức tiếng gần xa với dòng gốm sứ men lam cổ truyền độc đáo.', 'Glazed pottery', 'Gốm nung tráng men.'),
    ('Workshop', '/ˈwɜːkʃɒp/', 'noun', 'Xưởng chế tác thủ công gia đình', 'Visit a family silk weaving workshop.', 'Tham quan xưởng dệt lụa tơ tằm thủ công gia truyền tại làng Vạn Phúc.', 'Craft workshop', 'Xưởng sản xuất.'),
    ('Conical hat', '/ˈkɒnɪkl hæt/', 'noun', 'Chiếc nón lá bài thơ duyên dáng', 'Chuong village weaves graceful conical hats.', 'Làng Chuông nức tiếng với những chiếc nón lá bài thơ duyên dáng nghiêng che tà áo dài.', 'Weave conical hat', 'Biểu tượng Việt Nam.'),
    ('Lacquerware', '/ˈlækəweə/', 'noun', 'Nghệ thuật sơn mài truyền thống', 'Inlaid eggshell on shiny lacquerware.', 'Khảm vỏ trứng tỉ mỉ trên những bức tranh sơn mài óng ánh sắc màu huyền bí.', 'Traditional lacquerware', 'Tranh/đồ sơn mài.'),
    ('Sculpture', '/ˈskʌlptʃər/', 'noun', 'Tác phẩm điêu khắc đá Non Nước', 'Marble sculptures at Non Nuoc village.', 'Những pho tượng đá cẩm thạch điêu khắc tinh xảo tại làng đá Non Nước Đà Nẵng.', 'Marble sculpture', 'Nghệ thuật tạc đá.'),
    ('Weave', '/wiːv/', 'verb', 'Dệt vải lụa, đan mây tre', 'Weave delicate silk threads on wooden loom.', 'Dệt những sợi tơ tằm óng ả thành lụa là gấm vóc trên khung cửi gỗ cổ xưa.', 'Weave silk / mats', 'Dệt vải/chiếu.'),
    ('Carve', '/kɑːv/', 'verb', 'Chạm trổ hoa văn trên gỗ quý', 'Carve intricate dragon motifs on wood.', 'Chạm trổ hình rồng uốn lượn tinh xảo trên cột gỗ lim của ngôi đình làng.', 'Carve wood / stone', 'Điêu khắc chạm khắc.'),
    ('Cast', '/kɑːst/', 'verb', 'Đúc chuông đồng, đúc tượng', 'Cast giant sacred bronze bells.', 'Đúc những quả đại hồng chung bằng đồng linh thiêng ngân vang tiếng chuông chùa.', 'Cast bronze', 'Nấu đồng rót khuôn.'),
    ('Embroider', '/ɪmˈbrɔɪdər/', 'verb', 'Thêu ren hoa văn tinh xảo', 'Embroider lotus blossoms on silk cloth.', 'Thêu những đóa sen hồng ngát hương trên tà áo dài lụa bằng chỉ tơ mượt mà.', 'Embroider patterns', 'Đường kim mũi chỉ.')
], [
    ('Authenticity', '/ˌɔːθenˈtɪsəti/', 'noun', 'Tính nguyên bản, thật chất di sản', 'Preserve the authenticity of crafts.', 'Gìn giữ tính nguyên bản và cốt cách độc đáo của các sản phẩm thủ công truyền thống.', 'Preserve authenticity', 'Giá trị gốc.'),
    ('Inherit', '/ɪnˈherɪt/', 'verb', 'Kế thừa bí quyết tổ nghiệp', 'Inherit secret glazing techniques from elders.', 'Kế thừa trọn vẹn những bí quyết pha chế men gốm độc nhất vô nhị từ tiền nhân.', 'Inherit craft', 'Nối dõi tông đường.'),
    ('Preservation', '/ˌprezəˈveɪʃn/', 'noun', 'Sự bảo tồn làng nghề trước mai một', 'Craft village preservation projects.', 'Những dự án khẩn cấp nhằm bảo tồn và hồi sinh các làng nghề truyền thống trước nguy cơ mai một.', 'Cultural preservation', 'Cứu lấy làng nghề.'),
    ('Livelihood', '/ˈlaɪvlihʊd/', 'noun', 'Kế sinh nhai nuôi sống bao đời', 'Weaving provides sustainable local livelihoods.', 'Nghề dệt chiếu tạo kế sinh nhai ổn định và bền vững cho hàng ngàn bà con nông dân.', 'Earn a livelihood', 'Kế mưu sinh.'),
    ('Intricate', '/ˈɪntrɪkət/', 'adjective', 'Tinh vi, phức tạp và vô cùng tinh xảo', 'Intricate patterns carved on antique chests.', 'Những hoa văn tinh vi phức tạp được chạm khắc tỉ mỉ trên chiếc rương gỗ cổ.', 'Intricate design', 'Tỉ mỉ tinh xảo.'),
    ('Revitalize', '/ˌriːˈvaɪtəlaɪz/', 'verb', 'Hồi sinh, làm sống lại nghề xưa', 'Revitalize dying traditional pottery skills.', 'Thổi bùng sức sống mới và hồi sinh những kỹ nghệ gốm nung cổ xưa đang dần thất truyền.', 'Revitalize craft', 'Đem lại sức sống mới.'),
    ('Heritage', '/ˈherɪtɪdʒ/', 'noun', 'Di sản văn hóa phi vật thể quốc gia', 'Dong Ho folk painting is national heritage.', 'Tranh dân gian Đông Hồ là di sản văn hóa phi vật thể quốc gia cần bảo tồn đặc biệt.', 'National heritage', 'Gia tài văn hóa.'),
    ('Mastery', '/ˈmɑːstəri/', 'noun', 'Sự điêu luyện tuyệt đỉnh tay nghề', 'Achieve complete mastery of clay firing.', 'Đạt tới sự điêu luyện tuyệt đỉnh trong việc điều chỉnh ngọn lửa nung lò gốm.', 'Skill mastery', 'Bậc thầy tay nghề.')
])

# Unit 2: City Life
add('unit-g9-u2', 'Đô thị hóa & Nhịp sống thành phố lớn', [
    ('Metropolis', '/məˈtrɒpəlɪs/', 'noun', 'Đại đô thị sầm uất hiện đại', 'Hanoi is a fast-growing metropolis.', 'Hà Nội là một đại đô thị đang trên đà phát triển thần tốc với nhiều tòa nhà cao tầng.', 'Bustling metropolis', 'Siêu đô thị.'),
    ('Urbanization', '/ˌɜːbənaɪˈzeɪʃn/', 'noun', 'Quá trình đô thị hóa nhanh chóng', 'Rapid urbanization changes landscape.', 'Quá trình đô thị hóa nhanh chóng đang làm thay đổi căn bản diện mạo phố phường.', 'Rapid urbanization', 'Mở rộng thành phố.'),
    ('Skyline', '/ˈskaɪlaɪn/', 'noun', 'Đường chân trời toàn nhà chọc trời', 'Admire the sparkling city skyline.', 'Chiêm ngưỡng đường chân trời lung linh rực sáng của thành phố khi lên đèn.', 'Urban skyline', 'Toàn cảnh cao ốc.'),
    ('Congestion', '/kənˈdʒestʃən/', 'noun', 'Sự tắc nghẽn giao thông đô thị', 'Alleviate severe traffic congestion.', 'Nỗ lực giải tỏa tình trạng ùn tắc giao thông nghiêm trọng tại các nút giao thông lớn.', 'Traffic congestion', 'Kẹt xe dồn ứ.'),
    ('Rush hour', '/ˈrʌʃ aʊər/', 'noun', 'Giờ cao điểm tan tầm', 'Buses are packed during rush hour.', 'Xe buýt đông nghẹt hành khách chen chân trong các khung giờ cao điểm tan trường.', 'In rush hour', 'Khung giờ đông nghẹt.'),
    ('Infrastructure', '/ˈɪnfrəstrʌktʃər/', 'noun', 'Cơ sở hạ tầng kỹ thuật đô thị', 'Upgrade metro rail infrastructure.', 'Nâng cấp toàn diện cơ sở hạ tầng đường sắt đô thị và các cầu vượt trên cao.', 'Modern infrastructure', 'Hạ tầng giao thông.'),
    ('Cosmopolitan', '/ˌkɒzməˈpɒlɪtən/', 'adjective', 'Đa văn hóa mang tính toàn cầu', 'Saigon has a cosmopolitan vibe.', 'Sài Gòn mang một vẻ đẹp đa văn hóa cởi mở và tràn đầy sức sống của thời đại hội nhập.', 'Cosmopolitan city', 'Hội nhập quốc tế.'),
    ('Overcrowded', '/ˌəʊvəˈkraʊdɪd/', 'adjective', 'Quá đông đúc đến ngột ngạt', 'Overcrowded sidewalks in city center.', 'Những vỉa hè quá đỗi đông đúc và chật chội người xe nơi trung tâm thương mại phố xá.', 'Overcrowded street', 'Quá tải người.'),
    ('Air quality', '/ˈeə ˈkwɒləti/', 'noun', 'Chất lượng không khí thở', 'Improve urban air quality urgently.', 'Cần hành động cấp bách để cải thiện chất lượng không khí thở tại các khu dân cư.', 'Good air quality', 'Độ trong sạch khí trời.'),
    ('Pavement', '/ˈpeɪvmənt/', 'noun', 'Vỉa hè cho người đi bộ', 'Reclaim pavements for walking pedestrians.', 'Lập lại trật tự đô thị trả lại vỉa hè phong quang an toàn cho người đi bộ.', 'Walk on pavement', 'Lối đi bộ.'),
    ('Public transport', '/ˌpʌblɪk ˈtrænspɔːt/', 'noun', 'Phương tiện giao thông công cộng', 'Green electric buses for public transport.', 'Đưa xe buýt điện xanh thân thiện môi trường vào hệ thống giao thông công cộng.', 'Take public transport', 'Tàu điện, xe bus.'),
    ('Cost of living', '/kɒst əv ˈlɪvɪŋ/', 'noun', 'Chi phí sinh hoạt đắt đỏ', 'High cost of living in capital cities.', 'Chi phí sinh hoạt leo thang đắt đỏ tại các thành phố lớn là bài toán đau đầu.', 'High cost of living', 'Mức chi tiêu.')
], [
    ('Livability', '/ˌlɪvəˈbɪləti/', 'noun', 'Khả năng đáng sống của đô thị', 'Da Nang ranks high in city livability.', 'Đà Nẵng nhiều năm liền dẫn đầu cả nước về chỉ số thành phố đáng sống và tiện ích.', 'Urban livability', 'Chất lượng sống.'),
    ('Megacity', '/ˈmeɡəsɪti/', 'noun', 'Siêu đô thị trên 10 triệu dân', 'Megacities face environmental strain.', 'Các siêu đô thị trên mười triệu dân đang phải gánh chịu áp lực sinh thái nặng nề.', 'Global megacity', 'Đô thị khổng lồ.'),
    ('Sprawl', '/sprɔːl/', 'noun / verb', 'Sự bành trướng đô thị bừa bãi', 'Control reckless suburban urban sprawl.', 'Quy hoạch chặt chẽ để kiểm soát sự bành trướng bừa bãi của các khu đô thị vệ tinh.', 'Urban sprawl', 'Đô thị lan tràn.'),
    ('Pedestrianize', '/pəˈdestriənaɪz/', 'verb', 'Quy hoạch thành phố đi bộ', 'Pedestrianize streets around Hoan Kiem Lake.', 'Quy hoạch các tuyến phố đi bộ quanh Hồ Hoàn Kiếm vào dịp cuối tuần thanh bình.', 'Pedestrianize streets', 'Phố đi bộ không xe.'),
    ('Affordable housing', '/əˈfɔːdəbl ˈhaʊzɪŋ/', 'noun', 'Nhà ở xã hội giá rẻ cho dân', 'Build affordable housing for workers.', 'Xây dựng thêm nhiều khu nhà ở xã hội giá cả hợp lý cho công nhân và người lao động.', 'Social affordable housing', 'Nhà ở xã hội.'),
    ('Sustainable', '/səˈsteɪnəbl/', 'adjective', 'Quy hoạch phát triển bền vững', 'Sustainable urban master planning.', 'Bản quy hoạch tổng thể phát triển đô thị bền vững cân bằng giữa kinh tế và cây xanh.', 'Sustainable city', 'Bền vững dài lâu.'),
    ('Commute', '/kəˈmjuːt/', 'verb / noun', 'Quãng đường đi làm hàng ngày', 'Long daily commute by elevated train.', 'Quãng đường đi làm hàng ngày dài nhưng thuận tiện hơn nhờ tuyến đường sắt trên cao.', 'Daily commute', 'Đi lại làm việc.'),
    ('Amenities', '/əˈmiːnətiz/', 'noun', 'Tiện ích sống (công viên, rạp chiếu)', 'Enjoy world-class recreational amenities.', 'Tận hưởng đầy đủ các tiện ích sinh hoạt và vui chơi giải trí tiêu chuẩn quốc tế.', 'Modern amenities', 'Tiện nghi đô thị.')
])

# Unit 3: Teen Stress and Pressure
add('unit-g9-u3', 'Áp lực tuổi mới lớn & Trí tuệ cảm xúc', [
    ('Stress', '/stres/', 'noun', 'Căng thẳng tâm lý học đường', 'Cope effectively with academic stress.', 'Học cách kiểm soát và giải tỏa hiệu quả áp lực căng thẳng trong học tập thi cử.', 'Relieve stress', 'Áp lực tâm lý.'),
    ('Pressure', '/ˈpreʃər/', 'noun', 'Áp lực đè nặng tinh thần', 'Handle exam pressure without anxiety.', 'Vững vàng vượt qua áp lực thi cử chuyển cấp mà không rơi vào trạng thái hoảng loạn.', 'Under pressure', 'Gánh nặng tâm lý.'),
    ('Expectation', '/ˌekspekˈteɪʃn/', 'noun', 'Sự kỳ vọng lớn từ gia đình', 'Unrealistic family academic expectations.', 'Những sự kỳ vọng học tập quá mức khắt khe từ gia đình có thể gây tổn thương tâm lý.', 'Parental expectations', 'Trông đợi.'),
    ('Depression', '/dɪˈpreʃn/', 'noun', 'Hội chứng trầm cảm lo âu', 'Warning signs of teenage depression.', 'Nhận biết sớm các dấu hiệu cảnh báo của hội chứng trầm cảm học đường ở tuổi dậy thì.', 'Suffer from depression', 'Bệnh trầm cảm.'),
    ('Anxiety', '/æŋˈzaɪəti/', 'noun', 'Sự bất an, lo lắng bồn chồn', 'Overcome performance test anxiety.', 'Học cách làm chủ cảm xúc để vượt qua sự hồi hộp lo âu bất an trước mỗi giờ kiểm tra.', 'Reduce anxiety', 'Bồn chồn lo sợ.'),
    ('Exhausted', '/ɪɡˈzɔːstɪd/', 'adjective', 'Kiệt sức cả thể xác lẫn tâm hồn', 'Feel physically and mentally exhausted.', 'Cảm thấy hoàn toàn kiệt sức cả về thể xác lẫn tinh thần sau những đêm thức trắng ôn thi.', 'Completely exhausted', 'Hết sạch sinh lực.'),
    ('Overwhelmed', '/ˌəʊvəˈwelmd/', 'adjective', 'Bị ngợp, choáng ngợp quá tải', 'Feel overwhelmed by tight deadlines.', 'Cảm thấy bị ngợp và choáng váng trước hàng loạt bài tập dồn dập đến hạn nộp.', 'Feel overwhelmed', 'Quá tải bài vở.'),
    ('Counselor', '/ˈkaʊnsələr/', 'noun', 'Chuyên gia tham vấn tâm lý', 'Confide problems in school counselor.', 'Mở lòng sẻ chia những khúc mắc thầm kín với chuyên gia tham vấn tâm lý học đường.', 'Psychological counselor', 'Người gỡ rối tâm lý.'),
    ('Helpline', '/ˈhelplaɪn/', 'noun', 'Đường dây nóng trợ giúp trẻ em', 'Call 111 national child protection helpline.', 'Gọi tới tổng đài 111 quốc gia bảo vệ trẻ em để nhận được sự tư vấn kịp thời nhất.', 'Call a helpline', 'Đường dây hỗ trợ.'),
    ('Frustrated', '/frʌˈstreɪtɪd/', 'adjective', 'Bất lực, ức chế bế tắc', 'Feel frustrated when failing tests.', 'Cảm thấy bất lực và ức chế tột cùng khi kết quả bài thi thử không như mong đợi.', 'Deeply frustrated', 'Tức tối chán nản.'),
    ('Empathize', '/ˈempəθaɪz/', 'verb', 'Thấu cảm, đặt mình vào hoàn cảnh', 'Parents should empathize with children.', 'Cha mẹ cần biết lắng nghe và thấu cảm sâu sắc với những nỗi niềm của con cái.', 'Empathize with', 'Đồng cảm sẻ chia.'),
    ('Self-control', '/ˌself kənˈtrəʊl/', 'noun', 'Khả năng tự chủ cảm xúc', 'Maintain self-control in heated arguments.', 'Luôn giữ vững sự tự chủ bình tĩnh trong những cuộc tranh luận gay gắt với bạn bè.', 'Lose self-control', 'Tự kiềm chế.')
], [
    ('Burnout', '/ˈbɜːnaʊt/', 'noun', 'Hội chứng kiệt sức vì quá tải', 'Prevent severe teenage study burnout.', 'Kịp thời ngăn ngừa hội chứng kiệt quệ tinh thần vì học tập quá tải kéo dài.', 'Academic burnout', 'Cháy sạch năng lượng.'),
    ('Resilience', '/rɪˈzɪliəns/', 'noun', 'Sự kiên cường đứng dậy sau vấp ngã', 'Cultivate mental emotional resilience.', 'Rèn giũa ý chí kiên cường và bản lĩnh phục hồi sau mỗi lần thất bại trắc trở.', 'Build resilience', 'Bản lĩnh thép.'),
    ('Well-being', '/ˌwel ˈbiːɪŋ/', 'noun', 'Sự khỏe khoắn trọn vẹn thân tâm', 'Mental well-being matters as much as grades.', 'Sức khỏe tinh thần của con trẻ quý giá và quan trọng không kém gì điểm số trên lớp.', 'Emotional well-being', 'Hạnh phúc an vui.'),
    ('Perfectionism', '/pəˈfekʃənɪzəm/', 'noun', 'Chủ nghĩa cầu toàn độc hại', 'Destructive perfectionism causes misery.', 'Chủ nghĩa cầu toàn thái quá ép mình vào sự hoàn hảo là nguồn cơn của đau khổ.', 'Toxic perfectionism', 'Quá đòi hỏi hoàn hảo.'),
    ('Mindfulness', '/ˈmaɪndflnəs/', 'noun', 'Thực hành chánh niệm xoa dịu tâm trí', 'Mindfulness meditation calms panic.', 'Thực hành thiền chánh niệm giúp xoa dịu những cơn hoảng loạn và tìm lại sự bình yên.', 'Practice mindfulness', 'Tĩnh lặng nội tâm.'),
    ('Reassurance', '/ˌriːəˈʃʊərəns/', 'noun', 'Lời động viên trấn an kịp thời', 'Words of loving parental reassurance.', 'Những lời trấn an động viên đong đầy yêu thương và tin tưởng từ cha mẹ lúc này.', 'Give reassurance', 'Lời tiếp thêm niềm tin.'),
    ('Time management', '/taɪm ˈmænɪdʒmənt/', 'noun', 'Kỹ năng quản lý thời gian khoa học', 'Master effective time management skills.', 'Làm chủ kỹ năng quản trị quỹ thời gian biểu một cách khoa học và cân bằng nhất.', 'Good time management', 'Sắp xếp công việc.'),
    ('Vulnerable', '/ˈvʌlnərəbl/', 'adjective', 'Dễ bị tổn thương tâm lý', 'Adolescents are emotionally vulnerable.', 'Lứa tuổi thiếu niên là giai đoạn nhạy cảm và rất dễ bị tổn thương về mặt tâm lý.', 'Emotionally vulnerable', 'Nhạy cảm non nớt.')
])

# Unit 4: Life in the Past & Memories
add('unit-g9-u4', 'Ký ức xưa & Cuộc sống thời bao cấp', [
    ('Past', '/pɑːst/', 'noun / adjective', 'Quá khứ gian khó mà nghĩa tình', 'Reflect on simple life in the past.', 'Hồi tưởng về cuộc sống giản dị, đơn sơ mà ấm áp nghĩa tình trong quá khứ của ông bà.', 'In the past', 'Thời xưa.'),
    ('Subsidy period', '/ˈsʌbsədi ˈpɪəriəd/', 'noun', 'Thời kỳ bao cấp gian khó', 'Life during the Vietnamese subsidy period.', 'Những năm tháng gian khó thời kỳ bao cấp với tem phiếu mua gạo và sổ gạo gia đình.', 'In subsidy period', 'Giai đoạn bao cấp.'),
    ('Ration stamp', '/ˈræʃn stæmp/', 'noun', 'Tem phiếu mua lương thực thời bao cấp', 'Queue with ration stamps for pork and rice.', 'Xếp hàng từ tờ mờ sáng với những chiếc tem phiếu để đổi lấy thịt lợn và dầu hỏa.', 'Food ration stamp', 'Phiếu mua hàng xưa.'),
    ('Extended family', '/ɪkˌstendɪd ˈfæməli/', 'noun', 'Đại gia đình tứ đại đồng đường', 'Four generations in an extended family.', 'Bốn thế hệ cùng chung sống đầm ấm hòa thuận dưới một mái nhà đại gia đình xưa.', 'Live in extended family', 'Nhiều thế hệ chung sống.'),
    ('Nuclear family', '/ˌnjuːkliə ˈfæməli/', 'noun', 'Gia đình hạt nhân nhỏ gọn', 'Modern trend towards nuclear families.', 'Xu hướng gia đình hạt nhân hiện đại chỉ gồm có bố mẹ và con cái sống cùng nhau.', 'Nuclear family', 'Gia đình nhỏ.'),
    ('Tricycle', '/ˈtraɪsɪkl/', 'noun', 'Chiếc xe xích lô bon bon trên phố', 'Take a scenic ride on a cycle tricycle.', 'Thong thả ngắm phố phường cổ kính trên chiếc xe xích lô quen thuộc của Hà Nội.', 'Ride a tricycle', 'Xe ba bánh đạp.'),
    ('Gramophone', '/ˈɡræməfəʊn/', 'noun', 'Chiếc máy hát đĩa than cổ điển', 'Vinyl records played on gramophone.', 'Những giai điệu tiền chiến mộc mạc phát ra từ chiếc máy hát đĩa than loa kèn cổ.', 'Antique gramophone', 'Máy hát đĩa cổ.'),
    ('Kerosene lamp', '/ˈkerəsiːn læmp/', 'noun', 'Ngọn đèn dầu hỏa leo lét', 'Study hard under dim kerosene lamp.', 'Cần mẫn dùi mài kinh sử dưới ánh sáng leo lét của ngọn đèn dầu hỏa đơn sơ ngày xưa.', 'Light kerosene lamp', 'Đèn dầu xưa.'),
    ('Clay pot', '/kleɪ pɒt/', 'noun', 'Chiếc niêu đất kho cá thơm nức', 'Fish stewed slowly in a rustic clay pot.', 'Cá bống kho tộ rục xương đậm đà thơm phức trong chiếc niêu đất nung mộc mạc.', 'Earthenware clay pot', 'Nồi đất nung.'),
    ('Barefoot', '/ˈbeəfʊt/', 'adjective / adverb', 'Đi chân trần trên đường đất', 'Children ran barefoot across meadows.', 'Lũ trẻ nông thôn ngày ấy thường chạy chân trần thả diều trên những bờ cỏ triền đê.', 'Walk barefoot', 'Chân không mang dép.'),
    ('Memorize', '/ˈmeməraɪz/', 'verb', 'Ghi nhớ nằm lòng trong ký ức', 'Memorize folk songs sung by grandmother.', 'Thuộc lòng từng lời ru ngọt ngào êm ái mà người bà kính yêu đã hát bên cánh võng.', 'Memorize by heart', 'Khắc ghi trong tim.'),
    ('Nostalgia', '/nɒˈstældʒə/', 'noun', 'Nỗi hoài niệm da diết về dĩ vãng', 'Filled with tender childhood nostalgia.', 'Lòng ngập tràn những niềm hoài niệm da diết và thương nhớ về tuổi thơ bình dị xưa.', 'Feel nostalgia', 'Nhớ thương quá khứ.')
], [
    ('Simplicity', '/sɪmˈplɪsəti/', 'noun', 'Sự giản dị mộc mạc thanh cao', 'Cherish the pure simplicity of past life.', 'Trân quý sự giản dị, đơn sơ và mộc mạc thanh cao trong nếp sống của tiền nhân xưa.', 'Rustic simplicity', 'Thanh đạm đơn sơ.'),
    ('Hardship', '/ˈhɑːdʃɪp/', 'noun', 'Gian truân, gian khó nhọc nhằn', 'Endure immense wartime hardships.', 'Kiên cường chịu đựng và vượt qua muôn vàn gian truân nhọc nhằn của những năm tháng đạn bom.', 'Overcome hardship', 'Khó khăn cực nhọc.'),
    ('Solidarity', '/ˌsɒlɪˈdærəti/', 'noun', 'Tình làng nghĩa xóm tối lửa tắt đèn', 'Neighborhood solidarity in hard times.', 'Tình làng nghĩa xóm tối lửa tắt đèn có nhau đùm bọc ngọt bùi sẻ chia thời bao cấp.', 'Village solidarity', 'Tình nghĩa keo sơn.'),
    ('Reminiscence', '/ˌremɪˈnɪsns/', 'noun', 'Hồi ức kỷ niệm ngọt ngào', 'Fond reminiscences of school days.', 'Những dòng hồi ức ngọt ngào và trong sáng về thời cắp sách đến trường năm nào.', 'Sweet reminiscence', 'Nhớ lại dĩ vãng.'),
    ('Transform', '/trænsˈfɔːm/', 'verb', 'Thay đổi diện mạo ngoạn mục', 'Village transformed into vibrant town.', 'Làng quê năm xưa nay đã chuyển mình lột xác ngoạn mục thành một đô thị phồn hoa.', 'Radically transform', 'Lột xác đổi mới.'),
    ('Generational', '/ˌdʒenəˈreɪʃənl/', 'adjective', 'Thuộc về các thế hệ nối tiếp', 'Generational wisdom passed down.', 'Kho tàng trí tuệ và bài học sống của các thế hệ cha ông truyền lại cho hậu thế mai sau.', 'Generational gap', 'Khoảng cách thế hệ.'),
    ('Antique', '/ænˈtiːk/', 'noun / adjective', 'Đồ cổ quý giá nhuốm màu thời gian', 'Collect rare bronze antique objects.', 'Sưu tầm những món cổ vật bằng đồng quý hiếm còn vẹn nguyên dấu ấn lịch sử triều đại.', 'Antique collector', 'Cổ xưa quý giá.'),
    ('Sentimental', '/ˌsentɪˈmentl/', 'adjective', 'Giàu cảm xúc tình cảm hoài niệm', 'Keep objects for sentimental value.', 'Lưu giữ những kỷ vật nhỏ bé đơn sơ nhưng chứa đựng giá trị tình cảm thiêng liêng vô giá.', 'Sentimental value', 'Nặng lòng tình cảm.')
])

# Unit 5: Wonders of Vietnam
add('unit-g9-u5', 'Kỳ quan thắng cảnh non nước Việt Nam', [
    ('Wonder', '/ˈwʌndər/', 'noun', 'Kỳ quan hùng vĩ của non sông', 'Ha Long Bay is a UNESCO world wonder.', 'Vịnh Hạ Long là kỳ quan thiên nhiên thế giới kỳ vĩ được UNESCO tôn vinh.', 'Natural wonder', 'Kỳ quan thế giới.'),
    ('Fortress', '/ˈfɔːtrəs/', 'noun', 'Thành lũy kiên cố nghìn năm', 'Ancient stone Citadel fortress of Ho Dynasty.', 'Thành nhà Hồ bằng đá độc nhất vô nhị sừng sững uy nghiêm suốt hơn 600 năm lịch sử.', 'Ancient fortress', 'Pháo đài thành quách.'),
    ('Cavern', '/ˈkævən/', 'noun', 'Hang động thạch nhũ khổng lồ', 'Son Doong is the worlds largest cavern.', 'Sơn Đoòng là hang động đá vôi khổng lồ chứa trọn cả một khu rừng nguyên sinh bên trong.', 'Gigantic cavern', 'Hang động lớn.'),
    ('Complex', '/ˈkɒmpleks/', 'noun', 'Quần thể danh thắng di tích', 'Trang An scenic landscape complex.', 'Quần thể danh thắng Tràng An di sản hỗn hợp đầu tiên của Đông Nam Á.', 'Monument complex', 'Quần thể công trình.'),
    ('Citadel', '/ˈsɪtədəl/', 'noun', 'Kinh thành, Hoàng thành cổ kính', 'Thang Long Imperial Citadel in Hanoi.', 'Hoàng thành Thăng Long lắng đọng trầm tích văn hóa nghìn năm Thăng Long - Hà Nội.', 'Imperial Citadel', 'Kinh thành vua chúa.'),
    ('Monument', '/ˈmɒnjumənt/', 'noun', 'Công trình kỷ niệm lịch sử', 'Historic monuments in ancient Hue.', 'Những đền đài lăng tẩm và công trình tưởng niệm lịch sử nguy nga nơi Cố đô Huế.', 'Historic monument', 'Tượng đài di tích.'),
    ('Limestone', '/ˈlaɪmstəʊn/', 'noun', 'Khối núi đá vôi Karst cổ đại', 'Towering karst limestone islands in emerald sea.', 'Những cột núi đá vôi karst sừng sững ngút ngàn soi bóng xuống làn nước biển xanh ngọc.', 'Karst limestone', 'Đá vôi tự nhiên.'),
    ('Geological', '/ˌdʒiːəˈlɒdʒɪkl/', 'adjective', 'Thuộc về địa chất kiến tạo', 'Geological museum of Dong Van Karst Plateau.', 'Cao nguyên đá Đồng Văn công viên địa chất toàn cầu độc đáo lưu giữ lịch sử trái đất.', 'Geological value', 'Khoa học địa chất.'),
    ('Spectacular', '/spekˈtækjələr/', 'adjective', 'Ngoạn mục, kỳ vĩ làm say lòng người', 'Spectacular panoramic view from summit.', 'Một tầm nhìn toàn cảnh kỳ vĩ ngoạn mục làm say đắm lòng người từ đỉnh núi Fansipan.', 'Spectacular view', 'Đẹp mãn nhãn.'),
    ('Breathtaking', '/ˈbreθteɪkɪŋ/', 'adjective', 'Đẹp ngỡ ngàng nín thở', 'Breathtaking beauty of Ban Gioc waterfall.', 'Vẻ đẹp ngỡ ngàng nín thở của thác Bản Giốc khi tuôn trào dòng bọt trắng xóa giữa mây ngàn.', 'Breathtaking scenery', 'Đẹp chết lặng.'),
    ('Preserve', '/prɪˈzɜːv/', 'verb', 'Bảo tồn nguyên vẹn danh thắng', 'Preserve world heritage for posterity.', 'Gìn giữ và bảo tồn nguyên vẹn các di sản thế giới quý báu cho các thế hệ tương lai.', 'Preserve heritage', 'Giữ gìn đời đời.'),
    ('Recognition', '/ˌrekəɡˈnɪʃn/', 'noun', 'Sự công nhận danh hiệu quốc tế', 'Gain international UNESCO recognition.', 'Được UNESCO chính thức vinh danh và trao bằng công nhận di sản cấp quốc tế.', 'Global recognition', 'Ghi nhận toàn cầu.')
], [
    ('Pristine', '/ˈprɪstiːn/', 'adjective', 'Hoang sơ nguyên thủy chưa can thiệp', 'Pristine ancient primary rain forests.', 'Những cánh rừng mưa nguyên sinh hoang sơ nguyên thủy chưa từng bị con người can thiệp.', 'Pristine condition', 'Nguyên vẹn thô sơ.'),
    ('Ecosystem', '/ˈiːkəʊsɪstəm/', 'noun', 'Hệ sinh thái tự nhiên độc đáo', 'Rich coastal mangrove ecosystem.', 'Hệ sinh thái rừng ngập mặn ven biển Cần Giờ trù phú bảo vệ vùng duyên hải miền Nam.', 'Mangrove ecosystem', 'Hệ sinh thái biển.'),
    ('Biodiversity', '/ˌbaɪəʊdaɪˈvɜːsəti/', 'noun', 'Đa dạng sinh học phong phú', 'Exceptional global biodiversity hotspot.', 'Một điểm nóng đa dạng sinh học toàn cầu với hàng ngàn loài động thực vật quý hiếm.', 'Rich biodiversity', 'Phong phú loài.'),
    ('Invaluable', '/ɪnˈvæljuəbl/', 'adjective', 'Vô giá, không tiền nào mua được', 'Invaluable cultural and natural treasures.', 'Những kho báu văn hóa và thiên nhiên vô giá của tổ quốc không gì có thể đo đếm được.', 'Invaluable asset', 'Quý giá khôn cùng.'),
    ('Magnificent', '/mæɡˈnɪfɪsnt/', 'adjective', 'Tráng lệ, nguy nga lộng lẫy', 'Magnificent stalagmites inside caves.', 'Những khối măng đá và nhũ đá tráng lệ nguy nga mọc lên từ đáy hang động huyền ảo.', 'Magnificent scenery', 'Kỳ vĩ tuyệt trần.'),
    ('Erosion', '/ɪˈrəʊʒn/', 'noun', 'Sự xói mòn địa chất tự nhiên', 'Water erosion carved deep canyons.', 'Dòng nước chảy qua hàng triệu năm đã xói mòn và tạc nên những hẻm vực sâu thẳm kỳ thú.', 'Water erosion', 'Bào mòn đá đất.'),
    ('Sanctuary', '/ˈsæŋktʃuəri/', 'noun', 'Khu bảo tồn thánh địa thiên nhiên', 'My Son Sanctuary holds Cham history.', 'Thánh địa Mỹ Sơn uy nghiêm lưu giữ dấu tích vàng son của nền văn minh Chăm-pa cổ.', 'Wildlife sanctuary', 'Nơi trú ẩn linh thiêng.'),
    ('Restoration', '/ˌrestəˈreɪʃn/', 'noun', 'Công tác trùng tu tôn tạo di tích', 'Careful historical monument restoration.', 'Công tác trùng tu tôn tạo di tích lịch sử một cách khoa học, cẩn trọng giữ đúng nét xưa.', 'Monument restoration', 'Phục dựng di sản.')
])

# Unit 6: Vietnam: Then and Now
add('unit-g9-u6', 'Việt Nam: Xưa và Nay & Đổi mới', [
    ('Modernization', '/ˌmɒdnaɪˈzeɪʃn/', 'noun', 'Quá trình hiện đại hóa đất nước', 'National modernization and industrialization.', 'Sự nghiệp công nghiệp hóa và hiện đại hóa đất nước đưa Việt Nam vươn tầm thế giới.', 'Country modernization', 'Hiện đại hóa.'),
    ('Doi Moi', '/dɔɪ mɔɪ/', 'noun', 'Công cuộc Đổi Mới lịch sử năm 1986', 'Doi Moi reforms boosted the economy.', 'Công cuộc Đổi Mới lịch sử năm 1986 đã mở ra kỷ nguyên phát triển kinh tế rực rỡ.', 'Doi Moi policy', 'Chính sách đổi mới.'),
    ('Tram', '/træm/', 'noun', 'Tiếng leng keng tàu điện Hà Nội xưa', 'Clanging sound of historic Hanoi trams.', 'Tiếng chuông leng keng quen thuộc của những chuyến tàu điện Hà Nội xưa trên phố cổ.', 'Clanging tram', 'Tàu điện mặt đất.'),
    ('Skyscraper', '/ˈskaɪskreɪpər/', 'noun', 'Những tòa tháp chọc trời mọc lên', 'Landmark 81 is a soaring skyscraper.', 'Tòa tháp Landmark 81 vút cao kiêu hãnh khẳng định tầm vóc kiến trúc Việt Nam.', 'Iconic skyscraper', 'Nhà chọc trời.'),
    ('Flyover', '/ˈflaɪəʊvər/', 'noun', 'Cầu vượt cạn giải tỏa tắc đường', 'Modern urban traffic flyovers reduce jams.', 'Hệ thống cầu vượt cạn hiện đại giúp xóa tan các điểm nghẽn giao thông đô thị lớn.', 'Traffic flyover', 'Cầu vượt thép.'),
    ('Tunnel', '/ˈtʌnl/', 'noun', 'Hầm đường bộ xuyên qua đèo núi', 'Hai Van tunnel shortens travel time.', 'Hầm đường bộ đèo Hải Vân kỳ tích rút ngắn thời gian và đảm bảo an toàn vượt đèo.', 'Road tunnel', 'Hầm xuyên núi.'),
    ('Underpass', '/ˈʌndəpɑːs/', 'noun', 'Hầm chui ngã tư hiện đại', 'Drive smoothly through urban underpass.', 'Xe cộ lưu thông thông suốt và an toàn qua hầm chui ngã tư hiện đại của thủ đô.', 'Urban underpass', 'Lối đi ngầm.'),
    ('Elevated railway', '/ˈelɪveɪtɪd ˈreɪlweɪ/', 'noun', 'Tuyến đường sắt trên cao metro', 'Cat Linh elevated railway carries passengers.', 'Tuyến đường sắt trên cao Cát Linh - Hà Đông vận chuyển hàng triệu lượt khách mỗi tháng.', 'Metro railway', 'Đường sắt trên cao.'),
    ('Prosperous', '/ˈprɒspərəs/', 'adjective', 'Phồn vinh, thịnh vượng ấm no', 'Building a peaceful and prosperous nation.', 'Chung tay xây dựng một đất nước Việt Nam hòa bình, phồn vinh và nhân dân ấm no.', 'Prosperous society', 'Giàu mạnh phồn thịnh.'),
    ('Poverty', '/ˈpɒvəti/', 'noun', 'Nạn nghèo đói lạc hậu xưa kia', 'Eradicate extreme poverty in rural areas.', 'Xóa bỏ căn bản nạn nghèo đói và thiếu thốn lạc hậu tại các vùng sâu vùng xa biên giới.', 'Poverty reduction', 'Xóa đói giảm nghèo.'),
    ('Living standard', '/ˈlɪvɪŋ ˈstændəd/', 'noun', 'Mức sống, chất lượng sống của dân', 'Significant rise in living standards.', 'Sự nâng cao rõ rệt và vượt bậc trong mức sống và điều kiện sinh hoạt của nhân dân.', 'Improve living standards', 'Đời sống nâng cao.'),
    ('Export', '/ɪkˈspɔːt/', 'verb / noun', 'Xuất khẩu hàng hóa ra thế giới', 'Vietnam exports rice and high-tech gadgets.', 'Việt Nam tự hào là quốc gia xuất khẩu hàng đầu thế giới về gạo, cà phê và linh kiện.', 'Rice export', 'Hàng xuất khẩu.')
], [
    ('Transformation', '/ˌtrænsfəˈmeɪʃn/', 'noun', 'Sự chuyển mình biến đổi thần kỳ', 'Remarkable socio-economic transformation.', 'Sự chuyển mình biến đổi kinh tế - xã hội thần kỳ khiến bạn bè quốc tế ngỡ ngàng nể phục.', 'Economic transformation', 'Thay da đổi thịt.'),
    ('Industrialization', '/ɪnˌdʌstriəlaɪˈzeɪʃn/', 'noun', 'Sự nghiệp công nghiệp hóa toàn diện', 'Accelerate nationwide industrialization.', 'Đẩy nhanh tốc độ công nghiệp hóa toàn diện kết hợp bảo vệ môi trường sinh thái.', 'Rapid industrialization', 'Công nghiệp hóa.'),
    ('Prosperity', '/prɒˈsperəti/', 'noun', 'Sự phồn thịnh, hưng thịnh vững bền', 'Strive for lasting national prosperity.', 'Phấn đấu vì sự hưng thịnh và vị thế vững bền trường tồn của non sông đất Việt.', 'National prosperity', 'Sự giàu có thịnh vượng.'),
    ('Global integration', '/ˌɡləʊbl ˌɪntɪˈɡreɪʃn/', 'noun', 'Hội nhập quốc tế sâu rộng', 'Active dynamic global integration.', 'Chủ động và tích cực hội nhập quốc tế sâu rộng, là bạn và đối tác tin cậy của năm châu.', 'Deep integration', 'Hòa nhập thế giới.'),
    ('Milestone', '/ˈmaɪlstəʊn/', 'noun', 'Cột mốc lịch sử chói lọi', 'Reaching great historical development milestones.', 'Chinh phục những cột mốc phát triển lịch sử chói lọi trên con đường dựng xây tổ quốc.', 'Historic milestone', 'Dấu mốc lớn.'),
    ('Infrastructure', '/ˈɪnfrəstrʌktʃər/', 'noun', 'Hạ tầng cao tốc Bắc Nam đồng bộ', 'North-South expressway infrastructure.', 'Mạng lưới đường cao tốc Bắc Nam hiện đại kết nối thông suốt mọi miền đất nước.', 'National infrastructure', 'Hạ tầng giao thông.'),
    ('Per capita income', '/pɜː ˈkæpɪtə ˈɪnkʌm/', 'noun', 'Thu nhập bình quân đầu người', 'Continuous growth in per capita income.', 'Sự tăng trưởng liên tục và vững chắc của chỉ số thu nhập bình quân đầu người.', 'High per capita', 'GDP bình quân.'),
    ('Self-reliant', '/ˌself rɪˈlaɪənt/', 'adjective', 'Tự lực tự cường, độc lập vững vàng', 'A self-reliant resilient national economy.', 'Một nền kinh tế quốc gia độc lập, tự chủ, tự lực tự cường và chống chịu tốt trước bão táp.', 'Self-reliant economy', 'Tự đứng trên chân mình.')
])

# Unit 7: Recipes and Eating Habits
add('unit-g9-u7', 'Nghệ thuật ẩm thực & Nấu nướng chuẩn vị', [
    ('Ingredient', '/ɪnˈɡriːdiənt/', 'noun', 'Nguyên liệu thực phẩm tươi sạch', 'Wholesome fresh organic ingredients.', 'Lựa chọn những nguyên liệu thực phẩm hữu cơ tươi sạch và lành mạnh cho sức khỏe.', 'Key ingredient', 'Thành phần món ăn.'),
    ('Recipe', '/ˈresəpi/', 'noun', 'Công thức gia truyền chuẩn vị', 'Follow a traditional spring roll recipe.', 'Nấu ăn chuẩn xác theo công thức gia truyền làm nem rán giòn rụm của người Hà Nội.', 'Authentic recipe', 'Công thức chế biến.'),
    ('Marinate', '/ˈmærɪneɪt/', 'verb', 'Tẩm ướp gia vị đậm đà ngấm đều', 'Marinate pork ribs with honey and garlic.', 'Tẩm ướp sườn non với mật ong và tỏi băm để ngấm đều gia vị trước khi nướng vàng.', 'Marinate meat', 'Ướp gia vị.'),
    ('Simmer', '/ˈsɪmər/', 'verb', 'Ninh nhỏ lửa liu riu nhiều giờ', 'Simmer broth gently on low heat.', 'Ninh nước dùng phở liu riu trên lửa nhỏ nhiều giờ liền để chắt lọc vị ngọt thanh.', 'Simmer gently', 'Đun lửa liu riu.'),
    ('Stir-fry', '/ˈstɜː fraɪ/', 'verb', 'Xào nhanh lửa to giòn ngọt', 'Stir-fry fresh vegetables with garlic.', 'Xào nhanh rau muống với tỏi đập dập trên lửa lớn để cọng rau giữ được màu xanh giòn.', 'Stir-fry in wok', 'Xào lăn đảo nhanh.'),
    ('Garnish', '/ˈɡɑːnɪʃ/', 'verb / noun', 'Trang trí điểm xuyết món ăn đẹp mắt', 'Garnish the plate with carved chili flowers.', 'Trang trí đĩa ăn đẹp mắt bằng những bông hoa ớt và nhánh rau mùi tỉa khéo léo.', 'Garnish with herbs', 'Bày biện đẹp mắt.'),
    ('Deep-fry', '/ˌdiːp ˈfraɪ/', 'verb', 'Chiên rán ngập dầu giòn tan', 'Deep-fry spring rolls until golden brown.', 'Chiên ngập dầu nem cuốn cho tới khi lớp vỏ bánh ram chuyển màu vàng ruộm giòn tan.', 'Deep-fry in oil', 'Rán ngập mỡ.'),
    ('Steam', '/stiːm/', 'verb', 'Hấp cách thủy giữ trọn dinh dưỡng', 'Steam sea fish with ginger and spring onions.', 'Hấp cách thủy cá mú với gừng tươi và hành lá để giữ trọn vẹn vị ngọt thanh của cá.', 'Steam food', 'Nấu bằng hơi nước.'),
    ('Bake', '/beɪk/', 'verb', 'Nướng bánh bằng lò nướng', 'Bake fragrant crusty French baguettes.', 'Nướng những chiếc bánh mì giòn rụm thơm lừng mùi bơ sữa trong lò nướng bánh.', 'Bake bread', 'Nướng lò vi sóng/lò nướng.'),
    ('Grill', '/ɡrɪl/', 'verb', 'Nướng vỉ than hoa thơm nức mũi', 'Grill pork patties over glowing charcoal.', 'Nướng chả thịt trên vỉ than hoa đỏ rực tỏa mùi thơm nức mũi cả góc phố nhỏ.', 'Grill over charcoal', 'Nướng vỉ than.'),
    ('Nutrition', '/njuːˈtrɪʃn/', 'noun', 'Giá trị dinh dưỡng của bữa ăn', 'Balanced nutrition supports teenage growth.', 'Một bữa ăn cân bằng dinh dưỡng giúp thanh thiếu niên phát triển chiều cao và trí tuệ.', 'Rich in nutrition', 'Dưỡng chất cơ thể.'),
    ('Eating habit', '/ˈiːtɪŋ ˈhæbɪt/', 'noun', 'Thói quen ăn uống lành mạnh', 'Form healthy eating habits early in life.', 'Hình thành thói quen ăn uống lành mạnh, ăn đúng bữa nhiều rau xanh từ sớm.', 'Healthy eating habits', 'Văn hóa ẩm thực.')
], [
    ('Culinary', '/ˈkʌlɪnəri/', 'adjective', 'Thuộc về nghệ thuật ẩm thực', 'Vietnamese rich culinary heritage.', 'Di sản ẩm thực tinh tế, phong phú và đậm đà bản sắc của dân tộc Việt Nam.', 'Culinary art', 'Nghệ thuật bếp núc.'),
    ('Nutritious', '/njuːˈtrɪʃəs/', 'adjective', 'Giàu chất dinh dưỡng bổ dưỡng', 'Nutritious herbal chicken soup.', 'Bát canh gà hầm thuốc bắc bổ dưỡng giúp phục hồi sức khỏe nhanh chóng sau khi ốm.', 'Nutritious diet', 'Nhiều chất bổ.'),
    ('Gastronomy', '/ɡæˈstrɒnəmi/', 'noun', 'Văn hóa ẩm thực tinh hoa', 'Hanoi is a world capital of gastronomy.', 'Hà Nội được thế giới tôn vinh là một trong những cái nôi tinh hoa ẩm thực đường phố.', 'World gastronomy', 'Nghệ thuật ẩm thực cao cấp.'),
    ('Wholesome', '/ˈhəʊlsəm/', 'adjective', 'Lành mạnh, tốt lành cho cơ thể', 'Enjoy wholesome home-cooked family meals.', 'Tận hưởng những bữa cơm gia đình tự nấu lành mạnh, đượm tình thân và an toàn thực phẩm.', 'Wholesome food', 'Sạch sẽ bổ ích.'),
    ('Delectable', '/dɪˈlektəbl/', 'adjective', 'Ngon tuyệt đỉnh mê ly vị giác', 'A delectable array of street food delicacies.', 'Một thực đơn mê ly với vô vàn món ngon đường phố hấp dẫn làm say lòng du khách.', 'Delectable dessert', 'Ngon ngất ngây.'),
    ('Seasoning', '/ˈsiːznɪŋ/', 'noun', 'Gia vị nêm nếm đậm đà', 'Fish sauce is the quintessential seasoning.', 'Nước mắm cá cơm truyền thống là linh hồn gia vị cốt lõi trong mọi mâm cơm Việt.', 'Natural seasoning', 'Nước mắm, hạt tiêu.'),
    ('Digestive', '/daɪˈdʒestɪv/', 'adjective', 'Thuộc về hệ tiêu hóa đường ruột', 'Probiotics maintain sound digestive health.', 'Các lợi khuẩn tự nhiên giúp duy trì một hệ tiêu hóa khỏe mạnh và hấp thu dưỡng chất.', 'Digestive system', 'Đường ruột tiêu hóa.'),
    ('Portion', '/ˈpɔːʃn/', 'noun', 'Khẩu phần ăn hợp lý vừa đủ', 'Control healthy meal portion sizes.', 'Kiểm soát khẩu phần ăn mỗi bữa ở mức vừa đủ để tránh tích tụ mỡ thừa và béo phì.', 'Moderate portion', 'Định lượng ăn uống.')
])

# Unit 8: Tourism & Responsible Travel
add('unit-g9-u8', 'Du lịch trách nhiệm & Khám phá xanh', [
    ('Ecotourism', '/ˈiːkəʊtʊərɪzəm/', 'noun', 'Du lịch sinh thái bền vững', 'Promote eco-tourism in national parks.', 'Khuyến khích và phát triển du lịch sinh thái bền vững tại các vườn quốc gia xanh tươi.', 'Green ecotourism', 'Du lịch không hại môi trường.'),
    ('Destination', '/ˌdestɪˈneɪʃn/', 'noun', 'Điểm đến du lịch hấp dẫn', 'Vietnam is a top Asian travel destination.', 'Việt Nam là một điểm đến du lịch hàng đầu châu Á thu hút hàng triệu du khách quốc tế.', 'Popular destination', 'Điểm dừng chân du lịch.'),
    ('Itinerary', '/aɪˈtɪnərəri/', 'noun', 'Lịch trình chuyến đi chi tiết', 'Plan a flexible travel itinerary.', 'Lên kế hoạch một lịch trình tham quan chi tiết, linh hoạt và tối ưu hóa thời gian.', 'Detailed itinerary', 'Lịch trình tour.'),
    ('Package holiday', '/ˈpækɪdʒ ˈhɒlədeɪ/', 'noun', 'Kỳ nghỉ trọn gói dịch vụ tour', 'Book an all-inclusive package holiday tour.', 'Đặt một chuyến du lịch trọn gói gồm vé máy bay, khách sạn và hướng dẫn viên tận tình.', 'Book package holiday', 'Tour trọn gói.'),
    ('Homestay', '/ˈhəʊmsteɪ/', 'noun', 'Trải nghiệm ở nhà dân bản địa', 'Experience local culture through homestays.', 'Trải nghiệm đời sống văn hóa chân thực khi cùng ăn cùng ở tại các homestay nhà sàn vùng cao.', 'Highland homestay', 'Ở cùng người bản địa.'),
    ('Souvenir', '/ˌsuːvəˈnɪər/', 'noun', 'Món quà lưu niệm ý nghĩa', 'Buy handmade brocade souvenirs.', 'Mua những món quà lưu niệm bằng thổ cẩm dệt tay để ủng hộ kinh tế bà con địa phương.', 'Buy souvenir', 'Quà kỷ niệm chuyến đi.'),
    ('Hospitality', '/ˌhɒspɪˈtæləti/', 'noun', 'Sự mến khách và ngành du lịch khách sạn', 'Renowned for warm Vietnamese hospitality.', 'Nổi tiếng thế giới với lòng mến khách nồng hậu, sự thân thiện và nụ cười rạng rỡ của người Việt.', 'Warm hospitality', 'Đón tiếp ân cần.'),
    ('Mass tourism', '/mæs ˈtʊərɪzəm/', 'noun', 'Du lịch đại trà gây quá tải', 'Negative environmental impacts of mass tourism.', 'Những hệ lụy tiêu cực về môi trường và quá tải hạ tầng do du lịch đại trà thiếu kiểm soát.', 'Impact of mass tourism', 'Du lịch ồ ạt.'),
    ('Responsible tourism', '/rɪˈspɒnsəbl ˈtʊərɪzəm/', 'noun', 'Du lịch có trách nhiệm với cộng đồng', 'Practice ethical and responsible tourism.', 'Thực hành du lịch có trách nhiệm: không xả rác bừa bãi và tôn trọng phong tục bản địa.', 'Responsible travel', 'Bảo vệ điểm đến.'),
    ('Sightseeing', '/ˈsaɪtsiːɪŋ/', 'noun', 'Chuyến đi ngắm cảnh thưởng ngoạn', 'Go sightseeing around the historic city.', 'Đi ngắm cảnh thưởng ngoạn quanh các danh lam thắng cảnh cổ kính của thành phố.', 'Go sightseeing', 'Thăm thú ngắm cảnh.'),
    ('Breathtaking', '/ˈbreθteɪkɪŋ/', 'adjective', 'Đẹp ngỡ ngàng nín thở cảnh sắc', 'Breathtaking coastal roads of Pass.', 'Cung đường đèo ven biển đẹp ngỡ ngàng nín thở với một bên là vách núi một bên là sóng biếc.', 'Breathtaking landscape', 'Cảnh sắc mê hồn.'),
    ('Explore', '/ɪkˈsplɔːr/', 'verb', 'Thám hiểm và khám phá miền đất mới', 'Explore mysterious uncharted sea caves.', 'Thám hiểm những hang động biển huyền bí và kỳ thú bằng thuyền kayak bơi chèo.', 'Explore new lands', 'Mở rộng chân trời.')
], [
    ('Sustainable', '/səˈsteɪnəbl/', 'adjective', 'Bền vững, tôn trọng tự nhiên', 'Sustainable community-based tourism.', 'Phát triển mô hình du lịch cộng đồng bền vững đem lại sinh kế ấm no cho người dân quê.', 'Sustainable tourism', 'Không hủy hoại môi sinh.'),
    ('Pristine', '/ˈprɪstiːn/', 'adjective', 'Hoang sơ nguyên thủy tuyệt đối', 'Keep pristine beaches free of plastic trash.', 'Giữ gìn những bãi biển hoang sơ nguyên thủy sạch bóng không một cọng rác thải nhựa.', 'Pristine beach', 'Trong lành nguyên vẹn.'),
    ('Overcrowding', '/ˌəʊvəˈkraʊdɪŋ/', 'noun', 'Sự quá tải du khách mùa cao điểm', 'Overcrowding degrades historical heritage sites.', 'Tình trạng quá tải du khách vào mùa cao điểm làm xuống cấp các di tích lịch sử quý giá.', 'Avoid overcrowding', 'Đông đúc quá tải.'),
    ('Local economy', '/ˈləʊkl ɪˈkɒnəmi/', 'noun', 'Kinh tế địa phương bản địa', 'Support local economy by buying crafts.', 'Ủng hộ sự phát triển của kinh tế địa phương bằng việc mua sắm nông sản và đồ thủ công.', 'Boost local economy', 'Kinh tế bản xứ.'),
    ('Cultural heritage', '/ˈkʌltʃərəl ˈherɪtɪdʒ/', 'noun', 'Di sản văn hóa của dân tộc', 'Respect local sacred cultural heritage.', 'Luôn tôn trọng và ứng xử văn minh trước các di sản văn hóa tâm linh thiêng liêng của địa phương.', 'Preserve heritage', 'Bảo tồn văn hóa.'),
    ('Eco-conscious', '/ˈiːkəʊ ˈkɒnʃəs/', 'adjective', 'Có ý thức sâu sắc về môi trường', 'Eco-conscious travelers leave zero litter.', 'Những người du lịch có ý thức môi trường luôn mang theo bình nước và không xả rác.', 'Eco-conscious traveler', 'Du khách văn minh.'),
    ('Expedition', '/ˌekspəˈdɪʃn/', 'noun', 'Chuyến thám hiểm khoa học kỳ thú', 'A cave exploration research expedition.', 'Một chuyến thám hiểm khoa học nghiên cứu hệ thống thạch nhũ trong lòng hang Sơn Đoòng.', 'Scientific expedition', 'Hành trình thám hiểm.'),
    ('Authentic', '/ɔːˈθentɪk/', 'adjective', 'Chân thực, nguyên bản và sống động', 'Seek authentic cultural experiences.', 'Tìm kiếm những trải nghiệm văn hóa chân thực, mộc mạc và nguyên bản nhất tại bản làng.', 'Authentic experience', 'Không giả tạo.')
])

# Unit 9: English in the World
add('unit-g9-u9', 'Tiếng Anh toàn cầu & Hội nhập quốc tế', [
    ('Global language', '/ˈɡləʊbl ˈlæŋɡwɪdʒ/', 'noun', 'Ngôn ngữ toàn cầu của nhân loại', 'English is the preeminent global language.', 'Tiếng Anh là ngôn ngữ toàn cầu thống trị trong thương mại, khoa học và ngoại giao quốc tế.', 'World language', 'Tiếng nói chung quốc tế.'),
    ('Native speaker', '/ˈneɪtɪv ˈspiːkər/', 'noun', 'Người bản xứ nói tiếng mẹ đẻ', 'Practice listening to native speakers.', 'Luyện kỹ năng nghe các đoạn hội thoại thực tế của người bản xứ Anh, Mỹ và Úc.', 'Talk to native speaker', 'Người bản ngữ.'),
    ('Second language', '/ˌsekənd ˈlæŋɡwɪdʒ/', 'noun', 'Ngôn ngữ thứ hai chính thức', 'English as an official second language.', 'Tiếng Anh được sử dụng như một ngôn ngữ thứ hai chính thức tại nhiều quốc gia châu Á.', 'Official language', 'Ngôn ngữ thứ hai.'),
    ('Bilingual', '/ˌbaɪˈlɪŋɡwəl/', 'adjective / noun', 'Song ngữ, thông thạo hai thứ tiếng', 'Bilingual education expands young minds.', 'Chương trình giáo dục song ngữ giúp trẻ phát triển tư duy não bộ và phản xạ linh hoạt.', 'Bilingual speaker', 'Nói hai thứ tiếng.'),
    ('Fluency', '/ˈfluːənsi/', 'noun', 'Sự lưu loát trôi chảy trong giao tiếp', 'Aim for natural communicative fluency.', 'Hướng tới sự lưu loát trôi chảy tự nhiên và diễn đạt mạch lạc khi trò chuyện tiếng Anh.', 'Speaking fluency', 'Không vấp váp.'),
    ('Accuracy', '/ˈækjərəsi/', 'noun', 'Sự chuẩn xác về ngữ pháp từ vựng', 'Balance speaking fluency with grammar accuracy.', 'Kết hợp hài hòa giữa độ lưu loát khi nói và sự chuẩn xác về mặt cấu trúc ngữ pháp.', 'Grammatical accuracy', 'Đúng ngữ pháp chính tả.'),
    ('Pronunciation', '/prəˌnʌnsiˈeɪʃn/', 'noun', 'Cách phát âm ngữ âm chuẩn quốc tế', 'Master standard phonetic pronunciation.', 'Làm chủ cách phát âm chuẩn theo bảng phiên âm ngữ âm quốc tế IPA không bị lẫn lộn.', 'Standard pronunciation', 'Phát âm chuẩn.'),
    ('Intonation', '/ˌɪntəˈneɪʃn/', 'noun', 'Ngữ điệu lên xuống của câu nói', 'Express emotion through sentence intonation.', 'Thể hiện cảm xúc và thái độ tinh tế qua ngữ điệu lên xuống tự nhiên của từng câu nói.', 'Sentence intonation', 'Ngữ điệu giọng nói.'),
    ('Dialect', '/ˈdaɪəlekt/', 'noun', 'Tiếng địa phương, phương ngữ vùng miền', 'Regional accents and diverse dialects.', 'Sự đa dạng phong phú của các chất giọng và phương ngữ tiếng Anh ở từng vùng miền.', 'Regional dialect', 'Thổ ngữ vùng.'),
    ('Vocabulary', '/vəˈkæbjələri/', 'noun', 'Vốn từ vựng phong phú sâu rộng', 'Enrich academic vocabulary for higher tests.', 'Tích cực mở rộng và làm giàu thêm vốn từ vựng học thuật cho các kỳ thi chuẩn hóa.', 'Vast vocabulary', 'Kho từ vựng.'),
    ('Idiom', '/ˈɪdiəm/', 'noun', 'Thành ngữ đặc sắc của ngôn ngữ', 'Learn common conversational English idioms.', 'Học và vận dụng khéo léo các thành ngữ tiếng Anh thông dụng trong giao tiếp hàng ngày.', 'Common idiom', 'Thành ngữ ví von.'),
    ('Translate', '/trænsˈleɪt/', 'verb', 'Dịch thuật giữa các thứ tiếng', 'Translate complex passages accurately.', 'Dịch thuật chuẩn xác từng câu chữ của các đoạn văn học thuật từ tiếng Anh sang tiếng Việt.', 'Translate into', 'Chuyển ngữ.')
], [
    ('Proficiency', '/prəˈfɪʃnsi/', 'noun', 'Sự thành thạo, tinh thông ngôn ngữ', 'Achieve high English language proficiency.', 'Đạt tới mức độ thành thạo và tinh thông tiếng Anh xuất sắc để hội nhập quốc tế.', 'Language proficiency', 'Trình độ lão luyện.'),
    ('Multilingual', '/ˌmʌltiˈlɪŋɡwəl/', 'adjective', 'Đa ngữ, nói được nhiều thứ tiếng', 'Multilingual individuals have cognitive agility.', 'Những người biết đa ngữ nói được nhiều thứ tiếng có khả năng tư duy nhạy bén vượt trội.', 'Multilingual person', 'Biết nhiều ngoại ngữ.'),
    ('Nuance', '/ˈnjuːɑːns/', 'noun', 'Sắc thái nghĩa tinh tế của từ ngữ', 'Grasp subtle semantic nuances in context.', 'Cảm nhận và nắm bắt được những sắc thái nghĩa tinh tế của từng từ trong ngữ cảnh cụ thể.', 'Subtle nuance', 'Sắc thái tinh vi.'),
    ('Colloquial', '/kəˈləʊkwiəl/', 'adjective', 'Văn phong khẩu ngữ đời thường', 'Understand colloquial slang in movies.', 'Hiểu rõ các từ lóng và cách diễn đạt theo văn phong khẩu ngữ đời thường trong phim ảnh.', 'Colloquial language', 'Khẩu ngữ dân dã.'),
    ('Lingua franca', '/ˌlɪŋɡwə ˈfræŋkə/', 'noun', 'Ngôn ngữ giao tiếp chung toàn cầu', 'English serves as the worlds lingua franca.', 'Tiếng Anh đóng vai trò là ngôn ngữ giao tiếp chung trên toàn cầu kết nối nhân loại.', 'Global lingua franca', 'Cầu nối ngôn ngữ.'),
    ('Articulate', '/ɑːˈtɪkjuleɪt/', 'adjective / verb', 'Diễn đạt khúc chiết gãy gọn rõ ràng', 'An articulate and convincing public speaker.', 'Một diễn giả thuyết trình trước công chúng với khả năng diễn đạt khúc chiết và gãy gọn.', 'Highly articulate', 'Lưu loát mạch lạc.'),
    ('Mastery', '/ˈmɑːstəri/', 'noun', 'Sự làm chủ hoàn toàn ngoại ngữ', 'Lifelong journey towards language mastery.', 'Hành trình học hỏi không ngừng suốt cả cuộc đời để làm chủ hoàn toàn một ngoại ngữ mới.', 'Mastery of English', 'Làm chủ triệt để.'),
    ('Immersion', '/ɪˈmɜːʃn/', 'noun', 'Phương pháp đắm chìm trong ngôn ngữ', 'Language immersion speeds up learning.', 'Phương pháp học tập đắm chìm hoàn toàn trong môi trường tiếng Anh giúp tiến bộ vượt bậc.', 'Total immersion', 'Tắm trong ngôn ngữ.')
])

# Unit 10: Space Exploration
add('unit-g9-u10', 'Thám hiểm vũ trụ & Chinh phục không gian', [
    ('Astronaut', '/ˈæstrənɔːt/', 'noun', 'Phi hành gia bay vào vũ trụ', 'Pham Tuan was the first Vietnamese astronaut.', 'Anh hùng Phạm Tuân là phi hành gia đầu tiên của Việt Nam và châu Á bay vào vũ trụ.', 'Brave astronaut', 'Nhà du hành vũ trụ.'),
    ('Spacecraft', '/ˈspeɪskrɑːft/', 'noun', 'Tàu vũ trụ hiện đại thám hiểm', 'Launch uncrewed spacecraft to explore Mars.', 'Phóng những con tàu vũ trụ không người lái tối tân để thăm dò bề mặt sao Hỏa.', 'Manned spacecraft', 'Phi thuyền không gian.'),
    ('Orbit', '/ˈɔːbɪt/', 'noun / verb', 'Quỹ đạo bay quanh thiên thể', 'Satellites orbit high above the Earth.', 'Những vệ tinh nhân tạo quay đều quanh quỹ đạo của trái đất để truyền tín hiệu internet.', 'In orbit around', 'Đường bay vệ tinh.'),
    ('Telescope', '/ˈtelɪskəʊp/', 'noun', 'Kính thiên văn quang học nhìn xa', 'Observe distant galaxies with James Webb telescope.', 'Quan sát những thiên hà xa xôi hàng tỷ năm ánh sáng bằng kính thiên văn James Webb.', 'Space telescope', 'Kính viễn vọng.'),
    ('Solar system', '/ˈsəʊlə ˈsɪstəm/', 'noun', 'Hệ Mặt Trời của chúng ta', 'Eight orbiting planets in our solar system.', 'Tám hành tinh quay quanh mặt trời trong hệ Mặt Trời bao la của chúng ta.', 'Our solar system', 'Thái dương hệ.'),
    ('Planet', '/ˈplænɪt/', 'noun', 'Hành tinh trong vũ trụ', 'Mars is known as the Red Planet.', 'Sao Hỏa được mệnh danh là Hành tinh Đỏ kỳ bí đang được con người thăm dò.', 'Terrestrial planet', 'Thiên thể quay quanh sao.'),
    ('Satellite', '/ˈsætəlaɪt/', 'noun', 'Vệ tinh nhân tạo viễn thông', 'Weather satellites transmit storm photos.', 'Những vệ tinh khí tượng nhân tạo truyền tải hình ảnh các cơn bão trực tiếp về mặt đất.', 'Artificial satellite', 'Vệ tinh bay.'),
    ('Gravity', '/ˈɡrævəti/', 'noun', 'Trọng lực, lực hút của trái đất', 'Zero gravity inside orbital space station.', 'Trạng thái không trọng lực lơ lửng bồng bềnh bên trong trạm vũ trụ không gian.', 'Zero gravity', 'Lực hấp dẫn.'),
    ('Space station', '/speɪs ˈsteɪʃn/', 'noun', 'Trạm vũ trụ quốc tế (ISS)', 'Scientists live on International Space Station.', 'Các nhà khoa học quốc tế cùng chung sống và nghiên cứu trên Trạm Vũ trụ Quốc tế ISS.', 'Orbital space station', 'Trạm quỹ đạo.'),
    ('Meteorite', '/ˈmiːtiəraɪt/', 'noun', 'Mảnh thiên thạch từ vũ trụ', 'A blazing meteorite burned up in atmosphere.', 'Một mảnh thiên thạch rực lửa bốc cháy tan biến khi lao qua bầu khí quyển bảo vệ trái đất.', 'Falling meteorite', 'Đá trời thiên thạch.'),
    ('Spacewalk', '/ˈspeɪswɔːk/', 'noun', 'Chuyến đi bộ ngoài không gian', 'Perform dangerous maintenance during spacewalk.', 'Thực hiện việc sửa chữa tấm pin mặt trời trong chuyến đi bộ nguy hiểm ngoài khoảng không.', 'Conduct spacewalk', 'Bước ra vũ trụ.'),
    ('Launch', '/lɔːntʃ/', 'verb / noun', 'Phóng tên lửa đẩy lên trời', 'Launch heavy rocket into deep outer space.', 'Phóng tên lửa đẩy khổng lồ mang theo tàu thăm dò vào sâu thẳm trong không gian vũ trụ.', 'Rocket launch', 'Rời bệ phóng.')
], [
    ('Weightlessness', '/ˈweɪtləsnəs/', 'noun', 'Tình trạng không trọng lượng lơ lửng', 'Experience floating weightlessness in orbit.', 'Trải nghiệm cảm giác lơ lửng không trọng lượng bồng bềnh kỳ thú khi bay quanh quỹ đạo.', 'State of weightlessness', 'Không sức nặng.'),
    ('Extraterrestrial', '/ˌekstrətəˈrestriəl/', 'adjective', 'Thuộc về người ngoài hành tinh', 'Search for signs of extraterrestrial life.', 'Nỗ lực tìm kiếm những dấu hiệu của sự sống ngoài trái đất tại các hành tinh xa xôi.', 'Extraterrestrial intelligence', 'Ngoài địa cầu.'),
    ('Milky Way', '/ˌmɪlki ˈweɪ/', 'noun', 'Dải Ngân Hà rực sáng bầu trời', 'Billions of glowing stars in the Milky Way.', 'Hàng trăm tỷ ngôi sao lấp lánh rực rỡ trong dải Ngân Hà bao la trên bầu trời đêm hè.', 'Our Milky Way galaxy', 'Sông Ngân Hà.'),
    ('Habitable', '/ˈhæbɪtəbl/', 'adjective', 'Có thể sinh sống và tồn tại được', 'Discover potentially habitable exoplanets.', 'Phát hiện những hành tinh ngoài hệ mặt trời có khí quyển và nước có thể sinh sống được.', 'Habitable zone', 'Thích hợp cho sự sống.'),
    ('Cosmic', '/ˈkɒzmɪk/', 'adjective', 'Thuộc về vũ trụ bao la huyền bí', 'Shield astronauts from harmful cosmic radiation.', 'Bảo vệ các phi hành gia khỏi các tia bức xạ vũ trụ độc hại ngoài không gian sâu.', 'Cosmic radiation', 'Bao la vũ trụ.'),
    ('Interplanetary', '/ˌɪntəˈplænɪtri/', 'adjective', 'Liên hành tinh giữa các sao', 'Ambitious future interplanetary travel missions.', 'Những sứ mệnh thám hiểm không gian liên hành tinh đầy tham vọng của nhân loại mai sau.', 'Interplanetary travel', 'Giữa các hành tinh.'),
    ('Colonization', '/ˌkɒlənaɪˈzeɪʃn/', 'noun', 'Sự di dân xây dựng thuộc địa', 'Plans for permanent Moon colonization.', 'Những dự án táo bạo xây dựng thuộc địa và căn cứ nghiên cứu vĩnh viễn trên Mặt Trăng.', 'Space colonization', 'Định cư vũ trụ.'),
    ('Black hole', '/blæk həʊl/', 'noun', 'Hố đen vũ trụ hút mọi vật chất', 'Mysterious gravitational pull of black holes.', 'Lực hút hấp dẫn kinh hoàng của những hố đen vũ trụ nuốt chửng mọi ánh sáng và vật chất.', 'Supermassive black hole', 'Lỗ đen không đáy.')
])

print("vocab_grade9.py loaded with 10 units")
