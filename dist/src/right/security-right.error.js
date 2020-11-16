"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightAcessError = exports.NullableRightError = void 0;
class NullableRightError extends Error {
    constructor() {
        super("Erreur, ce droit ne peut être nullable");
    }
}
exports.NullableRightError = NullableRightError;
class RightAcessError extends Error {
    constructor(name, access) {
        super(`Erreur sur le droit: ${name} l'accès ${access} n'est pas autoriser`);
        this.name = name;
        this.access = access;
    }
}
exports.RightAcessError = RightAcessError;
