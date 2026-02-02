import { Archetype } from "../types";

export const archetypes: Archetype[] = [
  {
    id: "frontend-dev",
    name: "The Frontend Dev",
    tagline: "Pixels, passion & performance",
    description: "Bold visuals, animated flair, and frontend-focused tech stack. For those who craft the web.",
    persona: "For frontend developers who breathe CSS, dream in components, and ship pixel-perfect UIs.",
    preview: "✨",
    sections: [
      {
        id: "s1",
        componentId: "header-banner",
        values: {
          imageUrl: "https://capsule-render.vercel.app/api?type=waving&color=0:667eea,50:764ba2,100:f093fb&height=230&section=header&text={{name}}&fontSize=70&fontColor=ffffff&animation=fadeIn&fontAlignY=32&desc=✨%20Frontend%20Developer%20%7C%20UI%20Engineer%20%7C%20Web%20Enthusiast%20✨&descAlignY=58&descSize=22",
        },
      },
      {
        id: "s2",
        componentId: "header-typing",
        values: {
          lines: "Building+beautiful+interfaces;Crafting+seamless+experiences;Turning+designs+into+reality;Making+the+web+shine+✨",
          color: "667eea",
        },
      },
      {
        id: "s3",
        componentId: "stats-visitors",
        values: {
          username: "{{username}}",
          color: "blueviolet",
        },
      },
      {
        id: "s4",
        componentId: "about-bullets",
        values: {
          working: "responsive, accessible, and blazing-fast web apps",
          learning: "WebGL, Framer Motion & micro-interactions",
          collaborate: "design systems & component libraries",
          ask: "React, CSS architecture, or performance optimization",
          fun: "I've mass-inspected elements on every website I visit",
        },
      },
      {
        id: "s5",
        componentId: "tech-skillicons",
        values: {
          icons: "html,css,sass,tailwind,js,ts,react,nextjs,vue,svelte,vite,webpack,figma,redux,vercel",
          perline: "5",
          theme: "dark",
        },
      },
      {
        id: "s6",
        componentId: "stats-github",
        values: {
          username: "{{username}}",
          theme: "tokyonight",
          showIcons: "true",
          hideRank: "false",
        },
      },
      {
        id: "s7",
        componentId: "stats-languages",
        values: {
          username: "{{username}}",
          theme: "tokyonight",
          layout: "compact",
          langs_count: "8",
        },
      },
      {
        id: "s8",
        componentId: "stats-activity-graph",
        values: {
          username: "{{username}}",
          theme: "tokyo-night",
        },
      },
      {
        id: "s9",
        componentId: "social-badges",
        values: {
          twitter: "{{username}}",
          linkedin: "{{username}}",
          email: "",
          website: "{{username}}.dev",
        },
      },
      {
        id: "s10",
        componentId: "extras-footer-wave",
        values: {
          color: "gradient",
        },
      },
    ],
  },
  {
    id: "minimalist",
    name: "The Minimalist",
    tagline: "Less is more",
    description: "Clean, focused, and elegant. No clutter, just the essentials.",
    persona: "For developers who believe in simplicity and let their work speak for itself.",
    preview: "🪨",
    sections: [
      {
        id: "s1",
        componentId: "header-minimal",
        values: {
          name: "{{name}}",
          title: "Software Developer",
          location: "Building the future",
        },
      },
      {
        id: "s2",
        componentId: "extras-separator",
        values: { style: "line" },
      },
      {
        id: "s3",
        componentId: "about-bullets",
        values: {
          working: "open source tools",
          learning: "always",
          collaborate: "meaningful projects",
          ask: "anything",
          fun: "I prefer dark mode",
        },
      },
      {
        id: "s4",
        componentId: "extras-separator",
        values: { style: "line" },
      },
      {
        id: "s5",
        componentId: "tech-table",
        values: {
          frontend: "React, TypeScript, Tailwind",
          backend: "Node.js, Go",
          database: "PostgreSQL",
          devops: "Docker, Vercel",
        },
      },
      {
        id: "s6",
        componentId: "social-minimal",
        values: {
          twitter: "https://twitter.com/{{username}}",
          linkedin: "https://linkedin.com/in/{{username}}",
          website: "https://{{username}}.dev",
        },
      },
    ],
  },
  {
    id: "stats-junkie",
    name: "The Stats Junkie",
    tagline: "Numbers don't lie",
    description: "Show off every metric, trophy, and contribution graph. Data-driven flex.",
    persona: "For developers who are proud of their GitHub activity and want the world to know.",
    preview: "📊",
    sections: [
      {
        id: "s1",
        componentId: "header-typing",
        values: {
          lines: "Full+Stack+Developer;Open+Source+Contributor;Code+Enthusiast",
          color: "6366f1",
        },
      },
      {
        id: "s2",
        componentId: "stats-visitors",
        values: {
          username: "{{username}}",
          color: "blue",
        },
      },
      {
        id: "s3",
        componentId: "about-bullets",
        values: {
          working: "scaling my side projects",
          learning: "Rust and systems programming",
          collaborate: "high-impact open source",
          ask: "React, Node.js, or DevOps",
          fun: "I have mass-contributed to GitHub",
        },
      },
      {
        id: "s4",
        componentId: "stats-trophy",
        values: {
          username: "{{username}}",
          theme: "onedark",
          row: "7",
        },
      },
      {
        id: "s5",
        componentId: "stats-github",
        values: {
          username: "{{username}}",
          theme: "tokyonight",
          showIcons: "true",
          hideRank: "false",
        },
      },
      {
        id: "s6",
        componentId: "stats-streak",
        values: {
          username: "{{username}}",
          theme: "tokyonight",
        },
      },
      {
        id: "s7",
        componentId: "stats-languages",
        values: {
          username: "{{username}}",
          theme: "tokyonight",
          layout: "compact",
          langs_count: "8",
        },
      },
      {
        id: "s8",
        componentId: "stats-activity-graph",
        values: {
          username: "{{username}}",
          theme: "tokyo-night",
        },
      },
      {
        id: "s9",
        componentId: "tech-skillicons",
        values: {
          icons: "js,ts,react,nextjs,nodejs,python,docker,kubernetes,aws,git",
          perline: "10",
          theme: "dark",
        },
      },
    ],
  },
  {
    id: "terminal",
    name: "The Terminal",
    tagline: "$ sudo make me a README",
    description: "Old-school terminal vibes with ASCII art and code blocks. For the CLI lovers.",
    persona: "For developers who live in the terminal and appreciate retro aesthetics.",
    preview: "💻",
    sections: [
      {
        id: "s1",
        componentId: "header-ascii",
        values: {
          ascii: `
    ╔═══════════════════════════════════════════╗
    ║                                           ║
    ║   > {{name}}_                             ║
    ║   > Software Engineer                     ║
    ║   > Loading projects...                   ║
    ║                                           ║
    ╚═══════════════════════════════════════════╝`,
        },
      },
      {
        id: "s2",
        componentId: "about-bullets",
        values: {
          working: "`side-projects --innovative`",
          learning: "`rust && go && zig`",
          collaborate: "`open-source --meaningful`",
          ask: "`vim || emacs` (I use vim btw)",
          fun: "`echo $((RANDOM % 100))` is my lucky number",
        },
      },
      {
        id: "s3",
        componentId: "stats-github",
        values: {
          username: "{{username}}",
          theme: "dark",
          showIcons: "true",
          hideRank: "false",
        },
      },
      {
        id: "s4",
        componentId: "stats-languages",
        values: {
          username: "{{username}}",
          theme: "dark",
          layout: "compact",
          langs_count: "8",
        },
      },
      {
        id: "s5",
        componentId: "tech-table",
        values: {
          frontend: "`html` `css` `javascript` `typescript`",
          backend: "`python` `go` `rust` `node`",
          database: "`postgresql` `redis` `sqlite`",
          devops: "`linux` `docker` `k8s` `terraform`",
        },
      },
      {
        id: "s6",
        componentId: "extras-quote",
        values: {
          theme: "dark",
        },
      },
    ],
  },
  {
    id: "creative",
    name: "The Creative",
    tagline: "Where code meets design",
    description: "Visual, expressive, and portfolio-focused. Perfect for design-minded developers.",
    persona: "For developers who care about aesthetics as much as functionality.",
    preview: "🎨",
    sections: [
      {
        id: "s1",
        componentId: "header-banner",
        values: {
          imageUrl: "https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6&height=200&section=header&text={{name}}&fontSize=50&animation=fadeIn&fontColor=ffffff",
        },
      },
      {
        id: "s2",
        componentId: "header-typing",
        values: {
          lines: "Creative+Developer;UI/UX+Enthusiast;Design+Systems+Lover",
          color: "667eea",
        },
      },
      {
        id: "s3",
        componentId: "about-bullets",
        values: {
          working: "beautiful, functional interfaces",
          learning: "motion design & 3D on the web",
          collaborate: "creative coding projects",
          ask: "CSS, animations, or design systems",
          fun: "I obsess over border-radius values",
        },
      },
      {
        id: "s4",
        componentId: "tech-skillicons",
        values: {
          icons: "figma,xd,ps,ai,react,nextjs,tailwind,threejs,blender,git",
          perline: "5",
          theme: "light",
        },
      },
      {
        id: "s5",
        componentId: "stats-github",
        values: {
          username: "{{username}}",
          theme: "radical",
          showIcons: "true",
          hideRank: "false",
        },
      },
      {
        id: "s6",
        componentId: "social-badges",
        values: {
          twitter: "{{username}}",
          linkedin: "{{username}}",
          email: "",
          website: "{{username}}.design",
        },
      },
      {
        id: "s7",
        componentId: "extras-footer-wave",
        values: {
          color: "gradient",
        },
      },
    ],
  },
  {
    id: "open-source",
    name: "The Open Source Hero",
    tagline: "Building in public",
    description: "Contribution-focused with sponsor buttons and maintained projects.",
    persona: "For developers who maintain open source projects and want to grow their community.",
    preview: "🦸",
    sections: [
      {
        id: "s1",
        componentId: "header-wave",
        values: {
          greeting: "Hey! I'm",
          name: "{{name}}",
        },
      },
      {
        id: "s2",
        componentId: "header-typing",
        values: {
          lines: "Open+Source+Maintainer;Community+Builder;Code+Contributor",
          color: "22c55e",
        },
      },
      {
        id: "s3",
        componentId: "stats-visitors",
        values: {
          username: "{{username}}",
          color: "green",
        },
      },
      {
        id: "s4",
        componentId: "about-bullets",
        values: {
          working: "maintaining my open source projects",
          learning: "better documentation practices",
          collaborate: "anything that helps developers",
          ask: "how to start contributing to OSS",
          fun: "I review PRs in my sleep",
        },
      },
      {
        id: "s5",
        componentId: "stats-github",
        values: {
          username: "{{username}}",
          theme: "merko",
          showIcons: "true",
          hideRank: "false",
        },
      },
      {
        id: "s6",
        componentId: "stats-streak",
        values: {
          username: "{{username}}",
          theme: "merko",
        },
      },
      {
        id: "s7",
        componentId: "projects-pinned",
        values: {
          username: "{{username}}",
          repo1: "my-awesome-project",
          repo2: "",
          theme: "merko",
        },
      },
      {
        id: "s8",
        componentId: "extras-support",
        values: {
          buymeacoffee: "{{username}}",
          github_sponsors: "{{username}}",
        },
      },
      {
        id: "s9",
        componentId: "social-badges",
        values: {
          twitter: "{{username}}",
          linkedin: "",
          email: "",
          website: "",
        },
      },
    ],
  },
  {
    id: "corporate",
    name: "The Professional",
    tagline: "Enterprise-ready",
    description: "Clean, LinkedIn-ready profile. Professional without being boring.",
    persona: "For developers in enterprise or looking for their next role.",
    preview: "💼",
    sections: [
      {
        id: "s1",
        componentId: "header-minimal",
        values: {
          name: "{{name}}",
          title: "Senior Software Engineer",
          location: "Open to opportunities",
        },
      },
      {
        id: "s2",
        componentId: "extras-separator",
        values: { style: "line" },
      },
      {
        id: "s3",
        componentId: "about-bullets",
        values: {
          working: "enterprise-scale applications",
          learning: "cloud architecture patterns",
          collaborate: "impactful business solutions",
          ask: "system design & architecture",
          fun: "I actually enjoy writing documentation",
        },
      },
      {
        id: "s4",
        componentId: "tech-table",
        values: {
          frontend: "React, TypeScript, Next.js",
          backend: "Java, Python, Node.js, .NET",
          database: "PostgreSQL, MongoDB, Redis, Elasticsearch",
          devops: "AWS, Azure, Kubernetes, Terraform, CI/CD",
        },
      },
      {
        id: "s5",
        componentId: "stats-github",
        values: {
          username: "{{username}}",
          theme: "default",
          showIcons: "true",
          hideRank: "true",
        },
      },
      {
        id: "s6",
        componentId: "social-badges",
        values: {
          twitter: "",
          linkedin: "{{username}}",
          email: "{{username}}@email.com",
          website: "",
        },
      },
    ],
  },
  {
    id: "indie-hacker",
    name: "The Indie Hacker",
    tagline: "Ship fast, iterate faster",
    description: "Product-focused with social proof. Perfect for solopreneurs.",
    persona: "For developers building and shipping their own products.",
    preview: "🚀",
    sections: [
      {
        id: "s1",
        componentId: "header-wave",
        values: {
          greeting: "I'm",
          name: "{{name}}",
        },
      },
      {
        id: "s2",
        componentId: "header-typing",
        values: {
          lines: "Indie+Hacker;Building+in+Public;Shipping+Products",
          color: "f97316",
        },
      },
      {
        id: "s3",
        componentId: "about-bullets",
        values: {
          working: "my next micro-SaaS",
          learning: "growth & marketing",
          collaborate: "product launches",
          ask: "going from 0 to 1",
          fun: "I've mass-launched on Product Hunt",
        },
      },
      {
        id: "s4",
        componentId: "projects-table",
        values: {
          project1_name: "🚀 ProductName",
          project1_desc: "A tool that solves X problem",
          project1_url: "https://productname.com",
          project2_name: "⚡ AnotherOne",
          project2_desc: "Making Y easier for everyone",
          project2_url: "https://anotherone.io",
        },
      },
      {
        id: "s5",
        componentId: "tech-skillicons",
        values: {
          icons: "nextjs,react,tailwind,supabase,vercel,stripe,nodejs",
          perline: "7",
          theme: "dark",
        },
      },
      {
        id: "s6",
        componentId: "social-badges",
        values: {
          twitter: "{{username}}",
          linkedin: "",
          email: "",
          website: "{{username}}.io",
        },
      },
      {
        id: "s7",
        componentId: "extras-support",
        values: {
          buymeacoffee: "{{username}}",
          github_sponsors: "",
        },
      },
    ],
  },
  {
    id: "student",
    name: "The Learner",
    tagline: "Growing every day",
    description: "Perfect for students and early-career developers showcasing their journey.",
    persona: "For developers early in their career who want to show their potential.",
    preview: "🎓",
    sections: [
      {
        id: "s1",
        componentId: "header-wave",
        values: {
          greeting: "Hello! I'm",
          name: "{{name}}",
        },
      },
      {
        id: "s2",
        componentId: "header-typing",
        values: {
          lines: "Computer+Science+Student;Aspiring+Developer;Always+Learning",
          color: "3b82f6",
        },
      },
      {
        id: "s3",
        componentId: "about-bullets",
        values: {
          working: "university projects & personal apps",
          learning: "full-stack development",
          collaborate: "beginner-friendly projects",
          ask: "my learning journey",
          fun: "I've mass-debugged at 3 AM",
        },
      },
      {
        id: "s4",
        componentId: "stats-github",
        values: {
          username: "{{username}}",
          theme: "tokyonight",
          showIcons: "true",
          hideRank: "false",
        },
      },
      {
        id: "s5",
        componentId: "stats-languages",
        values: {
          username: "{{username}}",
          theme: "tokyonight",
          layout: "compact",
          langs_count: "6",
        },
      },
      {
        id: "s6",
        componentId: "tech-skillicons",
        values: {
          icons: "html,css,js,python,java,react,git,vscode",
          perline: "8",
          theme: "dark",
        },
      },
      {
        id: "s7",
        componentId: "social-badges",
        values: {
          twitter: "",
          linkedin: "{{username}}",
          email: "{{username}}@university.edu",
          website: "",
        },
      },
    ],
  },
];

export function getArchetypeById(id: string): Archetype | undefined {
  return archetypes.find((a) => a.id === id);
}
