import { ListeningTopic } from './listening.types';

const phraseTracks = [
  ['gd-01', 'Xin hỏi giá', '这个多少钱？', 'zhe ge duo shao qian?', 'Cái này bao nhiêu tiền?', 'Người nói đang hỏi gì?', ['Hỏi giá', 'Hỏi đường', 'Đặt lịch', 'Chào tạm biệt'], 0, '多少钱'],
  ['gd-02', 'Muốn cà phê', '我想要一杯咖啡。', 'wo xiang yao yi bei ka fei.', 'Tôi muốn một cốc cà phê.', 'Người nói muốn gì?', ['Một cốc cà phê', 'Một phần cơm', 'Một vé tàu', 'Một cái áo'], 0, '想要'],
  ['gd-03', 'Thanh toán', '可以用手机支付吗？', 'ke yi yong shou ji zhi fu ma?', 'Có thể thanh toán bằng điện thoại không?', 'Phương thức nào được nhắc tới?', ['Tiền mặt', 'Điện thoại', 'Thẻ thành viên', 'Chuyển khoản ngân hàng'], 1, '支付'],
  ['gd-04', 'Hỏi giảm giá', '有没有优惠？', 'you mei you you hui?', 'Có ưu đãi không?', 'Người nói đang hỏi về điều gì?', ['Thời gian mở cửa', 'Ưu đãi', 'Địa chỉ', 'Màu sắc'], 1, '优惠'],
  ['gd-05', 'Đổi món', '我想换一个菜。', 'wo xiang huan yi ge cai.', 'Tôi muốn đổi một món ăn.', 'Người nói muốn làm gì?', ['Đổi món', 'Gọi thêm nước', 'Tính tiền', 'Đặt bàn'], 0, '换'],
  ['gd-06', 'Không cay', '请不要放辣椒。', 'qing bu yao fang la jiao.', 'Xin đừng cho ớt.', 'Người nói yêu cầu gì?', ['Không cho đường', 'Không cho đá', 'Không cho ớt', 'Không cho muối'], 2, '辣椒'],
  ['gd-07', 'Giao hàng', '可以送到公司吗？', 'ke yi song dao gong si ma?', 'Có thể giao đến công ty không?', 'Địa điểm giao hàng là đâu?', ['Nhà ga', 'Công ty', 'Khách sạn', 'Sân bay'], 1, '公司'],
  ['gd-08', 'Thử size', '我可以试一下吗？', 'wo ke yi shi yi xia ma?', 'Tôi có thể thử một chút không?', 'Người nói muốn gì?', ['Thử', 'Đổi tiền', 'Hủy đơn', 'Mượn bút'], 0, '试'],
  ['gd-09', 'Hẹn gặp', '我们下午三点见。', 'wo men xia wu san dian jian.', 'Chúng ta gặp lúc 3 giờ chiều.', 'Thời gian được nhắc tới?', ['Sáng 9 giờ', 'Trưa 12 giờ', 'Chiều 3 giờ', 'Tối 8 giờ'], 2, '三点'],
  ['gd-10', 'Cảm ơn', '谢谢你的帮助。', 'xie xie ni de bang zhu.', 'Cảm ơn sự giúp đỡ của bạn.', 'Câu này thể hiện điều gì?', ['Xin lỗi', 'Cảm ơn', 'Từ chối', 'Chúc mừng'], 1, '谢谢'],
] as const;

const makeTracks = (prefix: string) =>
  phraseTracks.map(([id, title, text, pinyin, vietnamese, prompt, options, answerIndex, keyword], index) => ({
    id: `${prefix}-${id}`,
    title,
    subtitle: `Câu ${index + 1} / 10`,
    mode: index % 3 === 0 ? 'Nghe phân biệt cụm từ' : index % 3 === 1 ? 'Chọn nghĩa' : 'Hiểu câu',
    text,
    pinyin,
    vietnamese,
    prompt,
    options: [...options],
    answerIndex,
    keyword,
  }));

