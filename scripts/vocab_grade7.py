# -*- coding: utf-8 -*-
# Grade 7 Vocabulary: 10 units, 20-22 words each
G7_UNITS = {}

def add(uid, topic, core, adv):
    res = []
    for i, t in enumerate(core, 1):
        res.append({
            "id": f"{uid}-w{i}", "word": t[0], "ipa": t[1], "partOfSpeech": t[2],
            "meaningVi": t[3], "exampleEn": t[4], "exampleVi": t[5],
            "isCore": True, "unitId": uid, "grade": 7, "topic": topic,
            "collocation": t[6], "examNote": t[7]
        })
    start = len(core) + 1
    for i, t in enumerate(adv, start):
        res.append({
            "id": f"{uid}-w{i}", "word": t[0], "ipa": t[1], "partOfSpeech": t[2],
            "meaningVi": t[3], "exampleEn": t[4], "exampleVi": t[5],
            "isCore": False, "unitId": uid, "grade": 7, "topic": topic,
            "collocation": t[6], "examNote": t[7]
        })
    G7_UNITS[uid] = res

# Unit 1: Hobbies
add('unit-g7-u1', 'Sở thích & Niềm đam mê sáng tạo', [
    ('Pottery', '/ˈpɒtəri/', 'noun', 'Nghề làm đồ gốm thủ công', 'Take up making pottery.', 'Bắt đầu theo đuổi sở thích nặn gốm thủ công tại Bát Tràng.', 'Make pottery', 'Nghệ thuật gốm sứ.'),
    ('Carving wood', '/ˈkɑːvɪŋ wʊd/', 'phrase', 'Nghệ thuật điêu khắc gỗ', 'Wood carving requires immense patience.', 'Nghệ thuật điêu khắc gỗ đòi hỏi lòng kiên nhẫn bền bỉ.', 'Carve wood', 'Tạc tượng chạm gỗ.'),
    ('Arranging flowers', '/əˈreɪndʒɪŋ ˈflaʊəz/', 'phrase', 'Nghệ thuật cắm hoa tao nhã', 'Flower arranging is an art.', 'Cắm hoa nghệ thuật là một thú chơi tao nhã giúp thư thái.', 'Flower arrangement', 'Trang trí hoa tươi.'),
    ('Horse riding', '/hɔːs ˈraɪdɪŋ/', 'noun', 'Môn cưỡi ngựa thể thao', 'Learn horse riding at weekend.', 'Học cưỡi ngựa thể thao rèn luyện sự dũng cảm cuối tuần.', 'Go horse riding', 'Môn cưỡi ngựa.'),
    ('Ice skating', '/aɪs ˈskeɪtɪŋ/', 'noun', 'Môn trượt băng nghệ thuật', 'Glide smoothly on ice skating rink.', 'Lướt đi êm ái trên sân trượt băng nghệ thuật tráng lệ.', 'Go ice skating', 'Trượt trên băng.'),
    ('Cardboard', '/ˈkɑːdbɔːd/', 'noun', 'Bìa các-tông tái chế', 'Build models with recycled cardboard.', 'Chế tạo các mô hình kiến trúc bằng bìa các-tông tái chế.', 'Recycled cardboard', 'Bìa cứng.'),
    ('Dollhouse', '/ˈdɒlhaʊs/', 'noun', 'Ngôi nhà búp bê mini', 'Decorate a handmade dollhouse.', 'Tự tay trang hoàng một ngôi nhà búp bê mini xinh xắn.', 'Miniature dollhouse', 'Mô hình nhà tí hon.'),
    ('Insect', '/ˈɪnsekt/', 'noun', 'Côn trùng trong tự nhiên', 'Collect and classify garden insects.', 'Sưu tầm và phân loại các loài côn trùng quanh vườn nhà.', 'Collect insects', 'Côn trùng.'),
    ('Patient', '/ˈpeɪʃnt/', 'adjective', 'Kiên nhẫn, bền chí', 'You need to be patient with hobbies.', 'Bạn cần phải thật sự kiên nhẫn khi theo đuổi đam mê.', 'Very patient', 'Không nản lòng.'),
    ('Creative', '/kriˈeɪtɪv/', 'adjective', 'Giàu óc sáng tạo nghệ thuật', 'Express creative ideas through art.', 'Thể hiện những ý tưởng sáng tạo độc đáo qua tác phẩm tranh.', 'Creative mind', 'Tư duy đổi mới.'),
    ('Take up', '/teɪk ʌp/', 'phrasal verb', 'Bắt đầu một sở thích mới', 'Take up painting as a relaxing hobby.', 'Bắt đầu theo đuổi môn vẽ như một sở thích thư giãn tâm hồn.', 'Take up a hobby', 'Bắt đầu tham gia.'),
    ('Unusual', '/ʌnˈjuːʒuəl/', 'adjective', 'Độc lạ, hiếm thấy', 'An unusual collection of old coins.', 'Một bộ sưu tập tiền cổ độc lạ và vô cùng quý hiếm.', 'Unusual hobby', 'Khác biệt thú vị.')
], [
    ('Challenging', '/ˈtʃælɪndʒɪŋ/', 'adjective', 'Đầy thách thức kích thích', 'A challenging climbing adventure.', 'Một chuyến leo núi đầy thách thức kích thích tinh thần bền chí.', 'Very challenging', 'Đòi hỏi nỗ lực cao.'),
    ('Rewarding', '/rɪˈwɔːdɪŋ/', 'adjective', 'Đem lại giá trị xứng đáng', 'Gardening is a deeply rewarding pastime.', 'Làm vườn là thú vui tao nhã đem lại sự tĩnh tại xứng đáng.', 'Rewarding experience', 'Thỏa mãn thành quả.'),
    ('Beneficial', '/ˌbenɪˈfɪʃl/', 'adjective', 'Mang lại lợi ích thiết thực', 'Reading is highly beneficial for mind.', 'Đọc sách mang lại lợi ích thiết thực to lớn cho trí tuệ.', 'Beneficial to health', 'Có lợi cho sức khỏe.'),
    ('Dexterity', '/dekˈsterəti/', 'noun', 'Sự khéo léo của đôi tay', 'Improve manual dexterity with origami.', 'Nâng cao sự khéo léo của đôi bàn tay qua nghệ thuật gấp giấy.', 'Manual dexterity', 'Đôi tay khéo léo.'),
    ('Enthusiastic', '/ɪnˌθjuːziˈæstɪk/', 'adjective', 'Nhiệt huyết, say mê', 'Enthusiastic bird watchers.', 'Những người đam mê quan sát chim trời đầy nhiệt huyết.', 'Be enthusiastic about', 'Hào hứng nồng nhiệt.'),
    ('Masterpiece', '/ˈmɑːstəpiːs/', 'noun', 'Kiệt tác nghệ thuật để đời', 'Create a pottery masterpiece.', 'Tạo tác nên một kiệt tác gốm sứ để đời làm say lòng người.', 'Create a masterpiece', 'Tác phẩm đỉnh cao.'),
    ('Therapeutic', '/ˌθerəˈpjuːtɪk/', 'adjective', 'Có tác dụng chữa lành tâm hồn', 'Art has therapeutic mental benefits.', 'Nghệ thuật hội họa mang lại tác dụng chữa lành tâm hồn kỳ diệu.', 'Therapeutic effect', 'Liệu pháp tinh thần.'),
    ('Perseverance', '/ˌpɜːsɪˈvɪərəns/', 'noun', 'Lòng kiên trì bền bỉ', 'Great hobbies teach perseverance.', 'Những sở thích sâu sắc dạy ta bài học về lòng kiên trì bền bỉ.', 'Show perseverance', 'Ý chí không lùi bước.')
])

