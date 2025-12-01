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
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    salary: '$120,000 - $160,000',
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
      '401(k) matching',
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
    salary: '$80,000 - $110,000',
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
    company: 'InnovateLabs',
    location: 'New York, NY',
    salary: '$100,000 - $150,000',
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
      '401(k) with company match',
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
    location: 'Austin, TX',
    salary: '$90,000 - $130,000',
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
    location: 'Los Angeles, CA',
    salary: '$85,000 - $120,000',
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
    location: 'Seattle, WA',
    salary: '$110,000 - $150,000',
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
    salary: '$95,000 - $135,000',
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
    location: 'Chicago, IL',
    salary: '$60,000 - $90,000 + Commission',
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
    location: 'Boston, MA',
    salary: '$100,000 - $140,000',
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
    salary: '$50,000 - $70,000',
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
    initials: 'SJ',
    name: 'Sarah Johnson',
    position: 'Senior Frontend Developer',
    applicationDate: '2024-11-20',
    status: 'New',
    email: 'sarah.johnson@example.com',
    department: 'Engineering',
    location: 'San Francisco, CA',
    experience: '8 years',
    phone: '+1 (415) 555-0123',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    education: 'BS Computer Science - Stanford University'
  },
  {
    id: 2,
    initials: 'MC',
    name: 'Michael Chen',
    position: 'UX Designer',
    applicationDate: '2024-11-19',
    status: 'Screening',
    email: 'michael.chen@example.com',
    department: 'Design',
    location: 'Remote',
    experience: '5 years',
    phone: '+1 (650) 555-0456',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    education: 'MFA Design - RISD'
  },
  {
    id: 3,
    initials: 'ER',
    name: 'Emily Rodriguez',
    position: 'Product Manager',
    applicationDate: '2024-11-18',
    status: 'Interview',
    email: 'emily.rodriguez@example.com',
    department: 'Product',
    location: 'Austin, TX',
    experience: '6 years',
    phone: '+1 (512) 555-0789',
    skills: ['Agile', 'Product Strategy', 'Data Analysis', 'Roadmapping'],
    education: 'MBA - Harvard Business School'
  },
  {
    id: 4,
    initials: 'DW',
    name: 'David Wang',
    position: 'Backend Developer',
    applicationDate: '2024-11-17',
    status: 'Screening',
    email: 'david.wang@example.com',
    department: 'Engineering',
    location: 'Seattle, WA',
    experience: '4 years',
    phone: '+1 (206) 555-0234',
    skills: ['Python', 'PostgreSQL', 'AWS', 'Docker'],
    education: 'BS Software Engineering - MIT'
  },
  {
    id: 5,
    initials: 'AL',
    name: 'Amanda Lee',
    position: 'Data Analyst',
    applicationDate: '2024-11-16',
    status: 'New',
    email: 'amanda.lee@example.com',
    department: 'Data',
    location: 'New York, NY',
    experience: '3 years',
    phone: '+1 (212) 555-0567',
    skills: ['SQL', 'Python', 'Tableau', 'Excel'],
    education: 'MS Data Science - Columbia University'
  },
  {
    id: 6,
    initials: 'JB',
    name: 'James Brown',
    position: 'Marketing Manager',
    applicationDate: '2024-11-15',
    status: 'Hired',
    email: 'james.brown@example.com',
    department: 'Marketing',
    location: 'Los Angeles, CA',
    experience: '7 years',
    phone: '+1 (310) 555-0890',
    skills: ['SEO', 'Content Marketing', 'Analytics', 'Social Media'],
    education: 'BA Marketing - UCLA'
  },
  {
    id: 7,
    initials: 'LP',
    name: 'Lisa Park',
    position: 'DevOps Engineer',
    applicationDate: '2024-11-14',
    status: 'Interview',
    email: 'lisa.park@example.com',
    department: 'Operations',
    location: 'Remote',
    experience: '5 years',
    phone: '+1 (408) 555-0123',
    skills: ['Kubernetes', 'Terraform', 'CI/CD', 'Monitoring'],
    education: 'BS Computer Engineering - UC Berkeley'
  },
  {
    id: 8,
    initials: 'RT',
    name: 'Robert Taylor',
    position: 'Sales Representative',
    applicationDate: '2024-11-13',
    status: 'Screening',
    email: 'robert.taylor@example.com',
    department: 'Sales',
    location: 'Chicago, IL',
    experience: '3 years',
    phone: '+1 (312) 555-0456',
    skills: ['B2B Sales', 'Salesforce', 'Negotiation', 'Lead Generation'],
    education: 'BA Business - Northwestern University'
  },
  {
    id: 9,
    initials: 'NK',
    name: 'Nina Kumar',
    position: 'Mobile Developer',
    applicationDate: '2024-11-12',
    status: 'New',
    email: 'nina.kumar@example.com',
    department: 'Engineering',
    location: 'Boston, MA',
    experience: '4 years',
    phone: '+1 (617) 555-0789',
    skills: ['React Native', 'Swift', 'Kotlin', 'Mobile UI/UX'],
    education: 'BS Computer Science - Boston University'
  },
  {
    id: 10,
    initials: 'CM',
    name: 'Chris Martinez',
    position: 'Content Writer',
    applicationDate: '2024-11-11',
    status: 'Rejected',
    email: 'chris.martinez@example.com',
    department: 'Marketing',
    location: 'Remote',
    experience: '2 years',
    phone: '+1 (555) 555-0234',
    skills: ['Copywriting', 'SEO', 'Content Strategy', 'Editing'],
    education: 'BA Journalism - NYU'
  },
  {
    id: 11,
    initials: 'TH',
    name: 'Tina Harper',
    position: 'Data Scientist',
    applicationDate: '2024-11-10',
    status: 'Interview',
    email: 'tina.harper@example.com',
    department: 'Data Science',
    location: 'Seattle, WA',
    experience: '6 years',
    phone: '+1 (206) 555-0567',
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Statistics'],
    education: 'PhD Statistics - University of Washington'
  },
  {
    id: 12,
    initials: 'KG',
    name: 'Kevin Green',
    position: 'UI Designer',
    applicationDate: '2024-11-09',
    status: 'Screening',
    email: 'kevin.green@example.com',
    department: 'Design',
    location: 'Portland, OR',
    experience: '4 years',
    phone: '+1 (503) 555-0890',
    skills: ['UI Design', 'Animation', 'Design Systems', 'Sketch'],
    education: 'BFA Graphic Design - Art Center'
  }
];

