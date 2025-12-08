/**
 * Interview Question Bank - Pure TypeScript, no LLM/APIs
 * Rule-based question generation for role-specific interviews
 */

export type InterviewQuestion = {
  id: string;
  roleTag: "fullstack" | "frontend" | "backend" | "data" | "devops" | "general";
  level: "junior" | "mid" | "senior";
  category: "technical" | "system_design" | "behavioral" | "culture";
  skillTags: string[];
  question: string;
  hint?: string;
};

/**
 * Comprehensive interview question bank
 * ~60 questions covering all role/level combinations
 */
export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  // ============ FULLSTACK - JUNIOR ============
  {
    id: "fs-jr-001",
    roleTag: "fullstack",
    level: "junior",
    category: "technical",
    skillTags: ["React", "JavaScript", "Components"],
    question: "Explain the difference between a functional component and a class component in React.",
    hint: "Consider hooks, lifecycle methods, and state management.",
  },
  {
    id: "fs-jr-002",
    roleTag: "fullstack",
    level: "junior",
    category: "technical",
    skillTags: ["Node.js", "Express", "REST API"],
    question: "How do you create a simple REST API endpoint in Express.js? Explain GET and POST.",
    hint: "Think about route handlers, middleware, and request/response objects.",
  },
  {
    id: "fs-jr-003",
    roleTag: "fullstack",
    level: "junior",
    category: "technical",
    skillTags: ["SQL", "Database", "MongoDB"],
    question: "What is the difference between SQL and NoSQL databases? Give examples.",
    hint: "Consider schema flexibility, scalability, and query patterns.",
  },
  {
    id: "fs-jr-004",
    roleTag: "fullstack",
    level: "junior",
    category: "technical",
    skillTags: ["JavaScript", "Async", "Promises"],
    question: "What is a Promise in JavaScript and how does it differ from async/await?",
    hint: "Think about chaining, error handling, and readability.",
  },
  {
    id: "fs-jr-005",
    roleTag: "fullstack",
    level: "junior",
    category: "behavioral",
    skillTags: ["Teamwork", "Communication"],
    question: "Describe a time when you had to learn a new technology quickly. How did you approach it?",
    hint: "Share a concrete example with your learning process.",
  },
  {
    id: "fs-jr-006",
    roleTag: "fullstack",
    level: "junior",
    category: "technical",
    skillTags: ["HTML", "CSS", "Responsive Design"],
    question: "How do you create a responsive layout using CSS Flexbox and Media Queries?",
    hint: "Explain flex properties and breakpoints.",
  },
  {
    id: "fs-jr-007",
    roleTag: "fullstack",
    level: "junior",
    category: "culture",
    skillTags: ["Collaboration", "Feedback"],
    question: "How do you handle constructive criticism from a code review?",
    hint: "Show openness to learning and growth mindset.",
  },

  // ============ FULLSTACK - MID ============
  {
    id: "fs-mid-001",
    roleTag: "fullstack",
    level: "mid",
    category: "technical",
    skillTags: ["React", "State Management", "Redux"],
    question: "Explain state management challenges in a large React app. When would you use Redux vs Context API?",
    hint: "Consider scalability, performance, and complexity.",
  },
  {
    id: "fs-mid-002",
    roleTag: "fullstack",
    level: "mid",
    category: "technical",
    skillTags: ["Node.js", "Middleware", "Security"],
    question: "Design a middleware authentication flow for a Node.js/Express API. How do you handle JWT tokens?",
    hint: "Think about token validation, refresh tokens, and security headers.",
  },
  {
    id: "fs-mid-003",
    roleTag: "fullstack",
    level: "mid",
    category: "system_design",
    skillTags: ["Architecture", "Database", "Caching"],
    question: "How would you optimize a slow database query in a production app? Describe your approach.",
    hint: "Consider indexing, caching, query optimization, and profiling.",
  },
  {
    id: "fs-mid-004",
    roleTag: "fullstack",
    level: "mid",
    category: "technical",
    skillTags: ["Testing", "Jest", "Unit Tests"],
    question: "Write a simple unit test for a React component that fetches data. What edge cases would you test?",
    hint: "Mocking API calls, loading states, and error handling.",
  },
  {
    id: "fs-mid-005",
    roleTag: "fullstack",
    level: "mid",
    category: "behavioral",
    skillTags: ["Problem Solving", "Debugging"],
    question: "Walk us through your debugging process when a production bug is reported. How do you prioritize?",
    hint: "Reproduction, root cause analysis, and escalation.",
  },
  {
    id: "fs-mid-006",
    roleTag: "fullstack",
    level: "mid",
    category: "technical",
    skillTags: ["MongoDB", "Schema Design", "Relationships"],
    question: "Design a MongoDB schema for an e-commerce platform. How would you handle relationships between users, orders, and products?",
    hint: "Consider embedding vs referencing, query patterns, and scalability.",
  },
  {
    id: "fs-mid-007",
    roleTag: "fullstack",
    level: "mid",
    category: "culture",
    skillTags: ["Leadership", "Mentoring"],
    question: "Have you mentored a junior developer? Describe your approach.",
    hint: "Share concrete examples of guidance, patience, and growth.",
  },

  // ============ FULLSTACK - SENIOR ============
  {
    id: "fs-sr-001",
    roleTag: "fullstack",
    level: "senior",
    category: "system_design",
    skillTags: ["Scalability", "Microservices", "Architecture"],
    question: "Design a scalable architecture for a social media platform supporting millions of users. How would you handle real-time notifications?",
    hint: "Consider sharding, event queues, WebSockets, and eventual consistency.",
  },
  {
    id: "fs-sr-002",
    roleTag: "fullstack",
    level: "senior",
    category: "technical",
    skillTags: ["Performance", "React", "Optimization"],
    question: "You have a React app rendering 10,000 items. Performance is tanking. How do you diagnose and fix this?",
    hint: "Virtual scrolling, memoization, code splitting, and profiling tools.",
  },
  {
    id: "fs-sr-003",
    roleTag: "fullstack",
    level: "senior",
    category: "behavioral",
    skillTags: ["Leadership", "Decision Making"],
    question: "Describe a major technical decision you made that impacted your team or product. How did you handle disagreement?",
    hint: "Consensus building, data-driven decisions, and retrospectives.",
  },
  {
    id: "fs-sr-004",
    roleTag: "fullstack",
    level: "senior",
    category: "system_design",
    skillTags: ["Database", "Consistency", "Transactions"],
    question: "How would you maintain data consistency across multiple services in a distributed system?",
    hint: "ACID vs BASE, eventual consistency, saga pattern, and distributed transactions.",
  },

  // ============ FRONTEND - JUNIOR ============
  {
    id: "fe-jr-001",
    roleTag: "frontend",
    level: "junior",
    category: "technical",
    skillTags: ["React", "Hooks", "useState"],
    question: "Explain the useState hook. How do you initialize state and update it?",
    hint: "Functional updates, closures, and re-renders.",
  },
  {
    id: "fe-jr-002",
    roleTag: "frontend",
    level: "junior",
    category: "technical",
    skillTags: ["CSS", "Selectors", "Specificity"],
    question: "What is CSS specificity? How does it affect which styles are applied?",
    hint: "Inline styles, IDs, classes, and elements.",
  },
  {
    id: "fe-jr-003",
    roleTag: "frontend",
    level: "junior",
    category: "technical",
    skillTags: ["JavaScript", "DOM", "Events"],
    question: "How do you add event listeners to DOM elements? Explain event delegation.",
    hint: "addEventListener, event bubbling, and performance.",
  },
  {
    id: "fe-jr-004",
    roleTag: "frontend",
    level: "junior",
    category: "technical",
    skillTags: ["TypeScript", "Types"],
    question: "What are TypeScript interfaces and types? How do they help prevent bugs?",
    hint: "Compile-time checking, IntelliSense, and refactoring safety.",
  },
  {
    id: "fe-jr-005",
    roleTag: "frontend",
    level: "junior",
    category: "behavioral",
    skillTags: ["Attention to Detail", "Quality"],
    question: "Tell us about a bug you found and fixed. How did you identify it?",
    hint: "User reports, testing, and debugging tools.",
  },

  // ============ FRONTEND - MID ============
  {
    id: "fe-mid-001",
    roleTag: "frontend",
    level: "mid",
    category: "technical",
    skillTags: ["React", "useEffect", "Lifecycle"],
    question: "Explain useEffect dependencies. Why is the dependency array important? Give examples of common mistakes.",
    hint: "Infinite loops, stale closures, cleanup functions.",
  },
  {
    id: "fe-mid-002",
    roleTag: "frontend",
    level: "mid",
    category: "technical",
    skillTags: ["Performance", "Rendering", "useMemo"],
    question: "When would you use useMemo or useCallback in React? What problems do they solve?",
    hint: "Preventing unnecessary re-renders, expensive computations, and stable references.",
  },
  {
    id: "fe-mid-003",
    roleTag: "frontend",
    level: "mid",
    category: "technical",
    skillTags: ["Accessibility", "A11y", "ARIA"],
    question: "What is web accessibility? Why is it important and how do you implement it?",
    hint: "Keyboard navigation, screen readers, semantic HTML, ARIA labels.",
  },
  {
    id: "fe-mid-004",
    roleTag: "frontend",
    level: "mid",
    category: "system_design",
    skillTags: ["Architecture", "Component Design"],
    question: "Design a reusable component library for a large application. What would you consider?",
    hint: "Props design, composition, documentation, versioning.",
  },
  {
    id: "fe-mid-005",
    roleTag: "frontend",
    level: "mid",
    category: "behavioral",
    skillTags: ["Communication", "Design Handoff"],
    question: "How do you work with designers? Describe your process for implementing a new design.",
    hint: "Clarification, trade-offs, and iterative feedback.",
  },

  // ============ FRONTEND - SENIOR ============
  {
    id: "fe-sr-001",
    roleTag: "frontend",
    level: "senior",
    category: "system_design",
    skillTags: ["Performance", "Core Web Vitals"],
    question: "You need to improve Core Web Vitals for a 5-second page load. Walk through your optimization strategy.",
    hint: "LCP, FID, CLS, code splitting, lazy loading, image optimization.",
  },
  {
    id: "fe-sr-002",
    roleTag: "frontend",
    level: "senior",
    category: "technical",
    skillTags: ["Advanced React", "Concurrent Features"],
    question: "Explain React's concurrent rendering and Suspense. How would you use them?",
    hint: "Time slicing, prioritization, data fetching, error boundaries.",
  },
  {
    id: "fe-sr-003",
    roleTag: "frontend",
    level: "senior",
    category: "behavioral",
    skillTags: ["Mentorship", "Architecture"],
    question: "How do you guide a team's frontend architecture decisions? Share an example.",
    hint: "Scalability, maintainability, team skillset, and trade-offs.",
  },

  // ============ BACKEND - JUNIOR ============
  {
    id: "be-jr-001",
    roleTag: "backend",
    level: "junior",
    category: "technical",
    skillTags: ["REST API", "HTTP", "Status Codes"],
    question: "Explain HTTP status codes. What's the difference between 200, 201, 400, 401, and 500?",
    hint: "Success, redirect, client errors, server errors.",
  },
  {
    id: "be-jr-002",
    roleTag: "backend",
    level: "junior",
    category: "technical",
    skillTags: ["Database", "SQL", "Queries"],
    question: "Write a SQL query to find all users who made purchases in the last 30 days.",
    hint: "JOINs, WHERE, DATE filters, and aggregations.",
  },
  {
    id: "be-jr-003",
    roleTag: "backend",
    level: "junior",
    category: "technical",
    skillTags: ["Authentication", "Passwords", "Security"],
    question: "How should you store passwords in a database? Why shouldn't you store them in plain text?",
    hint: "Hashing, salting, bcrypt, and rainbow tables.",
  },
  {
    id: "be-jr-004",
    roleTag: "backend",
    level: "junior",
    category: "technical",
    skillTags: ["APIs", "Endpoints", "Routing"],
    question: "Design a basic CRUD API for a Todo app. What endpoints would you create?",
    hint: "GET, POST, PUT, DELETE for todos.",
  },
  {
    id: "be-jr-005",
    roleTag: "backend",
    level: "junior",
    category: "behavioral",
    skillTags: ["Reliability", "Documentation"],
    question: "Why is code documentation important in backend work?",
    hint: "API contracts, onboarding, and maintenance.",
  },

  // ============ BACKEND - MID ============
  {
    id: "be-mid-001",
    roleTag: "backend",
    level: "mid",
    category: "technical",
    skillTags: ["Database", "Indexing", "Performance"],
    question: "A database query is slow. Walk through your debugging process to optimize it.",
    hint: "EXPLAIN, indexes, query plans, and profiling.",
  },
  {
    id: "be-mid-002",
    roleTag: "backend",
    level: "mid",
    category: "technical",
    skillTags: ["Caching", "Redis", "Performance"],
    question: "When would you use Redis for caching? Design a caching strategy for an e-commerce site.",
    hint: "Cache invalidation, TTL, hot data, and write-through vs write-back.",
  },
  {
    id: "be-mid-003",
    roleTag: "backend",
    level: "mid",
    category: "system_design",
    skillTags: ["Transactions", "Concurrency"],
    question: "How do you handle concurrent updates to the same database record? Explain locking and optimistic concurrency.",
    hint: "Pessimistic locking, optimistic locking with version numbers.",
  },
  {
    id: "be-mid-004",
    roleTag: "backend",
    level: "mid",
    category: "technical",
    skillTags: ["APIs", "Rate Limiting", "Security"],
    question: "Design rate limiting for an API. How would you implement it?",
    hint: "Token bucket, sliding window, per-user vs per-IP, and Redis.",
  },
  {
    id: "be-mid-005",
    roleTag: "backend",
    level: "mid",
    category: "behavioral",
    skillTags: ["Problem Solving", "Incident Response"],
    question: "Walk us through how you handled a critical production incident.",
    hint: "Detection, communication, root cause analysis, and prevention.",
  },

  // ============ BACKEND - SENIOR ============
  {
    id: "be-sr-001",
    roleTag: "backend",
    level: "senior",
    category: "system_design",
    skillTags: ["Scalability", "Sharding", "Databases"],
    question: "Design a database schema and sharding strategy for a platform with 100M+ users. How do you handle joins across shards?",
    hint: "Shard key selection, hot shards, denormalization, and cross-shard queries.",
  },
  {
    id: "be-sr-002",
    roleTag: "backend",
    level: "senior",
    category: "system_design",
    skillTags: ["Event Driven", "Message Queues"],
    question: "Design an event-driven architecture for order processing. How would you handle retries and failures?",
    hint: "Message queues, idempotency, dead letter queues, and saga pattern.",
  },
  {
    id: "be-sr-003",
    roleTag: "backend",
    level: "senior",
    category: "behavioral",
    skillTags: ["Architecture", "Leadership"],
    question: "Describe a major architectural refactor you led. What were the challenges and how did you overcome them?",
    hint: "Planning, coordination, risk mitigation, and stakeholder management.",
  },

  // ============ DATA / ML - JUNIOR ============
  {
    id: "data-jr-001",
    roleTag: "data",
    level: "junior",
    category: "technical",
    skillTags: ["SQL", "Data Analysis"],
    question: "Write a query to find the top 5 products by revenue. How would you handle ties?",
    hint: "GROUP BY, ORDER BY, LIMIT, and RANK functions.",
  },
  {
    id: "data-jr-002",
    roleTag: "data",
    level: "junior",
    category: "technical",
    skillTags: ["Python", "Pandas", "Data Cleaning"],
    question: "How do you handle missing values in a dataset? What are the trade-offs?",
    hint: "Deletion, imputation, forward fill, and domain knowledge.",
  },
  {
    id: "data-jr-003",
    roleTag: "data",
    level: "junior",
    category: "technical",
    skillTags: ["Statistics", "Distributions"],
    question: "Explain the difference between mean, median, and mode. When would you use each?",
    hint: "Skewed distributions, outliers, and robustness.",
  },
  {
    id: "data-jr-004",
    roleTag: "data",
    level: "junior",
    category: "technical",
    skillTags: ["Visualization", "Charts"],
    question: "What type of chart would you use to visualize time series data vs categorical data?",
    hint: "Line charts, bar charts, and avoiding misleading visualizations.",
  },

  // ============ DATA / ML - MID ============
  {
    id: "data-mid-001",
    roleTag: "data",
    level: "mid",
    category: "technical",
    skillTags: ["Machine Learning", "Classification"],
    question: "Explain the difference between precision and recall. When would you optimize for one over the other?",
    hint: "Trade-offs, F1 score, confusion matrix, and business impact.",
  },
  {
    id: "data-mid-002",
    roleTag: "data",
    level: "mid",
    category: "technical",
    skillTags: ["Data Pipeline", "ETL"],
    question: "Design a data pipeline for real-time analytics. How would you handle late-arriving data?",
    hint: "Stream processing, watermarks, and Lambda architecture.",
  },
  {
    id: "data-mid-003",
    roleTag: "data",
    level: "mid",
    category: "technical",
    skillTags: ["Feature Engineering", "ML"],
    question: "What is feature engineering? Give examples of transformations you might apply.",
    hint: "Normalization, encoding, binning, and feature interactions.",
  },
  {
    id: "data-mid-004",
    roleTag: "data",
    level: "mid",
    category: "behavioral",
    skillTags: ["Experimentation", "A/B Testing"],
    question: "Walk us through how you'd design and analyze an A/B test.",
    hint: "Hypothesis, sample size, statistical significance, and guardrails.",
  },

  // ============ DEVOPS - JUNIOR ============
  {
    id: "devops-jr-001",
    roleTag: "devops",
    level: "junior",
    category: "technical",
    skillTags: ["Docker", "Containers"],
    question: "What is Docker? How does containerization help with deployment consistency?",
    hint: "Images, containers, isolation, and reproducibility.",
  },
  {
    id: "devops-jr-002",
    roleTag: "devops",
    level: "junior",
    category: "technical",
    skillTags: ["CI/CD", "Git"],
    question: "Explain a basic CI/CD pipeline. What stages would it include?",
    hint: "Source, build, test, deploy, and rollback.",
  },
  {
    id: "devops-jr-003",
    roleTag: "devops",
    level: "junior",
    category: "technical",
    skillTags: ["Linux", "Shell Scripting"],
    question: "Write a shell script that backs up files and compresses them.",
    hint: "tar, gzip, find, and error handling.",
  },
  {
    id: "devops-jr-004",
    roleTag: "devops",
    level: "junior",
    category: "technical",
    skillTags: ["Monitoring", "Logs"],
    question: "Why is logging important in production? What should you log?",
    hint: "Errors, performance, user actions, and retention.",
  },

  // ============ DEVOPS - MID ============
  {
    id: "devops-mid-001",
    roleTag: "devops",
    level: "mid",
    category: "system_design",
    skillTags: ["Kubernetes", "Orchestration"],
    question: "Explain Kubernetes basics. How does it differ from Docker Swarm?",
    hint: "Pods, services, deployments, and self-healing.",
  },
  {
    id: "devops-mid-002",
    roleTag: "devops",
    level: "mid",
    category: "technical",
    skillTags: ["Infrastructure as Code", "Terraform"],
    question: "What is Infrastructure as Code? How would you manage cloud resources with Terraform?",
    hint: "State management, modules, and version control.",
  },
  {
    id: "devops-mid-003",
    roleTag: "devops",
    level: "mid",
    category: "system_design",
    skillTags: ["High Availability", "Disaster Recovery"],
    question: "How would you design a highly available system with automatic failover?",
    hint: "Load balancers, health checks, replication, and RPO/RTO.",
  },

  // ============ GENERAL / BEHAVIORAL ============
  {
    id: "gen-bh-001",
    roleTag: "general",
    level: "junior",
    category: "behavioral",
    skillTags: ["Teamwork", "Communication"],
    question: "Tell us about a time you disagreed with a colleague. How did you handle it?",
    hint: "Respectful discussion, seeking to understand, and collaboration.",
  },
  {
    id: "gen-bh-002",
    roleTag: "general",
    level: "junior",
    category: "culture",
    skillTags: ["Initiative", "Learning"],
    question: "Describe a time you took initiative to improve something (process, code, documentation, etc).",
    hint: "Problem identification, ownership, and positive impact.",
  },
  {
    id: "gen-bh-003",
    roleTag: "general",
    level: "mid",
    category: "behavioral",
    skillTags: ["Adaptability", "Change"],
    question: "How do you handle rapidly changing requirements or project pivots?",
    hint: "Flexibility, communication, and maintaining code quality.",
  },
  {
    id: "gen-bh-004",
    roleTag: "general",
    level: "senior",
    category: "culture",
    skillTags: ["Vision", "Strategy"],
    question: "How do you align technical decisions with business goals?",
    hint: "ROI, stakeholder engagement, and trade-off analysis.",
  },
  {
    id: "gen-bh-005",
    roleTag: "general",
    level: "senior",
    category: "behavioral",
    skillTags: ["Ownership", "Accountability"],
    question: "Tell us about a failure you owned and what you learned from it.",
    hint: "Accountability, growth mindset, and systemic improvement.",
  },
];

