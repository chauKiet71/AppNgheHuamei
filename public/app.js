const state = {
  topics: [],
  topicId: null,
  levelId: null,
  sectionId: null,
  lessonId: null,
  dayId: null,
  screen: 'home',
  index: 0,
  answers: [],
  selected: null,
  multiAudioSelections: [],
  multiAudioAttempts: [],
  checked: false,
  audioPlaying: false,
  audioRemaining: 0,
  audioDuration: 0,
  audioTrackId: null,
  audioItemIndex: null,
  selectedAudioItemIndex: 0,
  audioTimer: null,
  audioElement: null,
  sessionStartedAt: null,
  locale: ['vi', 'zh'].includes(localStorage.getItem('locale')) ? localStorage.getItem('locale') : 'vi',
  authToken: localStorage.getItem('authToken') || '',
  user: null,
  authLoading: false,
  authError: '',
  profileEditing: false,
  avatarUploading: false,
  historyExpanded: false,
  historyRecords: [],
  historyLoaded: false,
  historyLoading: false,
};

const iconMap = {
  headphones: 'headphones',
  messages: 'messages-square',
  briefcase: 'briefcase-business',
  book: 'book-open-text',
  basket: 'shopping-basket',
  map: 'map-pinned',
  store: 'store',
  user: 'user-round',
  target: 'target',
  play: 'play',
  pause: 'pause',
  chart: 'chart-no-axes-combined',
  home: 'house',
  route: 'route',
  calendar: 'calendar-days',
  file: 'notebook-tabs',
  profile: 'circle-user-round',
  practice: 'square-pen',
  history: 'clock-3',
  lock: 'lock',
  mail: 'mail',
  eye: 'eye',
  sync: 'refresh-cw',
  translate: 'languages',
  graduation: 'graduation-cap',
  goal: 'target',
  grid: 'grid-2x2',
  crown: 'crown',
  arrowRight: 'arrow-right',
  back: 'arrow-left',
  check: 'check',
  next: 'chevron-right',
  volume: 'volume-2',
};

const $app = document.querySelector('#app');

const translations = {
  vi: {
    home: 'Trang chủ',
    route: 'Lộ trình',
    study: 'Học tập',
    result: 'Kết quả',
    profile: 'Cá nhân',
    appTitle: 'Nghe Tiếng Trung<br />Mỗi Ngày V0',
    appSubtitle: '5 phút mỗi ngày, tiến bộ mỗi ngày',
    todayStart: 'Bắt đầu buổi học hôm nay',
    heroTitle: 'Học đều đặn mỗi ngày, nghe tiến bộ rõ rệt',
    startSession: 'Bắt đầu buổi học',
    scope: 'Phạm vi V0: HSK2-HSK4 · 4 chủ đề hằng ngày · 5 bối cảnh công việc',
    chooseTopic: 'Chọn chủ đề nghe',
    chooseTopicSub: 'Chọn lộ trình phù hợp để luyện tập',
    chooseLevel: 'Chọn cấp độ',
    chooseDay: 'Chọn ngày luyện',
    imageQuestion: 'Câu hỏi hình ảnh',
    trueFalseQuestion: 'Câu hỏi đúng sai',
    noQuestions: 'Chưa có câu hỏi cho mục này',
    daily: 'Hằng ngày',
    chooseSection: 'Chọn lộ trình nghe',
    startTopic: 'Bắt đầu luyện chủ đề',
    listen: 'Nghe',
    chooseMeaning: 'Chọn nghĩa',
    splitWords: 'Tách từ',
    pinyin: 'Pinyin',
    normal: 'Bình thường',
    slow: 'Chậm',
    subtitleOn: 'Phụ đề: Bật',
    play: 'Phát bài nghe',
    pause: 'Tạm dừng',
    secondsLeft: 'Còn',
    keyword: 'Từ khóa',
    explanation: 'Giải thích',
    vietnameseMeaning: 'Nghĩa tiếng Việt',
    check: 'Kiểm tra',
    nextQuestion: 'Câu tiếp theo',
    viewReport: 'Xem báo cáo',
    reportTitle: 'Báo cáo kết quả',
    reportSub: 'Tổng kết luyện tập',
    accuracy: 'Độ chính xác',
    trainingTime: 'Thời gian luyện',
    thisTopic: 'Chủ đề này',
    completedLesson: 'Bài học hoàn thành',
    minutes: 'phút',
    lessons: 'bài',
    distribution: 'Phân bổ kết quả',
    veryAccurate: 'Rất chính xác',
    accurate: 'Chính xác',
    needsWork: 'Cần cố gắng',
    manyWrong: 'Sai nhiều',
    totalScore: 'Điểm tổng',
    suggestions: 'Gợi ý bước tiếp theo',
    continuePath: 'Tiếp tục lộ trình hiện tại',
    continue: 'Tiếp tục',
    weakPart: 'Bổ sung phần còn yếu',
    reviewWrong: 'Ôn lại các câu sai',
    practiceNow: 'Luyện ngay',
    upgradeTopic: 'Nâng cấp cùng chủ đề',
    nextLesson: 'Bài tiếp theo',
    explore: 'Khám phá',
    back: 'Quay lại',
    loadError: 'Không tải được dữ liệu bài nghe. Vui lòng thử lại.',
    noAudio: 'Chưa có audio cho câu này',
    audioLoadError: 'Không phát được file audio. Vui lòng kiểm tra lại file đã tải lên.',
    login: 'Đăng nhập',
    upgradePro: 'NÂNG CẤP LÊN PRO!',
    proHint: 'Để sử dụng đầy đủ các chức năng',
    settings: 'Cài đặt',
    syncExtension: 'Đồng bộ Extension',
    nativeLanguage: 'Ngôn ngữ mẹ đẻ',
    levelSetting: 'Trình độ',
    goalSetting: 'Mục tiêu',
    topicSetting: 'Các chủ đề',
    loginSubtitle: 'Nhập email và mật khẩu để đăng nhập',
    email: 'Email',
    password: 'Mật khẩu',
    forgotPassword: 'Quên mật khẩu?',
    or: 'Hoặc',
    noAccount: 'Chưa có tài khoản?',
    signup: 'Đăng ký',
    registerSubtitle: 'Tạo tài khoản để tiếp tục',
    fullName: 'Họ và tên',
    alreadyHaveAccount: 'Đã có tài khoản?',
    agreeTerms: 'Tôi đồng ý với',
    termsOfService: 'Điều khoản dịch vụ',
    privacyPolicy: 'Chính sách bảo mật',
    logout: 'Đăng xuất',
    welcomeBack: 'Xin chào',
    authRequired: 'Vui lòng nhập đầy đủ thông tin.',
    loginSuccess: 'Đăng nhập thành công.',
    registerSuccess: 'Tạo tài khoản thành công.',
    loggingIn: 'Đang đăng nhập...',
    registering: 'Đang tạo tài khoản...',
  },
  zh: {
    home: '首页',
    route: '路线',
    study: '学习',
    result: '结果',
    profile: '个人',
    appTitle: '每日中文听力<br />V0',
    appSubtitle: '每天五分钟，天天有进步',
    todayStart: '开始今天的学习',
    heroTitle: '坚持每天练习，听力明显进步',
    startSession: '开始学习',
    scope: 'V0 范围：HSK2-HSK4 · 4 个日常主题 · 5 个工作场景',
    chooseTopic: '选择听力主题',
    chooseTopicSub: '选择适合你的练习路线',
    chooseLevel: '选择等级',
    chooseDay: '选择练习日',
    imageQuestion: '图片题',
    trueFalseQuestion: '判断题',
    noQuestions: '此项目暂无题目',
    daily: '日常',
    chooseSection: '选择专项练习',
    startTopic: '开始主题练习',
    listen: '听',
    chooseMeaning: '选意思',
    splitWords: '拆词',
    pinyin: '拼音',
    normal: '正常',
    slow: '慢速',
    subtitleOn: '字幕：开',
    play: '播放听力',
    pause: '暂停',
    secondsLeft: '剩余',
    keyword: '关键词',
    explanation: '解释',
    vietnameseMeaning: '越南语意思',
    check: '检查',
    nextQuestion: '下一题',
    viewReport: '查看报告',
    reportTitle: '学习报告',
    reportSub: '练习总结',
    accuracy: '正确率',
    trainingTime: '练习时间',
    thisTopic: '本主题',
    completedLesson: '完成课程',
    minutes: '分钟',
    lessons: '课',
    distribution: '结果分布',
    veryAccurate: '非常准确',
    accurate: '准确',
    needsWork: '需要加强',
    manyWrong: '错误较多',
    totalScore: '总分',
    suggestions: '下一步建议',
    continuePath: '继续当前路线',
    continue: '继续',
    weakPart: '补强薄弱部分',
    reviewWrong: '复习错题',
    practiceNow: '马上练习',
    upgradeTopic: '升级同主题',
    nextLesson: '下一课',
    explore: '探索',
    back: '返回',
    loadError: '无法加载听力数据，请重试。',
    noAudio: '本题还没有音频',
    audioLoadError: '无法播放音频文件，请检查已上传的文件。',
    login: '登录',
    upgradePro: '升级到 PRO!',
    proHint: '解锁完整功能',
    settings: '设置',
    syncExtension: '同步扩展',
    nativeLanguage: '母语',
    levelSetting: '等级',
    goalSetting: '目标',
    topicSetting: '主题',
    loginSubtitle: '输入邮箱和密码登录',
    email: '邮箱',
    password: '密码',
    forgotPassword: '忘记密码？',
    or: '或',
    noAccount: '还没有账号？',
    signup: '注册',
    registerSubtitle: '创建账号以继续',
    fullName: '姓名',
    alreadyHaveAccount: '已有账号？',
    agreeTerms: '我同意',
    termsOfService: '服务条款',
    privacyPolicy: '隐私政策',
    logout: '退出登录',
    welcomeBack: '你好',
    authRequired: '请填写完整信息。',
    loginSuccess: '登录成功。',
    registerSuccess: '注册成功。',
    loggingIn: '正在登录...',
    registering: '正在创建账号...',
  },
};

