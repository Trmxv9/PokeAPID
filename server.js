import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import axios from "axios";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.tailwindcss.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "https://raw.githubusercontent.com", "data:"],
        connectSrc: ["'self'", "https://pokeapi.co"],
      },
    },
  })
);

app.use((req, res, next) => {
  res.setHeader("Referrer-Policy", "no-referrer");
  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.json({ limit: "10kb" }));

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50, // vc pode mudar aqui valor que user pode fazer requisições pelo IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Muitas requisições. Tente novamente mais tarde." },
});
app.use(["/search", "/pokemon"], limiter);

let pokemonList = [];

async function loadPokemonList() {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10000");
    pokemonList = response.data.results.map(p => p.name);
  } catch (error) {
    console.error("Erro carregando lista de Pokémon:", error.message);
    pokemonList = [];
  }
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/search", (req, res) => {
  const query = typeof req.query.q === "string"
    ? req.query.q.toLowerCase().replace(/[^a-z0-9-]/g, "")
    : "";

  if (!query) return res.json([]);

  const filtered = pokemonList.filter(name => name.startsWith(query)).slice(0, 10);
  res.json(filtered);
});

app.get("/pokemon/:name", async (req, res) => {
  const name = typeof req.params.name === "string"
    ? req.params.name.toLowerCase().replace(/[^a-z0-9-]/g, "")
    : "";

  if (!name) return res.status(400).json({ error: "Nome inválido" });

  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    res.json({
      name: data.name,
      id: data.id,
      types: data.types.map(t => t.type.name),
      sprite: data.sprites.front_default,
    });
  } catch {
    res.status(404).json({ error: "Pokémon não encontrado" });
  }
});

loadPokemonList().then(() => {
  app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
});
