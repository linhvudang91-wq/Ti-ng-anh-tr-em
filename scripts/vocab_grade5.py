# -*- coding: utf-8 -*-
# Grade 5 Vocabulary: 10 units, 20-22 words each
G5_UNITS = {}

def add(uid, topic, core, adv):
    res = []
    for i, t in enumerate(core, 1):
        res.append({
            "id": f"{uid}-w{i}", "word": t[0], "ipa": t[1], "partOfSpeech": t[2],
            "meaningVi": t[3], "exampleEn": t[4], "exampleVi": t[5],
            "isCore": True, "unitId": uid, "grade": 5, "topic": topic,
            "collocation": t[6], "examNote": t[7]
        })
    start = len(core) + 1
    for i, t in enumerate(adv, start):
        res.append({
            "id": f"{uid}-w{i}", "word": t[0], "ipa": t[1], "partOfSpeech": t[2],
            "meaningVi": t[3], "exampleEn": t[4], "exampleVi": t[5],
            "isCore": False, "unitId": uid, "grade": 5, "topic": topic,
            "collocation": t[6], "examNote": t[7]
        })
    G5_UNITS[uid] = res

# Unit 1: All About Me & Daily Routines
add('unit-g5-u1', 'Thói quen & Lối sống hàng ngày', [
    ('Daily routine', '/ˈdeɪli ruːˈtiːn/', 'noun', 'Thói quen hàng ngày', 'My daily routine starts early.', 'Thói quen hàng ngày của mình bắt đầu sớm.', 'Follow routine', 'Lịch trình quen thuộc.'),
    ('Habit', '/ˈhæbɪt/', 'noun', 'Thói quen sinh hoạt', 'Reading is a good habit.', 'Đọc sách là một thói quen rất tốt.', 'Good habit', 'Thói quen.'),
    ('Always', '/ˈɔːlweɪz/', 'adverb', 'Luôn luôn (100%)', 'I always get up early.', 'Mình luôn luôn dậy sớm mỗi sáng.', 'Always do', 'Tần suất cao nhất.'),
    ('Usually', '/ˈjuːʒuəli/', 'adverb', 'Thường xuyên (80%)', 'I usually do morning exercise.', 'Mình thường tập thể dục buổi sáng.', 'Usually do', 'Thói quen đều đặn.'),
    ('Often', '/ˈɒfn/', 'adverb', 'Thường (60%)', 'We often ride bikes to school.', 'Chúng mình thường đi xe đạp đến trường.', 'Often do', 'Khá thường xuyên.'),
    ('Sometimes', '/ˈsʌmtaɪmz/', 'adverb', 'Thỉnh thoảng (40%)', 'I sometimes watch movies.', 'Thỉnh thoảng mình mới xem phim.', 'Sometimes do', 'Đôi khi.'),
    ('Never', '/ˈnevər/', 'adverb', 'Không bao giờ (0%)', 'I never go to bed late.', 'Mình không bao giờ đi ngủ muộn.', 'Never do', 'Tuyệt đối không.'),
    ('Morning exercise', '/ˈmɔːnɪŋ ˈeksəsaɪz/', 'phrase', 'Thể dục buổi sáng', 'Do morning exercise.', 'Tập bài thể dục buổi sáng.', 'Do exercise', 'Rèn luyện thân thể.'),
    ('Martial arts', '/ˌmɑːʃl ˈɑːts/', 'noun', 'Võ thuật', 'He practices martial arts.', 'Cậu ấy tập luyện võ thuật.', 'Do martial arts', 'Rèn thể lực.'),
    ('Ride a bicycle', '/raɪd ə ˈbaɪsɪkl/', 'phrase', 'Đi xe đạp', 'Ride a bicycle around lake.', 'Đạp xe đạp dạo quanh bờ hồ.', 'Ride bicycle', 'Đi xe đạp.'),
    ('Surf the Internet', '/sɜːf ði ˈɪntənet/', 'phrase', 'Lướt mạng Internet', 'Surf Internet for news.', 'Lướt mạng tìm tài liệu học tập.', 'Surf web', 'Lên mạng.'),
    ('Frequency', '/ˈfriːkwənsi/', 'noun', 'Tần suất lặp lại', 'How often do you study?', 'Tần suất bạn học bài như thế nào?', 'High frequency', 'Mức độ thường xuyên.')
], [
    ('Once a week', '/wʌns ə wiːk/', 'phrase', 'Một lần mỗi tuần', 'Swim once a week.', 'Đi bơi một lần mỗi tuần.', 'Once a week', 'Tần suất 1 lần.'),
    ('Twice a month', '/twaɪs ə mʌnθ/', 'phrase', 'Hai lần mỗi tháng', 'Visit zoo twice a month.', 'Đi thăm vườn thú hai lần mỗi tháng.', 'Twice a month', 'Tần suất 2 lần.'),
    ('Healthy lifestyle', '/ˈhelθi ˈlaɪfstaɪl/', 'noun', 'Lối sống lành mạnh', 'Maintain a healthy lifestyle.', 'Duy trì một lối sống lành mạnh.', 'Healthy living', 'Sống khỏe.'),
    ('Early bird', '/ˈɜːli bɜːd/', 'noun', 'Người dậy sớm', 'She is an early bird.', 'Bạn ấy là người luôn thức dậy rất sớm.', 'Be an early bird', 'Thành ngữ.'),
    ('Night owl', '/naɪt aʊl/', 'noun', 'Người thức khuya', 'Avoid being a night owl.', 'Tránh thức khuya hại sức khỏe.', 'Be a night owl', 'Thành ngữ.'),
    ('Energy', '/ˈenədʒi/', 'noun', 'Năng lượng dồi dào', 'Full of positive energy.', 'Tràn trề nguồn năng lượng tích cực.', 'Full of energy', 'Sức sống.'),
    ('Discipline', '/ˈdɪsəplɪn/', 'noun', 'Kỷ luật tự giác', 'Self-discipline is key.', 'Tính tự kỷ luật là chìa khóa thành công.', 'Self discipline', 'Nền nếp.'),
    ('Balance', '/ˈbæləns/', 'noun / verb', 'Sự cân bằng', 'Balance study and play.', 'Cân bằng giữa việc học tập và vui chơi.', 'Keep balance', 'Hài hòa.')
])

