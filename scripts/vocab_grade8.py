# -*- coding: utf-8 -*-
# Grade 8 Vocabulary: 10 units, 20-22 words each
G8_UNITS = {}

def add(uid, topic, core, adv):
    res = []
    for i, t in enumerate(core, 1):
        res.append({
            "id": f"{uid}-w{i}", "word": t[0], "ipa": t[1], "partOfSpeech": t[2],
            "meaningVi": t[3], "exampleEn": t[4], "exampleVi": t[5],
            "isCore": True, "unitId": uid, "grade": 8, "topic": topic,
            "collocation": t[6], "examNote": t[7]
        })
    start = len(core) + 1
    for i, t in enumerate(adv, start):
        res.append({
            "id": f"{uid}-w{i}", "word": t[0], "ipa": t[1], "partOfSpeech": t[2],
            "meaningVi": t[3], "exampleEn": t[4], "exampleVi": t[5],
            "isCore": False, "unitId": uid, "grade": 8, "topic": topic,
            "collocation": t[6], "examNote": t[7]
        })
    G8_UNITS[uid] = res

# Unit 1: Leisure Time
add('unit-g8-u1', 'Thời gian rảnh rỗi & Đời sống tinh thần', [
    ('Leisure activity', '/ˈleʒər ækˈtɪvəti/', 'noun', 'Hoạt động thư giãn lúc rảnh rỗi', 'Engage in wholesome leisure activities.', 'Tham gia vào các hoạt động giải trí lành mạnh để tái tạo sức lao động.', 'Leisure pursuit', 'Giải trí thời gian rỗi.'),
    ('Origami', '/ˌɒrɪˈɡɑːmi/', 'noun', 'Nghệ thuật gấp giấy Nhật Bản', 'Fold intricate shapes with origami.', 'Gấp những mô hình hình học tinh xảo và độc đáo bằng nghệ thuật origami.', 'Paper origami', 'Gấp giấy tỉ mỉ.'),
    ('DIY', '/ˌdiː aɪ ˈwaɪ/', 'noun / adjective', 'Tự tay làm đồ thủ công (Do It Yourself)', 'Craft furniture through creative DIY projects.', 'Tự tay đóng bàn ghế trang trí phòng qua các dự án DIY sáng tạo.', 'DIY project', 'Tự làm đồ dùng.'),
    ('Bead', '/biːd/', 'noun', 'Hạt cườm lấp lánh làm vòng', 'String colorful beads into bracelets.', 'Xâu những hạt cườm lấp lánh đủ màu thành chiếc vòng tay tình bạn xinh xắn.', 'Glass beads', 'Hạt xâu vòng.'),
    ('Knitting', '/ˈnɪtɪŋ/', 'noun', 'Đan len ấm mùa đông', 'Knitting warm woollen scarves for winter.', 'Tỉ mẩn đan những chiếc khăn len ấm áp chuẩn bị cho mùa đông giá lạnh.', 'Wool knitting', 'Đan lát len.'),
    ('Window shopping', '/ˈwɪndəʊ ˈʃɒpɪŋ/', 'noun', 'Đi ngắm đồ trưng bày mà không mua', 'Enjoy relaxing window shopping at mall.', 'Thong dong đi dạo ngắm nghía các tủ kính trưng bày trong trung tâm thương mại.', 'Go window shopping', 'Ngắm phố hàng.'),
    ('Hang out', '/hæŋ aʊt/', 'phrase', 'Đi chơi la cà cùng bè bạn', 'Hang out with close friends in cafes.', 'Hẹn hò đi chơi la cà chuyện trò cùng bạn thân tại những quán cà phê quen.', 'Hang out with friends', 'Tụ họp thư giãn.'),
    ('Addicted to', '/əˈdɪktɪd tuː/', 'adjective', 'Bị nghiện, mê mẩn quá mức', 'Avoid being addicted to social media.', 'Tránh để bản thân bị nghiện quá mức vào các nền tảng mạng xã hội ảo.', 'Addicted to games', 'Lệ thuộc có hại.'),
    ('Hooked on', '/hʊkt ɒn/', 'adjective', 'Say mê say đắm một thú vui', 'Hooked on reading mystery novels.', 'Hoàn toàn say mê cuốn theo từng trang truyện trinh thám ly kỳ hấp dẫn.', 'Hooked on books', 'Thích mê mệt.'),
    ('Fond of', '/fɒnd əv/', 'adjective', 'Yêu thích, tha thiết với', 'Fond of playing folk board games.', 'Rất tha thiết yêu thích việc chơi các trò cờ bàn dân gian cùng gia đình.', 'Fond of sports', 'Ưa chuộng.'),
    ('Keen on', '/kiːn ɒn/', 'adjective', 'Hào hứng, say sưa với', 'Keen on learning foreign languages.', 'Vô cùng hào hứng và say sưa trau dồi các ngoại ngữ mới mỗi ngày.', 'Keen on learning', 'Nhiệt tình muốn làm.'),
    ('Crazy about', '/ˈkreɪzi əˈbaʊt/', 'adjective', 'Cuồng nhiệt, say mê cuồng si', 'Crazy about K-pop dance choreography.', 'Cực kỳ cuồng nhiệt và say mê tập theo các bài vũ đạo K-pop sôi động.', 'Crazy about music', 'Đam mê cháy bỏng.')
], [
    ('Recreation', '/ˌrekriˈeɪʃn/', 'noun', 'Sự giải trí tái tạo năng lượng', 'Recreation centers offer swimming and chess.', 'Các trung tâm giải trí cung cấp hồ bơi và câu lạc bộ cờ cho thanh thiếu niên.', 'Recreation center', 'Phục hồi thể lực.'),
    ('Fascinate', '/ˈfæsɪneɪt/', 'verb', 'Mê hoặc, cuốn hút mãnh liệt', 'Astronomy fascinates curious young minds.', 'Ngành thiên văn học luôn mê hoặc và cuốn hút những tâm hồn trẻ thơ tò mò.', 'Fascinate audience', 'Làm say đắm.'),
    ('Detox', '/ˈdiːtɒks/', 'noun / verb', 'Thanh lọc cơ thể và tâm trí', 'A digital detox weekend without phones.', 'Một kỳ nghỉ cuối tuần thanh lọc kỹ thuật số hoàn toàn không điện thoại.', 'Digital detox', 'Cai màn hình ảo.'),
    ('Productive', '/prəˈdʌktɪv/', 'adjective', 'Năng suất, hữu ích và hiệu quả', 'Spend leisure time productively on reading.', 'Sử dụng thời gian rỗi một cách năng suất và hữu ích bằng việc đọc sách.', 'Productive hobby', 'Mang lại thành quả.'),
    ('Mindfulness', '/ˈmaɪndflnəs/', 'noun', 'Chánh niệm, sự tĩnh tại trong tâm', 'Practice mindfulness through meditation.', 'Thực hành chánh niệm và lắng đọng tâm trí qua các bài tập thiền thở sâu.', 'Practice mindfulness', 'Tĩnh tâm tỉnh thức.'),
    ('Pursuit', '/pəˈsjuːt/', 'noun', 'Sự theo đuổi đam mê lâu dài', 'Artistic pursuits bring lifelong joy.', 'Những đam mê nghệ thuật chân chính mang lại niềm hoan ca suốt cả cuộc đời.', 'Artistic pursuit', 'Mục tiêu theo đuổi.'),
    ('Satisfying', '/ˈsætɪsfaɪɪŋ/', 'adjective', 'Đem lại sự thỏa nguyện sâu sắc', 'Building wooden models is satisfying.', 'Tự tay hoàn thiện một mô hình tàu chiến bằng gỗ đem lại sự thỏa nguyện lớn.', 'Satisfying result', 'Vừa lòng toại nguyện.'),
    ('Balance', '/ˈbæləns/', 'noun / verb', 'Sự cân bằng giữa học và chơi', 'Strike a healthy balance in daily life.', 'Thiết lập một sự cân bằng lành mạnh giữa giờ học tập căng thẳng và vui chơi.', 'Work-life balance', 'Cân bằng hài hòa.')
])