# Unit 2: Healthy Living
add('unit-g7-u2', 'Sống khỏe mạnh & Dinh dưỡng cân bằng', [
    ('Allergy', '/ˈælədʒi/', 'noun', 'Dị ứng phấn hoa, thực phẩm', 'Have an allergy to seafood.', 'Bị dị ứng thức ăn khi dùng đồ hải sản tươi sống.', 'Food allergy', 'Phản ứng cơ thể.'),
    ('Sunburn', '/ˈsʌnbɜːn/', 'noun', 'Cháy nắng, bỏng rát da', 'Prevent sunburn with suncream.', 'Phòng ngừa bỏng rát cháy nắng bằng kem chống nắng.', 'Severe sunburn', 'Tác hại ánh nắng gắt.'),
    ('Sore throat', '/sɔːr θrəʊt/', 'noun', 'Viêm đau rát họng', 'Drink warm honey for sore throat.', 'Uống nước mật ong chanh ấm để làm dịu cơn viêm đau họng.', 'Have a sore throat', 'Bệnh đường hô hấp.'),
    ('Flu', '/fluː/', 'noun', 'Bệnh cảm cúm theo mùa', 'Catch the seasonal flu.', 'Mắc bệnh cảm cúm theo mùa cần nghỉ ngơi uống đủ nước.', 'Catch the flu', 'Cúm mùa.'),
    ('Sneeze', '/sniːz/', 'verb / noun', 'Hắt hơi liên tục', 'Sneeze when dusting the room.', 'Hắt hơi liên tục khi quét dọn bụi bặm trong phòng.', 'Sneeze loudly', 'Phản xạ đường thở.'),
    ('Cough', '/kɒf/', 'verb / noun', 'Cơn ho, ho khan', 'A dry persistent cough.', 'Một cơn ho khan dai dẳng cần được khám kịp thời.', 'Cough persistently', 'Ho khan, ho có đờm.'),
    ('Fever', '/ˈfiːvər/', 'noun', 'Cơn sốt cao thân nhiệt', 'Run a high fever of 39 degrees.', 'Lên cơn sốt cao 39 độ cần chườm mát và theo dõi.', 'Have a fever', 'Thân nhiệt cao.'),
    ('Pimple', '/ˈpɪmpl/', 'noun', 'Mụn trứng cá trên mặt', 'Wash skin gently to avoid pimples.', 'Rửa mặt nhẹ nhàng sạch sâu để ngăn ngừa mụn trứng cá.', 'Prevent pimples', 'Mụn da mặt.'),
    ('Vegetarian', '/ˌvedʒəˈteəriən/', 'noun / adjective', 'Người ăn chay thanh đạm', 'Eat balanced vegetarian meals.', 'Ăn những bữa ăn chay thanh đạm giàu chất xơ từ rau củ.', 'Vegetarian diet', 'Không ăn thịt cá.'),
    ('Calorie', '/ˈkæləri/', 'noun', 'Đơn vị đo calo năng lượng', 'Burn calories through active exercise.', 'Đốt cháy calo dư thừa thông qua các bài tập thể lực tích cực.', 'Burn calories', 'Năng lượng tiêu hao.'),
    ('Weight', '/weɪt/', 'noun', 'Cân nặng cơ thể', 'Maintain ideal healthy body weight.', 'Duy trì mức cân nặng lý tưởng phù hợp với chiều cao.', 'Lose / gain weight', 'Trọng lượng cơ thể.'),
    ('Balanced diet', '/ˌbælənst ˈdaɪət/', 'noun', 'Chế độ ăn cân bằng dinh dưỡng', 'Eat a healthy balanced diet.', 'Thực hiện chế độ ăn cân bằng đầy đủ bốn nhóm chất thiết yếu.', 'Follow a balanced diet', 'Dinh dưỡng chuẩn.')
], [
    ('Immune system', '/ɪˈmjuːn ˈsɪstəm/', 'noun', 'Hệ thống miễn dịch cơ thể', 'Strengthen immune system with vitamin C.', 'Tăng cường sức mạnh hệ miễn dịch với vitamin C từ cam tươi.', 'Strong immune system', 'Đề kháng tự nhiên.'),
    ('Nutrient', '/ˈnjuːtriənt/', 'noun', 'Chất dinh dưỡng vi lượng', 'Rich in essential vitamins and nutrients.', 'Dồi dào các loại vitamin và vi chất dinh dưỡng cần thiết.', 'Essential nutrients', 'Dưỡng chất thiết yếu.'),
    ('Hydration', '/haɪˈdreɪʃn/', 'noun', 'Sự cung cấp đủ nước cho cơ thể', 'Proper hydration boosts brain power.', 'Uống đủ nước mỗi ngày giúp tăng cường tuần hoàn não bộ.', 'Stay hydrated', 'Bù đủ nước.'),
    ('Sedentary', '/ˈsedntri/', 'adjective', 'Ít vận động, ngồi nhiều', 'Avoid a sedentary lifestyle.', 'Tránh xa lối sống thụ động ngồi lỳ nhiều giờ trước màn hình.', 'Sedentary habits', 'Thụ động.'),
    ('Obesity', '/əʊˈbiːsəti/', 'noun', 'Tình trạng béo phì nguy hại', 'Childhood obesity is a health risk.', 'Tình trạng béo phì học đường là mối nguy hại lớn cho tim mạch.', 'Combat obesity', 'Thừa cân béo phì.'),
    ('Well-being', '/ˌwel ˈbiːɪŋ/', 'noun', 'Sức khỏe thể chất và tinh thần', 'Physical and mental well-being.', 'Sự khỏe khoắn toàn diện cả về thể chất lẫn tinh thần minh mẫn.', 'General well-being', 'Hạnh phúc an lạc.'),
    ('Sanitation', '/ˌsænɪˈteɪʃn/', 'noun', 'Vệ sinh môi trường phòng bệnh', 'Maintain proper hygiene and sanitation.', 'Duy trì vệ sinh cá nhân và môi trường sạch sẽ để phòng bệnh.', 'Good sanitation', 'Vệ sinh phòng ngừa.'),
    ('Medication', '/ˌmedɪˈkeɪʃn/', 'noun', 'Thuốc men điều trị theo đơn', 'Take medication prescribed by doctor.', 'Uống thuốc men điều trị đúng theo đơn chỉ dẫn của bác sĩ.', 'Take medication', 'Thuốc chữa bệnh.')
])

