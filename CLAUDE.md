# Project Instructions — Metacognitive Scaffolding for Academic Exploratory Search

## 1. PROJECT IDENTITY

This project is a master's thesis / CHIIR research prototype.

The system is an academic exploratory search and information retrieval system
with metacognitive scaffolding.

The central problem is:

Users conducting complex academic exploratory searches may stop searching,
return after a long interruption, and struggle to reconstruct what they were
doing, what they searched, what they saved, and where they were going.

This is especially important for users with limited working-memory capacity,
including users with dyslexia.

The system externalizes relevant search-state information so users do not
have to maintain the entire search state in working memory.

---

# 2. CORE RESEARCH IDEA

The system supports:

Planning → Searching → Search Triage → Saving → Organizing → Stopping
→ Returning → Re-acquaintance → Resuming Search

The system is NOT primarily a document-reading, literature-analysis,
research-gap-generation, or knowledge-synthesis system.

The primary research focus is:

METACOGNITIVE SCAFFOLDING FOR ACADEMIC EXPLORATORY SEARCH AND
CROSS-SESSION SEARCH RESUMPTION.

---

# 3. WHAT "METACOGNITIVE" MEANS IN THIS PROJECT

Cognition = performing the search task.

Metacognition = thinking about and regulating the search task.

The system should therefore support:

- Planning before searching
- Monitoring search progress
- Evaluating search relevance
- Revising search directions
- Reflecting on previous search activity
- Re-acquainting oneself with a previous search state
- Resuming a previous search effectively

Do not reduce metacognition to simply "understanding papers."

---

# 4. PROFESSOR'S SCOPE DECISION

The professor explicitly clarified that this project should remain
focused on SEARCHING rather than INFORMATION EXTRACTION.

The system should help users:

- search
- explore
- triage search results
- determine which results are worth saving
- save resources
- organize saved search results
- resume searching after an interruption

The system should NOT require users to read full documents as part
of the primary workflow.

Information extraction from papers happens later and is OUT OF SCOPE.

---

# 5. STRICTLY OUT OF SCOPE

Do NOT introduce these as core functionality:

- Research Gap Explorer
- Automatic research-gap generation
- Claim extraction
- Supporting/contradicting evidence analysis
- Semantic Evidence Graph
- Paper-level knowledge graph
- Automatic literature synthesis
- Automatic thesis-topic generation
- AI determining what a paper means
- Full-paper comprehension
- PDF reading workflow
- Automatic information extraction
- Automatic conclusions from papers
- AI replacing the user's judgment
- Generic web-search scenarios such as hotels

If a proposed feature resembles one of these, explicitly flag it
before implementing it.

---

# 6. SEARCH TRIAGE

Search triage is a central concept.

The user may receive thousands of academic search results.

The system helps reduce this large result set into a manageable set
of potentially useful resources.

The system can use metadata such as:

- Title
- Authors
- Publication date
- Resource type
- Subjects
- Keywords
- Description
- Abstract/summary when available
- Publication/journal
- Peer-reviewed status
- Open-access status
- Faculty/contributor
- DOI/ISSN/MMS ID or other identifiers

The system should help the user decide:

"Is this search result relevant enough to save for later?"

It should NOT answer:

"What does this entire paper prove?"

---

# 7. USER AGENCY

The AI should assist rather than silently decide.

Preferred pattern:

AI suggestion → User confirmation

Example:

"Suggested search direction:
Metacognitive scaffolding"

[Accept] [Change]

Avoid:

AI automatically assigns everything without user awareness.

However, do not create unnecessary interaction friction.

The design goal is:

LOW FRICTION + HIGH USER CONTROL.

---

# 8. SEARCH PLAN TERMINOLOGY

Use terminology appropriate for academic exploratory search.

Preferred concepts:

- Search Goal
- What I Know
- What I Want to Find Out
- Search Directions
- Search Session
- Saved Results
- Search Workspace
- Search Activity
- Resume Search
- Previous Search State
- Search Progress
- Re-acquaintance
- Suggested Next Step

Avoid unnecessarily research-specific concepts such as:

- Research Gap
- Claim
- Evidence
- Hypothesis
- Contradiction

unless the user explicitly asks about them in a literature-review context.

---

# 9. CROSS-SESSION SEARCH

A search project can contain multiple search sessions.

Example:

Project:
"Understand metacognitive scaffolding in exploratory search"

Session 1:
- Search metacognitive scaffolding
- Save 3 results

Session 2:
- Search exploratory browsing
- Save 4 results

