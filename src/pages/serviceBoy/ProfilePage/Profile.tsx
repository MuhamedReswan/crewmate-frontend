import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Edit, MapPin, } from "lucide-react";
import React, { useState, useRef } from "react";
import { ServiceBoyUpdateProfile } from "@/api/serviceBoy";
import { profileSchema } from "@/validation/validationSchema";
import { ProfileFormValues } from "@/types/form.type";
import { RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import SuccessMessage from "@/components/common/Message/SuccessMessage";
import { useToast } from "@/hooks/use-toast";
import ErrorMessage from "@/components/common/Message/Error.message";
import { login } from "@/redux/slice/serviceBoyAuth.slice";
import { Button } from "@/components/ui/button";



const Profile = () => {

  const { serviceBoyData } = useSelector((state: RootState) => state.serviceBoy);
  console.log("serviceBoyData------------------", serviceBoyData)

  // Default profile image
  const defaultImage = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100";

  // Create references for file inputs
  const profileInputRef = useRef<HTMLInputElement>(null);
  const frontAadharInputRef = useRef<HTMLInputElement>(null);
  const backAadharInputRef = useRef<HTMLInputElement>(null);

  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  // State for images
  const [profileImage, setProfileImage] = useState<string | undefined>(serviceBoyData?.profileImage || undefined);
  const [frontAadharImage, setFrontAadharImage] = useState<string | undefined>(serviceBoyData?.aadharImageFront || undefined);
  const [backAadharImage, setBackAadharImage] = useState<string | undefined>(serviceBoyData?.aadharImageBack || undefined);

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    mode: "onChange",
    resolver: zodResolver(profileSchema),
    defaultValues: {
      _id: serviceBoyData?._id ? serviceBoyData._id : "",
      name: serviceBoyData?.name ? serviceBoyData.name : "",
      qualification: serviceBoyData?.qualification ? serviceBoyData.qualification : "111111",
      aadharNumber: serviceBoyData?.aadharNumber ? serviceBoyData.aadharNumber : "",
      age: serviceBoyData?.age ? serviceBoyData.age.toString() : "",
      mobile: serviceBoyData?.mobile ? serviceBoyData.mobile : "",
      location: serviceBoyData?.location ? serviceBoyData.location : "",
      email: serviceBoyData?.email ? serviceBoyData.email : "",
      profileImage: serviceBoyData?.profileImage ? serviceBoyData.profileImage : undefined,
      aadharImageBack: serviceBoyData?.aadharImageBack ? serviceBoyData.aadharImageBack : undefined,
      aadharImageFront: serviceBoyData?.aadharImageFront ? serviceBoyData.aadharImageFront : undefined,
    },
  });

  React.useEffect(() => {
    if (serviceBoyData) {
      setValue("_id", serviceBoyData._id || "");
      setValue("name", serviceBoyData.name || "");
      setValue("qualification", serviceBoyData.qualification || "111111");
      setValue("aadharNumber", serviceBoyData.aadharNumber || "");
      setValue("age", serviceBoyData.age ? serviceBoyData.age.toString() : "");
      setValue("mobile", serviceBoyData.mobile || "");
      setValue("location", serviceBoyData.location || "");
      setValue("profileImage", serviceBoyData.profileImage || undefined);
      setValue("aadharImageBack", serviceBoyData.aadharImageBack || undefined);
      setValue("aadharImageFront", serviceBoyData.aadharImageFront || undefined);
    }
  }, [serviceBoyData, setValue]);

  const watchedValues = watch();
  console.log("watchedValues", watchedValues)

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImagePreview: React.Dispatch<React.SetStateAction<string | undefined>>,
    fieldName: keyof ProfileFormValues
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setValue(fieldName, file);
      setImagePreview(URL.createObjectURL(file)); // Simpler preview
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    console.log("submit function invoked")
    console.log("Form data:", data);

    const formData = new FormData();

    // Add all text fields
    Object.keys(data).forEach(key => {
      if (key !== "profileImage" && key !== "aadharImageFront" && key !== "aadharImageBack") {
        formData.append(key, data[key]);
      }
    });

    // Add image files only if they exist
    if (data.profileImage) {
      formData.append("profileImage", data.profileImage);
    }

    if (data.aadharImageFront) {
      formData.append("aadharImageFront", data.aadharImageFront);
    }

    if (data.aadharImageBack) {
      formData.append("aadharImageBack", data.aadharImageBack);
    }

    console.log("Ready to submit FormData:", formData);

    try {
      const response = await ServiceBoyUpdateProfile(formData);
      console.log("response onsubmin update profile", response)
      if (response?.statusCode === 200) {
        console.log("Profile Updated Successfully");
        dispatch(login(response.data));
        setEditMode(false);
        toast({
          description: <SuccessMessage message={response.message} className="" />,
        })
      }
      console.log("respose of profile", response)
    } catch (error) {
      console.log("error from profile", error)
      toast({
        description: <ErrorMessage message={error.message} />,
      })
    }
  };

  return (
    <div className="max-h-screen mx-auto w-full bg-[#4B49AC]/5 shadow-sm p-8 pt-10 md:p-8 overflow-auto">
      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} >
        {/* Header with profile image */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={profileImage ? profileImage : defaultImage}
                alt="Profile"
                className="w-14 h-14 rounded-full object-cover bg-gray-300"
              />
              <button
                type="button"
                className={`absolute bottom-0 right-0 bg-[#4B49AC] text-white rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs ${!editMode && 'hidden'}`}
                onClick={() => profileInputRef.current?.click()}
              >
                <Edit size={12} />
              </button>

              {/* Hidden file input */}
              <input
                type="file"
                ref={profileInputRef}
                onChange={(e) => handleImageChange(e, setProfileImage, 'profileImage',)}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div>
              <h2 className="text-gray-800 font-medium">{serviceBoyData?.name
                ? serviceBoyData.name
                  .split(" ")
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(" ")
                : ""}</h2>
              <p className="text-sm text-gray-500">ID: A-12</p>
              <p className="text-sm text-gray-500">Email: {serviceBoyData?.email}</p>
            </div>
          </div>
          <div>
            <Button type="button" className="px-5  text-sm font-medium text-white bg-[#4B49AC] rounded-lg hover:bg-opacity-90 transition-colors"
              onClick={() => setEditMode(!editMode)}>{editMode ? "Cancel" : "Edit"}</Button>
          </div>
        </div>
        {errors.profileImage && (
          <p className="text-red-500 text-xs">
            {errors.profileImage.message}
          </p>)}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your Full Name"
                className={`w-full px-4 py-2.5 bg-white border  ${errors.name
                  ? "border-red-500"
                  : "border-[#4B49AC]/20"
                  } rounded-lg text-sm placeholder-gray-400 focus:ring-1 focus:ring-[#4B49AC]`}
                {...register("name")}
                disabled={!editMode}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                Qualification
              </label>
              <input
                type="text"
                placeholder="Your Qualification"
                className={`w-full px-4 py-2.5 bg-white border ${errors.qualification
                  ? "border-red-500"
                  : "border-[#4B49AC]/20"
                  } rounded-lg text-sm placeholder-gray-400 focus:ring-1 focus:ring-[#4B49AC]`}
                {...register("qualification")}
                disabled={!editMode}
              />
              {errors.qualification && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.qualification.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                Aadhar Number
              </label>
              <input
                type="text"
                placeholder="Please enter your Aadhar number"
                className={`w-full px-4 py-2.5 bg-white border ${errors.aadharNumber
                  ? "border-red-500"
                  : "border-[#4B49AC]/20"
                  } rounded-lg text-sm placeholder-gray-400 focus:ring-1 focus:ring-[#4B49AC]`}
                {...register("aadharNumber")}
                disabled={!editMode}
              />
              {errors.aadharNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.aadharNumber.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              {/* Front Aadhar Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">
                  Aadhar Image Front
                </label>
                <div className="relative">
                  <input
                    type="file"
                    ref={frontAadharInputRef}
                    accept="image/*"
                    className={`w-full px-4 py-2.5 bg-white border ${frontAadharImage && 'hidden'}  ${errors.aadharImageFront ? "border-red-500" : "border-[#4B49AC]/20"
                      } rounded-lg text-sm placeholder-gray-400 focus:ring-1 focus:ring-[#4B49AC]`}
                    onChange={(e) => handleImageChange(e, setFrontAadharImage, 'aadharImageFront')}
                    disabled={!editMode}
                  />
                </div>
                {frontAadharImage && (
                  <div className="relative inline-block mt-2">
                    <img
                      src={frontAadharImage}
                      alt="Aadhar Front"
                      className="w-32 h-24 rounded-lg object-cover border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (frontAadharInputRef.current) {
                          frontAadharInputRef.current.click();
                        }
                      }}
                      className={`absolute top-1 right-1 bg-[#4B49AC] text-white rounded-full w-5 h-5 flex items-center justify-center ${!editMode && 'hidden'}`}
                    >
                      <Edit size={12} />
                    </button>
                  </div>
                )}
                {/* {errors.aadharImageFront && ( */}
                {errors.aadharImageFront && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.aadharImageFront.message}
                  </p>
                )}
              </div>

              {/* Back Aadhar Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">
                  Aadhar Image Back
                </label>
                <div className="relative">
                  <input
                    type="file"
                    ref={backAadharInputRef}

                    accept="image/*"
                    className={`w-full px-4 py-2.5 bg-white border ${backAadharImage && 'hidden'}  ${errors.aadharImageBack ? "border-red-500" : "border-[#4B49AC]/20"
                      } rounded-lg text-sm placeholder-gray-400 focus:ring-1 focus:ring-[#4B49AC]`}
                    onChange={(e) => handleImageChange(e, setBackAadharImage, 'aadharImageBack')}
                    disabled={!editMode}
                  />
                </div>
                {backAadharImage && (
                  <div className="relative inline-block mt-2 text-center">
                    <img
                      src={backAadharImage}
                      alt="Aadhar Back"
                      className="w-32 h-24 rounded-lg object-cover border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (backAadharInputRef.current) {
                          backAadharInputRef.current.click();
                        }
                      }}
                      className={`absolute top-1 right-1 bg-[#4B49AC] text-white rounded-full w-5 h-5 flex items-center justify-center ${!editMode && 'hidden'}`}
                    >
                      <Edit size={12} />
                    </button>
                  </div>
                )}
                {errors.aadharImageBack && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.aadharImageBack.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Age</label>
              <input
                type="text"
                placeholder="Your age"
                className={`w-full px-4 py-2.5 bg-white border ${errors.age ? "border-red-500" : "border-[#4B49AC]/20"
                  } rounded-lg text-sm placeholder-gray-400 focus:ring-1 focus:ring-[#4B49AC]`}
                {...register("age")}
                disabled={!editMode}
              />
              {errors.age && (
                <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="Please enter your mobile number"
                className={`w-full px-4 py-2.5 bg-white border ${errors.mobile
                  ? "border-red-500"
                  : "border-[#4B49AC]/20"
                  } rounded-lg text-sm placeholder-gray-400 focus:ring-1 focus:ring-[#4B49AC]`}
                {...register("mobile")}
                disabled={!editMode}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Choose your location"
                  className={`w-full pl-12 pr-4 py-2.5 bg-white border ${errors.location ? "border-red-500" : "border-[#4B49AC]/20"
                    } rounded-lg text-sm placeholder-gray-400 focus:ring-1 focus:ring-[#4B49AC]`}
                  {...register("location")}
                  disabled={!editMode}
                />
                {errors.location && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1553825250-b99dd7d40836?auto=format&fit=crop&q=80&w=300&h=200"
                alt="Map"
                className="w-full h-32 rounded-lg object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex  justify-center sm:justify-end pt-0">
          <button
            type="submit"
            className={`px-5 py-2 text-sm font-medium text-white bg-[#4B49AC] rounded-lg hover:bg-opacity-90 transition-colors ${!editMode && 'hidden'}`}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;