const apiBase = '/api/listening';

const state = {
  topics: [],
  topicId: null,
  levelId: null,
  sectionId: null,
  lessonId: null,
  questionId: null,
  toast: '',
  loadingAction: '',
  locale: 'vi',
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
    state.sectionId = level()?.sections[0]?.id || null;
  }
  if (!state.lessonId || !lesson()) {
    state.lessonId = section()?.lessons[0]?.id || null;
  }
  if (!state.questionId || !question()) {
    state.questionId = lesson()?.tracks[0]?.id || null;
  }
}

function topic() {
  return state.topics.find((item) => item.id === state.topicId);
}

function levelsOf(item) {
  if (item?.levels?.length) {
    return item.levels;
  }
  return [
    {
      id: `${item?.id || 'topic'}-default-level`,
      title: item?.id === 'hsk' ? 'HSK3' : 'Cơ bản',
      description: item?.subtitle || '',
      sections: item?.sections || [],
    },
  ];
}

function level() {
  return levelsOf(topic()).find((item) => item.id === state.levelId) || levelsOf(topic())[0];
}

function section() {
  return level()?.sections.find((item) => item.id === state.sectionId);
}

function lesson() {
  return section()?.lessons.find((item) => item.id === state.lessonId);
}

function question() {
  return lesson()?.tracks.find((item) => item.id === state.questionId);
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
  state.sectionId = level()?.sections[0]?.id || null;
  state.lessonId = section()?.lessons[0]?.id || null;
  state.questionId = lesson()?.tracks[0]?.id || null;
  render();
}

function selectLevel(id) {
  state.levelId = id;
  state.sectionId = level()?.sections[0]?.id || null;
  state.lessonId = section()?.lessons[0]?.id || null;
  state.questionId = lesson()?.tracks[0]?.id || null;
  render();
}

function selectSection(id) {
  state.sectionId = id;
  state.lessonId = section()?.lessons[0]?.id || null;
  state.questionId = lesson()?.tracks[0]?.id || null;
  render();
}

function selectLesson(id) {
  state.lessonId = id;
  state.questionId = lesson()?.tracks[0]?.id || null;
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
              <button class="btn ${isLoading('create-level') ? 'loading' : ''}" onclick="createLevel()" ${loadingAttrs('create-level')}>${loadingIcon('create-level', 'plus')} Cấp độ</button>
              <button class="btn ${isLoading('create-section') ? 'loading' : ''}" onclick="createSection()" ${loadingAttrs('create-section')}>${loadingIcon('create-section', 'plus')} ${t('route')}</button>
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
            <button class="btn ${isLoading('create-lesson') ? 'loading' : ''}" onclick="createLesson()" ${loadingAttrs('create-lesson')}>${loadingIcon('create-lesson', 'plus')} ${t('lessonSet')}</button>
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
  const routeCount = levelsOf(item).reduce((total, current) => total + current.sections.length, 0);
  return `
    <button class="topic-item ${item.id === state.topicId ? 'active' : ''}" onclick="selectTopic('${item.id}')">
      <span><strong>${item.title}</strong><span class="muted">${levelsOf(item).length} cấp độ · ${routeCount} ${t('routes')}</span></span>
      <span class="pill">${item.icon}</span>
    </button>
  `;
}

function levelButton(item) {
  return `
    <button class="row-item ${item.id === state.levelId ? 'active' : ''}" onclick="selectLevel('${item.id}')">
      <span><strong>${item.title}</strong><span class="muted">${item.sections.length} ${t('routes')}</span></span>
      <span class="pill">${item.sections.length}</span>
    </button>
  `;
}

function sectionButton(item) {
  return `
    <button class="row-item ${item.id === state.sectionId ? 'active' : ''}" onclick="selectSection('${item.id}')">
      <span><strong>${item.title}</strong><span class="muted">${item.lessons.length} ${t('lessonSets')}</span></span>
      <span class="pill">${item.icon}</span>
    </button>
  `;
}

