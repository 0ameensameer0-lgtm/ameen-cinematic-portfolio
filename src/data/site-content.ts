export type Language = "ar" | "en";

type LocalizedText = {
  ar: string;
  en: string;
};

export type Project = {
  title: LocalizedText;
  description: LocalizedText;
  technologies: string[];
  category: "systems" | "network" | "risk" | "database" | "education";
  github: string;
  demo: string;
  image: string;
};

export type Certificate = {
  id: string;
  title: LocalizedText;
  issuer: LocalizedText;
  date: string;
  period: LocalizedText;
  serialNo: string;
  image: string;
};

export type ContactLink = {
  label: "GitHub" | "LinkedIn" | "Email" | "WhatsApp" | "Phone";
  href?: string;
  note: LocalizedText;
};

export type Service = {
  icon: string;
  title: LocalizedText;
  description: LocalizedText;
};

export const profile = {
  name: {
    ar: "أمين سمير أمين اليوسفي",
    en: "Ameen Sameer Ameen Al-Yousofi",
  },
  role: {
    ar: "طالب تقنية معلومات",
    en: "Information Technology Student",
  },
  subtitle: {
    ar: "طالب تقنية معلومات | مهتم بالأنظمة والحلول التقنية",
    en: "Information Technology Student | Systems & Digital Solutions",
  },
  heroLines: [
    {
      ar: "طالب تقنية معلومات",
      en: "Information Technology Student",
    },
    {
      ar: "مطور حلول تقنية",
      en: "Digital Solution Builder",
    },
    {
      ar: "شغوف بالشبكات",
      en: "Network Enthusiast",
    },
    {
      ar: "أسعى للتطوير المستمر",
      en: "Committed to Continuous Growth",
    },
  ],
};

