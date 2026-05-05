export interface MenuItem {
  title: string;
  href: string;
  icon?: string;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export const MENU_LIST: MenuCategory[] = [
  {
    category: "User Insights",
    items: [
      { title: "User Search & Report", href: "/user/search" },
      { title: "Commit History", href: "/user/commits" },
      { title: "Trophy Cabinet", href: "/user/trophies" },
      { title: "AI Skill Analysis", href: "/user/ai-analysis" },
    ],
  },
  {
    category: "Global Trends",
    items: [
      { title: "Trending Repositories", href: "/trends/repos" },
      { title: "Rising Developers", href: "/trends/developers" },
      { title: "Language Statistics", href: "/trends/languages" },
    ],
  },
  {
    category: "Developer Tools",
    items: [
      { title: "Readme Generator", href: "/tools/readme" },
      { title: "Issue Tracker", href: "/tools/issues" },
    ],
  },
  {
    category: "Support",
    items: [
      { title: "About Project", href: "/about" },
      { title: "API Status", href: "/status" },
    ],
  },
];