const localizedContent = {
  zh: {
    items: {
      hsk: {
        title: 'HSK 听力练习',
        subtitle: 'HSK2-HSK4',
        description: '考试专项、标准 HSK 教材与词汇辨听训练。',
      },
      hsk3: {
        title: 'HSK3 标准教程',
        description: '按教材学习语音、词汇与基础会话。',
      },
      'hsk3-bai-1': {
        title: 'HSK3 标准教程 | 第 1 课',
        description: '掌握基础语音、词汇和会话。',
        goal: '词汇辨听',
      },
      'hsk3-bai-2': {
        title: 'HSK3 标准教程 | 第 2 课',
        description: '练习生活中的常用短语。',
        goal: '短语辨听',
      },
      'hsk3-bai-3': {
        title: 'HSK3 标准教程 | 第 3 课',
        description: '理解短句的意思和结构。',
        goal: '理解句子',
      },
      daily: {
        title: '日常主题听力',
        subtitle: '点餐、出行、日常交流',
        description: '日常生活中的词汇、短语、会话和小情景。',
      },
      shopping: {
        title: '点餐与购物',
        description: '词汇、短语、会话、短文和情景练习。',
      },
      'shopping-phrases': {
        title: '短语',
        description: '学习点餐和购物中的常用短语。',
        goal: '选择正确意思',
      },
      'shopping-dialog': {
        title: '会话',
        description: '练习真实会话听力。',
        goal: '理解会话',
      },
      'shopping-short': {
        title: '短文 / 小情景',
        description: '练习短场景听力。',
        goal: '抓住主要意思',
      },
      travel: {
        title: '问路与出行',
        description: '练习问路、买票、打车和机场相关听力。',
      },
      'travel-basic': {
        title: '出行词汇',
        description: '听常见出行短语。',
        goal: '交通关键词',
      },
      work: {
        title: '工作场景听力',
        subtitle: '面试、商务、会计',
        description: '职业场景和工作环境中的会话练习。',
      },
      commerce: {
        title: '电子商务',
        description: '订单和客户服务中的真实工作场景。',
      },
      'commerce-vocab': {
        title: '词汇听力',
        description: '学习带解释的专业词汇。',
        goal: '工作关键词',
      },
      'commerce-situation': {
        title: '情景交流',
        description: '按情景练习会话。',
        goal: '交流反应',
      },
      'commerce-short': {
        title: '短对话',
        description: '练习短会话理解。',
        goal: '理解内容',
      },
      interview: {
        title: '面试技能',
        description: '准备面试问题、回答和自我介绍。',
      },
      'interview-basic': {
        title: '面试问题',
        description: '听面试问题并选择主旨。',
        goal: '理解问题',
      },
    },
    modes: {
      'Nghe phân biệt cụm từ': '短语辨听',
      'Chọn nghĩa': '选择意思',
      'Hiểu câu': '理解句子',
      'Nghe phân biệt cụm từ': '短语辨听',
      'Chọn nghĩa': '选择意思',
      'Hiểu câu': '理解句子',
    },
    phrases: {
      'gd-01': {
        title: '询问价格',
        prompt: '说话人在问什么？',
        vietnamese: '这个多少钱？',
        options: ['问价格', '问路', '预约', '告别'],
      },
      'gd-02': {
        title: '想要咖啡',
        prompt: '说话人想要什么？',
        vietnamese: '我想要一杯咖啡。',
        options: ['一杯咖啡', '一份米饭', '一张车票', '一件衣服'],
      },
      'gd-03': {
        title: '付款',
        prompt: '提到了哪种付款方式？',
        vietnamese: '可以用手机支付吗？',
        options: ['现金', '手机', '会员卡', '银行转账'],
      },
      'gd-04': {
        title: '询问优惠',
        prompt: '说话人在问什么？',
        vietnamese: '有没有优惠？',
        options: ['营业时间', '优惠', '地址', '颜色'],
      },
      'gd-05': {
        title: '换菜',
        prompt: '说话人想做什么？',
        vietnamese: '我想换一个菜。',
        options: ['换菜', '加水', '结账', '订位'],
      },
      'gd-06': {
        title: '不要辣',
        prompt: '说话人提出了什么要求？',
        vietnamese: '请不要放辣椒。',
        options: ['不要糖', '不要冰', '不要辣椒', '不要盐'],
      },
      'gd-07': {
        title: '配送',
        prompt: '配送地点是哪里？',
        vietnamese: '可以送到公司吗？',
        options: ['火车站', '公司', '酒店', '机场'],
      },
      'gd-08': {
        title: '试一下',
        prompt: '说话人想做什么？',
        vietnamese: '我可以试一下吗？',
        options: ['试一下', '换钱', '取消订单', '借笔'],
      },
      'gd-09': {
        title: '约见面',
        prompt: '提到了什么时间？',
        vietnamese: '我们下午三点见。',
        options: ['上午九点', '中午十二点', '下午三点', '晚上八点'],
      },
      'gd-10': {
        title: '感谢',
        prompt: '这句话表达了什么？',
        vietnamese: '谢谢你的帮助。',
        options: ['道歉', '感谢', '拒绝', '祝贺'],
      },
    },
  },
};

const mojibakePattern = /(?:Ã|Ä|Å|Æ|Ð|Ñ|áº|á»|å|æ|ç|è|é|ä|ã|ï|œ|°|½|¼|¾|¬|ƒ|€|Ÿ|¡|¢|§|¨|©|ª|«|®|¯|±|²|³|´|µ|¶|·|¸|¹|º|»|¿)/;

function cleanUiText(value) {
  const text = String(value ?? '');
  if (!mojibakePattern.test(text)) {
    return text;
  }
  try {
    const bytes = Uint8Array.from([...text], (char) => char.charCodeAt(0) & 255);
    const decoded = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
    return decoded.includes('\uFFFD') ? text : decoded;
  } catch {
    return text;
  }
}

const zhUiTextMap = {
  'Luyện nghe HSK': 'HSK 听力练习',
  'Luyện nghe': '听力练习',
  'Chủ đề mới': '新主题',
  'Lộ trình mới': '新路线',
  'Bộ đề mới': '新题组',
  'Câu hỏi mới': '新题目',
  'Cuộc sống hằng ngày': '日常生活',
  'Lộ trình cơ bản': '基础路线',
  'Nghe hiểu': '听力理解',
  'Phần': '部分',
  'Ngày': '第',
  'Đã luyện': '已练习',
  'Chưa luyện': '未练习',
  'Bắt đầu luyện hôm nay': '开始今天练习',
  'Nhiều Audio': '多个音频',
  'Nghe audio và chọn hình ảnh đúng': '听音频并选择正确图片',
  'Đáp án': '答案',
  'Câu': '第',
  'Đúng': '对',
  'Sai': '错',
  'Đúng!': '正确！',
  'Sai!': '不正确！',
  'Giải thích:': '解释：',
  'Chưa có hình ảnh': '暂无图片',
  'Chưa có giải thích.': '暂无解释。',
  'Chọn đúng hay sai': '选择对或错',
  'Nghe phán đoán tranh': '听音频判断图片',
  'và': '和',
};

const zhCleanUiTextMap = {
  'Đề thi HSK3': 'HSK3 试题',
  'De thi HSK3': 'HSK3 试题',
  'Giáo trình chuẩn HSK3': 'HSK3 标准教程',
  'Giao trinh chuẩn HSK3': 'HSK3 标准教程',
  'Giao trinh chuan HSK3': 'HSK3 标准教程',
  'Giáo trình Chuẩn HSK 3': 'HSK3 标准教程',
  'Cấp độ luyện nghe': '听力练习等级',
  'Mô tả lộ trình.': '路线说明。',
  'Mô tả lộ trình': '路线说明',
  'Chọn bộ đề': '选择题组',
  'Chọn chuyên đề luyện': '选择专项练习',
  'Phần 1: Nghe hội thoại chọn tranh': '第 1 部分：听对话选图片',
  'Phần 2: Nghe câu và chọn đúng/sai': '第 2 部分：听句子并判断对错',
  'Phần 3: Hội thoại ngắn chọn A/B/C': '第 3 部分：短对话选择 A/B/C',
  'Phần 4: Hội thoại dài chọn A/B/C': '第 4 部分：长对话选择 A/B/C',
  'Nghe hội thoại chọn tranh': '听对话选图片',
  'Nghe câu và chọn đúng/sai': '听句子并判断对错',
  'Hội thoại ngắn chọn A/B/C': '短对话选择 A/B/C',
  'Hội thoại dài chọn A/B/C': '长对话选择 A/B/C',
  'bộ đề': '套题',
  'ngày': '天',
  'câu hỏi': '题',
};

function translateRenderedText(value) {
  let text = cleanUiText(value);
  if (state.locale !== 'zh') {
    return text;
  }
  Object.entries(zhCleanUiTextMap).forEach(([source, target]) => {
    text = text.replaceAll(source, target);
  });
  text = text.replace(/Phần\s+(\d+)\s*:/g, '第 $1 部分：');
  text = text.replace(/(\d+)\s+câu hỏi/g, '$1 题');
  text = text.replace(/(\d+)\s+ngày trước/g, '$1 天前');
  text = text.replace(/(\d+)\s+ngày/g, '$1 天');
  text = text.replace(/(\d+)\s+bộ đề/g, '$1 套题');
  text = text.replace(/(\d+)\s+đúng/g, '$1 正确');
  Object.entries(zhUiTextMap).forEach(([source, target]) => {
    text = text.replaceAll(source, target);
  });
  text = text.replace(/(\d+)\s+câu hỏi/g, '$1 题');
  text = text.replace(/(\d+)\s+ngày/g, '$1 天');
  text = text.replace(/(\d+)\s+bộ đề/g, '$1 套题');
  text = text.replace(/(\d+)\s+đúng/g, '$1 正确');
  text = text.replace(/(\d+)\s+ngày trước/g, '$1 天前');
  return text;
}

function translateRenderedTree(root) {
  const visit = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.nodeValue = translateRenderedText(node.nodeValue);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }
    ['placeholder', 'aria-label', 'title', 'alt'].forEach((attribute) => {
      if (node.hasAttribute(attribute)) {
        node.setAttribute(attribute, translateRenderedText(node.getAttribute(attribute)));
      }
    });
    Array.from(node.childNodes).forEach(visit);
  };
  visit(root);
}

function t(key) {
  return cleanUiText(translations[state.locale][key] || translations.vi[key] || key);
}

function textOf(item, field) {
  return cleanUiText(localizedContent[state.locale]?.items?.[item.id]?.[field] || item[field] || '');
}

function phraseKey(track) {
  return track.id.split('-').slice(-2).join('-');
}

function trackText(track, field) {
  return cleanUiText(localizedContent[state.locale]?.phrases?.[phraseKey(track)]?.[field] || track[field] || '');
}

function trackOptions(track) {
  if (track.questionType === 'image' || track.questionType === 'multiAudio') {
    return arrayOf(track.options).map(cleanUiText);
  }
  return arrayOf(localizedContent[state.locale]?.phrases?.[phraseKey(track)]?.options || track.options).map(cleanUiText);
}

function optionCountOf(track) {
  return track?.questionType === 'multiAudio' ? 5 : 4;
}

function optionImagesOf(track) {
  const images = Array.isArray(track.optionImages) ? track.optionImages : [];
  return Array.from({ length: optionCountOf(track) }, (_, index) => images[index] || '');
}

function audioItemsOf(track) {
  return Array.isArray(track?.audioItems)
    ? track.audioItems
        .map((item) => ({ url: item?.url || '', fileName: item?.fileName || '', answerIndex: Number.isFinite(Number(item?.answerIndex)) ? Number(item.answerIndex) : Number(track?.answerIndex || 0) }))
        .filter((item) => item.url)
        .slice(0, 5)
    : [];
}

function isImageQuestion(track) {
  return track.questionType === 'image' && optionImagesOf(track).some(Boolean);
}

function isMultiAudioQuestion(track) {
  return track?.questionType === 'multiAudio' || audioItemsOf(track).length > 0 || optionImagesOf(track).length >= 5;
}

function answerIndexForTrack(track) {
  if (!isMultiAudioQuestion(track)) {
    return track.answerIndex;
  }
  const audio = audioItemsOf(track)[state.selectedAudioItemIndex] || audioItemsOf(track)[0];
  return Number.isFinite(Number(audio?.answerIndex)) ? Number(audio.answerIndex) : Number(track.answerIndex || 0);
}

function multiAudioRequiredCount(track) {
  return Math.min(5, Math.max(1, audioItemsOf(track).length || optionImagesOf(track).filter(Boolean).length || optionCountOf(track)));
}

function multiAudioSelectionAt(index) {
  const value = state.multiAudioSelections[index];
  return Number.isFinite(Number(value)) ? Number(value) : null;
}

function isMultiAudioComplete(track) {
  const required = multiAudioRequiredCount(track);
  return Array.from({ length: required }, (_, index) => multiAudioSelectionAt(index)).every((value) => value !== null);
}

function isMultiAudioStepSolved(track, audioIndex) {
  const selected = multiAudioSelectionAt(audioIndex);
  const expected = Number(audioItemsOf(track)[audioIndex]?.answerIndex ?? track.answerIndex ?? 0);
  return selected === expected;
}

function firstUnsolvedMultiAudioIndex(track) {
  const required = multiAudioRequiredCount(track);
  const index = Array.from({ length: required }, (_, itemIndex) => itemIndex).find((itemIndex) => !isMultiAudioStepSolved(track, itemIndex));
  return index === undefined ? required - 1 : index;
}

function isMultiAudioRowUnlocked(track, audioIndex) {
  return audioIndex <= firstUnsolvedMultiAudioIndex(track);
}

function multiAudioCorrect(track) {
  const audioItems = audioItemsOf(track);
  const required = multiAudioRequiredCount(track);
  return Array.from({ length: required }, (_, index) => {
    const selected = multiAudioSelectionAt(index);
    const expected = Number.isFinite(Number(audioItems[index]?.answerIndex)) ? Number(audioItems[index].answerIndex) : Number(track.answerIndex || 0);
    return selected === expected;
  }).every(Boolean);
}

function modeOf(track) {
  return cleanUiText(localizedContent[state.locale]?.modes?.[track.mode] || track.mode);
}

function languageToggle() {
  return `
    <button class="language-toggle" onclick="toggleLanguage()" aria-label="Switch language">
      <span class="${state.locale === 'vi' ? 'active' : ''}">VI</span>
      <span class="${state.locale === 'zh' ? 'active' : ''}">中</span>
    </button>
  `;
}

function toggleLanguage() {
  state.locale = state.locale === 'vi' ? 'zh' : 'vi';
  localStorage.setItem('locale', state.locale);
  render();
}

