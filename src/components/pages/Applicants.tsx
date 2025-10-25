import React from 'react'

const Applicants = () => {
  const applicants = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', position: 'Software Engineer', status: 'Interview' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', position: 'Product Manager', status: 'Rejected' },
    { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', position: 'UX Designer', status: 'Hired' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Applicants</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Position</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant) => (
              <tr key={applicant.id}>
                <td className="py-2 px-4 border-b text-center">{applicant.name}</td>
                <td className="py-2 px-4 border-b text-center">{applicant.email}</td>
                <td className="py-2 px-4 border-b text-center">{applicant.position}</td>
                <td className="py-2 px-4 border-b text-center">{applicant.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Applicants