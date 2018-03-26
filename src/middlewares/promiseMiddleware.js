import { isPromise } from '../utils';

const defaultTypes = ['PENDING','SUCCESS','ERROR']

export default function promiseMiddleware(config={}){
  const promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypes;

  return (_ref) => {
    const dispatch = _ref.dispatch;

    return next => action => {
      if(!isPromise(action.payload)){
        return next(action);
      }

      const { type,payload,meta } = action;
      const { promise,data } = payload;
      const [ PENDING,SUCCESS,ERROR ] = (meta || {}).promiseTypeSuffixes || promiseTypeSuffixes;

      next({
        type:`${type}_${PENDING}`,
        ...!!data ? { payload:data } : {},
        ...!!meta ? { meta } : {}
      })

      const isAction = resolved => resolved && (resolved.meta || resolved.payload);
      const isThunk = resolved => typeof resolved === 'function';
      const getResolveAction = isError => ({
        type:`${type}_${isError ? ERROR : SUCCESS}`,
        ...!!meta ? {meta} : {},
        ...!!isError ? {error:true}: {}
      })

      action.payload.promise = promise.then(
        (resolved = {}) => {
          const resolveAction = getResolveAction();
          return dispatch(isThunk(resolved) ? resolved.bind(null,resolveAction) : {
            ...resolveAction,
            ...isAction(resolved) ? resolved : {
              ...!!resolved && {payload:resolved}
            }
          });
        },
        (rejected={})=>{
          const resolveAction = getResolveAction(true);
          return dispatch(isThunk(rejected) ? rejected.bind(null,resolveAction):{
            ...resolveAction,
            ...isAction(rejected) ? rejected : {
              ...!!rejected && {payload:rejected}
            }
          })
        }
      );

      return action;
    }
  }
}
