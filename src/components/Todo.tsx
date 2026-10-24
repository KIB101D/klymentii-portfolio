import type { Todo as TodoValue } from '@/content/types';

/** Visible marker for a missing fact. Rendered in development only, so production never shows "TODO". */
export function TodoMark({ value }: { value: TodoValue }) {
  if (process.env.NODE_ENV === 'production') return null;
  return <span className="todo">TODO: {value.todo}</span>;
}
