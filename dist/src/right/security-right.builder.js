"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureRightMatrix = void 0;
const security_right_1 = require("./security-right");
const security_right_error_1 = require("./security-right.error");
class FeatureRightMatrix {
    constructor(name, access, nullable = false, isRole = false) {
        this.name = name;
        this.access = access;
        this.nullable = nullable;
        this.isRole = isRole;
    }
    build() {
        const right = [];
        const featureRight = new security_right_1.FeatureRight(this.name, this.access, right, this.nullable);
        if (this.access.length == 1 && this.nullable == true) {
            throw new security_right_error_1.NullableRightError;
        }
        if ((this.access.indexOf("M")) !== -1) {
            const manager = new security_right_1.Right(this.name + "Manager", this.isRole);
            right.push(manager);
            featureRight.MANAGER = manager;
        }
        if ((this.access.indexOf("R")) !== -1) {
            const read = new security_right_1.Right(this.name + "Read", this.isRole);
            right.push(read);
            featureRight.READ = read;
        }
        if ((this.access.indexOf("W")) !== -1) {
            const write = new security_right_1.Right(this.name + "Write", this.isRole);
            right.push(write);
            featureRight.WRITE = write;
            featureRight.USE = write;
        }
        return featureRight;
    }
}
exports.FeatureRightMatrix = FeatureRightMatrix;
