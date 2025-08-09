export const portfolio = {
  identity: {
    name: "Ethan Urbanky",
    tagline: "Creative Full‑Stack Developer & Data Science Explorer",
    location: "Toronto, Ontario, Canada",
    email: "ethan.urbanky@gmail.com",
    phone: "+1 (647) 710-2061",
    links: {
      linkedin: "https://linkedin.com/in/ethan-urbanky",
      github: "https://github.com/ethanurbanky2005",
      primary_repo: "https://github.com/ethanurbanky2005/UPickv0",
    },
    languages: ["English", "French"],
  },
  creative: {
    coreTheme: "Dream OS × Timeline Galaxy",
    defaultMode: "dark" as const,
    skins: ["studio", "stage", "archive"] as const,
  },

  aboutNodes: [
    { id: "origin", symbol: "↺", meaning: "curiosity loop" },
    { id: "craft", symbol: "◯", meaning: "soft precision" },
    { id: "values", symbol: "✦", meaning: "clarity through light" },
  ],
  resume: {
    education: [
      {
        program: "BSc (Hons) Specialization in Data Science",
        institution: "University of Western Ontario",
        location: "London, Ontario",
        gradYear: 2027, 
      },
      {
        program: "High School Diploma / International Baccalaureate",
        institution: "Upper Canada College",
        location: "Toronto, Ontario",
        gradYear: 2023,
        highlights: ["Co‑Founded Quantum Computing Club", "Varsity Rugby Athlete"],
      },
    ],
    experience: [
      {
        role: "Full Stack Programmer — Summer Intern",
        company: "CI Financial",
        period: "May 2024 — Aug 2024",
        location: "Toronto, ON",
        bullets: [
          "Built fully responsive financial advisory UI with Tailwind CSS",
          "Integrated internal financial APIs into realtime dashboards",
          "Optimized Django ORM and async endpoints for data‑heavy flows",
          "Automated deployments and CI to streamline releases",
          "Led sprints and cross‑functional ceremonies",
        ],
        stack: ["Tailwind", "Django", "Python", "Async IO", "DevOps"],
      },
      {
        role: "Full Stack Programmer — Summer Intern",
        company: "CI Financial",
        period: "Jun 2023 — Aug 2023",
        location: "Toronto, ON",
        bullets: [
          "Shipped internal web app foundation with Django, HTML, CSS, JS",
          "Integrated APIs for real‑time advisor insights with Python/Django",
          "Optimized DB queries and API calls for speed and reliability",
          "Participated in agile ceremonies and code reviews",
          "Delivered interactive data tables and financial dashboards",
        ],
        stack: ["Django", "Python", "PostgreSQL", "JavaScript"],
      },
      {
        role: "Barback",
        company: "Cactus Club Cafe",
        period: "date_unknown",
        location: "Toronto, ON, Canada",
        bullets: ["High‑tempo service, attention to detail, team coordination"],
      },
    ],
    skills: {
      programming: ["Python", "Java", "JavaScript", "HTML5", "SQL"],
      frameworks: ["Django", "React.js", "HTMX", "Tailwind CSS", "MVC"],
      data: ["Pandas", "Seaborn", "Matplotlib", "NumPy", "Snowflake", "SQR"],
      practices: ["DevOps (CI/CD, Docker)", "Agile (Scrum, Sprint Planning)", "Code Reviews"],
      databases: ["PostgreSQL", "SQL", "NoSQL"],
      soft: ["Critical Thinking", "Collaboration", "Intercultural Awareness"],
    },
  },
  projects: [
    {
      id: "upick",
      title: "UPick",
      role: "Founder & Developer",
      description: "Machine learning platform for college football parlay picking. Full-stack application with Python backend and React frontend, implementing advanced ML models with feature engineering and probability calibration.",
      tech: ["Python", "Flask", "React.js", "Machine Learning", "OddsAPI", "Sportradar"],
      icon: "UPick",
      github: "https://github.com/ethanurbanky2005/UPickv0.git",
      demo: null,
      mass: 0.9
    },
    {
      id: "financetrack",
      title: "FinanceTrack",
      role: "Full-Stack Developer",
      description: "Comprehensive financial management application with dashboard analytics, transaction tracking, subscription management, and tax liability monitoring. Features secure authentication, data visualization, and real-time budget tracking.",
      tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "shadcn/ui", "Recharts"],
      icon: "FinanceTrack",
      github: "https://github.com/ethanurbanky2005/FinanceTrack.git",
      demo: "https://financetrack-personal.vercel.app",
      mass: 0.8
    },
    {
      id: "quantum-portfolio",
      title: "This Portfolio",
      role: "Designer & Developer",
      description: "A cosmic interface portfolio featuring neural networks, particle fields, and smooth animations. Built with Next.js, Framer Motion, and cutting-edge UI patterns.",
      tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "Canvas API"],
      icon: "Next.js",
      github: "https://github.com/ethanurbanky2005",
      demo: "https://ethan-urbanky.dev",
      mass: 0.7
    }
  ]
};
