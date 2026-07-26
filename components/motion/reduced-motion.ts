"use client";

import { useSyncExternalStore } from "react";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function getSnapshot() {
  return window.matchMedia?.(reducedMotionQuery).matches ?? false;
}

function getServerSnapshot() {
  // Prerendered and pre-hydration content must never inherit a hidden state.
  return true;
}

function subscribe(onPreferenceChange: () => void) {
  const mediaQuery = window.matchMedia?.(reducedMotionQuery);

  if (!mediaQuery) {
    return () => undefined;
  }

  mediaQuery.addEventListener("change", onPreferenceChange);

  return () => mediaQuery.removeEventListener("change", onPreferenceChange);
}

export function useReducedMotionPreference() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