# Unit 3: Community Service
add('unit-g7-u3', 'Hoạt động vì cộng đồng & Tình nguyện', [
    ('Community service', '/kəˌmjuːnəti ˈsɜːvɪs/', 'noun', 'Dịch vụ công ích vì cộng đồng', 'Participate in community service projects.', 'Tích cực tham gia các dự án công ích vì cộng đồng xã hội.', 'Do community service', 'Phục vụ cộng đồng.'),
    ('Volunteer', '/ˌvɒlənˈtɪər/', 'noun / verb', 'Tình nguyện viên, làm tình nguyện', 'Youth volunteers plant roadside trees.', 'Những bạn tình nguyện viên trẻ tuổi cần mẫn trồng cây ven đường.', 'Volunteer work', 'Hiến dâng tự nguyện.'),
    ('Donate', '/dəʊˈneɪt/', 'verb', 'Quyên góp, ủng hộ từ thiện', 'Donate warm clothes to flood victims.', 'Quyên góp quần áo ấm ủng hộ đồng bào chịu ảnh hưởng bão lũ.', 'Donate books / blood', 'Ủng hộ tương thân.'),
    ('Donation', '/dəʊˈneɪʃn/', 'noun', 'Khoản quyên góp cứu trợ', 'Generous donations from citizens.', 'Những khoản đóng góp ủng hộ hào phóng và kịp thời từ người dân.', 'Make a donation', 'Tiền/hàng quyên góp.'),
    ('Charity', '/ˈtʃærəti/', 'noun', 'Tổ chức từ thiện nhân đạo', 'Run a charity organization for children.', 'Điều hành một tổ chức từ thiện nhân đạo dành cho trẻ mồ côi.', 'Charity foundation', 'Lòng nhân ái.'),
    ('Homeless people', '/ˈhəʊmləs ˈpiːpl/', 'noun', 'Người vô gia cư khốn khó', 'Provide warm soup for homeless people.', 'Nấu những suất súp nóng ấm trao tận tay người vô gia cư.', 'Help homeless people', 'Hoàn cảnh neo đơn.'),
    ('Orphanage', '/ˈɔːfənɪdʒ/', 'noun', 'Trại trẻ mồ côi tình thương', 'Visit children at the local orphanage.', 'Đến thăm và dạy học cho các em nhỏ tại trại trẻ mồ côi.', 'Visit orphanage', 'Mái ấm tình thương.'),
    ('Elderly', '/ˈeldəli/', 'adjective / noun', 'Người cao tuổi, các cụ già', 'Care for lonely elderly people in home.', 'Chăm sóc tận tình các cụ già neo đơn tại viện dưỡng lão.', 'Nursing home elderly', 'Bậc cao niên.'),
    ('Nursing home', '/ˈnɜːsɪŋ həʊm/', 'noun', 'Viện dưỡng lão người già', 'Sing joyful songs at the nursing home.', 'Hát những bài ca vui tươi mang lại niềm vui tại viện dưỡng lão.', 'At nursing home', 'Nhà dưỡng lão.'),
    ('Clean up', '/kliːn ʌp/', 'phrase', 'Dọn dẹp làm sạch cảnh quan', 'Clean up trash in local park.', 'Dọn dẹp sạch sẽ rác thải nhựa trong khuôn viên công viên.', 'Clean up project', 'Làm sạch môi trường.'),
    ('Tutor', '/ˈtjuːtər/', 'verb / noun', 'Dạy kèm, gia sư tình nguyện', 'Tutor street kids in English and Maths.', 'Dạy kèm miễn phí tiếng Anh và Toán cho các bạn nhỏ khó khăn.', 'Volunteer tutor', 'Kèm cặp việc học.'),
    ('Raise funds', '/reɪz fʌndz/', 'phrase', 'Gây quỹ từ thiện', 'Raise funds for clean rural water.', 'Tổ chức hội chợ gây quỹ xây giếng nước sạch cho vùng cao.', 'Raise funds for charity', 'Tập hợp nguồn lực.')
], [
    ('Compassion', '/kəmˈpæʃn/', 'noun', 'Lòng trắc ẩn, sự thương cảm', 'Act with deep human compassion.', 'Hành động xuất phát từ lòng trắc ẩn và tình thương sâu sắc.', 'Show compassion', 'Tình người.'),
    ('Beneficiary', '/ˌbenɪˈfɪʃəri/', 'noun', 'Người được thụ hưởng trợ giúp', 'Direct support to remote beneficiaries.', 'Hỗ trợ trực tiếp đến tận tay những người dân nghèo thụ hưởng.', 'Project beneficiary', 'Người nhận giúp đỡ.'),
    ('Philanthropy', '/fɪˈlænθrəpi/', 'noun', 'Hoạt động bác ái nhân văn', 'Dedicate fortune to philanthropy.', 'Dành trọn tâm sức và tài lực cho các hoạt động bác ái xã hội.', 'Engage in philanthropy', 'Lòng từ thiện lớn.'),
    ('Non-profit', '/ˌnɒn ˈprɒfɪt/', 'adjective', 'Phi lợi nhuận vì cộng đồng', 'A non-profit green organization.', 'Một tổ chức phi lợi nhuận hoạt động vì môi trường xanh tươi.', 'Non-profit organization', 'Không vì tư lợi.'),
    ('Empower', '/ɪmˈpaʊər/', 'verb', 'Trao quyền, tiếp thêm sức mạnh', 'Empower poor students through skills.', 'Tiếp thêm sức mạnh cho học sinh nghèo qua đào tạo kỹ năng.', 'Empower youth', 'Tạo cơ hội tự lập.'),
    ('Solidarity', '/ˌsɒlɪˈdærəti/', 'noun', 'Tinh thần đoàn kết keo sơn', 'National solidarity in hard times.', 'Tinh thần đoàn kết đùm bọc keo sơn của toàn dân lúc khó khăn.', 'Spirit of solidarity', 'Đoàn kết một lòng.'),
    ('Altruistic', '/ˌæltruˈɪstɪk/', 'adjective', 'Vị tha, hy sinh không vụ lợi', 'Praise their noble altruistic actions.', 'Tuyên dương những nghĩa cử vị tha cao đẹp không màng tư lợi.', 'Altruistic spirit', 'Sống vì người khác.'),
    ('Graffiti', '/ɡrəˈfiːti/', 'noun', 'Tranh vẽ bậy trên tường công cộng', 'Remove ugly graffiti on school walls.', 'Tẩy sạch những vết vẽ bậy nham nhở trên các bức tường trường.', 'Remove graffiti', 'Sơn vẽ không phép.')
])

# Unit 4: Music & Arts
add('unit-g7-u4', 'Âm nhạc & Nghệ thuật tạo hình', [
    ('Composer', '/kəmˈpəʊzər/', 'noun', 'Nhà soạn nhạc thiên tài', 'Trinh Cong Son was a legendary composer.', 'Trịnh Công Sơn là một nhạc sĩ soạn nhạc huyền thoại của nước ta.', 'Famous composer', 'Người viết nhạc.'),
    ('Portrait', '/ˈpɔːtrət/', 'noun', 'Bức tranh chân dung sắc sảo', 'Paint a realistic oil portrait.', 'Vẽ một bức tranh sơn dầu chân dung sống động như thật.', 'Paint a portrait', 'Tranh vẽ người.'),
    ('Landscape', '/ˈlændskeɪp/', 'noun', 'Bức tranh phong cảnh hữu tình', 'A peaceful rural landscape painting.', 'Một bức tranh phong cảnh đồng quê hữu tình thanh bình.', 'Landscape painting', 'Tranh non nước.'),
    ('Concert', '/ˈkɒnsət/', 'noun', 'Buổi hòa nhạc thính phòng', 'Attend classical symphony concert.', 'Thưởng thức buổi hòa nhạc giao hưởng thính phòng lộng lẫy.', 'Live concert', 'Đêm biểu diễn.'),
    ('Gallery', '/ˈɡæləri/', 'noun', 'Phòng trưng bày nghệ thuật', 'Display sculptures in national gallery.', 'Trưng bày các tác phẩm điêu khắc tại bảo tàng mỹ thuật.', 'Art gallery', 'Không gian triển lãm.'),
    ('Exhibition', '/ˌeksɪˈbɪʃn/', 'noun', 'Cuộc triển lãm nghệ thuật', 'Visit contemporary art exhibition.', 'Tham quan cuộc triển lãm nghệ thuật đương đại đặc sắc.', 'Hold an exhibition', 'Trưng bày công chúng.'),
    ('Instrument', '/ˈɪnstrəmənt/', 'noun', 'Nhạc cụ biểu diễn', 'Play traditional ethnic instruments.', 'Diễn tấu các loại nhạc cụ dân tộc truyền thống độc đáo.', 'Musical instrument', 'Đàn, sáo, trống.'),
    ('Water puppet', '/ˈwɔːtər ˈpʌpɪt/', 'noun', 'Rối nước truyền thống Việt Nam', 'Water puppet shows at Thang Long Theatre.', 'Những màn múa rối nước đặc sắc tại Nhà hát Thăng Long.', 'Water puppetry', 'Nghệ thuật dân gian.'),
    ('Origami', '/ˌɒrɪˈɡɑːmi/', 'noun', 'Nghệ thuật xếp giấy Nhật Bản', 'Fold paper cranes with origami.', 'Gấp những cánh hạc giấy ước nguyện bằng nghệ thuật origami.', 'Fold origami', 'Gấp giấy thủ công.'),
    ('Curtain', '/ˈkɜːtn/', 'noun', 'Màn nhung sân khấu rạp hát', 'The velvet curtain rises on stage.', 'Bức màn nhung sân khấu từ từ kéo lên báo hiệu giờ diễn bắt đầu.', 'Stage curtain', 'Rèm sân khấu.'),
    ('Microphone', '/ˈmaɪkrəfəʊn/', 'noun', 'Chiếc micrô truyền âm thanh', 'Sing through stage microphone.', 'Cất cao tiếng hát truyền cảm qua chiếc micrô sân khấu.', 'Speak into mic', 'Thiết bị thu âm.'),
    ('Audience', '/ˈɔːdiəns/', 'noun', 'Khán thính giả thưởng thức', 'The audience applauded with joy.', 'Toàn thể khán thính giả vỗ tay tán thưởng không ngớt với niềm vui.', 'Enthusiastic audience', 'Người nghe nhìn.')
], [
    ('Symphony', '/ˈsɪmfəni/', 'noun', 'Bản nhạc giao hưởng hùng tráng', 'Beethovens Ninth Symphony.', 'Bản giao hưởng số 9 bất hủ hùng tráng của Beethoven.', 'Classical symphony', 'Nhạc thính phòng lớn.'),
    ('Orchestra', '/ˈɔːkɪstrə/', 'noun', 'Dàn nhạc giao hưởng hùng hậu', 'Musicians perform in Philharmonic orchestra.', 'Các nghệ sĩ biểu diễn trong dàn nhạc giao hưởng thính phòng.', 'Philharmonic orchestra', 'Dàn đại hòa tấu.'),
    ('Melodious', '/məˈləʊdiəs/', 'adjective', 'Du dương, ngọt ngào êm tai', 'Melodious bamboo flute sounds.', 'Tiếng sáo trúc du dương ngọt ngào bay bổng giữa chiều quê.', 'Melodious melody', 'Êm ái lay động.'),
    ('Acoustic', '/əˈkuːstɪk/', 'adjective', 'Mộc, thanh âm tự nhiên', 'Play pure acoustic guitar songs.', 'Gảy những bản nhạc ghi-ta mộc mạc lắng đọng tâm tư.', 'Acoustic performance', 'Không qua âm điện.'),
    ('Perspective', '/pəˈspektɪv/', 'noun', 'Luật phối cảnh trong hội họa', 'Master 3D spatial perspective in drawing.', 'Làm chủ luật phối cảnh không gian ba chiều trong tranh vẽ.', 'Linear perspective', 'Phối cảnh xa gần.'),
    ('Sculpture', '/ˈskʌlptʃər/', 'noun', 'Tác phẩm điêu khắc nghệ thuật', 'Marble sculptures in museum.', 'Những pho tượng điêu khắc đá cẩm thạch tinh xảo tại bảo tàng.', 'Carve sculpture', 'Nghệ thuật tạc hình.'),
    ('Inspirational', '/ˌɪnspəˈreɪʃənl/', 'adjective', 'Truyền cảm hứng mãnh liệt', 'An inspirational piece of art.', 'Một tác phẩm nghệ thuật truyền cảm hứng sống mãnh liệt.', 'Inspirational message', 'Thôi thúc tâm can.'),
    ('Heritage', '/ˈherɪtɪdʒ/', 'noun', 'Di sản văn hóa phi vật thể', 'Quan Ho singing is intangible heritage.', 'Dân ca Quan họ Bắc Ninh là di sản văn hóa phi vật thể nhân loại.', 'Intangible heritage', 'Bảo tồn muôn đời.')
])

