export class AlreadyRightDependenciesError extends Error {

    constructor(readonly name: string) {
        super(`Les droits ${name} sont déjà définies dans cette dépendance`)
    }
}
export class NameDependenciesError extends Error {
    constructor(readonly name:string) {
        super(`La dépendance ${name} est déjà présente`)
    }
}
export class EmptyRightDependenciesError extends Error {

    constructor() {
        super(`Les droits ajouter à la dépendance sont vide`)
    }
}
export class ReferenceCircularRightError extends Error {

    constructor(readonly name: string) {
        super(`Le droit ${name} va créer une réference circulaire`)
    }
}