export const labels = {
  ar: {
    nav: ["البداية", "من أنا", "الخبرات التقنية", "الخدمات", "الإبداعات الرقمية", "المسار المهني", "تواصل"],
    introBoot: ["ملف مهني منظم", "حلول تقنية عملية", "جاهز للتعاون"],
    heroTag: "الملف الشخصي المهني",
    heroLead:
      "ملف شخصي رقمي يعرّف بالخبرات التقنية في الأنظمة والشبكات والبرمجة، مع تركيز واضح على الحلول العملية والتنظيم المهني.",
    viewProjects: "استعرض المشاريع",
    contactMe: "تواصل معي",
    downloadResume: "تحميل السيرة الذاتية",
    scrollToExplore: "استعرض الملف الشخصي",
    aboutTitle: "من أنا",
    aboutBody:
      "طالب تقنية معلومات في جامعة السعيدة بصنعاء، مهتم بالأنظمة والشبكات والبرمجة وبناء حلول تقنية عملية منظمة وسهلة الاستخدام.",
    aboutBody2:
      "يعرض هذا الملف الشخصي مسارًا تقنيًا يجمع بين الدراسة الجامعية، الدورات المتخصصة، والتعلم المستمر بهدف بناء حلول نافعة تحقق قيمة حقيقية للمجتمع.",
    skillsTitle: "الخبرات التقنية",
    servicesTitle: "الخدمات",
    projectsTitle: "الإبداعات الرقمية",
    resumeTitle: "المسار المهني",
    contactTitle: "التواصل",
    videoScene: "المشهد الرئيسي",
    timelineTitle: "رحلة التعلم والإنجاز",
    contactLead:
      "إذا كنت تبحث عن شخص يبني حلولًا تقنية منظمة، واضحة، وقابلة للنمو، فهذه بداية ممتازة لحوار مهني حقيقي.",
    send: "إرسال الرسالة",
    loading: "لا إله إلا الله",
    all: "الكل",
    liveDemo: "عرض حي",
    sourceCode: "المصدر",
    close: "إغلاق",
    education: "التعليم",
    certifications: "الشهادات",
    training: "التدريب",
    growth: "تطوير المهارات",
    socialTitle: "قنوات التواصل",
    soundOn: "الصوت",
    theme: "المظهر",
    language: "اللغة",
    hoverSound: "التأثيرات الصوتية",
    formSuccess: "تم إرسال الرسالة بنجاح.",
    formError: "تعذر إرسال الرسالة، حاول مرة أخرى.",
    skillsLegend:
      "عرض منظم للخبرات التقنية الأساسية في الأنظمة والشبكات والبرمجة وقواعد البيانات مع مستوى واضح لكل مهارة.",
    servicesLead:
      "خدمات تقنية عملية تركز على بناء الأنظمة، تنظيم البنية التقنية، وتحسين تجربة الاستخدام والعمل اليومي.",
    projectsLead:
      "مجموعة من المشاريع التطبيقية التي تعكس الخبرة في تصميم الأنظمة، إدارة البيانات، وبناء حلول رقمية عملية.",
    resumeLead:
      "ملخص أكاديمي ومهني منظم يوضح الدراسة الجامعية، الدورات، ونقاط التطور التقني بصورة مناسبة لسيرة ذاتية احترافية.",
    contactButton: "ابدأ الحوار",
    missionTitle: "لوحة التحكم",
    missionBody:
      "واجهة تعريفية مختصرة تعرض التخصص، المجالات الأساسية، والجاهزية للعمل على حلول تقنية واضحة ومنظمة.",
    reelTitle: "الملف التفاعلي",
    reelBody:
      "عرض بصري احترافي يبرز الخبرة والاهتمامات التقنية بطريقة مرتبة ومباشرة.",
    filtersTitle: "تصنيفات المشاريع",
    responseTime: "رد مهني سريع",
    availability: "متاح للتعاون على مشاريع تقنية ومبادرات تطويرية.",
    noLinkYet: "سيتم إضافة الرابط الحقيقي هنا.",
  },
  en: {
    nav: ["Intro", "About", "Technical Expertise", "Services", "Digital Creations", "Professional Timeline", "Contact"],
    introBoot: ["Professional profile", "Practical technical solutions", "Ready to collaborate"],
    heroTag: "Professional Portfolio",
    heroLead:
      "A professional digital portfolio presenting technical experience across systems, networking, programming, and practical solution building.",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
    downloadResume: "Download Resume",
    scrollToExplore: "Explore the profile",
    aboutTitle: "About Me",
    aboutBody:
      "An Information Technology student at Al-Saeed University in Sana'a with strong interest in systems, networking, programming, and practical digital solutions.",
    aboutBody2:
      "This profile presents a structured technical path built around university study, specialized courses, continuous learning, and applied project work.",
    skillsTitle: "Technical Expertise",
    servicesTitle: "Services",
    projectsTitle: "Digital Creations",
    resumeTitle: "Professional Timeline",
    contactTitle: "Contact",
    videoScene: "Main Visual",
    timelineTitle: "Learning Journey & Milestones",
    contactLead:
      "If you need someone who builds structured, scalable, and thoughtful technical solutions, this is a strong place to start the conversation.",
    send: "Send Message",
    loading: "La ilaha illa Allah",
    all: "All",
    liveDemo: "Live Demo",
    sourceCode: "Source Code",
    close: "Close",
    education: "Education",
    certifications: "Certifications",
    training: "Training",
    growth: "Skill Growth",
    socialTitle: "Contact Channels",
    soundOn: "Sound",
    theme: "Theme",
    language: "Language",
    hoverSound: "UI Sound",
    formSuccess: "Message sent successfully.",
    formError: "Unable to send the message. Please try again.",
    skillsLegend:
      "A structured overview of core technical skills across systems, networking, programming, and databases.",
    servicesLead:
      "Practical technical services focused on system delivery, support readiness, data organization, and digital solution building.",
    projectsLead:
      "Selected practical projects that reflect experience in system design, data management, and real-world digital solutions.",
    resumeLead:
      "A clear academic and professional summary covering education, training, and ongoing technical growth in a resume-friendly format.",
    contactButton: "Start the Conversation",
    missionTitle: "Mission Control",
    missionBody:
      "A clear opening overview focused on specialization, readiness, and practical technical value.",
    reelTitle: "Interactive Profile",
    reelBody:
      "A professional visual presentation that highlights technical interests, strengths, and readiness for real work.",
    filtersTitle: "Project Filters",
    responseTime: "Professional and responsive communication",
    availability: "Available for technical collaborations, internships, and digital operations work.",
    noLinkYet: "Add the real profile link here.",
  },
};

