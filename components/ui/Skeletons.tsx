/**
 * Loading Skeleton Components
 * Reusable skeleton loaders for various data types
 */

export function ResumeParsingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="rounded-lg bg-slate-800 h-12 w-3/4" />
      <div className="space-y-3">
        <div className="rounded-lg bg-slate-800 h-4 w-full" />
        <div className="rounded-lg bg-slate-800 h-4 w-5/6" />
        <div className="rounded-lg bg-slate-800 h-4 w-4/5" />
      </div>
      <div className="space-y-3">
        <div className="rounded-lg bg-slate-800 h-4 w-full" />
        <div className="rounded-lg bg-slate-800 h-4 w-5/6" />
      </div>
    </div>
  );
}

export function JobParsingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="rounded-lg bg-slate-800 h-12 w-3/4" />
      <div className="space-y-3">
        <div className="rounded-lg bg-slate-800 h-4 w-full" />
        <div className="rounded-lg bg-slate-800 h-4 w-5/6" />
        <div className="rounded-lg bg-slate-800 h-4 w-4/5" />
      </div>
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="rounded-full bg-slate-800 h-8 w-20" />
        ))}
      </div>
    </div>
  );
}

export function AnalysisResultSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="rounded-lg bg-slate-800 h-12 w-3/4" />
        <div className="rounded-lg bg-slate-800 h-6 w-2/3" />
      </div>

      {/* Score Card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-12">
        <div className="rounded-lg bg-slate-800 h-24 w-1/2 mx-auto" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="rounded-lg bg-slate-800 h-8 w-1/3" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-full bg-slate-800 h-10 w-24" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-lg bg-slate-800 h-8 w-1/3" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-full bg-slate-800 h-10 w-24" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LearningPlanSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="rounded-lg bg-slate-800 h-12 w-3/4" />
        <div className="rounded-lg bg-slate-800 h-6 w-2/3" />
      </div>

      {/* Timeline */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
        <div className="rounded-lg bg-slate-800 h-16 w-1/3" />
      </div>

      {/* Skills */}
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 space-y-4"
          >
            <div className="rounded-lg bg-slate-800 h-8 w-1/3" />
            <div className="space-y-2">
              {[1, 2].map((j) => (
                <div key={j} className="rounded-lg bg-slate-800 h-4 w-full" />
              ))}
            </div>
            <div className="space-y-2">
              {[1, 2].map((j) => (
                <div key={j} className="rounded-lg bg-slate-800 h-12 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 animate-pulse">
      <div className="space-y-4">
        <div className="rounded-lg bg-slate-800 h-6 w-1/2" />
        <div className="space-y-2">
          <div className="rounded-lg bg-slate-800 h-4 w-full" />
          <div className="rounded-lg bg-slate-800 h-4 w-5/6" />
        </div>
      </div>
    </div>
  );
}