# Unit 2: Address & Hometown
add('unit-g5-u2', 'Địa chỉ & Quê hương thân yêu', [
    ('Address', '/əˈdres/', 'noun', 'Địa chỉ cư trú', 'What is your home address?', 'Địa chỉ nhà của bạn ở đâu?', 'Home address', 'Nơi ở.'),
    ('Street', '/striːt/', 'noun', 'Đường phố', 'I live on Tran Phu Street.', 'Mình sống trên phố Trần Phú.', 'On the street', 'Đường phố.'),
    ('Lane', '/leɪn/', 'noun', 'Ngõ, hẻm nhỏ', 'My house is in a quiet lane.', 'Nhà mình nằm trong một con ngõ nhỏ yên tĩnh.', 'In the lane', 'Ngõ nhỏ.'),
    ('Avenue', '/ˈævənjuː/', 'noun', 'Đại lộ lớn', 'A tree-lined avenue.', 'Một đại lộ thênh thang rợp bóng cây.', 'Along avenue', 'Đại lộ.'),
    ('Road', '/rəʊd/', 'noun', 'Con đường', 'A busy road.', 'Một con đường xe cộ tấp nập.', 'Main road', 'Đường sá.'),
    ('Floor', '/flɔːr/', 'noun', 'Tầng nhà chung cư', 'Live on the eighth floor.', 'Sống ở tầng thứ tám của tòa chung cư.', 'Eighth floor', 'Tầng lầu.'),
    ('Flat', '/flæt/', 'noun', 'Căn hộ chung cư', 'A modern flat.', 'Một căn hộ chung cư tiện nghi.', 'Living in a flat', 'Căn hộ.'),
    ('Tower', '/ˈtaʊər/', 'noun', 'Tòa tháp cao tầng', 'Twin towers in the city.', 'Tòa tháp đôi hiện đại giữa lòng thành phố.', 'City tower', 'Tòa nhà cao.'),
    ('Village', '/ˈvɪlɪdʒ/', 'noun', 'Ngôi làng, thôn quê', 'A peaceful pottery village.', 'Một ngôi làng gốm thanh bình êm ả.', 'Small village', 'Làng xóm.'),
    ('Town', '/taʊn/', 'noun', 'Thị trấn nhỏ', 'A charming seaside town.', 'Một thị trấn ven biển duyên dáng.', 'Small town', 'Thị trấn.'),
    ('City', '/ˈsɪti/', 'noun', 'Thành phố lớn', 'A vibrant big city.', 'Một thành phố lớn sôi động náo nhiệt.', 'Big city', 'Đô thị.'),
    ('Province', '/ˈprɒvɪns/', 'noun', 'Tỉnh thành', 'Quang Ninh province.', 'Tỉnh Quảng Ninh với vịnh Hạ Long kỳ vĩ.', 'In the province', 'Đơn vị hành chính.')
], [
    ('Hometown', '/ˈhəʊmtaʊn/', 'noun', 'Quê hương bản quán', 'My hometown is Da Nang.', 'Quê hương của mình là thành phố Đà Nẵng.', 'Visit hometown', 'Nơi chôn rau cắt rốn.'),
    ('Peaceful', '/ˈpiːsfl/', 'adjective', 'Thanh bình, êm ả', 'A peaceful village atmosphere.', 'Bầu không khí thanh bình nơi làng quê.', 'Peaceful life', 'Yên tĩnh.'),
    ('Crowded', '/ˈkraʊdɪd/', 'adjective', 'Đông đúc người qua', 'Crowded streets in rush hour.', 'Đường phố đông đúc người qua vào giờ cao điểm.', 'Crowded street', 'Nhiều người.'),
    ('Busy', '/ˈbɪzi/', 'adjective', 'Nhộn nhịp, bận rộn', 'A busy shopping avenue.', 'Một đại lộ mua sắm nhộn nhịp người xe.', 'Busy city', 'Sôi động.'),
    ('Quiet', '/ˈkwaɪət/', 'adjective', 'Yên tĩnh, vắng vẻ', 'A quiet countryside lane.', 'Một con ngõ thôn quê yên tĩnh không tiếng ồn.', 'Quiet corner', 'Không ồn ào.'),
    ('Ancient', '/ˈeɪnʃənt/', 'adjective', 'Cổ kính, lâu đời', 'Hoi An ancient town.', 'Đô thị cổ kính Hội An ngàn năm lịch sử.', 'Ancient town', 'Cổ xưa.'),
    ('Skyscraper', '/ˈskaɪskreɪpər/', 'noun', 'Tòa nhà chọc trời', 'Tall skyscrapers in center.', 'Những tòa nhà chọc trời cao vút nơi trung tâm.', 'Modern skyscraper', 'Nhà cao ốc.'),
    ('Neighborhood', '/ˈneɪbəhʊd/', 'noun', 'Khu phố lân cận', 'Friendly neighborhood.', 'Một khu dân cư chan hòa tình làng nghĩa xóm.', 'In neighborhood', 'Khu vực sống.')
])

# Unit 3: Where Did You Go on Holiday?
add('unit-g5-u3', 'Kỳ nghỉ đã qua & Điểm đến', [
    ('Holiday', '/ˈhɒlədeɪ/', 'noun', 'Kỳ nghỉ lễ', 'Where did you go on holiday?', 'Bạn đã đi đâu vào kỳ nghỉ vừa qua?', 'On holiday', 'Kỳ nghỉ.'),
    ('Vacation', '/vəˈkeɪʃn/', 'noun', 'Kỳ nghỉ mát', 'Summer vacation at sea.', 'Kỳ nghỉ hè tuyệt vời bên bờ biển biếc.', 'Summer vacation', 'Nghỉ dưỡng.'),
    ('Ha Long Bay', '/ˌhɑː ˈlɒŋ beɪ/', 'noun', 'Vịnh Hạ Long', 'Cruise on Ha Long Bay.', 'Du thuyền ngắm cảnh vịnh Hạ Long kỳ vĩ.', 'Visit Ha Long', 'Kỳ quan.'),
    ('Da Nang', '/ˌdɑː ˈnæŋ/', 'noun', 'Thành phố Đà Nẵng', 'Beautiful beaches in Da Nang.', 'Những bãi biển cát trắng mịn màng tại Đà Nẵng.', 'In Da Nang', 'Thành phố đáng sống.'),
    ('Phu Quoc', '/ˌfuː ˈkwɒk/', 'noun', 'Đảo ngọc Phú Quốc', 'Sunny island of Phu Quoc.', 'Hòn đảo ngọc Phú Quốc chan hòa ánh nắng.', 'Phu Quoc island', 'Đảo ngọc.'),
    ('Train', '/treɪn/', 'noun', 'Tàu hỏa', 'Travel by express train.', 'Du lịch bằng chuyến tàu hỏa ngắm cảnh.', 'By train', 'Đường sắt.'),
    ('Plane', '/pleɪn/', 'noun', 'Máy bay', 'Fly by plane.', 'Di chuyển nhanh chóng bằng máy bay.', 'By plane', 'Hàng không.'),
    ('Coach', '/kəʊtʃ/', 'noun', 'Xe khách liên tỉnh', 'Travel by luxury coach.', 'Đi du lịch bằng xe khách chất lượng cao.', 'By coach', 'Xe đường dài.'),
    ('Motorbike', '/ˈməʊtəbaɪk/', 'noun', 'Xe máy', 'Ride a motorbike.', 'Đi xe máy ngắm cung đường đèo ven biển.', 'By motorbike', 'Xe hai bánh.'),
    ('Boat', '/bəʊt/', 'noun', 'Thuyền, tàu thủy', 'Take a wooden boat trip.', 'Đi một chuyến du ngoạn trên thuyền gỗ.', 'Boat trip', 'Thuyền nước.'),
    ('Seaside', '/ˈsiːsaɪd/', 'noun', 'Bờ biển nghỉ mát', 'Breeze at the seaside.', 'Làn gió mát lành thổi từ bờ biển.', 'At seaside', 'Vùng ven biển.'),
    ('Imperial City', '/ɪmˈpɪəriəl ˈsɪti/', 'noun', 'Cố đô, Hoàng thành', 'Visit Hue Imperial City.', 'Thăm Hoàng thành Cố đô Huế trầm mặc.', 'Hue Imperial City', 'Di tích lịch sử.')
], [
    ('Scenery', '/ˈsiːnəri/', 'noun', 'Phong cảnh thiên nhiên', 'Breathtaking natural scenery.', 'Phong cảnh thiên nhiên ngoạn mục làm say lòng người.', 'Beautiful scenery', 'Cảnh quan.'),
    ('Souvenir', '/ˌsuːvəˈnɪər/', 'noun', 'Món quà lưu niệm', 'Buy souvenirs for friends.', 'Mua những món quà lưu niệm ý nghĩa cho bạn bè.', 'Buy souvenir', 'Vật kỷ niệm.'),
    ('Take photos', '/teɪk ˈfəʊtəʊz/', 'phrase', 'Chụp ảnh lưu niệm', 'Take photos of sunset.', 'Chụp những bức ảnh hoàng hôn tuyệt đẹp trên biển.', 'Take photos', 'Lưu giữ khoảnh khắc.'),
    ('Explore', '/ɪkˈsplɔːr/', 'verb', 'Khám phá miền đất', 'Explore ancient caves.', 'Khám phá những hang động thạch nhũ huyền bí.', 'Explore nature', 'Tìm hiểu.'),
    ('Journey', '/ˈdʒɜːni/', 'noun', 'Chuyến hành trình', 'A memorable journey.', 'Một chuyến hành trình tràn ngập niềm vui và bài học.', 'Long journey', 'Hành trình xa.'),
    ('Destination', '/ˌdestɪˈneɪʃn/', 'noun', 'Điểm đến du lịch', 'A popular tourist destination.', 'Một điểm đến du lịch thu hút đông đảo du khách.', 'Final destination', 'Nơi đến.'),
    ('Experience', '/ɪkˈspɪəriəns/', 'noun / verb', 'Trải nghiệm thực tế', 'An unforgettable experience.', 'Một trải nghiệm thực tế không bao giờ quên trong đời.', 'Unforgettable experience', 'Vốn sống.'),
    ('Ancient Town', '/ˈeɪnʃənt taʊn/', 'noun', 'Phố cổ rêu phong', 'Lanterns in Hoi An Ancient Town.', 'Những chiếc đèn lồng lung linh nơi phố cổ Hội An.', 'Hoi An Ancient Town', 'Khu phố xưa.')
])

