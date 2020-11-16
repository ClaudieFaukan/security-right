"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceCircularRightError = exports.EmptyRightDependenciesError = exports.NameDependenciesError = exports.AlreadyRightDependenciesError = void 0;
class AlreadyRightDependenciesError extends Error {
    constructor(name) {
        super(`Les droits ${name} sont déjà définies dans cette dépendance`);
        this.name = name;
    }
}
exports.AlreadyRightDependenciesError = AlreadyRightDependenciesError;
class NameDependenciesError extends Error {
    constructor(name) {
        super(`La dépendance ${name} est déjà présente`);
        this.name = name;
    }
}
exports.NameDependenciesError = NameDependenciesError;
class EmptyRightDependenciesError extends Error {
    constructor() {
        super(`Les droits ajouter à la dépendance sont vide`);
    }
}
exports.EmptyRightDependenciesError = EmptyRightDependenciesError;
class ReferenceCircularRightError extends Error {
    constructor(name) {
        super(`Le droit ${name} va créer une réference circulaire`);
        this.name = name;
    }
}
exports.ReferenceCircularRightError = ReferenceCircularRightError;
