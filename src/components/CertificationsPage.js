import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaAward,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
  FaUserTie,
  FaLaptopCode,
  FaChevronDown,
  FaChevronUp,
  FaWhatsapp,
  FaStar,
} from "react-icons/fa";
import "./CertificationsPage.css";
import { submitCertificationEnquiry } from "../services/api";
import PhoneInputField, { isValidPhoneNumber } from "./PhoneInputField";

// Detailed data dictionary for every global certification
const CERT_CATALOG = {
  "sales-force": {
    id: "sales-force",
    title: "Salesforce Certified Administrator & Developer",
    shortName: "Salesforce",
    vendor: "Salesforce® Ecosystem",
    examCode: "ADM-201 / CRT-101",
    examDuration: "105 Minutes",
    examQuestions: "60 Multiple Choice Questions",
    passingScore: "65%",
    deliveryFormat: "Kryterion Webassessor (Online Proctored or In-Person)",
    duration: "6 Weeks",
    mode: "Live Interactive Cohort + Sandboxes",
    targetRoles: [
      "Salesforce Administrator",
      "Salesforce Business Analyst",
      "CRM Solutions Consultant",
      "Salesforce Developer",
    ],
    prerequisites:
      "No mandatory prior certification required. General familiarity with business software or enterprise CRM workflows is beneficial.",
    summary:
      "Master enterprise Salesforce configuration, complex object relationships, advanced Flow Builder automation, security hierarchies, and real-time analytical reporting. Prepare with authentic Webassessor-format exam simulations.",
    curriculum: [
      {
        module: "Module 1",
        title: "Organizational Setup, Security & User Management",
        topics: [
          "Company profile, fiscal years, business hours, and multi-currency",
          "Role hierarchy, sharing rules, public groups, and Organization-Wide Defaults (OWD)",
          "Profiles, permission sets, session settings, and two-factor authentication",
          "Auditing, login history, and health check benchmarks",
        ],
      },
      {
        module: "Module 2",
        title: "Standard & Custom Data Architecture",
        topics: [
          "Standard objects (Accounts, Contacts, Leads, Opportunities, Cases)",
          "Custom objects, custom fields, picklists, and formula fields",
          "Master-Detail vs. Lookup relationships, roll-up summary fields",
          "Schema Builder visualization and record type assignments",
        ],
      },
      {
        module: "Module 3",
        title: "Business Logic & Advanced Flow Builder",
        topics: [
          "Record-triggered Flows, Screen Flows, and Autolaunched Flows",
          "Flow decision elements, loops, fault paths, and data manipulation (DML)",
          "Validation rules, cross-object formulas, and default values",
          "Approval processes, email alerts, and outbound messaging",
        ],
      },
      {
        module: "Module 4",
        title: "Data Management & Governance",
        topics: [
          "Data Loader vs. Data Import Wizard best practices",
          "Bulk inserts, updates, upserts, deletes, and export schedules",
          "Duplicate management, matching rules, and data cleansing",
          "Data storage optimization and compliance archival",
        ],
      },
      {
        module: "Module 5",
        title: "Analytics: Reports & Executive Dashboards",
        topics: [
          "Tabular, Summary, Matrix, and Joined report types",
          "Custom report types, bucket fields, and summary formulas",
          "Dynamic interactive dashboards, filters, and scheduled distributions",
          "Report folder permissions and executive visibility controls",
        ],
      },
      {
        module: "Module 6",
        title: "AppExchange, Lightning Apps & Exam Simulators",
        topics: [
          "Lightning App Builder, record pages, and dynamic forms",
          "AppExchange package installation, vetting, and license assignment",
          "Full-length 60-question timed Webassessor practice exams",
          "Exam-day strategy, question elimination methods, and retake protection",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the passing score for Salesforce Administrator (ADM-201)?",
        a: "The passing score is 65% (approximately 39 correct answers out of 60 scored questions). You are given 105 minutes to complete the test.",
      },
      {
        q: "Do I get real hands-on Salesforce environment access during training?",
        a: "Yes! Every candidate is provisioned with free Developer Sandbox orgs to build custom apps, security models, flows, and data imports alongside the mentor.",
      },
      {
        q: "Does JSTechnoHub assist with exam vouchers and registration?",
        a: "Yes, we guide you through Webassessor account setup, scheduling, authorized discount codes, and provide 1-on-1 exam strategy sessions.",
      },
      {
        q: "What if I fail on my first attempt?",
        a: "We provide retake guidance, pinpoint areas of weakness using your score diagnostic, and give you free access to subsequent live review cohorts.",
      },
    ],
  },
  ccna: {
    id: "ccna",
    title: "Cisco Certified Network Associate (CCNA)",
    shortName: "CCNA®",
    vendor: "Cisco® Systems",
    examCode: "200-301 CCNA",
    examDuration: "120 Minutes",
    examQuestions: "100 - 120 Questions (MCQ + Drag & Drop)",
    passingScore: "Approx. 825 / 1000",
    deliveryFormat: "Pearson VUE (Online Proctored or Test Center)",
    duration: "8 Weeks",
    mode: "Live Hands-On Packet Tracer & Labs",
    targetRoles: [
      "Network Engineer",
      "Network Support Specialist",
      "Systems Administrator",
      "NOC Engineer",
    ],
    prerequisites:
      "Basic understanding of computers and IP addressing is helpful, though the course starts from foundational networking concepts.",
    summary:
      "Master the definitive global standard for enterprise networking. Learn IPv4/IPv6 subnetting, routing architecture (OSPFv2), switching (VLANs, STP), network security (ACLs, NAT), and modern network programmability with REST APIs and Python.",
    curriculum: [
      {
        module: "Module 1",
        title: "Network Fundamentals & Enterprise Architectures",
        topics: [
          "OSI Model & TCP/IP Protocol Stack deep dive",
          "Routers, switches, next-generation firewalls, wireless LAN controllers (WLC)",
          "Physical cabling (Cat6, Single-mode/Multi-mode fiber, SFP)",
          "IPv4 subnetting (FLSM & VLSM) and IPv6 address types (Global, Link-Local)",
        ],
      },
      {
        module: "Module 2",
        title: "Network Access & Layer 2 Switching",
        topics: [
          "VLAN configuration, port access vs. 802.1Q trunking",
          "Spanning Tree Protocol (STP, Rapid PVST+) and loop prevention",
          "EtherChannel (LACP & PAgP) link aggregation",
          "Cisco Discovery Protocol (CDP) and LLDP topology discovery",
        ],
      },
      {
        module: "Module 3",
        title: "IP Connectivity & OSPFv2 Routing",
        topics: [
          "Routing tables, administrative distance, and metric calculations",
          "Static routing: default routes, network routes, host routes, and floating static",
          "Single-Area OSPFv2 neighbor adjacencies, DR/BDR election, and point-to-point networks",
          "Inter-VLAN routing (Router-on-a-Stick and Layer 3 Switch SVIs)",
        ],
      },
      {
        module: "Module 4",
        title: "IP Services & Infrastructure Maintenance",
        topics: [
          "DHCP server & client relay configuration, DNS troubleshooting",
          "Inside Source NAT, Static NAT, and Dynamic PAT (Overload)",
          "NTP synchronization, Syslog severity levels, and SNMPv2/v3",
          "SSH secure remote access vs. Telnet, TFTP/SFTP image backups",
        ],
      },
      {
        module: "Module 5",
        title: "Security Fundamentals & Threat Mitigation",
        topics: [
          "Standard and Extended IPv4 Access Control Lists (ACLs)",
          "Layer 2 security: Port Security, DHCP Snooping, and Dynamic ARP Inspection (DAI)",
          "AAA (Authentication, Authorization, Accounting) concepts and TACACS+/RADIUS",
          "VPN fundamentals (Site-to-Site IPsec, SSL VPN, and GRE)",
        ],
      },
      {
        module: "Module 6",
        title: "Network Automation, Programmability & Simulators",
        topics: [
          "Traditional vs. Controller-based networking (Cisco DNA Center)",
          "REST APIs, CRUD operations, HTTP response codes, and JSON data encoding",
          "Configuration management overview (Ansible, Puppet, Chef)",
          "Complete timed 200-301 CCNA mock assessments with detailed answer rationales",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the exam pattern for Cisco CCNA 200-301?",
        a: "The exam consists of 100-120 questions including multiple choice, drag-and-drop, and simlet performance tasks. You have 120 minutes to complete it via Pearson VUE.",
      },
      {
        q: "Do I need physical Cisco hardware for this course?",
        a: "No physical hardware is required. We provide pre-configured Cisco Packet Tracer and GNS3 virtual lab topologies that replicate enterprise routers, switches, and firewalls.",
      },
      {
        q: "How long is CCNA certification valid?",
        a: "Cisco CCNA certification is valid for 3 years from the date you pass. It can be recertified by taking associate/professional exams or earning Continuing Education (CE) credits.",
      },
      {
        q: "Does this course cover the latest 200-301 syllabus changes?",
        a: "Yes! Our curriculum incorporates the latest Cisco blueprint revisions including modern network automation, cloud connectivity, and zero trust security.",
      },
    ],
  },
  "palo-alto": {
    id: "palo-alto",
    title: "Palo Alto Networks Network Security Engineer (PCNSE)",
    shortName: "Palo Alto PCNSE",
    vendor: "Palo Alto Networks®",
    examCode: "PCNSE (PAN-OS 11.x)",
    examDuration: "80 Minutes",
    examQuestions: "75 Multiple Choice & Scenario Questions",
    passingScore: "Approx. 70%+",
    deliveryFormat: "Pearson VUE (Online or Test Center)",
    duration: "6 Weeks",
    mode: "Live Virtual Lab Appliances",
    targetRoles: [
      "Network Security Engineer",
      "Palo Alto Firewall Administrator",
      "Cybersecurity Defense Specialist",
      "SOC Level 2/3 Engineer",
    ],
    prerequisites:
      "Basic understanding of IP networking (TCP/IP, routing, subnetting) and foundational network security concepts is recommended.",
    summary:
      "Become an expert in designing, installing, configuring, maintaining, and troubleshooting Palo Alto Networks Next-Generation Firewalls (NGFW) running PAN-OS. Master App-ID, Content-ID, User-ID, SSL Decryption, GlobalProtect VPN, and High Availability.",
    curriculum: [
      {
        module: "Module 1",
        title: "PAN-OS Architecture & Firewall Initialization",
        topics: [
          "Single-Pass Parallel Processing (SP3) architecture and flow logic",
          "Management interface configuration, DNS, NTP, and service routes",
          "Interface types: Layer 3, Layer 2, Virtual Wire (VWire), Tap, and Loopback",
          "Security zones, virtual routers, and static/default routing",
        ],
      },
      {
        module: "Module 2",
        title: "App-ID & Security Policy Enforcement",
        topics: [
          "Application identification engine and application dependencies",
          "Application Groups vs. Application Filters",
          "Migrating legacy port-based rules to App-ID with Policy Optimizer",
          "Security policy evaluation order, rule matching, and shadow rules",
        ],
      },
      {
        module: "Module 3",
        title: "Content-ID & Advanced Threat Prevention",
        topics: [
          "Antivirus, Anti-Spyware, and Vulnerability Protection profiles",
          "URL Filtering categories, security actions, and custom URL categories",
          "WildFire cloud malware analysis, automated threat signatures",
          "File Blocking profiles and data filtering controls",
        ],
      },
      {
        module: "Module 4",
        title: "Decryption Policies & User-ID Integration",
        topics: [
          "Inbound Inspection vs. Outbound SSL Forward Proxy decryption",
          "Enterprise PKI certificate deployment and trusted root CAs",
          "User-ID agent deployment, Active Directory LDAP integration, and Syslog parsing",
          "Captive Portal authentication and group mapping policies",
        ],
      },
      {
        module: "Module 5",
        title: "GlobalProtect Remote Access & Site-to-Site VPN",
        topics: [
          "GlobalProtect Portal and Gateway configuration",
          "Client authentication methods, split tunneling, and HIP (Host Information Profile)",
          "Site-to-Site IPsec VPN tunnels with IKEv1/IKEv2 and route-based configurations",
          "VPN troubleshooting, tunnel status monitoring, and crypto profiles",
        ],
      },
      {
        module: "Module 6",
        title: "High Availability (HA) & Centralized Panorama",
        topics: [
          "Active/Passive vs. Active/Active HA deployment modes",
          "HA1 (control link), HA2 (data link), and path/link monitoring triggers",
          "Panorama centralized management: Device Groups, Templates, and Template Stacks",
          "PCNSE comprehensive mock exams with scenario-based troubleshooting drills",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between PCCET and PCNSE?",
        a: "PCCET is an entry-level associate certification for cybersecurity fundamentals, whereas PCNSE is the flagship professional engineer credential validating deep hands-on PAN-OS configuration and troubleshooting.",
      },
      {
        q: "Do we practice on actual Palo Alto firewalls?",
        a: "Yes! You receive access to virtual Palo Alto firewall appliances (PAN-OS 11.x) with active threat prevention, GlobalProtect, and Panorama licenses.",
      },
      {
        q: "How many questions are on the PCNSE exam?",
        a: "The PCNSE exam has 75 questions to be answered in 80 minutes. The questions test real configuration scenarios, troubleshooting logs, and architecture decisions.",
      },
      {
        q: "Is there coding required for PCNSE?",
        a: "No programming or coding is required. You will primarily configure and troubleshoot firewalls via the web GUI, CLI, and Panorama management console.",
      },
    ],
  },
  vmware: {
    id: "vmware",
    title: "VMware Data Center Virtualization (VCP-DCV)",
    shortName: "VMware VCP",
    vendor: "Broadcom / VMware®",
    examCode: "2V0-21.23 (vSphere 8.x)",
    examDuration: "135 Minutes",
    examQuestions: "70 Single & Multiple Choice Questions",
    passingScore: "300 / 500 (Scaled)",
    deliveryFormat: "Pearson VUE (Online Proctored or Test Center)",
    duration: "6 Weeks",
    mode: "Cloud Datacenter Virtual Lab",
    targetRoles: [
      "Virtualization Engineer",
      "Cloud Infrastructure Architect",
      "Senior Systems Administrator",
      "Datacenter Operations Lead",
    ],
    prerequisites:
      "General knowledge of enterprise server hardware, storage concepts (SAN/NAS), and operating systems.",
    summary:
      "Master the installation, configuration, optimization, and administration of VMware vSphere 8.x enterprise environments. Deep-dive into ESXi hypervisors, vCenter Server Appliance, vSphere High Availability (HA), Distributed Resource Scheduler (DRS), and vSAN software-defined storage.",
    curriculum: [
      {
        module: "Module 1",
        title: "vSphere 8 Architecture & ESXi Deployment",
        topics: [
          "VMware vSphere 8.x architectural building blocks",
          "Interactive, scripted, and auto-deploy ESXi hypervisor installation",
          "Host configuration: Direct Console User Interface (DCUI) and host networking",
          "Host licensing, time synchronization (NTP), and host access security",
        ],
      },
      {
        module: "Module 2",
        title: "vCenter Server Appliance (vCSA) Management",
        topics: [
          "vCenter Server deployment, requirements, and database sizing",
          "vCenter inventory hierarchy: Datacenters, Folders, Clusters, and Resource Pools",
          "Role-based access control (RBAC), global permissions, and SSO domain identity",
          "vCenter Server High Availability (VCHA) and file-based backups",
        ],
      },
      {
        module: "Module 3",
        title: "Virtual Networking (vSphere Standard & Distributed Switches)",
        topics: [
          "Standard Switches (vSS) vs. Distributed Switches (vDS)",
          "VMkernel adapters, port groups, VLAN tagging policies (VST/EST), and MTU sizing",
          "NIC teaming, load balancing algorithms, and failover detection",
          "Network I/O Control (NIOC) and traffic shaping policies",
        ],
      },
      {
        module: "Module 4",
        title: "Enterprise Storage & VMware vSAN",
        topics: [
          "Datastore types: VMFS-6, NFS 4.1, iSCSI, and Virtual Volumes (vVols)",
          "VMware vSAN architecture: Disk groups, cache vs. capacity tier",
          "Storage Policies (SPBM): RAID-1 mirroring vs. RAID-5/6 erasure coding",
          "Storage DRS and datastore clustering for automated disk rebalancing",
        ],
      },
      {
        module: "Module 5",
        title: "Cluster Scalability & Business Continuity (HA / DRS / FT)",
        topics: [
          "vSphere High Availability (HA): Master/slave election, heartbeat datastores, admission control",
          "Distributed Resource Scheduler (DRS): Migration thresholds and affinity/anti-affinity rules",
          "vSphere Fault Tolerance (FT) for zero-downtime mission-critical workloads",
          "vSphere vMotion and Storage vMotion live migration mechanisms",
        ],
      },
      {
        module: "Module 6",
        title: "Lifecycle Manager (vLCM), Monitoring & VCP Exam Prep",
        topics: [
          "vSphere Lifecycle Manager (vLCM) cluster image management and baselines",
          "ESXi host upgrades, VM hardware compatibility upgrades, and VMware Tools",
          "Performance monitoring (CPU, memory, storage latency) and custom alarm definitions",
          "Full 70-question 2V0-21.23 mock exams with deep question review",
        ],
      },
    ],
    faqs: [
      {
        q: "Is VMware VCP-DCV 2024 aligned with vSphere 8?",
        a: "Yes! Our entire course and lab infrastructure are built on the latest VMware vSphere 8.x release, covering modern DPUs, vSAN 8 Express Storage Architecture (ESA), and vLCM.",
      },
      {
        q: "What is the passing score for the 2V0-21.23 exam?",
        a: "The passing score is 300 on a scaled range from 100 to 500. You have 135 minutes to answer 70 questions.",
      },
      {
        q: "Do I get remote lab access?",
        a: "Yes, you receive dedicated 24/7 cloud datacenter lab access with full nested virtualization to spin up ESXi hosts, clusters, and vSAN datastores.",
      },
      {
        q: "What job opportunities open with VCP-DCV?",
        a: "VCP-DCV is one of the highest-paying enterprise infrastructure credentials, qualifying you for roles such as Senior Virtualization Engineer, Cloud Infrastructure Architect, and Systems Admin.",
      },
    ],
  },
  cbap: {
    id: "cbap",
    title: "Certified Business Analysis Professional (CBAP®)",
    shortName: "CBAP®",
    vendor: "International Institute of Business Analysis (IIBA®)",
    examCode: "IIBA-CBAP (BABOK® Guide v3)",
    examDuration: "3.5 Hours (210 Minutes)",
    examQuestions: "120 Case-Study & Scenario Questions",
    passingScore: "IIBA Psychometrically Scaled Score",
    deliveryFormat: "Remote Proctored via PSI / Prometric",
    duration: "7 Weeks",
    mode: "Case-Study Intensive Masterclass",
    targetRoles: [
      "Senior Business Analyst",
      "Lead Enterprise Analyst",
      "Principal Business Architect",
      "Product Owner / Strategic Consultant",
    ],
    prerequisites:
      "7,500 hours of business analysis work history across the last 10 years, including minimum hours in at least 4 of the 6 BABOK knowledge areas.",
    summary:
      "The premier global credential for senior business analysis practitioners. Thoroughly aligned with the IIBA BABOK® Guide v3 across all 6 Knowledge Areas, strategic analysis, requirement lifecycles, enterprise elicitation, and complex case-study evaluation.",
    curriculum: [
      {
        module: "Module 1",
        title: "BABOK® v3 Key Concepts & Business Analysis Planning",
        topics: [
          "The Business Analysis Core Concept Model (BACCM™)",
          "Plan business analysis approach: predictive vs. adaptive",
          "Plan stakeholder engagement, RACI matrix, and communication channels",
          "Plan business analysis governance and requirements management strategy",
        ],
      },
      {
        module: "Module 2",
        title: "Elicitation & Collaboration",
        topics: [
          "Prepare for elicitation: collaborative vs. research techniques",
          "Conducting elicitation workshops, interviews, focus groups, and observation",
          "Confirming elicitation results and identifying unstated stakeholder needs",
          "Managing stakeholder engagement and cross-functional conflict resolution",
        ],
      },
      {
        module: "Module 3",
        title: "Requirements Life Cycle Management",
        topics: [
          "Traceability matrices, dependencies, and requirement relationships",
          "Maintaining requirements for reuse and regulatory consistency",
          "Prioritizing requirements using MoSCoW, Timeboxing, and Weighted Scoring",
          "Assessing requirement changes and impact analysis across systems",
        ],
      },
      {
        module: "Module 4",
        title: "Strategy Analysis & Enterprise Needs",
        topics: [
          "Analyze current enterprise state, organizational capabilities, and pain points",
          "Define future state, measurable business goals, and success metrics",
          "Assess risks, tolerance levels, and mitigation strategies",
          "Define change strategy, feasibility studies, and business cases",
        ],
      },
      {
        module: "Module 5",
        title: "Requirements Analysis & Design Definition (RADD)",
        topics: [
          "Specify and model requirements: Use cases, user stories, process flows (BPMN), data models",
          "Verify requirements quality (characteristics of good requirements)",
          "Validate requirements alignment with business objectives and ROI",
          "Define design options, solution architectural components, and trade-offs",
        ],
      },
      {
        module: "Module 6",
        title: "Solution Evaluation & Case-Study Simulator",
        topics: [
          "Measure solution performance against defined KPIs and targets",
          "Analyze performance data to identify operational variances and bottlenecks",
          "Assess enterprise and solution limitations preventing value realization",
          "120-question timed case study simulations with complex multi-page scenarios",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I receive the 35 Professional Development (PD) hours needed for CBAP?",
        a: "Yes! JSTechnoHub issues an official 35 Contact Hours Certificate that satisfies the mandatory IIBA educational requirement.",
      },
      {
        q: "What if my application is audited by IIBA?",
        a: "We provide complete 1-on-1 application review and audit clearance assistance. We help you map your project experience to BABOK knowledge areas and prepare signature packages.",
      },
      {
        q: "What makes CBAP different from CCBA or ECBA?",
        a: "ECBA is entry-level with no experience required; CCBA is intermediate (3,750 hours); CBAP is the senior elite credential requiring 7,500 hours, tested through complex scenario case studies.",
      },
      {
        q: "How difficult are the case study questions?",
        a: "CBAP questions feature 1-2 page business cases followed by multiple complex analytical questions. Our course focuses intensively on case analysis frameworks and time management.",
      },
    ],
  },
  "cams-training": {
    id: "cams-training",
    title: "Certified Anti-Money Laundering Specialist (CAMS®)",
    shortName: "CAMS®",
    vendor: "Association of Certified Anti-Money Laundering Specialists (ACAMS®)",
    examCode: "ACAMS-CAMS (6th Edition Exam)",
    examDuration: "3.5 Hours (210 Minutes)",
    examQuestions: "120 Multiple Choice Questions",
    passingScore: "75 / 120 (Approx. 62.5%)",
    deliveryFormat: "Pearson VUE (Online Proctored or Test Center)",
    duration: "6 Weeks",
    mode: "Compliance Regulatory Masterclass",
    targetRoles: [
      "AML Compliance Officer",
      "Financial Crime Analyst",
      "Regulatory Risk Manager",
      "Sanctions & Fraud Investigator",
    ],
    prerequisites:
      "40 qualifying eligibility credits based on education, professional experience, and certifications (assessed by ACAMS).",
    summary:
      "The undisputed global benchmark in financial crime detection and regulatory compliance. Master FATF 40 recommendations, customer due diligence (CDD/EDD), trade-based money laundering, sanctions screening (OFAC/UN/EU), and transaction monitoring investigations.",
    curriculum: [
      {
        module: "Module 1",
        title: "Risks and Methods of Money Laundering and Terrorism Financing",
        topics: [
          "The three stages of money laundering: Placement, Layering, and Integration",
          "Vulnerabilities in banking: Correspondent banking, private banking, wire transfers",
          "Non-bank financial institutions: MSBs, casinos, insurance, securities brokers",
          "Trade-Based Money Laundering (TBML), black market peso exchanges, and real estate risks",
        ],
      },
      {
        module: "Module 2",
        title: "International AML/CFT Compliance Standards",
        topics: [
          "The Financial Action Task Force (FATF) 40 Recommendations and FATF-Style Regional Bodies",
          "The Basel Committee guidance on customer due diligence and consolidated KYC",
          "The Wolfsberg Group principles on correspondent and private banking",
          "European Union Directives (4th, 5th, 6th AMLD) and USA PATRIOT Act extraterritorial reach",
        ],
      },
      {
        module: "Module 3",
        title: "Anti-Money Laundering Compliance Programs",
        topics: [
          "The four essential pillars of an AML/CFT compliance program",
          "Enterprise-wide AML risk assessment methodology and risk appetite definition",
          "Customer Due Diligence (CDD) and Enhanced Due Diligence (EDD) frameworks",
          "Independent audit, compliance officer governance, and ongoing employee training",
        ],
      },
      {
        module: "Module 4",
        title: "Sanctions, PEPs & Watchlist Screening",
        topics: [
          "Global sanctions regimes: OFAC (SDN List), United Nations Security Council, European Union",
          "Politically Exposed Persons (PEPs) risk categorization and source of wealth verification",
          "Sanctions evasion techniques, nested accounts, and beneficial ownership transparency",
          "Watchlist filtering systems, tuning algorithms, and false positive reduction",
        ],
      },
      {
        module: "Module 5",
        title: "Transaction Monitoring & Suspicious Activity Reporting",
        topics: [
          "Automated rule-based and behavioral transaction monitoring scenarios",
          "Red flags in retail, corporate, international trade, and cryptocurrency transactions",
          "Suspicious Activity Report (SAR) / Suspicious Transaction Report (STR) decision frameworks",
          "Tipping-off prohibitions and safe harbor protections for reporting entities",
        ],
      },
      {
        module: "Module 6",
        title: "Conducting & Supporting Financial Investigations",
        topics: [
          "Internal investigation workflows, interview techniques, and document preservation",
          "Responding to law enforcement subpoenas, search warrants, and freezing orders",
          "Mutual Legal Assistance Treaties (MLATs) and Egmont Group FIU-to-FIU information sharing",
          "Complete timed 120-question CAMS practice exam simulations with score analysis",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the passing criteria for CAMS?",
        a: "To pass the CAMS exam, you must score at least 75 correct answers out of 120 multiple choice questions (approx. 62.5%).",
      },
      {
        q: "How do I calculate my 40 eligibility credits for ACAMS?",
        a: "Credits are earned through university degrees (Bachelors = 20, Masters = 30), professional experience (10 per year), and existing certifications. Our advisors verify your credit tally for free before you enroll.",
      },
      {
        q: "What industries demand CAMS certification?",
        a: "Commercial banks, fintech startups, investment firms, crypto exchanges, regulatory authorities, and Big 4 advisory firms actively seek CAMS-certified professionals.",
      },
      {
        q: "Does the course provide practice questions?",
        a: "Yes! You gain access to over 500 scenario-based questions that closely mirror the tone, complexity, and trick questions of the official ACAMS exam.",
      },
    ],
  },
  "cia-training": {
    id: "cia-training",
    title: "Certified Internal Auditor (CIA®)",
    shortName: "CIA®",
    vendor: "The Institute of Internal Auditors (IIA®)",
    examCode: "IIA-CIA (Parts 1, 2, 3)",
    examDuration: "Part 1: 150 Mins | Parts 2 & 3: 120 Mins each",
    examQuestions: "Part 1: 125 Qs | Parts 2 & 3: 100 Qs each",
    passingScore: "600 Scaled Points (on a 250 - 750 scale)",
    deliveryFormat: "Pearson VUE (Online Proctored or Test Center)",
    duration: "Modular 8 - 12 Weeks",
    mode: "Structured Interactive Cohort",
    targetRoles: [
      "Internal Audit Manager",
      "Senior Internal Auditor",
      "Enterprise Risk Assurance Lead",
      "Governance & Compliance Director",
    ],
    prerequisites:
      "Bachelor's degree or higher (or equivalent work experience), proof of identification, and character reference verified by IIA.",
    summary:
      "The premier globally recognized certification for internal auditors. Master the International Professional Practices Framework (IPPF), internal control frameworks (COSO), fraud risk assessments, audit engagement execution, and strategic business IT governance.",
    curriculum: [
      {
        module: "Module 1",
        title: "Part 1: Foundations of Internal Auditing & IPPF Standards",
        topics: [
          "Mandatory Guidance: Core Principles, Definition of Internal Auditing, Code of Ethics",
          "International Standards for the Professional Practice of Internal Auditing (IPPF)",
          "Internal audit charter, organizational independence, and reporting to the Board",
          "Quality Assurance and Improvement Program (QAIP) internal and external assessments",
        ],
      },
      {
        module: "Module 2",
        title: "Part 1: Governance, Risk Management & Control Frameworks",
        topics: [
          "Corporate governance concepts and three lines of defense model",
          "COSO Internal Control - Integrated Framework: 5 components & 17 principles",
          "Enterprise Risk Management (ERM) frameworks (COSO ERM / ISO 31000)",
          "Fraud risk identification, red flags, controls, and forensic investigation roles",
        ],
      },
      {
        module: "Module 3",
        title: "Part 2: Managing the Internal Audit Function",
        topics: [
          "Developing a dynamic risk-based internal audit plan",
          "Resource management: Staffing, competence, co-sourcing, and budgeting",
          "Coordination with external assurance providers and regulatory examiners",
          "Periodic reporting to senior management and audit committee",
        ],
      },
      {
        module: "Module 4",
        title: "Part 2: Performing the Audit Engagement",
        topics: [
          "Engagement planning: Objectives, scope, criteria, and audit work programs",
          "Information gathering, analytical procedures, and statistical audit sampling",
          "Audit workpapers documentation, supervisory review, and evidence retention",
          "Engagement communications: Exit meetings, draft reports, and follow-up monitoring",
        ],
      },
      {
        module: "Module 5",
        title: "Part 3: Business Acumen & Information Security",
        topics: [
          "Strategic management, industry structures, and competitive analysis (Porter's 5 Forces)",
          "Organizational behavior, leadership styles, and performance management",
          "Information security controls, access management, encryption, and cyber threats",
          "Business continuity planning, disaster recovery, and IT general controls (ITGC)",
        ],
      },
      {
        module: "Module 6",
        title: "Part 3: Financial Management & Accounting Concepts",
        topics: [
          "Financial accounting essentials: Balance sheet, income statement, cash flows",
          "Finance principles: Working capital, capital budgeting, and ratio analysis",
          "Managerial accounting: Cost behavior, variance analysis, and budgeting techniques",
          "Part 1, 2, and 3 timed mock exams with detailed rationales",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I take the CIA parts in any order?",
        a: "Yes! Candidates can take Part 1, Part 2, and Part 3 in whichever sequence they prefer, although taking Part 1 first is widely recommended.",
      },
      {
        q: "What is the validity window to complete all three parts?",
        a: "Candidates have up to 3 years from the date of application approval by IIA to pass all three exam parts.",
      },
      {
        q: "How does JSTechnoHub support CIA exam preparation?",
        a: "We provide comprehensive topic-by-topic breakdowns, IIA IPPF standard explanations, question bank software with over 2,500 questions, and experience verification guidance.",
      },
      {
        q: "What is the passing score for each part?",
        a: "The passing score is 600 points on a scaled score range of 250 to 750 across all parts.",
      },
    ],
  },
  "capm-training": {
    id: "capm-training",
    title: "Certified Associate in Project Management (CAPM®)",
    shortName: "CAPM®",
    vendor: "Project Management Institute (PMI®)",
    examCode: "PMI-CAPM (PMBOK® 7 & Agile)",
    examDuration: "3 Hours (180 Minutes)",
    examQuestions: "150 Questions (MCQs + Drag & Drop)",
    passingScore: "PMI Psychometrically Scaled Score",
    deliveryFormat: "Pearson VUE (Online Proctored or Test Center)",
    duration: "4 Weeks",
    mode: "Live Weekend Fast-Track",
    targetRoles: [
      "Associate Project Manager",
      "Junior Project Coordinator",
      "Project Management Office (PMO) Analyst",
      "Engineering Team Lead",
    ],
    prerequisites:
      "Secondary degree (high school diploma, associate's degree, or global equivalent) and 23 contact hours of formal project management education (provided by this course).",
    summary:
      "Accelerate your career into project management. Master PMBOK® Guide 7th Edition performance domains, traditional predictive waterfall frameworks, Agile/Scrum ceremonies, and business analysis essentials. Fulfill your mandatory 23 contact hours.",
    curriculum: [
      {
        module: "Module 1",
        title: "Project Management Fundamentals & Core Concepts",
        topics: [
          "Projects vs. Operations, program and portfolio management overview",
          "Project life cycles (Predictive, Iterative, Incremental, Adaptive)",
          "Project Manager roles, interpersonal skills, and leadership styles",
          "Project environment, organizational structures, and enterprise environmental factors (EEFs)",
        ],
      },
      {
        module: "Module 2",
        title: "Predictive / Plan-Based Methodologies",
        topics: [
          "Project charter development and stakeholder identification",
          "Scope management: Requirements documentation and Work Breakdown Structure (WBS)",
          "Schedule management: Critical Path Method (CPM), float calculation, Gantt charts",
          "Cost management: Earned Value Management (EVM metrics: CV, SV, CPI, SPI)",
        ],
      },
      {
        module: "Module 3",
        title: "Adaptive & Agile Frameworks",
        topics: [
          "The Agile Manifesto principles and values",
          "Scrum framework: Product Owner, Scrum Master, Developers, Sprints, Backlogs",
          "Scrum ceremonies: Sprint Planning, Daily Standup, Sprint Review, Retrospective",
          "Kanban boards, Work-In-Progress (WIP) limits, velocity, and burn-down charts",
        ],
      },
      {
        module: "Module 4",
        title: "Business Analysis Frameworks for Project Managers",
        topics: [
          "Role of the Business Analyst in projects and stakeholder collaboration",
          "Needs assessment, problem statements, and business cases",
          "Requirements elicitation techniques, prototypes, and user stories",
          "Traceability, acceptance criteria, and Definition of Done (DoD)",
        ],
      },
      {
        module: "Module 5",
        title: "Risk, Quality & Procurement Management",
        topics: [
          "Quality planning, assurance vs. quality control metrics",
          "Risk management: Risk registers, qualitative/quantitative risk analysis, response strategies",
          "Procurement types: Fixed-price, cost-reimbursable, time & materials",
          "Communications planning and stakeholder engagement strategies",
        ],
      },
      {
        module: "Module 6",
        title: "Exam Readiness & Full-Length Mock Simulators",
        topics: [
          "PMI CAPM examination content outline (ECO) weightages",
          "Answering situational, formula-based, and drag-and-drop question types",
          "Timed 150-question mock assessments with instant answer explanations",
          "PMI exam application guidance and verification walkthrough",
        ],
      },
    ],
    faqs: [
      {
        q: "Does this course satisfy the 23 contact hours required for CAPM?",
        a: "Yes! Upon completion of our training, you receive an authorized 23 Contact Hours Certificate that satisfies PMI's eligibility requirement.",
      },
      {
        q: "What is the difference between CAPM and PMP?",
        a: "CAPM is an entry-level credential requiring 0 months of professional project experience (only 23 education hours). PMP requires 36 to 60 months of proven project leadership experience.",
      },
      {
        q: "Is the CAPM exam based on the PMBOK 7th edition?",
        a: "Yes! The current CAPM exam reflects the PMBOK Guide 7th Edition, Process Groups Practice Guide, and the Agile Practice Guide.",
      },
      {
        q: "How many questions are on the CAPM exam?",
        a: "The exam consists of 150 questions (135 scored, 15 pre-test) to be completed within 180 minutes.",
      },
    ],
  },
  pmp: {
    id: "pmp",
    title: "Project Management Professional (PMP)® Certification",
    shortName: "PMP",
    vendor: "Project Management Institute (PMI®)",
    examCode: "PMI® PMP ECO 2026 / PMBOK 7th Ed.",
    examDuration: "230 Minutes",
    examQuestions: "180 Multiple Choice & Situational Questions",
    passingScore: "Above Target across People, Process & Business Environment",
    deliveryFormat: "Pearson VUE (Online Proctored or In-Person Test Center)",
    duration: "8 Weeks (35 Contact Hours Included)",
    mode: "Live Interactive Cohort + 1,500+ Practice Exam Questions",
    targetRoles: [
      "Project Manager",
      "Senior Project Lead",
      "Program & Portfolio Manager",
      "Scrum Master / Agile Project Manager",
      "IT Project Delivery Manager",
      "Operations & Engineering Lead",
    ],
    prerequisites:
      "A 4-year degree + 36 months of project leadership experience, OR High School Diploma + 60 months experience, PLUS 35 mandatory formal Contact Hours (included in our program).",
    overview:
      "The Project Management Professional (PMP)® is the world's gold standard credential for project leaders. JSTechnoHub's PMI® Authorized PMP course equips you with mastery over Predictive (Waterfall), Agile, and Hybrid frameworks, modern Gen AI project management workflows, and provides 35 formal Contact Hours alongside 100% PMI® application audit clearance support.",
    modules: [
      {
        title: "Module 1: Creating a High-Performing Team (People Domain)",
        topics: [
          "Building and organizing project teams, defining ground rules, and negotiating project agreements",
          "Empowering team members and stakeholders with appropriate training and mentorship",
          "Engaging remote/hybrid virtual teams and implementing conflict management strategies",
          "Collaboration tools, emotional intelligence (EQ), and servant leadership principles",
        ],
      },
      {
        title: "Module 2: Starting & Managing the Project (Process Domain)",
        topics: [
          "Determining project methodology: Predictive, Agile (Scrum/Kanban), or Hybrid lifecycle",
          "Planning and managing scope, Work Breakdown Structure (WBS), and product backlog grooming",
          "Schedule management, critical path method (CPM), and earned value management (EVM: SPI/CPI)",
          "Budget and resource forecasting, procurement planning, and quality metrics",
        ],
      },
      {
        title: "Module 3: Project Risk, Quality & Governance (Process Domain)",
        topics: [
          "Risk identification, qualitative & quantitative risk analysis, and contingency reserve management",
          "Quality assurance, continuous improvement protocols, and acceptance criteria verification",
          "Managing project changes, change control board (CCB), and milestone stage-gate reviews",
          "Project artifacts management, closure procedures, and lessons learned registers",
        ],
      },
      {
        title: "Module 4: Keeping the Business in Mind (Business Environment Domain)",
        topics: [
          "Evaluating project compliance, security protocols, and regulatory requirements",
          "Aligning project deliverables with strategic business objectives and organizational goals",
          "Evaluating and delivering organizational benefits, ROI, and value realization metrics",
          "Managing external business environment changes and enterprise environmental factors (EEFs)",
        ],
      },
      {
        title: "Module 5: Gen AI Prompting & Automation for Modern PMs",
        topics: [
          "Using AI prompts to draft project charters, scope statements, and stakeholder communication plans",
          "Automating risk logs, sprint velocity tracking, and status reporting with LLMs",
          "AI-driven scenario simulation and schedule compression techniques (Crashing & Fast-Tracking)",
        ],
      },
      {
        title: "Module 6: PMI® Application Audit & 1,500+ Situational Mock Prep",
        topics: [
          "1-on-1 personalized review of your PMI® application experience descriptions",
          "100% Audit clearance guarantee with pre-verified employer documentation templates",
          "Timed full-length mock exams simulating Pearson VUE interface with deep situational question reviews",
        ],
      },
    ],
    whyChooseUs: [
      "Authorized 35 Contact Hours Verifiable Certificate satisfying PMI® examination eligibility",
      "1,500+ realistic situational mock exam questions aligned with the latest PMP® ECO 2026",
      "Dedicated 1-on-1 Mentor application audit support with 100% clearance guarantee",
      "Exclusive Gen AI project management prompting toolkit included at no extra cost",
      "98.4% first-attempt pass rate with lifetime access to session recordings and PMBOK 7th Ed. mind maps",
    ],
    faqs: [
      {
        q: "What is PMP® certification and why is it recognized globally?",
        a: "The Project Management Professional (PMP)® is the world's most prestigious project management credential issued by PMI®. Certified project managers earn on average 16% to 32% higher salaries worldwide and lead high-impact initiatives across Fortune 500 organizations.",
      },
      {
        q: "Does this course provide the 35 Contact Hours required by PMI®?",
        a: "Yes! JSTechnoHub issues an official, verifiable 35 Contact Hours Certificate immediately upon training completion, which is 100% accepted by PMI® for your exam application.",
      },
      {
        q: "How does JSTechnoHub guarantee 100% audit clearance?",
        a: "If your application is selected for random PMI® audit, our certified mentor team directly reviews your documentation, experience logs, and supervisor signature forms to ensure complete compliance within 48 hours.",
      },
      {
        q: "What is the PMP® exam format in 2026?",
        a: "The exam consists of 180 questions (multiple-choice, multiple-response, drag-and-drop, hotspot) within 230 minutes, with two optional 10-minute breaks. It covers 42% People, 50% Process, and 8% Business Environment.",
      },
      {
        q: "What if I do not pass on my first attempt?",
        a: "We offer an Exam Pass Guarantee: you receive complimentary access to attend subsequent live cohorts, mentor doubt-clearing sessions, and updated mock exams until you are certified.",
      },
    ],
  },
};

// Aliases mapping so users accessing /certifications/salesforce or /certifications/cams get routed seamlessly
const ALIAS_MAP = {
  salesforce: "sales-force",
  "sales-force": "sales-force",
  ccna: "ccna",
  "palo-alto": "palo-alto",
  paloalto: "palo-alto",
  vmware: "vmware",
  cbap: "cbap",
  "cams-training": "cams-training",
  cams: "cams-training",
  "cia-training": "cia-training",
  cia: "cia-training",
  "capm-training": "capm-training",
  capm: "capm-training",
  pmp: "pmp",
  "pmp-certification": "pmp",
  "pmp-training": "pmp",
};

export default function CertificationsPage() {
  const { certId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    batchPreference: "Weekend Interactive Live Cohort",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const resolvedKey = ALIAS_MAP[certId] || certId;
  const certData = CERT_CATALOG[resolvedKey];

  // Fallback title if custom ID is passed
  const fallbackTitle = (certId || "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const displayTitle = certData ? certData.title : `${fallbackTitle} Training Program`;
  const displayVendor = certData ? certData.vendor : "Industry Accredited";
  const displayExamCode = certData ? certData.examCode : "Standard Blueprint";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus("error_name");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus("error_email");
      return;
    }
    if (!isValidPhoneNumber(formData.phone)) {
      setStatus("error_phone");
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    const enquiryPayload = {
      ...formData,
      certificationName: displayTitle,
      source: `Certification Detail - ${certId}`,
    };

    try {
      await submitCertificationEnquiry(enquiryPayload);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        batchPreference: "Weekend Interactive Live Cohort",
        message: "",
      });
    } catch (err) {
      console.error("Error submitting enquiry:", err);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cd-page">
      {/* ── Executive Hero ── */}
      <section className="cd-hero">
        <div className="cd-container">
          <div className="cd-breadcrumb">
            <Link to="/">Home</Link>
            <span className="crumb-sep">/</span>
            <Link to="/certifications">Certifications</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">{certData ? certData.shortName : fallbackTitle}</span>
          </div>

          <div className="cd-hero-badges">
            <span className="cd-vendor-badge">
              <FaAward /> {displayVendor}
            </span>
            <span className="cd-exam-badge">
              Exam Code: <strong>{displayExamCode}</strong>
            </span>
          </div>

          <h1 className="cd-hero-title">{displayTitle}</h1>

          <p className="cd-hero-subtitle">
            {certData
              ? certData.summary
              : `Fast-track your ${fallbackTitle} credential with authorized preparation, authentic mock exam simulators, and certified industry mentors.`}
          </p>

          <div className="cd-hero-pills">
            <div className="cd-pill">
              <FaClock className="cd-pill-icon" />
              <span>Duration: <strong>{certData ? certData.duration : "6 Weeks"}</strong></span>
            </div>
            <div className="cd-pill">
              <FaLaptopCode className="cd-pill-icon" />
              <span>Delivery: <strong>{certData ? certData.mode : "Live Interactive Cohort"}</strong></span>
            </div>
            <div className="cd-pill">
              <FaShieldAlt className="cd-pill-icon" />
              <span>Audit Clearance: <strong>100% Guaranteed</strong></span>
            </div>
            <div className="cd-pill">
              <FaStar className="cd-pill-icon cd-star" />
              <span>Pass Rate: <strong>98.4% First-Attempt</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Command Grid (Content + Sticky Form) ── */}
      <section className="cd-main-section">
        <div className="cd-container cd-grid">
          {/* Left Column: Academic & Technical Blueprint */}
          <div className="cd-content-col">
            {/* 1. Overview */}
            <div className="cd-card">
              <h2 className="cd-sec-title">Program Overview & Executive Value</h2>
              <p className="cd-body-text">
                The <strong>{displayTitle}</strong> is a globally respected credential designed to
                validate rigorous hands-on technical competencies and strategic decision-making. At
                JSTechnoHub, our programs bridge the critical gap between academic certification and
                practical enterprise execution.
              </p>
              <div className="cd-highlights-grid">
                <div className="highlight-item">
                  <FaCheckCircle className="hl-icon" />
                  <div>
                    <strong>Official Blueprint Aligned:</strong> 100% mapped to the latest exam
                    content specifications and testing vendor domains.
                  </div>
                </div>
                <div className="highlight-item">
                  <FaCheckCircle className="hl-icon" />
                  <div>
                    <strong>1-on-1 Audit Clearance:</strong> Complete guidance on experience
                    documentation and audit submission packages.
                  </div>
                </div>
                <div className="highlight-item">
                  <FaCheckCircle className="hl-icon" />
                  <div>
                    <strong>Testing Engine Simulators:</strong> Timed practice tests mirroring the
                    exact proctored examination environment.
                  </div>
                </div>
                <div className="highlight-item">
                  <FaCheckCircle className="hl-icon" />
                  <div>
                    <strong>Fortune 500 Mentors:</strong> Interactive cohorts led by certified
                    practitioners with 10+ years of active field delivery.
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Exam Blueprint Specifications */}
            {certData && (
              <div className="cd-card">
                <h2 className="cd-sec-title">Official Exam Blueprint</h2>
                <div className="cd-specs-table">
                  <div className="spec-row">
                    <span className="spec-label">Accrediting Vendor</span>
                    <span className="spec-val">{certData.vendor}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Official Exam Code</span>
                    <span className="spec-val"><strong>{certData.examCode}</strong></span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Exam Duration</span>
                    <span className="spec-val">{certData.examDuration}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Question Format</span>
                    <span className="spec-val">{certData.examQuestions}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Passing Standard</span>
                    <span className="spec-val"><strong>{certData.passingScore}</strong></span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Testing Provider</span>
                    <span className="spec-val">{certData.deliveryFormat}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Detailed Curriculum Modules */}
            <div className="cd-card">
              <h2 className="cd-sec-title">Comprehensive Technical Syllabus</h2>
              <p className="cd-body-text">
                Structured for maximum retention and hands-on competence. Each module combines
                core theoretical foundations with real-world enterprise labs:
              </p>

              <div className="cd-modules-list">
                {(certData?.curriculum || []).map((mod, idx) => (
                  <div key={idx} className="cd-mod-item">
                    <div className="cd-mod-header">
                      <span className="cd-mod-badge">{mod.module}</span>
                      <h3 className="cd-mod-title">{mod.title}</h3>
                    </div>
                    <ul className="cd-mod-topics">
                      {mod.topics.map((t, i) => (
                        <li key={i}>
                          <span className="topic-bullet" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Career Impact & Target Roles */}
            {certData?.targetRoles && (
              <div className="cd-card">
                <h2 className="cd-sec-title">Target Roles & Career Velocity</h2>
                <p className="cd-body-text">
                  This certification is designed for ambitious professionals aiming for salary
                  advancement and specialized leadership responsibilities:
                </p>
                <div className="cd-roles-pills">
                  {certData.targetRoles.map((role, i) => (
                    <span key={i} className="cd-role-pill">
                      <FaUserTie className="role-icon" /> {role}
                    </span>
                  ))}
                </div>
                {certData.prerequisites && (
                  <div className="cd-prereq-box">
                    <strong>Prerequisites:</strong> {certData.prerequisites}
                  </div>
                )}
              </div>
            )}

            {/* 5. Frequently Asked Questions */}
            {certData?.faqs && (
              <div className="cd-card">
                <h2 className="cd-sec-title">Frequently Asked Questions</h2>
                <div className="cd-faqs-accordion">
                  {certData.faqs.map((faq, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div key={i} className={`cd-faq-row${isOpen ? " faq-open" : ""}`}>
                        <button
                          type="button"
                          className="cd-faq-q"
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          aria-expanded={isOpen}
                        >
                          <span>{faq.q}</span>
                          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                        {isOpen && <div className="cd-faq-a">{faq.a}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Executive Enquiry & Enrollment Form */}
          <aside className="cd-sidebar-col">
            <div className="cd-enquiry-card">
              <div className="cd-form-header">
                <span className="cd-form-badge">ENROLLMENT & SYLLABUS</span>
                <h3>Enroll or Request Syllabus</h3>
                <p>
                  Receive the complete day-by-day curriculum, upcoming weekend batch schedule, and
                  special tuition pricing.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="cd-form">
                <div className="cd-field">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="cd-field">
                  <label htmlFor="email">Work Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="cd-field">
                  <PhoneInputField
                    name="phone"
                    label="WhatsApp / Mobile Number *"
                    value={formData.phone}
                    onChange={(val) => setFormData((p) => ({ ...p, phone: val }))}
                    required
                  />
                </div>

                <div className="cd-field">
                  <label htmlFor="batchPreference">Preferred Batch Format</label>
                  <select
                    id="batchPreference"
                    name="batchPreference"
                    value={formData.batchPreference}
                    onChange={handleChange}
                  >
                    <option value="Weekend Interactive Live Cohort">
                      Weekend Interactive Live Cohort (Sat & Sun)
                    </option>
                    <option value="Weekday Evening Fast-Track">
                      Weekday Evening Fast-Track (Mon - Thu)
                    </option>
                    <option value="1-on-1 Executive Mentorship">
                      1-on-1 Dedicated Executive Mentorship
                    </option>
                    <option value="Self-Paced with Mentor Reviews">
                      Self-Paced with Weekly Mentor Check-ins
                    </option>
                  </select>
                </div>

                <div className="cd-field">
                  <label htmlFor="message">Questions or Career Goals</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    placeholder="Tell us about your background or target exam month..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-cd-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting Request..." : "Request Syllabus & Batch Info →"}
                </button>
              </form>

              {/* Status Notifications */}
              {status === "success" && (
                <div className="cd-alert cd-alert-success">
                  <FaCheckCircle />
                  <div>
                    <strong>Request received successfully!</strong> A Senior Program Advisor will
                    reach out on WhatsApp/Email within 24 hours with your syllabus and schedule.
                  </div>
                </div>
              )}
              {status === "error_name" && (
                <div className="cd-alert cd-alert-error">
                  Please enter your valid full name (minimum 2 characters).
                </div>
              )}
              {status === "error_email" && (
                <div className="cd-alert cd-alert-error">
                  Please provide a valid work email address.
                </div>
              )}
              {status === "error_phone" && (
                <div className="cd-alert cd-alert-error">
                  Please provide a valid WhatsApp number with country code.
                </div>
              )}
              {status === "error" && (
                <div className="cd-alert cd-alert-error">
                  Server connectivity error. Please connect directly via WhatsApp below.
                </div>
              )}

              {/* Trust & WhatsApp Support Box */}
              <div className="cd-trust-footer">
                <div className="trust-row">
                  <FaShieldAlt className="t-icon" />
                  <span>100% Privacy Protected · Zero Spam Guarantee</span>
                </div>
                <div className="trust-row">
                  <FaClock className="t-icon" />
                  <span>24-Hour Response by Technical Mentors</span>
                </div>

                <div className="cd-direct-wa">
                  <span>Need an immediate answer?</span>
                  <a
                    href="https://wa.me/919999999999?text=Hello%20JSTechnoHub%20I%20am%20interested%20in%20Certification%20Training"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-wa-direct"
                  >
                    <FaWhatsapp /> Chat with Advisor on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