# Unit 4: Did You Go to the Party?
add('unit-g5-u4', 'Dự tiệc sinh nhật & Hoạt động quá khứ', [
    ('Party', '/ˈpɑːti/', 'noun', 'Bữa tiệc liên hoan', 'Did you go to the party?', 'Bạn có đến dự bữa tiệc liên hoan hôm qua không?', 'Birthday party', 'Buổi tiệc.'),
    ('Birthday party', '/ˈbɜːθdeɪ ˈpɑːti/', 'noun', 'Tiệc mừng sinh nhật', 'A lively birthday party.', 'Một bữa tiệc sinh nhật sôi động và ấm áp.', 'Have party', 'Tiệc sinh nhật.'),
    ('Funfair', '/ˈfʌnfeər/', 'noun', 'Hội chợ vui chơi', 'Play games at the funfair.', 'Tham gia các trò chơi vui nhộn tại hội chợ thiếu nhi.', 'At the funfair', 'Hội chợ trò chơi.'),
    ('Festival', '/ˈfestɪvl/', 'noun', 'Lễ hội truyền thống', 'Mid-Autumn Festival.', 'Lễ hội Tết Trung thu ngập tràn ánh trăng rằm.', 'Music festival', 'Lễ hội.'),
    ('Join', '/dʒɔɪn/', 'verb', 'Tham gia, gia nhập', 'Join in the party games.', 'Hào hứng tham gia vào các trò chơi tập thể.', 'Join the party', 'Góp mặt.'),
    ('Invite', '/ɪnˈvaɪt/', 'verb', 'Mời bạn bè đến dự', 'Invite classmates to home.', 'Mời các bạn cùng lớp đến nhà chung vui sinh nhật.', 'Invite friends', 'Gửi lời mời.'),
    ('Guest', '/ɡest/', 'noun', 'Khách mời dự tiệc', 'Welcome party guests.', 'Nhiệt tình chào đón các vị khách mời đến dự tiệc.', 'Welcome guests', 'Người được mời.'),
    ('Delicious food', '/dɪˈlɪʃəs fuːd/', 'phrase', 'Món ăn ngon miệng', 'Eat delicious food together.', 'Cùng nhau thưởng thức những món ăn ngon miệng tuyệt vời.', 'Delicious meals', 'Ẩm thực ngon.'),
    ('Fruit juice', '/fruːt dʒuːs/', 'noun', 'Nước ép hoa quả tươi', 'Drink fresh orange fruit juice.', 'Uống nước ép hoa quả cam tươi mát lạnh.', 'Fresh juice', 'Đồ uống bổ dưỡng.'),
    ('Birthday cake', '/ˈbɜːθdeɪ keɪk/', 'noun', 'Chiếc bánh sinh nhật', 'A chocolate birthday cake.', 'Một chiếc bánh sinh nhật sô-cô-la ngọt ngào.', 'Cut the cake', 'Bánh kem gato.'),
    ('Sing and dance', '/sɪŋ ænd dɑːns/', 'phrase', 'Ca hát và nhảy múa', 'Sing and dance happily.', 'Cùng nhau ca hát và nhảy múa một cách vui vẻ.', 'Sing and dance', 'Vui mừng rộn ràng.'),
    ('Chat with friends', '/tʃæt wɪð frendz/', 'phrase', 'Trò chuyện cùng bạn', 'Chat with friends warmly.', 'Trò chuyện vui vẻ ấm áp cùng bạn bè.', 'Chat with friends', 'Tâm tình chuyện trò.')
], [
    ('Play hide-and-seek', '/pleɪ ˌhaɪd n ˈsiːk/', 'phrase', 'Chơi trò trốn tìm', 'Play hide-and-seek in yard.', 'Chơi trò trốn tìm rộn rã tiếng cười ngoài sân.', 'Play hide-and-seek', 'Trò chơi quen thuộc.'),
    ('Enjoy', '/ɪnˈdʒɔɪ/', 'verb', 'Hưởng thụ, thích thú', 'We enjoyed every moment.', 'Chúng mình đã tận hưởng từng khoảnh khắc đáng nhớ.', 'Enjoy the party', 'Vui vẻ tận hưởng.'),
    ('Climax', '/ˈklaɪmæks/', 'noun', 'Cao trào bữa tiệc', 'The climax of the party.', 'Thời khắc cao trào nhất của bữa tiệc mừng sinh nhật.', 'Party climax', 'Giây phút sôi động.'),
    ('Present', '/ˈpreznt/', 'noun', 'Món quà tặng', 'A gift wrapped in ribbon.', 'Món quà sinh nhật được gói nơ cẩn thận xinh xắn.', 'Open present', 'Quà mừng.'),
    ('Balloon', '/bəˈluːn/', 'noun', 'Quả bóng bay rực rỡ', 'Colorful party balloons.', 'Những chùm bóng bay rực rỡ sắc màu trang trí phòng.', 'Party balloon', 'Bóng trang trí.'),
    ('Atmosphere', '/ˈætməsfɪər/', 'noun', 'Bầu không khí lễ hội', 'A warm party atmosphere.', 'Một bầu không khí tiệc mừng ấm cúng và ngập tràn nụ cười.', 'Joyful atmosphere', 'Không khí chung.'),
    ('Celebrate', '/ˈselɪbreɪt/', 'verb', 'Ăn mừng ngày vui', 'Celebrate with my family.', 'Ăn mừng cùng cả gia đình và người thân yêu.', 'Celebrate together', 'Tổ chức mừng.'),
    ('Remember', '/rɪˈmembər/', 'verb', 'Nhớ mãi trong lòng', 'I will always remember it.', 'Mình sẽ luôn ghi nhớ bữa tiệc sinh nhật ý nghĩa này.', 'Remember well', 'Khắc ghi kỷ niệm.')
])

