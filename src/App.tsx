import { useState } from "react";
import { Search, Loader2, Bug, X } from "lucide-react";
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

const resp_1FBAX2C89RKA56408 = {
  "summary": {
    "exec_summary": "The 2024 Ford Transit-350 Passenger vehicle, currently in an active lifecycle state, is undergoing a critical phase of reconditioning and is positioned as 'Available In Stock' for inventory. Notably, the vehicle has already completed its transportation phase efficiently, with a delivery accomplished three days ahead of schedule, representing significant operational efficiency and potential cost savings.",
    "history": "The Transit-350 was transported by MONTWAY LLC, with the pickup and delivery actualized between August 30, 2024, and completed actively by August 30, 2024. Following transportation, the vehicle entered a reconditioning phase on March 6, 2025, under the supervision of Manheim San Francisco Bay, focusing on essential maintenance such as Quick Lube. The reconditioning process is still ongoing with an anticipated completion date around April 18, 2025.",
    "current Status": "As of the last update on March 30, 2025, the vehicle remains in stock and available for leasing or sale, classified under the 'Available Inventory' stage. The reconditioning status is marked 'IN_PROGRESS', ensuring that the vehicle meets operational standards before further disposition.",
    "recommended_next_steps": "Monitor the reconditioning progress closely to ensure completion by the estimated date of April 18, 2025. Prepare marketing and sales strategies to reallocate the vehicle efficiently post-reconditioning. Analyze customer demand trends to better position the vehicle in the market once it becomes available.",
    "keep_sell_analysis": "Considering the vehicle's new status (2024 model), recent completion of efficient transportation, ongoing upkeep, and lack of contracts suggest keeping it in the fleet for now. Its current condition and stage imply minimal depreciation and high utility worth for potential clients or resale at a later stage after more usage."
  },
  "profile": [
    [
      {
        "profile": {
          "tags": [],
          "model": "Transit-350 Passenger",
          "mileage": 0,
          "current_stage": "Available In Stock",
          "status": "DELIVERED_TO_FINAL_DESTINATION",
          "plate": "A67STC",
          "lifecycle_state": "ACTIVE",
          "last_event_at": {
            "_DateTime__date": {
              "_Date__ordinal": 739340,
              "_Date__year": 2025,
              "_Date__month": 3,
              "_Date__day": -2
            },
            "_DateTime__time": {
              "_Time__ticks": 45753000000000,
              "_Time__hour": 12,
              "_Time__minute": 42,
              "_Time__second": 33,
              "_Time__nanosecond": 0,
              "_Time__tzinfo": {}
            }
          },
          "vin": "1FBAX2C89RKA56408",
          "year": 2024,
          "step_status": "in_progress",
          "counts": {
            "tags": 0,
            "reconditioning": 1,
            "transports": 1,
            "contracts": 0
          },
          "make": "ford"
        }
      }
    ]
  ],
  "vin": "1FBAX2C89RKA56408"
}

const resp_W1W40CHY4MT056254 = {
  "summary": {
    "exec_summary": "The 2021 Mercedes-Benz Sprinter 2500 is currently in the off-boarding admin stage of its lifecycle, with the license plate and registration recently updated. The vehicle is actively engaged in the corresponding workflow with an ongoing status update. This stands significant as effective management and transitioning of fleet assets ensure optimal operational efficiency and reduce unnecessary resource allocation.",
    "history": "The vehicle was actively utilized since its acquisition and has maintained an active lifecycle state with zero reported reconditioning. The most recent key events include beginning the off-boarding admin on March 10, 2025, and an update in lifecycle status on March 12, 2025, marking the vehicle's preparation for a transition.",
    "current_status": "As of the last update, the vehicle is at the 'Off-boarding Admin' stage under an 'in-progress' status since March 12, 2025. It is currently without registered transports or contracts, signifying no new operational engagements.",
    "recommended_next_steps": "Complete the ongoing off-boarding admin steps efficiently to make the vehicle available for further necessary action, potentially preparing it for resale. Assess the need for any reconditioning once off-boarding is complete to enhance its market value.",
    "keep_sell_analysis": "Given the vehicle's recent entry to the off-boarding stage, low mileage, and lack of any reconditioning needs, selling the vehicle appears advantageous. Streamlining the asset turnover could capitalize on its maintained condition and recent model year, likely yielding favorable resale value."
  },
  "profile": [
    [
      {
        "profile": {
          "tags": [
            "Presell Admin",
            "Loss Recovery"
          ],
          "model": "Sprinter 2500",
          "mileage": 0,
          "current_stage": "Off-boarding Admin",
          "status": "LICENSE_PLATE_AND_REGISTRATION_UPDATED",
          "plate": "A50PYZ",
          "lifecycle_state": "ACTIVE",
          "last_event_at": {
            "_DateTime__date": {
              "_Date__ordinal": 739322,
              "_Date__year": 2025,
              "_Date__month": 3,
              "_Date__day": 12
            },
            "_DateTime__time": {
              "_Time__ticks": 71215000000000,
              "_Time__hour": 19,
              "_Time__minute": 46,
              "_Time__second": 55,
              "_Time__nanosecond": 0,
              "_Time__tzinfo": {}
            }
          },
          "vin": "W1W40CHY4MT056254",
          "year": 2021,
          "step_status": "in_progress",
          "counts": {
            "tags": 2,
            "reconditioning": 0,
            "transports": 0,
            "contracts": 0
          },
          "make": "mercedes-benz"
        }
      }
    ]
  ],
  "vin": "W1W40CHY4MT056254"
}

