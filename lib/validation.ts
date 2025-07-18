import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

// export const PatientFormValidation = z.object({


//   name: z
//     .string()
//     .min(2, "Name must be at least 2 characters")
//     .max(50, "Name must be at most 50 characters"),
//   email: z.string().email("Invalid email address"),
//   phone: z
//     .string()
//     .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
//   birthDate: z.coerce.date(),
//   gender: z.enum(["male", "female", "other"]),
//   address: z
//     .string()
//     .min(5, "Address must be at least 5 characters")
//     .max(500, "Address must be at most 500 characters"),
//   occupation: z
//     .string()
//     .min(2, "Occupation must be at least 2 characters")
//     .max(500, "Occupation must be at most 500 characters"),
//   emergencyContactName: z
//     .string()
//     .min(2, "Contact name must be at least 2 characters")
//     .max(50, "Contact name must be at most 50 characters"),
//   emergencyContactNumber: z
//     .string()
//     .refine(
//       (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
//       "Invalid phone number"
//     ),
//   primaryPhysician: z.string().min(2, "Select at least one doctor"),
//   insuranceProvider: z
//     .string()
//     .min(2, "Insurance name must be at least 2 characters")
//     .max(50, "Insurance name must be at most 50 characters"),
//   insurancePolicyNumber: z
//     .string()
//     .min(2, "Policy number must be at least 2 characters")
//     .max(50, "Policy number must be at most 50 characters"),
//   allergies: z.string().optional(),
//   currentMedication: z.string().optional(),
//   familyMedicalHistory: z.string().optional(),
//   pastMedicalHistory: z.string().optional(),
//   identificationType: z.string().optional(),
//   identificationNumber: z.string().optional(),
//   identificationDocument: z.custom<File[]>().optional(),
//   treatmentConsent: z
//     .boolean()
//     .default(false)
//     .refine((value) => value === true, {
//       message: "You must consent to treatment in order to proceed",
//     }),
//   disclosureConsent: z
//     .boolean()
//     .default(false)
//     .refine((value) => value === true, {
//       message: "You must consent to disclosure in order to proceed",
//     }),
//   privacyConsent: z
//     .boolean()
//     .default(false)
//     .refine((value) => value === true, {
//       message: "You must consent to privacy in order to proceed",
//     }),
// });


export const PatientFormValidation = z.object({
  // ✅ Required full name
  name: z.string().min(2, "Name is required"),


  // ✅ Valid email format
  email: z.string().email("Invalid email address"),

  // ✅ Required phone number (basic check)
  phone: z.string().min(10, "Phone number must be at least 10 digits"),

  // ✅ Required birthdate (must be a date)
  // birthDate: z.date({ required_error: "Birthdate is required" }),
birthDate: z
  .date()
  .or(z.string().transform((val) => new Date(val)))
  .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
    message: "Birthdate is required",
  }),
  // ✅ Gender must be one of 3 values
  // gender: z.enum(["male", "female", "other"], {
  //   required_error: "Gender is required",
  // }),
  gender: z.enum(["male", "female", "other"]).optional(),


  // ✅ Required address
  address: z.string().min(5, "Address is too short"),

  // ✅ Required occupation
  occupation: z.string().min(2, "Occupation is required"),

  // ✅ Emergency contact name
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),

  // ✅ Emergency contact phone
  emergencyContactNumber: z.string().min(10, "Must be at least 10 digits"),

  // ✅ Must choose a physician (required select)
  primaryPhysician: z.string().min(1, "Select a physician"),

  // ✅ Insurance fields (optional but validated if filled)
  insuranceProvider: z.string().min(1, "Insurance provider is required"),
  insurancePolicyNumber: z.string().min(1, "Policy number is required"),

  // ✅ Optional free-text medical info
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),

  // ✅ Required identification type and number
  identificationType: z.string().min(1, "Select identification type"),
  identificationNumber: z.string().min(1, "Enter identification number"),

  // ✅ File input (optional) — used with `File[] | undefined`
  identificationDocument: z
    .custom<File[]>()
    .optional()
    .refine(
      (files) => !files || files.length <= 1,
      "You can upload only one document"
    ),

  // ✅ Consent checkboxes
  treatmentConsent: z.boolean().optional(),
  disclosureConsent: z.boolean().optional(),
  privacyConsent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must agree to the privacy policy",
    }),
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}