export const listeningTopics: ListeningTopic[] = [
  {
    id: 'hsk',
    title: 'Luyện nghe HSK',
    subtitle: 'HSK2-HSK4',
    description: 'Chuyên đề luyện thi, giáo trình chuẩn HSK và phân biệt từ vựng.',
    icon: 'headphones',
    sections: [
      {
        id: 'hsk3',
        title: 'HSK3 - Giáo trình chuẩn',
        description: 'Bài học theo giáo trình, từ vựng và hội thoại cơ bản.',
        icon: 'book',
        lessons: [
          {
            id: 'hsk3-bai-1',
            title: 'Giáo trình Chuẩn HSK 3 | Bài 1',
            description: 'Nắm vững ngữ âm, từ vựng và hội thoại cơ bản.',
            level: 'HSK3',
            goal: 'Nghe phân biệt từ vựng',
            tracks: makeTracks('hsk3-b1'),
          },
          {
            id: 'hsk3-bai-2',
            title: 'Giáo trình Chuẩn HSK 3 | Bài 2',
            description: 'Luyện cụm từ thông dụng trong sinh hoạt.',
            level: 'HSK3',
            goal: 'Nghe phân biệt cụm từ',
            tracks: makeTracks('hsk3-b2'),
          },
          {
            id: 'hsk3-bai-3',
            title: 'Giáo trình Chuẩn HSK 3 | Bài 3',
            description: 'Hiểu ý nghĩa và cấu trúc câu ngắn.',
            level: 'HSK3',
            goal: 'Hiểu câu',
            tracks: makeTracks('hsk3-b3'),
          },
        ],
      },
    ],
  },
  {
    id: 'daily',
    title: 'Nghe theo chủ đề hằng ngày',
    subtitle: 'Gọi món, di chuyển, giao tiếp',
    description: 'Từ vựng, cụm từ, hội thoại và tình huống nhỏ trong đời sống.',
    icon: 'messages',
    sections: [
      {
        id: 'shopping',
        title: 'Gọi món & mua sắm',
        description: 'Từ vựng, cụm từ, hội thoại, đoạn ngắn và tình huống.',
        icon: 'basket',
        lessons: [
          {
            id: 'shopping-phrases',
            title: 'Cụm từ',
            description: 'Học cụm từ thông dụng khi gọi món và mua sắm.',
            level: 'HSK2-HSK4',
            goal: 'Chọn nghĩa đúng',
            tracks: makeTracks('shop-phrases'),
          },
          {
            id: 'shopping-dialog',
            title: 'Hội thoại',
            description: 'Luyện nghe hội thoại thực tế.',
            level: 'HSK2-HSK4',
            goal: 'Hiểu hội thoại',
            tracks: makeTracks('shop-dialog'),
          },
          {
            id: 'shopping-short',
            title: 'Đoạn ngắn / Tình huống nhỏ',
            description: 'Luyện nghe tình huống giao tiếp ngắn.',
            level: 'HSK2-HSK4',
            goal: 'Nắm ý chính',
            tracks: makeTracks('shop-short'),
          },
        ],
      },
      {
        id: 'travel',
        title: 'Hỏi đường & đi lại',
        description: 'Luyện nghe hỏi đường, mua vé, đi taxi và sân bay.',
        icon: 'map',
        lessons: [
          {
            id: 'travel-basic',
            title: 'Từ vựng đi lại',
            description: 'Nghe các cụm từ thường gặp khi di chuyển.',
            level: 'HSK2-HSK4',
            goal: 'Từ khóa giao thông',
            tracks: makeTracks('travel-basic'),
          },
        ],
      },
    ],
  },
  {
    id: 'work',
    title: 'Nghe theo bối cảnh công việc',
    subtitle: 'Phỏng vấn, thương mại, kế toán',
    description: 'Tình huống nghề nghiệp và hội thoại trong môi trường làm việc.',
    icon: 'briefcase',
    sections: [
      {
        id: 'commerce',
        title: 'Thương mại điện tử',
        description: 'Tình huống thực tế trong đặt hàng và chăm sóc khách hàng.',
        icon: 'store',
        lessons: [
          {
            id: 'commerce-vocab',
            title: 'Luyện nghe từ vựng',
            description: 'Học từ vựng chuyên ngành có giải thích.',
            level: 'HSK3-HSK4',
            goal: 'Từ khóa công việc',
            tracks: makeTracks('commerce-vocab'),
          },
          {
            id: 'commerce-situation',
            title: 'Giao tiếp tình huống',
            description: 'Luyện hội thoại theo tình huống.',
            level: 'HSK3-HSK4',
            goal: 'Phản xạ giao tiếp',
            tracks: makeTracks('commerce-situation'),
          },
          {
            id: 'commerce-short',
            title: 'Đoạn ngắn',
            description: 'Luyện nghe các đoạn hội thoại ngắn.',
            level: 'HSK3-HSK4',
            goal: 'Hiểu nội dung',
            tracks: makeTracks('commerce-short'),
          },
        ],
      },
      {
        id: 'interview',
        title: 'Kỹ năng phỏng vấn',
        description: 'Chuẩn bị câu hỏi, trả lời phỏng vấn và giới thiệu bản thân.',
        icon: 'user',
        lessons: [
          {
            id: 'interview-basic',
            title: 'Câu hỏi phỏng vấn',
            description: 'Nghe và chọn ý chính trong phỏng vấn.',
            level: 'HSK3-HSK4',
            goal: 'Hiểu câu hỏi',
            tracks: makeTracks('interview-basic'),
          },
        ],
      },
    ],
  },
];
