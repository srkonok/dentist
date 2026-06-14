export const DOCTOR = {
  name: "Dr. Atoshe Islam",
  nameBn: "ডাঃ আতশে ইসলাম",
  credentials: "BDS (DU); PGT (Oral & Maxillofacial Surgery)",
  bmdcReg: "16100",
  phone: "+8801735470488",
  email: "dr.atoshe@gmail.com",
  facebookUrl: "https://www.facebook.com/profile.php?id=61573408361425",
  facebookPage: "HD Popular Dental Care",
  consultationHours: "Mirpur: 10AM–3PM · HD Popular: 5PM–10PM · Closed Fri",
} as const;

export const CHAMBERS = [
  {
    id: "mirpur",
    nameEn: "Mirpur Dental Care",
    nameBn: "মিরপুর ডেন্টাল কেয়ার",
    addressEn: "1st Floor, Navy Market, Mirpur 14, Dhaka-1206", // TODO: confirm floor (source also says ২য় তলা / 2nd floor)
    addressBn: "নেভী মার্কেট, মিরপুর ১৪, ঢাকা-১২০৬",
    hours: "10:00 AM – 3:00 PM",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.123!2d90.3882423!3d23.7995161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7cc4056a803%3A0x8358e8b72a32f3a6!2sMirpur%20Dental%20Care!5e0!3m2!1sen!2sbd!4v1718000000000",
    mapsUrl: "https://maps.app.goo.gl/UXUDLZhz2AVR1ZRDA",
    lat: 23.7995161,
    lng: 90.3882423,
  },
  {
    id: "kafrul",
    nameEn: "HD Popular Dental Care",
    nameBn: "এইচডি পপুলার ডেন্টাল কেয়ার",
    addressEn: "202/5, West Kafrul, Taltala, Agargaon, Dhaka-1207",
    addressBn: "২০২/৫, পশ্চিম কাফরুল, তালতলা, আগারগাঁও, ঢাকা-১২০৭",
    hours: "5:00 PM – 10:00 PM",
    mapEmbedUrl: "", // TODO: add Google Maps embed URL
    lat: 23.7776,
    lng: 90.3699,
  },
] as const;

export const SITE_URL = "https://dratosheislam.com"; // TODO: update with real domain