async function init() {
  await loadCurrentUser();
  await loadTopics();
  await loadLearningHistory();
  render();
}

async function loadTopics() {
  const response = await apiFetch('/api/listening/topics');
  state.topics = await response.json();
  if (!state.topicId || !currentTopic()) {
    state.topicId = state.topics[0]?.id || null;
  }
  if (!state.levelId || !currentLevel()) {
    state.levelId = levelsOf(currentTopic())?.[0]?.id || null;
  }
  if (!state.sectionId || !currentSection()) {
    state.sectionId = sectionsOfLevel(currentLevel())?.[0]?.id || null;
  }
  if (!state.lessonId || !currentLesson()) {
    state.lessonId = lessonsOfSection(currentSection())?.[0]?.id || null;
  }
  if (!state.dayId || !currentDay()) {
    state.dayId = daysOf(currentLesson())?.[0]?.id || null;
  }
}

async function apiFetch(path, options = {}) {
  const response = await fetch(path, options);
  if (response.status !== 404 || window.location.port !== '3000') {
    return response;
  }
  return fetch(`http://localhost:3100${path}`, options);
}

function currentTopic() {
  return state.topics.find((topic) => topic.id === state.topicId) || state.topics[0];
}

function arrayOf(value) {
  return Array.isArray(value) ? value : [];
}

function levelsOf(topic) {
  if (Array.isArray(topic?.levels) && topic.levels.length) {
    return topic.levels;
  }
  return [
    {
      id: `${topic?.id || 'topic'}-default-level`,
      title: topic?.id === 'hsk' ? 'HSK3' : t('daily'),
      description: topic?.subtitle || '',
      sections: arrayOf(topic?.sections),
    },
  ];
}

function currentLevel() {
  const topic = currentTopic();
  const levels = levelsOf(topic);
  return levels.find((level) => level.id === state.levelId) || levels[0];
}

function sectionsOf(topic) {
  return levelsOf(topic).flatMap((level) => arrayOf(level.sections));
}

function sectionsOfLevel(level) {
  return arrayOf(level?.sections);
}

function lessonsOfSection(section) {
  return arrayOf(section?.lessons);
}

function currentSection() {
  const level = currentLevel();
  const sections = sectionsOfLevel(level);
  return sections.find((section) => section.id === state.sectionId) || sections[0];
}

function currentLesson() {
  const section = currentSection();
  const lessons = lessonsOfSection(section);
  return lessons.find((lesson) => lesson.id === state.lessonId) || lessons[0];
}

function daysOf(lesson) {
  if (!lesson) {
    return [];
  }
  if (Array.isArray(lesson?.days) && lesson.days.length) {
    return lesson.days.map((day) => ({ ...day, tracks: arrayOf(day.tracks) }));
  }
  return [
    {
      id: `${lesson?.id || 'lesson'}-day-1`,
      title: state.locale === 'zh' ? '第 1 天' : 'Ngày 1',
      description: lesson?.description || '',
      tracks: arrayOf(lesson?.tracks),
    },
  ];
}

function currentDay() {
  const days = daysOf(currentLesson());
  return days.find((day) => day.id === state.dayId) || days[0];
}

function tracksOfDay(day) {
  return arrayOf(day?.tracks);
}

function questionTypeOf(track) {
  if (track?.questionType === 'multiAudio') return 'multiAudio';
  return track?.questionType === 'image' ? 'image' : 'trueFalse';
}

function tracksOf(lesson) {
  return daysOf(lesson).flatMap((day) => tracksOfDay(day));
}

function currentTracks() {
  return tracksOfDay(currentDay());
}

function readLearningHistory() {
  return Array.isArray(state.historyRecords) ? state.historyRecords : [];
}

function writeLearningHistory(records) {
  state.historyRecords = Array.isArray(records) ? records.slice(0, 80) : [];
}

function upsertLearningHistoryRecord(record) {
  if (!record?.dayId) {
    return;
  }
  const records = readLearningHistory().filter((item) => item.dayId !== record.dayId);
  writeLearningHistory([record, ...records]);
  state.historyLoaded = true;
}

function isDayCompleted(dayId) {
  return readLearningHistory().some((record) => record.dayId === dayId);
}

function markCurrentDayCompleted() {
  const payload = buildLearningHistoryPayload();
  if (!payload) {
    return;
  }
  const optimisticRecord = {
    id: `pending-${payload.dayId}-${Date.now().toString(36)}`,
    userId: state.user?.id || 'local',
    ...payload,
    createdAt: payload.completedAt,
  };
  upsertLearningHistoryRecord(optimisticRecord);
  recordLearningHistory(payload).catch((error) => {
    console.warn('Cannot save learning history.', error);
  });
}

function buildLearningHistoryPayload() {
  const day = currentDay();
  const lesson = currentLesson();
  if (!day?.id) {
    return null;
  }
  const tracks = currentTracks();
  const answers = state.answers.filter(Boolean);
  const total = tracks.length || answers.length || 1;
  const answered = answers.length || total;
  const correct = answers.filter((answer) => answer.correct).length;
  const completedAt = new Date().toISOString();
  const durationSeconds = Math.max(60, Math.round((Date.now() - (state.sessionStartedAt || Date.now())) / 1000));
  return {
    completedAt,
    durationSeconds,
    topicId: state.topicId,
    levelId: state.levelId,
    sectionId: state.sectionId,
    lessonId: state.lessonId,
    dayId: day.id,
    topicTitle: textOf(currentTopic(), 'title'),
    levelTitle: textOf(currentLevel(), 'title'),
    sectionTitle: textOf(currentSection(), 'title'),
    lessonTitle: textOf(lesson, 'title'),
    dayTitle: textOf(day, 'title') || day.title || '',
    correct,
    answered,
    total,
    accuracy: Math.round((correct / Math.max(1, answered)) * 100) || 0,
  };
}

async function recordLearningHistory(payload = buildLearningHistoryPayload()) {
  if (!payload || !state.authToken) {
    return null;
  }

  const response = await apiFetch('/api/learning-history', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.authToken}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Cannot save learning history.');
  }
  const savedRecord = await response.json();
  upsertLearningHistoryRecord(savedRecord);
  return savedRecord;
}

async function loadLearningHistory() {
  if (!state.authToken) {
    writeLearningHistory([]);
    state.historyLoaded = true;
    return;
  }
  state.historyLoading = true;
  try {
    const response = await apiFetch('/api/learning-history', {
      headers: { Authorization: `Bearer ${state.authToken}` },
    });
    if (!response.ok) {
      throw new Error('Cannot load learning history.');
    }
    writeLearningHistory(await response.json());
    state.historyLoaded = true;
  } catch {
    writeLearningHistory([]);
    state.historyLoaded = true;
  } finally {
    state.historyLoading = false;
  }
}

function icon(name, size = 19) {
  return `<i data-lucide="${iconMap[name] || name}" style="width:${size}px;height:${size}px"></i>`;
}

function mount(html) {
  $app.innerHTML = cleanUiText(html);
  translateRenderedTree($app);
  const cameraButton = document.querySelector('.account-camera-btn');
  if (cameraButton && state.avatarUploading) {
    cameraButton.classList.add('loading');
    cameraButton.disabled = true;
    cameraButton.innerHTML = icon('loader-circle', 19);
  }
  if (window.lucide) {
    window.lucide.createIcons();
  }
  cameraButton?.addEventListener('click', chooseProfileAvatar);
}

function nav(active = 'home') {
  const tabLabels =
    state.locale === 'zh'
      ? { practice: '练习', history: '历史', profile: '个人' }
      : { practice: 'Luyện tập', history: 'Lịch sử', profile: 'Cá nhân' };
  const items = [
    ['home', t('home'), 'home'],
    ['route', tabLabels.practice, 'practice'],
    ['file', tabLabels.history, 'history'],
    ['profile', tabLabels.profile, 'profile'],
  ];

  return `
    <nav class="bottom-nav">
      ${items
        .map(
          ([id, label, itemIcon]) => `
            <button class="nav-item ${active === id ? 'active' : ''}" onclick="handleNav('${id}')">
              ${icon(itemIcon, 18)}
              <span>${label}</span>
            </button>
          `,
        )
        .join('')}
    </nav>
  `;
}

function handleNav(id) {
  stopAudio();
  if (id === 'home') {
    state.screen = 'home';
  }
  if (id === 'file') {
    state.screen = 'history';
  }
  if (id === 'profile') {
    state.screen = 'profile';
  }
  render();
}

function go(screen, payload = {}) {
  stopAudio();
  const requestedIndex = Number(payload.index);
  Object.assign(state, payload);
  state.screen = screen;
  if (screen === 'login' || screen === 'register') {
    state.authError = '';
    state.authLoading = false;
  }
  if (screen === 'levels') {
    state.sectionId = null;
    state.lessonId = null;
    state.dayId = null;
  }
  if (screen === 'sections') {
    state.lessonId = null;
    state.dayId = null;
  }
  if (screen === 'lessons') {
    state.dayId = null;
  }
  if (screen === 'practice') {
    state.index = Number.isFinite(requestedIndex) ? Math.max(0, requestedIndex) : 0;
    state.answers = [];
    state.selected = null;
    state.multiAudioSelections = [];
    state.multiAudioAttempts = [];
    state.checked = false;
    state.sessionStartedAt = Date.now();
  }
  render();
}

function back() {
  stopAudio();
  const flow = {
    topics: 'home',
    levels: 'topics',
    sections: 'levels',
    lessons: 'sections',
    days: 'lessons',
    practice: 'days',
    report: 'home',
    history: 'profile',
    login: 'profile',
    register: 'login',
  };
  state.screen = flow[state.screen] || 'home';
  render();
}

function render() {
  const screens = {
    home: renderHome,
    topics: renderTopics,
    levels: renderLevels,
    sections: renderSections,
    lessons: renderLessons,
    days: renderDays,
    practice: renderPractice,
    report: renderReport,
    history: renderHistory,
    profile: renderProfile,
    login: renderLogin,
    register: renderRegister,
  };
  screens[state.screen]();
}

function renderHome() {
  const hskTopic = state.topics.find((topic) => topic.id === 'hsk') || state.topics[0];
  const dailyTopic = state.topics.find((topic) => topic.id === 'daily');
  const workTopic = state.topics.find((topic) => topic.id === 'work');
  const isZh = state.locale === 'zh';
  const hskSub = isZh ? 'HSK3 真题 + 标准教程' : 'HSK3 đề thi + giáo trình chuẩn';
  const dailyTitle = isZh ? '按主题听力 (V0.8)' : 'Nghe theo chủ đề (V0.8)';
  const workTitle = isZh ? '工作中文听力 (V0.8)' : 'Nghe tiếng Trung nơi làm việc (V0.8)';
  const soon = isZh ? '即将开放' : 'Sắp mở';
  const homeTitle = isZh ? '每日中文听力<br />V0-A' : 'Nghe tiếng Trung<br />mỗi ngày V0-A';

  mount(`
    <section class="home-hero">
      <div class="home-topline">
        <h1>${homeTitle}</h1>
        ${languageToggle()}
      </div>
    </section>

    <div class="home-course-list">
      <button class="course-card featured" onclick="go('levels', { topicId: '${hskTopic.id}', levelId: '${levelsOf(hskTopic)[0]?.id || ''}' })">
        <span class="course-icon">${icon('headphones', 32)}</span>
        <span class="course-copy">
          <strong>${textOf(hskTopic, 'title')}</strong>
          <small>${hskSub}</small>
        </span>
        <span class="arrow-circle">${icon('arrowRight', 19)}</span>
      </button>

      <button class="course-card locked" type="button" aria-disabled="true">
        <span class="course-icon muted-lock">${icon('lock', 26)}</span>
        <span class="course-copy">
          <strong>${dailyTitle}</strong>
          <small>${dailyTopic ? textOf(dailyTopic, 'subtitle') : ''}</small>
        </span>
        <span class="soon-badge">${soon}</span>
      </button>

      <button class="course-card locked" type="button" aria-disabled="true">
        <span class="course-icon muted-lock">${icon('lock', 26)}</span>
        <span class="course-copy">
          <strong>${workTitle}</strong>
          <small>${workTopic ? textOf(workTopic, 'subtitle') : ''}</small>
        </span>
        <span class="soon-badge">${soon}</span>
      </button>
    </div>

    <button class="primary-btn home-cta" onclick="quickStart()">${t('startSession')}</button>
    ${nav('home')}
  `);
}

