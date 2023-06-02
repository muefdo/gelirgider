import Layout from "@/components/Layout";
import { UserAuth } from "@/context/AuthContext";
import Income from "@/components/Income";
import Expense from "@/components/Expense";
import { useRouter } from "next/router";

const Management = () => {
  const { user } = UserAuth();
  const navigate = useRouter();

  if (user) {
    return (
      <Layout>
      
          <Income />
          <Expense />
        
      </Layout>
    );
  } else {
    navigate.push("/signIn");
  }
};

export default Management;