# Unit 2: Life in the Countryside
add('unit-g8-u2', 'Cuộc sống miền quê & Vụ mùa bội thu', [
    ('Harvest', '/ˈhɑːvɪst/', 'noun / verb', 'Vụ mùa thu hoạch, gặt hái lúa', 'Bumper golden rice harvest.', 'Một vụ mùa thu hoạch lúa vàng óng ả bội thu nụ cười rạng rỡ của nhà nông.', 'Harvest season', 'Mùa gặt hái.'),
    ('Crop', '/krɒp/', 'noun', 'Mùa màng hoa màu cây trái', 'Bountiful food crops in river delta.', 'Mùa màng hoa màu trĩu hạt bội thu nơi đồng bằng châu thổ màu mỡ.', 'Cash crops', 'Nông sản hoa màu.'),
    ('Paddy field', '/ˈpædi fiːld/', 'noun', 'Cánh đồng lúa nước mênh mông', 'Green stretching paddy fields.', 'Những cánh đồng lúa nước bát ngát mênh mông thẳng cánh cò bay tuyệt đẹp.', 'Lush paddy field', 'Ruộng lúa nước.'),
    ('Pasture', '/ˈpɑːstʃər/', 'noun', 'Đồng cỏ xanh chăn thả gia súc', 'Cattle graze on vast highland pastures.', 'Đàn bò sữa ung dung gặm cỏ trên những đồng cỏ cao nguyên lộng gió bát ngát.', 'Green pasture', 'Bãi chăn thả.'),
    ('Cattle', '/ˈkætl/', 'noun', 'Gia súc lớn (trâu, bò, ngựa)', 'Herd cattle back to farm at sunset.', 'Lùa đàn trâu bò gia súc thong dong trở về chuồng trại khi bóng hoàng hôn buông.', 'Raise cattle', 'Danh từ số nhiều.'),
    ('Combine harvester', '/kəmˈbaɪn ˈhɑːvɪstər/', 'noun', 'Máy gặt đập liên hợp hiện đại', 'Modern combine harvester speeds harvest.', 'Chiếc máy gặt đập liên hợp hiện đại giúp việc thu hoạch lúa nhanh chóng hơn.', 'Modern harvester', 'Cơ giới hóa nông nghiệp.'),
    ('Dry the rice', '/draɪ ðə raɪs/', 'phrase', 'Phơi thóc vàng trên sân gạch', 'Dry the golden rice under hot sun.', 'Tranh thủ phơi những mẻ thóc vàng óng ả dưới ánh nắng gắt mùa hạ giòn tan.', 'Dry rice on yard', 'Hong phơi lúa.'),
    ('Canal', '/kəˈnæl/', 'noun', 'Kênh rạch dẫn nước tưới tiêu', 'Irrigation canal waters the fields.', 'Hệ thống kênh rạch thủy lợi dẫn dòng nước mát tưới tắm cho muôn ngàn thửa ruộng.', 'Irrigation canal', 'Mương dẫn nước.'),
    ('Orchard', '/ˈɔːtʃəd/', 'noun', 'Vườn cây ăn trái xum xuê', 'Fruit orchards laden with ripe mangoes.', 'Những vườn cây ăn trái trĩu quả thơm lừng với những chùm xoài chín mọng ngọt lịm.', 'Fruit orchard', 'Vườn cây trái.'),
    ('Hospitable', '/hɒˈspɪtəbl/', 'adjective', 'Hiếu khách, nồng hậu chân thành', 'Country folk are warm and hospitable.', 'Người dân quê mộc mạc luôn nồng hậu và chân thành mở rộng lòng đón khách quý.', 'Warm and hospitable', 'Mến khách.'),
    ('Vast', '/vɑːst/', 'adjective', 'Bao la, bát ngát không cùng', 'A vast expanse of golden fields.', 'Một khoảng không gian bao la bát ngát của những cánh đồng lúa chín vàng ươm.', 'Vast landscape', 'Rộng lớn khôn cùng.'),
    ('Peaceful', '/ˈpiːsfl/', 'adjective', 'Thanh bình, êm ả không khói bụi', 'Enjoy peaceful village mornings.', 'Tận hưởng những buổi ban mai thôn quê thanh bình không chút khói bụi ồn ào.', 'Peaceful morning', 'Tĩnh lặng yên ả.')
], [
    ('Cultivate', '/ˈkʌltɪveɪt/', 'verb', 'Canh tác, vun trồng đất đai', 'Cultivate organic vegetables sustainably.', 'Canh tác rau củ quả hữu cơ theo phương thức bền vững an toàn cho đất mẹ.', 'Cultivate crops', 'Gieo trồng chăm bón.'),
    ('Fertile', '/ˈfɜːtaɪl/', 'adjective', 'Màu mỡ, phì nhiêu đất phù sa', 'Fertile alluvial soil deposited by floods.', 'Lớp đất phù sa màu mỡ phì nhiêu được bồi đắp sau mỗi mùa lũ đỏ nặng phù sa.', 'Fertile soil', 'Đất tốt tươi.'),
    ('Abundant', '/əˈbʌndənt/', 'adjective', 'Dồi dào, trù phú sung túc', 'Abundant freshwater fish in rivers.', 'Nguồn tôm cá nước ngọt dồi dào trù phú trên những con sông hiền hòa miền Tây.', 'Abundant harvest', 'Dư dả phong phú.'),
    ('Picturesque', '/ˌpɪktʃəˈresk/', 'adjective', 'Đẹp như tranh họa đồ', 'A picturesque river village at dusk.', 'Một ngôi làng ven sông đẹp như tranh họa đồ trong buổi chiều tà bảng lảng khói lam.', 'Picturesque village', 'Cảnh sắc nên thơ.'),
    ('Folk dance', '/fəʊk dɑːns/', 'noun', 'Điệu múa dân gian mừng mùa', 'Perform traditional harvest folk dances.', 'Biểu diễn những điệu múa xòe dân gian rộn ràng mừng ngày mùa lúa mới bội thu.', 'Joyful folk dance', 'Vũ điệu truyền thống.'),
    ('Tranquil', '/ˈtræŋkwɪl/', 'adjective', 'Tĩnh lặng, an nhiên không gợn sóng', 'A tranquil bamboo-lined river path.', 'Một lối đi ven sông rợp bóng lũy tre làng xanh mát tĩnh lặng không gợn sóng.', 'Tranquil scenery', 'Thanh thản êm đềm.'),
    ('Communal', '/kəˈmjuːnl/', 'adjective', 'Mang tính gắn kết cộng đồng làng xã', 'Strong communal spirit during harvest.', 'Tinh thần gắn kết cộng đồng làng xóm bền chặt tối lửa tắt đèn có nhau khi vào vụ.', 'Communal house', 'Tập thể tương trợ.'),
    ('Bounty', '/ˈbaʊnti/', 'noun', 'Hoa lợi dồi dào thiên nhiên ban tặng', 'Grateful for natural earth bounty.', 'Biết ơn những hoa thơm trái ngọt dồi dào mà đất mẹ thiên nhiên đã hào phóng ban tặng.', 'Earthly bounty', 'Quà tặng đất trời.')
])

