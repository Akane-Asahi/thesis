# Screen: Academic Search Results

Core screen #2 (per `docs/design/ui-specification.md`): **Scannable list
with triage options**.

Position in the metacognitive cycle:

```text
Planning → Monitoring → Evaluation → Revision → [ SEARCH TRIAGE ] → Organization → Cross-Session Resumption
```

This is where the user scans a large result set and reduces it to a small
set of resources worth saving. It is explicitly **not** a document-reading
screen — every decision here is made from metadata, per `CLAUDE.md` §6.

---

## 1. Visual Layouts (ASCII Wireframes)

### State A — New Search (results just loaded, nothing saved yet)

```
+============================================================================+
|  GOAL: Understand metacognitive scaffolding in exploratory search          |
|  DIRECTION: Eye-tracking studies on dyslexia         SAVED: 0    [Edit]    |
+============================================================================+
|                                                                            |
|  [ eye-tracking dyslexia reading                    ]  [ Search ]         |
|  [ Filters ▾ ]                                                            |
|                                                                            |
|  128 results · sorted by: Relevance ▾                                     |
|                                                                            |
+----------------------------------------------------------------------------+
|  Eye Movement Patterns During Reading in Adults with Dyslexia             |
|  ┌ [AI] Likely relevant — matches "dyslexia" + "eye-tracking" in goal ┐   |
|  └────────────────────────────────────────────────────────────────────┘  |
|  Authors: J. Smith, R. Okafor        Journal: J. Reading Research          |
|  Date: 2023            Type: Journal Article         Peer-Reviewed        |
|  [ dyslexia ] [ eye-tracking ] [ reading fluency ]                        |
|                                                                            |
|  Examines fixation duration and regression frequency in adult readers    |
|  with dyslexia during silent reading tasks...  [Show more]                |
|                                                                            |
|  [ View Details ]                    [ ★ Save ]      [ Not Relevant ]     |
+----------------------------------------------------------------------------+
|  Gaze-Based Interfaces for Learners with Reading Difficulties             |
|                                                                            |
|  Authors: M. Chen                    Conference: CHI 2022                 |
|  Date: 2022            Type: Conference Paper        Open Access          |
|  [ accessibility ] [ gaze interaction ] [ UI design ]                     |
|                                                                            |
|  Proposes a gaze-adaptive reading interface evaluated with 24            |
|  participants with dyslexia...  [Show more]                               |
|                                                                            |
|  [ View Details ]                    [ ★ Save ]      [ Not Relevant ]     |
+----------------------------------------------------------------------------+
|  A Survey of Assistive Reading Technologies                              |
|                                                                            |
|  Authors: T. Nguyen, A. Patel         Journal: ACM Computing Surveys      |
|  Date: 2019            Type: Journal Article         Peer-Reviewed        |
|  [ assistive technology ] [ dyslexia ] [ survey ]                         |
|                                                                            |
|  Broad survey covering screen readers, font adaptation, and reading      |
|  aids for users with dyslexia...  [Show more]                             |
|                                                                            |
|  [ View Details ]                    [ ★ Save ]      [ Not Relevant ]     |
+----------------------------------------------------------------------------+
|                                                                            |
|                          [ Load More Results ]                            |
|                                                                            |
+============================================================================+
```

### State B — Active Triage (mid-session: some saved, one hidden, filters applied)

```
+============================================================================+
|  GOAL: Understand metacognitive scaffolding in exploratory search          |
|  DIRECTION: Eye-tracking studies on dyslexia         SAVED: 4    [Edit]    |
+============================================================================+
|                                                                            |
|  [ eye-tracking dyslexia reading                    ]  [ Search ]         |
|  [ Filters ▾ ]  Active: [Peer-Reviewed ✕] [2020–2026 ✕]                    |
|                                                                            |
|  41 results (filtered from 128) · sorted by: Relevance ▾                  |
|                                                                            |
+----------------------------------------------------------------------------+
|  Eye Movement Patterns During Reading in Adults with Dyslexia             |
|  Authors: J. Smith, R. Okafor        Journal: J. Reading Research          |
|  Date: 2023            Type: Journal Article         Peer-Reviewed        |
|  [ dyslexia ] [ eye-tracking ] [ reading fluency ]                        |
|                                                                            |
|  Examines fixation duration and regression frequency...  [Show more]      |
|                                                                            |
|  [ View Details ]              [ ✓ Saved ]      [ Remove from Saved ]     |
+----------------------------------------------------------------------------+
|  1 result hidden (marked Not Relevant)                        [ Undo ]    |
+----------------------------------------------------------------------------+
|  Reading Comprehension and Cognitive Load in University Students         |
|                                                                            |
|  Authors: L. Fabbri                  Journal: Learning & Instruction      |
|  Date: 2021            Type: Journal Article         Peer-Reviewed        |
|  [ cognitive load ] [ reading comprehension ]                            |
|                                                                            |
|  Investigates working-memory demands during multi-source reading         |
|  comprehension tasks...  [Show more]                                      |
|                                                                            |
|  [ View Details ]                    [ ★ Save ]      [ Not Relevant ]     |
+----------------------------------------------------------------------------+
|                                                                            |
|                          [ Load More Results ]                            |
|                                                                            |
+----------------------------------------------------------------------------+
|                       [ View Saved Items (4) → ]                          |
+============================================================================+
```

