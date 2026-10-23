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
                Hold-Forward Preview <span style="font-size:12px;color:#bdc5d3">(germini_v1)</span>
            </div>
            <div id="inkano-status" style="margin-top:8px">
                Status: Suche Editor-Daten...
            </div>
            <canvas id="inkano-trail"
                width="250" height="150"
                style="display:block;width:250px;height:150px;margin-top:10px;background:#080b10;border-radius:6px;">
            </canvas>
            <div style="font-size:11px;color:#bdc5d3;margin-top:6px">
                Simuliert den Fahrweg im Level Maker
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

            // Suche nach Editor-Instanzen und Streckendaten im globalen Scope
            const editorObj = window.editor || 
                              window.levelEditor || 
                              window.trackEditor || 
                              window.game?.editor ||
                              (window.gameInstance && window.gameInstance.editor);

            ctx.strokeStyle = "#70e0a0";
            ctx.lineWidth = 3;
            ctx.lineJoin = "round";

            if (!editorObj) {
                statusEl.textContent = "Status: Öffne den Level Editor!";
                drawPlaceholder(ctx);
                return;
            }

            statusEl.textContent = "Status: Editor aktiv & analysiere Blocks";

            const blocks = editorObj.blocks || editorObj.track?.blocks || editorObj.currentTrack?.blocks || [];

            let startPos = { x: 0, z: 0 };
            for (let block of blocks) {
                if (block.type === "start" || block.isStart || block.name?.includes("start")) {
                    startPos = block.position || { x: block.x || 0, z: block.z || 0 };
                    break;
                }
            }

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);

            const points = [];
            let simX = startPos.x;
            let simZ = startPos.z;
            let simForwardX = 0;
            let simForwardZ = -2;

            for (let i = 0; i < 25; i++) {
                simX += simForwardX;
                simZ += simForwardZ;
                points.push({ x: simX, z: simZ });
            }

            const scale = 1.5;
            for (let p of points) {
                const canvasX = centerX + (p.x - startPos.x) * scale;
                const canvasY = centerY + (p.z - startPos.z) * scale;
                ctx.lineTo(canvasX, canvasY);
            }
            ctx.stroke();

            ctx.fillStyle = "#ffffff";
            ctx.fillRect(centerX - 4, centerY - 4, 8, 8);
        };

        animationFrameId = requestAnimationFrame(updateLoop);
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
