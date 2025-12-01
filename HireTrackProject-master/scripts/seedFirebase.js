/**
 * Firebase Database Seeder
 * Run this script to populate Firestore with sample data
 * 
 * Usage: node scripts/seedFirebase.js
 */

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, push, set } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyARucc8GA_qOZ4AHwIp9GckVkYohaE8VmQ",
  authDomain: "hiretrck.firebaseapp.com",
  databaseURL: "https://hiretrck-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hiretrck",
  storageBucket: "hiretrck.firebasestorage.app",
  messagingSenderId: "120314474116",
  appId: "1:120314474116:web:789e4cd7a26a6c678f5cd1",
  measurementId: "G-1SPFRP7CFD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Sample data
const positions = [
  {
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $160,000',
    experience: '5+ years',
    description: 'We are looking for an experienced Frontend Developer to join our dynamic team.',
    requirements: ['5+ years of experience with React and TypeScript', 'Strong understanding of web performance optimization'],
    benefits: ['Health, dental, and vision insurance', 'Unlimited PTO', '401(k) matching'],
    postedDate: new Date().toISOString(),
    applicants: 0,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    salary: '$80,000 - $110,000',
    experience: '3+ years',
    description: 'Create beautiful and intuitive user experiences for our SaaS products.',
    requirements: ['3+ years of UX/UI design experience', 'Proficiency in Figma and Adobe Creative Suite'],
    benefits: ['Fully remote work', 'Flexible hours', 'Health insurance'],
    postedDate: new Date().toISOString(),
    applicants: 0,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$100,000 - $150,000',
    experience: '4+ years',
    description: 'Lead product strategy and roadmap planning for our flagship product.',
    requirements: ['4+ years of product management experience', 'Strong analytical and data-driven decision making'],
    benefits: ['Competitive salary and equity', 'Health and wellness programs', 'Career growth opportunities'],
    postedDate: new Date().toISOString(),
    applicants: 0,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Backend Developer',
    department: 'Engineering',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$90,000 - $130,000',
    experience: '3+ years',
    description: 'Build and maintain scalable backend services using Node.js and Python.',
    requirements: ['3+ years of backend development experience', 'Proficiency in Node.js or Python'],
    benefits: ['Competitive salary', 'Stock options', 'Health insurance'],
    postedDate: new Date().toISOString(),
    applicants: 0,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    salary: '$85,000 - $120,000',
    experience: '5+ years',
    description: 'Drive marketing strategies to increase brand awareness and customer acquisition.',
    requirements: ['5+ years in digital marketing', 'Experience with SEO, SEM, and social media marketing'],
    benefits: ['Flexible work arrangements', 'Performance bonuses', 'Health and dental insurance'],
    postedDate: new Date().toISOString(),
    applicants: 0,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const applicants = [
  {
    initials: 'SJ',
    name: 'Sarah Johnson',
    position: 'Senior Frontend Developer',
    applicationDate: new Date('2024-11-20').toISOString(),
    status: 'New',
    email: 'sarah.johnson@example.com',
    department: 'Engineering',
    location: 'San Francisco, CA',
    experience: '8 years',
    phone: '+1 (415) 555-0123',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    education: [{ degree: 'BS Computer Science', institution: 'Stanford University', year: '2016' }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    initials: 'MC',
    name: 'Michael Chen',
    position: 'UX Designer',
    applicationDate: new Date('2024-11-19').toISOString(),
    status: 'Screening',
    email: 'michael.chen@example.com',
    department: 'Design',
    location: 'Remote',
    experience: '5 years',
    phone: '+1 (650) 555-0456',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    education: [{ degree: 'MFA Design', institution: 'RISD', year: '2019' }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    initials: 'ER',
    name: 'Emily Rodriguez',
    position: 'Product Manager',
    applicationDate: new Date('2024-11-18').toISOString(),
    status: 'Interview',
    email: 'emily.rodriguez@example.com',
    department: 'Product',
    location: 'Austin, TX',
    experience: '6 years',
    phone: '+1 (512) 555-0789',
    skills: ['Agile', 'Product Strategy', 'Data Analysis', 'Roadmapping'],
    education: [{ degree: 'MBA', institution: 'Harvard Business School', year: '2020' }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    initials: 'DW',
    name: 'David Wang',
    position: 'Backend Developer',
    applicationDate: new Date('2024-11-17').toISOString(),
    status: 'Screening',
    email: 'david.wang@example.com',
    department: 'Engineering',
    location: 'Seattle, WA',
    experience: '4 years',
    phone: '+1 (206) 555-0234',
    skills: ['Python', 'PostgreSQL', 'AWS', 'Docker'],
    education: [{ degree: 'BS Software Engineering', institution: 'MIT', year: '2020' }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    initials: 'AL',
    name: 'Amanda Lee',
    position: 'Data Analyst',
    applicationDate: new Date('2024-11-16').toISOString(),
    status: 'New',
    email: 'amanda.lee@example.com',
    department: 'Data',
    location: 'New York, NY',
    experience: '3 years',
    phone: '+1 (212) 555-0567',
    skills: ['SQL', 'Python', 'Tableau', 'Excel'],
    education: [{ degree: 'MS Data Science', institution: 'Columbia University', year: '2021' }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    initials: 'JB',
    name: 'James Brown',
    position: 'Marketing Manager',
    applicationDate: new Date('2024-11-15').toISOString(),
    status: 'Hired',
    email: 'james.brown@example.com',
    department: 'Marketing',
    location: 'Los Angeles, CA',
    experience: '7 years',
    phone: '+1 (310) 555-0890',
    skills: ['SEO', 'Content Marketing', 'Analytics', 'Social Media'],
    education: [{ degree: 'BA Marketing', institution: 'UCLA', year: '2017' }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const interviews = [
  {
    candidate: 'Emily Rodriguez',
    candidateId: 'placeholder',
    position: 'Product Manager',
    positionId: 'placeholder',
    date: '2024-11-28',
    time: '2:00 PM',
    type: 'in-person',
    interviewers: ['David Brown', 'Lisa Zhang'],
    interviewerIds: ['interviewer1', 'interviewer2'],
    status: 'scheduled',
    notes: 'Final round with executives',
    duration: 60,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    candidate: 'Michael Chen',
    candidateId: 'placeholder',
    position: 'UX Designer',
    positionId: 'placeholder',
    date: '2024-11-29',
    time: '10:00 AM',
    type: 'video',
    interviewers: ['Jane Miller'],
    interviewerIds: ['interviewer3'],
    status: 'scheduled',
    notes: 'Portfolio review',
    duration: 45,
    meetingLink: 'https://zoom.us/j/123456789',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Seed Positions
    console.log('📋 Adding positions...');
    for (const position of positions) {
      const positionsRef = ref(database, 'positions');
      const newPositionRef = push(positionsRef);
      await set(newPositionRef, position);
      console.log(`✅ Added position: ${position.title} (ID: ${newPositionRef.key})`);
    }

    // Seed Applicants
    console.log('\n👥 Adding applicants...');
    for (const applicant of applicants) {
      const applicantsRef = ref(database, 'applicants');
      const newApplicantRef = push(applicantsRef);
      await set(newApplicantRef, applicant);
      console.log(`✅ Added applicant: ${applicant.name} (ID: ${newApplicantRef.key})`);
    }

    // Seed Interviews
    console.log('\n📅 Adding interviews...');
    for (const interview of interviews) {
      const interviewsRef = ref(database, 'interviews');
      const newInterviewRef = push(interviewsRef);
      await set(newInterviewRef, interview);
      console.log(`✅ Added interview: ${interview.candidate} - ${interview.position} (ID: ${newInterviewRef.key})`);
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - ${positions.length} positions added`);
    console.log(`   - ${applicants.length} applicants added`);
    console.log(`   - ${interviews.length} interviews added`);
    console.log('\n✨ Your Firestore database is now ready to use!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeder
seedDatabase();
