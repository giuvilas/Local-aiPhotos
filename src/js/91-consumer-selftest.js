/* Regressions use synthetic vectors and OPFS only, never the personal library. */
async function consumerSelfTest(scratch){
  const keep = { records:IDX.records, vec:IDX.vec, settings:{ ...S.faces },
    roles:{ ...S.roles }, backup:{ ...S.backup }, dir:IDX.dir };
  const rejected = async fn => { try { await fn(); return false; } catch { return true; } };
  try {
    await deleteAllFaceData();
    S.faces.embedder = "arcface"; S.faces.threshold = 0.7;

    /* ---- the Library must not write during a backup, and keys aimed at a form
           control must not mutate the library ----
       Both were real: galPersist appended to records.jsonl while a backup was
       copying it, and the viewer's keydown handler had no input guard where its
       sibling did, so Backspace on its own zoom slider removed the photo. */
    {
      /* A Library edit during maintenance must be refused, with a message. */
      const keepRecords = IDX.records;
      IDX.records = new Map([["lib-1", { id:"lib-1", name:"a.jpg", status:"ok" }]]);
      libraryMaintenance++;
      let refused = null;
      try { await galPersist(["lib-1"], r => ({ ...r, favourite:true })); }
      catch (e){ refused = errText(e); }
      libraryMaintenance--;
      ok("a Library edit during a backup is refused", !!refused, String(refused));
      ok("and says what to wait for", /backup or restore/i.test(refused || ""), refused);
      /* And allowed again once maintenance ends. */
      let wrote = 0;
      const realAppend = appendLines;
      appendLines = async (n, lines) => { wrote += lines.length; };
      await galPersist(["lib-1"], r => ({ ...r, favourite:true }));
      appendLines = realAppend;
      eq("and allowed once the backup has finished", wrote, 1);
      IDX.records = keepRecords;
    }

    {
      /* The viewer's keydown handler must ignore keys aimed at a form control.
         Asserted on the source because the handler is bound to document at load
         and cannot be re-entered; the guard is one line and its absence is the
         whole bug. */
      ok("vwRemove is still what Backspace reaches", /galApply/.test(String(vwRemove)));
      /* Behavioural check: dispatch Backspace from inside an input while the
         viewer believes it is open, and assert the library did not change. */
      const keepOpen = VW.open, keepI = VW.i, keepList = GAL.list;
      const probe = document.createElement("input");
      document.body.append(probe);
      let removed = 0;
      const realApply = galApply;
      galApply = async () => { removed++; return 0; };
      VW.open = true; VW.i = 0; GAL.list = [{ r:{ id:"vw-1" } }];
      probe.focus();
      probe.dispatchEvent(new KeyboardEvent("keydown",
        { key:"Backspace", bubbles:true, cancelable:true }));
      await new Promise(r => setTimeout(r, 0));
      eq("Backspace in a text field does not remove the open photo", removed, 0);
      /* The same key outside an input still removes, so the guard is not a mute. */
      document.body.dispatchEvent(new KeyboardEvent("keydown",
        { key:"Backspace", bubbles:true, cancelable:true }));
      await new Promise(r => setTimeout(r, 0));
      eq("but it still works when no field has focus", removed, 1);
      galApply = realApply;
      VW.open = keepOpen; VW.i = keepI; GAL.list = keepList;
      probe.remove();
    }

    /* ---- a run must say WHICH index it opened ----
       With a copy of the index on local disk and the original still on the
       share, both holding identical content, a failure reading config.json
       looked the same whichever one was in use, and there was no way to tell
       from the outside. */
    {
      const keepMode = S.indexMode, keepDir = S.indexDirHandle;
      try {
        const notes = [];
        S.indexMode = "custom";
        S.indexDirHandle = { name:"PhotoSearch-index",
          getDirectoryHandle: (...a) => IDX.dir.getDirectoryHandle(...a) };
        try { await planFaceScan(m => { notes.push(m); }); } catch {}
        ok("the first note names the index location",
           notes.length && /PhotoSearch-index\/\.photoindex/.test(notes[0]), notes[0]);
        ok("so two indexes with the same content are distinguishable",
           !notes[0].match(/^Opening the index…$/));
      } finally { S.indexMode = keepMode; S.indexDirHandle = keepDir; }
    }

    /* ---- face writes must be BATCHED, not per photo ----
       Measured on the reference share: appending 200 bytes costs 4 to 17
       seconds. Writing per photo meant about 12 to 15 serialised round trips
       each, and a 6,621-photo pass committed ONE face in nine hours. These
       assertions count WRITE CYCLES, not resulting bytes, because the bytes are
       identical either way and that is what made the first version of this
       test useless. */
    {
      const keepRecords = IDX.records, keepEngine = FACE_ENGINE;
      const keepFlush = S.faces.flushEvery, keepEmbedder = S.faces.embedder;
      try {
        await deleteAllFaceData();
        await loadFaces();
        const dim = 8;
        const vec = seed => Float32Array.from(
          Array.from({ length:dim }, (_, i) => Math.sin(seed * 2.3 + i)));
        /* A stub detector: one face per photo, with a drawable crop. */
        setFaceEngine(async bmp => {
          const mesh = [];
          for (let i = 0; i < 470; i++) mesh.push([0, 0]);
          mesh[33] = [100,200]; mesh[133] = [120,200];
          mesh[362] = [180,200]; mesh[263] = [200,200];
          mesh[1] = [150,240]; mesh[61] = [120,280]; mesh[291] = [180,280];
          return [{ box:[0.1,0.1,0.4,0.4], score:0.9, vec: vec(bmp.__n), mesh }];
        }, faceEngineId());
        S.faces.embedder = "faceres";          // use the stub's vector, no ONNX

        /* Count createWritable calls, which is one per write cycle. */
        let cycles = 0;
        const realDir = await facesDir();
        const spy = {
          async getFileHandle(name, o){
            const fh = await realDir.getFileHandle(name, o);
            return { getFile: () => fh.getFile(),
              async createWritable(opts){ cycles++; return fh.createWritable(opts); } };
          },
          getDirectoryHandle: (n, o) => realDir.getDirectoryHandle(n, o),
          removeEntry: (n, o) => realDir.removeEntry(n, o),
          entries: () => realDir.entries(), keys: () => realDir.keys(),
          values: () => realDir.values()
        };
        FACES.dir = spy;

        const canvas = new OffscreenCanvas(400, 400);
        const cx = canvas.getContext("2d");
        cx.fillStyle = "#e8c39e"; cx.fillRect(0, 0, 400, 400);
        const bmp = await createImageBitmap(await canvas.convertToBlob());

        S.faces.flushEvery = 100;             // more than we will add
        for (let i = 1; i <= 10; i++)
          await detectAndEmbed("bp-" + i, Object.assign(bmp, { __n:i }), "thumb");

        eq("ten photos are buffered, not written", faceBatchPending(), 10);
        eq("and nothing has been written at all", cycles, 0);
        eq("nothing has reached memory either", FACES.faces.size, 0);

        await flushFaceBatch();
        ok("one flush writes everything in a handful of cycles",
           cycles > 0 && cycles <= 4, cycles + " write cycles for 10 photos");
        eq("the batch is empty afterwards", faceBatchPending(), 0);
        eq("and all ten faces are in memory", FACES.faces.size, 10);
        eq("with all ten vectors", FACES.vec.ids.length, 10);

        /* Crops live in ONE appendable file, because one file per face cannot be
           batched: 6,000 faces would be 6,000 round trips however the rest is
           arranged. */
        const stored = [...FACES.faces.values()];
        ok("every face records where its crop lives",
           stored.every(f => typeof f.crop_off === "number" && f.crop_len > 0),
           JSON.stringify(stored[0] && { off:stored[0].crop_off, len:stored[0].crop_len }));
        const offs = stored.map(f => f.crop_off).sort((a, b) => a - b);
        eq("and the offsets do not overlap", new Set(offs).size, offs.length);
        FACES.dir = realDir;
        ok("a crop reads back from the shared file",
           !!(await faceCropCanvas(stored[0].id)));

        /* A failed flush must keep the work, not drop it. */
        await detectAndEmbed("bp-fail", Object.assign(bmp, { __n:99 }), "thumb");
        eq("one more photo is buffered", faceBatchPending(), 1);
        const realFacesDir = facesDir;
        facesDir = async () => { throw new Error("share went away"); };
        let threw = false;
        try { await flushFaceBatch(); } catch { threw = true; }
        facesDir = realFacesDir;
        ok("a failed flush is reported", threw);

        eq("and the work is still buffered for the next attempt",
           faceBatchPending(), 1);
        await flushFaceBatch();
        eq("which then succeeds", faceBatchPending(), 0);

        /* ---- what a pass READ, and what it says it read ----
           "Read from: Originals" was wired, but two things downstream undid it:
           the rows were stamped "thumb" regardless, and the decode used the
           vision scan's 1024px instead of the 2048 this option exists for. On a
           real 6,181-face pass that put 39% of faces UNDER ArcFace's 112px
           input while the UI reported originals. A label that cannot be trusted
           is worse than no label: it is what sent the diagnosis the wrong way. */
        {
          await flushFaceBatch().catch(() => {});
          FACES.faces.clear(); FACES.byPhoto.clear();
          await detectFacesSerial("src-orig", Object.assign(bmp, { __n:51 }), "original");
          const buffered = faceBatchRows();
          ok("the serial detector passes the source through",
             buffered.length > 0 && buffered.every(r => r.src === "original"),
             JSON.stringify(buffered.map(r => r.src)));
          FACEBATCH.rows.length = 0; FACEBATCH.pairs.length = 0; FACEBATCH.crops.length = 0;
        }
        bmp.close();
      } finally {
        /* The embedder was switched to the stub's own vectors; leaving it set
           leaked "faceres" into later tests and failed one of them. */
        FACE_ENGINE = keepEngine; IDX.records = keepRecords;
        S.faces.flushEvery = keepFlush; S.faces.embedder = keepEmbedder;
        try { await deleteAllFaceData(); } catch {}
      }
    }

    /* ---- a face run must show WHY it is failing, on the tab it was started
           from, and a worker crash must not strand every job in flight ----
       A 6,621-photo pass failed 1,565 of its first 1,575 and showed only a
       rising count, because the error list renders into the hidden Scan tab. */
    {
      const keep = { mode:RUN.mode, active:RUN.active, done:RUN.done,
                     total:RUN.total, errors:RUN.errors, count:RUN.errorCount,
                     times:RUN.times };
      try {
        RUN.mode = "faces"; RUN.active = true;
        RUN.done = 1575; RUN.total = 6621; RUN.times = [13.27];
        RUN.errors = [{ path:"IMG_7446.JPEG", error:"image worker crashed: no detail available" }];
        RUN.errorCount = 1565;
        updateProgress();
        const box = $("#facesErr");
        ok("the People tab shows that photos failed", box.hidden === false);
        ok("and the actual reason, not just a count",
           /image worker crashed/.test(box.textContent), box.textContent.slice(0, 80));
        ok("and says so when it is most of them, not a few",
           /cause is almost certainly the same/.test(box.textContent));

        RUN.errors = []; RUN.errorCount = 0;
        updateProgress();
        ok("and nothing is shown when nothing failed", $("#facesErr").hidden === true);
      } finally {
        RUN.mode = keep.mode; RUN.active = keep.active; RUN.done = keep.done;
        RUN.total = keep.total; RUN.errors = keep.errors;
        RUN.errorCount = keep.count; RUN.times = keep.times;
      }
    }

    /* ---- a photo removed from the Library must not be scanned for faces ----
       The hidden invariant spans six modules; the face plan was a seventh that
       missed it, so a removed photo was still read and its faces still appeared
       in People. */
    {
      const keepRecords = IDX.records, keepSource = S.faces.source;
      const keepLoaded = FACES.loaded;
      try {
        S.faces.source = "thumbs";
        IDX.records = new Map([
          ["fp-keep",   { id:"fp-keep",   name:"a.jpg", status:"ok" }],
          ["fp-hidden", { id:"fp-hidden", name:"b.jpg", status:"ok", hidden:true }],
          ["fp-err",    { id:"fp-err",    name:"c.jpg", status:"error" }]
        ]);
        await deleteAllFaceData();
        await loadFaces();
        const pl = await planFaceScan();
        const ids = pl.files.map(f => f.id).sort();
        eq("a hidden photo is not queued for face detection", ids, ["fp-keep"]);
        eq("and it is not counted as outstanding work", pl.total, 1);
      } finally {
        IDX.records = keepRecords; S.faces.source = keepSource;
        FACES.loaded = keepLoaded;
        try { await deleteAllFaceData(); } catch {}
      }
    }

    /* ---- clearing the conversation must be durable ----
       restoreSave() returns early while RESTORE.pending is true, and that stays
       true until the folder is reconnected. So clearing the chat before
       reconnecting left the old conversation in localStorage, and it came back
       on the next refresh. */
    {
      const keepTurns = CHAT.turns, keepPending = RESTORE.pending;
      const keepLast = RESTORE.last, keepActive = window.__selftestActive;
      const stored = localStorage.getItem(RESTORE.chatKey);
      try {
        window.__selftestActive = false;         // the saver is muted during tests
        CHAT.turns = [{ q:"who is in this?", answer:"Anna", ids:["x"], at:1 }];
        RESTORE.pending = false; RESTORE.last = "";
        restoreSave(true);
        ok("a conversation is saved for the next refresh",
           (lsRead(RESTORE.chatKey) || []).length === 1);

        /* The state the bug needed: a restore still pending. */
        RESTORE.pending = true;
        CHAT.turns = [];
        restoreSave();                            // what the 1s timer would do
        eq("the saver alone cannot clear it while a restore is pending",
           (lsRead(RESTORE.chatKey) || []).length, 1);

        /* Press the actual button. Calling restoreSave() here instead would
           test restoreSave and pass even if Clear never called it, which is
           precisely the mistake that let the first version of this test go
           green against the unfixed code. */
        CHAT.turns = [{ q:"who is in this?", answer:"Anna", ids:["x"], at:1 }];
        RESTORE.pending = false; RESTORE.last = "";
        restoreSave(true);
        eq("a conversation is stored again", (lsRead(RESTORE.chatKey) || []).length, 1);
        RESTORE.pending = true;                   // reconnect has not happened
        $("#chatClear").click();
        eq("Clear writes the empty conversation through",
           (lsRead(RESTORE.chatKey) || []).length, 0);
        eq("and the conversation really is empty", CHAT.turns.length, 0);
      } finally {
        CHAT.turns = keepTurns; RESTORE.pending = keepPending;
        RESTORE.last = keepLast; window.__selftestActive = keepActive;
        if (stored === null) localStorage.removeItem(RESTORE.chatKey);
        else localStorage.setItem(RESTORE.chatKey, stored);
      }
    }


    /* ---- face vectors must append, and must not publish before committing ----
       Rewriting the whole file per face is quadratic: at 5,247 faces that is
       ~5 MB per face, about 17 hours on a 430 KB/s share. And publishing memory
       before the write succeeded meant one failure made every later write
       longer, so the run produced 2,951 crops beside no vectors at all. */
    {
      const dim = 8;
      const vec = seed => Float32Array.from(
        Array.from({ length:dim }, (_, i) => Math.sin(seed * 3.7 + i)));
      await deleteAllFaceData();
      const dir = await facesDir();
      const binSize = async () => {
        try { return (await (await dir.getFileHandle("facevecs.bin")).getFile()).size; }
        catch { return 0; }
      };
      await appendFaceVectors([{ id:"fv-1", vec: vec(1) }]);
      eq("one face writes one row", await binSize(), dim * 4);
      await appendFaceVectors([{ id:"fv-2", vec: vec(2) }]);
      eq("a second face appends a second row", await binSize(), 2 * dim * 4);
      eq("and memory agrees with the file", FACES.vec.ids.length, 2);

      for (let i = 3; i <= 8; i++) await appendFaceVectors([{ id:"fv-" + i, vec: vec(i) }]);
      eq("eight rows on disk", await binSize(), 8 * dim * 4);
      eq("and eight ids", FACES.vec.ids.length, 8);
      ok("every vector reads back", [1,4,8].every(i => !!faceVectorOf("fv-" + i)));

      /* Measure the bytes actually WRITTEN, not the resulting file size: a full
         rewrite and an append leave an identical file, so size cannot tell them
         apart. This is the assertion that detects the quadratic behaviour. */
      {
        const realDir = await facesDir();
        let wrote = 0, keptExisting = null;
        const spy = {
          async getFileHandle(name, o){
            const fh = await realDir.getFileHandle(name, o);
            if (name !== "facevecs.bin") return fh;
            return { getFile: () => fh.getFile(),
              async createWritable(opts){
                keptExisting = !!(opts && opts.keepExistingData);
                const w = await fh.createWritable(opts);
                return { seek: pos => w.seek(pos),
                  write(d){
                    wrote += (d && d.byteLength != null) ? d.byteLength
                           : (d && d.size) || 0;
                    return w.write(d);
                  },
                  close: () => w.close(), abort: () => w.abort() };
              } };
          },
          getDirectoryHandle: (n, o) => realDir.getDirectoryHandle(n, o),
          removeEntry: (n, o) => realDir.removeEntry(n, o),
          entries: () => realDir.entries(), keys: () => realDir.keys(),
          values: () => realDir.values()
        };
        FACES.dir = spy;
        await appendFaceVectors([{ id:"fv-measured", vec: vec(42) }]);
        FACES.dir = realDir;
        eq("adding one face writes exactly one row", wrote, dim * 4);
        ok("by appending rather than rewriting", keptExisting === true,
           String(keptExisting));
        eq("and the file grew by one row", await binSize(), 9 * dim * 4);
      }

      /* A failed write must leave memory exactly as it was, so the next attempt
         is the same size rather than larger. */
      const idsBefore = FACES.vec.ids.length;
      const rowsBefore = FACES.vec.rows.length;
      const realFacesDir = facesDir;
      facesDir = async () => { throw new Error("share went away"); };
      let threw = false;
      try { await appendFaceVectors([{ id:"fv-fail", vec: vec(99) }]); }
      catch { threw = true; }
      facesDir = realFacesDir;
      ok("a failed vector write is reported", threw);
      eq("and memory is unchanged by it", FACES.vec.ids.length, idsBefore);
      eq("including the row buffer", FACES.vec.rows.length, rowsBefore);
      ok("so the id that failed is not claimed", !FACES.vec.index.has("fv-fail"));
      /* The next write must therefore be the ordinary one-row append. */
      await appendFaceVectors([{ id:"fv-9", vec: vec(9) }]);
      eq("and the next append is still one row", await binSize(), 10 * dim * 4);

      await deleteAllFaceData();
    }

    S.roles.embed = "";
    const records = Array.from({ length:75 }, (_,i) => ({ id:"consumer-" + i,
      name:"photo-" + i + ".jpg", caption:i % 2 ? "a beach holiday" : "a garden",
      place:i % 2 ? "Sicily" : "London", status:"ok", date_taken:"2024-07-20" }));
    IDX.records = new Map(records.map(r => [r.id,r]));
    const add = async (id, photo, vector) => {
      await appendFaceVectors([{ id, vec:Float32Array.from(vector) }]);
      await appendFaces([{ id, photo_id:photo, box:[0.1,0.1,0.2,0.2],
        engine:faceEngineId(), score:0.95, px:160, src:"original" }]);
    };
    await add("a", "consumer-1", [1,0,0]);
    await add("b", "consumer-3", [1,0.01,0]);
    await add("c", "consumer-5", [0,1,0]);
    clusterFaces();
    const group = FACES.clusters.find(g => g.face_ids.includes("a"));
    await namePerson(group.id, "Anna");
    const annaId = group.id;
    await namePerson(FACES.clusters[0].id, "Ben");
    const benId = FACES.people.find(p => p.name === "Ben").id;
    const moved = await splitOut(annaId, ["b"]);
    clusterFaces();
    ok("a rejected face cannot silently rejoin its named person", !findPerson(annaId).face_ids.includes("b"));
    await savePeople(); await loadFaces(); clusterFaces();
    ok("a rejection survives reload and regrouping", !findPerson(annaId).face_ids.includes("b"));
    eq("the separation decision was persisted", FACES.separations.length, 1);
    await undoPeopleEdit();
    ok("undo restores the face membership", findPerson(annaId).face_ids.includes("b"));
    eq("undo restores the earlier constraints", FACES.separations.length, 0);
    eq("undo is consumed rather than silently toggling to redo", FACES.undo, null);
    const splitAgain = await splitOut(annaId, ["b"]);
    await namePerson(annaId, "");
    clusterFaces();
    ok("separations also protect unnamed groups", !FACES.clusters.some(g => g.face_ids.includes("a") && g.face_ids.includes("b")));
    const aGroup = FACES.clusters.find(g => g.face_ids.includes("a"));
    await namePerson(aGroup.id, "Anna");
    const anna = FACES.people.find(p => p.name === "Anna");
    await mergeGroups(anna.id, FACES.clusters.find(g => g.face_ids.includes("b")).id);
    ok("an explicit merge overrides a previous separation", anna.face_ids.includes("b") && !FACES.separations.length);

    await add("same-photo", "consumer-1", [1,0,0]);
    clusterFaces();
    ok("two faces from one photo are never automatically assigned to one person", !anna.face_ids.includes("same-photo"));
    await add("ambiguous", "consumer-7", [0.72,0.69,0]);
    clusterFaces();
    ok("a close match to two people goes to review", FACES.review.some(r => r.face_id === "ambiguous"));
    eq("an uncertain match is absent from named search", faceNamesFor("consumer-7"), []);
    await reviewFace("ambiguous", anna.id, false);
    clusterFaces();
    ok("a rejected suggestion is not offered for that person again", !FACES.review.some(r => r.face_id === "ambiguous" && r.person_id === anna.id));
    await reviewFace("ambiguous", benId, true);
    ok("confirmation makes a face searchable", faceNamesFor("consumer-7").includes("Ben"));
    await loadFaces();
    ok("confirmed and rejected decisions survive reload", findPerson(benId).confirmed_ids.includes("ambiguous")
      && FACES.people.find(p => p.name === "Anna").rejected_ids.includes("ambiguous"));
    ok("refinement cannot discard saved corrections", await rejected(() => refinePhotoFaces("consumer-1", {})));
    ok("malformed correction data is rejected", await rejected(async () => parsePeople(
      JSON.stringify({ people:[], clusters:[], separations:[{}] }))));

    rebuildDerived();
    let result = await searchPhotos({ query:"photos of Anna at the beach", semantic:false });
    eq("natural people search cannot return other people's beach photos", result.results.map(x => x.rec.id).sort(), ["consumer-1","consumer-3"]);
    eq("the applied name filter is explained", result.applied, ["With Anna"]);
    eq("short names do not match a substring of another name", (await searchPhotos({ query:"", person:"Ann" })).total, 0);
    eq("names within words are not parsed as people", peopleSearchArgs({ query:"annals of a holiday" }).args.person_ids, []);
    eq("quoted names stay literal", peopleSearchArgs({ query:'"Anna"' }).args.person_ids, []);
    eq("quoted filler words remain exact", peopleSearchArgs({ query:'Anna "the beach"' }).args.query, '"the beach"');
    eq("quoted whitespace remains exact", peopleSearchArgs({ query:'Anna "the  beach"' }).args.query, '"the  beach"');
    eq("people can be excluded explicitly", (await searchPhotos({ query:"beach without Anna", semantic:false })).results.some(x => faceNamesFor(x.rec.id).includes("Anna")), false);
    eq("everyone named must be in the photo", (await searchPhotos({ query:"Anna and Ben", semantic:false })).total, 0);
    await add("together", "consumer-1", [0,1,0]);
    await reviewFace("together", benId, true);
    result = await searchPhotos({ query:"Anna and Ben", semantic:false });
    eq("multiple people finds photos together", result.results.map(x => x.rec.id), ["consumer-1"]);
    result = await searchPhotos({ query:"Anna", place:"London", semantic:false });
    eq("person and place filters intersect", result.total, 0);
    eq("person and date filters intersect", (await searchPhotos({ query:"Anna", date_from:"2025-01-01" })).total, 0);
    eq("a user can search a name as ordinary text", peopleSearchArgs({ query:"Anna beach", interpret_people:false }).args.person_ids, []);
    ok("an explicit unknown name gives an actionable error", await rejected(() => searchPhotos({ query:'person:"Nobody"' })));
    const first = await searchPhotos({ query:"", limit:60 });
    const second = await searchPhotos({ query:"", limit:60, offset:60 });
    eq("pagination reports the full album count", first.total, 75);
    eq("pagination reaches the photos after sixty", second.results.length, 15);
    ok("pages do not overlap", !second.results.some(x => first.results.some(y => y.rec.id === x.rec.id)));
    FACES.people.push({ id:"duplicate-name", name:"Anna", face_ids:[] });
    ok("ambiguous names ask for an explicit person selection", await rejected(() => searchPhotos({ query:"Anna" })));
    ok("chat filters cannot silently choose between duplicate names", await rejected(() => searchPhotos({ query:"", person:["Anna"] })));
    FACES.people.pop();
    // Exercise the actual form/rendering path with the server disabled.
    const wasLoaded = IDX.loaded; IDX.loaded = true;
    renderSearchPeople();
    $("#photoQuery").value = "Anna and Ben"; $("#photoSemantic").checked = false;
    await submitPhotoSearch();
    eq("the Search screen shows the required people", [...$("#photoSearchApplied").children].map(x => x.textContent), ["With Anna","With Ben"]);
    ok("the Search screen renders matching thumbnails", $("#photoSearchResults").querySelectorAll("figure").length === 1);
    $("#photoSearchClear").click();
    eq("clearing filters clears old results", $("#photoSearchResults").children.length, 0);
    $("#photoFrom").value = "2025-01-01"; $("#photoTo").value = "2024-01-01";
    await submitPhotoSearch();
    ok("invalid date bounds have readable feedback", /From date/.test($("#photoSearchStatus").textContent));
    $("#photoSearchClear").click(); IDX.loaded = wasLoaded;
    const one = FACES.faces.get("a"), originalEngine = one.engine;
    one.engine = "old-incompatible-model";
    ok("incompatible face spaces cannot be regrouped", await rejected(async () => clusterFaces()));
    one.engine = originalEngine;

    // Back up real on-disk test records rather than the synthetic search map.
    IDX.records = keep.records; IDX.vec = keep.vec;
    await savePeople();
    const beforePeople = JSON.stringify(peopleState());
    const faceDir = await facesDir();
    const prior = await (await (await faceDir.getFileHandle("people.json")).getFile()).text();
    FACES.dir = faultFS(faceDir, { failWrites:1 });
    ok("a failed correction is reported", await rejected(() => namePerson(benId, "Lost name")));
    eq("a failed correction rolls memory back", findPerson(benId).name, "Ben");
    FACES.dir = faceDir;
    eq("a failed correction leaves saved names intact", await (await (await faceDir.getFileHandle("people.json")).getFile()).text(), prior);
    libraryMaintenance++;
    try { ok("backup/restore excludes concurrent people edits", await rejected(() => namePerson(benId, "Racing edit"))); }
    finally { libraryMaintenance--; }
    const scratchText = await scratch.getDirectoryHandle("verified-text", { create:true });
    ok("short writes fail verification", await rejected(() => writeVerifiedText(faultFS(scratchText, { shortWrites:0.5 }), "test.json", '{"saved":true}')));
    S.backup.keep = 1;
    const backup = await backupIndex("consumer regression");
    ok("backups include people and face vectors", ["people.json","faces.jsonl","facevecs.json","facevecs.bin"].every(n => backup.manifest.faces.files.some(f => f.name === n)));
    ok("every face backup file has a checksum", backup.manifest.faces.files.every(f => /^[0-9a-f]{64}$/.test(f.sha256)));
    await namePerson(benId, "Renamed after backup");
    await restoreBackup(backup.stamp);
    eq("restoring recovers the name", findPerson(benId).name, "Ben");
    ok("restoring recovers correction decisions", FACES.people.find(p => p.name === "Anna").rejected_ids.includes("ambiguous"));
    const backups = await backupsDir();
    ok("keep=1 does not delete the restore source", !!(await backups.getDirectoryHandle(backup.stamp)));
    const source = await backups.getDirectoryHandle(backup.stamp);
    const sourceFaces = await source.getDirectoryHandle("faces");
    const peopleFile = await sourceFaces.getFileHandle("people.json");
    const valid = await (await peopleFile.getFile()).text();
    await writeFile(peopleFile, valid.replace("Ben", "Bad")); // same size corruption
    ok("checksum rejects same-size corruption before restore", await rejected(() => restoreBackup(backup.stamp)));
    eq("a corrupt source cannot change live names", findPerson(benId).name, "Ben");
    await writeFile(peopleFile, valid);
    const legacy = await backups.getDirectoryHandle("legacy-consumer-test", { create:true });
    for (const file of BACKUP_FILES) await copyInto(IDX.dir, legacy, file);
    await restoreBackup("legacy-consumer-test");
    eq("restoring an older backup preserves existing people", findPerson(benId).name, "Ben");
    const blank = await scratch.getDirectoryHandle("second-library", { create:true });
    const oldMode = S.indexMode, oldParent = S.indexDirHandle;
    try {
      S.indexMode = "custom"; S.indexDirHandle = blank;
      await ensureIndex();
      eq("switching libraries clears the previous names", FACES.people.length, 0);
      eq("switching libraries clears previous face lookup", faceNamesFor("consumer-1"), []);
    } finally {
      S.indexMode = oldMode; S.indexDirHandle = oldParent;
      await ensureIndex();
    }
  } finally {
    IDX.dir = keep.dir; resetFaceState();
    await deleteAllFaceData();
    IDX.records = keep.records; IDX.vec = keep.vec;
    S.faces = keep.settings; S.roles = keep.roles; S.backup = keep.backup;
    rebuildDerived();
  }
}