const resp_3C6LRVDG3RE133094 = {
  "summary": {
    "exec_summary": "The 2024 Promaster 2500, in retention, is undergoing multiple reconditioning activities predominantly managed by Manheim Statesville, with expenditures noted for major body work priced at $3242.5. Despite active transport and maintenance, there are rejected glass repair and minor lube services, suggesting focused reconditioning efforts aimed at enhancing vehicle value for future operations or sales.",
    "history": "The vehicle has undergone recent transport by Preowned Auto Logistics, confirmed on April 26, 2025, with actual transport days falling short of the planned eight days, enhancing logistical efficiency. In reconditioning, notably two tasks were rejected on March 20, 2025, demonstrating a selective enhancement approach.",
    "current_status": "Currently, the vehicle is at the Reconditioning stage with a lifecycle status of ACTIVE and has completed the step of obtaining estimates. The ongoing reconditioning tasks include major body repair with an estimated end date of August 27, 2025. There are no open contracts, minimizing immediate financial commitments.",
    "recommended_next_steps": "Proceed with the planned major body repair to restore vehicle condition and monitor costs closely to ensure budget compliance. Evaluate the efficiency and necessity of future reconditioning tasks based on cost-benefit analysis and prioritize timely completion of repairs with stringent quality checks.",
    "keep_sell_analysis": "Given the vehicle's recent model year (2024) and active reconditioning, it is recommended to keep the vehicle post-reconditioning completion to maximize utility and deferred asset value realization. Selling considerations should follow reassessment post the completion of major planned reconditioning tasks."
  },
  "profile": [
    [
      {
        "profile": {
          "tags": [
            "Body M/R",
            "Keep"
          ],
          "model": "Promaster 2500",
          "mileage": 30128,
          "current_stage": "Reconditioning",
          "status": "LICENSE_PLATE_AND_REGISTRATION_UPDATED",
          "plate": "D37ULU",
          "lifecycle_state": "ACTIVE",
          "last_event_at": {
            "_DateTime__date": {
              "_Date__ordinal": 739468,
              "_Date__year": 2025,
              "_Date__month": 8,
              "_Date__day": 5
            },
            "_DateTime__time": {
              "_Time__ticks": 38643000000000,
              "_Time__hour": 10,
              "_Time__minute": 44,
              "_Time__second": 3,
              "_Time__nanosecond": 0,
              "_Time__tzinfo": {}
            }
          },
          "vin": "3C6LRVDG3RE133094",
          "year": 2024,
          "step_status": "completed",
          "counts": {
            "tags": 2,
            "reconditioning": 4,
            "transports": 1,
            "contracts": 0
          },
          "make": "ram"
        }
      }
    ]
  ],
  "vin": "3C6LRVDG3RE133094"
}

