import { PolyMod } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.0/PolyTypes.js";

class ForwardGhostPreview extends PolyMod {
    postInit = () => {
        console.log("FORWARD GHOST MOD IS RUNNING");
    };
}

export let polyMod = new ForwardGhostPreview();
