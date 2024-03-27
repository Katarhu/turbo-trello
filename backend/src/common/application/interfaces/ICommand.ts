export abstract class ICommand<TInput, TOutput> {
  abstract execute(request: TInput): Promise<TOutput>;
}
