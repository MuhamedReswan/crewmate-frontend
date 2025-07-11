import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../Message/Error.message';
import SuccessMessage from '../Message/SuccessMessage';
import { serviceBoyResetPassword } from '@/api/serviceBoy';
import { vendorResetPassword } from '@/api/vendor';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Role } from '@/types/enum.type';
import { passwordSchema } from '@/validation/validationSchema';


const PasswordReset = ({ role }: { role: Role }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token, email } = useParams<{ token: string, email: string }>();
  const { toast } = useToast();
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      console.log("within the onSubmit function", data);
      if (!token || !email) {
        console.error("Token or email is missing");
        return;
      }

      let response;

      if (role === Role.SERVICE_BOY) {
        response = await serviceBoyResetPassword({ email, token, password: data?.password });
        navigate('/service-boy/login')
      } else if (role === Role.VENDOR) {
        response = await vendorResetPassword({ email, token, password: data?.password });
        navigate('/vendor/login')
      }
      if (response && response.statusCode == 200) {
        toast({
          description: <SuccessMessage message={response.message} className="" />
        })
      } else {
        toast({
          description: <ErrorMessage message={response?.message} />
        })
      }

    } catch (error) {
      console.log(error)
      toast({
        description: <ErrorMessage message={error.response.data.message} className="" />
      })
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 w-2/3 min-w-96 max-w-lg">
      <h2 className="text-xl font-medium text-center mb-6 ">Create New Password</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 relative">
          <label className="block text-sm text-gray-600 mb-1">New password</label>
          <Input
            type={showPassword ? 'password' : 'text'}
            {...register('password')}
            className={`w-full p-2 bg-gray-100 rounded-md`}
            placeholder="Your new password"
          />
          <span className='absolute top-8 right-2' onClick={() => setShowPassword(!showPassword)}> {showPassword ? <EyeOff size={16} className='text-gray-500' /> :
            <Eye size={16} className='text-gray-500' />}</span>

          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}

        </div>

        <div className="mb-6 relative">
          <label className="block text-sm text-gray-600 mb-1">Confirm new password</label>
          <Input
            type={showConfirmPassword ? 'password' : 'text'}
            {...register('confirmPassword')}
            className={`w-full p-2 bg-gray-100 rounded-md `}
            placeholder="Confirm your new password"
          />
          <span className='absolute top-8 right-2' onClick={() => setShowConfirmPassword(!showConfirmPassword)}> {showConfirmPassword ? <EyeOff size={16} className='text-gray-500' /> :
            <Eye size={16} className='text-gray-500' />}</span>

          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex justify-center space-x-9">
          <Link to={role === Role.VENDOR ? "/vendor/login": "/service-boy/login"}
            type="button"
            className="px-6 py-2 bg-[#4B49AC] opacity-20  text-white rounded hover:bg-[#3f3d91] opacity-40 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#4B49AC] text-white rounded hover:bg-[#3f3d91] transition-colors disabled:opacity-70"
          >
            {isSubmitting ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;