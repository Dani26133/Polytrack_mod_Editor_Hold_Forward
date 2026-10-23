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

        let animationFrameId = null;

        const updateLoop = () => {
            animationFrameId = requestAnimationFrame(updateLoop);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Umfassende und sichere Suche nach dem Spielobjekt / Fahrzeug
            const gameObj = window.game || 
                            window.car || 
                            window.player || 
                            (window.gameInstance && window.gameInstance.car) ||
                            (window.scene && window.scene.player) ||
                            findCarInScene();

            ctx.strokeStyle = "#70e0a0";
            ctx.lineWidth = 3;
            ctx.lineJoin = "round";

            if (!gameObj) {
                statusEl.textContent = "Status: Kein Auto gefunden (Spielstand aktiv?)";
                drawPlaceholder(ctx);
                return;
            }

            statusEl.textContent = "Status: Vorhersage aktiv";

            // Robuste Extraktion von Position und Geschwindigkeit (mit Fallbacks)
            const posX = gameObj.position?.x ?? gameObj.x ?? 0;
            const posZ = gameObj.position?.z ?? gameObj.z ?? 0;
            const velocity = gameObj.velocity || gameObj.body?.velocity || { x: 0, z: 0 };

            const points = [];
            let simX = posX;
            let simZ = posZ;
            let simVx = velocity.x ?? 0;
            let simVz = velocity.z ?? 0;

            // Vorhersage über 20 Ticks mit leichter Dämpfung
            for (let i = 0; i < 20; i++) {
                simX += simVx;
                simZ += simVz;
                simVx *= 0.95;
                simVz *= 0.95;
                points.push({ x: simX, z: simZ });
            }

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);

            const scale = 2.0;
            for (let p of points) {
                const canvasX = centerX + (p.x - posX) * scale;
                const canvasY = centerY - (p.z - posZ) * scale;
                ctx.lineTo(canvasX, canvasY);
            }
            ctx.stroke();

            // Fahrzeug-Marker in der Mitte
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(centerX - 4, centerY - 4, 8, 8);
        };

        animationFrameId = requestAnimationFrame(updateLoop);
    };
}

// Hilfsfunktion: Durchsucht die Three.js-Szene nach einem passenden Fahrzeugobjekt
function findCarInScene() {
    try {
        if (window.scene && window.scene.children) {
            for (let child of window.scene.children) {
                if (child && child.type === "Group" && child.position && (child.velocity || child.speed)) {
                    return child;
                }
            }
        }
    } catch (e) {
        // Fehler im Suchlauf abfangen, um Endlosschleifen/Abstürze zu verhindern
    }
    return null;
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