# Unit 5: Food & Drink
add('unit-g7-u5', 'Văn hóa ẩm thực & Món ngon quê hương', [
    ('Ingredient', '/ɪnˈɡriːdiənt/', 'noun', 'Nguyên liệu chế biến món ăn', 'Fresh natural soup ingredients.', 'Những nguyên liệu tự nhiên tươi ngon làm nên bát canh ngọt lành.', 'Fresh ingredients', 'Thành phần nấu ăn.'),
    ('Recipe', '/ˈresəpi/', 'noun', 'Công thức nấu nướng bí truyền', 'A secret family noodle soup recipe.', 'Một công thức gia truyền nấu phở bò đậm đà thơm nức mũi.', 'Follow a recipe', 'Chữ c đọc là /s/.'),
    ('Pho', '/fɜː/', 'noun', 'Phở truyền thống Việt Nam', 'Hanoi beef Pho with fragrant broth.', 'Phở bò Hà Nội với nước dùng ngọt thanh đậm đà thơm ngát hành hoa.', 'Beef / chicken Pho', 'Quốc hồn ẩm thực.'),
    ('Broth', '/brɒθ/', 'noun', 'Nước dùng, nước hầm xương', 'Simmer bones for savory broth.', 'Ninh xương thật kỹ nhiều giờ để chắt lọc nước dùng ngọt thơm.', 'Savory beef broth', 'Nước súp thanh ngọt.'),
    ('Noodle', '/ˈnuːdl/', 'noun', 'Sợi bún, sợi phở dẻo dai', 'Soft white rice noodles.', 'Những sợi bánh phở trắng mịn dẻo dai từ hạt gạo thơm.', 'Rice noodles', 'Sợi tinh bột.'),
    ('Turmeric', '/ˈtɜːmərɪk/', 'noun', 'Củ nghệ vàng thơm tạo màu', 'Marinate grilled fish with turmeric.', 'Ướp cá lăng nướng với nghệ vàng và mẻ để dậy mùi thơm nức.', 'Golden turmeric', 'Gia vị tạo màu vàng.'),
    ('Pork', '/pɔːk/', 'noun', 'Thịt heo tươi ngon', 'Stew tender pork belly.', 'Thịt heo kho tàu mềm nhừ đậm đà hương vị quê hương.', 'Tender pork', 'Thịt lợn.'),
    ('Beef', '/biːf/', 'noun', 'Thịt bò tươi thái mỏng', 'Thin slices of tender beef.', 'Những lát thịt bò tươi mềm thái mỏng chần tái thơm ngọt.', 'Tender beef', 'Thịt bò.'),
    ('Herb', '/hɜːb/', 'noun', 'Rau thơm, rau mùi thanh mát', 'Aromatic culinary herbs on plate.', 'Đĩa rau thơm xanh non tươi mơn mởn ăn kèm các món cuốn.', 'Fresh herbs', 'Rau mùi, gia vị lá.'),
    ('Tofu', '/ˈtəʊfuː/', 'noun', 'Đậu phụ non thanh mát', 'Fried crispy golden tofu.', 'Những miếng đậu phụ rán giòn rụm chấm mắm tôm thơm lừng.', 'Crispy tofu', 'Đậu hũ.'),
    ('Pancake', '/ˈpænkeɪk/', 'noun', 'Bánh xèo vàng giòn miền Nam', 'Crispy sizzling Vietnamese pancakes.', 'Bánh xèo miền Tây giòn tan cuốn bánh tráng rau rừng.', 'Vietnamese pancake', 'Bánh xèo giòn rụm.'),
    ('Omelette', '/ˈɒmlət/', 'noun', 'Món trứng tráng thơm xốp', 'Fluffy egg omelette with herbs.', 'Món trứng tráng cuộn xốp mềm thơm phức mùi hành hoa.', 'Fluffy omelette', 'Trứng rán.')
], [
    ('Delicious', '/dɪˈlɪʃəs/', 'adjective', 'Thơm ngon tuyệt hảo vị giác', 'A delicious culinary experience.', 'Một trải nghiệm ẩm thực thơm ngon tuyệt đỉnh khó quên.', 'Delicious dish', 'Hợp khẩu vị.'),
    ('Nutritious', '/njuːˈtrɪʃəs/', 'adjective', 'Giàu chất dinh dưỡng bổ dưỡng', 'A nutritious bowl of chicken soup.', 'Bát cháo gà nóng hổi bổ dưỡng bồi bổ sức khỏe mau lành.', 'Nutritious meal', 'Bổ dưỡng cho cơ thể.'),
    ('Mineral water', '/ˈmɪnərəl ˈwɔːtər/', 'noun', 'Nước khoáng thiên nhiên mát', 'Drink bottled natural mineral water.', 'Uống nước khoáng thiên nhiên tinh khiết mỗi ngày.', 'Pure mineral water', 'Nước khoáng đóng chai.'),
    ('Flavor', '/ˈfleɪvər/', 'noun', 'Hương vị đậm đà đặc trưng', 'Rich flavors of traditional cuisine.', 'Hương vị đậm đà khó quên của nền ẩm thực dân tộc truyền thống.', 'Distinct flavor', 'Mùi vị hòa quyện.'),
    ('Crispy', '/ˈkrɪspi/', 'adjective', 'Giòn tan rụm trong miệng', 'Golden crispy crust of spring rolls.', 'Lớp vỏ bánh ram giòn tan rụm kêu răng rắc khi thưởng thức.', 'Crispy texture', 'Giòn rụm.'),
    ('Spicy', '/ˈspaɪsi/', 'adjective', 'Cay nồng kích thích vị giác', 'A spicy chili dipping sauce.', 'Bát nước chấm ớt tỏi cay nồng ấm bụng ngày mưa.', 'Spicy hot sauce', 'Vị cay của ớt tiêu.'),
    ('Gourmet', '/ˈɡʊəmeɪ/', 'noun / adjective', 'Ẩm thực sành điệu tinh tế', 'Fine dining gourmet dishes.', 'Những món ăn tinh tế đỉnh cao dành cho người sành ẩm thực.', 'Gourmet restaurant', 'Sành ăn cao cấp.'),
    ('Authentic', '/ɔːˈθentɪk/', 'adjective', 'Đúng chuẩn bản vị truyền thống', 'Cook authentic Hue beef noodles.', 'Nấu món bún bò Huế đúng chuẩn bản vị cay thơm nồng nàn.', 'Authentic taste', 'Nguyên bản gốc.')
])

