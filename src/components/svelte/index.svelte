<script>
  import { initI18n } from "@/i18n";
  import i18next from "i18next";
  const { lang } = $props();
  initI18n(lang);
  const { t } = i18next;
  let count = $state(0);
</script>

<div class="wrapper">
  <div>
    <h1>{t("main:nav_home")} from svelte</h1>
  </div>

  <button onclick={() => count++}>
    count: {count}
  </button>
</div>

<style>
  .wrapper {
    margin: 80px 0 0;
  }
</style>
