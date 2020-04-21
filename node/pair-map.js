"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Adds an ordered pair of values to the map
 * @param map The map representing the pairs.
 * @param vs The pair to add.
 */
function pairMap_set(map, v1, v2, v3) {
    let v1Map = map.get(v1);
    if (!v1Map) {
        v1Map = new Map();
        map.set(v1, v1Map);
    }
    v1Map.set(v2, v3);
}
exports.pairMap_set = pairMap_set;
/**
 * Returns true if the unordered pair is in the set of pairs (represented by a
 * map).
 * @param map The map representing the pairs.
 * @param vs The pair to check.
 */
function pairMap_get(map, v1, v2) {
    let v1Map = map.get(v1);
    if (!v1Map) {
        return undefined;
    }
    return v1Map.get(v2);
}
exports.pairMap_get = pairMap_get;
//# sourceMappingURL=pair-map.js.map