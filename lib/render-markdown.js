import marked from 'marked';
const renderer = new marked.Renderer();

renderer.code = (code, options) => {
  const opts = options.split(' ').map((o) => o.trim());
  return `${code}__escape__`;
};

marked.setOptions({
  gfm: true,

  headerIds: true,
  renderer,
});

export default (markdown) => marked(markdown);
