"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureRight = exports.Right = void 0;
const security_right_error_1 = require("./security-right.error");
class Right {
    constructor(name, isRole = false) {
        this.name = name;
        this.isRole = isRole;
    }
}
exports.Right = Right;
class FeatureRight {
    constructor(name, access, rights, nullable) {
        this.name = name;
        this.access = access;
        this.rights = rights;
        this.nullable = nullable;
    }
    get(access) {
        if (!access) {
            return this.rights.slice();
        }
        const arrayReturn = [];
        const self = this;
        if ((this.access.indexOf("M")) !== -1) {
            if (!self.MANAGER) {
                throw new security_right_error_1.RightAcessError(this.name, this.access);
            }
            arrayReturn.push(self.MANAGER);
        }
        if ((this.access.indexOf("R")) !== -1) {
            if (!self.READ) {
                throw new security_right_error_1.RightAcessError(this.name, this.access);
            }
            arrayReturn.push(self.READ);
        }
        if ((this.access.indexOf("W")) !== -1) {
            if (!self.WRITE) {
                throw new security_right_error_1.RightAcessError(this.name, this.access);
            }
            arrayReturn.push(self.WRITE, self.USE);
        }
        return arrayReturn;
    }
}
exports.FeatureRight = FeatureRight;
