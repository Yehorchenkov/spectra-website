import { b as boxWith, n as noop } from "./create-id.js";
function isFunction(value) {
  return typeof value === "function";
}
const defaultOptions = { afterMs: 1e4, onChange: noop };
function boxAutoReset(defaultValue, options) {
  const { afterMs, onChange, getWindow } = { ...defaultOptions, ...options };
  let timeout = null;
  let value = defaultValue;
  function resetAfter() {
    return getWindow().setTimeout(
      () => {
        value = defaultValue;
        onChange?.(defaultValue);
      },
      afterMs
    );
  }
  return boxWith(() => value, (v) => {
    value = v;
    onChange?.(v);
    if (timeout) getWindow().clearTimeout(timeout);
    timeout = resetAfter();
  });
}
export {
  boxAutoReset as b,
  isFunction as i
};
