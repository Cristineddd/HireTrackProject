'use client';

import { useState, useEffect } from 'react';

interface ApplyButtonProps {
  jobId: string;
}

export default function ApplyButton({ jobId }: ApplyButtonProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    // Check if already applied on component mount
    const existingApplications = localStorage.getItem('applications');
    const appliedJobs = existingApplications ? JSON.parse(existingApplications) : [];
    setAlreadyApplied(appliedJobs.includes(jobId));
  }, [jobId]);

  const handleOpenForm = () => {
    // Check if already applied
    const existingApplications = localStorage.getItem('applications');
    const appliedJobs = existingApplications ? JSON.parse(existingApplications) : [];
    
    if (appliedJobs.includes(jobId)) {
      alert('You have already applied to this job.');
      return;
    }

    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({ fullName: '', email: '', phone: '', coverLetter: '' });
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate email ends with gmail.com
    if (!formData.email.toLowerCase().endsWith('@gmail.com')) {
      alert('Please enter a valid Gmail address (must end with @gmail.com)');
      return;
    }

    // Validate phone contains only numbers
    if (!/^\d+$/.test(formData.phone)) {
      alert('Phone number must contain only digits');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get existing applications
      const existingApplications = localStorage.getItem('applications');
      const appliedJobs = existingApplications ? JSON.parse(existingApplications) : [];
      
      // Simulate submission delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Add new application
      appliedJobs.push(jobId);
      localStorage.setItem('applications', JSON.stringify(appliedJobs));
      
      // Reset form
      setFormData({ fullName: '', email: '', phone: '', coverLetter: '' });
      setShowForm(false);
      setHasApplied(true);
      setAlreadyApplied(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setHasApplied(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasApplied) {
    return (
      <button
        disabled
        className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold whitespace-nowrap"
      >
        ✓ Application Submitted!
      </button>
    );
  }

  if (alreadyApplied) {
    return (
      <button
        disabled
        className="px-6 py-3 bg-slate-400 text-white rounded-lg font-semibold whitespace-nowrap cursor-not-allowed"
      >
        Already applied
      </button>
    );
  }

  return (
    <>
      <button
        onClick={handleOpenForm}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors whitespace-nowrap"
      >
        Apply Now
      </button>

      {/* Application Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Apply Now</h2>
              <button
                onClick={handleCloseForm}
                disabled={isSubmitting}
                className="text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Your full name"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                  <span className="text-xs text-slate-500 font-normal ml-1">(Gmail only)</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@gmail.com"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                  <span className="text-xs text-slate-500 font-normal ml-1">(numbers only)</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="09xxxxxxxxx"
                  disabled={isSubmitting}
                  inputMode="numeric"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Cover Letter <span className="text-slate-500 text-xs">(Optional)</span>
                </label>
                <textarea
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  placeholder="Write a brief message about your interest in this position and why you'd be a great fit..."
                  disabled={isSubmitting}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 flex gap-3">
              <button
                onClick={handleCloseForm}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2.5 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