# Unit 3: Teenagers & Challenges
add('unit-g8-u3', 'Tuổi dậy thì & Vượt qua áp lực', [
    ('Teenager', '/ˈtiːneɪdʒər/', 'noun', 'Thanh thiếu niên (13-19 tuổi)', 'Modern teenagers face peer challenges.', 'Thanh thiếu niên ngày nay phải đối mặt với nhiều thách thức từ môi trường học đường.', 'Teenage years', 'Lứa tuổi thanh xuân.'),
    ('Peer pressure', '/ˈpɪə preʃər/', 'noun', 'Áp lực đồng trang lứa', 'Resist harmful peer pressure calmly.', 'Bản lĩnh khéo léo vượt qua áp lực từ các bạn đồng trang lứa một cách bình tĩnh.', 'Cope with peer pressure', 'Áp lực từ bạn bè.'),
    ('Expectation', '/ˌekspekˈteɪʃn/', 'noun', 'Sự kỳ vọng của gia đình', 'Meet high parental expectations.', 'Đáp ứng những sự kỳ vọng lớn lao của cha mẹ mà không tự gây căng thẳng quá mức.', 'High expectations', 'Sự trông đợi.'),
    ('Bully', '/ˈbʊli/', 'verb / noun', 'Bắt nạt, kẻ bắt nạt học đường', 'Report cyber bullies to teachers.', 'Mạnh dạn báo cáo ngay những hành vi bắt nạt trên không gian mạng cho thầy cô.', 'School bully', 'Hành vi bạo lực học đường.'),
    ('Cyberbullying', '/ˈsaɪbəbʊliɪŋ/', 'noun', 'Bắt nạt qua mạng xã hội', 'Stand united against cyberbullying.', 'Chung tay kiên quyết nói không và đẩy lùi vấn nạn bắt nạt bạo lực qua mạng ảo.', 'Stop cyberbullying', 'Bắt nạt online.'),
    ('Counselor', '/ˈkaʊnsələr/', 'noun', 'Chuyên gia tư vấn tâm lý học đường', 'Confide in school psychological counselor.', 'Mở lòng tâm sự trút bỏ muộn phiền với chuyên gia tư vấn tâm lý học đường của trường.', 'School counselor', 'Người tư vấn.'),
    ('Stress', '/stres/', 'noun', 'Sự căng thẳng tinh thần', 'Manage exam stress with sports.', 'Giải tỏa bớt sự căng thẳng mùa thi cử bằng các môn thể thao vận động ra mồ hôi.', 'Under stress', 'Áp lực tâm lý.'),
    ('Depressed', '/dɪˈprest/', 'adjective', 'Rơi vào trầm cảm ủ rũ', 'Do not feel depressed alone.', 'Đừng bao giờ gặm nhấm nỗi buồn một mình để rồi rơi vào trạng thái trầm cảm u uất.', 'Feel depressed', 'Trầm uất buồn bã.'),
    ('Forum', '/ˈfɔːrəm/', 'noun', 'Diễn đàn chia sẻ tâm tư', 'Share advice on teen online forums.', 'Sẻ chia những lời khuyên hữu ích trên các diễn đàn trao đổi tâm tư của tuổi mới lớn.', 'Youth forum', 'Không gian thảo luận.'),
    ('Club', '/klʌb/', 'noun', 'Câu lạc bộ sở thích năng khiếu', 'Join the school debate and drama club.', 'Tự tin ghi danh tham gia câu lạc bộ tranh biện và kịch nghệ sôi nổi của trường.', 'Join a club', 'Hội nhóm sinh hoạt.'),
    ('Confidence', '/ˈkɒnfɪdəns/', 'noun', 'Sự tự tin vững vàng bản lĩnh', 'Build solid self-confidence through action.', 'Xây dựng sự tự tin vững vàng từ những hành động nỗ lực nhỏ bé mỗi ngày.', 'Self-confidence', 'Tin vào chính mình.'),
    ('Overcome', '/ˌəʊvəˈkʌm/', 'verb', 'Vượt qua chông gai khó khăn', 'Overcome adolescent hurdles bravely.', 'Dũng cảm vượt qua những chông gai thử thách của giai đoạn trưởng thành tuổi mới lớn.', 'Overcome difficulty', 'Chiến thắng nghịch cảnh.')
], [
    ('Resilience', '/rɪˈzɪliəns/', 'noun', 'Khả năng kiên cường phục hồi', 'Emotional resilience helps bounce back.', 'Nội lực kiên cường phục hồi cảm xúc giúp ta đứng dậy vững chãi sau mỗi lần vấp ngã.', 'Mental resilience', 'Bản lĩnh thép.'),
    ('Empathy', '/ˈempəθi/', 'noun', 'Sự thấu cảm, lòng trắc ẩn', 'Listen to peers with genuine empathy.', 'Lắng nghe bạn bè bằng sự thấu cảm chân thành từ tận đáy lòng không phán xét.', 'Show deep empathy', 'Đặt mình vào người khác.'),
    ('Self-esteem', '/ˌself ɪˈstiːm/', 'noun', 'Lòng tự trọng, tự hào bản thân', 'Boost positive self-esteem and worth.', 'Nâng cao lòng tự trọng và nhận thức đúng đắn về giá trị nội tại của bản thân.', 'High self-esteem', 'Tôn trọng chính mình.'),
    ('Prioritize', '/praɪˈɒrətaɪz/', 'verb', 'Ưu tiên việc trọng yếu trước', 'Prioritize sleep and mental peace.', 'Luôn ưu tiên giấc ngủ ngon và sự bình an trong tâm hồn trước mọi bài tập dồn dập.', 'Prioritize tasks', 'Sắp xếp việc quan trọng.'),
    ('Overwhelmed', '/ˌəʊvəˈwelmd/', 'adjective', 'Cảm thấy quá tải ngột ngạt', 'Feel overwhelmed by exam schedules.', 'Cảm thấy bị quá tải và ngột ngạt trước lịch thi cử dày đặc cần được nghỉ ngơi.', 'Feel overwhelmed', 'Chìm ngập trong lo âu.'),
    ('Guidance', '/ˈɡaɪdns/', 'noun', 'Sự định hướng dìu dắt từ thầy cô', 'Seek wise guidance from trusted mentors.', 'Tìm kiếm sự định hướng đúng đắn và soi sáng từ những người thầy người cô đáng tin cậy.', 'Wise guidance', 'Chỉ đường dẫn lối.'),
    ('Temptation', '/tempˈteɪʃn/', 'noun', 'Sự cám dỗ phù phiếm bên ngoài', 'Resist negative teenage temptations.', 'Bản lĩnh khước từ những sự cám dỗ phù phiếm có hại cho tương lai của tuổi trẻ.', 'Resist temptation', 'Mồi nhử cám dỗ.'),
    ('Maturity', '/məˈtʃʊərəti/', 'noun', 'Sự chín chắn, trưởng thành', 'Grow into emotional and mental maturity.', 'Từng bước trưởng thành và đạt tới sự chín chắn trong suy nghĩ và hành động.', 'Reach maturity', 'Độ chín tâm lý.')
])

# Unit 4: Ethnic Groups of Vietnam
add('unit-g8-u4', '54 Dân tộc anh em trên đất Việt', [
    ('Ethnic minority', '/ˌeθnɪk maɪˈnɒrəti/', 'noun', 'Đồng bào dân tộc thiểu số', 'Fifty-three ethnic minorities in Vietnam.', 'Năm mươi ba dân tộc thiểu số cùng chung sống chan hòa trên dải đất hình chữ S.', 'Ethnic minority group', 'Bản sắc đa văn hóa.'),
    ('Costume', '/ˈkɒstjuːm/', 'noun', 'Bộ trang phục truyền thống', 'Intricate brocade ethnic costumes.', 'Những bộ trang phục truyền thống thêu thổ cẩm tinh xảo của các cô gái vùng cao.', 'Traditional costume', 'Trang phục dân tộc.'),
    ('Brocade', '/brəˈkeɪd/', 'noun', 'Vải thổ cẩm dệt tay rực rỡ', 'Weave colorful patterns on brocade.', 'Đôi bàn tay khéo léo dệt nên những hoa văn muôn màu rực rỡ trên tấm vải thổ cẩm.', 'Brocade weaving', 'Vải dệt hoa văn.'),
    ('Stilt house', '/stɪlt haʊs/', 'noun', 'Ngôi nhà sàn gỗ thoáng mát', 'Live in wooden stilt houses on hills.', 'Sinh sống trong những ngôi nhà sàn bằng gỗ cao ráo thoáng mát bên sườn non.', 'Traditional stilt house', 'Nhà sàn vùng cao.'),
    ('Communal house', '/kəˌmjuːnl ˈhaʊs/', 'noun', 'Nhà Rông Tây Nguyên sừng sững', 'Gather in tall communal Rong house.', 'Họp bàn việc buôn làng bên bếp lửa trong ngôi nhà Rông sừng sững vút lên trời xanh.', 'Rong communal house', 'Nhà Rông truyền thống.'),
    ('Terraced field', '/ˈterəst fiːld/', 'noun', 'Ruộng bậc thang uốn lượn', 'Golden terraced fields of Mu Cang Chai.', 'Những thửa ruộng bậc thang vàng rực uốn lượn tuyệt mỹ tại danh thắng Mù Cang Chải.', 'Stunning terraced field', 'Kỳ quan lúa nước.'),
    ('Folk dance', '/fəʊk dɑːns/', 'noun', 'Điệu múa xòe, múa sạp dân gian', 'Dance around fire with bamboo sticks.', 'Múa sạp nhịp nhàng gõ thanh tre vui tai quanh ánh lửa bập bùng đêm hội vùng cao.', 'Bamboo folk dance', 'Vũ điệu dân gian.'),
    ('Musical instrument', '/ˈmjuːzɪkl ˈɪnstrəmənt/', 'noun', 'Nhạc cụ dân tộc độc đáo', 'The T-rung bamboo musical instrument.', 'Đàn Tơ-rưng bằng ống nứa phát ra những thanh âm trong trẻo như tiếng suối ngàn reo.', 'Traditional instrument', 'Đàn đá, cồng chiêng.'),
    ('Festival', '/ˈfestɪvl/', 'noun', 'Lễ hội cồng chiêng, cầu mùa', 'Gong festival echoes through forests.', 'Âm vang lễ hội cồng chiêng Tây Nguyên rộn rã ngân vang khắp đại ngàn hùng vĩ.', 'Gong festival', 'Ngày hội buôn làng.'),
    ('Heritage', '/ˈherɪtɪdʒ/', 'noun', 'Di sản văn hóa phi vật thể', 'Space of Gong culture is world heritage.', 'Không gian văn hóa Cồng chiêng Tây Nguyên là kiệt tác di sản truyền khẩu nhân loại.', 'Intangible heritage', 'Kho báu cha ông.'),
    ('Custom', '/ˈkʌstəm/', 'noun', 'Tập quán, phong tục lâu đời', 'Ancient wedding customs of ethnic groups.', 'Những phong tục cưới hỏi truyền thống lâu đời độc đáo của các dân tộc anh em.', 'Local custom', 'Nếp sống cổ truyền.'),
    ('Diversity', '/daɪˈvɜːsəti/', 'noun', 'Sự đa dạng văn hóa giàu bản sắc', 'Rich cultural diversity of Vietnam.', 'Sự đa dạng văn hóa rực rỡ và giàu bản sắc nhân văn sâu sắc của đất nước Việt Nam.', 'Cultural diversity', 'Đa dạng sắc thái.')
], [
    ('Indigenous', '/ɪnˈdɪdʒənəs/', 'adjective', 'Bản địa ngàn đời sinh sống', 'Indigenous agricultural knowledge.', 'Kho tàng tri thức nông nghiệp dân gian bản địa vô giá được truyền từ ngàn đời.', 'Indigenous people', 'Gốc bản địa.'),
    ('Craftsmanship', '/ˈkrɑːftsmənʃɪp/', 'noun', 'Tay nghề thủ công tài hoa', 'Admire silver jewelry craftsmanship.', 'Khâm phục tay nghề chế tác trang sức bạc tinh xảo tài hoa của các nghệ nhân H’Mông.', 'Skilled craftsmanship', 'Bàn tay vàng.'),
    ('Solidarity', '/ˌsɒlɪˈdærəti/', 'noun', 'Khối đại đoàn kết toàn dân tộc', 'Unbreakable national ethnic solidarity.', 'Khối đại đoàn kết toàn dân tộc keo sơn vững bền như dãy Trường Sơn không gì lay chuyển.', 'Great solidarity', 'Gắn kết một lòng.'),
    ('Preservation', '/ˌprezəˈveɪʃn/', 'noun', 'Sự bảo tồn tiếng nói chữ viết', 'Preservation of indigenous languages.', 'Công tác bảo tồn và trao truyền tiếng nói chữ viết của các đồng bào cho lớp trẻ.', 'Language preservation', 'Gìn giữ cội nguồn.'),
    ('Resonance', '/ˈrezənəns/', 'noun', 'Âm vang ngân vang trầm bổng', 'Deep metallic resonance of bronze gongs.', 'Độ âm vang trầm bổng linh thiêng của những chiếc cồng chiêng bằng đồng cổ đại.', 'Acoustic resonance', 'Âm hưởng lan tỏa.'),
    ('Ancestral', '/ænˈsestrəl/', 'adjective', 'Thuộc về tổ tiên truyền lại', 'Sacred ancestral spiritual rituals.', 'Những nghi lễ thờ cúng tổ tiên thiêng liêng răn dạy con cháu ghi nhớ cội nguồn.', 'Ancestral worship', 'Tiền nhân.'),
    ('Distinctive', '/dɪˈstɪŋktɪv/', 'adjective', 'Độc đáo, mang nét đặc trưng riêng', 'Each ethnic group has distinctive styles.', 'Mỗi một dân tộc anh em đều sở hữu những phong cách kiến trúc và trang phục đặc trưng riêng.', 'Distinctive feature', 'Dấu ấn độc nhất.'),
    ('Hospitality', '/ˌhɒspɪˈtæləti/', 'noun', 'Lòng mến khách nồng hậu chân tình', 'Experience sincere highland hospitality.', 'Trải nghiệm tấm lòng mến khách chân tình, nồng hậu và ấm áp của đồng bào vùng cao.', 'Warm hospitality', 'Đãi khách chu đáo.')
])

