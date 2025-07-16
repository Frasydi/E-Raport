// components/OfflineIndicator.jsx
import { useNetworkStatus } from "../hooks/useNetworkStatus";

const OfflineIndicator = () => {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-pulse">
      🚫 Kamu sedang offline. Beberapa fitur mungkin tidak tersedia.
    </div>
  );
};

export default OfflineIndicator;
