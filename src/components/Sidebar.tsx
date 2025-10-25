
import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">HireTrack</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <Link href="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li className="mb-2">
            <Link href="/analytics" className="hover:text-gray-300">Analytics</Link>
          </li>
          <li className="mb-2">
            <Link href="/applicants" className="hover:text-gray-300">Applicants</Link>
          </li>
          <li className="mb-2">
            <Link href="/open-positions" className="hover:text-gray-300">Open Positions</Link>
          </li>
          <li className="mb-2">
            <Link href="/scheduling" className="hover:text-gray-300">Scheduling</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