export const heroSignals = [
  {
    label: "PROFILE",
    title: {
      ar: "ملف مهني واضح",
      en: "Clear Professional Profile",
    },
    body: {
      ar: "عرض منظم يوضح التخصص، الاهتمامات التقنية، وأهم النقاط الأكاديمية والمهنية بشكل مباشر.",
      en: "A focused presentation of specialization, technical interests, and academic-professional direction.",
    },
  },
  {
    label: "FOCUS",
    title: {
      ar: "حلول تقنية عملية",
      en: "Practical Technical Solutions",
    },
    body: {
      ar: "التركيز على بناء حلول تقنية مرتبة وسهلة الاستخدام في الأنظمة والشبكات والمشاريع الرقمية.",
      en: "Focused on building organized, usable technical solutions across systems, networking, and digital projects.",
    },
  },
  {
    label: "3D",
    title: {
      ar: "عرض بصري احترافي",
      en: "Professional Visual Identity",
    },
    body: {
      ar: "تصميم تقني حديث يمنح الملف الشخصي حضورًا مهنيًا مناسبًا للعرض والتقديم.",
      en: "A modern technical presentation that gives the portfolio a stronger professional presence.",
    },
  },
];

export const focusAreas = [
  {
    title: {
      ar: "بناء أنظمة أوضح",
      en: "Clearer System Thinking",
    },
    body: {
      ar: "التركيز على تنظيم الأدوات والعمليات حتى تكون البيئة التقنية سهلة المتابعة والتطوير.",
      en: "Structuring tools and operations so technical environments stay easier to monitor and improve.",
    },
  },
  {
    title: {
      ar: "وعي شبكي عملي",
      en: "Practical Network Awareness",
    },
    body: {
      ar: "فهم أساسيات الشبكات والتوجيه والمراقبة كأساس لحلول أكثر استقرارًا.",
      en: "Applying networking fundamentals, routing awareness, and monitoring to more stable delivery.",
    },
  },
  {
    title: {
      ar: "عقلية حل المشكلات",
      en: "Problem-Solving Mindset",
    },
    body: {
      ar: "تعامل هادئ مع التعقيد وتحويل المتطلبات التقنية إلى خطوات قابلة للتنفيذ.",
      en: "Approaching complexity calmly and turning technical needs into practical implementation steps.",
    },
  },
];

export const milestones = [
  {
    year: "2021",
    type: { ar: "بداية الرحلة", en: "Origin Point" },
    summary: {
      ar: "بداية التركيز الجاد على أساسيات الأنظمة والشبكات والويب.",
      en: "A focused start on systems, networking, and web fundamentals.",
    },
  },
  {
    year: "2022",
    type: { ar: "تطبيق عملي", en: "Applied Learning" },
    summary: {
      ar: "بناء مشاريع تدريبية وتنمية مهارات إدارة الأنظمة والعمليات التقنية وقواعد البيانات.",
      en: "Built training projects and developed systems, IT operations, and database skills.",
    },
  },
  {
    year: "2023",
    type: { ar: "نضج المهارات", en: "Skill Maturity" },
    summary: {
      ar: "توسيع الخبرة في مراقبة الشبكات وإدارة الأصول والوعي بالمخاطر التقنية.",
      en: "Expanded into network monitoring, asset management, and IT risk awareness.",
    },
  },
  {
    year: "2024+",
    type: { ar: "تطور مستمر", en: "Continuous Growth" },
    summary: {
      ar: "بناء هوية تقنية شخصية تركز على الحلول المنظمة والقابلة للتوسع.",
      en: "Continuing to shape a personal technical identity around structured and scalable solutions.",
    },
  },
];

export const skillGroups = [
  {
    title: { ar: "البرمجة", en: "Programming" },
    icon: "💻",
    skills: [
      { name: "Python", level: 78 },
      { name: "C++", level: 72 },
      { name: "C#", level: 70 },
      { name: "Java", level: 68 },
      { name: "PHP", level: 74 },
    ],
  },
  {
    title: { ar: "تطوير الويب", en: "Web Development" },
    icon: "🌐",
    skills: [
      { name: "HTML", level: 88 },
      { name: "CSS", level: 86 },
      { name: "JavaScript", level: 82 },
      { name: "React", level: 76 },
    ],
  },
  {
    title: { ar: "الأنظمة", en: "Systems" },
    icon: "🖥",
    skills: [
      { name: "Windows Administration", level: 84 },
      { name: "Linux Basics", level: 72 },
    ],
  },
  {
    title: { ar: "الشبكات", en: "Networking" },
    icon: "🌐",
    skills: [
      { name: "Network Fundamentals", level: 80 },
      { name: "Routing Basics", level: 70 },
    ],
  },
  {
    title: { ar: "قواعد البيانات", en: "Databases" },
    icon: "🛢",
    skills: [
      { name: "MySQL", level: 77 },
      { name: "SQL", level: 76 },
      { name: "SQL Server", level: 70 },
    ],
  },
  {
    title: { ar: "الأدوات والتقنيات", en: "Tools & Technologies" },
    icon: "🧰",
    skills: [
      { name: "Git & GitHub", level: 76 },
      { name: "VS Code", level: 86 },
      { name: "Firebase", level: 72 },
      { name: "Flutter", level: 74 },
    ],
  },
  {
    title: { ar: "مهارات إضافية", en: "Other" },
    icon: "🛡",
    skills: [
      { name: "Computer Networks", level: 80 },
      { name: "Cisco Packet Tracer", level: 74 },
    ],
  },
];

