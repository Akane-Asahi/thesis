# UI Specification

## Product

Academic Exploratory Search System with Metacognitive Scaffolding.

## Framing & Scope

Designed to **reduce working-memory demands** during complex academic exploratory search, with readability and accessibility considerations for users with dyslexia.

*Note: The prototype focuses strictly on searching, triage, saving, organizing, and resuming. Document-level information extraction and deep text analysis remain outside the prototype's scope.*

---

## Dyslexia-Oriented Design Principles

* **Predictable Layouts:** Clear, predictable layouts with consistent, linear navigation.
* **Adjustable Typography:** Readable typography using **Lexend** as a flexible default, with user-adjustable text size (not locked to a static pixel size), line spacing, and letter spacing.
* **Content Chunking:** Short, chunked text rather than dense paragraphs.
* **Alignment Rules:** Strictly left-aligned text; avoid justified text to prevent uneven visual spacing ("rivers of white").
* **Visual Hierarchy:** Strong visual hierarchy using whitespace, distinct grouping, and clear headings.
* **Minimal Distraction:** Avoid unnecessary visual decoration, decorative gradients, auto-updating content, or moving animations.
* **Multi-Cue Status:** Never communicate meaning through color alone (e.g., AI suggestions use soft tinting **plus** explicit labels, icons, and distinct borders).
* **Target Usability:** Provide prominent focus states and sufficiently large interactive touch/click targets.
* **Low Decision Fatigue:** Minimize the number of decisions and interactions required at each step.
* **Progressive Disclosure:** Use progressive disclosure to prevent information overload, showing minimum necessary details first before expanding.
* **Persistent Orientation:** Preserve persistent cues so the user always knows their:
  - Search goal
  - Current search direction
  - Session state
  - Where they previously stopped
* **Scaffolding Control:** Allow users to review and correct AI suggestions rather than forcing automatic organization.
* **Reversible Actions:** Provide explicit recovery mechanisms such as Undo, remove from workspace, and change organization.

---

## Core Navigation Flow

Reflects the metacognitive cycle without forcing multi-tab complexity:

```text
Search Goal
→ Search
→ Triage
→ Save
→ Organize
→ Stop
→ Re-acquaint
→ Resume

```

---

## Core Screens

1. **Search Planning:** Goal & Direction definition
2. **Academic Search Results:** Scannable list with triage options
3. **Result Details:** Progressive disclosure layer for deeper metadata
4. **Search Workspace:** Active workspace for working with selected literature
5. **Save & Organize:** Categorization with metacognitive prompts
6. **Resume / Re-acquaint Screen:** High-level orientation upon returning
7. **Session History / Branching:** Visual log of search directions taken
8. **Guided Search Continuation:** Next-step scaffolding suggestions

---

## Visual & Information Architecture

### Visual Language

Academic digital library. Focus on clarity, scannability, and spatial stability.

**Avoid:**

* Futuristic "AI dashboard" widgets
* Unnecessary charts or analytics
* Chatbot-first layouts
* Overlapping or floating card walls

### Text Line Length & Layout Structure

* **Prose/Abstracts:** Constrained to single-column reading structures (60–70ch).
* **Metadata & Result Cards:** Unbound by prose character-length rules. Metadata is organized into distinct, clearly labeled visual groups rather than dense blocks of text.

### Result Card Structure

Prioritizes rapid visual scanning without visual clutter:

* **Title:** Lexend, visually distinct
* **Authors & Publication Details:** Labeled group
* **Date & Resource Type:** Labeled group
* **Subjects & Keywords:** Scannable pill tags
* **Description / Abstract:** Shortened, chunked, left-aligned summary (expandable via progressive disclosure)
* **Save Action:** High-contrast button with visual icon + explicit text label

---

## AI Assistance & Scaffolding

* **Visual Distinction:** AI suggestions are visually distinct from user-authored information (combining a subtle background tint, explicit icon, border, and visual tag).
* **Control:** All AI scaffolding is advisory. Users can **Accept**, **Change**, or **Reject** suggestions.

```text
[ AI Suggestion: "May fit: Exploratory Search" ]
Actions: [ Accept ] [ Change ] [ Dismiss ]

```

---

## Terminology System

To preserve mental models and reduce cognitive load, terminology must remain strictly consistent across all screens:

* **Goal:** The overall academic objective (e.g., *"Understand metacognitive scaffolding in search UI"*).
* **Direction:** The active sub-path or angle being explored (e.g., *"Eye-tracking studies on dyslexia"*).
* **Session:** The active workspace instance.
* **Saved Item:** Literature explicitly selected by the user during triage.