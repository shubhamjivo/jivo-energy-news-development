// Filter chip helpers shared by server and client components (no CMS access).
// The chips are fixed by the design; items of any other type show under "All".

// Projects page and home Project Watch list the technologies in different
// orders in the design.
const PROJECT_PAGE_CHIPS = ["Solar", "Wind", "Battery", "Hydrogen", "Geothermal", "Hydro"];
const PROJECT_WATCH_CHIPS = ["Solar", "Wind", "Battery", "Hydrogen", "Hydro", "Geothermal"];

export function technologyFilters(variant: "page" | "home" = "page") {
  return variant === "home" ? PROJECT_WATCH_CHIPS : PROJECT_PAGE_CHIPS;
}

export const COMPANY_FILTERS = ["IPP", "DFI", "Utility", "OEM", "Offtaker", "Developer"];
