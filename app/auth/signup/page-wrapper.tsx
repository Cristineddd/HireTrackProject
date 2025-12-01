import type { Metadata } from 'next';
import SignUpPageClient from './SignUpPageClient';

export const metadata: Metadata = {
  title: 'Create Your Account',
  description: 'Join HireTrack today. Create an account to start your job search or begin hiring top talent for your company.',
  robots: {
    index: false, // Don't index signup pages
    follow: true,
  },
};

export default function SignUpPage() {
  return <SignUpPageClient />;
}
