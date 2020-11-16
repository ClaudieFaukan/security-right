import { FeatureRight, Right, RightDependencies } from '../right/security-right';


export interface RightModule {
    name: string;
    rights: Right[];
    featureRights: FeatureRight[];
    dependencies: RightDependencies;
}