// Helper function to safely extract profile data from different formats
const extractProfileData = (result: VehicleResult | null): ProfileData | null => {
  if (!result) return null;
  
  // Handle array-based profile format (new format)
  if (result.profile && Array.isArray(result.profile)) {
    try {
      // Try to get first item from array, which might contain a profile object
      if (result.profile[0] && Array.isArray(result.profile[0])) {
        const firstItem = result.profile[0][0];
        if (firstItem && firstItem.profile) {
          return firstItem.profile as ProfileData;
        }
      }
    } catch (err) {
      console.error("Error extracting profile data:", err);
    }
    // If we can't extract a profile, return null
    return null;
  }
  
  // Handle direct profile object (old format)
  if (result.profile && typeof result.profile === 'object' && !Array.isArray(result.profile)) {
    return result.profile as ProfileData;
  }
  
  return null;
};

// Define TypeScript types for our data structure
type DateTimeFormat = {
  _DateTime__date: {
    _Date__ordinal: number;
    _Date__year: number;
    _Date__month: number;
    _Date__day: number;
  };
  _DateTime__time: {
    _Time__ticks: number;
    _Time__hour: number;
    _Time__minute: number;
    _Time__second: number;
    _Time__nanosecond: number;
    _Time__tzinfo: Record<string, unknown>;
  };
};

type ProfileData = {
  vin?: string;
  make?: string | null;
  model?: string | null;
  plate?: string;
  current_stage?: string;
  current_step?: string;
  step_status?: string;
  last_event_at?: DateTimeFormat;
  tags?: string[];
  mileage?: number;
  year?: number;
  status?: string;
  lifecycle_state?: string;
  [key: string]: any; // Allow for other properties we might not know about
};

type Summary = {
  exec_summary?: string;
  history?: string;
  current_status?: string;
  recommended_next_steps?: string;
  keep_sell_analysis?: string;
  [key: string]: any; // Allow for other properties
} | string;

type VehicleResult = {
  vin: string;
  summary: Summary;
  profile: ProfileData | ProfileData[][] | any;
  question?: string;
  bottlenecks?: any[];
  vendors?: any[];
  docs?: any[];
  [key: string]: any; // Allow for other properties
};

