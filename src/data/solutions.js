// solutions.js — Mock solutions data.
// Each solution belongs to one problem (via problemId).
// Votes are starting numbers — VoteButton updates them in localStorage.

export const solutions = [
  // Problem 1: Pothole near Sector 17
  {
    id: 101, problemId: 1,
    title: "Temporary cold-mix patching until monsoon ends",
    description: "Use cold-mix asphalt as a quick fix so the pothole doesn't grow further, then schedule a permanent repair once the rains stop.",
    author: "Harpreet Singh", date: "2026-06-04",
    upvotes: 210, downvotes: 12, comments: 16,
  },
  {
    id: 102, problemId: 1,
    title: "Report to municipal pothole tracker app",
    description: "File the complaint directly on the municipal corporation's pothole-tracking app so it gets a tracked ticket number instead of relying on word of mouth.",
    author: "Deepak Chawla", date: "2026-06-03",
    upvotes: 74, downvotes: 5, comments: 4,
  },

  // Problem 2: Garbage after market day
  {
    id: 103, problemId: 2,
    title: "Extra pickup slot on market evenings",
    description: "Request the municipal corporation to add one additional collection round every market day evening instead of waiting for the next morning.",
    author: "Simran Kaur", date: "2026-05-29",
    upvotes: 132, downvotes: 9, comments: 11,
  },

  // Problem 3: Streetlights not working
  {
    id: 104, problemId: 3,
    title: "Bulk LED replacement drive",
    description: "Organise a one-time bulk replacement of the faulty bulbs with LED units, which last longer and reduce future maintenance calls.",
    author: "Arjun Sethi", date: "2026-05-16",
    upvotes: 58, downvotes: 3, comments: 6,
  },

  // Problem 4: Panjab University Wi-Fi
  {
    id: 105, problemId: 4,
    title: "Add a second access point in the library",
    description: "The current single router is overloaded during exam season. A second access point on the far side of the library would balance the load.",
    author: "Neha Kapoor", date: "2026-05-01",
    upvotes: 96, downvotes: 4, comments: 9,
  },
  {
    id: 106, problemId: 4,
    title: "Switch to a wired lab for exam weeks",
    description: "During exam weeks, redirect students to the wired computer lab instead of relying on Wi-Fi, which is more stable for timed submissions.",
    author: "Ibrahim Sheikh", date: "2026-04-29",
    upvotes: 41, downvotes: 7, comments: 3,
  },

  // Problem 5: Broken footpath Central Delhi
  {
    id: 107, problemId: 5,
    title: "Interlocking tiles instead of loose paving",
    description: "Replace the broken paving stones with interlocking tiles, which are cheaper to repair individually when damaged again in the future.",
    author: "Karan Malhotra", date: "2026-06-06",
    upvotes: 88, downvotes: 6, comments: 7,
  },

  // Problem 6: Water supply shortage Lajpat Nagar
  {
    id: 108, problemId: 6,
    title: "Publish a fixed tanker schedule",
    description: "Ask the water board to publish a fixed daily tanker schedule for the affected blocks so residents can plan storage instead of waiting all day.",
    author: "Priya Sharma", date: "2026-05-21",
    upvotes: 201, downvotes: 14, comments: 22,
  },
  {
    id: 109, problemId: 6,
    title: "Inspect for a possible pipeline leak",
    description: "Request an inspection of the main pipeline feeding the area, since a leak upstream could explain the sudden drop in supply hours.",
    author: "Farhan Iqbal", date: "2026-05-20",
    upvotes: 156, downvotes: 8, comments: 14,
  },

  // Problem 7: Garbage dump Vasant Kunj
  {
    id: 110, problemId: 7,
    title: "Install a fenced collection point with signage",
    description: "A clearly marked, fenced collection point with signage would discourage random dumping and give the collection crew a fixed pickup spot.",
    author: "Aditya Verma", date: "2026-05-11",
    upvotes: 77, downvotes: 5, comments: 8,
  },

  // Problem 8: Faded traffic signal ITO
  {
    id: 111, problemId: 8,
    title: "Replace with high-visibility LED signal heads",
    description: "Swap the old bulb-based signal heads for high-visibility LED units, which stay bright even in direct sunlight.",
    author: "Meera Nair", date: "2026-04-23",
    upvotes: 143, downvotes: 6, comments: 10,
  },

  // Problem 9: Waterlogging Andheri subway
  {
    id: 112, problemId: 9,
    title: "Install a higher-capacity pump at the subway",
    description: "The existing pump can't keep up with peak monsoon inflow. A higher-capacity pump with an automatic sensor switch would clear water faster.",
    author: "Rohan Pillai", date: "2026-06-09",
    upvotes: 289, downvotes: 20, comments: 31,
  },
  {
    id: 113, problemId: 9,
    title: "Clear the storm drains before monsoon",
    description: "A pre-monsoon cleaning drive to clear debris from the storm drains feeding the subway would reduce how fast water accumulates.",
    author: "Vidya Menon", date: "2026-06-08",
    upvotes: 198, downvotes: 11, comments: 19,
  },

  // Problem 10: Overflowing bins Dadar
  {
    id: 114, problemId: 10,
    title: "Add a second bin during peak market hours",
    description: "Placing a second bin near the market entrance during the busiest hours would prevent overflow until the next scheduled pickup.",
    author: "Ananya Joshi", date: "2026-05-26",
    upvotes: 92, downvotes: 7, comments: 9,
  },

  // Problem 11: Damaged benches Bandra
  {
    id: 115, problemId: 11,
    title: "Community-funded bench replacement",
    description: "Start a small community fund to replace the worst-damaged benches first, similar to what nearby residential associations have done before.",
    author: "Sameer Khan", date: "2026-05-03",
    upvotes: 61, downvotes: 4, comments: 5,
  },

  // Problem 12: College Wi-Fi too slow
  {
    id: 116, problemId: 12,
    title: "Schedule tests outside peak internet hours",
    description: "Move online tests to early morning slots when overall campus internet usage is lower, reducing the chance of disconnection.",
    author: "Ishaan Rao", date: "2026-04-19",
    upvotes: 54, downvotes: 9, comments: 6,
  },

  // Problem 13: Massive pothole Outer Ring Road
  {
    id: 117, problemId: 13,
    title: "Weekend repair to avoid weekday traffic",
    description: "Schedule the repair work over a weekend when office traffic is lower, so the fix can be done without causing major jams.",
    author: "Vikram Reddy", date: "2026-06-11",
    upvotes: 245, downvotes: 18, comments: 21,
  },
  {
    id: 118, problemId: 13,
    title: "Add warning signage until repaired",
    description: "While waiting for the repair, place reflective warning signs before the stretch so riders can slow down in time, especially at night.",
    author: "Chetan Rao", date: "2026-06-10",
    upvotes: 130, downvotes: 10, comments: 12,
  },

  // Problem 14: Drainage Koramangala
  {
    id: 119, problemId: 14,
    title: "Monthly drain-clearing schedule",
    description: "Set up a recurring monthly drain-clearing schedule for this stretch instead of only reacting after it overflows.",
    author: "Divya Iyer", date: "2026-05-20",
    upvotes: 87, downvotes: 6, comments: 8,
  },

  // Problem 15: No streetlights campus
  {
    id: 120, problemId: 15,
    title: "Solar streetlights along the back road",
    description: "Solar-powered streetlights would be quicker to install here since the road already lacks a nearby electrical connection point.",
    author: "Fathima Noor", date: "2026-05-02",
    upvotes: 168, downvotes: 9, comments: 15,
  },
  {
    id: 121, problemId: 15,
    title: "Campus shuttle for late library hours",
    description: "Until lighting is fixed, run a short shuttle loop between the library and hostel blocks during late evening hours.",
    author: "Rehan Qureshi", date: "2026-05-01",
    upvotes: 121, downvotes: 13, comments: 10,
  },

  // Problem 16: E-waste Whitefield
  {
    id: 122, problemId: 16,
    title: "Partner with certified e-waste recyclers",
    description: "Set up a monthly collection partnership with a certified e-waste recycler so offices have a legitimate, easy disposal option nearby.",
    author: "Tanmay Gowda", date: "2026-04-13",
    upvotes: 140, downvotes: 7, comments: 13,
  },

  // Problem 17: Broken tiles FC Road
  {
    id: 123, problemId: 17,
    title: "Prioritise repair near the crossing point",
    description: "Fix the tiles closest to the pedestrian crossing first, since that section sees the highest foot traffic during college hours.",
    author: "Onkar Deshmukh", date: "2026-06-02",
    upvotes: 49, downvotes: 3, comments: 4,
  },

  // Problem 18: Water shortage Kothrud
  {
    id: 124, problemId: 18,
    title: "Check the society's booster pump",
    description: "Before escalating to the water board, get the housing society's own booster pump inspected, since low pressure sometimes starts there.",
    author: "Sneha Kulkarni", date: "2026-05-23",
    upvotes: 102, downvotes: 11, comments: 9,
  },

  // Problem 19: Garbage segregation Aundh
  {
    id: 125, problemId: 19,
    title: "Door-to-door segregation awareness drive",
    description: "A short door-to-door awareness drive explaining why segregation matters, paired with clearly labelled bins, usually improves compliance quickly.",
    author: "Rahul Bhosale", date: "2026-05-09",
    upvotes: 71, downvotes: 5, comments: 7,
  },

  // Problem 20: College library slow internet
  {
    id: 126, problemId: 20,
    title: "Upgrade the library's shared bandwidth plan",
    description: "The current plan is sized for far fewer concurrent users. Upgrading the bandwidth tier would fix the slowdown during busy hours.",
    author: "Aisha Pathan", date: "2026-04-26",
    upvotes: 38, downvotes: 4, comments: 3,
  },

  // Problem 21: Traffic signal Hitech City
  {
    id: 127, problemId: 21,
    title: "Manual traffic police until signal is fixed",
    description: "Station traffic police at the junction during peak hours until the signal timing is repaired, to prevent the backups from getting worse.",
    author: "Sai Kiran", date: "2026-06-07",
    upvotes: 176, downvotes: 15, comments: 17,
  },

  // Problem 22: Park equipment Kukatpally
  {
    id: 128, problemId: 22,
    title: "Replace rusted joints with weather-resistant fittings",
    description: "Use weather-resistant fittings during the repair so the equipment doesn't rust as quickly during the next monsoon season.",
    author: "Lakshmi Reddy", date: "2026-05-15",
    upvotes: 66, downvotes: 4, comments: 6,
  },

  // Problem 23: Streetlights university hostel
  {
    id: 129, problemId: 23,
    title: "Temporary motion-sensor lights",
    description: "Install battery-powered motion-sensor lights as a quick temporary fix while the permanent electrical repair is scheduled.",
    author: "Zoya Ahmed", date: "2026-05-04",
    upvotes: 84, downvotes: 6, comments: 7,
  },

  // Problem 24: Garbage Begumpet
  {
    id: 130, problemId: 24,
    title: "SMS alert when truck skips the lane",
    description: "Set up a simple SMS alert system so residents know immediately if the truck skips their lane and can escalate the same day.",
    author: "Naveen Rao", date: "2026-04-21",
    upvotes: 99, downvotes: 5, comments: 8,
  },

  // Problem 25: Pothole Malviya Nagar
  {
    id: 131, problemId: 25,
    title: "Full resurfacing instead of patch repair",
    description: "Given how many potholes are clustered together, a full resurfacing of this stretch would last longer than repeated small patches.",
    author: "Devansh Agarwal", date: "2026-06-04",
    upvotes: 118, downvotes: 9, comments: 10,
  },

  // Problem 26: Drainage old city wall
  {
    id: 132, problemId: 26,
    title: "Install mesh covers to catch plastic waste",
    description: "Fit mesh covers over the drain openings to catch plastic waste before it blocks the pipe, making manual cleaning easier.",
    author: "Kavita Sharma", date: "2026-05-18",
    upvotes: 57, downvotes: 3, comments: 5,
  },

  // Problem 27: Park lighting Jaipur
  {
    id: 133, problemId: 27,
    title: "Add lighting along the eastern entrance path",
    description: "Focus new lighting on the eastern entrance path first, since that's the darkest and most used route by evening walkers.",
    author: "Yash Chaudhary", date: "2026-04-29",
    upvotes: 73, downvotes: 5, comments: 6,
  },

  // Problem 28: School computer lab
  {
    id: 134, problemId: 28,
    title: "Apply for the state digital-classroom grant",
    description: "The state education department runs a digital-classroom grant that covers internet setup costs for government schools — the school should apply.",
    author: "Pooja Rathore", date: "2026-04-06",
    upvotes: 45, downvotes: 2, comments: 4,
  },
];

// Returns all solutions for a given problem.
export function getSolutionsByProblemId(problemId) {
  return solutions.filter((s) => s.problemId === Number(problemId));
}

// Ranking score: upvotes count double, downvotes subtracted, comments add a small boost.
export function getSolutionScore(solution) {
  return solution.upvotes * 2 - solution.downvotes + solution.comments;
}

// Finds the single highest-scoring solution across all problems.
export function getTopSolution() {
  return [...solutions].sort(
    (a, b) => getSolutionScore(b) - getSolutionScore(a)
  )[0];
}
