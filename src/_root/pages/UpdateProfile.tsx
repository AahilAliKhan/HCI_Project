"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProfileUploader from "@/components/shared/ProfileUploader.tsx";
import { UpdateUserValidation } from "@/lib/validation";
import {
  useGetUserById,
  useUpdateUser,
} from "@/lib/react-query/queriesAndMutations.ts";
import { useToast } from "@/components/ui/use-toast.ts";
import Loader from "@/components/shared/Loader";
import { useEffect } from "react";
import classNames from "classnames";

function UpdateProfile() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, setUser, isUserLoading } = useUserContext();
  const { id } = useParams();
  const { data: currentUser } = useGetUserById(id || "");
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();

  const form = useForm<z.infer<typeof UpdateUserValidation>>({
    resolver: zodResolver(UpdateUserValidation),
    defaultValues: {
      file: [],
      username: user.username || "",
      name: user.name || "",
      email: user.email || "",
      bio: user.bio || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UpdateUserValidation>) {
    const updatedUser = await updateUser({
      userId: user.id,
      name: values.name,
      bio: values.bio,
      file: values.file,
      imageUrl: user.imageUrl,
      imageId: currentUser?.imageId,
    });

    if (!updatedUser) {
      return toast({ title: "Failed to update user. Try Again!" });
    }

    setUser({
      ...user,
      name: updatedUser.name,
      imageUrl: updatedUser.imageUrl,
      bio: updatedUser.bio,
    });

    return navigate(`/profile/${user.id}`);
  }

  useEffect(() => {
    if (!isUserLoading && user) {
      form.reset({
        file: [],
        username: user.username,
        name: user.name,
        email: user.email,
        bio: user.bio,
      });
    }
  }, [isUserLoading]);

  return (
    <div className="flex flex-col flex-1 items-center gap-10 p-5 md:p-8 lg:p-12 overflow-auto custom-scrollbar">
      <div className="flex items-center gap-2 w-full max-w-5xl">
        <img src="/assets/icons/edit.svg" alt="" className="h-9 w-9" />
        <h2 className="h3-bold md:h2-bold w-full">Update Profile</h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-5xl"
        >
          {/* file submission */}
          <FormField
            control={form.control}
            name={"file"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ProfileUploader
                    fieldChange={field.onChange}
                    mediaUrl={user.imageUrl}
                    disabled={isUpdatingUser}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    {...field}
                    className="shad-input"
                    disabled={isUpdatingUser}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="shadcn"
                    {...field}
                    className="shad-input"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="shadcn"
                    {...field}
                    className="shad-input"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* bio */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="shadcn"
                    {...field}
                    className="shad-textarea"
                    disabled={isUpdatingUser}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end gap-4">
            <Link
              to={"/"}
              type="button"
              className={classNames(
                buttonVariants({ variant: "ghost" }),
                "shad-button_dark_4",
                { "pointer-events-none opacity-90": isUpdatingUser },
              )}
            >
              Cancel
            </Link>
            <Button
              type="submit"
              className="shad-button_primary"
              disabled={isUpdatingUser}
            >
              {isUpdatingUser ? (
                <>
                  <Loader /> Updating
                </>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default UpdateProfile;
