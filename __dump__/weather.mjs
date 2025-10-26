import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

(async function () {
    const lat = 23.810332,
        lon = 90.4125181;
    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.search = new URLSearchParams({
        latitude: String(lat),
        longitude: String(lon),
        timezone: 'Asia/Dhaka',
        current_weather: 'true',
        hourly: 'temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,pressure_msl',
    }).toString();

    // const proxy = 'https://corsproxy.io/?';
    // const r = await fetch(proxy + encodeURIComponent(url.toString()));
    // const data = await r.json();
    // console.dir(data, { depth: Infinity });

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    const data = await res.json();

    const hourly = data.hourly;
    const times = hourly.time;
    const records = times.map((t, i) => ({
        time: t,
        temperature_2m: hourly.temperature_2m?.[i] ?? '',
        relativehumidity_2m: hourly.relativehumidity_2m?.[i] ?? '',
        precipitation: hourly.precipitation?.[i] ?? '',
        windspeed_10m: hourly.windspeed_10m?.[i] ?? '',
        pressure_msl: hourly.pressure_msl?.[i] ?? '',
    }));

    // Build CSV header
    const header = Object.keys(records[0]).join(',');
    const rows = records.map((r) =>
        Object.values(r)
            .map((v) => (typeof v === 'string' ? `"${v}"` : v))
            .join(',')
    );
    const csv = [header, ...rows].join('\n');
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const outFile = path.resolve(__dirname, 'dhaka-weather.csv');
    await fs.writeFile(outFile, csv, 'utf8');
    console.log(`✅ Saved CSV: ${outFile}`);
})();