function lessonButton(item) {
  return `
    <button class="row-item ${item.id === state.lessonId ? 'active' : ''}" onclick="selectLesson('${item.id}')">
      <span><strong>${item.title}</strong><span class="muted">${item.level} · ${item.tracks.length} ${t('sentences')}</span></span>
      <span class="pill">${item.tracks.length}</span>
    </button>
  `;
}

function questionButton(item, index) {
  return `
    <button class="row-item ${item.id === state.questionId ? 'active' : ''}" onclick="selectQuestion('${item.id}')">
      <span><strong>${index + 1}. ${item.title}</strong><span class="muted">${item.mode} · ${item.keyword}${item.audioUrl ? ` · ${t('hasAudio')}` : ''}</span></span>
      <span class="pill">${item.audioUrl ? t('audio') : item.answerIndex + 1}</span>
    </button>
  `;
}

function metrics() {
  const topics = state.topics.length;
  const levels = state.topics.flatMap((item) => levelsOf(item));
  const sections = levels.flatMap((item) => item.sections).length;
  const lessons = levels.flatMap((item) => item.sections).flatMap((item) => item.lessons).length;
  const questions = state.topics
    .flatMap((item) => levelsOf(item))
    .flatMap((item) => item.sections)
    .flatMap((item) => item.lessons)
    .flatMap((item) => item.tracks).length;

  return `
    <div class="metric-grid">
      <div class="metric"><span>${t('topics')}</span><strong>${topics}</strong></div>
      <div class="metric"><span>Cấp độ</span><strong>${levels.length}</strong></div>
      <div class="metric"><span>${t('routes')}</span><strong>${sections}</strong></div>
      <div class="metric"><span>${t('lessonSets')}</span><strong>${lessons}</strong></div>
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
      ${input('q-answer', t('correctAnswer'), String(item.answerIndex + 1), 'number')}
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
    state.sectionId = level()?.sections[0]?.id || null;
    state.lessonId = null;
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
    state.sectionId = level()?.sections[0]?.id || null;
    state.lessonId = section()?.lessons[0]?.id || null;
    state.questionId = lesson()?.tracks[0]?.id || null;
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
    state.sectionId = level()?.sections[0]?.id || null;
    await loadTopics();
  });
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
    state.lessonId = section()?.lessons[0]?.id || null;
    await loadTopics();
  });
}

async function createQuestion() {
  if (!lesson()) return;
  return withLoading('create-question', async () => {
    const created = await mutate(`/topics/${state.topicId}/sections/${state.sectionId}/lessons/${state.lessonId}/questions`, 'POST', {
      title: `${t('numberedQuestion')} ${lesson().tracks.length + 1}`,
    });
    state.questionId = created.id;
    await loadTopics();
  });
}

async function saveQuestion() {
  if (!question()) return;
  const options = value('q-options')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
  const body = {
    title: value('q-title'),
    mode: value('q-mode'),
    text: value('q-text'),
    pinyin: value('q-pinyin'),
    keyword: value('q-keyword'),
    answerIndex: Math.max(0, Number(value('q-answer')) - 1),
    prompt: value('q-prompt'),
    vietnamese: value('q-vietnamese'),
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

Object.assign(window, {
  createTopic,
  saveTopic,
  deleteTopic,
  createSection,
  createLevel,
  saveLevel,
  deleteLevel,
  saveSection,
  deleteSection,
  createLesson,
  saveLesson,
  deleteLesson,
  createQuestion,
  saveQuestion,
  uploadQuestionAudio,
  deleteQuestion,
  selectTopic,
  selectLevel,
  selectSection,
  selectLesson,
  selectQuestion,
  refreshData,
  toggleAdminLanguage,
});

init().catch((error) => {
  mount(`<div class="empty">Không tải được trang admin: ${escapeHtml(error.message)}</div>`);
});
