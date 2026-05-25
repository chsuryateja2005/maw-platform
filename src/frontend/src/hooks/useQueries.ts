import {
  IssueStatus,
  type ProductInput,
  SortBy,
  type VendorStatus,
  createActor,
} from "@/backend";
import type {
  Address,
  Issue,
  Order,
  Product,
  VendorRequest,
  VendorRequestInput,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function mapSortBy(sortBy?: string): SortBy | null {
  switch (sortBy) {
    case "company":
      return SortBy.company;
    case "brand":
      return SortBy.brand;
    case "category":
      return SortBy.category;
    case "priceAsc":
      return SortBy.priceAsc;
    case "priceDesc":
      return SortBy.priceDesc;
    case "rating":
      return SortBy.rating;
    case "newest":
      return SortBy.newest;
    default:
      return null;
  }
}

export function useProducts(
  category?: string,
  search?: string,
  sortBy?: string,
) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: [
      "products",
      category ?? "all",
      search ?? "",
      sortBy ?? "featured",
    ],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getProducts(
        category ?? null,
        search ?? null,
        mapSortBy(sortBy),
      );
      return result;
    },
    enabled: !!actor && !actorFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useOrders() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOrders();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useUserAddresses() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<Address[]>({
    queryKey: ["userAddresses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserAddresses();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSaveAddress() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (addr: Address) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveAddress(addr);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
    },
  });
}

export function useDeleteAddress() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (index: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteAddress(index);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
    },
  });
}

export function useMyIssues(enabled = true) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<Issue[]>({
    queryKey: ["myIssues"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyIssues();
    },
    enabled: !!actor && !actorFetching && enabled,
  });
}

export function useAllIssues() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<Issue[]>({
    queryKey: ["allIssues"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getIssues();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCreateIssue() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      subject,
      description,
    }: { subject: string; description: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createIssue(subject, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myIssues"] });
      queryClient.invalidateQueries({ queryKey: ["allIssues"] });
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });
}

export function useUpdateIssueStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: IssueStatus }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateIssueStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allIssues"] });
    },
  });
}

export function useIssues() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<Issue[]>({
    queryKey: ["issues"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getIssues();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useResolveIssue() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateIssueStatus(id, IssueStatus.resolved);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });
}

export function useCreateProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: ProductInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createProduct(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: bigint; input: ProductInput }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateProduct(id, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useProductById(productId: bigint | undefined) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<Product | null>({
    queryKey: ["product", productId?.toString()],
    queryFn: async () => {
      if (!actor || productId === undefined) return null;
      return actor.getProductById(productId);
    },
    enabled: !!actor && !actorFetching && productId !== undefined,
    staleTime: 5 * 60 * 1000,
  });
}

export function useVendorRequests() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<VendorRequest[]>({
    queryKey: ["vendorRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVendorRequests();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 5000,
  });
}

export function useCreateVendorRequest() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: VendorRequestInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createVendorRequest(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendorRequests"] });
    },
  });
}

export function useUpdateVendorRequestStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: bigint; status: VendorStatus }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateVendorRequestStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendorRequests"] });
    },
  });
}
