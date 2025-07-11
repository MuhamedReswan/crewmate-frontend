import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { ZodSchema } from 'zod';

export const useFormValidation = <T extends Record<string, unknown>>(
  schema: ZodSchema<T>
): UseFormReturn<T> => {
  return useForm<T>({
    resolver: zodResolver(schema),
  });
};