function historyDateKey(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function learningStreak(records) {
  const learnedDays = new Set(records.map((record) => historyDateKey(record.completedAt)).filter(Boolean));
  let streak = 0;
  const cursor = new Date();
  while (learnedDays.has(historyDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function formatStudyDuration(totalSeconds) {
  const seconds = Math.max(0, Number(totalSeconds) || 0);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${Math.max(1, minutes)}m`;
}

function relativeStudyDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  const today = new Date();
  const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const diffDays = Math.round((startToday - startDate) / 86400000);
  if (state.locale === 'zh') {
    if (diffDays === 0) return '今天';
    if (diffDays === 1) return '昨天';
    return `${diffDays} 天前`;
  }
  if (diffDays === 0) return 'Hôm nay';
  if (diffDays === 1) return 'Hôm qua';
  return `${diffDays} ngày trước`;
}

function historyRouteTitle(record) {
  return [record.sectionTitle, record.lessonTitle].filter(Boolean).join(' - ') || record.dayTitle || t('listen');
}

function openHistoryEntry(entryId) {
  const entry = readLearningHistory().find((record) => record.id === entryId);
  if (!entry) {
    return;
  }
  Object.assign(state, {
    topicId: entry.topicId || state.topicId,
    levelId: entry.levelId || state.levelId,
    sectionId: entry.sectionId || state.sectionId,
    lessonId: entry.lessonId || state.lessonId,
    dayId: entry.dayId || state.dayId,
  });
  go('days');
}

function showAllLearningHistory() {
  state.historyExpanded = true;
  renderHistory();
}

function renderHistory() {
  const isZh = state.locale === 'zh';
  if (state.authToken && !state.historyLoaded && !state.historyLoading) {
    loadLearningHistory().then(() => {
      if (state.screen === 'history') {
        renderHistory();
      }
    });
  }
  const records = readLearningHistory();
  const totalTime = records.reduce((sum, record) => sum + (Number(record.durationSeconds) || 0), 0);
  const averageAccuracy = records.length
    ? Math.round(records.reduce((sum, record) => sum + (Number(record.accuracy) || 0), 0) / records.length)
    : 0;
  const recentRecords = state.historyExpanded ? records : records.slice(0, 5);
  const title = isZh ? '学习历史' : 'Lịch sử học tập';
  const emptyTitle = isZh ? '还没有学习记录' : 'Chưa có lịch sử học tập';
  const emptyCopy = isZh ? '完成一次练习后，最近学习路线会保存在这里。' : 'Hoàn thành một ngày luyện để lưu lại lộ trình gần đây.';
  const needsLogin = !state.authToken || !state.user;

  mount(`
    <section class="history-screen">
      <header class="history-head">
        <button class="icon-btn" type="button" onclick="back()" aria-label="${t('back')}">${icon('back', 21)}</button>
        <h1>${title}</h1>
        <span></span>
      </header>

      <section class="history-summary-grid">
        <div class="history-stat-card streak">
          <span>${isZh ? '连续学习' : 'Chuỗi ngày học'}</span>
          <strong>${learningStreak(records)}</strong>
          <small>${isZh ? '天' : 'ngày'}</small>
          <em>${icon('flame', 26)}</em>
        </div>
        <div class="history-stat-card">
          <span>${isZh ? '总时间' : 'Tổng thời gian'}</span>
          <strong>${formatStudyDuration(totalTime)}</strong>
          <em>${icon('clock-3', 25)}</em>
        </div>
      </section>

      <section class="history-section">
        <h2>${isZh ? '统计' : 'Thống kê'}</h2>
        <div class="history-stats-panel">
          <div>
            <span>${isZh ? '已完成课程' : 'Bài đã hoàn thành'}</span>
            <strong>${records.length}</strong>
          </div>
          <div>
            <span>${isZh ? '平均正确率' : 'Tỷ lệ đúng trung bình'}</span>
            <strong>${averageAccuracy}%</strong>
          </div>
        </div>
      </section>

      <section class="history-section">
        <h2>${isZh ? '最近' : 'Gần đây'}</h2>
        ${
          needsLogin
            ? `<div class="history-empty">
                <span>${icon('profile', 28)}</span>
                <strong>${isZh ? '请先登录' : 'Vui lòng đăng nhập'}</strong>
                <p>${isZh ? '登录后，学习历史会保存在数据库中。' : 'Đăng nhập để lưu lịch sử học tập xuống cơ sở dữ liệu.'}</p>
                <button class="primary-btn" type="button" onclick="go('login')">${t('login')}</button>
              </div>`
            : state.historyLoading && !state.historyLoaded
              ? `<div class="history-empty">
                  <span>${icon('loader-circle', 28)}</span>
                  <strong>${isZh ? '正在加载' : 'Đang tải lịch sử'}</strong>
                  <p>${isZh ? '请稍等片刻。' : 'Vui lòng chờ trong giây lát.'}</p>
                </div>`
              : recentRecords.length
            ? `<div class="history-recent-list">
                ${recentRecords
                  .map(
                    (record) => `
                      <button class="history-row" type="button" onclick="openHistoryEntry('${record.id}')">
                        <span class="history-row-icon">${icon('notebook-tabs', 18)}</span>
                        <span class="history-row-main">
                          <strong>${escapeHtml(historyRouteTitle(record))}</strong>
                          <small>${record.correct}/${record.answered} ${isZh ? '正确' : 'đúng'}</small>
                        </span>
                        <span class="history-row-meta">
                          <strong>${formatClock(record.completedAt)}</strong>
                          <small>${relativeStudyDate(record.completedAt)}</small>
                        </span>
                      </button>
                    `,
                  )
                  .join('')}
              </div>
              ${
                records.length > 5 && !state.historyExpanded
                  ? `<button class="history-view-all" type="button" onclick="showAllLearningHistory()">
                      <span>${isZh ? '查看全部历史' : 'Xem tất cả lịch sử'}</span>
                      ${icon('next', 22)}
                    </button>`
                  : ''
              }`
            : `<div class="history-empty">
                <span>${icon('calendar-days', 28)}</span>
                <strong>${emptyTitle}</strong>
                <p>${emptyCopy}</p>
                <button class="primary-btn" type="button" onclick="go('home')">${t('startSession')}</button>
              </div>`
        }
      </section>
    </section>
    ${nav('file')}
  `);
}

function renderProfile() {
  const isZh = state.locale === 'zh';
  const accountTitle = isZh ? '账户信息' : 'Thông tin tài khoản';
  const logoutLabel = t('logout');
  if (state.user && state.profileEditing) {
    mount(accountEditorPage());
    return;
  }
  const settingItems = [
    ['globe-2', isZh ? '语言设置' : 'Cài đặt ngôn ngữ', '', 'toggleLanguage()'],
    ['languages', isZh ? '切换 中文 / VI' : 'Chuyển 中文 / VI', isZh ? '中文' : 'VI', 'toggleLanguage()'],
    ['calendar-days', isZh ? '学习历史' : 'Lịch sử học tập', '', "go('history')"],
    ['info', isZh ? '关于' : 'Giới thiệu'],
    ['message-circle', isZh ? 'Zalo 支持' : 'Hỗ trợ Zalo'],
  ];
  const supportItems = [
    ['user-round', isZh ? '登录问题' : 'Vấn đề đăng nhập'],
    ['credit-card', isZh ? '解锁 / 购买套餐' : 'Mở khóa / mua gói'],
    ['message-square-text', isZh ? '内容反馈' : 'Góp ý nội dung'],
    ['bug', isZh ? '功能错误' : 'Lỗi chức năng'],
  ];

  mount(`
    <section class="profile-screen">
      <div class="profile-spacer" aria-hidden="true"></div>

      ${
        state.user
          ? `<section class="login-card user-card">
              ${userAvatar('avatar-placeholder signed-in', 76)}
              <span>
                <small>${t('welcomeBack')}</small>
                <strong>${escapeHtml(state.user.name)}</strong>
                <em>${escapeHtml(state.user.email)}</em>
              </span>
              <button class="profile-edit-btn" type="button" onclick="openProfileEditor()" aria-label="${accountTitle}">${icon('square-pen', 22)}</button>
            </section>`
          : `<button class="login-card" type="button" onclick="go('login')">
              <span class="avatar-placeholder"><span></span></span>
              <strong>${t('login')}</strong>
              <span class="login-arrow">${icon('next', 30)}</span>
            </button>`
      }

      <section class="pro-card">
        <div class="pro-crown pro-crown-left" aria-hidden="true">${icon('crown', 74)}</div>
        <div class="pro-crown pro-crown-right" aria-hidden="true">${icon('crown', 64)}</div>
        <button class="pro-button" type="button">${icon('crown', 30)} <span>${t('upgradePro')}</span></button>
        <p>${t('proHint')}</p>
      </section>

      ${state.user && state.profileEditing ? accountEditor() : ''}

      <h2 class="profile-section-title">${t('settings')}</h2>
      <section class="settings-card">
        ${settingItems.map(([itemIcon, label, badge, action]) => settingRow(itemIcon, label, badge, action)).join('')}
      </section>

      <section class="zalo-support-card">
        <div class="zalo-support-copy">
          <h3>${isZh ? '通过 Zalo 支持' : 'Hỗ trợ qua Zalo'} <span>${isZh ? '(仅支持软件问题)' : '(chỉ hỗ trợ phần mềm)'}</span></h3>
          <p>${isZh ? '我们仅支持与软件相关的问题，不提供课程咨询。' : 'Chúng tôi hỗ trợ các vấn đề liên quan đến phần mềm, không tư vấn khóa học.'}</p>
        </div>
        <div class="settings-card support-list">
          ${supportItems.map(([itemIcon, label]) => settingRow(itemIcon, label)).join('')}
        </div>
        <a class="zalo-phone-button" href="tel:0825319378">
          ${icon('phone-call', 24)}
          <strong>0825319378</strong>
        </a>
      </section>

      ${state.user ? `<button class="profile-logout-bottom" type="button" onclick="logout()">${icon('log-out', 20)} <span>${logoutLabel}</span></button>` : ''}
    </section>
    ${nav('profile')}
  `);
}

function accountEditor() {
  const isZh = state.locale === 'zh';
  return `
    <section class="account-edit-card">
      <div class="account-edit-head">
        <span class="avatar-placeholder signed-in small"><span>${initialsOf(state.user.name)}</span></span>
        <div>
          <h3>${isZh ? '更新账户信息' : 'Cập nhật tài khoản'}</h3>
          <p>${isZh ? '编辑姓名、邮箱或设置新密码。' : 'Chỉnh sửa họ tên, email hoặc đặt mật khẩu mới.'}</p>
        </div>
        <button class="account-close-btn" type="button" onclick="closeProfileEditor()" aria-label="${isZh ? '关闭' : 'Đóng'}">${icon('x', 20)}</button>
      </div>

      <label class="profile-field">
        <span>${isZh ? '姓名' : 'Họ và tên'}</span>
        <input id="profile-name" type="text" value="${escapeHtml(state.user.name)}" autocomplete="name" />
      </label>

      <label class="profile-field">
        <span>Email</span>
        <input id="profile-email" type="email" value="${escapeHtml(state.user.email)}" autocomplete="email" />
      </label>

      <label class="profile-field">
        <span>${isZh ? '新密码' : 'Mật khẩu mới'}</span>
        <input id="profile-password" type="password" placeholder="${isZh ? '不更改请留空' : 'Bỏ trống nếu không đổi'}" autocomplete="new-password" />
      </label>

      ${authMessage()}

      <div class="account-edit-actions">
        <button class="profile-save-btn" type="button" onclick="submitProfileUpdate()" ${state.authLoading ? 'disabled' : ''}>
          ${state.authLoading ? (isZh ? '正在保存...' : 'Đang lưu...') : icon('save', 18)}
          <span>${state.authLoading ? '' : isZh ? '保存' : 'Lưu thay đổi'}</span>
        </button>
        <button class="profile-cancel-btn" type="button" onclick="closeProfileEditor()">${isZh ? '取消' : 'Hủy'}</button>
      </div>
    </section>
  `;
}

function accountEditorPage() {
  const isZh = state.locale === 'zh';
  const userId = String(state.user?.id || '').replace(/^user-/, '').slice(0, 8) || '1903612';
  const createdAt = state.user?.createdAt ? formatClock(Date.parse(state.user.createdAt)) : formatClock(Date.now());
  const saveText = state.authLoading ? (isZh ? '保存中' : 'Đang lưu') : isZh ? '保存' : 'Lưu';
  return `
    <section class="account-edit-screen">
      <input id="profile-avatar-input" class="visually-hidden-input" type="file" accept="image/*" onchange="handleProfileAvatarChange(event)" />
      <header class="account-edit-topbar">
        <button class="account-back-btn" type="button" onclick="closeProfileEditor()" aria-label="${t('back')}">${icon('back', 25)}</button>
        <h1>${isZh ? '账户' : 'Tài khoản'}</h1>
        <button class="account-save-top" type="button" onclick="submitProfileUpdate()" ${state.authLoading ? 'disabled' : ''}>${saveText}</button>
      </header>

      <section class="account-hero-card">
        <div class="account-avatar-wrap">
          ${userAvatar('account-avatar', 112)}
          <button class="account-camera-btn" type="button" aria-label="${isZh ? '更换头像' : 'Đổi ảnh đại diện'}">${icon('camera', 19)}</button>
        </div>

        <label class="account-field full">
          <span>${isZh ? '账户名称' : 'Tên tài khoản'}</span>
          <span class="account-input-wrap">
            <input id="profile-name" type="text" value="${escapeHtml(state.user.name)}" autocomplete="name" />
            ${icon('square-pen', 20)}
          </span>
        </label>

        <div class="account-row-line">
          <span>${isZh ? '等级' : 'Cấp độ'}</span>
          <select id="profile-level">
            <option>${isZh ? '选择你的水平' : 'Chọn trình độ của bạn'}</option>
            <option>HSK1</option>
            <option>HSK2</option>
            <option>HSK3</option>
            <option>HSK4</option>
          </select>
        </div>

        <label class="account-row-line password-line">
          <span>${isZh ? '密码' : 'Mật khẩu'}</span>
          <input id="profile-password" type="password" placeholder="${isZh ? '更改密码' : 'Đổi mật khẩu'}" autocomplete="new-password" />
        </label>
      </section>

      <section class="account-info-card">
        <label class="account-field full">
          <span>Email</span>
          <input id="profile-email" type="email" value="${escapeHtml(state.user.email)}" autocomplete="email" />
        </label>

        <div class="account-meta-grid">
          ${accountMeta('VIP', isZh ? '免费' : 'Miễn phí', 'crown')}
          ${accountMeta('AI', isZh ? '免费' : 'Miễn phí', 'sparkles')}
          ${accountMeta('ID', userId, 'badge')}
          ${accountMeta(isZh ? '徽章' : 'Huy hiệu', isZh ? '新会员' : 'Thành viên mới', 'star')}
          ${accountMeta(isZh ? '登录方式' : 'Đăng nhập với', 'Google', 'mail')}
          ${accountMeta(isZh ? '语言' : 'Ngôn ngữ', isZh ? '中文' : 'Tiếng Việt', 'languages')}
          ${accountMeta(isZh ? '设备数' : 'Số thiết bị', '1', 'smartphone')}
          ${accountMeta(isZh ? '创建时间' : 'Tạo lúc', createdAt, 'calendar')}
        </div>
      </section>

      ${authMessage()}
    </section>
  `;
}

function accountMeta(label, value, itemIcon) {
  return `
    <div class="account-meta">
      <span>${label}</span>
      <strong>${icon(itemIcon, 16)} ${escapeHtml(value)}</strong>
    </div>
  `;
}

function userAvatar(className, size) {
  const avatarUrl = state.user?.avatarUrl || '';
  if (avatarUrl) {
    return `<span class="${className}" style="--avatar-size:${size}px"><img src="${avatarUrl}" alt="${escapeHtml(state.user?.name || 'Avatar')}" /></span>`;
  }
  const limit = className.includes('account-avatar') ? 1 : 2;
  return `<span class="${className}" style="--avatar-size:${size}px"><span>${initialsOf(state.user?.name).slice(0, limit)}</span></span>`;
}

function chooseProfileAvatar() {
  if (state.avatarUploading) {
    return;
  }
  document.querySelector('#profile-avatar-input')?.click();
}

function handleProfileAvatarChange(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }
  if (!file.type.startsWith('image/')) {
    state.authError = 'Vui lòng chọn tệp hình ảnh.';
    renderProfile();
    return;
  }
  uploadProfileAvatar(file);
}

async function uploadProfileAvatar(file) {
  const formData = new FormData();
  formData.append('avatar', file);
  state.avatarUploading = true;
  state.authError = '';
  renderProfile();
  try {
    const response = await apiFetch('/api/auth/me/avatar', {
      method: 'POST',
      headers: { Authorization: `Bearer ${state.authToken}` },
      body: formData,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.message || 'Không thể tải ảnh đại diện.');
    }
    state.user = data;
    localStorage.setItem('authUser', JSON.stringify(state.user));
    state.avatarUploading = false;
    renderProfile();
  } catch (error) {
    state.authError = error.message;
    state.avatarUploading = false;
    renderProfile();
  }
}

function renderLogin() {
  mount(`
    <section class="login-screen">
      <button class="icon-btn login-back" type="button" onclick="back()" aria-label="${t('back')}">${icon('back', 20)}</button>

      <section class="auth-card">
        <div class="auth-copy">
          <h1>${t('login')}</h1>
          <p>${t('loginSubtitle')}</p>
        </div>

        <label class="auth-field">
          ${icon('mail', 28)}
          <input id="login-email" type="email" placeholder="${t('email')}" autocomplete="email" />
        </label>

        <label class="auth-field">
          ${icon('lock', 28)}
          <input id="login-password" type="password" placeholder="${t('password')}" autocomplete="current-password" />
          <button class="password-toggle" type="button" onclick="togglePasswordVisibility()" aria-label="${t('password')}">${icon('eye', 28)}</button>
        </label>

        ${authMessage()}
        <button class="forgot-link" type="button">${t('forgotPassword')}</button>
        <button class="auth-submit" type="button" onclick="submitLogin()" ${state.authLoading ? 'disabled' : ''}>${state.authLoading ? t('loggingIn') : t('login')}</button>

        <div class="auth-divider">
          <span></span>
          <strong>${t('or')}</strong>
          <span></span>
        </div>

        <div class="social-row">
          <button class="social-btn google" type="button" aria-label="Google"><span>G</span></button>
          <button class="social-btn facebook" type="button" aria-label="Facebook"><span>f</span></button>
          <button class="social-btn apple" type="button" aria-label="Apple"><span></span></button>
        </div>

        <p class="signup-copy">${t('noAccount')} <button type="button" onclick="go('register')">${t('signup')}</button></p>
      </section>
    </section>
  `);
}

function renderRegister() {
  mount(`
    <section class="login-screen register-screen">
      <button class="icon-btn login-back" type="button" onclick="back()" aria-label="${t('back')}">${icon('back', 20)}</button>

      <section class="auth-card register-card">
        <div class="auth-leaf" aria-hidden="true"></div>
        <div class="auth-copy">
          <h1>${t('signup')}</h1>
          <p>${t('registerSubtitle')}</p>
        </div>

        <label class="auth-field">
          ${icon('user', 28)}
          <input id="register-name" type="text" placeholder="${t('fullName')}" autocomplete="name" />
        </label>

        <label class="auth-field">
          ${icon('mail', 28)}
          <input id="register-email" type="email" placeholder="${t('email')}" autocomplete="email" />
        </label>

        <label class="auth-field">
          ${icon('lock', 28)}
          <input id="register-password" type="password" placeholder="${t('password')}" autocomplete="new-password" />
          <button class="password-toggle" type="button" onclick="togglePasswordVisibility('register-password')" aria-label="${t('password')}">${icon('eye', 28)}</button>
        </label>

        ${authMessage()}
        <button class="auth-submit" type="button" onclick="submitRegister()" ${state.authLoading ? 'disabled' : ''}>${state.authLoading ? t('registering') : t('signup')}</button>

        <div class="auth-divider">
          <span></span>
          <strong>${t('or')}</strong>
          <span></span>
        </div>

        <div class="social-row">
          <button class="social-btn google" type="button" aria-label="Google"><span>G</span></button>
          <button class="social-btn facebook" type="button" aria-label="Facebook"><span>f</span></button>
          <button class="social-btn apple" type="button" aria-label="Apple"><span></span></button>
        </div>

        <p class="signup-copy">${t('alreadyHaveAccount')} <button type="button" onclick="go('login')">${t('login')}</button></p>
      </section>

      <p class="terms-copy">${t('agreeTerms')} <button type="button">${t('termsOfService')}</button> ${state.locale === 'zh' ? '和' : 'và'} <button type="button">${t('privacyPolicy')}</button></p>
    </section>
  `);
}

function settingRow(itemIcon, label, badge = '', action = '') {
  return `
    <button class="setting-row" type="button" ${action ? `onclick="${action}"` : ''}>
      <span class="setting-icon">${icon(itemIcon, 24)}</span>
      <span>${label}</span>
      ${badge ? `<span class="setting-badge">${badge}</span>` : `<span class="setting-chevron">${icon('next', 26)}</span>`}
    </button>
  `;
}

function authMessage() {
  return state.authError ? `<p class="auth-message">${escapeHtml(state.authError)}</p>` : '';
}

function setAuth(result) {
  state.authToken = result.token;
  state.user = result.user;
  state.historyRecords = [];
  state.historyLoaded = false;
  localStorage.setItem('authToken', result.token);
  localStorage.setItem('authUser', JSON.stringify(result.user));
  state.authError = '';
}

async function authRequest(path, body) {
  const response = await apiFetch(`/api/auth/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || t('authRequired'));
  }
  return data;
}

async function authFetch(path, options = {}) {
  const response = await apiFetch(`/api/auth/${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.authToken}`,
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || t('authRequired'));
  }
  return data;
}

function openProfileEditor() {
  state.profileEditing = true;
  state.authError = '';
  renderProfile();
}

function closeProfileEditor() {
  state.profileEditing = false;
  state.authError = '';
  renderProfile();
}

async function submitProfileUpdate() {
  const name = document.querySelector('#profile-name')?.value || '';
  const email = document.querySelector('#profile-email')?.value || '';
  const password = document.querySelector('#profile-password')?.value || '';
  if (!name || !email) {
    state.authError = t('authRequired');
    renderProfile();
    return;
  }

  state.authLoading = true;
  state.authError = '';
  renderProfile();
  try {
    const avatarUrl = state.user?.avatarUrl || '';
    const updatedUser = await authFetch('me', {
      method: 'PATCH',
      body: JSON.stringify({ name, email, password, avatarUrl }),
    });
    state.user = { ...updatedUser, avatarUrl: updatedUser.avatarUrl || avatarUrl };
    localStorage.setItem('authUser', JSON.stringify(state.user));
    state.profileEditing = false;
    state.authLoading = false;
    renderProfile();
  } catch (error) {
    if (window.location.port === '3000' && state.user) {
      state.user = { ...state.user, name: name.trim(), email: email.trim().toLowerCase(), avatarUrl: state.user?.avatarUrl || '' };
      localStorage.setItem('authUser', JSON.stringify(state.user));
      state.profileEditing = false;
      state.authLoading = false;
      state.authError = '';
      renderProfile();
      return;
    }
    state.authError = error.message;
    state.authLoading = false;
    renderProfile();
  }
}

async function loadCurrentUser() {
  if (!state.authToken) {
    return;
  }
  try {
    const response = await apiFetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${state.authToken}` },
    });
    if (!response.ok) {
      throw new Error('Invalid session');
    }
    state.user = await response.json();
    state.historyLoaded = false;
  } catch {
    const cachedUser = localStorage.getItem('authUser');
    if (cachedUser) {
      state.user = JSON.parse(cachedUser);
      return;
    }
    state.authToken = '';
    state.user = null;
    writeLearningHistory([]);
    state.historyLoaded = true;
    localStorage.removeItem('authToken');
  }
}

async function submitLogin() {
  const email = document.querySelector('#login-email')?.value || '';
  const password = document.querySelector('#login-password')?.value || '';
  if (!email || !password) {
    state.authError = t('authRequired');
    renderLogin();
    return;
  }
  state.authLoading = true;
  state.authError = '';
  renderLogin();
  try {
    setAuth(await authRequest('login', { email, password }));
    await loadLearningHistory();
    state.screen = 'profile';
    state.authLoading = false;
    renderProfile();
  } catch (error) {
    state.authError = error.message;
    state.authLoading = false;
    renderLogin();
  }
}

async function submitRegister() {
  const name = document.querySelector('#register-name')?.value || '';
  const email = document.querySelector('#register-email')?.value || '';
  const password = document.querySelector('#register-password')?.value || '';
  if (!name || !email || !password) {
    state.authError = t('authRequired');
    renderRegister();
    return;
  }
  state.authLoading = true;
  state.authError = '';
  renderRegister();
  try {
    setAuth(await authRequest('register', { name, email, password }));
    await loadLearningHistory();
    state.screen = 'profile';
    state.authLoading = false;
    renderProfile();
  } catch (error) {
    state.authError = error.message;
    state.authLoading = false;
    renderRegister();
  }
}

async function logout() {
  const token = state.authToken;
  state.authToken = '';
  state.user = null;
  state.profileEditing = false;
  state.avatarUploading = false;
  writeLearningHistory([]);
  state.historyLoaded = true;
  state.historyLoading = false;
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
  if (token) {
    await apiFetch('/api/auth/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {});
  }
  renderProfile();
}

function initialsOf(name) {
  return String(name || '?')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function quickStart() {
  const topic = state.topics[0];
  const level = levelsOf(topic)[0];
  const section = sectionsOfLevel(level)[0];
  const lesson = lessonsOfSection(section)[0];
  const day = daysOf(lesson)[0];
  go('practice', { topicId: topic.id, levelId: level.id, sectionId: section.id, lessonId: lesson.id, dayId: day.id });
}

function renderTopics() {
  mount(`
    ${header(t('chooseTopic'), t('chooseTopicSub'))}
    <div class="list">
      ${state.topics
        .map(
          (topic) => `
            <button class="item-card" onclick="go('levels', { topicId: '${topic.id}', levelId: '${levelsOf(topic)[0]?.id || ''}' })">
              <span class="round-icon">${icon(topic.icon)}</span>
              <span>
                <h3>${textOf(topic, 'title')}</h3>
                <span class="subtle">${textOf(topic, 'description')}</span>
              </span>
              <span class="chevron">${icon('next', 18)}</span>
            </button>
          `,
        )
        .join('')}
    </div>
    ${nav('route')}
  `);
}

function renderLevels() {
  const topic = currentTopic();
  const levels = levelsOf(topic);
  mount(`
    ${header(textOf(topic, 'title'), textOf(topic, 'subtitle'))}
    <p class="section-title">${t('chooseLevel')}</p>
    <div class="list">
      ${levels
        .map(
          (level) => `
            <button class="item-card" onclick="go('sections', { levelId: '${level.id}', sectionId: '${sectionsOfLevel(level)[0]?.id || ''}' })">
              <span class="round-icon">${icon('target')}</span>
              <span>
                <h3>${level.title}</h3>
                <span class="subtle">${level.description || `${sectionsOfLevel(level).length} ${state.locale === 'zh' ? '条路线' : 'lộ trình'}`}</span>
              </span>
              <span class="chevron">${icon('next', 18)}</span>
            </button>
          `,
        )
        .join('')}
    </div>
    ${nav('route')}
  `);
}

function renderSections() {
  const level = currentLevel();
  const sections = sectionsOfLevel(level);
  mount(`
    ${header(level.title, level.description || textOf(currentTopic(), 'title'))}
    <p class="section-title">${t('chooseSection')}</p>
    <div class="list">
      ${sections
        .map(
          (section) => {
            const lessons = lessonsOfSection(section);
            return `
            <button class="item-card" onclick="go('lessons', { sectionId: '${section.id}', lessonId: '${lessons[0]?.id || ''}' })">
              <span class="round-icon">${icon(section.icon)}</span>
              <span>
                <h3>${textOf(section, 'title')}</h3>
                <span class="subtle">${lessons.length} ${state.locale === 'zh' ? '\u5957\u9898' : 'b\u1ed9 \u0111\u1ec1'} · ${lessons.reduce((sum, lesson) => sum + daysOf(lesson).length, 0)} ${state.locale === 'zh' ? '\u5929' : 'ng\u00e0y'}</span>
              </span>
              <span class="chevron">${icon('next', 18)}</span>
            </button>
          `;
          },
        )
        .join('')}
    </div>
    ${nav('route')}
  `);
}

function renderLessons() {
  const section = currentSection();
  const lessons = lessonsOfSection(section);
  mount(`
    ${header(textOf(section, 'title'), textOf(section, 'description'))}
    <p class="section-title">${state.locale === 'zh' ? '选择题组' : 'Chọn bộ đề'}</p>
    <div class="list">
      ${
        lessons
          .map(
            (lesson) => `
              <button class="item-card" onclick="go('days', { lessonId: '${lesson.id}', dayId: '${daysOf(lesson)[0]?.id || ''}' })">
                <span class="round-icon">${icon('book')}</span>
                <span>
                  <h3>${textOf(lesson, 'title')}</h3>
                  <span class="subtle">${daysOf(lesson).length} ${state.locale === 'zh' ? '天' : 'ngày'} · ${tracksOf(lesson).length} ${state.locale === 'zh' ? '题' : 'câu hỏi'}</span>
                </span>
                <span class="chevron">${icon('next', 18)}</span>
              </button>
            `,
          )
          .join('') || `<div class="empty-state">${t('noQuestions')}</div>`
      }
    </div>
    ${nav('route')}
  `);
}

function renderDays() {
  const lesson = currentLesson();
  const days = daysOf(lesson);
  mount(`
    ${header(textOf(currentSection(), 'title'), textOf(currentSection(), 'description'))}
    <p class="section-title">${t('chooseDay')}</p>
    <div class="list">
      ${days
        .map((day, index) => {
          const tracks = tracksOfDay(day);
          const multiAudioIndex = tracks.findIndex((track) => isMultiAudioQuestion(track));
          const initialIndex = multiAudioIndex >= 0 ? multiAudioIndex : 0;
          return `
            <button class="item-card day-card ${isDayCompleted(day.id) ? 'completed' : 'pending'}" onclick="go('practice', { dayId: '${day.id}', index: ${initialIndex} })">
              <span class="round-icon">${icon('calendar')}</span>
              <span>
                <h3>${day.title || `${t('chooseDay')} ${index + 1}`}</h3>
                <span class="subtle">${day.description || `${tracks.length} ${state.locale === 'zh' ? '题' : 'câu hỏi'}`}</span>
              </span>
              <span class="day-card-status">
                <strong>${isDayCompleted(day.id) ? 'Đã luyện' : 'Chưa luyện'}</strong>
                <span class="day-status-icon">${icon(isDayCompleted(day.id) ? 'check' : 'play', isDayCompleted(day.id) ? 15 : 13)}</span>
              </span>
              ${isDayCompleted(day.id) ? '' : '<span class="day-start-cta">Bắt đầu luyện hôm nay</span>'}
            </button>
          `;
        })
        .join('')}
    </div>
    ${nav('calendar')}
  `);
}

function renderPractice() {
  const lesson = currentLesson();
  const day = currentDay();
  const tracks = currentTracks();
  const track = tracks[state.index];
  if (!track) {
    mount(`
      ${header(t('noQuestions'), textOf(lesson, 'title'))}
      <button class="primary-btn" onclick="back()">${t('back')}</button>
      ${nav('calendar')}
    `);
    return;
  }
  const progress = state.index + 1;
  if (isMultiAudioQuestion(track)) {
    renderMultiAudioPractice(lesson, day, tracks, track, progress);
    return;
  }
  if (questionTypeOf(track) === 'trueFalse') {
    renderTrueFalsePractice(lesson, day, tracks, track, progress);
    return;
  }
  ensureAudioTrack(track);

  mount(`
    ${header(`${lesson.level} | ${day.title || ''} | ${progress}/${tracks.length}`, questionTypeOf(track) === 'image' ? t('imageQuestion') : t('trueFalseQuestion'))}
    <div class="mode-steps">
      ${[t('listen'), t('chooseMeaning'), t('splitWords'), t('pinyin')]
        .map((step, index) => `<div class="mode-step ${index === Math.min(3, state.index % 4) ? 'active' : ''}">${index + 1} ${step}</div>`)
        .join('')}
    </div>
    <div class="segmented">
      <button class="pill-btn active">${t('normal')}</button>
      <button class="pill-btn">${t('slow')}</button>
      <button class="pill-btn">${t('subtitleOn')}</button>
    </div>

    ${track.imageUrl && !isImageQuestion(track) ? `<img class="question-hero-image" src="${track.imageUrl}" alt="${track.imageAlt || track.title || ''}" />` : ''}

    <section class="audio-panel">
      <div class="play-row">
        <button class="play-btn ${state.audioPlaying ? 'active' : ''}" onclick="toggleAudio()" aria-label="${state.audioPlaying ? t('pause') : t('play')}" ${track.audioUrl ? '' : 'disabled'}>
          ${icon(state.audioPlaying ? 'pause' : 'play', 22)}
        </button>
        <div class="wave ${state.audioPlaying ? 'active' : ''}" aria-hidden="true">${waveBars()}</div>
        <span class="timecode" title="${t('secondsLeft')} ${state.audioRemaining}s">${formatTime(state.audioRemaining)} / ${formatTime(state.audioDuration)}</span>
      </div>
      ${track.audioUrl ? '' : `<p class="audio-note">${t('noAudio')}</p>`}
    </section>

    <p class="question-title">${trackText(track, 'prompt')}</p>
    ${
      isImageQuestion(track)
        ? `<div class="image-option-grid">
            ${trackOptions(track)
              .slice(0, 4)
              .map((option, index) => imageOptionButton(option, optionImagesOf(track)[index], index, track.answerIndex))
              .join('')}
          </div>`
        : `<div class="list">
            ${trackOptions(track)
              .map((option, index) => optionButton(option, index, track.answerIndex))
              .join('')}
          </div>`
    }

    <div class="analysis">
      <div class="analysis-chip"><strong>${t('keyword')}</strong>${track.keyword}</div>
      <div class="analysis-chip"><strong>${t('pinyin')}</strong>${track.pinyin.split(' ').slice(0, 3).join(' ')}</div>
      <div class="analysis-chip"><strong>${t('explanation')}</strong>${trackText(track, 'vietnamese')}</div>
      <div class="analysis-chip"><strong>${t('vietnameseMeaning')}</strong>${trackOptions(track)[track.answerIndex]}</div>
    </div>

    <button class="primary-btn" style="margin-top:18px;${state.selected === null ? 'opacity:.52' : ''}" onclick="continuePractice()" ${state.selected === null ? 'disabled' : ''}>
      ${state.checked && progress === tracks.length ? t('viewReport') : state.checked ? t('nextQuestion') : t('check')}
    </button>
  `);
}

function renderTrueFalsePractice(lesson, day, tracks, track, progress) {
  ensureAudioTrack(track);
  const answerIndex = Math.max(0, Math.min(1, answerIndexForTrack(track)));
  const selectedCorrect = state.checked && state.selected === answerIndex;
  const isZh = state.locale === 'zh';
  const prompt = trackText(track, 'prompt') || (isZh ? '听音频判断图片' : 'Nghe phán đoán tranh');
  const explanation = trackText(track, 'vietnamese') || (isZh ? '暂无解释。' : 'Chưa có giải thích.');

  const questionImageHtml = track.imageUrl
    ? `<img class="tf-question-image" src="${track.imageUrl}" alt="${track.imageAlt || track.title || prompt}" />`
    : '';

  mount(`
    <header class="tf-screen-head">
      <button class="icon-btn" onclick="back()" aria-label="${t('back')}">${icon('back')}</button>
      <strong>${isZh ? '第' : 'Câu'} ${progress}/${tracks.length}</strong>
      ${languageToggle()}
    </header>

    <section class="tf-question-card">
      <div class="tf-question-title">
        <strong>${prompt}</strong>
        <span>${isZh ? '选择对或错' : 'Chọn đúng hay sai'}</span>
      </div>

      ${
        track.imageUrl
          ? `<img class="tf-question-image" src="${track.imageUrl}" alt="${track.imageAlt || track.title || prompt}" />`
          : `<div class="tf-question-image empty">${isZh ? '暂无图片' : 'Chưa có hình ảnh'}</div>`
      }

      <section class="audio-panel tf-audio-panel">
        <div class="play-row">
          <button class="play-btn ${state.audioPlaying ? 'active' : ''}" onclick="toggleAudio()" aria-label="${state.audioPlaying ? t('pause') : t('play')}" ${track.audioUrl ? '' : 'disabled'}>
            ${icon(state.audioPlaying ? 'pause' : 'volume', 22)}
          </button>
          <div class="wave ${state.audioPlaying ? 'active' : ''}" aria-hidden="true">${waveBars()}</div>
          <span class="timecode" title="${t('secondsLeft')} ${state.audioRemaining}s">${formatTime(state.audioDuration || state.audioRemaining)}</span>
        </div>
        ${track.audioUrl ? '' : `<p class="audio-note">${t('noAudio')}</p>`}
      </section>

      <div class="tf-choice-grid">
        ${trueFalseButton(isZh ? '对' : 'Đúng', 0, answerIndex)}
        ${trueFalseButton(isZh ? '错' : 'Sai', 1, answerIndex)}
      </div>

      ${
        state.checked
          ? `<div class="tf-feedback ${selectedCorrect ? 'correct' : 'wrong'}">
              <strong>${icon(selectedCorrect ? 'check' : 'x', 18)} ${selectedCorrect ? (isZh ? '正确！' : 'Đúng!') : (isZh ? '不正确！' : 'Sai!')}</strong>
              <p><b>${isZh ? '解释：' : 'Giải thích:'}</b> ${explanation}</p>
            </div>`
          : ''
      }

      <button class="primary-btn" style="margin-top:18px;${state.selected === null ? 'opacity:.52' : ''}" onclick="continuePractice()" ${state.selected === null ? 'disabled' : ''}>
        ${state.checked && progress === tracks.length ? t('viewReport') : state.checked ? t('nextQuestion') : t('check')}
      </button>
    </section>
  `);
}

function renderMultiAudioPractice(lesson, day, tracks, track, progress) {
  const audioItems = audioItemsOf(track);
  const options = trackOptions(track);
  const images = optionImagesOf(track);
  const requiredCount = multiAudioRequiredCount(track);
  const isComplete = Array.from({ length: requiredCount }, (_, index) => isMultiAudioStepSolved(track, index)).every(Boolean);
  if (!String(state.audioTrackId || '').startsWith(`${track.id}:multi:`)) {
    stopAudio();
    state.audioTrackId = `${track.id}:multi:none`;
    state.audioItemIndex = null;
    state.selectedAudioItemIndex = 0;
    state.audioDuration = 0;
    state.audioRemaining = 0;
  }

  mount(`
    ${header(`${lesson.level} | ${day.title || ''} | ${progress}/${tracks.length}`, 'Nhiều Audio')}
    <div class="multi-client-head">
      <strong>${trackText(track, 'prompt') || 'Nghe audio và chọn hình ảnh đúng'}</strong>
      <span>${Math.min(progress, 5)}-${Math.min(progress + 4, tracks.length)}/${tracks.length}</span>
    </div>

    <section class="multi-client-audio-card">
      ${Array.from({ length: requiredCount }, (_, index) => multiAudioRow(audioItems[index], index, track)).join('')}
    </section>

    <div class="multi-client-divider"></div>

    <section class="multi-client-image-grid">
      ${Array.from({ length: 5 }, (_, index) => multiAudioImageOption(options[index] || `Đáp án ${String.fromCharCode(65 + index)}`, images[index], index, track)).join('')}
    </section>

    <button class="primary-btn" style="margin-top:18px;${isComplete ? '' : 'opacity:.52'}" onclick="continuePractice()" ${isComplete ? '' : 'disabled'}>
      ${progress === tracks.length ? t('viewReport') : t('nextQuestion')}
    </button>
  `);
}

function trueFalseButton(label, index, answerIndex) {
  const isSelected = state.selected === index;
  const isCorrect = state.checked && index === answerIndex;
  const isWrong = state.checked && isSelected && index !== answerIndex;

  return `
    <button class="tf-choice ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}" onclick="selectAnswer(${index})">
      ${isCorrect ? icon('check', 17) : isWrong ? icon('x', 17) : ''}
      <span>${label}</span>
    </button>
  `;
}

function multiAudioRow(audio, index, track) {
  const isActive = state.selectedAudioItemIndex === index;
  const isPlaying = state.audioPlaying && state.audioItemIndex === index;
  const isLoaded = !!audio?.url;
  const selectedAnswer = multiAudioSelectionAt(index);
  const answerLetter = selectedAnswer === null ? '' : String.fromCharCode(65 + selectedAnswer);
  const isUnlocked = isMultiAudioRowUnlocked(track, index);
  const isSolved = isMultiAudioStepSolved(track, index);
  const timeLabel = isPlaying && state.audioDuration ? `${formatTime(state.audioRemaining)} / ${formatTime(state.audioDuration)}` : '';
  return `
    <div class="multi-client-audio-row ${isActive ? 'active' : ''} ${isLoaded && isUnlocked ? '' : 'disabled'} ${isSolved ? 'solved' : ''}" onclick="selectMultiAudioRow(${index})">
      <strong>${index + 1}.</strong>
      <button class="multi-client-play" onclick="event.stopPropagation(); toggleMultiAudio(${index})" ${isLoaded && isUnlocked ? '' : 'disabled'} aria-label="${isPlaying ? t('pause') : t('play')}">
        ${icon(isPlaying ? 'pause' : 'volume-2', 19)}
      </button>
      <div class="multi-client-wave ${isPlaying ? 'active' : ''}" aria-hidden="true">${waveBars(22)}</div>
      <span class="multi-client-time">${timeLabel}</span>
      <span class="multi-client-box ${answerLetter ? 'filled' : ''} ${isSolved ? 'correct' : ''}">${answerLetter}</span>
    </div>
  `;
}

function multiAudioImageOption(option, imageUrl, index, track) {
  const activeSelection = multiAudioSelectionAt(state.selectedAudioItemIndex);
  const activeAttempt = Number.isFinite(Number(state.multiAudioAttempts[state.selectedAudioItemIndex])) ? Number(state.multiAudioAttempts[state.selectedAudioItemIndex]) : null;
  const isSelected = activeSelection === index || activeAttempt === index;
  const isUsedBySolvedAudio = state.multiAudioSelections.some((value, audioIndex) => Number(value) === index && audioIndex !== state.selectedAudioItemIndex && isMultiAudioStepSolved(track, audioIndex));
  const expected = Number(audioItemsOf(track)[state.selectedAudioItemIndex]?.answerIndex ?? track.answerIndex ?? 0);
  const isCorrect = activeSelection === index && index === expected;
  const isWrong = activeAttempt === index && activeSelection !== index && index !== expected;
  return `
    <button class="multi-client-image-option ${isSelected ? 'selected' : ''} ${isUsedBySolvedAudio ? 'used' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}" onclick="selectAnswer(${index})" ${isUsedBySolvedAudio || state.checked ? 'disabled' : ''}>
      <span class="multi-client-letter">${String.fromCharCode(65 + index)}</span>
      ${imageUrl ? `<img src="${imageUrl}" alt="${option}" />` : `<span class="multi-client-image-empty">${option}</span>`}
      <span class="image-option-mark">${isUsedBySolvedAudio ? icon('lock', 15) : isCorrect ? icon('check', 18) : isWrong ? icon('x', 18) : ''}</span>
    </button>
  `;
}

function imageOptionButton(option, imageUrl, index, answerIndex) {
  const isSelected = state.selected === index;
  const isCorrect = state.checked && index === answerIndex;
  const isWrong = state.checked && isSelected && index !== answerIndex;
  const mark = isCorrect ? icon('check', 18) : isWrong ? icon('x', 18) : '';

  return `
    <button class="image-option-card ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}" onclick="selectAnswer(${index})">
      <span class="image-option-label">${String.fromCharCode(65 + index)}</span>
      <span class="image-option-media">
        ${imageUrl ? `<img src="${imageUrl}" alt="${option}" />` : `<span>${option}</span>`}
      </span>
      <span class="image-option-caption">${option}</span>
      <span class="image-option-mark">${mark}</span>
    </button>
  `;
}

function optionButton(option, index, answerIndex) {
  const isSelected = state.selected === index;
  const isCorrect = state.checked && index === answerIndex;
  const isWrong = state.checked && isSelected && index !== answerIndex;
  const mark = isCorrect ? icon('check', 18) : '';

  return `
    <button class="option-card ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}" onclick="selectAnswer(${index})">
      <strong>${String.fromCharCode(65 + index)}.</strong>
      <span>${option}</span>
      <span>${mark}</span>
    </button>
  `;
}

function selectAnswer(index) {
  if (state.checked) {
    return;
  }
  const track = currentTracks()[state.index];
  if (isMultiAudioQuestion(track)) {
    if (!isMultiAudioRowUnlocked(track, state.selectedAudioItemIndex)) {
      return;
    }
    const usedBySolvedAudio = state.multiAudioSelections.some((value, audioIndex) => Number(value) === index && audioIndex !== state.selectedAudioItemIndex && isMultiAudioStepSolved(track, audioIndex));
    if (usedBySolvedAudio) {
      return;
    }
    const expected = Number(audioItemsOf(track)[state.selectedAudioItemIndex]?.answerIndex ?? track.answerIndex ?? 0);
    state.multiAudioAttempts[state.selectedAudioItemIndex] = index;
    if (index !== expected) {
      renderPractice();
      return;
    }
    state.multiAudioSelections[state.selectedAudioItemIndex] = index;
    if (isMultiAudioStepSolved(track, state.selectedAudioItemIndex)) {
      const nextIndex = firstUnsolvedMultiAudioIndex(track);
      if (nextIndex !== state.selectedAudioItemIndex) {
        state.selectedAudioItemIndex = nextIndex;
      }
    }
    renderPractice();
    return;
  }
  state.selected = index;
  renderPractice();
}

function selectMultiAudioRow(index) {
  if (state.checked) {
    return;
  }
  const track = currentTracks()[state.index];
  const nextIndex = Math.max(0, Math.min(4, Number(index) || 0));
  if (!isMultiAudioRowUnlocked(track, nextIndex)) {
    return;
  }
  state.selectedAudioItemIndex = nextIndex;
  renderPractice();
}

function continuePractice() {
  const tracks = currentTracks();
  const track = tracks[state.index];

  if (isMultiAudioQuestion(track)) {
    if (!Array.from({ length: multiAudioRequiredCount(track) }, (_, index) => isMultiAudioStepSolved(track, index)).every(Boolean)) {
      return;
    }
    state.answers[state.index] = {
      trackId: track.id,
      selected: state.multiAudioSelections.slice(0, multiAudioRequiredCount(track)),
      correct: multiAudioCorrect(track),
      mode: modeOf(track),
    };
    if (state.index >= tracks.length - 1) {
      markCurrentDayCompleted();
      stopAudio();
      state.screen = 'report';
      renderReport();
      return;
    }
    stopAudio();
    state.index += 1;
    state.selected = null;
    state.multiAudioSelections = [];
    state.multiAudioAttempts = [];
    state.selectedAudioItemIndex = 0;
    state.checked = false;
    renderPractice();
    return;
  } else if (state.selected === null) {
    return;
  }

  if (!state.checked) {
    state.answers[state.index] = {
      trackId: track.id,
      selected: state.selected,
      correct: state.selected === answerIndexForTrack(track),
      mode: modeOf(track),
    };
    state.checked = true;
    renderPractice();
    return;
  }

  if (state.index >= tracks.length - 1) {
    markCurrentDayCompleted();
    stopAudio();
    state.screen = 'report';
    renderReport();
    return;
  }

  stopAudio();
  state.index += 1;
  state.selected = null;
  state.multiAudioSelections = [];
  state.multiAudioAttempts = [];
  state.selectedAudioItemIndex = 0;
  state.checked = false;
  renderPractice();
}

function ensureAudioTrack(track) {
  if (state.audioTrackId === track.id) {
    return;
  }
  stopAudio();
  state.audioTrackId = track.id;
  state.audioDuration = getAudioDuration(track);
  state.audioRemaining = state.audioDuration;
}

function getAudioDuration(track) {
  return track.audioUrl ? 0 : 0;
}

function formatTime(totalSeconds) {
  const seconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const rest = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${rest}`;
}

function toggleAudio() {
  if (state.audioPlaying) {
    stopAudioTimer();
    if (state.audioElement) {
      state.audioElement.pause();
    }
    state.audioPlaying = false;
    renderPractice();
    return;
  }

  playCurrentAudio();
}

function toggleMultiAudio(index) {
  if (state.audioPlaying && state.audioItemIndex === index) {
    stopAudioTimer();
    if (state.audioElement) {
      state.audioElement.pause();
    }
    state.audioPlaying = false;
    renderPractice();
    return;
  }

  playMultiAudio(index);
}

function playMultiAudio(index) {
  const track = currentTracks()[state.index];
  if (!isMultiAudioRowUnlocked(track, index)) {
    return;
  }
  const audio = audioItemsOf(track)[index];
  state.selectedAudioItemIndex = index;

  if (!audio?.url) {
    state.audioPlaying = false;
    state.audioItemIndex = null;
    state.audioDuration = 0;
    state.audioRemaining = 0;
    renderPractice();
    return;
  }

  const audioTrackId = `${track.id}:multi:${index}`;
  if (!state.audioElement || state.audioElement.dataset.trackId !== audioTrackId) {
    stopAudio();
    state.audioElement = new Audio(audio.url);
    state.audioElement.dataset.trackId = audioTrackId;
    state.audioElement.onloadedmetadata = () => {
      const duration = Math.ceil(state.audioElement.duration || 0);
      state.audioDuration = duration;
      state.audioRemaining = duration;
      renderPractice();
    };
    state.audioElement.ontimeupdate = () => {
      updateAudioClock();
    };
    state.audioElement.onended = () => {
      state.audioRemaining = 0;
      stopAudioTimer();
      state.audioPlaying = false;
      state.audioItemIndex = null;
      renderPractice();
    };
    state.audioElement.onerror = () => {
      stopAudio();
      alert(t('audioLoadError'));
      renderPractice();
    };
  }

  state.audioTrackId = audioTrackId;
  state.audioItemIndex = index;
  state.selectedAudioItemIndex = index;
  state.audioPlaying = true;
  startAudioTimer();
  state.audioElement.play().catch(() => {
    stopAudio();
    state.audioElement = null;
    alert(t('audioLoadError'));
    renderPractice();
  });

  renderPractice();
}

function playCurrentAudio() {
  const track = currentTracks()[state.index];
  ensureAudioTrack(track);

  if (!track.audioUrl) {
    state.audioPlaying = false;
    state.audioDuration = 0;
    state.audioRemaining = 0;
    renderPractice();
    return;
  }

  if (!state.audioElement || state.audioElement.dataset.trackId !== track.id) {
    stopAudio();
    state.audioElement = new Audio(track.audioUrl);
    state.audioElement.dataset.trackId = track.id;
    state.audioElement.onloadedmetadata = () => {
      const duration = Math.ceil(state.audioElement.duration || 0);
      state.audioDuration = duration;
      state.audioRemaining = duration;
      renderPractice();
    };
    state.audioElement.ontimeupdate = () => {
      updateAudioClock();
    };
    state.audioElement.onended = () => {
      state.audioRemaining = 0;
      stopAudioTimer();
      state.audioPlaying = false;
      renderPractice();
    };
    state.audioElement.onerror = () => {
      stopAudio();
      alert(t('audioLoadError'));
      renderPractice();
    };
  }

  state.audioPlaying = true;
  startAudioTimer();
  state.audioElement.play().catch(() => {
    stopAudio();
    state.audioElement = null;
    alert(t('audioLoadError'));
    renderPractice();
  });

  renderPractice();
}

function startAudioTimer() {
  stopAudioTimer();
  state.audioTimer = window.setInterval(() => {
    updateAudioClock();
    renderPractice();
  }, 1000);
}

function updateAudioClock() {
  if (!state.audioElement || !Number.isFinite(state.audioElement.duration)) {
    return;
  }
  const duration = Math.ceil(state.audioElement.duration);
  const remaining = Math.max(0, Math.ceil(duration - state.audioElement.currentTime));
  state.audioDuration = duration;
  state.audioRemaining = remaining;
}

function stopAudioTimer() {
  if (state.audioTimer) {
    window.clearInterval(state.audioTimer);
    state.audioTimer = null;
  }
}

function stopAudio(releaseElement = true) {
  stopAudioTimer();
  state.audioPlaying = false;
  state.audioItemIndex = null;
  if (state.audioElement) {
    state.audioElement.pause();
  }
  if (releaseElement) {
    state.audioElement = null;
  }
}

function renderReport() {
  const lesson = currentLesson();
  const answerList = state.answers.filter(Boolean);
  const answered = answerList.length || 10;
  const correct = answerList.filter((answer) => answer.correct).length;
  const score = Math.round((correct / answered) * 100) || 0;
  const localizedWeakMode = answerList.find((answer) => !answer.correct)?.mode || t('listen');
  const weakMode = answerList.find((answer) => !answer.correct)?.mode || 'Nghe phân biệt cụm từ';

  mount(`
    ${header(t('reportTitle'), t('reportSub'))}
    <div class="report-grid">
      <div class="stat-card"><span class="subtle">${t('accuracy')}</span><strong>${score}%</strong></div>
      <div class="stat-card"><span class="subtle">${t('trainingTime')}</span><strong>${answered * 5} ${t('minutes')}</strong></div>
      <div class="stat-card"><span class="subtle">${t('thisTopic')}</span><strong>${answered}/10</strong></div>
      <div class="stat-card"><span class="subtle">${t('completedLesson')}</span><strong>${Math.max(1, Math.round(answered / 4))} ${t('lessons')}</strong></div>
    </div>

    <section class="report-main">
      <div>
        <h3>${t('distribution')}</h3>
        ${barRow(t('veryAccurate'), Math.max(score, 12))}
        ${barRow(t('accurate'), Math.max(40, score - 18))}
        ${barRow(t('needsWork'), Math.max(10, 100 - score))}
        ${barRow(t('manyWrong'), Math.max(6, 100 - score - 28))}
      </div>
      <div class="score-ring" style="--score:${score}%">
        <div class="score-inner"><span>${t('totalScore')}</span><strong>${score}</strong><span>/ 100</span></div>
      </div>
    </section>

    <p class="section-title">${t('suggestions')}</p>
    <div class="suggestions">
      <div class="suggest-card">
        <h3>${t('continuePath')}</h3>
        <p class="subtle">${textOf(lesson, 'title')}<br />${textOf(lesson, 'goal')}</p>
        <button class="primary-btn" onclick="go('practice')">${t('continue')}</button>
      </div>
      <div class="suggest-card">
        <h3>${t('weakPart')}</h3>
        <p class="subtle">${localizedWeakMode}<br />${t('reviewWrong')}</p>
        <button class="pill-btn" onclick="retryWrong()">${t('practiceNow')}</button>
      </div>
      <div class="suggest-card">
        <h3>${t('upgradeTopic')}</h3>
        <p class="subtle">${textOf(currentSection(), 'title')}<br />${t('nextLesson')}</p>
        <button class="pill-btn" onclick="go('days')">${t('explore')}</button>
      </div>
    </div>
    ${nav('file')}
  `);
}

function retryWrong() {
  state.screen = 'practice';
  state.index = 0;
  state.answers = [];
  state.selected = null;
  state.multiAudioSelections = [];
  state.multiAudioAttempts = [];
  state.checked = false;
  state.sessionStartedAt = Date.now();
  stopAudio();
  renderPractice();
}

function barRow(label, value) {
  const safeValue = Math.max(0, Math.min(100, value));
  return `
    <div class="bar-row">
      <span>${label}</span>
      <span class="bar"><span style="width:${safeValue}%"></span></span>
      <strong>${safeValue}%</strong>
    </div>
  `;
}

function header(title, subtitle) {
  return `
    <header class="screen-head">
      <button class="icon-btn" onclick="back()" aria-label="${t('back')}">${icon('back')}</button>
      <div style="flex:1">
        <h2>${title}</h2>
        <p class="subtle">${subtitle}</p>
      </div>
      ${languageToggle()}
    </header>
  `;
}

function waveBars(count = 24) {
  return Array.from({ length: count }, (_, index) => `<span style="height:${12 + ((index * 7) % 24)}px"></span>`).join('');
}

function formatClock(timestamp) {
  const date = new Date(timestamp || Date.now());
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

function resultAction(kind, title, subtitle, action) {
  const actionIcons = {
    continue: 'route',
    review: 'file',
    next: 'book',
  };

  return `
    <button class="result-action ${kind}" onclick="${action}">
      <span class="result-action-icon">${icon(actionIcons[kind] || 'next', 19)}</span>
      <span>
        <strong>${title}</strong>
        <small>${subtitle}</small>
      </span>
      ${icon('next', 18)}
    </button>
  `;
}

function renderReport() {
  const lesson = currentLesson();
  const total = currentTracks().length || 10;
  const answerList = state.answers.filter(Boolean);
  const answered = answerList.length || total;
  const correct = answerList.filter((answer) => answer.correct).length;
  const score = Math.round((correct / Math.max(1, answered)) * 100) || 0;
  const weakMode = answerList.find((answer) => !answer.correct)?.mode || t('listen');
  const startTime = formatClock(state.sessionStartedAt || Date.now());
  const isZh = state.locale === 'zh';
  const title = isZh ? '练习结果' : 'Kết quả luyện tập';
  const praise = score >= 85 ? (isZh ? '非常好!' : 'Rất tốt!') : score >= 60 ? (isZh ? '继续加油!' : 'Khá tốt!') : isZh ? '再练一次!' : 'Cần luyện thêm!';
  const completedLabel = isZh ? '已完成' : 'Hoàn thành';
  const startLabel = isZh ? '开始时间' : 'Bắt đầu';
  const correctLabel = isZh ? '答对' : 'Đáp đúng';
  const nextTitle = isZh ? '下一步建议' : 'Gợi ý tiếp theo';
  const continueLearning = isZh ? '继续学习' : 'Tiếp tục học';
  const nextLessonTitle = isZh ? '学习下一课' : 'Học bài tiếp theo';

  mount(`
    <header class="result-head">
      <button class="icon-btn result-back" onclick="back()" aria-label="${t('back')}">${icon('back', 20)}</button>
      <h2>${title}</h2>
      <span></span>
    </header>

    <section class="result-score">
      <div class="confetti" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span><span></span>
      </div>
      <div class="score-ring result-ring" style="--score:${score}%">
        <div class="score-inner result-inner"><strong>${score}</strong><span>/100</span></div>
      </div>
      <h3>${praise}</h3>
    </section>

    <section class="result-stats">
      <div class="result-stat"><strong>${answered}/${total}</strong><span>${completedLabel}</span></div>
      <div class="result-stat"><strong>${startTime}</strong><span>${startLabel}</span></div>
      <div class="result-stat"><strong>${correct}/${answered}</strong><span>${correctLabel}</span></div>
    </section>

    <p class="section-title result-section-title">${nextTitle}</p>
    <div class="result-actions">
      ${resultAction('continue', t('continuePath'), textOf(lesson, 'goal'), "go('practice')")}
      ${resultAction('review', t('weakPart'), weakMode, 'retryWrong()')}
      ${resultAction('next', nextLessonTitle, textOf(currentSection(), 'title'), "go('days')")}
    </div>

    <button class="primary-btn result-cta" onclick="go('days')">${continueLearning}</button>
    ${nav('file')}
  `);
}

function togglePasswordVisibility(inputId = 'login-password') {
  const input = document.querySelector(`#${inputId}`);
  if (!input) {
    return;
  }
  input.type = input.type === 'password' ? 'text' : 'password';
}

window.go = go;
window.back = back;
window.quickStart = quickStart;
window.selectAnswer = selectAnswer;
window.selectMultiAudioRow = selectMultiAudioRow;
window.continuePractice = continuePractice;
window.toggleAudio = toggleAudio;
window.toggleMultiAudio = toggleMultiAudio;
window.handleNav = handleNav;
window.retryWrong = retryWrong;
window.toggleLanguage = toggleLanguage;
window.togglePasswordVisibility = togglePasswordVisibility;
window.submitLogin = submitLogin;
window.submitRegister = submitRegister;
window.logout = logout;
window.openProfileEditor = openProfileEditor;
window.closeProfileEditor = closeProfileEditor;
window.submitProfileUpdate = submitProfileUpdate;
window.chooseProfileAvatar = chooseProfileAvatar;
window.handleProfileAvatarChange = handleProfileAvatarChange;

async function refreshVisibleData() {
  if (state.screen === 'report') {
    return;
  }
  await loadTopics();
  render();
}

window.addEventListener('focus', () => {
  refreshVisibleData().catch(() => {});
});

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    refreshVisibleData().catch(() => {});
  }
});

init().catch(() => {
  mount(`<div class="empty-state">${t('loadError')}</div>`);
});

