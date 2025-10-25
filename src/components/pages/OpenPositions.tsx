import React from 'react'

const OpenPositions = () => {
  const positions = [
    { id: 1, title: 'Software Engineer', department: 'Technology', location: 'Remote' },
    { id: 2, title: 'Product Manager', department: 'Product', location: 'New York, NY' },
    { id: 3, title: 'UX Designer', department: 'Design', location: 'San Francisco, CA' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Open Positions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Department</th>
              <th className="py-2 px-4 border-b">Location</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => (
              <tr key={position.id}>
                <td className="py-2 px-4 border-b text-center">{position.title}</td>
                <td className="py-2 px-4 border-b text-center">{position.department}</td>
                <td className="py-2 px-4 border-b text-center">{position.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OpenPositions
