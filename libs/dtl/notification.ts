import {
  query,
  collection,
  where,
  onSnapshot,
  getDocs,
  FieldPath,
  documentId,
  writeBatch,
  doc,
  Unsubscribe,
  orderBy
} from "firebase/firestore";
import { useState, useEffect, useMemo, useCallback } from "react";
import { set } from "immer/dist/internal";
import { useAuthContext } from "@/context/AuthContext";
import { NotificationEventType } from "@/utils/enums";
import { ISource } from "@/types/notifications/types";
import { db } from "../firebase";
import { collectionPath } from "./constant";
import { converter as athleteConverter } from "./athleteProfile";
import { AthleteProfile } from "@/libs/dtl/types";

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
  params: {
    interaction?: any
    comment?: any
  }
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
  const { user } = useAuthContext()
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Notification[]>([]);
  const dataRef = useMemo(() =>
      user?.uid ?
      query(collection(db, collectionPath.NOTIFICATIONS),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      ).withConverter(converter)
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

  const update = useCallback(async (data: any) => {
    console.log('useSuscriptionAsTaker.update', data)
  }, [])

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
  }, [data]);


  return { loading, data, update, markAllAsRead }
}
