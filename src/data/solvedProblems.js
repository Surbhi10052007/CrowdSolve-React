// solvedProblems.js — Dataset of civic problems that have been
// successfully resolved across different Indian cities.
//
// Each entry has: id, city, problemTitle, description, imageUrl.
// Where imageUrl is empty/null a placeholder URL is used so the
// component can always render an <img> without extra branching.

export const PLACEHOLDER = "https://placehold.co/600x400?text=No+Image+Available";

export const solvedProblems = [
  // ────────────────── Delhi ──────────────────
  {
    id: 1,
    city: "Delhi",
    problemTitle: "ITO Traffic Signal Upgraded",
    description:
      "The faded and malfunctioning traffic signal at ITO Junction was replaced with a high-visibility LED unit after 210 community votes. Accident rates at the junction dropped by 40% in the first month.",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    city: "Delhi",
    problemTitle: "Central Delhi Footpath Repaired",
    description:
      "Broken and uneven footpath tiles along the Central Delhi main road were relaid, removing the dangerous obstacle that forced pedestrians onto the carriageway.",
    imageUrl:
      "https://images.unsplash.com/photo-1508002366005-75a695ee2d17?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    city: "Delhi",
    problemTitle: "Vasant Kunj Illegal Dump Cleared",
    description:
      "An unofficial garbage dump that had grown for months near Vasant Kunj residential blocks was fully cleared after the municipal authority included the site in its daily collection route.",
    imageUrl: "",
  },

  // ────────────────── Mumbai ──────────────────
  {
    id: 4,
    city: "Mumbai",
    problemTitle: "Dadar Bin Overflow Fixed",
    description:
      "Following 178 upvotes and a petition to the BMC, garbage collection frequency at Dadar Market was increased to three times daily, eliminating the chronic overflow problem.",
    imageUrl:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    city: "Mumbai",
    problemTitle: "Bandra Promenade Benches Restored",
    description:
      "All broken and missing benches at the Bandra Bandstand promenade were replaced with weather-resistant composite-wood seats, making the seafront accessible for elderly visitors and families again.",
    imageUrl:
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    city: "Mumbai",
    problemTitle: "Andheri Subway Drainage Improved",
    description:
      "New storm-water pumps were installed in the Andheri subway after the flooding issue reached 412 votes — the highest in the city. The subway remained passable throughout the last monsoon season.",
    imageUrl: "",
  },

  // ────────────────── Bengaluru ──────────────────
  {
    id: 7,
    city: "Bengaluru",
    problemTitle: "Whitefield E-Waste Drive Completed",
    description:
      "A coordinated e-waste pickup campaign collected over 2 tonnes of discarded electronics from the Whitefield roadside. A registered recycler now visits the tech-park zone bimonthly.",
    imageUrl:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop",
  },
  {
    id: 8,
    city: "Bengaluru",
    problemTitle: "Koramangala Drains Desilted",
    description:
      "Storm-water drains in Koramangala 5th Block were fully desilted and widened, preventing road flooding during light rainfall and eliminating the health hazard reported by residents.",
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
  },
  {
    id: 9,
    city: "Bengaluru",
    problemTitle: "Christ University Back Road Lit Up",
    description:
      "Six new solar-powered streetlights were installed along the university's back road, making evening walks to hostels safe after multiple student complaints gained 205 votes.",
    imageUrl: "",
  },

  // ────────────────── Chandigarh ──────────────────
  {
    id: 10,
    city: "Chandigarh",
    problemTitle: "Panjab University Wi-Fi Upgraded",
    description:
      "The campus Wi-Fi infrastructure in the central library was fully replaced with fibre-backed access points. Disconnection issues that plagued students during exams are now resolved.",
    imageUrl:
      "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=600&h=400&fit=crop",
  },
  {
    id: 11,
    city: "Chandigarh",
    problemTitle: "Sector 17 Pothole Patched",
    description:
      "The large pothole near the Sector 17 market entrance that had caused multiple skidding incidents was permanently patched with hot-mix asphalt after sustained community pressure.",
    imageUrl:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&h=400&fit=crop",
  },

  // ────────────────── Pune ──────────────────
  {
    id: 12,
    city: "Pune",
    problemTitle: "Aundh Waste Segregation Campaign",
    description:
      "A door-to-door awareness drive in Aundh resulted in 80% of households switching to dual-bin segregation within 6 weeks, significantly improving the local recycling pipeline.",
    imageUrl:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop",
  },
  {
    id: 13,
    city: "Pune",
    problemTitle: "Kothrud Water Supply Regularised",
    description:
      "After 154 votes and escalation to PMRDA, a faulty distribution valve was repaired, restoring regular 6-hour daily water supply to the Kothrud housing society.",
    imageUrl: "",
  },

  // ────────────────── Hyderabad ──────────────────
  {
    id: 14,
    city: "Hyderabad",
    problemTitle: "Begumpet Garbage Route Restored",
    description:
      "The GHMC added the previously skipped lane in Begumpet back onto the daily garbage collection route after the problem received 143 upvotes, ending the illegal roadside dumping.",
    imageUrl:
      "https://images.unsplash.com/photo-1542601906897-cee1e57c65d5?w=600&h=400&fit=crop",
  },
  {
    id: 15,
    city: "Hyderabad",
    problemTitle: "Kukatpally Park Equipment Replaced",
    description:
      "Rusted swings and broken slides at the Kukatpally neighbourhood park were replaced with new powder-coated play equipment after a community petition backed by 101 votes.",
    imageUrl:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&h=400&fit=crop",
  },

  // ────────────────── Jaipur ──────────────────
  {
    id: 16,
    city: "Jaipur",
    problemTitle: "Central Park Lighting Installed",
    description:
      "LED lampposts were installed along the inner walking track and eastern entrance of Jaipur's Central Park, enabling safe evening walks for the hundreds of daily visitors.",
    imageUrl:
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&h=400&fit=crop",
  },
  {
    id: 17,
    city: "Jaipur",
    problemTitle: "Old City Drain Unblocked",
    description:
      "Narrow heritage drains near the old city wall were cleared of plastic waste and fitted with mesh screens to prevent re-blockage, preserving the walking route for tourists and locals alike.",
    imageUrl: "",
  },
];

// Helper — get all unique cities present in solvedProblems.
export const solvedCities = [...new Set(solvedProblems.map((p) => p.city))];
