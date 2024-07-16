interface IIdentifiable {
  uid: string;
}

export function trackByFn<T extends IIdentifiable>(
  index: number,
  item: T
): string {
  return item?.uid;
}
