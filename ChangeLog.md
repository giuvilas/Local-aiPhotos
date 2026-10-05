# ChangeLog

All notable changes to PhotoSearch, newest first. The format follows
[Keep a Changelog](https://keepachangelog.com/), and versions are `MAJOR.MINOR.PATCH`. While the major version is 0, every change bumps the
**patch** number (0.6.1, 0.6.2, …); the minor number only moves when the maintainer decides a
milestone has been reached.

The project had no version numbers before this file existed, so the history below was
reconstructed from the git log and starts at **0.1.0**. While the major version is 0, the
index format and settings may still change; any change that alters how existing data is
interpreted is listed under *Changed* with a note on how it is migrated.

The current version is shown in the app's footer and is defined as `APP_VERSION` in
[src/js/00-core.js](src/js/00-core.js). Bump both it and this file together.

## Index
<!-- index:start -->
- [0.6.34 (2026-10-05)](#0634-2026-10-05)
  - [Fixed](#fixed)
  - [Changed](#changed)
- [0.6.33 (2026-10-05)](#0633-2026-10-05)
  - [Fixed](#fixed-1)
- [0.6.32 (2026-10-05)](#0632-2026-10-05)
  - [Changed](#changed-1)
  - [Fixed](#fixed-2)
  - [Added](#added)
  - [Milestone](#milestone)
- [0.6.31 (2026-10-05)](#0631-2026-10-05)
  - [Added](#added-1)
  - [Changed](#changed-2)
- [0.6.30 (2026-10-05)](#0630-2026-10-05)
  - [Changed](#changed-3)
  - [Fixed](#fixed-3)
- [0.6.29 (2026-10-05)](#0629-2026-10-05)
  - [Changed](#changed-4)
  - [Fixed](#fixed-4)
  - [Added](#added-2)
- [0.6.28 (2026-10-04)](#0628-2026-10-04)
  - [Changed](#changed-5)
  - [Fixed](#fixed-5)
- [0.6.27 (2026-10-04)](#0627-2026-10-04)
  - [Fixed](#fixed-6)
  - [Removed](#removed)
  - [Documentation](#documentation)
- [0.6.26 (2026-10-04)](#0626-2026-10-04)
  - [Changed](#changed-6)
  - [Added](#added-3)
  - [Removed](#removed-1)
- [0.6.25 (2026-10-04)](#0625-2026-10-04)
  - [Changed](#changed-7)
  - [Fixed](#fixed-7)
- [0.6.24 (2026-10-04)](#0624-2026-10-04)
  - [Changed](#changed-8)
  - [Fixed](#fixed-8)
- [0.6.23 (2026-10-04)](#0623-2026-10-04)
  - [Fixed](#fixed-9)
  - [Added](#added-4)
- [0.6.22 (2026-10-03)](#0622-2026-10-03)
  - [Added](#added-5)
- [0.6.21 (2026-10-03)](#0621-2026-10-03)
  - [Fixed](#fixed-10)
  - [Changed](#changed-9)
- [0.6.20 (2026-10-02)](#0620-2026-10-02)
  - [Changed](#changed-10)
- [0.6.19 (2026-10-02)](#0619-2026-10-02)
  - [Changed](#changed-11)
- [0.6.18 (2026-10-02)](#0618-2026-10-02)
  - [Added](#added-6)
- [0.6.17 (2026-10-02)](#0617-2026-10-02)
  - [Fixed](#fixed-11)
- [0.6.16 (2026-10-02)](#0616-2026-10-02)
  - [Added](#added-7)
- [0.6.15 (2026-10-02)](#0615-2026-10-02)
  - [Fixed](#fixed-12)
- [0.6.14 (2026-10-02)](#0614-2026-10-02)
  - [Changed](#changed-12)
- [0.6.13 (2026-10-02)](#0613-2026-10-02)
  - [Changed](#changed-13)
- [0.6.12 (2026-10-02)](#0612-2026-10-02)
  - [Added](#added-8)
- [0.6.11 (2026-10-02)](#0611-2026-10-02)
  - [Added](#added-9)
- [0.6.10 (2026-10-02)](#0610-2026-10-02)
  - [Changed](#changed-14)
- [0.6.9 (2026-10-02)](#069-2026-10-02)
  - [Changed](#changed-15)
- [0.6.8 (2026-10-02)](#068-2026-10-02)
  - [Added](#added-10)
- [0.6.7 (2026-10-02)](#067-2026-10-02)
  - [Fixed](#fixed-13)
- [0.6.6 (2026-10-02)](#066-2026-10-02)
  - [Fixed](#fixed-14)
- [0.6.5 (2026-10-02)](#065-2026-10-02)
  - [Added](#added-11)
- [0.6.4 (2026-10-02)](#064-2026-10-02)
  - [Added](#added-12)
- [0.6.3 (2026-10-01)](#063-2026-10-01)
  - [Added](#added-13)
  - [Changed](#changed-16)
- [0.6.2 (2026-10-01)](#062-2026-10-01)
  - [Added](#added-14)
  - [Changed](#changed-17)
- [0.6.1 (2026-10-01)](#061-2026-10-01)
  - [Added](#added-15)
  - [Changed](#changed-18)
- [0.6.0 (2026-10-01)](#060-2026-10-01)
  - [Added](#added-16)
  - [Changed](#changed-19)
- [0.5.4 (2026-10-01)](#054-2026-10-01)
  - [Changed](#changed-20)
- [0.5.3 (2026-10-01)](#053-2026-10-01)
  - [Fixed](#fixed-15)
- [0.5.2 (2026-10-01)](#052-2026-10-01)
  - [Added](#added-17)
  - [Changed](#changed-21)
- [0.5.1 (2026-10-01)](#051-2026-10-01)
  - [Changed](#changed-22)
- [0.5.0 (2026-10-01)](#050-2026-10-01)
  - [Added](#added-18)
  - [Changed](#changed-23)
  - [Fixed](#fixed-16)
- [0.4.0 (2026-10-01)](#040-2026-10-01)
  - [Added](#added-19)
  - [Changed](#changed-24)
- [0.3.0 (2026-09-30)](#030-2026-09-30)
  - [Added](#added-20)
  - [Changed](#changed-25)
  - [Fixed](#fixed-17)
- [0.2.0 (2026-09-29)](#020-2026-09-29)
  - [Added](#added-21)
  - [Changed](#changed-26)
  - [Fixed](#fixed-18)
- [0.1.0 (2026-09-23)](#010-2026-09-23)
  - [Added](#added-22)
  - [Fixed (in the days that followed, before 0.2.0)](#fixed-in-the-days-that-followed-before-020)
<!-- index:end -->

## 0.6.34 (2026-10-05)

**Summary:** corrects 0.6.33, which fixed the wrong thing and introduced a dead end of its own.

### Fixed

- **The hold on a second press is now soft.** 0.6.33 blocked it outright. A promise that never
  settles never runs the `finally` that clears the flag, so after a genuinely stuck dialog every
  later press would have shown *"still waiting"* for the life of the page — the same dead end,
  self-inflicted, with Chrome's own error hidden. After sixty seconds a press goes through: if
  the dialog really is up it is refused harmlessly and that is then known for certain, and if it
  succeeds the first promise was dead and you have recovered without reloading.
- **The regression test counted the wrong thing.** It counted `await pickDirectory(`, which a
  `return pickDirectory(...)`, a `.then` chain or a direct `showDirectoryPicker` call all slip
  past. It counts `window.showDirectoryPicker(` in the app's own source, expecting exactly one.
- **A stale "no chooser yet" timer overwrote newer messages.** An earlier request whose promise
  never settled still had its timer pending, and it replaced the more specific note that had
  since taken its place. Only the latest request may write there.

### Changed

- **The text no longer claims a second press jams anything**, because it does not. A concurrent
  call is refused transiently; what poisons a document for the life of the page is a dialog
  dismissed *without settling its promise* — which the codebase already said, three functions
  away from where the opposite was written. The note now says the first request is still opening
  and points at dragging a folder from Finder, which involves no dialog at all.
- The *Reload and start over* button is gone from the waiting note. Offering a reload one second
  into a wait is heavy-handed; it remains on the genuinely-jammed path, where it is the remedy.
- **[FINDINGS §22](docs/FINDINGS.md) rewritten** as *two different failures wearing the same
  error message*, which is what they are.

[↑ Back to Index](#index)


## 0.6.33 (2026-10-05)

**Summary:** the stuck folder chooser is now unreachable, instead of merely explained.

### Fixed

- **Pressing the folder button twice no longer jams every picker on the page.** Chrome allows
  one file dialog per document, and refusing a second one poisons *every* picker for the life of
  that page — only a reload clears it, and nothing the page does can reset it. Asking for a
  folder on a sleeping SMB share can take as long as the share takes to answer, during which
  Chrome shows nothing at all, so pressing again is the natural thing to do. **That second press
  no longer reaches Chrome.** While a request is outstanding, pressing again says how long it has
  been waiting, that pressing again cannot help, and points at dragging the folder from Finder,
  which needs no dialog.

  Previous versions detected the jam and explained it. Explaining a state the user can still walk
  into is not a fix.
- **Every picker in the app goes through the guarded path.** *Move the index* still called
  Chrome directly and could jam the dialog on its own; a test now reads the app's own source and
  fails if any raw call comes back.
- The "no chooser appeared" message said the dialog had been refused. Usually it has not — it is
  still opening, on a share that has not woken up. It says that, and says not to press again.

[↑ Back to Index](#index)


## 0.6.32 (2026-10-05)

**Summary:** the visual pass (**RS-8**), and with it the redesign: eight tabs are three.

### Changed

- **One scale for radius, space and type**, as tokens, so a new surface inherits the proportions
  of the old ones instead of being measured by eye. Applied across the lens bar, the rails, the
  filters panel, the chat drawer and the command palette.
- **The Grid's own controls moved into the lens bar.** Count, size, sort, Select and the
  selection actions were a second sticky strip directly under the first, and two bars for one
  surface read as two surfaces.
- **Every section has the same title treatment** — a heading and one line saying what it is for.
  Scan → Photos had neither.

### Fixed

- **Contrast, in both themes.** The accent is now two tokens, because text and fill are
  different jobs: a blue dark enough to read *on* white is too dark to put white *on* in the
  dark theme, and the reverse. `--accent` is for text, `--accent-bg` for a filled control.
  Five pairs were below 4.5:1 — a link at 3.60:1 in light, and the **primary button's label at
  3.65:1 in dark**, which is exactly the figure the roadmap recorded as a regression not to
  inherit from the fork. It had been inherited anyway.

### Added

- **A contrast assertion.** Every foreground/background pair the interface uses is measured from
  the *computed* colours, compositing alpha over its background, under both themes, and fails
  below 4.5:1. Checking one theme proves nothing about the other: the dark palette is a
  different set of colours, not an inversion.

### Milestone

**RS-1 to RS-8 complete.** Library, Favourites, Search, Chat, Timeline, People, Scan and
Settings — eight tabs, 80 controls, five of them showing the same photos arranged differently —
are now **Explore, Scan and Settings**, with every control mapped to a home and none dropped.
See [UI-REDESIGN.md](docs/UI-REDESIGN.md).

[↑ Back to Index](#index)


## 0.6.31 (2026-10-05)

**Summary:** ⌘K reaches anything by name (**RS-7**), which is what lets three tabs hold eighty
controls without becoming a maze.

### Added

- **A command palette** on `Cmd/Ctrl+K`, and the `⌘K` button beside the search field. It offers
  every lens, scope and section, the actions that matter — *Scan new & changed*, *Find faces*,
  *Improve faces from originals*, *Rebuild thumbnails*, *Compact log*, *Back up now*, *Show
  backups*, *Move the index*, *Run self-test*, *Delete all face data* — and **everyone you have
  named**, who are the words most likely to be typed here.
- Commands are built fresh each time it opens, because what exists depends on the index.
- **A command that presses a control goes to where that control lives first.** The pane it sits
  in names the tab and section, worked out from the page rather than from a list that could
  drift. Pressing a button in a closed section would render its output where nobody is looking —
  the failure this redesign kept producing. The suite reads every press target out of the page's
  own source and checks each one exists and can be routed to.
- Matching is **scored, not filtered**: an exact name beats a name beginning with what you typed,
  which beats a whole word, which beats letters merely appearing in order.

### Changed

- **`Cmd/Ctrl+K` now opens the palette** rather than focusing the search field, as it does
  everywhere else that has one. `/` still jumps to the field, and anything typed in the palette
  that matches no command is offered as a photo search, so the older habit does not dead-end.

[↑ Back to Index](#index)


## 0.6.30 (2026-10-05)

**Summary:** Chat becomes a drawer, and an answer's photos land in the grid behind it
(**RS-6**). The structural redesign is complete.

### Changed

- **Chat is no longer a lens.** It slides in from the right over Explore, from the **Chat**
  button at the end of the lens bar, and `Esc` closes it. It is something you consult while
  looking at photos, not a place you go instead of looking at them.
- **An answer's photos go into the grid behind the drawer.** Close it and you are holding the
  result: you can open the photos, step through them, select them, or switch to Timeline and
  see them by day. Until now they were trapped in the chat bubble, and the only way to work
  with them was to ask for them again somewhere else. The bubble keeps its own copy — the
  conversation is the record of what was asked — and an older turn offers to put its photos
  back in the grid.
- **The page makes room for the drawer** rather than being covered by it. A fixed panel was
  sitting on top of its own toggle and the right-hand end of the footer.
- `#chat` and `#explore/chat` open the Grid with the drawer out, so the photos have somewhere
  to be.

### Fixed

- The drawer first used the `hidden` attribute with a `display` override so it could animate,
  which broke the rule that `[hidden]` means *really* not there — a rule the suite checks
  across the whole page. Open and closed are a class; `hidden` keeps its meaning.

[↑ Back to Index](#index)


## 0.6.29 (2026-10-05)

**Summary:** Settings becomes five groups instead of one scroll of 34 controls (**RS-5**), and
a rule that three controls had quietly broken is now checked.

### Changed

- **Settings is Connection · Library · Scanning · Privacy & data · Diagnostics**, behind the
  same rail Scan uses. Thirty-four controls on one scroll put *"which model describes my
  photos"* beside *"event split: distance in km"* with nothing to say which mattered.
- **Privacy & data is written properly**, because face data is the most sensitive thing the app
  holds and *"where do I delete this"* is asked by someone worried, not someone mid-task. It
  states what is kept and where, that faces are grouped by resemblance alone — age, gender,
  emotion and ethnicity are never inferred or stored — and that names come from you. **Delete
  all face data** is there as well as in Scan → Faces; both call one flow.
- **The rail carries the status**: server, how many models are loaded, how many faces in how
  many named groups, and the version.
- **Sections have addresses**: `#settings/privacy`, `#settings/diag`, and so on.

### Fixed

- **Three controls wrote into a hidden section.** Moving buttons between tabs is most of this
  redesign, and **Move the index**, **Back up now** and **Show backups** all still reported into
  Settings after moving to Scan → Maintenance — so they would have looked like they did nothing.
  **Move the index** had not moved at all: the edit that was meant to remove it from Settings
  removed the new copy instead, since that one came first in the file.
- **Probe thinking-off** was in Connection while its output was in Diagnostics. The button
  moved to sit with what it writes.
- The Settings rail said *"Server not connected"* beside a footer saying *Connected*, because
  it rendered before the connection landed. `setConn` refreshes it.

### Added

- A test for the rule all of the above broke: **a control and the place it writes must be
  visible together.** It reads each handler's output host out of the page's own source rather
  than from a list kept by hand, so it cannot pass by agreeing with its own stale table.

[↑ Back to Index](#index)


## 0.6.28 (2026-10-04)

**Summary:** Scan becomes three jobs behind a rail that finally says which index it is writing
to (**RS-4**).

### Changed

- **Scan is Photos · Faces · Maintenance**, chosen from a left rail. One tab was carrying three
  unrelated jobs — describing photos, finding faces, and housekeeping — with ten buttons in a
  single row.
- **The rail carries the status**: which index, which folder, how many records, when it last
  ran, with *not chosen* and *not connected* called out rather than left blank. Every one of
  these was previously reachable only by scrolling Settings, and not knowing which index was
  open cost a three-hour face pass written to the wrong disk.
- **Face scanning moved out of People.** Find faces, Improve from originals, Re-measure,
  Compare models, Delete all face data and the model and source pickers are now Scan → Faces.
  Naming, merging and splitting stay in Explore → People: one is a job you start and wait for,
  the other is browsing, and the People lens used to open with six buttons before a single face.
- **Grouping strictness and Re-group stay with the groups**, because re-grouping is instant
  from vectors already on disk — it changes what you are looking at, so it belongs where you
  are looking.
- **A face run shows a one-line mirror in People** with a *Show the run* button, since a long
  pass is routinely started and then left while the names get given.
- **Rebuild thumbnails** and **Compact log** left the plan's toolbar for Maintenance, and
  **Back up now**, **Show backups** and **Move the index** moved there from Settings. Settings
  keeps the backup *preferences* and points at Maintenance for the actions.
- **Sections have addresses**: `#scan/faces`, `#scan/maint`. The first section is just `#scan`,
  an unknown section falls back to the tab, and returning to Scan lands on the section you left.

### Fixed

- The top tab bar's styling was written as bare `nav` rules, so the new rail — navigation too —
  was laid out as a horizontal pill group on top of its own text. Both the CSS and the
  `nav button` selectors that drive tab selection are scoped to `#topTabs`; without the second
  fix, choosing a section deselected the Scan tab above it.

[↑ Back to Index](#index)


## 0.6.27 (2026-10-04)

**Summary:** a review of RS-1 to RS-3, and the documentation brought up to date with the
three-tab structure.

### Fixed

- **An open Filters panel followed you out of Explore**, floating above Scan and Settings,
  which have nothing to filter. It belongs to the lens bar and is hidden with it.
- **A search run from elsewhere published `#library`**, an address kept only for links made
  before the three tabs existed. It publishes `#explore` now; the old address still resolves.
- **Reloading onto the Timeline threw the restored search away.** The rule was "any tab but
  Library means leave it behind", which was right while Search was a destination and wrong once
  a search reaches every arrangement of the photos. It is kept on the Grid and the Timeline,
  and the lens on screen regroups the results.
- Chat's tool descriptions and its "no one has been named yet" note referred to a *People tab*.
  They name **Explore → People**.

### Removed

- `VIEW_SECTION`, a lookup table mapping Favourites to the Library's section. Nothing could
  reach it any more — `showTab` turns Favourites into a scope before the section is chosen —
  and the test that covered it asserted the table rather than the behaviour. The test now
  presses the route and checks what is on screen.

### Documentation

- **ARCHITECTURE.md → Navigation** rewritten: the tab/lens/scope model, the address table
  showing where every old address lands, how a switch happens, and what survives one.
- **ARCHITECTURE.md → Browsing** now leads with `exploreRecords()` / `exploreStamp()` — one
  list, several arrangements — and why two lists were the bug.
- **ARCHITECTURE.md → The search field** documents the Filters panel, the typed operators, and
  why name interpretation is off in this field.
- **ARCHITECTURE.md → Favourites** describes a scope rather than a tab.
- **Two duplicated sections repaired**, both merge artefacts: the ranking steps were listed
  twice in different words, and the whole *Safety properties* chapter appeared twice. The flat
  copy carried four facts the structured one lacked — restore validation, non-atomic restores,
  serialised people edits, and that a write timeout does not cancel the write — which are
  folded in rather than dropped.
- **README → Using the app** rewritten around the three tabs and four lenses, with the search
  operators and the link table.
- **OPERATIONS.md → Faces** rewritten: where scanning lives versus naming, a measured
  Originals/Thumbnails comparison, *Only photos with people*, the 45-second flush, and what
  `src` means.

[↑ Back to Index](#index)


## 0.6.26 (2026-10-04)

**Summary:** one search field instead of two search experiences (**RS-3**), and face scans read
originals by default.

### Changed

- **The Search tab is gone.** There were two ways to search — the field in the header and a tab
  with its own boxes — and a field plus a destination contradict each other. Everything the tab
  could express is now expressible in the one field, which narrows whatever lens you are already
  looking at instead of taking you somewhere else. `src/js/88-searchui.js` is deleted.
- **A Filters panel** under the lens bar carries what the tab's boxes carried: From and To
  dates, Place, *Recognise names in my search* and *Include meaning-based matches*, with a count
  beside the button so armed filters are never invisible. A range entered backwards is swapped
  rather than refused — it is a slip, not a question.
- **Typed operators**, for anyone who would rather type: `-screenshot` leaves a word out,
  `-Anna` leaves a person out, `place:Sicily` narrows by place, and `2019..2021`,
  `2019-06..2019-08` or a full date range narrows by date. A month range ends on that month's
  real last day.
- **Clearing a search clears its filters.** A date range left armed behind an empty field is
  how the next search comes back mysteriously empty.
- **Clicking a named person in People** now runs an ordinary search in the grid, so the result
  can be narrowed further, viewed, selected and looked at by date. It used to open a separate
  page whose results could do none of that.
- **Face scans read originals by default.** Thumbnails are eight minutes against three hours,
  which is why they were the default — but a measured pass over a real library put **42% of the
  faces it found below the model's 112 px input**, and the groups that came back were mostly one
  photo each. A fast answer that cannot tell two people apart is not the cheaper option. A saved
  choice of thumbnails still wins.

### Added

- **Leaving a word out.** The engine could exclude a *person* and never a *word*, and neither
  was reachable from the interface — only the chat agent could ask for it. `-screenshot` is
  probably the commonest thing anyone wants from a photo search and it could not be expressed.

### Removed

- The `Search` lens, and the `#tab-search` section. `#search` still resolves, landing on the
  grid where its results are shown.

[↑ Back to Index](#index)


## 0.6.25 (2026-10-04)

**Summary:** the Timeline shows the photos you are actually looking at (**RS-2**).

### Changed

- **One list behind every lens.** The Library and the Timeline each walked `IDX.records` with
  their own copy of the same filter, so a scope or a search simply did not reach the Timeline —
  which is precisely why it behaved like a destination rather than a way of looking. Both now
  draw from one `exploreRecords()`, and in search view the ranker's order is kept.
- **Search survives a lens switch.** Search in the Grid, switch to Timeline, and the same
  photos are there regrouped by day. This is the claim the three-tab structure rests on, and it
  is asserted on the photo ids, not just the count.
- **Scope reaches the Timeline**, so the scope control is offered there too — All photos,
  Favourites, Removed — and hidden on People, Search and Chat, where it would not mean anything.
- **Selection survives a lens switch.** Looking at the same photos another way no longer throws
  away what you had selected; only a change of scope does, because then the selected photos may
  no longer be in front of you.
- **Each lens remembers where it was left**, so coming back lands where you were rather than at
  the top.

### Fixed

- The Timeline's cache was keyed on the number of records, which cannot see a scope or a search
  change: the count never moves while every day in the timeline does. It is keyed on what is
  being looked at.

[↑ Back to Index](#index)


## 0.6.24 (2026-10-04)

**Summary:** eight tabs become three — Explore, Scan, Settings — starting with the routing
(**RS-1**).

### Changed

- **Three top-level tabs.** Library, Favourites, Search, Chat, Timeline and People were six
  destinations for one thing: the same photos, filtered or grouped differently. They are now
  **lenses inside Explore**, chosen with a segmented control. Scan and Settings are unchanged
  in content; only their place in the structure moved.
- **Favourites is a scope, not a tab.** It always rendered the Library's own section with a
  filter applied. The lens bar carries a scope control — All photos · Favourites · Removed —
  and the Removed button now sets the same scope rather than reaching past it, which used to
  leave the two disagreeing.
- **Scope survives a lens switch.** Showing the grid used to reset Favourites back to All
  whenever it was shown. A lens is a way of looking, so moving between lenses keeps the scope,
  and the selection is only dropped when the scope genuinely changes.
- **Addresses are `tab/section`:** `#explore/timeline`, `#explore/people`, `#scan`,
  `#settings`. Every address the app published before still resolves — `#library`,
  `#favourites` (which carries its scope), `#search`, `#chat`, `#timeline`, `#people` — because
  links to them exist in the docs and in saved chat history.

### Fixed

- The grouping-strictness readout showed `0.75` beside a slider set to ArcFace's `0.42` until
  the People tab had loaded something.

See **[UI-REDESIGN.md](docs/UI-REDESIGN.md)** for the whole plan and
[ROADMAP.md](docs/ROADMAP.md) for the remaining phases.

[↑ Back to Index](#index)


## 0.6.23 (2026-10-04)

**Summary:** "Read from: Originals" now reads originals at the size that option exists for, and
says what it actually read.

### Fixed

- **The face pass decoded originals at half the configured size.** Reading an original used
  `processImage`'s default `bigPx`, which is the *vision scan's* 1,024 px, not `faces.refinePx`
  (2,048). ArcFace consumes 112×112, so a face filling 12% of the frame landed at 125 px instead
  of 250 px. On a completed 6,181-face pass, **39% of faces fell under the model's input while
  the option promising accuracy was selected**.
- **Every face row was stamped `src: "thumb"` regardless of what was read**, because
  `detectFacesSerial` dropped the argument. The stored data therefore contradicted the UI, and
  the data was believed: that mislabel sent a diagnosis the wrong way for an entire exchange.
  `src` now reports what was genuinely read, including when a missing thumbnail forces a fall
  back to the original. See
  [FINDINGS §21](docs/FINDINGS.md#21-a-setting-can-be-wired-correctly-and-still-be-undone-downstream).
- **A thumbnail that had not arrived rendered its caption.** Library tiles set
  `img.alt = caption`, so over a share — where a thumbnail routinely has not loaded yet — the
  grid became a wall of sentences with no pictures in it. The caption moved to the figure, where
  a screen reader still finds it; the image has no alt to fall back on.

### Added

- **[docs/UI-REDESIGN.md](docs/UI-REDESIGN.md)**: eight tabs into three — Explore, Scan,
  Settings — with all 80 controls mapped to their new home, the four that deliberately change
  shape, and a phased plan. Now roadmap milestone **RS**, ahead of MU, which it absorbs.
- `faces/crops.bin` and the meaning of the `src` field are documented in
  [ARCHITECTURE.md](docs/ARCHITECTURE.md).

[↑ Back to Index](#index)


## 0.6.22 (2026-10-03)

**Summary:** the setting that decides which two thirds of the library a face pass reads now has
a control, and a test.

### Added

- **Only photos with people** on the People tab. It was already on by default and already
  changed the size of a face pass by a third — 4,203 of 7,039 photos here hold people, 8.9 GB
  against 14.7 — but nothing on screen said so, and the documentation claimed a control that
  did not exist.
- Tests for that filter, which had none. It skips a photo only on **positive evidence of
  nobody**: a counted zero, or a count bucket of "0"/"none". A missing `people` field is not
  evidence, and neither is one that says nothing about the count — treating either as evidence
  would silently exclude every record written before the field existed, and the pass would find
  nobody at all.

[↑ Back to Index](#index)


## 0.6.21 (2026-10-03)

**Summary:** a dead-looking folder button now says what it asked for, and the face pass says
which index it opened.

### Fixed

- "Choose where to save the DB…" could appear to do nothing. Chrome opens the dialog on the
  last folder it handed out, shared by every picker on the page — which here is on the photo
  share, so choosing a local folder for the index first had to wait for a sleeping SMB mount,
  with no sign on the page that anything had been asked for. Each picker now has its own
  remembered folder (`id`), and the index one starts away from the share.
- A picker that never appears, and one Chrome refuses outright, used to be indistinguishable
  from the page. The click now says the chooser was asked for, and after four seconds explains
  the two ways out — reload, or drag the folder from Finder onto the button, which needs no
  dialog. The refusal notice appears beside the button that was pressed rather than only in a
  banner at the top of the page.
- The Library's windowing test measured against the viewport without fixing where the viewport
  was, so an unrelated test that scrolled the page could fail it.

### Changed

- A face pass names the index it opened ("Opening the index in PhotoSearch-index/.photoindex/…").
  Two byte-identical indexes, one local and one on the share, were otherwise impossible to tell
  apart from the outside — including when one of them failed.
- Face rows are flushed on a 45-second timer as well as every 100 photos. At count-only nothing
  reached disk for the first minutes of a run, so it looked dead, and a crash before the first
  flush lost everything up to it.
- Face writes are batched: crops go into one appended `crops.bin` instead of a file each. On a
  share where appending 200 bytes costs 10 seconds, one write per face cannot finish.
- New [MOVING-THE-INDEX.md](MOVING-THE-INDEX.md): why the index was copied to local disk, the
  measured costs behind it, and the verified procedure for putting it back on the NAS.

[↑ Back to Index](#index)


## 0.6.20 (2026-10-02)

**Summary:** opening the page over plain http:// no longer blames the browser.

### Changed

- When the folder picker is missing because the page is not on a secure address (plain
  `http://` from another machine), the warning now says to open it over HTTPS or from
  localhost, and names the address it was opened from, instead of "This browser is not
  supported". A genuinely unsupported browser still gets the old message.
- SETUP.md has a new section, "Serving it to other machines": the SSH tunnel for one machine,
  HTTPS with Tailscale Serve or Caddy for a proper setup, and the LM Studio and folder caveats.
  The README requirements mention the secure-address rule.

[↑ Back to Index](#index)


## 0.6.19 (2026-10-02)

**Summary:** the resume-scan question is now a proper in-app dialog.

### Changed

- **Resuming a scan** no longer raises the browser's plain system prompt when some queued
  photos are missing from the current plan. A styled dialog in the app's own look says how many
  are missing, why that can happen, and offers **Resume N** or **Cancel**. Esc, or a click
  outside the dialog, cancels, and Cancel still leaves the checkpoint untouched.
- The dialog is a reusable `confirmDialog()` helper in `src/js/00-core.js`, so the other
  confirmations can move over to it one at a time.

[↑ Back to Index](#index)


## 0.6.18 (2026-10-02)

**Summary:** see where the index is, and move it.

### Added

- **Index right now** in Settings: the folder that holds `.photoindex`, whether it is beside
  the photos or a folder you chose, and how many photos it records.
- **Move the index…** copies the index (records, vectors, faces, settings files, place names
  and the thumbnails) into a folder you pick, checks the copy, and only then switches over.
  The old copy is left in place, never deleted, and your photos are not touched. Choosing the
  photo folder itself puts the index back "beside the photos". The confirmation names both
  folders so a wrong pick in the macOS dialog can be caught before anything is copied.

[↑ Back to Index](#index)


## 0.6.17 (2026-10-02)

**Summary:** the Plan names the real index location.

### Fixed

- The Plan's "Opening the index" step showed `<photo folder>/.photoindex` even when the index
  was set to a folder you chose, because it printed the photo folder whenever the chosen index
  folder had not been reconnected after a refresh. It now names the folder actually opened,
  says whether that is "the index folder you chose" or "beside the photos", and when the
  chosen index folder is not connected it stops with that explanation instead of guessing.
- The Plan's intro line also reports how many folders are left out.

[↑ Back to Index](#index)


## 0.6.16 (2026-10-02)

**Summary:** Select all and Deselect all for the folder list.

### Added

- **Select all** (formerly "Include everything") ticks every folder. **Deselect all** leaves
  every folder out, so you can tick back in only the few you want. Photos sitting directly in
  the library root belong to no folder and are still scanned.

[↑ Back to Index](#index)


## 0.6.15 (2026-10-02)

**Summary:** the left-out folders show again after a refresh.

### Fixed

- After a page refresh, Settings said "Every folder is scanned" although folders were still
  left out. The list was saved and applied correctly (scans and the Plan still skipped those
  folders); only the summary line was drawn before the saved list had been read. It now shows
  the real list on load.

[↑ Back to Index](#index)


## 0.6.14 (2026-10-02)

**Summary:** the folder list in Settings uses two columns.

### Changed

- **Choose folders to leave out** lists the top-level folders in two columns, so a long library
  needs half the scrolling. Folders opened with ▸ expand within their own column, and the list
  drops to one column on a narrow window.

[↑ Back to Index](#index)


## 0.6.13 (2026-10-02)

**Summary:** merged the original author's latest commit.

### Changed

- Brought in `efebd84`: the author's milestone plan for adopting the Photos-style UI (added to
  `docs/ROADMAP.md`, after our own roadmap sections) and their improved `tools/doc_index.py`,
  which adopts a hand-written "## Index" instead of duplicating it and skips governed files
  that do not exist.

[↑ Back to Index](#index)


## 0.6.12 (2026-10-02)

**Summary:** leave chosen folders out of scans.

### Added

- **Settings > Choose folders to leave out…** shows the library as a tree you can open
  (▸) and untick. An unticked folder, and everything inside it, is skipped by every scan and
  by the Plan. Unticking a folder whose parent is already left out is not offered; ticking a
  parent again brings back everything under it. "Include everything" clears the list.
- Photos already in the index from a folder you later leave out are not touched: they stay
  searchable, and are not reported missing or rescanned.
- The Plan reports "N folders left out by you". The list is a setting
  (`scanExclude`), relative to the library root, so it still applies when you scan a subfolder.

[↑ Back to Index](#index)


## 0.6.11 (2026-10-02)

**Summary:** refreshing the page no longer loses what you were doing.

### Added

- The **chat conversation** (last 40 turns, with its photo grids) comes back after a refresh,
  and the assistant keeps the earlier turns as context.
- The Library's **search chips, sort order, Removed view and open photo** come back once the
  index can be read. The selection is not kept.
- Kept in this browser's local storage, not in the index. The folder itself still has to be
  reconnected after a refresh (Chrome withdraws that permission); the view returns as soon as
  it is.

[↑ Back to Index](#index)


## 0.6.10 (2026-10-02)

**Summary:** the Plan explains what it is doing.

### Changed

- Choosing a folder used to show only "Building plan". It now says what is being checked and
  against which index, that it only reads, and then runs through named steps: opening the
  index, loading what is already in it, listing the photos in the folder (with a live count),
  and matching them to the index, each ending with a plain result such as "120 new, 4,300
  already known".
- The Scan tab's Plan card has a one-paragraph explanation, a legend for new / changed / stale
  / failed / missing / up to date, and a tooltip on each number.

[↑ Back to Index](#index)


## 0.6.9 (2026-10-02)

**Summary:** brought in the original repository's newer `main`.

### Changed

- Merged the original author's changes: durable people corrections, face vectors appended
  instead of rewritten, the **Search tab** (people, place and date filters with pagination),
  backup improvements and the consumer self-test. Both searches now exist: the Search tab and
  the header Search field.
- The self-test now restores the saved settings exactly as they were, which replaces the
  0.6.6 fix for the same problem; the load-time clean-up of stray mock models stays.
- Where the two sides edited the same documentation, the sections from both are kept. Expect
  some overlap in `docs/` until it is tidied.

[↑ Back to Index](#index)


## 0.6.8 (2026-10-02)

**Summary:** zoom in the photo viewer.

### Added

- **Zoom slider** at the bottom of the viewer, with − and + buttons and a readout (click it to
  return to **Fit**). Zoom goes up to 800%.
- **Scroll wheel and trackpad pinch** zoom into whatever the pointer is over. **Drag** pans a
  zoomed photo, **double-click** toggles between Fit and 250%, and the keys `+`, `-` and `0`
  zoom in, out and back to Fit. Stepping to another photo returns to Fit.

[↑ Back to Index](#index)


## 0.6.7 (2026-10-02)

**Summary:** RAW, HEIC and TIFF photos open at full size.

### Fixed

- Opening a NEF (or any RAW, HEIC or TIFF) showed only the small stored thumbnail, because the
  viewer could display JPEG-type files only. It now decodes the original again at display size
  (up to 6000 px) in the Library viewer and in the Chat lightbox.

[↑ Back to Index](#index)


## 0.6.6 (2026-10-02)

**Summary:** the self-test no longer leaves its fake models in your settings.

### Fixed

- Running the self-test could save `mock-embed` and `mock-vlm` as your selected models, so a
  later scan stopped with "The selected embedding model 'mock-embed' is not in LM Studio".
  The test now writes your real settings back when it ends, and any mock model left in saved
  settings by an earlier run is ignored on load.

[↑ Back to Index](#index)


## 0.6.5 (2026-10-02)

**Summary:** RAW files (NEF and other cameras) are now scanned.

### Added

- **RAW support through the embedded preview.** NEF, NRW, CR2, CR3, ARW, DNG, ORF, RW2, RAF, PEF
  and the rest of the RAW family are indexed by reading the full-size JPEG the camera stores
  inside the file. The sensor data is not decoded, so the Library shows the camera's own
  rendering, not a RAW development. The camera's orientation is applied. EXIF date, camera
  and GPS come from the RAW file as for any photo. Only NEF has been tried by construction in
  the self-test; the other brands use the same TIFF layout (or a byte scan) and are best effort.
- A RAW that sits beside a same-named JPEG is not scanned twice: the JPEG is used and the plan
  reports "N RAW beside a JPEG".
- Self-test assertions for the preview, the orientation and a RAW with no preview.

[↑ Back to Index](#index)


## 0.6.4 (2026-10-02)

**Summary:** Favourites.

### Added

- **Favourites tab** (and `PhotoSearch.html#favourites`): your hearted photos in the Library's
  grid, with the same viewer, Select, rotate and remove.
- **Heart a photo** from a tile (the ♡ appears on hover and stays once set), from the viewer
  (♡ button or `F`), or in Select mode with the **Favourite** button, which hearts the whole
  selection or removes the hearts if all are already hearted. An Undo follows.
- **Favourites in search:** a suggestion and a chip that combines with the rest.
- Stored as `favourite` on the photo's record like rotation: it survives a rescan, the model
  cannot set it, and the file is never touched.
- Self-test assertions for favourites.

[↑ Back to Index](#index)

---

## 0.6.3 (2026-10-01)

**Summary:** the self-test explains itself, errors say what to do, and search accepts several
people at once ("mum + dad").

### Added

- **Self-test report.** A verdict ("All 562 checks passed"), failures first with what each got
  and wanted, passed checks folded away, live progress while it runs, **Copy report** and
  **Run again**. If the run stops early it says what happened, the last check that completed,
  and what to do.
- **Up-front check** that the self-test can run. A page opened from disk is not given Chrome's
  private file area, which used to surface as a bare "FAIL threw: SecurityError: It was
  determined that certain files are unsafe for access…" (or a silent hang). It now says why and
  gives the two fixes (start Chrome with `--allow-file-access-from-files`, or serve the file).
- **Plain-language error hints** (`humanError`) for security, permission, not-found, full-disk,
  locked-file, unreachable-server and timeout errors, added after the browser's own text and used
  in toasts and Settings messages.
- **Keywords are tokens inside the search field.** Pick *Mum*, it becomes a token in the box and
  the list stays open for the next; results narrow as you go. `Backspace` on an empty field
  removes the last token and `+` or `,` finishes a word. (They were chips in the Library toolbar.)
- **Search several people at once.** Typing `mum + dad` (also `&`, `,` or `and`) offers one
  suggestion that adds both people as chips, matching photos that contain all of them. It works
  as you type: `mum + da` suggests `Mum + Dad`. Pressing Enter on a phrase whose every part is a
  person does the same. Names match exactly first, then by unique prefix.
- Self-test assertions for the hints, the report parsing and the multi-person search.

### Changed

- `TESTING.md` and `SETUP.md` explain the `SecurityError` and how to run the self-test from your
  own Chrome.

[↑ Back to Index](#index)

---

## 0.6.2 (2026-10-01)

**Summary:** a Photos-style search field in the toolbar.

### Added

- **Search field** in the header (press `/` or `Ctrl/⌘+K`). Click it to see your people; type to
  get grouped suggestions: **People** (with their face, including unnamed groups and "Photos
  with faces"), **Dates** (`2021`, `june`, `june 2021`, occasions), **Places**, **Kinds of
  picture** and **In the picture**.
- **Filter chips.** A chosen suggestion becomes a removable chip; chips combine (for example
  Anna + Sicily + 2022). Enter on the first row searches the typed words by keyword and meaning
  inside those filters.
- **Results in the Library.** Search opens the Library on a results view, so the viewer, arrow
  stepping, Select, rotate and remove all work on results. **Clear search** returns to the whole
  library.
- Two new search filters, `month` (any year) and `photo_sets` (photos that must belong to every
  given set), and a `max` option that lifts the 60-result chat cap for the Library.
- Self-test assertions for suggestions, chips and result ordering.

### Changed

- The Library now shares one in-flight load, so several callers (a tab click, a search) wait for
  the same index open instead of the second returning early.
- The header's "Mock LM Studio" label collapses to the switch on windows narrower than 1250px to
  make room for the search field.

[↑ Back to Index](#index)

---

## 0.6.1 (2026-10-01)

**Summary:** every tab now has its own link.

### Added

- **Tab links.** `PhotoSearch.html#library`, `#chat`, `#timeline`, `#people`, `#scan` and
  `#settings` open that tab directly. Choosing a tab updates the address, so views can be
  bookmarked or shared, and Back and Forward step through the tabs visited. Names are
  case-insensitive and ignore trailing parameters.
- Self-test assertions for the link parsing.

### Changed

- When a folder or index location is connected after the page has loaded, the open tab now
  refreshes itself. Previously a tab opened first, such as one reached by a link, could stay on
  "connect a folder in Settings" until you switched away and back.
- Tab switching is now a single `showTab()` function shared by clicks, links and the
  browser's history.
- `#selftest` is unchanged and is never treated as a tab.

[↑ Back to Index](#index)

---

## 0.6.0 (2026-10-01)

**Summary:** photos can be rotated from the Library.

### Added

- **Rotate from the Library.** In the viewer: ↺ / ↻ buttons, `R` to turn right and `Shift+R` to
  turn left, with an animated turn. In Select mode: the same buttons turn every selected photo.
  An Undo bar follows each turn.
- Saved rotation is shown on tiles in the **Library, Timeline and chat results**, and listed in
  a photo's details.
- Self-test assertions for rotation.

### Changed

- Rotation is **non-destructive**: it is a `rotation` view setting (0, 90, 180 or 270 degrees
  clockwise) stored on the photo's record in the index. The original file and the stored
  thumbnail are never rewritten, so other applications still show the original orientation.
- All Library index changes (rotate, remove, restore) now go through one write queue, so quick
  successive actions cannot overwrite each other. Removing and restoring behave as before.
- A rescan keeps a photo's rotation, as it already did for hidden photos.

[↑ Back to Index](#index)

---

## 0.5.4 (2026-10-01)

**Summary:** the README's opening diagram is now a real architecture diagram. Documentation
only.

### Changed

- Replaced the ASCII sketch with a Mermaid architecture diagram (rendered natively by GitHub).
  It shows the interface and engine inside the browser, the read-only photo folder, the
  `.photoindex/` index, the local model server with its three model roles, and the one-time CDN
  downloads, with each connection labelled. A short "Reading the diagram" note follows it.

[↑ Back to Index](#index)

---

## 0.5.3 (2026-10-01)

**Summary:** corrected the instructions for opening the index. Documentation only.

### Fixed

- `OPERATIONS.md` told every reader to run `open /Volumes/Photos/.photoindex`, which is the
  original author's library path and does not exist on other machines. It now explains that
  the index is a `.photoindex` folder inside either the photo folder or the folder chosen under
  *Where to save the index*, why Settings shows only a folder name, and how to reach it from
  Terminal, Finder (Cmd+Shift+.) or the app (*What's in it?*).
- The manual backup and restore commands take the index location from a variable you set,
  instead of a hard-coded path. `SETUP.md` points at the same explanation.

[↑ Back to Index](#index)

---

## 0.5.2 (2026-10-01)

**Summary:** the README and Architecture now explain where photos live, where the metadata
lives, and how the two are joined. Documentation only; no behaviour changed.

### Added

- README section **Where your photos and data live**: a diagram and a table separating the
  photo folder, the index, derived images, browser settings, the model server and downloaded
  helpers, plus what follows from that (what survives deleting the index, moving photos, or a
  sleeping NAS).
- Architecture section **Where data lives**: the six places data can be, how the photo folder
  and the index are joined (`path` + `library_root` and a content fingerprint), which views
  need the index and which need the photo folder, what the model server and the browser each
  hold, and what can be rebuilt and at what cost.

### Changed

- The README FAQ answer to "Where is my data?" now links to that section.

[↑ Back to Index](#index)

---

## 0.5.1 (2026-10-01)

**Summary:** the README was restructured for first-time readers. Documentation only; no
behaviour changed.

### Changed

- README reorganised around the reader's path: a short pitch, **At a glance**, a three-step
  **Quick start**, a tour of each tab in **Using the app**, **How it works**, **Principles**,
  models and costs, and requirements.
- Added a **FAQ** covering uploads, file safety, people, Ollama, CORS errors, scan time,
  resuming and where the data lives.
- The privacy statement is now precise: photos are never uploaded, while decoders, the face
  model and the place-name list are downloaded once and cached.
- The version is no longer repeated in the README; the footer and this file are the sources.

[↑ Back to Index](#index)

---

## 0.5.0 (2026-10-01)

**Summary:** a Photos-style interface, a Library gallery with a zoom viewer, removing photos
from the library, and a full rewrite of the documentation.

### Added

- **Library tab:** every photo in one grid, newest first, with a size slider and a
  reverse-order toggle. The grid is virtualised, so only the rows near the viewport exist and
  a 6,600-photo library stays smooth.
- **Full-window viewer** that grows out of the clicked tile, shows the stored thumbnail
  instantly and swaps in the decoded original. Arrow keys step through photos, `I` toggles the
  details panel, `Esc` closes, and closing animates back into the tile.
- **Remove from library.** Select mode (click, shift-click range, select all) or the viewer's
  Remove button or Delete key. Index-only: original files are never touched. An Undo bar
  follows every removal, and a **Removed** view lists hidden photos so they can be restored.
- A `hidden` flag on records (distinct from `deleted`). Hidden photos are excluded from search,
  chat, the Timeline, statistics and People, and a rescan keeps them hidden.
- Documentation: an Index at the top of every document, a "Back to Index" link at the end of
  every section, and `tools/doc_index.py` to keep them in sync with the headings.
- This ChangeLog, and an `APP_VERSION` constant shown in the footer.
- Self-test assertions for the Library, the viewer and removal.

### Changed

- **Restyled the interface after the Photos app:** translucent blurred bars, a segmented tab
  control, pill buttons, iOS-style switches, round face tiles, an edge-to-edge Timeline with
  large sticky day headings, chat bubbles, and a rounded viewer sheet. Dark mode uses true
  black. Animations are disabled for users who prefer reduced motion. This is CSS only; no
  behaviour changed.
- The photo-details list is shared by the Library viewer and the older lightbox.
- Documentation rewritten for accuracy and clarity. Corrected statements that had gone stale:
  face grouping now exists, chat has nine tools, and the built file is about 530 KB.
- `CONTRIBUTING.md` now states the actual rule on faces (group, never identify) and that
  nothing outside `.photoindex/` may be modified.

### Fixed

- A merge left a stray `=======` line in the self-test source, which is a JavaScript syntax
  error. The whole page failed to start (no error banner is possible, since the error handler
  is not yet registered). Caught only because the new footer version was blank.
- Clearing the Library grid after the list changed could read past the end of the list. Tiles
  now carry their own photo id.

[↑ Back to Index](#index)

---

## 0.4.0 (2026-10-01)

**Summary:** better face recognition, and support for model servers other than LM Studio.

### Added

- **Any OpenAI-compatible server:** LM Studio, Ollama, llama.cpp, vLLM and LocalAI. Model
  detection tries LM Studio's native endpoint, then Ollama's `/api/tags`, then `/v1/models`.
- **Structured-output probing.** Connection testing reports whether the server supports a JSON
  schema, JSON-only, or neither, and the scan degrades accordingly.
- Per-server CORS advice in Test connection, and an Ollama quick start.
- **ArcFace** face recognition, with five-point landmark alignment to 112×112.
- Aligned face crops are stored (about 5 KB each), so changing the embedder later costs
  minutes instead of a day of re-reading originals.
- An option to measure faces from **full-size originals** rather than 384px thumbnails.

### Changed

- The face grouping threshold now follows the active embedder, and the slider's range expresses
  ArcFace's scale (about 0.42).
- A saved threshold from the previous scheme is migrated rather than applied to ArcFace, where
  it would have prevented almost anything from merging.

[↑ Back to Index](#index)

---

## 0.3.0 (2026-09-30)

**Summary:** browsing by day, and face grouping.

### Added

- **Timeline tab:** photos grouped by day, newest first, with place and occasion headings, a
  year bar and a date picker. Thumbnails are windowed so only visible days are loaded.
- **People tab:** faces are detected and grouped *by resemblance* in the browser. Groups stay
  anonymous until you name them; merge, split and a single "delete all face data" action.
- Names work in the search box and in chat, through a new `list_people` tool (nine tools now).
- A live smoke test for the face model (`tools/face-smoke.mjs`) and a face-model preflight.
- Progress for the folder walk, and face-scan progress shown on the tab it was started from.

### Changed

- Face scans read the stored **thumbnails** instead of 14 GB of originals: about 8 minutes
  instead of 9.7 hours on the reference NAS. Coverage extends to the whole index, not just the
  connected folder.
- A current plan is reused instead of being rebuilt on every press.

### Fixed

- Face grouping accuracy: embeddings were describing head pose rather than identity because
  landmark alignment had been switched off. Self-similarity went from 0.53 to 0.93.
- The face model path (a package that does not exist) and the confidence field (always zero).
- Escape sequences such as `“` rendering literally in the interface.
- CI now waits for DevTools instead of sleeping for a fixed time.

[↑ Back to Index](#index)

---

## 0.2.0 (2026-09-29)

**Summary:** reliability on slow network storage, safer backups, thumbnail rebuild, and CI.

### Added

- **Rebuild thumbnails** from the original photos, matched by content, with no model calls.
- **Storage speed measurement.** Every index deadline is sized from the measured round-trip
  time instead of a guessed constant, and failures name the step that stalled.
- Verification of every append by re-reading the resulting file length.
- A fault-injecting filesystem (`95-faultfs.js`) for tests: latency, hangs, failing and short
  writes.
- GitHub Actions CI that builds and runs the self-test headlessly.
- `OPERATIONS.md` (where files live, manual backup, slow-storage notes), `FINDINGS.md`, and a
  researched `ROADMAP.md`.
- Clear messages in place of dead buttons: why there is nothing to scan, and a visible
  progress card for the pre-scan safety copy.

### Changed

- Opening the index no longer touches `thumbs/`, a folder that took 75 seconds to list.
- A backup no longer writes to the index it is backing up.
- `config.json` is no longer rewritten on every open.
- Any action re-acquires folder access instead of dead-ending when permission was dropped.
- Existing indexes are protected, and the location of a new one is confirmed before use. The
  "move index" button was removed.

### Fixed

- Eight data-loss paths found in code review, and a second round of review findings.
- An index that could not be read left the previous location's records in memory, which were
  then written into the new index. An unreadable index is now empty.
- `vectors.bin` is reconciled to its id list in both directions on load.
- A stalled write could wedge every later write; the lock now has a timeout.
- An error with an empty message could render as a blank notice.
- Two incorrect claims in the documentation.

[↑ Back to Index](#index)

---

## 0.1.0 (2026-09-23)

**Summary:** first working version.

### Added

- Single-file app (`PhotoSearch.html`) that scans a photo folder with a local vision model and
  stores a plain-text index in `.photoindex/`.
- Fixed-schema extraction: observations, caption, objects, activities, scene, text in image.
- EXIF dates with a recorded source and confidence, camera and GPS, offline place names, and
  derived season, weekday and occasion.
- Search: BM25 plus embedding similarity merged by reciprocal rank fusion, exact phrases, and a
  relevance floor.
- Tool-calling chat agent over the index, with a retrieve-then-answer fallback.
- Resumable scans with a checkpoint, retries, move detection by content, and per-run backups.
- An in-browser self-test.

### Fixed (in the days that followed, before 0.2.0)

- Output truncation on text-heavy images, and backup feedback that was not visible.

[↑ Back to Index](#index)
