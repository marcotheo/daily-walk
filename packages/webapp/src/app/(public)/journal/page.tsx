import * as React from "react";
import { PlusIcon, SearchIcon, FilterIcon, BookOpenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Static mock data
const staticEntries = [
  {
    id: 1,
    title: "Morning Gratitude",
    content:
      "Thank you Lord for this beautiful day and for all the blessings you've given me...",
    date: "2024-01-15",
    tags: ["gratitude", "morning"],
    mood: "peaceful",
  },
  {
    id: 2,
    title: "Prayer for Family",
    content:
      "I lift up my family to you today. Please watch over them and keep them safe...",
    date: "2024-01-14",
    tags: ["family", "protection"],
    mood: "hopeful",
  },
  {
    id: 3,
    title: "Seeking Guidance",
    content:
      "Lord, I'm facing some difficult decisions and I need your wisdom to guide me...",
    date: "2024-01-13",
    tags: ["guidance", "wisdom"],
    mood: "seeking",
  },
];

export default function JournalPage() {
  return (
    <div className={cn("grow relative")}>
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12 max-w-6xl">
        {/* Header Section */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1
                className={cn(
                  "text-3xl md:text-4xl lg:text-5xl font-bold",
                  "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
                  "dark:from-blue-400 dark:to-purple-400"
                )}
              >
                My Prayer Journal
              </h1>
              <p className="text-muted-foreground mt-2 text-sm md:text-base">
                A sacred space for your thoughts, prayers, and reflections
              </p>
            </div>

            <Button
              className={cn(
                "flex items-center gap-2 px-4 py-2 md:px-6 md:py-3",
                "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                "text-white shadow-lg hover:shadow-xl transition-all duration-200",
                "w-full md:w-auto"
              )}
            >
              <PlusIcon className="w-4 h-4 md:w-5 md:h-5" />
              New Entry
            </Button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search your prayers..."
                className="pl-10 h-10 md:h-12"
              />
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2 h-10 md:h-12 px-4"
            >
              <FilterIcon className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          <div
            className={cn(
              "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm",
              "rounded-xl p-4 md:p-6 border border-slate-200/50 dark:border-slate-700/50",
              "shadow-sm hover:shadow-md transition-shadow duration-200"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BookOpenIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">
                  12
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Total Entries
                </p>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm",
              "rounded-xl p-4 md:p-6 border border-slate-200/50 dark:border-slate-700/50",
              "shadow-sm hover:shadow-md transition-shadow duration-200"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <BookOpenIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">
                  5
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  This Week
                </p>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm",
              "rounded-xl p-4 md:p-6 border border-slate-200/50 dark:border-slate-700/50",
              "shadow-sm hover:shadow-md transition-shadow duration-200"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <BookOpenIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">
                  3
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Answered
                </p>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm",
              "rounded-xl p-4 md:p-6 border border-slate-200/50 dark:border-slate-700/50",
              "shadow-sm hover:shadow-md transition-shadow duration-200"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <BookOpenIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">
                  15
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Day Streak
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Journal Entries */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6">
            Recent Entries
          </h2>

          <div className="grid gap-4 md:gap-6">
            {staticEntries.map((entry) => (
              <div
                key={entry.id}
                className={cn(
                  "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm",
                  "rounded-xl p-4 md:p-6 border border-slate-200/50 dark:border-slate-700/50",
                  "shadow-sm hover:shadow-md transition-all duration-200",
                  "cursor-pointer group"
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {entry.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "px-2 md:px-3 py-1 rounded-full text-xs font-medium",
                      entry.mood === "peaceful" &&
                        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
                      entry.mood === "hopeful" &&
                        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
                      entry.mood === "seeking" &&
                        "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                    )}
                  >
                    {entry.mood}
                  </div>
                </div>

                <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-2">
                  {entry.content}
                </p>

                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 md:px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State (if no entries) */}
        {staticEntries.length === 0 && (
          <div className="text-center py-12 md:py-20">
            <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 md:mb-6">
              <BookOpenIcon className="w-8 h-8 md:w-10 md:h-10 text-slate-400" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
              Start Your Prayer Journey
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto">
              Create your first journal entry to begin documenting your prayers
              and spiritual reflections.
            </p>
            <Button
              className={cn(
                "flex items-center gap-2 mx-auto px-6 py-3",
                "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                "text-white shadow-lg hover:shadow-xl transition-all duration-200"
              )}
            >
              <PlusIcon className="w-4 h-4" />
              Write First Entry
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
