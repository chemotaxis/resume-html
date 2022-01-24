# Résumé template

This is a résumé and cover letter template that I created using HTML, CSS, and
JavaScript.  I wasn't happy with the designs I was using and what I saw online,
so I created one.

A secondary goal was to play around with these three web languages without using
any frameworks and to try out [custom
elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
(Sorry Safari users.  Maybe I'll add some polyfills or switch to something
else).

There are two HTML files:

- `cover-letter.html`
- `resume.html`

Example pdf output is available in the two pdf files in this directory:

- `example-cover-letter.pdf`
- `example-resume.pdf`

## Style

There are separate stylesheets for the résumé and cover letter:

- `style-coverletter.css`
- `style-resume.css`

Although written as webpages, the résumé and cover letter are meant to be
printed to pdf on an ANSI Letter sized page.  I use and test on Google Chrome.

## Available web components

Defined in `components.js`.

### `<date-stamp>`

Prints the current month, day, and year.  Example output: "January 2, 2022".

### `<a is="show-href">`

An anchor element that displays the `href` when no inner text is set.  If there
is some inner text, the `href` will not be displayed.

### `<a is="show-href-newtab">`

Similar to `<a is="show-href">`, but opens the linked URL in a new tab.
