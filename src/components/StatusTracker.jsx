/**
 * ====================================================================
 * CROWDSOLVE - EVAL 1
 * --------------------------------------------------------------------
 * File: StatusTracker.jsx
 * Contributor: Member 2 (Shubhleen Kaur - Frontend & UI Components)
 * Description: Visual progress stepper displaying lifecycle stages of a civic issue (Reported -> In Review -> In Progress -> Resolved).
 * ====================================================================
 */

import "./StatusTracker.css";

const STAGES = [
  {
    key: "reported",
    label: "Reported",
    description: "Issue submitted with photos and location by citizen",
    icon: "📝",
  },
  {
    key: "under review",
    label: "Under Review",
    description: "Civic moderators verifying validity and location details",
    icon: "🔍",
  },
  {
    key: "community discussion",
    label: "Community Discussion",
    description: "Neighbours proposing and upvoting actionable solutions",
    icon: "💬",
  },
  {
    key: "in progress",
    label: "In Progress",
    description: "Assigned to civic authorities or organized volunteer taskforce",
    icon: "⚡",
  },
  {
    key: "resolved",
    label: "Resolved",
    description: "Action taken, verified by community and closed",
    icon: "✅",
  },
];

export default function StatusTracker({ status = "Reported", updatedAt = "Recently" }) {
  const normalizedStatus = (status || "").toLowerCase().trim();

  // Determine the active stage index
  let activeIndex = STAGES.findIndex((s) => s.key === normalizedStatus);
  if (activeIndex === -1) {
    if (normalizedStatus.includes("review") || normalizedStatus.includes("proposed")) activeIndex = 1;
    else if (normalizedStatus.includes("voted") || normalizedStatus.includes("discuss")) activeIndex = 2;
    else if (normalizedStatus.includes("progress")) activeIndex = 3;
    else if (normalizedStatus.includes("resolve") || normalizedStatus.includes("implement")) activeIndex = 4;
    else activeIndex = 0;
  }

  return (
    <div className="status-tracker" aria-label={`Current issue progress: ${status}`}>
      <div className="status-tracker__header">
        <div>
          <span className="status-tracker__tag">LIFECYCLE STATUS</span>
          <h3 className="status-tracker__title">Action & Resolution Progress</h3>
        </div>
        <div className="status-tracker__badge">
          <span className="status-tracker__badge-dot" />
          <span>Stage {activeIndex + 1} of {STAGES.length}: {STAGES[activeIndex].label}</span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="status-tracker__bar-wrapper">
        <div
          className="status-tracker__bar-fill"
          style={{ width: `${(activeIndex / (STAGES.length - 1)) * 100}%` }}
        />
        <div className="status-tracker__steps">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < activeIndex;
            const isCurrent = idx === activeIndex;

            return (
              <div
                key={stage.key}
                className={`status-tracker__step ${
                  isCompleted
                    ? "is-completed"
                    : isCurrent
                    ? "is-current"
                    : "is-pending"
                }`}
              >
                <div className="status-tracker__node">
                  {isCompleted ? "✓" : stage.icon}
                </div>
                <div className="status-tracker__label-wrap">
                  <p className="status-tracker__step-label">{stage.label}</p>
                  <span className="status-tracker__step-status">
                    {isCompleted ? "Completed" : isCurrent ? "Active Stage" : "Upcoming"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Stage Callout Box */}
      <div className="status-tracker__callout">
        <div className="status-tracker__callout-icon">
          {STAGES[activeIndex].icon}
        </div>
        <div className="status-tracker__callout-content">
          <div className="status-tracker__callout-headline">
            <strong>Current Focus: {STAGES[activeIndex].label}</strong>
            <span className="status-tracker__updated">Updated {updatedAt}</span>
          </div>
          <p className="status-tracker__callout-desc">
            {STAGES[activeIndex].description}
          </p>
        </div>
      </div>
    </div>
  );
}
