// scripts/script.js
const form = document.getElementById("trendForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 1) arma payload desde el form
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    // 2) guarda por si quieres mostrar algo en processing
    sessionStorage.setItem("trend_payload", JSON.stringify(payload));

    // 3) redirige a la página bonita de cargando
    window.location.href = "processing.html";

    // 4) dispara el webhook "en background" (USA PRODUCTION URL)
    try {
      const res = await fetch("http://localhost:5678/webhook/api/trends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      sessionStorage.setItem("trend_result", JSON.stringify(data));
    } catch (err) {
      sessionStorage.setItem("trend_error", err.message);
    }
  });
}
