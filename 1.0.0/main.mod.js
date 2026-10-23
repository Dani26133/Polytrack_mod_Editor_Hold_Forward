
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
                Preview renderer initialized
            </div>
            <canvas id="inkano-trail"
                width="250" height="150"
                style="display:block;width:250px;height:150px;margin-top:10px">
            </canvas>
            <div style="font-size:11px;color:#bdc5d3">
                Renderer test — not yet connected to physics
            </div>
        `;

        document.body.appendChild(panel);

        const canvas = panel.querySelector("#inkano-trail");
        const ctx = canvas.getContext("2d");

        ctx.strokeStyle = "#70e0a0";
        ctx.lineWidth = 3;
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(125, 140);
        ctx.lineTo(125, 115);
        ctx.lineTo(105, 95);
        ctx.lineTo(105, 70);
        ctx.lineTo(145, 45);
        ctx.lineTo(145, 15);
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(119, 132, 12, 12);
    };
}

export let polyMod = new ForwardGhostPreview();
