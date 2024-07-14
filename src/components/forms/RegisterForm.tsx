"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormProvider from "../CustomFormProvider";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { PatientFormValidation } from "@/lib/validation";
import { useRouter, useSearchParams } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import {FormFieldType} from "./PatientForm"
// import { RadioGroup } from "../ui/radio-group";
import  genderOption, { PatientFormDefaultValues }  from "@/constants/index"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Doctors,IdentificationTypes } from "@/constants/index";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import {FileUploader} from "../FileUploader";

// interface RegisterFormProps {
//     user : User
// }

export function RegisterForm({user}:{user : User}) {
  const router = useRouter();
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
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

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);

    try {
      
    } catch (error) {
      
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
            // placeholder="9090909090"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormProvider
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Date Of Birth"
            // placeholder="Enter your Email"
            // iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormProvider
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup className="flex h-11 gap-6 xl:justify-between" 
                onValueChange={field.onChange}
                defaultValue={field.values}
                >
                  {genderOption.map((option) => (
                    <div key={option}
                    className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <label htmlFor={option} className="cursor-pointer">{option}</label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormProvider
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Address"
            placeholder="Enter your Address"
          />

          <CustomFormProvider
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="Enter your occupation"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormProvider
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Emergency Contact Name"
            placeholder="Guarian's name"
            iconSrc="/assets/icons/multi-user (2).svg"
            iconAlt="email"
          />

          <CustomFormProvider
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="Emergency Contact Number"
            // placeholder="9090909090"
          />
        </div>
     
        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">
              Medical Information
            </h2>
          </div>
        </section>
        
          <CustomFormProvider
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Primary Physician"
              placeholder="select a primary physician"
            >
              {Doctors.map((doctor) => (
                <SelectItem 
                key={doctor.name}
                value={doctor.name}
                > 
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image 
                      src={doctor.image}
                      alt="doctor"
                      width={32}
                      height={32}
                      className=" rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
          </CustomFormProvider>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormProvider
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuraceProvider"
              label="Insurance Provider"
              placeholder="Enter your Insurace Provider name"
            />

            <CustomFormProvider
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuracePolicyNumber"
              label="Insurace Policy Number"
              placeholder="Enter your occupation"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormProvider
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanut allergy , Tree nut allergy etc ..."
            />

            <CustomFormProvider
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current Medication (if any)"
              placeholder="Used Medicine (if any) "
            />
          </div>
        
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormProvider
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="Family Medical History"
              placeholder="GrandMother has brest cancer and GrandFather has heart attack like this ..."
            />

            <CustomFormProvider
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past Medical History"
              placeholder="Appendics, Tonsillectomy etc ..."
            />
          </div>

         <section className="space-y-4">
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">
                Identification and Verification
              </h2>
            </div>
          </section>

          <CustomFormProvider
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="identificationType"
              label="Identification Type"
              placeholder="Select an Identification Type"
            >
              {IdentificationTypes.map((IdentificationType) => (
                <SelectItem 
                key={IdentificationType}
                value={IdentificationType}
                className=" cursor-pointer"
                > 
                  {IdentificationType}
                </SelectItem>
              ))}
          </CustomFormProvider>

          <CustomFormProvider
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification Number"
            placeholder="Enter the Identification Number"
          />

          <CustomFormProvider
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Scanned copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />

          <section className="space-y-4">
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">
                Consent and Privacy
              </h2>
            </div>
          </section>

          <CustomFormProvider
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to treatment"
          />

          <CustomFormProvider
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to disclosure of information"
          />

          <CustomFormProvider
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I consent to privacy policy"
          />


        <div className="flex flex-col gap-6 xl:flex-row"></div>
        <SubmitButton isLoading={isLoading}>
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
}

export default RegisterForm;