### State C — No Results / Refine (alternate state)

```
+============================================================================+
|  GOAL: Understand metacognitive scaffolding in exploratory search          |
|  DIRECTION: Eye-tracking studies on dyslexia         SAVED: 4    [Edit]    |
+============================================================================+
|                                                                            |
|  [ eye-tracking dyslexia fMRI cortical                ]  [ Search ]       |
|  [ Filters ▾ ]  Active: [Peer-Reviewed ✕] [2024–2026 ✕]                    |
|                                                                            |
|  0 results for this query and filter combination                         |
|                                                                            |
+----------------------------------------------------------------------------+
|                                                                            |
|              No results matched. Try one of the following:                |
|                                                                            |
|                 [ Remove filters ]                                        |
|                 [ Broaden the query ]                                     |
|                 [ Edit Direction wording ]                                 |
|                                                                            |
|              Your 4 saved items for this direction are unaffected.        |
|                                                                            |
+============================================================================+
```

---

## 2. Purpose & Metacognitive Role

**Primary objective:** let the user scan a (potentially large) result set
and reduce it to a small set of resources worth saving, using only
metadata — never full-document content.

**Position in the cycle:** this is the home of **Search Triage** —
deciding, per result, "is this worth saving?" It also carries light
**Monitoring** (persistent Goal/Direction/Saved-count header, result
counts) and **Revision** (query edits, filters, the reversible Not
Relevant action). It performs no Organization (that happens on Save &
Organize) and no Cross-Session Resumption UI of its own — it only
preserves state that Resume/Re-acquaint later reads.

---

## 3. User States

### State A — New / First Results
- A search has just run for the active Direction; no results have been
  saved or dismissed yet.
- Filters are present but collapsed/unapplied.

### State B — Active Triage (mid-session)
- Some results are already Saved (button changes to a confirmed `✓ Saved`
  state with a `Remove` option — reversible).
- Some results have been marked Not Relevant and are collapsed into a
  single reversible "N result(s) hidden" row rather than deleted outright.
- Filters may be active, shown as removable chips.
- A sticky "View Saved Items (n)" transition appears once at least one item
  is saved.

### State D — No Results / Refine (alternate)
- The current query + filter combination returns zero results.
- No result cards render; the screen instead offers direct, low-friction
  ways to recover (clear filters, broaden query, edit Direction) without
  losing anything already saved.

---

## 4. Visible Information Matrix

| Information | State A (New) | State B (Active Triage) | State D (No Results) |
|---|---|---|---|
| Goal / Direction header | shown, static | shown, static | shown, static |
| Saved count | 0 | > 0 | unchanged (preserved) |
| Query text | direction-seeded | user-edited | user-edited |
| Active filters | none/collapsed | shown as chips | shown as chips |
| Result count | total for query | filtered count / total | 0 |
| Result cards | all unreviewed | mix: saved / hidden / unreviewed | none |
| AI relevance note | shown per matching card | shown per matching card | — |
| Hidden-items row | — | shown, collapsed, undoable | — |
| Recovery actions | — | — | remove filters / broaden query / edit direction |

---

## 5. Component Breakdown

| Component | Function | Interaction | State Behavior |
|---|---|---|---|
| Persistent Orientation Header (Goal + Direction + Saved count) | Keeps plan and progress visible at all times | `[Edit]` opens Search Planning's Edit Goal/Direction flow | Saved count updates live; otherwise identical across states |
| Query bar | Refine/re-run the search | Text input + `[Search]` | Pre-filled with Direction phrase in State A; user-edited in B/D |
| Filters control | Narrow results by metadata (type, date, peer-reviewed, open access) | Toggle panel; applied filters shown as removable chips | Collapsed/empty in A; active in B/D |
| Sort control | Reorder results for scanning | Dropdown (Relevance / Date) | Same across states |
| Result count line | Orient user to set size | Read-only | Reflects filtering; shows "0" in D |
| Result Card | Present one result's metadata for a triage decision | Scan; `[Show more]` expands abstract inline | Unreviewed / Saved / (hidden) per item |
| AI relevance note | Explain, from metadata only, why a result may match the Goal/Direction | Informational — no action required | Appears only when the system can point to a specific metadata match; silent otherwise |
| `[Show more]` | Progressive disclosure of the abstract | Toggle expand/collapse | Same across states |
| `[View Details]` | Deeper metadata before deciding | Navigates to Result Details screen | Same across states |
| `[★ Save]` / `[✓ Saved]` / `[Remove from Saved]` | Commit or reverse a triage decision | Single click; reversible | Save → Saved (B); Remove reverts to unreviewed |
| `[Not Relevant]` / hidden-row `[Undo]` | Declutter the list without deleting data | Single click; fully reversible | Collapses card into a shared hidden-items row |
| `[View Saved Items (n)]` | Transition to organizing what's been saved | Click | Appears once Saved count ≥ 1 |
| No-results recovery actions | Help user revise rather than dead-end | Buttons: remove filters / broaden query / edit direction | State D only |

