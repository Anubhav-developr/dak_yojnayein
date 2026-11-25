// Rates & rules: India Post, Q3 FY 2026-27 (Oct-Dec 2026).
// Update rates here once a quarter, cards, ticker and calculator all read from this file.

export const RATES_PERIOD = 'Q3 वित्त वर्ष 2026-27 (अक्टूबर–दिसंबर 2026)';
export const RATES_PERIOD_SHORT = 'Q3 (वित्त वर्ष 2026-27)';

const FIXED = 'fixed';
const FLOATING = 'floating';

export const calcConfig = {
  posa: {
    id: 'posa', kind: 'posa', label: 'पोस्ट ऑफिस बचत खाता (POSA)',
    rate: 4.0, rateType: FLOATING, compounding: 'वार्षिक (मासिक साधारण गणना)', payout: 'वार्षिक (31 मार्च)',
    tenure: 'अनिश्चित अवधि', min: 0, max: null, step: 100, sliderMax: 1000000, defaultAmount: 50000, minBalance: 500,
  },
  td1: {
    id: 'td1', kind: 'td', label: '1 वर्षीय टाइम डिपॉज़िट (1Y TD)', tenureYears: 1,
    rate: 6.9, rateType: FIXED, compounding: 'त्रैमासिक', payout: 'वार्षिक', tenure: '1 वर्ष',
    min: 1000, max: null, step: 100, sliderMax: 1000000, defaultAmount: 100000,
  },
  td2: {
    id: 'td2', kind: 'td', label: '2 वर्षीय टाइम डिपॉज़िट (2Y TD)', tenureYears: 2,
    rate: 7.0, rateType: FIXED, compounding: 'त्रैमासिक', payout: 'वार्षिक', tenure: '2 वर्ष',
    min: 1000, max: null, step: 100, sliderMax: 1000000, defaultAmount: 100000,
  },
  td3: {
    id: 'td3', kind: 'td', label: '3 वर्षीय टाइम डिपॉज़िट (3Y TD)', tenureYears: 3,
    rate: 7.1, rateType: FIXED, compounding: 'त्रैमासिक', payout: 'वार्षिक', tenure: '3 वर्ष',
    min: 1000, max: null, step: 100, sliderMax: 1000000, defaultAmount: 100000,
  },
  td5: {
    id: 'td5', kind: 'td', label: '5 वर्षीय टाइम डिपॉज़िट (5Y TD)', tenureYears: 5,
    rate: 7.5, rateType: FIXED, compounding: 'त्रैमासिक', payout: 'वार्षिक', tenure: '5 वर्ष',
    min: 1000, max: null, step: 100, sliderMax: 1000000, defaultAmount: 100000, section80C: true,
  },
  rd: {
    id: 'rd', kind: 'rd', label: '5 वर्षीय रेकरिंग डिपॉज़िट (RD)', tenureMonths: 60,
    rate: 6.7, rateType: FIXED, compounding: 'त्रैमासिक', payout: 'परिपक्वता पर', tenure: '5 वर्ष (60 माह)',
    min: 100, max: null, step: 10, sliderMax: 50000, defaultAmount: 5000,
  },
  scss: {
    id: 'scss', kind: 'scss', label: 'वरिष्ठ नागरिक बचत योजना (SCSS)', tenureYears: 5,
    rate: 8.2, rateType: FIXED, compounding: 'कोई नहीं (साधारण ब्याज)', payout: 'त्रैमासिक', tenure: '5 वर्ष (+3 वर्ष विस्तार)',
    min: 1000, max: 3000000, step: 1000, sliderMax: 3000000, defaultAmount: 1000000, section80C: true,
  },
  mis: {
    id: 'mis', kind: 'pomis', label: 'पोस्ट ऑफिस मासिक आय योजना (MIS)', tenureYears: 5,
    rate: 7.4, rateType: FIXED, compounding: 'कोई नहीं (साधारण ब्याज)', payout: 'मासिक', tenure: '5 वर्ष',
    min: 1000, max: 900000, maxJoint: 1500000, step: 1000, sliderMax: 900000, defaultAmount: 500000,
  },
  nsc: {
    id: 'nsc', kind: 'nsc', label: 'राष्ट्रीय बचत पत्र (NSC VIII)', tenureYears: 5,
    rate: 7.7, rateType: FIXED, compounding: 'वार्षिक', payout: 'परिपक्वता पर', tenure: '5 वर्ष',
    min: 1000, max: null, step: 100, sliderMax: 1000000, defaultAmount: 100000, section80C: true,
  },
  ppf: {
    id: 'ppf', kind: 'fyAccount', label: 'पब्लिक प्रोविडेंट फंड (PPF)',
    rate: 7.1, rateType: FLOATING, compounding: 'वार्षिक', payout: 'परिपक्वता पर', tenure: '15 वर्ष (5-5 वर्ष में विस्तार)',
    min: 500, max: 150000, step: 50, sliderMax: 150000, defaultAmount: 150000, section80C: true,
    totalYears: 15, depositYears: 15,
  },
  kvp: {
    id: 'kvp', kind: 'kvp', label: 'किसान विकास पत्र (KVP)', tenureMonths: 115,
    rate: 7.5, rateType: FIXED, compounding: 'वार्षिक', payout: 'परिपक्वता पर', tenure: '115 माह (9 वर्ष 7 माह)',
    min: 1000, max: null, step: 100, sliderMax: 1000000, defaultAmount: 100000,
  },
  ssy: {
    id: 'ssy', kind: 'fyAccount', label: 'सुकन्या समृद्धि योजना (SSY)',
    rate: 8.2, rateType: FLOATING, compounding: 'वार्षिक', payout: 'परिपक्वता पर', tenure: '21 वर्ष (जमा पहले 15 वर्ष)',
    min: 250, max: 150000, step: 50, sliderMax: 150000, defaultAmount: 150000, section80C: true,
    totalYears: 21, depositYears: 15,
  },
};

export const calcGroups = [
  { label: 'बचत खाता, टाइम डिपॉज़िट और RD', ids: ['posa', 'td1', 'td2', 'td3', 'td5', 'rd'] },
  { label: 'कर-बचत एवं दीर्घकालिक', ids: ['ppf', 'ssy', 'nsc'] },
  { label: 'नियमित आय एवं दोगुना', ids: ['scss', 'mis', 'kvp'] },
];

export const tdRates = { 1: calcConfig.td1.rate, 2: calcConfig.td2.rate, 3: calcConfig.td3.rate, 5: calcConfig.td5.rate };
export const POSA_RATE = calcConfig.posa.rate;
