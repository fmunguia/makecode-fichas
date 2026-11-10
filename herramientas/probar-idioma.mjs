// Abre enlaces de MakeCode en un navegador y dice en qué idioma salen y si carga el proyecto.
import { chromium } from "playwright";
const id = process.argv[2] || "_Po2P5vP96hV2";
const urls = [
    `https://makecode.microbit.org/?lang=es#pub:${id}`,
    `https://makecode.microbit.org/?lang=es-ES#pub:${id}`,
    `https://makecode.microbit.org/#pub:${id}`,
];
const browser = await chromium.launch();
for (const url of urls) {
    const page = await browser.newPage({ locale: "en-US" }); // navegador en inglés, como el peor caso
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
    try { await page.waitForSelector(".blocklyTreeLabel", { timeout: 90000 }); } catch (e) { }
    await page.waitForTimeout(5000);
    const categorias = await page.$$eval(".blocklyTreeLabel", els => els.map(e => e.textContent).slice(0, 6));
    const bloques = await page.$$eval(".blocklyText", els => els.map(e => e.textContent).slice(0, 8));
    const lang = await page.evaluate(() => document.documentElement.lang);
    console.log(`\n${url}\n  html lang: ${lang}\n  categorías: ${categorias.join(" | ")}\n  bloques: ${bloques.join(" | ")}`);
    await page.close();
}
await browser.close();
