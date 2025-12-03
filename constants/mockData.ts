/**
 * Centralized Mock Data for HireTrack
 * This file contains realistic sample data for all features
 */

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  applicants: number;
  views: number;
  status: 'active' | 'draft' | 'closed';
  department: string;
  experience: string;
}

export interface Applicant {
  id: number;
  initials: string;
  name: string;
  position: string;
  applicationDate: string;
  status: 'New' | 'Screening' | 'Interview' | 'Hired' | 'Rejected';
  email: string;
  location: string;
  experience: string;
  department: string;
  phone?: string;
  resume?: string;
  coverLetter?: string;
  skills?: string[];
  education?: string;
}

export interface Interview {
  id: number;
  candidate: string;
  position: string;
  date: string;
  time: string;
  type: 'video' | 'in-person' | 'phone';
  interviewers: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Pilipinas',
    location: 'Makati City, Manila',
    salary: '₱600,000 - ₱800,000',
    type: 'Full-time',
    description: 'We are looking for an experienced Frontend Developer to join our dynamic team. You will work on cutting-edge web applications using React, TypeScript, and modern web technologies.',
    requirements: [
      '5+ years of experience with React and TypeScript',
      'Strong understanding of web performance optimization',
      'Experience with state management (Redux, Zustand)',
      'Familiarity with testing frameworks (Jest, React Testing Library)',
      'Excellent problem-solving and communication skills'
    ],
    benefits: [
      'Health, dental, and vision insurance',
      'Unlimited PTO',
      'SSS/PhilHealth/Pag-IBIG',
      'Remote work options',
      'Professional development budget'
    ],
    postedDate: '2 days ago',
    applicants: 47,
    views: 342,
    status: 'active',
    department: 'Engineering',
    experience: '5+ years'
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'Design Studio Pro',
    location: 'Remote',
    salary: '₱400,000 - ₱550,000',
    type: 'Full-time',
    description: 'Create beautiful and intuitive user experiences for our SaaS products. Work closely with product and engineering teams to deliver exceptional designs.',
    requirements: [
      '3+ years of UX/UI design experience',
      'Proficiency in Figma and Adobe Creative Suite',
      'Strong portfolio demonstrating user-centered design',
      'Understanding of design systems and component libraries',
      'Experience with user research and testing'
    ],
    benefits: [
      'Fully remote work',
      'Flexible hours',
      'Health insurance',
      'Annual design conference budget',
      'Latest design tools and software'
    ],
    postedDate: '3 days ago',
    applicants: 28,
    views: 210,
    status: 'active',
    department: 'Design',
    experience: '3+ years'
  },
  {
    id: '3',
    title: 'Product Manager',
    company: 'InnovateLabs Philippines',
    location: 'BGC, Taguig',
    salary: '₱500,000 - ₱750,000',
    type: 'Full-time',
    description: 'Lead product strategy and roadmap planning for our flagship product. Work with cross-functional teams to deliver features that delight customers.',
    requirements: [
      '4+ years of product management experience',
      'Strong analytical and data-driven decision making',
      'Experience with agile methodologies',
      'Excellent stakeholder management skills',
      'Technical background preferred'
    ],
    benefits: [
      'Competitive salary and equity',
      'Health and wellness programs',
      'Performance bonus',
      'Parental leave',
      'Career growth opportunities'
    ],
    postedDate: '1 day ago',
    applicants: 35,
    views: 189,
    status: 'active',
    department: 'Product',
    experience: '4+ years'
  },
  {
    id: '4',
    title: 'Backend Developer',
    company: 'CloudScale Systems',
    location: 'Pasig City',
    salary: '₱450,000 - ₱650,000',
    type: 'Full-time',
    description: 'Build and maintain scalable backend services using Node.js, Python, and cloud infrastructure. Work on high-traffic applications serving millions of users.',
    requirements: [
      '3+ years of backend development experience',
      'Proficiency in Node.js or Python',
      'Experience with PostgreSQL/MongoDB',
      'Knowledge of AWS/GCP/Azure',
      'Understanding of microservices architecture'
    ],
    benefits: [
      'Competitive salary',
      'Stock options',
      'Health insurance',
      'Gym membership',
      'Learning and development budget'
    ],
    postedDate: '5 days ago',
    applicants: 42,
    views: 287,
    status: 'active',
    department: 'Engineering',
    experience: '3+ years'
  },
  {
    id: '5',
    title: 'Marketing Manager',
    company: 'GrowthHub Inc',
    location: 'Quezon City',
    salary: '₱425,000 - ₱600,000',
    type: 'Full-time',
    description: 'Drive marketing strategies to increase brand awareness and customer acquisition. Manage campaigns across multiple channels including digital, social, and content.',
    requirements: [
      '5+ years in digital marketing',
      'Experience with SEO, SEM, and social media marketing',
      'Strong analytical skills and data-driven approach',
      'Excellent copywriting and communication skills',
      'Budget management experience'
    ],
    benefits: [
      'Flexible work arrangements',
      'Performance bonuses',
      'Health and dental insurance',
      'Professional development',
      'Creative work environment'
    ],
    postedDate: '1 week ago',
    applicants: 31,
    views: 156,
    status: 'active',
    department: 'Marketing',
    experience: '5+ years'
  },
  {
    id: '6',
    title: 'Data Scientist',
    company: 'AI Innovations',
    location: 'Makati City, Manila',
    salary: '₱550,000 - ₱750,000',
    type: 'Full-time',
    description: 'Apply machine learning and statistical analysis to solve complex business problems. Work with large datasets to generate actionable insights.',
    requirements: [
      'MS or PhD in Computer Science, Statistics, or related field',
      'Strong programming skills in Python/R',
      'Experience with ML frameworks (TensorFlow, PyTorch)',
      'Expertise in statistical analysis and modeling',
      'Excellent communication skills'
    ],
    benefits: [
      'Competitive compensation',
      'Equity participation',
      'Flexible hours',
      'Research budget',
      'Conference attendance'
    ],
    postedDate: '4 days ago',
    applicants: 29,
    views: 198,
    status: 'active',
    department: 'Data Science',
    experience: '3+ years'
  },
  {
    id: '7',
    title: 'DevOps Engineer',
    company: 'Infrastructure Co',
    location: 'Remote',
    salary: '₱475,000 - ₱675,000',
    type: 'Full-time',
    description: 'Manage and optimize our cloud infrastructure. Implement CI/CD pipelines and ensure high availability of our services.',
    requirements: [
      '4+ years of DevOps experience',
      'Strong knowledge of Kubernetes and Docker',
      'Experience with AWS/GCP/Azure',
      'Proficiency in scripting (Bash, Python)',
      'Understanding of infrastructure as code (Terraform)'
    ],
    benefits: [
      'Remote-first culture',
      'Competitive salary',
      'Learning stipend',
      'Latest tools and equipment',
      'Work-life balance'
    ],
    postedDate: '3 days ago',
    applicants: 38,
    views: 224,
    status: 'active',
    department: 'Operations',
    experience: '4+ years'
  },
  {
    id: '8',
    title: 'Sales Representative',
    company: 'SalesForce Pro',
    location: 'Cebu City',
    salary: '₱300,000 - ₱450,000 + Commission',
    type: 'Full-time',
    description: 'Drive revenue growth by identifying and closing new business opportunities. Build strong relationships with clients and achieve sales targets.',
    requirements: [
      '2+ years of B2B sales experience',
      'Proven track record of meeting sales quotas',
      'Excellent communication and negotiation skills',
      'CRM experience (Salesforce preferred)',
      'Self-motivated and results-driven'
    ],
    benefits: [
      'Uncapped commission',
      'Health insurance',
      'Sales incentives and bonuses',
      'Career advancement opportunities',
      'Sales training programs'
    ],
    postedDate: '6 days ago',
    applicants: 52,
    views: 401,
    status: 'active',
    department: 'Sales',
    experience: '2+ years'
  },
  {
    id: '9',
    title: 'Mobile App Developer',
    company: 'AppWorks Studio',
    location: 'BGC, Taguig',
    salary: '₱500,000 - ₱700,000',
    type: 'Full-time',
    description: 'Develop native mobile applications for iOS and Android platforms. Collaborate with designers and backend engineers to create seamless user experiences.',
    requirements: [
      '4+ years of mobile development experience',
      'Proficiency in Swift/Kotlin or React Native',
      'Experience with mobile UI/UX best practices',
      'Knowledge of RESTful APIs',
      'Published apps in App Store/Play Store'
    ],
    benefits: [
      'Competitive salary',
      'Stock options',
      'Remote work flexibility',
      'Latest devices for testing',
      'Professional development'
    ],
    postedDate: '2 days ago',
    applicants: 33,
    views: 267,
    status: 'active',
    department: 'Engineering',
    experience: '4+ years'
  },
  {
    id: '10',
    title: 'Content Writer',
    company: 'ContentCraft Media',
    location: 'Remote',
    salary: '₱250,000 - ₱350,000',
    type: 'Full-time',
    description: 'Create engaging content for our blog, social media, and marketing materials. Research industry trends and produce high-quality articles.',
    requirements: [
      '2+ years of professional writing experience',
      'Excellent grammar and editing skills',
      'SEO knowledge',
      'Ability to write for various audiences',
      'Portfolio of published work'
    ],
    benefits: [
      'Work from anywhere',
      'Flexible schedule',
      'Health insurance',
      'Writing workshops',
      'Creative freedom'
    ],
    postedDate: '1 week ago',
    applicants: 64,
    views: 512,
    status: 'active',
    department: 'Marketing',
    experience: '2+ years'
  }
];

