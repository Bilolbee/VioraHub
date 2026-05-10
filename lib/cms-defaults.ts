import { SiteContent } from "@/lib/cms-types";

const nowIso = new Date().toISOString();

export const defaultContent: SiteContent = {
  version: 1,
  updatedAt: nowIso,
  updatedBy: "system",
  hero: {
    badge: "IT Studio · O'zbekiston",
    heading: "Biznesingizni avtomatlashtiramiz.",
    subtitle:
      "Telegram botlar, CRM tizimlari, mobil ilovalar va veb-saytlar — Ctrllab jamoasi sizning operatsiyangizni 14 kun ichida raqamli tizimga aylantiradi.",
    primaryCta: "Loyihani boshlash",
    secondaryCta: "Ishlarimizni ko'rish"
  },
  home: {
    trustLogos: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Telegram API",
      "React Native",
      "Flutter",
      "AWS"
    ],
    processSteps: [
      {
        title: "Brief va aniqlash",
        detail: "30 daqiqalik chaqiruvda muammo, maqsad va texnik talablarni aniq yozma kelishamiz."
      },
      {
        title: "Texnik arxitektura",
        detail: "Tizim sxemasi, ma'lumotlar bazasi va integratsiya nuqtalarini loyihalaymiz."
      },
      {
        title: "Sprint development",
        detail: "1-2 haftalik sprintlarda code yozamiz, har sprint oxirida demo ko'rsatamiz."
      },
      {
        title: "Test va ishga tushirish",
        detail: "QA, real foydalanuvchi testlari va production deploy — barchasini biz boshqaramiz."
      },
      {
        title: "Qo'llab-quvvatlash",
        detail: "Launchdan keyin 30 kun bepul support, keyin esa SLA bilan davomiy xizmat."
      }
    ],
    faq: [
      {
        question: "Telegram bot necha kunda tayyor bo'ladi?",
        answer:
          "Oddiy bot (FAQ, lead qabul qilish) — 5-7 kun. CRM integratsiyali kompleks bot — 14-21 kun. Aniq muddat brief yuborilgandan keyin beriladi."
      },
      {
        question: "Mobil ilova qaysi platformalar uchun ishlanadi?",
        answer:
          "iOS va Android uchun ham. Asosan React Native va Flutter texnologiyalarida — bitta kod, ikki platforma. Native Swift/Kotlin ham mavjud."
      },
      {
        question: "Tayyor saytni avtomatlashtirib bera olasizmi?",
        answer:
          "Ha. Mavjud sayt ustida CRM ulash, Telegram bildirishnoma, payment integratsiya, lead routing va analytics qo'shamiz."
      },
      {
        question: "Narx qancha turadi?",
        answer:
          "Loyiha skopiga bog'liq. Telegram bot — $300 dan, sayt — $800 dan, mobil ilova — $2500 dan, custom CRM — $1500 dan boshlanadi."
      },
      {
        question: "Source code beriladi-mi?",
        answer:
          "Ha, to'liq source code, hujjatlash va deploy guide — barchasi sizniki bo'ladi. Vendor lock-in yo'q."
      }
    ]
  },
  stats: [
    { label: "Ishga tushirilgan loyihalar", value: 64, suffix: "+" },
    { label: "Faol mijozlar", value: 28, suffix: "" },
    { label: "O'rtacha ishga tushirish", value: 14, suffix: " kun" },
    { label: "Mijoz qaytishi", value: 96, suffix: "%" }
  ],
  services: [
    {
      title: "Telegram bots",
      description:
        "Buyurtma qabul qilish, mijoz xizmati, CRM ulash va to'lov tizimlari bilan integratsiya — har turdagi bot yechimlar.",
      outcome: "24/7 mijoz aloqasi, lead avtomatlashtirish va operatsion tezlik.",
      deliverables: ["Order bot", "Support bot", "CRM sync", "Payment integration"]
    },
    {
      title: "Web automation",
      description:
        "Mavjud yoki yangi saytlarni CRM, analitika, lead-routing va workflow avtomatizatsiya bilan jonli tizimga aylantiramiz.",
      outcome: "Qo'l mehnatini kamaytirish va konversiyani o'lchanadigan qilish.",
      deliverables: ["Lead routing", "Auto-email", "Analytics setup", "API integration"]
    },
    {
      title: "CRM systems",
      description:
        "Sotuv pipeline, mijoz bazasi, hisobot va vazifalarni yagona panelda yig'adigan custom CRM ishlab chiqamiz.",
      outcome: "Sotuv jarayonini ko'rinarli va boshqariladigan qilish.",
      deliverables: ["Pipeline view", "Lead scoring", "Reports", "Team roles"]
    },
    {
      title: "Mobile apps",
      description:
        "iOS va Android uchun React Native yoki Flutter asosida tezkor, ishonchli va premium ko'rinadigan ilovalar.",
      outcome: "Ikki platformada bir vaqtning o'zida foydalanuvchilar uchun ishga tushish.",
      deliverables: ["iOS + Android", "Push notif", "App Store deploy", "Analytics"]
    }
  ],
  portfolio: [
    {
      name: "OrderHub Bot",
      category: "Telegram bots",
      challenge: "Restoran zanjiri har kuni 200+ qo'ng'iroqni qo'lda qabul qilardi.",
      solution: "Telegram bot orqali menyu, buyurtma, to'lov va kurer tayinlashni avtomatlashtirdik.",
      result: "Operator yuki -70%, buyurtma vaqti 4 daqiqadan 45 soniyaga tushdi.",
      tools: "Node.js, Telegram API, PostgreSQL"
    },
    {
      name: "FleetCRM",
      category: "CRM Systems",
      challenge: "Logistika kompaniyasida 12 ta menejer Excelda mijozlarni boshqarardi.",
      solution: "Custom CRM — pipeline, lead scoring, hisobot va Telegram integratsiya bilan.",
      result: "Sotuv tezligi 2.3x oshdi, leadlar yo'qolishi 0% ga tushdi.",
      tools: "Next.js, Postgres, Prisma"
    },
    {
      name: "MediCare App",
      category: "Mobile Apps",
      challenge: "Klinika online navbat olishda Instagram DM ga tayanardi.",
      solution: "iOS + Android ilova — navbat, vrach tanlash, push bildirishnomalar.",
      result: "10,000+ yuklash, online navbat ulushi 12% dan 64% ga oshdi.",
      tools: "React Native, Firebase"
    },
    {
      name: "Nova Retail",
      category: "Web automation",
      challenge: "Internet-do'kon orderlari menejerga email bilan kelardi, ko'pi yo'qolardi.",
      solution: "Saytdan to'g'ridan-to'g'ri Telegram + CRM ga lead-routing va auto-status.",
      result: "Order javob vaqti 8 soatdan 4 daqiqaga tushdi, konversiya +28%.",
      tools: "Webflow, n8n, Telegram"
    },
    {
      name: "EduBridge Bot",
      category: "Telegram bots",
      challenge: "O'quv markazi nomzodlarni Excel orqali kuzatardi va sekin javob berardi.",
      solution: "Bot + admin panel — nomzodni saralash, to'lov, dars jadvali avtomat.",
      result: "Yangi o'quvchi konversiyasi 3.2x oshdi.",
      tools: "Python, Aiogram, MongoDB"
    },
    {
      name: "FinCore Dashboard",
      category: "Web automation",
      challenge: "Moliya kompaniyasi 6 xil manbadan ma'lumot yig'ardi.",
      solution: "Birlashtirilgan dashboard — real-time API, KPI grafiklar, xatolik alertlari.",
      result: "Hisobot tayyorlash vaqti 4 soat → 0 daqiqa.",
      tools: "Next.js, Recharts, REST API"
    }
  ],
  caseStudies: [
    {
      client: "OrderHub",
      industry: "F&B (Restoran zanjiri)",
      challenge: "Har kuni 200+ qo'ng'iroq qo'lda qabul qilinardi, peak vaqtlarda buyurtmalar yo'qolardi.",
      solution: "End-to-end Telegram bot — menyu, savat, to'lov, manzil va kurer tayinlash.",
      result: "Operator yuki -70%, buyurtma vaqti 8x tezlashdi, NPS +42 punkt.",
      timeline: "18 kun"
    },
    {
      client: "FleetCRM",
      industry: "Logistika",
      challenge: "12 menejer Excel'da mijozlarni boshqarardi, leadlar yo'qolardi.",
      solution: "Custom CRM — pipeline, vazifa, eslatma, Telegram bildirishnoma.",
      result: "Sotuv tezligi 2.3x, lead yo'qolishi 0% ga tushdi.",
      timeline: "5 hafta"
    }
  ],
  whyUs: [
    "14 kunlik o'rtacha ishga tushirish",
    "Source code va hujjatlash to'liq sizniki",
    "Sprint format — har 2 hafta demo va shaffof progress",
    "30 kun bepul support, keyin SLA bilan davomli"
  ],
  about: {
    kicker: "Ctrllab haqida",
    title: "IT operatsiyalarni real biznes natijasiga aylantiramiz.",
    subtitle:
      "Ctrllab — kichik va o'rta biznes uchun Telegram bot, CRM, sayt avtomatizatsiyasi va mobil ilova ishlab chiquvchi mustaqil studio.",
    mission:
      "Bizning maqsad — qog'oz, Excel va qo'l mehnatga sarflanayotgan vaqtni avtomatlashtirib, jamoangizni katta vazifalarga ozod qilish.",
    approach:
      "Avval muammo va metric, keyin texnik yechim. Trendni quvib emas, biznes natijaga ishlaydigan stack tanlaymiz.",
    promise:
      "Har sprint oxirida ishlaydigan demo, har oy oxirida o'lchanadigan natija. Ortda yashirin xarajat yo'q."
  },
  testimonials: [
    {
      name: "Aziz T.",
      role: "OrderHub asoschisi",
      quote:
        "Ctrllab jamoasi 18 kun ichida bizning butun buyurtma jarayonimizni botga o'tkazib berdi. Operator yuki yarmiga qisqardi va men endi peak hour'larda hech qachon qo'rqmayman."
    },
    {
      name: "Madina S.",
      role: "FleetCRM operatsion direktori",
      quote:
        "12 menejer Excel'dan custom CRM ga ko'chdi. Hech bir lead endi yo'qolmaydi, har bir menejer raqamlarini real-time ko'radi. Bu — game-changer."
    },
    {
      name: "Bekzod K.",
      role: "MediCare CTO",
      quote:
        "iOS va Android'ga bir vaqtning o'zida chiqdik. Code sifati top, hujjatlash chiroyli. Ctrllab — ishonchli partner."
    }
  ],
  contact: {
    telegram: "https://t.me/ctrllabuz",
    whatsapp: "https://wa.me/998900000000",
    phone: "+998 90 000 00 00",
    email: "team@ctrllab.uz",
    instagram: "@ctrllab"
  },
  seo: {
    title: "Ctrllab — Telegram bots, CRM, mobile apps va web automation",
    description:
      "Ctrllab — O'zbekistondagi IT studio. Telegram bot, CRM tizimi, mobil ilova va sayt avtomatizatsiyasini 14 kun ichida ishlab chiqamiz.",
    ogTitle: "Ctrllab — IT studio biznes avtomatizatsiyasi uchun",
    ogDescription:
      "Telegram bot, CRM, mobil ilova va veb avtomatizatsiya. 14 kunlik ishga tushirish. Source code sizniki."
  },
  nav: [
    { href: "/", label: "Asosiy" },
    { href: "/services", label: "Xizmatlar" },
    { href: "/portfolio", label: "Ishlar" },
    { href: "/about", label: "Studio" },
    { href: "/contact", label: "Aloqa" }
  ]
};
