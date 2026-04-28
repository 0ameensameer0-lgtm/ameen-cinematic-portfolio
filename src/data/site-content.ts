export type Language = "ar" | "en";

type LocalizedText = {
  ar: string;
  en: string;
};

export type Project = {
  title: LocalizedText;
  description: LocalizedText;
  technologies: string[];
  category: "systems" | "network" | "risk" | "database";
  github: string;
  demo: string;
  image: string;
};

export type ContactLink = {
  label: "GitHub" | "LinkedIn" | "Email" | "WhatsApp";
  href?: string;
  note: LocalizedText;
};

export const profile = {
  name: {
    ar: "أمين سمير أمين اليوسفي",
    en: "Ameen Sameer Ameen Al-Yosofi",
  },
  role: {
    ar: "أخصائي تقنية معلومات",
    en: "Information Technology Specialist",
  },
  subtitle: {
    ar: "أخصائي تقنية معلومات | شغوف بالأنظمة والتقنية",
    en: "IT Specialist | Systems & Technology Enthusiast",
  },
  heroLines: [
    {
      ar: "أخصائي تقنية معلومات",
      en: "Information Technology Specialist",
    },
    {
      ar: "مسؤول أنظمة",
      en: "System Administrator",
    },
    {
      ar: "شغوف بالشبكات",
      en: "Network Enthusiast",
    },
    {
      ar: "محب لحل المشكلات",
      en: "Problem Solver",
    },
  ],
};

