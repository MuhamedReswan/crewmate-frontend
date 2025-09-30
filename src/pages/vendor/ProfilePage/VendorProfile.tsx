import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, MapPin } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getImageUrl } from '@/api/common/common';
import { VendorFetchProfile, VendorUpdateProfile } from '@/api/vendor/vendor';
import MapPicker from '@/components/common/MapPicker/MapPicker';
import MapPreview from '@/components/common/MapPreview/MapPreview';
import ErrorMessage from '@/components/common/Message/Error.message';
import SuccessMessage from '@/components/common/Message/SuccessMessage';
import { useToast } from '@/hooks/use-toast';
import { vendorLogin, vendorLogout } from '@/redux/slice/vendorAuth.slice';
import { RootState } from '@/redux/store/store';
import { Messages } from '@/types/enum.type';
import { LocationData, VendrProfileFormValues } from '@/types/form.type';
import { Vendor } from '@/types/users.type';
import { getApiErrorMessage } from '@/utils/apiErrorHanldler';
import { isDataChanged } from '@/utils/compareObjects';
import { pickDTOFields } from '@/utils/dtoMapper';
import { VendorLoginShape } from '@/utils/dtoShapes';
import { handleLocationSelect } from '@/utils/handleLocationSelection';
import { vendorProfileSchema } from '@/validation/validationSchema';