# Unit 5: Customs and Traditions
add('unit-g8-u5', 'Phong tục tập quán & Đạo lý truyền thống', [
    ('Tradition', '/trəˈdɪʃn/', 'noun', 'Truyền thống tốt đẹp của dân tộc', 'Hand down noble traditions to youth.', 'Trao truyền những truyền thống đạo lý tốt đẹp của cha ông cho thế hệ tương lai.', 'National tradition', 'Nét đẹp lưu truyền.'),
    ('Custom', '/ˈkʌstəm/', 'noun', 'Phong tục tập quán quen thuộc', 'Follow the local New Year customs.', 'Tuân theo các phong tục tập quán đón chào năm mới của quê hương.', 'Local custom', 'Thói quen xã hội.'),
    ('Generation', '/ˌdʒenəˈreɪʃn/', 'noun', 'Thế hệ con cháu nối tiếp', 'Bridge gaps between three generations.', 'Gắn kết yêu thương và sẻ chia giữa ba thế hệ ông bà, cha mẹ và con cái dưới một mái nhà.', 'Older generation', 'Lớp người.'),
    ('Respect', '/rɪˈspekt/', 'noun / verb', 'Lòng tôn kính đối với bề trên', 'Show utmost respect to grandparents.', 'Bày tỏ lòng tôn kính và hiếu thảo sâu sắc đối với ông bà tổ tiên.', 'Show deep respect', 'Kính trọng.'),
    ('Elderly', '/ˈeldəli/', 'noun / adjective', 'Bậc cao niên trong gia đình', 'Care gently for the elderly at home.', 'Chăm sóc ân cần, chu đáo và hiếu thuận với các bậc cao niên trong gia đình.', 'Respect the elderly', 'Người già cả.'),
    ('Ancestor', '/ˈænsestər/', 'noun', 'Tổ tiên tiền nhân đã khuất', 'Worship ancestors on memorial days.', 'Thành kính dâng hương tưởng nhớ tổ tiên vào những ngày giỗ chạp thiêng liêng.', 'Ancestor worship', 'Cội nguồn dòng tộc.'),
    ('Worship', '/ˈwɜːʃɪp/', 'verb / noun', 'Thờ phụng, cúng giỗ trang nghiêm', 'Ancestor worship is a core value.', 'Tục lệ thờ cúng tổ tiên là giá trị đạo đức cốt lõi trong tâm thức người Việt.', 'Worship ancestors', 'Tín ngưỡng phụng thờ.'),
    ('Manners', '/ˈmænəz/', 'noun', 'Lễ nghi, phép tắc ăn uống cư xử', 'Good table manners during family meals.', 'Giữ gìn lễ nghi và phép tắc ăn uống lịch sự trên mâm cơm gia đình truyền thống.', 'Table manners', 'Luôn dùng số nhiều.'),
    ('Table manners', '/ˈteɪbl ˈmænəz/', 'noun', 'Phép tắc trên mâm cơm', 'Learn Vietnamese table manners early.', 'Học phép tắc trên mâm cơm người Việt từ nhỏ: so đũa, mời người lớn trước khi ăn.', 'Follow table manners', 'Phép lịch sự bữa ăn.'),
    ('Filial piety', '/ˌfɪliəl ˈpaɪəti/', 'noun', 'Đạo hiếu thảo với cha mẹ', 'Filial piety is the greatest virtue.', 'Lòng hiếu thảo với cha mẹ là phẩm hạnh cao quý nhất của một con người.', 'Practice filial piety', 'Chữ hiếu làm đầu.'),
    ('Reunion', '/ˌriːˈjuːniən/', 'noun', 'Buổi sum họp gia đình ấm cúng', 'A joyous family reunion on Tet Eve.', 'Một buổi sum họp gia đình chan chứa niềm vui và nước mắt đoàn tụ đêm trừ tịch.', 'Family reunion', 'Đoàn tụ sum vầy.'),
    ('Pass down', '/pɑːs daʊn/', 'phrase', 'Truyền lại từ đời này sang đời khác', 'Pass down culinary recipes over centuries.', 'Truyền lại các bí quyết ẩm thực gia truyền qua hàng trăm năm lịch sử.', 'Pass down knowledge', 'Kế thừa thế hệ.')
], [
    ('Heritage', '/ˈherɪtɪdʒ/', 'noun', 'Di sản văn hóa đạo đức', 'Preserve cultural and ethical heritage.', 'Gìn giữ và phát huy di sản văn hóa đạo đức quý báu của tiền nhân.', 'Moral heritage', 'Gia tài tinh thần.'),
    ('Solemn', '/ˈsɒləm/', 'adjective', 'Trang nghiêm, thành kính', 'A solemn incense offering ceremony.', 'Một nghi lễ dâng hương trang nghiêm và thành kính tại đền Hùng linh thiêng.', 'Solemn ceremony', 'Uy nghiêm mực thước.'),
    ('Virtue', '/ˈvɜːtʃuː/', 'noun', 'Đức hạnh, phẩm chất cao quý', 'Kindness and honesty are great virtues.', 'Lòng nhân ái và sự trung thực là những phẩm chất đạo đức cao quý muôn đời.', 'Moral virtue', 'Phẩm hạnh sáng ngời.'),
    ('Obligation', '/ˌɒblɪˈɡeɪʃn/', 'noun', 'Bổn phận, trách nhiệm thiêng liêng', 'Fulfill moral obligations to parents.', 'Trọn vẹn bổn phận làm con và trách nhiệm thiêng liêng phụng dưỡng mẹ cha.', 'Moral obligation', 'Bổn phận làm người.'),
    ('Ceremony', '/ˈserəməni/', 'noun', 'Nghi lễ kỷ niệm trọng thể', 'The traditional wedding tea ceremony.', 'Nghi lễ dâng trà tạ ơn cha mẹ trong đám cưới cổ truyền đầm ấm.', 'Wedding ceremony', 'Lễ nghi tổ chức.'),
    ('Devotion', '/dɪˈvəʊʃn/', 'noun', 'Sự tận tụy hy sinh hết lòng', 'Mothers lifelong love and devotion.', 'Tình yêu thương và sự tận tụy hy sinh trọn đời không bờ bến của người mẹ.', 'Lifelong devotion', 'Cống hiến hết lòng.'),
    ('Norm', '/nɔːm/', 'noun', 'Chuẩn mực đạo đức xã hội', 'Abide by accepted cultural norms.', 'Luôn tuân thủ đúng đắn các chuẩn mực văn hóa và đạo đức của xã hội.', 'Social norms', 'Quy phạm hành vi.'),
    ('Continuity', '/ˌkɒntɪˈnjuːəti/', 'noun', 'Sự liên tục, tiếp nối mạch nguồn', 'Maintain cultural identity continuity.', 'Duy trì sự tiếp nối không ngừng của mạch nguồn bản sắc văn hóa dân tộc.', 'Cultural continuity', 'Dòng chảy lịch sử.')
])

