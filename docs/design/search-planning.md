# Screen: Search Planning

Core screen #1 (per `docs/design/ui-specification.md`): **Goal & Direction
definition**.

Position in the metacognitive cycle:

```text
[ PLANNING ] → Monitoring → Evaluation → Revision → Search Triage → Organization → Cross-Session Resumption
```

This screen is the entry point of a search project — where the user
externalizes their plan *before* searching, so the plan (not the user's
memory) becomes the anchor referenced by every later stage, especially
Resume / Re-acquaint.

---

## 1. Visual Layouts (ASCII Wireframes)

### State A — New Search Project (empty)

```
+============================================================================+
|  ACADEMIC EXPLORATORY SEARCH                              [STATE: NEW]     |
+============================================================================+
|                                                                            |
|  SEARCH PLANNING                                                          |
|  Define what you're trying to find out before you start searching.       |
|                                                                            |
+----------------------------------------------------------------------------+
|  SEARCH GOAL                                                              |
|----------------------------------------------------------------------------|
|  [ e.g. "Understand metacognitive scaffolding in exploratory search" ]    |
|                                                                            |
+----------------------------------------------------------------------------+
|  WHAT I KNOW  (short notes — optional)                                    |
|----------------------------------------------------------------------------|
|  >  [ .......................................................... ]        |
|  >  [ .......................................................... ]        |
|  [+ Add another note]                                                     |
+----------------------------------------------------------------------------+
|  WHAT I WANT TO FIND OUT                                                  |
|----------------------------------------------------------------------------|
|  >  [ .......................................................... ]        |
|  >  [ .......................................................... ]        |
|  [+ Add another note]                                                     |
+----------------------------------------------------------------------------+
|  SEARCH DIRECTION(S)                                                      |
|----------------------------------------------------------------------------|
|  [ Type a direction to explore...                     ]   [ + Add ]       |
|                                                                            |
|  (no directions added yet)                                                |
+----------------------------------------------------------------------------+
|                                                                            |
|   ┌ AI SUGGESTION ─────────────────────────────────────────────────────┐  |
|   |  Fill in "Goal" and "What I Want to Find Out" above, and an AI      |  |
|   |  suggested direction will appear here for you to accept or change. |  |
|   └───────────────────────────────────────────────────────────────────┘  |
|                                                                            |
+----------------------------------------------------------------------------+
|                                                                            |
|        [ Start Searching ]   <- disabled until Goal + 1 Direction exist   |
|                                                                            |
|                    Save Plan for Later (no search yet)                    |
|                                                                            |
+============================================================================+
```

### State B — Returning / Existing Project, New Session

```
+============================================================================+
|  ACADEMIC EXPLORATORY SEARCH                    [STATE: EXISTING PROJECT]  |
+============================================================================+
|  SEARCH GOAL (set previously)                                              |
|  "Understand metacognitive scaffolding in exploratory search"    [Edit]   |
+----------------------------------------------------------------------------+
|                                                                            |
|  SEARCH PLANNING — New Session                                            |
|  Continue a previous direction, or define a new one.                     |
|                                                                            |
+----------------------------------------------------------------------------+
|  PRIOR DIRECTIONS                                                         |
|----------------------------------------------------------------------------|
|  ● Eye-tracking studies on dyslexia .................. [ACTIVE]           |
|      3 saved · last searched 2026-08-04         [ Continue this ]         |
|                                                                            |
|  ○ Search interface accessibility .................... [PARKED]          |
|      1 saved · last searched 2026-07-22         [ Continue this ]         |
+----------------------------------------------------------------------------+
|  WHAT I KNOW  (this session — optional)                                   |
|----------------------------------------------------------------------------|
|  >  [ .......................................................... ]        |
|  [+ Add another note]                                                     |
+----------------------------------------------------------------------------+
|  WHAT I WANT TO FIND OUT  (this session)                                  |
|----------------------------------------------------------------------------|
|  >  [ .......................................................... ]        |
|  [+ Add another note]                                                     |
+----------------------------------------------------------------------------+
|  NEW SEARCH DIRECTION                                                     |
|----------------------------------------------------------------------------|
|  [ Type a new direction to explore...                 ]   [ + Add ]       |
+----------------------------------------------------------------------------+
|                                                                            |
|   ┌ AI SUGGESTION ────────────────────────────────────── [AI] ─────────┐  |
|   |  Based on what you want to find out, this may fit:                 |  |
|   |                                                                     |  |
|   |     "Cognitive load in academic search interfaces"                 |  |
|   |                                                                     |  |
|   |     [ Accept ]      [ Change ]      [ Dismiss ]                    |  |
|   └─────────────────────────────────────────────────────────────────┘  |
|                                                                            |
+----------------------------------------------------------------------------+
|                                                                            |
|   [ Start Searching ]                                                     |
|                                                                            |
|              Save Plan for Later (no search yet)                          |
|                                                                            |
+============================================================================+
```