export const services: Service[] = [
  {
    icon: "systems",
    title: {
      ar: "تصميم وتطوير الأنظمة",
      en: "System Design & Development",
    },
    description: {
      ar: "بناء أنظمة رقمية مرتبة تساعد على إدارة العمليات والبيانات بشكل أوضح وأسهل.",
      en: "Building organized digital systems that make operations and data easier to manage.",
    },
  },
  {
    icon: "network",
    title: {
      ar: "الدعم الفني والشبكات",
      en: "Technical Support & Networking",
    },
    description: {
      ar: "المساعدة في تنظيم البنية التقنية، متابعة الأعطال، وتحسين جاهزية بيئات العمل التقنية.",
      en: "Supporting technical environments through troubleshooting, network awareness, and operational readiness.",
    },
  },
  {
    icon: "database",
    title: {
      ar: "إدارة البيانات وقواعد البيانات",
      en: "Data & Database Management",
    },
    description: {
      ar: "تنظيم قواعد البيانات والاستعلامات وسجلات العمل بطريقة تدعم الدقة وسهولة الوصول للمعلومات.",
      en: "Organizing databases, queries, and records in a way that improves accuracy and accessibility.",
    },
  },
  {
    icon: "consulting",
    title: {
      ar: "استشارات تقنية وتطوير حلول",
      en: "Technical Consulting & Solution Planning",
    },
    description: {
      ar: "تحويل المتطلبات إلى خطوات عملية واضحة مع اقتراح حلول مناسبة لطبيعة العمل والاحتياج.",
      en: "Turning requirements into clear action plans with practical solutions suited to the work context.",
    },
  },
];