# Unit 6: A Visit to a School
add('unit-g7-u6', 'Thăm trường xưa & Di tích nghìn năm', [
    ('Temple of Literature', '/ˈtempl əv ˈlɪtrətʃər/', 'noun', 'Văn Miếu Thăng Long lịch sử', 'Visit Temple of Literature in Hanoi.', 'Thăm Văn Miếu Thăng Long biểu tượng hiếu học của nước nhà.', 'Historic Temple', 'Di tích Quốc gia đặc biệt.'),
    ('Imperial Academy', '/ɪmˈpɪəriəl əˈkædəmi/', 'noun', 'Quốc Tử Giám - đại học đầu tiên', 'Quoc Tu Giam is Vietnams first university.', 'Quốc Tử Giám là trường đại học đầu tiên đào tạo hiền tài đất nước.', 'First university', 'Trường đại học xưa.'),
    ('Doctor stone tablet', '/ˈdɒktər stəʊn ˈtæblət/', 'noun', 'Bia Tiến sĩ khắc trên lưng rùa', 'Eighty-two doctor stone tablets remain.', 'Tám mươi hai tấm bia Tiến sĩ vinh danh hiền tài trên lưng rùa đá.', 'Stone tablet on turtle', 'Di sản tư liệu thế giới.'),
    ('Tortoise', '/ˈtɔːtəs/', 'noun', 'Rùa đá đội bia Tiến sĩ', 'Stone tortoises carry sacred stelae.', 'Những cụ rùa đá uy nghiêm đội trên lưng tấm bia khắc tên các bậc hiền tài.', 'Stone tortoise', 'Biểu tượng trường tồn.'),
    ('Pavilion', '/pəˈvɪliən/', 'noun', 'Gác Khuê Văn Các cổ kính', 'Khue Van Pavilion on thousand-dong note.', 'Khuê Văn Các cổ kính soi bóng nước hồ Văn in trên tờ tiền Việt Nam.', 'Khue Van Pavilion', 'Biểu trưng Hà Nội.'),
    ('Historic site', '/hɪˈstɒrɪk saɪt/', 'noun', 'Khu di tích lịch sử ngàn năm', 'A thousand-year-old historic site.', 'Một khu di tích lịch sử nghìn năm văn hiến lưu giữ hồn thiêng sông núi.', 'National historic site', 'Nơi ghi dấu lịch sử.'),
    ('Courtyard', '/ˈkɔːtjɑːd/', 'noun', 'Sân gạch rợp bóng cổ thụ', 'Ancient brick courtyard under shade.', 'Khoảng sân gạch rêu phong rợp bóng những cây cổ thụ ngàn năm.', 'Stone courtyard', 'Sân trong di tích.'),
    ('Surround', '/səˈraʊnd/', 'verb', 'Bao quanh bởi hào nước xanh', 'Surrounded by brick walls and gardens.', 'Được bao bọc bởi những bức tường gạch vồ và vườn cây xanh mướt.', 'Surrounded by trees', 'Bao bọc tứ bề.'),
    ('Renowned', '/rɪˈnaʊnd/', 'adjective', 'Lừng danh, vang danh bốn phương', 'Renowned scholars throughout history.', 'Những bậc danh nhân hiền tài lừng danh bảng vàng qua các triều đại.', 'Renowned scholar', 'Nổi tiếng lừng lẫy.'),
    ('Scholar', '/ˈskɒlər/', 'noun', 'Bậc học giả, nhà nho hiền tài', 'Virtuous Confucian scholars served nation.', 'Những bậc Nho học hiền tài đức độ tận trung phục vụ non sông.', 'Great Confucian scholar', 'Người có học vấn uyên thâm.'),
    ('Examination', '/ɪɡˌzæmɪˈneɪʃn/', 'noun', 'Kỳ thi Hội, thi Đình tuyển hiền', 'Pass the imperial court examination.', 'Đỗ đầu kỳ thi Đình tuyển chọn nhân tài giúp vua trị nước.', 'Pass imperial examination', 'Khoa cử xưa.'),
    ('Heritage', '/ˈherɪtɪdʒ/', 'noun', 'Di sản văn hóa nghìn năm', 'Preserve world documentary heritage.', 'Trân trọng gìn giữ và tôn vinh di sản tư liệu thế giới của tổ tiên.', 'Cultural heritage', 'Kho tàng cha ông.')
], [
    ('Confucianism', '/kənˈfjuːʃənɪzəm/', 'noun', 'Nho giáo truyền thống đạo học', 'The cradle of Vietnamese Confucianism.', 'Chiếc nôi của nền Nho học tôn sư trọng đạo của dân tộc Việt Nam.', 'Confucian philosophy', 'Đạo Khổng.'),
    ('Erect', '/ɪˈrekt/', 'verb', 'Dựng bia tưởng niệm ngàn đời', 'Erect stone stelae to honor scholars.', 'Dựng bia đá ngàn năm để khắc ghi công đức những bậc đỗ đạt đại khoa.', 'Erect stelae', 'Khởi dựng công trình.'),
    ('Honor', '/ˈɒnər/', 'verb / noun', 'Vinh danh, niềm vinh dự lớn', 'Honor national talent as vital essence.', 'Vinh danh hiền tài là nguyên khí quốc gia, nền thịnh trị của đất nước.', 'In honor of', 'Chữ h câm.'),
    ('Architectural', '/ˌɑːkɪˈtektʃərəl/', 'adjective', 'Mang giá trị kiến trúc nghệ thuật', 'Outstanding architectural ensemble.', 'Một quần thể kiến trúc cổ kính xuất sắc hài hòa cùng thiên nhiên.', 'Architectural value', 'Giá trị xây dựng cổ.'),
    ('Precious', '/ˈpreʃəs/', 'adjective', 'Vô giá, vô cùng quý báu', 'Precious historical artifacts of dynasty.', 'Những hiện vật lịch sử vô giá từ các triều đại Lý, Trần, Lê truyền lại.', 'Precious relics', 'Quý giá thiêng liêng.'),
    ('Recognize', '/ˈrekəɡnaɪz/', 'verb', 'Công nhận danh hiệu quốc tế', 'Recognized by UNESCO as Memory of World.', 'Được UNESCO long trọng công nhận là Di sản Ký ức Thế giới.', 'Recognized globally', 'Tôn vinh ghi nhận.'),
    ('Veneration', '/ˌvenəˈreɪʃn/', 'noun', 'Lòng tôn kính, sự sùng kính', 'Tradition of veneration for teachers.', 'Truyền thống tôn sư trọng đạo sùng kính đạo học ngàn đời của dân tộc.', 'Show deep veneration', 'Tôn sư trọng đạo.'),
    ('Inscribed', '/ɪnˈskraɪbd/', 'adjective', 'Được chạm khắc tinh xảo trên đá', 'Names of doctors inscribed on stone.', 'Tên tuổi quê quán các vị Tiến sĩ được khắc sâu vĩnh viễn trên bia đá.', 'Inscribed on stelae', 'Khắc chữ chìm.')
])

