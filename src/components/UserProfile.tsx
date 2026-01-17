import type { User } from '@/services/authApi';

interface UserProfileProps {
  user?: User;
  onLogout: () => void;
}

export default function UserProfile({ user, onLogout }: UserProfileProps) {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {user?.image && (
            <img
              src={user.image}
              alt={user.username}
              className="w-16 h-16 rounded-full border-4 border-white object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/60';
              }}
            />
          )}
          <div>
            <h2 className="text-2xl font-bold">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-orange-100">@{user?.username}</p>
            <p className="text-orange-100">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="bg-white text-orange-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
