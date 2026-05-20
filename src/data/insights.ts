export interface Article {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: string;
  featured?: boolean;
  content: string;
}

export const articles: Article[] = [
  {
    slug: 'heat-mass-balance-guide',
    title: 'What Goes Into a Heat & Mass Balance Sheet',
    date: '2025-05-01',
    category: 'Process Design',
    excerpt: "A heat and mass balance is one of the most fundamental process engineering deliverables. Here's what it contains, how it's built, and what EPC teams use it for.",
    readTime: '7 min read',
    featured: true,
    content: `
## What Is an H&MB and Why It Matters

A Heat and Mass Balance (H&MB) is a quantitative representation of material flows, compositions, temperatures, and pressures throughout a process plant. In EPC projects, it forms the backbone of process design — every piece of equipment is sized, every utility estimated, and every safety review anchored to its data.

Without an accurate H&MB, the project has no reliable basis. Overestimated flows lead to oversized, costly equipment. Underestimated loads create operational bottlenecks. Both outcomes are expensive and avoidable.

## Stream Table Structure

The H&MB is typically presented as a stream table, organized around the process flow diagram (PFD). Each column represents a stream; each row is a process variable.

Standard rows include:
- **Stream number** — unique identifier tied to the PFD
- **Temperature (°C)** — operating temperature
- **Pressure (kPa or bar g)** — operating pressure
- **Total mass flow (kg/h)** — overall stream flowrate
- **Molar flow (kmol/h)** — for thermodynamic calculations
- **Vapor fraction** — phase state (0 = liquid, 1 = vapour, 0–1 = mixed)
- **Component compositions** — mole or mass fractions for each species
- **Enthalpy (kW or kcal/h)** — heat content, used for energy balance
- **Density and molecular weight** — for equipment sizing

Compositions are listed for every component in the system, even if trace. EPC reviewers look for completeness — missing components are a common rejection reason.

## How It Connects to the PFD

The H&MB and PFD are inseparable documents. Stream numbers on the PFD directly reference columns in the stream table. Equipment tags (heat exchangers, separators, pumps) map to process blocks between streams.

A reviewer should be able to trace any stream from the PFD directly to its full thermodynamic description in the table — and back. This traceability is what makes EPC review possible.

## Common Errors to Avoid

1. **Missing trace components** — Even if <0.1%, they can affect phase behaviour and equipment selection.
2. **Inconsistent basis** — Mixing mass and molar flows without clear labelling causes confusion.
3. **No stream at battery limits** — Feed inlet and product outlet conditions must be clearly defined.
4. **Using default fluid packages** — Always select the appropriate EOS (Peng-Robinson for hydrocarbons, NRTL for polar systems, etc.).
5. **No design margins noted** — State whether flows are normal, maximum, or design cases.

## What an EPC Client Expects

EPC review teams look for:
- All PFD streams numbered and matched
- Both normal and design case conditions
- Utility streams included (steam, cooling water, heating)
- Clear phase designations
- Source of physical property data documented
- Mass balance closure within ±1%

A well-structured H&MB reduces review cycles and accelerates approval.

## Tools: Aspen Plus, HYSYS, Excel Templates

Most industry H&MBs are generated from simulation:
- **Aspen HYSYS** — preferred for oil and gas, natural gas processing
- **Aspen Plus** — preferred for chemical, polymer, and solids processes
- **Excel templates** — used to present simulation output in client-standard formats

Simulation output must be reformatted for submission. Raw simulator printouts are rarely acceptable for EPC deliverables. The format should match the client's document template or their preferred standard (e.g., DEP, Jacobs, Wood Group).
    `,
  },
  {
    slug: 'hysys-vs-aspen-plus',
    title: 'Aspen HYSYS vs Aspen Plus: Which Should You Use?',
    date: '2025-05-08',
    category: 'Simulation',
    excerpt: 'The core difference between the two leading process simulators — and a practical recommendation by project type.',
    readTime: '5 min read',
    content: `
## The Core Difference

Aspen HYSYS and Aspen Plus are both developed by AspenTech and both solve steady-state and dynamic process simulations. But they were designed for different industries, and using the wrong tool adds friction.

**HYSYS** was originally developed for the oil, gas, and refinery industry. Its thermodynamic libraries, native fluid packages, and workflow are optimised for hydrocarbon processing, natural gas, and refinery unit operations.

**Aspen Plus** was developed for the chemical process industry. It handles electrolytes, solids handling, polymer processes, and non-hydrocarbon reaction chemistry far better than HYSYS.

## When to Use HYSYS

Use Aspen HYSYS when your project involves:
- Natural gas processing (dehydration, compression, LNG)
- Crude oil fractionation and refinery units
- Gas/liquid separations and flash calculations
- Pipeline hydraulic modelling
- Produced water systems
- Any process where Peng-Robinson EOS is the right thermodynamic model

HYSYS's interactive flowsheet and real-time recalculation make it fast for exploratory process design. Engineers can modify flows on the fly and see immediate results.

## When to Use Aspen Plus

Use Aspen Plus when your process involves:
- Electrolyte systems (amines, caustic scrubbing, acid gas)
- Polymer and biopolymer processes
- Solids handling (crystallisers, dryers, crushers)
- Complex reaction systems with kinetics
- Specialty chemicals with NRTL or UNIQUAC thermodynamics
- Rigorous distillation with activity coefficient models

Aspen Plus offers more robust handling of non-ideal mixtures and a broader component database for specialty chemicals.

## Dynamic Simulation: HYSYS Advantage

For dynamic simulation (operability studies, pressure relief analysis, control system design), HYSYS Dynamics is generally the industry standard in the oil and gas sector. Its dynamic case is tightly integrated with the steady-state model, making the transition relatively smooth.

Aspen Plus Dynamics exists but is less commonly used outside chemical plant operability studies.

## Practical Recommendation by Project Type

| Project Type | Recommended Tool |
|---|---|
| LNG / Gas Processing | HYSYS |
| Refinery units (CDU, VDU, FCC) | HYSYS |
| Amine gas treating | Aspen Plus (with ELECNRTL) |
| Fertilizer (ammonia, urea) | Aspen Plus |
| Petrochemicals (ethylene, aromatics) | HYSYS or Aspen Plus |
| Specialty chemicals | Aspen Plus |
| Produced water / water treatment | Aspen Plus |

When in doubt for a hydrocarbon project: use HYSYS. When in doubt for a chemical project: use Aspen Plus. If thermodynamic fit is unclear, do a quick fluid package benchmarking study before committing.
    `,
  },
  {
    slug: 'hazop-study-explained',
    title: "How a HAZOP Study Works: A Process Engineer's Guide",
    date: '2025-05-15',
    category: 'Safety',
    excerpt: 'From guide words to worksheet structure — a complete walkthrough of the HAZOP process, written for process engineers.',
    readTime: '8 min read',
    content: `
## What Is HAZOP and Why It's Done

HAZOP — Hazard and Operability Study — is a structured and systematic examination of a process design to identify hazards, operability issues, and potential deviations from design intent. It is mandated for virtually all new process plant designs and is conducted against IEC 61882 internationally.

The goal is not to fix problems during the study — it's to identify them. Action items are raised, assigned, and closed by the project team after the study. The HAZOP itself is a discovery exercise.

## The Team: Who Attends and Why

A HAZOP study requires a multi-discipline team. Key roles include:

- **HAZOP Chairman/Facilitator** — leads the sessions, ensures methodology is followed, keeps pace
- **Process Engineer** — knows the design intent; the primary technical voice
- **P&ID Designer or Piping Engineer** — answers questions about physical arrangement
- **Instrumentation Engineer** — addresses control loops, alarms, interlocks
- **Operations Representative** — provides operating experience and flags operability issues
- **Safety Engineer** — ensures hazard identification is rigorous
- **Project Engineer** — tracks scope and ensures issues are recorded

The scribe records all deviations, causes, consequences, safeguards, and actions in the worksheet.

## Guide Words and Deviations

The HAZOP methodology uses "guide words" applied to process parameters to systematically generate deviations:

| Guide Word | Meaning |
|---|---|
| NO / NONE | Complete negation of design intent |
| MORE | Quantitative increase |
| LESS | Quantitative decrease |
| AS WELL AS | Qualitative modification (addition) |
| PART OF | Qualitative modification (reduction) |
| REVERSE | Opposite of design intent |
| OTHER THAN | Complete substitution |

Applied to parameters: Flow, Temperature, Pressure, Level, Composition, Phase, and others as relevant.

Example: Guide word **MORE** applied to **Temperature** = "High Temperature" → causes, consequences, safeguards, and actions.

## Node-by-Node Walkthrough

The process is divided into nodes — manageable sections, typically bounded by major equipment items or process boundaries. Each node is examined line by line.

For each node, the team:
1. Reviews the P&ID for that section
2. States the design intent
3. Applies each guide word to each relevant parameter
4. Identifies credible causes of that deviation
5. Describes the consequences
6. Notes existing safeguards (instrumentation, interlocks, relief devices)
7. Assesses if safeguards are adequate
8. Raises action items where safeguards are insufficient or unclear

## Worksheet Structure

The HAZOP worksheet captures:
- **Node number and description**
- **Design intent**
- **Deviation** (guide word + parameter)
- **Causes** (all credible initiating events)
- **Consequences** (worst credible outcome without safeguards)
- **Safeguards** (existing controls, alarms, interlocks)
- **Risk assessment** (likelihood × consequence)
- **Actions** (recommendation, responsible party, target date)

Worksheets are the legal record of the study. They must be complete, traceable, and unambiguous.

## What Happens After the Study

The HAZOP closes with an action register. Each action is assigned to a discipline owner with a target completion date. Actions are categorised by risk ranking.

The engineer's role continues after the study:
- Revising P&IDs to reflect actions
- Updating cause and effect matrices
- Adding or modifying interlocks
- Issuing revised datasheets

The HAZOP is not closed until all critical actions are resolved. For safety-critical items, independent verification may be required before project sanction.

## Common Gaps Engineers Miss

1. **Incomplete P&IDs at study** — A HAZOP run against an incomplete P&ID produces an incomplete result. The P&ID should be at least 95% complete before the study starts.
2. **Not questioning safeguards** — Existing instrumentation is a safeguard only if it is functional, tested, and adequate for the consequence. An alarm is not a safeguard if there is no operator response procedure.
3. **Ignoring utility deviations** — Loss of cooling water, instrument air failure, and power failure are classic HAZOP nodes that are frequently underexamined.
4. **Missing start-up/shutdown nodes** — Steady-state HAZOP misses transient deviations. Start-up and shutdown should be explicitly covered.
5. **Assuming consequences without calculation** — "High temperature could cause overpressure" should be supported by a calculation, not assumed. Actions should be raised to verify consequence severity where it is uncertain.
    `,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export const categories = ['All', 'Process Design', 'Simulation', 'EPC Workflows', 'Safety', 'Industry'];
