import { useState, ChangeEvent, ReactNode } from "react";

export interface ProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  timezone?: string;
}

export interface SecurityData {
  password?: string;
  confirmPassword?: string;
}

export interface UserSettingsData extends ProfileData, SecurityData {}

interface ProfileSectionProps {
  data: ProfileData;
  onChange: (data: ProfileData) => void;
}

interface SecuritySectionProps {
  data: SecurityData;
  onChange: (data: SecurityData) => void;
}

interface UserSettingFormProps {
  data?: UserSettingsData;
  onChange?: (data: UserSettingsData) => void;
}

const timezones = [
  { value: "", label: "Select timezone" },
  { value: "utc", label: "UTC" },
  { value: "est", label: "Eastern (EST/EDT)" },
  { value: "cst", label: "Central (CST/CDT)" },
  { value: "mst", label: "Mountain (MST/MDT)" },
  { value: "pst", label: "Pacific (PST/PDT)" },
  { value: "gmt", label: "London (GMT/BST)" },
  { value: "cet", label: "Central Europe (CET/CEST)" },
];

function validateProfileField(name: string, value: string): string {
  if (name === "firstName" || name === "lastName") {
    return value.trim().length < 2 ? "Enter at least 2 characters" : "";
  }
  if (name === "email") {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
      ? ""
      : "Enter a valid email address";
  }
  return "";
}

interface FieldProps {
  label: string;
  optional?: boolean;
  id: string;
  error?: string;
  touched?: boolean;
  children: ReactNode;
}

function Field({ label, optional, id, error, touched, children }: FieldProps) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
        <label htmlFor={id} style={{ fontSize: 14, fontWeight: 500 }}>{label}</label>
        {optional && <span style={{ fontSize: 12, color: "var(--text-muted)" }}>optional</span>}
      </div>
      {children}
      <div style={{ fontSize: 12, color: "var(--text-danger)", marginTop: 4, minHeight: 16 }} aria-live="polite">
        {touched && error ? error : ""}
      </div>
    </div>
  );
}

interface TextInputProps {
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  placeholder?: string;
}

function TextInput({ id, value, onChange, onBlur, error, touched, placeholder }: TextInputProps) {
  const state = !touched ? "" : error ? "error" : value ? "success" : "";
  const borderColor =
    state === "error" ? "var(--border-danger)" :
    state === "success" ? "var(--border-success)" :
    undefined;

  return (
    <div style={{ position: "relative" }}>
      <input
        id={id}
        type={id === "email" ? "email" : "text"}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        style={{ width: "100%", boxSizing: "border-box", ...(borderColor ? { borderColor } : {}) }}
      />
      {state === "error" && (
        <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-danger)", fontSize: 16 }}>
          &#9888;
        </span>
      )}
      {state === "success" && (
        <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-success)", fontSize: 16 }}>
          ✓
        </span>
      )}
    </div>
  );
}

export function ProfileSection({ data, onChange }: ProfileSectionProps) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    onChange({ ...data, [e.target.name]: e.target.value });
  }

  function handleBlur(e: ChangeEvent<HTMLInputElement>) {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  }

  const errors = {
    firstName: validateProfileField("firstName", data.firstName || ""),
    lastName: validateProfileField("lastName", data.lastName || ""),
    email: validateProfileField("email", data.email || ""),
  };

  return (
    <section style={{ background: "var(--surface-2)", border: "0.5px solid var(--border)", borderRadius: 12, padding: "1.25rem 1.5rem", marginBottom: "1rem" }}>
      <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 1rem" }}>
        Profile
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="First name" id="firstName" error={errors.firstName} touched={touched.firstName}>
          <TextInput
            id="firstName"
            value={data.firstName || ""}
            onChange={(e) => handleChange({ ...e, target: { ...e.target, name: "firstName", value: e.target.value } })}
            onBlur={(e) => handleBlur({ ...e, target: { ...e.target, name: "firstName" } })}
            error={errors.firstName}
            touched={touched.firstName}
            placeholder="Ada"
          />
        </Field>
        <Field label="Last name" id="lastName" error={errors.lastName} touched={touched.lastName}>
          <TextInput
            id="lastName"
            value={data.lastName || ""}
            onChange={(e) => handleChange({ ...e, target: { ...e.target, name: "lastName", value: e.target.value } })}
            onBlur={(e) => handleBlur({ ...e, target: { ...e.target, name: "lastName" } })}
            error={errors.lastName}
            touched={touched.lastName}
            placeholder="Lovelace"
          />
        </Field>
      </div>

      <Field label="Email address" id="email" error={errors.email} touched={touched.email}>
        <TextInput
          id="email"
          value={data.email || ""}
          onChange={(e) => handleChange({ ...e, target: { ...e.target, name: "email", value: e.target.value } })}
          onBlur={(e) => handleBlur({ ...e, target: { ...e.target, name: "email" } })}
          error={errors.email}
          touched={touched.email}
          placeholder="ada@example.com"
        />
      </Field>

      <Field label="Timezone" id="timezone" optional>
        <select
          id="timezone"
          name="timezone"
          value={data.timezone || ""}
          onChange={handleChange}
          style={{ width: "100%", boxSizing: "border-box" }}
        >
          {timezones.map((tz) => (
            <option key={tz.value} value={tz.value}>{tz.label}</option>
          ))}
        </select>
      </Field>
    </section>
  );
}

