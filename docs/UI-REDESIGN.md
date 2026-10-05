# UI redesign: eight tabs into three

**Status:** proposal, not yet built. Supersedes nothing; folds into roadmap item **MU**.

## Index
<!-- index:start -->
- [1. The problem, measured](#1-the-problem-measured)
- [2. What the best apps do](#2-what-the-best-apps-do)
- [3. The three tabs](#3-the-three-tabs)
  - [Explore — one grid, four lenses](#explore--one-grid-four-lenses)
  - [Scan — the index, in three sections](#scan--the-index-in-three-sections)
  - [Settings — five groups behind a rail](#settings--five-groups-behind-a-rail)
  - [⌘K — the thing that makes three tabs work](#k--the-thing-that-makes-three-tabs-work)
- [4. Nothing is dropped](#4-nothing-is-dropped)
- [5. The decision this forces: two search experiences](#5-the-decision-this-forces-two-search-experiences)
- [6. Plan](#6-plan)
- [7. Risks](#7-risks)
- [8. How it gets verified](#8-how-it-gets-verified)
<!-- index:end -->

---

## 1. The problem, measured

The app has **8 top-level tabs and 80 controls**, counted from `src/shell.html`:

| tab | controls |
|---|---:|
| Settings | 34 |
| People | 14 |
| Scan | 10 |
| Library | 9 |
| Search | 8 |
| Chat | 5 |
| Timeline | 0 |
| Favourites | 0 (it is the Library grid, filtered) |

Two of those tabs are not places at all. **Favourites** already renders the Library section
(`TAB_SECTION = { favourites: "library" }`) — it is a filter wearing a tab's clothes.
**Timeline** has no controls because it is the same photos in a different arrangement.

The deeper problem is that **five tabs show the same thing**. Library, Favourites, Timeline,
People and Search results are all *the photo grid with a different filter or grouping*. Asking
someone to choose between them before they have seen anything is asking them to answer a
question they do not have yet. Worse, each one is a dead end: finding a photo in Search and
then wanting it in Timeline means starting again.

Settings holds 34 controls on one scroll, mixing *"which model describes my photos"* with
*"event split: distance in km"*. There is no hierarchy, so everything is equally loud.

[↑ Back to Index](#index)

---

## 2. What the best apps do

Four patterns, each from an app that solved this problem at a larger scale.

**Apple Photos — one canvas, many lenses.** There is a single Library, and a segmented control
(Years · Months · Days · All Photos) changes how it is *arranged*, never where you are. The
sidebar lists *collections* (Favourites, Recents, People, Places, albums) — these are filters
over the same grid, and switching keeps your place. The lesson: **arrangement is a control,
not a destination.**

**Google Photos — search is the index, not a page.** One field at the top understands people,
places and things. Below it, chips for People, Places and Categories are *entry points into the
same grid*. There is no "search tab" you visit and leave. The lesson: **search filters what you
are looking at; it does not take you somewhere else.**

**Lightroom — modules by verb, not by noun.** Library and Develop are separate because they are
different *jobs*: organise versus edit. Each module owns its panels, and the panels are hidden
when you are not doing that job. The lesson: **split by what the person is doing, not by what
the data is.**

**Linear / Raycast — the palette makes depth free.** Minimal visible chrome, with ⌘K reaching
every command by name. Hiding things stops being a cost once anything can be summoned. The
lesson: **a command palette is what lets three tabs hold eighty controls.**

[↑ Back to Index](#index)

---

## 3. The three tabs

| tab | the job | the question it answers |
|---|---|---|
| **Explore** | look at, find and organise photos | *"where is that picture?"* |
| **Scan** | build and maintain the index | *"is my library up to date?"* |
| **Settings** | configure the machine | *"how does this thing work?"* |

The split is **by verb**. Explore is the only tab you need on an ordinary day; Scan is for when
you have new photos; Settings is for the first hour and then almost never.

### Explore — one grid, four lenses

```
┌──────────────────────────────────────────────────────────────────────┐
│  PhotoSearch      [ Explore ]  Scan  Settings     🔍 Search…     ⌘K  │
├──────────────────────────────────────────────────────────────────────┤
│  ⊞ Grid   ▤ Timeline   ☺ People          │ All ▾ │ 7,039 photos   ●─ │
│  └── how photos are arranged ────────────┘ └ scope ┘      size slider │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦                              ╭──────────╮ │
│   ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦                              │  Chat    │ │
│   ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦                              │  panel   │ │
│   ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦ ▦                              │ (toggle) │ │
│                                                        ╰──────────╯ │
└──────────────────────────────────────────────────────────────────────┘
```

**Lens** (segmented, left) — *how the photos are arranged*:
- **Grid** — today's Library: flat, sorted newest/oldest, size slider, select mode.
- **Timeline** — today's Timeline: grouped by day.
- **People** — today's People: grouped by who is in them.

**Scope** (dropdown, right of the lens) — *which photos*: All · Favourites · Removed. This is
where Favourites goes. It stops being a tab and becomes what it always was: a filter.

**Search** (header field, always present) — narrows whatever lens you are in. Search in Grid and
you get a filtered grid; switch to Timeline and the *same results* regroup by day. This is the
single biggest usability win in the proposal, and it is only possible once search stops being a
destination.

**Chat** (right drawer, toggled) — slides over the grid rather than replacing it. When an answer
returns photos, they populate the grid behind it, so you can close the drawer and keep working
with the result. Today the answer's photos are trapped inside the chat bubble.

**Lens switches preserve everything**: scope, search, selection, scroll anchor. That is the whole
point — four ways to look at one thing, not four things.

### Scan — the index, in three sections

```
┌──────────────────────────────────────────────────────────────────────┐
│  PhotoSearch      Explore  [ Scan ]  Settings                        │
├────────────────┬─────────────────────────────────────────────────────┤
│ ▸ Photos       │   Plan                                              │
│   Faces        │   ┌───────────────────────────────────────────────┐ │
│   Maintenance  │   │ 7,039 photos · 412 new · 0 changed            │ │
│                │   │ [ Refresh plan ]   [ Scan 412 photos ]        │ │
│ ── status ──   │   └───────────────────────────────────────────────┘ │
│ Index: local   │   Progress ████████░░░░░░░  2,104 / 7,039          │
│ Folder: Photos │   [ Pause ] [ Stop ]                                │
│ Last: 2d ago   │   Recent records …                                  │
└────────────────┴─────────────────────────────────────────────────────┘
```

A left rail, because three sections with ten controls each do not fit a segmented control, and
because the rail has room for **persistent status** — which index, which folder, when it last
ran. That status is currently buried in Settings, and not knowing it has cost real time.

- **Photos** — the vision pass: plan, scan, stale, full, retry, missing, pause, stop.
- **Faces** — the face passes: find faces, improve from originals, re-measure, compare models,
  delete all face data, with the model and source pickers and *"only photos with people"*.
- **Maintenance** — rebuild thumbnails, compact the index, back up now, show backups, move the
  index.

**The split that matters:** face *scanning* lives in Scan → Faces; face *naming, merging and
splitting* lives in Explore → People. One is a job you start and wait for; the other is
browsing. Today they share a tab, which is why the People tab opens with six buttons before a
single face.

The grouping-strictness slider goes to **Explore → People**, not Scan, because it re-groups
instantly from vectors already on disk. It changes what you are looking at, so it belongs where
you are looking.

### Settings — five groups behind a rail

```
┌──────────────────────────────────────────────────────────────────────┐
│  PhotoSearch      Explore  Scan  [ Settings ]                        │
├────────────────┬─────────────────────────────────────────────────────┤
│ ▸ Connection   │   Server URL  [http://localhost:1234 ] [Test]       │
│   Library      │   ● Connected · 3 models loaded                     │
│   Scanning     │                                                     │
│   Privacy      │   Model roles                                       │
│   Diagnostics  │   Describe photos  [ qwen3.5-9b-mlx       ▾ ]       │
│                │   Embeddings       [ nomic-embed-text     ▾ ]       │
│                │   Chat             [ Auto                 ▾ ]       │
└────────────────┴─────────────────────────────────────────────────────┘
```

- **Connection** — server URL, test, models, roles, thinking-off probe.
- **Library** — photo folder, index location, what's in it, move it, scope, scan order,
  exclusions, write test.
- **Scanning** — concurrency, file-stat concurrency, max tokens, temperature, relevance floor,
  OCR, hemisphere, event gap and distance, place names, date overrides.
- **Privacy & data** — delete all face data, backups (on/off, how many, back up now, show
  backups), and a plain statement of what is stored and where.
- **Diagnostics** — self-test, storage speed, thinking-off probe, version.

**Privacy earns its own section.** Face vectors are the most sensitive thing the app holds, and
"Delete all face data" is currently a sixth button on a crowded toolbar. It should be somewhere
a person can find it when they are worried, not when they are browsing.

### ⌘K — the thing that makes three tabs work

A palette over every command, by name: *"rebuild thumbnails"*, *"back up"*, *"delete all face
data"*, *"scan"*, *"favourites"*, and any person's name. This is what stops a three-tab app
feeling like a two-level maze, and it is cheap: the commands already exist as buttons, so the
palette is a registry plus a filter.

[↑ Back to Index](#index)

---

## 4. Nothing is dropped

Every one of the 80 controls, and where it lands. Nothing is removed; four things change shape.

| today | tomorrow |
|---|---|
| **Library** tab (9) | Explore → Grid lens. Unchanged. |
| **Favourites** tab | Explore → scope **Favourites** |
| **Timeline** tab | Explore → Timeline lens |
| **People** tab — groups, naming, filter, undo, strictness | Explore → People lens |
| **People** tab — find faces, improve, re-measure, compare, wipe, model, source, people-only, pause, stop | Scan → Faces |
| **Search** tab (8) | **Folded into the header field** — see §5 |
| **Chat** tab (5) | Explore → Chat drawer |
| **Scan** tab (10) | Scan → Photos |
| Settings: connection, models, roles (6) | Settings → Connection |
| Settings: folder, index, scope, order, excludes (12) | Settings → Library |
| Settings: scan params, dates, places, events (12) | Settings → Scanning |
| Settings: backups (4) + face data | Settings → Privacy & data |
| Settings: self-test, probes | Settings → Diagnostics |
| Rebuild thumbnails, compact | Scan → Maintenance |

**The four that change shape**, deliberately:

1. **Favourites stops being a tab.** It is a filter and always was.
2. **Search stops being a destination.** It filters the lens you are in.
3. **Chat stops being a room you leave.** Its results land in the grid.
4. **Face scanning leaves the People tab.** Browsing and batch jobs are different activities.

[↑ Back to Index](#index)

---

## 5. The decision this forces: two search experiences

There are two today — the header chip field (`88-search.js`, 369 lines, from the fork) and the
Search tab (`88-searchui.js`, 101 lines, ours, with explicit date/place fields, exclusion, and
the interpret/semantic toggles). This redesign cannot ship with both: a header field and a
search *tab* contradict each other.

**Decided, and built in v0.6.26: the header field was kept and the tab deleted.**

- The header field is always reachable, which is the Google Photos lesson and the reason search
  stops being a destination.
- The tab's unique features are real and must survive: **exclusion** (`-screenshots`), explicit
  **date range** and **place**, and the **interpret / semantic** toggles.
- Fold them in as: typed operators in the field (`-screenshot`, `place:Sicily`, `2019..2021`),
  plus a small disclosure under the field holding the toggles and a date picker for people who
  would rather click than type.

Cost: about **1 day**, and it deletes a tab.

[↑ Back to Index](#index)

---

## 6. Plan

Estimates assume the existing build system and the 738-assertion suite.

| phase | work | days |
|---|---|---:|
| **R-1** | **Routing and shell.** Three tabs, lens and scope controls, rail component, hash routes (`#explore/timeline`, `#scan/faces`), state preserved across lens switches. No visual change yet. | 2 |
| **R-2** | **Explore.** Fold Favourites into scope; wire Timeline and People as lenses; keep search results across lenses. | 1.5 |
| **R-3** | **Built** (v0.6.26). Search unification (§5): `88-searchui.js` deleted, operators and the Filters panel added. | 1 |
| **R-4** | **Built** (v0.6.28). Scan: three sections, the face passes moved over, the status rail built. | 1.5 |
| **R-5** | **Built** (v0.6.29). Settings: five sections, Privacy & data written properly. | 1.5 |
| **R-6** | **Built** (v0.6.30). Chat drawer; results populate the grid behind it. | 1 |
| **R-7** | **⌘K palette.** Command registry, fuzzy filter, person names. | 1 |
| **R-8** | **Visual pass** — the fork's tokens and type scale (roadmap MU-01), applied once across three tabs instead of eight. | 2 |
| | **total** | **11.5** |

**Of that, 8.5 days is reorganisation** (R-1 to R-6) and **3 days is new work**: ⌘K did not
exist before (R-7, 1 day), and the visual pass is roadmap **MU-01**, already costed separately
at 1.5–2 days (R-8, 2 days). So the redesign proper is 8.5 days, and it *absorbs* MU-01 rather
than competing with it.

"Just moving controls" is the cheap part — minutes each. **R-2 is the expensive 1.5 days**,
because `83-library.js` is 744 lines of the fork's grid that must become lens-aware without a
rewrite, while scope, search, selection and scroll anchor all survive a lens switch. That
preservation is the product: without it this is a reshuffle, not a redesign.

**Order matters.** R-1 first because everything else depends on the routing. R-8 last because
re-skinning eight tabs and then deleting five of them is wasted work — this plan *reduces*
MU-01's surface, so doing the structure first makes the visual pass cheaper, not more expensive.

**Shippable early:** R-1 + R-2 + R-3 (4.5 days) removes three tabs and makes search work across
arrangements. That is most of the felt improvement.

[↑ Back to Index](#index)

---

## 7. Risks

- **Hidden features stay hidden.** Mitigated by ⌘K (R-7) and by the mapping table above being
  the acceptance checklist, not a sketch.
- **The lens switch is the whole bet.** If preserving scope, search and selection across lenses
  turns out to be fiddly, the redesign loses its point. Build it first (R-1), prove it with
  tests, and stop if it does not work.
- **`83-library.js` is 744 lines of the fork's code.** The grid must become lens-aware without
  a rewrite. Expect R-2 to be the hardest 1.5 days.
- **Regression surface.** Eight tabs' worth of handlers move. The suite covers tab routing,
  gallery windowing, search, chat restore and people editing — those must stay green through
  every phase, not only at the end.

[↑ Back to Index](#index)

---

## 8. How it gets verified

- The **mapping table in §4 is the acceptance test**: a scripted check that every one of the 80
  control ids still exists and is reachable from one of the three tabs. A control that no route
  can reach is a failed build, not a detail.
- **Lens-preservation tests**: set a search and a scope, switch lens, assert both survive and
  the result set is identical.
- **Hash routes**: every old `#library`, `#favourites`, `#search`, `#chat`, `#timeline`,
  `#people` hash still lands somewhere sensible, because links exist in the docs and in saved
  chat history.
- The suite runs twice, as always, and every new assertion is mutation-checked.

[↑ Back to Index](#index)
