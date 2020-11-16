import { RightDependencies } from './security-right';
import { BuildHierarchyMaxLoopError } from './security-right.error';


export function buildHierarchy(hierarchies: RightDependencies[]): RightDependencies {

    const compiledHierarchy: RightDependencies = {};

    let right: string;
    const rights: string[] = [];

    function addRight(_right: string) {

        const index = rights.indexOf(_right);

        if(index !== -1) {
            return;
        }

        rights.push(_right);
    }

    hierarchies.forEach((hierarchy: RightDependencies) => {

        for (right in hierarchy) {

            addRight(right);

            if(compiledHierarchy.hasOwnProperty(right)) {
                compiledHierarchy[right] = compiledHierarchy[right].concat(hierarchy[right])
            } else {
                compiledHierarchy[right] = hierarchy[right];
            }

            hierarchy[right].forEach(addRight);
        }
    });

    const leftRights: string[] = rights.slice();
    let cloneLeftRights: string[] = rights.slice();
    const resolvedHierarchy: RightDependencies = {};

    const maxLoop = rights.length * 2;
    let currentLoop = 0;
    let canProcess: boolean;
    let subRights: string[];
    let index: number;

    while(leftRights.length > 0) {

        currentLoop++;

        cloneLeftRights = leftRights.slice();

        cloneLeftRights.forEach((_right: string) => {

            if(!compiledHierarchy[_right] || compiledHierarchy[_right].length === 0) {
                canProcess = true;
                subRights = [];
            } else {
                canProcess = compiledHierarchy[_right].every((subRight: string) => {
                    return resolvedHierarchy.hasOwnProperty(subRight);
                });

                if (canProcess) {

                    subRights = [];

                    compiledHierarchy[_right].forEach((subRight: string) => {

                        if(subRights.indexOf(subRight) === -1) {
                            subRights.push(subRight);
                        }

                        resolvedHierarchy[subRight].forEach((_subRight) => {

                            if(subRights.indexOf(_subRight) === -1) {
                                subRights.push(_subRight);
                            }
                        });
                    });
                }
            }

            if (canProcess) {
                resolvedHierarchy[_right] = subRights;

                index = leftRights.indexOf(_right);

                if(index !== -1) {
                    leftRights.splice(index, 1);
                }
            }
        });

        if (maxLoop <= currentLoop) {
            throw new BuildHierarchyMaxLoopError(maxLoop);
        }
    }

    return resolvedHierarchy;
}
