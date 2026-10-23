
import { PolyMod } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.0/PolyTypes.js";

// TEST A: runs as soon as the mod file is evaluated.
window.alert("Forward Ghost test A: JavaScript file executed.");

class ForwardGhostPreview extends PolyMod {
    postInit = () => {
        // TEST B: runs after the game finishes loading.
        window.alert("Forward Ghost test B: postInit executed.");
    };
}

export let polyMod = new ForwardGhostPreview();
