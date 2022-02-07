import { Operation, Path } from '..'

/**
 * `PathRef` objects keep a specific path in a document synced over time as new
 * operations are applied to the editor. You can access their `current` property
 * at any time for the up-to-date path value.
 * 
 * PathRef 用来存储一个特定的 path，能够在 apply operation之后，运算得出当前选区的对应 path
 */

export interface PathRef {
  current: Path | null
  affinity: 'forward' | 'backward' | null
  unref(): Path | null
}

export interface PathRefInterface {
  transform: (ref: PathRef, op: Operation) => void
}

export const PathRef: PathRefInterface = {
  /**
   * Transform the path ref's current value by an operation.
   * 
   * 当你执行了某个 op 之后，更新 pathRef.current 的值
   */

  transform(ref: PathRef, op: Operation): void {
    const { current, affinity } = ref

    if (current == null) {
      return
    }

    const path = Path.transform(current, op, { affinity })
    ref.current = path

    if (path == null) {
      ref.unref()
    }
  },
}
