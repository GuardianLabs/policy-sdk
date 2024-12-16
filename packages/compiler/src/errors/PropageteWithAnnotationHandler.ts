export const execOrPropagate = async <K>(
  method: () => K | Promise<K>,
  annotation: string,
): Promise<Awaited<K>> => {
  try {
    const result = await method();
    return result;
  } catch (e) {
    console.error(annotation);
    throw e;
  }
};

export class PropageteWithAnnotationHandler {
  static execOrPropagate = execOrPropagate;
}