---

## 6. AI vs. User Content

**AI-generated:**
- *Relevance note* on a result card — a short, metadata-traceable statement
  (e.g., "matches 'dyslexia' + 'eye-tracking' in goal") explaining why a
  result may be worth attention. It cites only fields the user can see on
  the card (title, subjects, keywords, description) — never inferred
  meaning from the full document.

This is **informational, not a decision the AI is making for the user** —
it doesn't Save, hide, or reorder anything by itself, so it doesn't require
an Accept/Change/Dismiss control (unlike a plan-changing suggestion on
Search Planning). It is still visually distinct per `ui-specification.md`
(tint + `[AI]` tag + border) and is omitted entirely when no traceable
metadata match exists — per `CLAUDE.md` §14, the system says nothing rather
than fabricating a relevance claim.

**User-authored / user-decided:**
- Query text and filter selections
- Sort order choice
- Every Save / Remove / Not Relevant / Undo decision
- The decision to expand an abstract or view full details

All triage outcomes (saved, hidden, unreviewed) are explicit user actions;
the AI only annotates, never decides.

---

## 7. Interaction & Transitions

**Input mechanisms:**
- Query text edit + `[Search]`
- Filter chips (add/remove)
- Sort dropdown
- Per-card: `[Show more]`, `[View Details]`, `[★ Save]`/`[Remove]`,
  `[Not Relevant]`/`[Undo]`

**Primary transitions:**
- `[View Details]` → **Result Details** screen (progressive-disclosure
  metadata layer for that single result).
- `[★ Save]` → item enters the Saved set; a lightweight, non-blocking
  organization suggestion may appear inline near the card (see note below)
  without forcing navigation away from the list.
- `[View Saved Items (n)]` → **Save & Organize** screen, for reviewing and
  categorizing everything saved so far.

**Secondary transitions:**
- `[Edit]` on the orientation header → back to **Search Planning**, to
  revise the Direction or Goal (a deliberate, explicit action, consistent
  with how Search Planning treats goal edits).
- Recovery actions in State D → adjust filters/query in place, or → back to
  **Search Planning** ("Edit Direction wording").

**Note on Save + Organize coupling:** Saving is intentionally kept
low-friction — a single click keeps the user in triage flow. Any
AI-suggested category for the newly saved item follows the same
Accept/Change/Dismiss pattern as Search Planning's suggestions, but appears
as a small inline affordance rather than forcing a screen change, per
`CLAUDE.md` §7 ("low friction + high user control"). Full categorization
review happens on Save & Organize.

**Implicit cross-session behavior:** leaving this screen at any point (query,
filters, sort, saved/hidden state) preserves it as part of the session's
search state, so Resume/Re-acquaint can reconstruct it later. This is state
persistence, not a screen-level control, so it has no dedicated component
here.

---

## 8. Strict Scope Justification Table

| Component | Planning | Monitoring | Evaluation | Revision | Search Triage | Organization | Cross-Session Resumption |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Persistent Orientation Header | | ✓ | | | | | ✓ |
| Query bar | | | | ✓ | | | |
| Filters control | | | | ✓ | ✓ | | |
| Sort control | | ✓ | | | ✓ | | |
| Result count line | | ✓ | | | | | |
| Result Card (metadata display) | | | ✓ | | ✓ | | |
| AI relevance note | | | ✓ | | ✓ | | |
| `[Show more]` | | | ✓ | | | | |
| `[View Details]` | | | ✓ | | | | |
| `[★ Save]` / `[✓ Saved]` / `[Remove]` | | | ✓ | | ✓ | ✓ | |
| `[Not Relevant]` / `[Undo]` | | | ✓ | ✓ | ✓ | | |
| `[View Saved Items (n)]` | | ✓ | | | | ✓ | |
| No-results recovery actions | | | | ✓ | | | |

Every row ties to at least one required function; nothing was added for
visual richness alone (no analytics widgets, no decorative charts, no
engagement-style badges), consistent with `design-screen.md`'s rule and
`ui-specification.md`'s explicit "Avoid" list.

---

## Explicitly Out of Scope on This Screen

- No document/PDF viewing or reading.
- No claim extraction, evidence linking, or research-gap generation.
- No automatic saving or automatic dismissal — every triage outcome is a
  user-initiated, reversible action.
- No engagement metrics, charts, or dashboard-style analytics.
