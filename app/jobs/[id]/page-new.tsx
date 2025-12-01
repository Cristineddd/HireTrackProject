import { fetchJobById, fetchJobs } from "@/service/dataFetching";
import { notFound } from "next/navigation";
// import JobDetailClient from "./JobDetailClient"; // TODO: Create this component
import type { Metadata } from "next";

export async function generateStaticParams() {
  const { jobs } = await fetchJobs();
  
  return jobs.map((job) => ({
    id: job.id,
  }));
}

// Generate metadata for each job page (SEO)
export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}): Promise<Metadata> {
  const data = await fetchJobById(params.id);
  
  if (!data) {
    return {
      title: 'Job Not Found | HireTrack',
    };
  }
  
  const { job } = data;
  
  return {
    title: `${job.title} at ${job.company} | HireTrack`,
    description: job.description.substring(0, 160),
    keywords: `${job.title}, ${job.company}, ${job.location}, ${job.type}, job opportunity`,
    openGraph: {
      title: `${job.title} at ${job.company}`,
      description: job.description.substring(0, 160),
      type: 'website',
    },
  };
}

// Enable ISR with 3600 second (1 hour) revalidation
export const revalidate = 3600;

export default async function JobDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const data = await fetchJobById(params.id);
  
  if (!data) {
    notFound();
  }
  
  const { job, relatedJobs } = data;
  
  // TODO: Replace with JobDetailClient when created
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-gray-600">{job.company}</p>
      <div className="mt-4">
        <p>{job.description}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Related Jobs</h2>
        <div className="mt-4 space-y-2">
          {relatedJobs.map((relatedJob) => (
            <div key={relatedJob.id} className="p-4 border rounded">
              <h3 className="font-semibold">{relatedJob.title}</h3>
              <p className="text-sm text-gray-600">{relatedJob.company}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  // Uncomment when JobDetailClient is created:
  // return (
  //   <JobDetailClient 
  //     job={job} 
  //     relatedJobs={relatedJobs}
  //   />
  // );
}
