import { Patient } from "./Patient"

export interface RequestingExam {
  id?: string,
  patientId: number,
  requestDate: Date,
  examsSelected: SelectedExam[],
  patient?: Patient
}

export interface RequestingExamAttachment {
  id?: number,
  fileName: string ,
  dataCreation: Date,
  linkAwsS3: string,
  patientID: number
}

export interface SelectedExam {
  id?: number | string,
  exams_blood_historic_id?: string,
  exams_blood_selected?: string,
  examsBloodSelectedValueObtained: number,
  exam: Exam
}

export interface Exam {
  id?: string,
  examRegisteredByProfessional?: number,
  examName: string,
  examMeasurementUnit: string,
  examCategory: string,
  minRangeMale: number,
  maxRangeMale: number,
  minRangeFemale: number,
  maxRangeFemale: number,
  situationsIndicatingIncreaseOrPositivity: string,
  situationsIndicatingDecreaseOrNegativity: string,
  bloodDescription: string
}

export interface ExamTemplate {
  id: string,
  id_professional: number,
  examsBloodTemplateName: string,
  selectedExams: ExamTemplateSelectedExam[],
}

export interface ExamTemplateSelectedExam {
  id?: number | string,
  exams_blood_historic_id?: string,
  exams_blood_selected?: string,
  exams_blood_selected_value_obtained: number,
  examesBloodInfo: Exam
}

export function isRequestingExam(arg: unknown): arg is RequestingExam {

  if (!arg) return false;

  return typeof arg === 'object' &&
    'patientId' in arg &&
    'requestDate' in arg &&
    'examsSelected' in arg
}