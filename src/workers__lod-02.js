// workers__lod 02 — postmessage
// Lines 430-438 of readable/workers__lod.pretty.js (statement-aligned).
self.onmessage = async ({ data: { id: F, idx: B, pos: n, target: x } }) => {
  try {
    await K.ready;
    let [u] = K.simplify(B, n, 3, x, 0.01, []);
    self.postMessage({ id: F, out: u }, [u.buffer]);
  } catch (u) {
    self.postMessage({ id: F, err: String(u) });
  }
};
