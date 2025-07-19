import Image from "next/image";
import Link from "next/link";

import PatientForm from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";
interface UserPageParams {
  userId: string;
  admin:string,
  appointmentId: string | undefined
}

// Define the overall props type for the Page component
// It expects a 'params' property with the structure of UserPageParams
interface PageProps {
  searchParams: UserPageParams;
}
const Home = ({ searchParams }: PageProps) => {
  const isAdmin = searchParams?.admin === "true";
const { userId } = searchParams;
  const appointmentId = searchParams?.appointmentId as string | undefined;
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePluse
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Home;