import {expect} from "chai";


import {FeatureRightMatrix, Right, RightModule } from '../src';
import {ModuleMatrix} from '../src/module/security-right-module.builder';
import {buildHierarchy} from "../src/right/security-right-hierarchy.builder";
import {BuildHierarchyMaxLoopError} from "../src/right/security-right.error"




/************** TEST START  ****************** */
describe('buildHierarchie', () => {
    
     let f2UserModule: RightModule;
     let f2SecurityModule: RightModule;
     let f2apiModule: RightModule;
     let f2geoIpModule: RightModule;
     let f2xmlModule: RightModule;
     let f2testModule: RightModule;

    beforeEach(() => {
        
        /********   RIGHT   *************/
        const right = new Right("SecurityRules");
        const right2 = new Right("GeoRules");
        const right3 = new Right("Rules3");
        const right4 = new Right("Rules4");
        const right5 = new Right("Rules5");
        const right6 = new Right("Rules6");
        const right7 = new Right("UserRules");
        const right8 = new Right("Rules8");
        const right9 = new Right("Rules9");
        const right10 = new Right("XmlRules");
        const right11 = new Right("ApiRules");
        const right12 = new Right("Rules12");
        const right13 = new Right("Rules13");
        const right14 = new Right("testRules");
        const right15 = new Right("miniRule");
        const right16 = new Right("mini");
        const right17 = new Right("micro");
        const right18 = new Right("nano")
        /*******   FEATURERIGHT   *************/
        let featureRight = new FeatureRightMatrix("cmmsIntervention","MRW").build();
        let featureRight1 = new FeatureRightMatrix("cmmsIntervention1","MR").build();
        let featureRight2 = new FeatureRightMatrix("cmmsIntervention2","M").build();
        let featureRight3 = new FeatureRightMatrix("cmmsIntervention3","R").build();
        let featureRight5 = new FeatureRightMatrix("cmmsIntervention4","W").build();
        let featureRight6 = new FeatureRightMatrix("cmmsTaskIntervention","RW").build();
        /********   MODULE MATRIX   *************/
        const f2UserMatrix = new ModuleMatrix("f2-user");
        const f2SecurityMatrix = new ModuleMatrix("f2-security");
        const f2apiMatrix = new ModuleMatrix("f2-api");
        const f2geoIpMatrix = new ModuleMatrix("f2-geoIp");
        const f2xmlMatrix = new ModuleMatrix("f2-xml");
        const f2testMatrix = new ModuleMatrix("f2-test");
        /**********     ADD DEPENDENCIES    *********** */
        f2SecurityMatrix.addDependencies(right,[right2,right3,]);
            //LOOP MAX
        f2UserMatrix.addDependencies(right4,[right,featureRight.get(),featureRight1.get(),right5,right6,right7]);
        f2apiMatrix.addDependencies(right5,[right,right4,featureRight1.get(),featureRight.get(),featureRight2.get()]);
        f2geoIpMatrix.addDependencies(right6,[right5,right4,right,featureRight1.get(),featureRight.get(),featureRight2.get(),featureRight3.get()]);
        f2xmlMatrix.addDependencies(right7,[right6,right5,right4,right,featureRight1.get(),featureRight.get(),featureRight2.get(),featureRight5.get(),])
            //END LOOP MAX
        f2testMatrix.addDependencies(right8,[right,right2,right3,right4,right5,right6,right7,right9,featureRight6.get()])
        /*******    MODULE BUILD    ************* */
        f2UserModule = f2UserMatrix.build();
        f2SecurityModule = f2SecurityMatrix.build();
        f2apiModule = f2apiMatrix.build();
        f2geoIpModule = f2geoIpMatrix.build();
        f2xmlModule = f2xmlMatrix.build();
        f2testModule = f2testMatrix.build();

        
    });

    it('buildHierarchie Ok without children', () => {

        const build = buildHierarchy([f2SecurityModule.dependencies]);

        const expected = {

            GeoRules: [],
            Rules3: [],
            SecurityRules: [ 
                'GeoRules', 
                'Rules3' 
            ]
        }
      expect (build).to.eql(expected)
    });

    it('buildHierarchie Max Loop Error', () => {

        const rightDependicies1 = [
            f2UserModule.dependencies,
            f2SecurityModule.dependencies,
            f2apiModule.dependencies,
            f2geoIpModule.dependencies,
            f2xmlModule.dependencies,
            f2testModule.dependencies
        ];
      expect (() => {buildHierarchy(rightDependicies1)}).to.throw(BuildHierarchyMaxLoopError)
    });

    it('buildHierarchie many Module', () => {

        const rightDependicies1 = [f2SecurityModule.dependencies,f2xmlModule.dependencies];

        const build = buildHierarchy(rightDependicies1);

        const expected = {
            GeoRules: [],
            Rules3: [],
            Rules4: [],
            Rules5: [],
            Rules6: [],
            cmmsIntervention1Manager: [],
            cmmsIntervention1Read: [],
            cmmsIntervention2Manager: [],
            cmmsIntervention4Write: [],
            cmmsInterventionManager: [],
            cmmsInterventionRead: [],
            cmmsInterventionWrite: [],
            SecurityRules: [
                "GeoRules",
                "Rules3",
            ],
            UserRules: [
                "Rules6",
                "Rules5",
                "Rules4",
                "SecurityRules",
                "GeoRules",
                "Rules3",
                "cmmsIntervention1Manager",
                "cmmsIntervention1Read",
                "cmmsInterventionManager",
                "cmmsInterventionRead",
                "cmmsInterventionWrite",
                "cmmsIntervention2Manager",
                "cmmsIntervention4Write",
            ],
    
        }
        expect (build).to.eql(expected);
    });

    it('buildHierarchie many Children dependance', () => {

        const rightDependicies1 = [
            f2SecurityModule.dependencies,
            f2testModule.dependencies,
            f2xmlModule.dependencies,
            f2geoIpModule.dependencies
        ];

        const build = buildHierarchy(rightDependicies1);
        
        const expected = {
            GeoRules: [],
            Rules3: [],
            Rules4: [],
            Rules5: [],
            Rules9: [],
            cmmsTaskInterventionRead: [],
            cmmsTaskInterventionWrite: [],
            cmmsIntervention1Manager: [],
            cmmsIntervention1Read: [],
            cmmsInterventionManager: [],
            cmmsInterventionRead: [],
            cmmsInterventionWrite: [],
            cmmsIntervention2Manager: [],
            cmmsIntervention4Write: [],
            cmmsIntervention3Read: [],
            SecurityRules: [ 'GeoRules', 'Rules3' ],
            Rules6: [
              'Rules5',
              'Rules4',
              'SecurityRules',
              'GeoRules',
              'Rules3',
              'cmmsIntervention1Manager',
              'cmmsIntervention1Read',
              'cmmsInterventionManager',
              'cmmsInterventionRead',
              'cmmsInterventionWrite',
              'cmmsIntervention2Manager',
              'cmmsIntervention3Read'
            ],
            UserRules: [
              'Rules6',
              'Rules5',
              'Rules4',
              'SecurityRules',
              'GeoRules',
              'Rules3',
              'cmmsIntervention1Manager',
              'cmmsIntervention1Read',
              'cmmsInterventionManager',
              'cmmsInterventionRead',
              'cmmsInterventionWrite',
              'cmmsIntervention2Manager',
              'cmmsIntervention3Read',
              'cmmsIntervention4Write'
            ],
            Rules8: [
              'SecurityRules',
              'GeoRules',
              'Rules3',
              'Rules4',
              'Rules5',
              'Rules6',
              'cmmsIntervention1Manager',
              'cmmsIntervention1Read',
              'cmmsInterventionManager',
              'cmmsInterventionRead',
              'cmmsInterventionWrite',
              'cmmsIntervention2Manager',
              'cmmsIntervention3Read',
              'UserRules',
              'cmmsIntervention4Write',
              'Rules9',
              'cmmsTaskInterventionRead',
              'cmmsTaskInterventionWrite'
            ]
          }

        expect (build).to.have.keys(expected);
        
        Object.keys(expected).forEach((key) => {
            expect(build[key]).to.have.members(expected[key])
        }); 
    });

});    

