export const logos = {
  // Educational Institutions
  "Upper Canada College": "https://upload.wikimedia.org/wikipedia/commons/6/65/Upper_Canada_College_crest_1916-1931.svg",
  "University of Western Ontario": "https://upload.wikimedia.org/wikipedia/commons/1/14/Western_ontario_univ_textlogo.svg",
  
  // Companies
  "CI Financial": "https://upload.wikimedia.org/wikipedia/commons/a/a8/CI_Financial_Logo_2020.svg",
  "Cactus Club Cafe": "https://upload.wikimedia.org/wikipedia/commons/8/81/Cactus-Club-Cafe-Logo.gif",
  
  // Project - UPick uses text instead of logo
  
  // Programming Languages
  "Python": "https://cdn.simpleicons.org/python",
  "JavaScript": "https://cdn.simpleicons.org/javascript", 
  "Java": "https://cdn.simpleicons.org/java",
  "HTML5": "https://cdn.simpleicons.org/html5",
  "CSS": "https://cdn.simpleicons.org/css3",
  "C++": "https://cdn.simpleicons.org/cplusplus",
  "SQL": "https://cdn.simpleicons.org/sqlite",
  
  // Frameworks & Libraries
  "React": "https://cdn.simpleicons.org/react",
  "Django": "https://cdn.simpleicons.org/django",
  "TypeScript": "https://cdn.simpleicons.org/typescript",
  "Tailwind": "https://cdn.simpleicons.org/tailwindcss",
  "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss",
  "HTMX": "https://cdn.simpleicons.org/htmx",
  "Flask": "https://cdn.simpleicons.org/flask",
  "FastAPI": "https://cdn.simpleicons.org/fastapi",
  "Next.js": "https://cdn.simpleicons.org/nextdotjs",
  "Framer Motion": "https://cdn.simpleicons.org/framer",
  "React.js": "https://cdn.simpleicons.org/react",
  
  // Data & Analytics
  "Pandas": "https://cdn.simpleicons.org/pandas",
  "NumPy": "https://cdn.simpleicons.org/numpy",
  "Snowflake": "https://cdn.simpleicons.org/snowflake",
  "Seaborn": "https://cdn.simpleicons.org/seaborn",
  "Matplotlib": "https://cdn.simpleicons.org/matplotlib",
  
  // Databases
  "PostgreSQL": "https://cdn.simpleicons.org/postgresql",
  
  // DevOps & Tools
  "Docker": "https://cdn.simpleicons.org/docker",
  "Git": "https://cdn.simpleicons.org/git",
  
  // APIs & Services
  "OddsAPI": "https://the-odds-api.com/favicon.ico",
  "Sportradar": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Sportradar_Logo.png",
  
  // Other Technologies
  "Canvas API": "https://cdn.simpleicons.org/html5",
  "Machine Learning": "https://cdn.simpleicons.org/tensorflow",
  "APIs": "https://cdn.simpleicons.org/api",
  
  // Fallback for missing logos
  "default": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><rect width='100%' height='100%' fill='%23374151'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Inter' font-size='24' fill='%23E5E7EB'>?</text></svg>"
} as const;

// Helper function to get logo URL with fallback
export const getLogo = (name: string): string => {
  return logos[name as keyof typeof logos] || logos.default;
};

// Helper function to get multiple logos for a tech stack
export const getLogos = (names: string[]): Array<{name: string, url: string}> => {
  return names.map(name => ({
    name,
    url: getLogo(name)
  }));
};
