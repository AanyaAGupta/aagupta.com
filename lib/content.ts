// All site copy lives here so updating the site (new job, new paper) is a one-file edit.

export const profile = {
  scholar: 'https://scholar.google.com/citations?user=KvBO2ugAAAAJ&hl=en',
  name: 'Aanya Gupta',
  email: 'aanya.gupta30@duke.edu',
  github: 'https://github.com/AanyaAGupta',
  linkedin: 'https://linkedin.com/in/aanyagupta1',
  resume: '/Aanya_Gupta_Resume.pdf',
  school: 'Duke University',
  major: 'Biomedical Engineering & Electrical and Computer Engineering',
  majorNote: 'intended double major',
  gradYear: '2030',
}

// ---------------------------------------------------------------------------
// The Climb: experience, most recent first.
// ---------------------------------------------------------------------------

export type Pitch = {
  org: string
  role: string
  dates: string
  location: string
  summary: string
  points: string[]
  badge?: string
  logo?: string // path in /public/logos
  link?: { label: string; href: string }
}

export const pitches: Pitch[] = [
  {
    org: 'Duke University',
    logo: '/logos/duke.svg',
    role: 'B.S.E. Biomedical Engineering & Electrical and Computer Engineering (intended)',
    dates: '2026 — 2030',
    location: 'Durham, NC',
    summary: 'Where the route goes next.',
    points: [
      'Relevant coursework: Data Structures & Computer Algorithms, Differential Equations, Chemistry/Biology, Engineering Design',
    ],
  },
  {
    org: 'Raytheon',
    logo: '/logos/raytheon.svg',
    role: 'Software & Research Intern',
    dates: 'Jun — Aug 2026',
    location: 'Arlington, VA',
    badge: 'Return offer · Summer 2027',
    summary: 'Evaluation infrastructure for a fraud-detection research program.',
    points: [
      'Rebuilt a fragmented benchmarking pipeline into a modular, end-to-end evaluation framework in Python, cutting per-run setup from 4 hours to 10 minutes and making results reproducible across 5 data sources.',
      'Benchmarked anomaly-detection models against realistic synthetic event data and characterized 3 failure modes where detectors missed suspicious activity. The test harness was adopted by a 35-person team and 3 customers.',
    ],
  },
  {
    org: 'MIT Beaver Works Summer Institute',
    logo: '/logos/mit.svg',
    role: 'Quantum Software',
    dates: 'Jun — Aug 2025',
    location: 'Cambridge, MA',
    summary: 'Exact simulation of the 1D transverse-field Ising spin chain.',
    points: [
      'Built an exact quantum simulation of the 1D transverse-field Ising model in Q# and Qiskit; published on GitHub.',
      'Applied quantum algorithms (Quantum Fourier Transform, Shor’s) to optimize circuit efficiency; presented to 500+ peers.',
    ],
  },
  {
    org: 'Agent-Based Modeling Research',
    logo: '/logos/gmu.svg',
    role: 'Research Intern · Dr. Taylor Anderson',
    dates: 'May 2024 — Present',
    location: 'Fairfax, VA',
    summary: 'Computational models for public health decision-making.',
    points: [
      'Engineered an agent-based model of vaccine uptake across 5.5K synthetic agents linking social factors and health policy.',
      'Pioneered a small-area estimation approach using iterative proportional fitting, improving local health-outcome predictions by 2% over CDC benchmarks across 50+ counties.',
      'Co-authored 4 peer-reviewed publications and open-sourced model code and datasets.',
    ],
    link: { label: 'See the research', href: '/research' },
  },
  {
    org: 'Stanford Clinical Science, Technology & Medicine',
    logo: '/logos/stanford.png',
    role: 'Summer Intern · Stanford medX',
    dates: 'Jun — Jul 2024',
    location: 'Stanford, CA',
    summary: 'AIDKnIT: AI-driven robotics for patient-centered care.',
    points: [
      'Developed AIDKnIT, an AI-driven robotics concept for patient-centered care, with the Stanford medX team and clinicians.',
      'Produced and presented an ePatient case study to clinicians and engineering mentors.',
    ],
  },
  {
    org: 'HackTJ',
    logo: '/logos/hacktj.png',
    role: 'Winner → President / Director',
    dates: 'Mar 2023 — Jun 2026',
    location: 'Tysons, VA',
    badge: '1st of 520',
    summary: 'Won it, then ran it.',
    points: [
      'Built SwiftStudy, an app that turns uploaded notes into source-linked study questions (OpenAI API, AWS). Placed 1st out of 520 participants.',
      'Later led HackTJ as President / Director.',
    ],
  },
  {
    org: 'Givology',
    logo: '/logos/givology.png',
    role: 'Head of Events & Special Projects',
    dates: 'Sep 2022 — Present',
    location: 'Fairfax, VA',
    summary: 'Global education nonprofit (501(c)(3)).',
    points: [
      'Spearheaded 6 fundraising campaigns raising over $18K for education initiatives for children in developing countries.',
      'Managed Facebook and LinkedIn presence with 7.8K followers.',
    ],
  },
  {
    org: 'Thomas Jefferson High School for Science and Technology',
    logo: '/logos/tjhsst.png',
    role: 'Advanced Studies Diploma · GPA 4.60 (W)',
    dates: 'Aug 2022 — Jun 2026',
    location: 'Alexandria, VA',
    summary: 'Base camp.',
    points: [
      'Founder, TJClimbing NGO · Associate Editor-in-Chief, TEKNOS Research Journal · President, Coding Lady Colonials',
      'Coursework: Statistics, Multivariable Calculus, Linear Algebra, AP Physics, Computer Vision, Mobile/Web Dev',
    ],
  },
]

