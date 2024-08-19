<script lang="ts">
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>
<div>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</div>