# Unit 5: Where Will You Be This Weekend?
add('unit-g5-u5', 'Kế hoạch tương lai với Will', [
    ('Weekend', '/ˌwiːkˈend/', 'noun', 'Dịp cuối tuần', 'Where will you be this weekend?', 'Dịp cuối tuần này bạn dự định sẽ ở đâu?', 'This weekend', 'Thứ 7 & Chủ Nhật.'),
    ('Seaside', '/ˈsiːsaɪd/', 'noun', 'Bờ biển mát rượi', 'I will be at the seaside.', 'Cuối tuần này mình sẽ đi nghỉ mát ở bờ biển.', 'At the seaside', 'Ven biển.'),
    ('Island', '/ˈaɪlənd/', 'noun', 'Hòn đảo xa bờ', 'Visit a tropical island.', 'Đi tàu thăm một hòn đảo nhiệt đới hoang sơ.', 'Remote island', 'Chữ s câm.'),
    ('Countryside', '/ˈkʌntrisaɪd/', 'noun', 'Miền quê thanh bình', 'I think I will be in countryside.', 'Mình nghĩ mình sẽ về miền thôn quê thanh bình.', 'In the countryside', 'Đồng quê xanh.'),
    ('Mountain', '/ˈmaʊntən/', 'noun', 'Miền núi cao vút', 'Hike high in the mountains.', 'Đi leo núi khám phá những đỉnh núi cao vút.', 'In the mountains', 'Đồi núi.'),
    ('Cave', '/keɪv/', 'noun', 'Hang động kỳ vĩ', 'Explore stalactite caves.', 'Khám phá những hang động thạch nhũ lung linh kỳ vĩ.', 'Explore cave', 'Hang thạch nhũ.'),
    ('Beach', '/biːtʃ/', 'noun', 'Bãi biển cát vàng', 'Walk on sandy beach.', 'Đi dạo thảnh thơi trên bờ cát vàng óng ả.', 'On the beach', 'Bãi tắm.'),
    ('Build sandcastles', '/bɪld ˈsændkɑːslz/', 'phrase', 'Xây lâu đài cát', 'Children build sandcastles.', 'Các bạn nhỏ say sưa xây những lâu đài cát bên sóng.', 'Build sandcastles', 'Trò chơi bãi biển.'),
    ('Swim in the sea', '/swɪm ɪn ðə siː/', 'phrase', 'Bơi lội dưới biển', 'Swim in clear blue sea.', 'Bơi lội thỏa thích dưới làn nước biển trong xanh.', 'Swim in the sea', 'Tắm biển.'),
    ('Explore caves', '/ɪkˈsplɔːr keɪvz/', 'phrase', 'Thám hiểm hang động', 'Explore mysterious caves.', 'Thám hiểm những hang động kỳ bí của thiên nhiên.', 'Explore caves', 'Thám hiểm.'),
    ('Sunbathe', '/ˈsʌnbeɪð/', 'verb', 'Tắm nắng bãi biển', 'Sunbathe on the shore.', 'Tắm nắng ấm áp trên bờ biển lúc ban mai.', 'Sunbathe on shore', 'Nghỉ dưỡng.'),
    ('Boat trip', '/bəʊt trɪp/', 'noun', 'Chuyến du ngoạn thuyền', 'Enjoy a boat trip around bays.', 'Tận hưởng chuyến du ngoạn bằng thuyền ngắm vịnh.', 'Take a boat trip', 'Chuyến đi thuyền.')
], [
    ('Future plan', '/ˈfjuːtʃər plæn/', 'noun', 'Kế hoạch tương lai', 'Discuss our future plans.', 'Cùng nhau thảo luận về các kế hoạch tương lai thú vị.', 'Make future plans', 'Dự định sắp tới.'),
    ('Expect', '/ɪkˈspekt/', 'verb', 'Kỳ vọng, mong chờ', 'I expect sunny weather.', 'Mình rất mong chờ thời tiết sẽ nắng ráo đẹp trời.', 'Expect good news', 'Hy vọng.'),
    ('Hope', '/həʊp/', 'verb / noun', 'Hy vọng, niềm hy vọng', 'I hope we will have fun.', 'Mình hy vọng chúng mình sẽ có một chuyến đi thật vui vẻ.', 'Hope so', 'Niềm tin.'),
    ('Adventure', '/ədˈventʃər/', 'noun', 'Chuyến phiêu lưu', 'An exciting forest adventure.', 'Một chuyến phiêu lưu kỳ thú giữa rừng cây xanh mát.', 'Exciting adventure', 'Khám phá mạo hiểm.'),
    ('Tent', '/tent/', 'noun', 'Chiếc lều cắm trại', 'Pitch a tent under pine trees.', 'Dựng một chiếc lều cắm trại dưới bóng hàng thông.', 'Pitch a tent', 'Lều bạt.'),
    ('Campfire', '/ˈkæmpfaɪər/', 'noun', 'Ánh lửa trại bập bùng', 'Sing songs around campfire.', 'Cùng nhau ca hát rộn ràng bên ánh lửa trại bập bùng.', 'Around campfire', 'Lửa trại đêm.'),
    ('Destination', '/ˌdestɪˈneɪʃn/', 'noun', 'Điểm đến du lịch', 'A dream travel destination.', 'Một điểm đến du lịch trong mơ của cả gia đình.', 'Holiday destination', 'Nơi đến.'),
    ('Weather forecast', '/ˈweðər ˈfɔːkɑːst/', 'noun', 'Dự báo thời tiết', 'Check the weather forecast.', 'Tra cứu bản tin dự báo thời tiết trước khi khởi hành.', 'Check forecast', 'Tin thời tiết.')
])

