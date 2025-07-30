const input = document.getElementById("search");
const suggestions = document.getElementById("suggestions");
const details = document.getElementById("details");

let rateLimitMsg = document.getElementById("rate-limit-msg");
if (!rateLimitMsg) {
  rateLimitMsg = document.createElement("div");
  rateLimitMsg.id = "rate-limit-msg";
  rateLimitMsg.className =
    "mt-4 p-3 bg-red-100 text-red-700 rounded border border-red-300 text-center hidden";
  rateLimitMsg.textContent = "Muitas requisições. Tente novamente mais tarde.";
  suggestions.parentNode.appendChild(rateLimitMsg);
}

let debounceTimer;

input.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(fetchSuggestions, 300);
});

async function fetchSuggestions() {
  const q = input.value.trim();
  if (!q) {
    suggestions.innerHTML = "";
    suggestions.classList.add("hidden");
    rateLimitMsg.classList.add("hidden");
    return;
  }

  try {
    const res = await fetch(`/search?q=${encodeURIComponent(q)}`);

    if (res.status === 429) {
      rateLimitMsg.classList.remove("hidden");
      suggestions.classList.add("hidden");
      details.classList.add("hidden");
      return;
    }

    rateLimitMsg.classList.add("hidden");

    const list = await res.json();

    suggestions.innerHTML = "";
    if (list.length) {
      list.forEach((name) => {
        const li = document.createElement("li");
        li.textContent = name;
        li.className = "px-4 py-2 hover:bg-blue-100 cursor-pointer transition";
        li.onclick = () => selectPokemon(name);
        suggestions.appendChild(li);
      });
      suggestions.classList.remove("hidden");
    } else {
      suggestions.classList.add("hidden");
    }
  } catch {
    rateLimitMsg.classList.add("hidden");
    suggestions.classList.add("hidden");
    details.classList.add("hidden");
  }
}

const selectPokemon = async (name) => {
  input.value = name;
  suggestions.innerHTML = "";
  suggestions.classList.add("hidden");
  rateLimitMsg.classList.add("hidden");

  try {
    const res = await fetch(`/pokemon/${encodeURIComponent(name)}`);

    if (res.status === 429) {
      rateLimitMsg.classList.remove("hidden");
      details.classList.add("hidden");
      return;
    }

    if (!res.ok) throw new Error();

    const p = await res.json();

    details.innerHTML = `
      <h2 class="text-xl font-semibold text-blue-700 mb-2 capitalize">${
        p.name
      }</h2>
      <p class="mb-1"><strong>Número:</strong> #${p.id}</p>
      <p class="mb-2"><strong>Tipo:</strong> ${p.types
        .map(
          (t) =>
            `<span class="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded mr-1 text-sm">${t}</span>`
        )
        .join("")}</p>
      <img src="${p.sprite}" class="w-32 h-32 mx-auto">
    `;
    details.classList.remove("hidden");
  } catch {
    details.classList.add("hidden");
  }
};
