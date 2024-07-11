# jelmar.eu

My personal website! See it [here](https://jelmar.eu).

## TODO

Problem: we are shipping 2 heavy dependencies (codemirror and temml) to the client, that only really have to render on the server. But, with MDX we can't use the power of server-side rendering on our custom components. Solutions??

- [ ] Make rehype-temml to transform mdxhast to server-side temml components vs. doing it in the client-side with a `Math` component.
- [ ] Make codemirror not be so heavy...server-side render it??

Other things...

- [x] Jupyter notebooks
- [x] Fix images
- [x] Better syntax highlighting
