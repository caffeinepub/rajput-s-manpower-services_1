import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Eye,
  InboxIcon,
  Loader2,
  LogOut,
  Mail,
  MailOpen,
  ShieldCheck,
  ShieldX,
  Trash2,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Submission } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useDeleteSubmission,
  useGetAllSubmissions,
  useIsCallerAdmin,
  useMarkRead,
  useMarkUnread,
} from "../hooks/useQueries";

function formatDate(ts: bigint) {
  const ms = Number(ts) / 1_000_000;
  if (ms < 1_000_000) return "—";
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminPage() {
  const { login, clear, isLoggingIn, isInitializing, identity } =
    useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: submissions = [], isLoading: subLoading } =
    useGetAllSubmissions();
  const markRead = useMarkRead();
  const markUnread = useMarkUnread();
  const deleteSubmission = useDeleteSubmission();

  const [selected, setSelected] = useState<Submission | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<bigint | null>(null);

  const isLoggedIn = !!identity;
  const unreadCount = submissions.filter((s) => !s.isRead).length;

  async function handleMarkRead(id: bigint) {
    try {
      await markRead.mutateAsync(id);
    } catch {
      toast.error("Failed to mark as read.");
    }
  }

  async function handleMarkUnread(id: bigint) {
    try {
      await markUnread.mutateAsync(id);
    } catch {
      toast.error("Failed to mark as unread.");
    }
  }

  async function handleDelete(id: bigint) {
    try {
      await deleteSubmission.mutateAsync(id);
      setDeleteConfirm(null);
      toast.success("Submission deleted.");
    } catch {
      toast.error("Failed to delete submission.");
    }
  }

  if (isInitializing || (isLoggedIn && adminLoading)) {
    return (
      <div
        className="min-h-screen bg-secondary flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="w-8 h-8 animate-spin text-navy-700" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-navy-700 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-card p-8 w-full max-w-sm"
          data-ocid="admin.login.panel"
        >
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-navy-700 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-bold text-navy-700">Admin Panel</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Rajput's Manpower Services
            </p>
          </div>

          <Button
            onClick={login}
            disabled={isLoggingIn}
            data-ocid="admin.login.primary_button"
            className="w-full bg-navy-700 hover:bg-navy-600 text-white font-semibold h-11"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>Login with Internet Identity</>
            )}
          </Button>

          <div className="mt-4 text-center">
            <Link
              to="/"
              data-ocid="admin.back_home.link"
              className="text-xs text-muted-foreground hover:text-navy-700 transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Website
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
        <div className="text-center" data-ocid="admin.access_denied.panel">
          <ShieldX className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-bold text-navy-700">Access Denied</h2>
          <p className="text-muted-foreground text-sm mt-2 mb-6">
            You don't have admin privileges.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={clear}
              data-ocid="admin.logout.button"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
            <Link to="/">
              <Button
                data-ocid="admin.go_home.button"
                className="bg-navy-700 hover:bg-navy-600 text-white"
              >
                Go to Website
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-navy-700 text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-orange-500 flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm">
                Rajput's Manpower Services
              </div>
              <div className="text-white/60 text-xs">Admin Dashboard</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                data-ocid="admin.back_site.link"
                className="text-white/70 hover:text-white hover:bg-white/10 text-xs"
              >
                <ArrowLeft className="w-3 h-3 mr-1" />
                Site
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={clear}
              data-ocid="admin.logout.button"
              className="text-white/70 hover:text-white hover:bg-white/10 text-xs"
            >
              <LogOut className="w-3 h-3 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-border shadow-xs">
            <div className="text-2xl font-extrabold text-navy-700">
              {submissions.length}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Total Submissions
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-border shadow-xs">
            <div
              className="text-2xl font-extrabold text-orange-500"
              data-ocid="admin.unread_count.panel"
            >
              {unreadCount}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">Unread</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-border shadow-xs">
            <div className="text-2xl font-extrabold text-navy-700">
              {submissions.length - unreadCount}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">Read</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-bold text-navy-700 flex items-center gap-2">
              <InboxIcon className="w-5 h-5" />
              Submissions Inbox
            </h2>
            {unreadCount > 0 && (
              <Badge className="bg-orange-500 text-white">
                {unreadCount} new
              </Badge>
            )}
          </div>

          {subLoading ? (
            <div
              className="p-6 space-y-3"
              data-ocid="admin.submissions.loading_state"
            >
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : submissions.length === 0 ? (
            <div
              className="py-16 text-center"
              data-ocid="admin.submissions.empty_state"
            >
              <InboxIcon className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground">No submissions yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="admin.submissions.table">
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead className="w-10">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Company
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Workers
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead className="hidden lg:table-cell">Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {submissions.map((sub, idx) => (
                      <TableRow
                        key={String(sub.id)}
                        data-ocid={`admin.submissions.item.${idx + 1}`}
                        className={
                          !sub.isRead ? "bg-orange-50/60 font-semibold" : ""
                        }
                      >
                        <TableCell className="text-muted-foreground text-xs">
                          {idx + 1}
                        </TableCell>
                        <TableCell className="font-medium text-navy-700">
                          {sub.name}
                        </TableCell>
                        <TableCell className="text-sm">{sub.phone}</TableCell>
                        <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                          {sub.company}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm">
                          {String(sub.workersNeeded)}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline" className="text-xs">
                            {sub.typeOfWork}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                          {formatDate(sub.timestamp)}
                        </TableCell>
                        <TableCell>
                          {sub.isRead ? (
                            <Badge
                              variant="outline"
                              className="text-xs text-muted-foreground"
                            >
                              <MailOpen className="w-3 h-3 mr-1" />
                              Read
                            </Badge>
                          ) : (
                            <Badge className="text-xs bg-orange-500 text-white">
                              <Mail className="w-3 h-3 mr-1" />
                              New
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setSelected(sub);
                                if (!sub.isRead) handleMarkRead(sub.id);
                              }}
                              data-ocid={`admin.view.button.${idx + 1}`}
                              className="h-7 w-7 p-0 hover:text-navy-700"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            {sub.isRead ? (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleMarkUnread(sub.id)}
                                data-ocid={`admin.mark_unread.button.${idx + 1}`}
                                className="h-7 w-7 p-0 hover:text-orange-500"
                              >
                                <Mail className="w-4 h-4" />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleMarkRead(sub.id)}
                                data-ocid={`admin.mark_read.button.${idx + 1}`}
                                className="h-7 w-7 p-0 hover:text-green-600"
                              >
                                <MailOpen className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setDeleteConfirm(sub.id)}
                              data-ocid={`admin.delete.button.${idx + 1}`}
                              className="h-7 w-7 p-0 hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg" data-ocid="admin.detail.dialog">
          <DialogHeader>
            <DialogTitle className="text-navy-700">
              Submission Details
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              {[
                { label: "Name", value: selected.name },
                { label: "Phone", value: selected.phone },
                { label: "Company", value: selected.company },
                {
                  label: "Workers Needed",
                  value: String(selected.workersNeeded),
                },
                { label: "Type of Work", value: selected.typeOfWork },
                { label: "Date", value: formatDate(selected.timestamp) },
                { label: "Status", value: selected.isRead ? "Read" : "Unread" },
              ].map((row) => (
                <div key={row.label} className="flex gap-3">
                  <span className="w-32 text-muted-foreground shrink-0">
                    {row.label}
                  </span>
                  <span className="font-medium text-navy-700">{row.value}</span>
                </div>
              ))}
              {selected.message && (
                <div className="pt-2 border-t border-border">
                  <div className="text-muted-foreground mb-1">Message</div>
                  <div className="text-navy-700 bg-secondary rounded p-3 leading-relaxed">
                    {selected.message}
                  </div>
                </div>
              )}
              <div className="flex gap-2 pt-2">
                {selected.isRead ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      handleMarkUnread(selected.id);
                      setSelected(null);
                    }}
                    data-ocid="admin.detail.mark_unread.button"
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    Mark Unread
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      handleMarkRead(selected.id);
                      setSelected(null);
                    }}
                    data-ocid="admin.detail.mark_read.button"
                  >
                    <MailOpen className="w-4 h-4 mr-1" />
                    Mark Read
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    setDeleteConfirm(selected.id);
                    setSelected(null);
                  }}
                  data-ocid="admin.detail.delete.button"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog
        open={deleteConfirm !== null}
        onOpenChange={(o) => !o && setDeleteConfirm(null)}
      >
        <DialogContent
          className="max-w-sm"
          data-ocid="admin.delete_confirm.dialog"
        >
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this submission? This action cannot
            be undone.
          </p>
          <div className="flex gap-3 justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirm(null)}
              data-ocid="admin.delete_confirm.cancel.button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                deleteConfirm !== null && handleDelete(deleteConfirm)
              }
              disabled={deleteSubmission.isPending}
              data-ocid="admin.delete_confirm.confirm.button"
            >
              {deleteSubmission.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
