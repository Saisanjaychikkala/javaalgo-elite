// ============================================================
// CERTIFICATIONS DATA — JavaAlgo Elite v3.0
// Claude Certified Architect | Google Antigravity ADK | AWS CLF-C02
// ============================================================

export const certificationsData = {

  certs: [
    // ── CERT 1: Claude Certified Architect ─────────────────
    {
      id: "claude-foundations",
      title: "Claude Certified Architect: Foundations",
      vendor: "Anthropic",
      icon: "🔮",
      color: "#c084fc",
      badge: "https://www.anthropic.com/certification",
      level: "Foundations",
      examFormat: "Multiple choice + scenario-based, 60 minutes",
      passingScore: "70%",
      cost: "Free (during beta)",
      validityYears: 2,
      difficulty: 3,
      prepWeeks: 4,
      status: "active",

      domains: [
        {
          id: "domain-1",
          name: "Claude Model Architecture & Capabilities",
          weight: "25%",
          topics: [
            { name: "Model Family (Opus, Sonnet, Haiku) — when to use each", covered: true },
            { name: "Constitutional AI and RLHF training methodology", covered: true },
            { name: "Context windows — 200K token implications", covered: true },
            { name: "Multimodal capabilities (text, images, code)", covered: true },
            { name: "Prompt caching and cost optimization", covered: true },
          ]
        },
        {
          id: "domain-2",
          name: "Prompt Engineering & Optimization",
          weight: "30%",
          topics: [
            { name: "Zero-shot, few-shot, chain-of-thought prompting", covered: true },
            { name: "System prompts and role assignment", covered: true },
            { name: "Structured output (JSON mode, XML tags)", covered: true },
            { name: "Handling ambiguity and edge cases", covered: true },
            { name: "Prompt injection attacks and defenses", covered: false },
          ]
        },
        {
          id: "domain-3",
          name: "Tool Use & Agents",
          weight: "25%",
          topics: [
            { name: "Function/tool calling with Claude API", covered: true },
            { name: "Building ReAct agents", covered: true },
            { name: "Multi-turn conversations and state management", covered: true },
            { name: "Computer use (GUI automation)", covered: false },
          ]
        },
        {
          id: "domain-4",
          name: "Safety, Ethics & Responsible AI",
          weight: "20%",
          topics: [
            { name: "Anthropic's safety research philosophy", covered: true },
            { name: "Hallucination detection and mitigation", covered: true },
            { name: "Data privacy and PII handling", covered: true },
            { name: "Content policy and usage guidelines", covered: true },
            { name: "EU AI Act fundamentals", covered: true },
          ]
        }
      ],

      practiceQuestions: [
        {
          q: "You need Claude to analyze a 180-page PDF technical document and extract all numerical specifications. Which Claude model would you choose and why?",
          options: [
            "Claude Haiku — fastest model is always best",
            "Claude Opus with 200K context — most intelligent with enough context for the full document",
            "Claude Sonnet — best balance of speed and intelligence for document analysis",
            "You cannot analyze PDFs with Claude"
          ],
          correct: 2,
          explanation: "Claude Sonnet is the recommended choice for document analysis tasks — it has the same 200K context window as Opus, handles document analysis excellently, but at significantly lower cost and higher speed than Opus. Haiku has a smaller context and is less accurate for complex analysis. Use Opus only if Sonnet's quality is insufficient."
        },
        {
          q: "A user's system prompt costs 50,000 tokens and is the same for every API call. You make 10,000 API calls per day. How should you optimize costs?",
          options: [
            "Switch to a cheaper model",
            "Enable prompt caching on the system prompt — pay full price once, ~10% for subsequent calls",
            "Shorten the system prompt",
            "Use streaming instead of standard API calls"
          ],
          correct: 1,
          explanation: "Prompt caching is designed exactly for this scenario. When you set cache_control: {type: 'ephemeral'} on a prompt block, Anthropic caches it on their servers. Subsequent calls with the same cached prefix cost only ~10% of the normal input token price. For a 50K token system prompt at 10K calls/day, this can save thousands of dollars monthly."
        },
        {
          q: "Which technique would you use if your AI needs to answer questions about your company's latest Q3 earnings report (published last week)?",
          options: [
            "Fine-tuning the model on financial documents",
            "Increasing temperature to improve creativity",
            "RAG — retrieve the document and inject it into the prompt",
            "Using a bigger model (Opus vs Sonnet)"
          ],
          correct: 2,
          explanation: "RAG (Retrieval-Augmented Generation) is the correct answer. Claude's training data has a cutoff date and doesn't include your company's internal documents. RAG allows you to retrieve the relevant Q3 report sections and inject them into Claude's context, enabling accurate, grounded answers. Fine-tuning is expensive and doesn't help with frequently changing data."
        },
        {
          q: "What is 'Constitutional AI' and how does it affect Claude's behavior?",
          options: [
            "A legal framework that Anthropic follows for data privacy",
            "A training method where AI evaluates its own outputs against a set of principles, making it more consistently safe",
            "A type of neural network architecture used in Claude",
            "The process of training on government documents"
          ],
          correct: 1,
          explanation: "Constitutional AI (CAI) is Anthropic's training methodology where Claude is given a set of 'constitutional' principles and trained to evaluate and revise its own outputs against those principles. This supplements human feedback (RLHF) and makes Claude's safety behaviors more consistent and scalable. It helps Claude refuse harmful requests while staying helpful."
        }
      ],

      studySchedule: [
        { week: 1, focus: "Model Architecture & API Basics", tasks: ["Read Anthropic docs on model families", "Complete AI Universe topics 1-3", "Make your first Claude API call"] },
        { week: 2, focus: "Prompt Engineering Mastery", tasks: ["Master 5 prompting techniques", "Build a RAG system", "Practice structured outputs"] },
        { week: 3, focus: "Agents & Tool Use", tasks: ["Build a simple ReAct agent", "Study MCP protocol", "Practice multi-turn conversations"] },
        { week: 4, focus: "Safety, Ethics & Exam Practice", tasks: ["Study Constitutional AI", "Take all practice questions", "Review weak domains"] },
      ]
    },

    // ── CERT 2: Google Antigravity Enterprise Agent Dev ────
    {
      id: "antigravity-enterprise",
      title: "Antigravity Enterprise Agent Development",
      vendor: "Google",
      icon: "🚀",
      color: "#34d399",
      level: "Professional",
      examFormat: "Scenario-based, 90 minutes",
      passingScore: "75%",
      cost: "Free (Google Developers)",
      validityYears: 2,
      difficulty: 4,
      prepWeeks: 6,
      status: "active",

      domains: [
        {
          id: "domain-1",
          name: "Antigravity ADK Fundamentals",
          weight: "30%",
          topics: [
            { name: "Agent, Tool, Runner, Session concepts", covered: true },
            { name: "Single vs Multi-agent architectures", covered: true },
            { name: "ADK lifecycle hooks and callbacks", covered: true },
            { name: "Memory management in agents", covered: false },
          ]
        },
        {
          id: "domain-2",
          name: "Gemini Model Integration",
          weight: "25%",
          topics: [
            { name: "Gemini model selection for use cases", covered: true },
            { name: "Multimodal inputs (text, image, audio, video)", covered: true },
            { name: "Grounding with Google Search", covered: false },
            { name: "Code execution tool", covered: false },
          ]
        },
        {
          id: "domain-3",
          name: "Enterprise Architecture Patterns",
          weight: "25%",
          topics: [
            { name: "Supervisor-Worker multi-agent patterns", covered: true },
            { name: "Stateful agent workflows with persistence", covered: false },
            { name: "Human-in-the-loop integration", covered: false },
            { name: "Security, IAM, and access control", covered: false },
          ]
        },
        {
          id: "domain-4",
          name: "Deployment & Operations on Vertex AI",
          weight: "20%",
          topics: [
            { name: "Deploying agents to Vertex AI", covered: false },
            { name: "Monitoring agent performance", covered: false },
            { name: "Cost optimization at scale", covered: false },
            { name: "A/B testing agent behaviors", covered: false },
          ]
        }
      ],

      practiceQuestions: [
        {
          q: "In Antigravity ADK, what is the role of the Runner?",
          options: [
            "It defines the agent's personality and instructions",
            "It manages sessions, routes messages, and orchestrates agent execution",
            "It provides tools that the agent can call",
            "It handles the API keys and authentication"
          ],
          correct: 1,
          explanation: "The Runner is the orchestration layer in ADK. It manages the session lifecycle, routes incoming messages to the correct agent, coordinates multi-agent workflows, and handles the execution loop. Think of it as the 'operating system' that runs your agents."
        }
      ],

      studySchedule: [
        { week: 1, focus: "Gemini API & ADK Setup", tasks: ["Set up Google AI Studio", "First Gemini API call", "ADK installation and hello world agent"] },
        { week: 2, focus: "Single Agent Patterns", tasks: ["Agents with tools", "Conversation memory", "Grounding with Google Search"] },
        { week: 3, focus: "Multi-Agent Systems", tasks: ["Supervisor pattern", "Parallel agent execution", "Callback system"] },
        { week: 4, focus: "Enterprise Patterns", tasks: ["Stateful workflows", "Human-in-the-loop", "Error handling"] },
        { week: 5, focus: "Vertex AI Deployment", tasks: ["Cloud deployment", "Monitoring setup", "Cost tracking"] },
        { week: 6, focus: "Mock Exams & Review", tasks: ["All practice questions", "End-to-end project", "Weak area review"] },
      ]
    },

    // ── CERT 3: AWS Cloud Practitioner ─────────────────────
    {
      id: "aws-clf-c02",
      title: "AWS Certified Cloud Practitioner (CLF-C02)",
      vendor: "Amazon Web Services",
      icon: "☁️",
      color: "#fbbf24",
      level: "Foundational",
      examFormat: "65 questions, multiple choice / multi-select, 90 minutes",
      passingScore: "700/1000",
      cost: "~$100 USD (~₹8,300)",
      validityYears: 3,
      difficulty: 2,
      prepWeeks: 4,
      status: "active",

      domains: [
        {
          id: "domain-1",
          name: "Domain 1: Cloud Concepts (24%)",
          weight: "24%",
          topics: [
            { name: "What is cloud computing? IaaS vs PaaS vs SaaS", covered: false },
            { name: "Benefits of AWS: Agility, Elasticity, Pay-as-you-go", covered: false },
            { name: "AWS Well-Architected Framework (6 pillars)", covered: false },
            { name: "AWS global infrastructure: Regions, AZs, Edge Locations", covered: false },
          ]
        },
        {
          id: "domain-2",
          name: "Domain 2: Security & Compliance (30%)",
          weight: "30%",
          topics: [
            { name: "Shared Responsibility Model", covered: false },
            { name: "IAM: Users, Groups, Roles, Policies, MFA", covered: false },
            { name: "AWS Organizations and Service Control Policies", covered: false },
            { name: "AWS Shield, WAF, GuardDuty (security services)", covered: false },
            { name: "AWS Compliance programs", covered: false },
          ]
        },
        {
          id: "domain-3",
          name: "Domain 3: Cloud Technology & Services (34%)",
          weight: "34%",
          topics: [
            { name: "EC2 instance types and purchasing options", covered: false },
            { name: "S3 storage classes and lifecycle policies", covered: false },
            { name: "Lambda — serverless computing", covered: false },
            { name: "RDS, DynamoDB, Aurora", covered: false },
            { name: "VPC, Subnets, Security Groups, NACLs", covered: false },
            { name: "CloudFront CDN and Route 53 DNS", covered: false },
            { name: "CloudWatch monitoring and CloudTrail auditing", covered: false },
            { name: "ECS, EKS — container services", covered: false },
          ]
        },
        {
          id: "domain-4",
          name: "Domain 4: Billing & Pricing (12%)",
          weight: "12%",
          topics: [
            { name: "AWS Pricing models: On-Demand, Reserved, Spot, Savings Plans", covered: false },
            { name: "Cost Explorer, AWS Budgets, Cost and Usage Reports", covered: false },
            { name: "AWS Free Tier categories", covered: false },
            { name: "Support Plans: Basic, Developer, Business, Enterprise", covered: false },
          ]
        }
      ],

      practiceQuestions: [
        {
          q: "Under the AWS Shared Responsibility Model, which of the following is AWS responsible for?",
          options: [
            "Configuring security groups for your EC2 instances",
            "Encrypting your application data at rest",
            "Physical security of AWS data centers",
            "Managing IAM user permissions"
          ],
          correct: 2,
          explanation: "AWS is responsible for 'security OF the cloud' — the physical infrastructure: data centers, networking hardware, the hypervisor. YOU are responsible for 'security IN the cloud' — your data, encryption, IAM configuration, security group rules, and OS patching on EC2 instances."
        },
        {
          q: "Which AWS service lets you run code without provisioning or managing servers?",
          options: [
            "EC2 (Elastic Compute Cloud)",
            "ECS (Elastic Container Service)",
            "Lambda",
            "Elastic Beanstalk"
          ],
          correct: 2,
          explanation: "AWS Lambda is a serverless compute service. You upload code, define a trigger (HTTP request, file upload, schedule), and Lambda runs it automatically. You pay only for the compute time used (per millisecond). No servers to manage, no idle costs. EC2 requires you to manage server instances."
        },
        {
          q: "Your application needs a database that can scale to millions of requests per second with single-digit millisecond latency. Which AWS service fits best?",
          options: [
            "Amazon RDS (PostgreSQL)",
            "Amazon Aurora",
            "Amazon DynamoDB",
            "Amazon Redshift"
          ],
          correct: 2,
          explanation: "DynamoDB is AWS's NoSQL database designed for exactly this use case: massive scale, consistent single-digit millisecond performance, and automatic scaling. RDS and Aurora are relational databases better suited for complex queries. Redshift is a data warehouse for analytics, not transactional workloads."
        }
      ],

      studySchedule: [
        { week: 1, focus: "Cloud Concepts & Global Infrastructure", tasks: ["Read AWS Cloud overview", "Understand Region/AZ/Edge", "Well-Architected Framework pillars"] },
        { week: 2, focus: "Security (Highest-weight domain!)", tasks: ["Master Shared Responsibility Model", "IAM deep dive", "Security services overview"] },
        { week: 3, focus: "Core Services (Compute, Storage, DB, Networking)", tasks: ["EC2, Lambda, S3", "RDS vs DynamoDB", "VPC fundamentals"] },
        { week: 4, focus: "Billing + Full Mock Exams", tasks: ["Pricing models", "2 full practice exams", "Review every wrong answer"] },
      ]
    }
  ],

  // ── FUTURE CERTS (Locked/Coming Soon) ──────────────────
  upcomingCerts: [
    { id: "aws-dva", title: "AWS Certified Developer Associate", icon: "👨‍💻", eta: "Q1 2025" },
    { id: "aws-saa", title: "AWS Solutions Architect Associate", icon: "🏗️", eta: "Q1 2025" },
    { id: "google-cdl", title: "Google Cloud Digital Leader", icon: "🌐", eta: "Q2 2025" },
    { id: "azure-ai900", title: "Azure AI-900 AI Fundamentals", icon: "🤖", eta: "Q2 2025" },
    { id: "ml-associate", title: "AWS Machine Learning Specialty", icon: "🧠", eta: "Q3 2025" },
    { id: "ckad", title: "Certified Kubernetes Application Developer", icon: "☸️", eta: "Q3 2025" },
  ]
};

export default certificationsData;
