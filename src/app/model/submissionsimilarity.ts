import { Doc } from "./doc";

export class SubmissionSimilarity{
    key: string;
    submissionid: number;
    docs: Doc[] = []
    total_matches = 0;
    total_score: 0;
}