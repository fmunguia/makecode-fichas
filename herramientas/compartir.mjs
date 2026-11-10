// Comparte cada proyecto en MakeCode (como el botón «Compartir») y guarda los enlaces.
// Solo vuelve a compartir las carpetas que han cambiado desde la última vez.
// Uso: node herramientas/compartir.mjs   (lo ejecuta el workflow «Compartir en MakeCode»)
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const archivoEnlaces = path.join(raiz, "enlaces.json");
const enlaces = fs.existsSync(archivoEnlaces) ? JSON.parse(fs.readFileSync(archivoEnlaces, "utf8")) : {};

async function versionMakeCode() {
    try {
        const html = await (await fetch("https://makecode.microbit.org/")).text();
        const m = /"target"\s*:\s*"(\d+\.\d+\.\d+)"/.exec(html);
        if (m) return m[1];
    } catch (e) { }
    const npm = await (await fetch("https://registry.npmjs.org/pxt-microbit/latest")).json();
    return npm.version;
}

const version = await versionMakeCode();
console.log("Versión de MakeCode para micro:bit:", version);

const carpetas = fs.readdirSync(raiz).filter(d => fs.existsSync(path.join(raiz, d, "pxt.json"))).sort();
let cambios = 0;
for (const carpeta of carpetas) {
    const dir = path.join(raiz, carpeta);
    const config = JSON.parse(fs.readFileSync(path.join(dir, "pxt.json"), "utf8"));
    const archivos = {};
    for (const f of config.files) archivos[f] = fs.readFileSync(path.join(dir, f), "utf8");
    archivos["pxt.json"] = fs.readFileSync(path.join(dir, "pxt.json"), "utf8");
    const hash = crypto.createHash("sha256").update(JSON.stringify(archivos)).digest("hex");
    if (enlaces[carpeta]?.hash === hash) continue;
    const cuerpo = {
        name: config.name,
        target: "microbit",
        targetVersion: version,
        description: config.description || "",
        editor: "blocksprj",
        text: JSON.stringify(archivos),
        meta: { versions: { target: version }, blocksHeight: 0, blocksWidth: 0 },
    };
    const r = await fetch("https://www.makecode.com/api/scripts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cuerpo),
    });
    if (!r.ok) throw new Error(`${carpeta}: MakeCode respondió ${r.status} ${await r.text()}`);
    const res = await r.json();
    const id = res.shortid || res.id;
    enlaces[carpeta] = { id, enlace: `https://makecode.microbit.org/#pub:${id}`, hash };
    console.log(`${carpeta}: ${enlaces[carpeta].enlace}`);
    cambios++;
    await new Promise(ok => setTimeout(ok, 1000));
}
for (const c of Object.keys(enlaces)) if (!carpetas.includes(c)) delete enlaces[c];
fs.writeFileSync(archivoEnlaces, JSON.stringify(enlaces, null, 2) + "\n");

// Las mismas líneas que van en comun/makecode-enlaces.tex del repositorio de los libros
const tex = Object.entries(enlaces).map(([c, e]) => `\\enlaceMakeCode{${c}}{${e.enlace}}`).join("\n") + "\n";
fs.writeFileSync(path.join(raiz, "enlaces.tex"), tex);
console.log(`${cambios} proyectos compartidos de nuevo, ${carpetas.length} en total.`);

// Comprobación: cada enlace devuelve el mismo programa que hay en la carpeta
let malos = 0;
for (const [carpeta, e] of Object.entries(enlaces)) {
    const r = await fetch(`https://www.makecode.com/api/${e.id}/text`);
    const texto = r.ok ? await r.json() : null;
    const local = fs.readFileSync(path.join(raiz, carpeta, "main.ts"), "utf8");
    const ok = texto && texto["main.ts"] === local && (texto["main.blocks"] || "").length > 0;
    if (!ok) { malos++; console.log(`✗ ${carpeta}: el enlace ${e.enlace} no devuelve el programa (${r.status})`); }
}
console.log(malos ? `${malos} enlaces con problemas` : "✓ Los enlaces devuelven sus programas con bloques");
if (malos) process.exit(1);
