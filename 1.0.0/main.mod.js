import { PolyMod } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.0/PolyTypes.js";

class ForwardGhostPreview extends PolyMod {
    init = () => {
        alert("Forward Ghost: init ran");
    };

    postInit = () => {
        alert("Forward Ghost: postInit ran");
    };
}

export let polyMod = new ForwardGhostPreview();
