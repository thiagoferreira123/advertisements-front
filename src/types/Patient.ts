import { checkIfDateIsValid } from "../helpers/DateHelper";
import { isObject } from "../helpers/Utils";

export type Patient = {
  patient_id?: string;
  patient_clinic_id?: string;
  patient_last_interaction: string;
  patient_full_name: string;
  patient_photo?: string;
  patient_birth_date: string;
  patient_cpf: string;
  patient_rg?: string;
  patient_rg_issuer?: string;
  patient_sex: number;
  patient_marital_status: string;
  patient_health_insurance?: string;
  patient_health_insurance_number?: string;
  patient_medical_record_number?: string;
  patient_reference?: string;
  patient_phone?: string;
  patient_email?: string;
  patient_extra_contact_full_name?: string;
  patient_extra_contact_cpf?: string;
  patient_extra_contact_phone?: string;
  patient_extra_contact_relationship: string;
  patient_zip_code?: string;
  patient_number?: string;
  patient_street?: string;
  patient_complement?: string;
  patient_neighborhood?: string;
  patient_observation?: string;
  patient_city?: string;
  patient_state?: string;
  patient_register_date: string;
}

export type ReasonForConsultation = {
  id: number,
  idProfissional: number,
  descricao: string,
  dataCadastro: string
}

export type ConsultationLocationResume = {
  id: number,
  nome: string,
}