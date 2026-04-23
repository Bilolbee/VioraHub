import { SiteContent } from "@/lib/cms-types";

const nowIso = new Date().toISOString();

export const defaultContent: SiteContent = {
  version: 1,
  updatedAt: nowIso,
  updatedBy: "system",
  hero: {
    badge: "Premium agentlik",
    heading: "Biz raqamli kuchni quramiz.",
    subtitle: "Veb-sayt, Telegram bot, marketing va osish tizimlari.",
    primaryCta: "Portfolio korish",
    secondaryCta: "Boshlash"
  },
  stats: [
    { label: "Yakunlangan loyiha", value: 10, suffix: "+" },
    { label: "Fokuslangan jamoa", value: 100, suffix: "%" },
    { label: "Orta yetkazish vaqti", value: 7, suffix: " kun" },
    { label: "Sifat nazorati", value: 100, suffix: "%" }
  ],
  services: [
    {
      title: "Veb-sayt ishlab chiqish",
      description: "Konversiya uchun qurilgan landing, korporativ va ecommerce saytlar."
    },
    {
      title: "Telegram bot ishlab chiqish",
      description: "Savdo, CRM va avtomatlashtirish botlari bilan qolda ishlashni kamaytiramiz."
    },
    {
      title: "Marketing strategiyasi",
      description: "Taklif joylashuvi, pullik trafik va funnel dizayni orqali barqaror lid oqimi."
    },
    {
      title: "Video production",
      description: "Reels, promo va reklama kreativlari tomosha va javobni oshirish uchun."
    },
    {
      title: "Brending",
      description: "Premium korinadigan va barcha kanallarda bir xil ishlaydigan identika."
    },
    {
      title: "Avtomatizatsiya tizimlari",
      description: "Sayt, CRM va kommunikatsiyani boglaydigan yagona ish jarayonlari."
    }
  ],
  portfolio: [
    {
      name: "Credo Mobile",
      category: "Veb-saytlar",
      result: "Redizayndan keyin konversiya 23% ga oshdi",
      tools: "Next.js, Tailwind, GA4"
    },
    {
      name: "SmartCareer AI",
      category: "Botlar",
      result: "Nomzodlarga javob berish tezligi 4 baravar oshdi",
      tools: "Telegram API, Node, OpenAI"
    },
    {
      name: "Restaurant Bot",
      category: "Botlar",
      result: "Bron buyurtmalarining 68% avtomatlashtirildi",
      tools: "Telegram Bot API, CRM"
    },
    {
      name: "Clinic Landing Page",
      category: "Veb-saytlar",
      result: "Lid narxi 31% ga tushdi",
      tools: "Next.js, Meta Ads"
    },
    {
      name: "Ecommerce Funnel",
      category: "Reklama",
      result: "Birinchi 45 kunda ROAS 2.7x ga chiqdi",
      tools: "Shopify, Pixel, Funnels"
    }
  ],
  whyUs: [
    "Toliq jamoa",
    "Tez ishga tushirish",
    "Zamonaviy texnologiya",
    "Biznesga yonaltirilgan"
  ],
  about: {
    kicker: "Biz haqimizda",
    title: "Natijaga obses qilingan fokusli jamoa.",
    subtitle: "Dizayn, development va growth strategiyani birlashtirib premium mahsulotni tez chiqaramiz.",
    mission: "Biznesga faqat korinish emas, real leverage beradigan raqamli infratuzilma qurish.",
    approach: "Avval bottleneckni topamiz, keyin arxitekturani chizamiz va ochovli sprintlarda bajarib beramiz.",
    promise: "Birinchi qongiroqdan launchgacha aniq aloqa, tez iteratsiya va qatiy sifat nazorati."
  },
  testimonials: [
    {
      name: "Azizbek T.",
      role: "Clinic Founder",
      quote: "Jamoa faqat sayt qilgani yoq, real lid narxini tushirib berdi."
    },
    {
      name: "Madina S.",
      role: "Ecommerce Owner",
      quote: "Strategiya, funnel va kreativ bir jamoada bolgani uchun natija tez chiqdi."
    }
  ],
  contact: {
    telegram: "https://t.me/viorahub",
    whatsapp: "https://wa.me/998900000000",
    phone: "+998900000000",
    email: "team@viorahub.com",
    instagram: "@viorahub"
  },
  seo: {
    title: "Viora Hub | Premium veb va raqamli agentlik",
    description: "Zamonaviy bizneslar uchun veb-sayt, Telegram bot, marketing va osish tizimlari.",
    ogTitle: "Viora Hub | Premium veb va raqamli agentlik",
    ogDescription: "Zamonaviy bizneslar uchun veb-sayt, Telegram bot, marketing va osish tizimlari."
  },
  nav: [
    { href: "/", label: "Asosiy" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/services", label: "Xizmatlar" },
    { href: "/about", label: "Biz haqimizda" },
    { href: "/contact", label: "Aloqa" }
  ]
};
