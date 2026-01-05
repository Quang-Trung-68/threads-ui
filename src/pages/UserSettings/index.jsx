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
import { useTranslation } from "react-i18next";
import useAuth from "@/hooks/useAuth";
import { Tooltip } from "@/components/Common/Tooltip";

export default function UserSettings() {
  const { t } = useTranslation(["user", "common", "tooltip"]);
  const { user } = useAuth();
  const [updateProfile, { isLoading: isUpdateProfileLoading }] =
    useUpdateProfileMutation();

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
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
      is_private: user?.is_private || false,
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

    notifySooner.promise(updateProfile(formData), {
      loading: t("common:updatingProfile"),
      success: t("common:profileUpdatedSuccess"),
      error: t("common:profileUpdateError"),
    });
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
        <Tooltip label={t("tooltip:back")}>
          {window.history.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ChevronLeft size={24} />
            </Button>
          )}
        </Tooltip>
        <h1 className="text-foreground text-2xl font-bold">
          {t("user:editProfile")}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="group relative">
            <UserAvatar
              user={{ avatar_url: preview }}
              className="border-border h-28 w-28 border-2 transition-opacity group-hover:opacity-80"
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
            className="cursor-pointer text-sm font-medium text-blue-500 hover:underline"
            onClick={() => document.querySelector('input[type="file"]').click()}
          >
            {t("user:changePhoto")}
          </button>
        </div>

        <div className="border-border bg-card space-y-6 rounded-2xl border p-6 shadow-sm">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-foreground text-sm font-semibold">
              {t("user:name")}
            </label>
            <Input
              {...register("name")}
              placeholder={t("user:yourName")}
              className="border-border bg-muted/30 focus:bg-background rounded-xl border"
            />
            {errors.name && (
              <p className="text-destructive text-xs font-medium">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Username */}
          <div className="space-y-2">
            <label className="text-foreground text-sm font-semibold">
              {t("user:username")}
            </label>
            <Input
              {...register("username")}
              placeholder={t("user:username").toLowerCase()}
              className="border-border bg-muted/30 focus:bg-background rounded-xl border"
            />
            {errors.username && (
              <p className="text-destructive text-xs font-medium">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="text-foreground text-sm font-semibold">
              {t("user:bio")}
            </label>
            <Textarea
              {...register("bio")}
              placeholder={t("user:tellUsAboutYourself")}
              className="border-border bg-muted/30 focus:bg-background min-h-[120px] rounded-xl border"
            />
          </div>
        </div>

        {/* Account Privacy */}
        <div className="border-border bg-card flex items-center justify-between rounded-2xl border p-6 shadow-sm">
          <div className="space-y-1">
            <h3 className="text-foreground font-semibold">
              {t("user:privateProfile")}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t("user:privateProfileDesc")}
            </p>
          </div>
          <Controller
            name="is_private"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full cursor-pointer rounded-xl py-6 text-base font-bold transition-all active:scale-[0.98]"
          disabled={isUpdateProfileLoading}
        >
          {t("common:done")}
        </Button>
      </form>
    </div>
  );
}
