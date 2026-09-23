export const META_PIXEL_ID = "253928609695585";

const LEAD_FLAG = "meta_lead_tracked";

export function trackPageView() {
  if (typeof window === "undefined") return;
  if (typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }
}

export function trackLead() {
  if (typeof window === "undefined") return false;
  if (typeof window.fbq !== "function") return false;
  window.fbq("track", "Lead");
  return true;
}

/** Marks Lead as already sent so /obrigado does not double-fire. */
export function markLeadTracked() {
  try {
    sessionStorage.setItem(LEAD_FLAG, "1");
  } catch {
    /* ignore */
  }
}

export function consumeLeadTrackedFlag() {
  try {
    const value = sessionStorage.getItem(LEAD_FLAG);
    if (value) sessionStorage.removeItem(LEAD_FLAG);
    return value === "1";
  } catch {
    return false;
  }
}

/** Retries until fbq is ready (handles Script afterInteractive race). */
export function waitForFbq(
  callback: () => void,
  { maxAttempts = 50, intervalMs = 100 } = {},
) {
  if (typeof window === "undefined") return () => {};

  if (typeof window.fbq === "function") {
    callback();
    return () => {};
  }

  let attempts = 0;
  const id = window.setInterval(() => {
    attempts += 1;
    if (typeof window.fbq === "function") {
      window.clearInterval(id);
      callback();
    } else if (attempts >= maxAttempts) {
      window.clearInterval(id);
    }
  }, intervalMs);

  return () => window.clearInterval(id);
}
