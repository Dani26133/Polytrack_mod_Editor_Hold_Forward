import { PolyMod } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.0/PolyTypes.js";

class ForwardGhostPreview extends PolyMod {
    postInit = () => {
        if (document.getElementById("germini-preview-panel")) return;

        // 1. Erstelle das Hauptfenster über sichere DOM-Methoden (verhindert Text-Bug)
        const panel = document.createElement("div");
        panel.id = "germini-preview-panel";
        panel.style.cssText = `
            position: fixed;
            right: 24px;
            top: 90px;
            width: 280px;
            padding: 16px;
            z-index: 999999;
            background: #0f131c;
            color: #ffffff;
            border: 2px solid #70e0a0;
            border-radius: 12px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.6);
            pointer-events: auto;
        `;

        // Titel
        const titleEl = document.createElement("div");
        titleEl.style.cssText = "font-size:16px; font-weight:bold; color:#70e0a0; margin-bottom:6px;";
        titleEl.textContent = "Hold-Forward Preview (germini_v2)";
        panel.appendChild(titleEl);

        // Status-Text (wird jetzt garantiert angezeigt)
        const statusEl = document.createElement("div");
        statusEl.id = "germini-status";
        statusEl.style.cssText = "font-size:13px; color:#ffcc00; margin-bottom:8px;";
        statusEl.textContent = "Status: Suche Editor...";
        panel.appendChild(statusEl);

        // Canvas für die Vorschau
        const canvas = document.createElement("canvas");
        canvas.width = 248;
        canvas.height = 140;
        canvas.style.cssText = "display:block; width:248px; height:140px; background:#05070a; border-radius:6px; border: 1px solid #222c3c;";
        panel.appendChild(canvas);

        // Fußzeile
        const footerEl = document.createElement("div");
        footerEl.style.cssText = "font-size:11px; color:#8c96a5; margin-top:8px;";
        footerEl.textContent = "Level Maker Path Simulator";
        panel.appendChild(footerEl);

        document.body.appendChild(panel);

        const ctx = canvas.getContext("2d");

        // 2. Render- und Erkennungsschleife
        const updateLoop = () => {
            requestAnimationFrame(updateLoop);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Erweiterte Suche nach dem Level-Editor im globalen Scope
            const editorObj = window.editor || 
                              window.levelEditor || 
                              window.trackEditor || 
                              window.game?.editor ||
                              (window.gameInstance && window.gameInstance.editor);

            if (!editorObj) {
                statusEl.textContent = "Status: Bitte Level Editor öffnen!";
                statusEl.style.color = "#ff5555";
                drawPlaceholder(ctx);
                return;
            }

            statusEl.textContent = "Status: Editor aktiv (Hold-Forward)";
            statusEl.style.color = "#70e0a0";

            // Canvas-Visualisierung für den Editor-Pfad
            ctx.strokeStyle = "#70e0a0";
            ctx.lineWidth = 3;
            ctx.lineJoin = "round";
            ctx.beginPath();

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            ctx.moveTo(centerX, centerY);

            // Simulierte Strecke im Editor
            let px = centerX;
            let py = centerY;
            for (let i = 0; i < 20; i++) {
                py -= 5;
                ctx.lineTo(px, py);
            }
            ctx.stroke();

            // Startpunkt-Indikator
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(centerX - 4, centerY - 4, 8, 8);
        };

        requestAnimationFrame(updateLoop);
    };
}

function drawPlaceholder(ctx) {
    ctx.strokeStyle = "#ff5555";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, 100);
    ctx.lineTo(200, 40);
    ctx.stroke();

    ctx.fillStyle = "#ff5555";
    ctx.font = "bold 13px Arial";
    ctx.textAlign = "center";
    ctx.fillText("KEIN EDITOR ERFASST", 124, 75);
}

export let polyMod = new ForwardGhostPreview();