# Unit 6: Lifestyles
add('unit-g8-u6', 'Phong cách sống & Đời sống hiện đại', [
    ('Lifestyle', '/ˈlaɪfstaɪl/', 'noun', 'Lối sống, phong cách sinh hoạt', 'Adopt a mindful and healthy lifestyle.', 'Lựa chọn và xây dựng cho bản thân một lối sống tỉnh thức, lành mạnh và an yên.', 'Healthy lifestyle', 'Nếp sống hàng ngày.'),
    ('Nomadic', '/nəʊˈmædɪk/', 'adjective', 'Du mục, nay đây mai đó trên thảo nguyên', 'Nomadic tribes live in portable yurts.', 'Những bộ tộc du mục sống hòa mình giữa thảo nguyên trong những căn lều yurt linh hoạt.', 'Nomadic life', 'Lối sống du mục.'),
    ('Sedentary', '/ˈsedntri/', 'adjective', 'Ít vận động, thụ động trước màn hình', 'A sedentary job harms back posture.', 'Lối sống ít vận động ngồi lỳ một chỗ trước máy tính gây hại cho cột sống.', 'Sedentary habits', 'Thụ động thể chất.'),
    ('Minimalism', '/ˈmɪnɪməlɪzəm/', 'noun', 'Lối sống tối giản, bớt đồ đạc', 'Embrace joyful decluttering minimalism.', 'Theo đuổi lối sống tối giản giúp dọn dẹp bớt đồ đạc dư thừa để tìm lại tự do.', 'Practice minimalism', 'Sống tinh gọn.'),
    ('Consumerism', '/kənˈsjuːmərɪzəm/', 'noun', 'Chủ nghĩa tiêu dùng thái quá', 'Avoid traps of wasteful consumerism.', 'Tỉnh táo tránh xa những cái bẫy mua sắm lãng phí của chủ nghĩa tiêu dùng thái quá.', 'Modern consumerism', 'Lối mua sắm ồ ạt.'),
    ('Eco-friendly', '/ˌiːkəʊ ˈfrendli/', 'adjective', 'Thân thiện với môi trường xanh', 'Choose eco-friendly reusable products.', 'Ưu tiên lựa chọn các sản phẩm tái sử dụng thân thiện với môi trường tự nhiên.', 'Eco-friendly goods', 'Sống xanh bền vững.'),
    ('Zero-waste', '/ˌzɪərəʊ ˈweɪst/', 'noun / adjective', 'Lối sống không rác thải', 'Strive for a practical zero-waste lifestyle.', 'Nỗ lực từng ngày để hướng tới lối sống không rác thải bảo vệ hành tinh xanh.', 'Zero-waste living', 'Không thải rác nhựa.'),
    ('Fast food', '/ˌfɑːst ˈfuːd/', 'noun', 'Thức ăn nhanh nhiều dầu mỡ', 'Cut down on greasy fast food.', 'Cắt giảm tối đa việc ăn các loại thức ăn nhanh nhiều dầu mỡ có hại sức khỏe.', 'Avoid fast food', 'Đồ ăn chế biến sẵn.'),
    ('Slow food', '/sləʊ fuːd/', 'noun', 'Ẩm thực nấu chậm, nguyên liệu tươi', 'The slow food movement cherishes meals.', 'Phong trào nấu chậm tôn vinh bữa cơm gia đình đầm ấm từ thực phẩm hữu cơ.', 'Slow food trend', 'Ăn uống thuận tự nhiên.'),
    ('Online shopping', '/ˌɒnlaɪn ˈʃɒpɪŋ/', 'noun', 'Mua sắm trực tuyến trên mạng', 'Convenient but addictive online shopping.', 'Mua sắm trực tuyến rất tiện lợi nhưng dễ khiến người ta sa đà chi tiêu quá tay.', 'Do online shopping', 'Mua hàng qua app.'),
    ('Social networking', '/ˌsəʊʃl ˈnetwɜːkɪŋ/', 'noun', 'Mạng xã hội kết nối ảo', 'Balance screen time and social networking.', 'Cân bằng thời gian nhìn màn hình và lướt các mạng xã hội kết nối với đời thực.', 'Social media', 'Thế giới mạng ảo.'),
    ('Workaholic', '/ˌwɜːkəˈhɒlɪk/', 'noun', 'Người nghiện công việc quên nghỉ ngơi', 'Workaholics risk severe mental burnout.', 'Những người nghiện công việc quên cả nghỉ ngơi có nguy cơ cao bị kiệt sức tinh thần.', 'Become a workaholic', 'Lao lực vì việc.')
], [
    ('Sustainability', '/səˌsteɪnəˈbɪləti/', 'noun', 'Sự phát triển bền vững lâu dài', 'Sustainability should guide consumption.', 'Tính bền vững cần phải là kim chỉ nam định hướng cho mọi thói quen tiêu dùng.', 'Environmental sustainability', 'Bền vững sinh thái.'),
    ('Conscious', '/ˈkɒnʃəs/', 'adjective', 'Có ý thức, tỉnh táo trong lựa chọn', 'Be a conscious ethical consumer.', 'Hãy trở thành một người tiêu dùng có ý thức và trách nhiệm với xã hội.', 'Conscious choices', 'Biết rõ hậu quả.'),
    ('Declutter', '/ˌdiːˈklʌtər/', 'verb', 'Dọn dẹp bớt đồ đạc cho thoáng', 'Declutter your desk for clearer mind.', 'Dọn dẹp bớt những đồ vật bừa bộn trên bàn làm việc để tâm trí được hanh thông.', 'Declutter space', 'Thanh lý bớt đồ.'),
    ('Downsize', '/ˈdaʊnsaɪz/', 'verb', 'Thu nhỏ quy mô sống cho giản đơn', 'Downsize possessions to travel lighter.', 'Thu nhỏ quy mô tài sản sở hữu để cuộc sống nhẹ nhàng thanh thản hơn.', 'Downsize lifestyle', 'Sống tinh gọn lại.'),
    ('Frugal', '/ˈfruːɡl/', 'adjective', 'Căn cơ, tiết kiệm chừng mực', 'Lead a peaceful and frugal life.', 'Sống một cuộc đời thanh đạm, căn cơ tiết kiệm mà tràn đầy niềm vui tự tại.', 'Frugal lifestyle', 'Không hoang phí.'),
    ('Overconsumption', '/ˌəʊvəkənˈsʌmpʃn/', 'noun', 'Sự tiêu thụ quá mức gây cạn kiệt', 'Overconsumption depletes rare resources.', 'Sự tiêu thụ vô tội vạ của con người đang làm cạn kiệt nguồn tài nguyên quý báu.', 'Stop overconsumption', 'Tiêu xài quá độ.'),
    ('Holistic', '/həʊˈlɪstɪk/', 'adjective', 'Mang tính toàn diện cả thân và tâm', 'Holistic health combines exercise and peace.', 'Sức khỏe toàn diện là sự kết hợp hài hòa giữa thể lực dẻo dai và tâm hồn an lạc.', 'Holistic health', 'Toàn diện vẹn tròn.'),
    ('Mindful', '/ˈmaɪndfl/', 'adjective', 'Tỉnh thức trong từng giây phút', 'Mindful eating leads to better digestion.', 'Ăn uống trong chánh niệm tĩnh thức giúp việc tiêu hóa thức ăn tốt hơn nhiều.', 'Mindful living', 'Hiện diện trọn vẹn.')
])

