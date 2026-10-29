export const HOME_ROUTE = "/";

export const SIGN_IN_ROUTE = "/signin";

export const SIGN_IN_DOCUMENT = "/signin.html";

export const DOCTOR_DASHBOARD_ROUTE = "/doctor/dashboard";

export const DOCTOR_ANALYTICS_ROUTE = "/doctor/analytics";

export const DOCTOR_DOCTORS_ROUTE = "/doctor/doctors";

export const DOCTOR_PATIENTS_ROUTE = "/doctor/patients";

export const DOCTOR_APPOINTMENTS_ROUTE = "/doctor/appointments";

export const DOCTOR_WEBSITE_ROUTE = "/doctor/website";

export const DOCTOR_AI_BUILDER_ROUTE = "/doctor/ai-builder";

export const DOCTOR_TREATMENTS_ROUTE = "/doctor/treatments";

export const DOCTOR_DASHBOARD_DOCUMENT = "/doctor-dashboard.html";

export const PATIENT_DASHBOARD_ROUTE = "/patient/dashboard";

export function isSignInPathname(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return normalized === SIGN_IN_ROUTE || normalized === SIGN_IN_DOCUMENT;
}

export function isDoctorDashboardPathname(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return normalized === DOCTOR_DASHBOARD_ROUTE || normalized === DOCTOR_DASHBOARD_DOCUMENT;
}

export function isDoctorAnalyticsPathname(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return normalized === DOCTOR_ANALYTICS_ROUTE;
}

export function isDoctorDoctorsPathname(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return normalized === DOCTOR_DOCTORS_ROUTE;
}

export function isDoctorPatientsPathname(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return normalized === DOCTOR_PATIENTS_ROUTE;
}

export function isDoctorAppointmentsPathname(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return normalized === DOCTOR_APPOINTMENTS_ROUTE;
}

export function isDoctorWebsitePathname(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return normalized === DOCTOR_WEBSITE_ROUTE;
}

export function isDoctorAiBuilderPathname(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return normalized === DOCTOR_AI_BUILDER_ROUTE;
}

export function isDoctorTreatmentsPathname(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return normalized === DOCTOR_TREATMENTS_ROUTE;
}

export function isPatientDashboardPathname(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return normalized === PATIENT_DASHBOARD_ROUTE;
}
