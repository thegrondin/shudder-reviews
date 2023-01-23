// eslint-disable-next-line @typescript-eslint/no-var-requires
const style = require('../output.css');

const appendTailwindToHead = (document: Document) => {
  const head = document.head;
  const styleTag = document.createElement('style');
  styleTag.innerHTML = style.default;
  head.appendChild(styleTag);
};

const tailwind = {
  appendTailwindToHead,
};

export { tailwind };
