import { ResumeDataType } from '@/data/constants/types';
import JsonEditor from '../JsonEditor';
import { Dispatch, SetStateAction } from 'react';

export default function StepFinalPreview({
    final,
    setFinal,
}: {
    final: ResumeDataType;
    setFinal: Dispatch<SetStateAction<ResumeDataType>>;
}) {
    return <JsonEditor resumeUserData={final} setResumeUserData={setFinal} />;
}
