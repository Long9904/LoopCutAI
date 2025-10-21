import { motion } from "framer-motion";
import { TangibleCard } from "@/components/ui/tangible-card";
import { TangibleButton } from "@/components/ui/tangible-button";
import {
  User,
  Users,
  Plus,
  MapPin,
  Link as LinkIcon,
  Calendar,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const { profiles, currentProfile, setCurrentProfile } = useAppStore();

  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Cover & Profile Picture */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <TangibleCard className="p-0 overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-primary to-accent-blue" />

          {/* Profile Info */}
          <div className="px-6 pb-6">
            {/* Avatar */}
            <div className="relative -mt-16 mb-4">
              <div className="w-32 h-32 rounded-full border-[3px] border-card bg-card flex items-center justify-center shadow-lg">
                <User className="h-16 w-16 text-primary" />
              </div>
            </div>

            {/* User Details */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">Alex Johnson</h1>
                <p className="text-muted-foreground">@alexjohnson</p>

                <p className="mt-3 text-foreground">
                  Subscription management enthusiast | Tech lover | Coffee
                  addict ☕
                </p>

                <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LinkIcon className="h-4 w-4" />
                    <span className="text-primary">loopcutai.com</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined March 2024</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-4 text-sm">
                  <div>
                    <span className="font-bold">{profiles.length}</span>{" "}
                    <span className="text-muted-foreground">Profiles</span>
                  </div>
                  <div>
                    <span className="font-bold">
                      {currentProfile.subscriptions.length}
                    </span>{" "}
                    <span className="text-muted-foreground">Subscriptions</span>
                  </div>
                </div>
              </div>

              <TangibleButton onClick={() => navigate("/profile/edit")}>
                Edit Profile
              </TangibleButton>
            </div>
          </div>
        </TangibleCard>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex gap-2 border-b border-border">
          <button className="px-4 py-3 font-medium text-primary border-b-2 border-primary">
            Profiles
          </button>
          <button className="px-4 py-3 font-medium text-muted-foreground hover:text-foreground">
            Settings
          </button>
        </div>
      </motion.div>

      {/* Current Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="mb-4 text-xl font-bold">Active Profile</h2>
        <TangibleCard color="blue">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary p-4">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{currentProfile.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {currentProfile.type} Profile
                </p>
                <p className="mt-1 text-sm">
                  {currentProfile.subscriptions.length} active subscriptions
                </p>
              </div>
            </div>
            <div className="rounded-full bg-foreground/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              Active
            </div>
          </div>
        </TangibleCard>
      </motion.div>

      {/* All Profiles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">All Profiles</h2>
          <TangibleButton size="sm">
            <Plus className="h-4 w-4" />
            Add Profile
          </TangibleButton>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <TangibleCard
                color={profile.type === "personal" ? "purple" : "green"}
                className="hover:border-primary cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-foreground/10 p-3 backdrop-blur-sm">
                      {profile.type === "personal" ? (
                        <User className="h-6 w-6 text-foreground" />
                      ) : (
                        <Users className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold">{profile.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {profile.type}
                      </p>
                      <p className="mt-1 text-xs">
                        {profile.subscriptions.length} subscriptions
                      </p>
                    </div>
                  </div>
                  {currentProfile.id !== profile.id && (
                    <TangibleButton
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentProfile(profile)}
                    >
                      Switch
                    </TangibleButton>
                  )}
                </div>
              </TangibleCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
