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
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phone_input',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton'
}

export function PatientForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  });

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
        const queryParams = new URLSearchParams({
          name: values.name,
          email: values.email,
          phone: values.phone,
        }).toString();

        router.push(`/patients/${newUser.$id}/register?${queryParams}`);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">
            Hi there👋
          </h1>
          <p className="text-gray-500">
            Schedule your first appointment.
          </p>
        </section>

        <CustomFormProvider
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          iconSrc="/assets/icons/user.svg"
          iconAlt="users"
        />

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

        <SubmitButton isLoading={isLoading}>
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
}

export default PatientForm;
