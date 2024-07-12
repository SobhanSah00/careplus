"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormProvider from "../CustomFormProvider";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormSchema } from "@/lib/validation";
import { useRouter, useSearchParams } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import {FormFieldType} from "./PatientForm"

// interface RegisterFormProps {
//     user : User
// }

export function RegisterForm({user}:{user : User}) {
  const router = useRouter();
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  });

  const searchaParamValues = {
    name: searchParams.get("name") || "",
    email: searchParams.get("email") || "",
    phone: searchParams.get("phone") || ""
  }
  const userShowingName = searchaParamValues.name;
  const [firstName] = userShowingName.split(' ')

  async function onSubmit(values: z.infer<typeof UserFormSchema>) {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);
      console.log("newUser after creation or fetching:", newUser);

      if (newUser && newUser.$id) {
        console.log("Redirecting to:", `/patients/${newUser.$id}/register`);
        router.push(`/patients/${newUser.$id}/register`);
      } else {
        console.error("New user object is missing the $id property or is undefined");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }

    


    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
          <h1 className="header">
            Welcome {firstName}👋
          </h1>
          <p className="text-gray-500">
            Let us know more about your self
          </p>
        </section>

        <section className="space-y-4">
          <div className="mb-9 space-y-1">

          </div>
          <h2 className="sub-header">
            Personal Information
          </h2>
        </section>

        <CustomFormProvider
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="FullName"
          placeholder="Enter your full name"
          iconSrc="/assets/icons/user.svg"
          iconAlt="users"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormProvider
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your Email"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormProvider
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="Enter your Number"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormProvider
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Date Of Birth"
            placeholder="Enter your Email"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormProvider
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            placeholder="Enter your Number"
            renderSkeleton={}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">

        </div>
        <div className="flex flex-col gap-6 xl:flex-row">

        </div>

        <SubmitButton isLoading={isLoading}>
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
}

export default RegisterForm;
