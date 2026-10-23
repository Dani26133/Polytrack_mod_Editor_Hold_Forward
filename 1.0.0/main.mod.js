import { PolyMod } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.0/PolyTypes.js";

class ForwardGhostPreview extends PolyMod {
    postInit = () => {
        const panel = document.createElement("div");

        panel.id = "forward-ghost-panel";
        panel.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 99999;
            width: 260px;
            padding: 16px;
            background: #17191fee;
            color: white;
            border: 1px solid #ffffff30;
            border-radius: 10px;
            font: 14px Arial, sans-serif;
            display: none;
        `;

        panel.innerHTML = `
            <div style="font-size:17px;font-weight:bold;margin-bottom:14px">
                Forward Ghost
            </div>

            <label>
                Sample interval (ms)
                <input id="fg-interval" type="number"
                    min="1" max="100" value="1"
                    style="width:100%;margin:6px 0 12px">
            </label>

            <label>
                Simulation length (ms)
                <input id="fg-horizon" type="number"
                    min="100" max="60000" step="100"
                    value="5000"
                    style="width:100%;margin:6px 0 12px">
            </label>

            <div style="color:#b8c0cc;font-size:12px">
                Toggle menu: G<br>
                Preview: not connected yet
            </div>
        `;

        document.body.appendChild(panel);

        window.addEventListener("keydown", event => {
            if (
                event.key.toLowerCase() === "g" &&
                !event.repeat &&
                !["INPUT", "TEXTAREA"].includes(
                    document.activeElement?.tagName
                )
            ) {
                panel.style.display =
                    panel.style.display === "none" ? "block" : "none";
            }
        });
    };
}

export let polyMod = new ForwardGhostPreview();
