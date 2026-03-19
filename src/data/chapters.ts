export interface ServiceCard {
  title: string;
  description: string;
  tags: string[];
}

export interface PortfolioCard {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export interface Chapter {
  id: number;
  name: string;
  slug: string;
  scrollRange: [number, number];
  background: string;
  particleType: "code" | "icons" | "cards" | "shapes";
}

export const chapters: Chapter[] = [
  {
    id: 0,
    name: "VOID",
    slug: "hero",
    scrollRange: [0, 0.25],
    background: "chapter-bg-0",
    particleType: "code",
  },
  {
    id: 1,
    name: "BUILD",
    slug: "services",
    scrollRange: [0.25, 0.5],
    background: "chapter-bg-1",
    particleType: "icons",
  },
  {
    id: 2,
    name: "WORK",
    slug: "work",
    scrollRange: [0.5, 0.75],
    background: "chapter-bg-2",
    particleType: "cards",
  },
  {
    id: 3,
    name: "CONNECT",
    slug: "contact",
    scrollRange: [0.75, 1],
    background: "chapter-bg-3",
    particleType: "shapes",
  },
];

export const services: ServiceCard[] = [
  {
    title: "Backend",
    description: "Robust server-side architecture built to scale.",
    tags: ["Spring Boot", "REST APIs", "Microservices"],
  },
  {
    title: "Frontend",
    description: "Pixel-perfect interfaces with smooth interactions.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "DevOps",
    description: "Automated pipelines and cloud infrastructure.",
    tags: ["Docker", "CI/CD", "Cloud"],
  },
];

export const portfolio: PortfolioCard[] = [
  {
    title: "FinTrack API",
    description:
      "High-throughput financial data processing pipeline with Spring Boot microservices and real-time WebSocket feeds.",
    tags: ["Spring Boot", "PostgreSQL", "WebSocket"],
    link: "#",
  },
  {
    title: "DevBoard",
    description:
      "Developer dashboard with real-time CI/CD monitoring, GitHub integration, and customizable widget system.",
    tags: ["React", "Next.js", "Docker"],
    link: "#",
  },
  {
    title: "CloudSync",
    description:
      "Multi-cloud deployment orchestrator with automated rollbacks and infrastructure-as-code templates.",
    tags: ["Kubernetes", "Terraform", "AWS"],
    link: "#",
  },
];

export const floatingCodeSnippets = [
  "@SpringBootApplication",
  "<Component />",
  "yarn dev",
  "docker compose up",
  "git push origin main",
  "npm run build",
  "mvn clean install",
  "kubectl apply -f",
];

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/codebara", icon: "github" },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/codebara",
    icon: "linkedin",
  },
];
