import { supabase } from "@/lib/supabase";

type ProductSerialRow = {
  id: number;
  serial: number | null;
};

export const reorderProductSerial = async (
  productId: number,
  requestedSerial: number | null
) => {
  if (!requestedSerial || requestedSerial < 1) {
    return null;
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, serial")
    .order("serial", { ascending: true, nullsFirst: false })
    .order("id", { ascending: false });

  if (error) {
    return error;
  }

  const products = (data || []) as ProductSerialRow[];
  const otherProducts = products.filter((product) => product.id !== productId);
  const insertIndex = Math.min(requestedSerial - 1, otherProducts.length);

  const reorderedProducts = [
    ...otherProducts.slice(0, insertIndex),
    { id: productId, serial: requestedSerial },
    ...otherProducts.slice(insertIndex),
  ];

  for (const [index, product] of reorderedProducts.entries()) {
    const { error: updateError } = await supabase
      .from("products")
      .update({ serial: index + 1 })
      .eq("id", product.id);

    if (updateError) {
      return updateError;
    }
  }

  return null;
};
