/**
 * Pings the backend /health endpoint and reflects connectivity
 * in any element with id="backend-status".
 * Used on every page during development so it's obvious at a glance
 * whether the FastAPI server is reachable.
 */
async function checkBackendStatus() {
  const el = document.getElementById("backend-status");
  if (!el) return;

  el.textContent = "Checking backend...";
  el.className = "checking";

  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    el.textContent = `Backend online (${data.status})`;
    el.className = "online";
  } catch (err) {
    el.textContent = "Backend offline — start the FastAPI server";
    el.className = "offline";
  }
}

document.addEventListener("DOMContentLoaded", checkBackendStatus);
