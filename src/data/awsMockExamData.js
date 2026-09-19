// ============================================================
// AWS CERTIFIED CLOUD PRACTITIONER (CLF-C02)
// COMPLETE 65-QUESTION OFFICIAL EXAM BLUEPRINT BANK
// Domain 1: Cloud Concepts (16 Qs, 24%)
// Domain 2: Security & Compliance (20 Qs, 30%)
// Domain 3: Cloud Technology & Services (21 Qs, 34%)
// Domain 4: Billing, Pricing & Support (8 Qs, 12%)
// ============================================================

export const awsMockExam65 = [
  // ── DOMAIN 1: CLOUD CONCEPTS (16 Questions) ─────────────
  {
    id: "q1",
    domain: "Domain 1: Cloud Concepts",
    question: "Which of the following is a recognized business benefit of cloud computing over on-premises data centers?",
    options: [
      "Replacing operational expenses (OpEx) with upfront capital expenditures (CapEx)",
      "Trading upfront capital expenses (CapEx) for low variable operational expenses (OpEx)",
      "Eliminating the need to design for high availability",
      "Transferring all data security responsibilities exclusively to the cloud provider"
    ],
    correct: 1,
    explanation: "One of the 6 core advantages of AWS cloud computing is trading CapEx for OpEx. Organizations avoid massive upfront hardware investments and instead pay only for compute and storage resources as they consume them."
  },
  {
    id: "q2",
    domain: "Domain 1: Cloud Concepts",
    question: "A gaming company experiences sudden, unpredictable surges in traffic whenever an esports tournament is broadcast. Which cloud attribute allows their infrastructure to automatically grow and shrink based on demand?",
    options: ["Agility", "Elasticity", "Reliability", "Durability"],
    correct: 1,
    explanation: "Elasticity is the ability to automatically acquire resources when demand spikes and release them when demand drops, preventing both over-provisioning and capacity shortages."
  },
  {
    id: "q3",
    domain: "Domain 1: Cloud Concepts",
    question: "Which cloud deployment model enables an enterprise to maintain sensitive legacy financial databases on physical servers inside their own headquarters while running public-facing web servers in AWS?",
    options: ["Private Cloud", "Hybrid Cloud", "Community Cloud", "Multi-Tenant Cloud"],
    correct: 1,
    explanation: "A Hybrid Cloud deployment connects on-premises infrastructure with cloud resources (often using AWS Direct Connect or VPN), allowing organizations to extend their data centers seamlessly."
  },
  {
    id: "q4",
    domain: "Domain 1: Cloud Concepts",
    question: "How does the AWS cloud provide 'Economies of Scale' to customers?",
    options: [
      "Customers must purchase physical racks directly from AWS manufacturers",
      "The aggregated usage of hundreds of thousands of customers allows AWS to achieve higher purchasing efficiency and pass on lower pay-as-you-go pricing",
      "Customers receive free hardware upgrades every 6 months",
      "AWS requires minimum 5-year contracts for all services"
    ],
    correct: 1,
    explanation: "Because AWS aggregates usage from hundreds of thousands of active customers worldwide, it achieves massive economies of scale, resulting in frequent price reductions for all customers."
  },
  {
    id: "q5",
    domain: "Domain 1: Cloud Concepts",
    question: "An AWS Region is best defined as:",
    options: [
      "A single data center facility located near a major international airport",
      "A physical geographical location in the world containing at least three isolated and physically separated Availability Zones",
      "A network of edge servers that deliver cached media content",
      "A virtual private network connecting multiple AWS accounts"
    ],
    correct: 1,
    explanation: "An AWS Region is a physical geographical area containing multiple (at least 3) isolated and physically separated Availability Zones connected through low-latency private fiber."
  },
  {
    id: "q6",
    domain: "Domain 1: Cloud Concepts",
    question: "Which of the following factors should be considered FIRST when selecting an AWS Region to deploy an application?",
    options: [
      "The physical distance to AWS corporate headquarters in Seattle",
      "Compliance and legal data sovereignty requirements",
      "The availability of AWS Snowmobile in that region",
      "Whether the region name is alphanumeric"
    ],
    correct: 1,
    explanation: "Compliance and legal data sovereignty requirements take priority. If local law mandates that citizen healthcare or banking data must remain within national borders, you must choose an in-country region."
  },
  {
    id: "q7",
    domain: "Domain 1: Cloud Concepts",
    question: "What is an AWS Availability Zone (AZ) composed of?",
    options: [
      "A collection of DNS routing records",
      "One or more discrete data centers with redundant power, networking, and connectivity in an AWS Region",
      "A virtual server running on an EC2 host",
      "A global edge cache server for CloudFront"
    ],
    correct: 1,
    explanation: "An Availability Zone consists of one or more physical, discrete data centers equipped with independent power substations, backup generators, and fiber connectivity."
  },
  {
    id: "q8",
    domain: "Domain 1: Cloud Concepts",
    question: "Which cloud service model provides the customer with the HIGHEST level of architectural control over the operating system and networking configuration?",
    options: [
      "Software as a Service (SaaS)",
      "Platform as a Service (PaaS)",
      "Infrastructure as a Service (IaaS)",
      "Database as a Service (DBaaS)"
    ],
    correct: 2,
    explanation: "IaaS (such as Amazon EC2) provides virtualized computing resources where the customer has full administrator/root access to configure the OS, install software, and manage firewall rules."
  },
  {
    id: "q9",
    domain: "Domain 1: Cloud Concepts",
    question: "AWS Elastic Beanstalk and AWS Lambda are examples of which cloud computing category?",
    options: ["IaaS", "PaaS", "SaaS", "On-Premises Hardware"],
    correct: 1,
    explanation: "Platform as a Service (PaaS) abstracts away underlying server maintenance, operating system patching, and scaling, letting developers focus solely on writing and deploying application code."
  },
  {
    id: "q10",
    domain: "Domain 1: Cloud Concepts",
    question: "Which pillar of the AWS Well-Architected Framework emphasizes the ability to run workloads without disruption and recover dynamically from infrastructure failures?",
    options: ["Cost Optimization", "Reliability", "Security", "Operational Excellence"],
    correct: 1,
    explanation: "The Reliability pillar encompasses design principles to prevent and quickly recover from failures, test recovery procedures, and automatically scale horizontally."
  },
  {
    id: "q11",
    domain: "Domain 1: Cloud Concepts",
    question: "Which pillar was added as the 6th pillar to the AWS Well-Architected Framework in recent updates?",
    options: ["Scalability", "Agility", "Sustainability", "Governance"],
    correct: 2,
    explanation: "The Sustainability pillar was officially introduced to focus on minimizing the environmental and carbon impact of running cloud workloads through resource optimization."
  },
  {
    id: "q12",
    domain: "Domain 1: Cloud Concepts",
    question: "A company wants to minimize network latency for mobile video streamers across 40 countries. Which AWS global infrastructure component should they leverage?",
    options: ["AWS Local Zones", "Edge Locations (Points of Presence)", "AWS Direct Connect", "VPC Peering"],
    correct: 1,
    explanation: "Edge Locations (Points of Presence) are globally distributed caching data centers used by Amazon CloudFront to deliver web and video content with minimal latency."
  },
  {
    id: "q13",
    domain: "Domain 1: Cloud Concepts",
    question: "Which concept describes deploying application replicas across MULTIPLE Availability Zones within a region?",
    options: ["Disaster Avoidance", "High Availability", "Elastic Caching", "Edge Routing"],
    correct: 1,
    explanation: "High Availability (HA) ensures a system remains operational even if an entire Availability Zone experiences a natural disaster or power grid outage."
  },
  {
    id: "q14",
    domain: "Domain 1: Cloud Concepts",
    question: "What is the primary objective of the AWS Cloud Adoption Framework (AWS CAF)?",
    options: [
      "To automatically configure AWS firewall rules",
      "To provide structured guidance across 6 perspectives (Business, People, Governance, Platform, Security, Operations) to accelerate cloud transformation",
      "To replace AWS IAM roles with Active Directory",
      "To calculate discounted pricing for enterprise software licenses"
    ],
    correct: 1,
    explanation: "The AWS CAF organizes organizational guidance into 6 foundational perspectives to help enterprises plan, execute, and govern their transition to the cloud."
  },
  {
    id: "q15",
    domain: "Domain 1: Cloud Concepts",
    question: "Which AWS infrastructure option brings AWS compute, storage, and database services directly inside telecommunications providers' 5G networks?",
    options: ["AWS Outposts", "AWS Wavelength", "AWS Local Zones", "AWS Transit Gateway"],
    correct: 1,
    explanation: "AWS Wavelength embeds AWS compute and storage within 5G telecom networks to deliver single-digit millisecond latency to mobile devices and smart vehicles."
  },
  {
    id: "q16",
    domain: "Domain 1: Cloud Concepts",
    question: "If a company wants physical AWS server racks delivered and installed directly inside their own private on-premises server room, which service should they order?",
    options: ["AWS Storage Gateway", "AWS Outposts", "AWS Direct Connect", "Amazon WorkSpaces"],
    correct: 1,
    explanation: "AWS Outposts delivers physical AWS hardware racks to your on-premises facility, allowing you to run AWS infrastructure locally with identical APIs and tools."
  },

  // ── DOMAIN 2: SECURITY & COMPLIANCE (20 Questions) ────────
  {
    id: "q17",
    domain: "Domain 2: Security & Compliance",
    question: "Under the AWS Shared Responsibility Model, which security responsibility belongs STRICTLY to the customer?",
    options: [
      "Decommissioning defective physical hard drives according to NIST standards",
      "Configuring firewall rules in Amazon EC2 Security Groups and guest OS patching",
      "Securing the virtualization hypervisor layer",
      "Maintaining the physical facilities and cooling of AWS data centers"
    ],
    correct: 1,
    explanation: "AWS secures 'OF the cloud' (hardware, facilities, hypervisor). The customer is responsible for 'IN the cloud', which includes guest OS patches, IAM user management, and Security Group configurations."
  },
  {
    id: "q18",
    domain: "Domain 2: Security & Compliance",
    question: "When using Amazon RDS (Relational Database Service), who is responsible for applying operating system security patches to the underlying database server?",
    options: [
      "The customer",
      "AWS",
      "Third-party database vendors",
      "The database administrator via SSH"
    ],
    correct: 1,
    explanation: "Because Amazon RDS is a managed database service, AWS is responsible for patching the underlying operating system and database engine. The customer only manages database access, users, and tables."
  },
  {
    id: "q19",
    domain: "Domain 2: Security & Compliance",
    question: "What is the recommended best practice for the AWS account root user?",
    options: [
      "Share root user credentials with the senior DevOps team",
      "Use the root user for all everyday administrative tasks",
      "Lock away root user credentials, enable MFA immediately, and create an administrative IAM user for daily tasks",
      "Generate access keys for the root user and commit them to GitHub"
    ],
    correct: 2,
    explanation: "The root user has unrestricted god-mode access. Best practice dictates enabling Multi-Factor Authentication (MFA), deleting long-term root access keys, and creating dedicated IAM users for day-to-day operations."
  },
  {
    id: "q20",
    domain: "Domain 2: Security & Compliance",
    question: "Which AWS IAM component provides TEMPORARY security credentials with automatic expiration for applications running on Amazon EC2?",
    options: ["IAM User", "IAM Group", "IAM Role", "IAM Access Key ID"],
    correct: 2,
    explanation: "IAM Roles deliver temporary, auto-rotating security credentials via AWS STS. Attaching an IAM Role to an EC2 instance eliminates the need to hardcode sensitive credentials in code."
  },
  {
    id: "q21",
    domain: "Domain 2: Security & Compliance",
    question: "What format are AWS Identity and Access Management (IAM) policy documents written in?",
    options: ["XML", "JSON", "YAML only", "Plain text CSV"],
    correct: 1,
    explanation: "IAM policies are structured JSON documents containing statements with Effect (Allow/Deny), Action (e.g. s3:GetObject), Resource (ARN), and optional Conditions."
  },
  {
    id: "q22",
    domain: "Domain 2: Security & Compliance",
    question: "The security principle of granting users and applications only the exact permissions needed to perform their job functions is known as:",
    options: [
      "Principle of Least Privilege",
      "Rule of Mutual Exclusion",
      "Zero Allocation Strategy",
      "Defense-in-Depth"
    ],
    correct: 0,
    explanation: "The Principle of Least Privilege dictates that users and services should only be given the absolute minimum permissions strictly necessary to accomplish their assigned tasks."
  },
  {
    id: "q23",
    domain: "Domain 2: Security & Compliance",
    question: "Which AWS service provides an intelligent threat detection service that continuously monitors VPC Flow Logs, DNS Logs, and CloudTrail events using Machine Learning?",
    options: ["Amazon GuardDuty", "Amazon Inspector", "AWS Shield", "AWS WAF"],
    correct: 0,
    explanation: "Amazon GuardDuty is an agentless, intelligent threat detection service that uses ML and anomaly detection across CloudTrail, VPC Flow Logs, and DNS queries to flag unauthorized activity."
  },
  {
    id: "q24",
    domain: "Domain 2: Security & Compliance",
    question: "Which AWS service is an automated vulnerability assessment tool that scans Amazon EC2 instances, Lambda functions, and ECR container images for software vulnerabilities (CVEs)?",
    options: ["Amazon Inspector", "Amazon Macie", "AWS Shield Standard", "AWS Artifact"],
    correct: 0,
    explanation: "Amazon Inspector automatically scans computing workloads (EC2, Lambda, ECR) for known software vulnerabilities and unintended network exposure."
  },
  {
    id: "q25",
    domain: "Domain 2: Security & Compliance",
    question: "A company needs to discover and protect sensitive personal identifiable information (PII) and credit card numbers stored in Amazon S3 buckets. Which service fits this requirement?",
    options: ["Amazon Macie", "Amazon GuardDuty", "AWS KMS", "AWS Secrets Manager"],
    correct: 0,
    explanation: "Amazon Macie is a fully managed data security and privacy service that uses machine learning and pattern matching to discover and protect sensitive PII data in Amazon S3."
  },
  {
    id: "q26",
    domain: "Domain 2: Security & Compliance",
    question: "Which AWS DDoS protection service is automatically enabled for all AWS customers at NO additional charge?",
    options: [
      "AWS Shield Standard",
      "AWS Shield Advanced",
      "AWS WAF Managed Rules",
      "Amazon CloudWatch Guard"
    ],
    correct: 0,
    explanation: "AWS Shield Standard defends all AWS customers automatically at no extra cost against common Layer 3 and Layer 4 network DDoS attacks (e.g. SYN floods, UDP reflection)."
  },
  {
    id: "q27",
    domain: "Domain 2: Security & Compliance",
    question: "Which AWS security service operates at Layer 7 (Application Layer) to block SQL Injection, Cross-Site Scripting (XSS), and malicious web bots?",
    options: ["AWS WAF", "AWS Shield Standard", "Network ACLs", "Security Groups"],
    correct: 0,
    explanation: "AWS WAF (Web Application Firewall) inspects HTTP/HTTPS traffic at Layer 7 and enforces rules to block SQL injection, XSS, and unwanted bot scrapers."
  },
  {
    id: "q28",
    domain: "Domain 2: Security & Compliance",
    question: "Where can a compliance officer download AWS's official SOC 1/2/3, PCI DSS, and ISO certification reports to provide to an external auditor?",
    options: ["AWS Trusted Advisor", "AWS Artifact", "AWS Audit Manager", "Amazon CloudWatch Logs"],
    correct: 1,
    explanation: "AWS Artifact is the self-service audit and compliance portal that grants on-demand access to AWS's security certifications, SOC reports, and HIPAA business agreements."
  },
  {
    id: "q29",
    domain: "Domain 2: Security & Compliance",
    question: "What is the primary distinction between AWS Key Management Service (KMS) and AWS CloudHSM?",
    options: [
      "KMS is a multi-tenant managed cryptographic service; CloudHSM provides a dedicated, single-tenant hardware appliance with FIPS 140-2 Level 3 compliance",
      "KMS is only used for S3; CloudHSM is only used for EC2",
      "KMS requires physical hardware installation on-premises",
      "CloudHSM is completely free"
    ],
    correct: 0,
    explanation: "AWS KMS is a managed multi-tenant encryption key service. AWS CloudHSM provides dedicated single-tenant hardware security module (HSM) appliances under your exclusive control."
  },
  {
    id: "q30",
    domain: "Domain 2: Security & Compliance",
    question: "Which AWS service is specifically designed to store database passwords and API tokens and can automatically ROTATE database credentials on a schedule?",
    options: [
      "AWS Systems Manager Parameter Store",
      "AWS Secrets Manager",
      "AWS KMS",
      "Amazon S3 Object Lock"
    ],
    correct: 1,
    explanation: "AWS Secrets Manager enables the centralized storage of secrets and features built-in automatic rotation for Amazon RDS, Redshift, and DocumentDB credentials."
  },
  {
    id: "q31",
    domain: "Domain 2: Security & Compliance",
    question: "What tool allows organizations to enforce centralized permission guardrails across multiple AWS accounts such that even member account root users cannot override them?",
    options: [
      "Service Control Policies (SCPs) in AWS Organizations",
      "IAM Role Trust Policies",
      "VPC Flow Logs",
      "CloudTrail Trails"
    ],
    correct: 0,
    explanation: "Service Control Policies (SCPs) define the maximum available permissions for accounts inside an AWS Organization. Member account root users cannot bypass an explicit Deny in an SCP."
  },
  {
    id: "q32",
    domain: "Domain 2: Security & Compliance",
    question: "Which statement about Security Groups and Network ACLs (NACLs) is TRUE?",
    options: [
      "Security Groups are stateless; NACLs are stateful",
      "Security Groups are stateful and evaluate all rules; NACLs are stateless and evaluate rules in numbered order",
      "Both Security Groups and NACLs support explicit DENY rules",
      "NACLs operate at the EC2 instance level"
    ],
    correct: 1,
    explanation: "Security Groups operate at the instance level, are stateful (return traffic allowed automatically), and only support ALLOW rules. NACLs operate at the subnet level, are stateless, and evaluate rules in numbered order."
  },
  {
    id: "q33",
    domain: "Domain 2: Security & Compliance",
    question: "What happens by default if an incoming network packet reaches an Amazon EC2 Security Group and does not match any inbound rule?",
    options: [
      "The packet is forwarded to CloudWatch",
      "The packet is automatically dropped and denied",
      "The packet is allowed through to port 80",
      "The instance shuts down"
    ],
    correct: 1,
    explanation: "By default, Security Groups deny all inbound traffic unless an explicit rule exists permitting it."
  },
  {
    id: "q34",
    domain: "Domain 2: Security & Compliance",
    question: "Which AWS service tracks and records configuration changes made to AWS resources over time and evaluates compliance against established rules?",
    options: ["AWS Config", "AWS CloudTrail", "Amazon CloudWatch", "AWS Systems Manager"],
    correct: 0,
    explanation: "AWS Config continuously monitors and records resource configuration histories, comparing current states against desired compliance baselines (e.g. alerting if an S3 bucket is made public)."
  },
  {
    id: "q35",
    domain: "Domain 2: Security & Compliance",
    question: "A company suspects that an unauthorized user deleted an EC2 instance yesterday. Which service should they query to see WHO made the API call, WHEN, and from which IP address?",
    options: ["Amazon CloudWatch Metrics", "AWS CloudTrail", "AWS Trusted Advisor", "AWS Config Logs"],
    correct: 1,
    explanation: "AWS CloudTrail captures a comprehensive audit log of every API call made in an AWS account, documenting the identity of the caller, time of call, and source IP address."
  },
  {
    id: "q36",
    domain: "Domain 2: Security & Compliance",
    question: "Which of the following is considered 'Security OF the Cloud'?",
    options: [
      "Encrypting tables stored in DynamoDB",
      "Protecting the physical perimeter and biometric access to AWS data centers",
      "Configuring user passwords in AWS IAM",
      "Applying Linux kernel updates to EC2 instances"
    ],
    correct: 1,
    explanation: "Physical data center security, surveillance, and biometric access controls are the sole responsibility of AWS under 'Security OF the Cloud'."
  },

  // ── DOMAIN 3: CLOUD TECHNOLOGY & SERVICES (21 Questions) ──
  {
    id: "q37",
    domain: "Domain 3: Cloud Technology & Services",
    question: "A startup needs to run non-critical video transcoding jobs that can be interrupted at any moment without causing data loss. Which EC2 purchasing option offers the lowest cost?",
    options: ["On-Demand Instances", "Dedicated Hosts", "Spot Instances", "Standard Reserved Instances"],
    correct: 2,
    explanation: "Spot Instances offer discounts of up to 90% compared to On-Demand by allowing customers to use spare AWS compute capacity, with the trade-off that instances can be reclaimed with a 2-minute notice."
  },
  {
    id: "q38",
    domain: "Domain 3: Cloud Technology & Services",
    question: "A financial firm requires a dedicated physical EC2 server for their exclusive use to satisfy strict regulatory compliance and existing per-core software licensing. Which option must they choose?",
    options: ["Dedicated Hosts", "Spot Instances", "Savings Plans", "Convertible Reserved Instances"],
    correct: 0,
    explanation: "Dedicated Hosts provide a physical server fully dedicated to your use, giving visibility into sockets and cores to support existing socket-bound software licenses."
  },
  {
    id: "q39",
    domain: "Domain 3: Cloud Technology & Services",
    question: "What is the maximum execution time limit for an AWS Lambda function before it automatically times out?",
    options: ["5 minutes", "15 minutes", "1 hour", "24 hours"],
    correct: 1,
    explanation: "AWS Lambda has a hard maximum execution timeout of 15 minutes (900 seconds) per invocation."
  },
  {
    id: "q40",
    domain: "Domain 3: Cloud Technology & Services",
    question: "Which serverless compute engine allows you to run Docker containers on Amazon ECS or Amazon EKS without managing or provisioning any EC2 instances?",
    options: ["AWS Fargate", "AWS Elastic Beanstalk", "AWS Batch", "Amazon Lightsail"],
    correct: 0,
    explanation: "AWS Fargate is the serverless compute engine for containers that eliminates the need to provision, configure, or scale EC2 server clusters."
  },
  {
    id: "q41",
    domain: "Domain 3: Cloud Technology & Services",
    question: "Which Amazon S3 storage class is engineered for long-term data archiving where retrieval times of 12 to 48 hours are acceptable, offering the absolute lowest storage cost in AWS?",
    options: [
      "S3 Standard",
      "S3 Standard-IA",
      "S3 Glacier Deep Archive",
      "S3 One Zone-IA"
    ],
    correct: 2,
    explanation: "S3 Glacier Deep Archive provides the lowest-cost storage tier across AWS (less than $1 per TB per month) for long-term regulatory archives that are rarely accessed."
  },
  {
    id: "q42",
    domain: "Domain 3: Cloud Technology & Services",
    question: "Which statement accurately describes Amazon EBS (Elastic Block Store)?",
    options: [
      "It is a multi-region object storage service accessed via HTTP endpoints",
      "It provides persistent block storage volumes attached to a single EC2 instance within the SAME Availability Zone",
      "It can be mounted simultaneously by 500 Linux instances across different continents",
      "It is an in-memory cache"
    ],
    correct: 1,
    explanation: "EBS volumes provide block-level storage designed to attach to an EC2 instance in the same Availability Zone. To move an EBS volume to another AZ, you must take a snapshot."
  },
  {
    id: "q43",
    domain: "Domain 3: Cloud Technology & Services",
    question: "A company has hundreds of Linux EC2 instances across 3 Availability Zones that need to mount and read/write to the same shared directory simultaneously. Which storage service should they use?",
    options: ["Amazon EBS", "Amazon EFS", "Amazon S3", "AWS Storage Gateway"],
    correct: 1,
    explanation: "Amazon EFS (Elastic File System) provides a scalable, shared network file system (NFS) that can be mounted concurrently by hundreds of EC2 instances across multiple AZs."
  },
  {
    id: "q44",
    domain: "Domain 3: Cloud Technology & Services",
    question: "Which AWS database service is a serverless, non-relational NoSQL database capable of delivering consistent single-digit millisecond latency at any scale?",
    options: ["Amazon RDS", "Amazon DynamoDB", "Amazon Redshift", "Amazon Aurora"],
    correct: 1,
    explanation: "Amazon DynamoDB is a fully managed NoSQL key-value and document database built for internet-scale applications requiring predictable sub-10ms response times."
  },
  {
    id: "q45",
    domain: "Domain 3: Cloud Technology & Services",
    question: "In Amazon RDS, what is the primary architectural purpose of configuring a 'Multi-AZ' deployment?",
    options: [
      "To improve read throughput performance by offloading SELECT queries",
      "To provide high availability and automated failover in case of a primary data center outage",
      "To reduce monthly licensing costs",
      "To shard database tables across multiple regions"
    ],
    correct: 1,
    explanation: "Multi-AZ creates a synchronous standby replica in a different AZ for High Availability and Disaster Recovery. It does NOT serve read traffic (Read Replicas are used for read scaling)."
  },
  {
    id: "q46",
    domain: "Domain 3: Cloud Technology & Services",
    question: "Which relational database engine developed by AWS is fully compatible with MySQL and PostgreSQL, offering up to 5x the throughput of standard MySQL?",
    options: ["Amazon DynamoDB", "Amazon Aurora", "Amazon Neptune", "Amazon DocumentDB"],
    correct: 1,
    explanation: "Amazon Aurora is AWS's cloud-native relational database engine. It replicates 6 copies of data across 3 AZs and delivers 5x the performance of standard MySQL."
  },
  {
    id: "q47",
    domain: "Domain 3: Cloud Technology & Services",
    question: "Which in-memory caching service can be placed in front of an RDS database to dramatically accelerate read performance using Redis or Memcached?",
    options: ["Amazon ElastiCache", "Amazon CloudFront", "AWS AppSync", "Amazon Kinesis"],
    correct: 0,
    explanation: "Amazon ElastiCache manages in-memory data stores (Redis or Memcached) to cache frequently requested data and achieve microsecond read response times."
  },
  {
    id: "q48",
    domain: "Domain 3: Cloud Technology & Services",
    question: "A business intelligence team needs to run complex SQL analytical queries against petabytes of historical sales records. Which AWS service is purpose-built for this data warehousing workload?",
    options: ["Amazon DynamoDB", "Amazon Redshift", "Amazon RDS", "Amazon Neptune"],
    correct: 1,
    explanation: "Amazon Redshift is a columnar-storage petabyte-scale cloud data warehouse optimized for online analytical processing (OLAP) and complex reporting queries."
  },
  {
    id: "q49",
    domain: "Domain 3: Cloud Technology & Services",
    question: "In an Amazon VPC, what component enables instances in a public subnet to connect directly to the public internet?",
    options: ["NAT Gateway", "Internet Gateway (IGW)", "Virtual Private Gateway", "Egress-Only Gateway"],
    correct: 1,
    explanation: "An Internet Gateway (IGW) is a horizontally scaled, redundant VPC component that enables communication between resources in public subnets and the internet."
  },
  {
    id: "q50",
    domain: "Domain 3: Cloud Technology & Services",
    question: "What component allows EC2 instances in a PRIVATE subnet to initiate outbound connections to the internet (for software updates) while preventing the internet from initiating inbound traffic?",
    options: ["NAT Gateway", "Internet Gateway", "Route 53", "Direct Connect"],
    correct: 0,
    explanation: "A NAT Gateway (Network Address Translation) allows instances in private subnets to send outbound requests to the internet without exposing their private IP addresses to inbound internet traffic."
  },
  {
    id: "q51",
    domain: "Domain 3: Cloud Technology & Services",
    question: "Which Amazon Route 53 routing policy routes internet traffic to the AWS region that provides the lowest network latency for the end user?",
    options: ["Simple Routing", "Weighted Routing", "Latency-based Routing", "Failover Routing"],
    correct: 2,
    explanation: "Latency-based routing directs users to the AWS Region that provides the fastest response time based on global network latency measurements."
  },
  {
    id: "q52",
    domain: "Domain 3: Cloud Technology & Services",
    question: "What is the primary function of Elastic Load Balancing (ELB)?",
    options: [
      "To automatically provision EC2 instances when CPU exceeds 80%",
      "To evenly distribute incoming application traffic across multiple targets (EC2 instances, containers, IPs) across Availability Zones",
      "To encrypt data at rest on S3",
      "To backup database tables to tape drives"
    ],
    correct: 1,
    explanation: "Elastic Load Balancing automatically distributes incoming traffic across healthy backend targets in one or more Availability Zones."
  },
  {
    id: "q53",
    domain: "Domain 3: Cloud Technology & Services",
    question: "Which AWS service allows developers to define and deploy cloud infrastructure using declarative JSON or YAML templates (Infrastructure as Code)?",
    options: ["AWS CloudFormation", "AWS CodeDeploy", "AWS Systems Manager", "AWS Config"],
    correct: 0,
    explanation: "AWS CloudFormation allows you to model, provision, and version your entire AWS infrastructure through code templates (JSON or YAML)."
  },
  {
    id: "q54",
    domain: "Domain 3: Cloud Technology & Services",
    question: "What is the difference between Amazon SQS (Simple Queue Service) and Amazon SNS (Simple Notification Service)?",
    options: [
      "SQS is a 1-to-many publish/subscribe push service; SNS is a 1-to-1 polling message queue",
      "SQS is a message queue where receivers pull messages; SNS is a pub/sub notification service that pushes messages to multiple subscribers",
      "SQS is for databases; SNS is for file storage",
      "SQS requires physical servers; SNS is serverless"
    ],
    correct: 1,
    explanation: "SQS is a pull-based message queue for decoupling distributed systems. SNS is a push-based pub/sub topic that broadcasts messages to multiple subscribers (email, SMS, Lambda, SQS)."
  },
  {
    id: "q55",
    domain: "Domain 3: Cloud Technology & Services",
    question: "Which AWS service provides an online advisory tool that inspects your AWS environment and recommends optimizations across 5 categories (Cost, Performance, Security, Fault Tolerance, Service Limits)?",
    options: ["AWS Trusted Advisor", "AWS Inspector", "Amazon GuardDuty", "AWS Well-Architected Tool"],
    correct: 0,
    explanation: "AWS Trusted Advisor provides automated recommendations to help optimize costs, boost performance, improve security, enhance fault tolerance, and track service quotas."
  },
  {
    id: "q56",
    domain: "Domain 3: Cloud Technology & Services",
    question: "Which AWS service provides a personalized view of the operational health and performance of AWS services that your specific account is currently using?",
    options: [
      "AWS Health Dashboard",
      "Amazon CloudWatch Dashboard",
      "AWS Status Page",
      "AWS Service Catalog"
    ],
    correct: 0,
    explanation: "The AWS Health Dashboard provides alerts and remediation guidance when AWS is experiencing events that may directly affect your specific environment."
  },
  {
    id: "q57",
    domain: "Domain 3: Cloud Technology & Services",
    question: "A company needs a fully managed Git-compatible source control service hosted directly inside AWS. Which service should they choose?",
    options: ["AWS CodeCommit", "AWS CodeBuild", "AWS CodePipeline", "AWS Artifact"],
    correct: 0,
    explanation: "AWS CodeCommit is a secure, highly scalable, managed source control service that hosts private Git repositories."
  },

  // ── DOMAIN 4: BILLING, PRICING & SUPPORT (8 Questions) ────
  {
    id: "q58",
    domain: "Domain 4: Billing, Pricing & Support",
    question: "Which tool should be used to model and estimate prospective infrastructure costs BEFORE deploying any resources in AWS?",
    options: ["AWS Cost Explorer", "AWS Pricing Calculator", "AWS Budgets", "Cost and Usage Report (CUR)"],
    correct: 1,
    explanation: "The AWS Pricing Calculator allows users to plan and estimate monthly architecture costs prior to launching resources in an account."
  },
  {
    id: "q59",
    domain: "Domain 4: Billing, Pricing & Support",
    question: "Which AWS cost management tool provides graphical visualizations and forecasting to help you analyze historical spending trends over the past 12 months?",
    options: ["AWS Cost Explorer", "AWS Pricing Calculator", "AWS Secrets Manager", "AWS Trusted Advisor"],
    correct: 0,
    explanation: "AWS Cost Explorer is an interactive reporting tool that lets you visualize, understand, and forecast your AWS spending and usage over time."
  },
  {
    id: "q60",
    domain: "Domain 4: Billing, Pricing & Support",
    question: "A manager wants to receive an email alert whenever their department's monthly EC2 spending exceeds $500. Which service should they configure?",
    options: ["AWS Budgets", "AWS Cost Explorer", "Amazon Inspector", "AWS Shield"],
    correct: 0,
    explanation: "AWS Budgets allows you to set custom spending and usage thresholds that trigger email or SNS alerts when forecasted or actual costs exceed your limits."
  },
  {
    id: "q61",
    domain: "Domain 4: Billing, Pricing & Support",
    question: "What is the primary financial advantage of using Consolidated Billing with AWS Organizations?",
    options: [
      "It eliminates the need to pay for EC2 instances",
      "It combines usage across all member accounts to qualify for volume-tiered pricing discounts",
      "It replaces credit card payments with cryptocurrency",
      "It bypasses AWS tax regulations"
    ],
    correct: 1,
    explanation: "Consolidated Billing aggregates usage across all member accounts in an organization, unlocking higher volume discount tiers (such as tiered S3 storage pricing)."
  },
  {
    id: "q62",
    domain: "Domain 4: Billing, Pricing & Support",
    question: "Which AWS Support Plan is the MINIMUM tier that provides 24/7 phone, chat, and email access to Cloud Support Engineers?",
    options: ["Basic Support", "Developer Support", "Business Support", "Enterprise Support"],
    correct: 2,
    explanation: "Business Support ($100/mo) is the minimum plan that offers 24/7 phone, chat, and email access to Cloud Support Engineers with a 1-hour response time for production down issues."
  },
  {
    id: "q63",
    domain: "Domain 4: Billing, Pricing & Support",
    question: "Which AWS Support Plan includes a designated Technical Account Manager (TAM) and a guaranteed response time of under 15 minutes for business-critical outages?",
    options: ["Basic Support", "Developer Support", "Business Support", "Enterprise Support"],
    correct: 3,
    explanation: "Enterprise Support ($15,000/mo) is the top tier that includes a dedicated Technical Account Manager (TAM), concierge billing support, and a 15-minute response window for critical outages."
  },
  {
    id: "q64",
    domain: "Domain 4: Billing, Pricing & Support",
    question: "What types of offers are included under the AWS Free Tier?",
    options: [
      "Always Free, 12 Months Free, and Short-Term Free Trials",
      "Free compute on weekends only",
      "Unlimited free storage for enterprise companies",
      "Free services only during beta testing periods"
    ],
    correct: 0,
    explanation: "The AWS Free Tier includes three distinct types of offers: Always Free (e.g. DynamoDB 25GB, Lambda 1M requests), 12 Months Free (e.g. EC2 750 hrs/mo, S3 5GB), and Short-Term Trials."
  },
  {
    id: "q65",
    domain: "Domain 4: Billing, Pricing & Support",
    question: "Which is the most detailed and granular billing dataset available in AWS, delivering CSV line items directly to an Amazon S3 bucket?",
    options: [
      "AWS Cost Explorer Reports",
      "AWS Cost and Usage Report (CUR)",
      "AWS Budgets Summary",
      "AWS Billing Dashboard Overview"
    ],
    correct: 1,
    explanation: "The AWS Cost and Usage Report (CUR) provides the most comprehensive, detailed raw dataset of AWS usage and costs, broken down by hour, service, and user tags."
  }
];
