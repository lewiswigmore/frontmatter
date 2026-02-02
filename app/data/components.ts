import { ReadmeComponent } from "../types";

export const components: ReadmeComponent[] = [
  // ============ HEADERS ============
  {
    id: "header-wave",
    name: "Wave Header",
    category: "header",
    description: "Animated wave greeting with your name",
    fields: [
      { name: "greeting", label: "Greeting", type: "text", default: "Hi there, I'm", placeholder: "Hi there, I'm" },
      { name: "name", label: "Your Name", type: "text", default: "{{name}}", placeholder: "Alex" },
    ],
    template: `<h1 align="center">{{greeting}} {{name}} <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="35"></h1>`,
  },
  {
    id: "header-typing",
    name: "Typing Animation",
    category: "header",
    description: "Animated typing effect for your tagline",
    fields: [
      { name: "lines", label: "Lines (semicolon separated)", type: "textarea", default: "Full Stack Developer;Open Source Enthusiast;Coffee Lover", placeholder: "Line 1;Line 2;Line 3" },
      { name: "color", label: "Text Color (Hex)", type: "color", default: "6366f1", placeholder: "Hex color without #" },
    ],
    template: `<p align="center">
  <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color={{color}}&center=true&vCenter=true&width=435&lines={{lines}}" alt="Typing SVG" /></a>
</p>`,
  },
  {
    id: "header-minimal",
    name: "Minimal Header",
    category: "header",
    description: "Clean, simple introduction",
    fields: [
      { name: "name", label: "Your Name", type: "text", default: "{{name}}", placeholder: "Alex" },
      { name: "title", label: "Title/Role", type: "text", default: "Software Developer", placeholder: "Software Developer" },
      { name: "location", label: "Location", type: "text", default: "San Francisco, CA", placeholder: "City, Country" },
    ],
    template: `## Hey, I'm {{name}} 👋

**{{title}}** based in {{location}}.`,
  },
  {
    id: "header-ascii",
    name: "ASCII Art Header",
    category: "header",
    description: "Retro terminal-style ASCII name",
    fields: [
      { name: "ascii", label: "ASCII Art", type: "textarea", default: `
 ██████╗ ██╗████████╗██╗  ██╗██╗   ██╗██████╗ 
██╔════╝ ██║╚══██╔══╝██║  ██║██║   ██║██╔══██╗
██║  ███╗██║   ██║   ███████║██║   ██║██████╔╝
██║   ██║██║   ██║   ██╔══██║██║   ██║██╔══██╗
╚██████╔╝██║   ██║   ██║  ██║╚██████╔╝██████╔╝
 ╚═════╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝`, placeholder: "Paste ASCII art here" },
    ],
    template: `\`\`\`
{{ascii}}
\`\`\``,
  },
  {
    id: "header-banner",
    name: "Image Banner",
    category: "header",
    description: "Full-width banner image",
    fields: [
      { name: "imageUrl", label: "Banner Image URL", type: "text", default: "https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Hello%20World&fontSize=50&animation=fadeIn", placeholder: "https://..." },
    ],
    template: `<img width="100%" src="{{imageUrl}}" alt="Banner" />`,
  },

  // ============ ABOUT ============
  {
    id: "about-bullets",
    name: "About Me (Bullets)",
    category: "header",
    description: "Quick facts about you in bullet format",
    fields: [
      { name: "working", label: "Currently working on", type: "text", default: "something cool", placeholder: "my next project" },
      { name: "learning", label: "Currently learning", type: "text", default: "Rust and WebAssembly", placeholder: "new technologies" },
      { name: "collaborate", label: "Looking to collaborate on", type: "text", default: "open source projects", placeholder: "interesting projects" },
      { name: "ask", label: "Ask me about", type: "text", default: "web development", placeholder: "your expertise" },
      { name: "fun", label: "Fun fact", type: "text", default: "I debug with console.log", placeholder: "something fun" },
    ],
    template: `### About Me

- 🔭 I'm currently working on **{{working}}**
- 🌱 I'm currently learning **{{learning}}**
- 👯 I'm looking to collaborate on **{{collaborate}}**
- 💬 Ask me about **{{ask}}**
- ⚡ Fun fact: **{{fun}}**`,
  },

  // ============ STATS ============
  {
    id: "stats-github",
    name: "GitHub Stats Card",
    category: "stats",
    description: "Your GitHub statistics",
    fields: [
      { name: "username", label: "GitHub Username", type: "text", default: "{{username}}", placeholder: "username" },
      { name: "theme", label: "Theme", type: "select", default: "default", options: ["default", "dark", "radical", "merko", "gruvbox", "tokyonight", "onedark", "cobalt", "synthwave", "highcontrast", "dracula", "nord"] },
      { name: "showIcons", label: "Show Icons", type: "boolean", default: "true" },
      { name: "hideRank", label: "Hide Rank", type: "boolean", default: "false" },
    ],
    template: `![{{username}}'s GitHub stats](https://github-readme-stats-eight-theta.vercel.app/api?username={{username}}&show_icons={{showIcons}}&theme={{theme}}&hide_rank={{hideRank}})`,
  },
  {
    id: "stats-streak",
    name: "Streak Stats",
    category: "stats",
    description: "Your contribution streak",
    fields: [
      { name: "username", label: "GitHub Username", type: "text", default: "{{username}}", placeholder: "username" },
      { name: "theme", label: "Theme", type: "select", default: "default", options: ["default", "dark", "radical", "merko", "gruvbox", "tokyonight", "onedark", "cobalt", "synthwave", "highcontrast", "dracula", "nord"] },
    ],
    template: `![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user={{username}}&theme={{theme}})`,
  },
  {
    id: "stats-languages",
    name: "Top Languages",
    category: "stats",
    description: "Your most used programming languages",
    fields: [
      { name: "username", label: "GitHub Username", type: "text", default: "{{username}}", placeholder: "username" },
      { name: "theme", label: "Theme", type: "select", default: "default", options: ["default", "dark", "radical", "merko", "gruvbox", "tokyonight", "onedark", "cobalt", "synthwave", "highcontrast", "dracula", "nord"] },
      { name: "layout", label: "Layout", type: "select", default: "compact", options: ["compact", "normal", "donut", "donut-vertical", "pie"] },
      { name: "langs_count", label: "Languages to Show", type: "select", default: "8", options: ["4", "6", "8", "10"] },
    ],
    template: `![Top Langs](https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username={{username}}&theme={{theme}}&layout={{layout}}&langs_count={{langs_count}})`,
  },
  {
    id: "stats-trophy",
    name: "Profile Trophy",
    category: "stats",
    description: "GitHub profile trophies",
    fields: [
      { name: "username", label: "GitHub Username", type: "text", default: "{{username}}", placeholder: "username" },
      { name: "theme", label: "Theme", type: "select", default: "default", options: ["flat", "onedark", "gruvbox", "dracula", "monokai", "chalk", "nord", "alduin", "darkhub", "juicyfresh", "buddhism", "oldie", "radical", "onestar", "discord", "algolia", "gitdimmed", "tokyonight"] },
      { name: "row", label: "Trophies per Row", type: "select", default: "7", options: ["3", "4", "5", "6", "7"] },
    ],
    template: `[![trophy](https://github-profile-trophy.vercel.app/?username={{username}}&theme={{theme}}&column={{row}})](https://github.com/ryo-ma/github-profile-trophy)`,
  },
  {
    id: "stats-activity-graph",
    name: "Activity Graph",
    category: "stats",
    description: "Contribution activity graph",
    fields: [
      { name: "username", label: "GitHub Username", type: "text", default: "{{username}}", placeholder: "username" },
      { name: "theme", label: "Theme", type: "select", default: "react-dark", options: ["github", "github-compact", "xcode", "rogue", "merko", "vue", "tokyo-night", "high-contrast", "react-dark", "nord", "dracula"] },
    ],
    template: `[![{{username}}'s github activity graph](https://github-readme-activity-graph.vercel.app/graph?username={{username}}&theme={{theme}})](https://github.com/ashutosh00710/github-readme-activity-graph)`,
  },
  {
    id: "stats-visitors",
    name: "Visitor Counter",
    category: "stats",
    description: "Profile visitor counter badge",
    fields: [
      { name: "username", label: "GitHub Username", type: "text", default: "{{username}}", placeholder: "username" },
      { name: "color", label: "Badge Color", type: "select", default: "blue", options: ["blue", "brightgreen", "green", "yellow", "yellowgreen", "orange", "red", "blueviolet", "grey", "ff69b4", "6366f1", "22c55e", "f97316"] },
    ],
    template: `![Profile Views](https://komarev.com/ghpvc/?username={{username}}&color={{color}}&style=flat-square)`,
  },

  // ============ TECH STACK ============
  {
    id: "tech-skillicons",
    name: "Skill Icons Grid",
    category: "tech",
    description: "Beautiful grid of technology icons",
    fields: [
      { name: "icons", label: "Icons (comma separated)", type: "textarea", default: "js,ts,react,nextjs,nodejs,python,rust,go,docker,kubernetes,aws,git", placeholder: "react,vue,angular,nodejs" },
      { name: "perline", label: "Icons per Line", type: "select", default: "12", options: ["6", "8", "10", "12", "15"] },
      { name: "theme", label: "Theme", type: "select", default: "dark", options: ["dark", "light"] },
    ],
    template: `### Tech Stack

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i={{icons}}&perline={{perline}}&theme={{theme}}" />
  </a>
</p>`,
  },
  {
    id: "tech-badges",
    name: "Tech Badges",
    category: "tech",
    description: "Shields.io style badges for technologies",
    fields: [
      { name: "badges", label: "Badges (one per line: Name-Color)", type: "textarea", default: "JavaScript-F7DF1E\nTypeScript-3178C6\nReact-61DAFB\nNode.js-339933\nPython-3776AB", placeholder: "Name-HexColor (one per line)" },
    ],
    template: `### Technologies

{{badges}}`,
  },
  {
    id: "tech-table",
    name: "Tech Stack Table",
    category: "tech",
    description: "Organized table of your tech stack",
    fields: [
      { name: "frontend", label: "Frontend", type: "text", default: "React, Next.js, Tailwind CSS", placeholder: "Technologies" },
      { name: "backend", label: "Backend", type: "text", default: "Node.js, Python, Go", placeholder: "Technologies" },
      { name: "database", label: "Database", type: "text", default: "PostgreSQL, MongoDB, Redis", placeholder: "Technologies" },
      { name: "devops", label: "DevOps/Tools", type: "text", default: "Docker, Kubernetes, AWS, Git", placeholder: "Technologies" },
    ],
    template: `### Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | {{frontend}} |
| **Backend** | {{backend}} |
| **Database** | {{database}} |
| **DevOps** | {{devops}} |`,
  },

  // ============ SOCIAL ============
  {
    id: "social-badges-picker",
    name: "Social Badges (Visual)",
    category: "social",
    description: "Visual picker for social media badges with multiple styles",
    fields: [
      { name: "badges", label: "Badges", type: "badges-picker", default: "[]", placeholder: "" },
      { name: "badgeStyle", label: "Badge Style", type: "text", default: "for-the-badge", placeholder: "" },
    ],
    template: `### Connect with me

<p align="left">
{{badges}}
</p>`,
  },
  {
    id: "social-badges",
    name: "Social Badges (Manual)",
    category: "social",
    description: "Manual social media profile badges",
    fields: [
      { name: "twitter", label: "Twitter/X Username", type: "text", default: "", placeholder: "username (leave empty to hide)" },
      { name: "linkedin", label: "LinkedIn Username", type: "text", default: "", placeholder: "username (leave empty to hide)" },
      { name: "email", label: "Email", type: "text", default: "", placeholder: "email@example.com (leave empty to hide)" },
      { name: "website", label: "Website", type: "text", default: "", placeholder: "https://... (leave empty to hide)" },
    ],
    template: `### Connect with me

<p align="left">
{{twitter}}{{linkedin}}{{email}}{{website}}
</p>`,
  },
  {
    id: "social-minimal",
    name: "Minimal Links",
    category: "social",
    description: "Simple text links to your profiles",
    fields: [
      { name: "twitter", label: "Twitter/X URL", type: "text", default: "", placeholder: "https://twitter.com/..." },
      { name: "linkedin", label: "LinkedIn URL", type: "text", default: "", placeholder: "https://linkedin.com/in/..." },
      { name: "website", label: "Website URL", type: "text", default: "", placeholder: "https://..." },
    ],
    template: `### Let's Connect

[Twitter]({{twitter}}) · [LinkedIn]({{linkedin}}) · [Website]({{website}})`,
  },

  // ============ PROJECTS ============
  {
    id: "projects-pinned",
    name: "Pinned Repositories",
    category: "projects",
    description: "Showcase your pinned repositories",
    fields: [
      { name: "username", label: "GitHub Username", type: "text", default: "{{username}}", placeholder: "username" },
      { name: "repo1", label: "Repository 1", type: "text", default: "repo-name", placeholder: "repository name" },
      { name: "repo2", label: "Repository 2", type: "text", default: "", placeholder: "repository name (optional)" },
      { name: "theme", label: "Theme", type: "select", default: "default", options: ["default", "dark", "radical", "merko", "gruvbox", "tokyonight", "onedark", "cobalt", "synthwave", "dracula"] },
    ],
    template: `### Featured Projects

[![Repo Card](https://github-readme-stats-eight-theta.vercel.app/api/pin/?username={{username}}&repo={{repo1}}&theme={{theme}})](https://github.com/{{username}}/{{repo1}})
{{repo2}}`,
  },
  {
    id: "projects-table",
    name: "Projects Table",
    category: "projects",
    description: "Table format for your projects",
    fields: [
      { name: "project1_name", label: "Project 1 Name", type: "text", default: "Project Alpha", placeholder: "Project name" },
      { name: "project1_desc", label: "Project 1 Description", type: "text", default: "A cool project that does things", placeholder: "Description" },
      { name: "project1_url", label: "Project 1 URL", type: "text", default: "https://github.com/...", placeholder: "URL" },
      { name: "project2_name", label: "Project 2 Name", type: "text", default: "Project Beta", placeholder: "Project name" },
      { name: "project2_desc", label: "Project 2 Description", type: "text", default: "Another amazing project", placeholder: "Description" },
      { name: "project2_url", label: "Project 2 URL", type: "text", default: "https://github.com/...", placeholder: "URL" },
    ],
    template: `### Projects

| Project | Description |
|---------|-------------|
| [{{project1_name}}]({{project1_url}}) | {{project1_desc}} |
| [{{project2_name}}]({{project2_url}}) | {{project2_desc}} |`,
  },

  // ============ EXTRAS ============
  {
    id: "extras-spotify",
    name: "Spotify Now Playing",
    category: "extras",
    description: "Show what you're currently listening to",
    fields: [
      { name: "username", label: "GitHub Username", type: "text", default: "{{username}}", placeholder: "username" },
    ],
    template: `### 🎧 Now Playing

[![Spotify](https://novatorem-{{username}}.vercel.app/api/spotify)](https://open.spotify.com)

> *Requires [spotify-github-profile](https://github.com/kittinan/spotify-github-profile) setup*`,
  },
  {
    id: "extras-quote",
    name: "Random Dev Quote",
    category: "extras",
    description: "Display a random developer quote",
    fields: [
      { name: "theme", label: "Theme", type: "select", default: "default", options: ["default", "dark", "radical", "merko", "gruvbox", "tokyonight", "onedark", "cobalt", "synthwave", "dracula"] },
    ],
    template: `### 💭 Quote of the Day

[![Readme Quotes](https://quotes-github-readme.vercel.app/api?type=horizontal&theme={{theme}})](https://github.com/piyushsuthar/github-readme-quotes)`,
  },
  {
    id: "extras-snake",
    name: "Contribution Snake",
    category: "extras",
    description: "Animated snake eating your contributions",
    fields: [
      { name: "username", label: "GitHub Username", type: "text", default: "{{username}}", placeholder: "username" },
    ],
    template: `### 🐍 Contribution Graph

![Snake animation](https://github.com/{{username}}/{{username}}/blob/output/github-contribution-grid-snake.svg)

> *Requires [snk](https://github.com/Platane/snk) GitHub Action setup*`,
  },
  {
    id: "extras-footer-wave",
    name: "Wave Footer",
    category: "extras",
    description: "Decorative wave footer",
    fields: [
      { name: "color", label: "Color", type: "select", default: "gradient", options: ["gradient", "auto", "timeGradient", "timeAuto", "random", "0:ee7752,100:e73c7e", "0:23a6d5,100:23d5ab", "0:667eea,100:764ba2", "0:f093fb,100:f5576c", "0:4facfe,100:00f2fe", "0:43e97b,100:38f9d7", "0:fa709a,100:fee140", "6366f1", "22c55e", "f97316", "3b82f6", "ec4899"] },
    ],
    template: `<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color={{color}}&height=120&section=footer" />`,
  },
  {
    id: "extras-separator",
    name: "Section Separator",
    category: "extras",
    description: "Visual separator between sections",
    fields: [
      { name: "style", label: "Style", type: "select", default: "line", options: ["line", "dots", "wave"] },
    ],
    template: `---`,
  },
  {
    id: "extras-support",
    name: "Support/Sponsor",
    category: "extras",
    description: "Buy me a coffee or sponsor button",
    fields: [
      { name: "buymeacoffee", label: "Buy Me a Coffee Username", type: "text", default: "", placeholder: "username" },
      { name: "github_sponsors", label: "GitHub Sponsors Username", type: "text", default: "{{username}}", placeholder: "username" },
    ],
    template: `### Support My Work

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/{{buymeacoffee}})
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-EA4AAA?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/{{github_sponsors}})`,
  },
];

export const componentCategories = [
  { id: "header", name: "Headers & Intro", icon: "Type" },
  { id: "stats", name: "Stats & Metrics", icon: "BarChart3" },
  { id: "tech", name: "Tech Stack", icon: "Code2" },
  { id: "social", name: "Social Links", icon: "Users" },
  { id: "projects", name: "Projects", icon: "FolderGit2" },
  { id: "extras", name: "Extras", icon: "Sparkles" },
] as const;

export function getComponentById(id: string): ReadmeComponent | undefined {
  return components.find((c) => c.id === id);
}

export function getComponentsByCategory(category: string): ReadmeComponent[] {
  return components.filter((c) => c.category === category);
}