# Unit 7: Environmental Protection
add('unit-g8-u7', 'Bảo vệ môi trường & Hành tinh xanh', [
    ('Pollution', '/pəˈluːʃn/', 'noun', 'Sự ô nhiễm môi trường sống', 'Air and water pollution threaten health.', 'Sự ô nhiễm không khí và nguồn nước đang đe dọa trực tiếp sức khỏe con người.', 'Environmental pollution', 'Môi trường bị hủy hoại.'),
    ('Pollutant', '/pəˈluːtənt/', 'noun', 'Chất gây ô nhiễm độc hại', 'Industrial chemical pollutants in rivers.', 'Những chất thải hóa học độc hại từ các khu công nghiệp xả trộm xuống dòng sông.', 'Toxic pollutants', 'Tác nhân ô nhiễm.'),
    ('Deforestation', '/diːˌfɒrɪˈsteɪʃn/', 'noun', 'Nạn chặt phá rừng bừa bãi', 'Deforestation causes severe flash floods.', 'Nạn chặt phá rừng đầu nguồn bừa bãi là nguyên nhân gây ra những cơn lũ quét kinh hoàng.', 'Stop deforestation', 'Mất rừng đầu nguồn.'),
    ('Endangered species', '/ɪnˈdeɪndʒəd ˈspiːʃiːz/', 'noun', 'Loài có nguy cơ tuyệt chủng', 'Protect endangered species from hunting.', 'Bảo vệ nghiêm ngặt các loài động vật hoang dã quý hiếm có nguy cơ tuyệt chủng.', 'Save endangered animals', 'Sách đỏ động vật.'),
    ('Habitat', '/ˈhæbɪtæt/', 'noun', 'Môi trường sống tự nhiên', 'Destruction of natural forest habitats.', 'Sự phá hủy môi trường sống tự nhiên của muôn loài khiến thú rừng không còn nơi ở.', 'Natural habitat', 'Nơi cư trú tự nhiên.'),
    ('Single-use plastic', '/ˌsɪŋɡl juːs ˈplæstɪk/', 'noun', 'Rác nhựa dùng một lần độc hại', 'Ban toxic single-use plastic bags.', 'Cấm triệt để việc sử dụng túi ni-lông và đồ nhựa dùng một lần cực kỳ độc hại.', 'Reduce plastic', 'Nhựa khó phân hủy.'),
    ('Biodegradable', '/ˌbaɪəʊdɪˈɡreɪdəbl/', 'adjective', 'Có thể tự phân hủy sinh học', 'Use biodegradable straw alternatives.', 'Sử dụng ống hút cỏ bàng có thể tự phân hủy sinh học an toàn cho đất.', 'Biodegradable material', 'Tự hoai mục tự nhiên.'),
    ('Recycle', '/ˌriːˈsaɪkl/', 'verb', 'Tái chế rác thải thành đồ mới', 'Sort trash to recycle glass and paper.', 'Phân loại rác tại nguồn để tái chế thủy tinh và giấy báo thành vật dụng hữu ích.', 'Recycle waste', 'Tái chế tài nguyên.'),
    ('Reuse', '/ˌriːˈjuːz/', 'verb', 'Tái sử dụng nhiều lần đồ dùng', 'Reuse sturdy cloth bags for groceries.', 'Tái sử dụng túi vải bền chắc nhiều lần khi đi chợ mua sắm thực phẩm.', 'Reuse bags', 'Dùng lại nhiều lần.'),
    ('Reduce', '/rɪˈdjuːs/', 'verb', 'Cắt giảm phát thải lãng phí', 'Reduce energy waste at home and school.', 'Cắt giảm tối đa sự lãng phí điện nước tại gia đình và trường lớp.', 'Reduce waste', 'Tiết giảm tiêu hao.'),
    ('Ecosystem', '/ˈiːkəʊsɪstəm/', 'noun', 'Hệ sinh thái tự nhiên phong phú', 'Marine ecosystems suffer from plastic.', 'Hệ sinh thái biển cả trù phú đang oằn mình chịu đựng hàng triệu tấn rác nhựa trôi nổi.', 'Marine ecosystem', 'Hệ sinh thái sống.'),
    ('Global warming', '/ˌɡləʊbl ˈwɔːmɪŋ/', 'noun', 'Sự nóng lên toàn cầu', 'Urgent action against global warming.', 'Hành động cấp bách và quyết liệt nhằm ngăn chặn sự nóng lên của quả địa cầu.', 'Combat global warming', 'Trái đất nóng dần lên.')
], [
    ('Carbon footprint', '/ˌkɑːbən ˈfʊtprɪnt/', 'noun', 'Dấu chân các-bon của mỗi người', 'Calculate and shrink your carbon footprint.', 'Tính toán và nỗ lực thu nhỏ dấu chân phát thải các-bon của chính bản thân mình.', 'Shrink carbon footprint', 'Lượng CO2 phát thải.'),
    ('Conservation', '/ˌkɒnsəˈveɪʃn/', 'noun', 'Công tác bảo tồn thiên nhiên hoang dã', 'Wildlife conservation preserves biodiversity.', 'Công tác bảo tồn động vật hoang dã giúp gìn giữ sự đa dạng sinh học cho muôn đời.', 'Nature conservation', 'Gìn giữ thiên nhiên.'),
    ('Extinction', '/ɪkˈstɪŋkʃn/', 'noun', 'Sự tuyệt chủng vĩnh viễn của loài', 'Dozens of species face extinction risk.', 'Hàng chục loài sinh vật quý đang đứng trước bờ vực tuyệt chủng vĩnh viễn khỏi trái đất.', 'Threat of extinction', 'Biến mất hoàn toàn.'),
    ('Renewable', '/rɪˈnjuːəbl/', 'adjective', 'Có thể tái tạo liên tục sạch', 'Shift completely to renewable green fuels.', 'Chuyển dịch hoàn toàn sang sử dụng các nguồn nhiên liệu sạch tái tạo được.', 'Renewable energy', 'Năng lượng tái tạo.'),
    ('Afforestation', '/æˌfɒrɪˈsteɪʃn/', 'noun', 'Trồng rừng phủ xanh đất trống đồi trọc', 'National afforestation campaign plants trees.', 'Chiến dịch trồng rừng phủ xanh đất trống đồi trọc của toàn dân đã trồng hàng triệu cây.', 'Mass afforestation', 'Phủ xanh đất trống.'),
    ('Catastrophe', '/kəˈtæstrəfi/', 'noun', 'Thảm họa sinh thái khôn lường', 'Prevent looming climate catastrophes.', 'Nỗ lực hành động để ngăn chặn những thảm họa khí hậu khôn lường có thể xảy ra.', 'Climate catastrophe', 'Đại họa hủy diệt.'),
    ('Preservation', '/ˌprezəˈveɪʃn/', 'noun', 'Sự bảo tồn nguyên vẹn môi sinh', 'Biosphere reserve preservation policies.', 'Các chính sách bảo tồn nguyên vẹn các khu dự trữ sinh quyển thế giới quý giá.', 'Preservation of nature', 'Giữ gìn vẹn nguyên.'),
    ('Sustainable', '/səˈsteɪnəbl/', 'adjective', 'Phát triển bền vững hài hòa', 'Build sustainable green cities for tomorrow.', 'Xây dựng những thành phố xanh phát triển bền vững hài hòa cùng thiên nhiên cho tương lai.', 'Sustainable development', 'Hài hòa muôn đời.')
])

# Unit 8: Shopping
add('unit-g8-u8', 'Văn hóa mua sắm & Tiêu dùng thông minh', [
    ('Shopping mall', '/ˈʃɒpɪŋ mɔːl/', 'noun', 'Trung tâm thương mại sầm uất', 'Spend weekend at bustling shopping mall.', 'Dành ngày nghỉ cuối tuần dạo chơi tại trung tâm thương mại sầm uất đa tiện ích.', 'At the shopping mall', 'Đại siêu thị mua sắm.'),
    ('Supermarket', '/ˈsuːpəmɑːkɪt/', 'noun', 'Siêu thị bách hóa tiện lợi', 'Buy groceries at local supermarket.', 'Mua sắm thực phẩm tươi ngon tại siêu thị bách hóa gần nhà mỗi buổi chiều.', 'Go to supermarket', 'Siêu thị tự chọn.'),
    ('Open-air market', '/ˌəʊpən eə ˈmɑːkɪt/', 'noun', 'Chợ truyền thống ngoài trời', 'Fresh produce at vibrant open-air market.', 'Nông sản rau củ tươi rói tại các khu chợ phiên truyền thống ngoài trời tấp nập.', 'Traditional market', 'Chợ dân sinh họp phiên.'),
    ('Bargain', '/ˈbɑːɡən/', 'verb / noun', 'Mặc cả giá, món hời giá rẻ', 'Bargain for good price at market.', 'Khéo léo mặc cả để mua được món hàng ưng ý với giá cả phải chăng tại chợ quê.', 'Drive a hard bargain', 'Thương lượng giá.'),
    ('Discount', '/ˈdɪskaʊnt/', 'noun', 'Khoản giảm giá khuyến mãi', 'Special fifty percent holiday discount.', 'Chương trình khuyến mãi giảm giá đặc biệt tới năm mươi phần trăm dịp lễ lớn.', 'Get a discount', 'Bớt giá tiền.'),
    ('Price tag', '/ˈpraɪs tæɡ/', 'noun', 'Mác niêm yết giá tiền', 'Check product price tag before buying.', 'Luôn nhìn kỹ nhãn mác niêm yết giá tiền rõ ràng trước khi quyết định chọn mua.', 'Read price tag', 'Tem niêm yết giá.'),
    ('Sale off', '/seɪl ɒf/', 'phrase', 'Đợt đại hạ giá xả hàng', 'Huge clearance sale off on clothing.', 'Đợt đại hạ giá xả kho cuối mùa của các thương hiệu thời trang lớn.', 'End of season sale', 'Đại hạ giá.'),
    ('Receipt', '/rɪˈsiːt/', 'noun', 'Hóa đơn thanh toán bán lẻ', 'Keep retail purchase receipts for returns.', 'Giữ lại hóa đơn thanh toán bán lẻ cẩn thận để đối chiếu khi cần đổi trả hàng.', 'Keep the receipt', 'Chữ p câm.'),
    ('Cashier', '/kæˈʃɪər/', 'noun', 'Thu ngân tại quầy thanh toán', 'Pay the polite cashier at the counter.', 'Thanh toán tiền hàng cho cô nhân viên thu ngân lịch sự tại quầy thanh toán.', 'Checkout cashier', 'Người tính tiền.'),
    ('Customer', '/ˈkʌstəmər/', 'noun', 'Khách hàng mua sắm', 'Satisfied customers return for more.', 'Những vị khách hàng hài lòng sẽ luôn quay trở lại ủng hộ cửa hàng nhiều lần nữa.', 'Loyal customer', 'Người mua hàng.'),
    ('Online shopping', '/ˌɒnlaɪn ˈʃɒpɪŋ/', 'noun', 'Mua hàng qua mạng Internet', 'Fast doorstep delivery with online shopping.', 'Giao hàng tận cửa nhanh chóng tiện lợi khi mua hàng qua các sàn thương mại điện tử.', 'Shop online', 'Thương mại điện tử.'),
    ('Complaint', '/kəmˈpleɪnt/', 'noun', 'Lời phàn nàn, khiếu nại chất lượng', 'File a customer service quality complaint.', 'Gửi đơn khiếu nại chính đáng về chất lượng sản phẩm đến bộ phận chăm sóc khách hàng.', 'Make a complaint', 'Khiếu nại đổi trả.')
], [
    ('Impulsive', '/ɪmˈpʌlsɪv/', 'adjective', 'Mua sắm bốc đồng theo cảm xúc', 'Avoid reckless impulsive buying habits.', 'Tỉnh táo kiềm chế thói quen mua sắm bốc đồng theo cảm xúc nhất thời gây hao tốn tiền của.', 'Impulsive shopping', 'Mua không tính toán.'),
    ('Affordable', '/əˈfɔːdəbl/', 'adjective', 'Giá cả vừa túi tiền, hợp lý', 'Quality stationery at affordable prices.', 'Đồ dùng học tập chất lượng cao với mức giá cả vừa túi tiền của mọi bạn học sinh.', 'Affordable price', 'Vừa phải không đắt.'),
    ('Exorbitant', '/ɪɡˈzɔːbɪtənt/', 'adjective', 'Đắt đỏ trên trời, cắt cổ', 'Refuse to pay exorbitant tourist prices.', 'Kiên quyết từ chối trả những mức giá đắt đỏ trên trời mang tính chặt chém du khách.', 'Exorbitant prices', 'Đắt vô lý.'),
    ('Warranty', '/ˈwɒrənti/', 'noun', 'Phiếu bảo hành chính hãng', 'Two-year free repair appliance warranty.', 'Phiếu bảo hành chính hãng sửa chữa miễn phí hai năm cho các thiết bị điện tử gia dụng.', 'Under warranty', 'Cam kết bảo hành.'),
    ('E-commerce', '/ˈiː kɒmɜːs/', 'noun', 'Thương mại điện tử thời 4.0', 'Booming global e-commerce platforms.', 'Sự bùng nổ mạnh mẽ của các nền tảng thương mại điện tử mua sắm xuyên biên giới.', 'E-commerce platform', 'Kinh doanh online.'),
    ('Budget', '/ˈbʌdʒɪt/', 'noun / verb', 'Ngân sách chi tiêu cá nhân', 'Stick strictly to monthly personal budget.', 'Tuân thủ nghiêm ngặt theo hạn mức ngân sách chi tiêu cá nhân đã đề ra từ đầu tháng.', 'On a tight budget', 'Kế hoạch tài chính.'),
    ('Counterfeit', '/ˈkaʊntəfɪt/', 'noun / adjective', 'Hàng giả, hàng nhái kém chất lượng', 'Beware of cheap counterfeit designer goods.', 'Cảnh giác cao độ trước những món hàng hiệu giả nhái trôi nổi kém chất lượng trên mạng.', 'Counterfeit goods', 'Hàng nhái.'),
    ('Satisfaction', '/ˌsætɪsˈfækʃn/', 'noun', 'Sự hài lòng tuyệt đối của người mua', 'Guaranteed total customer satisfaction.', 'Cam kết mang lại sự hài lòng tuyệt đối và trọn vẹn nhất cho mọi khách hàng.', 'Customer satisfaction', 'Toại ý thỏa mãn.')
])

