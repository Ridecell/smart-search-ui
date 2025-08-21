import { useState } from "react";
import { Search, Loader2, Bug } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Mock response data
const mockResponse = {
  "vin": "1FTBW3U82NKA31819",
  "question": "Summarize everything about this vehicle",
  "summary": "Sure, here's a structured summary for the vehicle with VIN 1FTBW3U82NKA31819:\n\n---\n\n### 1. Vehicle Profile\n- **VIN:** 1FTBW3U82NKA31819\n- **Make/Model:** Not specified\n- **License Plate:** 23BTJV\n\n### 2. Vehicle History\n- **Current Stage:** Transport to Sell Location\n- **Current Step:** Initiate Transport Request\n- **Step Status:** Completed\n- **Last Event Timestamp:** 2025-08-05 11:39:34 UTC\n- **Vendor Update:** Carrier has confirmed pickup (status: CARRIER_CONFIRMED_PICKUP)\n- **Recent Bottlenecks:** None reported\n- **Top Documents:** None provided\n\n### 3. Future of the Vehicle (Stages, Steps, Events)\n- **Next Steps:** The vehicle is in transition to its sale location. Since the transport request initiation is complete and the carrier has confirmed pickup, the next expected events are pickup by the carrier, transit, and arrival at the sell location.\n- **Monitoring:** Watch for updates related to pickup completion, transit progress, and delivery confirmation.\n- **Upcoming Stages:** After arrival, the vehicle will proceed to the sale preparation stage.\n\n---\n\nThis summary helps identify the vehicle's current logistics status and what actions to expect next in its lifecycle.",
  "profile": {
    "vin": "1FTBW3U82NKA31819",
    "make": null,
    "model": null,
    "plate": "23BTJV",
    "current_stage": "Transport to Sell Location",
    "current_step": "Initiate Transport Request",
    "step_status": "completed",
    "last_event_at": {
      "_DateTime__date": {
        "_Date__ordinal": 739468,
        "_Date__year": 2025,
        "_Date__month": 8,
        "_Date__day": 5
      },
      "_DateTime__time": {
        "_Time__ticks": 41974000000000,
        "_Time__hour": 11,
        "_Time__minute": 39,
        "_Time__second": 34,
        "_Time__nanosecond": 0,
        "_Time__tzinfo": {}
      }
    }
  },
  "bottlenecks": [],
  "vendors": [
    {
      "supplier": null,
      "status": "CARRIER_CONFIRMED_PICKUP",
      "planned_days": null,
      "actual_days": null
    }
  ],
  "docs": []
};