# Unit 7: Traffic
add('unit-g7-u7', 'Giao thông an toàn & Văn hóa đi đường', [
    ('Traffic', '/ˈtræfɪk/', 'noun', 'Giao thông xe cộ đi lại', 'Heavy morning traffic on roads.', 'Giao thông xe cộ đông đúc tấp nập trên khắp các nẻo đường giờ sáng.', 'Traffic rules', 'Giao thông vận tải.'),
    ('Traffic jam', '/ˈtræfɪk dʒæm/', 'noun', 'Ùn tắc giao thông cục bộ', 'Get stuck in a peak-hour traffic jam.', 'Bị kẹt xe trong đợt ùn tắc giao thông giờ cao điểm tan tầm.', 'Avoid traffic jam', 'Kẹt xe.'),
    ('Rush hour', '/ˈrʌʃ aʊər/', 'noun', 'Giờ cao điểm đông người', 'Streets are congested in rush hour.', 'Đường sá đông nghịt người xe vào giờ cao điểm đi làm và tan trường.', 'During rush hour', 'Khung giờ đông nhất.'),
    ('Pedestrian', '/pəˈdestriən/', 'noun', 'Người đi bộ trên vỉa hè', 'Safe sidewalk crossing for pedestrians.', 'Lối đi bộ sang đường an toàn có vạch kẻ dành riêng cho người bộ hành.', 'Pedestrian crossing', 'Người đi chân đất.'),
    ('Pavement', '/ˈpeɪvmənt/', 'noun', 'Vỉa hè dành cho người đi bộ', 'Walk safely along wide pavement.', 'Đi bộ an toàn dọc theo hành lang vỉa hè phong quang sạch đẹp.', 'Walk on pavement', 'Lề đường.'),
    ('Zebra crossing', '/ˌzebrə ˈkrɒsɪŋ/', 'noun', 'Vạch kẻ trắng sang đường an toàn', 'Cross only at designated zebra crossing.', 'Chỉ băng qua đường tại đúng vị trí vạch kẻ trắng sang đường an toàn.', 'At zebra crossing', 'Vạch ngựa vằn.'),
    ('Seatbelt', '/ˈsiːtbelt/', 'noun', 'Dây an toàn trên ô tô', 'Fasten your seatbelt before driving.', 'Luôn thắt chặt dây an toàn trước khi cho xe ô tô lăn bánh khởi hành.', 'Fasten seatbelt', 'Dây bảo hộ xe hơi.'),
    ('Helmet', '/ˈhelmɪt/', 'noun', 'Mũ bảo hiểm đạt chuẩn chất lượng', 'Wear quality helmet on motorbikes.', 'Luôn đội mũ bảo hiểm đạt chuẩn cài quai đúng cách khi đi xe máy.', 'Wear a helmet', 'Mũ bảo hộ đầu.'),
    ('Traffic light', '/ˈtræfɪk laɪt/', 'noun', 'Đèn tín hiệu giao thông 3 màu', 'Obey red traffic light signals.', 'Tuyệt đối chấp hành nghiêm hiệu lệnh đèn đỏ của đèn tín hiệu giao thông.', 'Red traffic light', 'Đèn xanh đỏ vàng.'),
    ('Road sign', '/ˈrəʊd saɪn/', 'noun', 'Biển báo hiệu giao thông đường bộ', 'Pay attention to danger road signs.', 'Chú ý quan sát các biển báo hiệu nguy hiểm trên đoạn đường đèo dốc.', 'Obey road signs', 'Biển chỉ dẫn.'),
    ('Cycle lane', '/ˈsaɪkl leɪn/', 'noun', 'Làn đường riêng cho xe đạp', 'Dedicated green cycle lane.', 'Làn đường riêng rẽ sơn màu xanh dành cho người đi xe đạp thể thao.', 'Bike lane', 'Làn xe thô sơ.'),
    ('Railway station', '/ˈreɪlweɪ ˈsteɪʃn/', 'noun', 'Ga đường sắt tàu hỏa', 'Arrive punctually at railway station.', 'Có mặt đúng giờ tại ga đường sắt để chuẩn bị lên tàu.', 'At railway station', 'Nhà ga xe lửa.')
], [
    ('Congestion', '/kənˈdʒestʃən/', 'noun', 'Sự tắc nghẽn giao thông đô thị', 'Urban congestion needs green transit.', 'Sự tắc nghẽn đô thị cần được giải quyết bằng các phương tiện xanh.', 'Traffic congestion', 'Ùn ứ đường sá.'),
    ('Strictly', '/ˈstrɪktli/', 'adverb', 'Một cách nghiêm minh, nghiêm ngặt', 'Traffic laws must be strictly obeyed.', 'Luật giao thông đường bộ phải được toàn dân chấp hành nghiêm minh.', 'Strictly follow laws', 'Nghiêm túc chấp hành.'),
    ('Penalty', '/ˈpenəlti/', 'noun', 'Mức xử phạt vi phạm giao thông', 'Heavy monetary penalty for speeding.', 'Mức phạt tiền rất nặng đối với hành vi chạy quá tốc độ cho phép.', 'Pay a penalty', 'Chế tài xử phạt.'),
    ('Violation', '/ˌvaɪəˈleɪʃn/', 'noun', 'Hành vi vi phạm luật lệ', 'Traffic violation leads to accidents.', 'Hành vi vi phạm luật giao thông tiềm ẩn nguy cơ gây tai nạn đáng tiếc.', 'Law violation', 'Phạm luật.'),
    ('Commuter', '/kəˈmjuːtər/', 'noun', 'Người đi lại hàng ngày bằng xe bus', 'Daily metro commuters reduce emissions.', 'Người dân đi làm bằng tàu điện ngầm giúp giảm bớt khí thải nhà kính.', 'Daily commuter', 'Người tham gia giao thông.'),
    ('Breathalyzer', '/ˈbreθəlaɪzər/', 'noun', 'Máy đo nồng độ cồn', 'Police conduct breathalyzer tests.', 'Lực lượng cảnh sát kiểm tra nồng độ cồn để đảm bảo an toàn tuyệt đối.', 'Alcohol breathalyzer', 'Đo nồng độ cồn.'),
    ('Infrastructure', '/ˈɪnfrəstrʌktʃər/', 'noun', 'Hạ tầng giao thông đồng bộ', 'Modern flyovers and highway infrastructure.', 'Hạ tầng cầu vượt và đường cao tốc hiện đại giải tỏa áp lực xe cộ.', 'Transport infrastructure', 'Cơ sở hạ tầng.'),
    ('Fatal', '/ˈfeɪtl/', 'adjective', 'Gây chết người, thảm khốc', 'Prevent fatal road accidents.', 'Nỗ lực hành động để ngăn chặn những vụ tai nạn giao thông thảm khốc.', 'Fatal accident', 'Nguy hiểm tính mạng.')
])

# Unit 8: Films
add('unit-g7-u8', 'Điện ảnh & Nghệ thuật thứ bảy', [
    ('Action film', '/ˈækʃn fɪlm/', 'noun', 'Phim hành động kịch tính', 'Thrilling stunts in action film.', 'Những pha hành động mạo hiểm nghẹt thở trong phim hành động bom tấn.', 'Blockbuster action film', 'Phim hành động võ thuật.'),
    ('Comedy', '/ˈkɒmədi/', 'noun', 'Phim hài kịch dí dỏm', 'Hilarious comedy with bright laughs.', 'Bộ phim hài kịch dí dỏm đem lại những tràng cười sảng khoái giòn tan.', 'Romantic comedy', 'Phim mang lại tiếng cười.'),
    ('Documentary', '/ˌdɒkjuˈmentri/', 'noun', 'Phim tài liệu thực tế', 'An eye-opening nature documentary.', 'Một bộ phim tài liệu về thiên nhiên mở mang tầm mắt cho người xem.', 'Nature documentary', 'Phim ghi lại sự thật.'),
    ('Horror film', '/ˈhɒrər fɪlm/', 'noun', 'Phim kinh dị rùng rợn', 'Scary ghosts in late night horror film.', 'Những bóng ma đáng sợ trong bộ phim kinh dị chiếu lúc đêm khuya.', 'Spooky horror film', 'Phim ma rùng rợn.'),
    ('Sci-fi', '/ˌsaɪ ˈfaɪ/', 'noun / adjective', 'Phim khoa học viễn tưởng', 'Time travel in futuristic sci-fi movie.', 'Hành trình du hành thời gian trong bộ phim khoa học viễn tưởng kỳ thú.', 'Sci-fi blockbuster', 'Viễn tưởng tương lai.'),
    ('Animation', '/ˌænɪˈmeɪʃn/', 'noun', 'Phim hoạt hình 3D đỉnh cao', 'Pixar creates touching animations.', 'Hãng Pixar kiến tạo nên những bộ phim hoạt hình 3D cảm động lay động lòng.', '3D animation', 'Hoạt họa máy tính.'),
    ('Director', '/dəˈrektər/', 'noun', 'Đạo diễn chỉ đạo phim', 'An Oscar-winning film director.', 'Vị đạo diễn tài năng từng vinh dự đoạt tượng vàng Oscar danh giá.', 'Film director', 'Người chỉ đạo diễn xuất.'),
    ('Actor', '/ˈæktər/', 'noun', 'Nam diễn viên xuất sắc', 'A talented male lead actor.', 'Một nam diễn viên chính tài năng thể hiện trọn vẹn nội tâm nhân vật.', 'Lead actor', 'Diễn viên nam.'),
    ('Actress', '/ˈæktrəs/', 'noun', 'Nữ diễn viên xinh đẹp', 'Award for best supporting actress.', 'Giải thưởng danh giá dành cho nữ diễn viên phụ xuất sắc nhất năm.', 'Lead actress', 'Diễn viên nữ.'),
    ('Plot', '/plɒt/', 'noun', 'Cốt truyện diễn biến bất ngờ', 'An unpredictable twisting story plot.', 'Một cốt truyện diễn biến bất ngờ với những cú lội ngược dòng ngoạn mục.', 'Twisting plot', 'Diễn biến câu chuyện.'),
    ('Soundtrack', '/ˈsaʊndtræk/', 'noun', 'Nhạc phim lay động lòng người', 'Emotional orchestral film soundtrack.', 'Bản nhạc nền giao hưởng xúc động làm thăng hoa cảm xúc bộ phim.', 'Movie soundtrack', 'Âm nhạc trong phim.'),
    ('Review', '/rɪˈvjuː/', 'verb / noun', 'Đánh giá, bài bình luận phim', 'Read glowing movie critic reviews.', 'Đọc những bài bình luận khen ngợi nức nở của các nhà phê bình phim.', 'Film review', 'Nhận xét đánh giá.')
], [
    ('Blockbuster', '/ˈblɒkbʌstər/', 'noun', 'Phim bom tấn công phá phòng vé', 'A summer box-office blockbuster.', 'Một siêu phẩm bom tấn mùa hè công phá kỷ lục mọi phòng vé toàn cầu.', 'Summer blockbuster', 'Phim doanh thu khủng.'),
    ('Cinematography', '/ˌsɪnəməˈtɒɡrəfi/', 'noun', 'Nghệ thuật quay phim xuất thần', 'Breathtaking visual cinematography.', 'Nghệ thuật quay phim xuất thần mang lại những khung hình đẹp như mơ.', 'Visual cinematography', 'Kỹ thuật hình ảnh.'),
    ('Visual effects', '/ˈvɪʒuəl ɪˈfekts/', 'noun', 'Hiệu ứng kỹ xảo hình ảnh', 'Cutting-edge CGI visual effects.', 'Kỹ xảo hình ảnh kỹ thuật số tối tân tạo nên những quái thú sống động.', 'CGI effects', 'Kỹ xảo điện ảnh.'),
    ('Compelling', '/kəmˈpelɪŋ/', 'adjective', 'Hấp dẫn lôi cuốn không thể rời mắt', 'A compelling emotional storyline.', 'Một mạch truyện hấp dẫn lôi cuốn khiến người xem không thể rời mắt.', 'Compelling story', 'Cuốn hút mãnh liệt.'),
    ('Hilarous', '/hɪˈleəriəs/', 'adjective', 'Buồn cười nghiêng ngả, hóm hỉnh', 'Hilarious jokes by comedian.', 'Những mẩu thoại hài hước khiến cả rạp chiếu cười nghiêng ngả thích thú.', 'Hilarious performance', 'Hài hước tột độ.'),
    ('Disappointing', '/ˌdɪsəˈpɔɪntɪŋ/', 'adjective', 'Gây thất vọng, chưa trọn vẹn', 'A weak plot and disappointing end.', 'Một kịch bản non nớt cùng cái kết gây thất vọng cho người hâm mộ.', 'Disappointing ending', 'Không như kỳ vọng.'),
    ('Masterpiece', '/ˈmɑːstəpiːs/', 'noun', 'Kiệt tác điện ảnh kinh điển', 'Considered a timeless cinematic masterpiece.', 'Được ngợi ca là một kiệt tác điện ảnh kinh điển trường tồn cùng năm tháng.', 'Cinematic masterpiece', 'Đỉnh cao nghệ thuật.'),
    ('Screenplay', '/ˈskriːnpleɪ/', 'noun', 'Kịch bản phim chi tiết', 'An award-winning adapted screenplay.', 'Một kịch bản chuyển thể xuất sắc từng đoạt nhiều giải thưởng uy tín.', 'Write screenplay', 'Kịch bản phân cảnh.')
])

