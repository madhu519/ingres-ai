export interface BlockInfo {
  id: string;
  name: string;
  stage: number;
  aquifer: string;
  category: "Safe" | "Semi-Critical" | "Critical" | "Over-Exploited";
  net_avail_ham: number;
}

export type DistrictData = Record<string, BlockInfo[]>;
export type StateHierarchy = Record<string, DistrictData>;

export const INDIA_GROUNDWATER_HIERARCHY: StateHierarchy = {
  Punjab: {
    Jalandhar: [
      { id: "nakodar", name: "Nakodar", stage: 186.0, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 18420 },
      { id: "shahkot", name: "Shahkot", stage: 194.2, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 16210 },
      { id: "phillaur", name: "Phillaur", stage: 178.5, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 19800 },
      { id: "jalandhar_west", name: "Jalandhar West", stage: 182.1, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 14350 },
      { id: "bhangala", name: "Bhangala", stage: 171.4, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 15600 },
    ],
    Ludhiana: [
      { id: "samrala", name: "Samrala", stage: 188.4, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 17200 },
      { id: "khanna", name: "Khanna", stage: 192.1, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 19400 },
      { id: "jagraon", name: "Jagraon", stage: 185.7, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 21300 },
      { id: "ludhiana_1", name: "Ludhiana-1", stage: 179.3, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 16500 },
    ],
    Amritsar: [
      { id: "ajnala", name: "Ajnala", stage: 176.2, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 22100 },
      { id: "majitha", name: "Majitha", stage: 184.9, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 18900 },
      { id: "verka", name: "Verka", stage: 172.5, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 15400 },
      { id: "rayya", name: "Rayya", stage: 181.0, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 17800 },
    ],
    Sangrur: [
      { id: "dhuri", name: "Dhuri", stage: 198.6, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 16800 },
      { id: "malerkotla", name: "Malerkotla", stage: 189.2, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 17900 },
      { id: "sunam", name: "Sunam", stage: 204.1, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 15200 },
      { id: "moonak", name: "Moonak", stage: 195.4, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 14100 },
    ],
    Patiala: [
      { id: "nabha", name: "Nabha", stage: 187.8, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 19100 },
      { id: "rajpura", name: "Rajpura", stage: 179.4, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 20400 },
      { id: "samana", name: "Samana", stage: 193.0, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 17300 },
    ],
    Bathinda: [
      { id: "rampura_phul", name: "Rampura Phul", stage: 184.3, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 18500 },
      { id: "talwandi_sabo", name: "Talwandi Sabo", stage: 175.6, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 16900 },
      { id: "bathinda", name: "Bathinda", stage: 169.8, aquifer: "Alluvial (Indo-Gangetic)", category: "Over-Exploited", net_avail_ham: 19800 },
    ],
  },
  Haryana: {
    Kurukshetra: [
      { id: "pehowa", name: "Pehowa", stage: 178.4, aquifer: "Alluvial & Semi-Arid Sandy", category: "Over-Exploited", net_avail_ham: 15600 },
      { id: "shahabad_hry", name: "Shahabad", stage: 184.6, aquifer: "Alluvial & Semi-Arid Sandy", category: "Over-Exploited", net_avail_ham: 16200 },
      { id: "thanesar", name: "Thanesar", stage: 168.2, aquifer: "Alluvial & Semi-Arid Sandy", category: "Over-Exploited", net_avail_ham: 18100 },
      { id: "ladwa", name: "Ladwa", stage: 172.9, aquifer: "Alluvial & Semi-Arid Sandy", category: "Over-Exploited", net_avail_ham: 14300 },
    ],
    Karnal: [
      { id: "nilokheri", name: "Nilokheri", stage: 164.8, aquifer: "Alluvial & Semi-Arid Sandy", category: "Over-Exploited", net_avail_ham: 17800 },
      { id: "indri", name: "Indri", stage: 158.4, aquifer: "Alluvial & Semi-Arid Sandy", category: "Over-Exploited", net_avail_ham: 19200 },
      { id: "gharaunda", name: "Gharaunda", stage: 161.7, aquifer: "Alluvial & Semi-Arid Sandy", category: "Over-Exploited", net_avail_ham: 18400 },
      { id: "karnal", name: "Karnal", stage: 152.3, aquifer: "Alluvial & Semi-Arid Sandy", category: "Over-Exploited", net_avail_ham: 20100 },
    ],
    Kaithal: [
      { id: "guhla", name: "Guhla", stage: 179.1, aquifer: "Alluvial & Semi-Arid Sandy", category: "Over-Exploited", net_avail_ham: 15900 },
      { id: "rajound", name: "Rajound", stage: 168.5, aquifer: "Alluvial & Semi-Arid Sandy", category: "Over-Exploited", net_avail_ham: 14800 },
      { id: "pundri", name: "Pundri", stage: 174.0, aquifer: "Alluvial & Semi-Arid Sandy", category: "Over-Exploited", net_avail_ham: 16500 },
    ],
    Sirsa: [
      { id: "rania", name: "Rania", stage: 159.2, aquifer: "Alluvial & Semi-Arid Sandy", category: "Over-Exploited", net_avail_ham: 19400 },
      { id: "ellenabad", name: "Ellenabad", stage: 164.7, aquifer: "Alluvial & Semi-Arid Sandy", category: "Over-Exploited", net_avail_ham: 18200 },
      { id: "dabwali", name: "Dabwali", stage: 148.9, aquifer: "Alluvial & Semi-Arid Sandy", category: "Over-Exploited", net_avail_ham: 21000 },
    ],
    Fatehabad: [
      { id: "tohana", name: "Tohana", stage: 171.8, aquifer: "Alluvial & Semi-Arid Sandy", category: "Over-Exploited", net_avail_ham: 16700 },
      { id: "ratia", name: "Ratia", stage: 176.4, aquifer: "Alluvial & Semi-Arid Sandy", category: "Over-Exploited", net_avail_ham: 15800 },
      { id: "bhuna", name: "Bhuna", stage: 162.3, aquifer: "Alluvial & Semi-Arid Sandy", category: "Over-Exploited", net_avail_ham: 17500 },
    ],
    Gurugram: [
      { id: "sohna", name: "Sohna", stage: 182.5, aquifer: "Alluvial & Semi-Arid Sandy", category: "Over-Exploited", net_avail_ham: 11200 },
      { id: "pataudi", name: "Pataudi", stage: 174.1, aquifer: "Alluvial & Semi-Arid Sandy", category: "Over-Exploited", net_avail_ham: 12400 },
      { id: "gurugram", name: "Gurugram", stage: 189.6, aquifer: "Alluvial & Semi-Arid Sandy", category: "Over-Exploited", net_avail_ham: 10500 },
    ],
  },
  Rajasthan: {
    Jaipur: [
      { id: "amer", name: "Amer", stage: 168.4, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 13500 },
      { id: "sanganer", name: "Sanganer", stage: 184.2, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 11800 },
      { id: "bassi", name: "Bassi", stage: 172.9, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 14200 },
      { id: "chomu", name: "Chomu", stage: 191.0, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 12600 },
      { id: "jamwa_ramgarh", name: "Jamwa Ramgarh", stage: 158.7, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 15100 },
    ],
    Jodhpur: [
      { id: "mandore", name: "Mandore", stage: 176.5, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 12400 },
      { id: "osian", name: "Osian", stage: 182.1, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 14100 },
      { id: "bilara", name: "Bilara", stage: 189.8, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 13200 },
      { id: "bhopalgarh", name: "Bhopalgarh", stage: 179.4, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 12900 },
    ],
    Nagaur: [
      { id: "didwana", name: "Didwana", stage: 184.7, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 15300 },
      { id: "merta", name: "Merta", stage: 178.9, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 16200 },
      { id: "kuchaman", name: "Kuchaman", stage: 172.3, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 14800 },
    ],
    Jhunjhunu: [
      { id: "chirawa", name: "Chirawa", stage: 194.5, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 11600 },
      { id: "buhana", name: "Buhana", stage: 188.1, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 12200 },
      { id: "khetri", name: "Khetri", stage: 167.3, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 13900 },
      { id: "surajgarh", name: "Surajgarh", stage: 191.4, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 11900 },
    ],
    Sikar: [
      { id: "neem_ka_thana", name: "Neem Ka Thana", stage: 186.2, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 12800 },
      { id: "dhod", name: "Dhod", stage: 179.8, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 13500 },
      { id: "danta_ramgarh", name: "Danta Ramgarh", stage: 184.0, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 13100 },
    ],
    Alwar: [
      { id: "behror", name: "Behror", stage: 189.3, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 14200 },
      { id: "kotkasim", name: "Kotkasim", stage: 181.7, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 13400 },
      { id: "tijara", name: "Tijara", stage: 174.5, aquifer: "Semi-Consolidated & Hard-Rock", category: "Over-Exploited", net_avail_ham: 15800 },
    ],
  },
  "Uttar Pradesh": {
    Agra: [
      { id: "bichpuri", name: "Bichpuri", stage: 138.4, aquifer: "Deep Ganga Alluvial", category: "Over-Exploited", net_avail_ham: 12900 },
      { id: "fatehabad_up", name: "Fatehabad", stage: 142.1, aquifer: "Deep Ganga Alluvial", category: "Over-Exploited", net_avail_ham: 14500 },
      { id: "kheragarh", name: "Kheragarh", stage: 131.6, aquifer: "Deep Ganga Alluvial", category: "Over-Exploited", net_avail_ham: 15200 },
      { id: "barauli_ahir", name: "Barauli Ahir", stage: 136.2, aquifer: "Deep Ganga Alluvial", category: "Over-Exploited", net_avail_ham: 13800 },
    ],
    Meerut: [
      { id: "daurala", name: "Daurala", stage: 124.5, aquifer: "Deep Ganga Alluvial", category: "Over-Exploited", net_avail_ham: 16800 },
      { id: "mawana", name: "Mawana", stage: 118.9, aquifer: "Deep Ganga Alluvial", category: "Over-Exploited", net_avail_ham: 18200 },
      { id: "sardhana", name: "Sardhana", stage: 115.2, aquifer: "Deep Ganga Alluvial", category: "Over-Exploited", net_avail_ham: 17900 },
    ],
    Aligarh: [
      { id: "lodha", name: "Lodha", stage: 129.8, aquifer: "Deep Ganga Alluvial", category: "Over-Exploited", net_avail_ham: 15400 },
      { id: "khair", name: "Khair", stage: 134.1, aquifer: "Deep Ganga Alluvial", category: "Over-Exploited", net_avail_ham: 16100 },
      { id: "atrauli", name: "Atrauli", stage: 121.7, aquifer: "Deep Ganga Alluvial", category: "Over-Exploited", net_avail_ham: 17800 },
    ],
    Saharanpur: [
      { id: "nakur", name: "Nakur", stage: 119.3, aquifer: "Deep Ganga Alluvial", category: "Over-Exploited", net_avail_ham: 19200 },
      { id: "deoband", name: "Deoband", stage: 114.6, aquifer: "Deep Ganga Alluvial", category: "Over-Exploited", net_avail_ham: 20500 },
      { id: "gangoh", name: "Gangoh", stage: 122.0, aquifer: "Deep Ganga Alluvial", category: "Over-Exploited", net_avail_ham: 18700 },
    ],
    Varanasi: [
      { id: "pindra", name: "Pindra", stage: 94.2, aquifer: "Deep Ganga Alluvial", category: "Critical", net_avail_ham: 16400 },
      { id: "cholapur", name: "Cholapur", stage: 89.6, aquifer: "Deep Ganga Alluvial", category: "Semi-Critical", net_avail_ham: 17800 },
      { id: "arajiline", name: "Arajiline", stage: 98.1, aquifer: "Deep Ganga Alluvial", category: "Critical", net_avail_ham: 15900 },
    ],
    Prayagraj: [
      { id: "soraon", name: "Soraon", stage: 96.5, aquifer: "Deep Ganga Alluvial", category: "Critical", net_avail_ham: 19800 },
      { id: "holagarh", name: "Holagarh", stage: 91.8, aquifer: "Deep Ganga Alluvial", category: "Critical", net_avail_ham: 18400 },
      { id: "phulpur", name: "Phulpur", stage: 88.2, aquifer: "Deep Ganga Alluvial", category: "Semi-Critical", net_avail_ham: 21500 },
    ],
    Lucknow: [
      { id: "bakshi_ka_talab", name: "Bakshi Ka Talab", stage: 92.4, aquifer: "Deep Ganga Alluvial", category: "Critical", net_avail_ham: 17500 },
      { id: "chinhat", name: "Chinhat", stage: 104.2, aquifer: "Deep Ganga Alluvial", category: "Over-Exploited", net_avail_ham: 14200 },
      { id: "sarojini_nagar", name: "Sarojini Nagar", stage: 98.7, aquifer: "Deep Ganga Alluvial", category: "Critical", net_avail_ham: 16100 },
    ],
    Jhansi: [
      { id: "mauranipur", name: "Mauranipur", stage: 84.6, aquifer: "Deep Ganga Alluvial", category: "Semi-Critical", net_avail_ham: 14200 },
      { id: "babina", name: "Babina", stage: 79.8, aquifer: "Deep Ganga Alluvial", category: "Semi-Critical", net_avail_ham: 15800 },
      { id: "moth", name: "Moth", stage: 86.4, aquifer: "Deep Ganga Alluvial", category: "Semi-Critical", net_avail_ham: 13900 },
    ],
  },
  Karnataka: {
    Bagalkot: [
      { id: "bagalkot", name: "Bagalkot", stage: 112.4, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 9240 },
      { id: "badami", name: "Badami", stage: 118.7, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 8750 },
      { id: "jamkhandi", name: "Jamkhandi", stage: 108.9, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 10400 },
      { id: "hungund", name: "Hungund", stage: 114.2, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 9100 },
      { id: "mudhol", name: "Mudhol", stage: 121.5, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 8900 },
    ],
    Kolar: [
      { id: "kolar", name: "Kolar", stage: 146.8, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 7600 },
      { id: "bangarapet", name: "Bangarapet", stage: 139.2, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 8200 },
      { id: "malur", name: "Malur", stage: 152.4, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 7100 },
      { id: "srinivaspur", name: "Srinivaspur", stage: 141.5, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 7900 },
    ],
    Chikkaballapura: [
      { id: "chintamani", name: "Chintamani", stage: 148.9, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 7400 },
      { id: "sidlaghatta", name: "Sidlaghatta", stage: 143.1, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 7800 },
      { id: "gauribidanur", name: "Gauribidanur", stage: 136.5, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 8500 },
    ],
    "Bengaluru Rural": [
      { id: "devanahalli", name: "Devanahalli", stage: 144.2, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 8100 },
      { id: "doddaballapura", name: "Doddaballapura", stage: 138.7, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 8900 },
      { id: "hosakote", name: "Hosakote", stage: 149.6, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 7500 },
    ],
    Belagavi: [
      { id: "athani", name: "Athani", stage: 116.4, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 11200 },
      { id: "chikkodi", name: "Chikkodi", stage: 109.8, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 12500 },
      { id: "gokak", name: "Gokak", stage: 104.5, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 13400 },
    ],
    Tumakuru: [
      { id: "tiptur", name: "Tiptur", stage: 124.8, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 9800 },
      { id: "gubbi", name: "Gubbi", stage: 118.2, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 10600 },
      { id: "kunigal", name: "Kunigal", stage: 112.9, aquifer: "Hard-Rock Crystalline", category: "Over-Exploited", net_avail_ham: 11400 },
    ],
    Mysuru: [
      { id: "hunsur", name: "Hunsur", stage: 86.4, aquifer: "Hard-Rock Crystalline", category: "Semi-Critical", net_avail_ham: 14200 },
      { id: "nanjangud", name: "Nanjangud", stage: 79.2, aquifer: "Hard-Rock Crystalline", category: "Semi-Critical", net_avail_ham: 15800 },
      { id: "t_narasipura", name: "T. Narasipura", stage: 74.8, aquifer: "Hard-Rock Crystalline", category: "Semi-Critical", net_avail_ham: 16900 },
    ],
  },
  "Tamil Nadu": {
    Coimbatore: [
      { id: "pollachi", name: "Pollachi", stage: 138.6, aquifer: "Fissured Hard-Rock", category: "Over-Exploited", net_avail_ham: 11200 },
      { id: "sulur", name: "Sulur", stage: 145.2, aquifer: "Fissured Hard-Rock", category: "Over-Exploited", net_avail_ham: 10100 },
      { id: "karamadai", name: "Karamadai", stage: 129.8, aquifer: "Fissured Hard-Rock", category: "Over-Exploited", net_avail_ham: 12400 },
      { id: "annur", name: "Annur", stage: 142.0, aquifer: "Fissured Hard-Rock", category: "Over-Exploited", net_avail_ham: 10800 },
    ],
    Salem: [
      { id: "sankari", name: "Sankari", stage: 141.5, aquifer: "Fissured Hard-Rock", category: "Over-Exploited", net_avail_ham: 9800 },
      { id: "omalur", name: "Omalur", stage: 135.2, aquifer: "Fissured Hard-Rock", category: "Over-Exploited", net_avail_ham: 10900 },
      { id: "attur", name: "Attur", stage: 128.7, aquifer: "Fissured Hard-Rock", category: "Over-Exploited", net_avail_ham: 11800 },
    ],
    Tirupur: [
      { id: "palladam", name: "Palladam", stage: 149.1, aquifer: "Fissured Hard-Rock", category: "Over-Exploited", net_avail_ham: 9200 },
      { id: "kangeyam", name: "Kangeyam", stage: 143.4, aquifer: "Fissured Hard-Rock", category: "Over-Exploited", net_avail_ham: 9900 },
      { id: "udumalaipettai", name: "Udumalaipettai", stage: 131.0, aquifer: "Fissured Hard-Rock", category: "Over-Exploited", net_avail_ham: 11500 },
    ],
    Dharmapuri: [
      { id: "harur", name: "Harur", stage: 136.4, aquifer: "Fissured Hard-Rock", category: "Over-Exploited", net_avail_ham: 10400 },
      { id: "palacode", name: "Palacode", stage: 142.8, aquifer: "Fissured Hard-Rock", category: "Over-Exploited", net_avail_ham: 9600 },
      { id: "pennagaram", name: "Pennagaram", stage: 124.9, aquifer: "Fissured Hard-Rock", category: "Over-Exploited", net_avail_ham: 11800 },
    ],
    Madurai: [
      { id: "vadipatti", name: "Vadipatti", stage: 122.5, aquifer: "Fissured Hard-Rock", category: "Over-Exploited", net_avail_ham: 11900 },
      { id: "melur", name: "Melur", stage: 115.8, aquifer: "Fissured Hard-Rock", category: "Over-Exploited", net_avail_ham: 13200 },
      { id: "thirumangalam", name: "Thirumangalam", stage: 118.4, aquifer: "Fissured Hard-Rock", category: "Over-Exploited", net_avail_ham: 12600 },
    ],
    Thanjavur: [
      { id: "kumbakonam", name: "Kumbakonam", stage: 89.2, aquifer: "Coastal Alluvium", category: "Semi-Critical", net_avail_ham: 18400 },
      { id: "papanasam", name: "Papanasam", stage: 84.6, aquifer: "Coastal Alluvium", category: "Semi-Critical", net_avail_ham: 19800 },
      { id: "orathanadu", name: "Orathanadu", stage: 92.1, aquifer: "Coastal Alluvium", category: "Critical", net_avail_ham: 17600 },
    ],
  },
  Gujarat: {
    Mehsana: [
      { id: "kadi", name: "Kadi", stage: 148.2, aquifer: "Alluvial & Basaltic Hard-Rock", category: "Over-Exploited", net_avail_ham: 14200 },
      { id: "visnagar", name: "Visnagar", stage: 154.6, aquifer: "Alluvial & Basaltic Hard-Rock", category: "Over-Exploited", net_avail_ham: 13100 },
      { id: "vijapur", name: "Vijapur", stage: 142.9, aquifer: "Alluvial & Basaltic Hard-Rock", category: "Over-Exploited", net_avail_ham: 15300 },
      { id: "vadnagar", name: "Vadnagar", stage: 138.1, aquifer: "Alluvial & Basaltic Hard-Rock", category: "Over-Exploited", net_avail_ham: 16000 },
    ],
    Banaskantha: [
      { id: "deesa", name: "Deesa", stage: 156.4, aquifer: "Alluvial & Basaltic Hard-Rock", category: "Over-Exploited", net_avail_ham: 15900 },
      { id: "palanpur", name: "Palanpur", stage: 144.8, aquifer: "Alluvial & Basaltic Hard-Rock", category: "Over-Exploited", net_avail_ham: 17200 },
      { id: "dhanera", name: "Dhanera", stage: 162.1, aquifer: "Alluvial & Basaltic Hard-Rock", category: "Over-Exploited", net_avail_ham: 14500 },
    ],
    Patan: [
      { id: "siddhpur", name: "Siddhpur", stage: 149.5, aquifer: "Alluvial & Basaltic Hard-Rock", category: "Over-Exploited", net_avail_ham: 13800 },
      { id: "chanasma", name: "Chanasma", stage: 143.0, aquifer: "Alluvial & Basaltic Hard-Rock", category: "Over-Exploited", net_avail_ham: 14900 },
      { id: "radhanpur", name: "Radhanpur", stage: 131.7, aquifer: "Alluvial & Basaltic Hard-Rock", category: "Over-Exploited", net_avail_ham: 16800 },
    ],
    Rajkot: [
      { id: "dhoraji", name: "Dhoraji", stage: 118.4, aquifer: "Alluvial & Basaltic Hard-Rock", category: "Over-Exploited", net_avail_ham: 15200 },
      { id: "gondal", name: "Gondal", stage: 112.6, aquifer: "Alluvial & Basaltic Hard-Rock", category: "Over-Exploited", net_avail_ham: 16800 },
      { id: "jetpur", name: "Jetpur", stage: 121.9, aquifer: "Alluvial & Basaltic Hard-Rock", category: "Over-Exploited", net_avail_ham: 14400 },
    ],
    Junagadh: [
      { id: "keshod", name: "Keshod", stage: 114.2, aquifer: "Alluvial & Basaltic Hard-Rock", category: "Over-Exploited", net_avail_ham: 16500 },
      { id: "mangrol", name: "Mangrol", stage: 108.7, aquifer: "Alluvial & Basaltic Hard-Rock", category: "Over-Exploited", net_avail_ham: 17800 },
      { id: "manavadar", name: "Manavadar", stage: 119.5, aquifer: "Alluvial & Basaltic Hard-Rock", category: "Over-Exploited", net_avail_ham: 15400 },
    ],
    Ahmedabad: [
      { id: "daskroi", name: "Daskroi", stage: 132.4, aquifer: "Alluvial & Basaltic Hard-Rock", category: "Over-Exploited", net_avail_ham: 16900 },
      { id: "sanand", name: "Sanand", stage: 126.8, aquifer: "Alluvial & Basaltic Hard-Rock", category: "Over-Exploited", net_avail_ham: 18200 },
      { id: "dholka", name: "Dholka", stage: 119.3, aquifer: "Alluvial & Basaltic Hard-Rock", category: "Over-Exploited", net_avail_ham: 19800 },
    ],
  },
  Maharashtra: {
    Pune: [
      { id: "baramati", name: "Baramati", stage: 114.8, aquifer: "Deccan Trap Basalt", category: "Over-Exploited", net_avail_ham: 14600 },
      { id: "shirur", name: "Shirur", stage: 119.2, aquifer: "Deccan Trap Basalt", category: "Over-Exploited", net_avail_ham: 13800 },
      { id: "indapur", name: "Indapur", stage: 108.5, aquifer: "Deccan Trap Basalt", category: "Over-Exploited", net_avail_ham: 15900 },
      { id: "daund", name: "Daund", stage: 112.0, aquifer: "Deccan Trap Basalt", category: "Over-Exploited", net_avail_ham: 15100 },
    ],
    Ahmednagar: [
      { id: "rahuri", name: "Rahuri", stage: 122.4, aquifer: "Deccan Trap Basalt", category: "Over-Exploited", net_avail_ham: 13900 },
      { id: "sangamner", name: "Sangamner", stage: 128.7, aquifer: "Deccan Trap Basalt", category: "Over-Exploited", net_avail_ham: 12800 },
      { id: "kopargaon", name: "Kopargaon", stage: 116.5, aquifer: "Deccan Trap Basalt", category: "Over-Exploited", net_avail_ham: 14800 },
    ],
    Solapur: [
      { id: "pandharpur", name: "Pandharpur", stage: 112.6, aquifer: "Deccan Trap Basalt", category: "Over-Exploited", net_avail_ham: 15400 },
      { id: "malshiras", name: "Malshiras", stage: 118.3, aquifer: "Deccan Trap Basalt", category: "Over-Exploited", net_avail_ham: 14200 },
      { id: "karmala", name: "Karmala", stage: 106.8, aquifer: "Deccan Trap Basalt", category: "Over-Exploited", net_avail_ham: 16500 },
    ],
    Jalgaon: [
      { id: "raver", name: "Raver", stage: 124.9, aquifer: "Deccan Trap Basalt", category: "Over-Exploited", net_avail_ham: 13600 },
      { id: "yawal", name: "Yawal", stage: 119.4, aquifer: "Deccan Trap Basalt", category: "Over-Exploited", net_avail_ham: 14500 },
      { id: "chopda", name: "Chopda", stage: 115.1, aquifer: "Deccan Trap Basalt", category: "Over-Exploited", net_avail_ham: 15200 },
    ],
    Nashik: [
      { id: "niphad", name: "Niphad", stage: 118.2, aquifer: "Deccan Trap Basalt", category: "Over-Exploited", net_avail_ham: 14800 },
      { id: "yeola", name: "Yeola", stage: 124.6, aquifer: "Deccan Trap Basalt", category: "Over-Exploited", net_avail_ham: 13700 },
      { id: "sinnar", name: "Sinnar", stage: 111.9, aquifer: "Deccan Trap Basalt", category: "Over-Exploited", net_avail_ham: 16100 },
    ],
    "Chhatrapati Sambhajinagar": [
      { id: "gangapur", name: "Gangapur", stage: 109.4, aquifer: "Deccan Trap Basalt", category: "Over-Exploited", net_avail_ham: 15600 },
      { id: "vaijapur", name: "Vaijapur", stage: 115.8, aquifer: "Deccan Trap Basalt", category: "Over-Exploited", net_avail_ham: 14500 },
      { id: "paithan", name: "Paithan", stage: 102.3, aquifer: "Deccan Trap Basalt", category: "Over-Exploited", net_avail_ham: 17200 },
    ],
  },
  "Andhra Pradesh": {
    Anantapur: [
      { id: "dharmavaram", name: "Dharmavaram", stage: 119.5, aquifer: "Granitic Hard-Rock", category: "Over-Exploited", net_avail_ham: 11800 },
      { id: "kadiri", name: "Kadiri", stage: 124.1, aquifer: "Granitic Hard-Rock", category: "Over-Exploited", net_avail_ham: 10900 },
      { id: "tadipatri", name: "Tadipatri", stage: 112.8, aquifer: "Granitic Hard-Rock", category: "Over-Exploited", net_avail_ham: 13200 },
      { id: "penukonda", name: "Penukonda", stage: 116.3, aquifer: "Granitic Hard-Rock", category: "Over-Exploited", net_avail_ham: 12400 },
    ],
    Chittoor: [
      { id: "madanapalle", name: "Madanapalle", stage: 128.4, aquifer: "Granitic Hard-Rock", category: "Over-Exploited", net_avail_ham: 10400 },
      { id: "punganur", name: "Punganur", stage: 122.9, aquifer: "Granitic Hard-Rock", category: "Over-Exploited", net_avail_ham: 11200 },
      { id: "palamaner", name: "Palamaner", stage: 115.6, aquifer: "Granitic Hard-Rock", category: "Over-Exploited", net_avail_ham: 12600 },
    ],
    Kurnool: [
      { id: "dhone", name: "Dhone", stage: 108.2, aquifer: "Granitic Hard-Rock", category: "Over-Exploited", net_avail_ham: 14500 },
      { id: "allagadda", name: "Allagadda", stage: 102.7, aquifer: "Granitic Hard-Rock", category: "Over-Exploited", net_avail_ham: 15800 },
      { id: "yemmiganur", name: "Yemmiganur", stage: 114.1, aquifer: "Granitic Hard-Rock", category: "Over-Exploited", net_avail_ham: 13600 },
    ],
    Guntur: [
      { id: "tenali", name: "Tenali", stage: 82.4, aquifer: "Deltaic Alluvium", category: "Semi-Critical", net_avail_ham: 21500 },
      { id: "mangalagiri", name: "Mangalagiri", stage: 88.9, aquifer: "Deltaic Alluvium", category: "Semi-Critical", net_avail_ham: 19800 },
      { id: "sattenapalle", name: "Sattenapalle", stage: 94.6, aquifer: "Deltaic Alluvium", category: "Critical", net_avail_ham: 18200 },
    ],
  },
  Telangana: {
    "Ranga Reddy": [
      { id: "maheshwaram", name: "Maheshwaram", stage: 126.8, aquifer: "Precambrian Hard-Rock", category: "Over-Exploited", net_avail_ham: 9800 },
      { id: "ibrahimpatnam", name: "Ibrahimpatnam", stage: 119.4, aquifer: "Precambrian Hard-Rock", category: "Over-Exploited", net_avail_ham: 11200 },
      { id: "chevella", name: "Chevella", stage: 112.5, aquifer: "Precambrian Hard-Rock", category: "Over-Exploited", net_avail_ham: 12800 },
    ],
    Siddipet: [
      { id: "siddipet_urban", name: "Siddipet", stage: 114.2, aquifer: "Precambrian Hard-Rock", category: "Over-Exploited", net_avail_ham: 13400 },
      { id: "gajwel", name: "Gajwel", stage: 108.9, aquifer: "Precambrian Hard-Rock", category: "Over-Exploited", net_avail_ham: 14600 },
    ],
    Mahabubnagar: [
      { id: "jadcherla", name: "Jadcherla", stage: 118.6, aquifer: "Precambrian Hard-Rock", category: "Over-Exploited", net_avail_ham: 12100 },
      { id: "shadnagar", name: "Shadnagar", stage: 123.1, aquifer: "Precambrian Hard-Rock", category: "Over-Exploited", net_avail_ham: 11400 },
    ],
    Nalgonda: [
      { id: "devarakonda", name: "Devarakonda", stage: 115.4, aquifer: "Precambrian Hard-Rock", category: "Over-Exploited", net_avail_ham: 13200 },
      { id: "miryalaguda", name: "Miryalaguda", stage: 101.8, aquifer: "Precambrian Hard-Rock", category: "Over-Exploited", net_avail_ham: 16400 },
    ],
  },
  "Madhya Pradesh": {
    Indore: [
      { id: "sanwer", name: "Sanwer", stage: 128.4, aquifer: "Malwa Basalt", category: "Over-Exploited", net_avail_ham: 13800 },
      { id: "depalpur", name: "Depalpur", stage: 121.7, aquifer: "Malwa Basalt", category: "Over-Exploited", net_avail_ham: 14900 },
      { id: "mhow", name: "Mhow", stage: 114.5, aquifer: "Malwa Basalt", category: "Over-Exploited", net_avail_ham: 16200 },
    ],
    Ujjain: [
      { id: "ghatiya", name: "Ghatiya", stage: 132.1, aquifer: "Malwa Basalt", category: "Over-Exploited", net_avail_ham: 12900 },
      { id: "barnagar", name: "Barnagar", stage: 126.8, aquifer: "Malwa Basalt", category: "Over-Exploited", net_avail_ham: 13800 },
      { id: "khachrod", name: "Khachrod", stage: 129.5, aquifer: "Malwa Basalt", category: "Over-Exploited", net_avail_ham: 13400 },
    ],
    Dewas: [
      { id: "sonkatch", name: "Sonkatch", stage: 124.3, aquifer: "Malwa Basalt", category: "Over-Exploited", net_avail_ham: 14200 },
      { id: "bagli", name: "Bagli", stage: 108.9, aquifer: "Malwa Basalt", category: "Over-Exploited", net_avail_ham: 16800 },
    ],
    Mandsaur: [
      { id: "malhargarh", name: "Malhargarh", stage: 136.7, aquifer: "Malwa Basalt", category: "Over-Exploited", net_avail_ham: 12100 },
      { id: "sitamau", name: "Sitamau", stage: 129.2, aquifer: "Malwa Basalt", category: "Over-Exploited", net_avail_ham: 13400 },
    ],
  },
  Bihar: {
    Patna: [
      { id: "danapur", name: "Danapur", stage: 68.4, aquifer: "Deep Gangetic Floodplain Alluvium", category: "Safe", net_avail_ham: 24200 },
      { id: "phulwari", name: "Phulwari", stage: 72.1, aquifer: "Deep Gangetic Floodplain Alluvium", category: "Semi-Critical", net_avail_ham: 22800 },
      { id: "bihta", name: "Bihta", stage: 64.9, aquifer: "Deep Gangetic Floodplain Alluvium", category: "Safe", net_avail_ham: 26100 },
    ],
    Gaya: [
      { id: "bodh_gaya", name: "Bodh Gaya", stage: 78.5, aquifer: "Deep Gangetic Floodplain Alluvium", category: "Semi-Critical", net_avail_ham: 20400 },
      { id: "tikari", name: "Tikari", stage: 82.3, aquifer: "Deep Gangetic Floodplain Alluvium", category: "Semi-Critical", net_avail_ham: 19200 },
      { id: "sherghati", name: "Sherghati", stage: 71.8, aquifer: "Deep Gangetic Floodplain Alluvium", category: "Semi-Critical", net_avail_ham: 21800 },
    ],
    Muzaffarpur: [
      { id: "bochahan", name: "Bochahan", stage: 58.2, aquifer: "Deep Gangetic Floodplain Alluvium", category: "Safe", net_avail_ham: 28400 },
      { id: "kanti", name: "Kanti", stage: 62.7, aquifer: "Deep Gangetic Floodplain Alluvium", category: "Safe", net_avail_ham: 26900 },
    ],
    Nalanda: [
      { id: "biharsharif", name: "Biharsharif", stage: 79.4, aquifer: "Deep Gangetic Floodplain Alluvium", category: "Semi-Critical", net_avail_ham: 21300 },
      { id: "rajgir", name: "Rajgir", stage: 73.1, aquifer: "Deep Gangetic Floodplain Alluvium", category: "Semi-Critical", net_avail_ham: 23500 },
    ],
  },
  "West Bengal": {
    Murshidabad: [
      { id: "berhampore", name: "Berhampore", stage: 69.4, aquifer: "Deltaic & Fluvial Alluvium", category: "Safe", net_avail_ham: 26400 },
      { id: "beldanga", name: "Beldanga", stage: 74.2, aquifer: "Deltaic & Fluvial Alluvium", category: "Semi-Critical", net_avail_ham: 24800 },
      { id: "domkal", name: "Domkal", stage: 78.6, aquifer: "Deltaic & Fluvial Alluvium", category: "Semi-Critical", net_avail_ham: 23200 },
    ],
    Nadia: [
      { id: "ranaghat", name: "Ranaghat", stage: 72.8, aquifer: "Deltaic & Fluvial Alluvium", category: "Semi-Critical", net_avail_ham: 25100 },
      { id: "krishnanagar", name: "Krishnanagar", stage: 68.3, aquifer: "Deltaic & Fluvial Alluvium", category: "Safe", net_avail_ham: 27200 },
      { id: "chakdaha", name: "Chakdaha", stage: 75.9, aquifer: "Deltaic & Fluvial Alluvium", category: "Semi-Critical", net_avail_ham: 23900 },
    ],
    "North 24 Parganas": [
      { id: "barasat", name: "Barasat", stage: 76.5, aquifer: "Deltaic & Fluvial Alluvium", category: "Semi-Critical", net_avail_ham: 22800 },
      { id: "habra", name: "Habra", stage: 81.2, aquifer: "Deltaic & Fluvial Alluvium", category: "Semi-Critical", net_avail_ham: 21400 },
    ],
    "Purba Bardhaman": [
      { id: "kalna", name: "Kalna", stage: 64.1, aquifer: "Deltaic & Fluvial Alluvium", category: "Safe", net_avail_ham: 28900 },
      { id: "memari", name: "Memari", stage: 69.8, aquifer: "Deltaic & Fluvial Alluvium", category: "Safe", net_avail_ham: 26700 },
    ],
  },
  Odisha: {
    Khordha: [
      { id: "jatni", name: "Jatni", stage: 56.4, aquifer: "Coastal Alluvium & Hard-Rock", category: "Safe", net_avail_ham: 22400 },
      { id: "balianta", name: "Balianta", stage: 62.1, aquifer: "Coastal Alluvium & Hard-Rock", category: "Safe", net_avail_ham: 20800 },
      { id: "begunia", name: "Begunia", stage: 51.8, aquifer: "Coastal Alluvium & Hard-Rock", category: "Safe", net_avail_ham: 24100 },
    ],
    Cuttack: [
      { id: "salepur", name: "Salepur", stage: 58.7, aquifer: "Coastal Alluvium & Hard-Rock", category: "Safe", net_avail_ham: 23500 },
      { id: "mahanga", name: "Mahanga", stage: 53.2, aquifer: "Coastal Alluvium & Hard-Rock", category: "Safe", net_avail_ham: 25800 },
    ],
    Ganjam: [
      { id: "hinjilicut", name: "Hinjilicut", stage: 64.9, aquifer: "Coastal Alluvium & Hard-Rock", category: "Safe", net_avail_ham: 21200 },
      { id: "aska", name: "Aska", stage: 59.3, aquifer: "Coastal Alluvium & Hard-Rock", category: "Safe", net_avail_ham: 23100 },
    ],
  },
  Kerala: {
    Palakkad: [
      { id: "chittur", name: "Chittur", stage: 82.4, aquifer: "Laterite & Hard-Rock", category: "Semi-Critical", net_avail_ham: 15400 },
      { id: "malampuzha", name: "Malampuzha", stage: 68.9, aquifer: "Laterite & Hard-Rock", category: "Safe", net_avail_ham: 18200 },
      { id: "alathur", name: "Alathur", stage: 74.5, aquifer: "Laterite & Hard-Rock", category: "Semi-Critical", net_avail_ham: 16900 },
    ],
    Thrissur: [
      { id: "chalakudy", name: "Chalakudy", stage: 61.2, aquifer: "Laterite & Coastal Sediments", category: "Safe", net_avail_ham: 21800 },
      { id: "irinjalakuda", name: "Irinjalakuda", stage: 66.8, aquifer: "Laterite & Coastal Sediments", category: "Safe", net_avail_ham: 19600 },
    ],
    Ernakulam: [
      { id: "aluva", name: "Aluva", stage: 59.4, aquifer: "Coastal Sediments", category: "Safe", net_avail_ham: 23400 },
      { id: "angamaly", name: "Angamaly", stage: 64.0, aquifer: "Coastal Sediments", category: "Safe", net_avail_ham: 21900 },
    ],
  },
  Assam: {
    Kamrup: [
      { id: "hajo", name: "Hajo", stage: 42.6, aquifer: "Brahmaputra Valley Alluvial", category: "Safe", net_avail_ham: 32400 },
      { id: "dimoria", name: "Dimoria", stage: 38.9, aquifer: "Brahmaputra Valley Alluvial", category: "Safe", net_avail_ham: 34800 },
      { id: "chaygaon", name: "Chaygaon", stage: 45.1, aquifer: "Brahmaputra Valley Alluvial", category: "Safe", net_avail_ham: 31000 },
    ],
    Dibrugarh: [
      { id: "tengakhat", name: "Tengakhat", stage: 36.8, aquifer: "Brahmaputra Valley Alluvial", category: "Safe", net_avail_ham: 36200 },
      { id: "khowang", name: "Khowang", stage: 41.2, aquifer: "Brahmaputra Valley Alluvial", category: "Safe", net_avail_ham: 33900 },
    ],
  },
  "Himachal Pradesh": {
    Una: [
      { id: "haroli", name: "Haroli", stage: 98.4, aquifer: "Intermontane Valley Alluvium", category: "Critical", net_avail_ham: 14200 },
      { id: "amb", name: "Amb", stage: 86.2, aquifer: "Intermontane Valley Alluvium", category: "Semi-Critical", net_avail_ham: 16800 },
      { id: "gagret", name: "Gagret", stage: 92.5, aquifer: "Intermontane Valley Alluvium", category: "Critical", net_avail_ham: 15400 },
    ],
    Kangra: [
      { id: "nurpur", name: "Nurpur", stage: 74.6, aquifer: "Sub-Himalayan Valley", category: "Semi-Critical", net_avail_ham: 19800 },
      { id: "kangra_block", name: "Kangra", stage: 68.3, aquifer: "Sub-Himalayan Valley", category: "Safe", net_avail_ham: 21500 },
      { id: "indora", name: "Indora", stage: 88.9, aquifer: "Sub-Himalayan Valley", category: "Semi-Critical", net_avail_ham: 16200 },
    ],
    Solan: [
      { id: "nalagarh", name: "Nalagarh", stage: 104.8, aquifer: "Intermontane Alluvium", category: "Over-Exploited", net_avail_ham: 13900 },
      { id: "dharampur", name: "Dharampur", stage: 72.1, aquifer: "Sub-Himalayan Valley", category: "Semi-Critical", net_avail_ham: 18400 },
    ],
    Sirmaur: [
      { id: "paonta_sahib", name: "Paonta Sahib", stage: 94.7, aquifer: "Intermontane Alluvium", category: "Critical", net_avail_ham: 16200 },
      { id: "nahan", name: "Nahan", stage: 71.5, aquifer: "Sub-Himalayan Valley", category: "Semi-Critical", net_avail_ham: 19100 },
    ],
  },
  Chhattisgarh: {
    Raipur: [
      { id: "dharsiwa", name: "Dharsiwa", stage: 71.4, aquifer: "Archean Granites & Limestone", category: "Semi-Critical", net_avail_ham: 21400 },
      { id: "arang", name: "Arang", stage: 66.8, aquifer: "Archean Granites & Limestone", category: "Safe", net_avail_ham: 23100 },
      { id: "abhanpur", name: "Abhanpur", stage: 62.5, aquifer: "Archean Granites & Limestone", category: "Safe", net_avail_ham: 24900 },
    ],
    Durg: [
      { id: "patan_cg", name: "Patan", stage: 76.2, aquifer: "Archean Granites & Limestone", category: "Semi-Critical", net_avail_ham: 19800 },
      { id: "dhamdha", name: "Dhamdha", stage: 69.7, aquifer: "Archean Granites & Limestone", category: "Safe", net_avail_ham: 22100 },
    ],
    Bilaspur: [
      { id: "bilha", name: "Bilha", stage: 64.3, aquifer: "Archean Granites & Limestone", category: "Safe", net_avail_ham: 24200 },
      { id: "masturi", name: "Masturi", stage: 59.8, aquifer: "Archean Granites & Limestone", category: "Safe", net_avail_ham: 26000 },
    ],
  },
  Jharkhand: {
    Ranchi: [
      { id: "kanke", name: "Kanke", stage: 74.2, aquifer: "Chota Nagpur Granitic Hard-Rock", category: "Semi-Critical", net_avail_ham: 19200 },
      { id: "namkum", name: "Namkum", stage: 68.6, aquifer: "Chota Nagpur Granitic Hard-Rock", category: "Safe", net_avail_ham: 21400 },
      { id: "ratu", name: "Ratu", stage: 71.9, aquifer: "Chota Nagpur Granitic Hard-Rock", category: "Semi-Critical", net_avail_ham: 20100 },
    ],
    Dhanbad: [
      { id: "govindpur", name: "Govindpur", stage: 78.4, aquifer: "Chota Nagpur Granitic Hard-Rock", category: "Semi-Critical", net_avail_ham: 17800 },
      { id: "nirsa", name: "Nirsa", stage: 72.1, aquifer: "Chota Nagpur Granitic Hard-Rock", category: "Semi-Critical", net_avail_ham: 19600 },
    ],
  },
  Uttarakhand: {
    Dehradun: [
      { id: "sahaspur", name: "Sahaspur", stage: 98.4, aquifer: "Bhabar Boulder Gravel & Terai", category: "Critical", net_avail_ham: 16800 },
      { id: "doiwala", name: "Doiwala", stage: 92.6, aquifer: "Bhabar Boulder Gravel & Terai", category: "Critical", net_avail_ham: 18400 },
      { id: "vikasnagar", name: "Vikasnagar", stage: 104.2, aquifer: "Bhabar Boulder Gravel & Terai", category: "Over-Exploited", net_avail_ham: 15200 },
    ],
    Haridwar: [
      { id: "roorkee", name: "Roorkee", stage: 118.6, aquifer: "Bhabar Boulder Gravel & Terai", category: "Over-Exploited", net_avail_ham: 17900 },
      { id: "bhagwanpur", name: "Bhagwanpur", stage: 124.2, aquifer: "Bhabar Boulder Gravel & Terai", category: "Over-Exploited", net_avail_ham: 16400 },
      { id: "bahadrabad", name: "Bahadrabad", stage: 112.9, aquifer: "Bhabar Boulder Gravel & Terai", category: "Over-Exploited", net_avail_ham: 19200 },
    ],
    "Udham Singh Nagar": [
      { id: "kashipur", name: "Kashipur", stage: 115.4, aquifer: "Bhabar Boulder Gravel & Terai", category: "Over-Exploited", net_avail_ham: 18200 },
      { id: "khatima", name: "Khatima", stage: 96.8, aquifer: "Bhabar Boulder Gravel & Terai", category: "Critical", net_avail_ham: 21500 },
      { id: "rudrapur", name: "Rudrapur", stage: 109.1, aquifer: "Bhabar Boulder Gravel & Terai", category: "Over-Exploited", net_avail_ham: 19600 },
    ],
  },
  Delhi: {
    "South West": [
      { id: "najafgarh", name: "Najafgarh", stage: 164.8, aquifer: "Yamuna Alluvium & Quartzite", category: "Over-Exploited", net_avail_ham: 7200 },
      { id: "kapashera", name: "Kapashera", stage: 158.2, aquifer: "Yamuna Alluvium & Quartzite", category: "Over-Exploited", net_avail_ham: 6800 },
      { id: "dwarka", name: "Dwarka", stage: 172.5, aquifer: "Yamuna Alluvium & Quartzite", category: "Over-Exploited", net_avail_ham: 5900 },
    ],
    "North West": [
      { id: "kanjhawala", name: "Kanjhawala", stage: 152.1, aquifer: "Yamuna Alluvium & Quartzite", category: "Over-Exploited", net_avail_ham: 7900 },
      { id: "alipur", name: "Alipur", stage: 146.4, aquifer: "Yamuna Alluvium & Quartzite", category: "Over-Exploited", net_avail_ham: 8400 },
    ],
    South: [
      { id: "mehrauli", name: "Mehrauli", stage: 179.2, aquifer: "Yamuna Alluvium & Quartzite", category: "Over-Exploited", net_avail_ham: 5400 },
      { id: "hauz_khas", name: "Hauz Khas", stage: 168.0, aquifer: "Yamuna Alluvium & Quartzite", category: "Over-Exploited", net_avail_ham: 5800 },
    ],
  },
  "Jammu & Kashmir": {
    Jammu: [
      { id: "rs_pura", name: "R.S. Pura", stage: 64.2, aquifer: "Karewa & Valley Alluvium", category: "Safe", net_avail_ham: 24800 },
      { id: "bishnah", name: "Bishnah", stage: 61.8, aquifer: "Karewa & Valley Alluvium", category: "Safe", net_avail_ham: 26100 },
      { id: "akhnoor", name: "Akhnoor", stage: 55.4, aquifer: "Karewa & Valley Alluvium", category: "Safe", net_avail_ham: 28400 },
    ],
    Kathua: [
      { id: "barnoti", name: "Barnoti", stage: 58.9, aquifer: "Karewa & Valley Alluvium", category: "Safe", net_avail_ham: 27200 },
      { id: "hiranagar", name: "Hiranagar", stage: 62.4, aquifer: "Karewa & Valley Alluvium", category: "Safe", net_avail_ham: 25900 },
    ],
  },
};
