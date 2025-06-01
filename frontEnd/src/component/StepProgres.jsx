function StepProgress({ currentStep }) {
    const steps = ["Pilih Kategori", "Nilai Peserta Didik"];

    return (
        <div className="w-full max-w-md mx-auto mt-6 px-6">
            <div className="flex justify-between items-center mb-2">
                {steps.map((step, idx) => (
                    <div
                        key={idx}
                        className={`text-xs font-semibold ${
                            currentStep === idx + 1
                                ? "text-red-600"
                                : "text-gray-400"
                        }`}
                    >
                        {step}
                    </div>
                ))}
            </div>

            <div className="relative h-2">
                {/* Bar background */}
                <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-gray-300 rounded-full" />

                {/* Bar progress */}
                <div
                    className="absolute top-1/2 left-0 h-1 bg-red-500 rounded-full transition-all"
                    style={{
                        width: `${
                            ((currentStep - 1) / (steps.length - 1)) * 100
                        }%`,
                    }}
                />

                {/* Step circles */}
                <div className="flex justify-between absolute top-1/2 left-0 right-0 -translate-y-1/2 px-1">
                    {steps.map((_, idx) => {
                        const isActive = currentStep === idx + 1;
                        return (
                            <div
                                key={idx}
                                className={`w-5 h-5 rounded-full border-2 transition-colors ${
                                    isActive
                                        ? "border-red-600 bg-red-600"
                                        : "border-gray-400 bg-white"
                                }`}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default StepProgress;
