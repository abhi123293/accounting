"use client";

import {
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Building2,
  User,
  Edit,
  Trash2,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useRequireAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sampleContacts = [
  { id: 1, name: "Rajesh Kumar", email: "rajesh@acmecorp.com", phone: "+91 98765 43210", company: "Acme Corporation", type: "customer", address: "Mumbai, Maharashtra" },
  { id: 2, name: "Priya Sharma", email: "priya@techstart.in", phone: "+91 98765 43211", company: "TechStart Inc", type: "customer", address: "Bangalore, Karnataka" },
  { id: 3, name: "Amit Patel", email: "amit@globalltd.com", phone: "+91 98765 43212", company: "Global Ltd", type: "customer", address: "Delhi, NCR" },
  { id: 4, name: "Sneha Reddy", email: "sneha@startupxyz.io", phone: "+91 98765 43213", company: "StartupXYZ", type: "vendor", address: "Hyderabad, Telangana" },
  { id: 5, name: "Vikram Singh", email: "vikram@enterpriseco.com", phone: "+91 98765 43214", company: "Enterprise Co", type: "customer", address: "Pune, Maharashtra" },
  { id: 6, name: "Anita Desai", email: "anita@digitalagency.co", phone: "+91 98765 43215", company: "Digital Agency", type: "vendor", address: "Ahmedabad, Gujarat" },
  { id: 7, name: "Rohit Gupta", email: "rohit@manufacturing.inc", phone: "+91 98765 43216", company: "Manufacturing Inc", type: "vendor", address: "Chennai, Tamil Nadu" },
  { id: 8, name: "Kavya Nair", email: "kavya@consultinggroup.com", phone: "+91 98765 43217", company: "Consulting Group", type: "customer", address: "Kochi, Kerala" },
];

export default function ContactsPage() {
  useRequireAuth();

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="min-w-0 flex-1">
        <Header />

        <div className="space-y-8 p-5 sm:p-8">
          <section className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Contacts
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage customers, vendors, and partners
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Contact
              </Button>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Total Contacts</p>
                <User className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">156</p>
              <p className="mt-2 text-xs text-muted-foreground">Active contacts</p>
            </article>

            <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Customers</p>
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">89</p>
              <p className="mt-2 text-xs text-muted-foreground">Active customers</p>
            </article>

            <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Vendors</p>
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">34</p>
              <p className="mt-2 text-xs text-muted-foreground">Active vendors</p>
            </article>

            <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Partners</p>
                <User className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">12</p>
              <p className="mt-2 text-xs text-muted-foreground">Active partners</p>
            </article>
          </section>

          <section className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="p-5 border-b border-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search contacts..."
                    className="pl-10 w-64 sm:w-80"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="vendor">Vendor</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Location</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleContacts.map((contact) => (
                    <tr key={contact.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-medium text-primary text-sm">
                              {contact.name.split(" ").map(n => n[0]).join("")}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{contact.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-foreground">{contact.company}</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                          {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">{contact.email}</td>
                      <td className="px-4 py-4 text-muted-foreground">{contact.phone}</td>
                      <td className="px-4 py-4 text-muted-foreground">{contact.address}</td>
                      <td className="px-4 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <button className="p-2 rounded-lg hover:bg-accent transition-colors" aria-label="More actions">
                              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem inset>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                Email
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem inset>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                Call
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem inset>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                View Address
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem inset>
                              <div className="flex items-center gap-2">
                                <Edit className="h-4 w-4" />
                                Edit
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem inset className="text-destructive focus:text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-border flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Showing 1 to 8 of 156 contacts</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}