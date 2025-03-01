import { PropsWithChildren } from '@kitajs/html';

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {"<!DOCTYPE html>"}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <link href="/tailwind.css" rel="stylesheet" />

          <title>KitaJS</title>

          <script
            defer
            src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"
          ></script>
        </head>
        <body class="bg-zinc-900 text-zinc-200">{children}</body>
      </html>
    </>
  );
}
