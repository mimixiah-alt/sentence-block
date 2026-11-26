export type BlockType = 'N' | 'P' | 'V';

export type LanguageCode = 'en' | 'ja' | 'zh' | 'es' | 'fr' | 'hi';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
}

export const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '中文' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'hi', label: 'हिन्दी' },
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
  answerBlocks: WordBlock[];
  decoyBlock: WordBlock;
}

export const SENTENCES: SentenceQuestion[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
