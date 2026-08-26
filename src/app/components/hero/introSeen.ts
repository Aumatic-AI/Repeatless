// Deliberately a plain module-scoped variable, not sessionStorage/localStorage.
// Storage survives a hard reload, which is exactly the case where the intro
// should replay. A module-level flag only resets when the JS module itself
// re-evaluates from scratch — i.e. an actual full navigation/reload — while
// staying `true` across client-side route changes within the same session
// (Link/router navigation away from "/" and back never re-imports this
// module), which is exactly when the intro should be skipped.
let seen = false;

export function hasSeenIntro() {
  return seen;
}

export function markIntroSeen() {
  seen = true;
}