export const MOCK_APPLICANTS: Applicant[] = [
  {
    id: 1,
    initials: 'JAD',
    name: 'Juan Dela Cruz',
    position: 'Senior Frontend Developer',
    applicationDate: '2024-11-20',
    status: 'New',
    email: 'juan.delacruz@example.com',
    department: 'Engineering',
    location: 'Makati City, Manila',
    experience: '8 years',
    phone: '+63 (2) 5555-0123',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    education: 'BS Computer Science - UP Diliman'
  },
  {
    id: 2,
    initials: 'MRS',
    name: 'Maria Santos',
    position: 'UX Designer',
    applicationDate: '2024-11-19',
    status: 'Screening',
    email: 'maria.santos@example.com',
    department: 'Design',
    location: 'Remote',
    experience: '5 years',
    phone: '+63 (917) 555-0456',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    education: 'BFA Design - FEU Tech'
  },
  {
    id: 3,
    initials: 'APM',
    name: 'Aurora Perez Mercado',
    position: 'Product Manager',
    applicationDate: '2024-11-18',
    status: 'Interview',
    email: 'aurora.perez@example.com',
    department: 'Product',
    location: 'BGC, Taguig',
    experience: '6 years',
    phone: '+63 (998) 555-0789',
    skills: ['Agile', 'Product Strategy', 'Data Analysis', 'Roadmapping'],
    education: 'MBA - DLSU'
  },
  {
    id: 4,
    initials: 'DGM',
    name: 'Diego Garcia Mendoza',
    position: 'Backend Developer',
    applicationDate: '2024-11-17',
    status: 'Screening',
    email: 'diego.garcia@example.com',
    department: 'Engineering',
    location: 'Pasig City',
    experience: '4 years',
    phone: '+63 (921) 555-0234',
    skills: ['Python', 'PostgreSQL', 'AWS', 'Docker'],
    education: 'BS Software Engineering - Ateneo'
  },
  {
    id: 5,
    initials: 'RLP',
    name: 'Rosa Lim Paguio',
    position: 'Data Analyst',
    applicationDate: '2024-11-16',
    status: 'New',
    email: 'rosa.lim@example.com',
    department: 'Data',
    location: 'Quezon City',
    experience: '3 years',
    phone: '+63 (932) 555-0567',
    skills: ['SQL', 'Python', 'Tableau', 'Excel'],
    education: 'MS Data Science - De La Salle University'
  },
  {
    id: 6,
    initials: 'CSR',
    name: 'Carlos Sison Ramos',
    position: 'Marketing Manager',
    applicationDate: '2024-11-15',
    status: 'Hired',
    email: 'carlos.sison@example.com',
    department: 'Marketing',
    location: 'Manila',
    experience: '7 years',
    phone: '+63 (908) 555-0890',
    skills: ['SEO', 'Content Marketing', 'Analytics', 'Social Media'],
    education: 'BA Marketing - PUP'
  },
  {
    id: 7,
    initials: 'LTC',
    name: 'Lina Torres Cruz',
    position: 'DevOps Engineer',
    applicationDate: '2024-11-14',
    status: 'Interview',
    email: 'lina.torres@example.com',
    department: 'Operations',
    location: 'Remote',
    experience: '5 years',
    phone: '+63 (912) 555-0123',
    skills: ['Kubernetes', 'Terraform', 'CI/CD', 'Monitoring'],
    education: 'BS Computer Engineering - UST'
  },
  {
    id: 8,
    initials: 'RPA',
    name: 'Roberto Ponce Aquino',
    position: 'Sales Representative',
    applicationDate: '2024-11-13',
    status: 'Screening',
    email: 'roberto.ponce@example.com',
    department: 'Sales',
    location: 'Cebu City',
    experience: '3 years',
    phone: '+63 (945) 555-0456',
    skills: ['B2B Sales', 'Salesforce', 'Negotiation', 'Lead Generation'],
    education: 'BA Business - Cebu Institute of Technology'
  },
  {
    id: 9,
    initials: 'NRT',
    name: 'Nicole Reyes Torres',
    position: 'Mobile Developer',
    applicationDate: '2024-11-12',
    status: 'New',
    email: 'nicole.reyes@example.com',
    department: 'Engineering',
    location: 'BGC, Taguig',
    experience: '4 years',
    phone: '+63 (917) 555-0789',
    skills: ['React Native', 'Swift', 'Kotlin', 'Mobile UI/UX'],
    education: 'BS Computer Science - UP Los Baños'
  },
  {
    id: 10,
    initials: 'CBV',
    name: 'Christine Bonifacio Vega',
    position: 'Content Writer',
    applicationDate: '2024-11-11',
    status: 'Rejected',
    email: 'christine.bonifacio@example.com',
    department: 'Marketing',
    location: 'Remote',
    experience: '2 years',
    phone: '+63 (955) 555-0234',
    skills: ['Copywriting', 'SEO', 'Content Strategy', 'Editing'],
    education: 'BA Journalism - Adamson University'
  },
  {
    id: 11,
    initials: 'TRS',
    name: 'Teresa Reyes Santiago',
    position: 'Data Scientist',
    applicationDate: '2024-11-10',
    status: 'Interview',
    email: 'teresa.reyes@example.com',
    department: 'Data Science',
    location: 'Makati City, Manila',
    experience: '6 years',
    phone: '+63 (906) 555-0567',
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Statistics'],
    education: 'PhD Statistics - UP Diliman'
  },
  {
    id: 12,
    initials: 'KRL',
    name: 'Kevin Rosales Lopez',
    position: 'UI Designer',
    applicationDate: '2024-11-09',
    status: 'Screening',
    email: 'kevin.rosales@example.com',
    department: 'Design',
    location: 'Davao City',
    experience: '4 years',
    phone: '+63 (923) 555-0890',
    skills: ['UI Design', 'Animation', 'Design Systems', 'Sketch'],
    education: 'BFA Graphic Design - Mindanao State University'
  }
];

