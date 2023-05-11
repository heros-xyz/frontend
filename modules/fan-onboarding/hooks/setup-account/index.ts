import { useMemo, useState } from "react";
import { useUpdateEffect } from "react-use";
import { doc, setDoc } from "firebase/firestore";
import { FanProfile, User } from "@/libs/dtl";
import { useAuthContext } from "@/context/AuthContext";
import { db, storage } from "@/libs/firebase";
import { getDownloadURL, ref } from 'firebase/storage';
import { useUploadFile } from 'react-firebase-hooks/storage';

interface IFullName {
  firstName: string;
  lastName: string;
}

export const useFanOnboarding = () => {
  const { user } = useAuthContext()
  const [uploadFile, uploading, snapshot, errorUploadImage] = useUploadFile();
  const [isLoading, setIsLoading] = useState(false);
  const TOTAL_STEP = 6;
  const [step, setStep] = useState(1);
  // const [submit, { data: fanSetupAccountData, error }] =
  //   useSetUpAccountMutation();
  const [fullNameState, setFullName] = useState({
    firstName: "",
    lastName: "",
  });

  const [gender, setGender] = useState("");

  const [avatar, setAvatar] = useState<File>();

  const [dateOfBirth, setDateOfBirth] = useState("");

  const [sportIds, setSportIds] = useState<string>("");

  const handleChangeStep = (step: number) => {
    setStep(step);
  };

  const handleChangeFullName = (values: IFullName) => {
    handleChangeStep(step + 1);
    setFullName(values);
  };

  const handleChangeDateOfBirth = (values: string) => {
    handleChangeStep(step + 1);
    setDateOfBirth(values);
  };

  const handleChangeGender = (values: string) => {
    handleChangeStep(step + 1);
    setGender(values);
  };

  const handleChangeAvatar = (values: File) => {
    handleChangeStep(step + 1);
    setAvatar(values);
  };

  const handleChangeSport = (values: string) => {
    handleChangeStep(TOTAL_STEP);
    setSportIds(values);
  };

  const fanOnboardingParams = useMemo(() => {
    return {
      ...fullNameState,
      avatar,
      gender,
      sportIds,
      dateOfBirth,
    };
  }, [sportIds, avatar, dateOfBirth, gender, fullNameState]);

  useUpdateEffect(() => {

    if (!user) return;


    if (step === TOTAL_STEP) {

      const userData: User = {
        fullname: `${fullNameState.firstName} ${fullNameState.lastName}`,
        firstname: fullNameState.firstName,
        lastname: fullNameState.lastName,
        isFinishOnboarding: true,
        birthday: new Date(dateOfBirth),
        gender: +gender
      }
      const fanProfileData: FanProfile = {
        sport: sportIds.split(',')
      };

      (async () => {
        try {
          setIsLoading(true);
          const refStorage = ref(storage, `profile/${user?.uid}/avatar.${avatar?.type.split('/')[1]}`);
          let downloadURL = '';
          if (avatar) {
            const result = await uploadFile(refStorage, avatar, {
              contentType: avatar.type
            });
            if (!!result?.ref) {
              downloadURL = await getDownloadURL(result?.ref);
            }
          }

          await setDoc(doc(db, `user/${user.uid}`), { ...userData, avatar: downloadURL }, { merge: true })
          await setDoc(doc(db, `fanProfile/${user.uid}`), fanProfileData, { merge: true })
          setStep(currentStep => currentStep + 1)
        } catch (err) {
          throw new Error(err.message);
        } finally {
          setIsLoading(false);
        }


      })()

    }
  }, [step, user, avatar]);

  return {
    dateOfBirth,
    avatar,
    fullNameState,
    gender,
    sportIds,
    step,
    isLoading,
    handleChangeFullName,
    handleChangeGender,
    handleChangeSport,
    handleChangeStep,
    handleChangeDateOfBirth,
    handleChangeAvatar,
  };
};