# Unit 6: How Many Lessons Do You Have Today?
add('unit-g5-u6', 'Môn học & Tần suất tiết học', [
    ('Lesson', '/ˈlesn/', 'noun', 'Tiết học, bài học', 'How many lessons do you have?', 'Hôm nay bạn có bao nhiêu tiết học ở trường?', 'Have lessons', 'Tiết lên lớp.'),
    ('Period', '/ˈpɪəriəd/', 'noun', 'Tiết học quy định', 'The first period is Maths.', 'Tiết học đầu tiên buổi sáng là môn Toán học.', 'First period', 'Tiết 45 phút.'),
    ('School day', '/ˈskuːl deɪ/', 'noun', 'Ngày đi học', 'A busy school day.', 'Một ngày đi học bận rộn với nhiều kiến thức mới.', 'Every school day', 'Ngày đến trường.'),
    ('Monday to Friday', '/ˈmʌndeɪ tuː ˈfraɪdeɪ/', 'phrase', 'Từ thứ Hai đến thứ Sáu', 'We go to school Monday to Friday.', 'Chúng mình đến trường học từ thứ Hai đến thứ Sáu.', 'Weekdays', 'Tuần học chính.'),
    ('Except', '/ɪkˈsept/', 'preposition', 'Ngoại trừ, trừ ra', 'Every day except Sunday.', 'Đến lớp tất cả các ngày trong tuần ngoại trừ Chủ Nhật.', 'Except for', 'Loại trừ.'),
    ('How often', '/haʊ ˈɒfn/', 'phrase', 'Tần suất bao lâu một lần', 'How often do you have English?', 'Bao lâu một lần bạn có tiết học tiếng Anh?', 'How often do you', 'Câu hỏi tần suất.'),
    ('Once', '/wʌns/', 'adverb', 'Một lần', 'I have Science once a week.', 'Mình học môn Khoa học một lần mỗi tuần.', 'Once a week', '1 lần.'),
    ('Twice', '/twaɪs/', 'adverb', 'Hai lần', 'We have Music twice a week.', 'Chúng mình học môn Âm nhạc hai lần mỗi tuần.', 'Twice a week', '2 lần.'),
    ('Three times', '/θriː taɪmz/', 'phrase', 'Ba lần', 'PE three times a week.', 'Học thể dục ba lần mỗi tuần để nâng cao thể lực.', 'Three times a week', '3 lần.'),
    ('Four times', '/fɔːr taɪmz/', 'phrase', 'Bốn lần', 'English four times a week.', 'Học tiếng Anh bốn lần một tuần để nâng cao phản xạ.', 'Four times a week', '4 lần.'),
    ('Timetable', '/ˈtaɪmteɪbl/', 'noun', 'Thời khóa biểu trường', 'Check school timetable.', 'Kiểm tra thời khóa biểu để chuẩn bị sách vở.', 'Class timetable', 'Lịch học các môn.'),
    ('Favorite subject', '/ˈfeɪvərɪt ˈsʌbdʒɪkt/', 'noun', 'Môn học yêu thích nhất', 'English is my favorite subject.', 'Tiếng Anh chính là môn học yêu thích nhất của mình.', 'Best subject', 'Môn đam mê.')
], [
    ('Attend', '/əˈtend/', 'verb', 'Tham dự, có mặt', 'Attend all classes diligently.', 'Đi học đầy đủ chuyên cần không vắng tiết nào.', 'Attend classes', 'Đi học đều.'),
    ('Prepare', '/prɪˈpeər/', 'verb', 'Chuẩn bị bài vở', 'Prepare lessons before class.', 'Soạn và chuẩn bị bài vở kỹ càng trước khi đến lớp.', 'Prepare lessons', 'Soạn bài.'),
    ('Notebook', '/ˈnəʊtbʊk/', 'noun', 'Vở ghi bài học', 'Keep neat handwriting in notebook.', 'Viết chữ nắn nót sạch đẹp vào cuốn vở ghi.', 'Neat notebook', 'Vở học sinh.'),
    ('Term', '/tɜːm/', 'noun', 'Học kỳ', 'The first term exam.', 'Kỳ thi học kỳ một sắp sửa bắt đầu.', 'School term', 'Học kỳ trường.'),
    ('Semester', '/sɪˈmestər/', 'noun', 'Học kỳ học thuật', 'New subjects in this semester.', 'Những môn học mới mẻ bổ ích trong học kỳ này.', 'First semester', 'Học kỳ.'),
    ('Academic', '/ˌækəˈdemɪk/', 'adjective', 'Học thuật, học tập', 'Academic achievements.', 'Những thành tích học tập xuất sắc đáng tự hào.', 'Academic results', 'Thuộc về học vấn.'),
    ('Hard-working', '/ˌhɑːd ˈwɜːkɪŋ/', 'adjective', 'Chăm chỉ, cần cù', 'A hard-working student.', 'Một học sinh chăm chỉ, chịu khó tìm tòi học hỏi.', 'Very hard-working', 'Cần mẫn.'),
    ('Diligent', '/ˈdɪlɪdʒənt/', 'adjective', 'Siêng năng, chuyên cần', 'Diligent practice leads to success.', 'Sự luyện tập siêng năng chuyên cần sẽ dẫn tới thành công.', 'Diligent pupil', 'Cần cù bù thông minh.')
])

