import { NavLink } from "react-router-dom";

export default function Navbar() {
  const isAuthenticated = localStorage.getItem("token"); // Check if user is logged in

  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        {/* Logo */}
        <NavLink to="/">
          <img
            alt="Logo"
            className="h-10 inline"
            src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"
          />
        </NavLink>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <NavLink
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
            to="/create"
          >
            Create Listing
          </NavLink>

          {/* Conditional Links based on authentication */}
          {isAuthenticated ? (
            <>
              <NavLink
                className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
                to="/"
                onClick={() => {
                  localStorage.removeItem("token"); // Clear token on logout
                  window.location.reload(); // Refresh the page
                }}
              >
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
                to="/register"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
