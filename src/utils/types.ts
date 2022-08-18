/**
 * Fixed-length tuple with elements of given type
 */
export type Tuple<T, L extends number, R extends unknown[] = []> =
  R['length'] extends L
    ? R
    : Tuple<T, L, [...R, T]>
