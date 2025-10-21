import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TangibleCard } from "@/components/ui/tangible-card";
import { TangibleButton } from "@/components/ui/tangible-button";
import { User, MapPin, Link2, Camera, X, Save } from "lucide-react";

interface ProfileUpdateProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileUpdate = ({ isOpen, onClose }: ProfileUpdateProps) => {
  const [profileData, setProfileData] = useState({
    displayName: "Alex Johnson",
    username: "alexjohnson",
    bio: "Subscription management enthusiast | Tech lover | Coffee addict ☕",
    location: "San Francisco, CA",
    website: "loopcutai.com",
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving profile:", profileData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] z-50"
          >
            <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-2xl font-bold">Edit Profile</h2>
                <div className="flex items-center gap-2">
                  <TangibleButton onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </TangibleButton>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-foreground/10 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto space-y-6">
                  {/* Cover & Avatar Section */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <TangibleCard className="p-0 overflow-hidden">
                      {/* Cover Image */}
                      <div className="relative h-40 bg-gradient-to-r from-primary to-accent-blue group">
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <TangibleButton size="sm">
                            <Camera className="h-4 w-4 mr-2" />
                            Change Cover
                          </TangibleButton>
                        </div>
                      </div>

                      {/* Profile Picture */}
                      <div className="px-6 pb-6">
                        <div className="relative -mt-16 mb-4 w-28 h-28">
                          <div className="w-full h-full rounded-full border-[3px] border-card bg-card flex items-center justify-center shadow-lg group cursor-pointer">
                            <User className="h-14 w-14 text-primary" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                              <Camera className="h-7 w-7 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </TangibleCard>
                  </motion.div>

                  {/* Profile Information Form */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <TangibleCard color="blue">
                      <h3 className="text-lg font-bold mb-5">
                        Profile Information
                      </h3>

                      <div className="space-y-4">
                        {/* Display Name */}
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Display Name
                          </label>
                          <input
                            type="text"
                            value={profileData.displayName}
                            onChange={(e) =>
                              handleInputChange("displayName", e.target.value)
                            }
                            className="w-full px-4 py-2.5 rounded-lg bg-background/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            placeholder="Enter your display name"
                          />
                        </div>

                        {/* Username */}
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Username
                          </label>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">@</span>
                            <input
                              type="text"
                              value={profileData.username}
                              onChange={(e) =>
                                handleInputChange("username", e.target.value)
                              }
                              className="flex-1 px-4 py-2.5 rounded-lg bg-background/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                              placeholder="username"
                            />
                          </div>
                        </div>

                        {/* Bio */}
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Bio
                          </label>
                          <textarea
                            value={profileData.bio}
                            onChange={(e) =>
                              handleInputChange("bio", e.target.value)
                            }
                            rows={3}
                            className="w-full px-4 py-2.5 rounded-lg bg-background/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                            placeholder="Tell us about yourself"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            {profileData.bio.length} / 160 characters
                          </p>
                        </div>

                        {/* Location */}
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            <MapPin className="h-4 w-4 inline mr-1" />
                            Location
                          </label>
                          <input
                            type="text"
                            value={profileData.location}
                            onChange={(e) =>
                              handleInputChange("location", e.target.value)
                            }
                            className="w-full px-4 py-2.5 rounded-lg bg-background/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            placeholder="City, Country"
                          />
                        </div>

                        {/* Website */}
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            <Link2 className="h-4 w-4 inline mr-1" />
                            Website
                          </label>
                          <input
                            type="url"
                            value={profileData.website}
                            onChange={(e) =>
                              handleInputChange("website", e.target.value)
                            }
                            className="w-full px-4 py-2.5 rounded-lg bg-background/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            placeholder="your-website.com"
                          />
                        </div>
                      </div>
                    </TangibleCard>
                  </motion.div>

                  {/* Account Settings */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <TangibleCard color="purple">
                      <h3 className="text-lg font-bold mb-5">
                        Account Settings
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
                          <div>
                            <h4 className="font-medium text-sm">
                              Email Address
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              alex.johnson@email.com
                            </p>
                          </div>
                          <TangibleButton variant="outline" size="sm">
                            Change
                          </TangibleButton>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
                          <div>
                            <h4 className="font-medium text-sm">Password</h4>
                            <p className="text-xs text-muted-foreground">
                              ••••••••
                            </p>
                          </div>
                          <TangibleButton variant="outline" size="sm">
                            Change
                          </TangibleButton>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
                          <div>
                            <h4 className="font-medium text-sm">
                              Two-Factor Authentication
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Not enabled
                            </p>
                          </div>
                          <TangibleButton variant="outline" size="sm">
                            Enable
                          </TangibleButton>
                        </div>
                      </div>
                    </TangibleCard>
                  </motion.div>

                  {/* Danger Zone */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <TangibleCard className="border-red-500/50">
                      <h3 className="text-lg font-bold mb-3 text-red-500">
                        Danger Zone
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-sm">
                            Delete Account
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Permanently delete your account and all data
                          </p>
                        </div>
                        <TangibleButton
                          variant="outline"
                          size="sm"
                          className="border-red-500 text-red-500 hover:bg-red-500/10"
                        >
                          Delete
                        </TangibleButton>
                      </div>
                    </TangibleCard>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
