import type { Metadata } from 'next';
import LoginPageClient from './LoginPageClient';

export const metadata: Metadata = {
  title: 'Sign In to Your Account',
  description: 'Sign in to HireTrack to access your job applications, saved jobs, or manage your recruitment dashboard.',
  robots: {
    index: false, // Don't index login pages
    follow: true,
  },
};

export default function LoginPage() {
  return <LoginPageClient />;
}
