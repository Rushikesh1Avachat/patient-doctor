import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { createUser, getPatient, getUser } from "@/lib/actions/patient.action";
import { email } from "zod";

// const Register = async ({ params }: { params: { userId: string } }) => {

const Register = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  if (!userId) {
    console.error("Missing userId in params");
    redirect("/404");
  }

  const user = await getUser(userId);

  if (!user || !user.$id) {
    console.error("User not found for userId:", userId);
    redirect("/404");
  }

  const patient = await getPatient(user.$id); // 👈 Fixed here

  if (patient) redirect(`/patients/${user.$id}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user={user} />

          <p className="copyright py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};
export default Register
//   // const user = await getUser(params.userId); 
//   // const patient = await getPatient(user);
//   const { userId } = params; // ✅ should be valid
//   const user = await getUser(userId); // ⚠️ Check this ID is valid in Appwrite
//   const patient = await getPatient(user);
//   //@ts-ignore
//   if (patient) redirect(`/patients/${user}/new-appointment`);

  
// //   const newUser = await createUser({name,phone,email }:Searc);
// // const userId = newUser.$id;
// //  if (patient) redirect(`/patients/${user}/new-appointment`);
//   return (
//     <div className="flex h-screen max-h-screen">
//       <section className="remove-scrollbar container">
//         <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
//           <Image
//             src="/assets/icons/logo-full.svg"
//             height={1000}
//             width={1000}
//             alt="patient"
//             className="mb-12 h-10 w-fit"
//           />

//           <RegisterForm user={user} />

//           <p className="copyright py-12">© 2024 CarePluse</p>
//         </div>
//       </section>

//       <Image
//         src="/assets/images/register-img.png"
//         height={1000}
//         width={1000}
//         alt="patient"
//         className="side-img max-w-[390px]"
//       />
//     </div>
//   );
// };

// export default Register;