### State C — Goal Edit (modal / inline, triggered from State B's `[Edit]`)

```
+============================================================================+
|  EDIT SEARCH GOAL                                              [ X Close ] |
+----------------------------------------------------------------------------+
|                                                                            |
|  SEARCH GOAL                                                              |
|  [ Understand metacognitive scaffolding in exploratory search       ]    |
|                                                                            |
|  Changing this will not remove your saved results or prior directions.   |
|                                                                            |
|                    [ Cancel ]           [ Save Goal ]                     |
|                                                                            |
+============================================================================+
```

---

## 2. Purpose & Metacognitive Role

**Primary objective:** give the user a place to articulate — in their own
words — what they are trying to find out and why, before any search results
exist. This becomes the persistent plan that the Resume / Re-acquaint screen
later reconstructs for the user.

**Position in the cycle:** this screen is the entry point for **Planning**.
It also lightly touches **Monitoring** (State B surfaces prior directions
so the user can see where things stand) and **Revision** (Edit Goal, AI
"tidy" suggestions), but it performs no Evaluation, Search Triage, or
Organization itself — those belong to later screens.

This screen shows no search results, performs no document reading, and
generates no claims/evidence — consistent with `CLAUDE.md` §4–§5.

---

## 3. User States

### State A — New / First-Time
- No Search Goal exists yet.
- All fields empty; framing is a light prompt (placeholder text), not a
  demanding form.
- AI Suggestion module is present but inert until enough input exists.

### State B — Returning / Existing Project, New Session
- A Search Goal already exists from a prior session and is shown as a
  **persistent, read-only anchor** — editable only via an explicit action,
  never inline, so it can't be changed by accident mid-thought.
- Prior Search Directions are visible in summarized form (status badge +
  last activity), so the user can resume one instead of starting fresh.
- "What I Know" / "What I Want to Find Out" are fresh, empty fields
  scoped to *this* session (history of prior sessions' notes lives on the
  Resume / Re-acquaint screen, not here).

### State C — Goal Edit (sub-state of B)
- Triggered only by the explicit "Edit" action.
- Isolated, single-purpose surface: change the Goal text, nothing else.
- Reassures the user that editing the goal does not discard saved work.

---

## 4. Visible Information Matrix

| Information | State A (New) | State B (Returning) | State C (Goal Edit) |
|---|---|---|---|
| Search Goal | empty input | read-only anchor + Edit action | editable input |
| What I Know | empty input | empty input (session-scoped) | — |
| What I Want to Find Out | empty input | empty input (session-scoped) | — |
| Search Direction(s) | empty, add-new only | prior directions (status + last activity) + add-new | — |
| AI Suggested Direction | hidden/inert placeholder | active, populated | — |
| AI "tidy" affordance | available per field once text exists | available per field | — |
| State badge | "NEW" | "EXISTING PROJECT" | — |
| Primary CTA state | disabled until Goal + 1 Direction | enabled once a direction is chosen/added | — |

No result counts, metrics, or analytics widgets appear in any state —
only plan content and (in State B) orientation cues.

---

## 5. Component Breakdown

