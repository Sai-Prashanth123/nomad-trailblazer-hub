
declare namespace JSX {
  interface IntrinsicElements {
    'spline-viewer': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        url?: string;
        width?: string | number;
        height?: string | number;
      },
      HTMLElement
    >;
  }
}
