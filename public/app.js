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
  checked: false,
  audioPlaying: false,
  audioRemaining: 0,
  audioDuration: 0,
  audioTrackId: null,
  audioTimer: null,
  audioElement: null,
  sessionStartedAt: null,
  locale: 'vi',
  authToken: localStorage.getItem('authToken') || '',
  user: null,
  authLoading: false,
  authError: '',
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
      'Nghe phÃ¢n biá»‡t cá»¥m tá»«': '短语辨听',
      'Chá»n nghÄ©a': '选择意思',
      'Hiá»ƒu cÃ¢u': '理解句子',
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

function t(key) {
  return translations[state.locale][key] || translations.vi[key] || key;
}

function textOf(item, field) {
  return localizedContent[state.locale]?.items?.[item.id]?.[field] || item[field] || '';
}

function phraseKey(track) {
  return track.id.split('-').slice(-2).join('-');
}

function trackText(track, field) {
  return localizedContent[state.locale]?.phrases?.[phraseKey(track)]?.[field] || track[field] || '';
}

function trackOptions(track) {
  if (track.questionType === 'image') {
    return track.options;
  }
  return localizedContent[state.locale]?.phrases?.[phraseKey(track)]?.options || track.options;
}

function optionImagesOf(track) {
  const images = Array.isArray(track.optionImages) ? track.optionImages : [];
  return Array.from({ length: 4 }, (_, index) => images[index] || '');
}

function isImageQuestion(track) {
  return track.questionType === 'image' && optionImagesOf(track).some(Boolean);
}

function modeOf(track) {
  return localizedContent[state.locale]?.modes?.[track.mode] || track.mode;
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
  render();
}

async function init() {
  await loadCurrentUser();
  await loadTopics();
  render();
}

async function loadTopics() {
  const response = await fetch('/api/listening/topics');
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
  return track?.questionType === 'image' ? 'image' : 'trueFalse';
}

function tracksOf(lesson) {
  return daysOf(lesson).flatMap((day) => tracksOfDay(day));
}

function currentTracks() {
  return tracksOfDay(currentDay());
}

function icon(name, size = 19) {
  return `<i data-lucide="${iconMap[name] || name}" style="width:${size}px;height:${size}px"></i>`;
}

function mount(html) {
  $app.innerHTML = html;
  if (window.lucide) {
    window.lucide.createIcons();
  }
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
    state.screen = state.answers.length ? 'report' : 'home';
  }
  if (id === 'profile') {
    state.screen = 'profile';
  }
  render();
}

