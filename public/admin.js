const apiBase = '/api/listening';

const state = {
  topics: [],
  topicId: null,
  levelId: null,
  sectionId: null,
  lessonId: null,
  dayId: null,
  questionId: null,
  createQuestionType: 'image',
  toast: '',
  loadingAction: '',
  locale: 'vi',
  showTopicMetricsList: false,
  multiAudioActiveIndex: 0,
  previewAudioElement: null,
  previewAudioTrackKey: '',
};

const icons = {
  plus: 'plus',
  save: 'save',
  trash: 'trash-2',
  refresh: 'refresh-cw',
  book: 'book-open-text',
  route: 'route',
  file: 'file-question',
  list: 'list-checks',
};

const $admin = document.querySelector('#admin');

const translations = {
  vi: {
    adminTitle: 'Admin V0',
    adminSubtitle: 'Quản trị nội dung nghe tiếng Trung',
    desktop: 'Desktop',
    topic: 'Chủ đề',
    topics: 'Chủ đề',
    route: 'Lộ trình',
    routes: 'Lộ trình',
    lessonSet: 'Bộ đề',
    lessonSets: 'Bộ đề',
    question: 'Câu hỏi',
    questions: 'Câu hỏi',
    createQuestion: 'Tạo câu hỏi',
    questionType: 'Loại câu hỏi',
    imageQuestion: 'Câu hỏi hình ảnh',
    trueFalseQuestion: 'Câu hỏi đúng sai',
    imageQuestionHint: 'Nghe audio rồi chọn 1 trong 4 ảnh A/B/C/D.',
    trueFalseQuestionHint: 'Nghe audio rồi chọn Đúng hoặc Sai.',
    reload: 'Tải lại',
    emptyTopics: 'Chưa có chủ đề',
    noTopicSelected: 'Chưa chọn chủ đề',
    createTopicHint: 'Tạo chủ đề mới để bắt đầu quản lý nội dung.',
    viewMobile: 'Xem app mobile',
    saveTopic: 'Lưu chủ đề',
    deleteTopic: 'Xóa chủ đề',
    topicAndRoute: 'Chủ đề & lộ trình',
    lessonSetsInRoute: 'Bộ đề trong lộ trình',
    questionBank: 'Bộ câu hỏi',
    saveLessonSet: 'Lưu bộ đề',
    emptyRoutes: 'Chưa có lộ trình',
    emptyLessonSets: 'Chưa có bộ đề',
    emptyQuestions: 'Chưa có câu hỏi',
    hasAudio: 'có audio',
    audio: 'audio',
    sentences: 'câu',
    topicName: 'Tên chủ đề',
    subtitle: 'Phụ đề',
    icon: 'Icon',
    description: 'Mô tả',
    chooseOrCreateTopic: 'Chọn hoặc tạo chủ đề',
    chooseOrCreateRoute: 'Chọn hoặc tạo lộ trình',
    routeName: 'Tên lộ trình',
    saveRoute: 'Lưu lộ trình',
    chooseOrCreateLessonSet: 'Chọn hoặc tạo bộ đề',
    lessonSetName: 'Tên bộ đề',
    level: 'Cấp độ',
    goal: 'Mục tiêu',
    chooseOrCreateQuestion: 'Chọn hoặc tạo câu hỏi để chỉnh sửa',
    questionName: 'Tên câu',
    questionMode: 'Dạng câu hỏi',
    chineseContent: 'Nội dung tiếng Trung',
    keyword: 'Từ khóa',
    correctAnswer: 'Đáp án đúng (1-4)',
    visiblePrompt: 'Câu hỏi hiển thị',
    vietnameseMeaning: 'Nghĩa tiếng Việt',
    options: 'Các lựa chọn, mỗi dòng một đáp án',
    questionAudio: 'Audio câu hỏi',
    optionImages: 'Ảnh đáp án A/B/C/D',
    chooseImageFirst: 'Chọn file ảnh trước',
    uploadImage: 'Tải ảnh',
    uploadedImage: 'Đã tải ảnh',
    uploadImageFailed: 'Tải ảnh không thành công',
    noAudio: 'Chưa tải audio. Hỗ trợ mp3, wav, m4a, webm, ogg, aac. Tối đa 50MB.',
    saveQuestion: 'Lưu câu hỏi',
    uploadAudio: 'Tải audio',
    deleteQuestion: 'Xóa câu hỏi',
    saved: 'Đã lưu thay đổi',
    newTopic: 'Chủ đề mới',
    listeningRoute: 'Lộ trình nghe',
    confirmDeleteTopic: 'Xóa chủ đề này và toàn bộ lộ trình/bộ đề/câu hỏi?',
    newRoute: 'Lộ trình mới',
    confirmDeleteRoute: 'Xóa lộ trình này?',
    newLessonSet: 'Bộ đề mới',
    listeningPractice: 'Luyện nghe',
    confirmDeleteLessonSet: 'Xóa bộ đề này?',
    numberedQuestion: 'Câu',
    chooseAudioFirst: 'Chọn file audio trước',
    staleUploadRoute: 'Server chưa nạp route upload. Hãy build và restart lại backend.',
    uploadFailed: 'Tải audio không thành công',
    uploadedAudio: 'Đã tải audio',
    confirmDeleteQuestion: 'Xóa câu hỏi này?',
    reloaded: 'Đã tải lại dữ liệu',
    adminLoadError: 'Không tải được trang admin',
  },
  zh: {
    adminTitle: '管理后台 V0',
    adminSubtitle: '管理中文听力内容',
    desktop: '桌面端',
    topic: '主题',
    topics: '主题',
    route: '学习路线',
    routes: '学习路线',
    lessonSet: '题组',
    lessonSets: '题组',
    question: '题目',
    questions: '题目',
    createQuestion: '创建题目',
    questionType: '题目类型',
    imageQuestion: '图片题',
    trueFalseQuestion: '判断题',
    imageQuestionHint: '听音频后从 A/B/C/D 四张图中选择。',
    trueFalseQuestionHint: '听音频后选择对或错。',
    reload: '重新加载',
    emptyTopics: '暂无主题',
    noTopicSelected: '未选择主题',
    createTopicHint: '创建新主题开始管理内容。',
    viewMobile: '查看移动端',
    saveTopic: '保存主题',
    deleteTopic: '删除主题',
    topicAndRoute: '主题与路线',
    lessonSetsInRoute: '路线中的题组',
    questionBank: '题库',
    saveLessonSet: '保存题组',
    emptyRoutes: '暂无路线',
    emptyLessonSets: '暂无题组',
    emptyQuestions: '暂无题目',
    hasAudio: '已有音频',
    audio: '音频',
    sentences: '题',
    topicName: '主题名称',
    subtitle: '副标题',
    icon: '图标',
    description: '描述',
    chooseOrCreateTopic: '选择或创建主题',
    chooseOrCreateRoute: '选择或创建路线',
    routeName: '路线名称',
    saveRoute: '保存路线',
    chooseOrCreateLessonSet: '选择或创建题组',
    lessonSetName: '题组名称',
    level: '等级',
    goal: '目标',
    chooseOrCreateQuestion: '选择或创建题目进行编辑',
    questionName: '题目名称',
    questionMode: '题型',
    chineseContent: '中文内容',
    keyword: '关键词',
    correctAnswer: '正确答案 (1-4)',
    visiblePrompt: '显示问题',
    vietnameseMeaning: '越南语意思',
    options: '选项，每行一个答案',
    questionAudio: '题目音频',
    optionImages: 'A/B/C/D 答案图片',
    chooseImageFirst: '请先选择图片文件',
    uploadImage: '上传图片',
    uploadedImage: '图片已上传',
    uploadImageFailed: '上传图片失败',
    noAudio: '尚未上传音频。支持 mp3、wav、m4a、webm、ogg、aac，最大 50MB。',
    saveQuestion: '保存题目',
    uploadAudio: '上传音频',
    deleteQuestion: '删除题目',
    saved: '更改已保存',
    newTopic: '新主题',
    listeningRoute: '听力路线',
    confirmDeleteTopic: '删除这个主题以及所有路线、题组和题目？',
    newRoute: '新路线',
    confirmDeleteRoute: '删除这条路线？',
    newLessonSet: '新题组',
    listeningPractice: '听力练习',
    confirmDeleteLessonSet: '删除这个题组？',
    numberedQuestion: '题',
    chooseAudioFirst: '请先选择音频文件',
    staleUploadRoute: '服务器尚未加载上传路由。请重新 build 并重启后端。',
    uploadFailed: '上传音频失败',
    uploadedAudio: '音频已上传',
    confirmDeleteQuestion: '删除这道题目？',
    reloaded: '数据已重新加载',
    adminLoadError: '无法加载管理页面',
  },
};

function t(key) {
  return translations[state.locale][key] || translations.vi[key] || key;
}

function languageToggle() {
  return `
    <button class="language-toggle" onclick="toggleAdminLanguage()" aria-label="Switch language">
      <span class="${state.locale === 'vi' ? 'active' : ''}">VI</span>
      <span class="${state.locale === 'zh' ? 'active' : ''}">中</span>
    </button>
  `;
}

function toggleAdminLanguage() {
  state.locale = state.locale === 'vi' ? 'zh' : 'vi';
  render();
}

async function init() {
  await loadTopics();
  render();
}

async function loadTopics() {
  state.topics = await request('/topics');
  if (!state.topicId || !topic()) {
    state.topicId = state.topics[0]?.id || null;
  }
  if (!state.levelId || !level()) {
    state.levelId = levelsOf(topic())[0]?.id || null;
  }
  if (!state.sectionId || !section()) {
    state.sectionId = sectionsOf(level())[0]?.id || null;
  }
  state.lessonId = lessonsOf(section())[0]?.id || null;
  if (!state.dayId || !day()) {
    state.dayId = daysOf(lesson())[0]?.id || null;
  }
  if (!state.questionId || !question()) {
    state.questionId = tracksOfDay(day())[0]?.id || null;
  }
}

function topic() {
  return state.topics.find((item) => item.id === state.topicId);
}

function levelsOf(item) {
  if (Array.isArray(item?.levels) && item.levels.length) {
    return item.levels;
  }
  return [
    {
      id: `${item?.id || 'topic'}-default-level`,
      title: item?.id === 'hsk' ? 'HSK3' : 'Cơ bản',
      description: item?.subtitle || '',
      sections: arrayOf(item?.sections),
    },
  ];
}

function arrayOf(value) {
  return Array.isArray(value) ? value : [];
}

function sectionsOf(item) {
  return arrayOf(item?.sections);
}

function lessonsOf(item) {
  return arrayOf(item?.lessons);
}

function tracksOfDay(item) {
  return arrayOf(item?.tracks);
}

function tracksOfLesson(item) {
  return daysOf(item).flatMap((currentDay) => tracksOfDay(currentDay));
}

function optionImagesOf(item) {
  const images = arrayOf(item?.optionImages);
  return Array.from({ length: optionCountOf(item) }, (_, index) => images[index] || '');
}

function optionCountOf(item) {
  if (item?.questionType === 'multiAudio') return 5;
  if (item?.questionType === 'shortConversation') return 3;
  return 4;
}

function isImageChoiceQuestion(item) {
  return ['image', 'multiAudio'].includes(item?.questionType || '');
}

function isShortConversationQuestion(item) {
  return item?.questionType === 'shortConversation';
}

function audioItemsOf(item) {
  const items = arrayOf(item?.audioItems)
    .map((audio) => ({
      url: audio?.url || '',
      fileName: audio?.fileName || '',
      answerIndex: Number.isFinite(Number(audio?.answerIndex)) ? Number(audio.answerIndex) : Number(item?.answerIndex || 0),
    }))
    .filter((audio) => audio.url);
  return items.slice(0, 5);
}

function level() {
  return levelsOf(topic()).find((item) => item.id === state.levelId) || levelsOf(topic())[0];
}

function section() {
  return sectionsOf(level()).find((item) => item.id === state.sectionId);
}

function lesson() {
  return lessonsOf(section()).find((item) => item.id === state.lessonId);
}

function daysOf(item) {
  if (!item) {
    return [];
  }
  if (Array.isArray(item?.days) && item.days.length) {
    return item.days;
  }
  return [
    {
      id: `${item?.id || 'lesson'}-day-1`,
      title: 'Ngày 1',
      description: item?.description || '',
      tracks: arrayOf(item?.tracks),
    },
  ];
}

function day() {
  return daysOf(lesson()).find((item) => item.id === state.dayId) || daysOf(lesson())[0];
}

function question() {
  return tracksOfDay(day()).find((item) => item.id === state.questionId);
}

function icon(name, size = 16) {
  return `<i data-lucide="${icons[name] || name}" style="width:${size}px;height:${size}px"></i>`;
}