function App() {
  const [vin, setVin] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [debugMode, setDebugMode] = useState(true); // Debug mode enabled by default

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vin.trim()) return;

    setLoading(true);
    setError(null);
    // Don't clear result immediately - keep showing previous results until new ones arrive

    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    if (debugMode) {
      // Return mock response in debug mode
      setResult({
        ...mockResponse,
        vin: vin.trim() // Use the entered VIN in the response
      });
      setLoading(false);
    } else {
      // Make actual API call
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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col p-4">
      {/* AI Progress Bar Animation */}
      {loading && (
        <div className="ai-progress-bar">
          <div className="progress-bar-fill">
            <div className="progress-glow"></div>
          </div>
        </div>
      )}
      {/* Mock Response Toggle - Top Right */}
      <div className="absolute top-4 right-4 flex items-center space-x-2 bg-card/90 backdrop-blur-sm border rounded-lg px-3 py-2">
        <Bug className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">Mock Response</span>
        <Switch
          checked={debugMode}
          onCheckedChange={setDebugMode}
          aria-label="Toggle mock response mode"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl space-y-8">
          {/* Logo and Title - Only show when no results and not loading */}
          {!result && !loading && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Search className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-foreground">Smart Search</h1>
              {debugMode && !loading && (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  Mock response mode active - returning mock data
                </p>
              )}
            </div>
          )}

          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <input
                type="text"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                placeholder="Search by VIN for a smart summary..."
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
            <div className="text-center space-y-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-300 relative z-10">
              <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
              <p className="text-muted-foreground font-medium">AI is analyzing vehicle data...</p>
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
            <div className="flex gap-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
              {/* Profile Tile */}
              {result.profile && (
                <div className="bg-card border rounded-lg p-5 w-[320px] flex-shrink-0 h-fit">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Vehicle Profile</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">VIN</p>
                      <p className="font-mono text-sm font-medium">{result.profile.vin || result.vin || "N/A"}</p>
                    </div>
                    {result.profile.plate && (
                      <div>
                        <p className="text-xs text-muted-foreground">License Plate</p>
                        <p className="text-sm font-medium">{result.profile.plate}</p>
                      </div>
                    )}
                    {(result.profile.make || result.profile.model) && (
                      <div>
                        <p className="text-xs text-muted-foreground">Make/Model</p>
                        <p className="text-sm font-medium">
                          {result.profile.make || "Unknown"} {result.profile.model || ""}
                        </p>
                      </div>
                    )}
                    {result.profile.current_stage && (
                      <div>
                        <p className="text-xs text-muted-foreground">Current Stage</p>
                        <p className="text-sm font-medium">{result.profile.current_stage}</p>
                      </div>
                    )}
                    {result.profile.current_step && (
                      <div>
                        <p className="text-xs text-muted-foreground">Current Step</p>
                        <p className="text-sm font-medium">{result.profile.current_step}</p>
                      </div>
                    )}
                    {result.profile.step_status && (
                      <div>
                        <p className="text-xs text-muted-foreground">Step Status</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className={`h-2 w-2 rounded-full ${
                            result.profile.step_status === 'completed' ? 'bg-green-500' : 
                            result.profile.step_status === 'in_progress' ? 'bg-yellow-500' : 
                            'bg-gray-400'
                          }`} />
                          <p className="text-sm font-medium capitalize">{result.profile.step_status}</p>
                        </div>
                      </div>
                    )}
                    {result.profile.last_event_at && (
                      <div>
                        <p className="text-xs text-muted-foreground">Last Event</p>
                        <p className="text-sm font-medium">
                          {(() => {
                            const dateObj = result.profile.last_event_at;
                            if (dateObj._DateTime__date) {
                              const date = dateObj._DateTime__date;
                              const time = dateObj._DateTime__time;
                              
                              // Create a proper Date object
                              const dateTime = new Date(
                                date._Date__year,
                                date._Date__month - 1, // JS months are 0-indexed
                                date._Date__day,
                                time._Time__hour,
                                time._Time__minute,
                                time._Time__second || 0
                              );
                              
                              // Format with Intl.DateTimeFormat for global friendliness
                              const formattedDate = new Intl.DateTimeFormat('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true,
                                timeZoneName: 'short'
                              }).format(dateTime);
                              
                              return formattedDate;
                            }
                            return "N/A";
                          })()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Main Content */}
              <div className="bg-card border rounded-lg p-6 space-y-4 flex-1">
                <h2 className="text-xl font-semibold text-foreground">Vehicle Information</h2>
                <div className="prose prose-sm prose-slate dark:prose-invert max-w-none">
                {result.summary ? (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({children}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-foreground">{children}</h1>,
                      h2: ({children}) => <h2 className="text-xl font-semibold mt-5 mb-3 text-foreground">{children}</h2>,
                      h3: ({children}) => <h3 className="text-lg font-semibold mt-4 mb-2 text-foreground">{children}</h3>,
                      p: ({children}) => <p className="text-muted-foreground mb-4">{children}</p>,
                      ul: ({children}) => <ul className="list-disc ml-5 mb-4 text-muted-foreground">{children}</ul>,
                      li: ({children}) => <li className="mb-1">{children}</li>,
                      strong: ({children}) => <strong className="font-semibold text-foreground">{children}</strong>,
                      hr: () => <hr className="my-6 border-border" />
                    }}
                  >
                    {result.summary}
                  </ReactMarkdown>
                ) : typeof result === 'string' ? (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({children}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-foreground">{children}</h1>,
                      h2: ({children}) => <h2 className="text-xl font-semibold mt-5 mb-3 text-foreground">{children}</h2>,
                      h3: ({children}) => <h3 className="text-lg font-semibold mt-4 mb-2 text-foreground">{children}</h3>,
                      p: ({children}) => <p className="text-muted-foreground mb-4">{children}</p>,
                      ul: ({children}) => <ul className="list-disc ml-5 mb-4 text-muted-foreground">{children}</ul>,
                      li: ({children}) => <li className="mb-1">{children}</li>,
                      strong: ({children}) => <strong className="font-semibold text-foreground">{children}</strong>,
                      hr: () => <hr className="my-6 border-border" />
                    }}
                  >
                    {result}
                  </ReactMarkdown>
                ) : result.answer ? (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({children}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-foreground">{children}</h1>,
                      h2: ({children}) => <h2 className="text-xl font-semibold mt-5 mb-3 text-foreground">{children}</h2>,
                      h3: ({children}) => <h3 className="text-lg font-semibold mt-4 mb-2 text-foreground">{children}</h3>,
                      p: ({children}) => <p className="text-muted-foreground mb-4">{children}</p>,
                      ul: ({children}) => <ul className="list-disc ml-5 mb-4 text-muted-foreground">{children}</ul>,
                      li: ({children}) => <li className="mb-1">{children}</li>,
                      strong: ({children}) => <strong className="font-semibold text-foreground">{children}</strong>,
                      hr: () => <hr className="my-6 border-border" />
                    }}
                  >
                    {result.answer}
                  </ReactMarkdown>
                ) : result.message ? (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({children}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-foreground">{children}</h1>,
                      h2: ({children}) => <h2 className="text-xl font-semibold mt-5 mb-3 text-foreground">{children}</h2>,
                      h3: ({children}) => <h3 className="text-lg font-semibold mt-4 mb-2 text-foreground">{children}</h3>,
                      p: ({children}) => <p className="text-muted-foreground mb-4">{children}</p>,
                      ul: ({children}) => <ul className="list-disc ml-5 mb-4 text-muted-foreground">{children}</ul>,
                      li: ({children}) => <li className="mb-1">{children}</li>,
                      strong: ({children}) => <strong className="font-semibold text-foreground">{children}</strong>,
                      hr: () => <hr className="my-6 border-border" />
                    }}
                  >
                    {result.message}
                  </ReactMarkdown>
                ) : (
                  <pre className="text-sm text-muted-foreground overflow-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;