# Unit 7: How Do You Learn English?
add('unit-g5-u7', 'Phương pháp học tiếng Anh hiệu quả', [
    ('Learn', '/lɜːn/', 'verb', 'Học tập, tiếp thu', 'How do you learn English?', 'Bạn áp dụng phương pháp nào để học tốt tiếng Anh?', 'Learn English', 'Tiếp nhận kiến thức.'),
    ('Practice', '/ˈpræktɪs/', 'verb', 'Luyện tập thực hành', 'I practice speaking English daily.', 'Mình luyện nói tiếng Anh đều đặn mỗi ngày.', 'Practice daily', 'Rèn luyện thực hành.'),
    ('Speak', '/spiːk/', 'verb', 'Nói chuyện, phát biểu', 'Speak English with foreigners.', 'Tự tin trò chuyện tiếng Anh cùng người nước ngoài.', 'Speak fluently', 'Kỹ năng Nói.'),
    ('Listen', '/ˈlɪsn/', 'verb', 'Lắng nghe, thấu hiểu', 'Listen to English podcasts.', 'Chăm chú lắng nghe các bài nghe tiếng Anh.', 'Listen carefully', 'Kỹ năng Nghe.'),
    ('Read', '/riːd/', 'verb', 'Đọc sách báo', 'Read English short stories.', 'Đọc những mẩu truyện ngắn tiếng Anh lý thú.', 'Read stories', 'Kỹ năng Đọc.'),
    ('Write', '/raɪt/', 'verb', 'Viết bài, viết thư', 'Write emails to foreign penfriends.', 'Viết thư điện tử gửi cho bạn bè quốc tế.', 'Write emails', 'Kỹ năng Viết.'),
    ('Watch cartoons', '/wɒtʃ kɑːˈtuːnz/', 'phrase', 'Xem phim hoạt hình', 'Watch cartoons with subtitles.', 'Xem phim hoạt hình tiếng Anh có phụ đề song ngữ.', 'Watch cartoons', 'Học qua phim.'),
    ('Read stories', '/riːd ˈstɔːriz/', 'phrase', 'Đọc truyện ngắn', 'Read fairy tales in English.', 'Đọc những câu chuyện cổ tích viết bằng tiếng Anh.', 'Read short stories', 'Mở rộng từ vựng.'),
    ('Write emails', '/raɪt ˈiːmeɪlz/', 'phrase', 'Viết thư điện tử', 'Practice writing emails.', 'Luyện viết thư điện tử tiếng Anh cho bạn bè.', 'Send emails', 'Giao lưu qua thư.'),
    ('Talk with foreigners', '/tɔːk wɪð ˈfɒrənəz/', 'phrase', 'Trò chuyện với khách Tây', 'Talk with tourists in old quarter.', 'Trò chuyện cùng du khách quốc tế tại phố cổ.', 'Talk with foreigners', 'Giao tiếp thực tế.'),
    ('Pronunciation', '/prəˌnʌnsiˈeɪʃn/', 'noun', 'Cách phát âm chuẩn', 'Practice standard pronunciation.', 'Luyện phát âm chuẩn xác theo phiên âm quốc tế IPA.', 'Good pronunciation', 'Ngữ âm chuẩn.'),
    ('Vocabulary', '/vəˈkæbjələri/', 'noun', 'Vốn từ vựng', 'Enrich your daily vocabulary.', 'Làm phong phú thêm vốn từ vựng mỗi ngày.', 'Rich vocabulary', 'Vốn từ ngữ.')
], [
    ('Grammar', '/ˈɡræmər/', 'noun', 'Ngữ pháp câu', 'Master basic English grammar.', 'Nắm thật vững các quy tắc ngữ pháp tiếng Anh cơ bản.', 'English grammar', 'Cấu trúc câu.'),
    ('Fluency', '/ˈfluːənsi/', 'noun', 'Độ lưu loát, trôi chảy', 'Improve speaking fluency.', 'Cải thiện độ lưu loát trôi chảy khi giao tiếp.', 'Speaking fluency', 'Không ngập ngừng.'),
    ('Method', '/ˈmeθəd/', 'noun', 'Phương pháp học', 'An effective learning method.', 'Một phương pháp học tập mang lại hiệu quả cao.', 'Effective method', 'Cách thức.'),
    ('Tip', '/tɪp/', 'noun', 'Mẹo học hay', 'Helpful exam preparation tips.', 'Những mẹo làm bài thi hữu ích giúp đạt điểm cao.', 'Useful tip', 'Bí quyết nhỏ.'),
    ('Subtitle', '/ˈsʌbtaɪtl/', 'noun', 'Phụ đề phim', 'Watch movies with subtitles.', 'Xem phim có phụ đề tiếng Anh để học từ mới.', 'English subtitles', 'Dòng chữ dịch.'),
    ('Foreign language', '/ˈfɒrən ˈlæŋɡwɪdʒ/', 'noun', 'Ngoại ngữ', 'English is a global foreign language.', 'Tiếng Anh là một ngoại ngữ mang tính toàn cầu.', 'Second language', 'Tiếng nước ngoài.'),
    ('Communication', '/kəˌmjuːnɪˈkeɪʃn/', 'noun', 'Giao tiếp truyền đạt', 'Communication skills are vital.', 'Kỹ năng giao tiếp là vô cùng quan trọng trong đời.', 'Effective communication', 'Truyền đạt ý.'),
    ('Confident', '/ˈkɒnfɪdənt/', 'adjective', 'Tự tin khi nói', 'Feel confident when speaking.', 'Cảm thấy hoàn toàn tự tin khi nói tiếng Anh trước lớp.', 'Very confident', 'Không rụt rè.')
])

# Unit 8: What Are You Reading?
add('unit-g5-u8', 'Sách truyện & Nhân vật yêu thích', [
    ('Fairy tale', '/ˈfeəri teɪl/', 'noun', 'Truyện cổ tích', 'I love reading fairy tales.', 'Mình rất yêu thích việc đọc những câu chuyện cổ tích.', 'Read fairy tales', 'Truyện dân gian kỳ ảo.'),
    ('Folk tale', '/ˈfəʊk teɪl/', 'noun', 'Truyện dân gian', 'A meaningful Vietnamese folk tale.', 'Một câu chuyện dân gian Việt Nam giàu ý nghĩa giáo dục.', 'Traditional folk tale', 'Truyện truyền miệng.'),
    ('Comic book', '/ˈkɒmɪk bʊk/', 'noun', 'Sách truyện tranh', 'Read funny comic books.', 'Đọc những cuốn truyện tranh vui tươi thư giãn.', 'Read comics', 'Truyện tranh ảnh.'),
    ('Ghost story', '/ˈɡəʊst ˈstɔːri/', 'noun', 'Truyện ma, kinh dị', 'Ghost stories around campfire.', 'Kể những câu chuyện ma rùng rợn bên ánh lửa trại.', 'Tell ghost stories', 'Truyện kinh dị.'),
    ('Character', '/ˈkærəktər/', 'noun', 'Nhân vật trong truyện', 'Who is the main character?', 'Ai là nhân vật chính diện trong câu chuyện này?', 'Main character', 'Hình tượng nhân vật.'),
    ('Kind', '/kaɪnd/', 'adjective', 'Nhân hậu, tốt bụng', 'Snow White is gentle and kind.', 'Nàng Bạch Tuyết vô cùng dịu dàng và tốt bụng.', 'Kind heart', 'Lương thiện.'),
    ('Gentle', '/ˈdʒentl/', 'adjective', 'Dịu dàng, hiền lành', 'A gentle princess.', 'Một nàng công chúa dịu dàng nết na.', 'Gentle nature', 'Thùy mị.'),
    ('Brave', '/breɪv/', 'adjective', 'Dũng cảm, can trường', 'Thach Sanh is very brave.', 'Chàng Thạch Sanh vô cùng dũng cảm diệt chằn tinh.', 'Brave knight', 'Không sợ hiểm nguy.'),
    ('Clever', '/ˈklevər/', 'adjective', 'Thông minh, khéo léo', 'The clever fox outsmarts the crow.', 'Chú cáo thông minh đã lừa được chú quạ.', 'Clever mind', 'Nhanh trí.'),
    ('Hardworking', '/ˌhɑːdˈwɜːkɪŋ/', 'adjective', 'Chăm chỉ chịu khó', 'The hardworking peasant girl.', 'Cô gái nông thôn nghèo nhưng vô cùng chăm chỉ.', 'Hardworking girl', 'Cần mẫn.'),
    ('Fox', '/fɒks/', 'noun', 'Con cáo xảo quyệt', 'The fox and the crow.', 'Truyện ngụ ngôn Cáo và Quạ.', 'Cunning fox', 'Loài cáo.'),
    ('Crow', '/krəʊ/', 'noun', 'Con quạ lông đen', 'The crow on the tree branch.', 'Chú quạ lông đen nhánh đậu trên cành cây cao.', 'Black crow', 'Loài quạ.')
], [
    ('Snow White', '/ˌsnəʊ ˈwaɪt/', 'noun', 'Nàng Bạch Tuyết', 'Snow White and seven dwarfs.', 'Nàng Bạch Tuyết và bảy chú lùn nhân hậu.', 'Story of Snow White', 'Nhân vật cổ tích.'),
    ('Aladdin', '/əˈlædɪn/', 'noun', 'Chàng A-la-đanh', 'Aladdin and the magic lamp.', 'Chàng A-la-đanh và cây đèn thần kỳ diệu.', 'Magic lamp', 'Truyện Nghìn lẻ một đêm.'),
    ('Magic lamp', '/ˈmædʒɪk læmp/', 'noun', 'Cây đèn thần kỳ', 'Rub the magic lamp.', 'Xoa nhẹ vào cây đèn thần để điều ước thành hiện thực.', 'Rub the lamp', 'Vật thần kỳ.'),
    ('Plot', '/plɒt/', 'noun', 'Cốt truyện diễn biến', 'An exciting story plot.', 'Một cốt truyện ly kỳ và đầy những bất ngờ thú vị.', 'Story plot', 'Mạch diễn biến.'),
    ('Moral lesson', '/ˈmɒrəl ˈlesn/', 'noun', 'Bài học đạo đức sâu sắc', 'Every folk tale has a moral lesson.', 'Mỗi câu chuyện ngụ ngôn đều để lại bài học đạo đức sâu sắc.', 'Valuable moral lesson', 'Ý nghĩa nhân văn.'),
    ('Reading habit', '/ˈriːdɪŋ ˈhæbɪt/', 'noun', 'Thói quen đọc sách', 'Build a lifelong reading habit.', 'Xây dựng thói quen đọc sách suốt cả cuộc đời.', 'Good reading habit', 'Văn hóa đọc.'),
    ('Imagination', '/ɪˌmædʒɪˈneɪʃn/', 'noun', 'Trí tưởng tượng phong phú', 'Reading sparks imagination.', 'Việc đọc sách thắp sáng trí tưởng tượng phong phú của em.', 'Rich imagination', 'Khả năng sáng tạo.'),
    ('Recommend', '/ˌrekəˈmend/', 'verb', 'Gợi ý, giới thiệu', 'I recommend this wonderful book.', 'Mình xin gợi ý cuốn sách tuyệt vời này cho bạn.', 'Highly recommend', 'Khuyên đọc.')
])

