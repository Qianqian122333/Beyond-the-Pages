import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Admin Portal</h1>
        <p className="text-muted-foreground">
          Welcome to the administration area. Please select an action below.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button asChild>
          <Link href="/admin/dashboard">Go to Dashboard</Link>
        </Button>

        <SignOutButton redirectUrl="/">
          <Button variant="outline">Sign Out</Button>
        </SignOutButton>
      </div>
    </div>
  );
}