export const labels = {
  ar: {
    nav: ["البداية", "من هو أمين؟", "ترسانة التقنية", "الإبداعات الرقمية", "المسار المهني", "تواصل"],
    introBoot: ["Initializing Ameen OS...", "Loading network modules...", "Access granted..."],
    heroTag: "The Digital Journey of Ameen Al-Yosofi",
    heroLead:
      "تجربة سينمائية رقمية تقدم أمين اليوسفي كهوية تقنية متكاملة: أنظمة، شبكات، وذهنية عملية تحول التعقيد إلى حلول واضحة واحترافية.",
    viewProjects: "استعرض المشاريع",
    contactMe: "تواصل معي",
    downloadResume: "تحميل السيرة الذاتية",
    scrollToExplore: "اسحب لتبدأ الفيلم",
    aboutTitle: "من هو أمين؟",
    aboutBody:
      "أمين اليوسفي متخصص تقنية معلومات يعمل بعقلية تحليلية واضحة، وشغف مستمر بتطوير الأنظمة، فهم الشبكات، وبناء تجارب تقنية منظمة وسهلة الاستخدام.",
    aboutBody2:
      "هذه التجربة لا تعرض سيرة ذاتية فقط، بل تروي قصة تطور رقمي: من التعلم المنهجي، إلى بناء المهارات، إلى تنفيذ حلول تقنية قابلة للعرض والتوسع.",
    skillsTitle: "ترسانة التقنية",
    projectsTitle: "الإبداعات الرقمية",
    resumeTitle: "المسار المهني",
    contactTitle: "تواصل مع أمين",
    videoScene: "المشهد السينمائي",
    timelineTitle: "رحلة التعلم والإنجاز",
    contactLead:
      "إذا كنت تبحث عن شخص يبني حلولًا تقنية منظمة، واضحة، وقابلة للنمو، فهذه بداية ممتازة لحوار مهني حقيقي.",
    send: "إرسال الرسالة",
    loading: "تحميل المشهد",
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
      "مدارات تفاعلية تمثل مجالات المعرفة الأساسية التي يعتمد عليها أمين في بناء حلول تقنية مترابطة وواضحة.",
    projectsLead:
      "معرض مشاريع يعرض كل مشروع كأنه لقطة مستقلة داخل فيلم رقمي: سياق، قيمة تقنية، وواجهة عرض تضيف عمقًا للمحتوى.",
    resumeLead:
      "مخطط زمني متحرك يلخص التعليم، التدريب، ومسار النمو المهني بأسلوب أنيق وواضح وسهل القراءة.",
    contactButton: "ابدأ الحوار",
    missionTitle: "لوحة التحكم",
    missionBody:
      "مشهد افتتاحي يربط الهوية الشخصية بالجاهزية المهنية: حضور بصري، تخصص واضح، وقدرة على تحويل الفكرة إلى حل تقني منظم.",
    reelTitle: "المشهد التفاعلي",
    reelBody:
      "صورة سينمائية وتدفق بصري يعكسان شخصية مطور يعمل وسط أنظمة، شاشات، وبيئة تقنية حيّة.",
    filtersTitle: "فلترة المشاهد",
    responseTime: "رد مهني سريع",
    availability: "متاح للتعاون على مشاريع تقنية ومبادرات تطويرية.",
    noLinkYet: "سيتم إضافة الرابط الحقيقي هنا.",
  },
  en: {
    nav: ["Intro", "Who is Ameen?", "Technology Arsenal", "Digital Creations", "Professional Timeline", "Connect"],
    introBoot: ["Initializing Ameen OS...", "Loading network modules...", "Access granted..."],
    heroTag: "The Digital Journey of Ameen Al-Yosofi",
    heroLead:
      "A cinematic digital experience presenting Ameen Al-Yosofi as a modern IT identity across systems, networking, and practical technical problem solving.",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
    downloadResume: "Download Resume",
    scrollToExplore: "Scroll to enter the film",
    aboutTitle: "Who is Ameen?",
    aboutBody:
      "Ameen Al-Yosofi is an IT specialist with an analytical mindset, a strong interest in systems and networks, and a steady habit of turning technical friction into practical outcomes.",
    aboutBody2:
      "This experience does not behave like a standard CV. It presents a digital story arc: curiosity, disciplined learning, and confident delivery through structured technical work.",
    skillsTitle: "Technology Arsenal",
    projectsTitle: "Digital Creations",
    resumeTitle: "Professional Timeline",
    contactTitle: "Connect with Ameen",
    videoScene: "Cinematic Scene",
    timelineTitle: "Learning Journey & Milestones",
    contactLead:
      "If you need someone who builds structured, scalable, and thoughtful technical solutions, this is a strong place to start the conversation.",
    send: "Send Message",
    loading: "Loading Scene",
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
      "Interactive orbital systems visualizing the core knowledge areas Ameen relies on to build connected technical solutions.",
    projectsLead:
      "A project gallery where every card behaves like a separate scene with context, technical depth, and a cleaner presentation layer.",
    resumeLead:
      "An animated timeline summarizing education, training, and ongoing professional growth in a refined cinematic format.",
    contactButton: "Start the Conversation",
    missionTitle: "Mission Control",
    missionBody:
      "An opening sequence that connects personal identity with professional readiness through clarity, motion, and strong technical positioning.",
    reelTitle: "Interactive Reel",
    reelBody:
      "A cinematic portrait and motion system that frame Ameen as a confident IT specialist inside a living digital environment.",
    filtersTitle: "Scene Filters",
    responseTime: "Professional and responsive communication",
    availability: "Available for technical collaborations, internships, and digital operations work.",
    noLinkYet: "Add the real profile link here.",
  },
};

export const heroSignals = [
  {
    label: "IT",
    title: {
      ar: "أنظمة وشبكات",
      en: "Systems & Networks",
    },
    body: {
      ar: "خبرة معرفية في التشغيل، المراقبة، وتنظيم البيئة التقنية.",
      en: "Operational thinking across monitoring, support, and structured technical environments.",
    },
  },
  {
    label: "MOVIE",
    title: {
      ar: "سرد بصري متدرج",
      en: "Progressive Storytelling",
    },
    body: {
      ar: "التمرير يفتح المشاهد كتجربة سينمائية متصلة بدل أقسام تقليدية منفصلة.",
      en: "Scrolling reveals connected scenes instead of disconnected portfolio sections.",
    },
  },
  {
    label: "3D",
    title: {
      ar: "هوية رقمية حيّة",
      en: "Living Digital Identity",
    },
    body: {
      ar: "بورتريه ثلاثي الأبعاد داخل إطار هولوغرافي يمنح الحضور الشخصي طابعًا تقنيًا مميزًا.",
      en: "A 3D portrait framed by holographic motion for a stronger personal technology signature.",
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
      { name: "HTML", level: 88 },
      { name: "CSS", level: 86 },
      { name: "JavaScript", level: 82 },
      { name: "Python", level: 78 },
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
      { name: "Database Management", level: 75 },
    ],
  },
  {
    title: { ar: "الأمن", en: "Security" },
    icon: "🛡",
    skills: [
      { name: "Cybersecurity Basics", level: 73 },
      { name: "Risk Awareness", level: 79 },
    ],
  },
];