# Unit 9: What Did You See at the Zoo?
add('unit-g5-u9', 'Động vật hoang dã & Vườn bách thú', [
    ('Zoo', '/zuː/', 'noun', 'Vườn bách thú', 'What did you see at the zoo?', 'Bạn đã nhìn thấy những con vật gì ở sở thú?', 'At the zoo', 'Vườn thú.'),
    ('Wild animal', '/waɪld ˈænɪml/', 'noun', 'Động vật hoang dã', 'Protect wild animals in nature.', 'Chung tay bảo vệ các loài động vật hoang dã ngoài tự nhiên.', 'Wild fauna', 'Thú hoang dã.'),
    ('Tiger', '/ˈtaɪɡər/', 'noun', 'Con hổ dũng mãnh', 'A fierce Bengal tiger.', 'Một chú hổ Bengal vằn dũng mãnh giữa chuồng.', 'Fierce tiger', 'Chúa sơn lâm.'),
    ('Lion', '/ˈlaɪən/', 'noun', 'Con sư tử', 'The king of jungle lion.', 'Sư tử được mệnh danh là vị chúa tể rừng xanh.', 'Roaring lion', 'Sư tử.'),
    ('Elephant', '/ˈelɪfənt/', 'noun', 'Con voi khổng lồ', 'An elephant sprays water with its trunk.', 'Chú voi dùng chiếc vòi dài phun nước tắm mát.', 'Big elephant', 'Loài voi.'),
    ('Monkey', '/ˈmʌŋki/', 'noun', 'Con khỉ tinh nghịch', 'Monkeys swing from branch to branch.', 'Những chú khỉ tinh nghịch chuyền cành thoăn thoắt.', 'Playful monkey', 'Khỉ leo trèo.'),
    ('Peacock', '/ˈpiːkɒk/', 'noun', 'Con chim công rực rỡ', 'The peacock spreads its colorful tail.', 'Chú công xòe chiếc đuôi lộng lẫy múa duyên dáng.', 'Dancing peacock', 'Chim công.'),
    ('Crocodile', '/ˈkrɒkədaɪl/', 'noun', 'Con cá sấu đầm lầy', 'A crocodile sunbathes by muddy water.', 'Một chú cá sấu khổng lồ nằm phơi nắng bên đầm.', 'Big crocodile', 'Bò sát lớn.'),
    ('Python', '/ˈpaɪθən/', 'noun', 'Con trăn khổng lồ', 'A giant python coils around branch.', 'Một chú trăn khổng lồ cuộn mình trên cành cây.', 'Giant python', 'Trăn gấm.'),
    ('Gorilla', '/ɡəˈrɪlə/', 'noun', 'Con tinh tinh, khỉ đột', 'Strong silverback gorilla.', 'Chú khỉ đột lưng xám to lớn và khỏe mạnh.', 'Silverback gorilla', 'Khỉ đột.'),
    ('Roar', '/rɔːr/', 'verb', 'Gầm rú vang dội', 'Tigers roar loudly in cage.', 'Những chú hổ gầm rú vang dội trong khu chuồng.', 'Roar loudly', 'Tiếng gầm.'),
    ('Jump', '/dʒʌmp/', 'verb', 'Nhảy nhót thoăn thoắt', 'Monkeys jump between trees.', 'Lũ khỉ nhảy nhót thoăn thoắt giữa các tán cây.', 'Jump quickly', 'Bật nhảy.')
], [
    ('Walk slowly', '/wɔːk ˈsləʊli/', 'phrase', 'Đi lại chậm chạp', 'Turtles walk slowly on grass.', 'Những chú rùa bò chậm chạp từng bước trên bãi cỏ.', 'Walk slowly', 'Chậm chạp.'),
    ('Move fast', '/muːv fɑːst/', 'phrase', 'Di chuyển cực nhanh', 'Cheetahs move fast in chase.', 'Báo hoa mai di chuyển cực nhanh khi rượt đuổi con mồi.', 'Move fast', 'Thoăn thoắt.'),
    ('Fur', '/fɜːr/', 'noun', 'Bộ lông mao thú', 'Soft warm animal fur.', 'Bộ lông mao thú dày dặn và ấm áp trong mùa đông.', 'Thick fur', 'Lông mao.'),
    ('Feather', '/ˈfeðər/', 'noun', 'Chiếc lông vũ', 'Peacock feathers shine bright.', 'Những chiếc lông vũ của chim công óng ánh màu ngọc.', 'Colorful feather', 'Lông chim.'),
    ('Trunk', '/trʌŋk/', 'noun', 'Chiếc vòi voi', 'The long flexible trunk of elephant.', 'Chiếc vòi dài uốn lượn linh hoạt của chú voi.', 'Long trunk', 'Vòi voi.'),
    ('Enclosure', '/ɪnˈkləʊʒər/', 'noun', 'Khu chuồng bán hoang dã', 'Spacious zoo enclosure.', 'Khu chuồng bán hoang dã rộng rãi cho muông thú.', 'Zoo enclosure', 'Khu bán hoang dã.'),
    ('Protect wildlife', '/prəˈtekt ˈwaɪldlaɪf/', 'phrase', 'Bảo vệ thiên nhiên hoang dã', 'We must protect wildlife from poachers.', 'Chúng ta phải bảo vệ muông thú khỏi nạn săn bắt trái phép.', 'Protect wildlife', 'Hành động xanh.'),
    ('Endangered species', '/ɪnˈdeɪndʒəd ˈspiːʃiːz/', 'noun', 'Loài có nguy cơ tuyệt chủng', 'Rhinos are endangered species.', 'Tê giác là loài động vật quý hiếm đang có nguy cơ tuyệt chủng.', 'Save endangered species', 'Động vật sách đỏ.')
])

