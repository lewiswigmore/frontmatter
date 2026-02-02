"use client";

import { useState, useMemo } from "react";
import { Search, X, Plus, Check } from "lucide-react";

// Badge style options
const BADGE_STYLES = [
  { id: "for-the-badge", name: "For The Badge", preview: "style=for-the-badge" },
  { id: "flat", name: "Flat", preview: "style=flat" },
  { id: "flat-square", name: "Flat Square", preview: "style=flat-square" },
  { id: "plastic", name: "Plastic", preview: "style=plastic" },
  { id: "social", name: "Social", preview: "style=social" },
];

// All available social platforms
const ALL_SOCIAL_PLATFORMS = [
  // Major Social
  { id: "twitter", name: "Twitter / X", icon: "x", color: "000000", category: "Social" },
  { id: "linkedin", name: "LinkedIn", icon: "linkedin", color: "0A66C2", category: "Social" },
  { id: "facebook", name: "Facebook", icon: "facebook", color: "1877F2", category: "Social" },
  { id: "instagram", name: "Instagram", icon: "instagram", color: "E4405F", category: "Social" },
  { id: "threads", name: "Threads", icon: "threads", color: "000000", category: "Social" },
  { id: "mastodon", name: "Mastodon", icon: "mastodon", color: "6364FF", category: "Social" },
  { id: "bluesky", name: "Bluesky", icon: "bluesky", color: "0085FF", category: "Social" },
  { id: "reddit", name: "Reddit", icon: "reddit", color: "FF4500", category: "Social" },
  { id: "discord", name: "Discord", icon: "discord", color: "5865F2", category: "Social" },
  { id: "slack", name: "Slack", icon: "slack", color: "4A154B", category: "Social" },
  
  // Developer Platforms
  { id: "github", name: "GitHub", icon: "github", color: "181717", category: "Developer" },
  { id: "gitlab", name: "GitLab", icon: "gitlab", color: "FC6D26", category: "Developer" },
  { id: "bitbucket", name: "Bitbucket", icon: "bitbucket", color: "0052CC", category: "Developer" },
  { id: "stackoverflow", name: "Stack Overflow", icon: "stackoverflow", color: "F58025", category: "Developer" },
  { id: "devto", name: "Dev.to", icon: "devdotto", color: "0A0A0A", category: "Developer" },
  { id: "hashnode", name: "Hashnode", icon: "hashnode", color: "2962FF", category: "Developer" },
  { id: "medium", name: "Medium", icon: "medium", color: "000000", category: "Developer" },
  { id: "codepen", name: "CodePen", icon: "codepen", color: "000000", category: "Developer" },
  { id: "codesandbox", name: "CodeSandbox", icon: "codesandbox", color: "151515", category: "Developer" },
  { id: "replit", name: "Replit", icon: "replit", color: "F26207", category: "Developer" },
  { id: "hackerrank", name: "HackerRank", icon: "hackerrank", color: "00EA64", category: "Developer" },
  { id: "leetcode", name: "LeetCode", icon: "leetcode", color: "FFA116", category: "Developer" },
  { id: "kaggle", name: "Kaggle", icon: "kaggle", color: "20BEFF", category: "Developer" },
  { id: "npm", name: "npm", icon: "npm", color: "CB3837", category: "Developer" },
  
  // Content & Streaming
  { id: "youtube", name: "YouTube", icon: "youtube", color: "FF0000", category: "Content" },
  { id: "twitch", name: "Twitch", icon: "twitch", color: "9146FF", category: "Content" },
  { id: "tiktok", name: "TikTok", icon: "tiktok", color: "000000", category: "Content" },
  { id: "spotify", name: "Spotify", icon: "spotify", color: "1DB954", category: "Content" },
  { id: "soundcloud", name: "SoundCloud", icon: "soundcloud", color: "FF3300", category: "Content" },
  { id: "substack", name: "Substack", icon: "substack", color: "FF6719", category: "Content" },
  { id: "patreon", name: "Patreon", icon: "patreon", color: "F96854", category: "Content" },
  { id: "kofi", name: "Ko-fi", icon: "kofi", color: "FF5E5B", category: "Content" },
  { id: "buymeacoffee", name: "Buy Me a Coffee", icon: "buymeacoffee", color: "FFDD00", category: "Content" },
  
  // Professional
  { id: "email", name: "Email", icon: "gmail", color: "EA4335", category: "Professional" },
  { id: "website", name: "Website", icon: "googlechrome", color: "4285F4", category: "Professional" },
  { id: "portfolio", name: "Portfolio", icon: "aboutdotme", color: "00A98F", category: "Professional" },
  { id: "resume", name: "Resume", icon: "readdotcv", color: "111111", category: "Professional" },
  { id: "calendly", name: "Calendly", icon: "calendly", color: "006BFF", category: "Professional" },
  { id: "linktree", name: "Linktree", icon: "linktree", color: "43E55E", category: "Professional" },
  
  // Gaming
  { id: "steam", name: "Steam", icon: "steam", color: "000000", category: "Gaming" },
  { id: "epicgames", name: "Epic Games", icon: "epicgames", color: "313131", category: "Gaming" },
  { id: "xbox", name: "Xbox", icon: "xbox", color: "107C10", category: "Gaming" },
  { id: "playstation", name: "PlayStation", icon: "playstation", color: "003791", category: "Gaming" },
  { id: "nintendo", name: "Nintendo", icon: "nintendo", color: "E60012", category: "Gaming" },
  
  // Design
  { id: "dribbble", name: "Dribbble", icon: "dribbble", color: "EA4C89", category: "Design" },
  { id: "behance", name: "Behance", icon: "behance", color: "1769FF", category: "Design" },
  { id: "figma", name: "Figma", icon: "figma", color: "F24E1E", category: "Design" },
  { id: "pinterest", name: "Pinterest", icon: "pinterest", color: "BD081C", category: "Design" },
];