export const projects: Project[] = [
  {
    title: {
      ar: "نظام إدارة المخاطر",
      en: "Risk Management System",
    },
    description: {
      ar: "لوحة تشغيل لإدارة المخاطر، تتبع الحالات، وتقديم رؤية واضحة للتهديدات وخطط المعالجة داخل بيئة عمل تقنية.",
      en: "An operations dashboard for tracking risk states, mitigation actions, and visibility across technical threats.",
    },
    technologies: ["Next.js", "TypeScript", "MySQL", "Charts"],
    category: "risk",
    github: "https://github.com/",
    demo: "https://example.com/",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: {
      ar: "لوحة مراقبة الشبكات",
      en: "Network Monitoring Dashboard",
    },
    description: {
      ar: "لوحة عرض لحالة الشبكة والتنبيهات والأداء مع تجربة مرئية تساعد على سرعة الاستجابة واتخاذ القرار.",
      en: "A network status and alerting dashboard with a visual experience designed for faster operational response.",
    },
    technologies: ["React", "Node.js", "WebSocket", "Tailwind CSS"],
    category: "network",
    github: "https://github.com/",
    demo: "https://example.com/",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
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
];

export const resumeTimeline = [
  {
    label: { ar: "التعليم", en: "Education" },
    title: {
      ar: "مسار متخصص في تقنية المعلومات",
      en: "Focused path in Information Technology",
    },
    body: {
      ar: "تركيز على الأنظمة والشبكات وإدارة الموارد وفهم البنية التقنية للأعمال بأسلوب عملي.",
      en: "Focused on systems, networks, resource management, and practical IT infrastructure thinking.",
    },
  },
  {
    label: { ar: "الشهادات", en: "Certifications" },
    title: {
      ar: "تنمية مستمرة عبر المسارات التقنية",
      en: "Continuous growth through technical certification paths",
    },
    body: {
      ar: "اهتمام مستمر بتقوية المعرفة التطبيقية في الشبكات والأمن والإدارة التقنية.",
      en: "Ongoing emphasis on practical knowledge in networks, security, and IT administration.",
    },
  },
  {
    label: { ar: "التدريب", en: "Training" },
    title: {
      ar: "مشاريع تطبيقية وبناء خبرة عملية",
      en: "Applied projects and hands-on technical learning",
    },
    body: {
      ar: "تحويل المهارات النظرية إلى أدوات ولوحات تشغيل ومشاريع قابلة للعرض باحترافية.",
      en: "Turning theory into tooling, dashboards, and portfolio-grade project work.",
    },
  },
  {
    label: { ar: "تطوير المهارات", en: "Skill Growth" },
    title: {
      ar: "تعلم مستمر موجه نحو الحلول",
      en: "Continuous learning oriented around solutions",
    },
    body: {
      ar: "توسيع المدى التقني مع تركيز خاص على الوضوح والتنظيم وسهولة الاستخدام.",
      en: "Expanding technical range with a strong focus on clarity, structure, and usability.",
    },
  },
];

export const contactLinks: ContactLink[] = [
  {
    label: "GitHub",
    href: "",
    note: {
      ar: "أضف رابط GitHub الحقيقي لعرض المشاريع البرمجية.",
      en: "Add the real GitHub profile to showcase repositories.",
    },
  },
  {
    label: "LinkedIn",
    href: "",
    note: {
      ar: "أضف رابط LinkedIn الحقيقي لبناء الحضور المهني.",
      en: "Add the real LinkedIn profile for professional presence.",
    },
  },
  {
    label: "Email",
    href: "",
    note: {
      ar: "أضف بريدك المهني لتفعيل التواصل المباشر.",
      en: "Add your professional email for direct outreach.",
    },
  },
  {
    label: "WhatsApp",
    href: "",
    note: {
      ar: "أضف رقم واتساب الرسمي لتواصل سريع عند الحاجة.",
      en: "Add your official WhatsApp number for fast communication.",
    },
  },
];