# Unit 10: When Will Sports Day Be?
add('unit-g5-u10', 'Ngày hội thể thao & Sự kiện tương lai', [
    ('Sports Day', '/ˈspɔːts deɪ/', 'noun', 'Ngày hội thể thao trường', 'When will Sports Day be?', 'Khi nào ngày hội thể thao của trường sẽ diễn ra?', 'On Sports Day', 'Hội khỏe trường.'),
    ('Teachers Day', '/ˈtiːtʃəz deɪ/', 'noun', 'Ngày Nhà giáo Việt Nam', 'Celebrate Teachers Day in November.', 'Chào mừng ngày Nhà giáo Việt Nam 20/11 thiêng liêng.', 'On Teachers Day', 'Tri ân thầy cô.'),
    ('Childrens Day', '/ˈtʃɪldrənz deɪ/', 'noun', 'Ngày Quốc tế Thiếu nhi', 'Childrens Day is on June first.', 'Ngày Quốc tế Thiếu nhi diễn ra vào ngày mùng 1 tháng Sáu.', 'On Childrens Day', 'Tết thiếu nhi.'),
    ('Independence Day', '/ˌɪndɪˈpendəns deɪ/', 'noun', 'Ngày Tết Độc lập 2/9', 'Independence Day on September second.', 'Ngày Tết Độc lập thiêng liêng mùng 2 tháng Chín của dân tộc.', 'Celebrate Independence', 'Quốc khánh.'),
    ('Event', '/ɪˈvent/', 'noun', 'Sự kiện trọng đại', 'A grand school sports event.', 'Một sự kiện thể thao trọng đại và rộn ràng của trường.', 'School event', 'Sự kiện.'),
    ('Take part in', '/teɪk pɑːt ɪn/', 'phrase', 'Tham gia thi đấu', 'I will take part in running race.', 'Mình sẽ tham gia thi đấu ở đường chạy cự ly ngắn.', 'Take part in', 'Góp mặt thi thố.'),
    ('Compete', '/kəmˈpiːt/', 'verb', 'Tranh tài thi đấu', 'Compete fairly with friends.', 'Tranh tài thi đấu một cách công bằng và hết mình.', 'Compete fairly', 'Thi đua.'),
    ('Running race', '/ˈrʌnɪŋ reɪs/', 'noun', 'Cuộc đua chạy tiếp sức', 'Win the 100-meter running race.', 'Giành chiến thắng rực rỡ ở cuộc đua chạy 100 mét.', 'In running race', 'Chạy nước rút.'),
    ('Tug of war', '/ˌtʌɡ əv ˈwɔːr/', 'noun', 'Trò chơi kéo co', 'A dramatic game of tug of war.', 'Một trận đấu kéo co nghẹt thở đòi hỏi sự đồng lòng.', 'Play tug of war', 'Kéo co tập thể.'),
    ('Relay race', '/ˈriːleɪ reɪs/', 'noun', 'Chạy tiếp sức', 'Pass the baton in relay race.', 'Chuyền gậy tiếp sức ăn ý trong cuộc đua tiếp sức.', 'Run relay race', 'Tiếp sức đồng đội.'),
    ('Football match', '/ˈfʊtbɔːl mætʃ/', 'noun', 'Trận đấu bóng đá', 'An exciting final football match.', 'Một trận chung kết bóng đá kịch tính tới phút chót.', 'Final match', 'Trận cầu đỉnh cao.'),
    ('Table tennis', '/ˈteɪbl tenɪs/', 'noun', 'Bóng bàn thi đấu', 'Compete in table tennis tournament.', 'Tranh tài ở giải đấu bóng bàn cấp trường.', 'Table tennis match', 'Môn bóng bàn.')
], [
    ('Medal', '/ˈmedl/', 'noun', 'Tấm huy chương danh giá', 'Win a shiny gold medal.', 'Giành được một tấm huy chương vàng sáng chói danh giá.', 'Gold medal', 'Giải thưởng.'),
    ('Champion', '/ˈtʃæmpiən/', 'noun', 'Nhà vô địch giải đấu', 'They became class champions.', 'Họ đã xuất sắc trở thành những nhà vô địch của khối lớp.', 'Become champion', 'Quán quân.'),
    ('Win', '/wɪn/', 'verb', 'Giành chiến thắng vang dội', 'We won the championship trophy.', 'Chúng mình đã giành chiến thắng và nâng cao cúp vô địch.', 'Win victory', 'Thắng cuộc.'),
    ('Cheer', '/tʃɪər/', 'verb', 'Reo hò cổ vũ nhiệt tình', 'Audience cheered enthusiastically.', 'Khán giả trên khán đài reo hò cổ vũ vô cùng nhiệt tình.', 'Cheer loudly', 'Cổ vũ.'),
    ('Audience', '/ˈɔːdiəns/', 'noun', 'Khán giả xem thi đấu', 'Thousands of spectators and audience.', 'Hàng ngàn khán giả cuồng nhiệt theo dõi trận cầu.', 'School audience', 'Người xem.'),
    ('Team spirit', '/tiːm ˈspɪrɪt/', 'noun', 'Tinh thần đồng đội gắn kết', 'Victory comes from great team spirit.', 'Chiến thắng vang dội bắt nguồn từ tinh thần đồng đội keo sơn.', 'Strong team spirit', 'Đoàn kết.'),
    ('Practice hard', '/ˈpræktɪs hɑːd/', 'phrase', 'Khổ luyện chăm chỉ', 'Athletes practice hard every day.', 'Các vận động viên khổ luyện chăm chỉ mồ hôi trên sân.', 'Practice hard', 'Rèn luyện bền bỉ.'),
    ('Score a goal', '/skɔːr ə ɡəʊl/', 'phrase', 'Ghi bàn thắng quyết định', 'Score a winning goal at last second.', 'Ghi một bàn thắng quyết định vào những giây cuối cùng.', 'Score a goal', 'Lập công trên sân.')
])

print("vocab_grade5.py loaded with 10 units")
