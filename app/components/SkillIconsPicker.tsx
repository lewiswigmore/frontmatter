"use client";

import { useState, useMemo } from "react";
import { Search, X, Plus, Check } from "lucide-react";

// All available skill icons from skillicons.dev
const ALL_SKILL_ICONS = [
  // Languages
  { id: "js", name: "JavaScript", category: "Languages" },
  { id: "ts", name: "TypeScript", category: "Languages" },
  { id: "py", name: "Python", category: "Languages" },
  { id: "java", name: "Java", category: "Languages" },
  { id: "c", name: "C", category: "Languages" },
  { id: "cpp", name: "C++", category: "Languages" },
  { id: "cs", name: "C#", category: "Languages" },
  { id: "go", name: "Go", category: "Languages" },
  { id: "rust", name: "Rust", category: "Languages" },
  { id: "swift", name: "Swift", category: "Languages" },
  { id: "kotlin", name: "Kotlin", category: "Languages" },
  { id: "php", name: "PHP", category: "Languages" },
  { id: "ruby", name: "Ruby", category: "Languages" },
  { id: "perl", name: "Perl", category: "Languages" },
  { id: "lua", name: "Lua", category: "Languages" },
  { id: "r", name: "R", category: "Languages" },
  { id: "scala", name: "Scala", category: "Languages" },
  { id: "elixir", name: "Elixir", category: "Languages" },
  { id: "clojure", name: "Clojure", category: "Languages" },
  { id: "haskell", name: "Haskell", category: "Languages" },
  { id: "zig", name: "Zig", category: "Languages" },
  { id: "nim", name: "Nim", category: "Languages" },
  { id: "dart", name: "Dart", category: "Languages" },
  { id: "julia", name: "Julia", category: "Languages" },
  { id: "solidity", name: "Solidity", category: "Languages" },
  { id: "matlab", name: "MATLAB", category: "Languages" },
  { id: "octave", name: "Octave", category: "Languages" },
  { id: "fortran", name: "Fortran", category: "Languages" },
  { id: "crystal", name: "Crystal", category: "Languages" },
  { id: "v", name: "V", category: "Languages" },
  
  // Frontend
  { id: "html", name: "HTML", category: "Frontend" },
  { id: "css", name: "CSS", category: "Frontend" },
  { id: "sass", name: "Sass", category: "Frontend" },
  { id: "less", name: "Less", category: "Frontend" },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend" },
  { id: "bootstrap", name: "Bootstrap", category: "Frontend" },
  { id: "materialui", name: "Material UI", category: "Frontend" },
  { id: "styledcomponents", name: "Styled Components", category: "Frontend" },
  { id: "react", name: "React", category: "Frontend" },
  { id: "nextjs", name: "Next.js", category: "Frontend" },
  { id: "vue", name: "Vue.js", category: "Frontend" },
  { id: "nuxtjs", name: "Nuxt.js", category: "Frontend" },
  { id: "angular", name: "Angular", category: "Frontend" },
  { id: "svelte", name: "Svelte", category: "Frontend" },
  { id: "astro", name: "Astro", category: "Frontend" },
  { id: "solidjs", name: "SolidJS", category: "Frontend" },
  { id: "qwik", name: "Qwik", category: "Frontend" },
  { id: "lit", name: "Lit", category: "Frontend" },
  { id: "alpinejs", name: "Alpine.js", category: "Frontend" },
  { id: "htmx", name: "htmx", category: "Frontend" },
  { id: "jquery", name: "jQuery", category: "Frontend" },
  { id: "threejs", name: "Three.js", category: "Frontend" },
  { id: "d3", name: "D3.js", category: "Frontend" },
  { id: "p5js", name: "p5.js", category: "Frontend" },
  
  // Backend
  { id: "nodejs", name: "Node.js", category: "Backend" },
  { id: "express", name: "Express", category: "Backend" },
  { id: "nestjs", name: "NestJS", category: "Backend" },
  { id: "fastapi", name: "FastAPI", category: "Backend" },
  { id: "flask", name: "Flask", category: "Backend" },
  { id: "django", name: "Django", category: "Backend" },
  { id: "rails", name: "Ruby on Rails", category: "Backend" },
  { id: "spring", name: "Spring", category: "Backend" },
  { id: "laravel", name: "Laravel", category: "Backend" },
  { id: "dotnet", name: ".NET", category: "Backend" },
  { id: "graphql", name: "GraphQL", category: "Backend" },
  { id: "apollo", name: "Apollo", category: "Backend" },
  { id: "prisma", name: "Prisma", category: "Backend" },
  { id: "sequelize", name: "Sequelize", category: "Backend" },
  { id: "bun", name: "Bun", category: "Backend" },
  { id: "deno", name: "Deno", category: "Backend" },
  { id: "elysia", name: "Elysia", category: "Backend" },
  { id: "hono", name: "Hono", category: "Backend" },
  
  // Database
  { id: "mysql", name: "MySQL", category: "Database" },
  { id: "postgres", name: "PostgreSQL", category: "Database" },
  { id: "mongodb", name: "MongoDB", category: "Database" },
  { id: "redis", name: "Redis", category: "Database" },
  { id: "sqlite", name: "SQLite", category: "Database" },
  { id: "supabase", name: "Supabase", category: "Database" },
  { id: "firebase", name: "Firebase", category: "Database" },
  { id: "dynamodb", name: "DynamoDB", category: "Database" },
  { id: "cassandra", name: "Cassandra", category: "Database" },
  { id: "elasticsearch", name: "Elasticsearch", category: "Database" },
  { id: "planetscale", name: "PlanetScale", category: "Database" },
  { id: "neo4j", name: "Neo4j", category: "Database" },
  
  // DevOps & Cloud
  { id: "docker", name: "Docker", category: "DevOps" },
  { id: "kubernetes", name: "Kubernetes", category: "DevOps" },
  { id: "aws", name: "AWS", category: "DevOps" },
  { id: "gcp", name: "Google Cloud", category: "DevOps" },
  { id: "azure", name: "Azure", category: "DevOps" },
  { id: "vercel", name: "Vercel", category: "DevOps" },
  { id: "netlify", name: "Netlify", category: "DevOps" },
  { id: "heroku", name: "Heroku", category: "DevOps" },
  { id: "digitalocean", name: "DigitalOcean", category: "DevOps" },
  { id: "cloudflare", name: "Cloudflare", category: "DevOps" },
  { id: "nginx", name: "Nginx", category: "DevOps" },
  { id: "terraform", name: "Terraform", category: "DevOps" },
  { id: "ansible", name: "Ansible", category: "DevOps" },
  { id: "jenkins", name: "Jenkins", category: "DevOps" },
  { id: "githubactions", name: "GitHub Actions", category: "DevOps" },
  { id: "gitlab", name: "GitLab", category: "DevOps" },
  { id: "bitbucket", name: "Bitbucket", category: "DevOps" },
  { id: "prometheus", name: "Prometheus", category: "DevOps" },
  { id: "grafana", name: "Grafana", category: "DevOps" },
  
  // Tools
  { id: "git", name: "Git", category: "Tools" },
  { id: "github", name: "GitHub", category: "Tools" },
  { id: "vscode", name: "VS Code", category: "Tools" },
  { id: "vim", name: "Vim", category: "Tools" },
  { id: "neovim", name: "Neovim", category: "Tools" },
  { id: "sublime", name: "Sublime Text", category: "Tools" },
  { id: "idea", name: "IntelliJ IDEA", category: "Tools" },
  { id: "webstorm", name: "WebStorm", category: "Tools" },
  { id: "postman", name: "Postman", category: "Tools" },
  { id: "figma", name: "Figma", category: "Tools" },
  { id: "xd", name: "Adobe XD", category: "Tools" },
  { id: "ps", name: "Photoshop", category: "Tools" },
  { id: "ai", name: "Illustrator", category: "Tools" },
  { id: "pr", name: "Premiere Pro", category: "Tools" },
  { id: "ae", name: "After Effects", category: "Tools" },
  { id: "blender", name: "Blender", category: "Tools" },
  { id: "unity", name: "Unity", category: "Tools" },
  { id: "unreal", name: "Unreal Engine", category: "Tools" },
  { id: "godot", name: "Godot", category: "Tools" },
  { id: "notion", name: "Notion", category: "Tools" },
  { id: "obsidian", name: "Obsidian", category: "Tools" },
  
  // Build Tools
  { id: "webpack", name: "Webpack", category: "Build Tools" },
  { id: "vite", name: "Vite", category: "Build Tools" },
  { id: "rollup", name: "Rollup", category: "Build Tools" },
  { id: "esbuild", name: "esbuild", category: "Build Tools" },
  { id: "babel", name: "Babel", category: "Build Tools" },
  { id: "gulp", name: "Gulp", category: "Build Tools" },
  { id: "gradle", name: "Gradle", category: "Build Tools" },
  { id: "maven", name: "Maven", category: "Build Tools" },
  { id: "cmake", name: "CMake", category: "Build Tools" },
  { id: "npm", name: "npm", category: "Build Tools" },
  { id: "pnpm", name: "pnpm", category: "Build Tools" },
  { id: "yarn", name: "Yarn", category: "Build Tools" },
  
  // Testing
  { id: "jest", name: "Jest", category: "Testing" },
  { id: "vitest", name: "Vitest", category: "Testing" },
  { id: "cypress", name: "Cypress", category: "Testing" },
  { id: "playwright", name: "Playwright", category: "Testing" },
  { id: "selenium", name: "Selenium", category: "Testing" },
  { id: "mocha", name: "Mocha", category: "Testing" },
  
  // Mobile
  { id: "flutter", name: "Flutter", category: "Mobile" },
  { id: "reactnative", name: "React Native", category: "Mobile" },
  { id: "androidstudio", name: "Android Studio", category: "Mobile" },
  { id: "xcode", name: "Xcode", category: "Mobile" },
  { id: "ionic", name: "Ionic", category: "Mobile" },
  { id: "capacitor", name: "Capacitor", category: "Mobile" },
  { id: "expo", name: "Expo", category: "Mobile" },
  { id: "tauri", name: "Tauri", category: "Mobile" },
  { id: "electron", name: "Electron", category: "Mobile" },
  
  // AI/ML
  { id: "tensorflow", name: "TensorFlow", category: "AI/ML" },
  { id: "pytorch", name: "PyTorch", category: "AI/ML" },
  { id: "opencv", name: "OpenCV", category: "AI/ML" },
  { id: "sklearn", name: "scikit-learn", category: "AI/ML" },
  
  // State Management
  { id: "redux", name: "Redux", category: "State" },
  { id: "recoil", name: "Recoil", category: "State" },
  { id: "pinia", name: "Pinia", category: "State" },
  { id: "mobx", name: "MobX", category: "State" },
  { id: "zustand", name: "Zustand", category: "State" },
  
  // OS
  { id: "linux", name: "Linux", category: "OS" },
  { id: "ubuntu", name: "Ubuntu", category: "OS" },
  { id: "debian", name: "Debian", category: "OS" },
  { id: "arch", name: "Arch Linux", category: "OS" },
  { id: "redhat", name: "Red Hat", category: "OS" },
  { id: "windows", name: "Windows", category: "OS" },
  { id: "apple", name: "macOS", category: "OS" },
  { id: "kali", name: "Kali Linux", category: "OS" },
  { id: "mint", name: "Linux Mint", category: "OS" },
  
  // Other
  { id: "markdown", name: "Markdown", category: "Other" },
  { id: "latex", name: "LaTeX", category: "Other" },
  { id: "regex", name: "Regex", category: "Other" },
  { id: "bash", name: "Bash", category: "Other" },
  { id: "powershell", name: "PowerShell", category: "Other" },
  { id: "wasm", name: "WebAssembly", category: "Other" },
  { id: "svg", name: "SVG", category: "Other" },
  { id: "webflow", name: "Webflow", category: "Other" },
  { id: "wordpress", name: "WordPress", category: "Other" },
  { id: "stripe", name: "Stripe", category: "Other" },
  { id: "twilio", name: "Twilio", category: "Other" },
  { id: "sentry", name: "Sentry", category: "Other" },
  { id: "rabbitmq", name: "RabbitMQ", category: "Other" },
  { id: "kafka", name: "Kafka", category: "Other" },
];

