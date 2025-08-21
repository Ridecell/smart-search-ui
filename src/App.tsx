import { useState } from "react";
import { Search, Loader2 } from "lucide-react";

function App() {
  const [vin, setVin] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vin.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/ask_vehicle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vin: vin.trim(),
          question: "Summarize everything about this vehicle",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-primary/10 rounded-full">
              <Search className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Smart Search</h1>
          <p className="text-muted-foreground">
            Enter a VIN to get comprehensive vehicle information
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <input
              type="text"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              placeholder="Smart Search by VIN..."
              className="w-full px-6 py-4 text-lg bg-card border border-input rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 pr-14"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !vin.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-primary text-primary-foreground rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </button>
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="text-center space-y-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
            <p className="text-muted-foreground">Searching for vehicle information...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
            <p className="text-destructive text-sm">
              <strong>Error:</strong> {error}
            </p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="bg-card border rounded-lg p-6 space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
            <h2 className="text-xl font-semibold text-foreground">Vehicle Information</h2>
            <div className="prose prose-sm max-w-none">
              {typeof result === 'string' ? (
                <p className="text-muted-foreground whitespace-pre-wrap">{result}</p>
              ) : result.answer ? (
                <p className="text-muted-foreground whitespace-pre-wrap">{result.answer}</p>
              ) : result.message ? (
                <p className="text-muted-foreground whitespace-pre-wrap">{result.message}</p>
              ) : (
                <pre className="text-sm text-muted-foreground overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;