/**
 * Get filtered and shuffled interview questions for a specific role
 * @param params - Filter parameters
 * @returns Array of matching questions, shuffled and limited
 */
export function getQuestionsForRole(params: {
  roleTag: InterviewQuestion["roleTag"];
  level?: InterviewQuestion["level"];
  focusSkills?: string[];
  limit?: number;
}): InterviewQuestion[] {
  const { roleTag, level, focusSkills, limit = 15 } = params;

  let filtered = INTERVIEW_QUESTIONS.filter((q) => q.roleTag === roleTag);

  // Filter by level if provided
  if (level) {
    filtered = filtered.filter((q) => q.level === level);
  }

  // Filter by focus skills if provided (case-insensitive, at least one match)
  if (focusSkills && focusSkills.length > 0) {
    const lowerCaseSkills = focusSkills.map((s) => s.toLowerCase());
    filtered = filtered.filter((q) =>
      q.skillTags.some((tag) => lowerCaseSkills.includes(tag.toLowerCase()))
    );
  }

  // Deterministic shuffle: sort by question ID's hash
  const shuffled = [...filtered].sort((a, b) => {
    // Simple hash-based sorting for deterministic shuffling
    const hashA = a.id.charCodeAt(0) + a.id.length;
    const hashB = b.id.charCodeAt(0) + b.id.length;
    return hashA - hashB;
  });

  // Return up to limit
  return shuffled.slice(0, Math.min(limit, shuffled.length));
}