# Unit 9: Natural Disasters
add('unit-g8-u9', 'Thiên tai thảm khốc & Kỹ năng ứng phó', [
    ('Natural disaster', '/ˌnætʃrəl dɪˈzɑːstər/', 'noun', 'Thảm họa thiên tai tàn phá', 'Prepare communities for natural disasters.', 'Trang bị kỹ năng phòng ngừa thiên tai cho toàn thể cộng đồng dân cư vùng xung yếu.', 'Survive disaster', 'Thảm họa tự nhiên.'),
    ('Earthquake', '/ˈɜːθkweɪk/', 'noun', 'Trận động đất rung chuyển lòng đất', 'Buildings shake violently in earthquake.', 'Các tòa nhà cao tầng rung lắc dữ dội trong trận động đất mạnh kèm dư chấn liên tục.', 'Severe earthquake', 'Địa chấn.'),
    ('Tsunami', '/tsuːˈnɑːmi/', 'noun', 'Trận sóng thần cao ngút ngàn', 'Massive tsunami waves hit the coast.', 'Những con sóng thần khổng lồ cao hàng chục mét ập vào bờ cuốn phăng mọi công trình.', 'Giant tsunami', 'Chữ t câm.'),
    ('Typhoon', '/taɪˈfuːn/', 'noun', 'Cơn bão nhiệt đới cuồng phong', 'Tropical typhoon brings howling winds.', 'Cơn bão nhiệt đới cuồng phong mang theo gió giật cấp 12 và mưa như trút nước.', 'Violent typhoon', 'Bão biển nhiệt đới.'),
    ('Flood', '/flʌd/', 'noun / verb', 'Trận lũ lụt nhấn chìm làng mạc', 'Rivers overflow causing devastating floods.', 'Sông dâng cao vỡ đê gây nên những trận ngập lụt kinh hoàng nhấn chìm làng mạc.', 'Devastating flood', 'Nước lũ dâng cao.'),
    ('Landslide', '/ˈlændslaɪd/', 'noun', 'Vụ sạt lở đất đá kinh hoàng', 'Heavy downpours trigger deadly landslides.', 'Những trận mưa như trút nước kích hoạt các vụ sạt lở đất đá kinh hoàng trên đèo dốc.', 'Mountain landslide', 'Sạt trượt đất đá.'),
    ('Drought', '/draʊt/', 'noun', 'Cơn hạn hán nứt nẻ đồng ruộng', 'Severe prolonged drought parches crops.', 'Cơn hạn hán kéo dài làm nứt nẻ những thửa ruộng và khiến cây trồng héo úa vì khát nước.', 'Prolonged drought', 'Khô hạn thiếu nước.'),
    ('Volcanic eruption', '/vɒlˈkænɪk ɪˈrʌpʃn/', 'noun', 'Sự phun trào nham thạch núi lửa', 'Molten lava flows in volcanic eruption.', 'Những dòng nham thạch nóng bỏng tuôn trào trong đợt phun trào dữ dội của núi lửa.', 'Erupt violently', 'Nham thạch trào dâng.'),
    ('Tornado', '/tɔːˈneɪdəʊ/', 'noun', 'Cơn lốc xoáy hình phễu', 'A destructive funnel-shaped tornado.', 'Một cơn lốc xoáy hình phễu hung dữ quét qua san phẳng mọi thứ trên đường đi của nó.', 'Violent tornado', 'Vòi rồng.'),
    ('Evacuate', '/ɪˈvækjueɪt/', 'verb', 'Sơ tán khẩn cấp người dân', 'Evacuate vulnerable residents to shelters.', 'Kịp thời sơ tán khẩn cấp người dân già yếu đến các nơi trú ẩn an toàn kiên cố.', 'Evacuate quickly', 'Di tản lánh nạn.'),
    ('Emergency kit', '/ɪˈmɜːdʒənsi kɪt/', 'noun', 'Bộ dụng cụ sinh tồn khẩn cấp', 'Prepare water and food in emergency kit.', 'Chuẩn bị sẵn nước sạch, đèn pin và đồ khô trong túi cứu hộ khẩn cấp gia đình.', 'Survival kit', 'Túi cứu sinh.'),
    ('Rescue team', '/ˈreskjuː tiːm/', 'noun', 'Đội cứu hộ cứu nạn dũng cảm', 'Brave rescue teams save stranded victims.', 'Những chiến sĩ đội cứu hộ cứu nạn quả cảm vượt lũ xiết để giải cứu người dân bị cô lập.', 'Search and rescue', 'Cứu nạn cứu hộ.')
], [
    ('Casualty', '/ˈkæʒuəlti/', 'noun', 'Thương vong về người trong thiên tai', 'Quick evacuation prevented heavy casualties.', 'Việc sơ tán khẩn trương kịp thời đã ngăn chặn được những tổn thất thương vong lớn về người.', 'Suffer casualties', 'Thiệt hại nhân mạng.'),
    ('Devastation', '/ˌdevəˈsteɪʃn/', 'noun', 'Sự tàn phá hoang tàn đổ nát', 'Survey post-storm coastal devastation.', 'Thị sát cảnh tượng hoang tàn đổ nát của vùng ven biển sau khi cơn bão dữ đi qua.', 'Widespread devastation', 'Tan hoang xơ xác.'),
    ('Relief effort', '/rɪˈliːf ˈefət/', 'noun', 'Công tác cứu trợ đồng bào lũ lụt', 'Mobilize national emergency relief efforts.', 'Huy động toàn lực nguồn hàng cứu trợ khẩn cấp của cả nước hướng về vùng lũ lụt miền Trung.', 'Emergency relief', 'Tiếp tế cứu tế.'),
    ('Catastrophic', '/ˌkætəˈstrɒfɪk/', 'adjective', 'Mang tính thảm họa hủy diệt', 'Catastrophic damages to farming fields.', 'Những thiệt hại mang tính thảm họa và nặng nề đối với nền nông nghiệp trồng trọt.', 'Catastrophic impact', 'Hủy diệt khôn cùng.'),
    ('Precaution', '/prɪˈkɔːʃn/', 'noun', 'Biện pháp phòng ngừa chủ động', 'Take sensible storm safety precautions.', 'Chủ động triển khai các biện pháp phòng ngừa giằng chống nhà cửa an toàn trước bão.', 'Safety precaution', 'Đề phòng cẩn trọng.'),
    ('Meteorological', '/ˌmiːtiərəˈlɒdʒɪkl/', 'adjective', 'Thuộc về khí tượng thủy văn', 'Accurate meteorological radar alerts.', 'Những cảnh báo sớm chuẩn xác từ hệ thống ra-đa của cơ quan khí tượng thủy văn quốc gia.', 'Meteorological forecast', 'Dự báo bão lũ.'),
    ('Temporary shelter', '/ˈtemprəri ˈʃeltər/', 'noun', 'Khu lều bạt trú ẩn tạm thời', 'Provide warm blankets in temporary shelter.', 'Phát chăn ấm và thuốc men cho bà con tại các khu nhà tránh bão trú ẩn tạm thời.', 'Emergency shelter', 'Nơi trú bão tạm.'),
    ('Aftershock', '/ˈɑːftəʃɒk/', 'noun', 'Những đợt dư chấn sau động đất', 'Beware of dangerous collapsing aftershocks.', 'Hết sức cảnh giác trước những đợt dư chấn nối tiếp có thể làm sập các bức tường yếu.', 'Seismic aftershock', 'Rung chấn tiếp theo.')
])

