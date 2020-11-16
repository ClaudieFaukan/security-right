import { FeatureRightManager, FeatureRightRead, FeatureRightWrite, FeatureRightWriteManager,
    FeatureRightReadWriteManager, FeatureRightReadManager, FeatureRightReadWrite, Access, Right, FeatureRight} from "./security-right";
import { NullableRightError } from "./security-right.error";

interface FeatureRights {

    R: FeatureRightRead
    W: FeatureRightWrite
    M: FeatureRightManager
    RW: FeatureRightReadWrite
    MR: FeatureRightReadManager
    MW: FeatureRightWriteManager 
    MRW: FeatureRightReadWriteManager
}

export class FeatureRightMatrix <TAccess extends Access>{

    constructor(readonly name:string,readonly access:TAccess,readonly nullable: boolean = false, readonly isRole: boolean = false){}

    build():FeatureRights[TAccess]{

        const right:Right[] = []
        const featureRight = new FeatureRight( this.name,this.access,right,this.nullable) as FeatureRightReadWriteManager;

        if ( this.access.length == 1 && this.nullable == true ){
            throw new NullableRightError
        }

        if( (this.access.indexOf("M") ) !== -1 ){

            const manager = new Right( this.name+"Manager", this.isRole )
            right.push(manager)
            featureRight.MANAGER = manager
        }
        if( (this.access.indexOf("R") ) !== -1 ){

            const read = new Right( this.name+"Read", this.isRole )
            right.push(read)
            featureRight.READ = read
        }
        if( (this.access.indexOf("W") ) !== -1 ){

            const write = new Right( this.name+"Write", this.isRole )
            right.push(write)
            featureRight.WRITE = write
            featureRight.USE = write
        }
        return featureRight
    }
}

