import { useMemo, useState } from "react";
import { useUpdateEffect } from "react-use";
import { doc, setDoc } from "firebase/firestore";
import { useSetUpAccountMutation } from "@/api/fan";
import { updateSession } from "@/utils/auth";
import { FanProfile, User } from "@/libs/dtl";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/libs/firebase";

interface IFullName {
  firstName: string;
  lastName: string;
}

export const useFanOnboarding = () => {
  const {user} = useAuthContext()
  const TOTAL_STEP = 6;
  const [step, setStep] = useState(1);
  const [submit, { data: fanSetupAccountData, error, isLoading }] =
    useSetUpAccountMutation();
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
    if(!user) return;
    if (step === TOTAL_STEP) {
      const userData:User = {
        fullname: `${fullNameState.firstName} ${fullNameState.lastName}`,
        firstname: fullNameState.firstName,
        lastname: fullNameState.lastName,
        birthday: new Date(dateOfBirth),
        gender: gender
      }
      const fanProfileData: FanProfile = {
        sport: sportIds
      };
      debugger
      (async () => {
        await setDoc(doc(db,`user/${user.uid}`), userData, {merge: true})
        await setDoc(doc(db,`fanProfile/${user.uid}`), fanProfileData, {merge: true})
      })()
/*       submit({
              ...fanOnboardingParams,
              gender: +fanOnboardingParams.gender,
              dateOfBirth: dateOfBirthFormater.toISOString(),
            }); */
    }
  }, [step,user,avatar]);

  const updateUser = async () => {
    await updateSession();
    setStep(step + 1);
  }

  useUpdateEffect(() => {
    if (fanSetupAccountData) {
      updateUser()
    }
  }, [fanSetupAccountData]);

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