function mount(html) {
  $admin.innerHTML = html;
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function render() {
  const currentTopic = topic();
  const currentLevel = level();
  const currentSection = section();
  const currentLesson = lesson();

  mount(`
    <aside class="sidebar">
      <div class="brand">
        <div>
          <h1>Admin V0</h1>
          <p class="muted">Quản trị nội dung nghe tiếng Trung</p>
        </div>
        <span class="pill">桌面</span>
      </div>
      <div class="actions" style="margin-bottom:14px">
        <button class="btn primary" onclick="createTopic()">${icon('plus')} Chủ đề</button>
        <button class="btn ghost" onclick="refreshData()">${icon('refresh')} Tải lại</button>
      </div>
      <div class="topic-list">
        ${state.topics.map(topicButton).join('') || '<div class="empty">Chưa có chủ đề</div>'}
      </div>
    </aside>

    <section class="main">
      <div class="topbar">
        <div>
          <h2>${currentTopic?.title || 'Chưa chọn chủ đề'}</h2>
          <p class="muted">${currentTopic?.description || 'Tạo chủ đề mới để bắt đầu quản lý nội dung.'}</p>
        </div>
        <div class="actions">
          <a class="btn ghost" href="/" target="_blank">${icon('book')} Xem app mobile</a>
          <button class="btn primary" onclick="saveTopic()">${icon('save')} Lưu chủ đề</button>
          <button class="btn danger" onclick="deleteTopic()">${icon('trash')} Xóa chủ đề</button>
        </div>
      </div>

      ${metrics()}

      <div class="workspace">
        <section class="panel">
          <div class="panel-head">
            <h3>Chủ đề & lộ trình</h3>
            <button class="btn" onclick="createSection()">${icon('plus')} Lộ trình</button>
          </div>
          <div class="panel-body">
            ${topicForm(currentTopic)}
            <div class="stack" style="margin-top:14px">
              ${currentTopic?.sections.map(sectionButton).join('') || '<div class="empty">Chưa có lộ trình</div>'}
            </div>
          </div>
        </section>

        <section class="panel">
          <div class="panel-head">
            <h3>Bộ đề trong lộ trình</h3>
            <button class="btn" onclick="createLesson()">${icon('plus')} Bộ đề</button>
          </div>
          <div class="panel-body">
            ${sectionForm(currentSection)}
            <div class="stack" style="margin-top:14px">
              ${currentSection?.lessons.map(lessonButton).join('') || '<div class="empty">Chưa có bộ đề</div>'}
            </div>
          </div>
        </section>

        <section class="panel">
          <div class="panel-head">
            <h3>Bộ câu hỏi</h3>
            <div class="actions">
              <button class="btn" onclick="createQuestion()">${icon('plus')} Câu hỏi</button>
              <button class="btn primary" onclick="saveLesson()">${icon('save')} Lưu bộ đề</button>
              <button class="btn danger" onclick="deleteLesson()">${icon('trash')}</button>
            </div>
          </div>
          <div class="panel-body">
            ${lessonForm(currentLesson)}
            <div class="question-editor">
              <div class="question-list stack">
                ${currentLesson?.tracks.map(questionButton).join('') || '<div class="empty">Chưa có câu hỏi</div>'}
              </div>
              ${questionForm(question())}
            </div>
          </div>
        </section>
      </div>
    </section>
    ${state.toast ? `<div class="toast">${state.toast}</div>` : ''}
  `);
}

function topicButton(item) {
  return `
    <button class="topic-item ${item.id === state.topicId ? 'active' : ''}" onclick="selectTopic('${item.id}')">
      <span><strong>${item.title}</strong><span class="muted">${item.sections.length} lộ trình</span></span>
      <span class="pill">${item.icon}</span>
    </button>
  `;
}

function sectionButton(item) {
  return `
    <button class="row-item ${item.id === state.sectionId ? 'active' : ''}" onclick="selectSection('${item.id}')">
      <span><strong>${item.title}</strong><span class="muted">${item.lessons.length} bộ đề</span></span>
      <span class="pill">${item.icon}</span>
    </button>
  `;
}

function lessonButton(item) {
  return `
    <button class="row-item ${item.id === state.lessonId ? 'active' : ''}" onclick="selectLesson('${item.id}')">
      <span><strong>${item.title}</strong><span class="muted">${item.level} · ${item.tracks.length} câu</span></span>
      <span class="pill">${item.tracks.length}</span>
    </button>
  `;
}

function lessonButton(item) {
  const tracks = tracksOfLesson(item);
  return `
    <div class="row-item sortable-row ${item.id === state.lessonId ? 'active' : ''}">
      <button type="button" class="row-main" onclick="selectLesson('${item.id}')">
        <span><strong>${item.title}</strong><span class="muted">${item.level} - ${tracks.length} ${t('sentences')}</span></span>
        <span class="pill">${tracks.length}</span>
      </button>
      <div class="sort-actions">
        <button type="button" class="icon-btn ${isLoading(`move-lesson-${item.id}-up`) ? 'loading' : ''}" onclick="moveLesson('${item.id}', 'up')" ${loadingAttrs(`move-lesson-${item.id}-up`)} title="Đưa lên">${loadingIcon(`move-lesson-${item.id}-up`, 'arrow-up')}</button>
        <button type="button" class="icon-btn ${isLoading(`move-lesson-${item.id}-down`) ? 'loading' : ''}" onclick="moveLesson('${item.id}', 'down')" ${loadingAttrs(`move-lesson-${item.id}-down`)} title="Đưa xuống">${loadingIcon(`move-lesson-${item.id}-down`, 'arrow-down')}</button>
      </div>
    </div>
  `;
}

function lessonButton(item) {
  const tracks = tracksOfLesson(item);
  return `
    <div class="row-item sortable-row ${item.id === state.lessonId ? 'active' : ''}">
      <button type="button" class="row-main" onclick="selectLesson('${item.id}')">
        <span><strong>${item.title}</strong><span class="muted">${item.level} - ${tracks.length} ${t('sentences')}</span></span>
        <span class="pill">${tracks.length}</span>
      </button>
      <div class="sort-actions">
        <button type="button" class="icon-btn ${isLoading(`move-lesson-${item.id}-up`) ? 'loading' : ''}" onclick="moveLesson('${item.id}', 'up')" ${loadingAttrs(`move-lesson-${item.id}-up`)} title="Đưa lên">${loadingIcon(`move-lesson-${item.id}-up`, 'arrow-up')}</button>
        <button type="button" class="icon-btn ${isLoading(`move-lesson-${item.id}-down`) ? 'loading' : ''}" onclick="moveLesson('${item.id}', 'down')" ${loadingAttrs(`move-lesson-${item.id}-down`)} title="Đưa xuống">${loadingIcon(`move-lesson-${item.id}-down`, 'arrow-down')}</button>
      </div>
    </div>
  `;
}

function questionButton(item, index) {
  return `
    <button class="row-item ${item.id === state.questionId ? 'active' : ''}" onclick="selectQuestion('${item.id}')">
      <span><strong>${index + 1}. ${item.title}</strong><span class="muted">${item.mode} · ${item.keyword}${item.audioUrl ? ' · có audio' : ''}</span></span>
      <span class="pill">${item.audioUrl ? 'audio' : item.answerIndex + 1}</span>
    </button>
  `;
}

function metrics() {
  const topics = state.topics.length;
  const sections = state.topics.flatMap((item) => item.sections).length;
  const lessons = state.topics.flatMap((item) => item.sections).flatMap((item) => item.lessons).length;
  const questions = state.topics
    .flatMap((item) => item.sections)
    .flatMap((item) => item.lessons)
    .flatMap((item) => item.tracks).length;

  return `
    <div class="metric-grid">
      <div class="metric"><span>Chủ đề</span><strong>${topics}</strong></div>
      <div class="metric"><span>Lộ trình</span><strong>${sections}</strong></div>
      <div class="metric"><span>Bộ đề</span><strong>${lessons}</strong></div>
      <div class="metric"><span>Câu hỏi</span><strong>${questions}</strong></div>
    </div>
  `;
}

function topicForm(item) {
  if (!item) return '<div class="empty">Chọn hoặc tạo chủ đề</div>';
  return `
    <form id="topic-form" class="form-grid single">
      ${input('topic-title', 'Tên chủ đề', item.title)}
      ${input('topic-subtitle', 'Phụ đề', item.subtitle)}
      ${input('topic-icon', 'Icon', item.icon)}
      ${textarea('topic-description', 'Mô tả', item.description)}
    </form>
  `;
}

function sectionForm(item) {
  if (!item) return '<div class="empty">Chọn hoặc tạo lộ trình</div>';
  return `
    <form id="section-form" class="form-grid single">
      ${input('section-title', 'Tên lộ trình', item.title)}
      ${input('section-icon', 'Icon', item.icon)}
      ${textarea('section-description', 'Mô tả', item.description)}
      <div class="form-actions">
        <button type="button" class="btn primary" onclick="saveSection()">${icon('save')} Lưu lộ trình</button>
        <button type="button" class="btn danger" onclick="deleteSection()">${icon('trash')}</button>
      </div>
    </form>
  `;
}

function lessonForm(item) {
  if (!item) return '<div class="empty">Chọn hoặc tạo bộ đề</div>';
  return `
    <form id="lesson-form" class="form-grid">
      ${input('lesson-title', 'Tên bộ đề', item.title)}
      ${input('lesson-level', 'Cấp độ', item.level)}
      ${input('lesson-goal', 'Mục tiêu', item.goal)}
      ${textarea('lesson-description', 'Mô tả', item.description)}
    </form>
  `;
}

function questionForm(item) {
  if (!item) return '<div class="empty">Chọn hoặc tạo câu hỏi để chỉnh sửa</div>';
  return `
    <form id="question-form" class="form-grid">
      ${input('q-title', 'Tên câu', item.title)}
      ${input('q-mode', 'Dạng câu hỏi', item.mode)}
      ${input('q-text', 'Nội dung tiếng Trung', item.text)}
      ${input('q-pinyin', 'Pinyin', item.pinyin)}
      ${input('q-keyword', 'Từ khóa', item.keyword)}
      ${input('q-answer', 'Đáp án đúng (1-4)', String(item.answerIndex + 1), 'number')}
      ${textarea('q-prompt', 'Câu hỏi hiển thị', item.prompt)}
      ${textarea('q-vietnamese', 'Nghĩa tiếng Việt', item.vietnamese)}
      ${textarea('q-options', 'Các lựa chọn, mỗi dòng một đáp án', item.options.join('\n'))}
      <label style="grid-column:1 / -1">Audio câu hỏi
        <input id="q-audio" type="file" accept="audio/*" />
      </label>
      <div style="grid-column:1 / -1">
        ${
          item.audioUrl
            ? `<audio controls src="${item.audioUrl}" style="width:100%;height:38px"></audio><p class="muted" style="margin:6px 0 0">${item.audioFileName || item.audioUrl}</p>`
            : '<p class="muted" style="margin:0">Chưa tải audio. Hỗ trợ mp3, wav, m4a, webm, ogg, aac. Tối đa 50MB.</p>'
        }
      </div>
      <div class="form-actions" style="grid-column:1 / -1">
        <button type="button" class="btn primary" onclick="saveQuestion()">${icon('save')} Lưu câu hỏi</button>
        <button type="button" class="btn" onclick="uploadQuestionAudio()">${icon('save')} Tải audio</button>
        <button type="button" class="btn danger" onclick="deleteQuestion()">${icon('trash')} Xóa câu hỏi</button>
      </div>
    </form>
  `;
}

function input(id, label, value, type = 'text') {
  return `<label>${label}<input id="${id}" type="${type}" value="${escapeAttr(value)}" /></label>`;
}

function textarea(id, label, value) {
  return `<label>${label}<textarea id="${id}">${escapeHtml(value)}</textarea></label>`;
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function escapeAttr(value = '') {
  return escapeHtml(value);
}

async function request(path, options = {}) {
  const response = await fetch(`${apiBase}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
}

async function mutate(path, method, body) {
  const data = await request(path, { method, body: JSON.stringify(body) });
  await loadTopics();
  showToast('Đã lưu thay đổi');
  return data;
}

function selectTopic(id) {
  state.topicId = id;
  state.levelId = levelsOf(topic())[0]?.id || null;
  state.sectionId = sectionsOf(level())[0]?.id || null;
  state.lessonId = lessonsOf(section())[0]?.id || null;
  state.dayId = daysOf(lesson())[0]?.id || null;
  state.questionId = tracksOfDay(day())[0]?.id || null;
  render();
}

function selectLevel(id) {
  state.levelId = id;
  state.sectionId = sectionsOf(level())[0]?.id || null;
  state.lessonId = lessonsOf(section())[0]?.id || null;
  state.dayId = daysOf(lesson())[0]?.id || null;
  state.questionId = tracksOfDay(day())[0]?.id || null;
  render();
}

function selectSection(id) {
  state.sectionId = id;
  state.lessonId = lessonsOf(section())[0]?.id || null;
  state.dayId = daysOf(lesson())[0]?.id || null;
  state.questionId = tracksOfDay(day())[0]?.id || null;
  render();
}

function selectLesson(id) {
  state.lessonId = id;
  state.dayId = daysOf(lesson())[0]?.id || null;
  state.questionId = tracksOfDay(day())[0]?.id || null;
  render();
}

function selectDay(id) {
  state.dayId = id;
  state.questionId = tracksOfDay(day())[0]?.id || null;
  render();
}

function selectQuestion(id) {
  state.questionId = id;
  render();
}

async function createTopic() {
  const created = await mutate('/topics', 'POST', { title: 'Chủ đề mới', subtitle: 'Lộ trình nghe', icon: 'book' });
  state.topicId = created.id;
  state.sectionId = null;
  state.lessonId = null;
  state.questionId = null;
  await loadTopics();
  render();
}

async function saveTopic() {
  if (!topic()) return;
  await mutate(`/topics/${state.topicId}`, 'PATCH', {
    title: value('topic-title'),
    subtitle: value('topic-subtitle'),
    icon: value('topic-icon'),
    description: value('topic-description'),
  });
  render();
}

async function deleteTopic() {
  if (!topic() || !confirm('Xóa chủ đề này và toàn bộ lộ trình/bộ đề/câu hỏi?')) return;
  await mutate(`/topics/${state.topicId}`, 'DELETE');
  state.topicId = state.topics[0]?.id || null;
  await loadTopics();
  render();
}

async function createSection() {
  if (!topic()) return;
  const created = await mutate(`/topics/${state.topicId}/sections`, 'POST', { title: 'Lộ trình mới', icon: 'book' });
  state.sectionId = created.id;
  state.lessonId = null;
  state.questionId = null;
  await loadTopics();
  render();
}

async function saveSection() {
  if (!section()) return;
  await mutate(`/topics/${state.topicId}/sections/${state.sectionId}`, 'PATCH', {
    title: value('section-title'),
    icon: value('section-icon'),
    description: value('section-description'),
  });
  render();
}

async function deleteSection() {
  if (!section() || !confirm('Xóa lộ trình này?')) return;
  await mutate(`/topics/${state.topicId}/sections/${state.sectionId}`, 'DELETE');
  state.sectionId = level()?.sections[0]?.id || null;
  await loadTopics();
  render();
}

async function createLesson() {
  if (!section()) return;
  const created = await mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons`, 'POST', {
    title: 'Bộ đề mới',
    level: 'HSK3',
    goal: 'Luyện nghe',
  });
  state.lessonId = created.id;
  state.questionId = null;
  await loadTopics();
  render();
}

async function saveLesson() {
  if (!lesson()) return;
  await mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}`, 'PATCH', {
    title: value('lesson-title'),
    level: value('lesson-level'),
    goal: value('lesson-goal'),
    description: value('lesson-description'),
  });
  render();
}

async function deleteLesson() {
  if (!lesson() || !confirm('Xóa bộ đề này?')) return;
  await mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}`, 'DELETE');
  state.lessonId = section()?.lessons[0]?.id || null;
  await loadTopics();
  render();
}

async function createQuestion() {
  if (!lesson()) return;
  const created = await mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/questions`, 'POST', {
    title: `Câu ${lesson().tracks.length + 1}`,
  });
  state.questionId = created.id;
  await loadTopics();
  render();
}

async function saveQuestion() {
  if (!question()) return;
  const options = value('q-options')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
  await mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/questions/${state.questionId}`, 'PATCH', {
    title: value('q-title'),
    mode: value('q-mode'),
    text: value('q-text'),
    pinyin: value('q-pinyin'),
    keyword: value('q-keyword'),
    answerIndex: Math.max(0, Number(value('q-answer')) - 1),
    prompt: value('q-prompt'),
    vietnamese: value('q-vietnamese'),
    options,
  });
  render();
}

async function uploadQuestionAudio() {
  if (!question()) return;
  const input = document.getElementById('q-audio');
  const file = input?.files?.[0];
  if (!file) {
    showToast('Chọn file audio trước');
    render();
    return;
  }

  const formData = new FormData();
  formData.append('audio', file);
  const response = await fetch(
    `${apiBase}/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/questions/${state.questionId}/audio`,
    {
      method: 'POST',
      body: formData,
    },
  );
  if (!response.ok) {
    const errorText = await response.text();
    if (response.status === 404) {
      showToast('Server chua nap route upload. Hay build va restart lai backend.');
      throw new Error('Server chua nap route upload audio. Chay npm.cmd run build roi restart server.');
    }
    showToast('Tai audio khong thanh cong');
    throw new Error(errorText);
  }
  await loadTopics();
  showToast('Đã tải audio');
  render();
}