export const projects: Project[] = [
  {
    title: {
      ar: "تطبيق يسر",
      en: "Yusr Education Platform",
    },
    description: {
      ar: "بيئة تعليمية مساندة تنظّم حضور الطلاب، وتمنح المشرف متابعة واضحة للمعلمين والأنشطة التعليمية.",
      en: "A supportive learning environment for student attendance, teacher oversight, and organized academic activities.",
    },
    technologies: ["Next.js", "TypeScript", "MySQL", "Admin Dashboard"],
    category: "education",
    github: "https://github.com/",
    demo: "https://example.com/",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: {
      ar: "تطبيق العلم نور",
      en: "Al-Ilm Noor Learning App",
    },
    description: {
      ar: "تطبيق تعليمي يساعد الطلاب على تنظيم الدراسة والوصول إلى محتوى وأنشطة داعمة لمسارهم الأكاديمي.",
      en: "A learning app that helps students organize their studies and access supportive academic content and activities.",
    },
    technologies: ["React", "Node.js", "Learning Tools", "Tailwind CSS"],
    category: "education",
    github: "https://github.com/",
    demo: "https://example.com/",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: {
      ar: "نظام إدارة الأصول التقنية",
      en: "IT Asset Management System",
    },
    description: {
      ar: "نظام ينظم الأجهزة والمستخدمين وسجلات الصيانة داخل بيئة تقنية مع واجهة متابعة مرتبة وواضحة.",
      en: "A structured system for devices, users, and maintenance records inside a technical environment.",
    },
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Framer Motion"],
    category: "systems",
    github: "https://github.com/",
    demo: "https://example.com/",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: {
      ar: "أداة إدارة قواعد البيانات",
      en: "Database Management Tool",
    },
    description: {
      ar: "واجهة مساعدة لإدارة الجداول والصلاحيات والاستعلامات اليومية بطريقة منظمة ومريحة للمستخدم التقني.",
      en: "A focused interface for tables, permissions, and day-to-day query workflows.",
    },
    technologies: ["TypeScript", "SQL", "Python", "Data Modeling"],
    category: "database",
    github: "https://github.com/",
    demo: "https://example.com/",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: {
      ar: "محفظة رزق",
      en: "Rizq Wallet",
    },
    description: {
      ar: "منصة محفظة رقمية لإدارة الرصيد والتحويلات والمدفوعات مع سجل عمليات منظم ولوحة متابعة مباشرة.",
      en: "A digital wallet platform for balance management, transfers, and payments with organized transaction history.",
    },
    technologies: ["Next.js", "TypeScript", "REST API", "PostgreSQL"],
    category: "systems",
    github: "https://github.com/",
    demo: "https://example.com/",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: {
      ar: "نظام إدارة مستشفى",
      en: "Hospital Management System",
    },
    description: {
      ar: "نظام متكامل لإدارة العيادات والمرضى والمواعيد والفوترة الطبية مع تتبع دقيق لحالة كل ملف.",
      en: "A complete system for managing clinics, patients, appointments, and billing with detailed case tracking.",
    },
    technologies: ["React", "Node.js", "MySQL", "Dashboard UI"],
    category: "systems",
    github: "https://github.com/",
    demo: "https://example.com/",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: {
      ar: "نظام استشارة للحجوزات الطبية",
      en: "Medical Consultation Booking System",
    },
    description: {
      ar: "منصة لحجز الاستشارات الطبية بشكل ذكي مع جدولة المواعيد وإدارة الأطباء وتنبيهات للمراجعين.",
      en: "A smart platform for booking medical consultations with doctor scheduling and patient reminders.",
    },
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Notifications"],
    category: "database",
    github: "https://github.com/",
    demo: "https://example.com/",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: {
      ar: "بوت دردشة بدون نت",
      en: "Offline Chatbot",
    },
    description: {
      ar: "بوت محادثة يعمل بدون اتصال مباشر بالإنترنت للاستخدام المحلي داخل الأنظمة مع قاعدة معرفة مهيكلة.",
      en: "A chatbot that runs offline for local environments with a structured knowledge base.",
    },
    technologies: ["TypeScript", "Local Storage", "NLP", "PWA"],
    category: "network",
    github: "https://github.com/",
    demo: "https://example.com/",
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: {
      ar: "نظام إدارة مدرسة",
      en: "School Management System",
    },
    description: {
      ar: "نظام متكامل لإدارة الطلاب والمعلمين والجداول والرسوم والتقارير الأكاديمية ضمن لوحة تحكم منظمة.",
      en: "A complete system for managing students, teachers, schedules, fees, and academic reports in one organized dashboard.",
    },
    technologies: ["Next.js", "TypeScript", "MySQL", "Admin Dashboard"],
    category: "systems",
    github: "https://github.com/",
    demo: "https://example.com/",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
  },
];

export const certificates: Certificate[] = [
  {
    id: "yemensoft-ias-plus",
    title: {
      ar: "النظام المحاسبي المتكامل بلس",
      en: "Integrated Accounting System Plus",
    },
    issuer: {
      ar: "يمن سوفت - فرع صنعاء",
      en: "YemenSoft - Sana'a Branch",
    },
    date: "2022-12-27",
    period: {
      ar: "من 06/11/2022 إلى 06/12/2022",
      en: "From 06/11/2022 to 06/12/2022",
    },
    serialNo: "04830",
    image: "/certificates/yemensoft-certificate-1.jpg",
  },
  {
    id: "yemensoft-onyx-erp",
    title: {
      ar: "النظام المحاسبي أونكس ERP",
      en: "Onyx ERP System",
    },
    issuer: {
      ar: "يمن سوفت - فرع صنعاء",
      en: "YemenSoft - Sana'a Branch",
    },
    date: "2023-05-11",
    period: {
      ar: "من 14/05/2023 إلى 10/06/2023",
      en: "From 14/05/2023 to 10/06/2023",
    },
    serialNo: "04771",
    image: "/certificates/yemensoft-certificate-2.jpg",
  },
  {
    id: "sanaa-university-computer-driving-license",
    title: {
      ar: "رخصة قيادة الحاسوب - جامعة صنعاء",
      en: "Sana'a University Computer Driving License",
    },
    issuer: {
      ar: "جامعة صنعاء - ملتقى الطالب الجامعي - مركز التدريب والتأهيل",
      en: "Sana'a University - University Student Forum - Rehabilitation and Training Center",
    },
    date: "",
    period: {
      ar: "40 ساعة تدريبية",
      en: "40 hours of training",
    },
    serialNo: "USF20334",
    image: "/certificates/sanaa-university-computer-driving-license.jpeg",
  },
  {
    id: "graduation-project-scientific-research-writing",
    title: {
      ar: "إعداد مشروع التخرج (البحث العلمي)",
      en: "Graduation Project (Scientific Research Writing)",
    },
    issuer: {
      ar: "جامعة صنعاء - ملتقى الطالب الجامعي - مركز التدريب والتأهيل",
      en: "Sana'a University - University Student Forum - Rehabilitation and Training Center",
    },
    date: "2026-06-22",
    period: {
      ar: "من 14/06/2026 إلى 15/06/2026",
      en: "From 14/06/2026 to 15/06/2026",
    },
    serialNo: "",
    image: "/certificates/graduation-project-scientific-research.jpeg",
  },
  {
    id: "educational-platform-participation",
    title: {
      ar: "شهادة مشاركة في الدورات التدريبية",
      en: "Certificate of Participation in Training Courses",
    },
    issuer: {
      ar: "إدارة منصة خدمة تعليمية",
      en: "Educational Service Platform",
    },
    date: "2025-08-15",
    period: {
      ar: "من 10/08/2025 إلى 15/08/2025",
      en: "From 10/08/2025 to 15/08/2025",
    },
    serialNo: "",
    image: "/certificates/educational-platform-certificate.jpeg",
  },
];