const CATEGORIES = [
  "All",
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Tools",
  "Build Tools",
  "Testing",
  "Mobile",
  "AI/ML",
  "State",
  "OS",
  "Other",
];

interface SkillIconsPickerProps {
  value: string;
  onChange: (value: string) => void;
  theme?: "dark" | "light";
}

export default function SkillIconsPicker({ value, onChange, theme = "dark" }: SkillIconsPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const selectedIcons = useMemo(() => {
    return value.split(",").map(s => s.trim()).filter(Boolean);
  }, [value]);

  const filteredIcons = useMemo(() => {
    let icons = ALL_SKILL_ICONS;
    
    if (selectedCategory !== "All") {
      icons = icons.filter(icon => icon.category === selectedCategory);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      icons = icons.filter(icon => 
        icon.name.toLowerCase().includes(searchLower) ||
        icon.id.toLowerCase().includes(searchLower)
      );
    }
    
    return icons;
  }, [search, selectedCategory]);

  const toggleIcon = (iconId: string) => {
    const current = selectedIcons;
    if (current.includes(iconId)) {
      onChange(current.filter(id => id !== iconId).join(","));
    } else {
      onChange([...current, iconId].join(","));
    }
  };

  const removeIcon = (iconId: string) => {
    onChange(selectedIcons.filter(id => id !== iconId).join(","));
  };

  return (
    <div className="space-y-2">
      {/* Selected Icons Display */}
      <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 border border-stone-200 bg-stone-50">
        {selectedIcons.length === 0 ? (
          <span className="font-mono text-xs text-stone-400">No icons selected</span>
        ) : (
          selectedIcons.map(iconId => {
            const icon = ALL_SKILL_ICONS.find(i => i.id === iconId);
            return (
              <span
                key={iconId}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-white border border-stone-200 font-mono text-xs text-stone-700"
              >
                <img 
                  src={`https://skillicons.dev/icons?i=${iconId}&theme=${theme}`}
                  alt={icon?.name || iconId}
                  className="w-4 h-4"
                />
                {icon?.name || iconId}
                <button
                  onClick={() => removeIcon(iconId)}
                  className="ml-0.5 hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })
        )}
      </div>

      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 font-mono text-xs border border-stone-300 hover:bg-stone-100 text-stone-600 transition-colors"
      >
        <Plus className="w-3 h-3" />
        {isOpen ? "Close picker" : "Browse icons"}
      </button>

      {/* Picker Panel */}
      {isOpen && (
        <div className="border border-stone-200 bg-white">
          {/* Search */}
          <div className="p-2 border-b border-stone-100">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search icons..."
                className="w-full pl-7 pr-2 py-1.5 font-mono text-sm border-b border-stone-200 focus:border-stone-400 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1 p-2 border-b border-stone-100 bg-stone-50">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-0.5 font-mono text-xs transition-colors ${
                  selectedCategory === cat
                    ? "bg-stone-800 text-white"
                    : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Icons Grid */}
          <div className="max-h-48 overflow-y-auto p-2">
            <div className="grid grid-cols-4 gap-1">
              {filteredIcons.map(icon => {
                const isSelected = selectedIcons.includes(icon.id);
                return (
                  <button
                    key={icon.id}
                    onClick={() => toggleIcon(icon.id)}
                    title={icon.name}
                    className={`relative flex flex-col items-center gap-1 p-1.5 border transition-colors ${
                      isSelected
                        ? "border-stone-800 bg-stone-100"
                        : "border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    <img 
                      src={`https://skillicons.dev/icons?i=${icon.id}&theme=${theme}`}
                      alt={icon.name}
                      className="w-6 h-6"
                    />
                    <span className="font-mono text-[10px] text-stone-500 truncate w-full text-center">
                      {icon.id}
                    </span>
                    {isSelected && (
                      <div className="absolute top-0.5 right-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            {filteredIcons.length === 0 && (
              <p className="text-center font-mono text-xs text-stone-400 py-4">
                No icons found
              </p>
            )}
          </div>

          {/* Count */}
          <div className="px-2 py-1.5 border-t border-stone-100 bg-stone-50">
            <span className="font-mono text-xs text-stone-400">
              {selectedIcons.length} selected · {filteredIcons.length} shown
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