async function deleteQuestion() {
  if (!question() || !confirm('Xóa câu hỏi này?')) return;
  await mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/questions/${state.questionId}`, 'DELETE');
  state.questionId = lesson()?.tracks[0]?.id || null;
  await loadTopics();
  render();
}

async function refreshData() {
  await loadTopics();
  showToast('Đã tải lại dữ liệu');
  render();
}

function value(id) {
  return document.getElementById(id)?.value || '';
}

function showToast(message) {
  state.toast = message;
  window.setTimeout(() => {
    state.toast = '';
    render();
  }, 1600);
}

function isLoading(action) {
  return state.loadingAction === action;
}

function loadingIcon(action, fallbackIcon = 'save') {
  return icon(isLoading(action) ? 'refresh' : fallbackIcon);
}

function loadingAttrs(action) {
  return isLoading(action) ? 'disabled aria-busy="true"' : '';
}

async function withLoading(action, task) {
  state.loadingAction = action;
  render();
  try {
    return await task();
  } finally {
    state.loadingAction = '';
    render();
  }
}

function render() {
  const currentTopic = topic();
  const currentLevel = level();
  const currentSection = section();
  const currentLesson = lesson();

  mount(`
    <aside class="sidebar">
      <div class="brand">
        <div>
          <h1>${t('adminTitle')}</h1>
          <p class="muted">${t('adminSubtitle')}</p>
        </div>
        ${languageToggle()}
      </div>
      <div class="actions" style="margin-bottom:14px">
        <button class="btn primary ${isLoading('create-topic') ? 'loading' : ''}" onclick="createTopic()" ${loadingAttrs('create-topic')}>${loadingIcon('create-topic', 'plus')} ${t('topic')}</button>
        <button class="btn ghost ${isLoading('refresh') ? 'loading' : ''}" onclick="refreshData()" ${loadingAttrs('refresh')}>${loadingIcon('refresh', 'refresh')} ${t('reload')}</button>
      </div>
      <div class="topic-list">
        ${state.topics.map(topicButton).join('') || `<div class="empty">${t('emptyTopics')}</div>`}
      </div>
    </aside>

    <section class="main">
      <div class="topbar">
        <div>
          <h2>${currentTopic?.title || t('noTopicSelected')}</h2>
          <p class="muted">${currentTopic?.description || t('createTopicHint')}</p>
        </div>
        <div class="actions">
          <a class="btn ghost" href="/" target="_blank">${icon('book')} ${t('viewMobile')}</a>
          <button class="btn primary ${isLoading('save-topic') ? 'loading' : ''}" onclick="saveTopic()" ${loadingAttrs('save-topic')}>${loadingIcon('save-topic', 'save')} ${t('saveTopic')}</button>
          <button class="btn danger ${isLoading('delete-topic') ? 'loading' : ''}" onclick="deleteTopic()" ${loadingAttrs('delete-topic')}>${loadingIcon('delete-topic', 'trash')} ${t('deleteTopic')}</button>
        </div>
      </div>
      ${metrics()}
      <div class="workspace">
        <section class="panel">
          <div class="panel-head">
            <h3>${t('topicAndRoute')}</h3>
            <div class="actions">
              <button class="btn ${isLoading('create-level') ? 'loading' : ''}" onclick="createLevel()" ${loadingAttrs('create-level')} ${currentTopic ? '' : 'disabled'}>${loadingIcon('create-level', 'plus')} Cấp độ</button>
              <button class="btn ${isLoading('create-section') ? 'loading' : ''}" onclick="createSection()" ${loadingAttrs('create-section')} ${currentLevel ? '' : 'disabled'}>${loadingIcon('create-section', 'plus')} ${t('route')}</button>
            </div>
          </div>
          <div class="panel-body">
            ${topicForm(currentTopic)}
            <p class="section-title">Cấp độ</p>
            <div class="stack">
              ${levelsOf(currentTopic).map(levelButton).join('') || '<div class="empty">Chưa có cấp độ</div>'}
            </div>
            ${levelForm(currentLevel)}
            <p class="section-title">${t('routes')}</p>
            <div class="stack" style="margin-top:14px">
              ${currentLevel?.sections.map(sectionButton).join('') || `<div class="empty">${t('emptyRoutes')}</div>`}
            </div>
          </div>
        </section>
        <section class="panel">
          <div class="panel-head">
            <h3>${t('lessonSetsInRoute')}</h3>
            <button class="btn ${isLoading('create-lesson') ? 'loading' : ''}" onclick="createLesson()" ${loadingAttrs('create-lesson')} ${currentSection ? '' : 'disabled'}>${loadingIcon('create-lesson', 'plus')} ${t('lessonSet')}</button>
          </div>
          <div class="panel-body">
            ${sectionForm(currentSection)}
            <div class="stack" style="margin-top:14px">
              ${currentSection?.lessons.map(lessonButton).join('') || `<div class="empty">${t('emptyLessonSets')}</div>`}
            </div>
          </div>
        </section>
        <section class="panel">
          <div class="panel-head">
            <h3>${t('questionBank')}</h3>
            <div class="actions">
              <button class="btn ${isLoading('create-question') ? 'loading' : ''}" onclick="createQuestion()" ${loadingAttrs('create-question')}>${loadingIcon('create-question', 'plus')} ${t('question')}</button>
              <button class="btn primary ${isLoading('save-lesson') ? 'loading' : ''}" onclick="saveLesson()" ${loadingAttrs('save-lesson')}>${loadingIcon('save-lesson', 'save')} ${t('saveLessonSet')}</button>
              <button class="btn danger ${isLoading('delete-lesson') ? 'loading' : ''}" onclick="deleteLesson()" ${loadingAttrs('delete-lesson')}>${loadingIcon('delete-lesson', 'trash')}</button>
            </div>
          </div>
          <div class="panel-body">
            ${lessonForm(currentLesson)}
            <div class="question-editor">
              <div class="question-list stack">
                ${currentLesson?.tracks.map(questionButton).join('') || `<div class="empty">${t('emptyQuestions')}</div>`}
              </div>
              ${questionForm(question())}
            </div>
          </div>
        </section>
      </div>
    </section>
    ${state.toast ? `<div class="toast">${state.toast}</div>` : ''}
  `);
}

function topicButton(item) {
  const routeCount = levelsOf(item).reduce((total, current) => total + sectionsOf(current).length, 0);
  return `
    <button class="topic-item ${item.id === state.topicId ? 'active' : ''}" onclick="selectTopic('${item.id}')">
      <span><strong>${item.title}</strong><span class="muted">${levelsOf(item).length} cấp độ · ${routeCount} ${t('routes')}</span></span>
      <span class="pill">${item.icon}</span>
    </button>
  `;
}

function levelButton(item) {
  const sections = sectionsOf(item);
  return `
    <div class="row-item sortable-row ${item.id === state.levelId ? 'active' : ''}">
      <button type="button" class="row-main" onclick="selectLevel('${item.id}')">
        <span><strong>${item.title}</strong><span class="muted">${sections.length} ${t('routes')}</span></span>
        <span class="pill">${sections.length}</span>
      </button>
      <div class="sort-actions">
        <button type="button" class="icon-btn ${isLoading(`move-level-${item.id}-up`) ? 'loading' : ''}" onclick="moveLevel('${item.id}', 'up')" ${loadingAttrs(`move-level-${item.id}-up`)} title="Đưa lên">${loadingIcon(`move-level-${item.id}-up`, 'arrow-up')}</button>
        <button type="button" class="icon-btn ${isLoading(`move-level-${item.id}-down`) ? 'loading' : ''}" onclick="moveLevel('${item.id}', 'down')" ${loadingAttrs(`move-level-${item.id}-down`)} title="Đưa xuống">${loadingIcon(`move-level-${item.id}-down`, 'arrow-down')}</button>
      </div>
    </div>
  `;
}

function sectionButton(item) {
  const lessons = lessonsOf(item);
  const days = lessons.flatMap((currentLesson) => daysOf(currentLesson));
  const questions = lessons.flatMap((currentLesson) => tracksOfLesson(currentLesson));
  return `
    <div class="row-item sortable-row ${item.id === state.sectionId ? 'active' : ''}">
      <button type="button" class="row-main" onclick="selectSection('${item.id}')">
        <span><strong>${item.title}</strong><span class="muted">${days.length} ngày · ${questions.length} ${t('questions')}</span></span>
        <span class="pill">${item.icon}</span>
      </button>
      <div class="sort-actions">
        <button type="button" class="icon-btn ${isLoading(`move-section-${item.id}-up`) ? 'loading' : ''}" onclick="moveSection('${item.id}', 'up')" ${loadingAttrs(`move-section-${item.id}-up`)} title="Đưa lên">${loadingIcon(`move-section-${item.id}-up`, 'arrow-up')}</button>
        <button type="button" class="icon-btn ${isLoading(`move-section-${item.id}-down`) ? 'loading' : ''}" onclick="moveSection('${item.id}', 'down')" ${loadingAttrs(`move-section-${item.id}-down`)} title="Đưa xuống">${loadingIcon(`move-section-${item.id}-down`, 'arrow-down')}</button>
      </div>
    </div>
  `;
}

function lessonButtonLegacy(item) {
  const tracks = tracksOfLesson(item);
  return `
    <button class="row-item ${item.id === state.lessonId ? 'active' : ''}" onclick="selectLesson('${item.id}')">
      <span><strong>${item.title}</strong><span class="muted">${item.level} · ${tracks.length} ${t('sentences')}</span></span>
      <span class="pill">${tracks.length}</span>
    </button>
  `;
}

function questionButton(item, index) {
  const typeLabel =
    item.questionType === 'image'
      ? t('imageQuestion')
      : item.questionType === 'multiAudio'
        ? 'Nhiều Audio'
        : item.questionType === 'shortConversation'
          ? 'Hội thoại ngắn'
          : t('trueFalseQuestion');
  return `
    <button class="row-item ${item.id === state.questionId ? 'active' : ''}" onclick="selectQuestion('${item.id}')">
      <span><strong>${index + 1}. ${item.title}</strong><span class="muted">${typeLabel} · ${item.mode} · ${item.keyword}${item.audioUrl ? ` · ${t('hasAudio')}` : ''}</span></span>
      <span class="pill">${item.audioUrl ? t('audio') : item.answerIndex + 1}</span>
    </button>
  `;
}

function metrics() {
  const topics = state.topics.length;
  const levels = state.topics.flatMap((item) => levelsOf(item));
  const sectionItems = levels.flatMap((item) => sectionsOf(item));
  const lessonItems = sectionItems.flatMap((item) => lessonsOf(item));
  const sections = sectionItems.length;
  const days = lessonItems.flatMap((item) => daysOf(item)).length;
  const questions = state.topics
    .flatMap((item) => levelsOf(item))
    .flatMap((item) => sectionsOf(item))
    .flatMap((item) => lessonsOf(item))
    .flatMap((item) => tracksOfLesson(item)).length;

  return `
    <div class="metric-grid">
      <div class="metric"><span>${t('topics')}</span><strong>${topics}</strong></div>
      <div class="metric"><span>Cấp độ</span><strong>${levels.length}</strong></div>
      <div class="metric"><span>${t('routes')}</span><strong>${sections}</strong></div>
      <div class="metric"><span>Ngày</span><strong>${days}</strong></div>
    </div>
  `;
}

function topicForm(item) {
  if (!item) return `<div class="empty">${t('chooseOrCreateTopic')}</div>`;
  return `
    <form id="topic-form" class="form-grid single">
      ${input('topic-title', t('topicName'), item.title)}
      ${input('topic-subtitle', t('subtitle'), item.subtitle)}
      ${input('topic-icon', t('icon'), item.icon)}
      ${textarea('topic-description', t('description'), item.description)}
    </form>
  `;
}

function levelForm(item) {
  if (!item) return '<div class="empty">Chọn hoặc tạo cấp độ</div>';
  return `
    <form id="level-form" class="form-grid single" style="margin-top:12px">
      ${input('level-title', 'Tên cấp độ', item.title)}
      ${textarea('level-description', 'Mô tả cấp độ', item.description)}
      <div class="form-actions">
        <button type="button" class="btn primary ${isLoading('save-level') ? 'loading' : ''}" onclick="saveLevel()" ${loadingAttrs('save-level')}>${loadingIcon('save-level', 'save')} Lưu cấp độ</button>
        <button type="button" class="btn danger ${isLoading('delete-level') ? 'loading' : ''}" onclick="deleteLevel()" ${loadingAttrs('delete-level')}>${loadingIcon('delete-level', 'trash')}</button>
      </div>
    </form>
  `;
}

function sectionForm(item) {
  if (!item) return `<div class="empty">${t('chooseOrCreateRoute')}</div>`;
  return `
    <form id="section-form" class="form-grid single">
      ${input('section-title', t('routeName'), item.title)}
      ${input('section-icon', t('icon'), item.icon)}
      ${textarea('section-description', t('description'), item.description)}
      <div class="form-actions">
        <button type="button" class="btn primary ${isLoading('save-section') ? 'loading' : ''}" onclick="saveSection()" ${loadingAttrs('save-section')}>${loadingIcon('save-section', 'save')} ${t('saveRoute')}</button>
        <button type="button" class="btn danger ${isLoading('delete-section') ? 'loading' : ''}" onclick="deleteSection()" ${loadingAttrs('delete-section')}>${loadingIcon('delete-section', 'trash')}</button>
      </div>
    </form>
  `;
}

function lessonForm(item) {
  if (!item) return `<div class="empty">${t('chooseOrCreateLessonSet')}</div>`;
  return `
    <form id="lesson-form" class="form-grid">
      ${input('lesson-title', t('lessonSetName'), item.title)}
      ${input('lesson-level', t('level'), item.level)}
      ${input('lesson-goal', t('goal'), item.goal)}
      ${textarea('lesson-description', t('description'), item.description)}
    </form>
  `;
}

function questionForm(item) {
  if (!item) return `<div class="empty">${t('chooseOrCreateQuestion')}</div>`;
  return `
    <form id="question-form" class="form-grid">
      ${input('q-title', t('questionName'), item.title)}
      ${input('q-mode', t('questionMode'), item.mode)}
      ${input('q-text', t('chineseContent'), item.text)}
      ${input('q-pinyin', 'Pinyin', item.pinyin)}
      ${input('q-keyword', t('keyword'), item.keyword)}
      ${questionType === 'multiAudio' ? `<input id="q-answer" type="hidden" value="${multiAudioAnswerIndex(item) + 1}" />` : input('q-answer', t('correctAnswer'), String(item.answerIndex + 1), 'number')}
      ${textarea('q-prompt', t('visiblePrompt'), item.prompt)}
      ${textarea('q-vietnamese', t('vietnameseMeaning'), item.vietnamese)}
      ${textarea('q-options', t('options'), item.options.join('\n'))}
      <label style="grid-column:1 / -1">${t('questionAudio')}
        <input id="q-audio" type="file" accept="audio/*" />
      </label>
      <div style="grid-column:1 / -1">
        ${
          item.audioUrl
            ? `<audio controls src="${item.audioUrl}" style="width:100%;height:38px"></audio><p class="muted" style="margin:6px 0 0">${item.audioFileName || item.audioUrl}</p>`
            : `<p class="muted" style="margin:0">${t('noAudio')}</p>`
        }
      </div>
      <div class="form-actions" style="grid-column:1 / -1">
        <button type="button" class="btn primary ${isLoading('save-question') ? 'loading' : ''}" onclick="saveQuestion()" ${loadingAttrs('save-question')}>${loadingIcon('save-question', 'save')} ${t('saveQuestion')}</button>
        <button type="button" class="btn ${isLoading('upload-audio') ? 'loading' : ''}" onclick="uploadQuestionAudio()" ${loadingAttrs('upload-audio')}>${loadingIcon('upload-audio', 'save')} ${t('uploadAudio')}</button>
        <button type="button" class="btn danger ${isLoading('delete-question') ? 'loading' : ''}" onclick="deleteQuestion()" ${loadingAttrs('delete-question')}>${loadingIcon('delete-question', 'trash')} ${t('deleteQuestion')}</button>
      </div>
    </form>
  `;
}

async function mutate(path, method, body) {
  const data = await request(path, { method, body: JSON.stringify(body) });
  await loadTopics();
  showToast(t('saved'));
  return data;
}

async function createTopic() {
  const created = await mutate('/topics', 'POST', { title: t('newTopic'), subtitle: t('listeningRoute'), icon: 'book' });
  state.topicId = created.id;
  state.sectionId = null;
  state.lessonId = null;
  state.questionId = null;
  await loadTopics();
  render();
}

async function deleteTopic() {
  if (!topic() || !confirm(t('confirmDeleteTopic'))) return;
  await mutate(`/topics/${state.topicId}`, 'DELETE');
  state.topicId = state.topics[0]?.id || null;
  await loadTopics();
  render();
}

async function createSection() {
  if (!topic()) return;
  const created = await mutate(`/topics/${state.topicId}/sections`, 'POST', { title: t('newRoute'), icon: 'book' });
  state.sectionId = created.id;
  state.lessonId = null;
  state.questionId = null;
  await loadTopics();
  render();
}

async function deleteSection() {
  if (!section() || !confirm(t('confirmDeleteRoute'))) return;
  await mutate(`/topics/${state.topicId}/sections/${state.sectionId}`, 'DELETE');
  state.sectionId = topic()?.sections[0]?.id || null;
  await loadTopics();
  render();
}

async function createLesson() {
  if (!section()) return;
  const created = await mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons`, 'POST', {
    title: t('newLessonSet'),
    level: 'HSK3',
    goal: t('listeningPractice'),
  });
  state.lessonId = created.id;
  state.questionId = null;
  await loadTopics();
  render();
}

