export abstract class ICommand<TInput, TOutput> {
  abstract execute(input: TInput): Promise<TOutput>;
}
