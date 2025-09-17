// hooks/useVerificationSync.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { VerificationStatus } from "@/types/enum.type";

interface BaseUser {
  _id?: string;
  isVerified?: VerificationStatus;
}

interface UseVerificationSyncProps<T extends BaseUser> {
  user: T | null; // serviceBoy or vendor data
  fetchById: (id: string) => Promise<T | undefined>;
  updateAction: (data: T) => any; // redux action
  intervalMs?: number;
}

export function useVerificationSync<T extends BaseUser>({
  user,
  fetchById,
  updateAction,
  intervalMs = 15000,
}: UseVerificationSyncProps<T>) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?._id) return;

    // Stop syncing if already verified
    if (user.isVerified === VerificationStatus.Verified) return

    let isMounted = true;

    async function fetchUser() {
      try {
        if (!user?._id) return;
        const latest = await fetchById(user._id);
        if(!latest || !latest)
        console.log("latest",latest)
        console.log("user",user)
        console.log("is this same",(latest && isMounted && JSON.stringify(latest) !== JSON.stringify(user)))
        if (latest && isMounted && JSON.stringify(latest) !== JSON.stringify(user)) {
          dispatch(updateAction(latest));
        }
      } catch (err) {
        console.error("Failed to sync verification", err);
      }
    }

    fetchUser(); // initial fetch
    const interval = setInterval(fetchUser, intervalMs);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [user?._id, user?.isVerified, dispatch, fetchById, updateAction, intervalMs]);

  return user;
}
