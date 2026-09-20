// ============================================================
// AWS CLOUD PRACTITIONER (CLF-C02) MASTER LEARNING TRACK
// In-depth study curriculum, domain cheat sheets, exam traps, and service selector
// ============================================================

export const awsCloudData = {
  title: "AWS Certified Cloud Practitioner (CLF-C02) Track",
  subtitle: "Master the 4 core domains from scratch — clear analogies, architecture guides, and exam traps",
  version: "CLF-C02",
  totalHours: 18,
  passingScore: "700 / 1000",

  domains: [
    {
      id: "domain-1",
      number: 1,
      title: "Cloud Concepts",
      weight: "24%",
      color: "#38bdf8",
      icon: "🌐",
      summary: "Understand what the cloud actually is, why companies migrate from physical servers, the 6 core advantages, and AWS global infrastructure.",
      topics: [
        {
          id: "cloud-fundamentals",
          title: "What is Cloud Computing? (The Real Analogy)",
          analogy: "Electricity Grid Analogy: You don't build your own coal plant or water dam in your backyard when you want to turn on a lamp. You plug into the wall socket and pay only for the kilowatt-hours you consume. Cloud computing is the exact same thing, but for compute power, storage, and networking.",
          keyPoints: [
            "**Definition (NIST)**: On-demand delivery of compute power, database storage, applications, and other IT resources via the internet with pay-as-you-go pricing.",
            "**Capital Expenditure (CapEx)**: Paying upfront for physical hardware, data center leases, and air conditioning that takes months to arrive.",
            "**Operational Expenditure (OpEx)**: Paying as you go for what you use by the second/minute. No upfront cost."
          ],
          sixAdvantages: [
            { name: "Trade CapEx for OpEx", desc: "Pay only for what you consume instead of investing heavily in data centers and servers before knowing how they will be used." },
            { name: "Benefit from Massive Economies of Scale", desc: "AWS aggregates usage from hundreds of thousands of customers, translating to lower prices than you could ever achieve alone." },
            { name: "Stop Guessing Capacity", desc: "No more ordering 50 servers for Black Friday and having them sit idle the rest of the year. Scale up or down automatically." },
            { name: "Increase Speed and Agility", desc: "Provision compute, storage, or AI clusters in seconds with a single click, reducing innovation time from weeks to minutes." },
            { name: "Stop Spending Money Running Data Centers", desc: "Focus on your software and customers rather than rack design, cooling, electricity, and hardware maintenance." },
            { name: "Go Global in Minutes", desc: "Deploy applications across multiple AWS regions worldwide in minutes, offering low latency to users globally." }
          ],
          examTrap: "AWS Exam Trap: If a question mentions 'Stop guessing capacity' or 'Handling unpredictable traffic spikes', the correct answer is related to ELASTICITY (Auto Scaling). Scalability is handling growth; Elasticity is expanding AND contracting on demand."
        },
        {
          id: "service-deployment-models",
          title: "Service Models (IaaS, PaaS, SaaS) & Deployment",
          analogy: "The Pizza-as-a-Service Analogy: Traditional On-Prem = making pizza at home (you buy flour, bake it, provide plates and drinks). IaaS = Buying frozen pizza (store provides crust/cheese, you bake and clean up). PaaS = Pizza delivery (they cook and deliver, you set table and eat). SaaS = Dining in an Italian restaurant (they do everything, you just eat).",
          keyPoints: [
            "**IaaS (Infrastructure as a Service)**: Highest flexibility, lowest management abstraction. AWS manages physical hardware and virtualization; you manage the OS, software, and networking. Example: Amazon EC2, Amazon EBS.",
            "**PaaS (Platform as a Service)**: Removes the need to manage underlying OS and hardware. Upload code, AWS deploys and scales it. Example: AWS Elastic Beanstalk, AWS Lambda.",
            "**SaaS (Software as a Service)**: Complete product run and managed by service provider. You only use the software. Example: Amazon WorkSpaces, Google Workspace, Salesforce.",
            "**Deployment Models**: Public Cloud (AWS), Private Cloud (on-premises data center behind firewall), Hybrid Cloud (combining on-prem with AWS using AWS Direct Connect or Storage Gateway)."
          ],
          examTrap: "Exam Trap: If a question asks which model gives the customer MAXIMUM CONTROL over the operating system and network settings, the answer is always IaaS (EC2)."
        },
        {
          id: "global-infrastructure",
          title: "AWS Global Infrastructure: Regions, AZs & Edge Locations",
          analogy: "A Country, Its Neighborhoods, and Local Convenience Stores: A Region is a metropolitan city (e.g., Virginia). An Availability Zone is a distinct neighborhood with its own power substation. An Edge Location is the corner 7-Eleven store near your home that holds your favorite snack (cached content) so you don't have to drive to the city center.",
          keyPoints: [
            "**AWS Region**: A physical geographic location in the world containing at least 3 separate, physically isolated Availability Zones (e.g., us-east-1 North Virginia, ap-south-1 Mumbai).",
            "**How to Choose a Region?**: 1. Compliance & Data Sovereignty (legal requirement to keep data in a country), 2. Proximity/Latency to customers, 3. Available AWS Services (not all services are in all regions), 4. Pricing (differs by region due to local power/tax costs).",
            "**Availability Zone (AZ)**: One or more discrete data centers, each with redundant power, networking, and connectivity, housed in separate facilities tens of miles apart to withstand floods/fires.",
            "**Edge Locations & Points of Presence (PoPs)**: Hundreds of data centers around the world used by Amazon CloudFront (CDN) and Route 53 (DNS) to cache data close to end users for minimal latency.",
            "**Local Zones & Wavelength**: Local Zones bring compute/storage close to large population centers; AWS Wavelength embeds AWS compute inside 5G telecommunication networks."
          ],
          examTrap: "Exam Trap: An Availability Zone is NOT just a single building/data center. An AZ consists of ONE OR MORE physical data centers located close together on isolated power grids."
        },
        {
          id: "well-architected",
          title: "AWS Well-Architected Framework: The 6 Pillars",
          analogy: "The 6 Pillars are like building an earthquake-proof skyscraper: you need solid foundations (Reliability), strong locks (Security), cost controls (Cost Optimization), efficient elevators (Performance), maintenance blueprints (Operational Excellence), and energy efficiency (Sustainability).",
          keyPoints: [
            "**1. Operational Excellence**: Run and monitor systems to deliver business value and continually improve processes. Key: Automate operations, make frequent small reversible changes.",
            "**2. Security**: Protect data, systems, and assets. Key: Principle of least privilege, enable traceability, automate security best practices, encrypt data in transit and at rest.",
            "**3. Reliability**: Ensure workloads perform correctly and recover quickly from infrastructure disruptions. Key: Test recovery procedures, scale horizontally, stop guessing capacity.",
            "**4. Performance Efficiency**: Use computing resources efficiently as requirements change. Key: Democratize advanced technologies, go global in minutes, use serverless architectures.",
            "**5. Cost Optimization**: Avoid unnecessary spending. Key: Measure overall efficiency, adopt a consumption model, analyze and attribute expenditures.",
            "**6. Sustainability**: Minimize environmental impact of running cloud workloads. Key: Understand impact, maximize utilization, anticipate new efficient hardware."
          ],
          examTrap: "Exam Trap: Memorize all 6 pillar names! Older exams had 5 pillars. 'Sustainability' is the 6th pillar added to the Well-Architected Framework."
        }
      ]
    },

    {
      id: "domain-2",
      number: 2,
      title: "Security and Compliance",
      weight: "30%",
      color: "#ef4444",
      icon: "🛡️",
      summary: "The highest-weighted domain on CLF-C02! Master the Shared Responsibility Model, IAM, Encryption, and AWS security services.",
      topics: [
        {
          id: "shared-responsibility",
          title: "The Shared Responsibility Model (The Golden Rule of AWS)",
          analogy: "Renting an Apartment: The landlord (AWS) is responsible for the building foundation, roof, plumbing, and lobby security doors (Security OF the Cloud). You as the tenant (Customer) are responsible for locking your apartment door, keeping the stove turned off, and protecting your personal belongings (Security IN the Cloud). If you leave your front door wide open, you cannot blame the landlord!",
          keyPoints: [
            "**AWS Responsibility (Security OF the Cloud)**: Physical data centers, hardware, cabling, power, HVAC, virtualization software (hypervisor), network infrastructure, facility security guards.",
            "**Customer Responsibility (Security IN the Cloud)**: Customer data, Identity and Access Management (IAM), Operating system updates and patches (on EC2), Security group and firewall configuration, Network access control lists (NACLs), Client-side and server-side encryption."
          ],
          sharedMatrix: [
            { item: "Physical Data Center Security", owner: "AWS" },
            { item: "Disposal of Old Hard Drives", owner: "AWS" },
            { item: "Hypervisor Virtualization", owner: "AWS" },
            { item: "EC2 Operating System Patching", owner: "Customer" },
            { item: "IAM User Passwords & MFA", owner: "Customer" },
            { item: "Database OS Patching (on RDS)", owner: "AWS (Managed DB!)" },
            { item: "Database User Accounts & Queries (on RDS)", owner: "Customer" },
            { item: "S3 Bucket Permissions (Public/Private)", owner: "Customer" }
          ],
          examTrap: "Exam Trap: Notice RDS vs EC2! If you run MySQL on EC2, YOU patch the OS. If you use Amazon RDS, AWS patches the OS and database engine, but you still manage the database credentials, tables, and data encryption!"
        },
        {
          id: "iam-deep-dive",
          title: "AWS IAM: Users, Groups, Roles, Policies & Root User",
          analogy: "A High-Security Corporate Office: The Root User is the CEO with the master master key. An IAM User is an individual employee badge. An IAM Group is the department (Marketing, Engineering). An IAM Role is a temporary security badge (like a visitor pass or contractor keycard) handed over for a single shift without a permanent password.",
          keyPoints: [
            "**AWS Root User**: The email address used to create the AWS account. Has complete, unrestricted access to everything. Best Practice: Lock away root credentials, NEVER use for daily tasks, enable Multi-Factor Authentication (MFA) immediately, and create an Admin IAM user for daily operations.",
            "**IAM Users**: An identity with permanent long-term credentials (password for AWS Console, Access Key ID + Secret Access Key for CLI/API).",
            "**IAM Groups**: A collection of users. Permissions applied to a group apply to all users inside it. Groups CANNOT be nested.",
            "**IAM Roles**: An identity with temporary security credentials (valid for a few minutes/hours). Assigned to AWS services (e.g., an EC2 instance needing to read S3 buckets) or federated users. No permanent passwords or secret keys stored!",
            "**IAM Policies**: JSON documents defining permissions. Structure: Effect (Allow/Deny), Action (e.g. s3:GetObject), Resource (ARN of bucket), Condition.",
            "**Principle of Least Privilege**: Give users and applications ONLY the minimum permissions strictly necessary to complete their job."
          ],
          examTrap: "Exam Trap: NEVER give EC2 instances long-term AWS access keys hardcoded in code. Always attach an IAM ROLE to the EC2 instance!"
        },
        {
          id: "security-services",
          title: "Core AWS Security Services: GuardDuty, WAF, Shield & Inspector",
          analogy: "A Presidential Security Detail: AWS Shield is the bulletproof armored perimeter (stops massive DDoS traffic). AWS WAF is the bouncer at the door checking IDs and scanning luggage (blocks malicious SQL injection or cross-site scripting HTTP requests). Amazon GuardDuty is the CIA intelligence agent scanning wiretaps and logs for suspicious behavior. Amazon Inspector is the building safety inspector checking for unlocked windows and fire code violations.",
          keyPoints: [
            "**AWS Shield**: DDoS protection. **Shield Standard** is enabled automatically for all customers at NO extra cost (protects against Layer 3/4 network floods). **Shield Advanced** is paid ($3000/mo) for 24/7 DDoS Response Team (DRT), financial protection against DDoS spikes, and Layer 7 protection.",
            "**AWS WAF (Web Application Firewall)**: Operates at Layer 7 (Application layer). Filters HTTP/HTTPS traffic. Blocks SQL Injection, Cross-Site Scripting (XSS), rate limits bots, and inspects request bodies.",
            "**Amazon GuardDuty**: Intelligent threat detection service using Machine Learning. Analyzes AWS CloudTrail management events, VPC Flow Logs, and DNS logs. Generates security findings without installing software agents.",
            "**Amazon Inspector**: Automated vulnerability assessment service. Scans EC2 instances, Amazon ECR container images, and AWS Lambda functions for software vulnerabilities and unintended network exposure.",
            "**Amazon Macie**: Data security and privacy service that uses Machine Learning and pattern matching to discover and protect sensitive data (PII, credit card numbers) in Amazon S3."
          ],
          examTrap: "Exam Trap: GuardDuty = Threat detection (intelligent/ML). Inspector = Vulnerability scanning (software CVEs). Macie = S3 sensitive data/PII."
        },
        {
          id: "compliance-governance",
          title: "Governance & Compliance: Organizations, SCPs & Artifact",
          analogy: "A Multidivisional Conglomerate: AWS Organizations is the corporate headquarters. Service Control Policies (SCPs) are non-negotiable corporate laws: even the CEO of a subsidiary company cannot break an SCP. AWS Artifact is the public compliance safe containing government audits, ISO certificates, and SOC reports.",
          keyPoints: [
            "**AWS Organizations**: Centrally manage and govern multiple AWS accounts under a single umbrella. Enables consolidated billing and volume discounts.",
            "**Service Control Policies (SCPs)**: JSON policies applied at the Organizational Unit (OU) or Account level. They define the MAXIMUM allowed permissions. Even the Root User of a member account CANNOT bypass an SCP!",
            "**AWS Artifact**: On-demand portal providing access to AWS compliance documentation (SOC reports, PCI DSS, ISO certifications, and Business Associate Addendums (BAA) for HIPAA).",
            "**AWS KMS (Key Management Service)**: Create and control cryptographic keys used to encrypt data across AWS services. Integrated with CloudTrail for audit logging."
          ],
          examTrap: "Exam Trap: If a question asks where to download AWS's official SOC or PCI compliance reports to give to an external auditor, the answer is ALWAYS AWS Artifact."
        }
      ]
    },

    {
      id: "domain-3",
      number: 3,
      title: "Cloud Technology and Services",
      weight: "34%",
      color: "#10b981",
      icon: "⚡",
      summary: "Compute (EC2, Lambda), Storage (S3, EBS, EFS), Databases (RDS, DynamoDB), Networking (VPC, Route 53, CloudFront), and Monitoring (CloudWatch, CloudTrail).",
      topics: [
        {
          id: "compute-services",
          title: "Compute: EC2, Lambda, Elastic Beanstalk & Containers",
          analogy: "Transportation Options: EC2 is leasing a rental car (you choose model, transmission, fuel, and drive it). Lambda is calling an Uber (you don't care what car it is, you just want to get from A to B and pay only for the ride distance). ECS/EKS are shipping containers loaded onto cargo trains. Elastic Beanstalk is a chartered tour bus.",
          keyPoints: [
            "**Amazon EC2 (Elastic Compute Cloud)**: Virtual servers in the cloud (IaaS). Full root/admin access.",
            "**EC2 Purchasing Options**:",
            "  • *On-Demand*: Pay by the second. No commitment. Highest cost per hour, but maximum flexibility. Best for short-term, spiky workloads.",
            "  • *Reserved Instances (RI)*: 1-year or 3-year commitment. Up to 72% discount. Standard RI vs Convertible RI (allows changing instance family).",
            "  • *Savings Plans*: Flexible pricing model offering up to 72% savings in exchange for a commitment to a consistent amount of usage ($/hour) for 1 or 3 years.",
            "  • *Spot Instances*: Bid on spare AWS compute capacity. Up to 90% discount! AWS can reclaim instances with a 2-minute notice. Best for fault-tolerant, batch, rendering workloads.",
            "  • *Dedicated Hosts*: Physical EC2 server dedicated exclusively to your use. Addresses strict compliance or existing per-socket software licensing.",
            "**AWS Lambda**: Serverless event-driven compute. No servers to manage. Code runs only when triggered. Maximum execution time is 15 minutes. Pay only per millisecond of compute time.",
            "**Amazon ECS vs EKS**: ECS is AWS-native Docker container orchestration. EKS is managed Kubernetes (open-source standard).",
            "**AWS Fargate**: Serverless compute engine for containers (runs ECS or EKS without you managing EC2 instances)."
          ],
          examTrap: "Exam Trap: If a workload can be interrupted at any time without data loss and needs the lowest cost possible, choose Spot Instances. If it runs 24/7 predictable state for 3 years, choose Reserved Instances or Savings Plans."
        },
        {
          id: "storage-services",
          title: "Storage: S3, EBS, EFS & Storage Gateway",
          analogy: "Storage Types: S3 is Google Drive (store any file, image, or video with a unique URL, infinitely scalable). EBS is your laptop's internal hard drive or SSD (plugged directly into one laptop/EC2). EFS is a shared office network drive (50 colleagues can plug into it and read/write files simultaneously).",
          keyPoints: [
            "**Amazon S3 (Simple Storage Service)**: Object storage (files up to 5TB each). Unlimited total capacity. Designed for 99.999999999% (11 9's) durability across multiple AZs.",
            "**S3 Storage Classes**:",
            "  • *S3 Standard*: Frequent access, high throughput, lowest latency.",
            "  • *S3 Intelligent-Tiering*: Automatically moves objects between frequent and infrequent tiers based on usage patterns with zero operational overhead.",
            "  • *S3 Standard-IA (Infrequent Access)*: Rapid access, lower storage cost, but retrieval fee applies.",
            "  • *S3 One Zone-IA*: Stored in a single AZ (lower cost, but vulnerable to AZ failure).",
            "  • *S3 Glacier Instant Retrieval*: Millisecond retrieval for archives accessed once a quarter.",
            "  • *S3 Glacier Flexible Retrieval*: Free retrieval options from 1 minute to 12 hours.",
            "  • *S3 Glacier Deep Archive*: Lowest cost storage in AWS. Retrieval takes 12 to 48 hours. Best for 7-year regulatory compliance archives.",
            "**Amazon EBS (Elastic Block Store)**: High-performance block storage volumes attached to ONE EC2 instance in the same AZ. Persists independently from instance termination if configured.",
            "**Amazon EFS (Elastic File System)**: Managed Network File System (NFS) that scales automatically. Can be mounted across hundreds of EC2 instances across multiple AZs simultaneously."
          ],
          examTrap: "Exam Trap: EBS volumes are locked to a SINGLE Availability Zone! You cannot attach an EBS volume to an EC2 instance in another AZ without taking a snapshot first. EFS is multi-AZ."
        },
        {
          id: "database-services",
          title: "Databases: RDS, Aurora, DynamoDB & ElastiCache",
          analogy: "Database Shelves: Amazon RDS is an organized Excel spreadsheet with relationships between sheets (SQL). DynamoDB is a massive lightning-fast dictionary where you look up a key and get the answer in 2 milliseconds (NoSQL). ElastiCache is keeping the most popular book right on your desk so you don't walk to the library every time.",
          keyPoints: [
            "**Amazon RDS (Relational Database Service)**: Managed relational databases (PostgreSQL, MySQL, MariaDB, Oracle, SQL Server). AWS manages OS patching, backups, and point-in-time recovery.",
            "**Multi-AZ vs Read Replicas**:",
            "  • *Multi-AZ Deployment*: Synchronous replication to another AZ for High Availability and Disaster Recovery (automatic failover). Does NOT improve read performance.",
            "  • *Read Replicas*: Asynchronous replication (up to 15 replicas) to offload read traffic and boost performance.",
            "**Amazon Aurora**: AWS's cloud-native relational database (compatible with MySQL and PostgreSQL). 5x faster than MySQL, 3x faster than PostgreSQL. Storage auto-scales up to 128TB. 6 copies of data replicated across 3 AZs.",
            "**Amazon DynamoDB**: Fully managed, serverless NoSQL key-value and document database. Delivers consistent single-digit millisecond response times at ANY scale. Supports auto-scaling and ACID transactions.",
            "**Amazon ElastiCache**: In-memory data store for Redis and Memcached. Drastically reduces database latency by caching frequently read data.",
            "**Amazon Redshift**: Columnar petabyte-scale data warehouse for Online Analytical Processing (OLAP) and business intelligence queries."
          ],
          examTrap: "Exam Trap: Multi-AZ = High Availability & Disaster Recovery (NOT performance). Read Replicas = Performance & Read Scaling."
        },
        {
          id: "networking-services",
          title: "Networking: VPC, Security Groups, NACLs, Route 53 & CloudFront",
          analogy: "A Gated Mansion Community: Amazon VPC is the private gated wall around your estate. Subnets are individual villas. The Internet Gateway is the main front gate connecting to public roads. Security Groups are the security guards at each villa front door (Stateful: if you let someone in, they can automatically leave). Network ACLs are the guard checkpoints at the neighborhood entrance (Stateless: must check papers both coming in and going out).",
          keyPoints: [
            "**Amazon VPC (Virtual Private Cloud)**: Your isolated private virtual network in the AWS cloud. You control IP address ranges (CIDR), subnets, route tables, and gateways.",
            "**Public vs Private Subnet**: Public subnets have a direct route to an Internet Gateway (IGW). Private subnets do not (they use a NAT Gateway to reach the internet for updates without exposing servers to incoming traffic).",
            "**Security Groups vs Network ACLs (NACLs)**:",
            "  • *Security Group*: Operates at Instance level. Stateful (return traffic automatically allowed). Supports ALLOW rules only. Evaluates all rules before deciding.",
            "  • *Network ACL*: Operates at Subnet level. Stateless (inbound and outbound rules must be explicitly configured). Supports ALLOW and DENY rules. Evaluates rules in numbered order.",
            "**Amazon Route 53**: Highly available and scalable cloud Domain Name System (DNS) web service (port 53). Routes user requests to AWS resources or external IPs. Features routing policies: Simple, Weighted, Latency, Failover, Geolocation.",
            "**Amazon CloudFront**: Global Content Delivery Network (CDN). Caches static and dynamic web content (HTML, images, video) at hundreds of Edge Locations worldwide to reduce latency and protect origin servers."
          ],
          examTrap: "Exam Trap: Security Groups are STATEFUL and only have ALLOW rules. NACLs are STATELESS and can have both ALLOW and DENY rules."
        },
        {
          id: "monitoring-management",
          title: "Monitoring, Auditing & Management: CloudWatch vs CloudTrail",
          analogy: "The Hospital Heart Monitor vs The Security Camera: Amazon CloudWatch is the bedside vital signs monitor (beeps when CPU/heart rate exceeds 90% and sounds an alarm). AWS CloudTrail is the hallway security camera that records who walked in, which door they opened, at what exact timestamp, and what they changed.",
          keyPoints: [
            "**Amazon CloudWatch**: Performance monitoring and observability service. Collects metrics, logs, and events from AWS resources. Can trigger CloudWatch Alarms to send SNS notifications or auto-scale EC2 instances.",
            "**AWS CloudTrail**: Governance, compliance, and auditing service. Records API calls made to your AWS account (Console, CLI, SDKs). Answers: WHO did WHAT, WHEN, and from WHICH IP address.",
            "**AWS Config**: Assesses, audits, and evaluates configurations of AWS resources against desired compliance rules over time (e.g., alert if an S3 bucket becomes public).",
            "**AWS Trusted Advisor**: Online tool that provides real-time guidance to help provision resources following AWS best practices across 5 categories: 1. Cost Optimization, 2. Performance, 3. Security, 4. Fault Tolerance, 5. Service Limits."
          ],
          examTrap: "Exam Trap: CloudWatch = Performance & Metrics (CPU, memory, alarms). CloudTrail = Auditing & API History (who called what API)."
        }
      ]
    },

    {
      id: "domain-4",
      number: 4,
      title: "Billing, Pricing and Support",
      weight: "12%",
      color: "#fbbf24",
      icon: "💰",
      summary: "Understand AWS pricing principles, cost management tools, free tier categories, and the 4 support tiers.",
      topics: [
        {
          id: "pricing-tools",
          title: "AWS Pricing Principles & Cost Tools",
          analogy: "Your Personal Financial Advisor: AWS Pricing Calculator is the home loan calculator before you buy. AWS Cost Explorer is your bank statement showing where your money went over the last 6 months. AWS Budgets is the notification ping that stops you when you exceed your monthly grocery spending.",
          keyPoints: [
            "**AWS Pricing Calculator**: Web-based planning tool to create cost estimates for prospective architectures BEFORE building on AWS.",
            "**AWS Cost Explorer**: Interface to visualize, understand, and manage AWS costs and usage over time. Provides forecasting for the next 3 to 12 months.",
            "**AWS Budgets**: Set custom budgets for costs, usage, or reservations and receive email or SNS alerts when actual or forecasted spending exceeds your thresholds.",
            "**AWS Cost and Usage Report (CUR)**: The most comprehensive, granular billing dataset available in AWS. Delivered to an S3 bucket in CSV format for deep analytics with Athena/QuickSight.",
            "**Consolidated Billing**: Combines billing across multiple member accounts into one paying account under AWS Organizations. Enables volume tiered pricing discounts (e.g. S3 gigabyte tiers)."
          ],
          examTrap: "Exam Trap: Use AWS Pricing Calculator to estimate costs BEFORE building. Use AWS Cost Explorer to analyze costs AFTER resources are running."
        },
        {
          id: "support-plans",
          title: "The 4 AWS Support Plans (Critical Exam Comparison)",
          analogy: "Medical Insurance Tiers: Basic is reading health articles online. Developer is email consultation with a nurse during office hours. Business is 24/7 ER access for sudden emergencies. Enterprise is having a dedicated personal family doctor (Technical Account Manager) on speed dial who plans your health roadmap.",
          keyPoints: [
            "**1. Basic Support**: Included for all AWS customers at NO charge. 24/7 customer service, documentation, whitepapers, access to 7 core Trusted Advisor checks.",
            "**2. Developer Support**: Starts at $29/month. 1 primary contact, business hours email access to Cloud Support Associates. Response time < 12 hours for impaired systems, < 24 hours for general guidance.",
            "**3. Business Support**: Starts at $100/month. Unlimited contacts, 24/7 phone, chat, and email access to Cloud Support Engineers. Full Trusted Advisor checks. Response time < 1 hour for production system down.",
            "**4. Enterprise Support**: Starts at $15,000/month. Dedicated **Technical Account Manager (TAM)**, **Infrastructure Event Management (IEM)** for product launches, Well-Architected reviews. Response time < 15 minutes for business-critical system down!"
          ],
          supportMatrix: [
            { plan: "Basic", cost: "Free", trustedAdvisor: "7 Core Checks", channels: "Docs / Forum", responseTime: "None" },
            { plan: "Developer", cost: "From $29/mo", trustedAdvisor: "7 Core Checks", channels: "Email (Biz hrs)", responseTime: "< 12-24 hrs" },
            { plan: "Business", cost: "From $100/mo", trustedAdvisor: "ALL Checks", channels: "24/7 Phone/Chat/Email", responseTime: "< 1 hr (Prod Down)" },
            { plan: "Enterprise", cost: "From $15K/mo", trustedAdvisor: "ALL Checks + TAM", channels: "24/7 Dedicated TAM", responseTime: "< 15 min (Crit Down)" }
          ],
          examTrap: "Exam Trap: If a question mentions a 'Technical Account Manager (TAM)' or '15-minute response time for business-critical system down', the answer is EXCLUSIVELY the Enterprise Support plan."
        }
      ]
    }
  ],

  // ── SERVICE MATCHER GAME / REAL-WORLD SCENARIOS ─────────
  scenarios: [
    {
      situation: "You need a NoSQL database that can scale horizontally to handle 500,000 requests per second with single-digit millisecond latency.",
      correctService: "Amazon DynamoDB",
      why: "DynamoDB is AWS's fully managed serverless NoSQL database designed specifically for extreme throughput and single-digit millisecond latency at any scale.",
      options: ["Amazon RDS", "Amazon DynamoDB", "Amazon Redshift", "Amazon S3"]
    },
    {
      situation: "Your team needs to run Docker containers in production, but you do NOT want to manage, patch, or scale any EC2 virtual server instances.",
      correctService: "AWS Fargate",
      why: "AWS Fargate is the serverless compute engine for containers that works with both ECS and EKS. You pay only for running containers without provisioning servers.",
      options: ["Amazon EC2", "AWS Fargate", "AWS Elastic Beanstalk", "Amazon Lightsail"]
    },
    {
      situation: "An external auditor requires you to provide official ISO 27001 and SOC 2 compliance reports demonstrating AWS's physical and infrastructure security controls.",
      correctService: "AWS Artifact",
      why: "AWS Artifact is the self-service portal that provides on-demand access to AWS compliance reports, certifications, and security agreements.",
      options: ["AWS Inspector", "AWS Shield", "AWS Artifact", "AWS Trusted Advisor"]
    },
    {
      situation: "You have 50 Linux EC2 instances across 3 Availability Zones that all need to mount and read/write to the exact same shared file directory simultaneously.",
      correctService: "Amazon EFS",
      why: "Amazon EFS (Elastic File System) provides a serverless, shared elastic NFS file system that can be mounted concurrently by hundreds of EC2 instances across multiple AZs.",
      options: ["Amazon EBS", "Amazon S3", "Amazon EFS", "AWS Storage Gateway"]
    },
    {
      situation: "A company wants to detect compromised AWS credentials and unauthorized cryptocurrency mining activity inside their VPC using automated Machine Learning.",
      correctService: "Amazon GuardDuty",
      why: "Amazon GuardDuty is an intelligent threat detection service that continuously monitors VPC flow logs, DNS query logs, and CloudTrail events using ML.",
      options: ["Amazon Inspector", "Amazon GuardDuty", "AWS WAF", "Amazon Macie"]
    },
    {
      situation: "You want to store financial audit logs for 7 years to meet regulatory compliance. These logs are almost never accessed, and you can wait 12 hours for retrieval.",
      correctService: "S3 Glacier Deep Archive",
      why: "S3 Glacier Deep Archive is AWS's lowest-cost storage tier ($0.00099 per GB/month). It is built for long-term data retention with retrieval times within 12 hours.",
      options: ["S3 Standard", "S3 Standard-IA", "S3 Glacier Deep Archive", "Amazon EBS Cold HDD"]
    },
    {
      situation: "Your e-commerce application sends order confirmation emails, payment receipts, and shipping updates to millions of users. You need a fully managed service to reliably send transactional emails at scale.",
      correctService: "Amazon SES (Simple Email Service)",
      why: "Amazon SES is a cost-effective, cloud-based email sending service designed for sending transactional, marketing, and bulk emails. It provides high deliverability with built-in DKIM, SPF, and DMARC support.",
      options: ["Amazon SNS", "Amazon SES", "Amazon Pinpoint", "Amazon Chime"]
    },
    {
      situation: "A notification system needs to fan out a single order event to 5 different downstream services simultaneously: inventory, billing, shipping, analytics, and email — each processing independently.",
      correctService: "Amazon SNS (Simple Notification Service)",
      why: "Amazon SNS is a managed pub/sub messaging service. One publisher sends a message to an SNS Topic, which fan-outs the message to ALL 5 subscribed SQS queues, Lambda functions, or HTTP endpoints simultaneously — perfect for event fan-out.",
      options: ["Amazon SQS", "Amazon SNS", "Amazon Kinesis", "Amazon EventBridge"]
    },
    {
      situation: "You want to provision your entire AWS infrastructure (VPC, EC2, RDS, IAM Roles, Load Balancers) as a repeatable, version-controlled template that can be deployed identically in dev, staging, and production environments.",
      correctService: "AWS CloudFormation",
      why: "AWS CloudFormation lets you define your entire AWS infrastructure as code (YAML/JSON templates). Deploy the same stack to any region or environment with one command. Track changes in Git, roll back automatically on errors — this is Infrastructure as Code (IaC).",
      options: ["AWS Systems Manager", "AWS CloudFormation", "AWS Elastic Beanstalk", "AWS CodeDeploy"]
    },
    {
      situation: "Your application's RDS MySQL database is being hammered by 50,000 repetitive read queries per minute for the same product catalog data that rarely changes. Response times have degraded from 5ms to 800ms.",
      correctService: "Amazon ElastiCache (Redis)",
      why: "ElastiCache for Redis sits between your application and database as an in-memory cache. Frequently read data (product catalog) is served from RAM in 1-2ms instead of querying MySQL. This offloads 90%+ of repetitive reads from the database, reducing its load and restoring sub-10ms response times.",
      options: ["Amazon RDS Read Replica", "Amazon ElastiCache (Redis)", "Amazon DynamoDB Accelerator (DAX)", "AWS Global Accelerator"]
    },
    {
      situation: "Your Java microservice needs to securely access database passwords and API keys at runtime without hardcoding them in source code, environment variables, or configuration files. The secrets must be automatically rotated every 30 days.",
      correctService: "AWS Secrets Manager",
      why: "AWS Secrets Manager stores, rotates, and manages database credentials, API keys, and other secrets. Applications retrieve secrets at runtime via API call (no hardcoded passwords). Native integration with RDS for automatic 30-day rotation with zero downtime.",
      options: ["AWS Systems Manager Parameter Store", "AWS Secrets Manager", "AWS KMS", "Amazon S3 Encrypted Object"]
    },
    {
      situation: "Users in Australia report that your US-East-based website loads images and videos in 4-5 seconds. You want to reduce this to under 500ms globally without moving your origin infrastructure.",
      correctService: "Amazon CloudFront",
      why: "Amazon CloudFront is AWS's global CDN with 400+ Edge Locations worldwide. Static and dynamic content is cached at the Edge Location nearest to each user. Australian users get content from a Sydney Edge Location instead of routing all the way to Virginia — reducing latency from 4s to under 100ms.",
      options: ["AWS Global Accelerator", "Amazon CloudFront", "Amazon Route 53 Latency Routing", "AWS Direct Connect"]
    }
  ],

  // ── EXAM SIMULATOR QUESTIONS (15 HIGH-YIELD REALISTIC QUESTIONS) ─────────
  practiceExam: [
    {
      id: "clf-q1",
      domain: "Domain 1: Cloud Concepts",
      question: "Which of the following is an example of agility provided by cloud computing?",
      options: [
        "The ability to pay lower prices as AWS scales its infrastructure",
        "The ability to rapidly provision compute and storage resources in minutes rather than weeks",
        "The ability to automatically recover from hardware failure",
        "The ability to replicate data across multiple Availability Zones"
      ],
      correct: 1,
      explanation: "Agility in cloud computing refers to the speed with which developers can spin up new resources, experiment, and deploy applications. Instead of waiting weeks for physical hardware procurement, new environments can be launched in minutes."
    },
    {
      id: "clf-q2",
      domain: "Domain 2: Security & Compliance",
      question: "According to the AWS Shared Responsibility Model, which security task is the sole responsibility of the customer when running an Amazon EC2 instance?",
      options: [
        "Replacing failing physical RAM chips in the host server",
        "Disposing of decommissioned storage drives in compliance with DOD standards",
        "Installing security patches and updates for the guest operating system",
        "Securing the virtualization hypervisor layer"
      ],
      correct: 2,
      explanation: "On EC2 (IaaS), AWS manages the physical server and hypervisor. The customer is strictly responsible for installing security patches and updates on the guest operating system (Windows or Linux)."
    },
    {
      id: "clf-q3",
      domain: "Domain 2: Security & Compliance",
      question: "Which AWS IAM entity should be attached to an Amazon EC2 instance so that applications running on it can securely access an Amazon S3 bucket without embedding permanent access keys?",
      options: [
        "An IAM User with an Access Key ID and Secret Access Key",
        "An IAM Group with S3 ReadOnlyAccess",
        "An IAM Role with an attached S3 permissions policy",
        "A Root User API key"
      ],
      correct: 2,
      explanation: "IAM Roles provide temporary security credentials via AWS STS. Attaching an IAM Role to an EC2 instance allows applications running on the instance to access AWS resources securely without hardcoding static credentials."
    },
    {
      id: "clf-q4",
      domain: "Domain 3: Cloud Technology & Services",
      question: "A company wants to distribute incoming application traffic across multiple Amazon EC2 instances in different Availability Zones to enhance fault tolerance. Which service should they use?",
      options: [
        "Elastic Load Balancing (ELB)",
        "AWS Auto Scaling",
        "Amazon Route 53",
        "AWS Direct Connect"
      ],
      correct: 0,
      explanation: "Elastic Load Balancing (ELB) automatically distributes incoming application traffic across multiple targets, such as EC2 instances, containers, and IP addresses, across one or more Availability Zones."
    },
    {
      id: "clf-q5",
      domain: "Domain 3: Cloud Technology & Services",
      question: "Which statement correctly describes the difference between Amazon CloudWatch and AWS CloudTrail?",
      options: [
        "CloudWatch logs who made API calls; CloudTrail monitors CPU usage and memory metrics",
        "CloudWatch monitors system performance and operational metrics; CloudTrail audits API calls and user activity",
        "CloudWatch is for security compliance reports; CloudTrail is for setting up budget alerts",
        "CloudWatch is a DNS service; CloudTrail is a content delivery network"
      ],
      correct: 1,
      explanation: "CloudWatch = Metrics, logs, alarms, and performance monitoring ('What is happening right now?'). CloudTrail = Governance and audit history of API calls ('Who made what change and when?')."
    },
    {
      id: "clf-q6",
      domain: "Domain 3: Cloud Technology & Services",
      question: "Which Amazon S3 storage class is best suited for data with unpredictable or changing access patterns, optimizing costs without operational overhead?",
      options: [
        "S3 Standard",
        "S3 One Zone-IA",
        "S3 Intelligent-Tiering",
        "S3 Glacier Flexible Retrieval"
      ],
      correct: 2,
      explanation: "S3 Intelligent-Tiering automatically monitors access patterns and moves objects between frequent, infrequent, and archive access tiers without retrieval fees or performance impact."
    },
    {
      id: "clf-q7",
      domain: "Domain 4: Billing, Pricing & Support",
      question: "Which AWS support plan is the MINIMUM tier that provides access to a dedicated Technical Account Manager (TAM) and a 15-minute response time for business-critical system outages?",
      options: [
        "Developer Support",
        "Business Support",
        "Enterprise Support",
        "Basic Support"
      ],
      correct: 2,
      explanation: "Enterprise Support is the only plan that includes a designated Technical Account Manager (TAM) and guarantees a response time of 15 minutes or less for business-critical system down emergencies."
    },
    {
      id: "clf-q8",
      domain: "Domain 1: Cloud Concepts",
      question: "What is an AWS Availability Zone (AZ)?",
      options: [
        "A separate geographical country containing multiple AWS edge locations",
        "One or more discrete data centers with redundant power, networking, and connectivity in an AWS Region",
        "A collection of edge servers used to cache CloudFront video streams",
        "A physical rack inside an on-premises data center"
      ],
      correct: 1,
      explanation: "An AWS Availability Zone (AZ) consists of one or more discrete physical data centers with redundant power, networking, and connectivity, located within a single AWS Region."
    },
    {
      id: "clf-q9",
      domain: "Domain 2: Security & Compliance",
      question: "Which AWS service is a managed web application firewall that helps protect web applications against common web exploits like SQL injection and cross-site scripting (XSS)?",
      options: [
        "AWS Shield Standard",
        "AWS WAF",
        "Amazon GuardDuty",
        "AWS Secrets Manager"
      ],
      correct: 1,
      explanation: "AWS WAF (Web Application Firewall) operates at Layer 7 (HTTP/HTTPS) and allows you to create rules that block common attack patterns such as SQL injection, Cross-Site Scripting (XSS), and bot traffic."
    },
    {
      id: "clf-q10",
      domain: "Domain 3: Cloud Technology & Services",
      question: "Which AWS service enables you to run code in response to events (such as an S3 file upload) without provisioning or managing any server infrastructure?",
      options: [
        "Amazon EC2",
        "AWS Lambda",
        "AWS Elastic Beanstalk",
        "Amazon ECS"
      ],
      correct: 1,
      explanation: "AWS Lambda is a serverless compute service that executes code in response to events, automatically managing the underlying compute resources and charging only for execution time."
    },
    {
      id: "clf-q11",
      domain: "Domain 4: Billing, Pricing & Support",
      question: "Which tool should a solutions architect use to estimate monthly AWS infrastructure costs before deploying a single resource into an AWS account?",
      options: [
        "AWS Cost Explorer",
        "AWS Budgets",
        "AWS Pricing Calculator",
        "AWS Cost & Usage Report (CUR)"
      ],
      correct: 2,
      explanation: "The AWS Pricing Calculator allows users to model and estimate architecture costs upfront before provisioning any resources in AWS."
    },
    {
      id: "clf-q12",
      domain: "Domain 2: Security & Compliance",
      question: "What is the primary function of Service Control Policies (SCPs) in AWS Organizations?",
      options: [
        "To monitor network packets across VPC subnets",
        "To define the maximum permissions that member accounts in an organization can exercise",
        "To encrypt EBS volumes automatically upon creation",
        "To automate database failover during a regional outage"
      ],
      correct: 1,
      explanation: "Service Control Policies (SCPs) act as central guardrails that specify the maximum permissions available to member accounts in an AWS Organization. Even root users in member accounts cannot override an SCP denial."
    },
    {
      id: "clf-q13",
      domain: "Domain 3: Cloud Technology & Services",
      question: "A company needs a dedicated, private network connection from their on-premises corporate data center directly into their AWS VPC, bypassing the public internet. Which service should they choose?",
      options: [
        "AWS Direct Connect",
        "Amazon Route 53",
        "AWS Transit Gateway",
        "Internet Gateway"
      ],
      correct: 0,
      explanation: "AWS Direct Connect links your on-premises network to an AWS Direct Connect location over a standard Ethernet fiber-optic cable, bypassing the public internet for consistent throughput and reduced latency."
    },
    {
      id: "clf-q14",
      domain: "Domain 1: Cloud Concepts",
      question: "Which pillar of the AWS Well-Architected Framework focuses on the ability to run and monitor systems to deliver business value and to continually improve supporting processes?",
      options: [
        "Performance Efficiency",
        "Operational Excellence",
        "Reliability",
        "Cost Optimization"
      ],
      correct: 1,
      explanation: "Operational Excellence includes running and monitoring systems, responding to events, and defining standards to continually improve processes and deliver business value."
    },
    {
      id: "clf-q15",
      domain: "Domain 3: Cloud Technology & Services",
      question: "Which AWS service provides an automated, scalable Domain Name System (DNS) web service that can route end users to internet applications based on latency, health checks, or geolocation?",
      options: [
        "Amazon CloudFront",
        "Amazon Route 53",
        "AWS Global Accelerator",
        "Virtual Private Gateway"
      ],
      correct: 1,
      explanation: "Amazon Route 53 is a highly available and scalable cloud DNS web service that provides reliable domain registration, DNS routing, and application health checks."
    },
    {
      id: "clf-q16",
      domain: "Domain 3: Cloud Technology & Services",
      question: "A company wants to decouple a web application from a back-end processing service. Orders arrive in bursts during peak hours. The processing service should process orders at its own pace without losing any messages, even if it goes temporarily offline. Which service should they use?",
      options: [
        "Amazon SNS — Simple Notification Service",
        "Amazon SQS — Simple Queue Service",
        "Amazon Kinesis Data Streams",
        "AWS EventBridge"
      ],
      correct: 1,
      explanation: "Amazon SQS is a fully managed message queuing service that decouples producers from consumers. Messages persist in the queue until the consumer successfully processes and deletes them. If the processing service is offline, messages queue up (for up to 14 days by default). SNS is pub/sub for fan-out; SQS is the right choice for point-to-point decoupling with guaranteed delivery."
    },
    {
      id: "clf-q17",
      domain: "Domain 2: Security & Compliance",
      question: "A security team wants to receive immediate alerts whenever a new IAM User is created, an S3 bucket's public access settings are changed, or an unauthorized API call is made. Which combination of services enables this?",
      options: [
        "AWS CloudTrail + Amazon EventBridge + Amazon SNS",
        "Amazon CloudWatch + AWS Config + Amazon SES",
        "AWS GuardDuty + Amazon Inspector + AWS Shield",
        "AWS Trusted Advisor + AWS Budgets + Amazon Macie"
      ],
      correct: 0,
      explanation: "CloudTrail captures all API calls (who changed what). EventBridge can create rules that trigger on specific CloudTrail events (e.g., 'CreateUser' API call). SNS sends the alert email/SMS. This trio is the standard AWS security alerting architecture. CloudWatch monitors metrics; Config tracks configuration history — neither sends event-based security alerts natively."
    },
    {
      id: "clf-q18",
      domain: "Domain 3: Cloud Technology & Services",
      question: "Which statement CORRECTLY describes the difference between Amazon Aurora and Amazon RDS?",
      options: [
        "Aurora is a NoSQL database; RDS only supports SQL databases.",
        "Aurora is AWS's cloud-native, high-performance relational database rewriting MySQL/PostgreSQL storage engines — 5x faster than MySQL, 6-copy replication, auto-scaling to 128TB. RDS is the managed service for running standard database engines (MySQL, PostgreSQL, Oracle, SQL Server) with less customization.",
        "RDS supports automatic failover; Aurora does not.",
        "Aurora stores data only in a single Availability Zone by default."
      ],
      correct: 1,
      explanation: "Amazon Aurora is AWS's cloud-native relational database, compatible with MySQL and PostgreSQL, but with fundamentally redesigned storage: 6 copies across 3 AZs, auto-scaling to 128TB, 5x faster than MySQL. RDS is the managed service for running stock database engines (MySQL, PostgreSQL, Oracle, SQL Server, MariaDB) with AWS managing OS patching and backups. Aurora costs more but offers superior performance and HA."
    },
    {
      id: "clf-q19",
      domain: "Domain 3: Cloud Technology & Services",
      question: "What is the key architectural difference between a Security Group and a Network ACL (NACL) in Amazon VPC?",
      options: [
        "Security Groups apply to subnets; NACLs apply to individual EC2 instances.",
        "Security Groups are stateful (return traffic automatically allowed) and apply at the instance level with ALLOW rules only. NACLs are stateless (inbound and outbound rules evaluated independently) and apply at the subnet level with both ALLOW and DENY rules.",
        "NACLs only work with IPv6 traffic; Security Groups work with IPv4.",
        "Both Security Groups and NACLs are stateful — there is no difference in this regard."
      ],
      correct: 1,
      explanation: "Security Groups = Instance-level firewall. Stateful: if you allow inbound port 80, the response traffic is automatically allowed back out. Supports ALLOW rules only. Evaluates ALL rules. NACLs = Subnet-level firewall. Stateless: you must explicitly add both inbound AND outbound rules. Supports both ALLOW and DENY rules. Evaluates rules in order by number (lowest first). Use NACLs for subnet-wide blocking (e.g., blocking a specific IP range)."
    },
    {
      id: "clf-q20",
      domain: "Domain 1: Cloud Concepts",
      question: "A startup wants to define their entire AWS infrastructure (VPCs, subnets, EC2 instances, security groups, RDS databases) as code files stored in Git, enabling reproducible environment creation and rollback. Which AWS service provides this capability?",
      options: [
        "AWS Elastic Beanstalk — for application deployment",
        "AWS CloudFormation — Infrastructure as Code using YAML/JSON templates",
        "AWS CodeDeploy — for deploying application code to EC2",
        "AWS Systems Manager — for managing EC2 instance configurations"
      ],
      correct: 1,
      explanation: "AWS CloudFormation is the Infrastructure as Code (IaC) service that lets you define ALL AWS resources in YAML or JSON template files. Deploy the same stack identically to dev/staging/production with one command. Store templates in Git for version history and rollback. CloudFormation handles dependency ordering, rollback on failure, and drift detection. This is the foundation of DevOps on AWS."
    }
  ]
};
