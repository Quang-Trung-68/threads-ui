import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSettingsSchema } from "@/schemas";
import { useState } from "react";
import { Camera, ChevronLeft } from "lucide-react";
import { Button } from "@/components/Common/ui/button";
import { Input } from "@/components/Common/ui/input";
import { Textarea } from "@/components/Common/ui/textarea";
import { Switch } from "@/components/Common/ui/switch";
import UserAvatar from "@/components/Common/ui/UserAvatar";
import { useNavigate } from "react-router";
import { useUpdateProfileMutation } from "@/services/authService";
import { notifySooner } from "@/utils/notifySooner";

export default function UserSettings() {

    const [updateProfile, { isLoading: isUpdateProfileLoading }] = useUpdateProfileMutation();

  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      name: "",
      username: "",
      bio: "",
      is_private: false,
    },
  });

  const onSubmit = async (data) => {
    // Prepare for multipart/form-data
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("bio", data.bio || "");
    formData.append("is_private", data.is_private);
    
    // Check if avatar is a File object (set manually in handleAvatarChange)
    if (data.avatar instanceof File) {
       formData.append("avatar", data.avatar);
    } else if (data.avatar instanceof FileList && data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }

    console.log("Form Data submitted:", data);
    // For demonstration of multipart readiness
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + (pair[1] instanceof File ? `File: ${pair[1].name}` : pair[1]));
    }
    
   notifySooner.promise(updateProfile(formData), {
    loading: "Updating profile...",
    success: "Profile updated successfully",
    error: "Failed to update profile"
   })
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("avatar", file, { shouldValidate: true }); // Manually set to File object for schema/onSubmit
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full"
        >
          <ChevronLeft size={24} />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Edit profile</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="group relative">
            <UserAvatar 
              user={{ avatar_url: preview }} 
              className="h-28 w-28 border-2 border-border transition-opacity group-hover:opacity-80" 
            />
            <label className="absolute inset-0 flex cursor-pointer items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <button
            type="button"
            className="text-sm font-medium text-blue-500 hover:underline cursor-pointer"
            onClick={() => document.querySelector('input[type="file"]').click()}
          >
            Change photo
          </button>
        </div>

        <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Name</label>
            <Input
              {...register("name")}
              placeholder="Your name"
              className="rounded-xl border border-border bg-muted/30 focus:bg-background"
            />
            {errors.name && (
              <p className="text-xs font-medium text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Username</label>
            <Input
              {...register("username")}
              placeholder="username"
              className="rounded-xl border border-border bg-muted/30 focus:bg-background"
            />
            {errors.username && (
              <p className="text-xs font-medium text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Bio</label>
            <Textarea
              {...register("bio")}
              placeholder="Tell us about yourself"
              className="min-h-[120px] rounded-xl border border-border bg-muted/30 focus:bg-background"
            />
          </div>
        </div>

        {/* Account Privacy */}
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">Private profile</h3>
            <p className="text-sm text-muted-foreground">
              Only people you approve can see your threads and replies.
            </p>
          </div>
          <Controller
            name="is_private"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full cursor-pointer rounded-xl py-6 text-base font-bold transition-all active:scale-[0.98]"
        >
          Done
        </Button>
      </form>
    </div>
  );
}
