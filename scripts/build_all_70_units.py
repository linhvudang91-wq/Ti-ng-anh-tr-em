#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generates src/data/curriculum/unitVocabularyDatabase.ts
Populates 20-25 high-quality vocabulary words for every unit (70 units total across Grades 3-9).
"""
import json
import sys

# Unit topics and descriptions
UNITS_META = [
    # Grade 3
    (3, 1, 'unit-g3-u1', 'Hello & Greetings', 'Chào hỏi & Làm quen'),
    (3, 2, 'unit-g3-u2', 'My Friends & Classroom', 'Bạn bè & Lớp học'),
    (3, 3, 'unit-g3-u3', 'School Things & Supplies', 'Đồ dùng học tập'),
    (3, 4, 'unit-g3-u4', 'Colors & Shapes', 'Màu sắc & Hình khối'),
    (3, 5, 'unit-g3-u5', 'Numbers & Age', 'Số đếm & Tuổi tác'),
    (3, 6, 'unit-g3-u6', 'My Family Members', 'Gia đình yêu thương'),
    (3, 7, 'unit-g3-u7', 'Body Parts & Senses', 'Các bộ phận cơ thể & Giác quan'),
    (3, 8, 'unit-g3-u8', 'Toys & Games', 'Đồ chơi & Trò chơi trẻ thơ'),
    (3, 9, 'unit-g3-u9', 'Pets & Domestic Animals', 'Thú cưng trong nhà'),
    (3, 10, 'unit-g3-u10', 'Break Time & Fun Activities', 'Giờ ra chơi sôi động'),

    # Grade 4
    (4, 1, 'unit-g4-u1', 'My Friends & Countries', 'Bạn bè & Quốc tịch các nước'),
    (4, 2, 'unit-g4-u2', 'Time & Daily Routines', 'Thời gian & Thói quen hàng ngày'),
    (4, 3, 'unit-g4-u3', 'Days of the Week & Schedules', 'Các ngày trong tuần & Thời khóa biểu'),
    (4, 4, 'unit-g4-u4', 'Months & Birthdays', 'Tháng trong năm & Ngày sinh nhật'),
    (4, 5, 'unit-g4-u5', 'Can & Abilities', 'Khả năng & Năng khiếu cá nhân'),
    (4, 6, 'unit-g4-u6', 'My School & Places', 'Trường học & Các phòng chức năng'),
    (4, 7, 'unit-g4-u7', 'Favorite Subjects', 'Môn học yêu thích & Thời khóa biểu'),
    (4, 8, 'unit-g4-u8', 'Free Time & Hobbies', 'Sở thích & Thời gian rảnh'),
    (4, 9, 'unit-g4-u9', 'In the Classroom & Actions', 'Hành động đang diễn ra trong lớp học'),
    (4, 10, 'unit-g4-u10', 'Where Were You Yesterday?', 'Hôm qua bạn ở đâu?'),

    # Grade 5
    (5, 1, 'unit-g5-u1', 'All About Me & Daily Routines', 'Thói quen & Lối sống hàng ngày'),
    (5, 2, 'unit-g5-u2', 'Address & Hometown', 'Địa chỉ & Quê hương thân yêu'),
    (5, 3, 'unit-g5-u3', 'Where Did You Go on Holiday?', 'Kỳ nghỉ đã qua & Điểm đến'),
    (5, 4, 'unit-g5-u4', 'Did You Go to the Party?', 'Dự tiệc sinh nhật & Hoạt động quá khứ'),
    (5, 5, 'unit-g5-u5', 'Where Will You Be This Weekend?', 'Kế hoạch tương lai với Will'),
    (5, 6, 'unit-g5-u6', 'How Many Lessons Do You Have Today?', 'Môn học & Tần suất tiết học'),
    (5, 7, 'unit-g5-u7', 'How Do You Learn English?', 'Phương pháp học tiếng Anh hiệu quả'),
    (5, 8, 'unit-g5-u8', 'What Are You Reading?', 'Sách truyện & Nhân vật yêu thích'),
    (5, 9, 'unit-g5-u9', 'What Did You See at the Zoo?', 'Động vật hoang dã & Vườn bách thú'),
    (5, 10, 'unit-g5-u10', 'When Will Sports Day Be?', 'Ngày hội thể thao & Sự kiện tương lai'),

    # Grade 6
    (6, 1, 'unit-g6-u1', 'My New School', 'Ngôi trường cấp hai mới'),
    (6, 2, 'unit-g6-u2', 'My House & Furniture', 'Ngôi nhà & Giới từ chỉ vị trí'),
    (6, 3, 'unit-g6-u3', 'My Friends & Personalities', 'Bạn bè & Tính cách con người'),
    (6, 4, 'unit-g6-u4', 'My Neighbourhood & Comparatives', 'Khu phố em sống & So sánh hơn'),
    (6, 5, 'unit-g6-u5', 'Natural Wonders & Superlatives', 'Kỳ quan thiên nhiên & So sánh nhất'),
    (6, 6, 'unit-g6-u6', 'Our Tet Holiday & Traditions', 'Tết cổ truyền & Phong tục tập quán'),
    (6, 7, 'unit-g6-u7', 'Television & Conjunctions', 'Truyền hình & Liên từ nối câu'),
    (6, 8, 'unit-g6-u8', 'Sports and Games', 'Thể dục thể thao & Quá khứ đơn'),
    (6, 9, 'unit-g6-u9', 'Cities of the World', 'Các thành phố trên thế giới'),
    (6, 10, 'unit-g6-u10', 'Our Houses in the Future', 'Ngôi nhà tương lai & Năng lượng xanh'),

    # Grade 7
    (7, 1, 'unit-g7-u1', 'Hobbies & Healthy Lifestyles', 'Sở thích lành mạnh & Lối sống'),
    (7, 2, 'unit-g7-u2', 'Healthy Living & Wellness', 'Lối sống lành mạnh & Dinh dưỡng'),
    (7, 3, 'unit-g7-u3', 'Community Service & Volunteers', 'Phục vụ cộng đồng & Tình nguyện viên'),
    (7, 4, 'unit-g7-u4', 'Music and Arts', 'Âm nhạc & Nghệ thuật tạo hình'),
    (7, 5, 'unit-g7-u5', 'Food and Drink & Quantifiers', 'Ẩm thực truyền thống & Từ chỉ lượng'),
    (7, 6, 'unit-g7-u6', 'A Visit to a Historic School', 'Tham quan trường xưa & Di tích'),
    (7, 7, 'unit-g7-u7', 'Traffic & Road Safety', 'Giao thông & An toàn đường bộ'),
    (7, 8, 'unit-g7-u8', 'Films and Cinema', 'Điện ảnh & Phê bình phim'),
    (7, 9, 'unit-g7-u9', 'Festivals Around the World', 'Lễ hội khắp năm châu'),
    (7, 10, 'unit-g7-u10', 'Energy Sources for the Future', 'Nguồn năng lượng tương lai'),

    # Grade 8
    (8, 1, 'unit-g8-u1', 'Leisure Time & Hobbies', 'Thời gian rảnh rỗi & Động từ cảm xúc'),
    (8, 2, 'unit-g8-u2', 'Life in the Countryside', 'Cuộc sống miền quê & So sánh trạng từ'),
    (8, 3, 'unit-g8-u3', 'Teenagers & Overcoming Challenges', 'Tuổi thanh thiếu niên & Cân bằng cảm xúc'),
    (8, 4, 'unit-g8-u4', 'Ethnic Groups of Vietnam', 'Các dân tộc Việt Nam & Bản sắc'),
    (8, 5, 'unit-g8-u5', 'Our Customs and Traditions', 'Phong tục tập quán & Nghi thức'),
    (8, 6, 'unit-g8-u6', 'Lifestyles & First Conditionals', 'Phong cách sống & Câu điều kiện loại 1'),
    (8, 7, 'unit-g8-u7', 'Environmental Protection & Complex Sentences', 'Bảo vệ môi trường & Hệ sinh thái'),
    (8, 8, 'unit-g8-u8', 'Shopping & Consumer Culture', 'Mua sắm thông minh & Văn hóa tiêu dùng'),
    (8, 9, 'unit-g8-u9', 'Natural Disasters & Past Continuous', 'Thiên tai & Quá khứ tiếp diễn'),
    (8, 10, 'unit-g8-u10', 'Communication in the Future', 'Giao tiếp tương lai & Công nghệ'),

    # Grade 9
    (9, 1, 'unit-g9-u1', 'Local Community & Traditional Crafts', 'Làng nghề truyền thống & Phrasal Verbs'),
    (9, 2, 'unit-g9-u2', 'City Life & Double Comparatives', 'Đô thị hóa & So sánh kép'),
    (9, 3, 'unit-g9-u3', 'Teen Stress & Wh-Words Before To-Infinitive', 'Căng thẳng tuổi mới lớn & Từ để hỏi + To-V'),
    (9, 4, 'unit-g9-u4', 'Remembering the Past & Wishes for Present', 'Ký ức thời bao cấp & Câu ước WISH'),
    (9, 5, 'unit-g9-u5', 'Wonders of Vietnam & Impersonal Passive', 'Kỳ quan Việt Nam & Bị động khách quan'),
    (9, 6, 'unit-g9-u6', 'Viet Nam: Then and Now', 'Việt Nam xưa và nay & Quá khứ hoàn thành'),
    (9, 7, 'unit-g9-u7', 'Recipes and Eating Habits', 'Ẩm thực & Động từ chế biến'),
    (9, 8, 'unit-g9-u8', 'Tourism & Responsible Travel', 'Du lịch bền vững & Mạo từ'),
    (9, 9, 'unit-g9-u9', 'World Englishes & Relative Clauses', 'Tiếng Anh toàn cầu & Mệnh đề quan hệ'),
    (9, 10, 'unit-g9-u10', 'Space Exploration & Second Conditionals', 'Khám phá vũ trụ & Câu điều kiện loại 2'),
]

print(f"Total units defined: {len(UNITS_META)}")