async function deleteLesson() {
  if (!lesson() || !confirm(t('confirmDeleteLessonSet'))) return;
  await mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}`, 'DELETE');
  state.lessonId = section()?.lessons[0]?.id || null;
  await loadTopics();
  render();
}

async function createQuestion() {
  if (!lesson()) return;
  const created = await mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/questions`, 'POST', {
    title: `${t('numberedQuestion')} ${lesson().tracks.length + 1}`,
  });
  state.questionId = created.id;
  await loadTopics();
  render();
}

async function uploadQuestionAudio() {
  if (!question()) return;
  const input = document.getElementById('q-audio');
  const file = input?.files?.[0];
  if (!file) {
    showToast(t('chooseAudioFirst'));
    render();
    return;
  }

  const formData = new FormData();
  formData.append('audio', file);
  const response = await fetch(
    `${apiBase}/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/questions/${state.questionId}/audio`,
    {
      method: 'POST',
      body: formData,
    },
  );
  if (!response.ok) {
    const errorText = await response.text();
    if (response.status === 404) {
      showToast(t('staleUploadRoute'));
      throw new Error(t('staleUploadRoute'));
    }
    showToast(t('uploadFailed'));
    throw new Error(errorText);
  }
  await loadTopics();
  showToast(t('uploadedAudio'));
  render();
}

async function deleteQuestion() {
  if (!question() || !confirm(t('confirmDeleteQuestion'))) return;
  await mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/questions/${state.questionId}`, 'DELETE');
  state.questionId = lesson()?.tracks[0]?.id || null;
  await loadTopics();
  render();
}

async function refreshData() {
  await loadTopics();
  showToast(t('reloaded'));
  render();
}

async function createTopic() {
  return withLoading('create-topic', async () => {
    const created = await mutate('/topics', 'POST', { title: t('newTopic'), subtitle: t('listeningRoute'), icon: 'book' });
    state.topicId = created.id;
    state.levelId = levelsOf(created)[0]?.id || null;
    state.sectionId = sectionsOf(level())[0]?.id || null;
    state.lessonId = null;
    state.dayId = null;
    state.questionId = null;
    await loadTopics();
  });
}

async function saveTopic() {
  if (!topic()) return;
  const body = {
    title: value('topic-title'),
    subtitle: value('topic-subtitle'),
    icon: value('topic-icon'),
    description: value('topic-description'),
  };
  return withLoading('save-topic', () => mutate(`/topics/${state.topicId}`, 'PATCH', body));
}

async function deleteTopic() {
  if (!topic() || !confirm(t('confirmDeleteTopic'))) return;
  return withLoading('delete-topic', async () => {
    await mutate(`/topics/${state.topicId}`, 'DELETE');
    state.topicId = state.topics[0]?.id || null;
    state.levelId = levelsOf(topic())[0]?.id || null;
    state.sectionId = sectionsOf(level())[0]?.id || null;
    state.lessonId = lessonsOf(section())[0]?.id || null;
    state.dayId = daysOf(lesson())[0]?.id || null;
    state.questionId = tracksOfDay(day())[0]?.id || null;
    await loadTopics();
  });
}

async function createLevel() {
  if (!topic()) return;
  return withLoading('create-level', async () => {
    const created = await mutate(`/topics/${state.topicId}/levels`, 'POST', {
      title: 'HSK mới',
      description: 'Cấp độ luyện nghe',
    });
    state.levelId = created.id;
    state.sectionId = null;
    state.lessonId = null;
    state.questionId = null;
    await loadTopics();
  });
}

async function saveLevel() {
  if (!level()) return;
  const body = {
    title: value('level-title'),
    description: value('level-description'),
  };
  return withLoading('save-level', () => mutate(`/topics/${state.topicId}/levels/${state.levelId}`, 'PATCH', body));
}

async function deleteLevel() {
  if (!level() || !confirm('Xóa cấp độ này và toàn bộ lộ trình bên trong?')) return;
  return withLoading('delete-level', async () => {
    await mutate(`/topics/${state.topicId}/levels/${state.levelId}`, 'DELETE');
    state.levelId = levelsOf(topic())[0]?.id || null;
    state.sectionId = sectionsOf(level())[0]?.id || null;
    state.lessonId = lessonsOf(section())[0]?.id || null;
    state.dayId = daysOf(lesson())[0]?.id || null;
    state.questionId = tracksOfDay(day())[0]?.id || null;
    await loadTopics();
  });
}

async function moveLevel(levelId, direction) {
  if (!topic()) return;
  return withLoading(`move-level-${levelId}-${direction}`, async () => {
    await mutate(`/topics/${state.topicId}/levels/${levelId}/move`, 'PATCH', { direction });
    state.levelId = levelId;
    state.sectionId = sectionsOf(level())[0]?.id || null;
    state.lessonId = lessonsOf(section())[0]?.id || null;
    state.dayId = daysOf(lesson())[0]?.id || null;
    state.questionId = tracksOfDay(day())[0]?.id || null;
    await loadTopics();
  });
}

async function createSection() {
  if (!topic() || !level()) return;
  return withLoading('create-section', async () => {
    const created = await mutate(`/topics/${state.topicId}/levels/${state.levelId}/sections`, 'POST', {
      title: t('newRoute'),
      icon: 'book',
    });
    state.sectionId = created.id;
    state.lessonId = null;
    state.dayId = null;
    state.questionId = null;
    await loadTopics();
  });
}

async function saveSection() {
  if (!section()) return;
  const body = {
    title: value('section-title'),
    icon: value('section-icon'),
    description: value('section-description'),
  };
  return withLoading('save-section', () => mutate(`/topics/${state.topicId}/sections/${state.sectionId}`, 'PATCH', body));
}

async function deleteSection() {
  if (!section() || !confirm(t('confirmDeleteRoute'))) return;
  return withLoading('delete-section', async () => {
    await mutate(`/topics/${state.topicId}/sections/${state.sectionId}`, 'DELETE');
    state.sectionId = sectionsOf(level())[0]?.id || null;
    state.lessonId = lessonsOf(section())[0]?.id || null;
    state.dayId = daysOf(lesson())[0]?.id || null;
    state.questionId = tracksOfDay(day())[0]?.id || null;
    await loadTopics();
  });
}

async function moveSection(sectionId, direction) {
  if (!level()) return;
  return withLoading(`move-section-${sectionId}-${direction}`, async () => {
    await mutate(`/topics/${state.topicId}/levels/${state.levelId}/sections/${sectionId}/move`, 'PATCH', { direction });
    state.sectionId = sectionId;
    state.lessonId = lessonsOf(section())[0]?.id || null;
    state.dayId = daysOf(lesson())[0]?.id || null;
    state.questionId = tracksOfDay(day())[0]?.id || null;
    await loadTopics();
  });
}

async function ensureRouteLesson() {
  if (lesson()) return lesson();
  if (!section()) {
    showToast('Hãy chọn hoặc tạo lộ trình trước');
    render();
    return null;
  }
  const created = await mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons`, 'POST', {
    title: textOrFallback(value('section-title'), textOrFallback(section()?.title, 'Nội dung lộ trình')),
    level: level()?.title || 'HSK',
    goal: section()?.title || 'Luyện nghe',
    description: section()?.description || 'Nội dung luyện nghe theo ngày',
  });
  state.lessonId = created.id;
  state.dayId = daysOf(created)[0]?.id || null;
  state.questionId = tracksOfDay(day())[0]?.id || null;
  await loadTopics();
  return lesson();
}

function textOrFallback(value, fallback) {
  return String(value || '').trim() || fallback;
}

async function createLesson() {
  if (!section()) return;
  return withLoading('create-lesson', async () => {
    const created = await mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons`, 'POST', {
      title: t('newLessonSet'),
      level: 'HSK3',
      goal: t('listeningPractice'),
    });
    state.lessonId = created.id;
    state.dayId = daysOf(created)[0]?.id || null;
    state.questionId = null;
    await loadTopics();
  });
}

async function saveLesson() {
  if (!lesson()) return;
  const body = {
    title: value('lesson-title'),
    level: value('lesson-level'),
    goal: value('lesson-goal'),
    description: value('lesson-description'),
  };
  return withLoading('save-lesson', () =>
    mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}`, 'PATCH', body),
  );
}

async function deleteLesson() {
  if (!lesson() || !confirm(t('confirmDeleteLessonSet'))) return;
  return withLoading('delete-lesson', async () => {
    await mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}`, 'DELETE');
    state.lessonId = lessonsOf(section())[0]?.id || null;
    state.dayId = daysOf(lesson())[0]?.id || null;
    state.questionId = tracksOfDay(day())[0]?.id || null;
    await loadTopics();
  });
}

async function moveLesson(lessonId, direction) {
  if (!section()) return;
  return withLoading(`move-lesson-${lessonId}-${direction}`, async () => {
    await mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons/${lessonId}/move`, 'PATCH', { direction });
    state.lessonId = lessonId;
    state.dayId = daysOf(lesson())[0]?.id || null;
    state.questionId = tracksOfDay(day())[0]?.id || null;
    await loadTopics();
  });
}

async function createDay() {
  if (!lesson()) {
    await ensureRouteLesson();
    return;
  }
  return withLoading('create-day', async () => {
    const created = await mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/days`, 'POST', {
      title: `Ngày ${daysOf(lesson()).length + 1}`,
      description: 'Bộ câu hỏi luyện tập',
    });
    state.dayId = created.id;
    state.questionId = null;
    await loadTopics();
  });
}

async function saveDay() {
  await ensureRouteLesson();
  if (!day()) return;
  const body = {
    title: value('day-title'),
    description: value('day-description'),
  };
  return withLoading('save-day', () =>
    mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/days/${state.dayId}`, 'PATCH', body),
  );
}

async function deleteDay() {
  if (!day() || !confirm('Xóa ngày này và toàn bộ câu hỏi bên trong?')) return;
  return withLoading('delete-day', async () => {
    await mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/days/${state.dayId}`, 'DELETE');
    state.dayId = daysOf(lesson())[0]?.id || null;
    state.questionId = tracksOfDay(day())[0]?.id || null;
    await loadTopics();
  });
}

async function moveDay(dayId, direction) {
  if (!lesson()) return;
  return withLoading(`move-day-${dayId}-${direction}`, async () => {
    await mutate(
      `/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/days/${dayId}/move`,
      'PATCH',
      { direction },
    );
    state.dayId = dayId;
    state.questionId = tracksOfDay(day())[0]?.id || null;
    await loadTopics();
  });
}

function selectCreateQuestionType(questionType) {
  state.createQuestionType = questionType;
  render();
}

async function createQuestion(questionType = state.createQuestionType || 'image') {
  if (!lesson()) {
    await ensureRouteLesson();
  }
  if (!day()) {
    await createDay();
  }
  if (!lesson() || !day()) return;
  const currentDay = day();
  state.dayId = currentDay.id;
  return withLoading(`create-question-${questionType}`, async () => {
    const created = await mutate(
      `/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/days/${state.dayId}/questions`,
      'POST',
      {
        title: `${t('numberedQuestion')} ${tracksOfDay(currentDay).length + 1}`,
        questionType,
        mode: questionType === 'image' ? 'Câu hỏi hình ảnh' : 'Câu hỏi đúng sai',
        prompt: questionType === 'image' ? 'Quan sát hình và chọn đáp án đúng.' : 'Nghe và chọn đáp án đúng.',
        options: questionType === 'image' ? ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'] : ['Đúng', 'Sai'],
        optionImages: ['', '', '', ''],
      },
    );
    state.questionId = created.id;
    await loadTopics();
  });
}

function setQuestionType(questionType) {
  const current = question();
  if (!current) return;
  current.questionType = questionType;
  if (questionType === 'trueFalse' && arrayOf(current.options).length > 2) {
    current.options = ['Đúng', 'Sai'];
    current.answerIndex = 0;
  }
  if (questionType === 'image') {
    current.options = arrayOf(current.options).length >= 4 ? current.options.slice(0, 4) : ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'];
    current.optionImages = optionImagesOf(current);
  }
  render();
}

function setAnswerIndex(index) {
  const current = question();
  if (!current) return;
  if (current.questionType === 'multiAudio') {
    const activeIndex = Math.max(0, Math.min(4, Number(state.multiAudioActiveIndex) || 0));
    const items = Array.from({ length: 5 }, (_, itemIndex) => audioItemsOf(current)[itemIndex] || { url: '', fileName: '', answerIndex: current.answerIndex || 0 });
    items[activeIndex] = {
      ...items[activeIndex],
      answerIndex: index,
    };
    current.audioItems = items.filter((item) => item.url);
  }
  current.answerIndex = index;
  const answerInput = document.getElementById('q-answer');
  if (answerInput) {
    answerInput.value = String(index + 1);
  }
  render();
}

async function saveQuestion() {
  if (!question()) return;
  const currentQuestion = question();
  const isImageQuestion = (currentQuestion.questionType || 'trueFalse') === 'image';
  const options = isImageQuestion
    ? [0, 1, 2, 3].map((index) => value(`q-option-label-${index}`) || `Đáp án ${String.fromCharCode(65 + index)}`)
    : value('q-options')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean);
  const body = {
    title: value('q-title'),
    questionType: question().questionType || 'trueFalse',
    mode: value('q-mode'),
    text: value('q-text'),
    pinyin: value('q-pinyin'),
    keyword: value('q-keyword'),
    answerIndex: Math.max(0, Math.min(options.length - 1, Number(value('q-answer')) - 1)),
    prompt: value('q-prompt'),
    vietnamese: value('q-vietnamese'),
    imageUrl: value('q-image-url'),
    imageAlt: value('q-image-alt'),
    optionImages: isImageQuestion ? [0, 1, 2, 3].map((index) => value(`q-option-image-${index}`)) : optionImagesOf(currentQuestion),
    options,
  };
  return withLoading('save-question', () =>
    mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/questions/${state.questionId}`, 'PATCH', body),
  );
}

