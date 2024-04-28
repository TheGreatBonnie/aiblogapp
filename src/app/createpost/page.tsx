import CreatePost from "../components/Post";
import Header from "../components/Header";
import { redirect } from "next/navigation";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import "@copilotkit/react-textarea/styles.css";
import { createClient } from "@/utils/supabase/server";

export default async function WriteArticle() {
  const userEmail = "thegreatechwriters@gmail.com";
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user || data?.user.email !== userEmail) {
    redirect("/");
  }

  return (
    <>
      <Header />
      <CopilotKit url="/api/copilotkit">
        <CopilotPopup
          instructions="Help the user research a blog article topic."
          defaultOpen={true}
          labels={{
            title: "Blog Article Research AI Assistant",
            initial:
              "Hi! 👋 I can help you research any topic for a blog article.",
          }}
        />
        <CreatePost />
      </CopilotKit>
    </>
  );
}
