import {expect} from "chai"
import { NameDependenciesError, AlreadyRightDependenciesError,ReferenceCircularRightError, FeatureRightMatrix, Right } from '../src'
import {ModuleMatrix} from '../src/module/security-right-module.builder'


describe('addDependencies', () => {

    const right = new Right("RulesKey");
    const right2 = new Right("Rules2");
    const right3 = new Right("Rules3");

    it('addDependencies OK', () => {

        const featureRight = new FeatureRightMatrix("cmmsIntervention","MRW").build();
        const f2UserMatrix = new ModuleMatrix("f2-user");

        f2UserMatrix.addDependencies(right,[right2,right3,featureRight.get()]);

        const expectEq = {
            ["RulesKey"] : [right2.name,right3.name,featureRight.MANAGER.name,featureRight.READ.name,featureRight.WRITE.name]
        };
        expect(f2UserMatrix['dependencies']).to.eql(expectEq);
    });

    it('addDependencies with same name of dépendencies key', () => {

        const _f2UserMatrix = new ModuleMatrix("f3-user");

        expect( () =>{
            _f2UserMatrix.addDependencies(right,[right])
        }).to.throw(ReferenceCircularRightError)

    });

    it('addDependencies with rightAddAlready (featureRight)', () => {

        const featureRight0 = new FeatureRightMatrix("cmmsIntervention","MRW").build();

        const _f2UserMatrix0 = new ModuleMatrix("f3-user");

        const nameRight = new Right("cmmsInterventionManager");
        expect(()=>{ _f2UserMatrix0.addDependencies(nameRight,[featureRight0])}).to.throw(ReferenceCircularRightError)

    });

    it('addDependencies with same right in add ', () => {

        const _f2UserMatrix = new ModuleMatrix("f3-user");

        expect( () =>{
            _f2UserMatrix.addDependencies(right,[right2,right2,right2])
        }).to.throw(AlreadyRightDependenciesError)
        
    });

    it('addDependencies aldredy created', () => {

        const featureRight = new FeatureRightMatrix("cmmsIntervention","MRW").build();
        const f2UserMatrix = new ModuleMatrix("f2-user");

        f2UserMatrix.addDependencies(right,[right2,right3,featureRight.get()]);

         expect (() => {
            f2UserMatrix.addDependencies(right,[right2,right3,featureRight.get()])
         }).to.throw(NameDependenciesError)
    });

});    