const CATEGORIES = [
  "All",
  "Social",
  "Developer",
  "Content",
  "Professional",
  "Gaming",
  "Design",
];

interface SocialBadge {
  platformId: string;
  value: string; // username, email, or URL
}

interface SocialBadgesPickerProps {
  badges: SocialBadge[];
  style: string;
  onChange: (badges: SocialBadge[], style: string) => void;
}

export default function SocialBadgesPicker({ badges, style, onChange }: SocialBadgesPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingBadge, setEditingBadge] = useState<string | null>(null);

  const selectedPlatformIds = useMemo(() => badges.map(b => b.platformId), [badges]);

  const filteredPlatforms = useMemo(() => {
    let platforms = ALL_SOCIAL_PLATFORMS;
    
    if (selectedCategory !== "All") {
      platforms = platforms.filter(p => p.category === selectedCategory);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      platforms = platforms.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.id.toLowerCase().includes(searchLower)
      );
    }
    
    return platforms;
  }, [search, selectedCategory]);

  const togglePlatform = (platformId: string) => {
    if (selectedPlatformIds.includes(platformId)) {
      onChange(badges.filter(b => b.platformId !== platformId), style);
    } else {
      onChange([...badges, { platformId, value: "" }], style);
      setEditingBadge(platformId);
    }
  };

  const updateBadgeValue = (platformId: string, value: string) => {
    onChange(
      badges.map(b => b.platformId === platformId ? { ...b, value } : b),
      style
    );
  };

  const removeBadge = (platformId: string) => {
    onChange(badges.filter(b => b.platformId !== platformId), style);
  };

  const getPlaceholder = (platformId: string) => {
    const platform = ALL_SOCIAL_PLATFORMS.find(p => p.id === platformId);
    if (!platform) return "username";
    if (platformId === "email") return "your@email.com";
    if (platformId === "website" || platformId === "portfolio") return "https://yoursite.com";
    return "username";
  };

  const generateBadgeUrl = (badge: SocialBadge) => {
    const platform = ALL_SOCIAL_PLATFORMS.find(p => p.id === badge.platformId);
    if (!platform) return "";
    
    const logoColor = style === "for-the-badge" ? "white" : platform.color;
    return `https://img.shields.io/badge/${encodeURIComponent(platform.name)}-${platform.color}?style=${style}&logo=${platform.icon}&logoColor=${logoColor === platform.color ? "white" : logoColor}`;
  };

  return (
    <div className="space-y-3">
      {/* Style Selector */}
      <div>
        <label className="block font-mono text-xs text-stone-500 mb-1.5">
          Badge Style
        </label>
        <div className="flex flex-wrap gap-1">
          {BADGE_STYLES.map(s => (
            <button
              key={s.id}
              onClick={() => onChange(badges, s.id)}
              className={`px-2 py-1 font-mono text-xs transition-colors ${
                style === s.id
                  ? "bg-stone-800 text-white"
                  : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Badges */}
      <div>
        <label className="block font-mono text-xs text-stone-500 mb-1.5">
          Your Badges ({badges.length})
        </label>
        <div className="space-y-2 min-h-[40px] p-2 border border-stone-200 bg-stone-50">
          {badges.length === 0 ? (
            <span className="font-mono text-xs text-stone-400">No badges added yet</span>
          ) : (
            badges.map(badge => {
              const platform = ALL_SOCIAL_PLATFORMS.find(p => p.id === badge.platformId);
              if (!platform) return null;
              
              return (
                <div key={badge.platformId} className="flex items-center gap-2 bg-white p-2 border border-stone-200">
                  <img
                    src={generateBadgeUrl(badge)}
                    alt={platform.name}
                    className="h-5"
                  />
                  <input
                    type="text"
                    value={badge.value}
                    onChange={(e) => updateBadgeValue(badge.platformId, e.target.value)}
                    placeholder={getPlaceholder(badge.platformId)}
                    className="flex-1 px-2 py-1 font-mono text-xs border-b border-stone-200 focus:border-stone-400 bg-transparent outline-none"
                  />
                  <button
                    onClick={() => removeBadge(badge.platformId)}
                    className="p-1 hover:bg-red-100 text-stone-400 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 font-mono text-xs border border-stone-300 hover:bg-stone-100 text-stone-600 transition-colors"
      >
        <Plus className="w-3 h-3" />
        {isOpen ? "Close picker" : "Add badges"}
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
                placeholder="Search platforms..."
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

          {/* Platforms Grid */}
          <div className="max-h-48 overflow-y-auto p-2">
            <div className="grid grid-cols-2 gap-1">
              {filteredPlatforms.map(platform => {
                const isSelected = selectedPlatformIds.includes(platform.id);
                return (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`relative flex items-center gap-2 p-2 border transition-colors text-left ${
                      isSelected
                        ? "border-stone-800 bg-stone-100"
                        : "border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-sm flex items-center justify-center"
                      style={{ backgroundColor: `#${platform.color}` }}
                    >
                      <img
                        src={`https://cdn.simpleicons.org/${platform.icon}/white`}
                        alt=""
                        className="w-2.5 h-2.5"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                    <span className="font-mono text-xs text-stone-700 truncate flex-1">
                      {platform.name}
                    </span>
                    {isSelected && (
                      <Check className="w-3 h-3 text-green-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
            {filteredPlatforms.length === 0 && (
              <p className="text-center font-mono text-xs text-stone-400 py-4">
                No platforms found
              </p>
            )}
          </div>

          {/* Preview */}
          {badges.length > 0 && (
            <div className="p-2 border-t border-stone-100 bg-stone-50">
              <span className="block font-mono text-xs text-stone-500 mb-2">Preview:</span>
              <div className="flex flex-wrap gap-1">
                {badges.map(badge => (
                  <img
                    key={badge.platformId}
                    src={generateBadgeUrl(badge)}
                    alt=""
                    className="h-6"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Helper function to generate markdown from badges
export function generateSocialBadgesMarkdown(badges: SocialBadge[], style: string): string {
  if (badges.length === 0) return "";
  
  const badgeMarkdown = badges
    .filter(b => b.value) // Only include badges with values
    .map(badge => {
      const platform = ALL_SOCIAL_PLATFORMS.find(p => p.id === badge.platformId);
      if (!platform) return "";
      
      const logoColor = style === "for-the-badge" ? "white" : "white";
      const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(platform.name)}-${platform.color}?style=${style}&logo=${platform.icon}&logoColor=${logoColor}`;
      
      let link = "";
      switch (badge.platformId) {
        case "twitter":
          link = `https://twitter.com/${badge.value}`;
          break;
        case "linkedin":
          link = `https://linkedin.com/in/${badge.value}`;
          break;
        case "github":
          link = `https://github.com/${badge.value}`;
          break;
        case "gitlab":
          link = `https://gitlab.com/${badge.value}`;
          break;
        case "email":
          link = `mailto:${badge.value}`;
          break;
        case "website":
        case "portfolio":
          link = badge.value.startsWith("http") ? badge.value : `https://${badge.value}`;
          break;
        case "youtube":
          link = `https://youtube.com/@${badge.value}`;
          break;
        case "twitch":
          link = `https://twitch.tv/${badge.value}`;
          break;
        case "instagram":
          link = `https://instagram.com/${badge.value}`;
          break;
        case "facebook":
          link = `https://facebook.com/${badge.value}`;
          break;
        case "reddit":
          link = `https://reddit.com/user/${badge.value}`;
          break;
        case "discord":
          link = `https://discord.gg/${badge.value}`;
          break;
        case "devto":
          link = `https://dev.to/${badge.value}`;
          break;
        case "medium":
          link = `https://medium.com/@${badge.value}`;
          break;
        case "hashnode":
          link = `https://hashnode.com/@${badge.value}`;
          break;
        case "stackoverflow":
          link = `https://stackoverflow.com/users/${badge.value}`;
          break;
        case "codepen":
          link = `https://codepen.io/${badge.value}`;
          break;
        case "dribbble":
          link = `https://dribbble.com/${badge.value}`;
          break;
        case "behance":
          link = `https://behance.net/${badge.value}`;
          break;
        case "figma":
          link = `https://figma.com/@${badge.value}`;
          break;
        case "spotify":
          link = `https://open.spotify.com/user/${badge.value}`;
          break;
        case "kofi":
          link = `https://ko-fi.com/${badge.value}`;
          break;
        case "buymeacoffee":
          link = `https://buymeacoffee.com/${badge.value}`;
          break;
        case "patreon":
          link = `https://patreon.com/${badge.value}`;
          break;
        case "linktree":
          link = `https://linktr.ee/${badge.value}`;
          break;
        default:
          link = badge.value.startsWith("http") ? badge.value : `https://${badge.value}`;
      }
      
      return `[![${platform.name}](${badgeUrl})](${link})`;
    })
    .filter(Boolean)
    .join("\n");
  
  return badgeMarkdown;
}

// Export the platforms list for use elsewhere
export { ALL_SOCIAL_PLATFORMS, BADGE_STYLES };
export type { SocialBadge };