export const MOCK_INTERVIEWS: Interview[] = [
  {
    id: 1,
    candidate: 'Juan Dela Cruz',
    position: 'Senior Frontend Developer',
    date: '2024-11-28',
    time: '10:00 AM',
    type: 'video',
    interviewers: ['Miguel Santos', 'Patricia Wilson'],
    status: 'scheduled',
    notes: 'First round technical interview'
  },
  {
    id: 2,
    candidate: 'Aurora Perez Mercado',
    position: 'Product Manager',
    date: '2024-11-28',
    time: '2:00 PM',
    type: 'in-person',
    interviewers: ['Daniel Reyes', 'Lisa Santos'],
    status: 'scheduled',
    notes: 'Final round with executives'
  },
  {
    id: 3,
    candidate: 'Lina Torres Cruz',
    position: 'DevOps Engineer',
    date: '2024-11-29',
    time: '11:30 AM',
    type: 'video',
    interviewers: ['Emma Gonzales'],
    status: 'scheduled',
    notes: 'Technical assessment'
  },
  {
    id: 4,
    candidate: 'Teresa Reyes Santiago',
    position: 'Data Scientist',
    date: '2024-11-29',
    time: '3:00 PM',
    type: 'video',
    interviewers: ['Juan Magsino', 'Alex Fernandez'],
    status: 'scheduled',
    notes: 'ML case study presentation'
  },
  {
    id: 5,
    candidate: 'Maria Santos',
    position: 'UX Designer',
    date: '2024-11-27',
    time: '10:00 AM',
    type: 'in-person',
    interviewers: ['Jane Solis'],
    status: 'completed',
    notes: 'Portfolio review completed'
  }
];

export const ANALYTICS_DATA = {
  totalApplications: 2847,
  timeToHire: 18,
  activeJobs: 156,
  costPerHire: 1200,
  applicationsByDepartment: [
    { department: 'Engineering', count: 1248, percentage: 43.8 },
    { department: 'Design', count: 427, percentage: 15.0 },
    { department: 'Product', count: 369, percentage: 13.0 },
    { department: 'Marketing', count: 312, percentage: 11.0 },
    { department: 'Sales', count: 285, percentage: 10.0 },
    { department: 'Operations', count: 206, percentage: 7.2 }
  ],
  applicationTrends: [
    { month: 'Jun', applications: 234 },
    { month: 'Jul', applications: 298 },
    { month: 'Aug', applications: 356 },
    { month: 'Sep', applications: 412 },
    { month: 'Oct', applications: 478 },
    { month: 'Nov', applications: 521 }
  ],
  topSources: [
    { source: 'LinkedIn', applications: 987, quality: 'High' },
    { source: 'Indeed', applications: 756, quality: 'Medium' },
    { source: 'Company Website', applications: 543, quality: 'High' },
    { source: 'Referrals', applications: 342, quality: 'Very High' },
    { source: 'Job Boards', applications: 219, quality: 'Medium' }
  ]
};
