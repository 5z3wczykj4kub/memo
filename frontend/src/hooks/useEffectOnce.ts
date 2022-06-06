import { useEffect, useRef } from 'react';

const useEffectOnce = (cb: () => void) => {
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) return;
    cb();
    ref.current = true;
  }, [cb]);
};

export default useEffectOnce;
