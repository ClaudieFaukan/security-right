export class NullableRightError extends Error {
    constructor(){
        super("Erreur, ce droit ne peut être nullable")
    }
}

export class RightAcessError extends Error {
    constructor(readonly name:string,readonly access: string){
        super(`Erreur sur le droit: ${name} l'accès ${access} n'est pas autoriser`)
    }
}

/*******************    ERROR HIERARCHIE        *************** */


export class AlreadyPresentRightError extends Error {

    constructor(roleName: string) {

        let message = 'Le rôle ' + roleName + ' est déjà présent';

        super(message);
    }
}

export class BuildHierarchyMaxLoopError extends Error {

    constructor(maxLoop: number) {

        let message = 'Le nombre de boucle pour la construction de la hiérarchie est atteint (nombre de boucles: ' + maxLoop + ')';

        super(message);
    }
}