# Unit 10: Communication in the Future
add('unit-g8-u10', 'Công nghệ giao tiếp tương lai vượt bậc', [
    ('Video conference', '/ˈvɪdiəʊ ˈkɒnfərəns/', 'noun', 'Hội nghị truyền hình trực tuyến', 'Hold international video conferences daily.', 'Tổ chức các cuộc họp hội nghị truyền hình trực tuyến đa quốc gia mỗi ngày trên máy.', 'Hold video conference', 'Họp từ xa qua camera.'),
    ('Holography', '/hɒˈlɒɡrəfi/', 'noun', 'Công nghệ hiển thị ảnh 3D không gian', 'Communicate using 3D laser holography.', 'Trò chuyện sinh động như thật bằng công nghệ chiếu ảnh ba chiều laser không gian.', '3D holography', 'Hình chiếu nổi 3D.'),
    ('Telepathy', '/təˈlepəθi/', 'noun', 'Thần giao cách cảm tâm trí', 'Brain-to-brain communication via telepathy.', 'Truyền tải ý nghĩ trực tiếp giữa hai bộ não thông qua công nghệ thần giao cách cảm.', 'Direct telepathy', 'Thấu thị suy nghĩ.'),
    ('Virtual reality', '/ˌvɜːtʃuəl riˈæləti/', 'noun', 'Công nghệ thực tế ảo (VR)', 'Immersive learning in virtual reality.', 'Trải nghiệm học tập đắm chìm và kỳ thú trong không gian thực tế ảo ba chiều.', 'VR headset', 'Thực tế ảo VR.'),
    ('Augmented reality', '/ɔːɡˌmentɪd riˈæləti/', 'noun', 'Công nghệ thực tế ảo tăng cường (AR)', 'Augmented reality overlays live data.', 'Công nghệ thực tế ảo tăng cường phủ các thông số dữ liệu số trực tiếp lên mắt nhìn.', 'AR glasses', 'Thực tế tăng cường AR.'),
    ('Chatbot', '/ˈtʃætbɒt/', 'noun', 'Trợ lý trò chuyện trí tuệ nhân tạo', 'AI chatbots handle customer inquiries.', 'Các trợ lý trò chuyện AI thông minh giải đáp mọi thắc mắc của khách hàng trong tích tắc.', 'AI chatbot', 'Robot hội thoại.'),
    ('Smartwatch', '/ˈsmɑːtwɒtʃ/', 'noun', 'Đồng hồ đeo tay thông minh', 'Send voice messages through smartwatch.', 'Gửi tin nhắn thoại và đo nhịp tim nhanh chóng qua chiếc đồng hồ thông minh đeo tay.', 'Wear smartwatch', 'Đồng hồ đa chức năng.'),
    ('Social network', '/ˌsəʊʃl ˈnetwɜːk/', 'noun', 'Mạng xã hội kết nối toàn cầu', 'Connect billions on modern social networks.', 'Kết nối hàng tỷ con người trên các nền tảng mạng xã hội hiện đại khắp hành tinh.', 'Join social network', 'Cộng đồng mạng.'),
    ('Instantly', '/ˈɪnstəntli/', 'adverb', 'Ngay lập tức trong tích tắc', 'Information travels instantly worldwide.', 'Thông tin thời sự lan truyền đi khắp địa cầu ngay lập tức chỉ sau một cái nhấp chuột.', 'Respond instantly', 'Tức thời chớp mắt.'),
    ('Interaction', '/ˌɪntərˈækʃn/', 'noun', 'Sự tương tác đa chiều qua lại', 'Interactive human-robot digital interaction.', 'Sự tương tác qua lại mật thiết và mượt mà giữa con người và người máy kỹ thuật số.', 'Social interaction', 'Giao lưu tương tác.'),
    ('Breakthrough', '/ˈbreɪkθruː/', 'noun', 'Bước đột phá công nghệ vĩ đại', 'A massive breakthrough in neural links.', 'Một bước đột phá công nghệ vĩ đại trong việc kết nối trực tiếp sóng não với máy tính.', 'Major breakthrough', 'Bước ngoặt phát triển.'),
    ('Digital device', '/ˌdɪdʒɪtl dɪˈvaɪs/', 'noun', 'Thiết bị kỹ thuật số thông minh', 'Seamless connection across digital devices.', 'Sự kết nối đồng bộ liền mạch giữa các thiết bị kỹ thuật số thông minh cá nhân.', 'Smart digital device', 'Điện thoại, máy tính bảng.')
], [
    ('Brain-computer interface', '/ˌbreɪn kəmˈpjuːtər ˈɪntəfeɪs/', 'noun', 'Giao diện não - máy tính (BCI)', 'Type messages directly using BCI chips.', 'Gõ văn bản và truyền suy nghĩ trực tiếp bằng chip giao diện kết nối não - máy tính.', 'BCI technology', 'Kết nối trí não.'),
    ('Avatar', '/ˈævətɑːr/', 'noun', 'Hình đại diện ảo trong thế giới số', 'Control your 3D digital avatar in metaverse.', 'Điều khiển nhân vật hình đại diện 3D của bạn trong vũ trụ ảo metaverse sống động.', 'Digital avatar', 'Hóa thân trên mạng.'),
    ('Metaverse', '/ˈmetəvɜːs/', 'noun', 'Vũ trụ ảo siêu vũ trụ kỹ thuật số', 'Attend virtual classes inside metaverse.', 'Tham dự các lớp học ảo kỳ thú và giao lưu cùng bạn bè năm châu trong siêu vũ trụ metaverse.', 'Enter the metaverse', 'Không gian ảo vô tận.'),
    ('Simultaneous', '/ˌsɪmlˈteɪniəs/', 'adjective', 'Đồng thời cùng một lúc tức thì', 'Real-time simultaneous speech translation.', 'Công nghệ dịch thuật giọng nói tự động song song cùng một lúc xóa nhòa rào cản ngôn ngữ.', 'Simultaneous translation', 'Tức thời song hành.'),
    ('Seamless', '/ˈsiːmləs/', 'adjective', 'Liền mạch, trơn tru không ngắt quãng', 'Seamless cross-platform communication.', 'Giao tiếp trò chuyện liền mạch trơn tru giữa muôn vàn nền tảng khác nhau.', 'Seamless connectivity', 'Không gián đoạn.'),
    ('Revolutionize', '/ˌrevəˈluːʃənaɪz/', 'verb', 'Cách mạng hóa, thay đổi triệt để', 'AI will revolutionize human communication.', 'Trí tuệ nhân tạo sẽ cách mạng hóa và định hình lại toàn bộ cách thức con người giao tiếp.', 'Revolutionize society', 'Biến đổi sâu sắc.'),
    ('Non-verbal', '/ˌnɒn ˈvɜːbl/', 'adjective', 'Phi ngôn ngữ (ánh mắt, cử chỉ)', 'Micro-expression non-verbal cues.', 'Những tín hiệu biểu cảm phi ngôn ngữ qua ánh mắt và nụ cười được camera AI nhận diện.', 'Non-verbal communication', 'Ngôn ngữ cơ thể.'),
    ('Cybersecurity', '/ˌsaɪbəsɪˈkjʊərəti/', 'noun', 'An ninh mạng bảo mật thông tin', 'Prioritize personal data cybersecurity.', 'Luôn ưu tiên bảo vệ an ninh mạng và bảo mật tuyệt đối các dữ liệu riêng tư cá nhân.', 'Ensure cybersecurity', 'An toàn không gian mạng.')
])

print("vocab_grade8.py loaded with 10 units")
