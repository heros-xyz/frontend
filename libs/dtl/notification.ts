import {
  query,
  collection,
  where,
  onSnapshot,
  getDocs,
  FieldPath,
  documentId,
  writeBatch,
  doc
} from "firebase/firestore";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { NotificationEventType } from "@/utils/enums";
import { ISource } from "@/types/notifications/types";
import { db } from "../firebase";
import { collectionPath } from "./constant";
import { AthleteProfile, converter as athleteConverter } from "./athleteProfile";

export enum NotificationStatusType {
  ALL = "ALL",
  READ = "READ",
  NOT_READ = "NOT_READ",
}

export interface Notification {
  id: string
  createdAt: Date
  deletedAt: Date
  eventType: NotificationEventType
  readAt: Date
  type: "comment" | "like" | "suscription" | "post" 
  message: string
  params: { }
  sourceId: string
  source: ISource
  uid: string
}

const converter = {
  toFirestore: (data: any) => data,
  fromFirestore: (snap: any) => {
    const data = snap.data()
    data.id = snap.id;
    data.createdAt = data.createdAt.toDate()
    return data as Notification;
  }
}

export function useNotifications() {
  const {user} = useAuthContext()
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Notification[]>([]);
  const dataRef = useMemo(() =>
      user?.uid ?
      query(collection(db, collectionPath.NOTIFICATIONS), where("uid", "==", user.uid)).withConverter(converter)
        : undefined
    , [user?.uid])

  useEffect(() => {
    if (!dataRef) return
    getDocs(dataRef)
      .then((snapshot) => {
        setData(snapshot.docs.map((doc) => doc.data()))
      })
      .finally(() => setLoading(false))
    return onSnapshot(dataRef, (snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()))
    });
  }, [dataRef]);

  useEffect(() => {
    if (!data.length) return
    const ref = collection(db, collectionPath.FAN_PROFILE)
    const usersRef = query(ref, where(documentId(), "in", data?.map?.(d => d?.sourceId) ?? [])).withConverter(athleteConverter)

    getDocs(usersRef)
      .then((snapshot) => {
        const profiles = snapshot.docs.map((doc) => doc.data())
        setData(current => current.map(notification => {
          const sourceProfile = profiles.find(p => p.id === notification.sourceId) as unknown as AthleteProfile
          console.log('sourceProfile', sourceProfile)
          return {
            ...notification, source: {
              avatar: sourceProfile?.avatar,
              fullName: sourceProfile?.fullName,
              nickName: sourceProfile?.nickName,
              id: sourceProfile?.id
            }
          }
        }))
      })
      .finally(() => setLoading(false))
    return onSnapshot(usersRef, (snapshot) => {
      const profiles = snapshot.docs.map((doc) => doc.data())
      setData(current => current.map(notification => {
        const sourceProfile = profiles.find(p => p.id === notification?.sourceId) as unknown as AthleteProfile
        return {
          ...notification,
          source: {
            avatar: sourceProfile?.avatar,
            fullName: sourceProfile?.fullName,
            nickName: sourceProfile?.nickName,
            id: sourceProfile?.id
          }
        }
      }))
    });

  }, [data?.length]);


  const update = useCallback(async (data: any) => {
    if (!dataRef) return
    console.log('useSuscriptionAsTaker.update', data)
  }, [dataRef])

  const markAllAsRead = useCallback(async () => {
    try {
      const notificationIds = data
        .filter((notification) => notification.readAt === null)
        .map((notification) => notification.id);

      if (notificationIds.length === 0) return;

      const batch = writeBatch(db);

      notificationIds.forEach((notificationId) => {
        const notificationRef = doc(
          collection(db, collectionPath.NOTIFICATIONS),
          notificationId
        );
        batch.update(notificationRef, { readAt: new Date(), status: NotificationStatusType.READ });
      });

      await batch.commit();
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  }, [data, dataRef]);



  return { loading, data, update, markAllAsRead }
}
