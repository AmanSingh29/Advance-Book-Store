export const SORT_BY_DROPDOWN = [
  { id: 1, label: "Latest Published", value: "publish_date" },
  { id: 2, label: "Price: Low to High", value: "price_low_to_high" },
  { id: 3, label: "Price: High to Low", value: "price_high_to_low" },
  { id: 4, label: "Page Count", value: "page_count" },
];

export const SortValueAndOrder = {
  publish_date: {
    sort_by: "publish_date",
    sort_order: "descending",
  },
  price_low_to_high: {
    sort_by: "price",
    sort_order: "ascending",
  },
  price_high_to_low: {
    sort_by: "price",
    sort_order: "descending",
  },
  page_count: {
    sort_by: "page_count",
    sort_order: "descending",
  },
};

export const GENRE_OPTIONS = [
  { id: 1, label: "Programming", value: "programming" },
  { id: 2, label: "Software Engineering", value: "software_engineering" },
  { id: 3, label: "Algorithms", value: "algorithms" },
  { id: 4, label: "Computer Science", value: "computer_science" },
];

export const BOOK_LANGUAGE_OPTIONS = [
  { id: 1, label: "English", value: "english" },
  { id: 2, label: "Hindi", value: "hindi" },
];
