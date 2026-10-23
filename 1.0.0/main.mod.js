import { PolyMod } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.0/PolyTypes.js";

class ForwardGhostPreview extends PolyMod {
    postInit = () => {
        const panel = document.createElement("div");
        panel.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 999999;
            padding: 18px;
            background: #17191f;
            color: white;
            border: 2px solid #70e0a0;
            border-radius: 10px;
            font: 16px Arial, sans-serif;
        `;
        panel.innerHTML = `
            <b>Forward Ghost — TEST</b>
            <p>Mod code is running.</p>
            <p>Sampling interval: 1 ms</p>
            <p>Prediction length: 5000 ms</p>
        `;
        document.body.appendChild(panel);
    };
}

export let polyMod = new ForwardGhostPreview();
