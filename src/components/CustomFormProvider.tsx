"use client"
import React from "react"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, Field } from "react-hook-form"
import { FormFieldType } from "./forms/PatientForm"
import Image from 'next/image'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { E164Number } from 'libphonenumber-js' // Import the correct type for phone numbers
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SelectValue, Select } from "./ui/select"



interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || 'iconAlt'}
              height={24}
              width={24}
              className='ml-2'
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    
    case FormFieldType.PHONE_INPUT:
      return (
          <FormControl>
            <PhoneInput 
              defaultCountry="IN"
              placeholder={placeholder}
              international
              withCountryCallingCode
              value={field.value as E164Number | undefined}
              onChange={field.onChange}
              className=" input-phone"
            />
          </FormControl>
      );
    
    case FormFieldType.DATE_PICKER :
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image src="/assets/icons/calendar.svg"
           alt="calendar"
           height={24}
           width={24}
           className='ml-2'
          />

          <FormControl>
            <DatePicker 
              selected={field.value}
              onChange={(date) => field.onChange(date)} 
              dateFormat={dateFormat ?? 'MM/dd/yyyy'}
              showTimeSelect={showTimeSelect ?? false}
              wrapperClassName="date-picker"
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.SKELETON :
      return (
        renderSkeleton ? renderSkeleton(field) : null
      );

    case FormFieldType.SELECT : 
      return (
        <FormControl> 
          <Select
            onValueChange={field.change}
            defaultValue={field.value}
          >
            <FormControl 
              className="shad-select-trigger"
            >
              <SelectValue placeholder={placeholder} />
            </FormControl>
          </Select>   
        </FormControl>
      );
    default:
      break; // Handle other form field types if necessary
  }
}

const CustomFormProvider: React.FC<CustomProps> = (props) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label">{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  )
}

export default CustomFormProvider