export const honors = [
  'Congressional Award Gold Medalist',
  'International Research Olympiad Semifinalist',
  '4 peer-reviewed publications',
  '1st of 520, HackTJ',
]

export const skills = [
  { group: 'Languages & software', items: ['Python', 'C', 'C++', 'Java', 'R', 'Q#', 'Qiskit', 'HTML/CSS', 'Git/GitHub'] },
  { group: 'Data & analytics', items: ['Statistical modeling', 'Agent-based modeling', 'Tableau', 'Power BI', 'Google Analytics'] },
  { group: 'Engineering tools', items: ['AutoCAD', 'Fusion 360', 'Onshape'] },
]

// ---------------------------------------------------------------------------
// Research
// ---------------------------------------------------------------------------

export type Publication = {
  authors: string // "Gupta, A." is bolded automatically
  title: string
  venue: string
  year?: string
  status: 'Published' | 'Accepted'
  href?: string
}

export const publications: Publication[] = [
  {
    authors: 'Gupta, A., Péter, S. A., et al.',
    title: 'Geographically Weighted Surrogate Models for Rapid Small-Area Chronic Disease Estimation',
    venue: 'Applied Geography',
    status: 'Accepted',
  },
  {
    authors: 'Von Hoene, E., Gupta, A., et al.',
    title: 'A Synthetic Population and Small-Area Estimate Dataset for Health Behaviors and Outcomes in the United States',
    venue: 'Nature Scientific Data',
    status: 'Accepted',
  },
  {
    authors: 'Von Hoene, E., Gupta, A., Kavak, H., et al.',
    title:
      'Evaluation of a spatial microsimulation framework for small-area estimation of population health outcomes using the Behavioral Risk Factor Surveillance System',
    venue: 'International Journal of Health Geographics',
    year: '2026',
    status: 'Published',
    href: 'https://doi.org/10.1186/s12942-026-00485-3',
  },
  {
    authors: 'Von Hoene, E., Gupta, A., et al.',
    title: 'Evaluating the Transferability of a Synthetic Population Generation Approach for Public Health Applications',
    venue: 'Winter Simulation Conference',
    year: '2025',
    status: 'Published',
    href: 'https://doi.org/10.1109/WSC68292.2025.11338931',
  },
]

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export type Project = {
  title: string
  context: string
  dates: string
  description: string
  tags: string[]
  highlight?: string
  href?: string
}

export const projects: Project[] = [
  {
    title: 'Fraud-detection evaluation framework',
    context: 'Raytheon',
    dates: '2026',
    description:
      'A modular, end-to-end benchmarking framework for anomaly-detection models, stress-tested against realistic synthetic event data.',
    tags: ['Python', 'ML evaluation', 'Anomaly detection'],
    highlight: '4 hrs → 10 min setup',
  },
  {
    title: 'Exact Ising model simulation',
    context: 'MIT Beaver Works',
    dates: '2025',
    description:
      'An exact quantum simulation of the 1D transverse-field Ising spin chain, using QFT-based techniques to optimize circuit efficiency.',
    tags: ['Q#', 'Qiskit', 'Quantum computing'],
    highlight: 'Presented to 500+',
    href: 'https://github.com/AanyaAGupta/exact_ising_model_simulation',
  },
  {
    title: 'Vaccine-uptake agent-based model',
    context: 'Public health research',
    dates: '2024 — now',
    description:
      'Simulates 5.5K synthetic agents to connect social factors and health policy to vaccination behavior, alongside new small-area estimation methods.',
    tags: ['Agent-based modeling', 'Python', 'R', 'Public health'],
    highlight: '4 publications',
    href: '/research',
  },
  {
    title: 'AIDKnIT',
    context: 'Stanford medX',
    dates: '2024',
    description:
      'An AI-driven robotics concept for patient-centered care, designed with clinicians and presented as an ePatient case study.',
    tags: ['Healthcare', 'AI', 'Robotics', 'Design'],
  },
  {
    title: 'SwiftStudy',
    context: 'HackTJ',
    dates: '2023',
    description: 'Upload your notes and get back study questions, each linked to its source.',
    tags: ['OpenAI API', 'AWS', 'Web'],
    highlight: '1st of 520',
    href: 'https://github.com/AanyaAGupta/SwiftStudy',
  },
]

// ---------------------------------------------------------------------------
// About / photos
// ---------------------------------------------------------------------------

