import merge from "deepmerge";
import { useCallback, useEffect, useReducer } from "react";

type AsyncActionType<T, R> = (args: T) => Promise<R | undefined>;

type State<R> = {
  data?: R;
  loading: boolean;
};

type Action<R> =
  | { type: "START" }
  | {
      type: "SUCCESS";
      payload: {
        readonly data: R;
        readonly options?: {
          keepPreviousState: boolean;
        };
      };
    }
  | { type: "FAILED"; error: unknown }
  | { type: "RESET" }
  | { type: "DONE" }
  | { type: "SET"; payload: R };

function reducer<R>(state: State<R>, action: Action<R>): State<R> {
  switch (action.type) {
    case "START":
      return { ...state, loading: true };
    case "SUCCESS":
      const { data, options } = action.payload || {};

      return {
        data: options?.keepPreviousState ? merge(state.data, data) : data,
        loading: false,
      };
    case "FAILED":
      return { ...state, loading: false };
    case "RESET":
      return { data: undefined, loading: false };
    case "SET":
      return { ...state, data: action.payload };
    case "DONE": {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
}

export function useAsyncAction<T, R>(
  asyncAction: (args: T) => Promise<R>,
  options?: {
    keepPreviousState?: boolean;
    callOnFirst?: boolean;
    callOnFirstArgs?: Parameters<typeof asyncAction>;
    initialData?: R; // ← add this line
  },
) {
  const [state, dispatch] = useReducer(reducer<R>, {
    data: options?.initialData,
    loading: false,
  });

  const { callOnFirst = false, callOnFirstArgs } = options || {};

  const execute = useCallback(
    async (args: T): ReturnType<AsyncActionType<T, R>> => {
      if (state.loading) return undefined;

      dispatch({ type: "START" });

      return await asyncAction(args)
        .then((res) => {
          dispatch({
            type: "SUCCESS",
            payload: {
              data: res,
              options: {
                keepPreviousState: !!options?.keepPreviousState,
              },
            },
          });
          return res;
        })
        .catch((err) => {
          dispatch({ type: "FAILED", error: err });
          return undefined;
        })
        .finally(() => {
          dispatch({ type: "DONE" });
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (callOnFirst) {
      execute(...((callOnFirstArgs || []) as [T]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callOnFirst]);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const setData = useCallback((newData: R) => {
    dispatch({ type: "SET", payload: newData });
  }, []);

  return { state, execute, reset, setData } as const;
}
