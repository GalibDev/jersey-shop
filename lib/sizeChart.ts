export type SizeChartRow = {
  size: string;
  chest: string;
  length: string;
  sleeve: string;
};

export const defaultSizeChart: SizeChartRow[] = [
  { size: "M", chest: "39.25", length: "29", sleeve: "13.25" },
  { size: "L", chest: "41", length: "29.75", sleeve: "13.5" },
  { size: "XL", chest: "42.5", length: "30.5", sleeve: "14" },
  { size: "XXL", chest: "44", length: "31.5", sleeve: "15.25" },
];

export const normalizeSizeChart = (value: unknown) => {
  if (!Array.isArray(value)) {
    return defaultSizeChart;
  }

  const rows = value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const row = item as Partial<SizeChartRow>;

      return {
        size: String(row.size || "").trim(),
        chest: String(row.chest || "").trim(),
        length: String(row.length || "").trim(),
        sleeve: String(row.sleeve || "").trim(),
      };
    })
    .filter(
      (row): row is SizeChartRow =>
        Boolean(row?.size || row?.chest || row?.length || row?.sleeve)
    );

  return rows.length > 0 ? rows : defaultSizeChart;
};

export const toCmSizeChart = (rows: SizeChartRow[]) =>
  rows.map((item) => ({
    size: item.size,
    chest: convertInchValueToCm(item.chest),
    length: convertInchValueToCm(item.length),
    sleeve: convertInchValueToCm(item.sleeve),
  }));

const convertInchValueToCm = (value: string) => {
  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return value;
  }

  return (numericValue * 2.54).toFixed(1);
};
