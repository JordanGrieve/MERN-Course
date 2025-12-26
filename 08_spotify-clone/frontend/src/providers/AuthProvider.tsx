import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const updateApiToken = async (token: string | null) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);

        if (token) {
          // TODO
        }
      } catch (error: any) {
        updateApiToken(null);
        console.log("error is auth provider", error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [getToken]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return <div>{children}</div>;
}

export default AuthProvider;
