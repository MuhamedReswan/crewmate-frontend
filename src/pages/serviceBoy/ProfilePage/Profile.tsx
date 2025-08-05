import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, MapPin, } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "@/api/common/common";
import { ServiceBoyFetchProfile, ServiceBoyUpdateProfile } from "@/api/serviceBoy/serviceBoy";
import MapPicker from "@/components/common/MapPicker/MapPicker";
import MapPreview from "@/components/common/MapPreview/MapPreview";
import ErrorMessage from "@/components/common/Message/Error.message";
import SuccessMessage from "@/components/common/Message/SuccessMessage";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { login, logout } from "@/redux/slice/serviceBoyAuth.slice";
import { RootState } from "@/redux/store/store";
import { Messages } from "@/types/enum.type";
import { LocationData, ProfileFormValues } from "@/types/form.type";
import { ServiceBoy } from "@/types/users.type";
import { getApiErrorMessage } from "@/utils/apiErrorHanldler";
import { isDataChanged } from "@/utils/compareObjects";
import { pickDTOFields } from "@/utils/dtoMapper";
import { serviceBoyLoginShape } from "@/utils/dtoShapes";
import { handleLocationSelect } from "@/utils/handleLocationSelection";
import { profileSchema } from "@/validation/validationSchema";




const Profile = () => {

  const [profileData, setProfileData] = useState<Partial<ServiceBoy> | null>(null)
  const { serviceBoyData } = useSelector((state: RootState) => state.serviceBoy);

  // Create references for file inputs
  const profileInputRef = useRef<HTMLInputElement>(null);
  const frontAadharInputRef = useRef<HTMLInputElement>(null);
  const backAadharInputRef = useRef<HTMLInputElement>(null);

  const [editMode, setEditMode] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [location, setLocation] = useState<LocationData | undefined>(undefined);
  const [isUpdating, setIsUpdating] = useState(false);

  // State for images
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [frontAadharImage, setFrontAadharImage] = useState<string | undefined>(undefined);
  const [backAadharImage, setBackAadharImage] = useState<string | undefined>(undefined);

  const dispatch = useDispatch();

  const { toast } = useToast();


  // Default profile image
  const defaultImage = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100";


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (serviceBoyData?._id) {
          const response = await ServiceBoyFetchProfile(serviceBoyData._id);
          const profile = response?.data;

          if (!profile) {
            toast({
              description: (
                <ErrorMessage message={Messages.FETCH_PROFILE_FAILED} />
              ),
            });
            dispatch(logout());
            return;
          }

          if (profile.isBlocked) {
            toast({ description: <ErrorMessage message={Messages.BLOCKED_BY_ADMIN} /> });
            dispatch(logout());
            return;
          }


          const filteredData = pickDTOFields(serviceBoyLoginShape, profile);
          const keys = Object.keys(filteredData) as (keyof typeof filteredData)[];

          const hasDataChanged = isDataChanged(serviceBoyData, filteredData, keys);
          if (hasDataChanged) {
            dispatch(login(filteredData));
          }

          const fetchImage = async () => {
            if (profile.profileImage) {
              const profileImageResponse = await getImageUrl(profile.profileImage);
              setProfileImage(profileImageResponse.data)
            }

            if (profile.aadharImageFront) {
              const frontAadharImageResponse = await getImageUrl(profile.aadharImageFront);
              setFrontAadharImage(frontAadharImageResponse.data)
            }

            if (profile.aadharImageBack) {
              const backAadharImageResponse = await getImageUrl(profile.aadharImageBack);
              setBackAadharImage(backAadharImageResponse.data)
            }
          }
          await fetchImage()
          setProfileData(profile)

        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        dispatch(logout());
        toast({
          description: <ErrorMessage message={getApiErrorMessage(error, "Failed to fetch profile")} />,
        })
      }
    };

    fetchProfile();
  }, [serviceBoyData, toast, dispatch]);  // }, [serviceBoyData?._id, dispatch]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    mode: "onChange",
    resolver: zodResolver(profileSchema),
  });


  useEffect(() => {
    if (profileData) {
      reset({
        _id: profileData._id || "",
        name: profileData.name || "",
        qualification: profileData.qualification || "Plus Two",
        aadharNumber: profileData.aadharNumber || "",
        age: profileData.age ? profileData.age.toString() : "",
        mobile: profileData.mobile || "",
        location: profileData.location || undefined,
        email: profileData.email || "",
        profileImage: profileData.profileImage || undefined,
        aadharImageBack: profileData.aadharImageBack || undefined,
        aadharImageFront: profileData.aadharImageFront || undefined,
      });

      setLocation(profileData.location || undefined);
    }
  }, [profileData, reset]);


  useEffect(() => {
    if (location) {
      setValue("location", location)
    }
  }, [location, setValue])

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
      setImagePreview(URL.createObjectURL(file));
    }
  };


  const onSubmit = async (data: ProfileFormValues) => {
    setIsUpdating(true);

    const formData = new FormData();
    try {
      Object.keys(data).forEach((key) => {
        const typedKey = key as keyof ProfileFormValues;

        if (typedKey === "location" && data[typedKey]) {
          formData.append(typedKey, JSON.stringify(data[typedKey]));
        } else if (
          typedKey !== "profileImage" &&
          typedKey !== "aadharImageFront" &&
          typedKey !== "aadharImageBack"
        ) {
          formData.append(typedKey, data[typedKey] as string);
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

      for (const [key, value] of formData.entries()) {
        console.log(`form data - ${key}: ${value}`);
      }


      const response = await ServiceBoyUpdateProfile(formData);
      if (response?.statusCode === 200) {
        dispatch(login(response.data));
        setEditMode(false);
        toast({
          description: <SuccessMessage message={response.message} className="" />,
        })
      }
    } catch (error) {
      toast({
        description: <ErrorMessage message={getApiErrorMessage(error, Messages.FAILED_TO_UPDATE_PROFILE)} />,
      })
    }
    finally {
      setIsUpdating(false);
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
              <h2 className="text-gray-800 font-medium">{profileData?.name
                ? profileData.name
                  .split(" ")
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(" ")
                : ""}</h2>
              <p className="text-sm text-gray-500">ID: A-12</p>
              <p className="text-sm text-gray-500">Email: {profileData?.email}</p>
            </div>
          </div>
          <div>

            <Button type="button" className="px-5  text-sm font-medium text-white bg-[#4B49AC] rounded-lg hover:bg-opacity-90 transition-colors"
              onClick={() => setEditMode(!editMode)}>{editMode ? "Cancel" : "Edit"}</Button>
          </div>
        </div>
        {typeof errors.profileImage?.message === "string" && (
          <p className="text-red-500 text-xs">
            {errors?.profileImage?.message}
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
              <select
                className={`appearance-none w-full px-4 py-2.5 bg-white border ${errors.qualification ? "border-red-500" : "border-[#4B49AC]/20"
                  } rounded-lg text-sm placeholder-gray-400 focus:ring-1 focus:ring-[#4B49AC] disabled:text-black disabled:bg-white`}
                {...register("qualification")}
                disabled={!editMode}
              >
                <option value="Plus Two">Plus Two</option>
                <option value="Sslc">SSLC</option>
                <option value="Degree">Degree</option>
                <option value="Post Graduation">Post Graduation</option>
                <option value="Diploma">Diploma</option>
                <option value="Others">Others</option>
              </select>
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
                      className="w-52 h-52 rounded-lg object-cover border border-gray-200"
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

                {typeof errors.profileImage?.message === "string" && (
                  <p className="text-red-500 text-xs">
                    {errors.profileImage.message}
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
                      className="w-52 h-52 rounded-lg object-cover border border-gray-200"
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
                {typeof errors.aadharImageBack?.message === "string" && (
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
              <div className={` flex gap-2 w-full px-4 py-2.5 bg-white border ${errors.location
                ? "border-red-500"
                : "border-[#4B49AC]/20"
                } rounded-lg text-sm placeholder-gray-400 focus:ring-1 focus:ring-[#4B49AC]`}>


                <MapPin className="left-4 top-3 h-5 w-5 text-[#4B49AC]"
                  onClick={editMode ? () => setMapVisible(true) : undefined} />
                <p className="flex-1 overflow-x-hidden whitespace-nowrap"> {location?.address ? location?.address : 'Choose location'}   </p>

              </div>
              {typeof errors.location?.message === "string" && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.location.message}
                </p>
              )}

            </div>

            {location && !mapVisible && (<div className="w-full text-center">
              <label className="block text-sm text-gray-600 mb-3">
                Your Location
              </label>
              <MapPreview location={location} />
            </div>)}

            {mapVisible && <MapPicker onClose={() => setMapVisible(false)} onSelectLocation={(location) => handleLocationSelect(location, setLocation, setMapVisible)}
            />}

          </div>
        </div>

        <div className="flex justify-center sm:justify-end pt-0">
          <button
            type="submit"
            disabled={!editMode || isUpdating}
            className={`px-5 py-2 text-sm font-medium text-white bg-[#4B49AC] rounded-lg transition-colors
      ${!editMode && "hidden"} 
      ${isUpdating ? "opacity-70 cursor-not-allowed" : "hover:bg-opacity-90"}`}
          >
            {isUpdating ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"
                  ></path>
                </svg>
                Saving...
              </div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>


      </form>
    </div>
  );
};

export default Profile;