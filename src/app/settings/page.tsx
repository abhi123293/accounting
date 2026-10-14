"use client";

import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Key,
  Database,
  Mail,
  DollarSign,
  Building2,
  Save,
  Loader2,
  Check,
  Sun,
  Moon,
  Monitor,
  Upload,
  Download,
  Settings,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useRequireAuth } from "@/lib/auth-context";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "cn";

export default function SettingsPage() {
  useRequireAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="min-w-0 flex-1">
        <Header />

        <div className="space-y-8 p-5 sm:p-8">
          <section className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Settings className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Settings
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage your account and application preferences
                </p>
              </div>
            </div>
          </section>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Manage your personal information and avatar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                      <Button variant="outline" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Change Avatar
                      </Button>
                      <p className="mt-2 text-sm text-muted-foreground">JPG, PNG up to 2MB</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john@company.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue="+91 98765 43210" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input id="bio" defaultValue="Finance professional with 10+ years experience" />
                    </div>
                  </div>
                  <div className="flex justify-end pt-4 border-t border-border">
                    <Button onClick={handleSave} disabled={saving}>
                      {saving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : saved ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Saved
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Email Notifications", desc: "Receive email notifications for important updates", icon: Mail },
                    { label: "Invoice Reminders", desc: "Get reminded when invoices are due or overdue", icon: DollarSign },
                    { label: "Payment Confirmations", desc: "Receive confirmation when payments are received", icon: Check },
                    { label: "Weekly Reports", desc: "Get weekly summary of your financial activity", desc2: true },
                    { label: "Security Alerts", desc: "Get notified of suspicious login attempts", icon: Shield },
                    { label: "System Updates", desc: "Receive announcements about new features", icon: Globe },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                      <div className="flex items-center gap-3">
                        {item.icon && <item.icon className="h-5 w-5 text-muted-foreground" />}
                        <div>
                          <p className="font-medium text-foreground">{item.label}</p>
                          {item.desc && <p className="text-sm text-muted-foreground">{item.desc}</p>}
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how the application looks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Theme</Label>
                    <div className="mt-3 grid grid-cols-3 gap-4">
                      {["light", "dark", "system"].map((theme) => (
                        <button
                          key={theme}
                          className={cn(
                            "relative p-4 rounded-lg border-2 transition-all",
                            theme === "system"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-muted-foreground/50"
                          )}
                        >
                          <div className="flex items-center justify-center gap-2 mb-2">
                            {theme === "light" && <Sun className="h-5 w-5 text-primary" />}
                            {theme === "dark" && <Moon className="h-5 w-5 text-primary" />}
                            {theme === "system" && <Monitor className="h-5 w-5 text-primary" />}
                          </div>
                          <p className="text-sm font-medium text-foreground capitalize">{theme}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label>Color Scheme</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Monochrome Executive theme is currently active. Additional color schemes coming soon.
                    </p>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Compact Mode</Label>
                      <p className="text-sm text-muted-foreground">Reduce spacing for denser information display</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <Key className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <Key className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Change Password</p>
                        <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                      </div>
                    </div>
                    <Button variant="outline">Change Password</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Active Sessions</p>
                        <p className="text-sm text-muted-foreground">Manage devices logged into your account</p>
                      </div>
                    </div>
                    <Button variant="outline">View Sessions</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-destructive" />
                      <div>
                        <p className="font-medium text-foreground">Delete Account</p>
                        <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                      </div>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="company" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>Manage your company details for invoices and reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input id="companyName" defaultValue="Acme Corporation" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gstNumber">GST Number</Label>
                      <Input id="gstNumber" defaultValue="27AAACA1234A1Z5" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="panNumber">PAN Number</Label>
                      <Input id="panNumber" defaultValue="AAACA1234A" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cin">CIN</Label>
                      <Input id="cin" defaultValue="U74999MH2020PTC123456" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Registered Address</Label>
                      <Input id="address" defaultValue="123 Business Park, Mumbai, Maharashtra 400001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue="+91 22 1234 5678" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="finance@acmecorp.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" defaultValue="https://acmecorp.com" />
                    </div>
                  </div>
                  <div className="flex justify-end pt-4 border-t border-border">
                    <Button onClick={handleSave} disabled={saving}>
                      {saving ? "Saving..." : saved ? "Saved" : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>Connect external services and APIs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "HDFC Bank", desc: "Connect your bank account for automatic transaction sync", connected: true },
                    { name: "ICICI Bank", desc: "Connect your bank account for automatic transaction sync", connected: false },
                    { name: "Razorpay", desc: "Accept online payments through your invoices", connected: true },
                    { name: "Stripe", desc: "Accept international payments", connected: false },
                    { name: "QuickBooks", desc: "Sync data with QuickBooks Online", connected: false },
                    { name: "Tally", desc: "Export data to Tally ERP", connected: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                      {item.connected ? (
                        <Button variant="outline" size="sm">Disconnect</Button>
                      ) : (
                        <Button size="sm">Connect</Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Export, import, and manage your accounting data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <Download className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Export All Data</p>
                        <p className="text-sm text-muted-foreground">Download complete backup as JSON/CSV</p>
                      </div>
                    </div>
                    <Button variant="outline">Export</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <Database className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Import Data</p>
                        <p className="text-sm text-muted-foreground">Import transactions, contacts, or chart of accounts</p>
                      </div>
                    </div>
                    <Button variant="outline">Import</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                    <div className="flex items-center gap-3">
                      <Database className="h-5 w-5 text-destructive" />
                      <div>
                        <p className="font-medium text-foreground">Delete All Data</p>
                        <p className="text-sm text-muted-foreground">Permanently remove all accounting records</p>
                      </div>
                    </div>
                    <Button variant="destructive">Delete All Data</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}