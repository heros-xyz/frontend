import { useState } from "react";

export const useGlobalLoading = () => {
  const [loading, setLoading] = useState(false)
  return { loading, setLoading}
}
