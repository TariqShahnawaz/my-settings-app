import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

// Zod schema — exported separately as required
export const userSettingsSchema = z.object({
  displayName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be under 50 characters"),
  email: z
    .string()
    .email("Enter a valid email address"),
  bio: z
    .string()
    .max(300, "Bio must be under 300 characters")
    .optional(),
  notificationsEnabled: z.boolean(),
});

export type UserSettingsFormData = z.infer<typeof userSettingsSchema>;

interface UserSettingsFormProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export default function UserSettingsForm({ onSuccess, onError }: UserSettingsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserSettingsFormData>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      displayName: "",
      email: "",
      bio: "",
      notificationsEnabled: true,
    },
  });

  const bioValue = watch("bio") || "";

  async function onSubmit(data: UserSettingsFormData) {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      onSuccess?.();
    } catch (error) {
      onError?.(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>

      {/* Display Name */}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="displayName" style={{ display: "block", marginBottom: 4 }}>
          Display Name
        </label>
        <input
          id="displayName"
          {...register("displayName")}
          placeholder="Enter your name"
          aria-describedby="displayName-error"
        />
        {errors.displayName && (
          <p id="displayName-error" role="alert" style={{ color: "red", fontSize: 12 }}>
            {errors.displayName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="email" style={{ display: "block", marginBottom: 4 }}>
          Email Address
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          placeholder="you@example.com"
          aria-describedby="email-error"
        />
        {errors.email && (
          <p id="email-error" role="alert" style={{ color: "red", fontSize: 12 }}>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Bio with character counter */}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="bio" style={{ display: "block", marginBottom: 4 }}>
          Bio <span style={{ color: "gray", fontSize: 12 }}>(optional)</span>
        </label>
        <textarea
          id="bio"
          {...register("bio")}
          placeholder="Tell us about yourself"
          rows={4}
          style={{ width: "100%", boxSizing: "border-box" }}
          aria-describedby="bio-error bio-counter"
        />
        <p
          id="bio-counter"
          style={{ color: bioValue.length > 300 ? "red" : "gray", fontSize: 12 }}
        >
          {bioValue.length}/300 characters
        </p>
        {errors.bio && (
          <p id="bio-error" role="alert" style={{ color: "red", fontSize: 12 }}>
            {errors.bio.message}
          </p>
        )}
      </div>

      {/* Notifications Toggle */}
      <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: 8 }}>
        <input
          id="notificationsEnabled"
          type="checkbox"
          {...register("notificationsEnabled")}
        />
        <label htmlFor="notificationsEnabled">
          Enable notifications
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || bioValue.length > 300}
        style={{ opacity: isSubmitting ? 0.7 : 1 }}
      >
        {isSubmitting ? "Saving..." : "Save Settings"}
      </button>

    </form>
  );
}