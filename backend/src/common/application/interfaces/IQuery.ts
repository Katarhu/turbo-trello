export abstract class IQuery<TInput, TOutput> {
  abstract execute(request: TInput): Promise<TOutput>;
}
