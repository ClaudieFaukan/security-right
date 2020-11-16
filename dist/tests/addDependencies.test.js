"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("../src");
const security_right_module_builder_1 = require("../src/module/security-right-module.builder");
describe('addDependencies', () => {
    const right = new src_1.Right("RulesKey");
    const right2 = new src_1.Right("Rules2");
    const right3 = new src_1.Right("Rules3");
    it('addDependencies OK', () => {
        const featureRight = new src_1.FeatureRightMatrix("cmmsIntervention", "MRW").build();
        const f2UserMatrix = new security_right_module_builder_1.ModuleMatrix("f2-user");
        f2UserMatrix.addDependencies(right, [right2, right3, featureRight.get()]);
        const expectEq = {
            ["RulesKey"]: [right2.name, right3.name, featureRight.MANAGER.name, featureRight.READ.name, featureRight.WRITE.name]
        };
        chai_1.expect(f2UserMatrix['dependencies']).to.eql(expectEq);
    });
    it('addDependencies with same name of dépendencies key', () => {
        const _f2UserMatrix = new security_right_module_builder_1.ModuleMatrix("f3-user");
        chai_1.expect(() => {
            _f2UserMatrix.addDependencies(right, [right]);
        }).to.throw(src_1.ReferenceCircularRightError);
    });
    it('addDependencies with rightAddAlready (featureRight)', () => {
        const featureRight0 = new src_1.FeatureRightMatrix("cmmsIntervention", "MRW").build();
        const _f2UserMatrix0 = new security_right_module_builder_1.ModuleMatrix("f3-user");
        const nameRight = new src_1.Right("cmmsInterventionManager");
        chai_1.expect(() => { _f2UserMatrix0.addDependencies(nameRight, [featureRight0]); }).to.throw(src_1.ReferenceCircularRightError);
    });
    it('addDependencies with same right in add ', () => {
        const _f2UserMatrix = new security_right_module_builder_1.ModuleMatrix("f3-user");
        chai_1.expect(() => {
            _f2UserMatrix.addDependencies(right, [right2, right2, right2]);
        }).to.throw(src_1.AlreadyRightDependenciesError);
    });
    it('addDependencies aldredy created', () => {
        const featureRight = new src_1.FeatureRightMatrix("cmmsIntervention", "MRW").build();
        const f2UserMatrix = new security_right_module_builder_1.ModuleMatrix("f2-user");
        f2UserMatrix.addDependencies(right, [right2, right3, featureRight.get()]);
        chai_1.expect(() => {
            f2UserMatrix.addDependencies(right, [right2, right3, featureRight.get()]);
        }).to.throw(src_1.NameDependenciesError);
    });
});