function getStrength(pw: string): number {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

function StrengthBar({ strength }: { strength: number }) {
  const colors = ["", "var(--fill-danger)", "var(--fill-warning)", "var(--fill-warning)", "var(--fill-success)"];
  const color = colors[strength] || "var(--border)";

  return (
    <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            height: 3,
            flex: 1,
            borderRadius: 2,
            background: i <= strength && strength > 0 ? color : "var(--border)",
            transition: "background 0.2s",
          }}
        />
      ))}
    </div>
  );
}

export function validateSecurity(
  password: string,
  confirmPassword: string
): { password?: string; confirmPassword?: string } {
  const errors: { password?: string; confirmPassword?: string } = {};
  if (password && password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  if (confirmPassword && confirmPassword !== password) {
    errors.confirmPassword = "Passwords don't match";
  }
  return errors;
}

interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  placeholder?: string;
}

function PasswordInput({ id, value, onChange, onBlur, error, touched, placeholder }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const state = !touched ? "" : error ? "error" : value ? "success" : "";
  const borderColor =
    state === "error" ? "var(--border-danger)" :
    state === "success" ? "var(--border-success)" :
    undefined;

  return (
    <div style={{ position: "relative" }}>
      <input
        id={id}
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        style={{ width: "100%", boxSizing: "border-box", paddingRight: 68, ...(borderColor ? { borderColor } : {}) }}
      />
      <div style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 6 }}>
        {state === "error" && <span style={{ color: "var(--text-danger)", fontSize: 15 }}>&#9888;</span>}
        {state === "success" && <span style={{ color: "var(--text-success)", fontSize: 15 }}>✓</span>}
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: "var(--text-muted)", fontSize: 14, lineHeight: 1 }}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}

export function SecuritySection({ data, onChange }: SecuritySectionProps) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function handleChange(field: keyof SecurityData, value: string) {
    onChange({ ...data, [field]: value });
  }

  function handleBlur(field: keyof SecurityData) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  const errors = validateSecurity(data.password || "", data.confirmPassword || "");
  const strength = getStrength(data.password || "");

  return (
    <section style={{ background: "var(--surface-2)", border: "0.5px solid var(--border)", borderRadius: 12, padding: "1.25rem 1.5rem", marginBottom: "1rem" }}>
      <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 1rem" }}>
        Security
      </p>

      <div style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
          <label htmlFor="password" style={{ fontSize: 14, fontWeight: 500 }}>New password</label>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>optional</span>
        </div>
        <PasswordInput
          id="password"
          value={data.password || ""}
          onChange={(e) => handleChange("password", e.target.value)}
          onBlur={() => handleBlur("password")}
          error={errors.password}
          touched={touched.password}
          placeholder="At least 8 characters"
        />
        {(data.password || touched.password) && <StrengthBar strength={strength} />}
        <div style={{ fontSize: 12, color: "var(--text-danger)", marginTop: 4, minHeight: 16 }} aria-live="polite">
          {touched.password && errors.password ? errors.password : ""}
        </div>
      </div>

      <div>
        <div style={{ marginBottom: 5 }}>
          <label htmlFor="confirmPassword" style={{ fontSize: 14, fontWeight: 500 }}>Confirm password</label>
        </div>
        <PasswordInput
          id="confirmPassword"
          value={data.confirmPassword || ""}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          onBlur={() => handleBlur("confirmPassword")}
          error={errors.confirmPassword}
          touched={touched.confirmPassword}
          placeholder="Re-enter password"
        />
        <div style={{ fontSize: 12, color: "var(--text-danger)", marginTop: 4, minHeight: 16 }} aria-live="polite">
          {touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ""}
        </div>
      </div>
    </section>
  );
}

export default function UserSettingForm({ data: controlledData, onChange: controlledOnChange }: UserSettingFormProps = {}) {
  const [internalData, setInternalData] = useState<UserSettingsData>({
    firstName: "",
    lastName: "",
    email: "",
    timezone: "",
    password: "",
    confirmPassword: "",
  });

  const data = controlledData ?? internalData;
  const setData = controlledOnChange ?? setInternalData;

  return (
    <>
      <ProfileSection
        data={data}
        onChange={(profile) => setData({ ...data, ...profile })}
      />
      <SecuritySection
        data={data}
        onChange={(security) => setData({ ...data, ...security })}
      />
    </>
  );
}
