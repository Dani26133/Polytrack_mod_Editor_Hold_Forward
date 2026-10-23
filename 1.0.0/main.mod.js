import { PolyMod } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.0/PolyTypes.js";

class ForwardGhostPreview extends PolyMod {
    postInit = () => {
        if (document.getElementById("inkano-forward-preview")) return;

        const panel = document.createElement("div");
        panel.id = "inkano-forward-preview";
        panel.style.cssText = `
            position: fixed;
            right: 24px;
            top: 90px;
            width: 280px;
            padding: 14px;
            z-index: 999999;
            background: rgba(15, 19, 28, 0.96);
            color: #ffffff;
            border: 1px solid #70e0a0;
            border-radius: 10px;
            font: 14px Arial, sans-serif;
            pointer-events: auto;
        `;

        panel.innerHTML = `
            <div style="font-size:17px;font-weight:bold;color:#70e0a0">
                Forward Ghost Preview
            </div>
            <div id="inkano-status" style="margin-top:8px">
                Status: Suche Fahrzeug...
            </div>
            <canvas id="inkano-trail"
                width="250" height="150"
                style="display:block;width:250px;height:150px;margin-top:10px;background:#080b10;border-radius:6px;">
            </canvas>
            <div style="font-size:11px;color:#bdc5d3;margin-top:6px">
                Live-Projektion der nächsten Fahrbewegung
            </div>
        `;

        document.body.appendChild(panel);

        const canvas = panel.querySelector("#inkano-trail");
        const ctx = canvas.getContext("2d");
        const statusEl = panel.querySelector("#inkano-status");

        // Haupt-Loop für die Vorhersage und das Rendern
        const updateLoop = () => {
            requestAnimationFrame(updateLoop);

            // Canvas leeren
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Versuch, das Auto / die Spielphysik im globalen Scope oder Three.js Scene zu finden
            // PolyTrack speichert Fahrzeuge oft in globalen Variablen, Game-Managern oder der Szene.
            const gameObj = window.game || window.player || window.car || 
                            (window.activeScene && window.activeScene.player);

            ctx.strokeStyle = "#70e0a0";
            ctx.lineWidth = 3;
            ctx.lineJoin = "round";

            if (!gameObj) {
                statusEl.textContent = "Status: Kein aktives Spiel/Fahrzeug gefunden";
                // Platzhalter / Test-Muster zeichnen, wenn kein Objekt gefunden wurde
                drawPlaceholder(ctx);
                return;
            }

            statusEl.textContent = "Status: Vorhersage aktiv";

            // Beispielhafte Extraktion von Positions- und Geschwindigkeitsdaten
            // (Die genauen Eigenschaftsnamen hängen von der internen PolyTrack-Engine ab)
            const posX = gameObj.position ? gameObj.position.x : (gameObj.x || 0);
            const posZ = gameObj.position ? gameObj.position.z : (gameObj.z || 0);
            const velocity = gameObj.velocity || { x: 0, z: 0 };

            // Generiere einfache Vorhersagepunkte für die nächsten Ticks
            const points = [];
            let simX = posX;
            let simZ = posZ;
            let simVx = velocity.x;
            let simVz = velocity.z;

            for (let i = 0; i < 20; i++) {
                simX += simVx;
                simZ += simVz;
                // Einfache Dämpfung / Reibungs-Simulation für die Vorschau
                simVx *= 0.95;
                simVz *= 0.95;
                points.push({ x: simX, z: simZ });
            }

            // Auf Mini-Canvas projizieren (Zentrierung auf das Auto)
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);

            if (points.length > 0) {
                // Skalierungsfaktor für die Ansicht
                const scale = 2.0;
                for (let p of points) {
                    const canvasX = centerX + (p.x - posX) * scale;
                    const canvasY = centerY - (p.z - posZ) * scale; // Invertierte Z-Achse für 2D-Ansicht
                    ctx.lineTo(canvasX, canvasY);
                }
            }
            ctx.stroke();

            // Fahrzeug-Punkt in der Mitte
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(centerX - 4, centerY - 4, 8, 8);
        };

        requestAnimationFrame(updateLoop);
    };
}

function drawPlaceholder(ctx) {
    ctx.strokeStyle = "#70e0a0";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(125, 130);
    ctx.lineTo(125, 90);
    ctx.lineTo(100, 60);
    ctx.lineTo(150, 30);
    ctx.stroke();
    
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(121, 126, 8, 8);
}

export let polyMod = new ForwardGhostPreview();