# Unit 9: Festivals Around the World
add('unit-g7-u9', 'Lễ hội muôn màu khắp năm châu', [
    ('Festival', '/ˈfestɪvl/', 'noun', 'Lễ hội văn hóa truyền thống', 'Festivals celebrate rich heritage.', 'Các lễ hội văn hóa là dịp tôn vinh di sản và bản sắc của mỗi dân tộc.', 'Traditional festival', 'Ngày hội tưng bừng.'),
    ('Carnival', '/ˈkɑːnɪvl/', 'noun', 'Lễ hội hóa trang đường phố', 'Vibrant Rio de Janeiro carnival.', 'Lễ hội hóa trang đường phố Rio de Janeiro rực rỡ vũ điệu Samba nóng bỏng.', 'Street carnival', 'Hóa trang diễu hành.'),
    ('Costume', '/ˈkɒstjuːm/', 'noun', 'Trang phục hóa trang lộng lẫy', 'Elaborate feather carnival costumes.', 'Những bộ trang phục hóa trang đính lông vũ lộng lẫy rực rỡ sắc màu.', 'Traditional costume', 'Lễ phục biểu diễn.'),
    ('Parade', '/pəˈreɪd/', 'noun', 'Cuộc diễu hành rước hội trên phố', 'Watch floral float street parades.', 'Hào hứng chiêm ngưỡng đoàn xe hoa diễu hành lộng lẫy trên khắp các đại lộ.', 'Street parade', 'Đoàn rước kiệu hoa.'),
    ('Lantern', '/ˈlæntən/', 'noun', 'Chiếc đèn lồng lung linh đêm hội', 'Floating river lanterns in Hoi An.', 'Thả những chiếc đèn lồng hoa đăng lung linh soi bóng nước sông Hoài.', 'Paper lantern', 'Đèn hoa đăng.'),
    ('Float', '/fləʊt/', 'noun', 'Xe hoa trang trí lộng lẫy diễu hành', 'Massive rose floats in parade.', 'Những cỗ xe hoa khổng lồ kết bằng hàng vạn đóa hồng khoe sắc thắm.', 'Floral float', 'Xe diễu hành.'),
    ('Tomato fight', '/təˈmɑːtəʊ faɪt/', 'noun', 'Đại chiến cà chua La Tomatina', 'Throw ripe tomatoes in Spain festival.', 'Ném những quả cà chua chín mọng trong lễ hội La Tomatina rực lửa Tây Ban Nha.', 'La Tomatina fight', 'Trận chiến cà chua vui vẻ.'),
    ('Water fight', '/ˈwɔːtər faɪt/', 'noun', 'Té nước cầu may Songkran', 'Splash water for luck at Songkran.', 'Té nước mát lành lên nhau để cầu chúc may mắn trong Tết Songkran Thái Lan.', 'Songkran water fight', 'Tết té nước may mắn.'),
    ('Sculpture', '/ˈskʌlptʃər/', 'noun', 'Tác phẩm điêu khắc băng tuyết', 'Giant ice sculptures in Harbin.', 'Những tác phẩm điêu khắc băng tuyết khổng lồ tráng lệ tại thành phố Cáp Nhĩ Tân.', 'Ice sculpture', 'Nghệ thuật tạc băng.'),
    ('Tulip', '/ˈtjuːlɪp/', 'noun', 'Hoa uất kim hương, hoa tuy-líp', 'Endless colorful fields of tulips.', 'Những cánh đồng hoa tuy-líp ngút ngàn rực rỡ sắc màu xứ sở Hà Lan.', 'Tulip festival', 'Loài hoa Hà Lan.'),
    ('Mid-Autumn', '/mɪd ˈɔːtəm/', 'noun', 'Tết Trung thu trăng rằm tháng Tám', 'Enjoy mooncakes at Mid-Autumn.', 'Thưởng thức bánh nướng bánh dẻo ngắm trăng tròn trong Tết Trung thu.', 'Mid-Autumn Festival', 'Rằm tháng Tám.'),
    ('Ghost', '/ɡəʊst/', 'noun', 'Hồn ma trong lễ hội Halloween', 'Dress as spooky ghosts on Halloween.', 'Hóa trang thành những hồn ma kỳ bí gõ cửa xin kẹo trong đêm Halloween.', 'Halloween ghost', 'Lễ hội bí ngô.')
], [
    ('Spectacle', '/ˈspektəkl/', 'noun', 'Cảnh tượng kỳ quan tráng lệ', 'A dazzling visual festival spectacle.', 'Một cảnh tượng lễ hội tráng lệ mãn nhãn làm rung động lòng người xem.', 'Grand spectacle', 'Cảnh tượng ngoạn mục.'),
    ('Spiritual', '/ˈspɪrɪtʃuəl/', 'adjective', 'Thuộc về tâm linh thiêng liêng', 'Sacred spiritual prayers for harmony.', 'Những lời nguyện cầu tâm linh thiêng liêng vì hòa bình và an lành nhân loại.', 'Spiritual meaning', 'Chiều sâu tín ngưỡng.'),
    ('Festive', '/ˈfestɪv/', 'adjective', 'Rộn ràng không khí lễ hội vui tươi', 'A warm joyful festive atmosphere.', 'Một bầu không khí rộn ràng tưng bừng ngập tràn niềm vui khắp các nẻo đường.', 'Festive atmosphere', 'Đậm chất lễ hội.'),
    ('Symbolize', '/ˈsɪmbəlaɪz/', 'verb', 'Tượng trưng, biểu trưng cho', 'Water splashes symbolize purification.', 'Những làn nước té lên người tượng trưng cho sự gột rửa và tái sinh may mắn.', 'Symbolize peace', 'Biểu tượng hóa.'),
    ('Generosity', '/ˌdʒenəˈrɒsəti/', 'noun', 'Lòng hào phóng sẻ chia quà tặng', 'Exchange gifts with warm generosity.', 'Trao tặng quà mừng với tất cả tấm lòng hào phóng và chân thành yêu thương.', 'Show generosity', 'Rộng rãi sẻ chia.'),
    ('Commemorate', '/kəˈmeməreɪt/', 'verb', 'Tưởng niệm công đức tổ tiên', 'Commemorate glorious historic heroes.', 'Trang trọng tưởng niệm công đức to lớn của các vị anh hùng dân tộc giữ nước.', 'Commemorate heroes', 'Tưởng nhớ tri ân.'),
    ('Ritual', '/ˈrɪtʃuəl/', 'noun', 'Nghi thức tế lễ truyền thống', 'Solemn ancient ancestral rituals.', 'Những nghi thức tế lễ tế thần uy nghiêm và cổ kính được lưu truyền ngàn năm.', 'Ancient ritual', 'Nghi thức phụng vụ.'),
    ('Thrilling', '/ˈθrɪlɪŋ/', 'adjective', 'Hồi hộp ly kỳ nghẹt thở', 'A thrilling bull running festival.', 'Lễ hội chạy đua cùng đàn bò tót đầy hồi hộp ly kỳ thót tim tại Tây Ban Nha.', 'Thrilling race', 'Kịch tính nghẹt thở.')
])

