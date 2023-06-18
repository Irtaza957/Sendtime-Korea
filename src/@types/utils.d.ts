// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
interface FixedNumberTuple<T extends any, L extends number> extends Array<T> {
  0: T;
  length: L;
}