| Component | Function | Interaction | State Behavior |
|---|---|---|---|
| State badge (top-right) | Orients user to New vs. Existing context | Read-only | Shown in A & B; absent in C |
| Persistent Orientation Bar (Goal) | Keeps Goal visible at all times | Read-only text + `[Edit]` button | Absent in A (no goal yet); present in B; expands to editable form in C |
| Search Goal field | Capture the overall objective | Single-line text input | Editable form in A; read-only + edit-trigger in B; editable in C |
| What I Know field | Capture existing understanding | Chunked short-text inputs, "+Add" to append | Always empty per new session |
| What I Want to Find Out field | Capture the target of the search | Chunked short-text inputs, "+Add" to append | Always empty per new session |
| Search Direction input | Define a specific angle to explore | Text input + "+Add" → becomes a chip | Available in both A and B |
| Prior Directions summary | Show previously explored angles with status | Read-only list + "Continue this" per item | State B only |
| AI Suggested Direction module | Offer a candidate direction from the user's own text | `[Accept] [Change] [Dismiss]` | Inert placeholder in A until inputs exist; active in B |
| AI "tidy this up" affordance | Offer restructured phrasing of user's own text | Per-field, same accept/change/dismiss pattern | Available once a field has content |
| Start Searching (CTA) | Advance to search | Single click/tap | Disabled until Goal + ≥1 Direction present |
| Save Plan for Later | Persist plan without searching | Low-emphasis text link | Available in A and B |
| Edit Goal control | Deliberate, explicit goal revision | Opens State C | Only reachable from B |
| Cancel / Save Goal (State C) | Commit or discard goal edit | Two buttons | State C only |

---

## 6. AI vs. User Content

**AI-generated:**
- *Suggested Search Direction* — inferred only from the user's own Goal and
  "What I Want to Find Out" text. No document data or outside knowledge is
  injected.
- *Tidied phrasing* of user-authored Goal / What I Know / What I Want to
  Find Out text (restructuring only — CLAUDE.md §12 explicitly allows
  "restructuring user-provided search plans").

Both are visually distinct per `ui-specification.md` §"AI Assistance &
Scaffolding": tinted background, `[AI]` tag, distinct border, and an
explicit label — never color alone. Both require one explicit action
(`Accept` / `Change` / `Dismiss`) before taking effect; nothing is
auto-applied.

**User-authored:**
- Search Goal
- What I Know
- What I Want to Find Out
- Search Direction(s)
- The Accept / Change / Dismiss decision itself
- The choice to continue a prior direction vs. start a new one (State B)

The AI never originates a Goal from nothing — it only reflects back or
restructures what the user has already written.

---

## 7. Interaction & Transitions

**Input mechanisms:**
- Short chunked text fields (not large paragraph boxes) for Goal / What I
  Know / What I Want to Find Out
- "+Add" to append additional short notes/directions
- Chip-style removable tags for Search Directions
- Single-tap `Accept` / `Change` / `Dismiss` for all AI content
- Explicit `[Edit]` action required to modify an existing Goal (State B → C)

**Primary transition:**
- `[ Start Searching ]` → **Academic Search Results** screen. The chosen
  Direction becomes the active query context and appears in the persistent
  orientation header; the Goal remains visible throughout downstream
  screens.
- If multiple Directions exist, the user picks which to search first
  (default: the one just added or explicitly continued).

**Secondary transition:**
- `Save Plan for Later` → returns to the project's holding state without
  entering results; the plan becomes available to the Resume / Re-acquaint
  screen on return.

**State C transitions:**
- `[ Save Goal ]` → returns to State B with the updated Goal shown in the
  orientation bar.
- `[ Cancel ]` / `[ X Close ]` → returns to State B unchanged.

---

## 8. Strict Scope Justification Table

| Component | Planning | Monitoring | Evaluation | Revision | Search Triage | Organization | Cross-Session Resumption |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Persistent Orientation Bar (Goal) | | ✓ | | | | | ✓ |
| Search Goal field | ✓ | | | | | | |
| What I Know field | ✓ | | ✓ | | | | |
| What I Want to Find Out field | ✓ | | | | | | |
| Search Direction input | ✓ | | | | | ✓ | |
| Prior Directions summary | | ✓ | | ✓ | | | ✓ |
| AI Suggested Direction module | ✓ | | | | | | |
| AI "tidy this up" affordance | | | | ✓ | | | |
| Start Searching (CTA) | ✓ | | | | | | |
| Save Plan for Later | | | | | | | ✓ |
| Edit Goal control | | | | ✓ | | | |

*What I Know* is marked Evaluation because it becomes the baseline the user
later judges new search results against. Every other row maps directly to
its column. No component exists purely for visual appeal — this satisfies
the rule in `design-screen.md`: *"Do not add features merely because they
look useful."*

---

## Explicitly Out of Scope on This Screen

- No document/paper content, no PDF access.
- No claims, evidence, or research-gap generation (CLAUDE.md §5, §17
  Explicitly Rejected Direction).
- No result list, no metrics dashboard, no analytics visualization.
- No automatic goal-setting — AI only reflects/restructures what the user
  already wrote; it never originates a Goal unprompted.