async function uploadQuestionAudio() {
  if (!question()) return;
  const input = document.getElementById('q-audio');
  const file = input?.files?.[0];
  if (!file) {
    showToast(t('chooseAudioFirst'));
    render();
    return;
  }

  return withLoading('upload-audio', async () => {
    const formData = new FormData();
    formData.append('audio', file);
    const response = await fetch(
      `${apiBase}/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/questions/${state.questionId}/audio`,
      {
        method: 'POST',
        body: formData,
      },
    );
    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 404) {
        showToast(t('staleUploadRoute'));
        throw new Error(t('staleUploadRoute'));
      }
      showToast(t('uploadFailed'));
      throw new Error(errorText);
    }
    await loadTopics();
    showToast(t('uploadedAudio'));
  });
}

async function uploadQuestionOptionImage(index) {
  if (!question()) return;
  const input = document.getElementById(`q-option-file-${index}`);
  const file = input?.files?.[0];
  if (!file) {
    showToast(t('chooseImageFirst'));
    render();
    return;
  }

  return withLoading(`upload-image-${index}`, async () => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch(
      `${apiBase}/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/questions/${state.questionId}/option-images/${index}`,
      {
        method: 'POST',
        body: formData,
      },
    );
    if (!response.ok) {
      const errorText = await response.text();
      showToast(response.status === 404 ? t('staleUploadRoute') : t('uploadImageFailed'));
      throw new Error(errorText);
    }
    await loadTopics();
    showToast(t('uploadedImage'));
  });
}

