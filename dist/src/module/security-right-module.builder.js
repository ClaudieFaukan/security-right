"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleMatrix = void 0;
const security_right_1 = require("../right/security-right");
const security_right_module_error_1 = require("./security-right-module.error");
class ModuleMatrix {
    constructor(name) {
        this.name = name;
        this.rights = [];
        this.dependencies = {};
        this.featureRights = [];
    }
    ;
    add(rightorFeatureRight) {
        const rightsOrFeatureRights = rightorFeatureRight instanceof Array ? rightorFeatureRight : [rightorFeatureRight];
        if (rightsOrFeatureRights.length === 0) {
            new security_right_module_error_1.EmptyRightDependenciesError();
        }
        let rights = [];
        if (rightsOrFeatureRights[0] instanceof security_right_1.Right) {
            rights = rightsOrFeatureRights;
        }
        else {
            const featureRights = rightsOrFeatureRights;
            featureRights.forEach((featureRight) => {
                rights.push(...featureRight.rights);
            });
            this.featureRights.push(...featureRights);
        }
        rights.forEach(right => {
            const alreadyRight = this.rights.find((_right) => _right.name === right.name);
            if (alreadyRight) {
                return;
            }
            this.rights.push(right);
        });
        return this;
    }
    addDependencies(right, dependencies) {
        if (this.dependencies[right.name]) {
            throw new security_right_module_error_1.NameDependenciesError(right.name);
        }
        const rights = [];
        dependencies.forEach((depElement) => {
            const depE = depElement instanceof Array ? depElement.slice() :
                depElement instanceof security_right_1.FeatureRight ? depElement.rights : [depElement];
            depE.forEach((_right) => {
                if (_right.name === right.name) {
                    throw new security_right_module_error_1.ReferenceCircularRightError(right.name);
                }
                if (rights.find(element => element.name === _right.name)) {
                    throw new security_right_module_error_1.AlreadyRightDependenciesError(_right.name);
                }
            });
            rights.push(...depE);
        });
        this.add(rights);
        this.dependencies[right.name] = rights.map((_right) => _right.name);
        return this;
    }
    build() {
        return {
            name: this.name,
            rights: this.rights,
            featureRights: this.featureRights,
            dependencies: this.dependencies,
        };
    }
}
exports.ModuleMatrix = ModuleMatrix;