const VendorProfile = () => {
  const { vendorData } = useSelector((state: RootState) => state.vendor);

  // Default profile image
  const defaultImage = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100";

  const [profileData, setProfileData] = useState<Partial<Vendor> | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [location, setLocation] = useState<LocationData | undefined>(profileData?.location || undefined);
  const [isUpdating, setIsUpdating] = useState(false);


  // State for images
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [licenceImage, setLicenceImage] = useState<string | undefined>(undefined);

  // Create references for file inputs
  const profileInputRef = useRef<HTMLInputElement>(null);
  const licenceImgaeInputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (vendorData?._id) {
          const response = await VendorFetchProfile(vendorData._id);
          const profile = response?.data;
          if (!profile) {
            toast({
              description: (
                <ErrorMessage message={Messages.FETCH_PROFILE_FAILED} />
              ),
            });
            dispatch(vendorLogout());
            return;
          }

          if (profile.isBlocked) {
            toast({ description: <ErrorMessage message={Messages.BLOCKED_BY_ADMIN} /> });
            dispatch(vendorLogout());
            return;
          }


          const fetchImage = async () => {
            if (profile.profileImage) {
              const profileImageResponse = await getImageUrl(profile.profileImage);
              setProfileImage(profileImageResponse.data)
            }

            if (profile.licenceImage) {
              const licenceImageImageResponse = await getImageUrl(profile.licenceImage);
              setLicenceImage(licenceImageImageResponse.data)
            }
          }

          const filteredData = pickDTOFields(VendorLoginShape, profile);
          const keys = Object.keys(filteredData) as (keyof typeof filteredData)[];
          const hasDataChanged = isDataChanged(vendorData, filteredData, keys);

          if (hasDataChanged) {
            dispatch(vendorLogin(filteredData));
          }

          await fetchImage()
          setProfileData(profile);
        }
      } catch (error) {
        dispatch(vendorLogout());
        toast({
          description: <ErrorMessage message={getApiErrorMessage(error, Messages.FETCH_PROFILE_FAILED)} />,
        });
      }
    };

    fetchProfile();
  }, [vendorData?._id, dispatch]);



  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<VendrProfileFormValues>({
    mode: "onChange",
    resolver: zodResolver(vendorProfileSchema),
  });

  useEffect(() => {

    if (!profileData || Object.keys(profileData).length === 0) return;
    reset({
      _id: profileData._id || "",
      name: profileData.name || "",
      mobile: profileData.mobile || "",
      licenceNumber: profileData.licenceNumber || "",
      licenceImage: profileData.licenceImage || undefined,
      profileImage: profileData.profileImage || undefined,
      location: profileData.location || undefined,
      estd: profileData.estd || "",
      email: profileData.email || "",
      instaId: profileData.instaId || "",
    });

    setLocation(profileData.location || undefined);
  }, [profileData, reset]);

  const watchedValues = watch();
  console.log("watchedValues", watchedValues)

  useEffect(() => {
    if (location) {
      setValue("location", location)
    }
  }, [location, setValue])
  console.log("location from profile", location?.address);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImagePreview: React.Dispatch<React.SetStateAction<string | undefined>>,
    fieldName: keyof VendrProfileFormValues
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setValue(fieldName, file);
      setImagePreview(URL.createObjectURL(file));
    }
  };


  const onSubmit = async (data: VendrProfileFormValues) => {
    console.log("vendor profile sumited")
    console.log("Form data:", data);
    setIsUpdating(true);

    const formData = new FormData();
    try {

      Object.keys(data).forEach((key) => {
        const typedKey = key as keyof typeof data;

        if (typedKey === "location" && data[typedKey]) {
          formData.append(typedKey, JSON.stringify(data[typedKey]));
        } else if (typedKey !== "profileImage" && typedKey !== "licenceImage") {
          formData.append(typedKey, data[typedKey] as string);
        }
      });

      // Add image files only if they exist
      if (data.profileImage) {
        formData.append("profileImage", data.profileImage);
      }
      if (data.licenceImage) {
        formData.append("licenceImage", data.licenceImage);
      }



      console.log("form data-----------------------------------------", formData)
      const response = await VendorUpdateProfile(formData);
      console.log("vendor update profile", response)
      if (response?.statusCode === 200) {
        console.log("vendor Profile Updated Successfully", response);
        dispatch(vendorLogin(response.data));

        setEditMode(false);
        toast({
          description: <SuccessMessage message={response.message} className="" />,
        })
      }
    } catch (error) {
      console.log("error from profile", error)
      toast({
        description: <ErrorMessage message={getApiErrorMessage(error, Messages.UPDATE_PROFILE_FAILED)} />,
      })
    }
    finally {
      setIsUpdating(false);
    }

  }



  return (
    <div className="max-h-screen mx-auto w-full h-full bg-surface shadow-sm p-8 pt-10 md:p-8 overflow-auto">
      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} >
        {/* Header with profile image */}
        <div className="flex justify-between sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={profileImage ? profileImage : defaultImage}
                alt="Profile"
                className="w-14 h-14 rounded-full object-cover bg-gray-300"
              />
              {/* Hidden file input */}
              <input
                type="file"
                ref={profileInputRef}
                onChange={(e) => handleImageChange(e, setProfileImage, 'profileImage',)}
                accept="image/*"
                className="hidden"
              />

              <button
                type="button"
                className={`absolute bottom-0 right-0 bg-[#4B49AC] text-white rounded-full p-1 w-5 h-5
                 flex items-center justify-center text-xs ${!editMode && 'hidden'}`}
                onClick={() => profileInputRef.current?.click()}
              >
                <Edit size={12} />
              </button>

            </div>

            <div>
              <h2 className="text-gray-800 font-medium">{profileData?.name
                ? profileData.name
                  .split(" ")
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(" ")
                : ""}</h2>
              <h4>Name</h4>
              <p className="text-sm text-gray-500">Estd:{profileData?.estd}</p>
              <p className="text-sm text-gray-500">Email: {profileData?.email}</p>

              {typeof errors.profileImage?.message === "string" && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.profileImage.message}
                </p>)}
            </div>
          </div>

          <div>
            <button
              type="button"
              className="px-5 py-2 text-sm font-medium text-white bg-[#4B49AC] rounded-lg hover:bg-opacity-90 transition-colors"
              onClick={() => { setEditMode(!editMode) }}
            >
              {editMode ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Company Name</label>
              <input
                type="text"
                placeholder="Enter Comapany Name"
                className={`w-full px-4 py-2.5 bg-white border  ${errors.name
                  ? "border-red-500"
                  : "border-[#4B49AC]/20"
                  } rounded-lg text-sm placeholder-gray-400 focus:ring-1 focus:ring-[#4B49AC]`}
                disabled={!editMode}
                {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>)}

            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Licence Number</label>
              <input
                type="text"
                placeholder="Your Licence Number"
                className={`w-full px-4 py-2.5 bg-white border  ${errors.licenceNumber
                  ? "border-red-500"
                  : "border-[#4B49AC]/20"
                  } rounded-lg text-sm placeholder-gray-400 focus:ring-1 focus:ring-[#4B49AC]`}
                disabled={!editMode}
                {...register("licenceNumber")}
              />
              {errors.licenceNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.licenceNumber.message}
                </p>)}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Instagram Id</label>
              <input
                type="text"
                placeholder="Please enter your Instagram Id"
                className={`w-full px-4 py-2.5 bg-white border  ${errors.instaId
                  ? "border-red-500"
                  : "border-[#4B49AC]/20"
                  } rounded-lg text-sm placeholder-gray-400 focus:ring-1 focus:ring-[#4B49AC]`}
                disabled={!editMode}
                {...register("instaId")}
              />
              {errors.instaId && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.instaId.message}
                </p>)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Licence Image</label>
                <div className="relative">
                  <input
                    ref={licenceImgaeInputRef}
                    type="file"
                    accept="image/*"
                    className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm placeholder-gray-400 focus:ring-1 
                    focus:ring-[#4B49AC] ${licenceImage && 'hidden'} border-[#4B49AC]/20
                    ${errors.licenceImage
                        ? "border-red-500"
                        : "border-[#4B49AC]/20"
                      }`}
                    onChange={(e) => handleImageChange(e, setLicenceImage, 'licenceImage')}
                    disabled={!editMode}
                  />
                  {licenceImage && (
                    <div className="relative inline-block mt-2">
                      <img
                        src={licenceImage}
                        alt="licenceImage"
                        className="w-52 h-52 rounded-lg object-cover border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => licenceImgaeInputRef.current?.click()}
                        className={`absolute top-1 right-1 bg-[#4B49AC] text-white rounded-full w-5 h-5 
                        flex items-center justify-center ${!editMode && 'hidden'}`}
                      >
                        <Edit size={12} />
                      </button>
                    </div>
                  )}
                  {typeof errors.licenceImage?.message === "string" && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.licenceImage.message}
                    </p>)}
                </div>
              </div>

            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Established</label>
              <input
                type="number"
                placeholder="Your age"
                className={`w-full px-4 py-2.5 bg-white border  ${errors.estd
                  ? "border-red-500"
                  : "border-[#4B49AC]/20"
                  } rounded-lg text-sm placeholder-gray-400 focus:ring-1 focus:ring-[#4B49AC]`}
                disabled={!editMode}
                {...register("estd")}
              />
              {errors.estd && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.estd.message}
                </p>)}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Mobile Number</label>
              <input
                type="tel"
                placeholder="Please enter your mobile number"
                className={`w-full px-4 py-2.5 bg-white border  ${errors.mobile
                  ? "border-red-500"
                  : "border-[#4B49AC]/20"
                  } rounded-lg text-sm placeholder-gray-400 focus:ring-1 focus:ring-[#4B49AC]`}
                disabled={!editMode}
                {...register("mobile")}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs">
                  {errors.mobile.message}
                </p>)}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Location</label>
              <div className={` flex gap-2 w-full px-4 py-2.5 bg-white border ${errors.location
                ? "border-red-500"
                : "border-[#4B49AC]/20"
                } rounded-lg text-sm placeholder-gray-400 focus:ring-1 focus:ring-[#4B49AC]`}>
                <MapPin className="left-4 top-3 h-5 w-5 text-[#4B49AC]"
                  onClick={editMode ? () => setMapVisible(true) : undefined}
                />
                <p className={`flex-1 overflow-x-hidden whitespace-nowrap ${location?.address ? "text-gray-400" : ""} text-gray-400`}>
                  {location?.address ? location.address : 'Choose location'}
                </p>
              </div>
              {typeof errors.location?.message === "string" && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>


            {location && !mapVisible && (
              <div className="w-full text-center">
                <label className="block text-sm text-gray-600 mb-3">Your Location</label>
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
  )
}

export default VendorProfile