import { RightAcessError } from "./security-right.error";

export class Right {
    constructor(readonly name:string,readonly isRole:boolean = false){}
}
export interface RightDependencies {
    [key: string]: string[]
}
export interface FeatureRightRead extends FeatureRight{
    READ: Right
}
export interface FeatureRightWrite extends FeatureRight{
    WRITE: Right;
    USE: Right;
}
export interface FeatureRightManager extends FeatureRight{
    MANAGER: Right
}
export type FeatureRightReadWrite = FeatureRightRead & FeatureRightWrite;
export type FeatureRightReadManager = FeatureRightManager & FeatureRightRead
export type FeatureRightWriteManager = FeatureRightWrite & FeatureRightManager;
export type FeatureRightReadWriteManager = FeatureRightWriteManager & FeatureRightRead;

export type Access = "R" | "W" | "M" | "MR" | "MW" | "MRW" | "RW"

export class FeatureRight {

    constructor(readonly name:string, readonly access: Access,readonly rights:Right[],readonly nullable: boolean){}

    get(access?: Access):Right[]{

        if(!access){
            return this.rights.slice()
        }
        
        const arrayReturn:Right[]=[];
        const self:FeatureRightReadWriteManager = this as any

        if ( ( this.access.indexOf("M") ) !== -1 ){

            if(!self.MANAGER) {

                throw new RightAcessError(this.name,this.access)
            }
            arrayReturn.push(self.MANAGER)
        }

        if ( (this.access.indexOf("R")) !== -1 ){

            if (!self.READ){

                throw new RightAcessError(this.name,this.access)
            }
            arrayReturn.push(self.READ)
        }
        if ((this.access.indexOf("W")) !== -1 ){

            if(!self.WRITE){

                throw new RightAcessError(this.name,this.access)
            }
            arrayReturn.push(self.WRITE, self.USE)
        }
        return arrayReturn
    }
}