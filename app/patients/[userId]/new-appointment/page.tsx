import Image from "next/image";

import { AppointmentForm } from "@/components/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
interface PageProps {
  params: {
    userId: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

const Appointment = async ({ params, searchParams }: PageProps) => {
 const { userId } = params;
  const appointmentId = searchParams?.appointmentId as string | undefined;
  const patient= await getPatient(userId)
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;

