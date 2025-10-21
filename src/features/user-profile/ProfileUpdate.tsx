import { useState } from "react";
import { motion } from "framer-motion";
import { TangibleCard } from "@/components/ui/tangible-card";
import { TangibleButton } from "@/components/ui/tangible-button";
import {
  User,
  MapPin,
  Link as LinkIcon,
  Camera,
  ArrowLeft,
  Save,
} from "lucide-react";

export const ProfileUpdate = () => {
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
    // Logic để lưu profile
    console.log("Saving profile:", profileData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <TangibleButton variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Back
          </TangibleButton>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>
        <TangibleButton onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </TangibleButton>
      </motion.div>

      {/* Cover & Avatar Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <TangibleCard className="p-0 overflow-hidden">
          {/* Cover Image */}
          <div className="relative h-48 bg-gradient-to-r from-primary to-accent-blue group">
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <TangibleButton size="sm">
                <Camera className="h-4 w-4 mr-2" />
                Change Cover
              </TangibleButton>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="px-6 pb-6">
            <div className="relative -mt-16 mb-4 w-32 h-32">
              <div className="w-full h-full rounded-full border-[3px] border-card bg-card flex items-center justify-center shadow-lg group cursor-pointer">
                <User className="h-16 w-16 text-primary" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                  <Camera className="h-8 w-8 text-white" />
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
          <h2 className="text-xl font-bold mb-6">Profile Information</h2>

          <div className="space-y-5">
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
                className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Enter your display name"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">@</span>
                <input
                  type="text"
                  value={profileData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  className="flex-1 px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="username"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
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
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="City, Country"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium mb-2">
                <LinkIcon className="h-4 w-4 inline mr-1" />
                Website
              </label>
              <input
                type="url"
                value={profileData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
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
          <h2 className="text-xl font-bold mb-6">Account Settings</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border">
              <div>
                <h3 className="font-medium">Email Address</h3>
                <p className="text-sm text-muted-foreground">
                  alex.johnson@email.com
                </p>
              </div>
              <TangibleButton variant="outline" size="sm">
                Change
              </TangibleButton>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border">
              <div>
                <h3 className="font-medium">Password</h3>
                <p className="text-sm text-muted-foreground">••••••••</p>
              </div>
              <TangibleButton variant="outline" size="sm">
                Change
              </TangibleButton>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border">
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">Not enabled</p>
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
          <h2 className="text-xl font-bold mb-4 text-red-500">Danger Zone</h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Delete Account</h3>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all data
              </p>
            </div>
            <TangibleButton
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500/10"
            >
              Delete Account
            </TangibleButton>
          </div>
        </TangibleCard>
      </motion.div>
    </div>
  );
};