# Unit 10: Energy Sources
add('unit-g7-u10', 'Nguồn năng lượng & Bảo vệ tương lai', [
    ('Energy', '/ˈenədʒi/', 'noun', 'Năng lượng cho sự sống', 'Save energy for future generations.', 'Tiết kiệm nguồn năng lượng thiết yếu cho các thế hệ tương lai mai sau.', 'Source of energy', 'Nguồn lực sống.'),
    ('Source', '/sɔːs/', 'noun', 'Nguồn gốc, nguồn cung', 'Explore alternative power sources.', 'Khám phá và ứng dụng các nguồn năng lượng thay thế sạch cho địa cầu.', 'Energy source', 'Cội nguồn.'),
    ('Solar power', '/ˈsəʊlər ˈpaʊər/', 'noun', 'Điện năng mặt trời vô tận', 'Install rooftop solar power panels.', 'Lắp đặt những tấm pin quang điện mặt trời trên mái nhà để thắp sáng.', 'Rooftop solar', 'Năng lượng sạch.'),
    ('Wind power', '/wɪnd ˈpaʊər/', 'noun', 'Phong điện từ cối xay gió', 'Giant wind power turbines offshore.', 'Những trụ turbine phong điện khổng lồ ngoài khơi đón gió biển lộng.', 'Wind turbine power', 'Năng lượng gió mát.'),
    ('Hydro power', '/ˈhaɪdrəʊ ˈpaʊər/', 'noun', 'Thủy điện từ dòng nước xiết', 'Generate electricity with hydro power.', 'Khai thác thủy điện từ những dòng thác nước cuồn cuộn chảy qua đập.', 'Hydroelectric dam', 'Điện từ sức nước.'),
    ('Nuclear power', '/ˈnjuːkliər ˈpaʊər/', 'noun', 'Năng lượng hạt nhân nguyên tử', 'Controversy over nuclear power plants.', 'Những tranh luận về độ an toàn của các nhà máy điện hạt nhân nguyên tử.', 'Nuclear power plant', 'Năng lượng hạt nhân.'),
    ('Fossil fuel', '/ˈfɒsl fjuːəl/', 'noun', 'Nhiên liệu hóa thạch gây hại', 'Burning fossil fuels pollutes the air.', 'Việc đốt cháy nhiên liệu hóa thạch than dầu đang làm ô nhiễm bầu khí quyển.', 'Burn fossil fuel', 'Than đá, dầu mỏ.'),
    ('Coal', '/kəʊl/', 'noun', 'Than đá trong lòng đất', 'Heavy thermal reliance on black coal.', 'Sự phụ thuộc vào nhiệt điện đốt than đá đen cần phải được giảm thiểu.', 'Coal mining', 'Nhiên liệu rắn.'),
    ('Oil', '/ɔɪl/', 'noun', 'Dầu mỏ thô tài nguyên', 'Drill offshore wells for crude oil.', 'Khoan thăm dò các giàn khoan ngoài khơi để khai thác dầu mỏ quý giá.', 'Crude oil', 'Dầu thô.'),
    ('Natural gas', '/ˈnætʃrəl ɡæs/', 'noun', 'Khí đốt thiên nhiên sạch hơn', 'Use natural gas for cooking heating.', 'Sử dụng khí đốt thiên nhiên để đun nấu và sưởi ấm trong mùa đông.', 'Clean natural gas', 'Khí tự nhiên.'),
    ('Renewable', '/rɪˈnjuːəbl/', 'adjective', 'Có thể tái tạo liên tục', 'Wind and solar are renewable sources.', 'Gió và ánh sáng mặt trời là các nguồn năng lượng sạch có thể tái tạo mãi.', 'Renewable energy', 'Không bao giờ cạn.'),
    ('Non-renewable', '/ˌnɒn rɪˈnjuːəbl/', 'adjective', 'Không thể tái tạo, hữu hạn', 'Fossil fuels are non-renewable assets.', 'Nhiên liệu hóa thạch là nguồn tài nguyên hữu hạn không thể tái tạo lại.', 'Non-renewable resource', 'Sẽ cạn kiệt.')
], [
    ('Carbon footprint', '/ˌkɑːbən ˈfʊtprɪnt/', 'noun', 'Dấu chân các-bon phát thải', 'Reduce personal daily carbon footprint.', 'Chung tay giảm bớt dấu chân các-bon phát thải qua việc đi bộ đi xe đạp.', 'Reduce carbon footprint', 'Lượng phát thải CO2.'),
    ('Exhaustible', '/ɪɡˈzɔːstəbl/', 'adjective', 'Có thể bị cạn kiệt hoàn toàn', 'Petroleum is an exhaustible resource.', 'Dầu mỏ là nguồn tài nguyên có hạn có thể bị cạn kiệt hoàn toàn trong tương lai.', 'Exhaustible reserves', 'Sẽ hết sạch.'),
    ('Inexhaustible', '/ˌɪnɪɡˈzɔːstəbl/', 'adjective', 'Vô tận, không bao giờ cạn', 'Sunlight is an inexhaustible energy.', 'Ánh sáng mặt trời là nguồn năng lượng vô tận không bao giờ cạn kiệt.', 'Inexhaustible supply', 'Bất tận.'),
    ('Greenhouse gas', '/ˈɡriːnhaʊs ɡæs/', 'noun', 'Khí nhà kính gây nóng lên toàn cầu', 'Trap heat with excess greenhouse gases.', 'Lớp khí nhà kính dư thừa giữ lại nhiệt lượng làm trái đất ấm dần lên.', 'Greenhouse emissions', 'Khí CO2, Methane.'),
    ('Global warming', '/ˌɡləʊbl ˈwɔːmɪŋ/', 'noun', 'Hiện tượng nóng lên toàn cầu', 'Combat dangerous global warming trends.', 'Hành động cấp bách để ngăn chặn hiện tượng nóng lên toàn cầu và biến đổi khí hậu.', 'Stop global warming', 'Trái đất ấm lên.'),
    ('Turbine', '/ˈtɜːbaɪn/', 'noun', 'Tua-bin quay phát điện', 'Wind spins the massive turbine blades.', 'Những luồng gió mạnh quay đều những cánh tua-bin khổng lồ để phát điện.', 'Wind turbine blade', 'Guồng quay máy phát.'),
    ('Geothermal', '/ˌdʒiːəʊˈθɜːml/', 'adjective', 'Thuộc về địa nhiệt lòng đất', 'Harness clean underground geothermal heat.', 'Khai thác nguồn địa nhiệt tự nhiên sạch từ sâu thẳm trong lòng nham thạch.', 'Geothermal energy', 'Nhiệt trong lòng đất.'),
    ('Conservation', '/ˌkɒnsəˈveɪʃn/', 'noun', 'Sự bảo tồn và tiết kiệm năng lượng', 'Energy conservation in every household.', 'Ý thức tiết kiệm và bảo tồn năng lượng trong mỗi nếp nhà gia đình.', 'Energy conservation', 'Sử dụng hiệu quả.')
])

print("vocab_grade7.py loaded with 10 units")
