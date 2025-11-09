import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import {
  ChefHat,
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  Shield,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";

// Validation schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "kainguyen", // Pre-filled for demo
      password: "123456", // Pre-filled for demo
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError("");

    try {
      // Demo login validation
      if (data.username === "kainguyen" && data.password === "123456") {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Success - redirect to admin dashboard
        toast.success("Login successful! Redirecting to admin dashboard...");
        // TODO: Redirect to admin dashboard
       navigate("/admin/dashboard");
      } else {
        setLoginError("Invalid username or password. Please try again.");
      }
    } catch (error) {
      setLoginError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-primary/10"></div>

      {/* Back to Home Button */}
      <div
        onClick={() => navigate("/")}
        className=" absolute top-6 left-6 flex items-center gap-2 text-white/70 hover:text-primary transition-colors duration-300 z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Login Card */}
        <div className="bg-black/60 backdrop-blur-xl border border-primary/20 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="bg-primary/10 p-4 rounded-2xl">
                  <Shield className="w-12 h-12 text-primary" />
                </div>
                <ChefHat className="absolute -top-1 -right-1 w-6 h-6 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-white/60">KAI Restaurant Management</p>
          </div>

          {/* Demo Credentials Info */}
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="text-primary font-semibold mb-1">
                  Demo Credentials
                </p>
                <p className="text-white/70">
                  Username:{" "}
                  <span className="text-white font-mono">kainguyen</span>
                </p>
                <p className="text-white/70">
                  Password: <span className="text-white font-mono">123456</span>
                </p>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-white font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Username
              </label>
              <input
                type="text"
                {...register("username")}
                className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                  errors.username
                    ? "border-red-500 focus:border-red-400"
                    : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                }`}
                placeholder="Enter your username"
              />
              {errors.username && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.username.message}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-white font-medium flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full bg-black/40 border rounded-xl px-4 py-3 pr-12 text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                    errors.password
                      ? "border-red-500 focus:border-red-400"
                      : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-primary transition-colors duration-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.password.message}</span>
                </div>
              )}
            </div>

            {/* Login Error */}
            {loginError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-red-400 text-sm">{loginError}</p>
                </div>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                isLoading
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02]"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In to Admin Panel
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-primary/20 text-center">
            <p className="text-white/50 text-sm">
              Secure admin access for KAI Restaurant
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-white/40 text-xs">
            🔒 This is a secure admin area. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