function go(screen, payload = {}) {
  stopAudio();
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
  if (screen === 'practice') {
    state.index = 0;
    state.answers = [];
    state.selected = null;
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
    days: 'sections',
    practice: 'days',
    report: 'home',
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
    days: renderDays,
    practice: renderPractice,
    report: renderReport,
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

function renderProfile() {
  const settingItems = [
    ['sync', t('syncExtension')],
    ['translate', t('nativeLanguage')],
    ['graduation', t('levelSetting')],
    ['goal', t('goalSetting')],
    ['grid', t('topicSetting')],
  ];

  mount(`
    <section class="profile-screen">
      <div class="profile-spacer" aria-hidden="true"></div>

      ${
        state.user
          ? `<section class="login-card user-card">
              <span class="avatar-placeholder signed-in"><span>${initialsOf(state.user.name)}</span></span>
              <span>
                <small>${t('welcomeBack')}</small>
                <strong>${escapeHtml(state.user.name)}</strong>
                <em>${escapeHtml(state.user.email)}</em>
              </span>
              <button class="logout-btn" type="button" onclick="logout()">${t('logout')}</button>
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

      <h2 class="profile-section-title">${t('settings')}</h2>
      <section class="settings-card">
        ${settingItems.map(([itemIcon, label]) => settingRow(itemIcon, label)).join('')}
      </section>
    </section>
    ${nav('profile')}
  `);
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

function settingRow(itemIcon, label) {
  return `
    <button class="setting-row" type="button">
      <span class="setting-icon">${icon(itemIcon, 24)}</span>
      <span>${label}</span>
      <span class="setting-chevron">${icon('next', 26)}</span>
    </button>
  `;
}

function authMessage() {
  return state.authError ? `<p class="auth-message">${escapeHtml(state.authError)}</p>` : '';
}

function setAuth(result) {
  state.authToken = result.token;
  state.user = result.user;
  localStorage.setItem('authToken', result.token);
  state.authError = '';
}

async function authRequest(path, body) {
  const response = await fetch(`/api/auth/${path}`, {
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

async function loadCurrentUser() {
  if (!state.authToken) {
    return;
  }
  try {
    const response = await fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${state.authToken}` },
    });
    if (!response.ok) {
      throw new Error('Invalid session');
    }
    state.user = await response.json();
  } catch {
    state.authToken = '';
    state.user = null;
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
  localStorage.removeItem('authToken');
  if (token) {
    await fetch('/api/auth/logout', {
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
            const lesson = lessonsOfSection(section)[0];
            return `
            <button class="item-card" onclick="go('days', { sectionId: '${section.id}', lessonId: '${lesson?.id || ''}', dayId: '${daysOf(lesson)[0]?.id || ''}' })">
              <span class="round-icon">${icon(section.icon)}</span>
              <span>
                <h3>${textOf(section, 'title')}</h3>
                <span class="subtle">${daysOf(lesson).length} ${state.locale === 'zh' ? '天' : 'ngày'} · ${tracksOf(lesson).length} ${state.locale === 'zh' ? '题' : 'câu hỏi'}</span>
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
          return `
            <button class="item-card" onclick="go('practice', { dayId: '${day.id}' })">
              <span class="round-icon">${icon('calendar')}</span>
              <span>
                <h3>${day.title || `${t('chooseDay')} ${index + 1}`}</h3>
                <span class="subtle">${day.description || `${tracks.length} ${state.locale === 'zh' ? '题' : 'câu hỏi'}`}</span>
              </span>
              <span class="chevron">${icon('next', 18)}</span>
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
  ensureAudioTrack(track);
  const progress = state.index + 1;

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
  state.selected = index;
  renderPractice();
}

function continuePractice() {
  const tracks = currentTracks();
  const track = tracks[state.index];

  if (state.selected === null) {
    return;
  }

  if (!state.checked) {
    state.answers[state.index] = {
      trackId: track.id,
      selected: state.selected,
      correct: state.selected === track.answerIndex,
      mode: modeOf(track),
    };
    state.checked = true;
    renderPractice();
    return;
  }

  if (state.index >= tracks.length - 1) {
    stopAudio();
    state.screen = 'report';
    renderReport();
    return;
  }

  stopAudio();
  state.index += 1;
  state.selected = null;
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
  if (state.audioElement) {
    state.audioElement.pause();
  }
  if (releaseElement) {
    state.audioElement = null;
  }
}

function renderReport() {
  const lesson = currentLesson();
  const answered = state.answers.length || 10;
  const correct = state.answers.filter((answer) => answer.correct).length;
  const score = Math.round((correct / answered) * 100) || 0;
  const localizedWeakMode = state.answers.find((answer) => !answer.correct)?.mode || t('listen');
  const weakMode = state.answers.find((answer) => !answer.correct)?.mode || 'Nghe phân biệt cụm từ';

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

function waveBars() {
  return Array.from({ length: 24 }, (_, index) => `<span style="height:${12 + ((index * 7) % 24)}px"></span>`).join('');
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
  const answered = state.answers.length || total;
  const correct = state.answers.filter((answer) => answer.correct).length;
  const score = Math.round((correct / Math.max(1, answered)) * 100) || 0;
  const weakMode = state.answers.find((answer) => !answer.correct)?.mode || t('listen');
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
window.continuePractice = continuePractice;
window.toggleAudio = toggleAudio;
window.handleNav = handleNav;
window.retryWrong = retryWrong;
window.toggleLanguage = toggleLanguage;
window.togglePasswordVisibility = togglePasswordVisibility;
window.submitLogin = submitLogin;
window.submitRegister = submitRegister;
window.logout = logout;

async function refreshVisibleData() {
  if (state.screen === 'practice' || state.screen === 'report') {
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
