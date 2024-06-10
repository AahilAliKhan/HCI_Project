import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { Input } from "../ui/input";
import { PostValidation } from "@/lib/validation";
import { Models } from "appwrite";
import {
  useCreatePost,
  useUpdatePost,
} from "@/lib/react-query/queriesAndMutations.ts";
import { useUserContext } from "@/context/AuthContext.tsx";
import { useToast } from "@/components/ui/use-toast.ts";
import { Link, useNavigate } from "react-router-dom";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

function PostForm({ post, action }: PostFormProps) {
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join() : "",
    },
  });

  const { mutateAsync: updatePost, isPending: isUpdatingPost } =
    useUpdatePost();

  const { mutateAsync: createPost, isPending: isCreatingPost } =
    useCreatePost();
  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });

      if (!updatedPost) {
        toast({ title: "Post update failed. Please try again!" });
      }

      toast({ title: "Post updated successfully!" });
      return navigate(`/posts/${post.$id}`);
    }

    const newPost = await createPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      toast({ title: "Post creation failed. Please try again" });
    }

    toast({ title: "Post created successfully!" });

    navigate("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full max-w-5xl "
      >
        {/* Caption field */}
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar "
                  {...field}
                  disabled={isCreatingPost || isUpdatingPost}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        {/* FileUploader */}
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  mediaUrl={post?.imageUrl}
                  fieldChange={field.onChange}
                  disabled={isCreatingPost || isUpdatingPost}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* Location field */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  {...field}
                  disabled={isCreatingPost || isUpdatingPost}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* Location field */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Tags</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="JS, React, Next.js ..."
                  {...field}
                  disabled={isCreatingPost || isUpdatingPost}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex justify-end items-center gap-4">
          <Link
            to={"/"}
            type="button"
            className="h-10 rounded-md shad-button_dark_4 flex-center"
          >
            Cancel
          </Link>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
          >
            {isCreatingPost || isUpdatingPost
              ? "Loading ..."
              : `${action} Post`}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PostForm;
