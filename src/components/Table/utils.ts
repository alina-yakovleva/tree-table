export const onPreventNotNumber = (
  e: React.KeyboardEvent<HTMLInputElement>
) => {
  const allowedKeys = ["Delete", "Backspace", "ArrowLeft", "ArrowRight"];

  if (allowedKeys.includes(e.key)) {
    return;
  }

  const isNumber = /[0-9]/.test(e.key);

  if (!isNumber) {
    e.preventDefault();
  }
};
