export namespace LoginFunctions {
  export function generateRestrictionTime(restrictionTimeMin: number): Date {
    const currentTimeMs = new Date().getTime();

    return new Date(currentTimeMs + restrictionTimeMin * 60_000);
  }
}
