const ButtonSpinLoading = ({
  size = "md",
  color = "primary",
  variant = "circle",
  className = "",
}) => {
  const sizeClasses = {
    xs: "h-4 w-4",
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
    xl: "h-12 w-12",
  };

  const colorClasses = {
    primary: "text-blue-600",
    secondary: "text-gray-600",
    success: "text-green-600",
    danger: "text-red-600",
    warning: "text-yellow-500",
    light: "text-gray-300",
    dark: "text-gray-800",
  };

  // Spinner dengan animasi putar (default)
  const CircleSpinner = () => (
    <svg
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  // Spinner dengan animasi dots
  const DotsSpinner = () => (
    <div
      className={`inline-flex items-center ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
    >
      <div className="animate-bounce w-2 h-2 bg-current rounded-full mr-1"></div>
      <div
        className="animate-bounce w-2 h-2 bg-current rounded-full mr-1"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="animate-bounce w-2 h-2 bg-current rounded-full"
        style={{ animationDelay: "0.4s" }}
      ></div>
    </div>
  );

  // Spinner dengan animasi bar
  const BarSpinner = () => (
    <div
      className={`relative ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-current opacity-20 rounded-full"></div>
      <div className="absolute top-0 left-0 h-1 bg-current rounded-full animate-progress"></div>
    </div>
  );

  const SpinnerVariants = {
    circle: CircleSpinner,
    dots: DotsSpinner,
    bar: BarSpinner,
  };

  const SelectedSpinner = SpinnerVariants[variant] || CircleSpinner;

  return <SelectedSpinner />;
};

export default ButtonSpinLoading;