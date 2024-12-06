import { Users } from "lucide-react";
import { useState } from "react";

const SidebarSkeleton = () => {
  // State for the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  // Filter skeletons based on search term
  const filteredSkeletonContacts = skeletonContacts.filter((_, idx) => {
    // In a real case, you would match against the contact names or other data here
    return true; // Just showing all skeletons as the dummy data
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200"
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">People</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full p-3">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search contacts"
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3">
        {filteredSkeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
