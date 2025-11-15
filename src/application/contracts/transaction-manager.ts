export abstract class TransactionManager {
  abstract run<T>(fn: () => Promise<T>): Promise<T>;
}
