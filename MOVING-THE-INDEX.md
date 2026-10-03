# Moving the index, and moving it back

Written 3 October 2026, after measuring why the index could not live on the NAS.

## Why it moved

Measured on the WD PR4100 over SMB, and these are the numbers that decide it:

| operation | NAS | local disk |
|---|---:|---:|
| write 200 bytes | 10,400 ms | 0.10 ms |
| append 200 bytes | 11,507 ms | 0.05 ms |
| stat a file | 3,689 ms | 0.00 ms |
| list `thumbs/` (7,039 entries) | 32,688 ms | 3.10 ms |
| read one 33 KB thumbnail, cold | 5,300 ms | — |
| read 7,039 thumbnails, 48 readers, sustained | **18 files/s** | — |
| large-file throughput (8 readers) | 804 KB/s | — |

A correction worth recording, because it nearly cost three hours of planning: a
cold benchmark measured 0.19 files per second and predicted 58 hours for the
thumbnails. The sustained parallel copy ran at **18 files per second and finished
7,005 files in 7 minutes**, roughly a hundred times faster than the benchmark
said. This share is slow to start and fine once warm, so a short sample of cold
reads is not a throughput measurement. Measure the operation you intend to run.

What is NOT a cold-start artefact is writing: 10 to 11 seconds for 200 bytes,
measured repeatedly across two sessions. The index is thousands of small writes,
which is why it could not stay there. The photographs are large sequential reads,
so they do.

**The photos never moved.** 14.7 GB remain on the NAS and are read from there.

## Where things are now

| | |
|---|---|
| photos | `/Volumes/Photos/...` on the NAS, untouched |
| live index | `~/PhotoSearch-index/.photoindex/` |
| original index | `/Volumes/Photos/.photoindex/` left in place, untouched, as a fallback |
| backups | `/Volumes/Photos/.photoindex/backups/` left on the NAS deliberately: an off-device copy is worth more than a convenient one |

Settings holds the choice: *Where to save the index* is **a folder you choose**,
pointing at `~/PhotoSearch-index`.

## Why moving back has no side effects

Checked rather than assumed, on the live index:

* `records.jsonl`: 7,106 records, **0 with an absolute path**. Every path is
  relative to the library root.
* `config.json`: no absolute-path values at all. It records `index_mode` and
  `photo_root` (a folder name, not a path).
* `vectors.json`, `facevecs.json`: keyed by record id, never by location.
* `thumbs/<id>.jpg`, `faces/crops.bin` offsets: keyed by record id.
* `state.json`: a resume checkpoint holding relative paths.

Nothing in the index knows where it lives. That is what makes the round trip safe.

## Moving back to the NAS

1. Stop any scan and let it finish writing.
2. Take a backup first. The point of a backup is the moment before a move.
3. Copy the whole folder back:

   ```bash
   rsync -a --info=progress2 \
     ~/PhotoSearch-index/.photoindex/ \
     /Volumes/Photos/.photoindex/
   ```

   Measured in the other direction: 7,005 thumbnails copied in 7 minutes at 18
   files per second. Writing to the NAS is slower than reading from it, so allow
   longer. `rsync` resumes, so interruption costs nothing.
4. In Settings, point *Where to save the index* back at `/Volumes/Photos`.
5. Press **Refresh plan** and confirm the record count is unchanged.

**Do not delete the local copy until step 5 passes.** Two complete indexes cost
300 MB; half a move costs the library.

## What to expect if you do move it back

Everything that was slow before will be slow again, including the failures that
prompted this: a 6,621-photo face pass committed one face in nine hours while the
index was on the share. Keeping the index local and the photos remote is not a
workaround, it is the arrangement the measurements support.