export const resumeTimeline = [
  {
    label: { ar: "التعليم", en: "Education" },
    title: {
      ar: "بكالوريوس تقنية معلومات - جامعة السعيدة",
      en: "Bachelor of Information Technology - Al-Saeed University",
    },
    body: {
      ar: "طالب في جامعة السعيدة بصنعاء منذ عام 2023، وأستعد لبدء السنة الرابعة في تخصص تقنية المعلومات مع اهتمام واضح بالأنظمة والشبكات والبرمجة.",
      en: "Studying Information Technology at Al-Saeed University in Sana'a since 2023, preparing to begin the fourth academic year with strong interest in systems, networking, and programming.",
    },
  },
  {
    label: { ar: "الشهادات", en: "Certifications" },
    title: {
      ar: "دورات وشهادات متنوعة",
      en: "Diverse Courses and Certifications",
    },
    body: {
      ar: "يشمل ذلك نظام أونكس، النظام المتكامل، رخصة قيادة الحاسوب، بوربوينت متقدم، جرافكس أونلاين، ودورة CCNA أونلاين إلى جانب دورات اللغة الإنجليزية.",
      en: "Includes Onyx ERP, Integrated Accounting System, ICDL, advanced PowerPoint, online graphics, online CCNA, and multiple English language courses.",
    },
  },
  {
    label: { ar: "التدريب", en: "Training" },
    title: {
      ar: "تدريب مستمر ومشاريع تطبيقية",
      en: "Continuous Training and Applied Projects",
    },
    body: {
      ar: "أعتمد على المشاريع التطبيقية والملف المهني لبناء خبرة عملية حقيقية بدل ادعاء خبرات وظيفية غير موجودة، مع التركيز على النماذج والأنظمة القابلة للعرض.",
      en: "Building real practical readiness through applied projects and portfolio work rather than claiming job experience that has not happened yet.",
    },
  },
  {
    label: { ar: "تطوير المهارات", en: "Skill Growth" },
    title: {
      ar: "تعلم مستمر قائم على القيم",
      en: "Continuous Learning with Purpose",
    },
    body: {
      ar: "أسعى إلى تطوير مهاراتي باستمرار، وأطمح إلى بناء حلول تقنية نافعة تخدم المجتمع وتحقق قيمة حقيقية مع الالتزام بالإتقان في العمل.",
      en: "Committed to continuous improvement and to building useful technical solutions that serve the community and create real value.",
    },
  },
];

export const contactLinks: ContactLink[] = [
  {
    label: "GitHub",
    href: "",
    note: {
      ar: "",
      en: "",
    },
  },
  {
    label: "LinkedIn",
    href: "",
    note: {
      ar: "",
      en: "",
    },
  },
  {
    label: "Email",
    href: "mailto:0ameensameer0@gmail.com",
    note: {
      ar: "0ameensameer0@gmail.com",
      en: "0ameensameer0@gmail.com",
    },
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/967778530052",
    note: {
      ar: "778530052",
      en: "778530052",
    },
  },
  {
    label: "Phone",
    href: "tel:778530052",
    note: {
      ar: "778530052",
      en: "778530052",
    },
  },
];
