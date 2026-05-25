import type { Product } from "@/backend";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatBadge } from "@/components/ui/StatBadge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "@/hooks/useQueries";
import { DarkSidebarLayout } from "@/layouts/DarkSidebarLayout";
import { LayoutDashboard, Pencil, Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { NAV_ITEMS } from "./adminNav";

const MOBILE_CATEGORIES = [
  "Phone Cases",
  "Screen Protectors",
  "Chargers & Cables",
  "Power Banks",
  "Earphones & Headphones",
  "Bluetooth Speakers",
  "Phone Holders & Stands",
  "Camera Lenses",
  "Smartwatch Accessories",
  "Tablet Accessories",
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "company", label: "Company" },
  { value: "brand", label: "Brand" },
  { value: "category", label: "Category" },
  { value: "priceAsc", label: "Price: Low to High" },
  { value: "priceDesc", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
];

function StockCell({ stock }: { stock: bigint }) {
  const n = Number(stock);
  const color =
    n === 0
      ? "text-red-600 font-semibold"
      : n < 10
        ? "text-amber-600 font-semibold"
        : "text-foreground";
  return (
    <span className={`font-mono text-sm ${color}`}>
      {n.toLocaleString("en-IN")}
    </span>
  );
}

function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}

function ProductForm({
  product,
  onClose,
}: {
  product?: Product;
  onClose: () => void;
}) {
  const create = useCreateProduct();
  const update = useUpdateProduct();
  const isPending = create.isPending || update.isPending;

  const [form, setForm] = useState({
    name: product?.name ?? "",
    category: product?.category ?? "",
    brand: product?.brand ?? "",
    company: product?.company ?? "",
    price: product?.price ?? 0,
    originalPrice: product?.originalPrice ?? 0,
    discountPercent: Number(product?.discountPercent ?? 0),
    stock: Number(product?.stock ?? 0),
    rating: product?.rating ?? 0,
    imageUrl: product?.imageUrl ?? "",
    description: product?.description ?? "",
  });

  function updateField<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.category || !form.brand || !form.company) {
      toast.error("Please fill all required fields");
      return;
    }
    const input = {
      name: form.name,
      category: form.category,
      brand: form.brand,
      company: form.company,
      description: form.description,
      price: form.price,
      originalPrice: form.originalPrice,
      stock: BigInt(form.stock),
      rating: form.rating,
      imageUrl: form.imageUrl,
      discountPercent: BigInt(form.discountPercent),
    };
    if (product) {
      update.mutate(
        { id: product.id, input },
        {
          onSuccess: () => {
            toast.success("Product updated");
            onClose();
          },
          onError: (err) => toast.error(err.message),
        },
      );
    } else {
      create.mutate(input, {
        onSuccess: () => {
          toast.success("Product created");
          onClose();
        },
        onError: (err) => toast.error(err.message),
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="e.g. Spigen Tough Armor Case"
            required
            data-ocid="product.form.name"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={form.category}
            onValueChange={(v) => updateField("category", v)}
          >
            <SelectTrigger id="category" data-ocid="product.form.category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {MOBILE_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="brand">Brand *</Label>
          <Input
            id="brand"
            value={form.brand}
            onChange={(e) => updateField("brand", e.target.value)}
            placeholder="e.g. Spigen"
            required
            data-ocid="product.form.brand"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            value={form.company}
            onChange={(e) => updateField("company", e.target.value)}
            placeholder="e.g. Spigen India Pvt Ltd"
            required
            data-ocid="product.form.company"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="price">Price (₹) *</Label>
          <Input
            id="price"
            type="number"
            min={0}
            step={1}
            value={form.price}
            onChange={(e) => updateField("price", Number(e.target.value))}
            required
            data-ocid="product.form.price"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="originalPrice">Original Price (₹)</Label>
          <Input
            id="originalPrice"
            type="number"
            min={0}
            step={1}
            value={form.originalPrice}
            onChange={(e) =>
              updateField("originalPrice", Number(e.target.value))
            }
            data-ocid="product.form.originalPrice"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="discountPercent">Discount %</Label>
          <Input
            id="discountPercent"
            type="number"
            min={0}
            max={100}
            value={form.discountPercent}
            onChange={(e) =>
              updateField("discountPercent", Number(e.target.value))
            }
            data-ocid="product.form.discountPercent"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="stock">Stock *</Label>
          <Input
            id="stock"
            type="number"
            min={0}
            step={1}
            value={form.stock}
            onChange={(e) => updateField("stock", Number(e.target.value))}
            required
            data-ocid="product.form.stock"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="rating">Rating (0–5)</Label>
          <Input
            id="rating"
            type="number"
            min={0}
            max={5}
            step={0.1}
            value={form.rating}
            onChange={(e) => updateField("rating", Number(e.target.value))}
            data-ocid="product.form.rating"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            value={form.imageUrl}
            onChange={(e) => updateField("imageUrl", e.target.value)}
            placeholder="https://..."
            data-ocid="product.form.imageUrl"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          data-ocid="product.form.description"
        />
      </div>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          data-ocid="product.form.cancel_button"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          data-ocid="product.form.submit_button"
        >
          {isPending
            ? "Saving..."
            : product
              ? "Update Product"
              : "Create Product"}
        </Button>
      </DialogFooter>
    </form>
  );
}

function AdminProductsContent() {
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<Product | undefined>();

  const { data: products, isLoading } = useProducts(
    category === "all" ? undefined : category,
    search || undefined,
  );
  const deleteMutation = useDeleteProduct();

  const filtered = products ?? [];

  function openAdd() {
    setEditingProduct(undefined);
    setModalOpen(true);
  }

  function openEdit(p: Product) {
    setEditingProduct(p);
    setModalOpen(true);
  }

  function confirmDelete(p: Product) {
    setDeleteTarget(p);
  }

  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success(`Deleted ${deleteTarget.name}`);
        setDeleteTarget(undefined);
      },
      onError: (err) => toast.error(err.message),
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <PageHeader
        title="Product Management"
        subtitle="Manage catalog products, pricing and stock levels"
        action={
          <Button
            size="sm"
            className="gap-2"
            onClick={openAdd}
            data-ocid="products.add_button"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <span className="text-sm text-muted-foreground">Filter:</span>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger
            className="w-44 h-8 text-sm"
            data-ocid="products.category.select"
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {MOBILE_CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger
            className="w-44 h-8 text-sm"
            data-ocid="products.sort.select"
          >
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Search products..."
          className="h-8 w-52 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-ocid="products.search_input"
        />
      </div>

      {/* Table */}
      <div
        className="bg-card border border-border rounded-xl overflow-x-auto"
        data-ocid="products.table"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              {[
                "ID",
                "Name",
                "Brand / Company",
                "Category",
                "Price (₹)",
                "Stock",
                "Rating",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? ["r1", "r2", "r3", "r4", "r5"].map((rk) => (
                  <tr key={rk} className="border-b border-border/50">
                    {["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"].map(
                      (ck) => (
                        <td key={ck} className="px-4 py-3">
                          <Skeleton className="h-4 w-20" />
                        </td>
                      ),
                    )}
                  </tr>
                ))
              : filtered.map((p, i) => (
                  <motion.tr
                    key={p.id.toString()}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: i * 0.035 }}
                    className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                    data-ocid={`products.item.${i + 1}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {p.id.toString()}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground max-w-[200px] truncate">
                      {p.name}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-foreground text-sm">
                          {p.brand}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {p.company}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-foreground">
                      {formatPrice(p.price)}
                    </td>
                    <td className="px-4 py-3">
                      <StockCell stock={p.stock} />
                    </td>
                    <td className="px-4 py-3">
                      <StatBadge
                        status={p.rating >= 4 ? "active" : "pending"}
                        label={`${p.rating.toFixed(1)} ★`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary"
                          onClick={() => openEdit(p)}
                          aria-label="Edit product"
                          data-ocid={`products.edit_button.${i + 1}`}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 hover:bg-red-500/10 hover:text-red-600"
                          onClick={() => confirmDelete(p)}
                          aria-label="Delete product"
                          data-ocid={`products.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
          </tbody>
        </table>
        {!isLoading && filtered.length === 0 && (
          <div
            className="py-12 text-center text-muted-foreground"
            data-ocid="products.empty_state"
          >
            No products found.
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add Product"}
            </DialogTitle>
            <DialogDescription>
              {editingProduct
                ? "Update the product details below."
                : "Fill in the details to add a new product."}
            </DialogDescription>
          </DialogHeader>
          <ProductForm
            product={editingProduct}
            onClose={() => setModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deleteTarget?.name}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setDeleteTarget(undefined)}
              data-ocid="products.delete_cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteMutation.isPending}
              data-ocid="products.delete_confirm_button"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}

export function AdminProducts() {
  return (
    <DarkSidebarLayout
      portalName="Admin Portal"
      portalLogo={LayoutDashboard}
      navItems={NAV_ITEMS}
      userLabel="Admin User"
      userSubLabel="Super Administrator"
    >
      <AdminProductsContent />
    </DarkSidebarLayout>
  );
}
