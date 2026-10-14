
export type ReportingPeriod =
  | "this-month"
  | "last-month"
  | "this-year"
  | "custom";

export type DateRange = {
  startDate: string;
  endDate: string;
};

export function getReportingDateRange(
  period: ReportingPeriod,
  customStartDate = "",
  customEndDate = "",
  now = new Date(),
): DateRange | null {
  const year = now.getFullYear();
  const month = now.getMonth();

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;
  };

  let start: Date;
  let end: Date;

  switch (period) {
    case "this-month":
      start = new Date(year, month, 1);
      end = new Date(year, month + 1, 0);
      break;

    case "last-month":
      start = new Date(year, month - 1, 1);
      end = new Date(year, month, 0);
      break;

    case "this-year":
      start = new Date(year, 0, 1);
      end = new Date(year, 11, 31);
      break;

    case "custom":
      if (
        !customStartDate ||
        !customEndDate ||
        customStartDate > customEndDate
      ) {
        return null;
      }

      return {
        startDate: customStartDate,
        endDate: customEndDate,
      };
  }

  return {
    startDate: formatDate(start),
    endDate: formatDate(end),
  };
}
