import * as React from "react"
import {
  useFormContext,
  useFormState,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

// --- FormField Context ---

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

export const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

// --- FormItem Context ---

type FormItemContextValue = {
  id: string
}

export const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

// --- useFormField Hook ---

export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext() // Requires FormProvider ancestor
  const formState = useFormState({ name: fieldContext.name }) // Requires FormProvider ancestor
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }
  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>")
  }


  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}