export const adventures = [
  { src: '/photos/patagonia-rock-climbing.jpg', alt: 'Climbing a granite wall in Patagonia', caption: 'Climbing in El Chaltén, Patagonia', w: 2000, h: 1125 },
  { src: '/photos/patagonia-glacier-hike.jpg', alt: 'Aanya hiking in front of a glacier', caption: 'Glacier hike, Patagonia', w: 1125, h: 2000 },
  { src: '/photos/sedona-red-rocks.jpg', alt: 'Aanya among the red rocks of Sedona', caption: 'Red rocks, Sedona', w: 2000, h: 1500 },
  { src: '/photos/arizona-slot-canyon.jpg', alt: 'Exploring a sandstone slot canyon', caption: 'Slot canyon, Arizona', w: 1500, h: 2000 },
  { src: '/photos/patagonia-kayaking.jpg', alt: 'Kayaking on a glacial lake below mountains', caption: 'Kayaking near Bariloche', w: 2000, h: 1500 },
  { src: '/photos/surfing.jpg', alt: 'Aanya surfing a wave', caption: 'Catching a wave', w: 1206, h: 657 },
]

export const food = [
  { src: '/photos/food/shakshuka-brunch.jpg', alt: 'Shakshuka brunch spread with bread and dips' },
  { src: '/photos/food/tacos.jpg', alt: 'Tacos and fajitas' },
  { src: '/photos/food/mezze-spread.jpg', alt: 'Mezze spread with hummus, salad, and pita' },
  { src: '/photos/food/tartines.jpg', alt: 'Burrata and smoked salmon tartines' },
  { src: '/photos/food/indian-feast.jpg', alt: 'Indian feast with rice, curry, and chutneys' },
  { src: '/photos/food/ceviche-and-guac.jpg', alt: 'Ceviche and guacamole with chips' },
  { src: '/photos/food/thai-noodles.jpg', alt: 'Thai noodles, tofu, and stir-fry' },
  { src: '/photos/food/calamari-and-tempura.jpg', alt: 'Fried calamari and shrimp tempura' },
  { src: '/photos/food/mediterranean-grill.jpg', alt: 'Mediterranean grill platter' },
  { src: '/photos/food/caprese-and-cookie.jpg', alt: 'Caprese salad and a chocolate chip cookie' },
]

// ---------------------------------------------------------------------------
// Places I've been (coordinates are for the map: [longitude, latitude])
// ---------------------------------------------------------------------------

export type Place = { name: string; coords: [number, number] }
export type Region = { region: string; places: Place[] }

export const travels: Region[] = [
  {
    region: 'United States',
    places: [
      { name: 'Durham, NC', coords: [-78.9, 35.99] },
      { name: 'Outer Banks, NC', coords: [-75.6, 35.56] },
      { name: 'New York City', coords: [-74.01, 40.71] },
      { name: 'Boston', coords: [-71.06, 42.36] },
      { name: 'Maine', coords: [-69.0, 45.25] },
      { name: 'Chicago', coords: [-87.63, 41.88] },
      { name: 'Milwaukee, WI', coords: [-87.91, 43.04] },
      { name: 'Alaska', coords: [-150.0, 63.0] },
      { name: 'Sedona, AZ', coords: [-111.76, 34.87] },
      { name: 'Arizona slot canyons', coords: [-111.37, 36.86] },
      { name: 'Stanford / Palo Alto, CA', coords: [-122.16, 37.43] },
      { name: 'San Francisco', coords: [-122.42, 37.77] },
    ],
  },
  {
    region: 'Caribbean',
    places: [{ name: 'Bonaire', coords: [-68.27, 12.15] }],
  },
  {
    region: 'Argentina',
    places: [
      { name: 'Buenos Aires', coords: [-58.38, -34.6] },
      { name: 'Bariloche', coords: [-71.31, -41.13] },
      { name: 'El Calafate', coords: [-72.27, -50.34] },
      { name: 'El Chaltén', coords: [-72.89, -49.33] },
    ],
  },
  {
    region: 'Europe',
    places: [
      { name: 'Paris', coords: [2.35, 48.86] },
      { name: 'Venice', coords: [12.32, 45.44] },
      { name: 'Rome', coords: [12.5, 41.9] },
      { name: 'Naples', coords: [14.27, 40.85] },
      { name: 'Sorrento', coords: [14.38, 40.63] },
    ],
  },
  {
    region: 'Egypt',
    places: [
      { name: 'Cairo', coords: [31.24, 30.04] },
      { name: 'Aswan', coords: [32.9, 24.09] },
    ],
  },
  {
    region: 'India',
    places: [
      { name: 'Chennai', coords: [80.27, 13.08] },
      { name: 'Bangalore', coords: [77.59, 12.97] },
    ],
  },
]

// ---------------------------------------------------------------------------
// Goals
// ---------------------------------------------------------------------------

export const goals = [
  { title: 'Travel the world', body: 'Seven countries so far, and there’s a long list of places I haven’t been yet.' },
  { title: 'Explore new things', body: 'New routes, new recipes, new fields. I’d rather try it than wonder about it.' },
  { title: 'Build tech that helps health', body: 'Tools and models that help people make better decisions about their health.' },
  { title: 'Meet new people & perspectives', body: 'The best ideas I’ve had came from conversations with people who think differently.' },
]