Session 3:
- Search academic search interfaces
- Save 2 results

The user may return weeks later.

The system should reconstruct enough previous state to help them
resume without reconstructing it entirely from memory.

Important resume information:

- Search goal
- Search directions
- Previous queries
- Last search activity
- Saved results
- Current search direction
- Previous session
- What the user had already explored
- Where the user stopped

---

# 10. SESSION RESUMPTION

The resume experience should be a guided sequence, not a collection
of disconnected tabs.

Preferred structure:

Previous State
→ What You Were Doing
→ What You Searched
→ What You Saved
→ Where You Were Going
→ Choose How to Continue
→ Resume Search

Avoid excessive tab-based navigation.

The professor specifically emphasized guided navigation/scaffolding
rather than forcing users to choose between many independent tabs.

---

# 11. UI DESIGN PRINCIPLES

The interface is an academic search interface.

It should feel like an improved academic digital library/search system,
not a generic AI chatbot.

Use the existing University of Regina library/Primo search experience
as a conceptual baseline.

Search results should remain recognizable as search results.

Important information should be surfaced before users need to open
the underlying document.

The UI should help users perform search triage.

Prioritize:

- clarity
- low cognitive load
- short text
- visible context
- progressive disclosure
- clear search state
- persistent search goal
- clear save/organize actions
- easy session resumption

Avoid:

- dashboards full of metrics
- decorative visualizations
- excessive cards
- excessive tabs
- unnecessary AI explanations
- dense text
- flashy AI interfaces

---

# 12. AI ROLE

The system does not require training a new AI model unless research
findings later justify it.

An LLM may be used for:

- metadata-based result relevance explanations
- search-direction suggestions
- organization suggestions
- session summaries
- resume cues
- concise search-state summaries
- restructuring user-provided search plans

The LLM should primarily operate on SEARCH METADATA and USER SEARCH STATE.

Do not assume access to the full paper.

---

# 13. AI INPUT

Potential AI input:

User:
- Search Goal
- What I Know
- What I Want to Find Out
- Search Directions

System:
- Search query
- Search-result metadata
- Previous queries
- Viewed results
- Saved results
- Session history
- Previous search state

---

# 14. AI OUTPUT

AI outputs must be:

- concise
- traceable to available data
- clearly framed as suggestions
- easy for users to accept/reject/change

Never fabricate information that does not exist in the available
search metadata.

If the available metadata is insufficient, say so.

---

# 15. RESEARCH PERSONA

The primary prototype persona is an academic searcher.

Design scenarios around academic exploratory search.

Example:

A graduate student investigating metacognitive scaffolding
searches academic literature across multiple sessions.

Do not use hotel booking or general web shopping as the primary
design scenario.

---

# 16. DESIGN DECISION RULE

Whenever there is a conflict between:

A) making the interface more feature-rich

and

B) making the search/resumption process simpler,

choose B unless there is a strong research justification for A.

---

# 17. RESEARCH PRIORITY

When making design decisions, prioritize:

1. Metacognitive scaffolding
2. Exploratory search
3. Search triage
4. Search organization
5. Cross-session continuity
6. Re-acquaintance after interruption
7. Working-memory support
8. User agency

---

# 18. WORKING MEMORY

The system does not "fix" working memory.

Instead, it externalizes search-state information that otherwise must
be mentally maintained.

The design should reduce the need to remember:

- why the user started searching
- what they were looking for
- what directions they explored
- what queries they used
- which results they considered useful
- what they saved
- where they stopped

This is cognitive offloading through interface scaffolding.

---

# 19. IMPORTANT DISTINCTION

Do not confuse:

SEARCH RESULT
with
DOCUMENT.

The search result contains metadata and description.

The underlying document is where full information extraction occurs.

The primary system studies interaction with SEARCH RESULTS.

---

# 20. WHEN WORKING ON THE PROJECT

Before making a major design or implementation decision, check:

1. Does this support academic exploratory search?
2. Does this support metacognitive activity?
3. Does this support search triage or organization?
4. Does this support cross-session resumption?
5. Does this reduce unnecessary working-memory demands?
6. Does it preserve user agency?
7. Does it stay within the search-focused scope?

If the answer to most of these is NO, question the feature before
implementing it.

---

# 21. SOURCE OF TRUTH

The following files contain additional project-specific information:

- docs/research/research-foundation.md
- docs/research/professor-feedback.md
- docs/design/ui-specification.md
- docs/design/user-flows.md
- docs/architecture/system-architecture.md

When these files conflict with an older conversation, use the latest
documented professor decision as the source of truth.