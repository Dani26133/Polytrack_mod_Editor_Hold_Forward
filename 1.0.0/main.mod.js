import { PolyMod } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.0/PolyTypes.js";

class ForwardGhostPreview extends PolyMod {
    postInit = () => {
        const box = document.createElement("div");
        box.textContent = "Forward Ghost Preview loaded";
        box.style.cssText = `
            position: fixed;
            bottom: 12px;
            left: 12px;
            z-index: 99999;
            padding: 8px 12px;
            background: #111d;
            color: white;
            font: 14px sans-serif;
            border-radius: 6px;
            pointer-events: none;
        `;
        document.body.appendChild(box);
    };
}

export let polyMod = new ForwardGhostPreview();
