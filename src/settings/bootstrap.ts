import $ from 'jquery';

(window as Window & { jQuery?: unknown }).jQuery = $;
(window as Window & { $?: unknown }).$ = $;