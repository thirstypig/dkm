// Passphrase gate for the DKM preview. Loaded from src/layouts/Base.astro.
//
// NOT SECURITY. The expected hash ships in this page, and the repo is
// public anyway (thirstypig/dkm). It keeps casual visitors and
// crawlers out of an unfinished site; anything truly private needs server-side
// auth (Cloudflare Access). Remove before launch.
(() => {
  const cfg = window.DKM_REVIEW || {};
  if (!cfg.hash) return;
  const KEY = "dkm-review-unlocked";
  const SALT = "dkm-preview:";
  const root = document.documentElement;

  let stored = null;
  try { stored = localStorage.getItem(KEY); } catch {}
  if (stored === cfg.hash) return;             // unlocked before, same passphrase

  root.classList.add("vr-locked");
  const style = document.createElement("style");
  // Hidden (not display:none) so the layout is ready the moment it unlocks;
  // hidden content also can't take keyboard focus.
  style.textContent = `
html.vr-locked body{visibility:hidden;overflow:hidden}
#vr-gate{visibility:visible;position:fixed;inset:0;z-index:2147483600;display:grid;place-items:center;padding:16px;
  background:var(--paper,#FAF8F3);color:var(--ink,#111);font:16px/1.5 var(--font-ui,system-ui,sans-serif)}
#vr-gate form{width:min(360px,100%);display:grid;gap:10px;padding:28px;border-radius:2px;
  background:#fff;border:1px solid var(--rule,#E4E0D6)}
#vr-gate .vr-gate-title{margin:0;font:400 40px/1 var(--font-display,sans-serif);letter-spacing:.02em}
#vr-gate .vr-gate-note{margin:0;color:var(--muted,#6F6C65);font-size:14px}
#vr-gate label{font-weight:500;font-size:13px;text-transform:uppercase;letter-spacing:.12em}
#vr-gate input{font:inherit;padding:10px 12px;border-radius:2px;border:1px solid var(--rule,#E4E0D6);
  background:var(--paper,#FAF8F3);color:inherit}
#vr-gate button{font:inherit;font-weight:500;font-size:13px;text-transform:uppercase;letter-spacing:.12em;padding:12px;border:0;border-radius:2px;cursor:pointer;
  background:var(--accent,#7A2E22);color:#fff}
#vr-gate .vr-gate-err{margin:0;min-height:1.5em;color:var(--accent,#7A2E22);font-size:14px}`;
  document.head.appendChild(style);

  async function sha256(text) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
  }

  function mount() {
    const gate = document.createElement("div");
    gate.id = "vr-gate";
    gate.innerHTML = `
<form novalidate>
  <p class="vr-gate-title">DKM preview</p>
  <p class="vr-gate-note">This draft is for invited reviewers. Enter the password you were given.</p>
  <label for="vr-pass">Password</label>
  <input id="vr-pass" type="password" autocomplete="current-password" required>
  <button type="submit">Enter preview</button>
  <p class="vr-gate-err" role="alert"></p>
</form>`;
    document.body.appendChild(gate);
    const input = gate.querySelector("input");
    const err = gate.querySelector(".vr-gate-err");
    input.focus();
    gate.querySelector("form").addEventListener("submit", async e => {
      e.preventDefault();
      if ((await sha256(SALT + input.value)) !== cfg.hash) {
        err.textContent = "That password didn’t match. Try again.";
        input.select();
        return;
      }
      try { localStorage.setItem(KEY, cfg.hash); } catch {}
      gate.remove();
      root.classList.remove("vr-locked");
      document.dispatchEvent(new CustomEvent("vr-unlocked"));
    });
  }
  if (document.body) mount(); else document.addEventListener("DOMContentLoaded", mount);
})();
