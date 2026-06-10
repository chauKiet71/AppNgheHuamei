const state = {
  topics: [],
  topicId: null,
  levelId: null,
  sectionId: null,
  lessonId: null,
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
    daily: 'Hằng ngày',
    chooseSection: 'Chọn chuyên đề nghe',
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
  return localizedContent[state.locale]?.phrases?.[phraseKey(track)]?.options || track.options;
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
  const response = await fetch('/api/listening/topics');
  state.topics = await response.json();
  state.topicId = state.topics[0]?.id || null;
  state.levelId = levelsOf(state.topics[0])?.[0]?.id || null;
  render();
}

function currentTopic() {
  return state.topics.find((topic) => topic.id === state.topicId) || state.topics[0];
}

function levelsOf(topic) {
  if (topic?.levels?.length) {
    return topic.levels;
  }
  return [
    {
      id: `${topic?.id || 'topic'}-default-level`,
      title: topic?.id === 'hsk' ? 'HSK3' : t('daily'),
      description: topic?.subtitle || '',
      sections: topic?.sections || [],
    },
  ];
}

function currentLevel() {
  const topic = currentTopic();
  const levels = levelsOf(topic);
  return levels.find((level) => level.id === state.levelId) || levels[0];
}

function sectionsOf(topic) {
  return levelsOf(topic).flatMap((level) => level.sections || []);
}

function currentSection() {
  const level = currentLevel();
  return level?.sections.find((section) => section.id === state.sectionId) || level?.sections[0];
}

function currentLesson() {
  const section = currentSection();
  return section?.lessons.find((lesson) => lesson.id === state.lessonId) || section?.lessons[0];
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
  render();
}

function go(screen, payload = {}) {
  stopAudio();
  Object.assign(state, payload);
  state.screen = screen;
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
    lessons: 'sections',
    practice: 'lessons',
    report: 'home',
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
    practice: renderPractice,
    report: renderReport,
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
      <button class="course-card featured" onclick="go('levels', { topicId: '${hskTopic.id}', levelId: '${levelsOf(hskTopic)[0]?.id || ''}', sectionId: '${levelsOf(hskTopic)[0]?.sections[0]?.id || ''}' })">
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

function quickStart() {
  const topic = state.topics[0];
  const level = levelsOf(topic)[0];
  const section = level.sections[0];
  const lesson = section.lessons[0];
  go('practice', { topicId: topic.id, levelId: level.id, sectionId: section.id, lessonId: lesson.id });
}

function renderTopics() {
  mount(`
    ${header(t('chooseTopic'), t('chooseTopicSub'))}
    <div class="list">
      ${state.topics
        .map(
          (topic) => `
            <button class="item-card" onclick="go('levels', { topicId: '${topic.id}', levelId: '${levelsOf(topic)[0]?.id || ''}', sectionId: '${levelsOf(topic)[0]?.sections[0]?.id || ''}' })">
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
    <p class="section-title">${state.locale === 'zh' ? '选择等级' : 'Chọn cấp độ'}</p>
    <div class="list">
      ${levels
        .map(
          (level) => `
            <button class="item-card" onclick="go('sections', { levelId: '${level.id}', sectionId: '${level.sections[0]?.id || ''}' })">
              <span class="round-icon">${icon('target')}</span>
              <span>
                <h3>${level.title}</h3>
                <span class="subtle">${level.description || `${level.sections.length} ${state.locale === 'zh' ? '条路线' : 'lộ trình'}`}</span>
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
  mount(`
    ${header(level.title, level.description || textOf(currentTopic(), 'title'))}
    <p class="section-title">${t('chooseSection')}</p>
    <div class="list">
      ${level.sections
        .map(
          (section) => `
            <button class="item-card" onclick="go('lessons', { sectionId: '${section.id}', lessonId: '${section.lessons[0].id}' })">
              <span class="round-icon">${icon(section.icon)}</span>
              <span>
                <h3>${textOf(section, 'title')}</h3>
                <span class="subtle">${textOf(section, 'description')}</span>
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

function renderLessons() {
  const section = currentSection();
  mount(`
    ${header(textOf(section, 'title'), textOf(section, 'description'))}
    <div class="list">
      ${section.lessons
        .map(
          (lesson) => `
            <button class="item-card" onclick="go('practice', { lessonId: '${lesson.id}' })">
              <span class="round-icon">${icon(section.icon)}</span>
              <span>
                <h3>${textOf(lesson, 'title')}</h3>
                <span class="subtle">${textOf(lesson, 'description')}</span>
              </span>
              <span class="chevron">${icon('next', 18)}</span>
            </button>
          `,
        )
        .join('')}
    </div>
    <button class="primary-btn" style="margin-top:18px" onclick="go('practice', { lessonId: '${section.lessons[0].id}' })">${t('startTopic')}</button>
    ${nav('calendar')}
  `);
}

function renderPractice() {
  const lesson = currentLesson();
  const track = lesson.tracks[state.index];
  ensureAudioTrack(track);
  const progress = state.index + 1;

  mount(`
    ${header(`${lesson.level} | ${state.locale === 'zh' ? '第' : 'Bài'} ${progress} | ${modeOf(track)}`, textOf(lesson, 'goal'))}
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
    <div class="list">
      ${trackOptions(track)
        .map((option, index) => optionButton(option, index, track.answerIndex))
        .join('')}
    </div>

    <div class="analysis">
      <div class="analysis-chip"><strong>${t('keyword')}</strong>${track.keyword}</div>
      <div class="analysis-chip"><strong>${t('pinyin')}</strong>${track.pinyin.split(' ').slice(0, 3).join(' ')}</div>
      <div class="analysis-chip"><strong>${t('explanation')}</strong>${trackText(track, 'vietnamese')}</div>
      <div class="analysis-chip"><strong>${t('vietnameseMeaning')}</strong>${trackOptions(track)[track.answerIndex]}</div>
    </div>

    <button class="primary-btn" style="margin-top:18px;${state.selected === null ? 'opacity:.52' : ''}" onclick="continuePractice()" ${state.selected === null ? 'disabled' : ''}>
      ${state.checked && progress === 10 ? t('viewReport') : state.checked ? t('nextQuestion') : t('check')}
    </button>
  `);
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
  const lesson = currentLesson();
  const track = lesson.tracks[state.index];

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

  if (state.index >= lesson.tracks.length - 1) {
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
  const lesson = currentLesson();
  const track = lesson.tracks[state.index];
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
        <button class="pill-btn" onclick="go('lessons')">${t('explore')}</button>
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
  const total = lesson.tracks.length || 10;
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
      ${resultAction('next', nextLessonTitle, textOf(currentSection(), 'title'), "go('lessons')")}
    </div>

    <button class="primary-btn result-cta" onclick="go('practice')">${continueLearning}</button>
    ${nav('file')}
  `);
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

init().catch(() => {
  mount(`<div class="empty-state">${t('loadError')}</div>`);
});
