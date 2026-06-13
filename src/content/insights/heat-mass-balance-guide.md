---
slug: heat-mass-balance-guide
title: "What Goes Into a Heat & Mass Balance Sheet"
date: "2025-05-01"
category: "Process Design"
excerpt: "A heat and mass balance is one of the most fundamental process engineering deliverables. Here's what it contains, how it's built, and what EPC teams use it for."
readTime: "7 min read"
featured: true
---

## What Is an H&MB and Why It Matters

A Heat and Mass Balance (H&MB) is a quantitative representation of material flows, compositions, temperatures, and pressures throughout a process plant. In EPC projects, it forms the backbone of process design — every piece of equipment is sized, every utility estimated, and every safety review anchored to its data.

Without an accurate H&MB, the project has no reliable basis. Overestimated flows lead to oversized, costly equipment. Underestimated loads create operational bottlenecks. Both outcomes are expensive and avoidable.

## Stream Table Structure

The H&MB is typically presented as a stream table, organized around the piping and instrumentation diagram (P&ID). Each column represents a stream; each row is a process variable.

Standard rows include:
- **Stream number** — unique identifier tied to the P&ID
- **Temperature (°C)** — operating temperature
- **Pressure (kPa or bar g)** — operating pressure
- **Total mass flow (kg/h)** — overall stream flowrate
- **Molar flow (kmol/h)** — for thermodynamic calculations
- **Vapor fraction** — phase state (0 = liquid, 1 = vapour, 0–1 = mixed)
- **Component compositions** — mole or mass fractions for each species
- **Enthalpy (kW or kcal/h)** — heat content, used for energy balance
- **Density and molecular weight** — for equipment sizing

Compositions are listed for every component in the system, even if trace. EPC reviewers look for completeness — missing components are a common rejection reason.

## How It Connects to the P&ID

The H&MB and P&ID are inseparable documents. Stream numbers on the P&ID directly reference columns in the stream table. Equipment tags (heat exchangers, separators, pumps) map to process blocks between streams.

A reviewer should be able to trace any stream from the P&ID directly to its full thermodynamic description in the table — and back. This traceability is what makes EPC review possible.

## Common Errors to Avoid

1. **Missing trace components** — Even if <0.1%, they can affect phase behaviour and equipment selection.
2. **Inconsistent basis** — Mixing mass and molar flows without clear labelling causes confusion.
3. **No stream at battery limits** — Feed inlet and product outlet conditions must be clearly defined.
4. **Using default fluid packages** — Always select the appropriate EOS (Peng-Robinson for hydrocarbons, NRTL for polar systems, etc.).
5. **No design margins noted** — State whether flows are normal, maximum, or design cases.

## What an EPC Client Expects

EPC review teams look for:
- All P&ID streams numbered and matched
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
