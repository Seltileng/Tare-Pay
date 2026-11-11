export interface Bank {
  code: string;
  name: string;
  category: "commercial" | "digital" | "microfinance";
}

export const NIGERIAN_BANKS: Bank[] = [
  { code: "044", name: "Access Bank", category: "commercial" },
  { code: "058", name: "Guaranty Trust Bank (GTBank)", category: "commercial" },
  { code: "057", name: "Zenith Bank", category: "commercial" },
  { code: "033", name: "United Bank for Africa (UBA)", category: "commercial" },
  { code: "011", name: "First Bank of Nigeria", category: "commercial" },
  { code: "101", name: "Providus Bank", category: "commercial" },
  { code: "035", name: "Wema Bank / ALAT", category: "commercial" },
  { code: "232", name: "Sterling Bank", category: "commercial" },
  { code: "070", name: "Fidelity Bank", category: "commercial" },
  { code: "214", name: "First City Monument Bank (FCMB)", category: "commercial" },
  { code: "221", name: "Stanbic IBTC Bank", category: "commercial" },
  { code: "076", name: "Polaris Bank", category: "commercial" },
  { code: "50211", name: "Kuda Microfinance Bank", category: "digital" },
  { code: "999992", name: "OPay (PayCom)", category: "digital" },
  { code: "50515", name: "Moniepoint MFB", category: "digital" },
  { code: "50380", name: "Palmpay", category: "digital" },
];

export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
] as const;

export const STATE_LGAS: Record<string, string[]> = {
  Lagos: [
    "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", "Badagry",
    "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu",
    "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo",
    "Shomolu", "Surulere"
  ],
  "FCT - Abuja": [
    "Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal Area Council (AMAC)"
  ],
  Oyo: [
    "Afijio", "Akinyele", "Atiba", "Atisbo", "Egbeda", "Ibadan North",
    "Ibadan North-East", "Ibadan North-West", "Ibadan South-East", "Ibadan South-West",
    "Ibarapa Central", "Ibarapa East", "Ibarapa North", "Ido", "Irepo", "Iseyin",
    "Ogbomoso North", "Ogbomoso South", "Oyo East", "Oyo West", "Saki East", "Saki West"
  ],
  Rivers: [
    "Abua/Odual", "Ahoada East", "Ahoada West", "Akuku-Toru", "Andoni", "Asari-Toru",
    "Bonny", "Degema", "Eleme", "Emuoha", "Etche", "Gokana", "Ikwerre", "Khana",
    "Obio/Akpor", "Ogba/Egbema/Ndoni", "Ogu/Bolo", "Okrika", "Omuma", "Opobo/Nkoro",
    "Oyigbo", "Port Harcourt", "Tai"
  ],
  Kano: [
    "Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", "Dala", "Dambatta",
    "Dawakin Kudu", "Dawakin Tofa", "Fagge", "Gabasawa", "Garko", "Garun Mallam",
    "Gaya", "Gezawa", "Gwale", "Kano Municipal", "Kumbotso", "Nasarawa", "Tarauni"
  ],
};

export function getLgasForState(state: string): string[] {
  if (STATE_LGAS[state]) {
    return STATE_LGAS[state];
  }
  return ["Central", "North", "South", "East", "West", "Municipal"];
}
