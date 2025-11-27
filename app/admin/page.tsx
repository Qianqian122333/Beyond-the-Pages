import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function AdminPage() {
  const user = await currentUser();

  if (!user) return null;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <UserButton />
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-lg mb-4">
          Welcome back, {user.firstName || user.username}!
        </p>
        <p className="text-gray-600">
          You have successfully logged in as an administrator.
        </p>
        <div className="mt-6 p-4 bg-gray-50 rounded border">
          <h2 className="font-semibold mb-2">Admin Controls</h2>
          <p className="text-sm text-gray-500">
            Admin functionality will be implemented here.
          </p>
        </div>
      </div>
    </div>
  );
}
