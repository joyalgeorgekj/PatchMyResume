import { ResumeDataTypeZod } from '@/data/constants/types';
import JsonEditor from '../JsonEditor';
import { Dispatch, SetStateAction } from 'react';

export default function StepFinalPreview({
    final,
    setFinal,
}: {
    final: ResumeDataTypeZod;
    setFinal: Dispatch<SetStateAction<ResumeDataTypeZod>>;
}) {
    return <JsonEditor resumeUserData={final} setResumeUserData={setFinal} />;
}
