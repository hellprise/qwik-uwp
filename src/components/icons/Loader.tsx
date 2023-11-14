import { component$ } from "@builder.io/qwik";

export const Loader = component$(() => (
  <div class="h-5 w-5 animate-spin rounded-full border-4 border-indigo-800 border-b-transparent" />
));
