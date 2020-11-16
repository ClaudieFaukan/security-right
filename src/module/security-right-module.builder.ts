import {RightModule} from "../module/security-right-module"
import {FeatureRight, Right,RightDependencies} from "../right/security-right"
import { NameDependenciesError,AlreadyRightDependenciesError, EmptyRightDependenciesError, ReferenceCircularRightError } from "./security-right-module.error";




export class ModuleMatrix {

    private rights: Right[] = [];
    private dependencies: RightDependencies = {}
    private featureRights: FeatureRight[] = [];

    constructor( readonly name:string){};


    public add( rightorFeatureRight: Right | Right[] | FeatureRight | FeatureRight[] ): ModuleMatrix {

        const rightsOrFeatureRights = rightorFeatureRight instanceof Array ? rightorFeatureRight: [rightorFeatureRight];

        if ( rightsOrFeatureRights.length === 0 ){
            new EmptyRightDependenciesError();
        }

        let rights:Right[] = [];
        
        if ( rightsOrFeatureRights[0] instanceof Right ){
            
            rights = rightsOrFeatureRights as Right[];

        }else{
            const featureRights = rightsOrFeatureRights as FeatureRight[];

            featureRights.forEach( ( featureRight ) => {

                rights.push( ...featureRight.rights );
            })

            this.featureRights.push( ...featureRights );
        }

        rights.forEach( right => {

            const alreadyRight = this.rights.find( ( _right ) => _right.name === right.name );
                
            if( alreadyRight ) {
                return
            }
            this.rights.push( right );
        }); 

        return this           
    }
    
    
    public addDependencies( right: Right, dependencies: ( Right | Right[] | FeatureRight )[] ): ModuleMatrix {

        if ( this.dependencies[right.name]){
            throw new NameDependenciesError(right.name);
        }
 
        const rights:Right[] =[];

        dependencies.forEach((depElement) => {
        
            const depE = depElement instanceof Array ? depElement.slice() : 
            depElement instanceof FeatureRight? depElement.rights: [depElement];

            depE.forEach((_right)=>{
                
                if(_right.name === right.name){
                
                    throw new ReferenceCircularRightError( right.name ) ;
                }

                if ( rights.find(element => element.name === _right.name) ){

                    throw new AlreadyRightDependenciesError(_right.name);
                }
            })

            rights.push(...depE);
        });

        this.add(rights);     

        this.dependencies[right.name] = rights.map( (_right) => _right.name );
        
        return this
    }

    public build(): RightModule{
        return {
            name : this.name,
            rights: this.rights,
            featureRights: this.featureRights,
            dependencies: this.dependencies,
        }
    }    
}
