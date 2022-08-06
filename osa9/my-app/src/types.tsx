export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}  
export interface CourseDescriptionPart extends CoursePartBase {
    type: string;
    description: string;
}
export interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}
export interface CourseNormalPart extends CourseDescriptionPart {
    type: "normal";
}
export interface CourseSubmissionPart extends CourseDescriptionPart {
    type: "submission";
    exerciseSubmissionLink: string;
}
export interface CourseRequirementsPart extends CourseDescriptionPart {
    type: "special";
    requirements: Array<string>;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart| CourseRequirementsPart;
