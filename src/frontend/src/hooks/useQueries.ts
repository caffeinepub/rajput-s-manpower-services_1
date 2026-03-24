import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Submission } from "../backend";
import { useActor } from "./useActor";

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllSubmissions() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<Submission>>({
    queryKey: ["submissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitQuery() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (
      input: Omit<Submission, "id" | "isRead" | "timestamp">,
    ) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitQuery({
        ...input,
        id: 0n,
        isRead: false,
        timestamp: 0n,
      });
    },
  });
}

export function useMarkRead() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.markSubmissionRead(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["submissions"] }),
  });
}

export function useMarkUnread() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.markSubmissionUnread(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["submissions"] }),
  });
}

export function useDeleteSubmission() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteSubmission(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["submissions"] }),
  });
}
