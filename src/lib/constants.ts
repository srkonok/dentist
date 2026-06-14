export const DOCTOR = {
  name: "Dr. Atoshe Islam",
  nameBn: "ডাঃ আতশে ইসলাম",
  credentials: "BDS (DU); PGT (Oral & Maxillofacial Surgery)",
  bmdcReg: "16100",
  phone: "TODO: ADD NUMBER",
  email: "TODO: ADD EMAIL",
  facebookUrl: "https://www.facebook.com/profile.php?id=61573408361425",
  facebookPage: "HD Popular Dental Care",
  consultationHours: "10:00 AM – 3:00 PM", // TODO: confirm if hours apply to both chambers
} as const;

export const CHAMBERS = [
  {
    id: "mirpur",
    nameEn: "Mirpur Dental Clinic",
    nameBn: "মিরপুর ডেন্টাল ক্লিনিক",
    addressEn: "1st Floor, Navy Market, Mirpur 14, Dhaka-1206", // TODO: confirm floor (source also says ২য় তলা / 2nd floor)
    addressBn: "নেভী মার্কেট, মিরপুর ১৪, ঢাকা-১২০৬",
    mapEmbedUrl: "", // TODO: add Google Maps embed URL
    lat: 23.8223,
    lng: 90.3654,
  },
  {
    id: "kafrul",
    nameEn: "HD Popular Dental Care",
    nameBn: "এইচডি পপুলার ডেন্টাল কেয়ার",
    addressEn: "202/5, West Kafrul, Taltala, Agargaon, Dhaka-1207",
    addressBn: "২০২/৫, পশ্চিম কাফরুল, তালতলা, আগারগাঁও, ঢাকা-১২০৭",
    mapEmbedUrl: "", // TODO: add Google Maps embed URL
    lat: 23.7776,
    lng: 90.3699,
  },
] as const;

export const SITE_URL = "https://dratosheislam.com"; // TODO: update with real domain
