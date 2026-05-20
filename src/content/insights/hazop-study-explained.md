---
slug: hazop-study-explained
title: "How a HAZOP Study Works: A Process Engineer's Guide"
date: "2025-05-15"
category: "Safety"
excerpt: "From guide words to worksheet structure — a complete walkthrough of the HAZOP process, written for process engineers."
readTime: "8 min read"
---

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
