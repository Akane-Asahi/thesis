# design-screen.md

Before designing:

Read:
- CLAUDE.md
- docs/research/professor-feedback.md
- docs/design/ui-specification.md
- relevant user-flow documentation.

Design strictly within the current research scope.

---

## OUTPUT REQUIREMENTS

You MUST output **ASCII Visual Layouts (Wireframes / Box Art)** as the core of the design. 

For every screen specified, generate a complete ASCII visual mockup for **ALL relevant user states** (e.g., State A: New / Empty, State B: Returning / Active, etc.).

For every screen, strictly format the output with the following sections:

### 1. Visual Layouts (ASCII Wireframes)
- Provide full-width ASCII box-art wireframes for EACH user state.
- Clearly show layout hierarchy, headers, persistent orientation bars, text inputs, buttons, chips, AI suggestions, and state badges.
- Do not abbreviate or truncate the visual layout.

### 2. Purpose & Metacognitive Role
- Primary objective of the screen.
- Position in the metacognitive cycle:
  `[ Planning ] → Monitoring → Evaluation → Revision → Search Triage → Organization → Cross-Session Resumption`

### 3. User States
- Explicitly define State A (New / First-Time), State B (Returning / Interrupted), and any alternate states.

### 4. Visible Information Matrix
- Table mapping displayed data points across each state.

### 5. Component Breakdown
- List each UI component, its function, interaction pattern, and state behavior.

### 6. AI vs. User Content
- Explicit breakdown of AI-generated elements vs. user-authored elements (enforcing explicit accept/reject patterns and attribution).

### 7. Interaction & Transitions
- Input mechanisms and primary/secondary transition targets.

### 8. Strict Scope Justification Table
Every component MUST explicitly support at least one of these core metacognitive functions:
- Planning
- Monitoring
- Evaluation
- Revision
- Search triage
- Organization
- Cross-session resumption

*Rule: Do not add features merely because they look useful or visually appealing.*

---

## FILE SAVING REQUIREMENT

Finally, save the complete output as a Markdown file inside the `design/` folder using the screen's page name:
`docs/design/<screen-page-name>.md`