function App() {
  const [vin, setVin] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VehicleResult | null>(null);
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
    } else if (vin.trim()=="1FBAX2C89RKA56408"){
        setResult({
        ...resp_1FBAX2C89RKA56408,
        vin: vin.trim() // Use the entered VIN in the response
      });
      setLoading(false);

    }  else if (vin.trim()=="W1W40CHY4MT056254"){
        setResult({
        ...resp_W1W40CHY4MT056254,
        vin: vin.trim() // Use the entered VIN in the response
      });
      setLoading(false);
    } else if (vin.trim()=="3C6LRVDG3RE133094") {
      setResult({
        ...resp_3C6LRVDG3RE133094,
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
      <div className={`flex-1 flex flex-col items-center ${!result && !loading ? 'justify-center pb-32' : 'justify-start pt-8'}`}>
        <div className={`w-full max-w-6xl ${!result && !loading ? '' : 'space-y-8'}`}>
          {/* Title - Only show when no results */}
          {!result && !loading && (
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">Smart Search</h1>
              {debugMode && (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  Mock response mode active - returning mock data
                </p>
              )}
            </div>
          )}

          {/* Search Form - Always visible */}
          <form onSubmit={handleSearch} className={`relative ${(result || loading) ? 'mb-8' : ''}`}>
            <div className="relative">
              <input
                type="text"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                placeholder="Search by VIN for a smart summary..."
                className={`w-full px-6 py-4 text-lg bg-card border border-input rounded-full shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${vin ? 'pr-24' : 'pr-14'}`}
                style={{ '--tw-ring-color': '#6cc04a' } as React.CSSProperties}
                disabled={loading}
              />
              {/* Clear button */}
              {vin && (
                <button
                  type="button"
                  onClick={() => setVin('')}
                  className="absolute right-14 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                type="submit"
                disabled={loading || !vin.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{ 
                  backgroundColor: loading || !vin.trim() ? '#6cc04a80' : '#6cc04a',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  if (!loading && vin.trim()) {
                    e.currentTarget.style.backgroundColor = '#5ca93e';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading && vin.trim()) {
                    e.currentTarget.style.backgroundColor = '#6cc04a';
                  }
                }}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </form>

          {/* No longer need separate loading spinner since we show skeleton tiles */}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
              <p className="text-destructive text-sm">
                <strong>Error:</strong> {error}
              </p>
            </div>
          )}

          {/* Results or Loading Placeholders - Show when loading OR when we have results */}
          {(result || loading) && (
            <div className="flex gap-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
              {/* Profile Tile or Skeleton */}
              {loading ? (
                <div className="bg-card border rounded-lg p-5 w-[320px] flex-shrink-0 h-fit">
                  <div className="space-y-3">
                    <div>
                      <div className="h-3 w-8 shimmer rounded mb-1"></div>
                      <div className="h-4 w-40 shimmer rounded"></div>
                    </div>
                    <div>
                      <div className="h-3 w-20 shimmer rounded mb-1"></div>
                      <div className="h-4 w-24 shimmer rounded"></div>
                    </div>
                    <div>
                      <div className="h-3 w-24 shimmer rounded mb-1"></div>
                      <div className="h-4 w-48 shimmer rounded"></div>
                    </div>
                    <div>
                      <div className="h-3 w-20 shimmer rounded mb-1"></div>
                      <div className="h-4 w-36 shimmer rounded"></div>
                    </div>
                    <div>
                      <div className="h-3 w-16 shimmer rounded mb-1"></div>
                      <div className="h-4 w-28 shimmer rounded"></div>
                    </div>
                    <div>
                      <div className="h-3 w-20 shimmer rounded mb-1"></div>
                      <div className="h-4 w-44 shimmer rounded"></div>
                    </div>
                  </div>
                </div>
              ) : result && (
                <div className="bg-card border rounded-lg p-5 w-[320px] flex-shrink-0 h-fit">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">VIN</p>
                      <p className="font-mono text-sm font-medium">{result.vin || "N/A"}</p>
                    </div>
                    {(() => {
                      // Get profile data using our helper function
                      const profileData = extractProfileData(result);
                      
                      if (!profileData) return null;
                      
                      return (
                        <>
                          {profileData.plate && (
                            <div>
                              <p className="text-xs text-muted-foreground">License Plate</p>
                              <p className="text-sm font-medium">{profileData.plate}</p>
                            </div>
                          )}
                          {(profileData.make || profileData.model) && (
                            <div>
                              <p className="text-xs text-muted-foreground">Make/Model</p>
                              <p className="text-sm font-medium">
                                {profileData.make || "Unknown"} {profileData.model || ""}
                              </p>
                            </div>
                          )}
                          {profileData.year && (
                            <div>
                              <p className="text-xs text-muted-foreground">Year</p>
                              <p className="text-sm font-medium">{profileData.year}</p>
                            </div>
                          )}
                          {profileData.mileage && (
                            <div>
                              <p className="text-xs text-muted-foreground">Mileage</p>
                              <p className="text-sm font-medium">{profileData.mileage.toLocaleString()}</p>
                            </div>
                          )}
                          {profileData.current_stage && (
                            <div>
                              <p className="text-xs text-muted-foreground">Current Stage</p>
                              <p className="text-sm font-medium">{profileData.current_stage}</p>
                            </div>
                          )}
                          {profileData.current_step && (
                            <div>
                              <p className="text-xs text-muted-foreground">Current Step</p>
                              <p className="text-sm font-medium">{profileData.current_step}</p>
                            </div>
                          )}
                          {profileData.step_status && (
                            <div>
                              <p className="text-xs text-muted-foreground">Step Status</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className={`h-2 w-2 rounded-full ${
                                  profileData.step_status === 'completed' ? 'bg-green-500' : 
                                  profileData.step_status === 'in_progress' ? 'bg-yellow-500' : 
                                  profileData.step_status === 'in_queue' ? 'bg-blue-500' :
                                  profileData.step_status === 'open' ? 'bg-purple-500' :
                                  profileData.step_status === 'monitor_update' ? 'bg-orange-500' :
                                  profileData.step_status === 'skipped' ? 'bg-gray-500' :
                                  'bg-gray-400'
                                }`} />
                                <p className="text-sm font-medium capitalize">{profileData.step_status}</p>
                              </div>
                            </div>
                          )}
                          {profileData.status && (
                            <div>
                              <p className="text-xs text-muted-foreground">Status</p>
                              <p className="text-sm font-medium">{profileData.status}</p>
                            </div>
                          )}
                          {profileData.lifecycle_state && (
                            <div>
                              <p className="text-xs text-muted-foreground">Lifecycle State</p>
                              <p className="text-sm font-medium">{profileData.lifecycle_state}</p>
                            </div>
                          )}
                          {profileData.last_event_at && (
                            <div>
                              <p className="text-xs text-muted-foreground">Last Event</p>
                              <p className="text-sm font-medium">
                                {(() => {
                                  const dateObj = profileData.last_event_at;
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
                          {profileData.tags && profileData.tags.length > 0 && (
                            <div>
                              <p className="text-xs text-muted-foreground">Tags</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {profileData.tags.map((tag: string, i: number) => (
                                  <span key={i} className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
              
              {/* Main Content or Skeleton */}
              {loading ? (
                <div className="bg-card border rounded-lg p-6 space-y-4 flex-1">
                  <div className="h-6 w-48 shimmer rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 w-full shimmer rounded"></div>
                    <div className="h-4 w-5/6 shimmer rounded"></div>
                    <div className="h-4 w-4/5 shimmer rounded"></div>
                    <div className="h-4 w-full shimmer rounded"></div>
                    <div className="h-4 w-3/4 shimmer rounded"></div>
                    <div className="mt-6 h-5 w-32 shimmer rounded"></div>
                    <div className="h-4 w-full shimmer rounded"></div>
                    <div className="h-4 w-5/6 shimmer rounded"></div>
                    <div className="mt-6 h-5 w-36 shimmer rounded"></div>
                    <div className="h-4 w-4/5 shimmer rounded"></div>
                    <div className="h-4 w-full shimmer rounded"></div>
                    <div className="h-4 w-3/4 shimmer rounded"></div>
                  </div>
                </div>
              ) : (
                <div className="bg-card border rounded-lg p-6 space-y-4 flex-1">
                  <h2 className="text-xl font-semibold text-foreground">Vehicle Information</h2>
                  <div className="prose prose-sm prose-slate dark:prose-invert max-w-none">
                {(() => {
                  // Define markdown component styling once to avoid repetition
                  const markdownComponents = {
                    h1: ({children}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-foreground">{children}</h1>,
                    h2: ({children}) => <h2 className="text-xl font-semibold mt-5 mb-3 text-foreground">{children}</h2>,
                    h3: ({children}) => <h3 className="text-lg font-semibold mt-4 mb-2 text-foreground">{children}</h3>,
                    p: ({children}) => <p className="text-muted-foreground mb-4">{children}</p>,
                    ul: ({children}) => <ul className="list-disc ml-5 mb-4 text-muted-foreground">{children}</ul>,
                    li: ({children}) => <li className="mb-1">{children}</li>,
                    strong: ({children}) => <strong className="font-semibold text-foreground">{children}</strong>,
                    hr: () => <hr className="my-6 border-border" />
                  };

                  // Helper to render a markdown section with title
                  const renderSection = (title, content) => {
                    if (!content) return null;
                    return (
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-3 text-foreground">{title}</h2>
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                          {content}
                        </ReactMarkdown>
                      </div>
                    );
                  };
                  
                  // Check if we have a structured summary with multiple sections
                  if (result.summary && typeof result.summary === 'object') {
                    const { exec_summary, history, current_status, recommended_next_steps, keep_sell_analysis } = result.summary;
                    
                    // If we have multiple sections, render them all
                    if ((exec_summary || history || current_status || recommended_next_steps || keep_sell_analysis) && 
                         typeof exec_summary !== 'object' &&
                         typeof history !== 'object' &&
                         typeof current_status !== 'object' &&
                         typeof recommended_next_steps !== 'object' &&
                         typeof keep_sell_analysis !== 'object') {
                      
                      return (
                        <>
                          {renderSection("Executive Summary", exec_summary)}
                          {renderSection("Vehicle History", history)}
                          {renderSection("Current Status", current_status)}
                          {renderSection("Recommended Next Steps", recommended_next_steps)}
                          {renderSection("Keep/Sell Analysis", keep_sell_analysis)}
                        </>
                      );
                    }
                  }
                  
                  // For backwards compatibility - legacy format
                  if (result.summary && typeof result.summary === 'string') {
                    return (
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents}
                      >
                        {result.summary}
                      </ReactMarkdown>
                    );
                  }
                  
                  // Fallback to raw JSON display if no recognizable format
                  return (
                    <pre className="text-sm text-muted-foreground overflow-auto">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  );
                })()}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;