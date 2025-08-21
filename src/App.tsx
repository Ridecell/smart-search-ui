import { Search } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex items-center space-x-2">
            <Search className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Smart Search UI</h1>
          </div>
          
          <div className="w-full max-w-2xl">
            <div className="bg-card rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Welcome to Smart Search</h2>
              <p className="text-muted-foreground">
                A modern search interface built with React, TypeScript, and Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;