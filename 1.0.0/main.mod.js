import { PolyMod } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.0/PolyTypes.js";

/*
 * Forward Ghost Preview — prototype scaffold
 *
 * This first package only verifies the PolyModLoader mod structure and loads
 * into the mod list. It does NOT yet simulate PolyTrack physics or render
 * ghost cars. Those require hooking the correct simulation and rendering APIs
 * for the installed PolyModLoader build.
 */

class ForwardGhostPreview extends PolyMod {
    // Future implementation:
    // - configurable menu keybind
    // - W-only forward simulation
    // - sampled future states (1 ms, 2 ms, etc.)
    // - ghost car and optional trajectory line
    // - configurable simulation horizon
}

export let polyMod = new ForwardGhostPreview();
