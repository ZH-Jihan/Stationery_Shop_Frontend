"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { getUserProfile } from "@/services/user";
import { TUser } from "@/types/user";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { updateUserProfile } from "@/services/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<TUser>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const data = await getUserProfile();
          setUserProfile(data.data);
          setFormData(data.data);
          if (data.data.image) {
            setImagePreview(data.data.image);
          }
        } catch (err) {
          console.error("Failed to fetch user profile:", err);
          setError("Failed to load profile data.");
          toast({
            title: "Error",
            description: "Failed to load profile data.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      } else if (status !== "loading") {
        setLoading(false);
        setError("Authentication required.");
      }
    };

    fetchProfile();
  }, [status, session, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(userProfile?.image || null);
      setFormData((prev) => ({ ...prev, image: userProfile?.image || "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) {
      toast({
        title: "Error",
        description: "User not authenticated.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await updateUserProfile(session.user.email, formData);
      setUserProfile(result.data);
      setFormData(result.data);
      if (result.data.image) {
        setImagePreview(result.data.image);
      }
      toast({
        title: "Success",
        description: "Profile updated successfully.",
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update user profile:", err);
      setError("Failed to update profile.");
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Skeleton className="h-64 w-96 rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No profile data available.
      </div>
    );
  }

  return (
    <main className="p-4 sm:p-8 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-xl shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gray-50 dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary-500">
                <Image
                  src={
                    userProfile.image &&
                    userProfile.image !== "" &&
                    userProfile.image !== "Unknown"
                      ? userProfile.image
                      : "/placeholder-avatar.jpg"
                  }
                  alt="Profile Picture"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userProfile.name || "User"}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {userProfile.role?.toUpperCase()} Profile
                </CardDescription>
              </div>
            </div>
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Email:
              </p>
              <p className="text-gray-900 dark:text-white font-semibold">
                {userProfile.email}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Phone:
              </p>
              <p className="text-gray-900 dark:text-white font-semibold">
                {userProfile.phone || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Address:
              </p>
              <p className="text-gray-900 dark:text-white font-semibold">
                {userProfile.address || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                City:
              </p>
              <p className="text-gray-900 dark:text-white font-semibold">
                {userProfile.city || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Role:
              </p>
              <p className="text-gray-900 dark:text-white font-semibold">
                {userProfile.role?.toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Account Status:
              </p>
              <p className="text-gray-900 dark:text-white font-semibold">
                {userProfile.status?.toUpperCase()}
              </p>
            </div>
          </div>
          {/* Add more profile fields as needed */}
        </CardContent>
      </Card>

      <Sheet open={isEditing} onOpenChange={setIsEditing}>
        <SheetContent className="sm:max-w-md w-full">
          <SheetHeader>
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription>
              Update your profile information.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="flex flex-col items-center space-y-4 mb-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary-500">
                <Image
                  src={
                    imagePreview &&
                    imagePreview !== "" &&
                    imagePreview !== "Unknown"
                      ? imagePreview
                      : "/placeholder-avatar.jpg"
                  }
                  alt="Profile Picture Preview"
                  fill
                  className="object-cover"
                />
                <label
                  htmlFor="image-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                >
                  Upload Image
                </label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                Name
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name || ""}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                Phone
              </label>
              <Input
                id="phone"
                type="text"
                value={formData.phone || ""}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                Address
              </label>
              <Input
                id="address"
                type="text"
                value={formData.address || ""}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                City
              </label>
              <Input
                id="city"
                type="text"
                value={formData.city || ""}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                Save Changes
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </main>
  );
}
