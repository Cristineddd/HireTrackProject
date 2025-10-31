import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, Calendar, Search } from "@/components/icons";

type Status = "new" | "screening" | "interview" | "rejected" | "hired";

interface Applicant {
  id: number;
  name: string;
  initials: string;
  jobTitle: string;
  appliedDate: string;
  status: Status;
}

const applicants: Applicant[] = [
  { id: 1, name: "Sarah Johnson", initials: "SJ", jobTitle: "Senior Frontend Developer", appliedDate: "2024-01-15", status: "new" },
  { id: 2, name: "Michael Chen", initials: "MC", jobTitle: "UX Designer", appliedDate: "2024-01-14", status: "screening" },
  { id: 3, name: "Emily Rodriguez", initials: "ER", jobTitle: "Product Manager", appliedDate: "2024-01-13", status: "interview" },
  { id: 4, name: "James Wilson", initials: "JW", jobTitle: "Backend Developer", appliedDate: "2024-01-12", status: "hired" },
  { id: 5, name: "Amanda Lee", initials: "AL", jobTitle: "Data Analyst", appliedDate: "2024-01-11", status: "screening" },
];

// Use explicit Tailwind color utilities for consistent styling
const statusConfig: Record<Status, { label: string; className: string }> = {
  new: { label: "New", className: "bg-amber-500 text-white hover:bg-amber-600" },
  screening: { label: "Screening", className: "bg-sky-500 text-white hover:bg-sky-600" },
  interview: { label: "Interview", className: "bg-indigo-500 text-white hover:bg-indigo-600" },
  rejected: { label: "Rejected", className: "bg-rose-500 text-white hover:bg-rose-600" },
  hired: { label: "Hired", className: "bg-green-600 text-white hover:bg-green-700" },
};

const ApplicantsTable = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Page header / toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Applicants</h1>
          <p className="text-sm text-muted-foreground mt-1">Recent applicants and application status</p>
        </div>

        <div className="flex items-center gap-3">
          <label className="relative">
            <span className="sr-only">Search applicants</span>
            <input
              className="pl-10 pr-4 py-2 rounded-md border bg-white/60 backdrop-blur-sm text-sm placeholder:text-muted-foreground"
              placeholder="Search by name or role..."
              aria-label="Search applicants"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          </label>
          <Button>
            New Applicant
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Applicants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/10">
                  <TableHead>Candidate</TableHead>
                  <TableHead>Applied For</TableHead>
                  <TableHead>Application Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicants.map((applicant) => (
                  <TableRow key={applicant.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary text-white font-semibold">
                            {applicant.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{applicant.name}</div>
                          <div className="text-xs text-muted-foreground">{applicant.jobTitle}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">{applicant.jobTitle}</TableCell>
                    <TableCell className="text-muted-foreground">{applicant.appliedDate}</TableCell>
                    <TableCell>
                      <Badge className={`${statusConfig[applicant.status].className} px-3 py-1 rounded-full text-sm`}>
                        {statusConfig[applicant.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          Schedule
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicantsTable;
