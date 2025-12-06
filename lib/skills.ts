/**
 * Skill normalization + ontology utilities
 * - Keeps logic intentionally simple (Week 1–3) for deterministic matching
 * - Exports: SKILL_ONTOLOGY, SKILL_ALIASES, normalizeSkill, extractKnownSkills
 */

// Grouped ontology (canonical names). Keep duplicates across categories where appropriate.
export const SKILL_ONTOLOGY: Record<string, string[]> = {
  frontend: [
    "React",
    "Next.js",
    "Vue.js",
    "Angular",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "Tailwind CSS",
  ],
  backend: [
    "Node.js",
    "Express",
    "Django",
    "Flask",
    "FastAPI",
    "Spring",
    "Java",
    "Golang",
    "Python",
    "PHP",
    "SQL",
    "PostgreSQL",
    "MySQL",
  ],
  devops: [
    "AWS",
    "Azure",
    "GCP",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Terraform",
    "Serverless",
  ],
  data: [
    "Python",
    "Pandas",
    "NumPy",
    "scikit-learn",
    "TensorFlow",
    "PyTorch",
    "ML",
    "NLP",
    "SQL",
  ],
  soft: ["Communication", "Teamwork", "Leadership", "Problem Solving"],
};

// Lightweight alias map for common shorthand/variants -> canonical
export const SKILL_ALIASES: Record<string, string> = {
  ts: "TypeScript",
  typescript: "TypeScript",
  "type script": "TypeScript",
  node: "Node.js",
  nodejs: "Node.js",
  "node.js": "Node.js",
  reactjs: "React",
  "react.js": "React",
  nextjs: "Next.js",
  "next.js": "Next.js",
  aws: "AWS",
  "aws cloud": "AWS",
  gcp: "GCP",
  azure: "Azure",
  docker: "Docker",
  k8s: "Kubernetes",
  kubernetes: "Kubernetes",
  sql: "SQL",
  postgres: "PostgreSQL",
  postgresql: "PostgreSQL",
  py: "Python",
  python: "Python",
  tf: "TensorFlow",
  tensorflow: "TensorFlow",
  pytorch: "PyTorch",
  scikit: "scikit-learn",
  "scikit-learn": "scikit-learn",
  nlp: "NLP",
  ml: "ML",
};

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function capitalizeWords(s: string) {
  return s
    .split(/\s+/)
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/**
 * Normalize a skill string to a canonical form when possible.
 * - trims and lowers input
 * - maps a set of known aliases to canonical names
 * - if unknown, returns a cleaned title-cased string
 */
export function normalizeSkill(skill: string): string {
  const raw = (skill || "").trim();
  if (!raw) return "";
  const lower = raw.toLowerCase();

  // direct alias
  if (SKILL_ALIASES[lower]) return SKILL_ALIASES[lower];

  // direct match against ontology canonical values (case-insensitive)
  for (const cat of Object.keys(SKILL_ONTOLOGY)) {
    for (const canonical of SKILL_ONTOLOGY[cat]) {
      if (canonical.toLowerCase() === lower) return canonical;
    }
  }

  // fallback: return a cleaned-up title-case string
  return capitalizeWords(raw.replace(/[-_]+/g, " "));
}

/**
 * Naively extracts known skills from a free-form text blob using SKILL_ONTOLOGY + aliases.
 * - Loops ontology + aliases and performs word-boundary checks (case-insensitive)
 * - Returns canonical names (normalized)
 * - Avoids duplicates and returns a sorted list for determinism
 */
export function extractKnownSkills(text: string): string[] {
  if (!text) return [];
  const found = new Set<string>();
  const lowerText = text.toLowerCase();

  // build a flattened list of candidates: canonical + aliases
  const candidates = new Map<string, string>(); // candidate -> canonical

  for (const cat of Object.keys(SKILL_ONTOLOGY)) {
    for (const canonical of SKILL_ONTOLOGY[cat]) {
      candidates.set(canonical.toLowerCase(), canonical);
    }
  }

  for (const [alias, canonical] of Object.entries(SKILL_ALIASES)) {
    candidates.set(alias.toLowerCase(), canonical);
  }

  // iterate candidates (longer first to avoid partials like "sql" before "postgresql")
  const sortedCandidates = Array.from(candidates.entries()).sort(
    ([a], [b]) => b.length - a.length
  );

  for (const [candidate, canonical] of sortedCandidates) {
    const pattern = new RegExp("\\b" + escapeRegExp(candidate) + "\\b", "i");
    if (pattern.test(lowerText)) {
      found.add(normalizeSkill(canonical));
    }
  }

  // deterministic output
  return Array.from(found).sort();
}

const SKILLS = {
  SKILL_ONTOLOGY,
  SKILL_ALIASES,
  normalizeSkill,
  extractKnownSkills,
};

export default SKILLS;
