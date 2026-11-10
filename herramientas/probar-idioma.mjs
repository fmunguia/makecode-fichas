// Abre en un navegador (configurado en inglés) cada enlace de enlaces.json y comprueba que
// MakeCode sale en español y con los bloques del proyecto, extensiones incluidas.
import fs from "node:fs";
import { chromium } from "playwright";
const enlaces = JSON.parse(fs.readFileSync("enlaces.json", "utf8"));
const browser = await chromium.launch();
let malos = 0;
for (const [carpeta, e] of Object.entries(enlaces)) {
    const page = await browser.newPage({ locale: "en-US" });
    await page.goto(e.enlace, { waitUntil: "domcontentloaded", timeout: 90000 });
    try { await page.waitForSelector(".blocklyTreeLabel", { timeout: 90000 }); } catch (err) { }
    await page.waitForTimeout(4000);
    const categorias = await page.$$eval(".blocklyTreeLabel", els => els.map(x => x.textContent));
    const bloques = await page.$$eval(".blocklyDraggable", els => els.length);
    const espanol = categorias.includes("Básico");
    const ok = espanol && bloques > 0;
    if (!ok) malos++;
    console.log(`${ok ? "✓" : "✗"} ${carpeta}: ${espanol ? "español" : "NO español"}, ${bloques} bloques, categorías: ${categorias.slice(0, 12).join(" | ")}`);
    await page.close();
}
await browser.close();
console.log(malos ? `${malos} enlaces con problemas` : "✓ Todos los enlaces abren en español con sus bloques");
if (malos) process.exit(1);