async function deleteQuestion() {
  if (!question() || !confirm(t('confirmDeleteQuestion'))) return;
  return withLoading('delete-question', async () => {
    await mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/questions/${state.questionId}`, 'DELETE');
    state.questionId = lesson()?.tracks[0]?.id || null;
    await loadTopics();
  });
}

async function refreshData() {
  return withLoading('refresh', async () => {
    await loadTopics();
    showToast(t('reloaded'));
  });
}

function dayButton(item) {
  const tracks = tracksOfDay(item);
  return `
    <div class="row-item day-row ${item.id === state.dayId ? 'active' : ''}">
      <button type="button" class="row-main" onclick="selectDay('${item.id}')">
        <span><strong>${item.title}</strong><span class="muted">${tracks.length} ${t('questions')}</span></span>
        <span class="pill">${tracks.length}</span>
      </button>
      <div class="sort-actions">
        <button type="button" class="icon-btn ${isLoading(`move-day-${item.id}-up`) ? 'loading' : ''}" onclick="moveDay('${item.id}', 'up')" ${loadingAttrs(`move-day-${item.id}-up`)} title="Đưa lên">${loadingIcon(`move-day-${item.id}-up`, 'arrow-up')}</button>
        <button type="button" class="icon-btn ${isLoading(`move-day-${item.id}-down`) ? 'loading' : ''}" onclick="moveDay('${item.id}', 'down')" ${loadingAttrs(`move-day-${item.id}-down`)} title="Đưa xuống">${loadingIcon(`move-day-${item.id}-down`, 'arrow-down')}</button>
      </div>
    </div>
  `;
}

function dayForm(item) {
  if (!section()) return '<div class="empty">Chọn hoặc tạo lộ trình trước, sau đó mới tạo ngày.</div>';
  if (!item) return '<div class="empty">Chọn hoặc tạo ngày</div>';
  return `
    <form id="day-form" class="form-grid single">
      ${input('day-title', 'Tên ngày', item.title)}
      ${textarea('day-description', 'Mô tả ngày', item.description)}
      <div class="form-actions">
        <button type="button" class="btn primary ${isLoading('save-day') ? 'loading' : ''}" onclick="saveDay()" ${loadingAttrs('save-day')}>${loadingIcon('save-day', 'save')} Lưu ngày</button>
        <button type="button" class="btn danger ${isLoading('delete-day') ? 'loading' : ''}" onclick="deleteDay()" ${loadingAttrs('delete-day')}>${loadingIcon('delete-day', 'trash')}</button>
      </div>
    </form>
  `;
}

function questionTypeTabs(item) {
  const type = item?.questionType || 'trueFalse';
  return `
    <div class="question-type-tabs">
      <button type="button" class="${type === 'trueFalse' ? 'active' : ''}" onclick="setQuestionType('trueFalse')">Đúng sai</button>
      <button type="button" class="${type === 'image' ? 'active' : ''}" onclick="setQuestionType('image')">Hình ảnh</button>
      <button type="button" class="${type === 'shortConversation' ? 'active' : ''}" onclick="setQuestionType('shortConversation')">Hội thoại ngắn</button>
    </div>
  `;
}

function questionCreatePicker(currentDay) {
  const selectedType = state.createQuestionType || 'image';
  return `
    <div class="question-create-box">
      <div class="section-title">${t('questionType')}</div>
      <div class="question-create-options">
        <button type="button" class="${selectedType === 'image' ? 'active' : ''}" onclick="selectCreateQuestionType('image')" ${currentDay ? '' : 'disabled'}>
          <strong>${t('imageQuestion')}</strong>
          <span>${t('imageQuestionHint')}</span>
        </button>
        <button type="button" class="${selectedType === 'shortConversation' ? 'active' : ''}" onclick="selectCreateQuestionType('shortConversation')" ${currentDay ? '' : 'disabled'}>
          <strong>Hội thoại ngắn</strong>
          <span>Tải audio, nhập câu hỏi và 3 đáp án.</span>
        </button>
        <button type="button" class="${selectedType === 'trueFalse' ? 'active' : ''}" onclick="selectCreateQuestionType('trueFalse')" ${currentDay ? '' : 'disabled'}>
          <strong>${t('trueFalseQuestion')}</strong>
          <span>${t('trueFalseQuestionHint')}</span>
        </button>
      </div>
      <button class="btn primary ${isLoading(`create-question-${selectedType}`) ? 'loading' : ''}" onclick="createQuestion()" ${loadingAttrs(`create-question-${selectedType}`)} ${currentDay ? '' : 'disabled'}>
        ${loadingIcon(`create-question-${selectedType}`, 'plus')} ${t('createQuestion')}
      </button>
    </div>
  `;
}

function optionImageFields(item, options) {
  const images = optionImagesOf(item);
  const activeAudioIndex = Math.max(0, Math.min(4, Number(state.multiAudioActiveIndex) || 0));
  const activeAnswerIndex = item.questionType === 'multiAudio' ? multiAudioAnswerIndex(item, activeAudioIndex) : item.answerIndex;
  return `
    <section class="option-image-admin" style="grid-column:1 / -1">
      <div class="section-title">${t('optionImages')}</div>
      <div class="option-image-grid">
        ${[0, 1, 2, 3]
          .map(
            (index) => `
              <div class="option-image-card ${item.answerIndex === index ? 'correct' : ''}">
                <div class="option-image-head">
                  <span>${String.fromCharCode(65 + index)}</span>
                  <label class="answer-radio">
                    <input type="radio" name="q-answer-radio" ${item.answerIndex === index ? 'checked' : ''} onchange="setAnswerIndex(${index})" />
                    Đúng
                  </label>
                </div>
                <div class="option-image-preview">
                  ${
                    images[index]
                      ? `<img src="${escapeAttr(images[index])}" alt="${escapeAttr(options[index] || `Đáp án ${String.fromCharCode(65 + index)}`)}" />`
                      : `<div class="image-placeholder">${icon('book', 24)}<span>Ảnh ${String.fromCharCode(65 + index)}</span></div>`
                  }
                </div>
                <label>Đáp án ${String.fromCharCode(65 + index)}
                  <input id="q-option-label-${index}" type="text" value="${escapeAttr(options[index] || '')}" />
                </label>
                <label>URL ảnh ${String.fromCharCode(65 + index)}
                  <input id="q-option-image-${index}" type="url" value="${escapeAttr(images[index])}" placeholder="https://..." />
                </label>
                <label>File ảnh
                  <input id="q-option-file-${index}" type="file" accept="image/*" />
                </label>
                <button type="button" class="btn ${isLoading(`upload-image-${index}`) ? 'loading' : ''}" onclick="uploadQuestionOptionImage(${index})" ${loadingAttrs(`upload-image-${index}`)}>
                  ${loadingIcon(`upload-image-${index}`, 'save')} ${t('uploadImage')} ${String.fromCharCode(65 + index)}
                </button>
              </div>
            `,
          )
          .join('')}
      </div>
    </section>
  `;
}

function shortConversationFields(item) {
  const options = Array.from({ length: 3 }, (_, index) => arrayOf(item.options)[index] || `Đáp án ${String.fromCharCode(65 + index)}`);
  const answerIndex = Math.max(0, Math.min(2, Number(item.answerIndex) || 0));
  return `
    <section class="short-conversation-admin" style="grid-column:1 / -1">
      <div class="section-title">Câu hỏi hội thoại ngắn</div>
      ${textarea('q-prompt', 'Câu hỏi', item.prompt || 'Hai người nói chuyện ở đâu?')}
      <input id="q-answer" type="hidden" value="${answerIndex + 1}" />
      <input id="q-mode" type="hidden" value="${escapeAttr(item.mode || 'Hội thoại ngắn')}" />
      <input id="q-text" type="hidden" value="${escapeAttr(item.text || '')}" />
      <input id="q-pinyin" type="hidden" value="${escapeAttr(item.pinyin || '')}" />
      <input id="q-keyword" type="hidden" value="${escapeAttr(item.keyword || '')}" />
      <input id="q-vietnamese" type="hidden" value="${escapeAttr(item.vietnamese || '')}" />
      <input id="q-image-url" type="hidden" value="" />
      <input id="q-image-alt" type="hidden" value="" />
      <textarea id="q-options" style="display:none">${escapeHtml(options.join('\n'))}</textarea>
      <div class="short-option-list">
        ${options
          .map(
            (option, index) => `
              <label class="short-option-row ${answerIndex === index ? 'correct' : ''}">
                <span class="short-option-letter">${String.fromCharCode(65 + index)}</span>
                <input id="q-short-option-${index}" type="text" value="${escapeAttr(option)}" />
                <span class="answer-radio">
                  <input type="radio" name="q-short-answer" ${answerIndex === index ? 'checked' : ''} onchange="setAnswerIndex(${index})" />
                  Đúng
                </span>
              </label>
            `,
          )
          .join('')}
      </div>
    </section>
  `;
}

function trueFalseImageFields(item) {
  return `
    <section class="question-image-admin" style="grid-column:1 / -1">
      <div class="section-head-inline">
        <div>
          <div class="section-title">Hình ảnh câu hỏi</div>
          <p class="muted">Ảnh này sẽ hiển thị phía trên audio ở client.</p>
        </div>
        <button type="button" class="btn ${isLoading('upload-question-image') ? 'loading' : ''}" onclick="uploadQuestionImage()" ${loadingAttrs('upload-question-image')}>
          ${loadingIcon('upload-question-image', 'save')} Tải ảnh
        </button>
      </div>
      <div class="question-image-editor">
        <div class="question-image-preview">
          ${item.imageUrl ? `<img src="${escapeAttr(item.imageUrl)}" alt="${escapeAttr(item.imageAlt || item.title)}" />` : `<div class="image-placeholder">${icon('image', 28)}<span>Chưa có hình ảnh</span></div>`}
        </div>
        <label>URL hình ảnh
          <input id="q-image-url" type="url" value="${escapeAttr(item.imageUrl || '')}" placeholder="https://..." />
        </label>
        <label>Mô tả ảnh
          <input id="q-image-alt" type="text" value="${escapeAttr(item.imageAlt || '')}" />
        </label>
        <label>File ảnh
          <input id="q-image-file" type="file" accept="image/*" />
        </label>
      </div>
    </section>
  `;
}

function questionForm(item) {
  if (!item) return `<div class="empty">${t('chooseOrCreateQuestion')}</div>`;
  const questionType = item.questionType || 'trueFalse';
  const options = questionType === 'image' ? Array.from({ length: 4 }, (_, index) => arrayOf(item.options)[index] || `Đáp án ${String.fromCharCode(65 + index)}`) : arrayOf(item.options);
  return `
    <form id="question-form" class="form-grid ${questionType === 'image' ? 'image-question-form' : ''}">
      <div style="grid-column:1 / -1">${questionTypeTabs(item)}</div>
      ${input('q-title', t('questionName'), item.title)}
      ${input('q-mode', t('questionMode'), item.mode)}
      ${
        questionType === 'image'
          ? optionImageFields(item, options)
          : ''
      }
      ${input('q-text', 'Nội dung nghe/đáp án', item.text)}
      ${input('q-pinyin', 'Pinyin', item.pinyin)}
      ${input('q-keyword', t('keyword'), item.keyword)}
      ${input('q-answer', t('correctAnswer'), String(item.answerIndex + 1), 'number')}
      ${textarea('q-prompt', t('visiblePrompt'), item.prompt)}
      ${textarea('q-vietnamese', t('vietnameseMeaning'), item.vietnamese)}
      ${
        questionType === 'image'
          ? `<input id="q-image-url" type="hidden" value="${escapeAttr(item.imageUrl || '')}" /><input id="q-image-alt" type="hidden" value="${escapeAttr(item.imageAlt || '')}" /><textarea id="q-options" style="display:none">${escapeHtml(options.join('\n'))}</textarea>`
          : textarea('q-options', t('options'), options.join('\n'))
      }
      <label style="grid-column:1 / -1">${t('questionAudio')}
        <input id="q-audio" type="file" accept="audio/*" />
      </label>
      <div style="grid-column:1 / -1">
        ${
          item.audioUrl
            ? `<audio controls src="${item.audioUrl}" style="width:100%;height:38px"></audio><p class="muted" style="margin:6px 0 0">${item.audioFileName || item.audioUrl}</p>`
            : `<p class="muted" style="margin:0">${t('noAudio')}</p>`
        }
      </div>
      <div class="form-actions" style="grid-column:1 / -1">
        <button type="button" class="btn primary ${isLoading('save-question') ? 'loading' : ''}" onclick="saveQuestion()" ${loadingAttrs('save-question')}>${loadingIcon('save-question', 'save')} ${t('saveQuestion')}</button>
        <button type="button" class="btn ${isLoading('upload-audio') ? 'loading' : ''}" onclick="uploadQuestionAudio()" ${loadingAttrs('upload-audio')}>${loadingIcon('upload-audio', 'save')} ${t('uploadAudio')}</button>
        <button type="button" class="btn danger ${isLoading('delete-question') ? 'loading' : ''}" onclick="deleteQuestion()" ${loadingAttrs('delete-question')}>${loadingIcon('delete-question', 'trash')} ${t('deleteQuestion')}</button>
      </div>
    </form>
  `;
}

function render() {
  const currentTopic = topic();
  const currentLevel = level();
  const currentSection = section();
  const currentLesson = lesson();
  const currentDay = day();

  mount(`
    <aside class="sidebar">
      <div class="brand">
        <div>
          <h1>${t('adminTitle')}</h1>
          <p class="muted">${t('adminSubtitle')}</p>
        </div>
        ${languageToggle()}
      </div>
      <div class="actions" style="margin-bottom:14px">
        <button class="btn primary ${isLoading('create-topic') ? 'loading' : ''}" onclick="createTopic()" ${loadingAttrs('create-topic')}>${loadingIcon('create-topic', 'plus')} ${t('topic')}</button>
        <button class="btn ghost ${isLoading('refresh') ? 'loading' : ''}" onclick="refreshData()" ${loadingAttrs('refresh')}>${loadingIcon('refresh', 'refresh')} ${t('reload')}</button>
      </div>
      <div class="topic-list">
        ${state.topics.map(topicButton).join('') || `<div class="empty">${t('emptyTopics')}</div>`}
      </div>
    </aside>

    <section class="main">
      <div class="topbar">
        <div>
          <h2>${currentTopic?.title || t('noTopicSelected')}</h2>
          <p class="muted">${currentTopic?.description || t('createTopicHint')}</p>
        </div>
        <div class="actions">
          <a class="btn ghost" href="/" target="_blank">${icon('book')} ${t('viewMobile')}</a>
          <button class="btn primary ${isLoading('save-topic') ? 'loading' : ''}" onclick="saveTopic()" ${loadingAttrs('save-topic')}>${loadingIcon('save-topic', 'save')} ${t('saveTopic')}</button>
          <button class="btn danger ${isLoading('delete-topic') ? 'loading' : ''}" onclick="deleteTopic()" ${loadingAttrs('delete-topic')}>${loadingIcon('delete-topic', 'trash')} ${t('deleteTopic')}</button>
        </div>
      </div>
      ${metrics()}
      <div class="workspace admin-workspace-wide">
        <section class="panel">
          <div class="panel-head">
            <h3>Chủ đề, cấp độ, lộ trình</h3>
            <div class="actions">
              <button class="btn ${isLoading('create-level') ? 'loading' : ''}" onclick="createLevel()" ${loadingAttrs('create-level')} ${currentTopic ? '' : 'disabled'}>${loadingIcon('create-level', 'plus')} Cấp độ</button>
              <button class="btn ${isLoading('create-section') ? 'loading' : ''}" onclick="createSection()" ${loadingAttrs('create-section')} ${currentLevel ? '' : 'disabled'}>${loadingIcon('create-section', 'plus')} ${t('route')}</button>
            </div>
          </div>
          <div class="panel-body">
            ${topicForm(currentTopic)}
            <p class="section-title">Cấp độ</p>
            <div class="stack">${levelsOf(currentTopic).map(levelButton).join('') || '<div class="empty">Chưa có cấp độ</div>'}</div>
            ${levelForm(currentLevel)}
            <p class="section-title">${t('routes')}</p>
            <div class="stack">${sectionsOf(currentLevel).map(sectionButton).join('') || `<div class="empty">${t('emptyRoutes')}</div>`}</div>
            ${sectionForm(currentSection)}
          </div>
        </section>

        <section class="panel">
          <div class="panel-head">
            <h3>Tạo ngày</h3>
            <button class="btn ${isLoading('create-day') ? 'loading' : ''}" onclick="createDay()" ${loadingAttrs('create-day')} ${currentSection ? '' : 'disabled'}>${loadingIcon('create-day', 'plus')} Ngày</button>
          </div>
          <div class="panel-body">
            ${dayForm(currentDay)}
            <div class="stack" style="margin-top:14px">
              ${daysOf(currentLesson).map(dayButton).join('') || '<div class="empty">Chưa có ngày</div>'}
            </div>
          </div>
        </section>

        <section class="panel">
          <div class="panel-head">
            <h3>${t('questionBank')}</h3>
          </div>
          <div class="panel-body">
            ${questionCreatePicker(currentDay)}
            <div class="question-editor">
              <div class="question-list stack">
              ${tracksOfDay(currentDay).map(questionButton).join('') || `<div class="empty">${t('emptyQuestions')}</div>`}
              </div>
              ${questionForm(question())}
            </div>
          </div>
        </section>
      </div>
    </section>
    ${state.toast ? `<div class="toast">${state.toast}</div>` : ''}
  `);
}

function textOr(value, fallback = 'Chua co du lieu') {
  return escapeHtml(value || fallback);
}

function toggleTopicMetricsList() {
  state.showTopicMetricsList = !state.showTopicMetricsList;
  render();
}

function selectTopicFromMetrics(id) {
  state.showTopicMetricsList = false;
  selectTopic(id);
}

function metricsTopicList() {
  if (!state.showTopicMetricsList) return '';
  return `
    <section class="metric-topic-panel">
      <div class="metric-topic-head">
        <div>
          <strong>Danh sach chu de</strong>
          <p class="muted">${state.topics.length} chu de dang co trong he thong</p>
        </div>
        <button type="button" class="icon-btn" onclick="toggleTopicMetricsList()" title="Dong danh sach">${icon('x', 16)}</button>
      </div>
      <div class="metric-topic-list">
        ${
          state.topics
            .map((item) => {
              const levels = levelsOf(item);
              const routes = levels.flatMap((currentLevel) => sectionsOf(currentLevel));
              return `
                <button type="button" class="metric-topic-item ${item.id === state.topicId ? 'active' : ''}" onclick="selectTopicFromMetrics('${item.id}')">
                  <span class="metric-topic-icon">${icon(item.icon || 'book', 17)}</span>
                  <span>
                    <strong>${escapeHtml(item.title || 'Chu de')}</strong>
                    <span class="muted">${levels.length} cap do · ${routes.length} lo trinh</span>
                  </span>
                  ${icon('chevron-right', 16)}
                </button>
              `;
            })
            .join('') || '<div class="empty">Chua co chu de</div>'
        }
      </div>
    </section>
  `;
}

function metrics() {
  const topics = state.topics.length;
  const levels = state.topics.flatMap((item) => levelsOf(item));
  const sectionItems = levels.flatMap((item) => sectionsOf(item));
  const lessonItems = sectionItems.flatMap((item) => lessonsOf(item));
  const sections = sectionItems.length;
  const days = lessonItems.flatMap((item) => daysOf(item)).length;

  return `
    <div class="metric-zone">
      <div class="metric-grid">
        <button type="button" class="metric metric-button ${state.showTopicMetricsList ? 'active' : ''}" onclick="toggleTopicMetricsList()" aria-expanded="${state.showTopicMetricsList ? 'true' : 'false'}">
          <span class="metric-icon">${icon('folders', 18)}</span>
          <span><span>Chu de</span><strong>${topics}</strong></span>
          <span class="metric-cue">${icon(state.showTopicMetricsList ? 'chevron-up' : 'chevron-down', 16)}</span>
        </button>
        <div class="metric"><span class="metric-icon">${icon('badge-check', 18)}</span><span><span>Cap do</span><strong>${levels.length}</strong></span></div>
        <div class="metric"><span class="metric-icon">${icon('route', 18)}</span><span><span>Lo trinh</span><strong>${sections}</strong></span></div>
        <div class="metric"><span class="metric-icon">${icon('calendar-days', 18)}</span><span><span>Ngay</span><strong>${days}</strong></span></div>
      </div>
      ${metricsTopicList()}
    </div>
  `;
}

function sidebarNav() {
  const items = [
    ['layout-dashboard', 'Tong quan'],
    ['folders', 'Chu de'],
    ['badge-check', 'Cap do'],
    ['route', 'Lo trinh'],
    ['calendar-days', 'Ngay hoc'],
    ['list-checks', 'Bo cau hoi'],
    ['file-question', 'Cau hoi'],
    ['users', 'Nguoi dung'],
    ['bar-chart-3', 'Bao cao'],
    ['settings', 'Cai dat'],
  ];
  return `
    <nav class="sidebar-nav">
      ${items
        .map(
          ([iconName, label], index) => `
            <a class="nav-item ${index === 1 ? 'active' : ''}" href="#">
              ${icon(iconName, 17)}
              <span>${label}</span>
            </a>
          `,
        )
        .join('')}
    </nav>
  `;
}

function breadcrumb(currentTopic, currentLevel, currentSection, currentLesson, currentDay) {
  const parts = [
    currentTopic?.title || 'Chu de',
    currentLevel?.title || 'Cap do',
    currentSection?.title || 'Lo trinh',
    currentLesson?.title || 'Bo cau hoi',
    currentDay?.title || 'Ngay',
    'Tao cau hoi',
  ];
  return `
    <div class="breadcrumb">
      ${parts
        .map((part, index) => {
          const current = index === parts.length - 1;
          return `${index ? icon('chevron-right', 14) : ''}<span>${current ? `<strong>${textOr(part, '')}</strong>` : textOr(part, '')}</span>`;
        })
        .join('')}
    </div>
  `;
}

function flowPanel(currentTopic, currentLevel, currentSection, currentLesson, currentDay) {
  return `
    <section class="panel">
      <div class="panel-head">
        <h3>1. Thong tin cau hoi</h3>
        <div class="actions">
          <button class="btn ${isLoading('create-topic') ? 'loading' : ''}" onclick="createTopic()" ${loadingAttrs('create-topic')}>${loadingIcon('create-topic', 'plus')} Chu de</button>
          <button class="btn primary ${isLoading('save-topic') ? 'loading' : ''}" onclick="saveTopic()" ${loadingAttrs('save-topic')} ${currentTopic ? '' : 'disabled'}>${loadingIcon('save-topic', 'save')} Luu chu de</button>
          <button class="btn danger ${isLoading('delete-topic') ? 'loading' : ''}" onclick="deleteTopic()" ${loadingAttrs('delete-topic')} ${currentTopic ? '' : 'disabled'}>${loadingIcon('delete-topic', 'trash')} Xoa chu de</button>
          <button class="btn ${isLoading('create-level') ? 'loading' : ''}" onclick="createLevel()" ${loadingAttrs('create-level')} ${currentTopic ? '' : 'disabled'}>${loadingIcon('create-level', 'plus')} Cap do</button>
          <button class="btn ${isLoading('create-section') ? 'loading' : ''}" onclick="createSection()" ${loadingAttrs('create-section')} ${currentLevel ? '' : 'disabled'}>${loadingIcon('create-section', 'plus')} Lo trinh</button>
          <button class="btn ${isLoading('create-lesson') ? 'loading' : ''}" onclick="createLesson()" ${loadingAttrs('create-lesson')} ${currentSection ? '' : 'disabled'}>${loadingIcon('create-lesson', 'plus')} Bo de</button>
          <button class="btn ${isLoading('create-day') ? 'loading' : ''}" onclick="createDay()" ${loadingAttrs('create-day')} ${currentLesson ? '' : 'disabled'}>${loadingIcon('create-day', 'plus')} Ngay</button>
        </div>
      </div>
      <div class="panel-body">
        ${topicForm(currentTopic)}
        <div class="flow-grid">
          <div class="flow-block">
            <p class="section-title">Cap do</p>
            <div class="stack">${levelsOf(currentTopic).map(levelButton).join('') || '<div class="empty">Chua co cap do</div>'}</div>
            ${levelForm(currentLevel)}
          </div>
          <div class="flow-block">
            <p class="section-title">Lo trinh</p>
            <div class="stack">${sectionsOf(currentLevel).map(sectionButton).join('') || '<div class="empty">Chua co lo trinh</div>'}</div>
            ${sectionForm(currentSection)}
          </div>
          <div class="flow-block">
            <p class="section-title">Bo cau hoi</p>
            <div class="stack">${lessonsOf(currentSection).map(lessonButton).join('') || '<div class="empty">Chua co bo cau hoi</div>'}</div>
            ${lessonForm(currentLesson)}
            <div class="form-actions" style="margin-top:12px">
              <button type="button" class="btn primary ${isLoading('save-lesson') ? 'loading' : ''}" onclick="saveLesson()" ${loadingAttrs('save-lesson')} ${currentLesson ? '' : 'disabled'}>${loadingIcon('save-lesson', 'save')} Luu bo de</button>
              <button type="button" class="btn danger ${isLoading('delete-lesson') ? 'loading' : ''}" onclick="deleteLesson()" ${loadingAttrs('delete-lesson')} ${currentLesson ? '' : 'disabled'}>${loadingIcon('delete-lesson', 'trash')}</button>
            </div>
          </div>
          <div class="flow-block">
            <p class="section-title">Ngay hoc</p>
            ${dayForm(currentDay)}
            <div class="stack" style="margin-top:12px">${daysOf(currentLesson).map(dayButton).join('') || '<div class="empty">Chua co ngay</div>'}</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function questionPanel(currentDay) {
  return `
    <section class="panel">
      <div class="panel-head">
        <h3>2. Danh sach audio va cau hoi</h3>
        ${questionCreatePicker(currentDay)}
      </div>
      <div class="panel-body">
        <div class="question-editor">
          <div class="question-list stack">
            ${tracksOfDay(currentDay).map(questionButton).join('') || `<div class="empty">${t('emptyQuestions')}</div>`}
          </div>
          ${questionForm(question())}
        </div>
      </div>
    </section>
  `;
}

function previewChoiceCard(item, index, options, images) {
  const label = options[index] || `Dap an ${String.fromCharCode(65 + index)}`;
  const image = images[index];
  const isCorrect = item?.answerIndex === index;
  return `
    <div class="choice-card ${isCorrect ? 'correct' : ''}">
      <span class="choice-letter">${String.fromCharCode(65 + index)}</span>
      ${image ? `<img src="${escapeAttr(image)}" alt="${escapeAttr(label)}" />` : `<div class="choice-label">${escapeHtml(label)}</div>`}
      ${isCorrect ? `<span class="choice-check">${icon('check', 14)}</span>` : ''}
    </div>
  `;
}

function studentPreview(item) {
  if (!item) {
    return `
      <section class="preview-card">
        <h3>Xem truoc giao dien hoc vien</h3>
        <div class="empty">Chon hoac tao cau hoi de xem preview.</div>
      </section>
    `;
  }
  const questionType = item.questionType || 'trueFalse';
  const options = questionType === 'image' ? Array.from({ length: 4 }, (_, index) => arrayOf(item.options)[index] || `Dap an ${String.fromCharCode(65 + index)}`) : arrayOf(item.options);
  const images = optionImagesOf(item);
  const optionCount = questionType === 'image' ? 4 : Math.max(options.length, 2);
  return `
    <section class="preview-card">
      <h3>Xem truoc giao dien hoc vien</h3>
      <div class="student-frame">
        <p>${escapeHtml(item.prompt || 'Nghe doan am thanh va chon dap an dung')}</p>
        ${item.imageUrl && !isImageQuestion ? `<img class="preview-question-image" src="${escapeAttr(item.imageUrl)}" alt="${escapeAttr(item.imageAlt || item.title)}" />` : ''}
        <div class="audio-preview">
          <span class="audio-play">${icon('volume-2', 18)}</span>
          <span class="wave"></span>
          <span class="muted">00:00 / 00:34</span>
        </div>
        <div class="choice-grid ${questionType === 'shortConversation' ? 'short-choice-grid' : ''}">
          ${Array.from({ length: optionCount }, (_, index) => previewChoiceCard(item, index, options, images)).join('')}
        </div>
        <div class="preview-note">${icon('info', 15)} Hoc vien se nghe ngau nhien mot audio trong danh sach cua ngay hoc.</div>
      </div>
    </section>
  `;
}

function questionInfo(currentTopic, currentLevel, currentSection, currentLesson, currentDay, currentQuestion) {
  return `
    <section class="preview-card">
      <h3>Thong tin cau hoi</h3>
      <dl class="info-list">
        <div><dt>Chu de</dt><dd>${textOr(currentTopic?.title, '-')}</dd></div>
        <div><dt>Cap do</dt><dd>${textOr(currentLevel?.title, '-')}</dd></div>
        <div><dt>Lo trinh</dt><dd>${textOr(currentSection?.title, '-')}</dd></div>
        <div><dt>Bo cau hoi</dt><dd>${textOr(currentLesson?.title, '-')}</dd></div>
        <div><dt>Ngay</dt><dd>${textOr(currentDay?.title, '-')}</dd></div>
        <div><dt>Cau hoi</dt><dd>${textOr(currentQuestion?.title, '-')}</dd></div>
      </dl>
    </section>
  `;
}

function render() {
  const currentTopic = topic();
  const currentLevel = level();
  const currentSection = section();
  const currentLesson = lesson();
  const currentDay = day();
  const currentQuestion = question();

  mount(`
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">${icon('graduation-cap', 20)}</span>
        <div class="brand-copy">
          <h1>HSK3 Luyen nghe</h1>
          <p>Admin content studio</p>
        </div>
      </div>
      ${sidebarNav()}
      <div class="sidebar-footer">
        <div class="admin-user">
          <span class="avatar">A</span>
          <div>
            <strong>Admin</strong>
            <p class="muted">Quan tri vien</p>
          </div>
        </div>
      </div>
    </aside>

    <section class="main">
      <div class="topbar">
        ${breadcrumb(currentTopic, currentLevel, currentSection, currentLesson, currentDay)}
        <div class="actions">
          ${languageToggle()}
          <a class="btn ghost" href="/" target="_blank">${icon('book')} Xem app</a>
          <button class="btn ghost ${isLoading('refresh') ? 'loading' : ''}" onclick="refreshData()" ${loadingAttrs('refresh')}>${loadingIcon('refresh', 'refresh')} Tai lai</button>
          <button class="btn primary ${isLoading('save-question') ? 'loading' : ''}" onclick="saveQuestion()" ${loadingAttrs('save-question')} ${currentQuestion ? '' : 'disabled'}>${loadingIcon('save-question', 'save')} Luu cau hoi</button>
        </div>
      </div>

      <div class="page-title">
        <h2>Tao cau hoi nghe chon hinh</h2>
        <p class="muted">Nghe mot audio va chon mot dap an dung trong cac hinh anh.</p>
      </div>

      <div class="admin-content">
        <div class="authoring-column">
          ${metrics()}
          ${flowPanel(currentTopic, currentLevel, currentSection, currentLesson, currentDay)}
          ${questionPanel(currentDay)}
        </div>
        <aside class="preview-column">
          ${questionInfo(currentTopic, currentLevel, currentSection, currentLesson, currentDay, currentQuestion)}
          ${studentPreview(currentQuestion)}
        </aside>
      </div>
    </section>
    ${state.toast ? `<div class="toast">${state.toast}</div>` : ''}
  `);
}

function imageChoiceOptions(item) {
  return Array.from({ length: optionCountOf(item) }, (_, index) => arrayOf(item.options)[index] || `Đáp án ${String.fromCharCode(65 + index)}`);
}

async function createQuestion(questionType = state.createQuestionType || 'image') {
  if (!lesson()) {
    await ensureRouteLesson();
  }
  if (!day()) {
    await createDay();
  }
  if (!lesson() || !day()) return;
  const currentDay = day();
  state.dayId = currentDay.id;
  return withLoading(`create-question-${questionType}`, async () => {
    const isMultiAudio = questionType === 'multiAudio';
    const isShortConversation = questionType === 'shortConversation';
    const isImageType = questionType === 'image' || isMultiAudio;
    const optionCount = isMultiAudio ? 5 : isShortConversation ? 3 : 4;
    const defaultOptions = Array.from({ length: optionCount }, (_, index) => `Đáp án ${String.fromCharCode(65 + index)}`);
    const created = await mutate(
      `/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/days/${state.dayId}/questions`,
      'POST',
      {
        title: `${t('numberedQuestion')} ${tracksOfDay(currentDay).length + 1}`,
        questionType,
        mode: isMultiAudio ? 'Nhiều audio chọn hình' : questionType === 'image' ? 'Câu hỏi hình ảnh' : 'Câu hỏi đúng sai',
        prompt: isImageType ? 'Nghe đoạn âm thanh và chọn hình ảnh đúng.' : 'Nghe và chọn đáp án đúng.',
        options: isImageType ? Array.from({ length: optionCount }, (_, index) => `Đáp án ${String.fromCharCode(65 + index)}`) : ['Đúng', 'Sai'],
        optionImages: Array.from({ length: optionCount }, () => ''),
        audioItems: isMultiAudio ? [] : undefined,
        ...(isShortConversation ? { mode: 'Hội thoại ngắn', prompt: 'Hai người nói chuyện ở đâu?', options: defaultOptions, answerIndex: 0 } : {}),
      },
    );
    state.questionId = created.id;
    await loadTopics();
  });
}

function setQuestionType(questionType) {
  const current = question();
  if (!current) return;
  current.questionType = questionType;
  if (questionType === 'shortConversation') {
    current.mode = 'Hội thoại ngắn';
    current.prompt = current.prompt || 'Hai người nói chuyện ở đâu?';
    current.options = Array.from({ length: 3 }, (_, index) => arrayOf(current.options)[index] || `Đáp án ${String.fromCharCode(65 + index)}`);
    current.optionImages = [];
    current.audioItems = [];
    current.answerIndex = Math.min(Number(current.answerIndex) || 0, 2);
  }
  if (questionType === 'trueFalse') {
    current.options = ['Đúng', 'Sai'];
    current.answerIndex = 0;
  }
  if (questionType === 'image' || questionType === 'multiAudio') {
    const optionCount = questionType === 'multiAudio' ? 5 : 4;
    current.options = Array.from({ length: optionCount }, (_, index) => arrayOf(current.options)[index] || `Đáp án ${String.fromCharCode(65 + index)}`);
    current.optionImages = optionImagesOf(current);
  }
  if (questionType === 'multiAudio') {
    current.audioItems = audioItemsOf(current);
  }
  render();
}

async function saveQuestion() {
  if (!question()) return;
  const currentQuestion = question();
  const questionType = currentQuestion.questionType || 'trueFalse';
  const isImageQuestion = isImageChoiceQuestion(currentQuestion);
  const isShortConversation = questionType === 'shortConversation';
  let options = isImageQuestion
    ? Array.from({ length: optionCountOf(currentQuestion) }, (_, index) => value(`q-option-label-${index}`) || `Đáp án ${String.fromCharCode(65 + index)}`)
    : value('q-options')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean);
  if (isShortConversation) {
    options = Array.from({ length: 3 }, (_, index) => value(`q-short-option-${index}`) || `Đáp án ${String.fromCharCode(65 + index)}`);
  }
  const audioItems = questionType === 'multiAudio'
    ? Array.from({ length: 5 }, (_, index) => ({
        url: value(`q-audio-url-${index}`),
        fileName: value(`q-audio-name-${index}`),
        answerIndex: Math.max(0, Math.min(options.length - 1, Number(value(`q-audio-answer-${index}`)) || 0)),
      })).filter((item) => item.url)
    : audioItemsOf(currentQuestion);
  const body = {
    title: value('q-title'),
    questionType,
    mode: value('q-mode'),
    text: value('q-text'),
    pinyin: value('q-pinyin'),
    keyword: value('q-keyword'),
    answerIndex: Math.max(0, Math.min(options.length - 1, Number(value('q-answer')) - 1)),
    prompt: value('q-prompt'),
    vietnamese: value('q-vietnamese'),
    imageUrl: value('q-image-url'),
    imageAlt: value('q-image-alt'),
    optionImages: isImageQuestion ? Array.from({ length: optionCountOf(currentQuestion) }, (_, index) => value(`q-option-image-${index}`)) : optionImagesOf(currentQuestion),
    options,
    audioItems,
    audioUrl: questionType === 'multiAudio' ? '' : currentQuestion.audioUrl,
    audioFileName: questionType === 'multiAudio' ? '' : currentQuestion.audioFileName,
  };
  return withLoading('save-question', () =>
    mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/questions/${state.questionId}`, 'PATCH', body),
  );
}

async function uploadQuestionAudioAtIndex(index) {
  if (!question()) return;
  const input = document.getElementById(`q-audio-file-${index}`);
  const file = input?.files?.[0];
  if (!file) {
    showToast(t('chooseAudioFirst'));
    render();
    return;
  }

  return withLoading(`upload-audio-${index}`, async () => {
    const formData = new FormData();
    formData.append('audio', file);
    const response = await fetch(
      `${apiBase}/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/questions/${state.questionId}/audios/${index}`,
      {
        method: 'POST',
        body: formData,
      },
    );
    if (!response.ok) {
      const errorText = await response.text();
      showToast(response.status === 404 ? t('staleUploadRoute') : t('uploadFailed'));
      throw new Error(errorText);
    }
    await loadTopics();
    showToast(t('uploadedAudio'));
  });
}

async function uploadQuestionImage() {
  if (!question()) return;
  const input = document.getElementById('q-image-file');
  const file = input?.files?.[0];
  if (!file) {
    showToast('Vui lòng chọn ảnh trước');
    render();
    return;
  }

  return withLoading('upload-question-image', async () => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch(
      `${apiBase}/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/questions/${state.questionId}/option-images/0`,
      {
        method: 'POST',
        body: formData,
      },
    );
    if (!response.ok) {
      const errorText = await response.text();
      showToast(t('uploadFailed'));
      throw new Error(errorText);
    }
    await loadTopics();
    showToast('Đã tải ảnh');
  });
}

function clearQuestionAudioAtIndex(index) {
  const current = question();
  if (!current) return;
  const items = Array.from({ length: 5 }, (_, itemIndex) => audioItemsOf(current)[itemIndex] || { url: '', fileName: '' });
  items[index] = { url: '', fileName: '' };
  current.audioItems = items.filter((item) => item.url);
  render();
}

function chooseNextQuestionAudioFile() {
  const current = question();
  if (!current) return;
  const index = Math.min(audioItemsOf(current).length, 4);
  document.getElementById(`q-audio-file-${index}`)?.click();
}

function chooseNextQuestionImageFile() {
  const current = question();
  if (!current) return;
  const images = optionImagesOf(current);
  const emptyIndex = images.findIndex((image) => !image);
  const index = emptyIndex === -1 ? 0 : emptyIndex;
  document.getElementById(`q-option-file-${index}`)?.click();
}

function multiAudioAnswerIndex(item, audioIndex = state.multiAudioActiveIndex) {
  const audio = audioItemsOf(item)[audioIndex];
  return Number.isFinite(Number(audio?.answerIndex)) ? Number(audio.answerIndex) : Number(item?.answerIndex || 0);
}

function selectMultiAudioIndex(index) {
  state.multiAudioActiveIndex = Math.max(0, Math.min(4, Number(index) || 0));
  render();
}

function stopQuestionAudioPreview() {
  if (state.previewAudioElement) {
    state.previewAudioElement.pause();
    state.previewAudioElement = null;
  }
  state.previewAudioTrackKey = '';
  render();
}

function toggleQuestionAudioAtIndex(index) {
  const current = question();
  if (!current) return;
  const audio = audioItemsOf(current)[index];
  if (!audio?.url) {
    showToast(t('noAudio'));
    render();
    return;
  }
  const trackKey = `${current.id || state.questionId}:${index}:${audio.url}`;
  if (state.previewAudioElement && state.previewAudioTrackKey === trackKey) {
    stopQuestionAudioPreview();
    return;
  }
  if (state.previewAudioElement) {
    state.previewAudioElement.pause();
  }
  const player = new Audio(audio.url);
  state.previewAudioElement = player;
  state.previewAudioTrackKey = trackKey;
  player.onended = () => {
    state.previewAudioElement = null;
    state.previewAudioTrackKey = '';
    render();
  };
  player.onerror = () => {
    state.previewAudioElement = null;
    state.previewAudioTrackKey = '';
    showToast(t('audioLoadError') || 'Không phát được audio');
    render();
  };
  player.play().catch(() => {
    state.previewAudioElement = null;
    state.previewAudioTrackKey = '';
    showToast(t('audioLoadError') || 'Không phát được audio');
    render();
  });
  render();
}

function questionTypeTabs(item) {
  const type = item?.questionType || 'trueFalse';
  return `
    <div class="question-type-tabs question-type-tabs-four">
      <button type="button" class="${type === 'trueFalse' ? 'active' : ''}" onclick="setQuestionType('trueFalse')">Đúng sai</button>
      <button type="button" class="${type === 'image' ? 'active' : ''}" onclick="setQuestionType('image')">Hình ảnh</button>
      <button type="button" class="${type === 'multiAudio' ? 'active' : ''}" onclick="setQuestionType('multiAudio')">Nhiều Audio</button>
      <button type="button" class="${type === 'shortConversation' ? 'active' : ''}" onclick="setQuestionType('shortConversation')">Hội thoại ngắn</button>
    </div>
  `;
}

function questionCreatePicker(currentDay) {
  const selectedType = state.createQuestionType || 'image';
  return `
    <div class="question-create-box">
      <div class="section-title">${t('questionType')}</div>
      <div class="question-create-options question-create-options-four">
        <button type="button" class="${selectedType === 'image' ? 'active' : ''}" onclick="selectCreateQuestionType('image')" ${currentDay ? '' : 'disabled'}>
          <strong>${t('imageQuestion')}</strong>
          <span>${t('imageQuestionHint')}</span>
        </button>
        <button type="button" class="${selectedType === 'multiAudio' ? 'active' : ''}" onclick="selectCreateQuestionType('multiAudio')" ${currentDay ? '' : 'disabled'}>
          <strong>Nhiều Audio</strong>
          <span>Thêm 1-5 audio và chọn 1 hình đúng.</span>
        </button>
        <button type="button" class="${selectedType === 'shortConversation' ? 'active' : ''}" onclick="selectCreateQuestionType('shortConversation')" ${currentDay ? '' : 'disabled'}>
          <strong>Hội thoại ngắn</strong>
          <span>Tải audio, nhập câu hỏi và 3 đáp án.</span>
        </button>
        <button type="button" class="${selectedType === 'trueFalse' ? 'active' : ''}" onclick="selectCreateQuestionType('trueFalse')" ${currentDay ? '' : 'disabled'}>
          <strong>${t('trueFalseQuestion')}</strong>
          <span>${t('trueFalseQuestionHint')}</span>
        </button>
      </div>
      <button class="btn primary ${isLoading(`create-question-${selectedType}`) ? 'loading' : ''}" onclick="createQuestion()" ${loadingAttrs(`create-question-${selectedType}`)} ${currentDay ? '' : 'disabled'}>
        ${loadingIcon(`create-question-${selectedType}`, 'plus')} ${t('createQuestion')}
      </button>
    </div>
  `;
}

function audioListFields(item) {
  const items = audioItemsOf(item);
  const activeIndex = Math.max(0, Math.min(4, Number(state.multiAudioActiveIndex) || 0));
  return `
    <section class="multi-audio-admin" style="grid-column:1 / -1">
      <div class="section-head-inline">
        <div>
          <div class="section-title">Danh sách audio</div>
          <p class="muted">Thêm từ 1 đến 5 audio. Hệ thống sẽ phát ngẫu nhiên 1 audio.</p>
        </div>
        <button type="button" class="btn primary" onclick="chooseNextQuestionAudioFile()">${icon('plus', 15)} Thêm audio</button>
      </div>
      <div class="multi-audio-list">
        ${Array.from({ length: 5 }, (_, index) => {
          const audio = items[index] || { url: '', fileName: '' };
          const answerIndex = Number.isFinite(Number(audio.answerIndex)) ? Number(audio.answerIndex) : Number(item.answerIndex || 0);
          const audioTrackKey = `${item.id || state.questionId}:${index}:${audio.url}`;
          const isPlaying = audio.url && state.previewAudioTrackKey === audioTrackKey;
          return `
            <div class="multi-audio-row ${index === activeIndex ? 'active' : ''}" onclick="selectMultiAudioIndex(${index})">
              <span class="drag-handle">${icon('grip-vertical', 15)}</span>
              <strong>${index + 1}.</strong>
              <button type="button" class="audio-row-play ${isPlaying ? 'active' : ''}" onclick="event.stopPropagation(); toggleQuestionAudioAtIndex(${index})" ${audio.url ? '' : 'disabled'}>${icon(isPlaying ? 'pause' : 'play', 15)}</button>
              <span class="audio-row-wave ${isPlaying ? 'active' : ''}"></span>
              <span class="audio-row-duration">${audio.url ? '00:34' : '--:--'}</span>
              <span class="audio-answer-pill">Đáp án ${String.fromCharCode(65 + answerIndex)}</span>
              <input id="q-audio-url-${index}" type="hidden" value="${escapeAttr(audio.url)}" />
              <input id="q-audio-name-${index}" type="hidden" value="${escapeAttr(audio.fileName || '')}" />
              <input id="q-audio-answer-${index}" type="hidden" value="${answerIndex}" />
              <label class="audio-file-label" onclick="event.stopPropagation()">
                ${icon('pencil', 15)}
                <input id="q-audio-file-${index}" type="file" accept="audio/*" onchange="uploadQuestionAudioAtIndex(${index})" />
              </label>
              <button type="button" class="icon-btn ${isLoading(`upload-audio-${index}`) ? 'loading' : ''}" onclick="event.stopPropagation(); uploadQuestionAudioAtIndex(${index})" ${loadingAttrs(`upload-audio-${index}`)} title="Tải audio">${loadingIcon(`upload-audio-${index}`, 'save')}</button>
              <button type="button" class="icon-btn" onclick="event.stopPropagation(); clearQuestionAudioAtIndex(${index})" title="Xóa audio">${icon('trash', 15)}</button>
            </div>
          `;
        }).join('')}
      </div>
      <p class="muted">Lưu ý: Tối đa 5 audio, mỗi audio tối đa 60 giây, định dạng MP3, WAV.</p>
    </section>
  `;
}

function optionImageFields(item, options) {
  const images = optionImagesOf(item);
  const activeAudioIndex = Math.max(0, Math.min(4, Number(state.multiAudioActiveIndex) || 0));
  const activeAnswerIndex = item.questionType === 'multiAudio' ? multiAudioAnswerIndex(item, activeAudioIndex) : item.answerIndex;
  return `
    <section class="option-image-admin" style="grid-column:1 / -1">
      <div class="section-head-inline">
        <div>
          <div class="section-title">${item.questionType === 'multiAudio' ? 'Đáp án (hình ảnh)' : t('optionImages')}</div>
          <p class="muted">Thêm từ 2 đến ${optionCountOf(item)} hình ảnh. Chọn 1 hình đúng.</p>
        </div>
        <button type="button" class="btn primary" onclick="chooseNextQuestionImageFile()">${icon('plus', 15)} Thêm hình ảnh</button>
      </div>
      <div class="option-image-grid ${item.questionType === 'multiAudio' ? 'option-image-grid-five' : ''}">
        ${Array.from({ length: optionCountOf(item) }, (_, index) => `
          <div class="option-image-card ${activeAnswerIndex === index ? 'correct' : ''}">
            <div class="option-image-head">
              <span>${String.fromCharCode(65 + index)}</span>
              <label class="answer-radio">
                <input type="radio" name="q-answer-radio" ${activeAnswerIndex === index ? 'checked' : ''} onchange="setAnswerIndex(${index})" />
                Đúng
              </label>
            </div>
            <div class="option-image-preview">
              ${
                images[index]
                  ? `<img src="${escapeAttr(images[index])}" alt="${escapeAttr(options[index] || `Đáp án ${String.fromCharCode(65 + index)}`)}" />`
                  : `<div class="image-placeholder">${icon('image', 24)}<span>Ảnh ${String.fromCharCode(65 + index)}</span></div>`
              }
            </div>
            <label>Đáp án ${String.fromCharCode(65 + index)}
              <input id="q-option-label-${index}" type="text" value="${escapeAttr(options[index] || '')}" />
            </label>
            <label>URL ảnh ${String.fromCharCode(65 + index)}
              <input id="q-option-image-${index}" type="url" value="${escapeAttr(images[index])}" placeholder="https://..." />
            </label>
            <label>File ảnh
              <input id="q-option-file-${index}" type="file" accept="image/*" />
            </label>
            <button type="button" class="btn ${isLoading(`upload-image-${index}`) ? 'loading' : ''}" onclick="uploadQuestionOptionImage(${index})" ${loadingAttrs(`upload-image-${index}`)}>
              ${loadingIcon(`upload-image-${index}`, 'save')} ${t('uploadImage')} ${String.fromCharCode(65 + index)}
            </button>
          </div>
        `).join('')}
      </div>
      <p class="muted">Đáp án đúng: ${String.fromCharCode(65 + (Number(item.answerIndex) || 0))}</p>
    </section>
  `;
}

function questionForm(item) {
  if (!item) return `<div class="empty">${t('chooseOrCreateQuestion')}</div>`;
  const questionType = item.questionType || 'trueFalse';
  const isImageQuestion = isImageChoiceQuestion(item);
  const options = isImageQuestion ? imageChoiceOptions(item) : arrayOf(item.options);
  if (questionType === 'shortConversation') {
    return `
      <form id="question-form" class="form-grid short-conversation-form">
        <div style="grid-column:1 / -1">${questionTypeTabs(item)}</div>
        ${input('q-title', t('questionName'), item.title)}
        ${shortConversationFields(item)}
        <label style="grid-column:1 / -1">${t('questionAudio')}
          <input id="q-audio" type="file" accept="audio/*" />
        </label>
        <div style="grid-column:1 / -1">
          ${
            item.audioUrl
              ? `<audio controls src="${item.audioUrl}" style="width:100%;height:38px"></audio><p class="muted" style="margin:6px 0 0">${item.audioFileName || item.audioUrl}</p>`
              : `<p class="muted" style="margin:0">${t('noAudio')}</p>`
          }
        </div>
        <div class="form-actions" style="grid-column:1 / -1">
          <button type="button" class="btn primary ${isLoading('save-question') ? 'loading' : ''}" onclick="saveQuestion()" ${loadingAttrs('save-question')}>${loadingIcon('save-question', 'save')} ${t('saveQuestion')}</button>
          <button type="button" class="btn ${isLoading('upload-audio') ? 'loading' : ''}" onclick="uploadQuestionAudio()" ${loadingAttrs('upload-audio')}>${loadingIcon('upload-audio', 'save')} ${t('uploadAudio')}</button>
          <button type="button" class="btn danger ${isLoading('delete-question') ? 'loading' : ''}" onclick="deleteQuestion()" ${loadingAttrs('delete-question')}>${loadingIcon('delete-question', 'trash')} ${t('deleteQuestion')}</button>
        </div>
      </form>
    `;
  }
  return `
    <form id="question-form" class="form-grid ${isImageQuestion ? 'image-question-form' : ''}">
      <div style="grid-column:1 / -1">${questionTypeTabs(item)}</div>
      ${input('q-title', t('questionName'), item.title)}
      ${input('q-mode', t('questionMode'), item.mode)}
      ${questionType === 'multiAudio' ? audioListFields(item) : ''}
      ${questionType === 'trueFalse' ? trueFalseImageFields(item) : ''}
      ${isImageQuestion ? optionImageFields(item, options) : ''}
      ${input('q-text', 'Nội dung nghe/đáp án', item.text)}
      ${input('q-pinyin', 'Pinyin', item.pinyin)}
      ${input('q-keyword', t('keyword'), item.keyword)}
      ${input('q-answer', t('correctAnswer'), String(item.answerIndex + 1), 'number')}
      ${textarea('q-prompt', t('visiblePrompt'), item.prompt)}
      ${textarea('q-vietnamese', t('vietnameseMeaning'), item.vietnamese)}
      ${
        isImageQuestion
          ? `<input id="q-image-url" type="hidden" value="${escapeAttr(item.imageUrl || '')}" /><input id="q-image-alt" type="hidden" value="${escapeAttr(item.imageAlt || '')}" /><textarea id="q-options" style="display:none">${escapeHtml(options.join('\n'))}</textarea>`
          : textarea('q-options', t('options'), options.join('\n'))
      }
      ${
        questionType !== 'multiAudio'
          ? `
            <label style="grid-column:1 / -1">${t('questionAudio')}
              <input id="q-audio" type="file" accept="audio/*" />
            </label>
            <div style="grid-column:1 / -1">
              ${
                item.audioUrl
                  ? `<audio controls src="${item.audioUrl}" style="width:100%;height:38px"></audio><p class="muted" style="margin:6px 0 0">${item.audioFileName || item.audioUrl}</p>`
                  : `<p class="muted" style="margin:0">${t('noAudio')}</p>`
              }
            </div>
          `
          : ''
      }
      <div class="form-actions" style="grid-column:1 / -1">
        <button type="button" class="btn primary ${isLoading('save-question') ? 'loading' : ''}" onclick="saveQuestion()" ${loadingAttrs('save-question')}>${loadingIcon('save-question', 'save')} ${t('saveQuestion')}</button>
        ${
          questionType !== 'multiAudio'
            ? `<button type="button" class="btn ${isLoading('upload-audio') ? 'loading' : ''}" onclick="uploadQuestionAudio()" ${loadingAttrs('upload-audio')}>${loadingIcon('upload-audio', 'save')} ${t('uploadAudio')}</button>`
            : ''
        }
        <button type="button" class="btn danger ${isLoading('delete-question') ? 'loading' : ''}" onclick="deleteQuestion()" ${loadingAttrs('delete-question')}>${loadingIcon('delete-question', 'trash')} ${t('deleteQuestion')}</button>
      </div>
    </form>
  `;
}

function previewChoiceCard(item, index, options, images) {
  const label = options[index] || `Dap an ${String.fromCharCode(65 + index)}`;
  const image = images[index];
  const isCorrect = item?.answerIndex === index;
  return `
    <div class="choice-card ${isCorrect ? 'correct' : ''}">
      <span class="choice-letter">${String.fromCharCode(65 + index)}</span>
      ${image ? `<img src="${escapeAttr(image)}" alt="${escapeAttr(label)}" />` : `<div class="choice-label">${escapeHtml(label)}</div>`}
      ${isCorrect ? `<span class="choice-check">${icon('check', 14)}</span>` : ''}
    </div>
  `;
}

function studentPreview(item) {
  if (!item) {
    return `
      <section class="preview-card">
        <h3>Xem truoc giao dien hoc vien</h3>
        <div class="empty">Chon hoac tao cau hoi de xem preview.</div>
      </section>
    `;
  }
  const questionType = item.questionType || 'trueFalse';
  const isImageQuestion = isImageChoiceQuestion(item);
  const options = isImageQuestion ? imageChoiceOptions(item) : arrayOf(item.options);
  const images = optionImagesOf(item);
  const optionCount = isImageQuestion ? optionCountOf(item) : Math.max(options.length, 2);
  const audioCount = questionType === 'multiAudio' ? Math.max(audioItemsOf(item).length, 1) : 1;
  return `
    <section class="preview-card">
      <h3>Xem truoc giao dien hoc vien</h3>
      <div class="student-frame">
        <p>${escapeHtml(item.prompt || 'Nghe doan am thanh va chon dap an dung')}</p>
        <div class="audio-preview">
          <span class="audio-play">${icon('volume-2', 18)}</span>
          <span class="wave"></span>
          <span class="muted">00:00 / 00:34</span>
        </div>
        <div class="choice-grid ${questionType === 'shortConversation' ? 'short-choice-grid' : ''}">
          ${Array.from({ length: optionCount }, (_, index) => previewChoiceCard(item, index, options, images)).join('')}
        </div>
        ${
          questionType === 'multiAudio'
            ? `<div class="preview-note">${icon('info', 15)} Học viên sẽ nghe ngẫu nhiên 1 audio trong danh sách ${audioCount} audio ở bên.</div>`
            : `<div class="preview-note">${icon('info', 15)} Học viên sẽ nghe ngẫu nhiên một audio trong danh sách của ngày học.</div>`
        }
      </div>
    </section>
  `;
}

Object.assign(window, {
  createTopic,
  saveTopic,
  deleteTopic,
  createSection,
  createLevel,
  saveLevel,
  deleteLevel,
  moveLevel,
  saveSection,
  deleteSection,
  moveSection,
  createLesson,
  saveLesson,
  deleteLesson,
  moveLesson,
  createDay,
  saveDay,
  deleteDay,
  moveDay,
  createQuestion,
  saveQuestion,
  uploadQuestionAudio,
  uploadQuestionAudioAtIndex,
  uploadQuestionImage,
  clearQuestionAudioAtIndex,
  toggleQuestionAudioAtIndex,
  stopQuestionAudioPreview,
  chooseNextQuestionAudioFile,
  chooseNextQuestionImageFile,
  uploadQuestionOptionImage,
  deleteQuestion,
  selectTopic,
  selectLevel,
  selectSection,
  selectLesson,
  selectDay,
  selectQuestion,
  selectCreateQuestionType,
  setQuestionType,
  setAnswerIndex,
  selectMultiAudioIndex,
  toggleTopicMetricsList,
  selectTopicFromMetrics,
  refreshData,
  toggleAdminLanguage,
});

init().catch((error) => {
  mount(`<div class="empty">Không tải được trang admin: ${escapeHtml(error.message)}</div>`);
});