export const MOCK_INTERVIEWS: Interview[] = [
  {
    id: 1,
    candidate: 'Sarah Johnson',
    position: 'Senior Frontend Developer',
    date: '2024-11-28',
    time: '10:00 AM',
    type: 'video',
    interviewers: ['Mike Chen', 'Sarah Wilson'],
    status: 'scheduled',
    notes: 'First round technical interview'
  },
  {
    id: 2,
    candidate: 'Emily Rodriguez',
    position: 'Product Manager',
    date: '2024-11-28',
    time: '2:00 PM',
    type: 'in-person',
    interviewers: ['David Brown', 'Lisa Zhang'],
    status: 'scheduled',
    notes: 'Final round with executives'
  },
  {
    id: 3,
    candidate: 'Lisa Park',
    position: 'DevOps Engineer',
    date: '2024-11-29',
    time: '11:30 AM',
    type: 'video',
    interviewers: ['Emma Davis'],
    status: 'scheduled',
    notes: 'Technical assessment'
  },
  {
    id: 4,
    candidate: 'Tina Harper',
    position: 'Data Scientist',
    date: '2024-11-29',
    time: '3:00 PM',
    type: 'video',
    interviewers: ['John Smith', 'Alex Johnson'],
    status: 'scheduled',
    notes: 'ML case study presentation'
  },
  {
    id: 5,
    candidate: 'Michael Chen',
    position: 'UX Designer',
    date: '2024-11-27',
    time: '10:00 AM',
    type: 'in-person',
    interviewers: ['Jane Miller'],
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
