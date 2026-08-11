# Screen: Search Planning

Core screen #1 (per `docs/design/ui-specification.md`): **Goal & Direction definition**.

Position in the metacognitive cycle:

```text
[ Search Planning ] → Search → Triage → Save → Organize → Stop → Re-acquaint → Resume
```

This is the entry point to a search project. It is where the user externalizes
their metacognitive plan *before* searching, so the plan — not the user's
memory — becomes the reference point for every later stage (triage,
organizing, and especially cross-session resumption).

---

## Purpose

Give the user a place to articulate, in their own words, what they are trying
to find out and why — before generating any search results. This plan is
saved as persistent state and is what the Resume / Re-acquaint screen shows
the user when they return after an interruption.

This screen supports the **Planning** phase of the metacognitive cycle
specifically. It does not show search results, does not evaluate sources,
and does not perform any information extraction.

---

## User State

The screen has two entry states. Layout and field order stay identical
between them (predictable layout), only content and emphasis change.

### State A — New Search Project
- No goal exists yet.
- All fields are empty.
- Framing is a light prompt, not a form demand (e.g. placeholder text, not
  required-field markers).

### State B — Existing Search Project, Starting a New Session
- A Search Goal already exists from a prior session.
- The Goal is shown as a persistent, read-only anchor (edit is an explicit,
  separate action, not inline free editing) so it can't be accidentally
  altered while the user is thinking about something else.
- Previously explored Search Directions are visible in compact/summarized
  form, so the user can decide to continue one of them or define a new one.

---

## Visible Information

| Information | State A (new) | State B (returning) |
|---|---|---|
| Search Goal | empty input | persistent, read-only summary + "Edit Goal" |
| What I Know | empty input | empty input (fresh per session; prior sessions' notes live in Resume/Re-acquaint) |
| What I Want to Find Out | empty input | empty input |
| Search Direction(s) | empty | new direction input + list of prior directions with status (active / parked) |
| AI Suggested Direction | hidden until enough input exists | same |

No result counts, no metrics, no analytics widgets — this screen contains
only plan content and (in State B) orientation cues.

---

## Components

1. **Persistent Orientation Bar** *(State B only)*
   Shows the Search Goal at all times, small and non-editable in place.
   Includes an explicit "Edit Goal" action.

2. **Search Goal field**
   Short text input. First-time entry in State A; view-only + edit affordance
   in State B.

3. **What I Know field**
   Short, chunked input (2–3 short bullet-style entries, not one dense
   paragraph box) — what the user already understands about the topic.

4. **What I Want to Find Out field**
   Same chunked structure as above — what's still unknown / the target of
   the search.

5. **Search Direction input**
   Add one or more short phrases describing a specific angle to explore
   (e.g. *"Eye-tracking studies on dyslexia"*). Each becomes a removable
   chip/tag. At least one direction is needed to proceed, but only one is
   required.

6. **Prior Directions summary** *(State B only)*
   Compact list of directions already explored in earlier sessions, each
   labeled active or parked. Read-only here — this is orientation, not
   history browsing (deep history lives on the Session History screen).
   Selecting a prior direction offers to continue it instead of typing a
   new one.

7. **AI Suggested Direction module** *(appears only once Goal + "What I Want
   to Find Out" are filled)*
   One short suggested direction phrase, generated from the user's own
   planning text. Visually tagged as AI content (tint + icon + border +
   label), with `[ Accept ] [ Change ] [ Dismiss ]`.

8. **AI "Tidy This Up" affordance** *(optional, per field)*
   Lets the AI restructure the user's own Goal / What I Know / What I Want
   to Find Out text into a clearer, shorter version. Same
   accept/change/dismiss pattern. Never adds content the user didn't write.

9. **Primary action — "Start Searching"**
   Advances to Academic Search Results using the selected/entered direction.

10. **Secondary action — "Save Plan for Later"**
    Persists the plan without entering search results. Low-emphasis
    (text link, not a competing button), for the case where a user wants to
    plan now and search later.

---

## AI-Generated Content

- **Suggested Search Direction** — inferred only from the user's own Goal
  and "What I Want to Find Out" text. No document data, no external
  knowledge injected.
- **Tidied phrasing** of user-authored plan text (restructuring only, per
  CLAUDE.md §12 — "restructuring user-provided search plans" is an explicit
  in-scope AI capability).

Both are clearly labeled as suggestions, traceable to the user's own input,
and require a single explicit action (Accept/Change/Dismiss) to take effect.
Nothing from the AI is auto-applied.

---

## User-Generated Content

- Search Goal
- What I Know
- What I Want to Find Out
- Search Direction(s)
- Accept / Change / Dismiss decisions on any AI suggestion
- Choice to continue a prior direction vs. define a new one (State B)

---

## Interaction

- Short-field text entry (chunked, not paragraph boxes)
- Add / remove Direction chips
- Single-tap Accept / Change / Dismiss on AI suggestions
- Explicit "Edit Goal" action required to change the persistent Goal
  (prevents accidental drift of the anchor the rest of the system relies on)
- Primary CTA is disabled until Goal + at least one Direction exist

---

## Transition to Next State

- **"Start Searching"** → *Academic Search Results* screen. The chosen
  Direction becomes the active query context and is shown in the persistent
  orientation header; Goal remains visible throughout.
- If more than one Direction exists, the user picks which one to search
  first (default: the one just added/selected).
- **"Save Plan for Later"** → returns to the project's current holding state
  without entering results, with the plan now available for the Resume /
  Re-acquaint screen on return.

---

## Component Justification

Every component maps to at least one required metacognitive/scope function:

| Component | Function(s) supported |
|---|---|
| Persistent Orientation Bar | Monitoring, cross-session resumption |
| Search Goal field | Planning |
| What I Know field | Planning, evaluation (baseline for judging new results) |
| What I Want to Find Out field | Planning |
| Search Direction input | Planning, organization |
| Prior Directions summary | Monitoring, revision, cross-session resumption |
| AI Suggested Direction | Planning (assistive) |
| AI "Tidy This Up" | Revision |
| Edit Goal action | Revision |
| Start Searching (CTA) | Planning → search transition |
| Save Plan for Later | Cross-session resumption |

No component was added for visual richness alone; each ties directly back
to a function in `CLAUDE.md` §20's scope checklist.

---

## Explicitly Out of Scope on This Screen

- No document/paper content, no PDF access.
- No claims, evidence, or research-gap generation.
- No result list, no metrics dashboard, no analytics visualization.
- No automatic goal-setting — the AI only restructures or suggests based on
  what the user already wrote; it never originates a Goal from nothing.
