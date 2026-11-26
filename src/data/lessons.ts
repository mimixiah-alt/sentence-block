export type BlockType = 'N' | 'P' | 'V';

export type LanguageCode = 'en' | 'ja' | 'zh' | 'es' | 'fr' | 'hi';

export interface LanguageOption {
  code: LanguageCode;
  flag: string;
  label: string;
}

export const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'ja', flag: '🇯🇵', label: '日本語' },
  { code: 'zh', flag: '🇨🇳', label: '中文' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'hi', flag: '🇮🇳', label: 'हिन्दी' },
];

export interface WordBlock {
  text: string;
  type: BlockType;
}

export interface SentenceQuestion {
  id: number;
  emoji: string;
  meanings: Record<LanguageCode, string>;
  sentence: string;
  acceptableAnswers?: string[];
  answerBlocks: WordBlock[];
  decoyBlock: WordBlock;
}

export interface GrammarFormItem {
  condition: string;
  example: string;
}

export interface GrammarPoint {
  name: string;
  meaning: string;
  forms: GrammarFormItem[];
  mainExamples: string[];
  extraExamples: string[];
}

export interface Lesson {
  id: number;
  label: string;
  title: string;
  grammarPoints: GrammarPoint[];
  questions: SentenceQuestion[];
}

export const LESSONS: Lesson[] = [
  {
    id: 1,
    label: '1과',
    title: '저는 한국 사람이에요',
    grammarPoints: [
      {
        name: '이다 (이에요/예요)',
        meaning: '명사 뒤에 붙어서 명사를 설명합니다.',
        forms: [
          { condition: '받침 있음 (O)', example: '사람 → 사람이에요' },
          { condition: '받침 없음 (X)', example: '리사 → 리사예요' },
        ],
        mainExamples: ['저는 베트남 사람이에요.'],
        extraExamples: ['저는 지훈이에요.', '저는 선생님이에요.'],
      },
      {
        name: '은/는',
        meaning: '문장에서 주제를 말합니다.',
        forms: [
          { condition: '받침 있음 (O)', example: '선생님 → 선생님은' },
          { condition: '받침 없음 (X)', example: '저 → 저는' },
        ],
        mainExamples: ['쯔엉은 학생이에요.'],
        extraExamples: [
          '리사 씨는 학생이에요?',
          '지훈 씨는 어느 나라 사람이에요?',
        ],
      },
    ],
    questions: [
      {
        id: 101,
        emoji: '🇻🇳',
        meanings: {
          en: 'I am Vietnamese.',
          ja: '私はベトナム人です。',
          zh: '我是越南人。',
          es: 'Soy vietnamita.',
          fr: 'Je suis vietnamien(ne).',
          hi: 'मैं वियतनामी हूँ।',
        },
        sentence: '저는 베트남 사람이에요.',
        answerBlocks: [
          { text: '저', type: 'N' },
          { text: '는', type: 'P' },
          { text: '베트남 사람', type: 'N' },
          { text: '이에요', type: 'P' },
        ],
        decoyBlock: { text: '은', type: 'P' },
      },
      {
        id: 102,
        emoji: '🎒',
        meanings: {
          en: 'Truong is a student.',
          ja: 'チュオンさんは学生です。',
          zh: '张先生是学生。',
          es: 'Truong es estudiante.',
          fr: 'Truong est étudiant.',
          hi: 'त्रुओंग छात्र है।',
        },
        sentence: '쯔엉 씨는 학생이에요.',
        answerBlocks: [
          { text: '쯔엉 씨', type: 'N' },
          { text: '는', type: 'P' },
          { text: '학생', type: 'N' },
          { text: '이에요', type: 'P' },
        ],
        decoyBlock: { text: '예요', type: 'P' },
      },
      {
        id: 103,
        emoji: '🙋‍♀️',
        meanings: {
          en: 'I am Lisa.',
          ja: '私はリサです。',
          zh: '我是丽莎。',
          es: 'Soy Lisa.',
          fr: 'Je suis Lisa.',
          hi: 'मैं लीसा हूँ।',
        },
        sentence: '저는 리사예요.',
        answerBlocks: [
          { text: '저', type: 'N' },
          { text: '는', type: 'P' },
          { text: '리사', type: 'N' },
          { text: '예요', type: 'P' },
        ],
        decoyBlock: { text: '이에요', type: 'P' },
      },
      {
        id: 104,
        emoji: '🇰🇷',
        meanings: {
          en: 'Jihun is Korean.',
          ja: 'ジフンさんは韓国人です。',
          zh: '智勋是韩国人。',
          es: 'Jihun es coreano.',
          fr: 'Jihun est coréen.',
          hi: 'जीहून कोरियाई है।',
        },
        sentence: '지훈 씨는 한국 사람이에요.',
        answerBlocks: [
          { text: '지훈 씨', type: 'N' },
          { text: '는', type: 'P' },
          { text: '한국 사람', type: 'N' },
          { text: '이에요', type: 'P' },
        ],
        decoyBlock: { text: '은', type: 'P' },
      },
      {
        id: 105,
        emoji: '👩‍🏫',
        meanings: {
          en: 'The teacher is American.',
          ja: '先生はアメリカ人です。',
          zh: '老师是美国人。',
          es: 'El profesor es estadounidense.',
          fr: 'Le professeur est américain.',
          hi: 'शिक्षक अमेरिकी हैं।',
        },
        sentence: '선생님은 미국 사람이에요.',
        answerBlocks: [
          { text: '선생님', type: 'N' },
          { text: '은', type: 'P' },
          { text: '미국 사람', type: 'N' },
          { text: '이에요', type: 'P' },
        ],
        decoyBlock: { text: '는', type: 'P' },
      },
    ],
  },
  {
    id: 2,
    label: '2과',
    title: '회사원이 아니에요',
    grammarPoints: [
      {
        name: '이/가',
        meaning: '문장에서 주어를 말합니다.',
        forms: [
          { condition: '받침 있음 (O)', example: '동생 → 동생이' },
          { condition: '받침 없음 (X)', example: '누나 → 누나가' },
        ],
        mainExamples: ['동생이 학생이에요.'],
        extraExamples: ['이름이 뭐예요?', '어머니가 회사원이에요.'],
      },
      {
        name: '이/가 아니다',
        meaning: '어떤 사실을 부정합니다.',
        forms: [
          { condition: '받침 있음 (O)', example: '사람 → 사람이 아니에요' },
          { condition: '받침 없음 (X)', example: '누나 → 누나가 아니에요' },
        ],
        mainExamples: ['저는 한국 사람이 아니에요. 미국 사람이에요.'],
        extraExamples: ['저는 학생이 아니에요.', '언니가 아니에요.'],
      },
    ],
    questions: [
      {
        id: 201,
        emoji: '🧒',
        meanings: {
          en: 'My younger sibling is a student.',
          ja: '弟(妹)は学生です。',
          zh: '弟弟(妹妹)是学生。',
          es: 'Mi hermano/a menor es estudiante.',
          fr: 'Mon petit frère / Ma petite sœur est étudiant(e).',
          hi: 'मेरा छोटा भाई / मेरी छोटी बहन छात्र है।',
        },
        sentence: '동생이 학생이에요.',
        answerBlocks: [
          { text: '동생', type: 'N' },
          { text: '이', type: 'P' },
          { text: '학생', type: 'N' },
          { text: '이에요', type: 'P' },
        ],
        decoyBlock: { text: '가', type: 'P' },
      },
      {
        id: 202,
        emoji: '👩‍💼',
        meanings: {
          en: 'My older sister is an office worker.',
          ja: '姉は会社員です。',
          zh: '姐姐是公司职员。',
          es: 'Mi hermana mayor es oficinista.',
          fr: 'Ma grande sœur est employée de bureau.',
          hi: 'मेरी बड़ी बहन ऑफ़िस में काम करती है।',
        },
        sentence: '언니가 회사원이에요.',
        answerBlocks: [
          { text: '언니', type: 'N' },
          { text: '가', type: 'P' },
          { text: '회사원', type: 'N' },
          { text: '이에요', type: 'P' },
        ],
        decoyBlock: { text: '이', type: 'P' },
      },
      {
        id: 203,
        emoji: '🙅',
        meanings: {
          en: 'I am not Korean.',
          ja: '私は韓国人ではありません。',
          zh: '我不是韩国人。',
          es: 'No soy coreano/a.',
          fr: 'Je ne suis pas coréen(ne).',
          hi: 'मैं कोरियाई नहीं हूँ।',
        },
        sentence: '저는 한국 사람이 아니에요.',
        answerBlocks: [
          { text: '저', type: 'N' },
          { text: '는', type: 'P' },
          { text: '한국 사람', type: 'N' },
          { text: '이', type: 'P' },
          { text: '아니에요', type: 'V' },
        ],
        decoyBlock: { text: '가', type: 'P' },
      },
      {
        id: 204,
        emoji: '👨‍⚕️',
        meanings: {
          en: 'My older brother is a doctor.',
          ja: '兄は医者です。',
          zh: '哥哥是医生。',
          es: 'Mi hermano mayor es médico.',
          fr: 'Mon grand frère est médecin.',
          hi: 'मेरे बड़े भाई डॉक्टर हैं।',
        },
        sentence: '형이 의사예요.',
        answerBlocks: [
          { text: '형', type: 'N' },
          { text: '이', type: 'P' },
          { text: '의사', type: 'N' },
          { text: '예요', type: 'P' },
        ],
        decoyBlock: { text: '가', type: 'P' },
      },
      {
        id: 205,
        emoji: '🎤',
        meanings: {
          en: 'Lisa is not a singer.',
          ja: 'リサさんは歌手ではありません。',
          zh: '丽莎不是歌手。',
          es: 'Lisa no es cantante.',
          fr: "Lisa n'est pas chanteuse.",
          hi: 'लीसा गायिका नहीं है।',
        },
        sentence: '리사 씨는 가수가 아니에요.',
        answerBlocks: [
          { text: '리사 씨', type: 'N' },
          { text: '는', type: 'P' },
          { text: '가수', type: 'N' },
          { text: '가', type: 'P' },
          { text: '아니에요', type: 'V' },
        ],
        decoyBlock: { text: '이', type: 'P' },
      },
    ],
  },
  {
    id: 3,
    label: '3과',
    title: '저도 드라마를 좋아합니다',
    grammarPoints: [
      {
        name: '-습니다, -습니까',
        meaning:
          "동사나 형용사를 격식적인 상황에서 정중하게 말할 때 씁니다. 질문할 때는 '-습니까?'를 씁니다.",
        forms: [
          { condition: '받침 있음 (O)', example: '좋다 → 좋습니다 / 좋습니까?' },
          { condition: '받침 없음 (X)', example: '자다 → 잡니다 / 잡니까?' },
        ],
        mainExamples: ['노래가 좋습니까? 노래가 좋습니다.'],
        extraExamples: ['지금 무엇을 합니까?', '한국 노래를 듣습니다.'],
      },
      {
        name: '을/를',
        meaning: '문장에서 목적어를 말합니다. 동사 앞에 씁니다.',
        forms: [
          { condition: '받침 있음 (O)', example: '밥 → 밥을' },
          { condition: '받침 없음 (X)', example: '노래 → 노래를' },
        ],
        mainExamples: ['저는 밥을 먹습니다.'],
        extraExamples: ['한국 음식을 좋아합니다.', '드라마를 봅니다.'],
      },
      {
        name: '도',
        meaning:
          '어떤 것이 다른 것과 같습니다. 그것 외에 비슷한 것이 있습니다.',
        forms: [
          { condition: '받침 있음 (O)', example: '음식 → 음식도' },
          { condition: '받침 없음 (X)', example: '저 → 저도' },
        ],
        mainExamples: ['한국 노래를 좋아합니다. 한국 음식도 좋아합니다.'],
        extraExamples: [
          '저는 과자도 먹습니다.',
          '수미 씨도 한국 사람이에요.',
        ],
      },
    ],
    questions: [
      {
        id: 301,
        emoji: '🍚',
        meanings: {
          en: 'I eat rice.',
          ja: '私はご飯を食べます。',
          zh: '我吃饭。',
          es: 'Como arroz.',
          fr: 'Je mange du riz.',
          hi: 'मैं चावल खाता/खाती हूँ।',
        },
        sentence: '저는 밥을 먹습니다.',
        answerBlocks: [
          { text: '저', type: 'N' },
          { text: '는', type: 'P' },
          { text: '밥', type: 'N' },
          { text: '을', type: 'P' },
          { text: '먹습니다', type: 'V' },
        ],
        decoyBlock: { text: '를', type: 'P' },
      },
      {
        id: 302,
        emoji: '🎧',
        meanings: {
          en: 'I listen to Korean songs.',
          ja: '韓国の歌を聴きます。',
          zh: '我听韩国歌。',
          es: 'Escucho canciones coreanas.',
          fr: "J'écoute des chansons coréennes.",
          hi: 'मैं कोरियाई गाने सुनता/सुनती हूँ।',
        },
        sentence: '한국 노래를 듣습니다.',
        answerBlocks: [
          { text: '한국 노래', type: 'N' },
          { text: '를', type: 'P' },
          { text: '듣습니다', type: 'V' },
        ],
        decoyBlock: { text: '을', type: 'P' },
      },
      {
        id: 303,
        emoji: '📺',
        meanings: {
          en: 'I like dramas too.',
          ja: '私もドラマが好きです。',
          zh: '我也喜欢电视剧。',
          es: 'A mí también me gustan los dramas.',
          fr: "Moi aussi, j'aime les séries.",
          hi: 'मुझे भी ड्रामा पसंद हैं।',
        },
        sentence: '저도 드라마를 좋아합니다.',
        answerBlocks: [
          { text: '저', type: 'N' },
          { text: '도', type: 'P' },
          { text: '드라마', type: 'N' },
          { text: '를', type: 'P' },
          { text: '좋아합니다', type: 'V' },
        ],
        decoyBlock: { text: '을', type: 'P' },
      },
      {
        id: 304,
        emoji: '🍞',
        meanings: {
          en: 'Lisa eats bread.',
          ja: 'リサさんはパンを食べます。',
          zh: '丽莎吃面包。',
          es: 'Lisa come pan.',
          fr: 'Lisa mange du pain.',
          hi: 'लीसा ब्रेड खाती है।',
        },
        sentence: '리사 씨는 빵을 먹습니다.',
        answerBlocks: [
          { text: '리사 씨', type: 'N' },
          { text: '는', type: 'P' },
          { text: '빵', type: 'N' },
          { text: '을', type: 'P' },
          { text: '먹습니다', type: 'V' },
        ],
        decoyBlock: { text: '를', type: 'P' },
      },
      {
        id: 305,
        emoji: '📖',
        meanings: {
          en: 'Truong is a student too.',
          ja: 'チュオンさんも学生です。',
          zh: '张先生也是学生。',
          es: 'Truong también es estudiante.',
          fr: 'Truong est aussi étudiant.',
          hi: 'त्रुओंग भी छात्र है।',
        },
        sentence: '쯔엉 씨도 학생입니다.',
        answerBlocks: [
          { text: '쯔엉 씨', type: 'N' },
          { text: '도', type: 'P' },
          { text: '학생', type: 'N' },
          { text: '입니다', type: 'P' },
        ],
        decoyBlock: { text: '을', type: 'P' },
      },
    ],
  },
  {
    id: 4,
    label: '4과',
    title: '여기가 지훈 씨의 학교입니까?',
    grammarPoints: [
      {
        name: '과/와, 하고',
        meaning: '여러 사물이나 사람을 함께 말합니다.',
        forms: [
          { condition: '받침 있음 (O)', example: '선생님 → 선생님과, 선생님하고' },
          { condition: '받침 없음 (X)', example: '학교 → 학교와, 학교하고' },
        ],
        mainExamples: [
          '지훈 씨는 형과 누나가 있습니다.',
          '지훈 씨는 형하고 누나가 있습니다.',
        ],
        extraExamples: [
          '한국어와 영어를 공부합니다.',
          '도서관하고 식당이 있습니다.',
        ],
      },
      {
        name: '의',
        meaning:
          '앞 명사가 뒤 명사를 가집니다. 뒤 명사가 앞 명사에 소속됩니다.',
        forms: [
          { condition: '받침 있음 (O)', example: '선생님 → 선생님의' },
          { condition: '받침 없음 (X)', example: '오빠 → 오빠의' },
        ],
        mainExamples: ['선생님의 개가 귀엽습니다.'],
        extraExamples: [
          '오빠의 직업은 가수입니다.',
          '수미 씨의 직업이 뭐예요?',
        ],
      },
    ],
    questions: [
      {
        id: 401,
        emoji: '👨‍👩‍👦',
        meanings: {
          en: 'Jihun has an older brother and an older sister.',
          ja: 'ジフンさんには兄と姉がいます。',
          zh: '智勋有哥哥和姐姐。',
          es: 'Jihun tiene un hermano mayor y una hermana mayor.',
          fr: 'Jihun a un grand frère et une grande sœur.',
          hi: 'जीहून का एक बड़ा भाई और एक बड़ी बहन है।',
        },
        sentence: '지훈 씨는 형과 누나가 있습니다.',
        answerBlocks: [
          { text: '지훈 씨', type: 'N' },
          { text: '는', type: 'P' },
          { text: '형', type: 'N' },
          { text: '과', type: 'P' },
          { text: '누나', type: 'N' },
          { text: '가', type: 'P' },
          { text: '있습니다', type: 'V' },
        ],
        decoyBlock: { text: '와', type: 'P' },
      },
      {
        id: 402,
        emoji: '🏫',
        meanings: {
          en: 'There is a library and a cafeteria.',
          ja: '図書館と食堂があります。',
          zh: '有图书馆和食堂。',
          es: 'Hay una biblioteca y un comedor.',
          fr: 'Il y a une bibliothèque et une cantine.',
          hi: 'पुस्तकालय और कैंटीन है।',
        },
        sentence: '도서관과 식당이 있습니다.',
        answerBlocks: [
          { text: '도서관', type: 'N' },
          { text: '과', type: 'P' },
          { text: '식당', type: 'N' },
          { text: '이', type: 'P' },
          { text: '있습니다', type: 'V' },
        ],
        decoyBlock: { text: '와', type: 'P' },
      },
      {
        id: 403,
        emoji: '🤝',
        meanings: {
          en: 'I meet Natasha and Lisa.',
          ja: '私はナターシャさんとリサさんに会います。',
          zh: '我见娜塔莎和丽莎。',
          es: 'Me encuentro con Natasha y Lisa.',
          fr: 'Je rencontre Natasha et Lisa.',
          hi: 'मैं नताशा और लीसा से मिलता/मिलती हूँ।',
        },
        sentence: '저는 나타샤 씨하고 리사 씨를 만납니다.',
        acceptableAnswers: ['저는 리사 씨하고 나타샤 씨를 만납니다.'],
        answerBlocks: [
          { text: '저', type: 'N' },
          { text: '는', type: 'P' },
          { text: '나타샤 씨', type: 'N' },
          { text: '하고', type: 'P' },
          { text: '리사 씨', type: 'N' },
          { text: '를', type: 'P' },
          { text: '만납니다', type: 'V' },
        ],
        decoyBlock: { text: '과', type: 'P' },
      },
      {
        id: 404,
        emoji: '🐶',
        meanings: {
          en: "The teacher's dog is cute.",
          ja: '先生の犬はかわいいです。',
          zh: '老师的狗很可爱。',
          es: 'El perro del profesor es lindo.',
          fr: 'Le chien du professeur est mignon.',
          hi: 'शिक्षक का कुत्ता प्यारा है।',
        },
        sentence: '선생님의 개가 귀엽습니다.',
        answerBlocks: [
          { text: '선생님', type: 'N' },
          { text: '의', type: 'P' },
          { text: '개', type: 'N' },
          { text: '가', type: 'P' },
          { text: '귀엽습니다', type: 'V' },
        ],
        decoyBlock: { text: '와', type: 'P' },
      },
      {
        id: 405,
        emoji: '👜',
        meanings: {
          en: "It is Truong's bag.",
          ja: 'チュオンさんのかばんです。',
          zh: '这是张先生的包。',
          es: 'Es la mochila de Truong.',
          fr: "C'est le sac de Truong.",
          hi: 'यह त्रुओंग का बैग है।',
        },
        sentence: '쯔엉 씨의 가방입니다.',
        answerBlocks: [
          { text: '쯔엉 씨', type: 'N' },
          { text: '의', type: 'P' },
          { text: '가방', type: 'N' },
          { text: '입니다', type: 'P' },
        ],
        decoyBlock: { text: '과', type: 'P' },
      },
    ],
  },
  {
    id: 5,
    label: '5과',
    title: '날씨가 좋지 않아요',
    grammarPoints: [
      {
        name: '-어요 (-아요/-어요/-해요)',
        meaning:
          "동사나 형용사를 말할 때 씁니다. '-습니다'보다 비격식적인 상황에서 씁니다. 질문과 대답에 모두 씁니다.",
        forms: [
          { condition: 'ㅏ, ㅗ가 있을 때', example: '맑다 → 맑아요' },
          { condition: 'ㅏ, ㅗ가 없을 때', example: '있다 → 있어요' },
          { condition: '하다', example: '공부하다 → 공부해요' },
        ],
        mainExamples: ['날씨가 좋아요.'],
        extraExamples: ['사과가 있어요.', '한국어를 공부해요.'],
      },
      {
        name: '-지 않다, 안',
        meaning: '동사, 형용사에 붙어서 상황을 부정합니다.',
        forms: [
          { condition: '먹다', example: '먹지 않아요, 안 먹어요' },
          { condition: '오다', example: '오지 않아요, 안 와요' },
        ],
        mainExamples: ['날씨가 좋지 않아요.', '날씨가 안 좋아요.'],
        extraExamples: ['비가 안 와요.', '여름을 좋아하지 않아요.'],
      },
    ],
    questions: [
      {
        id: 501,
        emoji: '☀️',
        meanings: {
          en: 'The weather is nice.',
          ja: '天気がいいです。',
          zh: '天气很好。',
          es: 'Hace buen tiempo.',
          fr: 'Il fait beau.',
          hi: 'मौसम अच्छा है।',
        },
        sentence: '날씨가 좋아요.',
        answerBlocks: [
          { text: '날씨', type: 'N' },
          { text: '가', type: 'P' },
          { text: '좋아요', type: 'V' },
        ],
        decoyBlock: { text: '좋어요', type: 'V' },
      },
      {
        id: 502,
        emoji: '🌤️',
        meanings: {
          en: 'The sky is clear.',
          ja: '空が晴れています。',
          zh: '天空很晴朗。',
          es: 'El cielo está despejado.',
          fr: 'Le ciel est dégagé.',
          hi: 'आसमान साफ़ है।',
        },
        sentence: '하늘이 맑아요.',
        answerBlocks: [
          { text: '하늘', type: 'N' },
          { text: '이', type: 'P' },
          { text: '맑아요', type: 'V' },
        ],
        decoyBlock: { text: '맑어요', type: 'V' },
      },
      {
        id: 503,
        emoji: '🍎',
        meanings: {
          en: 'There are no apples.',
          ja: 'りんごがありません。',
          zh: '没有苹果。',
          es: 'No hay manzanas.',
          fr: "Il n'y a pas de pommes.",
          hi: 'सेब नहीं हैं।',
        },
        sentence: '사과가 없어요.',
        answerBlocks: [
          { text: '사과', type: 'N' },
          { text: '가', type: 'P' },
          { text: '없어요', type: 'V' },
        ],
        decoyBlock: { text: '없아요', type: 'V' },
      },
      {
        id: 504,
        emoji: '🌧️',
        meanings: {
          en: 'The weather is not nice.',
          ja: '天気がよくないです。',
          zh: '天气不好。',
          es: 'No hace buen tiempo.',
          fr: 'Il ne fait pas beau.',
          hi: 'मौसम अच्छा नहीं है।',
        },
        sentence: '날씨가 좋지 않아요.',
        answerBlocks: [
          { text: '날씨', type: 'N' },
          { text: '가', type: 'P' },
          { text: '좋지', type: 'V' },
          { text: '않아요', type: 'V' },
        ],
        decoyBlock: { text: '않어요', type: 'V' },
      },
      {
        id: 505,
        emoji: '❄️',
        meanings: {
          en: 'It is not snowing.',
          ja: '雪が降っていません。',
          zh: '没下雪。',
          es: 'No está nevando.',
          fr: 'Il ne neige pas.',
          hi: 'बर्फ़ नहीं गिर रही है।',
        },
        sentence: '눈이 오지 않아요.',
        answerBlocks: [
          { text: '눈', type: 'N' },
          { text: '이', type: 'P' },
          { text: '오지', type: 'V' },
          { text: '않아요', type: 'V' },
        ],
        decoyBlock: { text: '않어요', type: 'V' },
      },
    ],
  },
  {
    id: 6,
    label: '6과',
    title: '친구한테 편지를 써요',
    grammarPoints: [
      {
        name: '에게, 한테',
        meaning: '명사 뒤에 붙어서 행위의 대상이 됨을 나타냅니다.',
        forms: [
          { condition: '받침 있음 (O)', example: '동생 → 동생에게, 동생한테' },
          { condition: '받침 없음 (X)', example: '누나 → 누나에게, 누나한테' },
        ],
        mainExamples: ['동생에게 책을 줘요.', '동생한테 책을 줘요.'],
        extraExamples: [
          '지훈 씨가 지연 씨한테 선물을 줘요.',
          '나타샤 씨는 친구에게 편지를 써요.',
        ],
      },
      {
        name: '만',
        meaning:
          '명사 뒤에 붙어서 다른 모든 것을 배제합니다. 이/가, 을/를 자리에 쓸 수 있습니다.',
        forms: [
          { condition: '받침 있음 (O)', example: '동생 → 동생만' },
          { condition: '받침 없음 (X)', example: '드라마 → 드라마만' },
        ],
        mainExamples: ['저와 언니는 회사원이에요. 동생만 학생이에요.'],
        extraExamples: ['리사 씨는 노래만 좋아해요.', '편지만 보내요.'],
      },
    ],
    questions: [
      {
        id: 601,
        emoji: '📚',
        meanings: {
          en: 'I give a book to my younger sibling.',
          ja: '弟(妹)に本をあげます。',
          zh: '我给弟弟(妹妹)书。',
          es: 'Le doy un libro a mi hermano/a menor.',
          fr: 'Je donne un livre à mon petit frère / ma petite sœur.',
          hi: 'मैं छोटे भाई/बहन को किताब देता/देती हूँ।',
        },
        sentence: '동생에게 책을 줘요.',
        answerBlocks: [
          { text: '동생', type: 'N' },
          { text: '에게', type: 'P' },
          { text: '책', type: 'N' },
          { text: '을', type: 'P' },
          { text: '줘요', type: 'V' },
        ],
        decoyBlock: { text: '에', type: 'P' },
      },
      {
        id: 602,
        emoji: '✉️',
        meanings: {
          en: 'Natasha writes a letter to a friend.',
          ja: 'ナターシャさんは友達に手紙を書きます。',
          zh: '娜塔莎给朋友写信。',
          es: 'Natasha le escribe una carta a una amiga.',
          fr: 'Natasha écrit une lettre à une amie.',
          hi: 'नताशा दोस्त को पत्र लिखती है।',
        },
        sentence: '나타샤 씨는 친구한테 편지를 써요.',
        answerBlocks: [
          { text: '나타샤 씨', type: 'N' },
          { text: '는', type: 'P' },
          { text: '친구', type: 'N' },
          { text: '한테', type: 'P' },
          { text: '편지', type: 'N' },
          { text: '를', type: 'P' },
          { text: '써요', type: 'V' },
        ],
        decoyBlock: { text: '에서', type: 'P' },
      },
      {
        id: 603,
        emoji: '📞',
        meanings: {
          en: 'Gayoung calls Lisa.',
          ja: 'ガヨンさんがリサさんに電話をします。',
          zh: '佳英给丽莎打电话。',
          es: 'Gayoung llama a Lisa.',
          fr: 'Gayoung appelle Lisa.',
          hi: 'गायोंग लीसा को फ़ोन करती है।',
        },
        sentence: '가영 씨가 리사 씨에게 전화를 해요.',
        acceptableAnswers: ['리사 씨에게 가영 씨가 전화를 해요.'],
        answerBlocks: [
          { text: '가영 씨', type: 'N' },
          { text: '가', type: 'P' },
          { text: '리사 씨', type: 'N' },
          { text: '에게', type: 'P' },
          { text: '전화', type: 'N' },
          { text: '를', type: 'P' },
          { text: '해요', type: 'V' },
        ],
        decoyBlock: { text: '에', type: 'P' },
      },
      {
        id: 604,
        emoji: '🧒',
        meanings: {
          en: 'Only my younger sibling is a student.',
          ja: '弟(妹)だけが学生です。',
          zh: '只有弟弟(妹妹)是学生。',
          es: 'Solo mi hermano/a menor es estudiante.',
          fr: 'Seul mon petit frère / Seule ma petite sœur est étudiant(e).',
          hi: 'सिर्फ़ मेरा छोटा भाई / मेरी छोटी बहन छात्र है।',
        },
        sentence: '동생만 학생이에요.',
        answerBlocks: [
          { text: '동생', type: 'N' },
          { text: '만', type: 'P' },
          { text: '학생', type: 'N' },
          { text: '이에요', type: 'P' },
        ],
        decoyBlock: { text: '를', type: 'P' },
      },
      {
        id: 605,
        emoji: '👩',
        meanings: {
          en: 'Truong has only an older sister.',
          ja: 'チュオンさんにはお姉さんだけいます。',
          zh: '张先生只有姐姐。',
          es: 'Truong solo tiene una hermana mayor.',
          fr: 'Truong a seulement une grande sœur.',
          hi: 'त्रुओंग की सिर्फ़ एक बड़ी बहन है।',
        },
        sentence: '쯔엉 씨는 누나만 있어요.',
        answerBlocks: [
          { text: '쯔엉 씨', type: 'N' },
          { text: '는', type: 'P' },
          { text: '누나', type: 'N' },
          { text: '만', type: 'P' },
          { text: '있어요', type: 'V' },
        ],
        decoyBlock: { text: '을', type: 'P' },
      },
    ],
  },
  {
    id: 7,
    label: '7과',
    title: '지금 어디에 있어요?',
    grammarPoints: [
      {
        name: '(장소)에',
        meaning:
          "장소 명사 뒤에 써서 사람이나 사물이 있는지, 어디에 있는지를 나타냅니다. 주로 '있다/없다'와 함께 씁니다.",
        forms: [
          { condition: '받침 있음 (O)', example: '집 → 집에' },
          { condition: '받침 없음 (X)', example: '학교 → 학교에' },
        ],
        mainExamples: ['휴대 전화가 책상 위에 있어요.'],
        extraExamples: ['은행이 회사 앞에 있어요.', '동생은 집에 없어요.'],
      },
      {
        name: '에서',
        meaning:
          '장소 명사와 함께 행동이 일어나는 곳을 나타냅니다. 여러 동작 동사와 함께 씁니다.',
        forms: [
          { condition: '받침 있음 (O)', example: '집 → 집에서' },
          { condition: '받침 없음 (X)', example: '학교 → 학교에서' },
        ],
        mainExamples: ['방에서 쉬어요.'],
        extraExamples: [
          '제임스 씨는 회사에서 일해요.',
          '저는 집에서 공부해요.',
        ],
      },
    ],
    questions: [
      {
        id: 701,
        emoji: '📱',
        meanings: {
          en: 'The phone is on the desk.',
          ja: '携帯電話は机の上にあります。',
          zh: '手机在书桌上。',
          es: 'El teléfono está sobre el escritorio.',
          fr: 'Le téléphone est sur le bureau.',
          hi: 'फ़ोन मेज़ पर है।',
        },
        sentence: '휴대 전화가 책상 위에 있어요.',
        answerBlocks: [
          { text: '휴대 전화', type: 'N' },
          { text: '가', type: 'P' },
          { text: '책상', type: 'N' },
          { text: '위', type: 'N' },
          { text: '에', type: 'P' },
          { text: '있어요', type: 'V' },
        ],
        decoyBlock: { text: '에서', type: 'P' },
      },
      {
        id: 702,
        emoji: '🛏️',
        meanings: {
          en: 'I rest in my room.',
          ja: '部屋で休みます。',
          zh: '我在房间里休息。',
          es: 'Descanso en mi habitación.',
          fr: 'Je me repose dans ma chambre.',
          hi: 'मैं अपने कमरे में आराम करता/करती हूँ।',
        },
        sentence: '방에서 쉬어요.',
        answerBlocks: [
          { text: '방', type: 'N' },
          { text: '에서', type: 'P' },
          { text: '쉬어요', type: 'V' },
        ],
        decoyBlock: { text: '에', type: 'P' },
      },
      {
        id: 703,
        emoji: '📚',
        meanings: {
          en: 'I study Korean at the library.',
          ja: '私は図書館で韓国語を勉強します。',
          zh: '我在图书馆学习韩语。',
          es: 'Estudio coreano en la biblioteca.',
          fr: "J'étudie le coréen à la bibliothèque.",
          hi: 'मैं पुस्तकालय में कोरियाई पढ़ता/पढ़ती हूँ।',
        },
        sentence: '저는 도서관에서 한국어를 공부해요.',
        answerBlocks: [
          { text: '저', type: 'N' },
          { text: '는', type: 'P' },
          { text: '도서관', type: 'N' },
          { text: '에서', type: 'P' },
          { text: '한국어', type: 'N' },
          { text: '를', type: 'P' },
          { text: '공부해요', type: 'V' },
        ],
        decoyBlock: { text: '에', type: 'P' },
      },
      {
        id: 704,
        emoji: '💼',
        meanings: {
          en: 'James works at a Korean company.',
          ja: 'ジェームスさんは韓国の会社で働いています。',
          zh: '詹姆斯在韩国公司工作。',
          es: 'James trabaja en una empresa coreana.',
          fr: 'James travaille dans une entreprise coréenne.',
          hi: 'जेम्स एक कोरियाई कंपनी में काम करते हैं।',
        },
        sentence: '제임스 씨는 한국 회사에서 일해요.',
        answerBlocks: [
          { text: '제임스 씨', type: 'N' },
          { text: '는', type: 'P' },
          { text: '한국 회사', type: 'N' },
          { text: '에서', type: 'P' },
          { text: '일해요', type: 'V' },
        ],
        decoyBlock: { text: '에', type: 'P' },
      },
      {
        id: 705,
        emoji: '🚪',
        meanings: {
          en: 'My older sister is not in the room.',
          ja: '姉は部屋にいません。',
          zh: '姐姐不在房间里。',
          es: 'Mi hermana mayor no está en la habitación.',
          fr: "Ma grande sœur n'est pas dans la chambre.",
          hi: 'मेरी बड़ी बहन कमरे में नहीं है।',
        },
        sentence: '언니가 방에 없어요.',
        answerBlocks: [
          { text: '언니', type: 'N' },
          { text: '가', type: 'P' },
          { text: '방', type: 'N' },
          { text: '에', type: 'P' },
          { text: '없어요', type: 'V' },
        ],
        decoyBlock: { text: '에서', type: 'P' },
      },
      {
        id: 706,
        emoji: '🏃',
        meanings: {
          en: 'Junyoung exercises in the park.',
          ja: 'ジュニョンさんは公園で運動します。',
          zh: '俊英在公园运动。',
          es: 'Junyoung hace ejercicio en el parque.',
          fr: 'Junyoung fait du sport au parc.',
          hi: 'जूनयोंग पार्क में व्यायाम करते हैं।',
        },
        sentence: '준영 씨가 공원에서 운동해요.',
        answerBlocks: [
          { text: '준영 씨', type: 'N' },
          { text: '가', type: 'P' },
          { text: '공원', type: 'N' },
          { text: '에서', type: 'P' },
          { text: '운동해요', type: 'V' },
        ],
        decoyBlock: { text: '에', type: 'P' },
      },
      {
        id: 707,
        emoji: '📮',
        meanings: {
          en: 'The post office is next to the bookstore.',
          ja: '郵便局は本屋の隣にあります。',
          zh: '邮局在书店旁边。',
          es: 'La oficina de correos está al lado de la librería.',
          fr: 'La poste est à côté de la librairie.',
          hi: 'डाकघर किताबों की दुकान के बगल में है।',
        },
        sentence: '우체국은 서점 옆에 있어요.',
        answerBlocks: [
          { text: '우체국', type: 'N' },
          { text: '은', type: 'P' },
          { text: '서점', type: 'N' },
          { text: '옆', type: 'N' },
          { text: '에', type: 'P' },
          { text: '있어요', type: 'V' },
        ],
        decoyBlock: { text: '에서', type: 'P' },
      },
      {
        id: 708,
        emoji: '🍱',
        meanings: {
          en: 'I eat lunch at the company cafeteria.',
          ja: '昼ご飯は会社の食堂で食べます。',
          zh: '我在公司食堂吃午饭。',
          es: 'Almuerzo en la cafetería de la empresa.',
          fr: "Je déjeune à la cantine de l'entreprise.",
          hi: 'मैं दोपहर का खाना कंपनी की कैंटीन में खाता/खाती हूँ।',
        },
        sentence: '점심은 회사 식당에서 먹어요.',
        answerBlocks: [
          { text: '점심', type: 'N' },
          { text: '은', type: 'P' },
          { text: '회사 식당', type: 'N' },
          { text: '에서', type: 'P' },
          { text: '먹어요', type: 'V' },
        ],
        decoyBlock: { text: '에', type: 'P' },
      },
    ],
  },
];

/**
 * Formats placed blocks into a Korean sentence string:
 * particle blocks (P) attach directly to the preceding word,
 * while all other blocks are separated by a space.
 */
export function formatBlocksToSentence(
  blocks: readonly WordBlock[],
  includePeriod = false,
): string {
  if (blocks.length === 0) return '';

  const joined = blocks.reduce((acc, block, index) => {
    if (index === 0) {
      return block.text;
    }
    if (block.type === 'P') {
      return `${acc}${block.text}`;
    }
    return `${acc} ${block.text}`;
  }, '');

  return includePeriod ? `${joined}.` : joined;
}

